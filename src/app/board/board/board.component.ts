import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/core.module';

import { ListSchema, TaskSchema } from 'src/app/models';

const initialValue = {
  id: '',
  description: '',
  date: '',
  priority: '',
};
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists: ListSchema[];
  task: TaskSchema;

  isOverlayDisplayed = false;
  constructor(private apiService: ApiService) {
    this.lists = [];
    this.task = initialValue;
  }
  
  
  ngOnInit(): void {
    this.getDataList();
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
      error => console.log('Ups! we have an error: ', error)
    );
  }

  displayOverlay(event?: any): void {
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
