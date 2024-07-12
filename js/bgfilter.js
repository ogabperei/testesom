const canva = document.querySelector("canva");
const ctx = canva.getContex("2d");


let mouseMoved = false;

const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
};

const params = {
    pointsNumber: 40,
    widthFactor: 10,
    mouseTreshold: 0.5,
    spring: 0.25,
    friction: 0.5,
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++){
    trail [i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    };
};


window.addEventListener("click", (e) => {
    updateMousePosition(e.pageX, e.pagey);
});

window.addEventListener("mousemove", (e) => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", (e) => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY){
    pointer.x = eX;
    pointer.y = eY;
};

setUpcanva();
update(0);
window.addEventListener("resize", setUpcanva);

function update(t){
    if (!mouseMoved){
        
        pointer.x = 
        (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
        
        pointer.y = 
        (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
 window.innerHeight;    }


ctx.clearReact (0, 0, canva.width, canva.height); window.innerHeight;
trail.forEach((p,pIdx) => {
    const prev = pIdx === 0 ? pointer :trail[pIdx - 1];
    const spring = pIdx === 0 ? 0.4 * params.spring : params. spring;
    p.dx += (prev.x - p.x) * spring;
    p.dy += (prev.y - p.y) * spring;
    p.dx += params.friction;
    p.dy += params.friction;
    p.x += p.dx;
    p.y += p.dy;
});

var gradient = ctx.createLinearGradient(0, 0, canva.width, canva.height); window.innerHeight;
gradient.addColorStop(0, "rgb (160, 93, 134, 1)");
gradient.addColorStop(1, "rgb (57, 34, 115, 1)");

ctx.strokeStyle = gradient;
ctx.lineCap = "round";
ctx.beginPath();
ctx.moveTo(trail[0].x, trail[0].y);

for (let i = 1; i < trail.length - 1; i++){
    const xc = 0.5 * (trail[i].x + trail[i + 1].x);
    const xy = 0.5 * (trail[i].y + trail[i + 1].y);
    ctx.quadratiCurveTo(trail[i].x, trail[i].y, xc, yc);
    ctx.lineWidth = params.windowFactor * (params.pointsNumber - i);
    ctx.stroke();
}

ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
ctx.stroke();

window.requestAnimationFrame(update);

};

function setUpcanva(){
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
};