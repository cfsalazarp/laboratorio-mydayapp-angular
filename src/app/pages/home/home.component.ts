import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { CategoryFilter } from 'src/app/models/category-filter.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent],
})
export class HomeComponent implements OnInit {
  public filterSelected: CategoryFilter = 'all';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.filterSelected = p['filter'] || 'all';
    });
  }
}
