class Spelunker{

    constructor(game) {

        //Initialization block.
        this.game = game;
        this.ImageAsset = ASSET_MANAGER.getAsset("./spelunky.png");
        this.x = 250; //Guy's Starting x position
        this.y = 250; //Guy's y position.
        this.isIdling = true; //Is Guy idling?

        //Movements states for Guy.
        //0 - Idle state
        //1 - Walk
        //2 - Crouch
        //3 - Crawl
        //4 - Dash
        //5 - Looking Up
        this.state = 0;
        //Direction Facing.
        //0 - left, 1 - right
        this.facing = 1;
        //Guy's current speed.
        this.speed = 0;
        //Speeds for states
        this.stateSpeeds = new Array (0, 100, 0, 50, 250, 0);
        //Time to wait for next action.
        this.timeConsumed = 0;
        this.timeToReach = 3;

        //Guy Spelunky's animations are stored here.
        this.animations = [];
        this.setUpAnimations();

        //This first call is just to get it working.
        this.animateMe();

    };

    animateMe() {
        //Decide random states.
        //Note for later; pull random numbers to decide state and length.

        //Guy Spelunky picks random animations; he might walk, crawl, or run.
        //He idles for anywhere between half a second to two seconds between anims.
        //And he'll animate for a quarter second to one second at a time.
        this.state = this.getRandomInt(0, 5);
        //this.facing = this.getRandomInt(0, 2);
        this.speed = this.stateSpeeds[this.state];
        /*
        if(this.facing == 0) {
            this.speed *= -1;
        }
        */
    };

    //I can't believe this isn't a library function.
    //Uh... pulls a random int.
    //Gleefully nicked from Mozilla's MDN Web Docs.
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick, ctx, this.x, this.y);
    };

    //Check to see where Guy is and react accordingly so he
    //won't walk off the face of the Earth.
    update() {
        this.checkMyAnimation();
        this.x += this.speed * this.game.clockTick;
        if(this.x < 80 && this.facing == 0) {
            this.x = 420;
        } else if (this.x > 420 && this.facing == 1) {
            this.x = 80;
        }
    };

    //Checks how long the current animation has run for.
    //If its run for too long, start a new one.
    checkMyAnimation() {
        this.timeConsumed += this.game.clockTick;
        if(this.timeConsumed >= this.timeToReach) {
            this.timeConsumed = 0;
            this.timeToReach = this.getRandomInt(5, 10);
            this.animateMe();
        }
    }


    //...sets up animations. Do you want a trophy for your observational skills?
    //Move left
    //More right (mirrors above)
    //Crouch left/right
    //Crawl left/right
    //look up, look back down
    //dash left/right
    setUpAnimations() {
        let STATES = 6;
        let DIRECS = 2;

        let X_DIM = 80;
        let Y_DIM = 80;

        let iA = this.ImageAsset;




        //Declare a 2D array of the proper dimensions.
        for (var i = 0; i < STATES; i++ ) {
            this.animations.push([]);
            for (var j = 0; j < DIRECS; j++) {
                this.animations[i].push([]);
            }
        }

        //Ugly, nasty code to set up the animations.

        //0 - Idle State; Left, Right
        this.animations[0][0] = new Animator(iA, 0, 0, X_DIM, Y_DIM, 1, 1, false, true, true);
        this.animations[0][1] = new Animator(iA, 0, 0, X_DIM, Y_DIM, 1, 1, false, true, false);

        //1 - Walking State
        this.animations[1][0] = new Animator(iA, 0, 0, X_DIM, Y_DIM, 9, 0.05, false, true, true);
        this.animations[1][1] = new Animator(iA, 0, 0, X_DIM, Y_DIM, 9, 0.05, false, true, false);

        //2 - Crouch State
        this.animations[2][0] = new Animator(iA, (X_DIM * 2), Y_DIM, X_DIM, Y_DIM, 1, 1, false, true, true);
        this.animations[2][1] = new Animator(iA, (X_DIM * 2), Y_DIM, X_DIM, Y_DIM, 1, 1, false, true, false);

        //3 - Crawling State
        this.animations[3][0] = new Animator(iA, (X_DIM * 5), (Y_DIM * 1), X_DIM, Y_DIM, 7, 0.10, false, true, true);
        this.animations[3][1] = new Animator(iA, (X_DIM * 5), (Y_DIM * 1), X_DIM, Y_DIM, 7, 0.10, false, true, false);

        //4 - Dashing State
        this.animations[4][0] = new Animator(iA, (X_DIM * 6), (Y_DIM * 6), X_DIM, Y_DIM, 6, 0.05, false, true, true);
        this.animations[4][1] = new Animator(iA, (X_DIM * 6), (Y_DIM * 6), X_DIM, Y_DIM, 6, 0.05, false, true, false);


    };

}