// Function to load tasks from local storage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
};

// Function to add a task to the DOM
const addTaskToDOM = (task) => {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = `${task.name} (Due: ${task.dueDate}, Category: ${task.category})`;
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        removeTaskFromStorage(task);
        updateTaskCount(); // Update task count after deletion
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
};

// Function to save a task to local storage
const saveTaskToStorage = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to remove a task from local storage
const removeTaskFromStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.name !== task.name || t.dueDate !== task.dueDate);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to update task count
const updateTaskCount = () => {
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    taskCount.textContent = `Total Tasks: ${taskList.children.length}`;
};

// Event listener for adding a task
document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const categoryInput = document.getElementById('category');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        name: taskInput.value,
        dueDate: dueDateInput.value,
        category: categoryInput.value
    };

    addTaskToDOM(task);
    saveTaskToStorage(task);
    taskInput.value = '';
    dueDateInput.value = '';
    categoryInput.value = 'General';

    updateTaskCount(); // Update task count after adding a task
});

// Load tasks on page load
window.onload = () => {
    loadTasks();
    updateTaskCount(); // Update task count on page load
};

// Dark mode toggle functionality
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});