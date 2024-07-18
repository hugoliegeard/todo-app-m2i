import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import {Task} from "./models/task";
import {TaskService} from "./services/task.service";
import {Observable} from "rxjs";

/**
 * @Component est ce qu'on appel un décorateur.
 * Il permet d'apporter à Angular des informations
 * complémentaires sur le composant, sans changer
 * son fonctionnement interne.
 */
@Component({
  selector: 'app-root', // Identifiant uniquement du composant
  templateUrl: 'app.component.html', // Structure HTML du composant
  styleUrls: ['app.component.scss'], // Décoration CSS du composant
})
/**
 * La classe contient les données de notre composant,
 * mais aussi, son comportement. Dans le contexte MVVM,
 * notre classe correspond au "Model".
 */
export class AppComponent implements OnInit {

  tasksObservable$: Observable<Task[]>;

  constructor(private storage: Storage, private taskService: TaskService) {
  }

  /**
   * Cette fonction s'exécute au tout début du
   * chargement d'un composant, avant son affichage.
   * ---------------------------------------------
   * C'est un bon moyen, de préparer des données
   * avant qu'elle ne soit visible par l'utilisateur...
   * ---------------------------------------------
   * Cette fonction est appelée par Angular,
   * juste après le constructeur.
   */
  async ngOnInit(): Promise<void> {

    // Chargement depuis le storage

    /*await this.storage.create();
    await this.storage.get('tasks').then((tasks: Task[]) => {
      if (tasks !== null) {
        this.tasks = tasks;
      }
    })*/

    // Chargement depuis l'API
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data["hydra:member"];
    });

  }

  // -- Déclaration d'une variable
  title: string = "Mes Tâches";

  // -- Création d'une nouvelle tâche
  task: Task = new Task();

  // -- Liste de nos tâches
  tasks: Task[] = [];

  /**
   * Déclenche l'enregistrement des tâches
   */
  async saveTasks() {
    await this.storage.set('tasks', this.tasks);
  }

  saveTask(task: Task) {
    this.taskService.editTask(task).subscribe(data => {});
  }

  /**
   * Permet de détecter quand un utilisateur
   * presse la touche "entrer"
   * @param code
   */
  keyDetection(code: string) {
    if (code === 'Enter') {
      // console.log('enter pressed');
      this.addTask();
    }
  }

  /**
   * Permet d'ajouter une tâche
   * dans le tableau de "tasks".
   */
  addTask() {
    if (this.task.name && this.task.name.length > 0) {

      // Vérification dans la console
      // console.log(this.task);

      // On pousse la nouvelle tâche dans le tableau
      // this.tasks.push(this.task);

      // On sauvegarde les tâches (Cas du stockage en local)
      // this.saveTasks();

      // On remet a zéro la tâche
      // this.task = new Task();

      // -------------------------------

      // On sauvegarde la tâche en BDD (Cas avec l'API)
      this.taskService.addTask(this.task).subscribe(task => {
        this.tasks.push(task);
        this.task = new Task();
      });
    }
  }

  /**
   * Permet de supprimer une tache
   * @param task
   */
  deleteTask(task: Task) {
    // Suppression de la tâche de l'API
    this.taskService.removeTask(task).subscribe(data => {
      // Suppression de la tâche du tableau
      this.tasks.splice(this.tasks.indexOf(task), 1);
    });
    
    // Sauvegarde des tâches (Cas du stockage en local)
    // this.saveTasks();
  }
}
