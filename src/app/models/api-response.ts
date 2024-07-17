import {Task} from "./task";

export class ApiResponse {
  'hydra:member': Task[]
  'hydra:totalItems': number
}
