import path from 'path'
import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

function configurate(outputFile, aliases) {
  return {
    treeshake: true,
    input: ['main.js'],
    output: [{
      file: outputFile,
      format: 'esm',
      sourcemap: true,
    }],
    plugins: [
      alias(aliases),

      resolve({
        // the fields to scan in a package.json to determine the entry point
        // if this list contains "browser", overrides specified in "pkg.browser"
        // will be used
        mainFields: ['jsnext:main', 'browser', 'module', 'main'], // Default: ['module', 'main']
        extensions: ['.js', '.jsx']
      }),
      // replace before commonjs, because tree shaking may need to ifdef out imports before they come in
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'ENVIRONMENT': JSON.stringify('development'),
      }),

      commonjs({
        // where to search for modules when you import them. if the
        // module path is not given explicitly, rollup will search
        // for them here.
        include: ['node_modules/**'],
      }),

      babel({
        babelrc: false,
        plugins: [
          ['@babel/plugin-proposal-class-properties', {'loose': true}],
          ['@babel/plugin-syntax-dynamic-import'],
          // presets: react
          ['@babel/plugin-syntax-jsx'],
          ['@babel/plugin-transform-react-jsx'],
          ['@babel/plugin-transform-react-display-name'],
        ],
        presets: [
          ['@babel/preset-env', {
            'loose': true,
            'modules': false,
            targets: {'ios': 11}
          }]
        ]
      })
    ]
  }
}

const preactBuild = configurate('preact-bundle.js', {
  'react': path.resolve('./node_modules/preact/compat/src/index.js'),
  'react-dom': path.resolve('./node_modules/preact/compat/src/index.js')
})

const reactBuild = configurate('react-bundle.js', {})
export default [preactBuild, reactBuild]
