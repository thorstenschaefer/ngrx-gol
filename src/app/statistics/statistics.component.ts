import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Board } from '../model';

@Component({
  moduleId: module.id,
  selector: 'app-statistics',
  templateUrl: 'statistics.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {

  @Input()
  board:Observable<Board>;

  @Input()
  generation:Observable<number>;

  status:Observable<String>;

  highscore:Observable<number>;

  ngOnInit() {
    this.status = this.board.bufferCount(2, 1)
      .map(boards => {
        let board1:Board = boards[0];
        let board2:Board = boards[1];
        if (board2.getNumberOfAliveCells() == 0)
          return 'No alive cells';
        else if (board1.equals(board2))
          return 'All cells stable';
        else
          return 'Cell development in progress...';
      })
      .startWith('No alive cells');

    this.highscore = this.generation.scan((a, b) => Math.max(a,b), 0);
  }

}
