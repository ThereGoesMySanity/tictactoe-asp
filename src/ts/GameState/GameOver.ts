import { GameState } from "./GameState";
import { BoardState } from "./BoardState";
import { GameStateManager } from "./GameStateManager";

export class GameOver extends GameState {
    board: BoardState;

    constructor(gsm: GameStateManager, state: BoardState) {
        super(gsm);
        this.board = state;
    }

    /**
     * 
     */
    public update() {
    }

    /**
     * 
     */
    public draw() {
        this.board.draw();
        this.context.fillStyle = <any>((<any>"#00ff00"));
        const gameOver: TextMetrics = this.context.measureText("Game Over");
        const winner: TextMetrics = this.context.measureText(this.gsm.WIN + " Wins");
        const x: number = ((this.width - gameOver.width) / 2);
        const x2: number = ((this.width - winner.width) / 2);
        this.context.fillText("Game Over", x, 32);
        this.context.fillText(this.gsm.WIN + " Wins", x2, 128);
    }

    /**
     * 
     * @param {number} k
     * @return {boolean}
     */
    public keyReleased(k: string): boolean {
        return false;
    }

    /*private*/ select() {
        this.gsm.setState(GameStateManager.State.BOARDSTATE);
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseReleased(x: number, y: number): boolean {
        return false;
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseMoved(x: number, y: number): boolean {
        return false;
    }

    /**
     * 
     */
    public onResize() {
        super.onResize();
        this.board.onResize();
    }

    /**
     * 
     */
    public dispose() {
    }
}

