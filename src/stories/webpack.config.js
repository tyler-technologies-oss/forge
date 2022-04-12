const path = require('canonical-path');
const ROOT = path.resolve(__dirname, '../../');
const LIB_ROOT = path.join(ROOT, 'src/lib');

module.exports = async ({ config }) => {
  config.resolve.extensions.push('.ts', '.mjs', '.js', '.tsx', );
  config.resolve.alias['@tylertech/forge'] = `${LIB_ROOT}/index.ts`;

  // Full sourcemap quality
  config.devtool = 'sourcemap';

  // Add support for .mjs files
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto'
  });

  // Compile Forge TypeScript with ts-loader instead of babel
  config.module.rules.push({
    test: /src\/lib\/.*\.ts$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: path.join(LIB_ROOT, 'tsconfig-build.json'),
          compilerOptions: {
            sourceMap: true
          }
        }
      }
    ]
  });

  config.module.rules.push({
    test: /src\/lib\/.*\.html$/,
    use: [
      {
        loader: 'html-loader',
      },
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'css-to-string-loader',
      {
        loader: 'css-loader',
        options: {
          url: false
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [path.resolve(ROOT, 'node_modules')],
            implementation: require('sass')
          }
        }
      }
    ]
  });

  return config;
};