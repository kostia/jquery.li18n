jquery.li18n
============

[![Build Status](https://travis-ci.org/kostia/jquery.li18n.png)](https://travis-ci.org/kostia/jquery.li18n)

Lightweight i18n for jQuery.

## Installation

```
bower install jquery.li18n
```

## Usage

```javascript
$.li18n.locales = {
  en: {
    title: 'Hello!'
  }
};

t = function(key) {
  $.li18n.translate(key)
  .done(function(translation) {
    console.log(translation);
  })
  .fail(function() {
    $.error('Missing translation for ' + key);
  });
};

t('title');
// => 'Hello!'

t('spam');
// Error: Missing translation for spam
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
