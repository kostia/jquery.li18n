# HOWTOs

#### Basic Usage http://jsfiddle.net/pf59z/1/

```javascript
$.li18n.translations = {de: {greeting: 'Hallo %{{name}}'}};
$.li18n.currentLocale = 'de';
$.li18n.translate('greeting', {name: 'Alice'});
// => 'Hallo Alice'
```

---

#### Shortcuts http://jsfiddle.net/pf59z/1/

```javascript
_t('spam');
// => 'eggs'

_l(new Date('1971.01.01'));
// => 'January 1 1971'
```

---

#### Localization with Moment.js http://jsfiddle.net/5zaaw/1/

```javascript
$.li18n.translations = {en: {l10n: {date: 'LL'}}};
$.li18n._localize = function(object, format, currentLocale) {
  return moment(object).lang(currentLocale).format(format);
};
$.li18n.localize(new Date('1971.01.0.1'));
// => 'January 1 1971'
```

---

#### Handlebars Helpers http://jsfiddle.net/9uYkR/1/

```javascript
Handlebars.registerHelper('_t', $.li18n.translate);
Handlebars.registerHelper('_l', $.li18n.localize);
```

---

#### Fallbacks Language http://jsfiddle.net/xeAQC/1/

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

#### Handling Missing Translations http://jsfiddle.net/knH65/2/

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


