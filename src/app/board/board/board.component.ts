import { state } from '@angular/animations';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/core.module';
import { TaskService } from 'src/app/core/services/task.service';

import { ListSchema, TaskSchema } from 'src/app/models';
import { BoardService } from 'src/app/_services/board.service';
import { FichesService } from 'src/app/_services/fiches.service';
import { LoginService } from 'src/app/_services/login.service';
import { SectionService } from 'src/app/_services/section.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const initialValue = {
  id: 0,
  description: '',
  date: '',
  temps: 0,
};
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists: any[];
  task: any;
  listId?: any;

  loginSubscription : Subscription = new Subscription;
  isLoggedIn = false;
  isLog = false;
  hadTable= false
  isOverlayDisplayed = false;
  constructor(private apiService: ApiService, 
    private taskService: TaskService, 
    private loginService : LoginService,
    private fiche : FichesService,
    private token: TokenStorageService,
    private section : SectionService) {
    this.lists = [];
    this.task = initialValue;
  }
  
  
  ngOnInit(): void {
    
    this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
    if( this.isLoggedIn){
      this.getDataList(this.token.getToken("tableau"));
      this.getDataStored();
    }
    //console.log("tableau affiché", this.token.getToken("tableau"))
    
    //this.board.checkUserBoard(this.token.getUser().id).subscribe(res=>
     // this.hadTable = res
      //);
    
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


  getDataList(id: any): void {
    /*this.apiService.getApi().subscribe(
      (response: any) => this.lists = response['list'],
      (error: string) => console.log('Ups! we have an error: ', error)
    );*/
    this.apiService.getApi(id).subscribe((result :any)=> {
      console.log("api",result)
      
      for( const item in result){
        if( result != null){
          this.fiche.getFicheSectionBoard(result[item].id).subscribe((response : any)=>{
            result[item].fiches = response

          })
        }

      }
      console.log("dodo", result)
      this.lists = result
    },(error: string) => console.log('Ups! we have an error: ', error))
    
  }

  getDataStored(): void {
    this.taskService.getBoardList$
      .subscribe(
        (response: any) => this.lists = response,
        (error: string) => (console.log('Ups! we have an error: ', error))
    );

    
  }

  displayOverlay(event?: any): void {
    this.isOverlayDisplayed = true;
    
    if (!!event) {
      this.task = {
        date: event.date,
        id: event.id,
        description: event.description,
        temps: event.temps,
      };
    } else {
      this.task = initialValue;
    }
    
    if(this.lists){
      this.listId = this.lists[0].id;
    }
  }
}

