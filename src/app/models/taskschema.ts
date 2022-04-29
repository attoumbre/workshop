export interface TaskSchema {
  id: number;
  description: string;
  date: Date | string;
  temps: any;
  //priority: string;
  userId?: number;
  listId?: number;
}