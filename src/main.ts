import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { AppComponent, environment } from './app/';

import { boardReducer } from './app/reducers/board.reducer';
import { generationReducer } from './app/reducers/generation.reducer';
import { settingsReducer } from './app/reducers/settings.reducer';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
    provideStore({ board: boardReducer, settings: settingsReducer, generation: generationReducer })  
]);

