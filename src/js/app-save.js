// import * as BABYLON from "babylonjs";
// import "babylonjs-loaders";
// import * as GUI from "babylonjs-gui";

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("renderCanvas"); // Get the canvas element
  var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

  /******* Add the create scene function ******/
  var createScene = function() {
    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
    BABYLON.Animation.AllowMatricesInterpolation = true;

    // // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);

    // Activate ArcCam + Camera Controlls
    var camera = new BABYLON.ArcRotateCamera(
      "cam",
      -Math.PI / 2,
      Math.PI / 2,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );

    const assetPath = "/assets/chars/";

    // Attach the camera to the canvas.
    camera.attachControl(canvas, true);

    camera.minZ = 0.001;
    camera.wheelPrecision = 150;
    // Target the camera to scene origin.
    camera.setTarget(BABYLON.Vector3.Zero());

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );
    //var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    // Add and manipulate meshes in the scene
    var bgPlane = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { width: 10, height: 6 },
      scene
    );
    //Create Materials
    var mat = new BABYLON.StandardMaterial("mat", scene);

    //load Asset manager
    var assetsManager = new BABYLON.AssetsManager(scene);

    //load GUI
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");

    //load Animatin GUI
    var animationGui = new BABYLON.GUI.StackPanel();
    animationGui.width = "220px";
    animationGui.fontSize = "14px";
    animationGui.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    animationGui.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    gui.addControl(animationGui);

    //layout for Playbutton
    var playBtn = BABYLON.GUI.Button.CreateImageOnlyButton(
      "playBtn",
      "assets/images/gui/play-button.png"
    );
    playBtn.width = "200px";
    playBtn.height = "200px";
    playBtn.color = "transparent";

    //Variables for Assets
    var introVideo = null;

    //play Intro Video (autoplay is disabled by default, so users have to interact with the website once to enable it)
    playBtn.onPointerUpObservable.add(function() {
      gui.removeControl(playBtn);
      //Play Intro Video
      playVideo(introVideo);
    });

    //axios testing
    function preLoadVideo(videoPath) {
      const getVideo = () => {
        try {
          return axios.get(videoPath);
        } catch (error) {
          console.error(error);
        }
      };

      const asignVideo = async () => {
        const video = getVideo()
          .then(response => {
            if (response.data) {
              console.log(response.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
    }

    function loadVideo(video, poster) {
      var videoTexture = new BABYLON.VideoTexture(
        "video",
        video,
        scene,
        false,
        false,
        BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
        {
          autoUpdateTexture: true,
          poster: poster
        }
      );
      //Apply Texture
      mat.diffuseTexture = videoTexture;
      //Apply Video to BG
      bgPlane.material = mat;
      //start video
      //videoTexture.video.play();
      return videoTexture;
    }

    function playVideo(videoAsset) {
      videoAsset.video.play();
      console.log("video started");

      var htmlVideo = mat.diffuseTexture.video;
      htmlVideo.onended = function() {
        finishedVideo();
      };
    }

    function finishedVideo(video) {
      console.log("video Finished & show Assets");
      //show Assets
      showHideAsset(mainChar, true);
      showHideAsset(pot, true);

      loadAssetAnimation(mainChar);
      //start idle Animation of First Char
      controlAnimations(mainChar, 1);
    }

    function showHideAsset(asset, showHide) {
      asset.loadedMeshes[0].setEnabled(showHide);
    }

    function loadAsset(assetName, assetDir, gltfFile) {
      //load Asset
      var tmpTask = assetsManager.addMeshTask(
        assetName,
        "",
        assetPath + assetDir + "/",
        gltfFile
      );
      //on Success
      tmpTask.onSuccess = function(task) {
        task.loadedMeshes[0].setEnabled(false);
      };

      return tmpTask;
    }

    function positionAsset(task, xPosition, yPosition, zPosition) {
      mesh = task.loadedMeshes[0];
      mesh.position.x = xPosition;
      mesh.position.y = yPosition;
      mesh.position.z = zPosition;
    }

    function scaleAsset(task, xScale, yScale, zScale) {
      mesh = task.loadedMeshes[0];
      //example: mesh.scaling = new BABYLON.Vector3(60, 60, 60);
      mesh.scaling = new BABYLON.Vector3(xScale, yScale, zScale);
    }

    function rotateAsset(task, axis, rotation) {
      mesh = task.loadedMeshes[0];
      //example: mesh.rotate(BABYLON.Axis.Y, Math.PI);
      mesh.rotate(axis, rotation);
    }

    function loadAssetAnimation(asset) {
      for (let i = 0; i < asset.loadedAnimationGroups.length; i++) {
        var tmpAsset = asset.loadedAnimationGroups[i];
        var tmpName = tmpAsset["name"];
        createButton(tmpName, asset, i);
      }
    }

    function createButton(btn, asset, assetIndex) {
      var guiBtn = GUI.Button.CreateSimpleButton(btn, btn);
      var returnedAnimation = null;
      guiBtn.paddingTop = "10px";
      guiBtn.width = "100px";
      guiBtn.height = "50px";
      guiBtn.color = "white";
      guiBtn.background = "green";
      animationGui.addControl(guiBtn);
      guiBtn.onPointerUpObservable.add(function() {
        controlAnimations(asset, assetIndex);
      });
    }

    function controlAnimations(asset, assetIndex) {
      animationGroups = asset.loadedAnimationGroups;
      //stop all animations
      animationGroups.forEach(function(item) {
        item.stop(true);
      });
      //start pressed animation
      animationGroups[assetIndex].play(true);
    }

    function stopAnimation(asset) {
      asset.loadedAnimationGroups.forEach(function(item) {
        item.stop(true);
      });
    }

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

    function videoUi(
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
      leftBtn.horizontalAlignment =
        BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      leftBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
      ;
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

    return scene;
  };

  /******* End of the create scene function ******/

  var scene = createScene(); //Call the createScene function

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function() {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function() {
    engine.resize();
  });
});
