import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryFilter } from 'src/app/models/category-filter.model';
import { TodoStore } from 'src/app/store/todo.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  public filterSelected: CategoryFilter = 'all';

  constructor(public todoStore: TodoStore, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.filterSelected = p['filter'] || 'all';
    });
  }

  remainingTasksCount(): number {
    return this.todoStore.tasks().filter((task) => !task.completed).length;
  }

  hasCompletedTasks(): boolean {
    return this.todoStore.tasks().some((task) => task.completed);
  }

  clearCompleted() {
    this.todoStore.clearCompleted();
  }
}
