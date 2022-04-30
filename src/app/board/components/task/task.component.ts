import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ListSchema, TaskSchema } from 'src/app/app.module';
import { TaskService } from 'src/app/core/services/task.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FichesService } from 'src/app/_services/fiches.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task!: any;
  @Input()
  list!: any;
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
 
  constructor(public dialog: MatDialog, 
    public tasksService: TaskService,
    private fiche : FichesService) {}
  ngOnInit(): void {
  }

  handleEditTask(task: any){
    console.log("fiche", task)
    //this.fiche.update(this.task).subscribe(res => console.log("le result",res))
    this.editTask.emit(task);
  
  }


  removeTask(taskId: number): void {
    console.log('Supprimer la tâche', taskId);
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Supprimer la tâche', this.list);
      if (this.list) {
        this.tasksService.removeTask(taskId, this.list);
      }
    });
}
}
