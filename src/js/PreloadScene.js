import Phaser from "phaser"

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Start')

    this.animations = []
  }

  preload() {
    this.load.image('bg', require('../assets/bg.png'))
    this.load.image('shrek', require('../assets/shrek.png'))
    this.load.image('progress', require('../assets/progress.png'))
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


