window = require('jsdom').jsdom().createWindow();
document = window.document;
jQuery = require('jquery');
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

    describe('if translations for current locale is missing', function() {
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
});
