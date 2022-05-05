import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';

import { ListSchema, TaskSchema } from 'src/app/app.module';
import { TaskService } from 'src/app/core/services/task.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FichesService } from 'src/app/_services/fiches.service';
import { SectionService } from 'src/app/_services/section.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task!: any;
  @Input()
  list!: any;
  isDrop = false;
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
 
  constructor(public dialog: MatDialog, 
    public tasksService: TaskService,
    private fiche : FichesService,
    private section : SectionService,
    private token : TokenStorageService) {}
  ngOnInit(): void {
    if(this.token.getToken("listIdDrop")){
      console.log("task ", this.task.id)
      this.fiche.update(this.task,this.token.getToken("listIdDrop")).subscribe(res => console.log("le result",res))
      
      //this.section.upDateSection(this.token.getToken("taskDrop")).subscribe(resultat => console.log(resultat))
      console.log("isDrop in ", this.token.getToken("listIdDrop"))
      this.token.removeToken("listIdDrop");
    }
    
  }

  handleEditTask(task: any){
    console.log("fiche", task)
    //
    this.editTask.emit(task);
  
  }


  removeTask(taskId: number): void {
    console.log('Supprimer la tâche', taskId);
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Supprimer la tâche', this.list);
      if (this.list) {
        this.tasksService.removeTask(taskId, this.list).subscribe((data)=>{
          console.log(data)
      },(error)=>{
        console.log(error)
      });
      }
    });
    
}
}
