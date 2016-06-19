import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import 'rxjs/add/operator/distinctUntilChanged';

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

  board$:Observable<any>;
  // boardDimensions$:Observable<any>;

  constructor(public store: Store<AppState>) {
    this.store.subscribe(s => console.log('state changed: ', s));
    this.board$ = this.store.select('board');
    // this.boardDimensions$ = this.board$
    //   .map(board => { 
    //     return { 'width': board.width, 'height': board.heigth } 
    //   })
    //   .distinctUntilChanged((dim1, dim2) => dim1.height == dim2.height && dim1.width == dim2.width);


      // can be used to detect non-changing boards...
    // let x = Observable.from([1,2,3,4,5,6]);
    // x.bufferCount(2,1).subscribe(v => console.log('buffer ', v));


  }

  handleCellSelection(cell) {
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


