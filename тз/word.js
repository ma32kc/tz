function BrowserDetection() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var e = new Number(RegExp.$1);
        rint = 10;
        pulsion = 3
    } else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var t = new Number(RegExp.$1);
        rint = 50;
        pulsion = 16
    } else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var n = new Number(RegExp.$1);
        rint = 50;
        pulsion = 16
    } else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var r = new Number(RegExp.$1);
        rint = 50;
        pulsion = 16
    } else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var i = new Number(RegExp.$1);
        rint = 50;
        pulsion = 16
    }
    WIDTH = window.innerWidth;
    if (WIDTH < 1024) {
        numberObject = 19e3;
        numberBall = 10;
        pulsion = 2;
        rint = 10
    }
}

function draw() {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    for (var e = 0; e < pxs.length; e++) {
        pxs[e].fade();
        pxs[e].move();
        pxs[e].draw()
    }
}
function Circle() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    this.s = {
        ttl: numberObject,
        xmax: speedX,
        ymax: speedY,
        rmax: radius,
        rt: pulsion,
        xdef: 1260,
        ydef: 740,
        xdrift: 4,
        ydrift: 4,
        random: true,
        blink: true
    };
    this.reset = function () {
        this.x = this.s.random ? WIDTH * Math.random() : this.s.xdef;
        this.y = this.s.random ? HEIGHT * Math.random() : this.s.ydef;
        this.r = (this.s.rmax - 1) * Math.random() + 1;
        this.dx = Math.random() * this.s.xmax * (Math.random() < .5 ? -1 : 1);
        this.dy = Math.random() * this.s.ymax * (Math.random() < .5 ? -1 : 1);
        this.hl = this.s.ttl / rint * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1)
    }
        ;
    this.fade = function () {
        this.rt += this.s.rt
    }
        ;
    this.draw = function () {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
            this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl)
            this.reset();
        var e = 1 - this.rt / this.hl;
        var t = document.getElementById("container");
        con.beginPath();
        con.font = "normal 800 20px Verdana";
        var n = this.r * e;
        g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, n <= 0 ? 1 : n);
        g.addColorStop(this.stop, colorRect + e * opacityRect + ")");
        con.fillStyle = g;
        var img_1 = document.getElementById("one");
        var img_2 = document.getElementById("two");
        var img_3 = document.getElementById("three");
        var img_4 = document.getElementById("four");
        con.drawImage(img_1, this.x + 10, this.y - 100);
        con.drawImage(img_2, this.x + 100, this.y + 150);
        con.drawImage(img_3, this.x - 300, this.y - 210);
        con.drawImage(img_4, this.x + 10, this.y + 60);
        con.closePath();
        con.fill()
    }
        ;
    this.move = function () {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        this.x += this.rt / this.hl * this.dx;
        this.y += this.rt / this.hl * this.dy;
        if (this.x > WIDTH || this.x < 0)
            this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0)
            this.dy *= -1
    }
        ;
    this.getX = function () {
        return this.x
    }
        ;
    this.getY = function () {
        return this.y
    }
}
var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = new Array;
var rint = 30;
var numberObject = 3e3;
var pulsion = 20;
var radius = 10;
var speedX = 5;
var speedY = 2;
var widthRect = 100;
var heightRect = 100;
var colorRect = "rgba(255,255,255,";
var opacityRect = .2;
var numberBall = 100;
var width = 125;
var height = 105;
var padding = 20;
$(document).ready(function () {
    BrowserDetection();
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas = document.getElementById("word");
    $(canvas).attr("width", WIDTH).attr("height", HEIGHT);
    con = canvas.getContext("2d");
    for (var e = 0; e < numberBall; e++) {
        pxs[e] = new Circle;
        pxs[e].reset()
    }
    setInterval(draw, rint)
})
