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
        this.result = null;

    }

    hide(asset) {
        asset.setEnabled(false);
    }

    show(asset) {
        asset.setEnabled(true);
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
        tmpTask.onSuccess = function (task) {
            task.setEnabled(false);
        };
        return tmpTask;
    }

    loadAsync(assetDir, assetFile) {
        return BABYLON.SceneLoader.ImportMeshAsync('', this.assetPath + assetDir + "/", assetFile, this.scene)
    }

    position(task, xPosition, yPosition, zPosition) {
        let mesh = task;
        mesh.position.x = xPosition;
        mesh.position.y = yPosition;
        mesh.position.z = zPosition;
    }

    rotate(task, axis, rotation) {
        //example: mesh.rotate(BABYLON.Axis.Y, Math.PI);
        task.rotate(axis, rotation);
    }

    scale(task, xScale, yScale, zScale) {
        //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
        task.scaling = new BABYLON.Vector3(xScale, yScale, zScale);
    }

    add() {

    }
}

export default Asset;
