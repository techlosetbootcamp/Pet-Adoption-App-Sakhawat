const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);




// // /**
// //  * Metro configuration
// //  * https://reactnative.dev/docs/metro
// //  *
// //  * @type {import('metro-config').MetroConfig}
// //  */

// // const {
// //     wrapWithReanimatedMetroConfig,
// //   } = require('react-native-reanimated/metro-config');

// // const config = {};

// // module.exports = wrapWithReanimatedMetroConfig(config);



// // const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// // const defaultConfig = getDefaultConfig(__dirname);

// const {
//   resolver: { sourceExts, assetExts },
// } = getDefaultConfig(__dirname);
// const {
//       wrapWithReanimatedMetroConfig,
//     } = require('react-native-reanimated/metro-config');
  

// const config = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...sourceExts, 'svg'],
//   },
// };

// module.exports = mergeConfig(defaultConfig, config);