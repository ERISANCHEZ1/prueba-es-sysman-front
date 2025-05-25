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

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8082/task-manager-backend/api/tasks';

  constructor(private http: HttpClient) {}

getAllTasks(): Observable<Task[]> {
  return this.http.get<Task[]>(this.baseUrl).pipe(
    catchError(this.handleError)
  );
}

  private handleError(error: any) {
    console.error('Error en el servicio:', error);
    return throwError(() => new Error('Error en la llamada HTTP'));
  }
}
