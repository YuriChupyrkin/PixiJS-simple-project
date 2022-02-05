export const SpritePositions = {
  background: { x: 0, y: 0 },
  austin: { x: 800, y: 100 },
  hammer: { x: 1070, y: 250 },
  stair: { x: 830, y: 80 },
  appearedNewStair: { x: 910, y: -100},
  newStair: { x: 910, y: 20},
  stairIcon1: { x: 820, y: 240 },
  stairIcon2: { x: 950, y: 160 },
  stairIcon3: { x: 1100, y: 120 },
};

export function getPositionByName(spriteName) {
  return SpritePositions[spriteName] ||  { x: 0, y: 0 };
}