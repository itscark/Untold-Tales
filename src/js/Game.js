// Import Babylon.js
import * as BABYLON from "babylonjs";
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
        this.camera.setTarget(BABYLON.Vector3.Zero());

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
                poster: "assets/poster/Cam_Portal_Main_Poster.jpg"
            });
        this.bgPlane.isBackground = true;
        this.bgPlane.texture.level = 0;


        //set loop of Background video to False;
        this.bgPlane.texture.video.loop = false;

        // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
        BABYLON.Animation.AllowMatricesInterpolation = true;

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
        this.assetsManager = new BABYLON.AssetsManager(this.scene);
        this.MyGui = new MyGui(this);
        this.Animations = new Animations(this);
        this.Asset = new Asset(this);
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
        this.playBtn = this.MyGui.createImgBtnNoText(
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
        this.MyGui.btnEvent(this.playBtn, () => {
            // Play intro Video to the main char
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

        }, 500)
    }

    //load and play the fromTo Vidoes

    fromTo(video, loopCam, loopFunction,
           assetDir, assetFile,
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
        }, 2000);

        this.Video.htmlVideo.onended = async () => {
            let promiseAwait = null;

            //check if a asset is loaded
            try {
                //Load Asset
                //to Access the loaded Mesh etc. a async await had to be implemented
                promiseAwait = await this.configureAsset(assetDir, assetFile);

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

            this.Video.attach(this.loopVideo);
            this.Video.start(this.loopVideo);
            this.Video.loop(this.loopVideo);

            loopFunction(promiseAwait);
        };
    }

    ////////////
    //Loop Videos
    ////////////
    babaYagaLoop(promiseAwait) {
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
            promiseAwait);
    }

    basiliskLoop(promiseAwait) {
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
            "Basilisk");
    }

    baumLoop(promiseAwait) {
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
            promiseAwait);
    }

    eierLoop(promiseAwait) {
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
            }, promiseAwait);
    }

    joboldLoop(promiseAwait) {
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
            promiseAwait);
    }

    mainLoop(promiseAwait) {
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
            "Stromboli");
    }

    nessieLoop(promiseAwait) {
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
            promiseAwait);
    }

    wolpertingerLoop(promiseAwait) {
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
            promiseAwait);
    }

    yetiLoop(promiseAwait) {
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
            promiseAwait);
    }

    ////////////
    //FromTo Videos
    ////////////
    portalMain() {
        this.fromTo(this.bgPlane.texture, "Main", (promiseAwait) => {
                this.mainLoop(promiseAwait)
            },
            "Stromboli", "Stromboli_AnimLayer.gltf",
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
        this.fromTo(this.leftVideo, "Eier", (promiseAwait) => {
            this.eierLoop(promiseAwait)
        })
    }

    babaYagaMain() {
        this.fromTo(this.rightVideo, "Main", (promiseAwait) => {
            this.mainLoop(promiseAwait)
        })
    }

    basiliskWolpertinger() {
        this.fromTo(this.leftVideo, "Wolpertinger", (promiseAwait) => {
            this.wolpertingerLoop(promiseAwait)
        })
    }

    basiliskYeti() {
        this.fromTo(this.rightVideo, "Yeti", (promiseAwait) => {
            this.yetiLoop(promiseAwait)
        })
    }

    baumBabaYaga() {
        this.fromTo(this.leftVideo, "BabaYaga", (promiseAwait) => {
            this.babaYagaLoop(promiseAwait)
        })
    }

    baumBasilisk() {
        this.fromTo(this.rightVideo, "Basilisk", (promiseAwait) => {
            this.basiliskLoop(promiseAwait)
        })
    }

    eierNessie() {
        this.fromTo(this.leftVideo, "Nessie", (promiseAwait) => {
            this.nessieLoop()(promiseAwait)
        })
    }

    eierWolpertinger() {
        this.fromTo(this.rightVideo, "Wolpertinger", (promiseAwait) => {
            this.wolpertingerLoop(promiseAwait)
        })
    }

    joboldBaum() {
        this.fromTo(this.leftVideo, "Baum", (promiseAwait) => {
            this.baumLoop(promiseAwait)
        })
    }

    joboldYeti() {
        this.fromTo(this.rightVideo, "Yeti", (promiseAwait) => {
            this.yetiLoop(promiseAwait)
        })
    }

    mainBasilisk() {
        this.fromTo(this.leftVideo, "Basilisk", (promiseAwait) => {
            this.basiliskLoop(promiseAwait)
        })
    }

    mainEier() {
        this.fromTo(this.rightVideo, "Eier", (promiseAwait) => {
            this.eierLoop(promiseAwait)
        })
    }

    nessieJobold() {
        this.fromTo(this.leftVideo, "Jobold", (promiseAwait) => {
            this.joboldLoop(promiseAwait)
        })
    }

    nessieMain() {
        this.fromTo(this.rightVideo, "Main", (promiseAwait) => {
            this.mainLoop(promiseAwait)
        })
    }

    wolpertingerBabaYaga() {
        this.fromTo(this.leftVideo, "BabaYaga", (promiseAwait) => {
            this.joboldLoop(promiseAwait)
        })
    }

    wolpertingerBaum() {
        this.fromTo(this.rightVideo, "Baum", (promiseAwait) => {
            this.mainLoop(promiseAwait)
        })
    }

    yetiBaum() {
        this.fromTo(this.leftVideo, "Baum", (promiseAwait) => {
            this.baumLoop(promiseAwait)
        })
    }

    yetiNessie() {
        this.fromTo(this.rightVideo, "Nessie", (promiseAwait) => {
            this.nessieLoop(promiseAwait)
        })
    }
}
