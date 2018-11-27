import {Injectable} from '@angular/core';
import {ListItemModel, ListType} from '../model/list-item.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import * as uuid from 'uuid';
import {ListModel} from '../model/list.model';
import * as dateFormat from 'dateFormat';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  getListItems(): Observable<ListItemModel[]> {
    const now = new Date();
    const currentDay = dateFormat(now, 'dddd, mmmm dS');
    // we are checking here whether list of the tasks is actual for today
    return this.http.get<ListModel>(`${environment.apiUrl}/items`)
      .pipe(map((list) => list.listDate === currentDay ? list.items : []));
  }

  sendListToServer(listItems: ListItemModel[]) {
    const now = new Date();
    const items: ListItemModel[] = listItems.map((item: ListItemModel) => {
      const element = Object.assign({}, item);
      delete element.isUnderEdit;
      delete element.listType;
      return element;
    });
    const list: ListModel = {
      listDate: dateFormat(now, 'dddd, mmmm dS'),
      items: items,
      lastModified: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
    };
    this.http.post<any>(`${environment.apiUrl}/items`, list).subscribe();
  }

  createNewListItem(): ListItemModel {
    const id = uuid.v4();
    return {id: id, description: '', isUnderEdit: true, listType: ListType.ALL};
  }
}
