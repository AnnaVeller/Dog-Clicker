import Phaser from "phaser"
import {SCENE_CONFIG} from "./sceneConfig"
import TextSprite from "../Engine/TextSprite"
import {GAME_DEFAULT_SIZE} from "../../index"

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
    this.text = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY - 80,
      text: 'Click faster!!!',
      textStyle: {font: '70px Arial', fill: '#a80202'},
      alpha: 0
    })

    this.text2 = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY - 20,
      text: 'You have only 3 seconds',
      textStyle: {font: '60px Arial', fill: '#e2c223'},
      alpha: 0
    })

    this.text3 = new TextSprite(this, {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY + 100,
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

  resize(gameSize) {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    const width = gameSize.width // this.cameras.main.width // gameSize.width
    const height = gameSize.height // this.cameras.main.height // gameSize.height
    const aspectRatio = gameSize.aspectRatio // отношение ширины изображения к его высоте

    this.isLandscape = aspectRatio > 1
    this.isPortrait = !this.isLandscape

    // выбираем наименьшую сторону и находим относительный скейл
    const sizer = (this.isLandscape ? height : width) / GAME_DEFAULT_SIZE

    // Нужно придумать как не ресайзить каждый элемент
    this.text.content.setScale(sizer)
    this.text2.content.setScale(sizer)
    this.text3.content.setScale(sizer)

    this.text.content.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - 80 * sizer)
    this.text2.content.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - 20 * sizer)
    this.text3.content.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 100 * sizer)
  }

}


