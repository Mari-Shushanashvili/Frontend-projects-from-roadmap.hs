document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.getElementById("textInput");
    const charCount = document.getElementById("charCount");
    const maxLength = 250;

    textInput.addEventListener("input", function() {
        const currentLength = textInput.value.length;
        charCount.textContent = `${currentLength} / ${maxLength}`;

        if (currentLength >= maxLength) {
            textInput.classList.add("limit-reached");
            charCount.classList.add("limit-reached");
        } else {
            textInput.classList.remove("limit-reached");
            charCount.classList.remove("limit-reached");
        }
    });
});
