import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

const prod = process.env.PRODUCTION
const mode = prod ? 'production' : 'development'

console.log(`Creating ${mode} bundle...`)

export default {
  entry: 'src/index.js',
  moduleName: 'purpose',
  external: ['react'],
  targets: [
    {
      dest: 'dist/purpose.js',
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
  sourceMap: true,
}
