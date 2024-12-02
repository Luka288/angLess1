import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/interfaces/task';
import { CommonModule, DatePipe } from '@angular/common';
import { HighlightUrgentDirective } from '../../core/directives/highlight-urgent.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, HighlightUrgentDirective, FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() taskName: string | undefined;
  @Input() dueDate!: Date;
  @Input() status: 'complated' | 'pending' = 'pending';

  @Output() taskEmit: EventEmitter<Task> = new EventEmitter<Task>();

  createCard() {
    this.taskEmit.emit();
  }
}
