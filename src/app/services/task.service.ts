// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Task {
  task_id?: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8082/task-manager-backend/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error en la llamada HTTP'));
      })
    );
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(this.baseUrl, task).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any) {
    console.error('Error en el servicio:', error);
    return throwError(() => new Error('Error en la llamada HTTP'));
  }

updateTask(task: Task): Observable<any> {
  return this.http.put(this.baseUrl, task).pipe(
    catchError(this.handleError.bind(this))
  );
}
deleteTask(task_id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${task_id}`).pipe(
    catchError(this.handleError.bind(this))
  );
} 


}
