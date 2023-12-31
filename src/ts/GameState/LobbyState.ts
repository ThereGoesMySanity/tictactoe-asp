import { Connection } from "../Net/Connection";
import { GameState } from "./GameState";
import { GameStateManager } from "./GameStateManager";
import { Rectangle } from "./Rectangle";

export class LobbyState extends GameState {
    /*private*/ currentChoice: number;

    /*private*/ rects: Rectangle[];

    /*private*/ titleColor: string;

    connection: Connection;

    constructor(gsm: GameStateManager, connection: Connection) {
        super(gsm);
        this.currentChoice = 0;
        this.titleColor = "#800000FF";
        this.connection = connection;
    }

    public update() {
        if (this.connection.connected()) {
            this.gsm.setState(GameStateManager.State.BOARDSTATE_NET);
        }
        if (this.rects?.length != this.connection.users.length) {
            this.rects = new Array(this.connection.users.length);
            const x: number = this.width / 2;
            const y: number = this.height / 3;
            const spacing: number = 60;
            for (let i: number = 0; i < /* size */(<number>this.connection.users.length); i++) {
                {
                    this.rects[i] = new Rectangle(x, y + (<any>Math).fround(((<any>Math).fround(i - 0.2)) * spacing), this.width - x, (<any>Math).fround(spacing * 0.6));
                };
            }
        }
    }


    /**
     * 
     */
    public draw() {
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillStyle = this.titleColor;
        this.text("Tic-Tac-Toe", this.width / 2, 32);
        for(let i: number = 0; i < /* size */(<number>this.connection.users.length); i++) {{
            if (i === this.currentChoice){
                this.context.fillStyle = <any>((<any>"darkgray"));
            } else {
                this.context.fillStyle = <any>((<any>"lightgray"));
            }
            this.context.textBaseline = "middle";
            this.context.fillText(/* get */this.connection.users[i], this.rects[i].x(), this.rects[i].y() + this.rects[i].h() / 2);
        };}
        this.context.textBaseline = "alphabetic";
    }

    select(i: number) {
        this.currentChoice = i;
        this.connection.connectToUser(this.connection.users[i]);
        this.gsm.setState(GameStateManager.State.BOARDSTATE_NET);
    }

    /**
     * 
     * @param {number} k
     * @return {boolean}
     */
    public keyReleased(k: string): boolean {
        return true;
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseReleased(x: number, y: number): boolean {
        for(let i: number = 0; i < /* size */(<number>this.connection.users.length); i++) {{
            if (this.rects[i].contains(x, y)){
                this.select(i);
                return true;
            }
        };}
        return false;
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseMoved(x: number, y: number): boolean {
        for(let i: number = 0; i < /* size */(<number>this.connection.users.length); i++) {{
            if (this.rects[i].contains(x, y)){
                this.currentChoice = i;
                return true;
            }
        };}
        return false;
    }

    /**
     * 
     */
    public onResize() {
        super.onResize();
        if (this.connection.users === undefined) return;
        const x: number = this.width / 2.0;
        const y: number = this.height / 3.0;
        const spacing: number = 60;
        for(let i: number = 0; i < /* size */(<number>this.connection.users.length); i++) {{
            this.rects[i] = new Rectangle(x, y + (<any>Math).fround(((<any>Math).fround(i - 0.2)) * spacing), this.width - x, (<any>Math).fround(spacing * 0.6));
        };}
    }

    /**
     * 
     */
    /**
     * 
     */
    public dispose() {
    }
}