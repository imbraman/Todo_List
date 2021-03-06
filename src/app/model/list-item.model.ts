export class ListItemModel {
  id: string;
  description: string;
  isUnderEdit?: boolean;
  listType?: ListType;
}

export enum ListType {
  ALL = 'all',
  TODO = 'todo'
}
