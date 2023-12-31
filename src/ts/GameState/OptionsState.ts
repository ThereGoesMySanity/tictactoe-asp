import { GameState } from "./GameState";
import { GameStateManager } from "./GameStateManager";
import { Rectangle } from "./Rectangle";

export class OptionsState extends GameState {
    /*private*/ options: Array<string>;

    /*private*/ rects: Rectangle[];

    /*private*/ colorNames: string[];

    /*private*/ xColor: number;

    /*private*/ oColor: number;

    /*private*/ boardColor: number;

    /*private*/ titleColor: string;

    /*private*/ currentChoice: number;

    constructor(gsm: GameStateManager) {
        super(gsm);
        this.colorNames = ["Red", "Blue", "Green", "Pink", "Black"];
        this.xColor = 0;
        this.oColor = 1;
        this.boardColor = 4;
        this.options = [
            "X color",
            "O color",
            "Board color",
            "Back"];
        this.rects = new Array(this.options.length);
        for(let i: number = 0; i < this.options.length; i++) {{
            this.rects[i] = new Rectangle(i, i, i, i);
        };}
        this.titleColor = "#800000";
    }

    /**
     * 
     */
    public draw() {
        this.context.fillStyle = <any>((<any>this.titleColor));
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.text("Options", this.width / 2, 60);
        this.context.textAlign = "left";
        this.context.textBaseline = "top";
        for(let i: number = 0; i < /* size */(<number>this.options.length); i++) {{
            if (i === this.currentChoice){
                this.context.fillStyle = <any>((<any>"darkgray"));
            } else {
                this.context.fillStyle = <any>((<any>"lightgray"));
            }
            switch((i)) {
            case 0:
                this.text(this.colorNames[this.xColor], (400), ((200 + i * 60)));
                break;
            case 1:
                this.text(<string>this.colorNames[this.oColor], (400), ((200 + i * 60)));
                break;
            case 2:
                this.text(<string>this.colorNames[this.boardColor], (400), ((200 + i * 60)));
                break;
            }
            this.text(/* get */this.options[i], (150), ((200 + i * 60)));
        };}
    }

    /*private*/ select(choice: number) {
        switch((choice)) {
        case 0:
            this.xColor++;
            if (this.xColor === this.oColor)this.xColor++;
            this.xColor %= 5;
            this.gsm.xColor = this.colorNames[choice];
            break;
        case 1:
            this.oColor++;
            if (this.xColor === this.oColor)this.oColor++;
            this.oColor %= 5;
            this.gsm.oColor = this.colorNames[choice];
            break;
        case 2:
            this.boardColor++;
            this.boardColor %= 5;
            this.gsm.boardColor = this.colorNames[choice];
            break;
        case 3:
            this.gsm.setState(GameStateManager.State.MENUSTATE);
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
        if (y >= (160) && y <= ((160 + /* size */(<number>this.options.length) * 60)) && x >= (150)){
            this.select(((y - 160) / 60|0));
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    public mouseMoved(x: number, y: number): boolean {
        if (y >= (160) && y <= (160 + /* size */(<number>this.options.length) * 60) && x >= (150)){
            this.currentChoice = (((x - (160)) / (60)|0));
            return true;
        }
        return false;
    }

    /**
     * 
     */
    public onResize() {
        super.onResize();
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