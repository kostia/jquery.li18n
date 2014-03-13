# API

##### $.li18n.currentLocale = locale

Set the current locale.

Default is `'en'`.

```javascript
$.li18n.currentLocale = 'de';
```

---

##### $.li18n.fallbackLocale = locale

Set the fallback locale.

Default is `null`.

```javascript
$.li18n.fallbackLocale = 'en';
```

---

##### $.li18n.translations = translations

Set the translations.

Default is `{}`.

```javascript
$.li18n.translations = {en: {greeing: 'Hello %{{name}}'}};
```

---

##### $.li18n.translate(key, interpolationOptions)

Translates the given key using interpolation options.

Params:
  * key - translation lookup key (`String`).
  * interpolationOptions - options for translations with interpolation (`Object`).

Returns:
  * translation (`String`) if found.
  * error message (`String`) if translation not found and `$.li18n.onTranslationMissing` is set to `'message'`.
  * value from `$.li18n.onTranslationMissing` if translation not found and `$.li18n.onTranslationMissing` is set to a function.
  * throws an error if translation is not found and `$.li18n.onTranslationMissing` is not set.

```javascript
$.li18n.translate('greeting', {name: 'Alice'});
// => 'Hello Alice!'
```

---

##### $.li18n._localize = function(object, format, currentLocale, localizationKey, options)

Set the localize function.
This function will be called to do the actual localization,
when the function `$.li18n.localize` is called.

Default is `null`.

Params:
  * object - is the object to be localized. By default only `Date` objects are supported.
  * format - is the localization format for the given object.
  * currentLocale - is the current locale.
  * localizationKey - is the key under which the format for localization has been looked up.
    All localization keys are stored in the `l10n` key in the translations object.
    By default only `Date` objects have localization keys.
    A key of a `Date` object is `date`.
  * options - are the options provided to the function `$.li18n.localize`.

```javascript
$.li18n.translations = {en: {l10n: {date: 'LL'}}};
$.li18n._localize = function(object, format, currentLocale) {
  return moment(object).lang(currentLocale).format(format);
};
$.li18n.localize(new Date('1971.01.0.1'));
// => 'January 1 1971'
```

---

##### $.li18n.localize(object, options)

Localize the given object using options.
When this function is called, the format localization format is looked up
and the function `$.li18n._localize` is called with the `object` and the looked up format is called.

Params:
  * object - is the object to be localized.
  * options - are the options provided to the function `$.li18n.localize`.

```javascript
$.li18n.translations = {en: {l10n: {date: 'LL'}}};
$.li18n._localize = function(object, format, currentLocale) {
  return moment(object).lang(currentLocale).format(format);
};
$.li18n.localize(new Date('1971.01.0.1'));
// => 'January 1 1971'
```

---
