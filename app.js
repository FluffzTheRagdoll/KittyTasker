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
 * Gets today's date formatted for HTML date input (YYYY-MM-DD)
 */
function getFormattedToday() {
  var today = new Date();

  // Get year, month and dy components
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // Months are 0-based
  var day = today.getDate();

  // Pad month and day with leading zeros if needed
  if(month < 10) {
    month = '0' + month;
  }

  if(day < 10) {
    day = '0' + day;
  }

  // Return formatted string (YYYY-MM-DD)
  return year + '-' + month + '-' + day;
}

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
 * Validates a task to ensure it meets requirements
 * @param {string} description - The task description
 * @param {string} date - The due date
 * @returns {Array} - Array of error messages (empty if valid)
 */
function validateTask(description, date) {
  var errors = [];

  // Description validation
  if(!description) {
    errors.push('Task description is required');
  } else if(description.length < 3) {
    errors.push('Task description must be at least 3 characters long');
  }

  // Date validation
  if(!date) {
    errors.push('Due date is required');
  } else {
    var today = getFormattedToday();
    if(date < today) {
      errors.push('Due date cannot be in the past');
    }
  }

  return errors;
}

/**
 * Removes a task
 * @param {number} taskId - The ID of the task to remove
 */
function removeTask(taskId) {
  // Find all tasks except the one to remove
  var newTasks = [];
  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].id !== taskId) {
      newTasks.push(tasks[i]);
    }
  }

  // Update tasks array
  tasks = newTasks;

  // Log the change
  console.log('Task removed!');

  // Re-render tasks to update the UI
  renderTasks();
}

/**
 * Adds a new task
 * @param {string} description - The task description
 * @param {string} priority - The task priority
 * @param {string} date - The due date
 */
function addTask(description, priority, date) {
  // Validate task
  var errors = validateTask(description, date);
  if(errors.length > 0) {
    formError.textContent = errors.join('. ');
    formError.style.display = 'block';
    return false;
  }

  // Clear previous errors
  formError.textContent = '';
  formError.style.display = 'none';

  // Create new task object
  var newTask = {
    id: Date.now(),
    description: description,
    priority: priority,
    date: date,
    completed: false
  };

  // Add to tasks array
  tasks.push(newTask);

  // Render all tasks
  renderTasks();

  // Show confirmation
  console.log('Task added successfully!');

  return true;
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
    };
}

/**
 * Renders a single task element
 * @param {Object} taskData - The task data object
 * @returns {HTMLElement} - The created task list item
 */
function renderTaskElement(taskData) {
  // Create the list item element
  var li = document.createElement('li');
  li.className = 'task-item';

  // Add data-id attribute to connect element with task data
  li.setAttribute('data-id', taskData.id);

  // Add the priority class
  li.classList.add('task-item-' + taskData.priority);

  // Add completed class if task is completed
  if(taskData.completed) {
    li.classList.add('task-completed');
  }

  // Create and add the checkbox with checked status
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = taskData.completed;
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

    // Add task
    var success = addTask(description, priority, date);

    // Reset form if successful
    if(success) {
      resetFormWithCleanup();
    }
}

/**
 * Resets the form and clears error messages
 */
function resetFormWithCleanup() {
  // Reset the form
  taskForm.reset();

  // Set the date field back to today's date
  taskDate.value = getFormattedToday();

  // Clear any errors
  formError.textContent = '';
  formError.style.display = 'none';

  // Focus back on the input
  taskInput.focus();
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
 * Finds a task by its ID
 * @param {number} taskId - The ID to search for
 * @returns {Object|null} - The found task or null
 */
function findTaskById(taskId) {
  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].id === taskId) {
      return tasks[i];
    }
  }
  return null;
}

/**
 * Toggles a task's completion status
 * @param {number} taskId - The ID  of the task toggle
 */
function toggleTaskComplete(taskId) {
  // Find task by ID
  var task = findTaskById(taskId);

  if(task) {
    // Toggle completion status
    task.completed = !task.completed;

    // Log the change
    console.log(task.completed ? 'Task marked complete!' : 'Task marked incomplete!');

    // Re-render tasks to update the UI
    renderTasks();
  }
}

/**
 * Handle task list interactions
 * @param {Event} e - The click event
 */
function handleTaskListClick(e) {
  console.log('Task list clicked:', e.target);

  // Find the closest task item
  var taskItem = e.target;
  while(taskItem && !taskItem.classList.contains('task-item')) {
    taskItem = taskItem.parentElement;
  }

  // Return if no task item found
  if(!taskItem) return;

  // Get task ID
  var taskId = parseInt(taskItem.getAttribute('data-id'));
  console.log('Clicked task ID:', taskId);

  // Check which element was clicked
  if(e.target.classList.contains('task-checkbox')) {
    // Checkbox clicked
    toggleTaskComplete(taskId);
  } else if(e.target.classList.contains('delete-btn')) {
    // Delete button clicked
    if(confirm('Are you sure you want to delete this task?')) {
      removeTask(taskId);
    }
  }
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
    formError = document.getElementById('form-error');

    // Hide the form error box initially
    formError.style.display = 'none';

    // Select task list elements
    taskList = document.getElementById('task-list');
    itemsLeft = document.getElementById('items-left');

    // Select all filter buttons
    filterButtons = document.querySelectorAll('.filter-btn');

    // Set default date to today
    taskDate.value = getFormattedToday();

    // Add event listeners
    taskForm.addEventListener('submit', handleFormSubmit);
    document.querySelector('nav').addEventListener('click', handleFilterClick);
    taskList.addEventListener('click', handleTaskListClick);

    // Render tasks (will be empty intially)
    renderTasks();

    // Update the document title
    updateDocumentTitle();
    console.log('KittyTasker app intialised');
}

// Intialise when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
