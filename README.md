![Li18b](https://raw.github.com/kostia/jquery.li18n/master/li18n.png)

Lightweight i18n for jQuery.

[![Build Status](https://travis-ci.org/kostia/jquery.li18n.png)](https://travis-ci.org/kostia/jquery.li18n)

## WARNING: this library is not yet stable!

## Installation

```
bower install jquery.li18n
```

## Usage

```javascript
$.li18n.translations = {en: {title: 'Hello!'}};
_t('title'); // 'Hello!'
_t('spam'); // Error: Missing translation for key "spam"
```

### Interpolation

```javascript
$.li18n.translations = {en: {title: 'Hello %{{name}}!'}};
_t('title', name: 'Alice'); // 'Hello Alice!'
_t('title'); // Error: Too less interpolation options for key "title"
```

### Set current locale

```javascript
$.li18n.currentLocale = 'de';
```

### On missing locale

By default an error is raised. You can customize the behaviour by overwriting `$.li18n.translate`.

```javascript
$.li18n.translate = function(key) {
  var translation = $.li18n._translate(key);
  if (translation) {
    return translation;
  } else {
    console.log('issing translation for key "' + key + '"');
  }
};
```

## Testing
* Install Node.js. For example with Homebrew (http://brew.sh/).

```bash
brew install nodejs
```

* Install NPM modules

```bash
npm install
npm install -g bower
npm install -g jasmine-jquery
npm install -g jasmine-node
```

* Install Bower components

```bash
bower install
```

* Run specs

```bash
jasmine-node spec/
```

## License

The MIT License (MIT)

Copyright (c) 2014 Kostiantyn Kahanskyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
