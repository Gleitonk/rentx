module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@services': './src/services',
            '@utils': './src/utils',
            '@dtos': './src/dtos',
            '@hooks': './src/hooks'
          }
        }
      ]
    ]
  };
}; 
