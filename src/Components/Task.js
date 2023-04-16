export default class TaskClass {
  constructor(name) {
    this.name = name;
    this.done = false;
  }

  getName() {
    return this.name;
  }

  getDone() {
    return this.done;
  }

  changeDone() {
    this.done === false ? (this.done = true) : (this.done = false);
  }
}
