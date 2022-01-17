
class Shapes {
    constructor() {
        //just for show
        /*
        const canv = document.getElementById("gameWorld");
        const ctx = canv.getContext("2d");
        */
    }

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.strokeStyle = "Black";

        //Lets draw a rectangle.
        ctx.fillRect(100, 110, 100, 100);

        ctx.beginPath();
        ctx.arc(50, 50, 25, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();

    }

    update() {
        //boneless chicken.
    }
}




