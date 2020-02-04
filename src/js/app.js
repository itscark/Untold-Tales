// import * as BABYLON from "babylonjs";
// import "babylonjs-loaders";
// import * as GUI from "babylonjs-gui";

import Game from "./Game";
import Video from "./Video";
import Asset from "./Asset";

const game = new Game();
const video = new Video();
const asset = new Asset();

const assetPath = "/assets/chars/";

asset.test();

document.addEventListener("DOMContentLoaded", function() {
  /******* Add the create scene function ******/
  let createScene = function() {
    // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
    BABYLON.Animation.AllowMatricesInterpolation = true;

    //play Intro Video (autoplay is disabled by default, so users have to interact with the website once to enable it)

    playBtn.onPointerUpObservable.add(function() {
      gui.removeControl(playBtn);
      //Play Intro Video
      playVideo(introVideo);
    });

    //load Assets
    const mainChar = loadAsset(
      "mainChar",
      "Stromboli",
      "Stromboli_AnimLayer.gltf"
    );

    const pot = loadAsset("pot", "pot", "fbxFull.gltf");

    //load Videos
    var introVideo = loadVideo(
      "assets/videos/Cam_Portal_Main.mp4",
      "assets/poster/Cam_Portal_Main_Poster.png"
    );
    //load assets
    assetsManager.load();

    //after Assets are loaded load Video
    assetsManager.onFinish = function() {
      console.log("assets Manager finished");
      //Stop all animations -> will become a function
      stopAnimation(mainChar);

      gui.addControl(playBtn, 0, 0);
      //position and rotate char
      positionAsset(mainChar, 1, -1, -2.5);
      rotateAsset(mainChar, BABYLON.Axis.Y, Math.PI);
      //position and rotate pot
      positionAsset(pot, 1.3, -1, -3.4);
      scaleAsset(pot, 40, 40, 40);
      rotateAsset(pot, BABYLON.Axis.Y, Math.PI);
    };

    return this.scene;
  };

  /******* End of the create scene function ******/

  var scene = createScene(); //Call the createScene function

  // Register a render loop to repeatedly render the scene
  this.engine.runRenderLoop(function() {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function() {
    engine.resize();
  });
});
