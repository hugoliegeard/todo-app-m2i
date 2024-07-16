import { Component } from '@angular/core';

class Task {
  id: number = Date.now();
  name: string;
  status: boolean = false;
}

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
export class AppComponent {

  // -- Déclaration d'une variable
  title: string = "Mes Tâches";

  // -- Création d'une nouvelle tâche
  task: Task = new Task();

  // -- Liste de nos tâches
  tasks: Task[] = [
    {
      id: Date.now(),
      name: 'Promener le chien',
      status: false,
    },
    {
      id: Date.now(),
      name: 'Promener ma fille',
      status: false,
    },
    {
      id: Date.now(),
      name: 'Promener mon épouse',
      status: false,
    },
    {
      id: Date.now(),
      name: 'Faire la vaisselle',
      status: true,
    },
    {
      id: Date.now(),
      name: 'Sortir les poubelles',
      status: false,
    },
    {
      id: Date.now(),
      name: 'Envoyer mes factures à M2i',
      status: true,
    },
  ];

  /**
   * Déclenche l'enregistrement des tâches
   */
  saveTasks() {
    // TODO : Permet de sauvegarder les tâches
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
      this.tasks.push(this.task);

      // On sauvegarde les tâches
      this.saveTasks();

      // On remet a zéro la tâche
      this.task = new Task();
    }
  }
}
