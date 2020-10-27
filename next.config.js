const deps = require('./package.json').dependencies
module.exports = {
  // works with serverless too
  // target: 'serverless',
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
console.log(config.plugin);
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
      name: 'next1',
      filename: 'static/remoteEntry.js',
      remotes: {
        next1: 'next1@http://localhost:3000/_next/static/remoteEntry.js'
      },
      shared: {
        react:deps.react
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
