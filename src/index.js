import "./style.css";

class TodoList {
  constructor() {
    this.projects = [];
  }

  getProjects() {
    return this.projects;
  }

  printProjects() {
    console.table(this.getProjects());
  }

  addProject(name) {
    this.projects.push(new Project(name));
  }

  getProject(name) {
    return this.projects.find((project) => project.name === name);
  }

  printProject(name) {
    console.log(this.getProject(name));
  }

  getProjectIndex(name) {
    return this.projects.indexOf(
      this.projects.find((project) => project.name === name)
    );
  }

  printProjectIndex(name) {
    console.log(this.getProjectIndex(name));
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  getName() {
    return this.name;
  }

  printName() {
    console.log(this.getName());
  }

  addTask(name) {
    this.tasks.push(new Task(name));
  }

  getTasks() {
    return this.tasks;
  }

  printTasks() {
    console.table(this.getTasks());
  }

  getTask(name) {
    return this.tasks.find((task) => task.name === name);
  }

  printTask(name) {
    console.log(this.getTask(name));
  }
}

class Task {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  printName() {
    console.log(this.getName());
  }
}

class UI {
  constructor() {
    this.currentProject = 0;
  }

  createAside() {
    const aside = document.createElement("aside");
    aside.innerHTML = `
    <form>
        <input 
            type="text" 
            id="projectNameInput"
        >
        <button 
            type="button"
            id="projectAddButton"
        >Add Project</button>
    </form>

    <ul id="projectsList">
    
    </ul>
    `;

    return aside;
  }

  appendAside() {
    document.body.appendChild(this.createAside());
  }

  createMain() {
    const main = document.createElement("main");
    main.innerHTML = `

    <ul id="tasksList">
    
    </ul>
    `;

    return main;
  }

  appendMain() {
    document.body.appendChild(this.createMain());
  }

  createProject(name) {
    return `
    <li class="projects-list-item">
    ${name}
    </li>`;
  }

  renderProjects(TodoList) {
    this.cacheDOM().projectsList.innerHTML = "";
    TodoList.projects.forEach((project) => {
      this.cacheDOM().projectsList.innerHTML += this.createProject(
        project.getName()
      );
    });

    this.cacheDOM();
  }

  changeCurrentProject(TodoList, index) {
    this.currentProject = index;
    this.renderTasks(TodoList);
  }

  createTask(name) {
    return `
    <li class="tasks-list-item">
    ${name}
    </li>`;
  }

  renderTasks(TodoList) {
    this.cacheDOM().tasksList.innerHTML = "";
    TodoList.projects[this.currentProject].tasks.forEach((task) => {
      this.cacheDOM().tasksList.innerHTML += this.createTask(task.getName());
    });

    this.cacheDOM();
  }

  cacheDOM() {
    const projectNameInput = document.querySelector("#projectNameInput");
    const projectAddButton = document.querySelector("#projectAddButton");
    const projectsList = document.querySelector("#projectsList");
    const projectsListItems = Array.from(
      document.querySelectorAll(".projects-list-item")
    );
    const tasksList = document.querySelector("#tasksList");
    const tasksListItems = Array.from(
      document.querySelectorAll(".tasks-list-item")
    );

    return {
      projectNameInput,
      projectAddButton,
      projectsList,
      projectsListItems,
      tasksList,
      tasksListItems,
    };
  }

  eventListeners(TodoList) {
    // ADD PROJECT VIA FORM
    this.cacheDOM().projectAddButton.addEventListener("click", () => {
      TodoList.addProject(this.cacheDOM().projectNameInput.value);
      this.renderProjects(TodoList);
      this.eventListeners(TodoList);
    });
    // CHANGE TASKS WHEN YOU CLICK DIFFERENT PROJECT
    this.cacheDOM().projectsListItems.forEach((project) => {
      project.addEventListener("click", (e) => {
        const index = this.cacheDOM().projectsListItems.indexOf(e.target);
        this.changeCurrentProject(TodoList, index);
      });
    });

    this.cacheDOM();
  }
}

const newUI = new UI();

(function init() {
  const newTodoList = new TodoList();
  newTodoList.addProject("Gym");
  newTodoList.addProject("Home");
  newTodoList.addProject("Work");

  // GYM TASKS
  newTodoList.projects[newTodoList.getProjectIndex("Gym")].addTask(
    "Bench Press"
  );
  newTodoList.projects[newTodoList.getProjectIndex("Gym")].addTask(
    "Barbell Squat"
  );
  newTodoList.projects[newTodoList.getProjectIndex("Gym")].addTask("Deadlift");

  // HOME TASKS
  newTodoList.projects[newTodoList.getProjectIndex("Home")].addTask("Cleaning");
  newTodoList.projects[newTodoList.getProjectIndex("Home")].addTask(
    "Washing Dishes"
  );
  newTodoList.projects[newTodoList.getProjectIndex("Home")].addTask("Hovering");

  // WORK TASKS
  newTodoList.projects[newTodoList.getProjectIndex("Work")].addTask("DELLs");
  newTodoList.projects[newTodoList.getProjectIndex("Work")].addTask(
    "ThinkPads"
  );
  newTodoList.projects[newTodoList.getProjectIndex("Work")].addTask("Lenovos");

  newUI.appendAside();
  newUI.appendMain();
  newUI.cacheDOM();

  newUI.renderProjects(newTodoList);
  newUI.renderTasks(newTodoList);

  newUI.eventListeners(newTodoList);
})();
