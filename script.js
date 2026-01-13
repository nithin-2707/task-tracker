const input = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const list = document.getElementById('taskList')
const taskCountEl = document.querySelector('.task-count')
const dateEl = document.getElementById('currentDate')

let tasks = []

function loadTasks() {
  const saved = localStorage.getItem('tasks')
  if (saved) {
    try {
      tasks = JSON.parse(saved)
    } catch (e) {
      tasks = []
    }
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const now = new Date()
  dateEl.textContent = months[now.getMonth()] + ' ' + now.getFullYear()
}

function updateCount() {
  taskCountEl.textContent = '(' + tasks.length + ')'
}

function render() {
  list.innerHTML = ''
  updateCount()
  
  tasks.forEach((t, i) => {
    const item = document.createElement('div')
    item.className = 'task-item'
    
    const left = document.createElement('div')
    left.className = 'task-left'
    
    const num = document.createElement('div')
    num.className = 'task-number'
    num.textContent = String(i + 1).padStart(2, '0')
    
    const text = document.createElement('div')
    text.className = 'task-text' + (t.done ? ' completed' : '')
    text.textContent = t.title
    
    left.appendChild(num)
    left.appendChild(text)
    
    const right = document.createElement('div')
    right.className = 'task-right'
    
    const status = document.createElement('div')
    status.className = 'task-status ' + (t.done ? 'completed' : 'pending')
    status.textContent = t.done ? 'Completed' : 'Pending'
    
    const toggle = document.createElement('button')
    toggle.className = 'task-toggle'
    toggle.innerHTML = t.done ? '↺' : '✓'
    toggle.addEventListener('click', (e) => {
      e.stopPropagation()
      tasks[i].done = !tasks[i].done
      saveTasks()
      render()
    })
    
    right.appendChild(status)
    right.appendChild(toggle)
    
    item.appendChild(left)
    item.appendChild(right)
    list.appendChild(item)
  })
}

function addTask() {
  const val = input.value.trim()
  if (!val) return
  tasks.push({title: val, done: false})
  input.value = ''
  saveTasks()
  render()
}

addBtn.addEventListener('click', addTask)

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTask()
  }
})

loadTasks()
updateDate()
render()
