import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { TodoStore } from 'src/app/store/todo.store';
import { Task } from 'src/app/models/task.model';
import { CategoryFilter } from 'src/app/models/category-filter.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html'
})
export class MainComponent {
  tasks = this.todoStore.tasks();
  filter = input.required<CategoryFilter>();
  editingTaskId: string = '';
  constructor(public todoStore: TodoStore) {
    effect(() => {
      this.changeFilter();
    });
   }

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

  changeFilter(){
    this.tasks = this.todoStore.tasks().filter((task) => {
      if (this.filter() === 'all') return true;
      if (this.filter() === 'pending') return !task.completed;
      if (this.filter() === 'completed') return task.completed;
      return false;
    });
  }

}
