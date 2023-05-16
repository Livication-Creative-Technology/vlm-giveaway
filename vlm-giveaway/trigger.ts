import { MessageOptions } from "./ui";
import giveawayClaim from "./claim";

type GiveawayOptions = {
  actionId: string;
  position: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
  glb?: string;
  image?: string;
  clickDistance?: number;
  rotation?: number;
  hoverText?: string;
  messageColor?: string;
  messageFontSize?: number;
};

export function createGiveaway(options: GiveawayOptions, messageOptions: MessageOptions) {
  const { actionId, position, scale, glb, image, clickDistance, rotation, hoverText } = options;
  const claimEntity = new Entity("Giveaway Trigger");
  engine.addEntity(claimEntity);
  if (glb) {
    claimEntity.addComponent(new GLTFShape(glb || "src/vlm-giveaway/VLM-Sign.glb"));
  } else if (image) {
    const plane = new PlaneShape();
    plane.uvs = [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1];
    claimEntity.addComponent(plane);
    const claimImageMat = new Material();
    const claimImageTexture = new Texture(image);
    claimImageMat.albedoTexture = claimImageTexture;
    claimImageMat.emissiveTexture = claimImageTexture;
    claimImageMat.emissiveIntensity = 1;
    claimImageMat.emissiveColor = Color3.White();
    claimImageMat.transparencyMode = TransparencyMode.ALPHA_TEST;
    claimEntity.addComponentOrReplace(claimImageMat);
  } else {
    claimEntity.addComponent(new BoxShape());
  }

  const claimEntityTransform = new Transform({
    position: new Vector3(position.x || 8, position.y || 8, position.z || 8),
    rotation: Quaternion.Euler(0, rotation || 0, 0),
    scale: new Vector3(scale?.x || 1, scale?.y || 1, scale?.z || 1),
  });
  claimEntity.addComponentOrReplace(claimEntityTransform);
  claimEntity.addComponent(
    new OnPointerDown(
      async function () {
        await giveawayClaim(actionId, messageOptions);
      },
      {
        button: ActionButton.POINTER,
        hoverText: hoverText || "Claim Item",
        distance: clickDistance || 5,
      }
    )
  );
}
