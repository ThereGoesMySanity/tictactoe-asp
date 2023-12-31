import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Connection } from './Connection';
export class WebSocketConnection extends Connection {
    socket : HubConnection;

    public constructor(name: string) {
        super(name);
        this.socket = new HubConnectionBuilder()
            .withUrl("http://"+window.location.host+"/server")
            .withAutomaticReconnect()
            .build();
    }
    public sendMove(x: number, y: number): void {
        this.socket.send("move", x, y);
    }
    public connectToUser(user: string): void {
        this.socket.send("connectToUser", user);
    }
    public close(): void {
        this.socket.stop();
    }
    
    public async start() : Promise<void> {
        await this.socket.start();
        this.socket.on("getUsers", this.getUsers.bind(this));
        this.socket.on("startGame", this.startGame.bind(this));
        this.socket.on("move", this.move.bind(this));
        this.socket.send("connect", this.user.name);
    }
}