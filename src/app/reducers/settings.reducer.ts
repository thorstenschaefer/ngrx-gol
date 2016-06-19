import { ActionReducer, Action } from '@ngrx/store';

export const RESET = 'RESET'; // no params

/**
 * Currently does nothing. Just added a second reducer to understand the default case.
 */
export const settingsReducer: ActionReducer<any> = (state: any = {}, action: Action) => {

    switch (action.type) {


        case RESET:
            return {};

        default:
            return state;
    }
}
