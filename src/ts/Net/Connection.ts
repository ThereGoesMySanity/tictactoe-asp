import { Player } from "./Player";

export abstract class Connection {
    users: string[];

    user: Player;

    userTwo: Player;

    _connected: boolean;

    receiveMove: (x: number, y: number) => void;

    public constructor(username: string) {
        this.user = new Player({name: username});
        this._connected = false;
    }

    public connected(): boolean {
        return this._connected;
    }

    public getUsers(users: string[]) {
        users.splice(users.indexOf(this.user.name), 1);
        this.users = users;
    }

    public startGame(user: string, turn: number) {
        this._connected = true;
        this.userTwo = new Player({name: user, turn});
        this.user.turn = 3 - turn;
    }

    public move(x: number, y: number) {
        if (this.receiveMove) this.receiveMove(x, y);
    }

    public getLocalTurn(): number {
        return this.getUser().turn;
    }

    public getPlayerName(): string | null {
        return this.userTwo?.name;
    }

    public getUser(): Player {
        return this.user;
    }

    public abstract start() : Promise<void>;

    public abstract sendMove(x: number, y: number) : void;

    public abstract connectToUser(user: string) : void;

    public abstract close() : void;
}