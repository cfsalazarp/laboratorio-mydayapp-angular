import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoStore } from 'src/app/store/todo.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  constructor(public todoStore: TodoStore) {}

  remainingTasksCount(): number {
    return this.todoStore.tasks().filter(task => !task.completed).length;
  }

  hasCompletedTasks(): boolean{
    return this.todoStore.tasks().some(task => task.completed);
  }

  clearCompleted(){
    this.todoStore.clearCompleted();
  }
}
