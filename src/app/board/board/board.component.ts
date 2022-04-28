import { state } from '@angular/animations';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/core.module';
import { TaskService } from 'src/app/core/services/task.service';

import { ListSchema, TaskSchema } from 'src/app/models';
import { BoardService } from 'src/app/_services/board.service';
import { LoginService } from 'src/app/_services/login.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const initialValue = {
  id: '',
  description: '',
  date: '',
  priority: '',
};
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists: ListSchema[];
  task: TaskSchema;
  listId?: string;

  loginSubscription : Subscription = new Subscription;
  isLoggedIn = false;
  isLog = false;
  hadTable= false
  isOverlayDisplayed = false;
  constructor(private apiService: ApiService, 
    private taskService: TaskService, 
    private loginService : LoginService,
    private board : BoardService,
    private token: TokenStorageService) {
    this.lists = [];
    this.task = initialValue;
  }
  
  
  ngOnInit(): void {
    //this.getDataList();
    this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
    this.getDataStored();
    this.board.checkUserBoard(this.token.getUser().id).subscribe(res=>
      this.hadTable = res
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
    this.apiService.getApi().subscribe(
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

  displayOverlay(event?: any): void {
    this.isOverlayDisplayed = true;
    if (!!event) {
      this.task = {
        date: event.date,
        id: event.id,
        description: event.description,
        priority: event.priority,
      };
    } else {
      this.task = initialValue;
    }

    if(event.listId){
      this.listId = event.listId;
    }
  }
}

