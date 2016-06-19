import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Board, Cell } from '../model/board';

@Component({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Input()
  board:Observable<Board>;

  @Output()
  clickedCell = new EventEmitter<Cell>();
  size = 15;

  constructor() {
    // this.board = new Board(50, 30);
    // this.board.setCell(5,5,true);
  }

  onClick(cell:Cell) {
    console.log('emmiting ', cell);
    this.clickedCell.emit(cell);
  }

  ngOnInit() {
  }

}
