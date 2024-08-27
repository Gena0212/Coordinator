/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your configuration options go here
    
  };
  
//   module.exports = nextConfig;

module.exports = {
    // webpack: (config, options) => {
    //   config.node= {
    //   // Some libraries import Node modules but don't use them in the browser.
    //   // Tell Webpack to provide empty mocks for them so importing them works.
    //   ...config.node,
    //   fs: 'empty',
    //   child_process : 'empty',
    //   net : 'empty',
    //   tls: 'empty',
    // }
  
    //   return config
    // },
    // webpack: (config) => {
    //     config.resolve.fallback = {
    //       ...config.resolve.fallback,
    //       "child_process": false,
    //       "fs": false,
    //       "net": false,
    //       "tls": false
    //     };
    //     return config;
    //   },
    
    // webpack: (config, options) => {
    //     config.node= {
    //     // Some libraries import Node modules but don't use them in the browser.
    //     // Tell Webpack to provide empty mocks for them so importing them works.
    //     ...config.node,
    //     fs: 'empty',
    //     child_process : 'empty',
    //     net : 'empty',
    //     tls: 'empty',
    //   }
    
    //     return config
    //   },

    webpack: (config) => {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          "child_process": false
        };
        return config;
    },
  };