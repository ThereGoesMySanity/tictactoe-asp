import { BoardModel } from "./BoardModel";
import { GameState } from "./GameState";
import { GameStateManager } from "./GameStateManager";
import { GridPoint2 } from "./GridPoint2";
import { Vector2 } from "./Vector2";

export class BoardState extends GameState {
    board: BoardModel;

    /*private*/ mouse: GridPoint2;

    /*private*/ offset: Vector2;

    /*private*/ squareSize: number;

    /*private*/ colorX: string;

    /*private*/ colorO: string;

    /*private*/ colorBoard: string;

    constructor(gsm: GameStateManager, boardSize : number, inARow : number) {
        super(gsm);
        this.board = new BoardModel(boardSize, inARow);
        this.colorX = gsm.xColor;
        this.colorO = gsm.oColor;
        this.colorBoard = gsm.boardColor;
        this.updateOffset();
    }

    /*private*/ getCoords2(p: GridPoint2): Vector2 {
        return this.getCoords(p.x, p.y);
    }

    public getCoords(x: number, y: number): Vector2 {
        return new Vector2(x, y).scl(this.squareSize).add$tgms_ttt_GameState_Vector2(this.offset);
    }

    /*private*/ getBoard(coords: Vector2): GridPoint2 {
        return coords.sub(this.offset).scl(1 / this.squareSize).toPoint();
    }

    /*private*/ drawGrid() {
        let point1: Vector2;
        let point2: Vector2;
        for(let i: number = 0; i < this.board.width; i++) {{
            for(let j: number = 0; j < this.board.height; j++) {{
                if (this.board.getBoard(i, j) !== 5){
                    if (j !== this.board.height - 1 && this.board.getBoard(i, j + 1) !== 5){
                        point1 = this.getCoords(i, j + 1);
                        point2 = this.getCoords(i + 1, j + 1);
                        this.path(point1, point2);
                    }
                    if (i !== this.board.width - 1 && this.board.getBoard(i + 1, j) !== 5){
                        point1 = this.getCoords(i + 1, j);
                        point2 = this.getCoords(i + 1, j + 1);
                        this.path(point1, point2);
                    }
                }
            };}
        };}
    }

    /**
     * 
     */
    public draw() {
        if (this.mouse !== undefined) {
            const point: Vector2 = this.getCoords2(this.mouse);
            if (this.board.inBounds(this.mouse.x, this.mouse.y) && this.board.getBoard(this.mouse.x, this.mouse.y) !== 5) {
                this.context.fillStyle = <any>((<any>"#00ff00"));
                this.context.fillRect(point.x(), point.y(), this.squareSize, this.squareSize);
            }
        }
        this.context.strokeStyle = <any>((<any>this.colorBoard));
        this.drawGrid();
        for(let i: number = 0; i < this.board.width; i++) {{
            for(let j: number = 0; j < this.board.height; j++) {{
                if (this.board.getBoard(i, j) !== 5 && this.board.getBoard(i, j) !== 0){
                    this.context.strokeStyle = <any>((<any>this.colorBoard));
                    switch((this.board.getBoard(i, j))) {
                    case 3:
                        this.context.strokeStyle = <any>((<any>this.colorX));
                        break;
                    case 4:
                        this.context.strokeStyle = <any>((<any>this.colorO));
                        break;
                    }
                    this.drawShape(this.context, i, j);
                    if (this.board.getBoard(i, j) === 3 || this.board.getBoard(i, j) === 4)this.drawMatch(this.context, i, j);
                }
            };}
        };}
    }

    /*private*/ drawShape(context: CanvasRenderingContext2D, x: number, y: number) {
        if (this.board.getBoard(x, y) === 1 || this.board.getBoard(x, y) === 3){
            this.path(this.getCoords(x, y), this.getCoords(x + 1, y + 1));
            this.path(this.getCoords(x + 1, y), this.getCoords(x, y + 1));
        } else if (this.board.getBoard(x, y) === 2 || this.board.getBoard(x, y) === 4){
            const point: Vector2 = this.getCoords(x, y).add$double$double(this.squareSize / 2, this.squareSize / 2);
            context.beginPath();
            context.arc(point.x(), point.y(), this.squareSize / 2, 0, 2 * Math.PI);
            context.stroke();
        }
    }

    /*private*/ drawMatch(context: CanvasRenderingContext2D, x: number, y: number) {
        for(let k: number = -1; k < 2; k++) {{
            for(let l: number = -1; l < 2; l++) {{
                if (this.board.inBounds(x + l, y + k) && this.board.getBoard(x + l, y + k) === this.board.getBoard(x, y)){
                    const center: Vector2 = new Vector2(this.squareSize / 2, this.squareSize / 2);
                    const point1: Vector2 = this.getCoords(x, y).add$tgms_ttt_GameState_Vector2(center);
                    const point2: Vector2 = this.getCoords(x + l, y + k).add$tgms_ttt_GameState_Vector2(center);
                    context.lineWidth = (3);
                    this.path(point1, point2);
                    context.lineWidth = (1);
                }
            };}
        };}
    }

    /**
     * 
     * @param {number} k
     * @return {boolean}
     */
    public keyReleased(k: string): boolean {
        return true;
    }

    /*private*/ updateOffset() {
        if (this.board.height * this.width > this.board.width * this.height){
            this.squareSize = this.height * 1.0 / this.board.height;
            this.offset = new Vector2((this.width - this.squareSize * this.board.width) / 2, 0);
        } else if (this.board.height * this.width < this.board.width * this.height){
            this.squareSize = this.width * 1.0 / this.board.width;
            this.offset = new Vector2(0, (this.height - this.squareSize * this.board.height) / 2);
        } else {
            this.squareSize = this.width * 1.0 / this.board.height;
            this.offset = new Vector2(0, 0);
        }
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseReleased(x: number, y: number): boolean {
        const p: GridPoint2 = this.getBoard(new Vector2(x, y));
        if (this.board.inBounds(p.x, p.y)){
            this.makeMove(p.x, p.y);
        }
        return true;
    }

    public makeMove(x: number, y: number) {
        this.board.makeMove(x, y);
        this.checkState();
    }

    /*private*/ checkState() {
        this.updateOffset();
        if (this.board.getWin() != ""){
            this.gsm.WIN = this.board.getWin();
            this.gsm.setState(GameStateManager.State.GAMEOVER);
        }
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseMoved(x: number, y: number): boolean {
        const p: GridPoint2 = this.getBoard(new Vector2(x, y));
        if (this.board.inBounds(p.x, p.y)){
            this.mouse = p;
        }
        return true;
    }

    /**
     * 
     */
    public onResize() {
        super.onResize();
        this.updateOffset();
    }

    /**
     * 
     */
    public update() {
    }

    /**
     * 
     */
    public dispose() {
    }
}

