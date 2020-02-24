import * as BABYLON from "babylonjs";

class Asset {
  constructor(game) {
    this.game = game;
    this.assetsManager = game.assetsManager;
    this.engine = game.engine;
    this.canvas = game.canvas;
    this.gameTask = game.gameTask;

    //Init Variables
    this.assetPath = "assets/chars/";
    this.loadedAnimationGroups= null;
    this.loadedMeshes = null;
    this.loadedSkeletons = null;

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

  loadAsync(assetDir, assetFile) {
    Promise.all([
        BABYLON.SceneLoader.ImportMeshAsync('', this.assetPath + assetDir + "/", assetFile, this.scene)
          .then((result) => {
            this.loadedAnimationGroups = result.animationGroups;
            this.loadedMeshes = result.meshes[0];
            this.loadedSkeletons = result.skeletons[0];

            //dont show the loaded Assets
            //this.loadedMeshes.setEnabled(false);
          })
    ])
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
