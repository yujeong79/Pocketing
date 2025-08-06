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
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@utils': './src/utils',
            '@screens': './src/screens',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@types': './src/types',
            '@store': './src/store',
            '@api': './src/api'
          }
        }
      ]
    ],
  };
}; 