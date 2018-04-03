/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Dialog','./Popover','./SelectList','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./Button','./Bar','./Title','./delegate/ValueStateMessage','sap/ui/core/message/MessageMixin','sap/ui/core/library','sap/ui/core/Item','sap/ui/Device','jquery.sap.keycodes'],function(q,D,P,S,l,C,E,I,B,a,T,V,M,c,b,d){"use strict";var e=l.SelectListKeyboardNavigationMode;var f=l.PlacementType;var g=c.ValueState;var h=c.TextDirection;var j=c.TextAlign;var k=l.SelectType;var m=C.extend("sap.m.Select",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{name:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},type:{type:"sap.m.SelectType",group:"Appearance",defaultValue:k.Default},autoAdjustWidth:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:j.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:h.Inherit},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:g.None},valueStateText:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},forceSelection:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"},_pickerHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},designTime:true}});I.insertFontFaceStyle();E.apply(m.prototype,[true]);M.call(m.prototype);function H(i){if(i){this.setSelection(i);this.setValue(i.getText());this.scrollToItem(i);}}m.prototype._handleFocusout=function(){this._bFocusoutDueRendering=this.bRenderingPhase;if(this._bFocusoutDueRendering){this._bProcessChange=false;return;}if(this._bProcessChange){this._checkSelectionChange();this._bProcessChange=false;}else{this._bProcessChange=true;}};m.prototype._checkSelectionChange=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.fireChange({selectedItem:i});}};m.prototype._revertSelection=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.setSelection(this._oSelectionOnFocus);this.setValue(this._getSelectedItemText());}};m.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};m.prototype._callMethodInControl=function(F,A){var L=this.getList();if(A[0]==="items"){if(L){return S.prototype[F].apply(L,A);}}else{return C.prototype[F].apply(this,A);}};m.prototype.findFirstEnabledItem=function(i){var L=this.getList();return L?L.findFirstEnabledItem(i):null;};m.prototype.findLastEnabledItem=function(i){var L=this.getList();return L?L.findLastEnabledItem(i):null;};m.prototype.setSelectedIndex=function(i,_){var o;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);o=_[i];if(o){this.setSelection(o);}};m.prototype.scrollToItem=function(i){var p=this.getPicker(),o=p.getDomRef("cont"),n=i&&i.getDomRef();if(!p||!o||!n){return;}var r=o.scrollTop,s=n.offsetTop,t=o.clientHeight,u=n.offsetHeight;if(r>s){o.scrollTop=s;}else if((s+u)>(r+t)){o.scrollTop=Math.ceil(s+u-t);}};m.prototype.setValue=function(v){this.$("label").text(v);};m.prototype._isShadowListRequired=function(){if(this.getAutoAdjustWidth()){return false;}else if(this.getWidth()==="auto"){return true;}return false;};m.prototype._handleAriaActiveDescendant=function(i){var o=this.getDomRef(),n=i&&i.getDomRef(),A="aria-activedescendant";if(!o){return;}if(n&&this.isOpen()){o.setAttribute(A,i.getId());}else{o.removeAttribute(A);}};m.prototype.getList=function(){if(this.bIsDestroyed){return null;}return this._oList;};m.prototype.updateItems=function(r){S.prototype.updateItems.apply(this,arguments);this._oSelectionOnFocus=this.getSelectedItem();};m.prototype.refreshItems=function(){S.prototype.refreshItems.apply(this,arguments);};m.prototype.onBeforeOpen=function(o){var p=this["_onBeforeOpen"+this.getPickerType()],i=this.getRenderer().CSS_CLASS;this.addStyleClass(i+"Pressed");this.addStyleClass(i+"Expanded");this.closeValueStateMessage();this.addContent();p&&p.call(this);};m.prototype.onAfterOpen=function(o){var i=this.getFocusDomRef(),n=null;if(!i){return;}n=this.getSelectedItem();i.setAttribute("aria-expanded","true");i.setAttribute("aria-owns",this.getList().getId());if(n){i.setAttribute("aria-activedescendant",n.getId());this.scrollToItem(n);}};m.prototype.onBeforeClose=function(o){var i=this.getFocusDomRef(),n=this.getRenderer().CSS_CLASS;if(i){i.removeAttribute("aria-owns");i.removeAttribute("aria-activedescendant");if(this.shouldValueStateMessageBeOpened()&&(document.activeElement===i)){this.openValueStateMessage();}}this.removeStyleClass(n+"Expanded");};m.prototype.onAfterClose=function(o){var i=this.getFocusDomRef(),n=this.getRenderer().CSS_CLASS,p=n+"Pressed";if(i){i.setAttribute("aria-expanded","false");i.removeAttribute("aria-activedescendant");}this.removeStyleClass(p);};m.prototype.getPicker=function(){if(this.bIsDestroyed){return null;}return this.createPicker(this.getPickerType());};m.prototype.setPickerType=function(p){this._sPickerType=p;};m.prototype.getPickerType=function(){return this._sPickerType;};m.prototype._createPopover=function(){var t=this;var p=new P({showArrow:false,showHeader:false,placement:f.VerticalPreferredBottom,offsetX:0,offsetY:0,initialFocus:this,bounce:false});p.addEventDelegate({ontouchstart:function(o){var i=this.getDomRef("cont");if((o.target===i)||(o.srcControl instanceof b)){t._bProcessChange=false;}}},p);this._decoratePopover(p);return p;};m.prototype._decoratePopover=function(p){var t=this;p.open=function(){return this.openBy(t);};};m.prototype._onBeforeRenderingPopover=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";if(p){p.setContentMinWidth(w);}};m.prototype._createDialog=function(){var t=this;return new D({stretch:true,customHeader:this._getPickerHeader(),beforeOpen:function(){t.updatePickerHeaderTitle();}});};m.prototype._getPickerTitle=function(){var p=this.getPicker(),o=p&&p.getCustomHeader();if(o){return o.getContentMiddle()[0];}return null;};m.prototype._getPickerHeader=function(){var i=I.getIconURI("decline"),r;if(!this.getAggregation("_pickerHeader")){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_pickerHeader",new a({contentMiddle:new T({text:r.getText("SELECT_PICKER_TITLE_TEXT")}),contentRight:new B({icon:i,press:this.close.bind(this)})}));}return this.getAggregation("_pickerHeader");};m.prototype.updatePickerHeaderTitle=function(){var p=this.getPicker();if(!p){return;}var L=this.getLabels();if(L.length){var o=L[0],i=this._getPickerTitle();if(o&&(typeof o.getText==="function")){i&&i.setText(o.getText());}}};m.prototype._onBeforeOpenDialog=function(){};m.prototype.init=function(){this.setPickerType(d.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this.bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;this.sTypedChars="";this.iTypingTimeoutID=-1;this._oValueStateMessage=new V(this);};m.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(d.browser.firefox&&(this.getFocusDomRef()===document.activeElement)){this._handleFocusout();}this.synchronizeSelection();};m.prototype.onAfterRendering=function(){this.bRenderingPhase=false;};m.prototype.exit=function(){var v=this.getValueStateMessage();this._oSelectionOnFocus=null;if(v){this.closeValueStateMessage();v.destroy();}this._oValueStateMessage=null;};m.prototype.ontouchstart=function(o){o.setMarked();if(this.getEnabled()&&this.isOpenArea(o.target)){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};m.prototype.ontouchend=function(o){o.setMarked();if(this.getEnabled()&&!this.isOpen()&&this.isOpenArea(o.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};m.prototype.ontap=function(o){var i=this.getRenderer().CSS_CLASS;o.setMarked();if(!this.getEnabled()){return;}if(this.isOpenArea(o.target)){if(this.isOpen()){this.close();this.removeStyleClass(i+"Pressed");return;}this.open();}if(this.isOpen()){this.addStyleClass(i+"Pressed");}};m.prototype.onSelectionChange=function(o){var i=o.getParameter("selectedItem");this.close();this.setSelection(i);this.fireChange({selectedItem:i});this.setValue(this._getSelectedItemText());};m.prototype.onkeypress=function(o){if(!this.getEnabled()){return;}o.setMarked();var t=String.fromCharCode(o.which),s=this.getSelectedItem(),i=t,n=null;this.sTypedChars+=t;if((s&&q.sap.startsWithIgnoreCase(s.getText(),this.sTypedChars))||((this.sTypedChars.length===1)||((this.sTypedChars.length>1)&&(this.sTypedChars.charAt(0)!==this.sTypedChars.charAt(1))))){i=this.sTypedChars;}n=this.searchNextItemByText(i);clearTimeout(this.iTypingTimeoutID);this.iTypingTimeoutID=setTimeout(function(){this.sTypedChars="";this.iTypingTimeoutID=-1;}.bind(this),1000);H.call(this,n);};m.prototype.onsapshow=function(o){if(!this.getEnabled()){return;}o.setMarked();if(o.which===q.sap.KeyCodes.F4){o.preventDefault();}this.toggleOpenState();};m.prototype.onsaphide=m.prototype.onsapshow;m.prototype.onsapescape=function(o){if(!this.getEnabled()){return;}if(this.isOpen()){o.setMarked();this.close();this._revertSelection();}};m.prototype.onsapenter=function(o){if(!this.getEnabled()){return;}o.setMarked();this.close();this._checkSelectionChange();};m.prototype.onsapspace=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();if(this.isOpen()){this._checkSelectionChange();}this.toggleOpenState();};m.prototype.onsapdown=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();var n,s=this.getSelectableItems();n=s[s.indexOf(this.getSelectedItem())+1];H.call(this,n);};m.prototype.onsapup=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();var p,s=this.getSelectableItems();p=s[s.indexOf(this.getSelectedItem())-1];H.call(this,p);};m.prototype.onsaphome=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();var F=this.getSelectableItems()[0];H.call(this,F);};m.prototype.onsapend=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());H.call(this,L);};m.prototype.onsappagedown=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();var s=this.getSelectableItems(),i=this.getSelectedItem();this.setSelectedIndex(s.indexOf(i)+10,s);i=this.getSelectedItem();if(i){this.setValue(i.getText());}this.scrollToItem(i);};m.prototype.onsappageup=function(o){if(!this.getEnabled()){return;}o.setMarked();o.preventDefault();var s=this.getSelectableItems(),i=this.getSelectedItem();this.setSelectedIndex(s.indexOf(i)-10,s);i=this.getSelectedItem();if(i){this.setValue(i.getText());}this.scrollToItem(i);};m.prototype.onfocusin=function(o){if(!this._bFocusoutDueRendering&&!this._bProcessChange){this._oSelectionOnFocus=this.getSelectedItem();}this._bProcessChange=true;setTimeout(function(){if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&(document.activeElement===this.getFocusDomRef())){this.openValueStateMessage();}}.bind(this),100);if(o.target!==this.getFocusDomRef()){this.focus();}};m.prototype.onfocusout=function(o){this._handleFocusout();if(this.bRenderingPhase){return;}this.closeValueStateMessage();};m.prototype.onsapfocusleave=function(o){var p=this.getAggregation("picker");if(!o.relatedControlId||!p){return;}var i=sap.ui.getCore().byId(o.relatedControlId),F=i&&i.getFocusDomRef();if(d.system.desktop&&q.sap.containsOrEquals(p.getFocusDomRef(),F)){this.focus();}};m.prototype.setSelection=function(i){var L=this.getList(),K;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof b)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}K=i?i.getKey():"";this.setProperty("selectedKey",K,true);this._handleAriaActiveDescendant(i);};m.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};m.prototype.synchronizeSelection=function(){S.prototype.synchronizeSelection.apply(this,arguments);};m.prototype.addContent=function(p){};m.prototype.createPicker=function(p){var o=this.getAggregation("picker"),i=this.getRenderer().CSS_CLASS;if(o){return o;}o=this["_create"+p]();this.setAggregation("picker",o,true);o.setHorizontalScrolling(false).addStyleClass(i+"Picker").addStyleClass(i+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return o;};m.prototype.searchNextItemByText=function(t){var n=this.getItems(),s=this.getSelectedIndex(),o=n.splice(s+1,n.length-s),p=n.splice(0,n.length-1);n=o.concat(p);for(var i=0,r;i<n.length;i++){r=n[i];if(r.getEnabled()&&!(r instanceof sap.ui.core.SeparatorItem)&&q.sap.startsWithIgnoreCase(r.getText(),t)){return r;}}return null;};m.prototype.createList=function(){var L=e,K=d.system.phone?L.Delimited:L.None;this._oList=new S({width:"100%",keyboardNavigationMode:K}).addStyleClass(this.getRenderer().CSS_CLASS+"List-CTX").addEventDelegate({ontap:function(o){this._checkSelectionChange();this.close();}},this).attachSelectionChange(this.onSelectionChange,this);return this._oList;};m.prototype.hasContent=function(){return this.getItems().length>0;};m.prototype.onBeforeRenderingPicker=function(){var o=this["_onBeforeRendering"+this.getPickerType()];o&&o.call(this);};m.prototype.onAfterRenderingPicker=function(){var o=this["_onAfterRendering"+this.getPickerType()];o&&o.call(this);};m.prototype.open=function(){var p=this.getPicker();if(p){p.open();}return this;};m.prototype.toggleOpenState=function(){if(this.isOpen()){this.close();}else{this.open();}return this;};m.prototype.getVisibleItems=function(){var L=this.getList();return L?L.getVisibleItems():[];};m.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};m.prototype.getSelectedIndex=function(){var s=this.getSelectedItem();return s?this.indexOfItem(this.getSelectedItem()):-1;};m.prototype.getDefaultSelectedItem=function(i){return this.getForceSelection()?this.findFirstEnabledItem():null;};m.prototype.getSelectableItems=function(){var L=this.getList();return L?L.getSelectableItems():[];};m.prototype.getOpenArea=function(){return this.getDomRef();};m.prototype.isOpenArea=function(o){var O=this.getOpenArea();return O&&O.contains(o);};m.prototype.findItem=function(p,v){var L=this.getList();return L?L.findItem(p,v):null;};m.prototype.clearSelection=function(){this.setSelection(null);};m.prototype.onItemChange=function(o){var s=this.getAssociation("selectedItem"),n=o.getParameter("newValue"),p=o.getParameter("name");if(s===o.getParameter("id")){switch(p){case"text":this.setValue(n);break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(n);}break;}}};m.prototype.fireChange=function(p){this._oSelectionOnFocus=p.selectedItem;return this.fireEvent("change",p);};m.prototype.addAggregation=function(A,o,s){this._callMethodInControl("addAggregation",arguments);if(A==="items"&&!s&&!this.isInvalidateSuppressed()){this.invalidate(o);}return this;};m.prototype.getAggregation=function(){return this._callMethodInControl("getAggregation",arguments);};m.prototype.setAssociation=function(A,i,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return C.prototype.setAssociation.apply(this,arguments);};m.prototype.indexOfAggregation=function(){return this._callMethodInControl("indexOfAggregation",arguments);};m.prototype.insertAggregation=function(){this._callMethodInControl("insertAggregation",arguments);return this;};m.prototype.removeAggregation=function(){return this._callMethodInControl("removeAggregation",arguments);};m.prototype.removeAllAggregation=function(){return this._callMethodInControl("removeAllAggregation",arguments);};m.prototype.destroyAggregation=function(A,s){this._callMethodInControl("destroyAggregation",arguments);if(!s&&!this.isInvalidateSuppressed()){this.invalidate();}return this;};m.prototype.setProperty=function(p,v,s){var L=this.getList();if((p==="selectedKey")||(p==="selectedItemId")){L&&S.prototype.setProperty.apply(L,arguments);}return C.prototype.setProperty.apply(this,arguments);};m.prototype.removeAllAssociation=function(A,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return C.prototype.removeAllAssociation.apply(this,arguments);};m.prototype.clone=function(){var s=C.prototype.clone.apply(this,arguments),L=this.getList(),o=this.getSelectedItem(),n=this.getSelectedKey();if(!this.isBound("items")&&L){for(var i=0,p=L.getItems();i<p.length;i++){s.addItem(p[i].clone());}}if(!this.isBound("selectedKey")&&!s.isSelectionSynchronized()){if(o&&(n==="")){s.setSelectedIndex(this.indexOfItem(o));}else{s.setSelectedKey(n);}}return s;};m.prototype.updateValueStateClasses=function(v,o){var t=this.$(),L=this.$("label"),A=this.$("arrow"),i=g,n=this.getRenderer().CSS_CLASS;if(o!==i.None){t.removeClass(n+"State");t.removeClass(n+o);L.removeClass(n+"LabelState");L.removeClass(n+"Label"+o);A.removeClass(n+"ArrowState");}if(v!==i.None){t.addClass(n+"State");t.addClass(n+v);L.addClass(n+"LabelState");L.addClass(n+"Label"+v);A.addClass(n+"ArrowState");}};m.prototype.getLabels=function(){var L=this.getAriaLabelledBy().map(function(s){return sap.ui.getCore().byId(s);});var o=sap.ui.require("sap/ui/core/LabelEnablement");if(o){L=L.concat(o.getReferencingLabels(this).map(function(s){return sap.ui.getCore().byId(s);}));}return L;};m.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef();};m.prototype.getValueStateMessageId=function(){return this.getId()+"-message";};m.prototype.getValueStateMessage=function(){return this._oValueStateMessage;};m.prototype.openValueStateMessage=function(){var v=this.getValueStateMessage();if(v){v.open();}};m.prototype.closeValueStateMessage=function(){var v=this.getValueStateMessage();if(v){v.close();}};m.prototype.shouldValueStateMessageBeOpened=function(){return(this.getValueState()!==g.None)&&this.getEnabled();};m.prototype.setShowSecondaryValues=function(A){var s=!this._isShadowListRequired();this.setProperty("showSecondaryValues",A,s);var L=this.getList();if(L){L.setShowSecondaryValues(A);}return this;};m.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};m.prototype.insertItem=function(i,n){this.insertAggregation("items",i,n);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};m.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};m.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};m.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof b)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));this._oSelectionOnFocus=i;return this;};m.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText());this._oSelectionOnFocus=sap.ui.getCore().byId(i);return this;};m.prototype.setSelectedKey=function(K){K=this.validateProperty("selectedKey",K);var i=(K==="");if(!this.getForceSelection()&&i){this.setSelection(null);this.setValue("");return this;}var o=this.getItemByKey(K);if(o||i){if(!o&&i){o=this.getDefaultSelectedItem();}this.setSelection(o);this.setValue(this._getSelectedItemText(o));this._oSelectionOnFocus=o;return this;}return this.setProperty("selectedKey",K);};m.prototype.setValueState=function(v){var o=this.getValueState();this.setProperty("valueState",v,true);v=this.getValueState();if(v===o){return this;}var i=this.getDomRefForValueState();if(!i){return this;}var n=g;if(v===n.Error){i.setAttribute("aria-invalid",true);}else{i.removeAttribute("aria-invalid");}if(this.shouldValueStateMessageBeOpened()&&document.activeElement===i){this.openValueStateMessage();}else{this.closeValueStateMessage();}this.updateValueStateClasses(v,o);return this;};m.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};m.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null;};m.prototype.getFirstItem=function(){return this.getItems()[0]||null;};m.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};m.prototype.getEnabledItems=function(i){var L=this.getList();return L?L.getEnabledItems(i):[];};m.prototype.getItemByKey=function(K){var L=this.getList();return L?L.getItemByKey(K):null;};m.prototype.removeItem=function(i){var L=this.getList(),o;i=L?L.removeItem(i):null;if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){o=this.findFirstEnabledItem();if(o){this.setSelection(o);}}this.setValue(this._getSelectedItemText());if(i){i.detachEvent("_change",this.onItemChange,this);}return i;};m.prototype.removeAllItems=function(){var L=this.getList(),n=L?L.removeAllItems():[];this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove();}for(var i=0;i<n.length;i++){n[i].detachEvent("_change",this.onItemChange,this);}return n;};m.prototype.destroyItems=function(){var L=this.getList();if(L){L.destroyItems();}this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove();}return this;};m.prototype.isOpen=function(){var p=this.getAggregation("picker");return!!(p&&p.isOpen());};m.prototype.close=function(){var p=this.getAggregation("picker");if(p){p.close();}return this;};m.prototype.getDomRefForValueState=function(){return this.getDomRef();};m.prototype.getAccessibilityInfo=function(){var i={role:this.getRenderer().getAriaRole(this),focusable:this.getEnabled(),enabled:this.getEnabled()};if(this.getType()==="IconOnly"){var s=this.getTooltip_AsString();if(!s){var o=I.getIconInfo(this.getIcon());s=o&&o.text?o.text:"";}i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON");i.description=s;}else if(this.getType()==="Default"){i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_COMBO");i.description=this._getSelectedItemText();}return i;};return m;});
