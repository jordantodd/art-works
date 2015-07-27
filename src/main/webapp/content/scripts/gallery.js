(function($j) {

	/**
	 * The Gallery Article
	 */
	$j.Gallery = function(ARTICLE, article$) {
		var gallery = this;
		
		//check preconditions
		if(ARTICLE  === undefined
		|| article$ === undefined) {
			console.error(" %#$%^@#^&  - Where in the heck are the ARTICLE and article$?  Found %o and %o", ARTICLE, article$);
			return;
		}

		//create references to model
		gallery.$article = $j(ARTICLE);
		gallery.ARTICLE = ARTICLE;
		gallery.$article.data("gallery", gallery);
		gallery.$article.data("article$", article$);
		
		//HEADER
		//gallery.$header = gallery.$article.children("HEADER");
		gallery.$footer = gallery.$article.children("FOOTER");
		
		//SECTIONs
		gallery.$figures = gallery.$article.children("FIGURE");
		//gallery.$topicPanel = gallery.$article.children("DIV.topic.panel");
		//gallery.$gallerySection = gallery.$topicPanel.children("SECTION#gallery");
		//gallery.$searchForm = gallery.$gallerySection.children("FORM.topicInput");
		//gallery.$createButton = gallery.$gallerySection.find("BUTTON.create");
		
		//FOOTER
		gallery.$footer = gallery.$article.children("FOOTER");		
		gallery.$nextButton = gallery.$footer.children("BUTTON[name='next']");
		gallery.$previousButton = gallery.$footer.children("BUTTON[name='previous']");

		/**
		 * 
		 */
		gallery.selectImage = function(image$, event, extras) {
			console.debug("Selected the following image: %o", image$);
		};
		
		/**
		 * Displays the previous image in the gallery. 
		 */
		gallery.handlePreviousEvent = function(event) {
			console.debug("Previous button triggered.");
			$target = gallery.$figures.filter(":visible");
			$target.hide();
			
			var $previousElement = $target.prev("FIGURE");
		    if (!$previousElement.length) {
		    	$previousElement = gallery.$figures.last();
		    }
		    $previousElement.show();
		}
		
		/**
		 * Displays the next image in the gallery. 
		 */
		gallery.handleNextEvent = function(event) {
			console.debug("Next button triggered.");
			$target = gallery.$figures.filter(":visible");
			$target.hide();
			
			var $nextElement = $target.next("FIGURE");
		    if (!$nextElement.length) {
		    	$nextElement = gallery.$figures.first();
		    }
		    $nextElement.show();
		}
		
		/**
		 * Initialize the gallery functionality.
		 */
		gallery.initialize = function() {			
			try {
				//SECTIONs
				//				gallery.$gallerySection.task({
				//					'type': 'find-data',
				//					'options': wizard$.options,
				//					'handleResults': gallery.saveCriteria,
				//					'handleResultSelection': gallery.selectPerson
				//				});
				
				// TODO: build out gallery dynamically with supplied settings. 
				
				gallery.$figures.hide();
				gallery.$figures.first().show();
				
				// bind event listeners
				gallery.$nextButton.on("click", gallery.handleNextEvent);
				gallery.$previousButton.on("click", gallery.handlePreviousEvent);
				gallery.$figures.on("swipeleft", gallery.handleNextEvent);
				gallery.$figures.on("swiperight", gallery.handlePreviousEvent);
			}
			catch (exception) {
				console.error("Unable to initialize galleryWizard.", exception);
			}
		};
	
		gallery.initialize();
	};

	/**
	 * Constructor for the Person Search Article Plugin
	 */
	$j.fn.gallery = function(custom$) {

		var $article = this;
		
		//default configuration
		var default$ = {};
		
		return $article.each(function() {
			var gallerySettings$ = $j.extend({}, default$, custom$);
			(new $j.Gallery(this, gallerySettings$));
		});
	};
	
})(jQuery);