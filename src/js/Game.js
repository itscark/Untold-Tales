// Import Babylon.js
import * as BABYLON from "babylonjs";
//Import Babylon Loaders
import "babylonjs-loaders";
//Import Video Class
import Video from "./Video";
//Import Asset Class
import Asset from "./Asset";
//Import HUD Gui
import GUI from "./GUI";
//import Animations
import Animations from "./Animations";

export default class {
  constructor() {
    // Get Canvas
    //select canvas
    this.canvas = document.getElementById("renderCanvas");
    // Generate the BABYLON 3D engine
    this.engine = new BABYLON.Engine(this.canvas, true);
    // Create the scene space
    this.scene = new BABYLON.Scene(this.engine);
    // Activate ArcCam + Camera Controlls
    this.camera = new BABYLON.ArcRotateCamera(
      "cam",
      -Math.PI / 2,
      Math.PI / 2,
      10,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    // // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    // this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    // This attaches the camera to the canvas
    this.camera.attachControl(this.canvas, true);
    this.camera.minZ = 0.001;
    this.camera.wheelPrecision = 150;
    // Target the camera to scene origin.
    this.camera.setTarget(BABYLON.Vector3.Zero());

    // Add lights to the scene
    this.light1 = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 1, 0),
      this.scene
    );
    // Add and manipulate meshes in the scene
    this.bgPlane = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { width: 10, height: 6 },
      this.scene
    );
    //Create Materials
    this.mat = new BABYLON.StandardMaterial("mat", this.scene);

    // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
    BABYLON.Animation.AllowMatricesInterpolation = true;

    // Create Scene
    this.createScene();

    // Init Variables
    this.assetPath = "/assets/chars/";
    this.introVideo = null;
    this.playBtn = null;
    this.videoAsset = null;
    this.gameTask = null;

  }

  createScene() {
    //Load Classes
    this.assetsManager = new BABYLON.AssetsManager(this.scene);
    this.Animations = new Animations(this);
    this.Asset = new Asset(this);
    this.GUI = new GUI(this);
    this.Video = new Video(this);

    // On Window Resize => Resize Game
    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    // When all assets are loaded =>
    this.assetsManager.onFinish = tasks => {
      this.setup();
    };
    // Start Loading
    this.assetsManager.load();
  }

  setup() {
    //load Start Button
    this.playBtn = this.GUI.createImgBtnNoText(
      "playBtn",
      "assets/images/gui/play-button.png",
      "200px",
      "200px"
    );

    //load bg Video
    this.bgVideo = this.Video.load(
      "assets/videos/Cam_Portal_Main.mp4",
      "assets/poster/Cam_Portal_Main_Poster.png"
    );
    //Attach Video to Background
    this.Video.attach(this.bgVideo);

    //initial Play button was pressed
    this.GUI.btnEvent(this.playBtn,() => {
        this.mainChar();
      },true);

    //start Render Loop
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  mainChar(){
    this.Video.start(this.bgVideo);

    let leftVideo = this.Video.load(
        "assets/videos/Cam_Main_Basilisk.mp4",
        "assets/poster/Cam_Main_Basilisk_Poster.png");
    let rightVideo = this.Video.load(
        "assets/videos/Cam_Portal_Main.mp4",
        "assets/poster/Cam_Portal_Main_Poster.png");
    let centerVideo = this.Video.load(
        "assets/videos/Cam_Main_Portal.mp4",
        "assets/poster/Cam_Main_Portal_Poster.png");

    this.Video.htmlVideo;

    this.Video.htmlVideo.onended = () => {
      this.uiBtn = this.GUI.ui(
          "left",
          "assets/videos/Cam_Portal_Main.mp4",
          "assets/poster/Cam_Portal_Main_Poster.png",
          "center",
          "assets/videos/Cam_Portal_Main.mp4",
          "assets/poster/Cam_Portal_Main_Poster.png",
          "right",
          "assets/videos/Cam_Portal_Main.mp4",
          "assets/poster/Cam_Portal_Main_Poster.png"
          )
    };
  }
}
