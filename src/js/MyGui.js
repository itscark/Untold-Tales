import * as BABYLON from "babylonjs";
import {AdvancedDynamicTexture, StackPanel, Control, Button, ScrollViewer, Image, TextBlock, TextWrapping} from "babylonjs-gui";

export default class {
    constructor(game) {
        this.game = game;
        this.engine = game.engine;
        this.canvas = game.canvas;
        this.playBtn = game.playBtn;
        this.Asset = game.Asset;
        this.Video = game.Video;
        //load GUI
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("gui");

        //load Animatin GUI
        this.animationGui = new StackPanel();
        this.animationGui.width = "220px";
        this.animationGui.fontSize = "14px";
        this.animationGui.horizontalAlignment =
            Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.animationGui.verticalAlignment =
            Control.VERTICAL_ALIGNMENT_CENTER;
        this.animationBtn = null;

        //Init Variables
        this.buttonPath = "assets/images/buttons/";
    }

    createButton(btn, asset, assetIndex) {
        this.animationBtn = Button.CreateImageWithCenterTextButton(btn, btn, this.buttonPath + "snow_button.png");
        this.animationBtn.paddingTop = "10px";
        this.animationBtn.width = "100px";
        this.animationBtn.height = "56px";
        this.animationBtn.color = "white";
        this.animationBtn.thickness = 0;
        this.animationGui.addControl(this.animationBtn);
        this.animationBtn.onPointerUpObservable.add(() => {
            // //Load control funtion of the Asset Class
            //this.Animations can not be assigned in the Constructore because of redering procedre
            this.game.Animations.control(asset, assetIndex);
        });
    }

    createImgBtnNoText(name, location, width, height) {
        let tmpBtn = Button.CreateImageOnlyButton(name, location);
        tmpBtn.width = width;
        tmpBtn.height = height;
        tmpBtn.color = "transparent";
        this.advancedTexture.addControl(tmpBtn);
        return tmpBtn;
    }

    createImgBtnWithText(name, text, src,left = 0, top = 0, callback) {
        let button = Button.CreateImageWithCenterTextButton(name, text, this.buttonPath + src);
        button.width = 0.2;
        button.height = "40px";
        button.color = "white";
        button.left = left;
        button.top = top;
        button.background = "transparent";
        button.thickness = 0;
        this.advancedTexture.addControl(button);
        button.onPointerUpObservable.add(() => {
            callback()
        });
        return button
    }

    btnEvent(btn, doSomething, remove = false) {
        btn.onPointerUpObservable.add(() => {
            doSomething();
            if (remove === true) {
                this.advancedTexture.removeControl(btn);
            }
        });
    }

    removeBtn(btn){
        this.advancedTexture.removeControl(btn);
    }

    createTextBox(assetName) {
        //init ScrollViewer
        this.sv = new ScrollViewer();
        this.sv.thickness = 0;
        this.sv.color = "white";
        this.sv.width = 0.25;
        this.sv.height = 0.4;
        this.sv.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.sv.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.sv.top = "50px";
        this.sv.left = "50px";
        this.sv.zIndex = 10;

        this.sv.barColor = "white";
        this.advancedTexture.addControl(this.sv);

        //todo
        //qr code in der Textbox anzeigen mit einem link der einen neuen tab öffnet

        //Set Background
        this.scrollViewerBg = new Image('ScrollViewerBg', "assets/images/gui/ScrollViewer_bg.jpg");
        this.scrollViewerBg.width = 0.25;
        this.scrollViewerBg.height = 0.4;
        this.scrollViewerBg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.scrollViewerBg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewerBg.top = "50px";
        this.scrollViewerBg.left = "50px";
        this.scrollViewerBg.alpha = 0.5;
        this.advancedTexture.addControl(this.scrollViewerBg);

        //Init Textblock where text is added
        this.tb = new TextBlock();
        this.tb.textWrapping = TextWrapping.WordWrap;
        this.tb.resizeToFit = true;
        this.tb.lineSpacing = "8px";
        this.tb.paddingTop = "20px";
        this.tb.paddingLeft = "30px";
        this.tb.paddingRight = "20px";
        this.tb.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.tb.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.tb.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.tb.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.tb.color = "white";
        this.tb.fontSize = "8%";


        let obj = this.game.stories_json['charakter'];
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].name == assetName) {
                //this.tb.paddingBottom is not working, so i added an extra line so get some spacing
                this.tb.text = obj[i].story + "\n";
            }
        }
        this.sv.addControl(this.tb);
    }

    createNavigationButtons(leftBtnName,
                            leftFunction,
                            centerFunction,
                            rightBtnName,
                            rightFunction,
                            btnSrc = "snow_button.png") {
        //Init Buttons
        //this.leftBtn = GUI.Button.CreateSimpleButton("but1", leftBtnName);
        this.leftBtn = Button.CreateImageWithCenterTextButton("but1", leftBtnName, this.buttonPath + btnSrc);
        //this.centerBtn = GUI.Button.CreateSimpleButton("but2", "Portal");
        this.centerBtn = Button.CreateImageWithCenterTextButton("but2", "Portal", this.buttonPath + btnSrc);
        //this.rightBtn = GUI.Button.CreateSimpleButton("but3", rightBtnName);
        this.rightBtn = Button.CreateImageWithCenterTextButton("but3", rightBtnName, this.buttonPath + btnSrc);

        ////////////
        //set Style of Controle UI
        ////////////
        //Left Button Styles
        this.leftBtn.width = "100px";
        this.leftBtn.height = "46px";
        this.leftBtn.color = "white";
        this.leftBtn.thickness = 0;
        this.leftBtn.left = "30px";
        this.leftBtn.top = "-30px";
        this.leftBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.leftBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Center Button Styles
        this.centerBtn.width = "100px";
        this.centerBtn.height = "46px";
        this.centerBtn.color = "white";
        this.centerBtn.thickness = 0;
        this.centerBtn.left = "30px";
        this.centerBtn.top = "-30px";
        this.centerBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.centerBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Right Button Styles
        this.rightBtn.width = "100px";
        this.rightBtn.height = "46px";
        this.rightBtn.color = "white";
        this.rightBtn.thickness = 0;
        this.rightBtn.left = "-30px";
        this.rightBtn.top = "-30px";
        this.rightBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.rightBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;


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

    //Function to add control buttons
    addControlUI(
        leftBtnName,
        leftFunction,
        centerFunction,
        rightBtnName,
        rightFunction,
        btnSrc,
        storyName
    ) {
        if (storyName != null) {
            this.createTextBox(storyName);
            this.arButton(storyName);
        }



        this.createNavigationButtons(leftBtnName,
            leftFunction,
            centerFunction,
            rightBtnName,
            rightFunction,
            btnSrc)
    }

    arButton(storyName) {
        this.arBtn = Button.CreateSimpleButton("arBtn", "See me in AR");
        this.arBtn.width = "150px";
        this.arBtn.height = "56px";
        this.arBtn.color = "white";
        this.arBtn.left = "-30px";
        this.arBtn.top = "30px";
        this.arBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.arBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.arBtn.onPointerUpObservable.add(() => {
            let pathname = window.location.pathname.replace('index.html', '');
            window.open(pathname + "sites/qrcode.html?char=" + storyName, '_blank')
        });
        this.advancedTexture.addControl(this.arBtn);

    }

    //Function to remove all Buttons of the Control GUI
    removeControlUI() {
        this.advancedTexture.removeControl(this.leftBtn);
        this.advancedTexture.removeControl(this.centerBtn);
        this.advancedTexture.removeControl(this.rightBtn);
        this.advancedTexture.removeControl(this.animationBtn);
        //remove all previous Animations Buttons from the GUI
        this.animationGui._children = [];
        this.advancedTexture.removeControl(this.animationGui);
        this.advancedTexture.removeControl(this.sv);
        this.advancedTexture.removeControl(this.scrollViewerBg);
        this.advancedTexture.removeControl(this.arBtn);
    }
}
