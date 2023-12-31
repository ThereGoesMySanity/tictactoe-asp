import { Connection } from "../Net/Connection";
import { WebSocketConnection } from "../Net/WebSocketConnection";
import { BoardState } from "./BoardState";
import { GameOver } from "./GameOver";
import { GameState } from "./GameState";
import { LobbyState } from "./LobbyState";
import { MenuState } from "./MenuState";
import { NetBoardState } from "./NetBoardState";
import { OptionsState } from "./OptionsState";

export class GameStateManager {
        /*private*/ currentState: GameState | null;

    public WIN: string;

    public xColor: string;

    public oColor: string;

    public boardColor: string;

        /*private*/ canvas: HTMLCanvasElement;


    public constructor(c: HTMLCanvasElement) {
        this.currentState = null;
        this.xColor = "red";
        this.oColor = "blue";
        this.boardColor = "black";
        this.canvas = c;

        c.onmousemove = this.onMouseMove.bind(this);
        c.onmouseup = this.onMouseUp.bind(this);
        c.onkeyup = this.onKeyUp.bind(this);

        this.setState(GameStateManager.State.MENUSTATE);
    }

    async loadState(state: GameStateManager.State, oldState: GameState | null): Promise<GameState | undefined> {
        switch ((state)) {
            case GameStateManager.State.MENUSTATE:
                return new MenuState(this);
            case GameStateManager.State.BOARDSTATE:
                return new BoardState(this, 3, 3);
            case GameStateManager.State.LOBBYSTATE:
                const conn: Connection = new WebSocketConnection(
                    window.prompt("Enter username", "")!);
                await conn.start();
                return new LobbyState(this, conn);
            case GameStateManager.State.BOARDSTATE_NET:
                return new NetBoardState(this, (<LobbyState>oldState).connection);
            case GameStateManager.State.OPTIONSSTATE:
                return new OptionsState(this);
            case GameStateManager.State.GAMEOVER:
                return new GameOver(this, <BoardState>oldState);
        }
    }

    public async setState(boardstate: GameStateManager.State) {
        const oldState = this.currentState;
        this.currentState = null;
        const s: GameState | undefined = await this.loadState(boardstate, oldState);
        if (s) {
            this.unloadState(oldState);
            this.currentState = s;
            this.onResize();
        } else {
            this.currentState = oldState;
        }
    }

    public unloadState(state: GameState | null) {
        if (state != null) {
            state.dispose();
        }
    }

    public getContext(): CanvasRenderingContext2D | null {
        return this.canvas.getContext("2d");
    }

    public onKeyUp(event: KeyboardEvent) {
        this.currentState?.keyReleased(event.key);
    }

    public onMouseMove(event: MouseEvent) {
        this.currentState?.mouseMoved(event.offsetX, event.offsetY);
    }

    public onMouseUp(event: MouseEvent) {
        this.currentState?.mouseReleased(event.offsetX, event.offsetY);
    }

    public update() {
        if (this.canvas.width !== this.canvas.clientWidth || this.canvas.height !== this.canvas.clientHeight)
            this.onResize();
        this.currentState?.update();
    }

    public draw() {
        const context = this.getContext();
        if (context) {
            context.fillStyle = "white";
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            context.font = "48px Arial";
            this.currentState?.draw();
        }
    }

    public onResize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.currentState?.onResize();
    }

    public dispose() {
        this.currentState?.dispose();
    }
}
export namespace GameStateManager {
    export enum State {
        MENUSTATE, BOARDSTATE, LOBBYSTATE, BOARDSTATE_NET, OPTIONSSTATE, GAMEOVER
    }
}

