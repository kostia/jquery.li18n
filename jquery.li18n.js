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
        'Missing translations for current locale "' + currentLocale + '"');
  };

  var getLocalizationsForLocale = function(currentLocale) {
    return assertPresent(getTranslationsForLocale(currentLocale).l10n,
        'Missing localizations for current locale "' + currentLocale + '"');
  };

  var calculateLocalizationKey = function(object, options) {
    if (object.l10nKey) {
      if (typeof object.l10nKey === 'function') {
        return object.l10nKey(options);
      } else {
        return object.l10nKey;
      }
    } else {
      if (object instanceof Date) {
        return 'date';
      } else {
        $.error("Don't know how to translate \"" + object + '"');
      }
    }
  };


  $.li18n = {
    version: '0.0.5',

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
          var interpolationRegExp = new RegExp('%{{' + interpolationKey + '}}', 'g');
          translation = translation.replace(interpolationRegExp, interpolationValue);
        });

        if (translation.match(/%{{.*}}/)) {
          $.error('Too less interpolation options for key "' + key + '"');
        }
      }

      if (translation) {
        return translation;
      }
    },

    translate: function(key, interpolationOptions) {
      return assertPresent($.li18n._translate(key, interpolationOptions),
          'Missing translation for key "' + key + '"');
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
      $.li18n._localize      = null;
      $.li18n.currentLocale  = 'en';
      $.li18n.fallbackLocale = null;
      $.li18n.translations   = {};
    }
  };

  $.li18n.reset();

  if (typeof window !== 'undefined') {
    window._t = function(key, interpolationOptions) {
      return $.li18n.translate(key, interpolationOptions);
    };

    window._l = function(object, options) {
      return $.li18n.localize(object, options);
    };
  }
})(jQuery);
