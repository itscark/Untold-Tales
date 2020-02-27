import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

export default class {
    constructor(game) {
        this.game = game;
        this.assetsManager = game.assetsManager;
        this.engine = game.engine;
        this.canvas = game.canvas;
        this.playBtn = game.playBtn;
        this.Asset = game.Asset;
        this.Video = game.Video;
        //load GUI
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("gui");

        //load Animatin GUI
        this.animationGui = new GUI.StackPanel();
        this.animationGui.width = "220px";
        this.animationGui.fontSize = "14px";
        this.animationGui.horizontalAlignment =
            GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.animationGui.verticalAlignment =
            GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(this.animationGui);
    }

    loadAssetAnimation(asset) {
        for (let i = 0; i < asset.animationGroups.length; i++) {
            let tmpAsset = asset.animationGroups[i];
            let tmpName = tmpAsset["name"];
            this.createButton(tmpName, asset, i);
        }
    }

    createButton(btn, asset, assetIndex) {
        let guiBtn = GUI.Button.CreateSimpleButton(btn, btn);
        let returnedAnimation = null;
        guiBtn.paddingTop = "10px";
        guiBtn.width = "100px";
        guiBtn.height = "50px";
        guiBtn.color = "white";
        guiBtn.background = "green";
        this.animationGui.addControl(guiBtn);
        guiBtn.onPointerUpObservable.add(() => {
            // //Load control funtion of the Asset Class
            this.controlAnimations(asset, assetIndex);
        });
    }

    controlAnimations(asset, assetIndex) {
        const animationGroups = asset.animationGroups;
        //stop all animations
        animationGroups.forEach(function(item) {
            item.stop(true);
        });
        //start pressed animation
        animationGroups[assetIndex].play(true);
    }



    createImgBtnNoText(name, location, width, height) {
        let tmpBtn = GUI.Button.CreateImageOnlyButton(name, location);
        tmpBtn.width = width;
        tmpBtn.height = height;
        tmpBtn.color = "transparent";
        this.advancedTexture.addControl(tmpBtn);
        return tmpBtn;
    }

    btnEvent(btn, doSomething, remove = false) {
        btn.onPointerUpObservable.add(() => {
            doSomething();
            if (remove === true) {
                this.advancedTexture.removeControl(btn);
            }
        });
    }

    //Function to add control buttons
    addControlUI(
        leftBtnName,
        leftFunction,
        centerBtnName,
        centerFunction,
        rightBtnName,
        rightFunction,
    ) {
        //Init Buttons
        this.leftBtn = GUI.Button.CreateSimpleButton("but1", leftBtnName);
        this.centerBtn = GUI.Button.CreateSimpleButton("but2", centerBtnName);
        this.rightBtn = GUI.Button.CreateSimpleButton("but3", rightBtnName);

        ////////////
        //set Style of Controle UI
        ////////////
        //Left Button Styles
        this.leftBtn.width = "150px";
        this.leftBtn.height = "40px";
        this.leftBtn.color = "white";
        this.leftBtn.cornerRadius = 20;
        this.leftBtn.background = "green";
        this.leftBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.leftBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Center Button Styles
        this.centerBtn.width = "150px";
        this.centerBtn.height = "40px";
        this.centerBtn.color = "white";
        this.centerBtn.cornerRadius = 20;
        this.centerBtn.background = "green";
        this.centerBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.centerBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Right Button Styles
        this.rightBtn.width = "150px";
        this.rightBtn.height = "40px";
        this.rightBtn.color = "white";
        this.rightBtn.cornerRadius = 20;
        this.rightBtn.background = "green";
        this.rightBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.rightBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        ////////////
        //set pointer Events
        ////////////
        //Add Pointer Event for the Left Button
        this.leftBtn.onPointerUpObservable.add(function () {
            leftFunction();
        });
        //Add Left Button to the GUI
        this.advancedTexture.addControl(this.leftBtn);

        //Add Pointer Event for the Center Button
        this.centerBtn.onPointerUpObservable.add(function () {
            centerFunction();
        });
        // Add Center Button to the GUI
        this.advancedTexture.addControl(this.centerBtn);

        //Add Pointer Event for the Right Button
        this.rightBtn.onPointerUpObservable.add(function () {
            rightFunction();
        });
        //Add Right Button to the GUI
        this.advancedTexture.addControl(this.rightBtn);
    }

    //Function to remove all Buttons of the Control GUI
    removeControlUI() {
        this.advancedTexture.removeControl(this.leftBtn);
        this.advancedTexture.removeControl(this.centerBtn);
        this.advancedTexture.removeControl(this.rightBtn);
        this.advancedTexture.removeControl(this.animationGui);
    }
}
