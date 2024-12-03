import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-gen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-gen.component.html',
  styleUrl: './input-gen.component.scss',
})
export class InputGenComponent {}
