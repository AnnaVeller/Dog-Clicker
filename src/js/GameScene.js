import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')

    this.animations = []
  }

  create() {
    const container = this.add.container(0, 0)

    const bg = this.add.sprite(0, 0, 'bg')
    bg.setOrigin(0, 0)
    container.add(bg)

    const progress = this.add.sprite(bg.width / 2, 50, 'progress')
    progress.setOrigin(0.5, 0.5)
    container.add(progress)

    const shrek = this.add.sprite(bg.width / 2, bg.height / 2, 'shrek')
    shrek.setOrigin(0.5, 0.5)
    container.add(shrek)

    shrek.setInteractive()
    shrek.on('pointerdown', (pointer) => this.handle(shrek, pointer))
  }

  handle(actor, pointer) {
    const name = `${actor}Tween`

    if (this.animations && this.animations[name] && this.animations[name].isPlaying()) {
      this.animations[name].stop()
      actor.setScale(1, 1)
      return
    }

    this.animations[name] = this.tweens.add({
      targets: actor,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      ease: "Power2",
      yoyo: true,
    })
  }


  update() {
  }
}


