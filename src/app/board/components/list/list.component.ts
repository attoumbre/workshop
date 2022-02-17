import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListSchema, TaskSchema } from 'src/app/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list!: ListSchema;
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
  constructor() { }

  drop(event: CdkDragDrop<any[]>) {
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
  }

  handleEdit(task: TaskSchema){
    this.editTask.emit(task);
  }

}
