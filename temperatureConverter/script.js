document.addEventListener("DOMContentLoaded", () => {
    const temperatureInput = document.getElementById("temperature");
    const fromBtn = document.getElementById("from-dropdown-btn");
    const toBtn = document.getElementById("to-dropdown-btn");
    const convertBtn = document.getElementById("submit");
    const resultDiv = document.getElementById("result");

    // Dropdown handling
    const dropdowns = [
        { btn: fromBtn, options: document.getElementById("from-dropdown-options") },
        { btn: toBtn, options: document.getElementById("to-dropdown-options") }
    ];

    dropdowns.forEach(dropdown => {
        const { btn, options } = dropdown;
        const items = options.getElementsByClassName("dropdown-item");

        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllDropdowns();
            options.classList.toggle("open");
        });

        Array.from(items).forEach((item) => {
            item.addEventListener("click", (event) => {
                btn.textContent = event.target.textContent;
                options.classList.remove("open");
                updateConvertButtonState();
            });
        });
    });

    document.addEventListener("click", closeAllDropdowns);

    function closeAllDropdowns() {
        dropdowns.forEach(({ options }) => options.classList.remove("open"));
    }

    // Enable button only if all fields are filled
    function updateConvertButtonState() {
        const temperature = temperatureInput.value.trim();
        const fromUnit = fromBtn.textContent;
        const toUnit = toBtn.textContent;
        convertBtn.disabled = !temperature || fromUnit === "From Unit" || toUnit === "To Unit";
    }

    // Convert button click handler
    convertBtn.addEventListener("click", () => {
        const temperature = parseFloat(temperatureInput.value);
        const fromUnit = fromBtn.textContent;
        const toUnit = toBtn.textContent;
        if (!isNaN(temperature)) {
            const convertedTemp = convertTemperature(temperature, fromUnit, toUnit);
            resultDiv.textContent = `Converted Temperature: ${convertedTemp.toFixed(2)} ${toUnit}`;
        } else {
            resultDiv.textContent = "Please enter a valid number for temperature.";
        }
    });

    // Conversion function
    function convertTemperature(temp, fromUnit, toUnit) {
        if (fromUnit === toUnit) return temp;

        // Celsius to other units
        if (fromUnit === "Celsius") {
            if (toUnit === "Fahrenheit") return (temp * 9/5) + 32;
            if (toUnit === "Kelvin") return temp + 273.15;
        }
        // Fahrenheit to other units
        if (fromUnit === "Fahrenheit") {
            if (toUnit === "Celsius") return (temp - 32) * 5/9;
            if (toUnit === "Kelvin") return (temp - 32) * 5/9 + 273.15;
        }
        // Kelvin to other units
        if (fromUnit === "Kelvin") {
            if (toUnit === "Celsius") return temp - 273.15;
            if (toUnit === "Fahrenheit") return (temp - 273.15) * 9/5 + 32;
        }
        return temp;
    }

    // Attach input event listener for validation
    temperatureInput.addEventListener("input", updateConvertButtonState);
});
