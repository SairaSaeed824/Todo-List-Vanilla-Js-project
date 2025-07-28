

const addbutton = document.querySelector(".addbtn");
const input = document.getElementById("text-bar");
const list = document.getElementById("tasklist");
const form = document.getElementById("inputtext");


function createTask(text, checked = false) {
  if (checked) {
    completeTask(text, checked);
    return;
  }

  const li = document.createElement("li");
  const newtextDiv = document.createElement("div");
  newtextDiv.style.width = "170px";
  newtextDiv.textContent = text;

  const newbtndiv = document.createElement("div");
  newbtndiv.className = "Btncontainer";

  const editbtn = document.createElement("button");
  editbtn.innerHTML = '<img src="pencil.png" height="17" width="20">';
  editbtn.style.cursor = "pointer";
  editbtn.style.backgroundColor = "white";
  editbtn.style.border = "0px";
  editbtn.style.padding = "0px";
  newbtndiv.appendChild(editbtn);

  editbtn.addEventListener("click", function () {
    const newText = prompt("Edit your task", newtextDiv.textContent);
    if (newText === "") {
      alert("You have not edit anything!");
    }
    if (newText != null && newText.trim() !== "") {
      newtextDiv.textContent = newText.trim();
      savelocalStorage();
    }
  });

  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  newtextDiv.style.whiteSpace = "normal";
  newtextDiv.style.wordWrap = "break-word";
  newtextDiv.style.flex = "1";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      li.remove();
      completeTask(newtextDiv.textContent, true);
    }
    savelocalStorage();
  });

  const dltbtn = document.createElement("button");
  dltbtn.innerHTML = '<img src="delete.png" height="17" width="15">';
  dltbtn.style.backgroundColor = "white";
  dltbtn.style.border = "0px";
  dltbtn.style.cursor = "pointer";
  dltbtn.addEventListener("click", function () {
    li.remove();
    savelocalStorage();
  });

  newbtndiv.appendChild(dltbtn);

  li.appendChild(checkbox);
  li.appendChild(newtextDiv);
  li.appendChild(newbtndiv);

  list.appendChild(li);
  savelocalStorage();
}


function completeTask(text, checked = true) {
  const completedList = document.getElementById("completed-tasklist");

  const li = document.createElement("li");
  const newtextDiv = document.createElement("div");
  newtextDiv.style.width = "170px";
  newtextDiv.textContent = text;
  newtextDiv.style.textDecoration = "line-through";
  newtextDiv.style.color = "grey";

  const newbtndiv = document.createElement("div");
  newbtndiv.className = "Btncontainer";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = true;

  checkbox.addEventListener("change", function () {
    if (!checkbox.checked) {
      li.remove();
      createTask(text, false);
    }
    savelocalStorage();
  });

  const dltbtn = document.createElement("button");
  dltbtn.innerHTML = '<img src="delete.png" height="17" width="15">';
  dltbtn.style.backgroundColor = "white";
  dltbtn.style.border = "0px";
  dltbtn.style.cursor = "pointer";
  dltbtn.addEventListener("click", function () {
    li.remove();
    savelocalStorage();
  });

  newbtndiv.appendChild(dltbtn);

  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  newtextDiv.style.whiteSpace = "normal";
  newtextDiv.style.wordWrap = "break-word";
  newtextDiv.style.flex = "1";

  li.appendChild(checkbox);
  li.appendChild(newtextDiv);
  li.appendChild(newbtndiv);

  completedList.appendChild(li);
  savelocalStorage();
}


function savelocalStorage() {
  let tasksArray = [];
  const tasks = document.querySelectorAll("#tasklist li, #completed-tasklist li");
  tasks.forEach((li) => {
    const taskContent = li.querySelector("div").textContent;
    const checkbox = li.querySelector("input[type='checkbox']");
    const checked = checkbox.checked;
    tasksArray.push({ text: taskContent, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}


window.onload = function () {
  let saveTask = JSON.parse(localStorage.getItem("tasks"));
  if (!saveTask) saveTask = [];

  saveTask.forEach(function (task) {
    if (task.checked) {
      completeTask(task.text, task.checked);
    } else {
      createTask(task.text, task.checked);
    }
  });
};


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newText = input.value.trim();
  if (newText !== "") {
    createTask(newText, false);
    input.value = "";
  }
});
