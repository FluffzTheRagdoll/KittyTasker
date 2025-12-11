/**
 * KittyTasker - A cute and useful to-do list app for cat lovers!
 * 
 * This JavaScript file contains the funcationality for the KittyTasker to-do list app!
 * It allows users to create, mark complete and delete tasks.
 */

console.log('KittyTasker app intitalises now!');

// Global variables for application state
var tasks = [];
var currentFilter = "all";

// Global variables for DOM elements
var taskForm;
var taskInput;
var taskPriority;
var taskDate;
var taskList;
var itemsLeft;
var filterButtons;

/**
 * Updates the document title with task count
 */
function updateDocumentTitle () {
    if(tasks.length === 1){
        document.title = "KittyTasker - " + tasks.length + " Task";
    } else {
        document.title = "KittyTasker - " + tasks.length + " Tasks";
    }
}

/**
 * Updates the displayed task count
 */
function updateTaskCount() {
    itemsLeft.textContent = tasks.length;
    updateDocumentTitle();
}

/**
 * Validates task description
 * @param {string} description - The task description to validate
 * @returns {boolean} - Whether the description is valid
 */
function isValidTaskDescription(description) {
    return description !== '' && description.length >= 3;
}

/**
 * Creates a new task object
 * @param {string} description - The task description
 * @param {string} priority - The task priority
 * @param {string} date - The due date for the task
 * @returns {Object} - The new task object 
 */
function createTaskObject(description, priority, date) {
    return {
        id: Date.now(),
        description: description,
        priority: priority,
        date: date,
        completed: false
    }  
    
}

/**
 * Handle task form submission
 * @param {Event} e - The form submission event
 */
function handleFormSubmit(e) {
    // Prevent the default form submission
    e.preventDefault();

    // Get form data
    var description = taskInput.value.trim();
    var priority = taskPriority.value;
    var date = taskDate.value;

    // Validate description
    if(!isValidTaskDescription(description)) {
        alert('Please enter a valid task description (at least 3 characters)');
        taskInput.focus();
        return;
    }

    // Create new task object
    var newTask = createTaskObject(description, priority, date);

    // Add to tasks array
    tasks.push(newTask);

    // Update the UI
    updateTaskCount();

    console.log('Task added:', newTask);
    console.log('Total tasks:', tasks.length)

    // Reset form
    taskForm.reset();
}

/**
 * Initialise the application
 */
function initApp() {
    console.log('Intialising KittyTasker app.');

    // Select form elements
    taskForm = document.getElementById('task-form');
    taskInput = document.getElementById('task-input');
    taskPriority = document.getElementById('task-priority');
    taskDate = document.getElementById('task-date');

    // Select task list elements
    taskList = document.getElementById('task-list');
    itemsLeft = document.getElementById('items-left');

    // Select filter buttons
    filterButtons = document.querySelectorAll('.filter-btn');

    // Add event listeners
    taskForm.addEventListener('submit', handleFormSubmit);

    // Update the document title
    updateDocumentTitle();
    
    console.log('KittyTasker app intialised');
}

// Intialise when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
