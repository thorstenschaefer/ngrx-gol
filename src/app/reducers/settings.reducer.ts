import { ActionReducer, Action } from '@ngrx/store';

import { Settings } from '../model';

export const RESET_SETTINGS = 'RESET_SETTINGS'; // no params
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS'; // name and value

const DEFAULT_SETTINGS:Settings = {
    animationSpeed : 1,
    populationDensity: 40,
    color: '#ff0000'
}

/**
 * Currently does nothing. Just added a second reducer to understand the default case.
 */
export const settingsReducer: ActionReducer<Settings> = (state: Settings = DEFAULT_SETTINGS, action: Action) => {

    switch (action.type) {

        case CHANGE_SETTINGS:
            let newState = Object.assign({}, state);
            switch (action.payload.name) {
                case 'color':
                    newState.color = action.payload.value;
                    return newState;
                case 'density':
                    newState.populationDensity = action.payload.value;
                    return newState;
                default:
                    return state;
            }
        case RESET_SETTINGS:
            return DEFAULT_SETTINGS;

        default:
            return state;
    }
}
