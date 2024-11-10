document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("languageSelect");
    const message = document.getElementById("message");
    const repoInfo = document.getElementById("repoInfo");
    const repoName = document.getElementById("repoName");
    const repoDescription = document.getElementById("repoDescription");
    const repoStars = document.getElementById("repoStars");
    const repoForks = document.getElementById("repoForks");
    const repoIssues = document.getElementById("repoIssues");
    const refreshButton = document.getElementById("refreshButton");
    const retryButton = document.getElementById("retryButton");
  
    languageSelect.addEventListener("change", () => {
      const language = languageSelect.value;
      if (language) {
        fetchRandomRepo(language);
      } else {
        showMessage("Please select a language");
      }
    });
  
    refreshButton.addEventListener("click", () => {
      const language = languageSelect.value;
      if (language) {
        fetchRandomRepo(language);
      }
    });
  
    retryButton.addEventListener("click", () => {
      const language = languageSelect.value;
      if (language) {
        fetchRandomRepo(language);
      }
    });
  
    function showMessage(text) {
      message.textContent = text;
      message.classList.remove("hidden");
      repoInfo.classList.add("hidden");
      retryButton.classList.add("hidden");
    }
  
    function showLoading() {
      showMessage("Loading, please wait...");
    }
  
    function showError() {
      message.classList.add("hidden");
      repoInfo.classList.add("hidden");
      retryButton.classList.remove("hidden");
    }
  
    async function fetchRandomRepo(language) {
      showLoading();
      try {
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);
        if (!response.ok) throw new Error("Failed to fetch data");
  
        const data = await response.json();
        const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
  
        displayRepo(randomRepo);
      } catch (error) {
        showError();
      }
    }
  
    function displayRepo(repo) {
      repoName.textContent = repo.name;
      repoDescription.textContent = repo.description || "No description available";
      repoStars.textContent = `★ ${repo.stargazers_count}`;
      repoForks.textContent = `Forks: ${repo.forks_count}`;
      repoIssues.textContent = `Open Issues: ${repo.open_issues_count}`;
  
      message.classList.add("hidden");
      repoInfo.classList.remove("hidden");
      retryButton.classList.add("hidden");
    }
  });
  