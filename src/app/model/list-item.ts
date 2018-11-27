export class ListItem {
  id: string;
  description: string;
  isUnderEdit?: boolean;
  status?: Status = Status.WAITING;
}

export enum Status {
  TODO,
  WAITING
}
