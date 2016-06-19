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

  private dimensions:Observable<any>;

  constructor() {
  }

  onClick(cell:Cell) {
    this.clickedCell.emit(cell);
  }

  ngOnInit() {
    /*
     * This observable triggers only in case of changes to the board structure, i.e.,
     * width or height. This way, we don't recreate the DOM elements each time
     * a cell changes but the board dimensions are the same. 
     */
    this.dimensions = this.board
      .distinctUntilChanged((board1, board2) => board1.height == board2.height && board1.width == board2.width);

    this.board.subscribe(board => { 
      // this.b = board;
      console.log('Updated board array', Date.now());
    });

    this.dimensions.subscribe(dim => console.log('dim changed', dim));

  }

}
