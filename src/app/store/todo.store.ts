import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  tasks = signal<Task[]>(this.loadTasks());

  private loadTasks(): Task[] {
    const savedTasks = localStorage.getItem('mydayapp-angular');
    return savedTasks ? JSON.parse(savedTasks) : [];
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem('mydayapp-angular', JSON.stringify(tasks));
  }

  addTask(title: string) {
    this.tasks.update((tasks) => {
      const newTasks = [
        ...tasks,
        { id: Date.now().toString(), title, completed: false },
      ];
      this.saveTasks(newTasks);
      return newTasks;
    });
  }

  toggleTask(id: string) {
    this.tasks.update((tasks) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  updateTask(id: string, title: string) {
    this.tasks.update((tasks) => {
      const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, title } : task));
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  removeTask(id: string) {
    this.tasks.update((tasks) => {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      this.saveTasks(filteredTasks);
      return filteredTasks;
    });
  }

  clearCompleted() {
    this.tasks.update((tasks) => {
      const activeTasks = tasks.filter((task) => !task.completed);
      this.saveTasks(activeTasks);
      return activeTasks;
    });
  }
}
