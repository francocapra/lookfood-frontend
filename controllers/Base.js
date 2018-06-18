sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		var oBaseController;

		return Controller.extend("lookfood.resources.main.controllers.Base", {

			getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},

			getServiceApi: function(){
				return 'https://app-lookfood-backend.herokuapp.com/';
			},

			getBucketApi: function(){
				return 'https://lookfood-backend-img.s3.sa-east-1.amazonaws.com/';
			},

			showGlobalLoader : function () {
				sap.ui.core.BusyIndicator.show(0);
			},

			hideGlobalLoader : function () {
				sap.ui.core.BusyIndicator.hide();
			},

			getResourceBundle:function(){
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},

			getModel:function(sName){
				return this.getOwnerComponent().getModel(sName);
			},

			setModel:function(oModel, sName){
				return this.getOwnerComponent().setModel(oModel, sName);
			},

			getPartnerProducts: function(){

				let serviceApi = this.getServiceApi();

				return $.ajax({
					type:'GET',
					url:serviceApi+'products',
					beforeSend:function(oRequest){
						oRequest.setRequestHeader('Authorization', window.sessionStorage.getItem('Authorization'));
					}
				});
			}
		});

	});