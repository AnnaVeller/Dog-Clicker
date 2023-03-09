import Phaser from "phaser"
import Sprite from "../Engine/Sprite"
import Shrek from "../Shrek"
import Counter from "../Counter"
import TextSprite from "../Engine/TextSprite"
import {getWorldView, resize} from "../Engine/resizer"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')

    this.animations = []
    this.timeLeft = 5
    this.isGameEnd = false
  }

  create() {
    this.bg = new Sprite(this, {
      x: 700, y: 700,
      key: 'bg',
    })

    this.shrek = new Shrek(this, {
      x: 700, y: 700,
      key: 'shrek',
      interactive: true,
    })

    this.timeUnder = new Sprite(this, {
      x: 700, y: 200,
      key: 'progress'
    })

    this.progress = new Sprite(this, {
      x: 700, y: 400,
      key: 'progress'
    })

    this.counterText = new Counter(this, {
      x: 700, y: 100,
      text: 0,
      textStyle: {font: '80px Arial', fill: '#3d2828'},
    })

    this.counterTime = new TextSprite(this, {
      x: 700, y: 0,
      text: 10,
      textStyle: {font: '80px Arial', fill: '#ff0000'},
    })

    this.shrek.content.on('pointerdown', () => {
      if (!this.isGameEnd) {
        this.shrek.scaleYoyo()
        this.counterText.addLevel()
      }
    })

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
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

  resize() {
    resize(this)

    const midX = this.cameras.main.midPoint.x
    const midY = this.cameras.main.midPoint.y

    // левый вверх экрана
    const worldView = getWorldView(this.cameras.main)

    // правый низ экрана
    const bottomScreen = {
      x: worldView.x + this.cameras.main.displayWidth,
      y: worldView.y + this.cameras.main.displayHeight
    }

    this.progress.content.setPosition(midX, worldView.y + 100)
    this.counterText.content.setPosition(midX, worldView.y + 100)

    this.timeUnder.content.setPosition(midX, bottomScreen.y - 100)
    this.counterTime.content.setPosition(midX, bottomScreen.y - 100)

  }

}


