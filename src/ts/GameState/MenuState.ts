import { GameState } from "./GameState";
import { GameStateManager } from "./GameStateManager";
import { Rectangle } from "./Rectangle";

export class MenuState extends GameState {
    /*private*/ currentChoice: number;

    /*private*/ options: Array<string>;

    /*private*/ rects: Rectangle[];

    /*private*/ titleColor: string;

    constructor(gsm: GameStateManager) {
        super(gsm);
        this.currentChoice = 0;
        this.titleColor = "#800000FF";
        this.options = [
            "Start Local",
            "Start Online"];
        this.rects = new Array(this.options.length);
        const x: number = this.width / 2;
        const y: number = this.height / 3;
        const spacing: number = 60;
        for(let i: number = 0; i < /* size */(<number>this.options.length); i++) {{
            this.rects[i] = new Rectangle(x, y + (<any>Math).fround(((<any>Math).fround(i - 0.2)) * spacing), this.width - x, (<any>Math).fround(spacing * 0.6));
        };}
    }

    /**
     * 
     */
    public draw() {
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillStyle = this.titleColor;
        this.text("Tic-Tac-Toe", this.width / 2, 32);
        for(let i: number = 0; i < /* size */(<number>this.options.length); i++) {{
            if (i === this.currentChoice){
                this.context.fillStyle = <any>((<any>"darkgray"));
            } else {
                this.context.fillStyle = <any>((<any>"lightgray"));
            }
            this.context.textBaseline = "middle";
            this.context.fillText(/* get */this.options[i], this.rects[i].x(), this.rects[i].y() + this.rects[i].h() / 2);
        };}
        this.context.textBaseline = "alphabetic";
    }

    /*private*/ select(i: number) {
        switch((/* get */this.options[i])) {
        case "Start":
        case "Start Local":
            this.gsm.setState(GameStateManager.State.BOARDSTATE);
            break;
        case "Start Online":
            this.gsm.setState(GameStateManager.State.LOBBYSTATE);
            break;
        case "Options":
            this.gsm.setState(GameStateManager.State.OPTIONSSTATE);
            break;
        }
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
        for(let i: number = 0; i < /* size */(<number>this.options.length); i++) {{
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
        for(let i: number = 0; i < /* size */(<number>this.options.length); i++) {{
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
        const x: number = this.width / 2.0;
        const y: number = this.height / 3.0;
        const spacing: number = 60;
        for(let i: number = 0; i < /* size */(<number>this.options.length); i++) {{
            this.rects[i] = new Rectangle(x, y + (<any>Math).fround(((<any>Math).fround(i - 0.2)) * spacing), this.width - x, (<any>Math).fround(spacing * 0.6));
        };}
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