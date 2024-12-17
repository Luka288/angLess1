import { Component } from '@angular/core';
import { Task } from '../../core/interfaces/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task-card/task.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent, RouterModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  dateInput!: Date;
  taskTitle: string = '';
  toggleContainer: boolean = false;

  tasks: Task[] = [];
  complatedTasks: Task[] = [];

  currDate = new Date();

  createCard() {
    if (!this.dateInput || this.taskTitle === '') {
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
    this.filterTasks();
  }

  updateCard(task: Task) {
    task.status = 'complated';
    this.complatedTasks.push(task);
    this.filterTasks();
    console.log(task);
    console.log(this.complatedTasks);
  }

  allTasks: Task[] = [];

  filterTasks() {
    if (!this.toggleContainer) {
      this.allTasks = this.tasks.filter((task) => task.status === 'pending');
    } else if (this.toggleContainer) {
      this.allTasks = this.complatedTasks.filter(
        (task) => task.status === 'complated'
      );
    }
  }
}
