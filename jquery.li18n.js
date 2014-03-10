;(function($) {
  var getCurrentLocale = function() {
    var currentLocale = $.li18n.currentLocale;
    if (currentLocale) {
      return currentLocale;
    } else {
      $.error('Missing current locale');
    }
  };

  var getTranslations = function() {
    var translations = $.li18n.translations;
    if (translations) {
      return translations;
    } else {
      $.error('Missing translations');
    }
  };

  var getTranslationsForLocale = function(currentLocale) {
    var translationsForLocale = getTranslations()[currentLocale];
    if (translationsForLocale) {
      return translationsForLocale;
    } else {
      $.error('Missing translations for current locale "' + currentLocale + '"');
    }
  };

  var getLocalizationsForLocale = function(currentLocale) {
    var localizations = getTranslationsForLocale(currentLocale).l10n;
    if (localizations) {
      return localizations;
    } else {
      $.error('Missing localizations for current locale "' + currentLocale + '"');
    }
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
    version: '0.0.3',

    _translate: function(key, interpolationOptions) {
      if (!key) {
        return $.error('Tried to translate with an empty key');
      }

      var currentLocale = getCurrentLocale();
      var translationsForLocale = getTranslationsForLocale(currentLocale);
      var translation = translationsForLocale[key];

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
      var translation = $.li18n._translate(key, interpolationOptions);
      if (translation) {
        return translation;
      } else {
        $.error('Missing translation for key "' + key + '"');
      }
    },

    localize: function(object, options) {
      if (!object) {
        $.error('Tried to localize an empty object');
      }

      var currentLocale = getCurrentLocale();
      var localizations = getLocalizationsForLocale(currentLocale);
      var localizationKey = calculateLocalizationKey(object, options);
      var format = localizations[localizationKey];

      if (!$.li18n._localize) {
        $.error('Missing localization function $.li18n._localize');
      }

      return $.li18n._localize(object, format, currentLocale, localizationKey, options);
    },

    reset: function() {
      $.li18n.translations = {};
      $.li18n.currentLocale = 'en';
      $.li18n._localize = null;
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
