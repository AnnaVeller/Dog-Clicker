import Phaser from 'phaser'
import PreloadScene from "./js/Scenes/PreloadScene"
import GameScene from "./js/Scenes/GameScene"

export const GAME_DEFAULT_SIZE = 1400

const game = new Phaser.Game(
  {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: GAME_DEFAULT_SIZE,
    height: GAME_DEFAULT_SIZE,
    backgroundColor: '#2c2c2c',
    scene: [PreloadScene, GameScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'phaser-example',
      width: '100%',
      height: '100%'
    },
  }
)
