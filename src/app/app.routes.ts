import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'navigation',
    pathMatch: 'full',
  },

  {
    path: 'navigation',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'todo-app',
    loadComponent: () =>
      import('./task-less/todo/todo.component').then((c) => c.TodoComponent),
  },
];
