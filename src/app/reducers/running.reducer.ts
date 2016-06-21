import { ActionReducer, Action } from '@ngrx/store';

export const TOGGLE_ANIMATION = 'TOGGLE_ANIMATION';

export const runningReducer: ActionReducer<boolean> = (state: boolean = false, action: Action) => {

    switch (action.type) {
        case TOGGLE_ANIMATION:
            return !state;
        default:
            return state;
    }
}