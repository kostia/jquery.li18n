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

  $.li18n = {
    _translate: function(key) {
      if (!key) {
        return $.error('Tried to translate with an empty key');
      }

      var currentLocale = getCurrentLocale();
      var translationsForLocale = getTranslationsForLocale(currentLocale);

      return translationsForLocale[key];
    },

    translate: function(key) {
      var translation = $.li18n._translate(key);
      if (translation) {
        return translation;
      } else {
        $.error('Missing translation for key "' + key + '"');
      }
    },

    reset: function() {
      $.li18n.translations = {};
      $.li18n.currentLocale = 'en';
    }
  };

  $.li18n.reset();

  if (window) {
    window._t = function(key) {
      return $.li18n.translate(key);
    };
  }
})(jQuery);
