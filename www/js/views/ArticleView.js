
define([
	"jquery",
	"backbone",
	"../models/ArticleModel"
], function( $, Backbone, ArticleModel ) {

    // Extends Backbone.View
    var ArticleView = Backbone.View.extend( {
        // The View Constructor
        initialize: function() {
            //this.listenTo(this.model, "change", this.render);
        },
        // Renders all of the Category models on the UI
        render: function() {
            var type = this.model.get("type");
            // Sets the view's template property
            this.template = _.template( $( "script#article"+type ).html(),this.model.toJSON() );
            // Renders the view's template inside of the current listview element
            this.$el.html(this.template);
            // Maintains chainability
            return this;
        }
    });

    // Returns the View class
    return ArticleView;

} );