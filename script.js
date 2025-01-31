const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = { x: 100, y: 300, width: 50, height: 20, speed: 0, gravity: 0.5, lift: -10 };
let terrain = [];
let keys = {};

function generateTerrain() {
    for (let i = 0; i < canvas.width; i += 10) {
        terrain.push({ x: i, y: 250 + 30 * Math.sin(i * 0.05) });
    }
}

function drawTerrain() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    terrain.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(car.x, car.y, car.width, car.height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(car.x + 10, car.y + car.height, 10, 0, Math.PI * 2);
    ctx.arc(car.x + 40, car.y + car.height, 10, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (keys["ArrowRight"]) car.speed += 0.5;
    if (keys["ArrowLeft"]) car.speed -= 0.5;
    if (keys["ArrowUp"]) car.y += car.lift;
    
    car.speed *= 0.98;
    car.x += car.speed;
    car.y += car.gravity;

    let groundY = terrain.find(point => Math.abs(point.x - car.x) < 5)?.y || 300;
    if (car.y > groundY - car.height) car.y = groundY - car.height;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTerrain();
    update();
    drawCar();
    requestAnimationFrame(loop);
}

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

generateTerrain();
loop();
