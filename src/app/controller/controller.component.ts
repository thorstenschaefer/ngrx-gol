import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Board, Settings, State } from '../model';
import { RESET, NEXT_GENERATION, POPULATE } from '../reducers/board.reducer';
import { TOGGLE_ANIMATION } from '../reducers/running.reducer';

@Component({
  moduleId: module.id,
  selector: 'app-controller',
  templateUrl: 'controller.component.html'
})
export class ControllerComponent {

  population = new Subject();
  animation = new Subject();

  board$:Observable<Board>;
  empty$:Observable<boolean>;
  running$:Observable<boolean>;

  constructor(public store: Store<State>) {
    this.board$ = <Observable<Board>> this.store.select('board');
    this.empty$ = this.board$.map(board => board.getNumberOfAliveCells() == 0);
    this.running$ = <Observable<boolean>> this.store.select('running');

    let settings = <Observable<Settings>> this.store.select('settings')
    let populationSettings = settings.map(settings => settings.populationDensity);
    this.population.withLatestFrom(populationSettings).subscribe(event => this.populate(event[1]));

    this.animation.subscribe(v => this.store.dispatch( { type: TOGGLE_ANIMATION }));
  }

  createNextGeneration() {
    this.store.dispatch( { type: NEXT_GENERATION } );
  }

  populate(value:number) {
    this.store.dispatch( { type: POPULATE, payload: { density: value/100 } } );
  }

  resetBoard() {
    this.store.dispatch({ type: RESET });
  }

}
