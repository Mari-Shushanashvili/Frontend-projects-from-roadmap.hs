document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownOptions = document.getElementById("dropdown-options");
    const items = dropdownOptions.getElementsByClassName("dropdown-item");
  
    // Toggle dropdown open/close and flip arrow
    dropdownBtn.addEventListener("click", () => {
      dropdownOptions.classList.toggle("open"); // Show/hide dropdown options
      dropdownBtn.classList.toggle("open"); // Rotate arrow
    });
  
    // Close dropdown and reset arrow if user clicks outside
    document.addEventListener("click", (event) => {
      if (!dropdownBtn.contains(event.target) && !dropdownOptions.contains(event.target)) {
        dropdownOptions.classList.remove("open");
        dropdownBtn.classList.remove("open"); // Reset arrow direction
      }
    });
  
    // Item selection
    Array.from(items).forEach((item) => {
      item.addEventListener("click", (event) => {
        Array.from(items).forEach((i) => i.classList.remove("selected"));
        event.target.classList.add("selected");
        dropdownBtn.textContent = event.target.textContent;
        
        // Close dropdown and reset arrow after selection
        dropdownOptions.classList.remove("open");
        dropdownBtn.classList.remove("open");
      });
    });
  });
  