import {
    AdvancedDynamicTexture,
    StackPanel,
    Control,
    Button,
    ScrollViewer,
    Image,
    TextBlock,
    TextWrapping
} from "babylonjs-gui";
import * as BABYLON from "babylonjs";

export default class {
    constructor(game) {
        this.game = game;
        this.engine = game.engine;
        this.canvas = game.canvas;
        this.playBtn = game.playBtn;
        this.Asset = game.Asset;
        this.Video = game.Video;

        this.counter = 0;

        this.buttonPath = "assets/gui/buttons/";

        this.buttonWidth = 0.11;
        this.buttonHeigt = 0.12;

        this.createGUI();
    }

    createGUI() {
        //load GUI and create the texture every fui element will be appended to
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("gui");
        //load Animatin GUI
        this.animationGui = new StackPanel();
        // this.animationGui.ignoreLayoutWarnings = true;
        this.animationGui.width = 0.11;
        this.animationGui.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.animationGui.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.animationGui.left = -30;
        this.animationBtn = null;

        //create a plane for the fog
        this.game.fogPlane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 100, height: 50}, this.game.scene);
        //set z-index
        this.game.fogPlane.position.z = 10;
        //create material for plaen
        this.materialforplane = new BABYLON.StandardMaterial("texture1", this.game.scene);
        //set fog color
        const color = new BABYLON.Color3(0.9, 0.9, 0.85);
        //set color of plane to fog color
        this.materialforplane.emissiveColor = color;
        //set plane material to previously set material
        this.game.fogPlane.material = this.materialforplane;
        //set the itensity to 100%, after play button is clicked slowly set to 0
        this.materialforplane.alpha = 1;

        //create basic elements
        // the textbox will be loaded at the inital load and removed and added when needed. with this the background image will not be
        this.createTextBox();
    }

    createButton(btn, asset, assetIndex) {
        this.animationBtn = Button.CreateImageWithCenterTextButton(btn, btn, this.buttonPath + "Button_Animation.png");

        //select canvas
        let canvasSize = document.getElementById('renderCanvas');
        //set height and width variable
        let buttonWidth = parseFloat(canvasSize.width) * 0.11;
        let buttonHeight = parseFloat(canvasSize.height) * 0.11;


        this.animationBtn.paddingTop = "20px";
        this.animationBtn.widthInPixels = buttonWidth;
        this.animationBtn.heightInPixels = buttonHeight;
        this.animationBtn.color = "#6b202d";
        this.animationBtn.thickness = 0;
        this.animationBtn.fontFamily = "AYearWithoutRain, sans-serif";
        this.animationBtn.fontSize = buttonHeight / 3.5;
        this.animationGui.addControl(this.animationBtn);
        this.animationBtn.onPointerUpObservable.add(() => {
            // //Load control funtion of the Asset Class
            //this.Animations can not be assigned in the Constructore because of rendering procedre
            this.game.Animations.control(asset, assetIndex);
        });
    }

    createTextBox() {
        //init ScrollViewer
        this.sv = new ScrollViewer();
        this.sv.thickness = 0;
        this.sv.color = "#6b202d";
        this.sv.barColor = "#6b202d";
        this.sv.width = 0.23;
        this.sv.height = 0.35;
        this.sv.zIndex = 10;
        this.sv.top = "11%";
        this.sv.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        //Set Background
        this.scrollViewerBg = new Image('ScrollViewerBg', "assets/gui/Textbox_Papyrus.png");
        this.scrollViewerBg.width = 0.31;
        this.scrollViewerBg.height = 0.5;
        this.scrollViewerBg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewerBg.top = "3%";

        //Init Textblock where text is added
        this.tb = new TextBlock();
        this.tb.textWrapping = TextWrapping.WordWrap;
        this.tb.resizeToFit = true;
        this.tb.lineSpacing = "8px";
        this.tb.paddingTop = "20px";
        this.tb.paddingLeft = "30px";
        this.tb.paddingRight = "20px";
        this.tb.fontFamily = "aisha-latin, sans-serif";
        this.tb.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.tb.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.tb.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.tb.fontSize = "13%";
        this.tb.color = "#6b202d";

    }

    setTextBox(assetName, position) {
        //because chars are positioned on different sides the textbox has to be able to move from left to right
        if (position == 'left') {
            this.scrollViewerBg.left = "5%";
            this.scrollViewerBg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
            this.tb.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
            this.sv.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
            this.sv.left = "8.4%";
        } else if (position == 'right') {
            this.scrollViewerBg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
            this.scrollViewerBg.left = "-18%";
            this.tb.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
            this.sv.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
            this.sv.left = "-23.1%";
        }
        let obj = this.game.stories_json['charakter'];
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].name == assetName) {
                //this.tb.paddingBottom is not working, so i added an extra line so get some spacing
                this.tb.text =
                    obj[i].displayName + "!" + "\n" +
                    obj[i].story + "\n";
            }
        }
        this.advancedTexture.addControl(this.sv);
        this.advancedTexture.addControl(this.scrollViewerBg);
        this.sv.addControl(this.tb);
    }

    createNavigationButtons(leftBtn,
                            leftFunction,
                            centerFunction,
                            rightBtn,
                            rightFunction) {
        //Init Buttons
        this.leftBtn = Button.CreateImageOnlyButton("left", this.buttonPath + "Button_" + leftBtn + ".png");
        this.centerBtn = Button.CreateImageOnlyButton("center", this.buttonPath + "Button_Portal_Exit.png");
        this.rightBtn = Button.CreateImageOnlyButton("right", this.buttonPath + "Button_" + rightBtn + ".png");

        ////////////
        //set Style of Controle UI
        ////////////
        //Left Button Styles
        this.leftBtn.width = this.buttonWidth;
        this.leftBtn.height = this.buttonHeigt;
        this.leftBtn.color = "white";
        this.leftBtn.thickness = 0;
        this.leftBtn.left = "30px";
        this.leftBtn.top = "-30px";
        this.leftBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.leftBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Center Button Styles
        this.centerBtn.width = this.buttonWidth;
        this.centerBtn.height = this.buttonHeigt;
        this.centerBtn.color = "white";
        this.centerBtn.thickness = 0;
        this.centerBtn.left = "30px";
        this.centerBtn.top = "-30px";
        this.centerBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.centerBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

        //Right Button Styles
        this.rightBtn.width = this.buttonWidth;
        this.rightBtn.height = this.buttonHeigt;
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
        leftBtn,
        leftFunction,
        centerFunction,
        rightBtn,
        rightFunction,
        storyName,
        boxPosition
    ) {
        if (storyName != null) {
            this.setTextBox(storyName, boxPosition);
            this.setARButton(storyName);
        }


        this.createNavigationButtons(leftBtn,
            leftFunction,
            centerFunction,
            rightBtn,
            rightFunction)
    }

    setARButton(storyName) {
        this.arBtn = Button.CreateImageOnlyButton('Ar Button', this.buttonPath + 'Button_AR.png');
        this.arBtn.width = this.buttonWidth;
        this.arBtn.height = this.buttonHeigt;
        this.arBtn.zIndex = 10;
        this.arBtn.color = "transparent";
        this.arBtn.left = "-30px";
        this.arBtn.top = "30px";
        this.arBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.arBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.arBtn.onPointerUpObservable.add(() => {
            let pathname = window.location.pathname.replace('index.html', '');
            window.open(pathname + "qr/" + storyName.toLowerCase(), '_blank')
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

    //fadeout the fig in the beginning
    fadeOutFog(plane) {
        //loop to slowly fade out the fog plane
        let i = 1;
        do {
            ((i) => {
                //set time out is used to run the code slower, to create a fadeout effect
                setTimeout(() => {
                    //set the alpha for the plane to disapear
                    plane.material.alpha = 1 - i;
                    //loop is done, now dispose the fogPlane
                    if (plane.material.alpha < 0.03) {
                        //dispose the plane to avoid errors
                        plane.dispose();
                    }
                }, 2000 * i)
            })(i -= 0.02)
        } while (i > 0);
    }

    fadeOutGuiElement(element) {
        let i = 1;
        do {
            ((i) => {
                //set time out is used to run the code slower, to create a fadeout effect
                setTimeout(() => {
                    //set the alpha to hide element
                    element.alpha = 1 - i;
                    //loop is done, remove control from advanced Texture
                    if (element.alpha < 0.03) {
                        //dispose the plane to avoid errors
                        element.alpha = 0;
                        this.advancedTexture.removeControl(element);
                    }
                }, 300 * i)
            })(i -= 0.02)
        } while (i > 0);
    }

    fadeOutDomElement(element) {
        let i = 1;
        do {
            ((i) => {
                //set time out is used to run the code slower, to create a fadeout effect
                setTimeout(() => {
                    //set the alpha to hide element
                    element.style.opacity = 1 - i;
                    //loop is done, remove control from advanced Texture
                    if (element.style.opacity < 0.03) {
                        //dispose the plane to avoid errors
                        element.style.display = "none";
                    }
                }, 300 * i)
            })(i -= 0.02)
        } while (i > 0);
    }

    fadeOutWelcomeScreen() {
        //call function to fade out the fog
        this.fadeOutFog(this.game.fogPlane);
        //fade out intro text
        this.fadeOutDomElement(this.game.introText);
        this.fadeOutDomElement(document.getElementById('logo'));
        this.fadeOutDomElement(document.getElementById('play_button'));

    }
}
