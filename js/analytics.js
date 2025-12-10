// ========================================
// ONGY.CZ - Analytics & Visitor Counter
// Používá GoatCounter (goatcounter.com)
// ========================================

// GoatCounter konfigurace
const GOATCOUNTER_URL = 'https://ongy.goatcounter.com/count';

// Inicializace GoatCounter
(function() {
    // Přeskočit localhost pro testování
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('GoatCounter: Přeskočeno na localhost');
        updateVisitorDisplay('dev');
        return;
    }

    // Načíst GoatCounter skript (oficiální způsob)
    const script = document.createElement('script');
    script.async = true;
    script.src = '//gc.zgo.at/count.js';
    script.dataset.goatcounter = GOATCOUNTER_URL;
    document.head.appendChild(script);

    // Načíst počet návštěv po malém zpoždění
    setTimeout(fetchVisitorCount, 1000);
})();

// Funkce pro načtení počtu návštěv z GoatCounter API
async function fetchVisitorCount() {
    try {
        // GoatCounter poskytuje endpoint pro počet návštěv
        const response = await fetch(`https://ongy.goatcounter.com/counter/${encodeURIComponent(window.location.pathname)}.json`);
        
        if (response.ok) {
            const data = await response.json();
            updateVisitorDisplay(formatNumber(data.count));
        } else {
            // Fallback - zkusit celkový počet
            fetchTotalCount();
        }
    } catch (error) {
        console.log('GoatCounter: Nepodařilo se načíst počet návštěv');
        // Zkusit alternativní způsob
        fetchTotalCount();
    }
}

// Alternativní způsob - celkový počet návštěv
async function fetchTotalCount() {
    try {
        const response = await fetch('https://ongy.goatcounter.com/counter/TOTAL.json');
        if (response.ok) {
            const data = await response.json();
            updateVisitorDisplay(formatNumber(data.count));
        } else {
            updateVisitorDisplay('–');
        }
    } catch (error) {
        updateVisitorDisplay('–');
    }
}

// Aktualizace zobrazení počtu
function updateVisitorDisplay(count) {
    // Počkat na DOM
    const updateElement = () => {
        const element = document.getElementById('visitor-count-number');
        if (element) {
            element.textContent = count;
            element.style.opacity = '1';
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateElement);
    } else {
        // Malé zpoždění pro efekt načítání
        setTimeout(updateElement, 500);
    }
}

// Formátování čísla (1000 -> 1k)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Export pro případné další použití
window.ongyAnalytics = {
    fetchVisitorCount,
    updateVisitorDisplay,
    formatNumber
};
