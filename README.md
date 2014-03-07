![Li18b](https://raw.github.com/kostia/jquery.li18n/master/li18n.png)

Lightweight i18n for jQuery.

[![Build Status](https://travis-ci.org/kostia/jquery.li18n.png)](https://travis-ci.org/kostia/jquery.li18n)

## Why?

* It does exactly what it promises: translates with interpolations.
* It is lightweight: less than 100 LoC.
* Full test coverage.

## Installation

```
bower install jquery.li18n
```

## Usage

Play with it: http://jsfiddle.net/B8M4g/1/

```javascript

// Basic usage

$.li18n.translations = {en: {title: 'Hello!'}};
_t('title'); // 'Hello!'
_t('spam'); // Error: Missing translation for key "spam"

//  Interpolation

$.li18n.translations = {en: {title: 'Hello %{{name}}!'}};
_t('title', {name: 'Alice'}); // 'Hello Alice!'
_t('title'); // Error: Too less interpolation options for key "title"

// Change locale

$.li18n.currentLocale = 'de';

// On missing locale by default an error is raised. 
// You can customize the behaviour by overwriting $.li18n.translate 
// and using $.i18n._translate

$.li18n.translate = function(key) {
  var translation = $.li18n._translate(key);
  if (translation) {
    return translation;
  } else {
    console.log('Missing translation for key "' + key + '"');
  }
};

// As Handlebars helper

Handlebars.registerHelper('t', function(key, interpolationOptions) {
  return new Handlebars.SafeString($.li18n.t(key, interpolationOptions));
});
```

## Testing

```bash
# Install Node.js. For example with Homebrew (http://brew.sh/).

brew install nodejs

# Install NPM modules

npm install
npm install -g bower
npm install -g jasmine-jquery
npm install -g jasmine-node

# Install Bower components

bower install

# Run specs

npm test
```

## Other i18n libraries

* https://github.com/jquery/globalize
* https://github.com/airbnb/polyglot.js
* https://github.com/jamuhl/i18next
* https://github.com/recurser/jquery-i18n
* https://github.com/wikimedia/jquery.i18n

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
