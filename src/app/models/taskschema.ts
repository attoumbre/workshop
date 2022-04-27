export interface TaskSchema {
  id: string;
  description: string;
  date: Date | string;
  //temps: any;
  priority: string;
  //userId: number;
  listId?: string;
}