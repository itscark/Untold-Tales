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

        //show babylonjs inspector
        // this.scene.debugLayer.show();

        // Add lights to the scene
        this.light1 = new BABYLON.HemisphericLight(
            "light1",
            new BABYLON.Vector3(1, 1, 0),
            this.scene
        );

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
        this.stories_json = null;
        this.bgPlane = null;
        this.fogPlane = null;

        //load Stories for the Chars
        this.loadJSON((response) => {
            // Parse JSON string into object
            this.stories_json = JSON.parse(response);
        });

        // Create Scene
        this.createScene();
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

        //add the intro text
        this.introText = document.getElementById('intro_text')

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
            "assets/gui/buttons/play-button.png",
            "100px",
            "100px",
            0,
            160
        );



        this.videoPlayBtn.hoverCursor = this.MyGui.cursorSettings;

        this.MyGui.btnEvent(this.videoPlayBtn, () => {

            //select the html5 audio tag
            let audio = document.getElementById("audio");
            //set loop
            audio.loop = true;
            //start playing
           audio.play();

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

    ////////////
    //Loop Videos
    ////////////
    babaYagaLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "BabaYaga_Eier",
            "BabaYaga_Portal",
            "BabaYaga_Main",
            "Eggs",
            () => {
                this.babaYagaEier()
            },
            "Chupacabra",
            () => {
                this.babaYagaMain()
            },
            promiseAwait,
            Asset,
            boxPosition,
        );
    }

    basiliskLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
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
            Asset,
            boxPosition);
    }

    baumLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
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
            Asset,
            boxPosition);
    }

    eierLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "Eier_Nessie",
            "Eier_Portal",
            "Eier_Wolpertinger",
            "Nessie",
            () => {
                this.eierNessie()
            },
            "Wolpertinger",
            () => {
                this.eierWolpertinger()
            }, promiseAwait,
            Asset,
            boxPosition);
    }

    joboldLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "Jobold_Baum",
            "Jobold_Portal",
            "Jobold_Yeti",
            "Tree",
            () => {
                this.joboldBaum()
            },
            "Yeti",
            () => {
                this.joboldYeti()
            },
            promiseAwait,
            Asset,
            boxPosition);
    }

    mainLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "Main_Basilisk",
            "Main_Portal",
            "Main_Eier",
            "Basilisk",
            () => {
                this.mainBasilisk()
            },
            "Eggs",
            () => {
                this.mainEier()
            },
            promiseAwait,
            Asset,
            boxPosition);
    }

    nessieLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "Nessie_Jobold",
            "Nessie_Portal",
            "Nessie_Main",
            "Joblin",
            () => {
                this.nessieJobold()
            },
            "Chupacabra",
            () => {
                this.nessieMain()
            },
            promiseAwait,
            Asset,
            boxPosition);
    }

    wolpertingerLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "Wolpertinger_BabaYaga",
            "Wolpertinger_Portal",
            "Wolpertinger_Baum",
            "BabaYaga",
            () => {
                this.wolpertingerBabaYaga()
            },
            "Tree",
            () => {
                this.wolpertingerBaum()
            },
            promiseAwait,
            Asset,
            boxPosition);
    }

    yetiLoop(promiseAwait, Asset, boxPosition) {
        this.Video.loadLoop(
            "Yeti_Baum",
            "Yeti_Portal",
            "Yeti_Nessie",
            "Tree",
            () => {
                this.yetiBaum()
            },
            "Nessie",
            () => {
                this.yetiNessie()
            },
            promiseAwait,
            Asset,
            boxPosition);
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
        this.MyGui.faceOutDomElement(this.introText);

        this.Video.fromTo(this.bgPlane.texture, "Main", (promiseAwait, Asset) => {
                this.mainLoop(promiseAwait, Asset, 'left')
            },
            "Wolpertinger",
            true, 46,
            true, -0.2, -1.2, -1);
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
        this.Video.fromTo(this.leftVideo, "Eier", (promiseAwait, Asset) => {
            this.eierLoop(promiseAwait, Asset)
        })
    }

    babaYagaMain() {
        this.Video.fromTo(this.rightVideo, "Main", (promiseAwait, Asset) => {
            this.mainLoop(promiseAwait, Asset)
        })
    }

    basiliskWolpertinger() {
        this.Video.fromTo(this.leftVideo, "Wolpertinger", (promiseAwait, Asset) => {
                this.wolpertingerLoop(promiseAwait, Asset, 'left')
            },
            "Wolpertinger",
            true, 46,
            true, -0.2, -1.2, -1);
    }

    basiliskYeti() {
        this.Video.fromTo(this.rightVideo, "Yeti", (promiseAwait, Asset) => {
                this.yetiLoop(promiseAwait, Asset, 'left')
            },
            "Yeti",
            true, 0.6,
            true, 0.5, -2.4, -1);
    }

    baumBabaYaga() {
        this.Video.fromTo(this.leftVideo, "BabaYaga", (promiseAwait, Asset) => {
            this.babaYagaLoop(promiseAwait, Asset)
        })
    }

    baumBasilisk() {
        this.Video.fromTo(this.rightVideo, "Basilisk", (promiseAwait, Asset) => {
            this.basiliskLoop(promiseAwait, Asset)
        })
    }

    eierNessie() {
        this.Video.fromTo(this.leftVideo, "Nessie", (promiseAwait, Asset) => {
                this.nessieLoop(promiseAwait, Asset, 'left')
            },
            "Nessie",
            true, 0.4,
            true, 0.5, -2.4, -1,
            true, BABYLON.Axis.Y, Math.PI / 3.5);
    }

    eierWolpertinger() {
        this.Video.fromTo(this.rightVideo, "Wolpertinger", (promiseAwait, Asset) => {
                this.wolpertingerLoop(promiseAwait, Asset, 'left')
            },
            "Wolpertinger",
            true, 46,
            true, -0.2, -1.2, -1);
    }

    joboldBaum() {
        this.Video.fromTo(this.leftVideo, "Baum", (promiseAwait, Asset) => {
            this.baumLoop(promiseAwait, Asset)
        })
    }

    joboldYeti() {
        this.Video.fromTo(this.rightVideo, "Yeti", (promiseAwait, Asset) => {
                this.yetiLoop(promiseAwait, Asset, 'left')
            },
            "Yeti",
            true, 0.6,
            true, 0.5, -2.4, -1);
    }

    mainBasilisk() {
        this.Video.fromTo(this.leftVideo, "Basilisk", (promiseAwait, Asset) => {
                this.basiliskLoop(promiseAwait, Asset)
            },
            "Stromboli",
            true, 2,
            true, 1.3, -1.4, -1)
    }

    mainEier() {
        this.Video.fromTo(this.rightVideo, "Eier", (promiseAwait, Asset) => {
            this.eierLoop(promiseAwait, Asset)
        })
    }

    nessieJobold() {
        this.Video.fromTo(this.leftVideo, "Jobold", (promiseAwait, Asset) => {
            this.joboldLoop(promiseAwait, Asset)
        })
    }

    nessieMain() {
        this.Video.fromTo(this.rightVideo, "Main", (promiseAwait, Asset) => {
            this.mainLoop(promiseAwait, Asset)
        })
    }

    wolpertingerBabaYaga() {
        this.Video.fromTo(this.leftVideo, "BabaYaga", (promiseAwait, Asset) => {
            this.babaYagaLoop(promiseAwait, Asset)
        })
    }

    wolpertingerBaum() {
        this.Video.fromTo(this.rightVideo, "Baum", (promiseAwait, Asset) => {
            this.baumLoop(promiseAwait, Asset)
        })
    }

    yetiBaum() {
        this.Video.fromTo(this.leftVideo, "Baum", (promiseAwait, Asset) => {
            this.baumLoop(promiseAwait, Asset)
        })
    }

    yetiNessie() {
        this.Video.fromTo(this.rightVideo, "Nessie", (promiseAwait, Asset) => {
                this.nessieLoop(promiseAwait, Asset, 'left')
            },
            "Nessie",
            true, 0.4,
            true, 0.5, -2.4, -1,
            true, BABYLON.Axis.Y, Math.PI / 3.5);
    }
}
