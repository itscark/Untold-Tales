import Game from "./Game";

class Animation extends Game {
  constructor() {}

  load(asset) {
    for (let i = 0; i < asset.loadedAnimationGroups.length; i++) {
      var tmpAsset = asset.loadedAnimationGroups[i];
      var tmpName = tmpAsset["name"];
      // //load Create Button Function from Gui Class
      //createButton(tmpName, asset, i);
    }
  }

  control(asset, assetIndex) {
    animationGroups = asset.loadedAnimationGroups;
    //stop all animations
    animationGroups.forEach(function(item) {
      item.stop(true);
    });
    //start pressed animation
    animationGroups[assetIndex].play(true);
  }

  stop(asset) {
    asset.loadedAnimationGroups.forEach(function(item) {
      item.stop(true);
    });
  }
}

export default Animation;
