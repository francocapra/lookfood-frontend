sap.ui.define([
	"lookfood/resources/main/controllers/Base"
	], function (Base) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.Review", {

			onInit: function(){
				oBaseController = this;
			},

			getTopProducts: function(){

				let authToken = window.sessionStorage.getItem('Authorization');

				return $.ajax({
					type:'GET',
					url:oBaseController.getServiceApi()+'products/top',
					beforeSend:function(oRequest){
						oRequest.setRequestHeader(authToken);
					}
				});
			},

			onStartReviewPress:function(){
				let scanner = null;
				let reviewCode = null;

				let _previewDialog = new sap.m.Dialog({
					title: oBaseController.getResourceBundle().getText('reviewScannerTitle'),
					content: [
					new sap.ui.core.HTML({
						content: '<video id="preview" width="400" heigth="400"></video>'
					})
					],
					beginButton: new sap.m.Button({
						text: oBaseController.getResourceBundle().getText('btnClose'),
						press: function () {
							_previewDialog.close();
						}
					}),
					afterOpen: function () {
						scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
						scanner.addListener('scan', function (content) {
							reviewCode = content;
							_previewDialog.close();
						});
						Instascan.Camera.getCameras().then(function (cameras) {
                                    // alert(cameras[0].name)
                                    if (cameras.length > 0) {
                                    	scanner.activeCameraId = cameras[0].id;
                                    	scanner.start(cameras[0]);
                                    } else {
                                    	console.error('No cameras found.');
                                    	alert("No cameras foud.")
                                    }
                                }).catch(function (e) {
                                	console.error(e);
                                	alert(e);
                                });
                            },
                            beforeClose: function () {
                            	scanner.stop();
                            	scanner = null;
                            },
                            afterClose: function () {
                            	_previewDialog.destroy();
                            	console.log(reviewCode);

                            }
                        }).open();
			}
		});

	});