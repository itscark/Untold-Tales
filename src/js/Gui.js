import Game from "./Game";

class Gui extends Game {
  constructor() {}

  createButton() {
    var guiBtn = GUI.Button.CreateSimpleButton(btn, btn);
    var returnedAnimation = null;
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

  init() {
    //layout for Playbutton
    var playBtn = BABYLON.GUI.Button.CreateImageOnlyButton(
      "playBtn",
      "assets/images/gui/play-button.png"
    );
    playBtn.width = "200px";
    playBtn.height = "200px";
    playBtn.color = "transparent";

    return playBtn;
  }

  video(
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
    leftBtn = GUI.Button.CreateSimpleButton("but1", leftBtnName);
    leftBtn.width = "150px";
    leftBtn.height = "40px";
    leftBtn.color = "white";
    leftBtn.cornerRadius = 20;
    leftBtn.background = "green";
    leftBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    s;
    advancedTexture.addControl(leftBtn);

    exitBtn = GUI.Button.CreateSimpleButton("but2", centerBtnName);
    exitBtn.width = "150px";
    exitBtn.height = "40px";
    exitBtn.color = "white";
    exitBtn.cornerRadius = 20;
    exitBtn.background = "green";
    exitBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    exitBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    exitBtn.onPointerUpObservable.add(function() {
      removeUI();
      loadVideo(centerBtnVideo, centerBtnPoster);
    });
    advancedTexture.addControl(exitBtn);

    rightBtn = GUI.Button.CreateSimpleButton("but3", rightBtnName);
    rightBtn.width = "150px";
    rightBtn.height = "40px";
    rightBtn.color = "white";
    rightBtn.cornerRadius = 20;
    rightBtn.background = "green";
    rightBtn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rightBtn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rightBtn.onPointerUpObservable.add(function() {
      removeUI();
      loadVideo(rightBtnVideo, rightBtnPoster);
    });
    advancedTexture.addControl(rightBtn);
  }
}

export default Gui;
