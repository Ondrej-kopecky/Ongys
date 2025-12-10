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
        // Settings → "Allow using the visitor counter" musí být ON
        const response = await fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.count !== undefined && data.count !== null) {
                // data.count je string, převedeme na číslo
                const count = parseInt(data.count, 10);
                updateVisitorDisplay(formatNumber(count));
                return; // Úspěch - končíme
            }
        } else if (response.status === 403) {
            // Pokud API vrátí 403, counter není zapnutý
            console.log('GoatCounter: Zapni "Allow using the visitor counter" v Settings');
            hideVisitorCounter();
            return;
        }
        
        // Jiná chyba - zobrazíme pomlčku místo skrytí
        updateVisitorDisplay('–');
    } catch (error) {
        console.log('GoatCounter: Counter API není dostupné', error);
        updateVisitorDisplay('–');
    }
}

// Skrýt counter element pokud API nefunguje
function hideVisitorCounter() {
    const updateElement = () => {
        const counter = document.querySelector('.visitor-count');
        if (counter) {
            counter.style.display = 'none';
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateElement);
    } else {
        updateElement();
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
