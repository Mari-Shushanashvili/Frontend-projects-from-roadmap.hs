document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Add Task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = "";
      }
    });
  
    function addTask(text, isCompleted = false) {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      if (isCompleted) taskItem.classList.add("completed");
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      checkbox.checked = isCompleted;
      checkbox.addEventListener("change", () => toggleTaskCompletion(taskItem, checkbox.checked));
  
      const taskName = document.createElement("span");
      taskName.textContent = text;
      taskName.classList.add("task-name");
  
      const taskActions = document.createElement("div");
      taskActions.classList.add("task-actions");
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => taskItem.remove());
  
      taskActions.appendChild(deleteBtn);
  
      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskName);
      taskItem.appendChild(taskActions);
  
      if (isCompleted) {
        taskList.appendChild(taskItem); // Completed tasks go to the end
      } else {
        taskList.insertBefore(taskItem, taskList.firstChild); // Pending tasks go to the top
      }
    }
  
    function toggleTaskCompletion(taskItem, isCompleted) {
      taskItem.classList.toggle("completed", isCompleted);
      const checkbox = taskItem.querySelector(".checkbox");
  
      if (isCompleted) {
        taskList.appendChild(taskItem); // Move completed tasks to the end
      } else {
        taskList.insertBefore(taskItem, taskList.firstChild); // Move pending tasks to the top
      }
    }
  });
  