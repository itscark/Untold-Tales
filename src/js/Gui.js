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
  }

  createButton() {
    let guiBtn = Button.CreateSimpleButton(btn, btn);
    let returnedAnimation = null;
    guiBtn.paddingTop = "10px";
    guiBtn.width = "100px";
    guiBtn.height = "50px";
    guiBtn.color = "white";
    guiBtn.background = "green";
    animationGui.addControl(guiBtn);
    guiBtn.onPointerUpObservable.add(function() {
      // //Load control funtion of the Asset Class
      //controlAnimations(asset, assetIndex);
    });
  }

  charControl() {
    //load Animatin GUI
    var animationGui = new BABYLON.GUI.StackPanel();
    animationGui.width = "220px";
    animationGui.fontSize = "14px";
    animationGui.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    animationGui.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    gui.addControl(animationGui);
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

  ui(
    leftBtnName,
    leftBtnVideo,
    leftBtnPoster,
    centerBtnName,
    centerBtnVideo,
    centerBtnPoster,
    rightBtnName,
    rightBtnVideo,
    rightBtnPoster
  ) {
    let leftBtn = GUI.Button.CreateSimpleButton("but1", leftBtnName);
    leftBtn.width = "150px";
    leftBtn.height = "40px";
    leftBtn.color = "white";
    leftBtn.cornerRadius = 20;
    leftBtn.background = "green";
    leftBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    leftBtn.onPointerUpObservable.add(function() {
      this.Video.loadVideo(leftBtnVideo, leftBtnPoster);
    });
    this.advancedTexture.addControl(leftBtn);

    let exitBtn = GUI.Button.CreateSimpleButton("but2", centerBtnName);
    exitBtn.width = "150px";
    exitBtn.height = "40px";
    exitBtn.color = "white";
    exitBtn.cornerRadius = 20;
    exitBtn.background = "green";
    exitBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    exitBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    exitBtn.onPointerUpObservable.add(function() {
      this.Video.loadVideo(centerBtnVideo, centerBtnPoster);
    });
    this.advancedTexture.addControl(exitBtn);

    let rightBtn = GUI.Button.CreateSimpleButton("but3", rightBtnName);
    rightBtn.width = "150px";
    rightBtn.height = "40px";
    rightBtn.color = "white";
    rightBtn.cornerRadius = 20;
    rightBtn.background = "green";
    rightBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rightBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rightBtn.onPointerUpObservable.add(function() {
      this.Video.loadVideo(rightBtnVideo, rightBtnPoster);
    });
    this.advancedTexture.addControl(rightBtn);
  }
}
