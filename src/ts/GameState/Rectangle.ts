export class Rectangle {
    /*private*/ __x: number;

    /*private*/ __y: number;

    /*private*/ __w: number;

    /*private*/ __h: number;

    public constructor(x: number, y: number, w: number, h: number) {
        this.__x = x;
        this.__y = y;
        this.__w = w;
        this.__h = h;
    }

    public x(): number {
        return this.__x;
    }

    public y(): number {
        return this.__y;
    }

    public w(): number {
        return this.__w;
    }

    public h(): number {
        return this.__h;
    }

    public contains(x: number, y: number): boolean {
        return x >= this.__x && y >= this.__y && x < this.__x + this.__w && y < this.__y + this.__h;
    }
}
