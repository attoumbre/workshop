import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskSchema } from 'src/app/models/taskschema';
import { generateUniqueId } from 'src/app/utils';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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
  temps! : number;
  //selectedPriority!: string;
  @Input() task?: TaskSchema;
  @Input() listId?: any;
  formText: string ="";

  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgent' },
    { value: 'moderate', viewValue: 'Modéré' },
    { value: 'low', viewValue: 'lent' },
  ];
  constructor(
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private tasksService: TaskService,
    private token : TokenStorageService
  ) {}


  ngOnInit(): void {
    this.setForm();
    this.temps = 0;
    //this.selectedPriority = '';
   if (this.task && this.task.id && this.task.id > 0) {
      this.setValuesOnForm(this.task);
      this.formText = 'Editer';
      //this.selectedPriority = this.task.priority;
      this.temps = this.task.temps;
    } else {
      this.formText = 'Creer';
    }
  }
  
  setForm(): void {
    this.createTask = this.fb.group({
      date : [''],
      //priority: [''],
      description : [ '' ],
      temps : ['']
    });
  }

  setValuesOnForm(form: TaskSchema): void {
    this.createTask.setValue({
      date: new Date(form.date),
      //priority: form.priority,
      description: form.description,
      temps : form.temps 
   });
  }


  onFormAdd(form: TaskSchema): void {
    if (this.createTask.valid && this.task && !this.task.id) {
      //form.id = generateUniqueId();
      form.userId = this.token.getUser().id;
      form.listId = this.listId
      this.tasksService.addTask(form).subscribe((result : any)=> 
        console.log('valid', form.id)
        );
    
      
      this.close();
    } else if (this.task && this.listId){
      /*const findPriority = this.priorities.find(
        (element) => form.priority === element.value
      );*/
      form.id = this.task.id;
      //form.priority = !findPriority ? this.task.priority : form.priority;
      form.date = new Date(form.date);
      //console.log("priority", form.priority)
      if (form.temps) {
        this.tasksService.updateTask(form, this.listId);
        this.close();
      }
    }else {
      console.log('édité',  this.listId );
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

