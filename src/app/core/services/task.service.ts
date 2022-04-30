import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListSchema, TaskSchema } from 'src/app/models';
import { SectionService } from 'src/app/_services/section.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ApiService } from './api.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly boardList = new BehaviorSubject<any[]>([]);
  readonly list$ = this.boardList.asObservable();
  readonly getBoardList$ = this.list$.pipe(map((list) => list));

  constructor(private apiService: ApiService, 
    private token : TokenStorageService,
    private http: HttpClient) {
    this.loadInitialData(this.token.getToken("tableau"));
  }

  /* Load initial data to render in a component */
  loadInitialData(id: any): any {
    return this.apiService.getApi(id).subscribe((response: any) => {
      if (!!response) {
        this.boardList.next(response);
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
  get list(): any[] {
    return this.boardList.getValue();
  }

  /* setter list of Board */
  set list(value: any[]) {
    this.boardList.next(value);
  }

  /* Add new card to board list */
  addTask(data: TaskSchema):any {

    const card = {
      description: data.description ,
      section:{
        id: data.listId
      }, 
      user:{
        id: data.userId
      },
      date: data.date,
      temps: data.temps  
    }
    return new Observable<boolean> ( (observer)=>{
      this.http.post(`api/fiches/create`,card,httpOptions).subscribe((result: any) => {
        console.log('result',result)
        const elementsIndex = this.list.findIndex(
          (element) => element.id == data.listId
        );
        data.id = result.id
        console.log("element",this.list[elementsIndex])
        
        this.list[elementsIndex].fiches.push(data);
      }
      );
    });
    
  }

  /* Edit card on list */
  updateTask(data: any, listId: any): any{
    if (data) {
      const elementsIndex = this.list.findIndex(
        (element) => element.id === listId
      );
      const task = this.list[elementsIndex].fiches.map((element: any) => {
        if (element.id === data.id) {
          element.date = new Date(data.date);
          element.description = data.description;
          element.temps = data.temps;
      
        }
        
        return element;
      });
      console.log("element",this.list)
    }
  }

  /* Remove a card of board list */
  removeTask(dataId: number, list: any): void {
    const elementsIndex = this.list.findIndex(
      (element) => element.id == list.id
    );
    const tasks = this.list[elementsIndex].fiches.filter(
      (task: any) => task.id !== dataId
    );
    this.list[elementsIndex].fiches = tasks;
  }

}
