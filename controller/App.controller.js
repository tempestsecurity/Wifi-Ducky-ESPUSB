sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
  "use strict";

  return Controller.extend("com.demo.textarea.autocomplete.controller.App", {
    onInit: function() {
      var that = this;

      this.getView().byId("textArea_01").onAfterRendering = function() {
        // call autocomplete plugin function after rendering of textarea is completed
        that.enableAutoComplete();
      };
    },

    onBeforeRendering: function() {},

    onAfterRendering: function() {},

    enableAutoComplete: function() {
      var that = this;
      var oControl = this.getView().byId("textArea_01");

      // get textarea htmltag from UI5 control
      var jQueryTextArea = jQuery("#" + oControl.getId()).find("textarea");

      jQueryTextArea.textcomplete([
        {
          // #1 - Regular experession used to trigger search
          match: /(\b(\w+))$/, // --> triggers search for every char typed

          // #2 - Function called at every new key stroke
          search: function(query, fnCallback) {
            var pData = Promise.resolve(

              that
                .getOwnerComponent()
                .getModel("dicData")
                .getData()
            );

            pData.then(function(oResult) {
              fnCallback(
                oResult.data.filter(function(oRecord) {
                  // filter results based on query
                  return oRecord.name
                    .toUpperCase()
                    .startsWith(query.toUpperCase());
                })
              );
            });
          },

          // #3 - Template used to display each result (also supports HTML tags)
          template: function(hit) {
            // Returns the highlighted version of the name attribute
            return hit.name;
          },

          // #4 - Template used to display the selected result in the textarea
          replace: function(hit) {
            return hit.name.toUpperCase();
          }
        }
      ]);
    }
  });
});
