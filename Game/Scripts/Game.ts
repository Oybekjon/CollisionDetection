declare var $;
enum Direction {
    TopLeft,
    TopRight,
    BottomRight,
    BottomLeft
}

class Rectangle {
    id: string;
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    direction: Direction;

    constructor(id: string, width: number, height: number, x: number, y: number, color: string) {
        if (!id) {
            throw Error("Id must be there!");
        }
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        const rnd = new Random();
        const dir = rnd.next(0, 4);
        if (dir === 0)
            this.direction = Direction.BottomRight;
        else if (dir === 1)
            this.direction = Direction.BottomLeft;
        else if (dir === 2)
            this.direction = Direction.TopLeft;
        else
            this.direction = Direction.TopRight;
    }
}
class Game {
    models: Rectangle[] = [];

    get rectangleSize(): number {
        return 700;
    }


    draw() {
        const container = $("#Container");

        for (let i = 0; i < this.models.length; i++) {
            const current = this.models[i];

            const id = `#${current.id}`;
            let el = $(id, container);
            if (el.length === 0) {
                el = $(`<div id="${current.id}"/>`);
                container.append(el);
                el.css("position", "absolute");
                el.css("background-color", `${current.color}`);
            }
            el = $(id, container);
            el.css("width", `${current.width}px`);
            el.css("height", `${current.height}px`);

            el.animate({
                "top": `${current.y}px`,
                "left": `${current.x}px`
            }, 200, "linear");
        }
    }

    runAi() {
        const self = this;
        setInterval(() => {
            self.moveAll();
        }, 100);
    }

    private moveAll() {
        for (var i = 0; i < this.models.length; i++) {
            this.move(this.models[i]);
        }

        // Check and 
        // if overlap 
        //    Adjust positions

    }

    private move(rect: Rectangle) {
        let verticalReverse = false;
        let horizontalReverse = false;
        if (rect.direction === Direction.BottomRight || rect.direction === Direction.BottomLeft) {
            rect.y += 4;
            if (rect.y >= this.rectangleSize - rect.height) {
                verticalReverse = true;
                const diff = rect.y - this.rectangleSize + rect.height;
                rect.y -= diff * 2;
            }
        }
        if (rect.direction === Direction.TopLeft || rect.direction === Direction.TopRight) {
            rect.y -= 4;
            if (rect.y <= 0) {
                verticalReverse = true;
                rect.y *= -1;
            }
        }

        if (rect.direction === Direction.BottomLeft || rect.direction === Direction.TopLeft) {
            rect.x -= 4;
            if (rect.x <= 0) {
                horizontalReverse = true;
                rect.x *= -1;
            }
        }
        if (rect.direction === Direction.BottomRight || rect.direction === Direction.TopRight) {
            rect.x += 4;
            if (rect.x >= this.rectangleSize - rect.width) {
                horizontalReverse = true;
                const diff = rect.x - this.rectangleSize + rect.width;
                rect.x -= diff * 2;
            }
        }
        if (horizontalReverse) {
            if (rect.direction === Direction.BottomLeft) {
                rect.direction = Direction.BottomRight;
            } else if (rect.direction === Direction.TopLeft) {
                rect.direction = Direction.TopRight;
            } else if (rect.direction === Direction.BottomRight) {
                rect.direction = Direction.BottomLeft;
            } else {
                rect.direction = Direction.TopLeft;
            }
        }

        if (verticalReverse) {
            if (rect.direction === Direction.BottomLeft) {
                rect.direction = Direction.TopLeft;
            } else if (rect.direction === Direction.TopLeft) {
                rect.direction = Direction.BottomLeft;
            } else if (rect.direction === Direction.BottomRight) {
                rect.direction = Direction.TopRight;
            } else {
                rect.direction = Direction.BottomRight;
            }
        }
    }
}

$(() => {
    const random = new Random();
    var game = new Game();

    game.models.push(new Rectangle("redRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#eb4034"));
    game.models.push(new Rectangle("blueRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#343deb"));
    game.models.push(new Rectangle("greenRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#32a852"));
    game.models.push(new Rectangle("greenBlueRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#328ea8"));
    game.runAi();

    setInterval(() => {
        game.draw();
    }, 200);
});

class Random {
    next(start: number, end: number): number {
        const rnd = Math.random();
        const diff = end - start;
        return Math.floor(rnd * diff + start);
    }
}