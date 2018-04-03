/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/core/Icon','sap/ui/core/delegate/ScrollEnablement'],function(q,l,C,R,I,S){'use strict';var a=C.extend('sap.tnt.SideNavigation',{metadata:{library:'sap.tnt',properties:{expanded:{type:'boolean',group:'Misc',defaultValue:true}},defaultAggregation:"item",aggregations:{item:{type:'sap.tnt.NavigationList',multiple:false,bindable:"bindable"},fixedItem:{type:'sap.tnt.NavigationList',multiple:false},footer:{type:'sap.tnt.NavigationList',multiple:false},_topArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_bottomArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.tnt.NavigationListItem",multiple:false}},events:{itemSelect:{parameters:{item:{type:'sap.ui.core.Item'}}}}}});a.prototype.init=function(){this._scroller=new S(this,this.getId()+"-Flexible-Content",{horizontal:false,vertical:true});this.data('sap-ui-fastnavgroup','true',true);};a.prototype.setAggregation=function(b,o,s){if(o&&o.attachItemSelect){o.attachItemSelect(this._itemSelectionHandler.bind(this));}return sap.ui.base.ManagedObject.prototype.setAggregation.apply(this,arguments);};a.prototype.setExpanded=function(i){if(this.getExpanded()===i){return this;}this.setProperty('expanded',i,true);if(!this.getDomRef()){return this;}var t=this,$=this.$(),w;if(t._hasActiveAnimation){t._finishAnimation(!i);$.stop();}if(i){t.$().toggleClass('sapTntSideNavigationNotExpanded',!i);if(t.getAggregation('item')){t.getAggregation('item').setExpanded(i);}if(t.getAggregation('fixedItem')){t.getAggregation('fixedItem').setExpanded(i);}}t._hasActiveAnimation=true;w=i?'15rem':'3rem';$.animate({width:w},{duration:300,complete:function(){var i=t.getExpanded();t._finishAnimation(i);}});return this;};a.prototype._finishAnimation=function(i){if(!this._hasActiveAnimation||!this.getDomRef()){return;}this.$().toggleClass('sapTntSideNavigationNotExpandedWidth',!i);if(!i){this.$().toggleClass('sapTntSideNavigationNotExpanded',!i);if(this.getAggregation('item')){this.getAggregation('item').setExpanded(i);}if(this.getAggregation('fixedItem')){this.getAggregation('fixedItem').setExpanded(i);}}this.$().css('width','');this._hasActiveAnimation=false;this._toggleArrows();};a.prototype.onBeforeRendering=function(){var s=this.getSelectedItem();if(s){this.setSelectedItem(s,true);}this._deregisterControl();};a.prototype.onAfterRendering=function(){this._ResizeHandler=R.register(this.getDomRef(),this._toggleArrows.bind(this));this._toggleArrows();};a.prototype.setSelectedItem=function(s,b){var n=this.getAggregation('item');var f=this.getAggregation('fixedItem');var c;if(!s){if(n.setSelectedItem){n.setSelectedItem(null,true);}if(f.setSelectedItem){f.setSelectedItem(null,true);}}if(typeof s==='string'){c=sap.ui.getCore().byId(s);}else{c=s;}var d=c&&c.getNavigationList&&c.getNavigationList()===n;var e=c&&c.getNavigationList&&c.getNavigationList()===f;if(d){n.setSelectedItem(c,b);if(f){f.setSelectedItem(null,true);}}if(e){f.setSelectedItem(c,b);n.setSelectedItem(null,true);}return sap.ui.core.Control.prototype.setAssociation.call(this,'selectedItem',c,true);};a.prototype.exit=function(){if(this._scroller){this._scroller.destroy();this._scroller=null;}this._deregisterControl();};a.prototype._itemSelectionHandler=function(e){var b=e.getSource().getId();var i=this.getAggregation('item');var f=this.getAggregation('fixedItem');var c=e.getParameter('item');if(i&&f&&b===i.getId()){f.setSelectedItem(null);}if(i&&f&&b===f.getId()){i.setSelectedItem(null);}sap.ui.core.Control.prototype.setAssociation.call(this,'selectedItem',c,true);this.fireItemSelect({item:c});};a.prototype._deregisterControl=function(){if(this._ResizeHandler){R.deregister(this._ResizeHandler);this._ResizeHandler=null;}};a.prototype._getTopArrowControl=function(){var i=this.getAggregation('_topArrowControl');var t=this;if(!i){i=new I({src:'sap-icon://navigation-up-arrow',noTabStop:true,useIconTooltip:false,tooltip:'',press:this._arrowPress.bind(t)}).addStyleClass('sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconUp');this.setAggregation("_topArrowControl",i,true);}return i;};a.prototype._getBottomArrowControl=function(){var i=this.getAggregation('_bottomArrowControl');var t=this;if(!i){i=new I({src:'sap-icon://navigation-down-arrow',noTabStop:true,useIconTooltip:false,tooltip:'',press:this._arrowPress.bind(t)}).addStyleClass('sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconDown');this.setAggregation("_bottomArrowControl",i,true);}return i;};a.prototype._toggleArrows=function(){var d=this.getDomRef();if(!d){return;}var s=this.$('Flexible')[0];var b=this.$('Flexible-Content')[0];var i=this.getExpanded();if(this._hasActiveAnimation){d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='none';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='none';return;}if((b.offsetHeight>s.offsetHeight)&&!i){d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='block';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='block';d.querySelector('.sapTntSideNavigationScrollIconDown').classList.remove('sapTntSideNavigationScrollIconDisabled');}else{d.querySelector('.sapTntSideNavigationScrollIconUp').style.display='none';d.querySelector('.sapTntSideNavigationScrollIconDown').style.display='none';}};a.prototype._arrowPress=function(e){e.preventDefault();var s=document.getElementById(e.oSource.sId);var i=s.classList.contains('sapTntSideNavigationScrollIconDown')?true:false;var $=this.$('Flexible');var b=i?40:-40;$[0].scrollTop+=b;};return a;},true);
