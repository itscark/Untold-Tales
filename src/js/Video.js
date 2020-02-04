class Video {
  constructor() {}

  test() {
    console.log("video loaded");
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

  loadVideo(video, poster) {
    var videoTexture = new BABYLON.VideoTexture(
      "video",
      video,
      scene,
      false,
      false,
      BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
      {
        autoUpdateTexture: true,
        poster: poster
      }
    );
    //Apply Texture
    mat.diffuseTexture = videoTexture;
    //Apply Video to BG
    bgPlane.material = mat;
    //start video
    //videoTexture.video.play();
    return videoTexture;
  }

  play(videoAsset) {
    videoAsset.video.play();
    console.log("video started");

    var htmlVideo = mat.diffuseTexture.video;
    htmlVideo.onended = function() {
      finishedVideo();
    };
  }

  finished() {
    console.log("video Finished & show Assets");
    //show Assets
    showHideAsset(mainChar, true);
    showHideAsset(pot, true);

    loadAssetAnimation(mainChar);
    //start idle Animation of First Char
    controlAnimations(mainChar, 1);
  }
}

export default Video;
