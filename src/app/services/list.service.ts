import {Injectable} from '@angular/core';
import {ListItemModel, ListType} from '../model/list-item.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import * as uuid from 'uuid';
import {ListModel} from '../model/list.model';
import * as dateFormat from 'dateFormat';
import {map} from 'rxjs/operators';
import {AuthenticationService} from './aunthetication.service';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getList(): Observable<ListModel> {
    const now = new Date();
    const currentDay = dateFormat(now, 'dd/mm/yyyy');
    // we are checking here whether list of the tasks is actual for today
    return this.http.get<ListModel>(`${environment.apiUrl}/api/list`, {
      params: {
        listDay: currentDay
      }
    })
      .pipe(map((response: any) => {
        if (response) {
          const list = new ListModel(response._id, response.listDay, response.items, response.lastModified);
          list.items.forEach(item => {
            item.listType = ListType.TODO;
            return item;
          });
          return list;
        } else {
          return null;
        }
      }));
  }

  createList(listItems: ListItemModel[]): Observable<ListModel> {
    const now = new Date();
    const items: ListItemModel[] = listItems.map((item: ListItemModel) => {
      const element = Object.assign({}, item);
      delete element.isUnderEdit;
      delete element.listType;
      return element;
    });
    const list: ListModel = {
      listDay: dateFormat(now, 'dd/mm/yyyy'),
      items: items,
    };
    return this.http.post<any>(`${environment.apiUrl}/api/list`, list);
  }

  updateList(list: ListModel) {
    this.http.put<any>(`${environment.apiUrl}/api/list`, list).subscribe((response: ListModel) => {
      list.lastModified = response.lastModified;
    });
  }

  createNewListItem(): ListItemModel {
    const id = uuid.v4();
    return {id: id, description: '', isUnderEdit: true, listType: ListType.ALL};
  }
}
