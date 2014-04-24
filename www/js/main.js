    require.config({　　　　
        paths: {　　　　　　
            "jquery": "lib/jquery-2.1.0.min",
            "underscore": "lib/underscore-min",
            "backbone": "lib/backbone-min",
            "jquerymobile": "lib/jquery.mobile-1.4.2.min" ,
            "iscroll": "lib/iscroll" ,
            "iscroll.additional": "lib/iscroll.additional" ,
            "iscrollview": "lib/jquery.mobile.iscrollview" ,
            "pull": "lib/pull" ,
            "jquerysoap": "lib/jquery.soap"　　　　
        },
        shim: {　
            'underscore': {　　　　　　　　
                exports: '_'　　　　　　
            },
            "jquerysoap"  : ["jquery"],
            "iscroll.additional"  : ["jquery"],
            "iscrollview"  : ["iscroll.additional","iscroll","jquerymobile"],
            "pull"  : ["iscrollview"],
            "jquery": {
                "exports": "$"
            },
            "backbone": {
                "deps": ["underscore", "jquery"],
                "exports": "Backbone" //attaches "Backbone" to the window object
            }　　　　
        }　　
    });
    
    require(["jquery", "backbone", "mobileRouter", "jquerymobile"], function($, Backbone, Mobile) {

        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;

        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        // Instantiates a new Backbone.js Mobile Router
        this.router = new Mobile();
    });