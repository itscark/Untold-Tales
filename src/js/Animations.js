import * as BABYLON from "babylonjs";

class Animations {
    constructor(game) {
        this.game = game;
        this.engine = game.engine;
        this.canvas = game.canvas;

        // // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
        // Animation.AllowMatricesInterpolation = true;

        // Enable animation blending for all animations
        this.game.scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        this.game.scene.animationPropertiesOverride.enableBlending = true;
        this.game.scene.animationPropertiesOverride.blendingSpeed = 0.02;
        this.game.scene.animationPropertiesOverride.loopMode = 1;
    }

    load(asset) {
        try {
            this.game.MyGui.advancedTexture.addControl(this.game.MyGui.animationGui);
            for (let i = 0; i < asset.animationGroups.length; i++) {
                let tmpAsset = asset.animationGroups[i];
                let tmpName = tmpAsset["name"];
                //this.MyGui can not be assigned in the Constructore because of redering procedre
                this.game.MyGui.createButton(tmpName, asset, i);
            }
        } catch (e) {
            console.log('no animation')
        }
    }

    control(asset, assetIndex) {
        const animationGroups = asset.animationGroups;
        //stop all animations
        animationGroups.forEach(function (item) {
            item.stop(true);
        });
        //start pressed animation
        animationGroups[assetIndex].play();

        if (!animationGroups[0].isPlaying) {
            animationGroups[assetIndex].onAnimationEndObservable.add(() => {
                animationGroups[0].play(true);
            });
        }
    }

    stop(asset) {
        asset.loadedAnimationGroups.forEach(function (item) {
            item.stop(true);
        });
    }
}

export default Animations;
