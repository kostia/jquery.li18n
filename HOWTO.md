# HOWTOs

#### Basic Usage
##### http://jsfiddle.net/pf59z/2/

```javascript
$.li18n.translations = {de: {greeting: 'Hallo %{{name}}'}};
$.li18n.currentLocale = 'de';
$.li18n.translate('greeting', {name: 'Alice'});
// => 'Hallo Alice'
```

---

#### Shortcuts
##### http://jsfiddle.net/pf59z/2/

```javascript
_t('spam');
// => 'eggs'

_l(new Date('1971.01.01'));
// => 'January 1 1971'
```

---

#### Localization with Moment.js
##### http://jsfiddle.net/5zaaw/2/

```javascript
$.li18n.translations = {en: {l10n: {date: 'LL'}}};
$.li18n._localize = function(object, format, currentLocale) {
  return moment(object).lang(currentLocale).format(format);
};
$.li18n.localize(new Date('1971.01.0.1'));
// => 'January 1 1971'
```

---

#### Handlebars Helpers
##### http://jsfiddle.net/9uYkR/1/

```javascript
Handlebars.registerHelper('_t', $.li18n.translate);
Handlebars.registerHelper('_l', $.li18n.localize);
```

---

#### Fallbacks Language
##### http://jsfiddle.net/xeAQC/1/

```javascript
$.li18n.translations = {en: {spam: 'eggs'}};

$.li18n.currentLocale = 'de';
$.li18n.translate('spam')
// => Error: 'Missing translation for key "spam" and locale "de"'

$.li18n.fallbackLocale = 'en';
$.li18n.translate('spam')
// => 'eggs'
```

---

#### Handling Missing Translations 
##### http://jsfiddle.net/knH65/2/

```javascript
$.li18n.translations = {en: {}};

// Option 1: Throw error (default).
$.li18n.translate('spam');
// => Error: 'Missing translation for key "spam" and locale "en"'

// Option 2: Return error message.
$.li18n.onTranslationMissing = 'message';
$.li18n.translate('spam');
// => 'Missing translation for key "spam" and locale "en"'

// Option 3: Custom error handler.
$.li18n.onTranslationMissing = function(key, currentLocale) {
  if (currentLocale === 'de') {
    return 'Übersetzung für Schlüssel "' + key + '" fehlt';
  } else {
    return 'Missing translation for key "' + key + '" is missing';
  }
};
$.li18n.currentLocale = 'de'
$.li18n.translate('spam');
// => 'Übersetzung für Schlüssel "spam" fehlt'
```

---

#### Rails integration

First install `jquery.li18n` with Bower and link it.

```bash
bower install jquery.li18n
ln -s bower_components/jquery.li18n/jquery.li18n.js app/assets/javascripts/
```

In this example we'll use german locales, so create `config/locales/de.yml` or otherwise `I18n` would raise an error.
Then setup an example controller:

```ruby
# config/routes.rb
MyApp::Application.routes.draw do
  root to: 'home#index'
end

# app/controllers/home_controller.rb
class HomeController < ApplicationController
  before_filter { I18n.locale = params.fetch(:locale, :en) }
end
```

Setup layout and set current locale:

```erb
<!DOCTYPE html>
<html>
<head><title>My App</title></head>
<body data-current-locale="<%= I18n.locale %>">
  <h1 id="greeting"></h1>
  <p id="remark"></p>
  <%= javascript_include_tag 'application' %>
</body>
</html>
```

Now you can use Li18n:

```coffeescript
# app/assets/javascripts/locales/en.coffee
$ -> $.extend $.li18n.translations, en:
  greeting: 'Hello %{{name}}'
  remark: 'It is nice to see you again!'

# app/assets/javascripts/locales/de.coffee
$ -> $.extend $.li18n.translations, de:
  greeting: 'Hallo %{{name}}'
  remark: 'Es ist schön dich wieder zu sehen!'

# app/assets/javascripts/application.coffee
#= require jquery
#= require jquery_ujs
#= require jquery.li18n
#= require_tree ./locales
#= require_self
$ ->
  $.li18n.currentLocale = $('body').data 'current-locale'
  $('#greeting').text _t('greeting', name: 'Alice')
  $('#remark').text _t('remark')
```

Now start the server, navigate to [http://localhost:3000?locale=en](http://localhost:3000?locale=en)
and you'll see the english version.
If you navigate to [http://localhost:3000?locale=de](http://localhost:3000?locale=de), 
then you'll see the german version.
