import Game from "./Game";

class Asset extends Game {
  constructor() {
    super();
  }

  showHide(asset, showHide) {
    asset.loadedMeshes[0].setEnabled(showHide);
  }

  load(assetName, assetDir, gltfFile) {
    //load Asset
    var tmpTask = assetsManager.addMeshTask(
      assetName,
      "",
      assetPath + assetDir + "/",
      gltfFile
    );
    //on Success
    tmpTask.onSuccess = function(task) {
      task.loadedMeshes[0].setEnabled(false);
    };

    return tmpTask;
  }

  position(task, xPosition, yPosition, zPosition) {
    mesh = task.loadedMeshes[0];
    mesh.position.x = xPosition;
    mesh.position.y = yPosition;
    mesh.position.z = zPosition;
  }

  rotate(task, axis, rotation) {
    mesh = task.loadedMeshes[0];
    //example: mesh.rotate(BABYLON.Axis.Y, Math.PI);
    mesh.rotate(axis, rotation);
  }
  scale(task, xScale, yScale, zScale) {
    mesh = task.loadedMeshes[0];
    //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
    mesh.scaling = new BABYLON.Vector3(xScale, yScale, zScale);
  }
}

export default Asset;
