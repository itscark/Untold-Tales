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

    // load all animations that are in the gltf file and dynamicaly generate the controll buttons for the GUI
    // try is used because i my be possible that a asset may not have any animations
    load(asset) {
        try {
            this.game.MyGui.advancedTexture.addControl(this.game.MyGui.animationGui);
            // the animations are loaded as animations Groups there is just one animation Group (an array) and therefore the for loop is needed to get every single animation.
            for (let i = 0; i < asset.animationGroups.length; i++) {
                let tmpAsset = asset.animationGroups[i];
                let tmpName = tmpAsset["name"];
                //this.MyGui can not be assigned in the Constructore because of rendering procedre
                if (i !== 0) {
                    this.game.MyGui.createButton(tmpName, asset, i);
                }
            }
        } catch (e) {
            console.log('no animation')
        }
    }

    //after all animations are loaded this function is called to control the animations so that they dont interfere with each other
    // the control function is called when a button of the GUI is pressed.
    control(asset, assetIndex) {
        // all animations are nested in a group array
        const animationGroups = asset.animationGroups;
        //stop all animations to not interrupt other animations
        animationGroups.forEach(function (item) {
            item.stop(true);
        });
        //start pressed animation
        animationGroups[assetIndex].play();

        // if a user clicked an animation button the animation will start playing
        // to avoid a loop of the animations (except the idle animation) this functions detects if the animation has ended and will start the idle animation again.
        if (!animationGroups[0].isPlaying) {
            animationGroups[assetIndex].onAnimationEndObservable.add(() => {
                animationGroups[0].play(true);
            });
        }
    }

    //simple function to stoll the animation that is playing
    stop(asset) {
        asset.loadedAnimationGroups.forEach(function (item) {
            item.stop(true);
        });
    }
}

export default Animations;
