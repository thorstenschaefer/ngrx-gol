import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { BoardComponent } from './board';
import { StatisticsComponent } from './statistics';

import { State } from './model/state';
import { Board } from './model/board';
import { Settings } from './model/settings';
import { RESET, TOGGLE_CELL, NEXT_GENERATION, POPULATE } from './reducers/board.reducer';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [BoardComponent, StatisticsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  board$:Observable<Board>;
  generation$:Observable<number>;
  empty$:Observable<boolean>;
  settings$:Observable<Settings>;

  constructor(public store: Store<State>) {
    this.board$ = <Observable<Board>> this.store.select('board');
    this.generation$ = <Observable<number>> this.store.select('generation');
    this.settings$ = <Observable<Settings>> this.store.select('settings');
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


