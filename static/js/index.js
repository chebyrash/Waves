const SEPARATION = 300;
const AMOUNT = 100;
const MAXSIZE = 4;
const WAVESIZE = 100;

let container = document.createElement("div");
document.body.appendChild(container);

let camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / (window.innerHeight / 2), 1, 10000);
camera.position.y = 1000;
camera.position.z = 2000;

let renderer = new THREE.CanvasRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

let stats = new Stats();
container.appendChild(stats.dom);

let scene = new THREE.Scene();

let particles = [];
let count = 0;

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

setup();
animate();

function setup() {
    for (let x = 0; x < AMOUNT; x ++) {
        for (let y = 0; y < AMOUNT; y++) {
            let material = new THREE.SpriteCanvasMaterial({
                color: 0xffffff,
                program: function (context) {
                    context.beginPath();
                    context.arc(0, 0, 0.5, 0, Math.PI * 2, true);
                    context.fill();
                }});
            material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            particle = new THREE.Sprite(material);
            particle.position.x = x * SEPARATION - ((AMOUNT * SEPARATION) / 2);
            particle.position.z = y * SEPARATION - ((AMOUNT * SEPARATION) / 2);
            particles.push(particle);
            scene.add(particle);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    camera.position.x += 2;
    camera.lookAt(scene.position);


    let index = 0;
    for (let ix = 0; ix < AMOUNT; ix ++) {
        for (let iy = 0; iy < AMOUNT; iy ++) {
            let particle = particles[index++];
            particle.position.y = (Math.sin((ix + count) * 0.3) * WAVESIZE) + (Math.sin((iy + count) * 0.5) * WAVESIZE);
            let scale = (Math.sin(( ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * MAXSIZE;
            particle.scale.x = particle.scale.y = scale;
        }
    }


    renderer.render(scene, camera);
    count += 0.05;
}