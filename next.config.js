// next.config.js
const withOffline = require('next-offline');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
    dontAutoRegisterSw: true,
    workboxOpts: {
        importScripts: ['./sw.js']
    },
    webpack: (config) => {
        // this will output your push listener file to .next folder
        // check CopyWebpackPlugin docs if you want to change the destination (e.g. /static or /.next/static)
        config.plugins.push(new CopyWebpackPlugin(['./sw.js']));
        config.node = {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        };
        return config;
    }
};

module.exports = withOffline(nextConfig);
