import Phaser from "phaser"
import Sprite from "../Engine/Sprite"
import Dog from "../Sprites/Dog"
import Counter from "../Sprites/Counter"
import TextSprite from "../Engine/TextSprite"
import Button from "../Engine/Button"
import {getWorldView, resize} from "../Engine/resizer"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.animations = []
    this.timeLeft = 5
    this.isGameEnd = false

    this.sprites = {}
    this.texts = {}
  }

  create() {
    this.sprites.background = new Sprite(this, {
      x: 700, y: 700,
      key: 'background',
    })

    this.sprites.dog = new Dog(this, {
      x: 700, y: 950,
      origin: {x: 0.5, y: 1},
      key: 'dog',
      interactive: true,
    })

    this.levelCounter = this.add.container(0, 0)
    this.texts.level = new Counter(this, {
      x: 0, y: 0,
      text: 0,
      textStyle: {font: '80px Arial', fill: '#3d2828'},
    })
    this.sprites.progressLevel = new Sprite(this, {
      x: 0, y: 0,
      origin: {x: 0.5, y: 0.42},
      key: 'progress'
    })
    this.levelCounter.add([this.sprites.progressLevel.content, this.texts.level.content])

    this.timeCounter = this.add.container(0, 0)
    this.sprites.progressTime = new Sprite(this, {
      x: 0, y: 0,
      origin: {x: 0.5, y: 0.42},
      key: 'progress'
    })
    this.texts.time = new TextSprite(this, {
      x: 0, y: 0,
      text: 10,
      textStyle: {font: '80px Arial', fill: '#ff0000'},
    })
    this.timeCounter.add([this.sprites.progressTime.content, this.texts.time.content])

    this.restart = new Button(this, {
      x: 0, y: 200,
      key: 'restart',
      alpha: 0,
      interactive: true,
    })

    this.sprites.dog.content.on('pointerdown', () => {
      if (!this.isGameEnd) {
        this.sprites.dog.scaleYoyo()
        this.texts.level.addLevel()
      }
    })

    this.restart.content.on('pointerdown', () => {
      if (this.isGameEnd) {
        this.scene.start('Start')
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

    this.texts.time.changeText(this.timeLeft.toFixed(0))
  }

  gameEnd() {
    this.isGameEnd = true
    this.sprites.dog.startFinalAnimation()
    this.restart.content.alpha = 1
    this.timeCounter.alpha = 0
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

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

    const aspectRatio = this.scale.gameSize.aspectRatio // отношение ширины изображения к его высоте
    this.isLandscape = aspectRatio > 1

    if (this.isLandscape) {
      this.levelCounter.setPosition(230, midY - 70)
      this.timeCounter.setPosition(230, midY + 70)
      this.restart.content.setPosition(230, midY + 70)
    } else {
      this.levelCounter.setPosition(midX, worldView.y + 100)
      this.timeCounter.setPosition(midX, bottomScreen.y - 100)
      this.restart.content.setPosition(midX, bottomScreen.y - 100)
    }

  }

}


