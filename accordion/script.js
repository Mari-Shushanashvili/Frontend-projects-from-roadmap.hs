document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const openContent = document.querySelector(".accordion-content.active");
            if (openContent && openContent !== this.nextElementSibling) {
                openContent.classList.remove("active");
                openContent.style.display = "none";
            }

            const content = this.nextElementSibling;

            if (content.classList.contains("active")) {
                content.classList.remove("active");
                content.style.display = "none";
            } else {
                content.classList.add("active");
                content.style.display = "block";
            }
        });
    });
});
