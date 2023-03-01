#VIRTUAL LAND MANAGER
#NFT GIVEAWAY SETUP STEPS

1. Copy the entire vlm-giveaway folder into your scene's src folder.

2. Copy the code between the two lines below, and paste it somewhere in your game.ts file.

3. Apply the following customization options as needed:

# Giveaway/Item Options:

|Option |Type |Default|Use|
|actionId |string |"claim-id"|Do not change for now (will be cutomizable from the VLM website in a future update to allow multiple simultaneous giveaways)|
|glb |string |"src/vlm-giveaway/VLM-Sign.glb"|Change this to the file path of the glb you want to use as the giveaway trigger|
|clickDistance |number |5||A number between 0 and 10 that can be used to adjust how close you need to get to click the giveaway trigger|
|hoverText |string |"Claim Item"|The text you want to appear on screen when someone's mouse is hovering over the giveaway trigger|
|position |{x:number, y:number, z:number}|{x:8,y:8,x:8}|The x, y, and z coordinates where you want your giveaway trigger to appear|
|rotation |number |0|Rotates the direction your glb is facing. 90 will rotate the glb by 90 degrees, 180 will turn it 180 degrees, etc.|

# Message Options:

|Option |Type |Default|Use|
|color |string|"white"|Sets the color of the feedback shown on screen after someone attempts to claim your item. (Can be "black", "blue", "gray", "green", "magenta", "purple", "red", "teal", "yellow" or "white".)|
|fontSize|number|16 |Sets the font size of this feedback text.|

```typescript
// VLM GIVEAWAY CODE START
import { createGiveaway } from "./vlm-giveaway/trigger";

createGiveaway(
  {
    // Giveaway Item Options
    actionId: "claim-item",
    glb: "src/vlm-giveaway/VLM-Sign.glb",
    clickDistance: 8,
    hoverText: "Click Item",
    position: { x: 8, y: 1, z: 8 },
    rotation: 0,
  },

  {
    // Feedback Message Options
    color: "white",
    fontSize: 20,
  }
);
// VLM GIVEAWAY CODE END
```
