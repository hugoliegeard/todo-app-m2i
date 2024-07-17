import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "../models/task";

@Pipe({
  name: 'tasksFilter',
  standalone: true,
  pure: false
})
export class TasksFilterPipe implements PipeTransform {

  /*
    Dans cette fonction de comparaison :

    • Si a. status et b. status sont égaux, la fonction renvoie 0, ce qui
    signifie que l'ordre de ces deux éléments reste inchangé.

    • Si a. status est true et b. status est false, la fonction renvoie 1, ce
    qui signifie que a est placé après b.

    • Si a. status est false et b. status est true, la fonction renvoie -1, ce
    qui signifie que a est placé avant b.
   */

  transform(tasks: Task[]): Task[] {
    return tasks.sort((a: Task, b: Task) => {
      return a.status === b.status ? 0 : a.status ? 1 : -1;
    });
  }

}
