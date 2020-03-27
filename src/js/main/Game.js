// this is the main class where all other classes will be loaded and the logic is written

//Import all that is needed
import * as BABYLON from 'babylonjs';
//babylonjs-loaders is needed to load the gltf file. otherwise only the custom babylonjs files could be loaded
import "babylonjs-loaders";
//custom classes
import Video from "./Video";
import Asset from "./Asset";
import MyGui from "./MyGui";
import Animations from "./Animations";
// all needed data for the asset position and the video logic
import {fromToFunctions} from "./fromToFunctions";
import {loopFunctions} from "./loopFunctions";

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
        //assign loop functions
        this._loopChars = loopFunctions(this);

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
        // a counter will be set to avoid users to click the play button more often than just one time.
        let counter = 0;
        // the welcome screen uses dom elements and not babylonjs elements therefore the need to be selected
        this.playBtn = document.getElementById('play_button');

        this.playBtn.addEventListener('click', ()=>{
            //the previously set count will be 0 at the first click, afterwars it will be set to 1 and the initial function can not be clicked
            if (counter === 0) {
                counter = 1;
                //select the html5 audio tag
                let audio = document.getElementById("audio");
                //set loop
                audio.loop = true;
                audio.volume = 0.5;
                //start playing
                audio.play();

                this.MyGui.fadeOutWelcomeScreen();

                // Play intro Video to the main char
                loopFunctions(this.generalFromTo(fromToFunctions.portalMain));
            }
        });


        //start Render Loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    generalFromTo({video, loopFunction, assetConfig}) {

        //because this.leftVideo or this.rightVideo are null by default, they stay null when the objects are loaded. Therefore in the fromToFunctions object a string is definded left, right, center and depending on that string the right Video will be played

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

        //this function will play the video from a char to the next char, and automatically play the loop function and set the needed parameters for the loaded asset
        this.Video.fromTo(playVideo, assetConfig.loopCam, (asset, assetStory) => {
                this.loopFunction(asset, assetStory, assetConfig.boxPosition, assetConfig.loopCam)
            },
            assetConfig.asset,
            assetConfig.setScale, assetConfig.scale,
            assetConfig.setPosition, assetConfig.xPosition, assetConfig.yPosition, assetConfig.zPosition,
            assetConfig.setRotation, assetConfig.axis, assetConfig.rotation);
    }

    // this function is loaded from the from to function
    // it sets the gui buttons for the left, right and center video.
    loopFunction(asset, assetStory, boxPosition, charKey) {
        this.Video.loadLoop(
            this._loopChars[charKey].leftVideo,
            this._loopChars[charKey].centerVideo,
            this._loopChars[charKey].rightVideo,
            this._loopChars[charKey].leftBtnName,
            this._loopChars[charKey].leftFunction,
            this._loopChars[charKey].rightBtnName,
            this._loopChars[charKey].rightFunction,
            asset,
            assetStory,
            boxPosition,
        );
    }
}

export default Game;
