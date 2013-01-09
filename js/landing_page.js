/*!
 * Sticky Section Headers
 *
 * Copyright (c) 2012 Florian Plank (http://www.polarblau.com/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * USAGE:
 *
 * $('#container').stickySectionHeaders({
 *   stickyClass      : 'sticky',
 *   headlineSelector : 'strong'
 * });
 *
 */

(function($) {
	$.fn.stickySectionHeaders = function(options) {

		var settings = $.extend({
			stickyClass : 'sticky',
			headlineSelector : 'strong'
		}, options);

		return $(this).each(function() {
			var $this = $(this);
			$(this).find('ul:first').bind('scroll.sticky', function(e) {
				$(this).find('> li').each(function() {
					var $this = $(this), top = $this.position().top, height = $this.outerHeight(), $head = $this.find(settings.headlineSelector), headHeight = $head.outerHeight();

					if(top < 0) {
						$this.addClass(settings.stickyClass).css('paddingTop', headHeight);
						$head.css({
							'top' : (height + top < headHeight) ? (headHeight - (top + height)) * -1 : '',
							'width' : $this.outerWidth() - $head.cssSum('paddingLeft', 'paddingRight')
						});
					} else {
						$this.removeClass(settings.stickyClass).css('paddingTop', '');
					}
				});
			});
		});
	};
	/* A little helper to calculate the sum of different
	 * CSS properties
	 *
	 * EXAMPLE:
	 * $('#my-div').cssSum('paddingLeft', 'paddingRight');
	 */
	$.fn.cssSum = function() {
		var $self = $(this), sum = 0;
		$(arguments).each(function(i, e) {
			sum += parseInt($self.css(e) || 0, 10);
		});
		return sum;
	};
})(jQuery);

$('#sticky-list').stickySectionHeaders({
	stickyClass : 'sticky',
	headlineSelector : 'strong'
});
$("img").imglazyload({container:"#sticky-list"});

//tab switcher
(function($) {
	if($(".tabbox") && $(".tabcon_container")) {
		var tabbox = $(".tabbox");
		var tabcon = $(".tabcon_container");
		tabbox.find("li").click(function() {
			var ele = $(this);
			var tabindex = ele.index();
			ele.addClass("on").siblings().removeClass("on");
			tabcon.find(".sticky-list").eq(tabindex).addClass("on").siblings().removeClass("on")
				.end().find("img").imglazyload();
				//alert(1);
			tabcon.find(".on").stickySectionHeaders({
					stickyClass : 'sticky',
					headlineSelector : 'strong'
				});//alert(tabcon.find(".on").html());
			
		});
	}
})(jQuery);
//tab switcher ends