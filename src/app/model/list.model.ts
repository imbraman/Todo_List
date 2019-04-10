import {ListItemModel} from './list-item.model';

export class ListModel {
  id?: string;
  listDay: any;
  items: ListItemModel[];
  lastModified?: any;

  constructor(id: string, listDay: string, items: ListItemModel[], lastModifided: string) {
    this.id = id;
    this.listDay = listDay;
    this.items = items;
    this.lastModified = lastModifided;
  }
}
