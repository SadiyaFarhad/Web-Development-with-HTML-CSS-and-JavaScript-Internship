// To-do app with localStorage and Excel export
const taskForm = document.getElementById('taskForm');
const newTask = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const downloadTasks = document.getElementById('downloadTasks');

function renderTasks(){
  taskList.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${t.text}</span><div><button data-i="${i}" class="del">Delete</button></div>`;
    taskList.appendChild(li);
  });
  document.querySelectorAll('.del').forEach(btn=> btn.addEventListener('click', (e)=>{
    const idx = +e.target.dataset.i;
    removeTask(idx);
  }));
}

function saveTask(text){
  const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
  tasks.push({text});
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function removeTask(idx){
  let tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
  tasks.splice(idx,1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

taskForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const v = newTask.value.trim();
  if(!v) return;
  saveTask(v);
  newTask.value='';
});

downloadTasks.addEventListener('click', ()=>{
  const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
  if(tasks.length===0){ alert('No tasks to export'); return; }
  const formatted = tasks.map(t=> ({Task: t.text}));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formatted, {header:['Task']});
  XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
  XLSX.writeFile(wb, 'Tasks.xlsx');
});

// initial render
renderTasks();