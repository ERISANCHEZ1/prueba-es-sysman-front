import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importá aquí tu componente de lista de tareas (standalone)
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  template: `
    <h1>Task Manager</h1>
    <app-task-list></app-task-list>
  `
})
export class AppComponent {}
