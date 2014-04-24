// Mobile Router
// =============

// Includes file dependencies
define(["jquery", "backbone","pull", "models/ArticleModel", "collections/ArticlesCollection", "views/CategoryView", "views/ArticleView"], 
    function($, Backbone, Pull, ArticleModel, ArticlesCollection, CategoryView,ArticleView) {
    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend({

        // The Router constructor
        initialize: function() {
            
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },

        // Backbone.js Routes
        routes: {
            // When there is no hash bang on the url, the home method is called
            "": "home",
            // When #category? is on the url, the category method is called
            "category?:category": "category",
            "article:type?id=:id": "article"
        },

        // Home method
        home: function() {
            // Programatically changes to the categories page
            $.mobile.changePage("#categories", {
                reverse: false,
                changeHash: false
            });
        },

        // Category method that passes in the type that is appended to the url hash
        category: function(category) {
            var self = this;
            var currentView = "";
            if(!this[category+"View"]){
                this[category+"Pull"] =new Pull(category);
                this[category+"View"] = new CategoryView({
                    el: "#"+category,
                    collection: new ArticlesCollection([], {
                        category: category
                    })
                });
            }
            currentPull = this[category+"Pull"];
            currentView = this[category + "View"];
            currentPull.onPullDown = function(event, data){
                currentView.collection.fetch({add:false}).done(function() {
                    currentView.empty().render();

                });
            };

            // Stores the current Category View  inside of the currentView variable

            // If there are no collections in the current Category View
            if (!currentView.collection.length) {

                // Show's the jQuery Mobile loading icon
                $.mobile.loading("show");

                // Fetches the Collection of Category Models for the current Category View
                currentView.collection.fetch().done(function() {
                    self.currentCollection = currentView.collection;
                    // Programatically changes to the current categories page
                    $.mobile.changePage("#" + category, {
                        reverse: false,
                        changeHash: true
                    });
                });
            }

            // If there already collections in the current Category View
            else {

                // Programatically changes to the current categories page
                $.mobile.changePage("#" + category, {
                    reverse: false,
                    changeHash: true
                });
            }
        },

        article: function(type,id) {
            var a = this.currentCollection.get(id);
            var model = new ArticleModel();
            this["article"+type+"View"] = new ArticleView({
                el: "#article"+type,
                type:type,
                model:model
            });
            // Stores the current Category View  inside of the currentView variable
            var currentView = this["article"+type+"View"];
            currentView.model.set({path:a.get("path")},{silent: true});
            currentView.model.set({type:type},{silent: true});
            currentView.model.set({title:a.get("title")},{silent: true});
            // Show's the jQuery Mobile loading icon
            $.mobile.loading("show");
            // Fetches the Collection of Category Models for the current Category View
            currentView.model.fetch().done(function() {
                currentView.render();
                $.mobile.changePage("#article"+type, {
                    reverse: false,
                    changeHash: true
                });
            });

            
        }
    });

    // Returns the Router class
    return CategoryRouter;

});