import { InjectionToken } from '@angular/core';

export const navItems = [
  {
    text: 'დავალება 1 (Todo app)',
    isOptional: 'Normal task',
    path: '/todo-app',
    taskDescription: 'პირველი დავალება (Todo-app)',
  },

  {
    text: 'დავალება 2 (User form)',
    isOptional: 'Normal task',
    path: '/user-form',
    taskDescription: 'მეორე დავალება (User-form)',
  },

  {
    text: 'დავალება 3  (Paginator)',
    isOptional: 'Optional',
    path: '/paginator',
    taskDescription: 'Optional დავალება (paginator)',
  },
];

// export const API = new InjectionToken<string>('');
export const baseAPI = 'https://dummyjson.com';
