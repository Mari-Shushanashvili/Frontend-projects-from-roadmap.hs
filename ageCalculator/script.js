document.getElementById("ageForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const birthdateInput = document.getElementById("birthdate").value;

    // Ensure a date is entered
    if (!birthdateInput) {
        document.getElementById("result").innerText = "Please enter a valid date.";
        return;
    }

    // Parse birthdate from the input (ISO format)
    const birthdate = luxon.DateTime.fromISO(birthdateInput);
    if (!birthdate.isValid) {
        document.getElementById("result").innerText = "Invalid date format. Please try again.";
        return;
    }

    // Calculate and display age
    const { years, months, days } = luxon.DateTime.now().diff(birthdate, ["years", "months", "days"]).toObject();
    document.getElementById("result").innerText = 
        `You are ${Math.floor(years)} years, ${Math.floor(months)} months, and ${Math.floor(days)} days old.`;
});
