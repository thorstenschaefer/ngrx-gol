import { Board } from './board';
import { Settings } from './settings';

export interface State {
  board: Board;
  settings: Settings;
  generation: number;
}
