
// Category Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"backbone"
], function( $, Backbone ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {
    	path:"",
    	type:"",
    	sync: function(method, model, options) {

            // Local Variables
            // ===============

            // Instantiates an empty array
            var //articles = [],
                // Stores the this context in the self variable
                self = this,
                // Creates a jQuery Deferred Object
                deferred = $.Deferred(),
                path =self.get("path");
                type =self.get("type");
                title =self.get("title");
            	
            $.soap({
                url: "http://htgl.cnsn.gov.cn/snAndroidWS/services/snAndroidWS?wsdl",
                method: "getContent",
                data: {
                    path: path,
                    type: type
                },
                HTTPHeaders: {
                    //Authorization: 'Basic ' + btoa('test:test')
                },

                //enableLogging: true,

                success: function(SOAPResponse) {
                	var content = SOAPResponse.content.querySelector("out").childNodes[0].textContent;
                	var article ={};
                    article.content = content;
                    article.type = type;
                    article.path = path;
                    article.title = title;
                    //articles[0] = article;
                    options.success(article);
                    self.trigger("change");
                    deferred.resolve();
                },
                error: function(SOAPResponse) {
                    console.log(SOAPResponse.toString());
                    deferred.resolve();
                }
            });
            
            // Returns the deferred object
            return deferred;

        }
    } );

    // Returns the Model class
    return Model;

} );