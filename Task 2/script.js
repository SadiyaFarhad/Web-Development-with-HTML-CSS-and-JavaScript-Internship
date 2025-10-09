const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const downloadExcelBtn = document.getElementById('downloadExcel');
const downloadTasksExcelBtn = document.getElementById('downloadTasksExcel');

// ------------------- Save contact data -------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = '⚠️ Please fill out all fields.';
    formMessage.style.color = 'red';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = '❌ Invalid email format.';
    formMessage.style.color = 'red';
    return;
  }

  let contactEntries = JSON.parse(localStorage.getItem('contactEntries')) || [];
  contactEntries.push({
    Name: name,
    Email: email,
    Message: message,
    SubmittedAt: new Date().toLocaleString()
  });

  localStorage.setItem('contactEntries', JSON.stringify(contactEntries));
  formMessage.textContent = '✅ Saved locally!';
  formMessage.style.color = 'green';
  form.reset();
});

// ------------------- Export ONLY contact form data to Excel -------------------
downloadExcelBtn.addEventListener('click', () => {
  const contacts = JSON.parse(localStorage.getItem('contactEntries')) || [];

  if (contacts.length === 0) {
    alert("No contact data found to export!");
    return;
  }

  const wb = XLSX.utils.book_new();
  const wsContacts = XLSX.utils.json_to_sheet(contacts);
  XLSX.utils.book_append_sheet(wb, wsContacts, "Contacts");

  XLSX.writeFile(wb, "Contact_Form_Data.xlsx");
});

// ------------------- Export ONLY tasks to Excel (separate button) -------------------
downloadTasksExcelBtn.addEventListener('click', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks.length === 0) {
    alert("No tasks found to export!");
    return;
  }

  const formattedTasks = tasks.map((t) => ({ Task: t.text }));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedTasks, { header: ["Task"] });
  XLSX.utils.book_append_sheet(wb, ws, "Tasks");

  XLSX.writeFile(wb, "ToDoList.xlsx");
});

// ------------------- To-do list handling -------------------
const addTaskBtn = document.getElementById('addTask');
const newTaskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');

window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(task.text));
});

addTaskBtn.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') return;
  createTaskElement(taskText);
  saveTask(taskText);
  newTaskInput.value = '';
});

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', () => {
    li.remove();
    removeTask(taskText);
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
