/*
 *  JQUERY CAROUSEL 
 *  ADAPTED BY SHAUN HARE FROM REMY SHARP'S EXAMPLE
 *  VERSION 1.0.NEARLY
 */

(function($){
	
	$.fn.carousel = function (options) {
		
		var opts = $.extend({}, $.fn.carousel.defaults, options);
		
		function repeat(str, n) {
			  return new Array( n + 1 ).join( str );
			}
		var self = this; 
		
	    return this.each(function () {
	      
	    	/*
	    	 * Set up the variables
	    	 */
	    	var $wrapper = $('> div', this).css('overflow', 'hidden'),
	    	$slider = $wrapper.find('> ul'),
	    	$items = $slider.find('> li'),
	    	$single = $items.filter(':first')
	    	// outerWidth: width + padding (doesn't include margin)
			singleWidth = $single.outerWidth(), 
			  
			// note: doesn't include padding or border
			visible = Math.ceil($wrapper.innerWidth() / singleWidth), 
			currentPage = 1,
			pages = Math.ceil($items.length / visible);
	    	
	    	if (($items.length % visible) != 0) {
	    		  $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
	    		  $items = $slider.find('> li');
	    		}
	    	
	    	$items.filter(':first').before($items.slice(-visible).clone().addClass('cloned'));
	    	$items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
	    	$items = $slider.find('> li'); // reselect
	    	
	    	$items.slice(-visible);
	    	
	    	$wrapper.scrollLeft(singleWidth * visible);
	    	
	    	function gotoPage(page) {
	    		  var dir = page < currentPage ? -1 : 1,
	    		    n = Math.abs(currentPage - page),
	    		    left = singleWidth * dir * visible * n;
	    		  
	    		  $wrapper.filter(':not(:animated)').animate({
	    		    scrollLeft : '+=' + left
	    		  }, 500, function () {
	    		    if (page == 0) {
	    		      $wrapper.scrollLeft(singleWidth * visible * pages);
	    		      page = pages;
	    		    } else if (page > pages) {
	    		      $wrapper.scrollLeft(singleWidth * visible);
	    		      page = 1;
	    		    } 

	    		    currentPage = page;
	    		  });                
	    		  
	    		  return false;
	    		}
	    	
	    	$wrapper.after('<a class="arrow back">&lt;</a><a class="arrow forward">&gt;</a>');
	    	
	    	/** added keyboard navigation **/
	    	$(document.documentElement).keyup(function (event) {
	    	if (event.keyCode == 37 ){
	    	    // go left by triggering back click
	    		$(opts.previous).trigger("click");
	    	  } else if (event.keyCode == 39) {
	    	    // go right
	    		  $(opts.next).trigger("click");
	    	  }
	    	});
	    	
	    	$(opts.previous, this).click(function () {
	    	    return gotoPage(currentPage - 1);                
	    	});

	    	$(opts.next, this).click(function () {
	    	    return gotoPage(currentPage + 1);
	    	});

	    	// this currently refers to the element the plugin was bound to
	    	$(self).bind('goto', function (event, page) {
	    	    gotoPage(page);
	    	});
	    	
	    	if(opts.auto)
	    	{
	    		$(self).bind('next', function () {
	    			  gotoPage(currentPage + 1);
	    			});
	    		
	    		var autoscrolling = true;

	    		$(self).carousel().mouseover(function () {
	    		  autoscrolling = false;
	    		}).mouseout(function () {
	    		  autoscrolling = true;
	    		});

	    		setInterval(function () {
	    		  if (autoscrolling) {
	    		    $(self).trigger('next');
	    		  }
	    		}, 2000);
	    	}
	    	
	    });
	    
	    $.fn.carousel.defaults= {
	    	auto:false
	    	
	    }; 
	  };
})(jQuery); 

$(document).ready(function () {
	$(".infiniteCarousel").carousel(options={auto:true});
});
