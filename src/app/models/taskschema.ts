export interface TaskSchema {
  id: number;
  description: string;
  date: Date ;
  temps: any;
  //priority: string;
  userId?: number;
  listId?: number;
}