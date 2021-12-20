let particles = [];

let res = 10;

let img;
let poseNet;
let poses = [];
let noseX, noseY;

function preload() {
    img = loadImage("pill.jpeg");
}

function setup() {
    createCanvas(700, 400);
    placeParticles();
    noStroke();
    capture = createCapture(VIDEO);
    capture.hide();
    poseNet = ml5.poseNet(capture,
        modelReady);
    poseNet.on('pose', function (results) {
        poses = results;
    });
}

function modelReady() {
    console.log('model ready');


}

function draw() {
    background(VIDEO, 700, 400);
    image(capture, 0, 0);

    drawKeypoints();
    if (poses.length > 0) {
        const pose = poses[0].pose;


        const nose = pose.nose;

    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    // image(img, 0, 0, width, height);
}

function placeParticles() {
    for (let i = 0; i < width; i += res) {
        for (let j = 0; j < height; j += res) {
            let x = (i / width) * img.width;
            let y = (j / height) * img.height;
            let c = img.get(x, y);

            // if(c[3] != 0) {
            if (c[0] + c[1] + c[2] != 255 * 3) {
                particles.push(new Particle(i, j, c))
            }

        }
    }
}

function gotPoses(poses) {
    if (poses.length > 0) {
        const pose = poses[0].pose;


        const nose = pose.nose;
    }
}

function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < min(poses.length, 1); i++) {
        // For each pose detected, loop through all the keypoints
        for (let k = 0; k < poses[i].pose.keypoints.length; k++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = poses[i].pose.keypoints[k];
            // Only draw an ellipse is the pose probability is bigger than 0.2

            if (k == 0) {
                noseX = keypoint.position.x;
                noseY = keypoint.position.y;


            }
        }
    }
}

class Particle {
    constructor(x, y, c) {


        this.c = c;

        this.x = noseX;
        this.y = noseY;
    }

    update() {

        // nose
        let noseD = dist(10, 10, 10, 10);
        //        let noseA = atan2(10 - 2, 10 - 2);



        // forces
        //        let noseF = constrain((noseD, 0, 100, 10, 0), 0, 10);
        //
        //
        //        let vx = cos(noseA) * noseF;
        //
        //
        //        let vy = sin(noseA) * noseF;

        //
        //        this.x += vx;
        //        this.y += vy;
    }

    draw() {
        // fill(0, 40);
        // stroke(0, 40);
        // ellipse(this.homeX, this.homeY, 5, 5);
        // line(this.x, this.y, this.homeX, this.homeY);
        // noStroke();
        fill(this.c);
        ellipse(8, 8, 8);
    }
}
