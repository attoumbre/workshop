import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListSchema, TaskSchema } from 'src/app/app.module';
import { TaskService } from 'src/app/core/services/task.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task!: TaskSchema;
  @Input() list?: ListSchema;
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
  
  constructor(public dialog: MatDialog, public tasksService: TaskService) {}
  ngOnInit(): void {
  }

  handleEditTask(task: TaskSchema){
    this.editTask.emit(task);

  }


  removeTask(taskId: string): void {
    console.log('Supprimer la tâche', taskId);
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (this.list) {
        this.tasksService.removeTask(taskId, this.list);
      }
    });
}
}
