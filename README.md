![Li18n](https://kostia-github.s3.amazonaws.com/jquery.li18n.svg)

Lightweight i18n for jQuery.

[![Build Status](https://travis-ci.org/kostia/jquery.li18n.png)](https://travis-ci.org/kostia/jquery.li18n)

## Why?

* It does exactly what it promises: translation, interpolation, custom localization, locale fallback etc...
* It is lightweight: less than 100 SLOC.
* Full test coverage.

## Installation <a href="http://bower.io/search/?q=jquery.li18n"><img src="https://github.com/benschwarz/bower-badges/raw/gh-pages/badge@2x.png" width="130" height="30"></a>

```
bower install jquery.li18n
```

## Usage

```javascript
$.li18n.translations = {de: {greeting: 'Hello %{{name}}!'}};
$.li18n.currentLocale = 'de'
$.li18n.translate('greeting', {name: 'Alice'}); // => 'Hello Alice!'
_t('greeting', {name: 'Alice'}); // => 'Hello Alice!'
```

## Documentation

* [HOWTOs](/HOWTO.md)
* [Detailed API](/API.md)

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
