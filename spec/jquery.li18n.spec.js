window = require('jsdom').jsdom().createWindow();
document = window.document;
jQuery = require('jquery');
$ = jQuery;
jqueryJasmine = require('jasmine-jquery');

require('../jquery.li18n');

describe('$.li18n', function() {
  describe('default locale', function() {
    it('is "en"', function() {
      expect($.li18n.locale).toBe('en');
    });
  });

  describe('default locales', function() {
    it('is an empty object', function() {
      expect($.li18n.locales).toEqual({});
    });
  });

  describe('.translate', function() {
    beforeEach(function() {
      $.li18n.locales = {
        en: {
          title: 'Hello!',
          description: 'I am lightweight i18n for jQuery.'
        },
        de: {
          title: 'Hallo!',
          description: 'Ich bin eine leichgewichtige I18n für jQuery.'
        }
      };
    });

    describe('if key is found', function() {
      it('resolves with translation', function() {
        var promiseResolved = false;
        var promiseRejected = false;

        $.li18n.translate('title')
        .done(function(translation) {
          promiseResolved = true;
          expect(translation).toBe('Hello!');
        })
        .fail(function() {
          promiseRejected = true;
        });

        expect(promiseResolved).toBe(true);
        expect(promiseRejected).toBe(false);

        var promiseResolved = false;
        var promiseRejected = false;

        $.li18n.translate('description')
        .done(function(translation) {
          promiseResolved = true;
          expect(translation).toBe('I am lightweight i18n for jQuery.');
        })
        .fail(function() {
          promiseRejected = true;
        });

        expect(promiseResolved).toBe(true);
        expect(promiseRejected).toBe(false);
      });
    });

    describe('if key is not found', function() {
      it('rejects with no arguments', function() {
        var promiseResolved = false;
        var promiseRejected = false;

        $.li18n.translate('missing')
        .done(function(translation) {
          promiseResolved = true;
        })
        .fail(function(args) {
          promiseRejected = true;
          expect(args).toBe(undefined);
        });

        expect(promiseResolved).toBe(false);
        expect(promiseRejected).toBe(true);
      });
    });
  });
});
