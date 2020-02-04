import Game from "./Game";

class Camera extends Game {
  constructor() {
    super();
    // Attach the camera to the canvas.
    this.camera.attachControl(canvas, true);
    this.camera.minZ = 0.001;
    this.camera.wheelPrecision = 150;
    // Target the camera to scene origin.
    this.camera.setTarget(BABYLON.Vector3.Zero());
  }
}

export default Camera;
