import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskSchema } from 'src/app/models';
import { generateUniqueId } from 'src/app/utils';
import { BoardService } from 'src/app/_services/board.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

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
 
  nom: any;
  
 
  constructor(
    private fb: FormBuilder,
    private boardService : BoardService,
    private token : TokenStorageService
   
  ) {}


  ngOnInit(): void {
    this.setForm();
    this.formText = 'Creer';
    
  }
  
  setForm(): void {
    this.createBoard = this.fb.group({
     
      nom : [ '' ]
    });
  }

  setValuesOnForm(form: any): void {
    this.createBoard.setValue({
    
      nom: form.nom 
   });
  }


  onFormAdd(form: any): void {
    this.boardService.createBoard(form.nom,this.token.getUser().id).subscribe(result=>
      {
        console.log(result)
      },error=>{
        console.log(error)
      })
    
 
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
