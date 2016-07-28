# node-starter
A starter for node JS.

## Features configured

- [Grunt](http://gruntjs.com/)
- [Babel (ES2015)](http://babeljs.io/)
- [ESLint](http://eslint.org)/
- [EditorConfig](http://editorconfig.com/)

To Do :
- Test

## Usage

``` 
git clone https://github.com/AbrahamTewa/node-starter.git
cd node-starter
npm install
npm build
npm start
```

## Available commands

### `npm run builder`
Run the builder.
The builder will create a new folder "build" in wich the build will be added.

### `npm run watcher`
Will run a watcher that will rebuild the app each time one of these file is modified :

* src/*
* package.json
* gruntfile.js
* .eslintrc.js
