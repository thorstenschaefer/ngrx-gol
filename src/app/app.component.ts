import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BoardComponent } from './board';
import { Board } from './model/board';
import { RESET, TOGGLE_CELL, NEXT_GENERATION, POPULATE } from './reducers/board.reducer';

interface AppState {
  board: Board;
}



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [BoardComponent]
})
export class AppComponent {

  title = 'app works!';

  board$:Observable<Board>;

  constructor(public store: Store<AppState>) {
    this.store.subscribe(s => console.log('state changed: ', s));
    this.board$ = this.store.select('board');

  }

  handleCellSelection(cell) {
    console.log('cell is selected', event);
    this.store.dispatch( { type: TOGGLE_CELL, payload: { x: cell.x, y:cell.y} })
  }

  createNextGeneration(cell) {
    this.store.dispatch( { type: NEXT_GENERATION } );
  }

  populate() {
    this.store.dispatch( { type: POPULATE, payload: { density: 0.3 } } );
  }

  resetBoard() {
    this.store.dispatch({ type: RESET });
  }
}


