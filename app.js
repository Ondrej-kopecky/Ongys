const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
}

const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.archive-card, .project-row')];

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach((project) => {
      project.hidden = selected !== 'all' && project.dataset.status !== selected;
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project-card, .about, .workshop-card, .now-list, .principle-grid, .notes-grid, .home-about').forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

const heroGraph = document.querySelector('.hero-system');
const graphBranches = [...document.querySelectorAll('.graph-branch')];

if (heroGraph && graphBranches.length) {
  const toolbarHint = heroGraph.querySelector('.system-toolbar small');
  const defaultToolbarHint = toolbarHint?.textContent || 'NAJEĎ NA OBLAST';
  const activateBranch = (branch) => {
    graphBranches.forEach((item) => {
      const active = item === branch;
      item.classList.toggle('is-active', active);
      item.querySelector('.graph-main')?.setAttribute('aria-expanded', String(active));
      item.querySelectorAll('.graph-children a').forEach((link) => {
        link.tabIndex = active ? 0 : -1;
        link.setAttribute('aria-hidden', String(!active));
      });
    });
    heroGraph.classList.toggle('has-active', Boolean(branch));
    if (branch) {
      heroGraph.dataset.active = branch.dataset.branch;
      const branchLabel = branch.querySelector('.graph-main span')?.textContent || '';
      if (toolbarHint) toolbarHint.textContent = `VYBRÁNO · ${branchLabel.toUpperCase()}`;
    } else {
      delete heroGraph.dataset.active;
      if (toolbarHint) toolbarHint.textContent = defaultToolbarHint;
    }
  };

  graphBranches.forEach((branch) => {
    const button = branch.querySelector('.graph-main');
    branch.addEventListener('pointerenter', () => {
      branch.dataset.hoverActivated = 'true';
      activateBranch(branch);
    });
    branch.addEventListener('pointerleave', () => {
      delete branch.dataset.hoverActivated;
    });
    branch.addEventListener('focusin', () => activateBranch(branch));
    button?.addEventListener('click', () => {
      const openedByHover = branch.dataset.hoverActivated === 'true';
      delete branch.dataset.hoverActivated;
      activateBranch(openedByHover ? branch : (branch.classList.contains('is-active') ? null : branch));
    });
  });

  heroGraph.addEventListener('pointerleave', () => activateBranch(null));
  heroGraph.addEventListener('focusout', (event) => {
    if (!heroGraph.contains(event.relatedTarget)) activateBranch(null);
  });
  heroGraph.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      activateBranch(null);
      heroGraph.querySelector('.graph-main:focus')?.blur();
    }
  });
  activateBranch(null);
}

const networkCanvas = heroGraph?.querySelector('.network-canvas');

if (heroGraph && networkCanvas) {
  const stage = heroGraph.querySelector('.graph-stage');
  const graphCore = heroGraph.querySelector('.graph-core');
  const context = networkCanvas.getContext('2d');
  const reduceGraphMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointData = {
    ha: [-168, -76, 108],
    ai: [168, -74, -92],
    print: [-220, 180, -90],
    games: [155, 108, 102],
    server: [0, -158, -62]
  };
  const pointElements = Object.fromEntries(
    Object.keys(pointData).map((name) => [name, heroGraph.querySelector(`.graph-${name} .graph-main`)])
  );
  const particles = Array.from({ length: 56 }, (_, index) => {
    const seed = (index + 1) * 16807 % 2147483647;
    return [
      ((seed % 997) / 997 - .5) * 520,
      (((seed * 7) % 991) / 991 - .5) * 390,
      (((seed * 13) % 983) / 983 - .5) * 320
    ];
  });
  let graphWidth = 0;
  let graphHeight = 0;
  let rotationX = -.17;
  let rotationY = .26;
  let targetRotationX = rotationX;
  let targetRotationY = rotationY;
  let graphVisible = true;
  let animationFrame = 0;

  const resizeGraph = () => {
    const bounds = stage.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    graphWidth = bounds.width;
    graphHeight = bounds.height;
    networkCanvas.width = Math.round(graphWidth * ratio);
    networkCanvas.height = Math.round(graphHeight * ratio);
    networkCanvas.style.width = `${graphWidth}px`;
    networkCanvas.style.height = `${graphHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const projectPoint = ([x, y, z]) => {
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const turnedX = x * cosY - z * sinY;
    const turnedZ = x * sinY + z * cosY;
    const turnedY = y * cosX - turnedZ * sinX;
    const depth = y * sinX + turnedZ * cosX;
    const scale = 500 / (500 - depth);
    return {
      x: graphWidth * .5 + turnedX * scale,
      y: graphHeight * .47 + turnedY * scale,
      z: depth,
      scale
    };
  };

  const drawLine = (from, to, active, alpha = 1) => {
    const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, `rgba(46,232,196,${active ? .72 * alpha : .17 * alpha})`);
    gradient.addColorStop(1, `rgba(108,255,225,${active ? .35 * alpha : .07 * alpha})`);
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.strokeStyle = gradient;
    context.lineWidth = active ? 1.45 : .8;
    context.setLineDash(active ? [4, 5] : [2, 7]);
    context.stroke();
    context.setLineDash([]);
  };

  const drawHex = (point, radius, alpha) => {
    context.beginPath();
    for (let side = 0; side < 6; side += 1) {
      const angle = Math.PI / 3 * side - Math.PI / 2;
      const x = point.x + Math.cos(angle) * radius;
      const y = point.y + Math.sin(angle) * radius;
      side ? context.lineTo(x, y) : context.moveTo(x, y);
    }
    context.closePath();
    context.strokeStyle = `rgba(46,232,196,${alpha})`;
    context.lineWidth = 1;
    context.stroke();
  };

  const renderGraph = (time = 0) => {
    if (!graphVisible || !graphWidth || !graphHeight) {
      animationFrame = requestAnimationFrame(renderGraph);
      return;
    }
    if (!reduceGraphMotion && !heroGraph.matches(':hover')) {
      targetRotationY = .26 + Math.sin(time * .00022) * .16;
      targetRotationX = -.17 + Math.cos(time * .00018) * .05;
    }
    rotationX += (targetRotationX - rotationX) * .045;
    rotationY += (targetRotationY - rotationY) * .045;
    context.clearRect(0, 0, graphWidth, graphHeight);

    const corePoint = projectPoint([0, 0, 82]);
    const projected = Object.fromEntries(
      Object.entries(pointData).map(([name, point]) => [name, projectPoint(point)])
    );
    const activeBranch = heroGraph.dataset.active || '';
    if (activeBranch) {
      targetRotationX = -.17;
      targetRotationY = .26;
    }
    const meshOrder = ['server', 'ai', 'games', 'print', 'ha'];
    meshOrder.forEach((name, index) => {
      const current = projected[name];
      const next = projected[meshOrder[(index + 1) % meshOrder.length]];
      const meshGradient = context.createLinearGradient(corePoint.x, corePoint.y, current.x, current.y);
      meshGradient.addColorStop(0, 'rgba(46,232,196,.026)');
      meshGradient.addColorStop(1, index % 2 ? 'rgba(103,131,255,.012)' : 'rgba(46,232,196,.006)');
      context.beginPath();
      context.moveTo(corePoint.x, corePoint.y);
      context.lineTo(current.x, current.y);
      context.lineTo(next.x, next.y);
      context.closePath();
      context.fillStyle = meshGradient;
      context.fill();
    });

    [108, 174].forEach((radius, ringIndex) => {
      context.beginPath();
      for (let step = 0; step <= 64; step += 1) {
        const angle = step / 64 * Math.PI * 2 + (reduceGraphMotion ? 0 : time * .000045 * (ringIndex ? -1 : 1));
        const point = projectPoint([
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * .82,
          Math.sin(angle * 2) * (ringIndex ? 42 : 25)
        ]);
        step ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y);
      }
      context.strokeStyle = ringIndex ? 'rgba(117,220,199,.065)' : 'rgba(46,232,196,.11)';
      context.lineWidth = .8;
      context.setLineDash(ringIndex ? [2, 8] : [5, 9]);
      context.stroke();
      context.setLineDash([]);
    });

    particles.forEach((particle, index) => {
      const point = projectPoint(particle);
      const flicker = .035 + ((index % 7) / 7) * .07;
      context.beginPath();
      context.arc(point.x, point.y, Math.max(.45, point.scale * .8), 0, Math.PI * 2);
      context.fillStyle = `rgba(117,220,199,${flicker})`;
      context.fill();
    });

    Object.entries(projected)
      .sort(([, a], [, b]) => a.z - b.z)
      .forEach(([name, point]) => {
        const active = activeBranch === name;
        drawLine(corePoint, point, active, activeBranch && !active ? .32 : 1);
        drawHex(point, 34 * point.scale + (active ? 7 : 0), active ? .42 : .08);
        const element = pointElements[name];
        if (element) {
          element.style.setProperty('--gx', `${point.x}px`);
          element.style.setProperty('--gy', `${point.y}px`);
          element.style.setProperty('--gs', String(Math.max(.76, Math.min(1.18, point.scale))));
          element.style.setProperty('--gblur', `${point.z < -95 ? .45 : 0}px`);
          element.style.zIndex = String(5 + Math.round(point.z / 40));
        }
      });

    if (activeBranch && projected[activeBranch]) {
      const start = projected[activeBranch];
      const stageBox = stage.getBoundingClientRect();
      heroGraph.querySelectorAll(`.graph-${activeBranch} .graph-children a`).forEach((link) => {
        const box = link.getBoundingClientRect();
        drawLine(start, {
          x: box.left - stageBox.left + box.width / 2,
          y: box.top - stageBox.top + box.height / 2
        }, true, .55);
      });
    }

    drawHex(corePoint, 73 * corePoint.scale, .2);
    graphCore.style.setProperty('--core-x', `${corePoint.x}px`);
    graphCore.style.setProperty('--core-y', `${corePoint.y}px`);
    graphCore.style.setProperty('--core-scale', String(Math.max(.88, Math.min(1.12, corePoint.scale))));

    if (!reduceGraphMotion) animationFrame = requestAnimationFrame(renderGraph);
  };

  stage.addEventListener('pointermove', (event) => {
    if (heroGraph.dataset.active) return;
    const bounds = stage.getBoundingClientRect();
    targetRotationY = ((event.clientX - bounds.left) / bounds.width - .5) * .78;
    targetRotationX = (.5 - (event.clientY - bounds.top) / bounds.height) * .46;
  });
  stage.addEventListener('pointerleave', () => {
    targetRotationX = -.17;
    targetRotationY = .26;
  });

  new ResizeObserver(() => {
    resizeGraph();
    if (reduceGraphMotion) renderGraph();
  }).observe(stage);
  new IntersectionObserver(([entry]) => {
    graphVisible = entry.isIntersecting;
  }, { threshold: .05 }).observe(heroGraph);

  resizeGraph();
  renderGraph();
  window.addEventListener('beforeunload', () => cancelAnimationFrame(animationFrame), { once: true });
}
