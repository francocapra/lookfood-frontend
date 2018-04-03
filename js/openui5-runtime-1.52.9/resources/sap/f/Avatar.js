/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/IconPool","jquery.sap.keycodes"],function(q,l,C,I){"use strict";var A=l.AvatarType;var a=l.AvatarImageFitType;var b=l.AvatarSize;var c=l.AvatarShape;var d=C.extend("sap.f.Avatar",{metadata:{library:"sap.f",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},initials:{type:"string",group:"Data",defaultValue:null},displayShape:{type:"sap.f.AvatarShape",group:"Appearance",defaultValue:c.Circle},displaySize:{type:"sap.f.AvatarSize",group:"Appearance",defaultValue:b.S},customDisplaySize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"3rem"},customFontSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"1.125rem"},imageFitType:{type:"sap.f.AvatarImageFitType",group:"Appearance",defaultValue:a.Cover}},aggregations:{detailBox:{type:'sap.m.LightBox',multiple:false,bindable:"bindable"}},events:{press:{}}}});d.DEFAULT_CIRCLE_PLACEHOLDER="sap-icon://person-placeholder";d.DEFAULT_SQUARE_PLACEHOLDER="sap-icon://product";d.prototype.init=function(){this._sActualType=null;this._bIsDefaultIcon=true;};d.prototype.exit=function(){if(this._icon){this._icon.destroy();}if(this._fnLightBoxOpen){this._fnLightBoxOpen=null;}};d.prototype.setDetailBox=function(L){var o=this.getDetailBox();if(L){if(L===o){return this;}if(o){this.detachPress(this._fnLightBoxOpen,o);}this._fnLightBoxOpen=L.open;this.attachPress(this._fnLightBoxOpen,L);}else if(this._fnLightBoxOpen){this.detachPress(this._fnLightBoxOpen,o);this._fnLightBoxOpen=null;}return this.setAggregation("detailBox",L);};d.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);C.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button");}return this;};d.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);C.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");this.$().removeAttr("role");}return this;};d.prototype.ontap=function(e){this.firePress({});};d.prototype.onkeyup=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){this.firePress({});e.stopPropagation();}};d.prototype._areInitialsValid=function(i){var v=/^[a-zA-Z]{1,2}$/;if(!v.test(i)){q.sap.log.warning("Initials should consist of only 1 or 2 latin letters",this);this._sActualType=A.Icon;this._bIsDefaultIcon=true;return false;}return true;};d.prototype._validateSrc=function(s){if(I.isIconURI(s)){this._sActualType=A.Icon;this._bIsDefaultIcon=false;}else{this._sActualType=A.Image;}return this;};d.prototype._getActualDisplayType=function(){var s=this.getSrc(),i=this.getInitials();if(s){this._validateSrc(s);}else if(i&&this._areInitialsValid(i)){this._sActualType=A.Initials;}else{q.sap.log.warning("No src and initials were provided",this);this._sActualType=A.Icon;this._bIsDefaultIcon=true;}return this._sActualType;};d.prototype._getDefaultIconPath=function(D){var s=null;if(D===c.Circle){s=d.DEFAULT_CIRCLE_PLACEHOLDER;}else if(D===c.Square){s=d.DEFAULT_SQUARE_PLACEHOLDER;}return s;};d.prototype._getIcon=function(){var s=this.getSrc(),D=this.getDisplayShape();if(this._bIsDefaultIcon){s=this._getDefaultIconPath(D);}if(!this._icon){this._icon=I.createControlByURI({alt:"Image placeholder",src:s});}else if(this._icon.getSrc()!==s){this._icon.setSrc(s);}return this._icon;};d.prototype.getAccessibilityInfo=function(){var h=this.hasListeners("press");if(!h){return null;}return{role:h?"button":"img",type:sap.ui.getCore().getLibraryResourceBundle("sap.f").getText(h?"ACC_CTR_TYPE_BUTTON":"ACC_CTR_TYPE_IMAGE"),focusable:h};};return d;});
