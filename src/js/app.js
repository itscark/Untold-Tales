import Game from "./Game";
window.game = new Game();

// document.addEventListener("DOMContentLoaded", function() {
//   /******* Add the create scene function ******/
//   let createScene = function() {

//     //play Intro Video (autoplay is disabled by default, so users have to interact with the website once to enable it)

//     // playBtn.onPointerUpObservable.add(function() {
//     //   gui.removeControl(playBtn);
//     //   //Play Intro Video
//     //   playVideo(introVideo);
//     // });

//     // //load Assets
//     // const mainChar = loadAsset(
//     //   "mainChar",
//     //   "Stromboli",
//     //   "Stromboli_AnimLayer.gltf"
//     // );

//     // const pot = loadAsset("pot", "pot", "fbxFull.gltf");

//     // //load Videos
//     // var introVideo = loadVideo(
//     //   "assets/videos/Cam_Portal_Main.mp4",
//     //   "assets/poster/Cam_Portal_Main_Poster.png"
//     // );
//     //load assets

//     console.log(this.assetsManager);

//     assetsManager.load();

//     //after Assets are loaded load Video
//     assetsManager.onFinish = function() {
//       console.log("assets Manager finished");
//       //Stop all animations -> will become a function
//       stopAnimation(mainChar);

//       gui.addControl(playBtn, 0, 0);
//       //position and rotate char
//       positionAsset(mainChar, 1, -1, -2.5);
//       rotateAsset(mainChar, BABYLON.Axis.Y, Math.PI);
//       //position and rotate pot
//       positionAsset(pot, 1.3, -1, -3.4);
//       scaleAsset(pot, 40, 40, 40);
//       rotateAsset(pot, BABYLON.Axis.Y, Math.PI);
//     };

//     return this.scene;
//   };

//   /******* End of the create scene function ******/
// });
