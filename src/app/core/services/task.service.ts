import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListSchema, TaskSchema } from 'src/app/models';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly boardList = new BehaviorSubject<ListSchema[]>([]);
  readonly list$ = this.boardList.asObservable();
  readonly getBoardList$ = this.list$.pipe(map((list) => list));

  constructor(private apiService: ApiService) {
    this.loadInitialData();
  }

  /* Load initial data to render in a component */
  loadInitialData(): any {
    return this.apiService.getApi().subscribe((response: any) => {
      if (!!response) {
        this.boardList.next(response['list']);
      }
    });

    /*return new Observable<boolean>((observer)=>{
      this.http.get(`api/user/signup`).subscribe(result=>{
        observer.next(true);
        observer.complete();

      }, error=>{
        observer.next(false);
        observer.complete();
      } );
       
    });*/
  }

  /* getter list of Board */
  get list(): ListSchema[] {
    return this.boardList.getValue();
  }

  /* setter list of Board */
  set list(value: ListSchema[]) {
    this.boardList.next(value);
  }

  /* Add new card to board list */
  addTask(data: TaskSchema): void {
    const card = data;
    const elementsIndex = this.list.findIndex(
      (element) => element.id ==1
    );
    this.list[elementsIndex].tasks.push(card);
  }

  /* Edit card on list */
  updateTask(data: TaskSchema, listId: string | any): void {
    listId="1"
    if (data) {
      const elementsIndex = this.list.findIndex(
        (element) => element.id === listId
      );
      const task = this.list[elementsIndex].tasks.map((element) => {
        if (element.id === data.id) {
          element.date = new Date(data.date);
          element.description = data.description;
          element.temps = data.temps;
        }
        return element;
      });
    }
  }

  /* Remove a card of board list */
  removeTask(dataId: number, list: ListSchema): void {
    const elementsIndex = this.list.findIndex(
      (element) => element.id == list.id
    );
    const tasks = this.list[elementsIndex].tasks.filter(
      (task) => task.id !== dataId
    );
    this.list[elementsIndex].tasks = tasks;
  }

}
