import "./style.css";

import TodoListClass from "./Components/Todo";
import ProjectClass from "./Components/Project";

import deleteIcon from "./Assets/icons/delete-icon.svg";
import editIcon from "./Assets/icons/edit-icon.svg";
import doneIcon from "./Assets/icons/done-icon.svg";
import addIcon from "./Assets/icons/add-icon.svg";

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

const UI = (() => {
  let current = 0;
  let addFormDisplay = false;

  const _init = () => {
    _render();
    _cacheDOM();
    _bindEvents();
  };

  const _render = () => {
    document.body.innerHTML = "";
    document.body.appendChild(_createAside());
    document.body.appendChild(_createMain());
    document.body.appendChild(_createAddProjectContainer());

    // render projects
    TodoList.projects.forEach((project) => {
      _cacheDOM().projectList.appendChild(_createProject(project));
    });

    // render tasks
    TodoList.projects[current].tasks.forEach((task) => {
      _cacheDOM().taskList.appendChild(_createTask(task));
    });
  };

  const _cacheDOM = () => {
    const projectNameInput = document.querySelector("#projectNameInput");
    const projectAddBtn = document.querySelector("#projectAddBtn");
    const projectList = document.querySelector("#projectList");

    const projectListItem = Array.from(
      document.querySelectorAll(".project-list-item")
    );
    const projectListItemDel = Array.from(
      document.querySelectorAll(".project-list-item-del")
    );
    const projectListItemEdit = Array.from(
      document.querySelectorAll(".project-list-item-edit")
    );
    const projectListItemNameInput = Array.from(
      document.querySelectorAll(".project-list-item-name-input")
    );
    const projectListItemNameBtn = Array.from(
      document.querySelectorAll(".project-list-item-name-btn")
    );

    const taskNameInput = document.querySelector("#taskNameInput");
    const taskAddBtn = document.querySelector("#taskAddBtn");
    const taskList = document.querySelector("#taskList");

    const taskListItem = Array.from(
      document.querySelectorAll(".task-list-item")
    );
    const taskListItemDel = Array.from(
      document.querySelectorAll(".task-list-item-del")
    );
    const taskListItemDone = Array.from(
      document.querySelectorAll(".task-list-item-done")
    );

    const addProjectContainer = document.querySelector("#addPprojectContainer");
    const projectAddFormShow = Array.from(
      document.querySelectorAll(".project-add-form-show")
    );

    return {
      projectNameInput,
      projectAddBtn,
      projectList,

      projectListItem,
      projectListItemDel,
      projectListItemEdit,
      projectListItemNameInput,
      projectListItemNameBtn,

      taskNameInput,
      taskAddBtn,
      taskList,

      taskListItem,
      taskListItemDel,
      taskListItemDone,

      addProjectContainer,
      projectAddFormShow,
    };
  };

  const _bindEvents = () => {
    // change current project
    _cacheDOM().projectListItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        const index = _cacheDOM().projectListItem.indexOf(e.target);
        current = index;
        _init();
      });
    });

    // add project
    _cacheDOM().projectAddBtn.addEventListener("click", () => {
      TodoList.projects.push(
        new ProjectClass(_cacheDOM().projectNameInput.value)
      );
      addFormDisplay === false
        ? (addFormDisplay = true)
        : (addFormDisplay = false);
      _init();
    });

    // delete project
    _cacheDOM().projectListItemDel.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (TodoList.projects.length > 1) {
          const index = _cacheDOM().projectListItemDel.indexOf(e.target);
          index === 0 ? (current = 0) : (current = index - 1);
          _render();
          TodoList.deleteProject(index);
          _init();
        }
      });
    });

    // project turn on edit mode
    // _cacheDOM().projectListItemEdit.forEach((button) => {
    //   button.addEventListener("click", (e) => {
    //     const index = _cacheDOM().projectListItemEdit.indexOf(e.target);
    //     TodoList.projects[index].changeEdit();
    //     console.log(TodoList.projects[index]);
    //     _init();
    //   });
    // });

    // project edit name
    _cacheDOM().projectListItemNameBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = _cacheDOM().projectListItemNameBtn.indexOf(e.target);
        TodoList.projects[index].name =
          _cacheDOM().projectListItemNameInput[index].value;
        TodoList.projects[index].changeEdit();
        _init();
      });
    });

    // add task
    // _cacheDOM().taskAddBtn.addEventListener("click", () => {
    //   TodoList.projects[current].addTask(_cacheDOM().taskNameInput.value);
    //   _init();
    // });

    // delete task
    _cacheDOM().taskListItemDel.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = _cacheDOM().taskListItemDel.indexOf(e.target);
        TodoList.projects[current].deleteTask(index);
        _init();
      });
    });

    // change done task
    _cacheDOM().taskListItemDone.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = _cacheDOM().taskListItemDone.indexOf(e.target);
        TodoList.projects[current].tasks[index].changeDone();
        _init();
      });
    });

    // show add project container
    _cacheDOM().projectAddFormShow.forEach((button) => {
      button.addEventListener("click", () => {
        addFormDisplay === false
          ? (addFormDisplay = true)
          : (addFormDisplay = false);
        _init();
      });
    });
  };

  const _createProject = (project) => {
    const component = document.createElement("li");

    if (project.edit === false) {
      component.innerHTML += `<span class="project-list-item">${project.getName()}</span>`;
      component.innerHTML += `<img src="${editIcon}" class="project-list-item-edit">`;
      component.innerHTML += `<img src="${deleteIcon}" class="project-list-item-del">`;
    } else {
      component.innerHTML = `
      <button type="button" class="project-list-item-edit">EDIT</button>
      <input type="text" class="project-list-item-name-input" value="${project.getName()}">
      <button type="button" class="project-list-item-name-btn">CHANGE</button>
      `;
    }

    return component;
  };

  const _createTask = (task) => {
    const component = document.createElement("li");
    if (task.done === false) {
      component.innerHTML += `<span class="task-list-item">${task.getName()}</span>`;
    } else {
      component.innerHTML += `<span class="task-list-item" style="text-decoration: line-through;">${task.getName()}</span>`;
    }

    component.innerHTML += `<img src="${doneIcon}" class="task-list-item-done">`;
    component.innerHTML += `<img src="${deleteIcon}" class="task-list-item-del">`;

    return component;
  };

  const _createAside = () => {
    const component = document.createElement("aside");
    component.classList = "aside";
    component.innerHTML = `
    <div class="container">
      <span class="heading-l">Projects</span>
      <img src="${addIcon}" class="project-add-form-show">
      </div>
      <ul id="projectList"></ul>
    </div>
    `;
    return component;
  };

  const _createMain = () => {
    const component = document.createElement("main");
    component.classList = "main";
    component.innerHTML = `
    <div class="container">
      <span class="main-header heading-l">Tasks</span>
      <ul id="taskList"></ul>
    </div>
    `;
    return component;
  };

  const _createAddProjectContainer = () => {
    const component = document.createElement("div");
    component.id = "addProjectContainer";
    component.innerHTML = `
    <img src="${deleteIcon}" class="project-add-form-show">
    <form>
      <input type="text" id="projectNameInput" placeholder="e.g. New Project" />
      <button type="button" id="projectAddBtn">ADD PROJECT</button>
    </form>
    `;

    if (!addFormDisplay) {
      component.style.display = "none";
    } else {
      component.style.display = "block";
    }

    return component;
  };

  const _createAddTaskContainer = () => {
    const component = document.createElement("div");
    component.id = "addtaskContainer";
    component.innerHTML = `
    <img src="${deleteIcon}" class="task-add-form-show">
    <form>
      <input type="text" id="taskNameInput" placeholder="e.g. New Project" />
      <button type="button" id="taskAddBtn">ADD PROJECT</button>
    </form>
    `;

    if (!addFormDisplay) {
      component.style.display = "none";
    } else {
      component.style.display = "block";
    }

    return component;
  };

  _init();
})();

// DODAC FORMULARZ DO DODAWANIA TASKOW !!!
