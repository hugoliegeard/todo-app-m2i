import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/api-response";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiEndpoint: string = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

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
  addTask(task: Task) {}

  /**
   * Permet de modifier une tâche
   * @param task
   */
  editTask(task: Task) {}

  /**
   * Permet de supprimer une tâche
   * @param task
   */
  removeTask(task: Task) {}

}
