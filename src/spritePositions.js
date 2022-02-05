import Constants from "./constants";

export const SpritePositions = {
  [Constants.BACKGROUND]: { x: 0, y: 0 },
  [Constants.AUSTIN]: { x: 800, y: 300 },
  [Constants.HAMMER]: { x: 940, y: 380 },
  [Constants.STAIR]: { x: 830, y: 80 },
  [Constants.NEW_STAIR]: { x: 910, y: 20},
  [Constants.STAIR_ICON_1]: { x: 740, y: 360 },
  [Constants.STAIR_ICON_2]: { x: 900, y: 260 },
  [Constants.STAIR_ICON_3]: { x: 1080, y: 240 },
  [Constants.LOGO]: { x: 20, y: 18 },
  [Constants.TABLE]: { x: 580, y: 180 },
  [Constants.CONTINUE_BUTTON]: { x: 190, y: 570},
};

export function getPositionByName(spriteName) {
  return SpritePositions[spriteName] ||  { x: 0, y: 0 };
}