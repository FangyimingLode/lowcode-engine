const { composePlugins, withNx, withReact } = require('@nx/rspack');
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // process.env.NODE_ENV =  'r';
  config.module.rules.forEach((rule) => {
    if (
      rule.loader === 'builtin:swc-loader' &&
      rule.test.toString().includes('sx')
    ) {
      rule.options.jsc = {
        ...rule.options.jsc,
        experimental: {
          plugins: [["@swc/plugin-emotion", {}]],
        },
        transform: {
          ...rule.options.jsc.transform,
          react: {
            ...rule.options.jsc.transform.react,
            importSource: '@emotion/react'
          }
        }
      }
    }
  });
  // console.log(JSON.stringify(config.optimization), 'config.optimization')
  return config;
});
