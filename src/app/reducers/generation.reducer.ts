import { ActionReducer, Action } from '@ngrx/store';

import { RESET, TOGGLE_CELL, NEXT_GENERATION, POPULATE } from './board.reducer';

export const generationReducer: ActionReducer<number> = (state: number = 0, action: Action) => {

    switch (action.type) {
        case POPULATE:
        case RESET:
            return 0;
        case NEXT_GENERATION:
            return state + 1;

        case TOGGLE_CELL:
        default:
            return state;
    }
}
