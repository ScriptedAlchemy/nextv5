const deps = require('./package.json').dependencies
module.exports = {
  // works with serverless too
  // target: 'serverless',
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config

    //this disables react refresh
    // if (config.module.rules[1].use[1]) {
    //   Object.assign(config.module.rules[1].use[1].options, {hasReactRefresh: false})
    // }
    // console.log(config.module.rules[1].use)
    // if(Array.isArray(config.module.rules[1].use)){
    //   config.module.rules[1].use.unshift()
    // }
    // config.plugins.shift();

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
      name: 'next1',
      filename: 'static/remoteEntry.js',
      remotes: {
        next1: 'next1@http://localhost:3000/_next/static/remoteEntry.js'
      },
      shared: {
        react: deps.react
      }
    }))
    config.experiments = {
      topLevelAwait: true
    }

    // Important: return the modified config
    return config
  },

  typescript: {
    ignoreDevErrors: true,
  },
  experimental: {
    modern: false,
    // topLevelAwait: true
  },
}
