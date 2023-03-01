const uiCanvas = new UICanvas();

export type MessageOptions = {
  color: string;
  fontSize: number;
};

export class UIMessageSystem implements ISystem {
  static alertText: GiveawayAlert;
  static timer: number = 0;

  update(dt: number) {
    if (UIMessageSystem.timer < 3) {
      UIMessageSystem.timer += dt;
      return;
    } else {
      UIMessageSystem.timer = 0;
    }

    if (UIMessageSystem.alertText) {
      UIMessageSystem.alertText.visible = false;
    }
  }

  static show: CallableFunction = (value: string, messageOptions: MessageOptions) => {
    if (!this.alertText) {
      this.timer = 0;
      this.alertText = new GiveawayAlert(value, messageOptions);
    } else {
      this.alertText.visible = false;
      this.alertText = new GiveawayAlert(value, messageOptions);
    }
  };
}

engine.addSystem(new UIMessageSystem());

class GiveawayAlert extends UIText {
  vAlign: string = "center";
  hAlign: string = "center";
  fontSize: number;
  color: Color4 = Color4.White();
  outlineColor: Color4 = Color4.Black();
  outlineWidth: number = 0.125;
  adaptWidth: boolean = true;
  adaptHeight: boolean = true;
  static visible = true;

  constructor(value: string, _messageOptions: MessageOptions) {
    super(uiCanvas);

    const { color, fontSize } = _messageOptions;
    this.value = value;
    this.fontSize = fontSize || 16;
    if (!color) {
      return;
    }
    switch (color.toLowerCase()) {
      case "black":
        this.color = Color4.Black();
        this.outlineColor = Color4.White();
        break;
      case "blue":
        this.color = Color4.Blue();
        break;
      case "gray":
        this.color = Color4.Gray();
        break;
      case "green":
        this.color = Color4.Green();
        break;
      case "magenta":
        this.color = Color4.Magenta();
        break;
      case "purple":
        this.color = Color4.Purple();
        break;
      case "red":
        this.color = Color4.Red();
        break;
      case "teal":
        this.color = Color4.Teal();
        break;
      case "yellow":
        this.color = Color4.Yellow();
        break;
      default:
        this.color = Color4.White();
    }
  }
}
