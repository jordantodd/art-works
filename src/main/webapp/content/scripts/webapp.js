(function($j) {

	/**
	 * A WebApp manages the user experience.
	 *
	 * View Layer - Front Controller.
	 */
	$j.WebApp = function(WEBAPP, webapp$) {
		var webapp = this;
		webapp.$webapp = $j(WEBAPP);
		webapp.WEBAPP = WEBAPP;
		webapp.$webapp.data("webapp", webapp);
		webapp.$header = webapp.$webapp.children("HEADER");
		webapp.$nav = webapp.$header.children("NAV#siteNav");
		webapp.$navMenu = webapp.$nav.children("MENU");
		webapp.$navMenuItems = webapp.$nav.find("A");
		webapp.$menuToggleButton = webapp.$nav.children("BUTTON#menuToggle");
		
		webapp.$section = webapp.$webapp.children("SECTION");
		webapp.$articles = webapp.$section.children("ARTICLE");
		webapp.$defaultArticle = webapp.$section.children(webapp$._defaultArticle);
		webapp.$footer = webapp.$webapp.children("FOOTER");
		webapp.$colorPicker = webapp.$footer.find("FIELDSET#theme INPUT");

		/**
		 * Activate a given article. 
		 */
		webapp.activateArticle = function($article) {
			
			try {
				console.debug("Handling the openArticle event %o for this %o.", $article, this);
				webapp.closeAllArticles();
				
				webapp.$webapp.requestJSON({
					"uri": "content/scripts/gallerySettings.json",
					"type": "GET"
				})
				.done(function(results$) {
					console.debug("Article settings: %o ", results$);
					var article$ = results$;
					//var $article = webapp.$defaultArticle;
					$article.gallery(article$); // TODO: add this plugin dynamically
					$article.show();
				}).fail(function() {
					console.error("Failed to load context.");
				}).always(function() {
					// nothing
				});
			}
			catch(error) {
				console.error("Unable to openArticle because: %o", error);
			}
			
			//after article loaded scroll to top of page
			window.scrollTo(0,0);			
		}
		
		/**
		 * Close all articles
		 */
		webapp.closeAllArticles = function() {
			console.debug("close article event triggered.");
			webapp.$articles.hide();
		}
		
		/**
		 * Set the color for an element
		 * @param $element
		 * @param attribute
		 * @param value
		 */
		webapp.setColor = function($element, attribute, value) {
			console.debug("Set color value event triggered.")
			$element.css(attribute, value);
		}
	
		/**
		 * Toggle the display state of an element
		 * @param $element
		 */
		webapp.toggleDisplay = function(element) {
			console.debug(element);
			$(element).toggle("slide");
			//element.style.display = (element.style.display != 'none' ? 'none' : '' );				
		}
		
		/**
		 * Handle nav menu event
		 * @param event
		 * @param details
		 */
		webapp.handleNavMenuEvent = function(event, details) {
			console.debug("handle nav menu event triggered.");
			console.debug(event);
			event.preventDefault();
			
			webapp.closeAllArticles();
			var articleId = $j(event.currentTarget).attr("href");
			var $article = $j("ARTICLE#"+articleId);
			
			webapp.activateArticle($article);
			
			// reset menu
			webapp.$menuToggleButton.trigger("click");
		};
		
		/**
		 * Handle color change event
		 * @param event
		 */
		webapp.handleColorChangeEvent = function(event) {
			console.debug("handle color change event triggered.");
			console.debug(event);
			
			$target = $j(event.currentTarget);
			selector = $target.data("selector");
			$element = $j(selector);
			var attribute = $target.data("attribute");
			var value = $target.val();
			webapp.setColor($element, attribute, value);
			
			$label = $target.parent();
			$label.children("SPAN").html("Hex: "+value);
			
		}
		
		/**
		 * Handle menu toggle event
		 * @param event
		 */
		webapp.handleMenuToggleEvent = function(event) {
			console.debug("handle menu toggle event triggered.");	
			console.debug(event);	
			webapp.toggleDisplay(webapp.$navMenu.get(0));
		}

		/**
		 * Bootstrap the system webapp
		 */
		webapp.bootstrap = function() {
			try {
				console.info("The navigator.userAgent is %o", navigator.userAgent);
				
				// set initial display state
				webapp.$navMenu.hide();
				webapp.activateArticle(webapp.$defaultArticle);
				
				// bind mouse event listeners
				webapp.$navMenuItems.click(webapp.handleNavMenuEvent);
				webapp.$menuToggleButton.click(webapp.handleMenuToggleEvent);
				webapp.$colorPicker.change(webapp.handleColorChangeEvent);	
				
				// bind touch event listeners
				webapp.$navMenu.on("swipe", webapp.handleMenuToggleEvent);
			}
			catch(exception) {
				console.error("Unable to bootstrap webapp due to %o.", exception);
			}
		};

		// custom events
		//webapp.$webapp.on("webapp.openArticle", webapp.openArticle);

		/**
		 * Start bootstrapping webapp now!
		 */
		webapp.bootstrap();
	};

	/**
	 * JQuery Plugin Constructor for WebApp
	 *
	 * For each element selected, construct a webapp.
	 */
	$j.fn.webapp = function(custom$) {
		var $this = this;
		var webapp = $this.data('webapp');
		if( webapp ){
			return $this;
		}
		else {
			var default$ = {};
			default$._defaultArticle = "ARTICLE#gallery";
//			default$._webapp 			= "BODY.webapp";
//			default$._commands 			= "NAV#siteNav LI";//evaluate
//			default$._controlPanel 		= "SECTION#controlPanel";
//			default$._activity 			= "SECTION#activity";
//
//			default$._headerPanel 		= "BODY HEADER";
//			default$._footerPanel 		= "BODY FOOTER";
//			default$._mainMenuPane 		= "BODY HEADER NAV#webappWizard DIV.topToolbar";
//			default$._copyrightNotice	= "P#copyrightNotice";

			var webapp$ = $j.extend({}, default$, custom$);
			return $this.each(function() {
				(new $j.WebApp(this, webapp$));
			});
	   }
	};

})(jQuery);