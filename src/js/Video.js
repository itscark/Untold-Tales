import {VideoTexture} from "babylonjs";

class Video {
    constructor(game) {
        this.game = game;
        this.engine = game.engine;
        this.canvas = game.canvas;
        this.mat = game.mat;
        this.bgPlane = game.bgPlane;
        this.bgVideo = game.bgVideo;
        this.videoAsset = game.videoAsset;
        this.Asset = game.Asset;
        this.MyGui = game.MyGui;
        this.Animations = game.Animations;
        this.htmlVideo = null;

        this.videoPath = "assets/videos/";
        this.posterPath = "assets/images/poster/";
        this.posterEnding = "_Poster.jpg";
        this.videoEnding = ".mp4";
    }

    load(video) {
        return new VideoTexture(
            "video",
            this.videoPath + video + this.videoEnding,
            this.scene,
            false,
            false,
            VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoUpdateTexture: true,
                poster: this.posterPath + video + this.posterEnding
            }
        );
    }

    attach(texture) {
        try {
            this.bgPlane.texture = texture;
            this.htmlVideo = texture.video;
        } catch (e) {
            console.log("attach error")
        }
    }


    start(videoAsset) {
        videoAsset.video.play();
    }

    loop(videoAsset) {
        videoAsset.video.loop = true;
    }

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
        this.game.leftVideo = this.load(
            "Cam_" + leftVideo);
        this.game.centerVideo = this.load(
            "Cam_" + centerVideo);
        this.game.rightVideo = this.load(
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
                    this.game.toPortal();
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
        this.attach(video);
        try {
            this.MyGui.removeControlUI();
        } catch (e) {
            console.log("no gui displayed")
        }
        this.start(video);

        //This sections is to preload the next Videos
        //setTime out is used to garantie no lagging whe the video is playing
        setTimeout(() => {
            this.game.loopVideo = this.load("Cam_" + loopCam + "_Loop");
        }, 1000);

        this.htmlVideo.onended = async () => {
            let promiseAwait = null;

            //check if a asset is loaded
            try {
                //Load Asset
                //to Access the loaded Mesh etc. a async await had to be implemented
                promiseAwait = await this.game.configureAsset(assetDir, assetDir + ".gltf");

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

            this.start(this.game.loopVideo);
            this.attach(this.game.loopVideo);
            this.loop(this.game.loopVideo);

            loopFunction(promiseAwait, assetDir);
        };
    }

}

export default Video;
