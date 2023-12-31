export class GridPoint2 {
    /*private*/ x: number;

    /*private*/ y: number;

    public constructor(x: number, y: number) {
        if (this.x === undefined) { this.x = 0; }
        if (this.y === undefined) { this.y = 0; }
        this.x = x;
        this.y = y;
    }

    public cpy(): GridPoint2 {
        return new GridPoint2(this.x, this.y);
    }

    public sub$tgms_ttt_GameState_GridPoint2(other: GridPoint2): GridPoint2 {
        return new GridPoint2(this.x - other.x, this.y - other.y);
    }

    public add$tgms_ttt_GameState_GridPoint2(other: GridPoint2): GridPoint2 {
        return new GridPoint2(this.x + other.x, this.y + other.y);
    }

    public add$int$int(x: number, y: number): GridPoint2 {
        return new GridPoint2(this.x + x, this.y + y);
    }

    public add(x?: any, y?: any): GridPoint2 {
        if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.add$int$int(x, y);
        } else if (((x != null && x instanceof <any>GridPoint2) || x === null) && y === undefined) {
            return <any>this.add$tgms_ttt_GameState_GridPoint2(x);
        } else throw new Error('invalid overload');
    }

    public sub$int$int(x: number, y: number): GridPoint2 {
        return new GridPoint2(this.x - x, this.y - y);
    }

    public sub(x?: any, y?: any): GridPoint2 {
        if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.sub$int$int(x, y);
        } else if (((x != null && x instanceof <any>GridPoint2) || x === null) && y === undefined) {
            return <any>this.sub$tgms_ttt_GameState_GridPoint2(x);
        } else throw new Error('invalid overload');
    }
}