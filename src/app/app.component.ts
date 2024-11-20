import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HighlightUrgentDirective } from './core/directives/highlight-urgent.directive';
import { Task } from './core/interfaces/task';
import { TaskComponent } from './task-card/task/task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dateInput!: Date;
  taskTitle: string = '';
  toggleContainer: boolean = false;

  tasks: Task[] = [];
  complatedTasks: Task[] = [];

  currDate = new Date();

  createCard() {
    if (this.taskTitle === '') {
      return;
    }
    const newTask: Task = {
      taskName: this.taskTitle,
      dueDate: new Date(this.dateInput),
      status: 'pending',
    };
    this.tasks.push(newTask);
    this.taskTitle = '';
    // this.dateInput = '';
  }

  updateCard(task: Task) {
    task.status = 'complated';
    this.complatedTasks.push(task);
  }
}
