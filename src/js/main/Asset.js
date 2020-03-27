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

    // simple function to hide the assets, try is used because sometimes there is no asset to load, to avoid an error
    // when the assets are loaded they will be displayed, the hide function is called after the assets is loaded
    hide(asset) {
        try {
        asset.meshes[0].setEnabled(false);
        } catch (e) {
            console.log("nothing to hide")
        }
    }
    // simple function to show the loaded assets
    // after the video from a char to a char is played, the asseet will be shown
    show(asset) {
        try {
            asset.meshes[0].setEnabled(true);
        } catch (e) {
            console.log('nothing to show')
        }
    }

    //all assets will be loaded async, to improve performance and lower the initial loading time.
    loadAsync(assetDir, assetFile) {
        // assetsmanager can not load a mesh async there fore the sceneloader is used
        return SceneLoader.ImportMeshAsync('', this.assetPath + assetDir + "/", assetFile, this.scene)
    }

    //async load Asset while video is playing
    // because the loadAsync function is async, this function is called if a assets needs to be loaded.
    //with return await we can work with the fully loaded asset.
    async configureAsset(assetDir, assetFile) {
        try {
            return await this.loadAsync(assetDir, assetFile);
        } catch (e) {
            return "caught";
        }
    }

    // individualy position the assets
    position(task, xPosition, yPosition, zPosition) {
        let mesh = task.meshes[0];
        mesh.position.x = xPosition;
        mesh.position.y = yPosition;
        mesh.position.z = zPosition;
    }

    //rotate assets
    // the if is needed because all asset data is in a seperate file where babylonjs is not loaded
    rotate(task, axis, rotation) {
        let setAxis = null;
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
    //scale assets
    scale(task, xScale, yScale, zScale) {
        //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
        task.meshes[0].scaling = new Vector3(xScale, yScale, zScale);
    }
}

export default Asset;
