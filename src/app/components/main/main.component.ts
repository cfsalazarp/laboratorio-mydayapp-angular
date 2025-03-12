import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoStore } from 'src/app/store/todo.store';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html'
})
export class MainComponent {
  tasks = this.todoStore.tasks();
  editingTaskId: string = '';
  constructor(public todoStore: TodoStore) { }

  toggleTask(task: Task){
    this.todoStore.toggleTask(task.id);
  }

  editTask(task: Task){
    this.editingTaskId = task.id;
  }

  updateTask(task: Task, newTitle: string){
    if (newTitle.trim()) {
      this.todoStore.updateTask(task.id, newTitle.trim());
      this.editingTaskId = '';
    }
  }

  removeTask(task: Task){
    this.todoStore.removeTask(task.id);
  }

}
