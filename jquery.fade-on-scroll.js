/**
 * Fade Content on Scroll.
 */

;(function($, window, document, undefined) {
  'use strict';

  // Create the defaults once
  var pluginName = 'fadeContentOnScroll'
    , defaults = {
      elements: null,
      threshold: 0.4,
      length: 400,
      delay: 250,
      startClass: 'fade-start',
      readyClass: false
    };

  function deCase(s) {
    return s.replace(/[A-Z]/g, function(a) { return '-' + a.toLowerCase(); });
  }

  /**
   * Plugin constructor.
   *
   * @param {HTMLElement} el
   * @param {object} options
   * @constructor
   */
  function FadeOnScroll(el, options) {
    // Save element.
    this.el = el;

    // Build settings for this instance.
    this.settings = $.extend({}, defaults, this._attributeOptions(), options);

    // Set the exact elements to animate.
    this.$el = this.settings.elements ? $(this.el).find(this.settings.elements) : $(this.el);

    this.init();
  }

  /**
   * Parse options from element attributes.
   *
   * @returns {{}}
   * @private
   */
  FadeOnScroll.prototype._attributeOptions = function() {
    var attributes = {}
      , $el = $(this.el)
      ;
    for (var name in defaults) {
      if (defaults.hasOwnProperty(name)) {
        var attr = 'data-fade-' + deCase(name)
          , val = $el.attr(attr)
          ;
        if (typeof val === 'undefined') {
          continue;
        }
        attributes[name] = val;
      }
    }

    if (attributes.threshold) {
      attributes.threshold = parseFloat(attributes.threshold);
    }
    if (attributes.length) {
      attributes.length = parseInt(attributes.length);
    }
    if (attributes.delay) {
      attributes.delay = parseInt(attributes.delay);
    }
    return attributes;
  };

  /**
   * Init element.
   */
  FadeOnScroll.prototype.init = function() {
    var P = this
      , $W = $(window)
      ;

    // Add start class.
    P.$el.addClass(P.settings.startClass);

    // Register event handler.
    $W.on('scroll.fade-on-scroll', function(ev) {
      var top = P.$el.first().offset().top
        , height = P.$el.first().outerHeight()
        , threshold = top + (height * P.settings.threshold)
        ;
      if ($W.scrollTop() + $W.height() < threshold) {
        return;
      }

      var timer = 0;
      P.$el.each(function(i, n){
        setTimeout(function() { P._fade(n); }, timer);
        timer += P.settings.delay;
      });
    });

    // Make sure already visible elements marked as loaded.
    $W.trigger('scroll.fade-on-scroll');

    // Let others handle init events.
    // Element is initialized.
    $(P.el).trigger('fade-on-scroll.init');

    // Elements to fade are initialized.
    P.$el.trigger('fade-on-scroll.init-element');
  };

  /**
   * Fade the item in.
   *
   * @param {HTMLElement} item
   * @private
   */
  FadeOnScroll.prototype._fade = function(item) {
    var S = this.settings
      , $i = $(item)
      ;
    // For start remove class. If there is any loading animation
    // or transition it should handled by CSS.
    $i.removeClass(S.startClass);

    $i.trigger('fade-on-scroll.loading');
    setTimeout(function(){
      // If fading is ready mark element as ready.
      if (S.readyClass) {
        $i.addClass(S.readyClass);
      }
      $i.trigger('fade-on-scroll.loaded');
    }, S.length);
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new FadeOnScroll(this, options));
      }
    });
  };

  $(document).on('ready', function(){
    $('[data-toggle="fade-on-scroll"]')[pluginName]();
  });

})(jQuery, window, document);
