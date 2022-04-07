import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/core.module';
import { TaskService } from 'src/app/core/services/task.service';
import { ListSchema, TaskSchema } from 'src/app/models';

const initialValue = {
  id: '',
  description: '',
  date: '',
  priority: '',
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
  isOverlayDisplayed = false;
  constructor(private apiService: ApiService, private taskService: TaskService) {}


  ngOnInit(): void {
   
  }
  
  getPrioritiesTask(PriorityType: string): void {
    this.taskService.getBoardList$
      .subscribe(
        (response: ListSchema[]) => {
          const lists = response;
          let tasks: TaskSchema[] = [];
          lists.map((element: ListSchema )=> {
            element.tasks.map((task: TaskSchema) => {
              if(task.priority == PriorityType){
                tasks.push(task)
              }
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
    
      onCreate(event?: any): void {
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
  
      }
    
}
