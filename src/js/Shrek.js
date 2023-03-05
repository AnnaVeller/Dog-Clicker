import Sprite from "./Engine/Sprite"

export default class Shrek extends Sprite {
  constructor(game, config) {
    super(game, config)

    this.animations = {}
  }

  scaleYoyo() {
    if (this.animations && this.animations.scaling && this.animations.scaling.isPlaying()) {
      this.animations.scaling.stop()
      this.content.setScale(1, 1)
      return
    }

    this.animations.scaling = this.game.tweens.add({
      targets: this.content,
      scaleX: {from: 1, to: 0.95},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
      ease: 'Sine.easeInOut',
      yoyo: true,
    })
  }

  startFinalAnimation() {
    if (this.animations && this.animations.scaling && this.animations.scaling.isPlaying()) {
      this.animations.scaling.stop()
    }

    this.animations.scaling = this.game.tweens.add({
      targets: this.content,
      scaleX: 0.2,
      scaleY: 0.2,
      rotation: Math.PI * 4,
      alpha: 0,
      duration: 2000,
      ease: 'Sine.easeInOut',
    })
  }
}
