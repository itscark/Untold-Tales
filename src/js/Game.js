// Import Babylon.js
import * as BABYLON from 'babylonjs';
//Import Babylon Loaders
import "babylonjs-loaders";
//Import Video Class
import Video from "./Video";
//Import Asset Class
import Asset from "./Asset";
//Import HUD Gui
import MyGui from "./MyGui";
//import Animations
import Animations from "./Animations";

export default class {
    constructor() {
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
        this.camera.setTarget(BABYLON.Vector3.Zero());

        //activate camera control
        //this.camera.attachControl(this.canvas, true);

        // Add lights to the scene
        this.light1 = new BABYLON.HemisphericLight(
            "light1",
            new BABYLON.Vector3(1, 1, 0),
            this.scene
        );

        //Create a Background video
        this.bgPlane = new BABYLON.Layer("back", null, this.scene);
        this.bgPlane.texture = new BABYLON.VideoTexture("video", "assets/videos/Cam_Portal_Main.mp4", this.scene, false,
            false,
            BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoUpdateTexture: true,
                poster: "assets/images/poster/Cam_Portal_Main_Poster.jpg"
            });
        this.bgPlane.isBackground = true;
        this.bgPlane.texture.level = 1;

        //set loop of Background video to False;
        this.bgPlane.texture.video.loop = false;

        //show babylonjs inspector
        //this.scene.debugLayer.show();

        //set fog color
        const color = new BABYLON.Color3(0.9, 0.9, 0.85);

        //create a plane for the fog
        this.fogPlane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 50, height: 50}, this.scene); // default plane
        //create material for plaen
        this.materialforplane = new BABYLON.StandardMaterial("texture1", this.scene);
        //set color of plane to fog color
        this.materialforplane.emissiveColor = color;
        //set plane material to previously set material
        this.fogPlane.material = this.materialforplane;
        //set the itensity to 100%, after play button is clicked slowly set to 0
        this.materialforplane.alpha = 1;

        // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
        Animation.AllowMatricesInterpolation = true;

        this.cursorSettings = " url('./assets/cursor/viseur.png') 12 12, auto ";

        //set action Manager
        this.fogPlane.actionManager = new BABYLON.ActionManager(this.scene);
        //set the cursor
        this.scene.hoverCursor = this.cursorSettings;

        // Create Scene
        this.createScene();

        //set global Asset paths, incase folder structure my be changed in the future
        this.assetPath = "assets/chars/";

        // Enable animation blending for all animations
        this.scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        this.scene.animationPropertiesOverride.enableBlending = true;
        this.scene.animationPropertiesOverride.blendingSpeed = 0.02;
        this.scene.animationPropertiesOverride.loopMode = 1;

        // Init Variables
        this.introVideo = null;
        this.playBtn = null;
        this.videoAsset = null;
        this.gameTask = null;
        this.leftVideo = null;
        this.rightVideo = null;
        this.centerVideo = null;
        this.loopVideo = null;
        this.assetPromise = null;
        this.stories_json = null;

        //load Stories for the Chars
        this.loadJSON((response) => {
            // Parse JSON string into object
            this.stories_json = JSON.parse(response);
        });
    }

    //Load the Stories.json for further functions
    loadJSON(callback) {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'assets/stories/stories.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    createScene() {
        //Load Classes
        this.MyGui = new MyGui(this);
        this.Animations = new Animations(this);
        this.Asset = new Asset(this);
        this.Video = new Video(this);

        //set curser
        this.fogPlane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, (ev) =>{ }));

        // On Window Resize => Resize Game
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        //Every Thing is setup, now start
        this.setup();
    }

    setup() {
        //load Start Button
        this.videoPlayBtn = this.MyGui.createImgBtnNoText(
            "playBtn",
            "assets/images/gui/play-button.png",
            "100px",
            "100px",
            0,
            160
        );

        //add the intro text
        this.introText = this.MyGui.addIntroText("“Untold Tales” is the story of a Chupacabra that sets out to rescue its family, but ends up finding a lot more than that. On this website you get to meet some of the colorful characters that await you in “Untold Tales”");

        this.MyGui.btnEvent(this.videoPlayBtn, () => {
            // Play intro Video to the main char
            this.portalMain();
        });

        //start Render Loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    //async load Asset while video is playing
    async configureAsset(assetDir, assetFile) {
        try {
            return await this.Asset.loadAsync(assetDir, assetFile);
        } catch (e) {
            return "caught";
        }
    }


    ////////////
    // naming convention for Charakter Functions
    // e.g. mainBasilisk()
    // this is the section from the Main Char to the Basilisk Char
    // e.g. mainLoop()
    // this will load the Loop function and all necessary assets
    ////////////

    //Function for all Charakter Loop videos
    loadLoop(
        leftVideo,
        centerVideo,
        rightVideo,
        leftBtnName,
        leftFunction,
        rightBtnName,
        rightFunction,
        promiseAwait,
        storyName,
        btnSrc) {
        //Functions to preload Videos for the next Chars
        this.leftVideo = this.Video.load(
            "Cam_" + leftVideo);
        this.centerVideo = this.Video.load(
            "Cam_" + centerVideo);
        this.rightVideo = this.Video.load(
            "Cam_" + rightVideo);
        //add UI to GUI

        setTimeout(() => {
            this.MyGui.addControlUI(
                leftBtnName,
                () => {
                    leftFunction();
                    //When Button is clicked Asset Visibility has to be set to Hide
                    try {
                        this.Asset.hide(promiseAwait.meshes[0])
                    } catch (e) {
                        console.log('no asset to hide')
                    }
                },
                () => {
                    this.toPortal();
                    //When Button is clicked Asset Visibility has to be set to Hide
                    try {
                        this.Asset.hide(promiseAwait.meshes[0])
                    } catch (e) {
                        console.log('no asset to hide')
                    }
                },
                rightBtnName,
                () => {
                    rightFunction();
                    //When Button is clicked Asset Visibility has to be set to Hide
                    try {
                        this.Asset.hide(promiseAwait.meshes[0])
                    } catch (e) {
                        console.log('no asset to hide')
                    }
                },
                btnSrc,
                storyName)

        }, 100)
    }

    //load and play the fromTo Vidoes

    fromTo(video, loopCam, loopFunction,
           assetDir,
           setScale = false,
           xScale, yScale, zScale,
           setPosition = false,
           xPosition, yPosition, zPosition,
           setRotation = false,
           axis, rotation
    ) {
        this.Video.attach(video);
        try {
            this.MyGui.removeControlUI();
        } catch (e) {
            console.log("no gui displayed")
        }
        this.Video.start(video);

        //This sections is to preload the next Videos
        //setTime out is used to garantie no lagging whe the video is playing
        setTimeout(() => {
            this.loopVideo = this.Video.load("Cam_" + loopCam + "_Loop");
        }, 1000);

        this.Video.htmlVideo.onended = async () => {
            let promiseAwait = null;

            //check if a asset is loaded
            try {
                //Load Asset
                //to Access the loaded Mesh etc. a async await had to be implemented
                promiseAwait = await this.configureAsset(assetDir, assetDir + ".gltf");

                if (setScale) {
                    this.Asset.scale(promiseAwait.meshes[0], xScale, yScale, zScale)
                }
                if (setPosition) {
                    this.Asset.position(promiseAwait.meshes[0], xPosition, yPosition, zPosition);
                }
                if (setRotation) {
                    this.Asset.rotate(promiseAwait.meshes[0], axis, rotation);
                }

                this.Animations.load(promiseAwait);

            } catch (e) {
                console.log('no asset loaded')
            }

            this.Video.start(this.loopVideo);
            this.Video.attach(this.loopVideo);
            this.Video.loop(this.loopVideo);

            loopFunction(promiseAwait, assetDir);
        };
    }

    ////////////
    //Loop Videos
    ////////////
    babaYagaLoop(promiseAwait, Asset) {
        this.loadLoop(
            "BabaYaga_Eier",
            "BabaYaga_Portal",
            "BabaYaga_Main",
            "Eier",
            () => {
                this.babaYagaEier()
            },
            "Main",
            () => {
                this.babaYagaMain()
            },
            promiseAwait,
            Asset);
    }

    basiliskLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Basilisk_Wolpertinger",
            "Basilisk_Portal",
            "Basilisk_Yeti",
            "Wolpertinger",
            () => {
                this.basiliskWolpertinger()
            },
            "Yeti",
            () => {
                this.basiliskYeti()
            },
            promiseAwait,
            Asset);
    }

    baumLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Baum_BabaYaga",
            "Baum_Portal",
            "Baum_Basilisk",
            "BabaYaga",
            () => {
                this.baumBabaYaga()
            },
            "Basilisk",
            () => {
                this.baumBasilisk()
            },
            promiseAwait,
            Asset);
    }

    eierLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Eier_Nessie",
            "Eier_Portal",
            "Eier_Wolpertinger",
            "Nessie",
            () => {
                this.eierNessie()
            },
            "Woplertinger",
            () => {
                this.eierWolpertinger()
            }, promiseAwait,
            Asset);
    }

    joboldLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Jobold_Baum",
            "Jobold_Portal",
            "Jobold_Yeti",
            "Baum",
            () => {
                this.joboldBaum()
            },
            "Yeti",
            () => {
                this.joboldYeti()
            },
            promiseAwait,
            Asset);
    }

    mainLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Main_Basilisk",
            "Main_Portal",
            "Main_Eier",
            "Basilisk",
            () => {
                this.mainBasilisk()
            },
            "Eier",
            () => {
                this.mainEier()
            },
            promiseAwait,
            Asset);
    }

    nessieLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Nessie_Jobold",
            "Nessie_Portal",
            "Nessie_Main",
            "Jobold",
            () => {
                this.nessieJobold()
            },
            "Main",
            () => {
                this.nessieMain()
            },
            promiseAwait,
            Asset);
    }

    wolpertingerLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Wolpertinger_BabaYaga",
            "Wolpertinger_Portal",
            "Wolpertinger_Baum",
            "BabaYaga",
            () => {
                this.wolpertingerBabaYaga()
            },
            "Baum",
            () => {
                this.wolpertingerBaum()
            },
            promiseAwait,
            Asset);
    }

    yetiLoop(promiseAwait, Asset) {
        this.loadLoop(
            "Yeti_Baum",
            "Yeti_Portal",
            "Yeti_Nessie",
            "Baum",
            () => {
                this.yetiBaum()
            },
            "Nessie",
            () => {
                this.yetiNessie()
            },
            promiseAwait,
            Asset);
    }

    ////////////
    //FromTo Videos
    ////////////
    portalMain() {
        //call function to fade out the fog
        this.MyGui.fadeOutFog(this.fogPlane);
        //fade out play button
        this.MyGui.fadeOutGuiElement(this.videoPlayBtn);
        //fade out intro text
        this.MyGui.fadeOutGuiElement(this.introText);

        this.fromTo(this.bgPlane.texture, "Main", (promiseAwait, Asset) => {
                this.mainLoop(promiseAwait, Asset)
            },
            "Stromboli",
            true, 2, 2, 2,
            true, 1.3, -1.4, -1);

    }

    toPortal() {
        this.Video.attach(this.centerVideo);
        this.MyGui.removeControlUI();
        this.Video.start(this.centerVideo);

        //exit to portal will reload the page after wards
        this.Video.htmlVideo.onended = () => {
            location.reload();
        }
    }

    babaYagaEier() {
        this.fromTo(this.leftVideo, "Eier", (promiseAwait, Asset) => {
            this.eierLoop(promiseAwait, Asset)
        })
    }

    babaYagaMain() {
        this.fromTo(this.rightVideo, "Main", (promiseAwait, Asset) => {
            this.mainLoop(promiseAwait, Asset)
        })
    }

    basiliskWolpertinger() {
        this.fromTo(this.leftVideo, "Wolpertinger", (promiseAwait, Asset) => {
            this.wolpertingerLoop(promiseAwait, Asset)
        })
    }

    basiliskYeti() {
        this.fromTo(this.rightVideo, "Yeti", (promiseAwait, Asset) => {
            this.yetiLoop(promiseAwait, Asset)
        })
    }

    baumBabaYaga() {
        this.fromTo(this.leftVideo, "BabaYaga", (promiseAwait, Asset) => {
            this.babaYagaLoop(promiseAwait, Asset)
        })
    }

    baumBasilisk() {
        this.fromTo(this.rightVideo, "Basilisk", (promiseAwait, Asset) => {
            this.basiliskLoop(promiseAwait, Asset)
        })
    }

    eierNessie() {
        this.fromTo(this.leftVideo, "Nessie", (promiseAwait, Asset) => {
            this.nessieLoop(promiseAwait, Asset)
        })
    }

    eierWolpertinger() {
        this.fromTo(this.rightVideo, "Wolpertinger", (promiseAwait, Asset) => {
            this.wolpertingerLoop(promiseAwait, Asset)
        })
    }

    joboldBaum() {
        this.fromTo(this.leftVideo, "Baum", (promiseAwait, Asset) => {
            this.baumLoop(promiseAwait, Asset)
        })
    }

    joboldYeti() {
        this.fromTo(this.rightVideo, "Yeti", (promiseAwait, Asset) => {
            this.yetiLoop(promiseAwait, Asset)
        })
    }

    mainBasilisk() {
        this.fromTo(this.leftVideo, "Basilisk", (promiseAwait, Asset) => {
                this.basiliskLoop(promiseAwait, Asset)
            },
            "Stromboli",
            true, 2, 2, 2,
            true, 1.3, -1.4, -1)
    }

    mainEier() {
        this.fromTo(this.rightVideo, "Eier", (promiseAwait, Asset) => {
            this.eierLoop(promiseAwait, Asset)
        })
    }

    nessieJobold() {
        this.fromTo(this.leftVideo, "Jobold", (promiseAwait, Asset) => {
            this.joboldLoop(promiseAwait, Asset)
        })
    }

    nessieMain() {
        this.fromTo(this.rightVideo, "Main", (promiseAwait, Asset) => {
            this.mainLoop(promiseAwait, Asset)
        })
    }

    wolpertingerBabaYaga() {
        this.fromTo(this.leftVideo, "BabaYaga", (promiseAwait, Asset) => {
            this.joboldLoop(promiseAwait, Asset)
        })
    }

    wolpertingerBaum() {
        this.fromTo(this.rightVideo, "Baum", (promiseAwait, Asset) => {
            this.mainLoop(promiseAwait, Asset)
        })
    }

    yetiBaum() {
        this.fromTo(this.leftVideo, "Baum", (promiseAwait, Asset) => {
            this.baumLoop(promiseAwait, Asset)
        })
    }

    yetiNessie() {
        this.fromTo(this.rightVideo, "Nessie", (promiseAwait, Asset) => {
            this.nessieLoop(promiseAwait, Asset)
        })
    }
}
