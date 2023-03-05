export default class Sprite {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)

    this.content = game.add.sprite(this.config.x, this.config.y, this.config.key)
    this.content.alpha = this.config.alpha
    this.content.setOrigin(this.config.origin.x, this.config.origin.y)

    if (this.config.interactive) {
      this.content.setInteractive()
    }
  }

  getObject(config) {
    return Object.assign({
      alpha: 1,
      x: 0, y: 0,
      origin: {x: 0.5, y: 0.5},
      interactive: false,
    }, config)
  }
}


