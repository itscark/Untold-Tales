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
        asset.meshes[0].setEnabled(false);
    }

    show(asset) {
        asset.meshes[0].setEnabled(true);
    }

    loadAsync(assetDir, assetFile) {
        return SceneLoader.ImportMeshAsync('', this.assetPath + assetDir + "/", assetFile, this.scene)
    }

    //async load Asset while video is playing
    async configureAsset(assetDir, assetFile) {
        try {
            return await this.loadAsync(assetDir, assetFile);
        } catch (e) {
            return "caught";
        }
    }

    position(task, xPosition, yPosition, zPosition) {
        let mesh = task.meshes[0];
        mesh.position.x = xPosition;
        mesh.position.y = yPosition;
        mesh.position.z = zPosition;
    }

    rotate(task, axis, rotation) {
        //example: mesh.rotate(BABYLON.Axis.Y, Math.PI);
        task.meshes[0].rotate(axis, rotation);
    }

    scale(task, xScale, yScale, zScale) {
        //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
        task.meshes[0].scaling = new Vector3(xScale, yScale, zScale);
    }
}

export default Asset;
