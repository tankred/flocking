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
