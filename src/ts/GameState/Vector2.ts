import { GridPoint2 } from "./GridPoint2";

export class Vector2 {
    /*private*/ __x: number;

    /*private*/ __y: number;

    public constructor(x: number, y: number) {
        if (this.__x === undefined) { this.__x = 0; }
        if (this.__y === undefined) { this.__y = 0; }
        this.__x = x;
        this.__y = y;
    }

    public x(): number {
        return this.__x;
    }

    public y(): number {
        return this.__y;
    }

    public add$tgms_ttt_GameState_Vector2(other: Vector2): Vector2 {
        return new Vector2(this.__x + other.__x, this.__y + other.__y);
    }

    public add$double$double(x: number, y: number): Vector2 {
        return new Vector2(this.__x + x, this.__y + y);
    }

    public add(x?: any, y?: any): Vector2 {
        if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.add$double$double(x, y);
        } else if (((x != null && x instanceof <any>Vector2) || x === null) && y === undefined) {
            return <any>this.add$tgms_ttt_GameState_Vector2(x);
        } else throw new Error('invalid overload');
    }

    public sub(other: Vector2): Vector2 {
        return new Vector2(this.__x - other.__x, this.__y - other.__y);
    }

    public scl(scale: number): Vector2 {
        return new Vector2(this.__x * scale, this.__y * scale);
    }

    public toPoint(): GridPoint2 {
        return new GridPoint2((<number>this.__x|0), (<number>this.__y|0));
    }
}