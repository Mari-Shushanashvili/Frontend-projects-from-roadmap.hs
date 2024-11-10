document.addEventListener("DOMContentLoaded", () => {
    const addLaneButton = document.getElementById("addLaneButton");
    const addSubredditModal = document.getElementById("addSubredditModal");
    const addSubredditBtn = document.getElementById("addSubredditBtn");
    const subredditInput = document.getElementById("subredditInput");
    const laneContainer = document.getElementById("laneContainer");
  
    // Open the modal when the "+" button is clicked
    addLaneButton.addEventListener("click", () => {
      addSubredditModal.style.display = "flex";
    });
  
    // Close the modal when clicking outside of it
    window.addEventListener("click", (event) => {
      if (event.target === addSubredditModal) {
        addSubredditModal.style.display = "none";
      }
    });
  
    // Add subreddit lane when the "Add Subreddit" button is clicked in the modal
    addSubredditBtn.addEventListener("click", () => {
      const subredditName = subredditInput.value.trim();
      if (subredditName) {
        addSubredditLane(subredditName); // Add new lane with subreddit posts
        subredditInput.value = ""; // Clear the input
        addSubredditModal.style.display = "none"; // Close the modal
      }
    });
  
    // Function to create a new subreddit lane
    function addSubredditLane(subreddit) {
      const lane = document.createElement("div");
      lane.classList.add("lane");
  
      // Add lane structure: title, ellipsis menu, options menu, and post list
      lane.innerHTML = `
        <h2>${subreddit} <span class="ellipsis">...</span></h2>
        <div class="options-menu">
          <button class="refreshBtn">Refresh</button>
          <button class="deleteBtn">Delete</button>
        </div>
        <ul></ul>
      `;
      laneContainer.appendChild(lane);
  
      // Get references to the ellipsis and options menu
      const ellipsis = lane.querySelector(".ellipsis");
      const optionsMenu = lane.querySelector(".options-menu");
  
      // Toggle display of options menu when ellipsis is clicked
      ellipsis.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        optionsMenu.style.display = optionsMenu.style.display === "block" ? "none" : "block";
      });
  
      // Close the options menu when clicking outside of it
      document.addEventListener("click", () => {
        optionsMenu.style.display = "none";
      });
  
      // Add event listener to delete button to remove the lane
      lane.querySelector(".deleteBtn").addEventListener("click", () => lane.remove());
  
      // Add event listener to refresh button to fetch subreddit posts again
      lane.querySelector(".refreshBtn").addEventListener("click", () => fetchSubredditPosts(subreddit, lane.querySelector("ul")));
  
      // Initial fetch of subreddit posts for the new lane
      fetchSubredditPosts(subreddit, lane.querySelector("ul"));
    }
  
    // Function to fetch posts from a subreddit and display them in the lane
    async function fetchSubredditPosts(subreddit, postList) {
      // Show a loading message while fetching data
      postList.innerHTML = "<li>Loading...</li>";
      try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        if (!response.ok) throw new Error("Subreddit not found");
        
        const data = await response.json();
        postList.innerHTML = ""; // Clear the loading message
  
        // Loop through each post and create a list item for it
        data.data.children.forEach((post) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>^ ${post.data.ups}</strong> 
            <a href="https://reddit.com${post.data.permalink}" target="_blank">${post.data.title}</a>
          `;
          postList.appendChild(listItem); // Append each post to the list
        });
      } catch (error) {
        // Show an error message if fetching fails
        postList.innerHTML = "<li>Failed to load posts.</li>";
      }
    }
  });
  