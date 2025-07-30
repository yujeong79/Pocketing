module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'styled-components',
        {
          ssr: false,
          displayName: true,
          preprocess: false,
        },
      ],
    ],
  };
}; 