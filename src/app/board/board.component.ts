import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Board } from '../model';

@Component({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  @Input()
  board:Observable<Board>;

  @Input()
  color:Observable<String>;

  @Output()
  clickedCell = new EventEmitter<any>();

  size = 20;

  private dimensions:Observable<any>;

  constructor() {
  }

  onClick(x: number, y:number) {
    this.clickedCell.emit({ 'x': x, 'y':y });
  }
}
