import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BoardComponent } from './board';
import { Board } from './model/board';
import { RESET, TOGGLE_CELL, NEXT_GENERATION, POPULATE } from './reducers/board.reducer';

interface AppState {
  board: Board;
  settings: any;
  generation: number;
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [BoardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  board$:Observable<Board>;
  generation$:Observable<number>;
  empty$:Observable<boolean>;

  constructor(public store: Store<AppState>) {
    this.board$ = <Observable<Board>> this.store.select('board');
    this.generation$ = <Observable<number>> this.store.select('generation');
    this.empty$ = this.board$.map(board => board.getNumberOfAliveCells() == 0);
  }

  handleCellSelection(cell) {
    this.store.dispatch( { type: TOGGLE_CELL, payload: { x: cell.x, y:cell.y} })
  }

  createNextGeneration() {
    this.store.dispatch( { type: NEXT_GENERATION } );
  }

  populate() {
    this.store.dispatch( { type: POPULATE, payload: { density: 0.3 } } );
  }

  resetBoard() {
    this.store.dispatch({ type: RESET });
  }
}


