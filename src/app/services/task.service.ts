import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/api-response";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiEndpoint: string = environment.apiEndpoint;

  constructor(private http: HttpClient) {
  }

  /**
   * Récupérer de l'API l'ensemble des tâches
   */
  getTasks(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiEndpoint + '/api/tasks');
  }

  /**
   * Permet d'ajouter une nouvelle tâche
   * @param task
   */
  addTask(task: Task):Observable<Task> {
    return this.http.post<Task>(this.apiEndpoint + '/api/tasks', task)
  }

  /**
   * Permet de modifier une tâche
   * @param task
   */
  editTask(task: Task) {
    return this.http.put<Task>(this.apiEndpoint + '/api/tasks/' + task.id, task);
  }

  /**
   * Permet de supprimer une tâche
   * @param task
   */
  removeTask(task: Task) {
    return this.http.delete<Task>(this.apiEndpoint + '/api/tasks/' + task.id);
  }

}
