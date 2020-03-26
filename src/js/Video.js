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
        let tmpVideo = new VideoTexture(
            "video",
            this.videoPath + "Cam_" + video + this.videoEnding,
            this.scene,
            false,
            false,
            VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoUpdateTexture: true,
                poster: this.posterPath + "Cam_" + video + this.posterEnding
            }
        );
        //mute loaded Video;
        tmpVideo.video.muted = true;
        return tmpVideo
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
        boxPosition) {
        //Functions to preload Videos for the next Chars
        this.game.leftVideo = this.load(
            leftVideo);
        this.game.centerVideo = this.load(
            centerVideo);
        this.game.rightVideo = this.load(
            rightVideo);
        

        //add UI to GUI
        setTimeout(() => {
            this.MyGui.addControlUI(
                leftBtnName,
                () => {
                    leftFunction();
                    //When Button is clicked Asset Visibility has to be set to Hide
                    try {
                        this.Asset.hide(promiseAwait)
                    } catch (e) {
                        console.log('no asset to hide')
                    }
                },
                () => {
                    console.log('pressed');
                    this.toPortal();
                    //When Button is clicked Asset Visibility has to be set to Hide
                    try {
                        this.Asset.hide(promiseAwait)
                    } catch (e) {
                        console.log('no asset to hide')
                    }
                },
                rightBtnName,
                () => {
                    rightFunction();
                    //When Button is clicked Asset Visibility has to be set to Hide
                    try {
                        this.Asset.hide(promiseAwait)
                    } catch (e) {
                        console.log('no asset to hide')
                    }
                },
                storyName,
                boxPosition)

        }, 100)
    }

    //Back To Portal Video
    toPortal() {

        this.attach(this.game.centerVideo);
        this.MyGui.removeControlUI();
        this.start(this.game.centerVideo);
        this.game.centerVideo.video.muted = false;
        this.game.loopVideo.video.muted = true;

        //exit to portal will reload the page after wards
        this.htmlVideo.onended = () => {
            location.reload();
        }
    }

    //load and play the fromTo Vidoes
    fromTo(video, loopCam, loopFunction,
           asset,
           setScale = false,
           scale,
           setPosition = false,
           xPosition, yPosition, zPosition,
           setRotation = false,
           axis, rotation
    ) {
        this.attach(video);

        //play Video Faster
        this.htmlVideo.playbackRate = 5;

        try {
            this.MyGui.removeControlUI();
        } catch (e) {
            console.log("no gui displayed")
        }

        this.start(video);
        //unmute the next video that will be played
        video.video.muted = false;

        //mute the loop Video
        if (this.game.loopVideo !== null){
            this.game.loopVideo.video.muted = true;
        }

        //This sections is to preload the next Videos
        //setTime out is used to garantie no lagging whe the video is playing
        setTimeout(() => {
            this.game.loopVideo = this.load(loopCam + "_Loop");
        }, 1000);

        let loadedAsset = null;

        this.htmlVideo.onplay = async () => {

            //check if a asset is loaded
            try {
                //Load Asset
                //to Access the loaded Mesh etc. a async await had to be implemented
                loadedAsset = await this.Asset.configureAsset(asset, asset + ".gltf");
                this.Asset.hide(loadedAsset);

                if (setScale) {
                    this.Asset.scale(loadedAsset, scale, scale, scale)
                }
                if (setPosition) {
                    this.Asset.position(loadedAsset, xPosition, yPosition, zPosition);
                }
                if (setRotation) {
                    this.Asset.rotate(loadedAsset, axis, rotation);
                }

            } catch (e) {
                console.log('no asset loaded')
            }

            this.htmlVideo.onended = () => {
                //unmute the loop video
                this.game.loopVideo.video.muted = false;
                this.Asset.show(loadedAsset);
                this.Animations.load(loadedAsset);
                this.start(this.game.loopVideo);
                this.attach(this.game.loopVideo);
                this.loop(this.game.loopVideo);
                loopFunction(loadedAsset, asset);
            }
        };
    }

}

export default Video;
