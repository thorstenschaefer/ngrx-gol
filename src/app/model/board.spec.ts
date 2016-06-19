/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Board} from './board';

describe('Board', () => {
  
  let board:Board;

  beforeEach(() => {
    this.board = new Board(10, 10);
  })

  it('should create an instance', () => {
    expect(this.board).toBeTruthy();
  });

  it('initially board has no alive cells', () => {
    for (let x=0; x<10; x++) {
      for (let y=0; y<10; y++) {
        expect(this.board.getCell(x,y)).toBe(false);
      }
    }
  });

  it('can set a cell to be alive', () => {
    this.board.setCell(5,5, true);
    expect(this.board.getCell(5,5)).toBe(true);
  });

  // it('cannot set a cell outside of boards width', () => {
  //   let board = new Board(10, 10);
  //   board.setCell(15,5, true);
  // });
  // it('cannot set a cell outside of boards height', () => {
  //   let board = new Board(10, 10);
  //   board.setCell(5, 15, true);
  // });
});
