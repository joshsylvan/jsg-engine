import htmlTemplate from 'rollup-plugin-generate-html-template';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import image from 'rollup-plugin-img';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    compact: false,
  },
  plugins: [
    json({
      exclude: ['node_modules/**'],
      preferConst: true,
      compact: true,
      namedExports: true
    }),
    copy({
      targets: [
        { src: 'resources/sounds/*', dest: 'dist/resources/sounds' },
      ]
    }),
    commonjs({
      include: 'node_modules/**',  // Default: undefined
      exclude: [],  // Default: undefined
      extensions: ['.js'],  // Default: [ '.js' ]
      ignoreGlobal: false,  // Default: false
      sourceMap: true,  // Default: true
    }),
    image({
      output: 'dist/resources', // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
      limit: 8192,  // default 8192(8k)
      exclude: 'node_modules/**'
    }),
    htmlTemplate({
      template: 'src/index.html',
      target: 'dist/index.html',
    }),
    serve({
      host: 'localhost',
      contentBase: ['dist'],
      verbose: true,
      port: 8080,
    }),
    livereload({
      watch: 'dist',
      verbose: true, // Disable console output
    }),
  ],
};