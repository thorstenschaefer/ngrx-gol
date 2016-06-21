import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { State, Settings } from '../model';
import { RESET_SETTINGS, CHANGE_SETTINGS } from '../reducers/settings.reducer';

@Component({
  moduleId: module.id,
  selector: 'app-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent {

  private color:Observable<String>;
  private density:Observable<number>;
  
  constructor(public store: Store<State>) {
    let settings = <Observable<Settings>> this.store.select('settings');
    this.color = settings.map(settings => settings.color);
    this.density = settings.map(settings => settings.populationDensity);
  }

  resetSettings() {
    this.store.dispatch( { type : RESET_SETTINGS } );
  }

  changeColor(value) {
    this.store.dispatch( { type : CHANGE_SETTINGS, payload : { name: 'color', 'value' : value } } );
  }

  changeDensity(value) {
    this.store.dispatch( { type : CHANGE_SETTINGS, payload : { name: 'density', 'value' : value } } );
  }
}
