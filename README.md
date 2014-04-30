<img src="https://raw.githubusercontent.com/kostia/jquery.li18n/master/li18n.png" alt="Li18n" width="346px" height="171px" />

Lightweight i18n for jQuery.

<a href="https://travis-ci.org/kostia/jquery.li18n"><img src="https://img.shields.io/travis/kostia/jquery.li18n.svg" /></a>
<a href="http://bower.io/search/?q=li18n"><img src="https://img.shields.io/badge/bower-0.1.2-ffcc2f.svg" /></a>
<a href="https://plugins.jquery.com/li18n"><img src="https://img.shields.io/badge/jquery--plugin-0.1.2-blue.svg" /></a>

## Why?

* It does exactly what it promises.
* It is lightweight: less than 100 SLOC.
* Full test coverage.
* Well documented.

## Features

* Translation
* Interpolation
* Localization framework
* Shortcuts
* Fallbacks
* Error handling

## Installation

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

Live example: http://jsfiddle.net/pf59z/2/

## Documentation

* [Detailed API](https://github.com/kostia/jquery.li18n/blob/master/API.md)
* [HOWTOs with live examples](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md)
  * [Basic Usage](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#basic-usage)
  * [Shortcuts](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#shortcuts)
  * [Localization with Moment.js](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#localization-with-momentjs)
  * [Handlebars Helpers](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#handlebars-helpers)
  * [Fallbacks Language](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#fallbacks-language)
  * [Handling Missing Translations](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#handling-missing-translations)
  * [Rails integration](https://github.com/kostia/jquery.li18n/blob/master/HOWTO.md#rails-integration)

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

## Building

```bash
npm install -g gulp
gulp build
```

## Other i18n libraries

The following does not aim to be objective in any way, but only reflects my opinion.

### Full-featured heavyweights

* https://github.com/jquery/globalize Standard i18n lib by jQuery guys.
* https://github.com/airbnb/polyglot.js Feature list is similar to `globalize`, but not specific to jQuery.

### Lightweights

* https://github.com/jamuhl/i18next Great i18n lib for jQuery, but does a little bit too much.
* https://github.com/recurser/jquery-i18n Similar to `i18next`, but the API is `HTMLElement` scentric.
* https://github.com/wikimedia/jquery.i18n Similar to `i18next`, but unfortunately with some odd behaviour.

## Contributing

* In case of a feature request or a bug feel free to file an issue describing the requested feature or the buggy behavior: https://github.com/kostia/jquery.li18n/issues.
* If you want to help out with coding, then make sure the test suite is green before issuing a pull request: https://github.com/kostia/jquery.li18n/pulls.

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
