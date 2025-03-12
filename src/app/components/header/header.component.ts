import { Component } from '@angular/core';
import { TodoStore } from 'src/app/store/todo.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public todoStore: TodoStore) { }

  addTask(title: HTMLInputElement){
    if (title.value.trim()) {
      this.todoStore.addTask(title.value.trim());
      title.value = '';
    }
  }

}
