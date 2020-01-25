//http://www.playfuljs.com/physics-for-the-lazy/


const GRAVITY = 0.3;
const DAMPING = 0.9999;

class Particle {
    constructor(x, y, origin) {
        this.origin = origin;
        this.x = this.oldX = x;
        this.y = this.oldY = y;
    }

    integrate() {
        let velocity = this.getVelocity();

        this.oldX = this.x;
        this.oldY = this.y;
        this.x += velocity.x * DAMPING;
        this.y += velocity.y * DAMPING;
    }

    getVelocity() {
        return {
            x: this.x - this.oldX,
            y: this.y - this.oldY
        };
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    remove(i) {
        if (this.y > gutterRect.bottom && this.y < gutterRect.bottom + 10) {
            let velocity = this.getVelocity();

            if (origin === "gutter" && this.y > display.height) {
                gutterDrops.splice(i, 1);

                return true;
            } else if (velocity.y < 0.24) {
                let gutterDrop = new Particle(gutterRect.right, gutterRect.bottom, "gutter");
                gutterDrop.move(0, 0);

                setTimeout(() => {
                    gutterDrops.push(gutterDrop);
                }, 12000 * this.x / gutterRect.width);

                drops.splice(i, 1);

                return true;
            }
        }

        return false;
    }

    bounce() {
        if (this.y > gutterRect.bottom && this.y < gutterRect.bottom + 10) {
            let velocity = this.getVelocity();
            this.oldY = gutterRect.bottom;
            this.y = this.oldY - velocity.y * GRAVITY;
        }
    }

    infinityFall() {
        if (this.y > display.height) {
            let velocity = this.getVelocity();
            this.oldY = 0;
            this.y = this.oldY - velocity.y * GRAVITY;
        }
    }

    draw() {
        ctx.lineWidth = 3;

        if (this.origin === "inner") {
            ctx.strokeStyle = innerColour;
        } else if (this.origin === "outer") {
            ctx.strokeStyle = outerColour;
        } else if (this.origin === "gutter") {
            ctx.strokeStyle = innerColour;
        } else {
            ctx.strokeStyle = defaultColour;
        }

        ctx.beginPath();
        ctx.moveTo(this.oldX, this.oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

function outerEdgePoint() {
    const orXD = Math.random() < 0.5 ? -1 : 1;
    const orYD = Math.random() < 0.5 ? -1 : 1;

    const vR = vRect.height / 2;
    const orR = orRect.height / 2;

    const orX0 = orRect.x + orR;
    const orY0 = orRect.y + orR;

    const vX = Math.random() * vR;
    const orX = orXD * Math.random() * orR;

    const vY = Math.pow((Math.pow(vR, 2) - Math.pow(vX, 2)), 1 / 2);
    const orY = orYD * Math.pow((Math.pow(orR, 2) - Math.pow(orX, 2)), 1 / 2);

    for (let i = 0; i < 10; i++) {
        let inVoid = Math.pow(vR, 2) === Math.pow(vX, 2) + Math.pow(vY, 2);
        let inOrbit = Math.pow(orR, 2) === Math.pow(orX, 2) + Math.pow(orY, 2);

        if (inOrbit && !inVoid) {
            break;
        }
    }

    return {
        "x": orX + orX0,
        "y": orY + orY0
    }
}

function innerEdgePoint() {
    const irXD = Math.random() < 0.5 ? -1 : 1;
    const irYD = Math.random() < 0.5 ? -1 : 1;

    const cR = cRect.height / 2;
    const irR = irRect.height / 2;

    const irX0 = irRect.x + irR;
    const irY0 = irRect.y + irR;

    const cX = Math.random() * cR;
    const irX = irXD * Math.random() * irR;

    const cY = Math.pow((Math.pow(cR, 2) - Math.pow(cX, 2)), 1 / 2);
    const irY = irYD * Math.pow((Math.pow(irR, 2) - Math.pow(irX, 2)), 1 / 2);

    for (let i = 0; i < 10; i++) {
        let inVoid = Math.pow(cR, 2) === Math.pow(cX, 2) + Math.pow(cY, 2);
        let inOrbit = Math.pow(irR, 2) === Math.pow(irX, 2) + Math.pow(irY, 2);

        if (inOrbit && !inVoid) {
            break;
        }
    }

    return {
        "x": irX + irX0,
        "y": irY + irY0
    }
}

function frame() {
    let drop;
    let position;

    requestAnimationFrame(frame);
    ctx.clearRect(0, 0, display.width, display.height);

    if (Math.random() < 0.006) {
        origin = "outer";
        position = outerEdgePoint();
    } else if (Math.random() < 0.01) {
        origin = "inner";
        position = innerEdgePoint();
    }

    if (position) {
        drop = new Particle(position.x, position.y, origin);

        if (Math.random() < 0.05) {
            drop.move(Math.random() * 6 - 3, Math.random() * -10);
        } else {
            drop.move(0, 0);
        }

        drops.push(drop);
    }

    for (let i = 0; i < drops.length; i++) {
        drops[i].move(0, GRAVITY);
        drops[i].integrate();
        drops[i].infinityFall();

        if (drops[i].remove(i)) {
            continue;
        }

        drops[i].bounce();
        drops[i].draw();
    }

    for (let i = 0; i < gutterDrops.length; i++) {
        if (i % 6 !== 0) {
            continue;
        }

        gutterDrops[i].move(0, GRAVITY);
        gutterDrops[i].integrate();

        if (gutterDrops[i].remove(i)) {
            gutterDrops.splice(i, 1);
            continue;
        }

        gutterDrops[i].draw();
    }
}

var ctx;
var drops = [];
var gutterDrops = [];
const display = document.getElementById('display');
const theCore = document.getElementsByClassName('core')[0];
const theVoid = document.getElementsByClassName('void')[0];
const gutter = document.getElementsByClassName('gutter')[0];
const innerRing = document.getElementsByClassName('inner-ring')[0];
const outerRing = document.getElementsByClassName('outer-ring')[0];

const cRect = theCore.getBoundingClientRect();
const vRect = theVoid.getBoundingClientRect();
const irRect = innerRing.getBoundingClientRect();
const orRect = outerRing.getBoundingClientRect();
const gutterRect = gutter.getBoundingClientRect();

const innerColour = window.getComputedStyle(innerRing, null).getPropertyValue('background-color');
const outerColour = window.getComputedStyle(outerRing, null).getPropertyValue('background-color');
const defaultColour = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

ctx = display.getContext('2d');
ctx.globalCompositeOperation = 'overlay';
display.width = window.innerWidth;
display.height = window.innerHeight;

requestAnimationFrame(frame);
