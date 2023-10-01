"use strict"

const { merge } = require("webpack-merge")

const common = require("./webpack.common.js")
const PATHS = require("./paths")

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    main: PATHS.src + "/main.ts",
    background: PATHS.src + "/background.ts"
  }
})

module.exports = config
