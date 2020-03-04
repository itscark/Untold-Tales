import {SceneLoader, Vector3} from "babylonjs";

class Asset {
    constructor(game) {
        this.game = game;
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

    loadAsync(assetDir, assetFile) {
        return SceneLoader.ImportMeshAsync('', this.assetPath + assetDir + "/", assetFile, this.scene)
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
        task.scaling = new Vector3(xScale, yScale, zScale);
    }
}

export default Asset;
