// Category Collection
// ===================

// Includes file dependencies
define([
    "jquery",
    "jquerysoap",
    "backbone",
    "../models/ArticleModel"
], function($,jquerysoap, Backbone, ArticleModel) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend({

        // The Collection constructor
        initialize: function(models, options) {
            // Sets the type instance property (ie. animals)
            this.category = options.category;

        },

        // Sets the Collection model property to be a Category Model
        model: ArticleModel,

        // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
        sync: function(method, model, options) {

            // Local Variables
            // ===============

            // Instantiates an empty array
            var articles = [],
                // Stores the this context in the self variable
                self = this,
                // Creates a jQuery Deferred Object
                deferred = $.Deferred(),
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
            if (self.category=="category1") {
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
                type=0;
            };
            if (self.category=="category2") {
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
                type=0;
            };
            if (self.category=="category3") {
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
                type=0;
            };
            if (self.category=="category4") {
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
                type=0;
            };
            if (self.category=="category5") {
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
                type=0;
            };
            if (self.category=="category6") {
                channelId = "15ebf8a0557f48d0b2826f6a14338dd8";
                type=0;
            };
            $.soap({
                url: "http://htgl.cnsn.gov.cn/snAndroidWS/services/snAndroidWS?wsdl",
                method: "getDateList",
                data: {
                    channelId: channelId
                },
                HTTPHeaders: {
                    //Authorization: 'Basic ' + btoa('test:test')
                },

                //enableLogging: true,

                success: function(SOAPResponse) {
                    var articlesText = $(SOAPResponse.content.children[0].innerHTML).text();
                    var articlesArray = articlesText.split(";");
                    $.each(articlesArray,function(i,item){
                        if($.trim(item)!=""){
                            var itemTemp = item.split(",");
                            var itemTemp2 ={};
                            itemTemp2.id = i; 
                            itemTemp2.title = itemTemp[0]; 
                            itemTemp2.path = itemTemp[1]; 
                            itemTemp2.pubdate = itemTemp[2]; 
                            itemTemp2.type = type; 
                            articles.push(itemTemp2);
                        }
                    })
                    // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
                    options.success(articles);

                    // Triggers the custom `added` method (which the Category View listens for)
                    self.trigger("added");

                    // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
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

    });

    // Returns the Model class
    return Collection;

});