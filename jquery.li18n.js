;(function($) {
  var assertPresent = function(value, errorMessage) {
    return value ? value : $.error(errorMessage);
  };

  var getCurrentLocale = function() {
    return assertPresent($.li18n.currentLocale, 'Missing current locale');
  };

  var getTranslationsForLocale = function(currentLocale) {
    var translations = assertPresent($.li18n.translations, 'Missing translations');
    return assertPresent(translations[currentLocale],
        'Missing translations for locale "'+currentLocale+'"');
  };

  var getLocalizationsForLocale = function(currentLocale) {
    return assertPresent(getTranslationsForLocale(currentLocale).l10n,
        'Missing localizations for locale "'+currentLocale+'"');
  };

  var calculateLocalizationKey = function(object, options) {
    if (object.l10nKey) {
      return (typeof object.l10nKey === 'function') ? object.l10nKey(options) : object.l10nKey;
    } else {
      return (object instanceof Date) ? 'date' : $.error("Don't know how to localize \""+object+'"');
    }
  };

  var handleMissingTranslation = function(key, currentLocale) {
    var errorMessage = 'Missing translation for key "'+key+'" and locale "'+currentLocale+'"';
    if ($.li18n.onTranslationMissing === 'message') {
      return errorMessage;
    } else if (typeof $.li18n.onTranslationMissing === 'function') {
      return $.li18n.onTranslationMissing(key, currentLocale);
    } else {
      $.error(errorMessage);
    }
  };

  $.li18n = {
    version: '0.1.2',

    _translate: function(key, interpolationOptions) {
      assertPresent(key, 'Tried to translate with an empty key');

      var currentLocale = getCurrentLocale();
      var translationsForLocale = getTranslationsForLocale(currentLocale);
      var translation = translationsForLocale[key];

      if (!translation && $.li18n.fallbackLocale) {
        var fallbackTranslationsForLocale = getTranslationsForLocale($.li18n.fallbackLocale);
        translation = fallbackTranslationsForLocale[key];
      }

      if (interpolationOptions) {
        $.each(interpolationOptions, function(interpolationKey, interpolationValue) {
          var interpolationRegExp = new RegExp('%{{'+interpolationKey+'}}', 'g');
          translation = translation.replace(interpolationRegExp, interpolationValue);
        });

        if (translation.match(/%{{.*}}/)) {
          $.error('Too less interpolation options for key "'+key+'"');
        }
      }

      if (translation) {
        return translation;
      }
    },

    translate: function(key, interpolationOptions) {
      var translation = $.li18n._translate(key, interpolationOptions);
      return translation ? translation : handleMissingTranslation(key, getCurrentLocale());
    },

    localize: function(object, options) {
      assertPresent(object, 'Tried to localize an empty object');

      var currentLocale = getCurrentLocale();
      var localizations = getLocalizationsForLocale(currentLocale);
      var localizationKey = calculateLocalizationKey(object, options);
      var format = localizations[localizationKey];

      assertPresent($.li18n._localize, 'Missing localization function $.li18n._localize');
      return $.li18n._localize(object, format, currentLocale, localizationKey, options);
    },

    reset: function() {
      $.li18n._localize            = null;
      $.li18n.currentLocale        = 'en';
      $.li18n.fallbackLocale       = null;
      $.li18n.onTranslationMissing = null;
      $.li18n.translations         = {};
    }
  };

  $.li18n.reset();

  window._t = $.li18n.translate;
  window._l = $.li18n.localize;
})(jQuery);
