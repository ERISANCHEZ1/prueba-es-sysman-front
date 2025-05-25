import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService, Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-task-list',
  standalone: true,
imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})


export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  getTasks(): void {
  this.loading = true;
  this.taskService.getAllTasks().subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      this.tasks = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error al obtener tareas:', err);
      this.errorMessage = 'Error al cargar tareas';
      this.loading = false;
    }
  });
}
loadTasks(): void {
  this.loading = true;
  this.errorMessage = '';

  this.taskService.getAllTasks().subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data); // <-- Aquí va
      this.tasks = data;
      this.loading = false;
    },
    error: (error) => {
      this.errorMessage = 'Error al cargar tareas';
      console.error('Error al cargar:', error);
      this.loading = false;
    }
  });
}

newTask: Task = {
  title: '',
  description: '',
  completed: false
};



onSubmit() {
  this.taskService.createTask(this.newTask).subscribe({
    next: () => {
      this.successMessage = 'Tarea creada exitosamente.';
      this.errorMessage = '';
      this.getTasks(); // recargar lista
      this.newTask = { title: '', description: '', completed: false }; // limpiar formulario

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => this.successMessage = '', 3000);
    },
    error: (err) => {
      console.error('Error al crear tarea:', err);
      this.successMessage = '';
      this.errorMessage = 'No se pudo crear la tarea.';
    }
  });
}
updateTask(task: Task): void {
  this.taskService.updateTask(task).subscribe({
    next: () => {
      this.successMessage = 'Tarea actualizada exitosamente.';
      this.errorMessage = '';
      this.loadTasks(); // recarga la lista para mostrar cambios
      setTimeout(() => this.successMessage = '', 3000);
    },
    error: (err) => {
      console.error('Error al actualizar tarea:', err);
      this.successMessage = '';
      this.errorMessage = 'No se pudo actualizar la tarea.';
    }
  });
}

deleteTask(taskId: number | undefined): void {
  if (!taskId) {
    console.error('ID de tarea inválido:', taskId);
    return;
  }

  this.taskService.deleteTask(taskId).subscribe({
    next: () => {
      this.successMessage = 'Tarea eliminada correctamente.';
      this.loadTasks(); // recargar lista
    },
    error: (err) => {
      console.error('Error al eliminar tarea:', err);
      this.errorMessage = 'No se pudo eliminar la tarea.';
    }
  });
}
toggleTaskCompletion(task: Task): void {
  const updatedTask = { ...task, completed: !task.completed };
  this.updateTask(updatedTask);
}

}




  

