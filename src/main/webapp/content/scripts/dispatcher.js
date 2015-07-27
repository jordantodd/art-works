(function($j) {
	
	/**
	 * The dispatcher will send an asynchronous request off to the server.
	 * 
	 */
	$j.Dispatcher = function(DISPATCHER, dispatcher$) {
		var dispatcher = this;
		dispatcher.$dispatcher = $j(DISPATCHER);
	
		/**
		 * json files are parsed and returned from the promise
		 */
		dispatcher.send = function( dispatcher$ ) {
			var href = dispatcher$.baseHref + dispatcher$.uri;
			var deferred = $j.Deferred();

			jQuery.ajax({
				url: href,
				type: dispatcher$.type,
				dataType: "json",
				data: dispatcher$.params,
				cache: false
			}).success(function(jsonResult, statusText, response){
					deferred.resolve(jsonResult, statusText, response);
			}).error(function(response, statusText, exception) {
				//TODO add error handling
				console.error("Error retreiving data because: %o", exception);
			});
			return deferred.promise();
		};
	};

	/**
	 * jQuery api constructor:
	 */
	$j.fn.requestJSON = function(custom$) {
		if(custom$ === undefined || custom$.uri === undefined) {
			console.error("The dispatcher requires a uri.  e.g. {'uri': '/path/file.json'}.");
		}
		var $this = this;
		
		//setup default$
		var default$ = {};
		default$._dispatcher = "HEAD BASE";
		default$._base		= "HEAD BASE";
		default$.baseHref	= $j(default$._base).attr("href");
		default$.params		= {};
		default$.type		= "POST";
		default$.uri		= null;
		
		var dispatcher$ = $j.extend({}, default$, custom$);
		var $dispatcher = $j(dispatcher$._dispatcher);
		
		var dispatcher = $dispatcher.data('dispatcher');
		if( dispatcher ){/*already exists. do nothing more*/}
		else {
			dispatcher = new $j.Dispatcher(this, dispatcher$);
			$dispatcher.data("dispatcher", dispatcher);
	    }
		return dispatcher.send(dispatcher$);
	};

})(jQuery);