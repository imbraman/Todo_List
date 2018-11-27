import {Injectable} from '@angular/core';
import {ListItem, Status} from './model/list-item';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../environments/environment';
import * as uuid from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  getListItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${environment.apiUrl}/items`);
  }

  createNewListItem(): ListItem {
    const id = uuid.v4();
    return {id: id, description: '', status: Status.WAITING, isUnderEdit: true};
  }
}
