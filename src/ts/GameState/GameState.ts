import { GameStateManager } from "./GameStateManager";
import { Vector2 } from "./Vector2";

export abstract class GameState {
    font: string;

    gsm: GameStateManager;

    context: CanvasRenderingContext2D;

    width: number;

    height: number;

    constructor(gsm: GameStateManager) {
        this.font = "Arial";
        this.gsm = gsm;
        this.context = gsm.getContext()!;
        this.context.font = ("48px \"" + this.font + "\"");
    }

    path(start: Vector2, ...points: Vector2[]) {
        this.context.beginPath();
        this.context.moveTo(start.x(), start.y());
        for(let index = 0; index < points.length; index++) {
            let point = points[index];
            {
                this.context.lineTo(point.x(), point.y());
            }
        }
        this.context.stroke();
    }

    public text(text: string, x: number, y: number) {
        this.context.fillText(text, x, y);
        this.context.stroke();
    }

    public onResize() {
        this.width = this.gsm.canvas.width;
        this.height = this.gsm.canvas.height;
    }

    public abstract update();

    public abstract draw();

    public abstract keyReleased(k: string): boolean;

    public abstract mouseReleased(x: number, y: number): boolean;

    public abstract mouseMoved(x: number, y: number): boolean;

    public abstract dispose();
}

