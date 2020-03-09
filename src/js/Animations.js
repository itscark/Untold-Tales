class Animations {
  constructor(game) {
    this.game = game;
    this.engine = game.engine;
    this.canvas = game.canvas;
  }

  load(asset) {
    try {
      this.game.MyGui.advancedTexture.addControl(this.game.MyGui.animationGui);
      for (let i = 0; i < asset.animationGroups.length; i++) {
        let tmpAsset = asset.animationGroups[i];
        let tmpName = tmpAsset["name"];
        //this.MyGui can not be assigned in the Constructore because of redering procedre
        //set Timeout to show text and Button Image at the same time
        setTimeout(()=>{
          this.game.MyGui.createButton(tmpName, asset, i);
        }, 500)
      }
    } catch (e) {
      console.log('no animation')
    }

  }

  control(asset, assetIndex) {
    const animationGroups = asset.animationGroups;
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

export default Animations;
