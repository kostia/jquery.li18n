![Li18b](https://raw.github.com/kostia/jquery.li18n/master/li18n.png)

Lightweight i18n for jQuery.

[![Build Status](https://travis-ci.org/kostia/jquery.li18n.png)](https://travis-ci.org/kostia/jquery.li18n)

## Why?

* It does exactly what it promises: translates with interpolations.
* It is lightweight: less than 100 LoC.
* Full test coverage.

## Installation <a href="http://bower.io/search/?q=jquery.li18n"><img src="https://github.com/benschwarz/bower-badges/raw/gh-pages/badge@2x.png" width="130" height="30"></a>

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

// If translation is missing, then by default an error is thrown.
// You can change the behaviour by overwriting $.li18n.translate
// and using $.li18n._translate

$.li18n.translate = function(key) {
  var translation = $.li18n._translate(key);
  if (translation) {
    return translation;
  } else {
    console.log('Missing translation for key "' + key + '"');
  }
};

// There is no built-in localization, but you can plug in your own by setting $.li18n._localize.
// For example with "Moment" (http://momentjs.com/)

$.li18n.translations = {en: {l10n: {date: 'LLLL'}}};
$.li18n._localize = function(date, format, currentLocale) {
  return moment(date).lang(currentLocale).format(format);
};
_l(new Date('1971.01.01')); // 'Friday, January 1 1971 12:00 AM'

// As Handlebars helpers

Handlebars.registerHelper('t', function(key, interpolationOptions) {
  return new Handlebars.SafeString(_t(key, interpolationOptions));
});

Handlebars.registerHelper('l', function(object) {
  return new Handlebars.SafeString(_l(object));
});
```

## Testing

You will need Node.js in order to run tests.
On OSX you can install Node.js with Homebrew (http://brew.sh/).

### Install dependecies

```bash
npm install
npm install -g bower
bower install
```

### Run the tests

```bash
npm test
```

## Other i18n libraries

The comments do not aim to be objective in any way, but reflect my own subjective opinions.

### Full-features heavyweights

* https://github.com/jquery/globalize Standard i18n lib by jQuery guys.
* https://github.com/airbnb/polyglot.js Feature list similar to `globalize`, but not specific to jQuery.

### Lightweights

* https://github.com/jamuhl/i18next Great i18n for jQuery, but does a little bit too much for my taste.
* https://github.com/recurser/jquery-i18n Similar to `i18next`, but the API is `HTMLElement` scentric.
* https://github.com/wikimedia/jquery.i18n Similar to `i18next`, unfortunately with some odd behaviour.

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
