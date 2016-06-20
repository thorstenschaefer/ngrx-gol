export interface Cell {
    x:number,
    y:number,
    alive:boolean,
    index:number
}

export class Board {

    /**
     * Internal representation of all cells.
     */
    data:boolean[][];

    constructor(public width:number, public height:number) {
        this.data = [];
        for (let x = 0; x< width; x++) {
            let row = [];
            for (let y = 0; y<height; y++) {
                row.push(false);
            }
            this.data.push(row);
        }
    }

    /**
     * Sets the cell at the given coordinates to be alive (true) or dead (false).
     */
    public setCell(x:number, y:number, value:boolean) {
        this.data[x][y] = value;
    }

    /** 
     * Switches a cell from dead to alive or alive to dead.
     */
    toggleCell(x:number, y:number) {
        this.data[x][y] = !this.data[x][y];
    }

    /**
     * Returns whether the cell at the given coordinate is alive (true) or dead (false).
     */
    getCell(x:number, y:number):boolean {
        let modX = this.getFlippedCoordinate(x, this.width, 'x');
        let modY = this.getFlippedCoordinate(y, this.height, 'y');
        return this.data[modX][modY];
    }

    /**
     * Returns the number of alive neighbor cells.
     */
    getAliveNeighborCells(x:number, y:number):number {
        let neighbors = 0;
        for (let nx = x-1; nx<=x+1; nx++) {
            for (let ny = y-1; ny<=y+1; ny++) {
                if (nx == x && ny == y)
                    continue;
                if (this.getCell(nx, ny))
                    neighbors = neighbors+1;
            }
        }
        return neighbors;
    }

    getNumberOfAliveCells():number {
        let aliveCells = 0;
        for (let x = 0; x< this.width; x++)
            for (let y=0; y<this.height; y++)
                if (this.data[x][y])
                    aliveCells += 1;
        return aliveCells;
    }

    /**
     * Creates a new board for the next cell generation based on the 4 rules of the game.
     * See: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
     */
    createNextGeneration():Board {
        let nextGeneration = this.clone();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y ++) {
                let cellAlive = this.getCell(x,y);
                let neighbors = this.getAliveNeighborCells(x, y);
                if (cellAlive) {
                    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                    if (neighbors < 2)
                        nextGeneration.setCell(x, y, false);
                    // Any live cell with two or three live neighbours lives on to the next generation.
                    else if (neighbors  == 2 || neighbors == 3)
                        nextGeneration.setCell(x, y, true);
                    // Any live cell with more than three live neighbours dies, as if by over-population.
                    else
                        nextGeneration.setCell(x,y, false);
                } else {
                    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                    if (neighbors == 3)
                        nextGeneration.setCell(x, y, true);
                }
            }
        }
        return nextGeneration;
    }

    /**
     * Creates an exact deep copy of this board.
     */
    clone():Board {
        let clone = new Board(this.width, this.height);
        clone.data = JSON.parse(JSON.stringify(this.data));
        return clone;
    }

    /**
     * Handles coordinate flips one the sides of the board.
     * If a cell is on the boarder, we assume it's neighbors are on the other side,
     * both horizontally and vertically.
     * 
     * For instance, in the 3*3 board depicted below, the neighbors of '4' on the
     * left side are '3', '6' and '9' as they flip over to the other side.
     * 
     * [1 2 3]
     * [4 5 6]
     * [7 8 9]
     */
    private getFlippedCoordinate(coordinate:number, max:number, axis:string):number {
        let flipped = coordinate;
        if (coordinate == -1)
            flipped = this.width - 1;
        else if (coordinate == max)
            flipped = 0;
        else if (coordinate > max || coordinate<-1)
            throw Error("Invalid " + axis + " coordinate index: " + coordinate + ". Max is: " + max);
        return flipped;
    }
}
