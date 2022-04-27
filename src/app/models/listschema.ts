import { TaskSchema } from './taskschema';

export interface ListSchema {
    id: string;
    name: string;
    tasks: TaskSchema[];
    //idTableau: number;
}