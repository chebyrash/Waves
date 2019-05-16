const SEPARATION = 200;
const AMOUNT = 50;
const MAXSIZE = 5;
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

window.onYouTubePlayerAPIReady = function () {
    let player = new YT.Player("music", {
        videoId: "XXX",
        loop: true,
        events: {
            onReady: function (event) {
                event.target.playVideo();
            },
        },
    });
};

setup();
render();

function setup() {
    for (let x = 0; x < AMOUNT; x++) {
        particles.push([]);
        for (let y = 0; y < AMOUNT; y++) {
            let material = new THREE.SpriteCanvasMaterial({
                color: 0xffffff,
                program: function (context) {
                    context.beginPath();
                    context.arc(0, 0, 0.5, 0, Math.PI * 2, true);
                    context.fill();
                }
            });
            material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            let particle = new THREE.Sprite(material);
            particle.position.x = x * SEPARATION - ((AMOUNT * SEPARATION) / 2);
            particle.position.z = y * SEPARATION - ((AMOUNT * SEPARATION) / 2);
            particles[x].push(particle);
            scene.add(particle);
        }
    }
}

function render() {
    requestAnimationFrame(render);

    stats.update();

    camera.position.x += 1;
    camera.lookAt(scene.position);

    for (let x = 0; x < AMOUNT; x++) {
        for (let y = 0; y < AMOUNT; y++) {
            let particle = particles[x][y];
            particle.position.y = (Math.sin((x + count) * 0.3) * WAVESIZE) + (Math.sin((y + count) * 0.5) * WAVESIZE);
            let scale = (Math.sin((x + count) * 0.3) + 1) * MAXSIZE + (Math.sin((y + count) * 0.5) + 1) * MAXSIZE;
            particle.scale.x = particle.scale.y = scale;
        }
    }

    renderer.render(scene, camera);
    count += 0.02;
}
