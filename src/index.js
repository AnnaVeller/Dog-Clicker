import Phaser from 'phaser'
import PreloadScene from "./js/Scenes/PreloadScene"
import GameScene from "./js/Scenes/GameScene"

const game = new Phaser.Game(
  {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 600,
    backgroundColor: '#2c2c2c',
    scene: [PreloadScene, GameScene]
  }
)
