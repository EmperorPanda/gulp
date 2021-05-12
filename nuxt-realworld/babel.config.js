module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "entry",
        'targets': {
          'browsers': ['ie >= 8', 'iOS 7'] // 支持ie8，直接使用iOS浏览器版本7
        },
        "loose": true,
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-private-methods", { "loose": true }
  ]
}