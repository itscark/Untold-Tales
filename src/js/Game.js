class Game {
  constructor() {
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
    // // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    // this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    // Add lights to the scene
    this.light1 = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 1, 0),
      this.scene
    );
    // Add and manipulate meshes in the scene
    this.bgPlane = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { width: 10, height: 6 },
      this.scene
    );
    //Create Materials
    this.mat = new BABYLON.StandardMaterial("mat", this.scene);

    //load Asset manager
    this.assetsManager = new BABYLON.AssetsManager(this.scene);
    //Variables for Assets
    this.introVideo = null;
  }
}

export default Game;
