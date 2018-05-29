sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
	"use strict";

	return UIComponent.extend("gourmeo.resources.main.Component", {

		// constructor: function(sId, mSettings) {
		// 	UIComponent.call(this, "appComponent", mSettings);
		// },

		metadata: {
			manifest: "json"
		},

		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();

			// set i18n model
			// var i18nModel = new ResourceModel({
			// 	bundleName: "gourmeo.resources.main.res.i18n.i18n"
			// });
			// this.setModel(i18nModel, "i18n");
		}
	});

});