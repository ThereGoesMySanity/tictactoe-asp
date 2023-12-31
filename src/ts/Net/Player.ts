export class Player {
    public name : string;
    public turn : number;
    constructor(init : Partial<Player>) {
        Object.assign(this, init);
    }
}