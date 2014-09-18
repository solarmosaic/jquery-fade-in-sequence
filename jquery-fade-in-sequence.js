jQuery(function($) {

    /**
     * Fade in a group of elements sequentially, with options for speed and looping.
     */

    var defaults = {
        duration: 500,
        loopEnabled: false,
        loopTimeout: 4000
    };

    $.fn.fadeInSequence = function(options) {
        var $items = this.children();
        var settings = $.extend( {}, defaults, options );
        var index = 0;
        var lastIndex = $items.length - 1;

        // Hide items to start.
        $items.hide();

        (function fadeInCallNext() {
            $items.eq(index).fadeIn(settings.duration, function() {

                // Check if sequence has finished.
                if (index == lastIndex) {

                    // Restart if necessary.
                    if (settings.loopEnabled) {
                        setTimeout(function() {
                            index = 0;
                            $items.fadeOut(settings.duration).delay(settings.duration * 2);
                            fadeInCallNext();
                        }, settings.loopTimeout);
                    }

                } else {
                    index++;
                    fadeInCallNext();
                }
            });
        })();
    };

    $(function() {
        // Automatically initialize Fade In Sequence behavior based on class and data attributes.
        $(".fade-in-sequence").each(function() {
            var $group = $(this);
            var options = {};
            options.duration = $group.data("fade-in-sequence-duration");
            options.loopEnabled = $group.data("fade-in-sequence-loop-enabled");
            options.loopTimeout = $group.data("fade-in-sequence-loop-timeout");
            $group.fadeInSequence(options);
        });
    });
});