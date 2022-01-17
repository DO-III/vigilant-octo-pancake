class Overlay {
    constructor(game) {
        this.game = game;
        this.ImageAsset = ASSET_MANAGER.getAsset("./overlay.png");
    }

    draw(ctx) {
        ctx.drawImage(this.ImageAsset, 0, 0)
    };

    update() {
        //does nothing.
    };
}