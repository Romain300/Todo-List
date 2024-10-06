import { saveProject } from "./logic";
import { deleteProject } from "./logic";
import { foundProject } from "./logic";
import { Project } from "./logic";
import { Item } from "./logic";


const firstProject = new Project("First Project", "12/12/2024", "low Priority");
const secondProjcet = new Project("Second Project", "24/12/2024", "Urgent");

const item1 = new Item("Project Proposal", "Draft a proposal for the new project.", "2024-10-15", "high");
const item2 = new Item("Budget Review", "Review the budget for Q4.", "2024-10-20", "medium");
const item3 = new Item("Team Meeting", "Schedule a team meeting to discuss progress.", "2024-10-10", "low");
const item4 = new Item("Client Feedback", "Gather feedback from the client on the last deliverable.", "2024-10-25", "high");

firstProject.addItem(item1);
firstProject.addItem(item2);
secondProjcet.addItem(item3);
secondProjcet.addItem(item4);

saveProject(firstProject);
saveProject(secondProjcet);

//Display projects list inside the navBar
function displayListProjects() {
    const activeProjects = document.querySelector("#active-projects");
    const closedProjects = document.querySelector("#closed-projects");
    activeProjects.textContent = "";
    closedProjects.textContent = "";
    
    for (let i = 0; i < localStorage.length; i++) {
        const fullProject = foundProject(localStorage.key(i));
        const projectDiv = document.createElement("li");
        projectDiv.textContent = fullProject.name;
        if (fullProject.status === "active") {
            activeProjects.appendChild(projectDiv);
        } else {
            closedProjects.appendChild(projectDiv);
        };   
    };
};

//Display card-project
export function displayCardProjects() {
    const content = document.querySelector(".content");
    content.textContent = "";

    const pageTitle = document.createElement("div");
    pageTitle.classList.add("title-content");
    content.appendChild(pageTitle)

    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("my-projects");
    projectsContainer.id = "my-projects";
    content.appendChild(projectsContainer)

    pageTitle.textContent = "My Projects";
    for(let i = 0; i < localStorage.length; i++) {
        const fullProject = foundProject(localStorage.key(i));

        const tasks = fullProject.list;
        const listTasks = document.createElement("ul");

        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectsContainer.appendChild(projectCard);

        const projectTitle = document.createElement("div");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = fullProject.name;
        projectCard.appendChild(projectTitle);

        const projectDueDate = document.createElement("div");
        projectDueDate.classList.add("project-due-date");
        projectDueDate.textContent = fullProject.date;
        projectCard.appendChild(projectDueDate);

        const projectPriority = document.createElement("div");
        projectPriority.classList.add("project-priority");
        projectPriority.textContent = fullProject.priority;
        projectCard.appendChild(projectPriority);

        const projectStatus = document.createElement("div");
        projectStatus.classList.add("project-status");
        projectStatus.textContent = fullProject.status;
        projectCard.appendChild(projectStatus);

        const taskDiv = document.createElement("div");
        taskDiv.textContent = "Tasks:";
        projectCard.appendChild(taskDiv);

        projectCard.appendChild(listTasks);

        for (let task of tasks) {
            const taskLi = document.createElement("li");
            taskLi.textContent = task.title; 
            listTasks.appendChild(taskLi);
         };

         const divButton = document.createElement("div");
         const buttonView = document.createElement("button");
         buttonView.classList.add("view-button");
         buttonView.dataset.projectname = fullProject.name;
         buttonView.textContent = "View/Modify";
         divButton.appendChild(buttonView);
         projectCard.appendChild(divButton);
    };

    viewProject();
    displayListProjects();
};

//Create new project
export function newProject() {
    const projectForm = document.querySelector("form");
    const projectTitle = document.querySelector("#name-project");
    const projectDueDate = document.querySelector("#due-date");
    const projectPriority = document.querySelector("#priority");
    
    projectForm.addEventListener("submit", (event) => {
        if (projectTitle.value === "" || projectPriority.value === "Select Priority" || projectDueDate === "") {
            alert("Please fill the required fields");
        } else {
            const newProject = new Project(projectTitle.value, projectDueDate.value, projectPriority.value);
            saveProject(newProject);
            projectForm.reset();

            displayCardProjects();
            alert("Your project has been created")  
        }
        event.preventDefault();
    });
};


function displayProject(project) {
    const content = document.querySelector(".content");
    const dialog = document.querySelector("dialog");
    dialog.textContent = "";
    const addTaskSectionTitle = document.createElement("div"); 
    addTaskSectionTitle.classList.add("title-section");
    addTaskSectionTitle.textContent = "Add Task";
    dialog.appendChild(addTaskSectionTitle);
    
    
    //Cleaning page content and set it up
    content.textContent = "";
    
    const fullProject = foundProject(project);
    const pageTitle = document.createElement("div");
    pageTitle.classList.add("title-content");
    pageTitle.textContent = fullProject.name;
    content.appendChild(pageTitle)

    const projectContenair = document.createElement("div");
    projectContenair.classList.add("individual-project");
    content.appendChild(projectContenair);
    

    //Filling content with project's details
    const projectContent = document.createElement("div");
    projectContent.classList.add("details-project");
    projectContenair.appendChild(projectContent);

    //container with date and priority project
    const datePriorityProject = document.createElement("div");
    datePriorityProject.classList.add("date-priority-project");
    projectContenair.appendChild(datePriorityProject);
    const priorityProject = document.createElement("div");
    priorityProject.textContent = fullProject.priority;
    const buttonAddTask = document.createElement("button");
    buttonAddTask.classList.add("add-task");
    buttonAddTask.dataset.projectname = fullProject.name;
    buttonAddTask.textContent = "Add Task";
    const buttonDeleteProject = document.createElement("button");
    buttonDeleteProject.classList.add("delete-project");
    buttonDeleteProject.dataset.projectname = fullProject.name;
    buttonDeleteProject.textContent = "Delete Project";
    const dueDateProject = document.createElement("div");
    dueDateProject.textContent = fullProject.date;
    datePriorityProject.appendChild(priorityProject);
    datePriorityProject.appendChild(buttonAddTask);
    datePriorityProject.appendChild(buttonDeleteProject);
    datePriorityProject.appendChild(dueDateProject);

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    projectContenair.appendChild(tasksContainer);

    //Loop to append tasks in the tasks container
    const taskList = fullProject.list;
    for(let task of taskList) {
        const detailsTask = document.createElement("div");
        detailsTask.classList.add("details-task");
        tasksContainer.appendChild(detailsTask);

        const infoTask = document.createElement("div");
        infoTask.classList.add("info-task");
        detailsTask.appendChild(infoTask);
        const taskName = document.createElement("div");
        taskName.classList.add("task-name");
        taskName.textContent = task.title;
        const taskPriority = document.createElement("div");
        taskPriority.textContent = `Priority: ${task.priority}`;
        const taskDueDate = document.createElement("div");
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;
        infoTask.appendChild(taskName);
        infoTask.appendChild(taskPriority);
        infoTask.appendChild(taskDueDate);

        const taskDesCheck = document.createElement("ul");
        taskDesCheck.classList.add("tasks");
        detailsTask.appendChild(taskDesCheck);
        const taskDescription = document.createElement("li");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = task.description;
        taskDesCheck.appendChild(taskDescription);

        const checkTaskDiv = document.createElement("li");
        taskDesCheck.appendChild(checkTaskDiv);
        const checkForm = document.createElement("form");
        checkTaskDiv.appendChild(checkForm);
        const labelInputDiv = document.createElement("div");
        checkForm.appendChild(labelInputDiv);
        const labelCheck = document.createElement("label");
        labelCheck.textContent = "Task Done:";
        labelInputDiv.appendChild(labelCheck);
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("check-task");
        labelInputDiv.appendChild(checkBox);

        //checking task status
        if (task.status === "active") {
            
            checkBox.checked = false;
        } else {
            checkBox.checked = true;
        };

        //function to change task status
        checkBox.addEventListener("click", () => {
            if(checkBox.checked === true) {
                task.status = "done";
                fullProject.checkStatus();
                saveProject(fullProject);
            } else {
                task.status = "active";
                fullProject.checkStatus();
                saveProject(fullProject);
            };
        });

    };

    removeProject();
    createTaskForm();
    displayDialog();
    addTask(fullProject);  
};

function viewProject() {
    const viewsButtons = document.querySelectorAll(".view-button");
    if (viewsButtons) {
        viewsButtons.forEach((button) => {
            button.addEventListener("click", () => {
                displayProject(button.dataset.projectname);
            })

        })
    }
}

export function backToMenu() {
    const buttonMenu = document.querySelector("#button-menu");
    buttonMenu.addEventListener("click", () => {
        displayCardProjects();
    });
};

function removeProject() {
    const deleteButton = document.querySelector(".delete-project");
    deleteButton.addEventListener("click", () => {
        const project = deleteButton.dataset.projectname;
        deleteProject(project);
        displayCardProjects();
    });
};

function addTask(project) { //check this function when task is added, it moxed up with other project
    const addTaskForm = document.querySelector("#task-form");
    const taskName = document.querySelector("#name-task");
    const taskDescription  = document.querySelector("#task-description");
    const dueDate = document.querySelector("#due-date-task");
    const priorityTask = document.querySelector("#priority-task");
    const dialog = document.querySelector("dialog");

    //Add Event Listener 
    const newEvent = (event) => {
        
        if(taskName.value === "" || taskDescription.value === "" || dueDate.value === "" || priorityTask.value === "Select Priority") {
            alert("Please fill the required fields")
            
        } else {
            const newTask = new Item(taskName.value, taskDescription.value, dueDate.value, priorityTask.value);
            project.addItem(newTask);
            saveProject(project);
            alert("Your new task has been added");
            dialog.close();
            displayProject(project.name); 
            addTaskForm.reset();
        };

        event.preventDefault();
    };
    
    addTaskForm.addEventListener("submit", newEvent)
};

function displayDialog() {
    const addTaskForm = document.querySelector("#task-form");
    const displayButton = document.querySelector(".add-task");
    const dialog = document.querySelector("dialog");
    const cancelButton = document.querySelector("#close-dialog");
    displayButton.addEventListener("click", () => {
        dialog.showModal();
    });

    cancelButton.addEventListener("click", () => {
        addTaskForm.reset();
        dialog.close();
    })
};


function createTaskForm() {
    const dialog = document.querySelector("dialog");
    const form = document.createElement('form');
    form.id = 'task-form';
    form.method = 'post';

    // Task Name
    const taskNameDiv = document.createElement('div');
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'name-task');
    taskNameLabel.textContent = 'Task:';
    const taskNameInput = document.createElement('input');
    taskNameInput.id = 'name-task';
    taskNameInput.type = 'text';
    taskNameInput.placeholder = 'Task name';
    taskNameDiv.appendChild(taskNameLabel);
    taskNameDiv.appendChild(taskNameInput);
    form.appendChild(taskNameDiv);

    // Task Description
    const taskDescriptionDiv = document.createElement('div');
    const taskDescriptionLabel = document.createElement('label');
    taskDescriptionLabel.setAttribute('for', 'task-description');
    taskDescriptionLabel.textContent = 'Description:';
    const taskDescriptionTextarea = document.createElement('textarea');
    taskDescriptionTextarea.id = 'task-description';
    taskDescriptionDiv.appendChild(taskDescriptionLabel);
    taskDescriptionDiv.appendChild(taskDescriptionTextarea);
    form.appendChild(taskDescriptionDiv);

    // Due Date
    const dueDateDiv = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'due-date-task');
    dueDateLabel.textContent = 'Due Date:';
    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'due-date-task';
    dueDateInput.type = 'date';
    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDateInput);
    form.appendChild(dueDateDiv);

    // Priority
    const priorityDiv = document.createElement('div');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority-task');
    priorityLabel.textContent = 'Priority:';
    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority-task';
    
    const priorities = [
        { value: '', text: 'Select Priority', disabled: true, selected: true },
        { value: 'High Priority', text: 'High Priority' },
        { value: 'Medium Priority', text: 'Medium Priority' },
        { value: 'Low Priority', text: 'Low Priority' },
        { value: 'No priority', text: 'No priority' }
    ];
    
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority.value;
        option.textContent = priority.text;
        if (priority.disabled) option.disabled = true;
        if (priority.selected) option.selected = true;
        prioritySelect.appendChild(option);
    });

    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(prioritySelect);
    form.appendChild(priorityDiv);

    // Button Dialog
    const buttonDialogDiv = document.createElement('div');
    buttonDialogDiv.className = 'button-dialog';
    
    const createTaskButton = document.createElement('button');
    createTaskButton.id = 'create-task';
    createTaskButton.type = 'submit';
    createTaskButton.textContent = 'Create Task';

    const cancelButton = document.createElement('button');
    cancelButton.id = 'close-dialog';
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';

    buttonDialogDiv.appendChild(createTaskButton);
    buttonDialogDiv.appendChild(cancelButton);
    form.appendChild(buttonDialogDiv);

    // Append form to body or a specific container
    dialog.appendChild(form);
};
