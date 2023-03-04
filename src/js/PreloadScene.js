import Phaser from "phaser"
import {SCENE_CONFIG} from "./sceneConfig"

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Start')

    this.animations = []
  }

  preload() {
    SCENE_CONFIG.sprites.forEach((el) => {
      this.load.image(el.key, el.url)
    })
  }

  create() {
    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Click to start',
      {font: '50px Arial', fill: '#73d5a1'})
      .setOrigin(0.5)


    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }

}


