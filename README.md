# VIRTUAL LAND MANAGER

### NFT GIVEAWAY LIBRARY
NOTE: This service will be incorporated in the larger Virtual Land Manager library at a later date. 
It's here for now so people can use it until the front end is built to allow setup from the VLM web app at [dcl-vlm.io](https://www.dcl-vlm.io).
[Virtual Land Manager Library for Decentraland](https://github.com/Livication-Creative-Technology/dcl-vlm)

---
### BACKEND SETUP - !IMPORTANT!

#### Contact Unknower
|Discord|Twitter|Email|
|--------------------|----------|------------|
|Unknower#0677|knowUnknower|unknower@livication.com|

Please contact Unknower with the following details to get your giveaway set up on the back end:

#### Giveaway Info Needed
|Description|Looks like|Can be found|
|--------------------|----------|------------|
|Contract Address|0xd59ec90e9359122f64a9e23fddc9bd9525c184cf|Found in item's URN or marketplace link|
|Item number|0|Found in item's URN or marketplace link|
|Base Parcel|100,54|Your project's scene.json file|
|Start Date/Time|2023-01-31T00:00:00Z-4:00|Any date/time you want in UTC or your specified time zone|
|End Date/Time|2023-02-28T00:00:00Z-4:00|Any date/time you want in UTC or your specified time zone|
|Item Rarity|Epic/Mythic/Unique/etc|Set on wearable submission and shown on collections page|
|Giveaway Cutoff|500|How many items you want to give away before preventing any more claims from going through|
|Claims Per IP|3|Your preference of how many items should be able to be claimed by unique accounts making claims from the same computer or household|

### THEN

#### Set VLM as Minter
In order to mint wearables on your behalf, VLM's wallet needs permission from the contract. This permission is revokable by the wearable submitter at any time if the VLM wallet is ever compromised or if you are unhappy with the giveaway service. 

**VLM Wallet to set as Minter:** 

0xa2f7AFf3f1561fbC347f771B8b251E6793B8BC24

---

### SDK SETUP

1. Copy the entire `vlm-giveaway` folder into your scene's `src` folder.

2. Copy the code in the code block below, and paste it somewhere in your game.ts file.

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

3. Apply the following customization options in the code as needed:

#### Giveaway/Item Options:

|Option |Type |Default|Use|
|-------|-----|-------|---|
|actionId |string |"claim-id"|Do not change for now (will be cutomizable from the VLM website in a future update to allow multiple simultaneous giveaways)|
|glb |string |"src/vlm-giveaway/VLM-Sign.glb"|Change this to the file path of the glb you want to use as the giveaway trigger|
|clickDistance |number |5||A number between 0 and 10 that can be used to adjust how close you need to get to click the giveaway trigger|
|hoverText |string |"Claim Item"|The text you want to appear on screen when someone's mouse is hovering over the giveaway trigger|
|position |{x:number, y:number, z:number}|{x:8, y:8, z:8}|The x, y, and z coordinates where you want your giveaway trigger to appear|
|rotation |number |0|Rotates the direction your glb is facing. 90 will rotate the glb by 90 degrees, 180 will turn it 180 degrees, etc.|

#### Message Options:

|Option |Type |Default|Use|
|-------|-----|-------|---|
|color |string|"white"|Sets the color of the feedback shown on screen after someone attempts to claim your item. (Can be "black", "blue", "gray", "green", "magenta", "purple", "red", "teal", "yellow" or "white".)|
|fontSize|number|16 |Sets the font size of this feedback text.|

