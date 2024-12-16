import { Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  isVisible: boolean = false

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currUrl = this.router.url;
      if(currUrl === '/navigation'){
        this.isVisible = false
      }else{
        this.isVisible = true
      }
    })
  }

}
