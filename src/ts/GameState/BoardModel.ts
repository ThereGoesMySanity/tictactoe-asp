import BoardModule from "../../js/BoardModel.js";
import "../../js/BoardModel.wasm";

var Module;
BoardModule().then((module) => {Module = module});

export class BoardModel {

    constructor(boardSize: number, inARow: number) {
        this.getBoard = Module.cwrap('getBoard2', 'number', ['number', 'number']);
        this.setBoard = Module.cwrap('setBoard2', 'void', ['number', 'number', 'number']);
        this.inBounds = Module.cwrap('inBounds2', 'boolean', ['number', 'number']);
        this.getTurn = Module.cwrap('getTurn', 'number', []);
        this.getWin = Module.cwrap('getWin', 'string', []);
        this.makeMove = Module.cwrap('makeMove2', 'void', ['number', 'number']);
        // this.updateBoard = Module.cwrap('_updateBoard', 'number', ['number', 'number']);

        Module.ccall('init', 'void', ['number', 'number'], [3, 3]);
    }

    get width() : number {
        return Module.ccall('getWidth', 'number', []);
    }
    get height() : number {
        return Module.ccall('getHeight', 'number', []);
    }

    // public updateBoard : () => void;

    public setBoard : (x: number, y: number, val: number) => void;

    public getBoard : (x: number, y: number) => number;

    public inBounds : (x: number, y: number) => boolean;

    public getTurn :  () => number;

    public getWin : () => string;

    public makeMove : (x: number, y: number) => void;
}


