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

// Updates the document title with task count
function updateDocumentTitle () {
    document.title = "KittyTasker - " + tasks.length + " Tasks";
}

// Intitalise the application
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

    // Log elements to verify selections
    console.log('Form element:', taskForm);
    console.log('Filter buttons:', filterButtons);

    // Update the document title
    updateDocumentTitle();
    
    console.log('KittyTasker app intialised');
}

// Intialise when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
