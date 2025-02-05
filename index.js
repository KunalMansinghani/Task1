const inputBox = document.getElementById("inp");
const listBox = document.getElementById("list");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Enter something to add in Bucket !!");
    return;
  }

  createTaskElement(taskText,false);
  saveTasks(); // Save the updated list to localStorage
  inputBox.value = ""; // Clear input field
}

function createTaskElement(taskText, isChecked) {
  let li = document.createElement("li");
  let h2 = document.createElement("h2");
  let span = document.createElement("span");

  h2.innerText = taskText;
  h2.classList.add("task-item");

  span.classList.add("material-symbols-outlined");
  span.innerText = "cancel"; // Add cross icon
  
  // Fix: Proper delete function for both new and existing tasks
  span.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(h2);
  li.appendChild(span);
  li.classList.add("task-item");

  if (isChecked) {
    li.classList.add("checked");
  }
  li.onclick = function (event) {
    if (event.target !== span) {
      li.classList.toggle("checked");
      saveTasks();
    }
  };

  listBox.appendChild(li);
}
// Function to save tasks to localStorage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#list li").forEach(li => {
    tasks.push({
        text: li.querySelector("h2").innerText,
            checked: li.classList.contains("checked")
     });
  });
  localStorage.setItem("bucketList", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem("bucketList")) || [];
  listBox.innerHTML = "";
  savedTasks.forEach(task => createTaskElement(task.text,task.checked));
}
