import { Scene } from '../core/scene';
import { TestGameObject } from '../objects/game/testGameObject';

export const defaultScene = new Scene('default',
  [
    [TestGameObject, [0, 0]],
  ],
  [
    
  ]
);