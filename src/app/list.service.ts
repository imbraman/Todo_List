import {Injectable} from '@angular/core';
import {ListItem, Status} from './model/list-item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  public getListItems(): ListItem[] {
    return [
      {id: '1', description: 'create better list', status: Status.WAITING},
      {id: '2', description: 'add some styles', status: Status.WAITING},
      {id: '3', description: 'todo', status: Status.TODO}
    ];
  }
}
