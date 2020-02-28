import * as BABYLON from "babylonjs";

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
        this.htmlVideo = null;

        this.videoPath = "assets/videos/";
        this.posterPath = "assets/poster/";
        this.posterEnding = "_Poster.jpg";
        this.videoEnding = ".mp4";
    }

    load(video) {
        return new BABYLON.VideoTexture(
            "video",
            this.videoPath + video + this.videoEnding,
            this.scene,
            false,
            false,
            BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoUpdateTexture: true,
                poster: this.posterPath + video + this.posterEnding
            }
        );
    }

    attach(texture) {
        try{
            this.bgPlane.texture = texture;
            this.htmlVideo = texture.video;
        }catch (e) {
            console.log("attach error")
        }
    }


    start(videoAsset) {
        videoAsset.video.play();
    }

    loop(videoAsset) {
        videoAsset.video.loop = true;
    }

}

export default Video;
