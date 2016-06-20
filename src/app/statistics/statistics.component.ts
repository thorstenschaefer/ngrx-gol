import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Board } from '../model/board';
import { State } from '../model/state';

@Component({
  moduleId: module.id,
  selector: 'app-statistics',
  templateUrl: 'statistics.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent {

  @Input()
  board:Observable<Board>;

  @Input()
  generation:Observable<Board>;

}
