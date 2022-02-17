import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/core.module';

import { ListSchema } from 'src/app/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists: ListSchema[];

  isOverlayDisplayed = false;
  constructor(private apiService: ApiService) {
    this.lists = [];
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

  displayOverlay(): void {
    this.isOverlayDisplayed = true;
  }

  hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }


  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => this.lists = response['list'],
      error => console.log('Ups! we have an error: ', error)
    );
  }
}
