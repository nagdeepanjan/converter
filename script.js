const conversions = {
    distance: {
        base: 'm',
        units: {
            m: 1,
            km: 1000,
            ft: 0.3048,
            mi: 1609.34,
        },
        convert: function(value, from, to) {
            if (from === to) return value;
            const valueInMeters = value * this.units[from];
            return valueInMeters / this.units[to];
        }
    },
    weight: {
        base: 'g',
        units: {
            g: 1,
            kg: 1000,
            lb: 453.592,
            oz: 28.3495,
        },
        convert: function(value, from, to) {
            if (from === to) return value;
            const valueInGrams = value * this.units[from];
            return valueInGrams / this.units[to];
        }
    },
    temperature: {
        convert: function(value, from, to) {
            if (from === to) return value;

            let valueInCelsius;

            // Convert input to Celsius
            switch (from) {
                case 'c':
                    valueInCelsius = value;
                    break;
                case 'f':
                    valueInCelsius = (value - 32) * 5 / 9;
                    break;
                case 'k':
                    valueInCelsius = value - 273.15;
                    break;
            }

            // Convert from Celsius to target unit
            switch (to) {
                case 'c':
                    return valueInCelsius;
                case 'f':
                    return (valueInCelsius * 9 / 5) + 32;
                case 'k':
                    return valueInCelsius + 273.15;
            }
        }
    }
};

function setupConverter(ids) {
    const input1 = document.getElementById(ids.input1);
    const select1 = document.getElementById(ids.select1);
    const input2 = document.getElementById(ids.input2);
    const select2 = document.getElementById(ids.select2);
    const convertFunc = ids.convert;

    function update(source) {
        if (source === 'input1') {
            const val = parseFloat(input1.value);
            if (isNaN(val)) {
                input2.value = '';
                return;
            }
            const result = convertFunc(val, select1.value, select2.value);
            input2.value = result.toFixed(3);
        } else if (source === 'input2') {
            const val = parseFloat(input2.value);
            if (isNaN(val)) {
                input1.value = '';
                return;
            }
            const result = convertFunc(val, select2.value, select1.value);
            input1.value = result.toFixed(3);
        }
    }

    input1.addEventListener('input', () => update('input1'));
    select1.addEventListener('change', () => update('input1'));
    input2.addEventListener('input', () => update('input2'));
    select2.addEventListener('change', () => update('input2'));
}

document.addEventListener('DOMContentLoaded', () => {
    setupConverter({
        input1: 'dist-input1',
        select1: 'dist-select1',
        input2: 'dist-input2',
        select2: 'dist-select2',
        convert: conversions.distance.convert.bind(conversions.distance)
    });

    setupConverter({
        input1: 'weight-input1',
        select1: 'weight-select1',
        input2: 'weight-input2',
        select2: 'weight-select2',
        convert: conversions.weight.convert.bind(conversions.weight)
    });

    setupConverter({
        input1: 'temp-input1',
        select1: 'temp-select1',
        input2: 'temp-input2',
        select2: 'temp-select2',
        convert: conversions.temperature.convert.bind(conversions.temperature)
    });

    const cards = document.querySelectorAll('.converter-card');

    cards.forEach(clickedCard => {
        clickedCard.addEventListener('click', () => {
            cards.forEach(card => {
                card.classList.remove('border-primary-500');
                card.classList.add('border-gray-800');
            });
            clickedCard.classList.remove('border-gray-800');
            clickedCard.classList.add('border-primary-500');
        });
    });
});
