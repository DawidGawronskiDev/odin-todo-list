import TaskClass from "./Task";

export default class ProjectClass {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.edit = false;
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

  changeEdit() {
    this.edit === false ? (this.edit = true) : (this.edit = false);
  }
}
