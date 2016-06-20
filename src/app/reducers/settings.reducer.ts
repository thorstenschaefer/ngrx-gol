import { ActionReducer, Action } from '@ngrx/store';

import { Settings } from '../model/settings';

export const RESET = 'RESET'; // no params


const DEFAULT_SETTINGS:Settings = {
    animationSpeed : 1,
    populationDensity: 0.4
}

/**
 * Currently does nothing. Just added a second reducer to understand the default case.
 */
export const settingsReducer: ActionReducer<Settings> = (state: Settings = DEFAULT_SETTINGS, action: Action) => {

    switch (action.type) {


        case RESET:
            return DEFAULT_SETTINGS;

        default:
            return state;
    }
}
