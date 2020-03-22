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

import {fromToCharsData} from "./fromToCharsData";

class Game {
    constructor() {
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
        this.fogPlane = null;

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
        //this.scene.debugLayer.show();

        // Add lights to the scene
        this.light1 = new BABYLON.HemisphericLight(
            "light1",
            new BABYLON.Vector3(1, 1, 0),
            this.scene
        );

        //set global Asset paths, incase folder structure my be changed in the future
        this.assetPath = "assets/chars/";


        //load Stories for the Chars
        this.loadJSON((response) => {
            // Parse JSON string into object
            this.stories_json = JSON.parse(response);
        });


        //Create a Background video
        this.bgPlane = new BABYLON.Layer("back", null, this.scene);
        this.bgPlane.texture = new BABYLON.VideoTexture("video", "assets/videos/Cam_Portal_Main.mp4", this.scene, false,
            false,
            BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoUpdateTexture: true,
                poster: "assets/images/poster/Cam_Portal_Main_Poster.jpg"
            });
        //set plane to background
        this.bgPlane.isBackground = true;
        this.bgPlane.texture.level = 1;

        //set loop of Background video to False;
        this.bgPlane.texture.video.loop = false;

        //Load Classes
        this.MyGui = new MyGui(this);
        this.Animations = new Animations(this);
        this.Asset = new Asset(this);
        this.Video = new Video(this);

        this.loopChars = {
            BabaYaga: {
                leftVideo: 'BabaYaga_Eier',
                centerVideo: 'BabaYaga_Portal',
                rightVideo: 'BabaYaga_Main',
                leftBtnName: 'Eggs',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.babyYagaEier)
                },
                rightBtnName: 'Chupacabra',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.babaYagaMain)
                },
            },
            Basilisk: {
                leftVideo: 'Basilisk_Wolpertinger',
                centerVideo: 'Basilisk_Portal',
                rightVideo: 'Basilisk_Yeti',
                leftBtnName: 'Wolpertinger',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.basiliskWolpertinger)
                },
                rightBtnName: 'Yeti',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.basiliskYeti)
                },
            },
            Baum: {
                leftVideo: 'Baum_BabaYaga',
                centerVideo: 'Baum_Portal',
                rightVideo: 'Baum_Basilisk',
                leftBtnName: 'BabaYaga',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.baumBabaYaga)
                },
                rightBtnName: 'Basilisk',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.baumBasilisk)
                },
            },
            Eier: {
                leftVideo: 'Eier_Nessie',
                centerVideo: 'Eier_Portal',
                rightVideo: 'Eier_Wolpertinger',
                leftBtnName: 'Nessie',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.eierNessie)
                },
                rightBtnName: 'Wolpertinger',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.eierWolpertinger)
                },
            },
            Jobold: {
                leftVideo: 'Jobold_Baum',
                centerVideo: 'Jobold_Portal',
                rightVideo: 'Jobold_Yeti',
                leftBtnName: 'Tree',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.joboldBaum)
                },
                rightBtnName: 'Yeti',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.joboldYeti)
                },
            },
            Main: {
                leftVideo: 'Main_Basilisk',
                centerVideo: 'Main_Portal',
                rightVideo: 'Main_Eier',
                leftBtnName: 'Basilisk',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.mainBasilisk)
                },
                rightBtnName: 'Eggs',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.mainEier)
                },
            },
            Nessie: {
                leftVideo: 'Nessie_Jobold',
                centerVideo: 'Nessie_Portal',
                rightVideo: 'Nessie_Main',
                leftBtnName: 'Joblin',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.nessieJobold)
                },
                rightBtnName: 'Chupacabra',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.nessieMain)
                },
            },
            Wolpertinger: {
                leftVideo: 'Wolpertinger_BabaYaga',
                centerVideo: 'Wolpertinger_Portal',
                rightVideo: 'Wolpertinger_Baum',
                leftBtnName: 'BabaYaga',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.wolpertingerBabaYaga)
                },
                rightBtnName: 'Tree',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.wolpertingerBaum)
                },
            },
            Yeti: {
                leftVideo: 'Yeti_Baum',
                centerVideo: 'Yeti_Portal',
                rightVideo: 'Yeti_Nessie',
                leftBtnName: 'Tree',
                leftFunction: () => {
                    this.generalFromTo(fromToCharsData.yetiBaum)
                },
                rightBtnName: 'Nessie',
                rightFunction: () => {
                    this.generalFromTo(fromToCharsData.yetiNessie)
                },
            }
        };


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
        //add the intro text
        this.introText = document.getElementById('intro_text');

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

        let counter = 0;

        this.MyGui.btnEvent(this.videoPlayBtn, () => {
            //to avoud flickering when user click the playbutton twice.
            if (counter === 0) {
                counter = 1;
                //select the html5 audio tag
                let audio = document.getElementById("audio");
                //set loop
                audio.loop = true;
                audio.volume = 0.5;
                //start playing
                audio.play();


                //call function to fade out the fog
                this.MyGui.fadeOutFog(this.fogPlane);
                //fade out play button
                this.MyGui.fadeOutGuiElement(this.videoPlayBtn);
                //fade out intro text
                this.MyGui.faceOutDomElement(this.introText);

                // Play intro Video to the main char
                this.generalFromTo(fromToCharsData.portalMain);
            }
        });


        //start Render Loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    generalFromTo({video, loopFunction, assetConfig}) {

        //because this.leftVideo or this.rightVideo are null by default, they stay null when the objects are loaded. Therefore in the fromToCharsData object a string is definded left, right, center and depending on that string the right Video will be played
        let playVideo = null;
        if (video === 'bgPlane') {
            playVideo = this.bgPlane.texture;
        } else if (video === 'left') {
            playVideo = this.leftVideo;
        } else if (video === 'right') {
            playVideo = this.rightVideo;
        } else if (video === 'center') {
            playVideo = this.centerVideo
        } else {
            playVideo = video;
        }

        this.Video.fromTo(playVideo, assetConfig.loopCam, (promiseAwait, assetStory) => {
                this.loopFunction(promiseAwait, assetStory, assetConfig.boxPosition, assetConfig.loopCam)
            },
            assetConfig.asset,
            assetConfig.setScale, assetConfig.scale,
            assetConfig.setPosition, assetConfig.xPosition, assetConfig.yPosition, assetConfig.zPosition,
            assetConfig.setRotation, assetConfig.axis, assetConfig.rotation);
    }

    loopFunction(promiseAwait, assetStory, boxPosition, charKey) {
        this.Video.loadLoop(
            this.loopChars[charKey].leftVideo,
            this.loopChars[charKey].centerVideo,
            this.loopChars[charKey].rightVideo,
            this.loopChars[charKey].leftBtnName,
            this.loopChars[charKey].leftFunction,
            this.loopChars[charKey].rightBtnName,
            this.loopChars[charKey].rightFunction,
            promiseAwait,
            assetStory,
            boxPosition,
        );
    }
}

export default Game;
