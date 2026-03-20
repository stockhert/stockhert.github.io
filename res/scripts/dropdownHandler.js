const airports = {
    "ARN": "Stockholm Arlanda Airport",
    "DAM": "Damascus International Airport",
    "IST": "Istanbul Airport",
    "DXB": "Dubai International Airport",
    "BEY": "Beirut–Rafic Hariri International Airport",
}

const connections = {
    ARN: ["DAM", "IST", "DXB", "BEY"],
    DAM: ["ARN"],
    IST: ["ARN"],
    DXB: ["ARN"],
    BEY: ["ARN"],
}

const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const fromList = document.getElementById('fromList');
const toList = document.getElementById('toList');

function showResults(input, list, items) {
    const val = input.value.toLowerCase();
    list.innerHTML = '';

    if (!val) {
        list.classList.remove('active');
        return;
    }

    const filtered = Object.entries(items).filter(([code, name]) =>
        name.toLowerCase().includes(val) || code.toLowerCase().includes(val)
    );

    if (filtered.length > 0) {
        list.classList.add('active');
        filtered.forEach(([code, name]) => {
            const li = document.createElement('li');
            li.textContent = `${name} (${code})`;
            li.onclick = () => {
                input.value = code;
                list.classList.remove('active');
                if(input === fromInput) toInput.value = '';
            };
            list.appendChild(li);
        });
    } else {
        list.classList.remove('active');
    }
}

fromInput.addEventListener('input', () => {
    showResults(fromInput, fromList, airports);
});

toInput.addEventListener('input', () => {
    const startAirport = fromInput.value.toUpperCase();
    const availableCodes = connections[startAirport] || [];

    const availableAirports = {};
    availableCodes.forEach(code => {
        availableAirports[code] = airports[code];
    });

    showResults(toInput, toList, availableAirports);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.input-group')) {
        fromList.classList.remove('active');
        toList.classList.remove('active');
    }
});