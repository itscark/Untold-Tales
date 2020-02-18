class Asset {
  constructor(game) {
    this.game = game;
    this.assetsManager = game.assetsManager;
    this.engine = game.engine;
    this.canvas = game.canvas;
    this.assetPath = game.assetPath;
    this.gameTask = game.gameTask;
  }

  hide(asset) {
    asset.loadedMeshes[0].setEnabled(false);
  }

  show(asset) {
    asset.loadedMeshes[0].setEnabled(true);
  }

  load(assetName, assetDir, gltfFile) {
    //load Asset
    let tmpTask = this.assetsManager.addMeshTask(
      assetName,
      "",
      this.assetPath + assetDir + "/",
      gltfFile
    );
    //on Success
    tmpTask.onSuccess = function(task) {
      task.loadedMeshes[0].setEnabled(false);
    };
    return tmpTask;
  }

  position(task, xPosition, yPosition, zPosition) {
    let mesh = task.loadedMeshes[0];
    mesh.position.x = xPosition;
    mesh.position.y = yPosition;
    mesh.position.z = zPosition;
  }

  rotate(task, axis, rotation) {
    let mesh = task.loadedMeshes[0];
    //example: mesh.rotate(BABYLON.Axis.Y, Math.PI);
    mesh.rotate(axis, rotation);
  }
  scale(task, xScale, yScale, zScale) {
    let mesh = task.loadedMeshes[0];
    //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
    mesh.scaling = new BABYLON.Vector3(xScale, yScale, zScale);
  }

  add(){

  }
}

export default Asset;
