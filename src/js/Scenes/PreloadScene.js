import Phaser from "phaser"
import {SCENE_CONFIG} from "./sceneConfig"
import TextSprite from "../Engine/TextSprite"

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
      y: this.cameras.main.centerY - 80,
      text: 'Click faster!!!',
      textStyle: {font: '50px Arial', fill:  '#a80202'},
      alpha: 0
    })

    const text2 = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY - 20,
      text: 'You have only 3 seconds',
      textStyle: {font: '46px Arial', fill: '#e2c223'},
      alpha: 0
    })

    const text3 = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY + 100,
      text: 'Click to start',
      textStyle: {font: '52px Arial', fill: '#006d04'},
      alpha: 0
    })

    text.showText(100, 400)
    text2.showText(600, 200)
    text3.showText(1000, 400)

    this.tweens.add({
      targets: text3.content,
      scaleX: 1.15,
      scaleY: 1.1,
      duration: 300,
      delay: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    })

    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }

}


