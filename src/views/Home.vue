<template>
  <div class="home">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted: function(){
    //select canvas
            var canvas = document.getElementById('renderCanvas');

            //load engine
            var engine = new BABYLON.Engine(canvas, true);

            //create scene
            var createScene = function () {
                // Create a basic BJS Scene object.
                var scene = new BABYLON.Scene(engine);

                // // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
                // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);

                // Activate ArcCam + Camera Controlls
                var camera = new BABYLON.ArcRotateCamera("cam", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);

                // Attach the camera to the canvas.
                camera.attachControl(canvas, true);

                // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
                BABYLON.Animation.AllowMatricesInterpolation = true;
                //Camera settings
                camera.minZ = 0.001;
                camera.wheelPrecision = 150;
                // Target the camera to scene origin.
                camera.setTarget(BABYLON.Vector3.Zero());
                // Create a basic light, aiming 0,1,0 - meaning, to the sky.
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
                //Create BG Plane
                var plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: 10, height: 6 }, scene);
                //Create Materials
                var mat = new BABYLON.StandardMaterial("mat", scene);

                //Create Play Button
                var introButtonPanel = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
                var introUiPanel = new BABYLON.GUI.StackPanel();
                introUiPanel.fontSize = "14px";
                introButtonPanel.addControl(introUiPanel);
                var introButton = BABYLON.GUI.Button.CreateSimpleButton("but1", "Play");
                introButton.paddingLeft = "30px";
                introButton.paddingTop = "10px";
                introButton.width = "130px";
                introButton.height = "50px";
                introButton.color = "white";
                introButton.background = "green";
                introButton.top = "500px";
                introButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                introButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

                introUiPanel.addControl(introButton);


                var exitBtn;
                var leftBtn;
                var rightBtn;
                var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

                var videoTexture;

                //Import Assets
                var assetsManager = new BABYLON.AssetsManager(scene);
                var potTask = assetsManager.addMeshTask("pot", "", "src/assets/chars/pot/", "fbxFull.gltf");
                // potTask.onSuccess = function (task) {
                //     Console.log('Pot Loaded')
                //     //Scale up Asset
                //     task.loadedMeshes[0].scaling = new BABYLON.Vector3(60, 60, 60);
                //     //Rotate Asset
                //     task.loadedMeshes[0].rotate(BABYLON.Axis.Y, Math.PI)

                //     //set Asset position
                //     task.loadedMeshes[0].position.x = 1;
                //     task.loadedMeshes[0].position.y = -1;
                //     task.loadedMeshes[0].position.z = -2.5;
                // }

                var showFirstScene = false;

                potTask.onSuccess = function (task) {

                    mesh = task.loadedMeshes[0];

                    //Scale up Asset
                    mesh.scaling = new BABYLON.Vector3(60, 60, 60);
                    //Rotate Asset
                    mesh.rotate(BABYLON.Axis.Y, Math.PI)

                    //set Asset position
                    mesh.position.x = 1;
                    mesh.position.y = -1;
                    mesh.position.z = -2.5;
                    //show / hide pot
                    mesh.setEnabled(showFirstScene);
                }

                function positionPot(task) {
                    //Scale up Asset
                    potTaskVar.loadedMeshes[0].scaling = new BABYLON.Vector3(60, 60, 60);
                    //Rotate Asset
                    potTaskVar.loadedMeshes[0].rotate(BABYLON.Axis.Y, Math.PI)

                    //set Asset position
                    potTaskVar.loadedMeshes[0].position.x = 1;
                    potTaskVar.loadedMeshes[0].position.y = -1;
                    potTaskVar.loadedMeshes[0].position.z = -2.5;


                }

                //Position Assets
                // function positionAsset(task, name, scaling = [60, 60, 60], rotation = Math.PI, xPosition = 1, yPosition = 1, zPosition = 1) {
                //     console.log(name + ' loaded')
                //     //Scale up Asset
                //     task.loadedMeshes[0].scaling = new BABYLON.Vector3(scaling);
                //     //Rotate Asset
                //     task.loadedMeshes[0].rotate(BABYLON.Axis.Y, rotation)

                //     //set Asset position
                //     task.loadedMeshes[0].position.x = xPosition;
                //     task.loadedMeshes[0].position.y = yPosition;
                //     task.loadedMeshes[0].position.z = zPosition;
                // }

                function first_char() {
                    //Load Pot

                    engine.displayLoadingUI();

                    //create button function
                    var createButton = function (group, panel) {
                        var button = BABYLON.GUI.Button.CreateSimpleButton("button", group.name);
                        button.paddingTop = "10px";
                        button.width = "100px";
                        button.height = "30px";
                        button.left = "50px";
                        button.color = "white";
                        button.cornerRadius = 20;
                        button.background = "green";
                        button.onPointerDownObservable.add(function () {
                            if (currentGroup) {
                                currentGroup.stop();
                            }
                            group.start(true);
                            currentGroup = group;
                        });
                        panel.addControl(button);
                    }

                    BABYLON.SceneLoader.ImportMesh("", "src/assets/chars/Stromboli/", "Stromboli_AnimLayer.gltf", scene, function (newMeshes, particleSystems, skeletons) {
                        var skeleton = skeletons[0];
                        var mesh = newMeshes[0];

                        for (var index = 0; index < newMeshes.length; index++) {
                            newMeshes[index].alwaysSelectAsActiveMesh = true;
                        }

                        scene.stopAllAnimations();

                        // Enable animation blending for all animations
                        scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
                        scene.animationPropertiesOverride.enableBlending = true;
                        scene.animationPropertiesOverride.blendingSpeed = 0.02;
                        scene.animationPropertiesOverride.loopMode = 1;

                        //scale and Position Char
                        mesh.position.x = 2;
                        mesh.position.y = -1;
                        mesh.position.z = -1;
                        mesh.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
                    });
                }

                function loadVideo(video, poster, showUi = false) {
                    var videoTexture = new BABYLON.VideoTexture("video", video, scene, false, false, BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, {
                        autoUpdateTexture: true,
                        poster: poster,
                    });
                    //Apply Texture
                    mat.diffuseTexture = videoTexture;
                    //Apply Video to BG
                    plane.material = mat;
                    //start video 
                    videoTexture.video.play();

                    var htmlVideo = mat.diffuseTexture.video;
                    htmlVideo.onended = function () {
                        if (showUi) {
                            showUI();
                        }
                    }
                }

                function introVideo() {
                    // Video material
                    var videoMat = new BABYLON.StandardMaterial("textVid", scene);

                    videoMat.diffuseTexture = new BABYLON.VideoTexture("video", ["src/assets/videos/Cam_Portal_Main.mp4"], scene, false, false, BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, {
                        autoUpdateTexture: true,
                        poster: "src/assets/videos/Cam_Portal_Main_Poster.png",
                    });
                    //videoMat.backFaceCulling = false;

                    //Applying materials
                    plane.material = videoMat;

                    var htmlVideo = videoMat.diffuseTexture.video;

                    // Show loading animation.
                    var playPromise = htmlVideo.play();

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            introUiPanel.removeControl(introButton);
                        })
                            .catch(error => {
                                introButton.onPointerDownObservable.add(() => {
                                    htmlVideo.play()
                                    introUiPanel.removeControl(introButton);
                                });
                            });
                    }
                    //if Video has ended start Loop Video
                    htmlVideo.onended = function () {
                        firstCharLoop();
                    };
                }

                var qrAssetCode = null

                function qrCode(code) {
                    qrAssetCode = new BABYLON.GUI.Image("qr", code);
                    qrAssetCode.width = "120px";
                    qrAssetCode.height = "120px";
                    qrAssetCode.left = "-504px";
                    qrAssetCode.top = "279px";
                    advancedTexture.addControl(qrAssetCode);
                }

                function removeUI() {
                    advancedTexture.removeControl(exitBtn);
                    advancedTexture.removeControl(leftBtn);
                    advancedTexture.removeControl(rightBtn);
                    advancedTexture.removeControl(qrAssetCode);
                }

                function showUI(leftBtnName, leftBtnVideo, leftBtnPoster, centerBtnName, centerBtnVideo, centerBtnPoster, rightBtnName, rightBtnVideo, rightBtnPoster) {
                    leftBtn = BABYLON.GUI.Button.CreateSimpleButton("but1", leftBtnName);
                    leftBtn.width = "150px"
                    leftBtn.height = "40px";
                    leftBtn.color = "white";
                    leftBtn.cornerRadius = 20;
                    leftBtn.background = "green";
                    leftBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    leftBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                    leftBtn.onPointerUpObservable.add(function () {
                        removeUI();
                        loadVideo(leftBtnVideo, leftBtnPoster);
                    });
                    advancedTexture.addControl(leftBtn);

                    exitBtn = BABYLON.GUI.Button.CreateSimpleButton("but2", centerBtnName);
                    exitBtn.width = "150px"
                    exitBtn.height = "40px";
                    exitBtn.color = "white";
                    exitBtn.cornerRadius = 20;
                    exitBtn.background = "green";
                    exitBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    exitBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                    exitBtn.onPointerUpObservable.add(function () {
                        removeUI();
                        loadVideo(centerBtnVideo, centerBtnPoster);
                    });
                    advancedTexture.addControl(exitBtn);

                    rightBtn = BABYLON.GUI.Button.CreateSimpleButton("but3", rightBtnName);
                    rightBtn.width = "150px"
                    rightBtn.height = "40px";
                    rightBtn.color = "white";
                    rightBtn.cornerRadius = 20;
                    rightBtn.background = "green";
                    rightBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    rightBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                    rightBtn.onPointerUpObservable.add(function () {
                        removeUI();
                        loadVideo(rightBtnVideo, rightBtnPoster);
                    });
                    advancedTexture.addControl(rightBtn);
                }

                function firstCharLoop() {
                    loopVideo("src/assets/videos/Cam_Main_Loop.mp4", "src/assets/videos/Cam_Main_Loop_Poster.png");
                    showUI("Basilisk", "src/assets/videos/Cam_Main_Basilisk.mp4", "src/assets/videos/Cam_Main_Basilisk_Poster.png", "Exit", "src/assets/videos/Cam_Main_Portal.mp4", "src/assets/videos/Cam_Main_Portal_Poster.png", "Left", "src/assets/videos/Cam_Main_Portal.mp4", "src/assets/videos/Cam_Main_Portal_Poster.png");
                    qrCode("src/assets/qr/qr_code_main.png")
                }

                function Basilisk() {
                    loopVideo("src/assets/videos/Cam_Basilisk_Loop.mp4", "src/assets/videos/Cam_Basilisk_Loop_Poster.png", true)
                    showUI("Main UC", "src/assets/videos/Cam_Main_Basilisk.mp4", "src/assets/videos/Cam_Main_Basilisk_Poster.png", "Exit", "src/assets/videos/Cam_Basilisk_Portal.mp4", "src/assets/videos/Cam_Main_Basilisk_Poster.png", "Left", "src/assets/videos/Cam_Main_Portal.mp4", "src/assets/videos/Cam_Main_Portal_Poster.png");
                }

                function loopVideo(video, poster, showUi) {
                    loadVideo(video, poster, showUi);
                    // var videoTexture = new BABYLON.VideoTexture("video", "src/assets/videos/Cam_Main_Loop.mp4", scene, false, false, BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, {
                    //     poster: "src/assets/videos/Cam_Main_Loop_Poster.png",
                    //     autoUpdateTexture: true
                    // });
                    // //Apply Texture
                    // mat.diffuseTexture = videoTexture;
                    // //Apply Video to BG
                    // plane.material = mat;
                    // //start video 
                    // videoTexture.video.play();

                    // if (loadVideo()) {
                    //     console.log('loaded')
                    // }

                    // //Load Pot
                    // var pot = assetsManager.addMeshTask("pot", "", "src/assets/chars/pot/", "fbxFull.gltf");
                    // pot.onSuccess = function (task) {
                    //     //Scale up Asset
                    //     task.loadedMeshes[0].scaling = new BABYLON.Vector3(60, 60, 60);
                    //     //Rotate Asset
                    //     task.loadedMeshes[0].rotate(BABYLON.Axis.Y, Math.PI)
                    //     //set Asset position
                    //     task.loadedMeshes[0].position.x = 1;
                    //     task.loadedMeshes[0].position.y = -1;
                    //     task.loadedMeshes[0].position.z = -2.5;
                    // }
                    // engine.displayLoadingUI();

                }

                //Play the intro Video
                introVideo();
                //firstCharLoop();


                //Load Asset Manager
                assetsManager.load();

                // Return the created scene.
                return scene;
            }

            // call the createScene function
            var scene = createScene();

            // run the render loop
            engine.runRenderLoop(function () {
                scene.render();
            });

            // the canvas/window resize event handler
            window.addEventListener('resize', function () {
                engine.resize();
            });

  }
}
</script>