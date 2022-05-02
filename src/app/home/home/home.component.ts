import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/core.module';
import { TaskService } from 'src/app/core/services/task.service';
import { ListSchema, TaskSchema } from 'src/app/models';
import { BoardService } from 'src/app/_services/board.service';
import { LoginService } from 'src/app/_services/login.service';


import { SectionService } from 'src/app/_services/section.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


const initialValue = {
  id: 0,
  description: '',
  date: new Date(),
  temps: 0,
 
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskList!: TaskSchema[];
  lists!: ListSchema[];
  task!: TaskSchema;
  listId?: string;
  listBoard : any[]=[]
  hadTable = false
  isLoggedIn = false
  isOverlayDisplayed = false;
  constructor(private apiService: ApiService, 
    private taskService: TaskService ,
    private loginService : LoginService,
    private board: BoardService,
    private token : TokenStorageService,
    private _router : Router, 
    private section : SectionService
    ) {}


  ngOnInit(): void {
    this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
    
    if (this.isLoggedIn){
      this.board.checkUserBoard(this.token.getUser().id).subscribe(res=>
        this.hadTable = res
        );
        
        this.listBoard = this.board.getlist();
        console.log("lt",this.board.getlist())
    
      
    }
    
    
  }
  
  getPrioritiesTask(PriorityType: string): void {
    this.taskService.getBoardList$
      .subscribe(
        (response: ListSchema[]) => {
          const lists = response;
          let tasks: TaskSchema[] = [];
          lists.map((element: ListSchema )=> {
            element.tasks.map((task: TaskSchema) => {
              //if(task.priority == PriorityType){
                tasks.push(task)
              //}
            });
          });
          this.taskList = tasks;
        },
        (error: string) => (console.log('Ups! we have an error: ', error))
    );
      }
  
      readonly overlayOptions: Partial<CdkConnectedOverlay> = {
        hasBackdrop: true,
        positions: [
          { originX: 'start', originY: 'top', overlayX: 'start',  overlayY: 'top'}
        ]
      };
      hideOverlay(): void {
        this.isOverlayDisplayed = false;
      }
    
    
      getDataList(): void {
        this.apiService.getApi(6).subscribe(
          (response: any) => this.lists = response['list'],
          (error: string) => console.log('Ups! we have an error: ', error)
        );
      }
    
      getDataStored(): void {
        this.taskService.getBoardList$
          .subscribe(
            (response: any) => this.lists = response,
            (error: string) => (console.log('Ups! we have an error: ', error))
        );
      }
    
      onCreate(event?: any): void {
        this.isOverlayDisplayed = true;
        if (!!event) {
          this.task = {
            date: event.date,
            id: event.id,
            description: event.description,
            temps: event.temps,
            userId: this.token.getUser().id
          };
        } else {
          this.task = initialValue;
        }
  
      }
      getTable(id:number){
        console.log(id)
        this.section.getSectionBoard(id).subscribe(res=>{console.log(res)
          
        });

        this.token.saveToken("tableau", id);
        this._router.navigateByUrl('/board');
      }
      deleteTable(id: number){
        
        //this.section.deleteSection(id).subscribe(res=>{console.log(res)
        //});
        this.board.deleteBoard(id).subscribe((res: any)=>
        console.log(res)
        );
        //apres supression reload la page
        //this.reLoard()
      }

      reLoard():void{
        window.location.reload()
      }
}
