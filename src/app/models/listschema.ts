import { TaskSchema } from './taskschema';

export interface ListSchema {
    id: string;
    name: string;
    cards: TaskSchema[];
}