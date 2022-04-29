import { TaskSchema } from './taskschema';

export interface ListSchema {
    id: number;
    name: string;
    tasks: TaskSchema[];
    tableau: number
}