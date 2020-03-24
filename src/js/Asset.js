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
        try {
        asset.meshes[0].setEnabled(false);
        } catch (e) {
            console.log("nothing to hide")
        }
    }

    show(asset) {
        try {
            asset.meshes[0].setEnabled(true);
        } catch (e) {
            console.log('nothing to show')
        }
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
        let setAxis = null
        if (axis === 'Y'){
            setAxis = BABYLON.Axis.Y
        } else if (axis === 'X'){
            setAxis = BABYLON.Axis.X
        }else if (axis === 'Z') {
            setAxis = BABYLON.Axis.Z
        }
        //example: mesh.rotate(BABYLON.Axis.Y, Math.PI);
        task.meshes[0].rotate(setAxis, rotation);
    }

    scale(task, xScale, yScale, zScale) {
        //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
        task.meshes[0].scaling = new Vector3(xScale, yScale, zScale);
    }
}

export default Asset;
