import Phaser from "phaser"
import Sprite from "../Engine/Sprite"
import Shrek from "../Shrek"
import Counter from "../Counter"
import TextSprite from "../Engine/TextSprite"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')

    this.animations = []
    this.timeLeft = 3
    this.isGameEnd = false
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

    this.shrek = new Shrek(this, {
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

    this.counterTime = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: bg.content.height - 70,
      text: 10,
      textStyle: {font: '40px Arial', fill: '#ff0000'},
    })

    this.shrek.content.on('pointerdown', () => {
      if (!this.isGameEnd) {
        this.shrek.scaleYoyo()
        counterText.addLevel()
      }
    })
  }

  update(time, delta) {
    !this.isGameEnd && this.updateTimer(delta)
  }

  updateTimer(delta) {
    this.timeLeft = this.timeLeft - delta / 1000

    if (this.timeLeft < 0) {
      this.timeLeft = 0
      this.gameEnd()
      return
    }

    this.counterTime.changeText(this.timeLeft.toFixed(0))
  }

  gameEnd() {
    this.isGameEnd = true
    this.shrek.startFinalAnimation()
  }

}


