import "./style.css";

class TodoListClass {
  constructor() {
    this.projects = [];
  }

  addProject(name) {
    this.projects.push(new ProjectClass(name));
  }

  deleteProject(index) {
    this.projects.splice(index, 1);
  }

  getProjects() {
    return this.projects;
  }

  printProjects() {
    console.table(this.projects);
  }
}

class ProjectClass {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(name) {
    this.tasks.push(new TaskClass(name));
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  getName() {
    return this.name;
  }

  getTasks() {
    return this.tasks;
  }

  printTasks() {
    console.log(this.getTasks());
  }
}

class TaskClass {
  constructor(name) {
    this.name = name;
    this.done = false;
  }

  getName() {
    return this.name;
  }
}

const TodoList = new TodoListClass();
TodoList.addProject("Home");
TodoList.addProject("Work");
TodoList.addProject("Gym");

TodoList.projects[0].addTask("Washing");
TodoList.projects[0].addTask("Cleaning");
TodoList.projects[0].addTask("Cooking");

TodoList.projects[1].addTask("DELL");
TodoList.projects[1].addTask("ThinkPad");
TodoList.projects[1].addTask("Lenovo");

TodoList.projects[2].addTask("Barbell press");
TodoList.projects[2].addTask("Dumbell press");
TodoList.projects[2].addTask("Squat");

TodoList.printProjects();

const UI = (() => {
  let currentProject = 0;

  const _init = () => {
    _cacheDOM();
    _render();
    _bindEvents();
  };

  const _cacheDOM = () => {
    const projectNameInput = document.querySelector("#projectNameInput");

    const projectAddButton = document.querySelector("#projectAddButton");

    const projectsList = document.querySelector("#projectsList");

    const projectListItems = Array.from(
      document.querySelectorAll(".projects-list-item")
    );

    const tasksList = document.querySelector("#tasksList");

    const tasksListItems = Array.from(
      document.querySelectorAll(".tasks-list-item")
    );

    const projectsListItemDelete = Array.from(
      document.querySelectorAll(".projects-list-item-delete")
    );

    const tasksListItemDelete = Array.from(
      document.querySelectorAll(".tasks-list-item-delete")
    );

    const taskNameInput = document.querySelector("#taskNameInput");

    const taskAddButton = document.querySelector("#taskAddButton");

    const tasksListItemDone = Array.from(
      document.querySelectorAll(".tasks-list-item-done")
    );

    return {
      projectNameInput,

      projectAddButton,

      projectsList,

      projectListItems,

      tasksList,

      tasksListItems,

      projectsListItemDelete,

      tasksListItemDelete,

      taskNameInput,

      taskAddButton,

      tasksListItemDone,
    };
  };

  const _render = () => {
    document.body.innerHTML = "";

    // render aside
    document.body.appendChild(_createAside());

    // render projects
    TodoList.getProjects().forEach((project) => {
      _cacheDOM().projectsList.appendChild(_createProject(project));
    });

    // render main
    document.body.appendChild(_createMain());

    // render tasks
    TodoList.projects[currentProject]
      .getTasks()
      .forEach((task) => _cacheDOM().tasksList.appendChild(_createTask(task)));

    _cacheDOM();
  };

  const _bindEvents = () => {
    // add project
    _cacheDOM().projectAddButton.addEventListener("click", () => {
      if (_cacheDOM().projectNameInput.value === "") {
        alert("You must name your project!");
      } else {
        TodoList.addProject(_cacheDOM().projectNameInput.value);
      }
      _init();
    });

    // delete project
    _cacheDOM().projectsListItemDelete.forEach((button) => {
      button.addEventListener("click", (e) => {
        // this logic doesnt make sense but works
        if (TodoList.projects.length > 1) {
          const index = _cacheDOM().projectsListItemDelete.indexOf(e.target);
          TodoList.deleteProject(index);
          _init();
        } else {
          alert("You can delete project only if there is more than one");
        }
      });
    });

    // add task
    _cacheDOM().taskAddButton.addEventListener("click", () => {
      TodoList.projects[currentProject].addTask(
        _cacheDOM().taskNameInput.value
      );
      _init();
    });

    // delete task
    _cacheDOM().tasksListItemDelete.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = _cacheDOM().tasksListItemDelete.indexOf(e.target);
        TodoList.projects[currentProject].deleteTask(index);
        _init();
      });
    });

    // change projects
    _cacheDOM().projectListItems.forEach((project) => {
      project.addEventListener("click", (e) => {
        const index = _cacheDOM().projectListItems.indexOf(e.target);
        currentProject = index;
        _init();
      });
    });

    // change done
    _cacheDOM().tasksListItemDone.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = _cacheDOM().tasksListItemDone.indexOf(e.target);

        //  i need to fix this retared shit
        TodoList.projects[currentProject].tasks[index].done === false
          ? (TodoList.projects[currentProject].tasks[index].done = true)
          : (TodoList.projects[currentProject].tasks[index].done = false);

        console.log(TodoList.projects[currentProject].tasks[index].done);

        _init();
      });
    });
  };

  const _createAside = () => {
    const aside = document.createElement("aside");
    aside.innerHTML = `
      <form>
        <input type="text" id="projectNameInput">
        <button type="button" id="projectAddButton">ADD PROJECT</button>
      </form>
      <ul id="projectsList"></ul>
    `;
    return aside;
  };

  const _createProject = (project) => {
    const component = document.createElement("li");
    component.innerHTML = `
      <span class="projects-list-item">${project.getName()}</span>
      <button type="button" class="projects-list-item-delete">X</button>
    `;

    return component;
  };

  const _createMain = () => {
    const main = document.createElement("main");
    main.innerHTML = `
    <form>
        <input type="text" id="taskNameInput">
        <button type="button" id="taskAddButton">ADD TASK</button>
      </form>
      <ul id="projectsList"></ul>
      <ul id="tasksList"></ul>
    `;
    return main;
  };

  const _createTask = (task) => {
    const component = document.createElement("li");

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.classList = "tasks-list-item-done";
    doneBtn.innerHTML = "DONE?";
    component.appendChild(doneBtn);

    const name = document.createElement("span");
    name.classList = "tasks-list-item";
    name.innerHTML = task.getName();
    if (task.done === true) {
      name.style.textDecoration = "line-through";
    } else {
      name.style.textDecoration = "none";
    }

    component.appendChild(name);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList = "tasks-list-item-delete";
    deleteBtn.innerHTML = "X";
    component.appendChild(deleteBtn);

    return component;
  };

  _init();
})();
