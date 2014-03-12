window = require('jsdom').jsdom().createWindow();
document = window.document;
jQuery = require('jquery');
moment = require('../bower_components/moment/moment');
$ = jQuery;
jqueryJasmine = require('jasmine-jquery');

require('../jquery.li18n');

describe('$.li18n', function() {
  beforeEach(function() {
    $.li18n.reset();
  });

  describe('default current locale', function() {
    it('is "en"', function() {
      expect($.li18n.currentLocale).toBe('en');
    });
  });

  describe('default translations', function() {
    it('is an empty object', function() {
      expect($.li18n.translations).toEqual({});
    });
  });

  it('has a version', function() {
    expect($.li18n.version).toMatch(/\d\.\d.\d/);
  });

  describe('._translate', function() {
    describe('if curren locale is missing', function() {
      it('throws an error', function() {
        $.li18n.currentLocale = null;
        expect(function() {
          $.li18n._translate('spam');
        }).toThrow('Missing current locale');
      });
    });

    describe('if translations are missing', function() {
      it('throws an error', function() {
        $.li18n.translations = null;
        expect(function() {
          $.li18n._translate('spam');
        }).toThrow('Missing translations');
      });
    });

    describe('if translations for current locale are missing', function() {
      it('throws an error', function() {
        $.li18n.translations = {};
        expect(function() {
          $.li18n._translate('spam');
        }).toThrow('Missing translations for current locale "en"');
      });
    });

    describe('if key is missing', function() {
      it('throws an error', function() {
        $.li18n.translations = {en: {}};
        expect(function() {
          $.li18n._translate();
        }).toThrow('Tried to translate with an empty key');
      });
    });

    describe('if translation is missing', function() {
      it('returns undefined', function() {
        $.li18n.translations = {en: {}};
        expect($.li18n._translate('spam')).toBe(undefined);
      });

      describe('with a fallback locale enabled', function() {
        beforeEach(function() {
          $.li18n.currentLocale = 'de';
          $.li18n.fallbackLocale = 'en';
        });

        describe('and fallback translation is missing', function() {
          it('returns undefined', function() {
            $.li18n.translations = {en: {}, de: {}};
            expect($.li18n._translate('spam')).toBe(undefined);
          });
        });

        describe('and fallback translation is present', function() {
          it('returns the translation', function() {
            $.li18n.translations = {en: {spam: 'eggs'}, de: {}};
            expect($.li18n._translate('spam')).toBe('eggs');
          });
        });
      });
    });

    describe('if translation is present', function() {
      it('returns the translation', function() {
        $.li18n.translations = {en: {spam: 'eggs'}};
        expect($.li18n._translate('spam')).toBe('eggs');
      });

      describe('with interpolation options', function() {
        beforeEach(function() {
          $.li18n.translations = {en: {spam: 'eggs %{{foo}} eggs %{{bar}} eggs'}};
        });

        it('returns interpolated translation', function() {
          expect($.li18n._translate('spam', {foo: 'xxx', bar: 'yyy'}))
            .toBe('eggs xxx eggs yyy eggs');
        });

        describe('and too less options', function() {
          it('throws an error', function() {
            expect(function() {
              $.li18n._translate('spam', {foo: 'xxx'});
            }).toThrow('Too less interpolation options for key "spam"');
          });
        });
      });
    });
  });

  describe('.translate', function() {
    describe('if translation is missing', function() {
      it('throws an error', function() {
        $.li18n.translations = {en: {}};
        expect(function() {
          $.li18n.translate('spam');
        }).toThrow('Missing translation for key "spam"');
      });
    });

    describe('if translation is present', function() {
      it('returns the translation', function() {
        $.li18n.translations = {en: {spam: 'eggs'}};
        expect($.li18n.translate('spam')).toBe('eggs');
      });
    });
  });

  describe('window._t', function() {
    it('delegates to $.li18n.translate', function() {
      $.li18n.translations = {en: {spam: 'eggs'}};
      expect(window._t('spam')).toBe('eggs');
    });
  });

  describe('.localize', function() {
    describe('if current locale is missing', function() {
      it('throws an error', function() {
        $.li18n.currentLocale = null;
        expect(function() {
          $.li18n.localize(new Date());
        }).toThrow('Missing current locale');
      });
    });

    describe('if translations are missing', function() {
      it('throws an error', function() {
        $.li18n.translations = null;
        expect(function() {
          $.li18n.localize(new Date());
        }).toThrow('Missing translations');
      });
    });

    describe('if translations for current locale are missing', function() {
      it('throws an error', function() {
        $.li18n.translations = {};
        expect(function() {
          $.li18n.localize(new Date());
        }).toThrow('Missing translations for current locale "en"');
      });
    });

    describe('if object is missing', function() {
      it('throws an error', function() {
        $.li18n.translations = {en: {}};
        expect(function() {
          $.li18n.localize();
        }).toThrow('Tried to localize an empty object');
      });
    });

    describe('if localizations for current locale are missing', function() {
      it('throws an error', function() {
        $.li18n.translations = {en: {}};
        expect(function() {
          $.li18n.localize(new Date());
        }).toThrow('Missing localizations for current locale "en"');
      });
    });

    describe('with no localization function', function() {
      it('throws an error', function() {
        $.li18n.translations = {en: {l10n: {date: 'LLLL'}}};
        expect(function() {
          $.li18n.localize(new Date());
        }).toThrow('Missing localization function $.li18n._localize');
      });
    });

    describe('with a localization function', function() {
      beforeEach(function() {
        $.li18n.translations = {en: {l10n: {date: 'LLLL', dateShort: 'LL', dateVeryShort: 'L'}}};
        $.li18n._localize = function(object, format, currentLocale, key, options) {
          var localization = moment().lang(currentLocale).format(format) + key;
          if (options && options.spam) {
            localization += options.spam;
          }
          return localization;
        };
      });

      describe('and no localization key', function() {
        it('localizes with correct format', function() {
          var date = new Date();
          localization = moment(date).format('LLLL') + 'date';
          expect($.li18n.localize(date)).toBe(localization);
        });
      });

      describe('and localization key string', function() {
        it('localizes with correct format', function() {
          var date = new Date();
          date.l10nKey = 'dateShort';
          localization = moment(date).format('LL') + 'dateShort';
          expect($.li18n.localize(date)).toBe(localization);
        });
      });

      describe('and a localization key function', function() {
        it('localizes with correct format', function() {
          var date = new Date();
          date.l10nKey = function() { return 'dateVeryShort'; };
          localization = moment(date).format('L') + 'dateVeryShort';
          expect($.li18n.localize(date)).toBe(localization);
        });
      });

      describe('and a localization key function with options', function() {
        it('localizes with correct format', function() {
          var date = new Date();
          date.l10nKey = function(options) { return options.realKey; };
          localization = moment(date).format('L') + 'dateVeryShort';
          expect($.li18n.localize(date, {realKey: 'dateVeryShort'})).toBe(localization);
        });
      });

      describe('and localization options', function() {
        it('localizes with correct format', function() {
          var date = new Date();
          localization = moment(date).format('LLLL') + 'dateeggs';
          expect($.li18n.localize(date, {spam: 'eggs'})).toBe(localization);
        });
      });

      describe('and an object with unknown localization key', function() {
        it('throws an error', function() {
          expect(function() {
            $.li18n.localize({});
          }).toThrow("Don't know how to translate \"[object Object]\"");
        });
      });
    });
  });

  describe('window._l', function() {
    it('delegates to $.li18n.localize', function() {
      $.li18n.translations = {en: {l10n: {date: 'LLLL'}}};
      $.li18n._localize = function(object, format, currentLocale, key, options) {
        var localization = moment().lang(currentLocale).format(format) + key;
        if (options && options.spam) {
          localization += options.spam;
        }
        return localization;
      };

      var date = new Date();
      localization = moment(date).format('LLLL') + 'dateeggs';
      expect(window._l(new Date(), {spam: 'eggs'})).toBe(localization);
    });
  });
});
