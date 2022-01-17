const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./overlay.png");
ASSET_MANAGER.queueDownload("./cave.png");
ASSET_MANAGER.queueDownload("./spelunky.png");
const gameEngine = new GameEngine();



ASSET_MANAGER.downloadAll(() => {
	//Basic setup.
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	gameEngine.addEntity(new Spelunker(gameEngine));
//	gameEngine.addEntity(new Overlay(gameEngine));
	

	gameEngine.start();


});
