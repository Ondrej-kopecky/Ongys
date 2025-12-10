// ========================================
// ONGY.CZ - Analytics & Visitor Counter
// Používá GoatCounter (goatcounter.com)
// ========================================

// GoatCounter konfigurace
const GOATCOUNTER_CODE = 'ongy';

// Inicializace GoatCounter
(function() {
    // Přeskočit localhost pro testování
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('GoatCounter: Přeskočeno na localhost');
        updateVisitorDisplay('dev');
        return;
    }

    // Nastavit goatcounter objekt před načtením skriptu
    window.goatcounter = {
        endpoint: `https://${GOATCOUNTER_CODE}.goatcounter.com/count`,
        allow_local: false
    };

    // Načíst GoatCounter skript
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://${GOATCOUNTER_CODE}.goatcounter.com/count.js`;
    script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
    document.head.appendChild(script);

    // Pro počet návštěv: GoatCounter vyžaduje zapnutí "Allow public access to counter API"
    // v Settings. Pokud není zapnuto, zobrazí se "–"
    setTimeout(fetchVisitorCount, 1500);
})();

// Funkce pro načtení počtu návštěv z GoatCounter API
async function fetchVisitorCount() {
    try {
        // GoatCounter veřejný counter endpoint (musí být zapnutý v Settings)
        const response = await fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/${encodeURIComponent(window.location.pathname)}.json`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.count !== undefined) {
                updateVisitorDisplay(formatNumber(data.count));
                return;
            }
        }
        // Fallback - zkusit celkový počet
        await fetchTotalCount();
    } catch (error) {
        console.log('GoatCounter: Counter API není veřejně přístupné (zapněte v Settings → Allow public access to counter API)');
        updateVisitorDisplay('✓');
    }
}

// Alternativní způsob - celkový počet návštěv
async function fetchTotalCount() {
    try {
        const response = await fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`);
        if (response.ok) {
            const data = await response.json();
            if (data.count !== undefined) {
                updateVisitorDisplay(formatNumber(data.count));
                return;
            }
        }
        updateVisitorDisplay('✓');
    } catch (error) {
        updateVisitorDisplay('✓');
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
