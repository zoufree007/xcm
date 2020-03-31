module.exports = {
  presets: [
    ['@vue/app', {
      modules: 'commonjs'
    }]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ]
}