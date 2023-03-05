import Sprite from "./Sprite"

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
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      ease: "Power2",
      yoyo: true,
    })
  }

}


