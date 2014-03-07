;(function($) {
  $.li18n = {
    _translate: function(key) {
      var promise = $.Deferred();
      var translations = $.li18n.locales[$.li18n.locale];

      if (translations) {
        var translation = translations[key];

        if (translation) {
          promise.resolve(translation);
        } else {
          promise.reject();
        }
      } else {
        promise.reject();
      };

      return promise;
    },

    translate: function(key) {
      return $.li18n._translate(key);
    },

    reset: function() {
      $.li18n.locales = {};
      $.li18n.locale = 'en';
    }
  };

  $.li18n.reset();

  window._t = function(key) {
    return $.li18n.translate(key).fail(function() {
      $.error('Missing translation for "' + key + '"');
    });
  };
})(jQuery);
