import ProjectClass from "./Project";

export default class TodoListClass {
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
}
