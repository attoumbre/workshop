import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListSchema, TaskSchema } from 'src/app/models';
import { LoginService } from 'src/app/_services/login.service';
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
  isLoggedIn = false
  constructor(private apiService: ApiService, 
    private token : TokenStorageService,
    private http: HttpClient,
    private loginService : LoginService) {
      this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
      console.log(this.isLoggedIn)
      if (this.isLoggedIn && this.token.getToken("tableau")){
        this.loadInitialData(this.token.getToken("tableau"));
      }
  }

  /* Load initial data to render in a component */
  loadInitialData(id: any): any {
    return this.apiService.getApi(id).subscribe((response: any) => {
      console.log("reponse",response)
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
  addTask(data: any):any {

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
    console.log("card", card)
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
  updateTask(data: any, list: any): Observable<any>{
    //console.log("data", data.id)
    let modifier = false
    this.list.push(list)
   // console.log(this.list)
    for( const i in list){
      if(list[i].fiches){
        for( const j in list[i].fiches){
          if(data.id == list[i].fiches[j].id ){
            modifier = true
            list[i].fiches[j].date =  new Date(data.date)
            list[i].fiches[j].description = data.description
            list[i].fiches[j].temps = data.temps
          }
        }
      }
    }
    this.list = list
   // console.log("la list",this.list)
   // console.log("task", data)
    const card = {
      id: data.id,
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
  
   // console.log("task", card)
   /* return new Observable<boolean> ( (observer)=>{
      this.http.put<boolean>(`api/fiches/update`,card,httpOptions).subscribe((result) => console.log(result));
    });*/
    return this.http.put<any>('api/fiches/update',card,httpOptions)
    
  }

  /* Remove a card of board list */
  removeTask(dataId: number, list: any): Observable<any> {
    /*const elementsIndex = this.list.findIndex(
      (element) => element.id == list.id
    );
    console.log(list)
    const tasks = list[elementsIndex].fiches.filter(
      (task: any) => task.id !== dataId
    );*/
    console.log(list)
    
    if(list.fiches){
      for( const j in list.fiches){
        
        if(dataId == list.fiches[j].id ){
          console.log(list.fiches[j])
          
          const tasks = list.fiches[j].filter(
            (task: any) => task.id !== dataId
          );
          list.fiches[j] = tasks;
        }
      }
    }
    
    this.list = list
    //this.list.fiches = tasks
    //console.log('list', list)
    //this.list[elementsIndex].fiches = tasks;
    return this.http.delete(`api/fiches/${dataId}`, httpOptions)
  }

}
