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
    this.GUI = game.GUI;
    this.htmlVideo = null;
  }

   loadAsync(videoPath) {
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
    let videoTexture = new BABYLON.VideoTexture(
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

    return videoTexture;
  }

  attach(texture){
      //Apply Texture
      this.mat.diffuseTexture = texture;
      //Apply Video to BG
      this.bgPlane.material = this.mat;
      //set HTML Video
      this.htmlVideo = this.mat.diffuseTexture.video;
  }


  start(videoAsset) {
    videoAsset.video.play();
  }

  hasEnded(){
    this.htmlVideo.onended = () => {
      console.log("ended");
      return true;
    };
  }

  change(videoSrc, posterSrc) {
    this.bgVideo.video.src = videoSrc;
    this.bgVideo.video.poster = posterSrc;
  }

}

export default Video;
