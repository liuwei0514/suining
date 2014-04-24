// Category View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"../models/ArticleModel"
], function( $, Backbone, ArticleModel ) {

    // Extends Backbone.View
    var CategoryView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );
        },
        events:{
            "click .ui-icon-back":"back"
        },
        back:function(e){
            $.mobile.changePage($(e.target).attr("href"), {
                reverse: false,
                changeHash: true
            });
            e.stopPropagation();
        },
        // Renders all of the Category models on the UI
        render: function() {
            // Sets the view's template property
            this.template = _.template( $( "script#articleItems" ).html(), { "collection": this.collection } );
            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template);
            // Maintains chainability
            return this;
        },
        empty: function() {
            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html("");
            // Maintains chainability
            return this;
        }

    } );

    // Returns the View class
    return CategoryView;

} );