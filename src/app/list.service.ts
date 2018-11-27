import {Injectable} from '@angular/core';
import {ListItem, Status} from './model/list-item';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, toArray} from 'rxjs/operators';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  /* public getListItems(): ListItem[] {
     return [
       {id: '200ed4cb-2773-42af-8a60-3177c1a06fe4', description: 'create better list', status: Status.WAITING}
     ];
   }*/
  private listItemsSubject: BehaviorSubject<ListItem[]>;
  public listItems: Observable<ListItem[]>;


  getListItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(`${environment.apiUrl}/items`);
  }
}
