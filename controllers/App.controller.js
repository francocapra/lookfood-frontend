sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	var idPrefix = "appComponent---appRootView--";

	var showGlobalLoader = function () {
		sap.ui.core.BusyIndicator.show(0);
	};

	var hideGlobalLoader = function () {
		sap.ui.core.BusyIndicator.hide();
	};

	return Controller.extend("gourmeo.resources.main.controllers.App", {

		onLoginBtnPress: function (event) {

			showGlobalLoader();

			var oData = {
				email: sap.ui.getCore().byId(idPrefix + 'txtUserId').getValue(),
				password: sap.ui.getCore().byId(idPrefix + 'txtPassword').getValue(),
			}

			$.ajax({
				type: 'POST',
				url: 'https://app-lookfood.herokuapp.com/login',
				contentType: 'application/json',
				data: JSON.stringify(oData),
				success: function (data, textStatus, jqXHR) {
					hideGlobalLoader();
					console.log(data, textStatus, jqXHR);
					// navigate(jqXHR);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					hideGlobalLoader();
					console.log(jqXHR.responseText);
					// navigate(jqXHR);
				}
			})
		},

		onNewUserLinkPress: function () {

			var oBundle = this.getView().getModel('i18n').getResourceBundle();

			var newUserDialog = new sap.m.Dialog({
				title: oBundle.getText('newPartnerDiagTitle'),
				content: [
					new sap.m.VBox({
						justifyContent: 'Center',
						alignItems: 'Center',
						items: [
							new sap.m.HBox({
								items: [
									new sap.ui.core.Icon({
										src: 'sap-icon://email',
										size: '2em',
										color: '#d52941'
									}).addStyleClass('sapUiTinyMargin'),
									new sap.m.Input('txtNewUserEmail', {
										placeholder: oBundle.getText('newPartnerIdField'),
										type: sap.m.InputType.Email
									})
								]
							}),
							new sap.m.HBox({
								items: [
									new sap.ui.core.Icon({
										src: 'sap-icon://key',
										size: '2em',
										color: '#d52941'
									}).addStyleClass('sapUiTinyMargin'),
									new sap.m.Input('txtNewUserPass', {
										placeholder: oBundle.getText('newPartnerPassField'),
										type: sap.m.InputType.Password
									})
								]
							}),
							new sap.m.HBox({
								items: [
									new sap.ui.core.HTML({
										content: '<a href="#"><i class="fab fa-facebook-square"' +
											'style="font-size:2em;color:#3b5998;margin:0px 5px"></i></a>'
									}),
									new sap.ui.core.HTML({
										content: '<a href="#"><i class="fab fa-google-plus"' +
											'style="font-size:2em;color:#d34836;margin:0px 5px"></i></a>'
									})
								]
							}).addStyleClass('sapUiTinyMarginTop sapUiTinyMarginBottom')
						]
					}).addStyleClass('sapUiContentPadding')
				],
				beginButton: new sap.m.Button({
					text: oBundle.getText('createPartnerButton'),
					type: 'Emphasized',
					press: function () {
						var n = {
							email: sap.ui.getCore().byId('txtNewUserEmail').getValue(),
							password: sap.ui.getCore().byId('txtNewUserPass').getValue()
						}

						// console.log(JSON.stringify(n));
						showGlobalLoader();

						createUser(n, function (jqXHR) {
							if (jqXHR.status == 200) {
								hideGlobalLoader();
								sap.m.MessageToast.show(oBundle.getText('partnerCreationSucc'))
							}
							else
								hideGlobalLoader();
						});
					}
				}),
				endButton: new sap.m.Button({
					text: oBundle.getText('btnCancel'),
					press: function () {
						newUserDialog.close();
					}
				}),
				afterClose: function () {
					newUserDialog.destroy();
				}
			});

			newUserDialog.open();
		},

		onForgotPassLinkPress: function () {

			var oBundle = this.getView().getModel('i18n').getResourceBundle();

			var forgotPassDialog = new sap.m.Dialog({
				title: oBundle.getText('forgotPassDialogTitle'),
				content: [
					new sap.m.HBox({
						justifyContent: 'Center',
						alignItems: 'Center',
						items: [
							new sap.ui.core.Icon({
								src: 'sap-icon://email',
								size: '2em',
								color: '#d52941'
							}).addStyleClass('sapUiTinyMargin'),
							new sap.m.Input({
								placeholder: oBundle.getText('forgotPassField'),
								type: sap.m.InputType.Email
							})
						]
					})
				],
				beginButton: new sap.m.Button({
					type: 'Emphasized',
					text: oBundle.getText('btnRecoverPass'),
					press: function () {

					}
				}),
				endButton: new sap.m.Button({
					text: oBundle.getText('btnCancel'),
					press: function () {
						forgotPassDialog.close();
					}
				}),
				afterClose: function () {
					forgotPassDialog.close();
				}
			}).addStyleClass('sapUiContentPadding');

			forgotPassDialog.open();
		}
	});

});