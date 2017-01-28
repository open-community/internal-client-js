# node-starter
A starter for node JS.

## Tools configured

- [Babel (ES2015)](http://babeljs.io/)
- [DevTool](https://github.com/Jam3/devtool)
- [EditorConfig](http://editorconfig.com/)
- [ESLint](http://eslint.org/)
- [Grunt](http://gruntjs.com/)
- [Istanbul](https://istanbul.js.org/)
- [jsDoc](http://usejsdoc.org/)
- [Mocha](https://mochajs.org/)
- [Plato](https://github.com/es-analysis/plato)

## Usage

``` 
git clone https://github.com/AbrahamTewa/node-starter.git
cd node-starter
npm install
npm build
npm start
```

## Available commands

### `npm run analysis`
Run a code analysis using [Plato](https://github.com/es-analysis/plato).
The output result is stored in the `analysis` directory.


### `npm run build`
Run the build of the application.
The builder will create a new folder "build" in which the build will be added.
Note, the build will first lint the source.

### `npm run debugger`
Run the [DevTool](https://github.com/Jam3/devtool) on the source.

### `npm run linter`
Run the linter on the source using [ESLint](http://eslint.org)/.

### `npm run test-cov`
Run tests with coverage using [Istanbul](https://istanbul.js.org/) and [Mocha](https://mochajs.org/) for test.

Output directory : `coverage`.

### `npm run test`
Run the test using [Mocha](https://mochajs.org/).

### `npm run watcher`
Will run a watcher that will rebuild the app each time one of these file is modified :

### `npm test`
Run the test.
