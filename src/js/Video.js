class Video {
  constructor(game) {
    this.game = game;
    this.assetsManager = game.assetsManager;
    this.engine = game.engine;
    this.canvas = game.canvas;
    this.mat = game.mat;
    this.bgPlane = game.bgPlane;
    this.bgVideo = game.bgVideo;
    this.videoAsset = game.videoAsset;
    this.Asset = game.Asset;
  }

  preLoead() {
    const getVideo = () => {
      try {
        return axios.get(videoPath);
      } catch (error) {
        console.error(error);
      }
    };

    const asignVideo = async () => {
      const video = getVideo()
        .then(response => {
          if (response.data) {
            console.log(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
  }

  load(video, poster) {
    var videoTexture = new BABYLON.VideoTexture(
      "video",
      video,
      this.scene,
      false,
      false,
      BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
      {
        autoUpdateTexture: true,
        poster: poster
      }
    );
    //Apply Texture
    this.mat.diffuseTexture = videoTexture;
    //Apply Video to BG
    this.bgPlane.material = this.mat;

    return videoTexture;
  }

  start(videoAsset) {
    videoAsset.video.play();
    console.log("video started");

    // Trigger Function when Video is finished
    var htmlVideo = this.mat.diffuseTexture.video;
    htmlVideo.onended = () => {
      this.game.firstChar();
    };
  }

  change(videoSrc, posterSrc) {
    this.bgVideo.video.src = videoScr;
    this.bgVideo.video.poster = posterSrc;
  }

  finished() {
    return true;
    // //show Assets
    // showHideAsset(mainChar, true);
    // showHideAsset(pot, true);

    // loadAssetAnimation(mainChar);
    // //start idle Animation of First Char
    // controlAnimations(mainChar, 1);
  }
}

export default Video;
