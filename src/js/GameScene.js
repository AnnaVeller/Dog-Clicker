import Phaser from "phaser"
import Sprite from "./Sprite"
import Shrek from "./Shrek"
import Counter from "./Counter"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')

    this.animations = []
  }

  create() {
    const container = this.add.container(0, 0)

    const bg = new Sprite(this, {
      x: 0, y: 0,
      key: 'bg',
      origin: {x: 0, y: 0}
    })

    const progress = new Sprite(this, {
      x: bg.content.width / 2, y: 50,
      key: 'progress'
    })

    const shrek = new Shrek(this, {
      x: bg.content.width / 2, y: bg.content.height / 2,
      key: 'shrek',
      interactive: true,
    })

    const counterText = new Counter(this, {
      x: this.cameras.main.centerX,
      y: 45,
      text: 0,
      textStyle: {font: '40px Arial', fill: '#3d2828'},
    })

    shrek.content.on('pointerdown', () => {
      shrek.scaleYoyo()
      counterText.addLevel()
    })
  }

  update() {
  }
}


