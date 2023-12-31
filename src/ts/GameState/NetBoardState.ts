import { Connection } from "../Net/Connection";
import { BoardState } from "./BoardState";
import { GameStateManager } from "./GameStateManager";

export class NetBoardState extends BoardState {
    /*private*/ conn: Connection;

    constructor(gsm: GameStateManager, conn: Connection) {
        super(gsm, 3, 3);
        this.conn = conn;
        conn.receiveMove = this.receiveMove.bind(this);
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseReleased(x: number, y: number): boolean {
        return this.conn.connected() && this.board.getTurn() === this.conn.getLocalTurn() && super.mouseReleased(x, y);
    }

    public receiveMove(x: number, y: number) {
        super.makeMove(x, y);
    }

    public makeMove(x: number, y: number) {
        if (this.conn.connected() && this.board.getTurn() === this.conn.getLocalTurn()){
            this.conn.sendMove(x, y);
            super.makeMove(x, y);
        }
    }

    /**
     * 
     */
    public draw() {
        super.draw();
        this.context.fillStyle = <any>((<any>"darkgray"));
        if (!this.conn.connected()){
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.text("Connecting...", this.width / 2, this.height / 2);
        } else {
            this.context.textAlign = "left";
            this.context.textBaseline = "top";
            if (this.board.getTurn() === this.conn.getLocalTurn()){
                this.text("Your turn", 10, 10);
            } else {
                this.text(this.conn.getPlayerName() + "\'s turn", 10, 10);
            }
        }
    }

    /**
     * 
     */
    public dispose() {
        this.conn.close();
    }
}

