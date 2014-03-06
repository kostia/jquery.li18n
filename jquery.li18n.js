;(function($) {
  $.li18n = {
    locales: {},
    locale: 'en',
    translate: function(key) {
      var promise = $.Deferred();
      var translation = $.li18n.locales[$.li18n.locale][key];

      if (translation) {
        promise.resolve(translation);
      } else {
        promise.reject();
      }

      return promise;
    }
  };
})(jQuery);
