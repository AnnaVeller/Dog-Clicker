import TextSprite from "../Engine/TextSprite"

export default class Counter extends TextSprite {
  constructor(game, config) {
    super(game, config)

    this.counter = 0
  }

  addLevel() {
    this.counter += 1
    this.changeText(this.counter)
  }

}


