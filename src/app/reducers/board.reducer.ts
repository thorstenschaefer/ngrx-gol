import { ActionReducer, Action } from '@ngrx/store';

import { Board } from '../model/board';

export const RESET = 'RESET'; // no params
export const TOGGLE_CELL = 'TOGGLE_CELL'; // x, y
export const NEXT_GENERATION = 'NEXT_GENERATION'; // no params
export const POPULATE = 'POPULATE'; // density: number between 0 and 1

// empty 50*30 board
const DEFAULT_BOARD = new Board(50,30);

export const boardReducer: ActionReducer<Board> = (state: Board = DEFAULT_BOARD.clone(), action: Action) => {

    switch (action.type) {
        case POPULATE: {
            let board = DEFAULT_BOARD.clone();
            for (let x = 0; x < 50; x++) {
                for (let y = 0; y < 30; y++) {
                    board.setCell(x, y, Math.random() < action.payload.density);
                }
            }
            return board;
        }

        case NEXT_GENERATION:
            return state.createNextGeneration();

        case TOGGLE_CELL: {
            let board = state.clone();
            board.toggleCell(action.payload.x, action.payload.y);
            return board;
        }

        case RESET:
            return DEFAULT_BOARD.clone();

        default:
            return state;
    }
}
