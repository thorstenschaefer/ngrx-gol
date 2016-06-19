import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { AppComponent, environment } from './app/';

import { boardReducer } from './app/reducers/board.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
    provideStore({ board: boardReducer })  
]);

