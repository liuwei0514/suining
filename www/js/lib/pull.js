define(["jquery","iscrollview"], function($) {
  var Pull = function(category){
    "use strict";
    var self = this; 
    self.listSelector =  "#"+category+" ul.ui-listview";
    var lastItemSelector = self.listSelector + " > li:last-child";
    self.onPullDown = function(event, data){};
    $(document).delegate("#"+category, "pageinit",
      function bindPullPagePullCallbacks(event) {
        $(".iscroll-wrapper", this).bind({
          iscroll_onpulldown: function(event, data) {
            self.onPullDown(event, data);
            data.iscrollview.refresh();
          }
        });
      }
    );
  };
  return Pull;
})