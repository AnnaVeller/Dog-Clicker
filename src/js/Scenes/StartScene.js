import Phaser from "phaser"
import TextSprite from "../Engine/TextSprite"
import {resize} from "../Engine/resizer"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start')
  }

  init() {
    this.animations = []
  }

  create() {
    this.text = new TextSprite(this, {
      x: 700, y: 620,
      text: 'Click faster!!!',
      textStyle: {font: '70px Arial', fill: '#a80202'},
      alpha: 0
    })

    this.text2 = new TextSprite(this, {
      x: 700, y: 680,
      text: 'You have only 3 seconds',
      textStyle: {font: '60px Arial', fill: '#e2c223'},
      alpha: 0
    })

    this.text3 = new TextSprite(this, {
      x: 700, y: 800,
      text: 'Click to start',
      textStyle: {font: '76px Arial', fill: '#006d04'},
      alpha: 0
    })

    this.text.showText(100, 400)
    this.text2.showText(600, 200)
    this.text3.showText(1000, 400)

    this.tweens.add({
      targets: this.text3.content,
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

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    resize(this)
  }

}


