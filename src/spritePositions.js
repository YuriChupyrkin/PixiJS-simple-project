export const SpritePositions = {
  background: { x: 0, y: 0 },
  austin: { x: 800, y: 300 },
  hammer: { x: 940, y: 380 },
  stair: { x: 830, y: 80 },
  newStair: { x: 910, y: 20},
  stairIcon1: { x: 740, y: 360 },
  stairIcon2: { x: 900, y: 260 },
  stairIcon3: { x: 1080, y: 240 },
  logo: { x: 60, y: 30 },
  table: { x: 580, y: 180 },
};

export function getPositionByName(spriteName) {
  return SpritePositions[spriteName] ||  { x: 0, y: 0 };
}