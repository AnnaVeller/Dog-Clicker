const bg = {width: 600, height: 600}

export const SCENE_CONFIG = {
  sprites: [
    {
      key: 'bg',
      type: 'image',
      anchor: [0, 0],
      position: [0, 0],
      url: require('../../assets/bg.png'),
    },

    {
      key: 'progress',
      type: 'image',
      anchor: [0.5, 0.5],
      position: [bg.width / 2, 50],
      url: require('../../assets/progress.png'),
    },

    {
      key: 'shrek',
      type: 'image',
      anchor: [0.5, 0.5],
      position: [bg.width / 2, bg.height / 2],
      url: require('../../assets/shrek.png'),
      interactive: true
    },

  ]
}
