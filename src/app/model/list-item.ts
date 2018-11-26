export class ListItem {
  id: string;
  description: string;
  status?: Status = Status.WAITING;
}

export enum Status {
  TODO,
  WAITING,
  COMPLETED
}
