(function($j) {
	
	/**
	 * Once the html document is ready, construct the webapp plugin.
	 */
	$j(document).ready(function(){
		try {
			var webapp$ = {'_webapp': 'BODY#webapp'};
			var $webapp = $j(webapp$._webapp);
			$webapp.webapp(webapp$);
		}
		catch(exception) {
			console.error("Failed to ready the document.", exception);
		}
	});

})(jQuery);