export class Item {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "active";
        this.idItem;
    };

    setUpTitle(newTitle) {
        this.title = newTitle;
    };

    setUpDescription(newDescription) {
        this.description = newDescription;
    };

    setUpdueDate(newDueDate) {
        this.dueDate = newDueDate;
    };

    setUpPriority(priority) {
        this.priority = priority;
    };

    setUpStatus(status) {
        this.status = status;
    }

};


export class Project {
    constructor (name, date, priority) {
        this.name = name;
        this.list = [];
        this.followItems = 0;
        this.date = date;
        this.priority = priority;
        this.status = "active";
    };

    addItem(item) {
        this.list.push(item);
        this.followItems ++;
        item.idItem = this.followItems;
    };

    getItem() {
        return this.list;
    };

    removeItem(itemToRemove) {
        const newList = this.list.filter((item) => item.idItem !== itemToRemove.idItem);
        this.list = newList;
    };

    checkStatus() {
        let checkStatus = "done";
        for (let item of this.list) {
            if(item.status === "active") {
                checkStatus = "active";
            };
        };
        this.status = checkStatus;
    }; 
};

//Add project to localStorage
export function saveProject(project) {
    localStorage.setItem(project.name, JSON.stringify(project));
};

//Delete project from localStorage
export function deleteProject(project) {
    localStorage.removeItem(project);
};


//Retreive project from localStorage 
function getProject(project) {
    const projectRetrieve = JSON.parse(localStorage.getItem(project));
    return projectRetrieve;
};

//Giving method back to object after retreiving them
function addMethodBack(project) {
    const setUpProject = new Project(project.name);
    setUpProject.list = project.list;
    setUpProject.followItems = project.followItems;
    setUpProject.date = project.date;
    setUpProject.priority = project.priority;
    setUpProject.status = project.status;
    return setUpProject;
};

//retreive project  and add method back
export function foundProject(project) {
    const fullProject = addMethodBack(getProject(project));
    return fullProject;
};
