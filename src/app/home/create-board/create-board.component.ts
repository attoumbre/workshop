import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskSchema } from 'src/app/models';
import { generateUniqueId } from 'src/app/utils';
type DropdownObject = {
  value: string;
  viewValue: string;
};
@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {
  //@ViewChild('autosize') autosize!: CdkTextareaAutosize;
  createBoard!: FormGroup;
  @Input() connectedOverlay!: CdkConnectedOverlay;
  //selectedPriority!: string;
  //@Input() task?: TaskSchema;
  //@Input() listId?: string;
  formText: string ="";

 
  constructor(
    private fb: FormBuilder,
  
   
  ) {}


  ngOnInit(): void {
    this.setForm();
    this.formText = 'Creer';
    
  }
  
  setForm(): void {
    this.createBoard = this.fb.group({
     
      description : [ '' ]
    });
  }

  setValuesOnForm(form: TaskSchema): void {
    this.createBoard.setValue({
    
      description: form.description 
   });
  }


  onFormAdd(form: TaskSchema): void {
   
  }

  /**triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }*/

  close(): void {
    this.connectedOverlay.overlayRef.detach();
  }

}
