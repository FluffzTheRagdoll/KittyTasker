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

    if(tasks.length === 1) {
        itemsLeft.textContent = `${tasks.length} item left`;
    } else {
        itemsLeft.textContent = `${tasks.length} items left`;
    }
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
 * Renders a single task element
 * @param {Object} taskData - The task data object
 * @returns {HTMLElement} - The created task list item
 */
function renderTaskElement(taskData) {
  // Crete the list item element
  var li = document.createElement('li');
  li.className = 'task-item';


  // Add the priority class
  li.classList.add('task-item-' + taskData.priority);

  // Create and add the checkbox
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  li.appendChild(checkbox);

  // Create and add content container
  var content = document.createElement('div');
  content.className = 'task-content';

  // Add task title
  var title = document.createElement('p');
  title.className = 'task-text';
  title.textContent = taskData.description;
  content.appendChild(title);

  // Add task details
  var details = document.createElement('small');
  details.className = 'task-details';
  details.textContent = 'Priority: ' + taskData.priority + ' | Due: ' + taskData.date;
  content.appendChild(details);
  
  // Add content to the list item
  li.appendChild(content);

  // Add delete button
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  li.appendChild(deleteBtn);

  return li;
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

    // Render the new task
    renderTasks();

    // Reset form
    taskForm.reset();
 }

/**
 * Renders all tasks in the tasks array
 */
function renderTasks() {
  // Clear exisiting tasks from the DOM
  taskList.innerHTML = '';

  // Render each task
  for (var i = 0; i < tasks.length; i++) {
    var taskElement = renderTaskElement(tasks[i]);
    taskList.appendChild(taskElement);
  }

  // Update task count
  updateTaskCount();
}

/**
 * Handle filter button clicks
 * @param {Event} e - The click event
 */
function handleFilterClick(e) {
    // Check if a fliter button was clicked
    if(e.target.classList.contains('filter-btn')) {
        // Get the filter type from the data-filter attribute
        var filterType = e.target.getAttribute('data-filter');

        // Update the current filter
        currentFilter = filterType;

        // Update the active class on filter buttons
        for (var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].classList.remove('active');
        }
        e.target.classList.add('active');

        console.log('Filter changed to: ', filterType);

        // Actual filtering coming soon
    }
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
    document.querySelector('nav').addEventListener('click', handleFilterClick);

    // Render tasks (will be empty intially)
    renderTasks();

    // Update the document title
    updateDocumentTitle();
    console.log('KittyTasker app intialised');
}

// Intialise when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
