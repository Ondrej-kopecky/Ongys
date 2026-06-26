// ========================================
// ONGY.CZ - Diagram Zoom
// Klik na inline SVG diagram → fullscreen overlay (mobil i desktop)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const diagrams = document.querySelectorAll('.zoomable-diagram');
    if (!diagrams.length) return;

    let overlay = null;

    function close() {
        if (!overlay) return;
        overlay.remove();
        overlay = null;
        document.body.style.overflow = '';
    }

    function open(svg) {
        close();
        overlay = document.createElement('div');
        overlay.className = 'diagram-zoom-overlay';

        const inner = document.createElement('div');
        inner.className = 'diagram-zoom-inner';

        const clone = svg.cloneNode(true);
        clone.removeAttribute('style');
        inner.appendChild(clone);

        const hint = document.createElement('div');
        hint.className = 'diagram-zoom-hint';
        hint.textContent = 'Klikni nebo Esc pro zavření · prsty lze přiblížit';

        overlay.appendChild(inner);
        overlay.appendChild(hint);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', close);
    }

    diagrams.forEach((wrap) => {
        const svg = wrap.querySelector('svg');
        if (!svg) return;
        wrap.style.cursor = 'zoom-in';
        wrap.addEventListener('click', () => open(svg));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
});
