const clockElem = document.querySelector("#clock");
const dateElem = document.querySelector("#date");

const city = "Ivano-Frankivsk";
const apiKey = "code";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById("city").textContent = `City: ${cityName}`;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${temperature}°C`;
    document.getElementById("weatherIcon").src = weatherIcon;
  })
  .catch((error) => {
    console.error("Weather request error:", error);
  });

function updateClock() {
  const currentTime = new Date();
  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let s = currentTime.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  const clockTime = `${h}:${m}:${s}`;
  clockElem.textContent = clockTime;
}

function updateDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Додаємо нуль перед однозначним місяцем
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  dateElem.textContent = formattedDate;
}

updateClock();
updateDate();
setInterval(updateClock, 1000);
setInterval(updateDate, 1000);

function addTask() {
  let taskInput = document.querySelector("#taskInput");

  if (taskInput.value.trim() !== "") {
    let task = {
      text: taskInput.value,
      completed: false,
    };

    saveTask(task);

    displayTask(task);
    taskInput.value = "";
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let existingTaskIndex = tasks.findIndex((t) => t.text === task.text);

  if (existingTaskIndex !== -1) {
    tasks[existingTaskIndex] = task;
  } else {
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let taskList = document.querySelector("#todoList");
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(displayTask);
}

function displayTask(task) {
  let taskList = document.querySelector("#todoList");
  let li = document.createElement("li");
  li.style.display = "flex";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.width = "15px";
  checkbox.style.height = "15px";
  checkbox.style.marginRight = "5px";
  li.appendChild(checkbox);

  let div = document.createElement("div");
  div.style.textAlign = "left";
  div.style.setProperty("word-wrap", "break-word");
  div.style.overflow = "hidden";
  div.style.textOverflow = "ellipsis";
  div.style.flexGrow = "1";
  div.appendChild(document.createTextNode(task.text));
  li.appendChild(div);

  let deleteButton = document.createElement("button");
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.style.marginLeft = "10px";
  deleteButton.onclick = function () {
    li.remove();
    removeTask(task);
  };
  li.appendChild(deleteButton);

  taskList.appendChild(li);

  checkbox.checked = task.completed;

  div.addEventListener("click", function () {
    checkbox.checked = !checkbox.checked;
    updateTextDecoration();
  });

  checkbox.addEventListener("change", function () {
    updateTextDecoration();
  });

  function updateTextDecoration() {
    div.style.textDecoration = checkbox.checked ? "line-through" : "none";
    task.completed = checkbox.checked;
    task.textDecorationStyle = div.style.textDecoration;
    saveTask(task);
  }
  div.style.textDecoration = task.textDecorationStyle || "none";
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== task.text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function () {
  loadTasks();
};
