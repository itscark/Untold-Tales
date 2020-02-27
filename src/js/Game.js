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
            {width: 10, height: 6},
            this.scene
        );
        //Create Materials
        this.mat = new BABYLON.StandardMaterial("mat", this.scene);

        // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
        BABYLON.Animation.AllowMatricesInterpolation = true;

        // Create Scene
        this.createScene();

        //set global Asset paths, incase folder structure my be changed in the future
        this.assetPath = "assets/chars/";

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
            "Cam_Portal_Main"
        );
        //Attach Video to Background
        this.Video.attach(this.bgVideo);

        //initial Play button was pressed
        this.GUI.btnEvent(this.playBtn, () => {
            // // Play intro Video to the main char
            this.portalMain();
        }, true);

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
        centerBtnName,
        centerFunction,
        rightBtnName,
        rightFunction,
        promiseAwait) {
        //Functions to preload Videos for the next Chars
        this.leftVideo = this.Video.load(
            leftVideo);
        this.centerVideo = this.Video.load(
            centerVideo);
        this.rightVideo = this.Video.load(
            rightVideo);
        //add UI to GUI
        this.uiBtn = this.GUI.addControlUI(
            leftBtnName,
            () => {
                leftFunction();
                //When Button is clicked Asset Visibility has to be set to Hide
                this.Asset.hide(promiseAwait.meshes[0])
            },
            centerBtnName,
            () => {
                centerFunction();
                //When Button is clicked Asset Visibility has to be set to Hide
                this.Asset.hide(promiseAwait.meshes[0])
            },
            rightBtnName,
            () => {
                rightFunction();
                //When Button is clicked Asset Visibility has to be set to Hide
                this.Asset.hide(promiseAwait.meshes[0])
            })
    }

    //load and play the fromTo Vidoes

    fromTo(video, loopCam, loopFunction) {
        this.Video.attach(video);
        this.GUI.removeControlUI();
        this.Video.start(video);

        //This sections is to preload the next Videos
        //setTime out is used to garantie no lagging whe the video is playing
        setTimeout(() => {
            this.loopVideo = this.Video.load(loopCam);
        }, 2000);

        this.Video.htmlVideo.onended = () => {
            this.Video.attach(this.loopVideo);
            this.Video.start(this.loopVideo);
            this.Video.loop(this.loopVideo);
            loopFunction();
        };
    }

    //Intro Video
    portalMain() {
        this.Video.start(this.bgVideo);
        //This sections is to preload the next Videos
        //setTime out is used to garantie no lagging whe the video is playing
        setTimeout(() => {
            this.loopVideo = this.Video.load(
                "Cam_Main_Loop");
        }, 500);


        //When the video has ended load the next videos
        this.Video.htmlVideo.onended = async () => {
            //Load Asset
            //to Access the loaded Mesh etc. a async await had to be implemented
            const promiseAwait = await this.configureAsset("Stromboli", "Stromboli_AnimLayer.gltf");

            this.Asset.scale(promiseAwait.meshes[0], 2, 2, 2);
            this.Asset.position(promiseAwait.meshes[0], 1.3, -1.4, -1);


            this.GUI.loadAssetAnimation(promiseAwait);

            this.Video.attach(this.loopVideo);
            this.Video.start(this.loopVideo);
            this.Video.loop(this.loopVideo);
            this.mainLoop(promiseAwait);
        };
    }


    ////////////
    //Loop Videos
    ////////////
    mainLoop(promiseAwait) {
        this.loadLoop(
            "Cam_Main_Basilisk",
            "Cam_Main_Portal",
            "Cam_Main_Eier",
            "Basilisk",
            () => {
                this.mainBasilisk()
            },
            "Portal",
            () => {
                this.mainPortal()
            },
            "Eier",
            () => {
                this.mainEier()
            },
            promiseAwait);
    }

    basiliskLoop() {
        this.loadLoop(
            "Cam_Basilisk_Wolpertinger",
            "Cam_Basilisk_Portal",
            "Cam_Basilisk_Yeti",
            "Wolpertinger",
            () => {
                this.basiliskWolpertinger()
            },
            "Portal",
            () => {

            },
            "Yeti",
            () => {

            });
    }

    wolpertingerLoop() {
        this.loadLoop(
            "Cam_Wolpertinger_BabaYaga",
            "Cam_Wolpertinger_Portal",
            "Cam_Wolpertinger_Baum",
            "BabaYaga",
            () => {

            },
            "Portal",
            () => {
                this.wolpertingerPortal()
            },
            "Baum",
            () => {

            });
    }

    babaYagaLoop() {
        this.loadLoop(
            "Cam_BabaYaga_Eier",
            "Cam_BabaYaga_Portal",
            "Cam_BabaYaga_Main",
            "Eier",
            () => {

            },
            "Portal",
            () => {

            },
            "Main",
            () => {

            });
    }

    eierLoop() {
        this.loadLoop(
            "Cam_Eier_Nessie",
            "Cam_Eier_Portal",
            "Cam_Eier_Wolpertinger",
            "Nessie",
            () => {

            },
            "Portal",
            () => {

            },
            "Woplertinger",
            () => {

            });
    }

    ////////////
    //From to Videos
    ////////////
    mainBasilisk() {
        this.fromTo(this.leftVideo, "Cam_Basilisk_Loop", () => {
            this.basiliskLoop()
        })
    }

    mainEier() {
        this.fromTo(this.rightVideo, "Cam_Eier_Loop", () => {
            this.eierLoop()
        })
    }

    mainPortal() {
        this.Video.attach(this.centerVideo);
        this.GUI.removeControlUI();
        this.Video.start(this.centerVideo);
    }

    basiliskWolpertinger() {
        this.fromTo(this.leftVideo, "Cam_Wolpertinger_Loop", () => {
            this.wolpertingerLoop()
        })
    }

    wolpertingerPortal() {
        this.Video.attach(this.centerVideo);
        this.GUI.removeControlUI();
        this.Video.start(this.centerVideo);
    }

    babaYagaEier() {
    }

    babaYagaMain() {
    }

    babaYagaPortal() {
    }
}
