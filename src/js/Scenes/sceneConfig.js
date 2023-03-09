const bg = {width: 600, height: 600}

export const SCENE_CONFIG = {
  sprites: [
    {
      key: 'restart',
      type: 'image',
      anchor: [0, 0],
      position: [0, 0],
      url: require('../../assets/restart.png'),
    },

    {
      key: 'background',
      type: 'image',
      anchor: [0, 0],
      position: [0, 0],
      url: require('../../assets/background.png'),
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
