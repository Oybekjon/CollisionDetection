var Direction;
(function (Direction) {
    Direction[Direction["TopLeft"] = 0] = "TopLeft";
    Direction[Direction["TopRight"] = 1] = "TopRight";
    Direction[Direction["BottomRight"] = 2] = "BottomRight";
    Direction[Direction["BottomLeft"] = 3] = "BottomLeft";
})(Direction || (Direction = {}));
var Rectangle = /** @class */ (function () {
    function Rectangle(id, width, height, x, y, color) {
        if (!id) {
            throw Error("Id must be there!");
        }
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        var rnd = new Random();
        var dir = rnd.next(0, 4);
        if (dir === 0)
            this.direction = Direction.BottomRight;
        else if (dir === 1)
            this.direction = Direction.BottomLeft;
        else if (dir === 2)
            this.direction = Direction.TopLeft;
        else
            this.direction = Direction.TopRight;
    }
    return Rectangle;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.models = [];
    }
    Object.defineProperty(Game.prototype, "rectangleSize", {
        get: function () {
            return 700;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.draw = function () {
        var container = $("#Container");
        for (var i = 0; i < this.models.length; i++) {
            var current = this.models[i];
            var id = "#" + current.id;
            var el = $(id, container);
            if (el.length === 0) {
                el = $("<div id=\"" + current.id + "\"/>");
                container.append(el);
                el.css("position", "absolute");
                el.css("background-color", "" + current.color);
            }
            el = $(id, container);
            el.css("width", current.width + "px");
            el.css("height", current.height + "px");
            el.animate({
                "top": current.y + "px",
                "left": current.x + "px"
            }, 200, "linear");
        }
    };
    Game.prototype.runAi = function () {
        var self = this;
        setInterval(function () {
            self.moveAll();
        }, 100);
    };
    Game.prototype.moveAll = function () {
        for (var i = 0; i < this.models.length; i++) {
            this.move(this.models[i]);
        }
        // Check and 
        // if overlap 
        //    Adjust positions
    };
    Game.prototype.move = function (rect) {
        var verticalReverse = false;
        var horizontalReverse = false;
        if (rect.direction === Direction.BottomRight || rect.direction === Direction.BottomLeft) {
            rect.y += 4;
            if (rect.y >= this.rectangleSize - rect.height) {
                verticalReverse = true;
                var diff = rect.y - this.rectangleSize + rect.height;
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
                var diff = rect.x - this.rectangleSize + rect.width;
                rect.x -= diff * 2;
            }
        }
        if (horizontalReverse) {
            if (rect.direction === Direction.BottomLeft) {
                rect.direction = Direction.BottomRight;
            }
            else if (rect.direction === Direction.TopLeft) {
                rect.direction = Direction.TopRight;
            }
            else if (rect.direction === Direction.BottomRight) {
                rect.direction = Direction.BottomLeft;
            }
            else {
                rect.direction = Direction.TopLeft;
            }
        }
        if (verticalReverse) {
            if (rect.direction === Direction.BottomLeft) {
                rect.direction = Direction.TopLeft;
            }
            else if (rect.direction === Direction.TopLeft) {
                rect.direction = Direction.BottomLeft;
            }
            else if (rect.direction === Direction.BottomRight) {
                rect.direction = Direction.TopRight;
            }
            else {
                rect.direction = Direction.BottomRight;
            }
        }
    };
    return Game;
}());
$(function () {
    var random = new Random();
    var game = new Game();
    game.models.push(new Rectangle("redRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#eb4034"));
    game.models.push(new Rectangle("blueRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#343deb"));
    game.models.push(new Rectangle("greenRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#32a852"));
    game.models.push(new Rectangle("greenBlueRectangle", 100, 100, random.next(0, 60) * 10, random.next(0, 60) * 10, "#328ea8"));
    game.runAi();
    setInterval(function () {
        game.draw();
    }, 200);
});
var Random = /** @class */ (function () {
    function Random() {
    }
    Random.prototype.next = function (start, end) {
        var rnd = Math.random();
        var diff = end - start;
        return Math.floor(rnd * diff + start);
    };
    return Random;
}());
//# sourceMappingURL=Game.js.map