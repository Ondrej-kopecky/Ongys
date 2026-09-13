(() => {
  const counter = document.getElementById('visitor-count-number');
  if (!counter) return;

  const local = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (local) {
    counter.textContent = '—';
    return;
  }

  window.goatcounter = {
    endpoint: 'https://ongy.goatcounter.com/count',
    allow_local: false
  };

  const tracker = document.createElement('script');
  tracker.async = true;
  tracker.src = 'https://gc.zgo.at/count.js';
  tracker.dataset.goatcounter = 'https://ongy.goatcounter.com/count';
  document.head.appendChild(tracker);

  const wrap = counter.closest('.visitor-count');
  fetch('/stats/total.json')
    .catch(() => fetch('https://ongy.goatcounter.com/counter/TOTAL.json'))
    .then((response) => response.ok ? response.json() : Promise.reject())
    .then((data) => {
      if (!data.count) return;
      const value = Number.parseInt(data.count, 10);
      counter.textContent = Number.isFinite(value)
        ? new Intl.NumberFormat('cs-CZ').format(value)
        : data.count;
    })
    .catch(() => {
      if (wrap) wrap.hidden = true;
    });
})();
