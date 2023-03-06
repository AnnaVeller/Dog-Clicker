import Phaser from "phaser"
import Sprite from "../Engine/Sprite"
import Shrek from "../Shrek"
import Counter from "../Counter"
import TextSprite from "../Engine/TextSprite"
import {GAME_DEFAULT_SIZE} from "../../index"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')

    this.animations = []
    this.timeLeft = 5
    this.isGameEnd = false
  }

  create() {
    const container = this.add.container(0, 0)

    this.bg = new Sprite(this, {
      x: 700, y: 700,
      key: 'bg',
    })

    this.progress = new Sprite(this, {
      x: 700, y: 200,
      key: 'progress'
    })

    this.counterText = new Counter(this, {
      x: 700, y: this.cameras.main.worldView.y + 100,
      text: 0,
      textStyle: {font: '80px Arial', fill: '#3d2828'},
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

  resize(gameSize, baseSize, displaySize, resolution) {
    const width = gameSize.width // this.cameras.main.width // gameSize.width
    const height = gameSize.height // this.cameras.main.height // gameSize.height
    const aspectRatio = gameSize.aspectRatio // отношение ширины изображения к его высоте

    this.isLandscape = aspectRatio > 1
    this.isPortrait = !this.isLandscape

    // выбираем наименьшую сторону и находим относительный скейл
    const sizer = (this.isLandscape ? height : width) / GAME_DEFAULT_SIZE

    // устанавливаем параметр this.cameras.main.midPoint
    this.cameras.main.centerOn(692, 700)

    this.bg.content.setScale(width / GAME_DEFAULT_SIZE, height / GAME_DEFAULT_SIZE)
    // this.bg.content.setScale(sizer)
    // this.shrek.changeScale(sizer)
    // this.progress.changeScale(sizer)
    this.progress.content.y = this.getWorldView().y + 100 * sizer

    this.counterText.content.setScale(sizer)
    this.counterText.content.y = this.getWorldView().y + 100 * sizer

    // this.timeUnder.changeScale(sizer)
    this.timeUnder.content.y = this.getWorldView().y + height - 200 * sizer

    this.counterTime.content.setScale(sizer)
    this.counterTime.content.y = this.getWorldView().y + height - 200 * sizer
  }

  getWorldView() {
    // this.cameras.main.worldView - в начале работает некорректно

    return {
      x: this.cameras.main.midPoint.x - (this.cameras.main.displayWidth / 2),
      y: this.cameras.main.midPoint.y - (this.cameras.main.displayHeight / 2)
    }
  }

}


