import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskSchema } from 'src/app/models/taskschema';
import { generateUniqueId } from 'src/app/utils';

type DropdownObject = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})



export class CreateTaskComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  createTask!: FormGroup;
  @Input() connectedOverlay!: CdkConnectedOverlay;
  selectedPriority!: string;
  @Input() task?: TaskSchema;
  @Input() listId?: string;
  formText: string ="";

  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgente' },
    { value: 'moderate', viewValue: 'Moderado' },
    { value: 'low', viewValue: 'Bajo' },
  ];
  constructor(
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private tasksService: TaskService
  ) {}


  ngOnInit(): void {
    this.setForm();
    this.selectedPriority = '';
   if (this.task && this.task.id && this.task.id.length > 0) {
      this.setValuesOnForm(this.task);
      this.formText = 'Editar';
      this.selectedPriority = this.task.priority;
    } else {
      this.formText = 'Crear';
    }
  }
  
  setForm(): void {
    this.createTask = this.fb.group({
      date : [''],
      priority: [''],
      description : [ '' ]
    });
  }

  setValuesOnForm(form: TaskSchema): void {
    this.createTask.setValue({
      date: new Date(form.date),
      priority: form.priority,
      description: form.description 
   });
  }


  onFormAdd(form: TaskSchema): void {
    if (this.createTask.valid && this.task && !this.task.id) {
      form.id = generateUniqueId();
      this.tasksService.addTask(form);
    
      console.log('valid');
      this.close();
    } else if (this.task && this.listId){
      const findPriority = this.priorities.find(
        (element) => form.priority === element.value
      );
      form.id = this.task.id;
      form.priority = !findPriority ? this.task.priority : form.priority;
      form.date = new Date(form.date);
      if (form.priority) {
        this.tasksService.updateTask(form, this.listId);
      }
    }else {
      console.log('editada');
      this.close();
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  close(): void {
    this.connectedOverlay.overlayRef.detach();
  }
}

