import Phaser from "phaser"
import {SCENE_CONFIG} from "./sceneConfig"
import TextSprite from "./TextSprite"

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
    const text = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
      text: 'Click to start',
      textStyle: {font: '50px Arial', fill: '#73d5a1'},
      alpha: 0
    })

    text.showText()

    // this.scene.start('Game')

    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }

}


