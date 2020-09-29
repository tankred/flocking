//  Defining the model for a boid
class Boid{

    // They will be initialized with a starting x and y position
    constructor(xPos, yPos){
        //  The mass of the boid will dictate how responsive it is to flocking forces
        this.mass = 1;
        this.position = {x: xPos, y: yPos};
        this.velocity = {x: 0, y: 0};
        this.acceleration = {x: 0, y: 0};
    }

    //  Heading is represented by a decimal value indicating the radians
    get heading{
        return Math.atan2(this.velocity.x, this.velocity.y);
    }

    //  This function will be called to guide the boid while flocking
    applyForce(force){
        //  Acceleration is force devided by mass
        this.acceleration.x += force.x / this.mass;
        this.acceleration.y += force.y / this.mass;
    }

    update(){
        //  We will later add code to change the velocity of the boid given its suroundings
        updatePosition();
    }

    updatePosition(){
        //  Acceleration is change in velocity
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        //  Veloity is change in position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //  Acceleration is reset each frame
        this.acceleration = {x: 0, y: 0};
    }
}

// Defining the model for a flock
class Flock{
    constructor(flockSize){
        this.boids = [];
        this.size = flockSize;
        this.populateFlock();
    }

    populateFlock(){
        for(var n = 0; n < this.size; n++){

            //  The boids will be created at the center of the graph.
            this.boids.push(new Boid(0,0));

            //  The angle of the boids are evenly distributed in a circle
            var angle = (n / this.size) * 2 * Math.PI;

            //  The velocity is set based on the calculated angle
            this.boids[n].velocity = {x: Math.cos(angle), y: Math.sin(angle)};
        }
    }

    updateFlock(){
        for(var i = 0; i < this.size; i++){
            this.boids[i].update();
        }
    }
}

function renderFlock(flock){
    for(var i = 0; i < flock.size; i++){
        renderBoid(flock.boids[i]);
    }
}

function renderBoid(boid){
    //  The drawTriangle function takes a position and a rotation as parameters
    drawTriangle(boid.position.x, boid.position.y, boid.heading);
}


var flock = new Flock(10);

function loop(){
    // The loop will run every 10 milliseconds
    setTimeout(loop, 10);
    flock.update();
    renderFlock(flock);
}

function hw() {
  alert('yo')
}
