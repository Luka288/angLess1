export interface Task {
  taskName: string;
  dueDate: Date;
  status: 'complated' | 'pending';
}
