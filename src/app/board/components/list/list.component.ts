import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListSchema, TaskSchema } from 'src/app/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/core/services/task.service';
import { LoginService } from 'src/app/_services/login.service';
import { FichesService } from 'src/app/_services/fiches.service';
import { SectionService } from 'src/app/_services/section.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list!: any;
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
  isLoggedIn = false;
  constructor(public tasksService: TaskService, 
    private loginService : LoginService,
    private section: SectionService,
    private token: TokenStorageService) {}

  drop(event: CdkDragDrop<any[]>, list: any) {
    
    console.log("drop",list)
    this.token.saveToken('listIdDrop', list.id)
    //this.token.saveToken("listLibDrop", list.lib)
    //this.section.upDateSection(list).subscribe(res => console.log("le result",res))
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  ngOnInit(): void {
    this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
    
  }

  handleEdit(task: any){
    if (this.list) {
      task.listId = this.list.id;
      console.log("affiche",this.list)
      //this.section.upDateSection(this.list).subscribe(res => console.log("le result",res))
      
      this.editTask.emit(task);
    }
  }
}
