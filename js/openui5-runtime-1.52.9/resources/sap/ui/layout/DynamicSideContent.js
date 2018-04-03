/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/layout/library'],function(q,C,R,l){"use strict";var a=l.SideContentPosition;var b=l.SideContentFallDown;var c=l.SideContentVisibility;var D=C.extend("sap.ui.layout.DynamicSideContent",{metadata:{library:"sap.ui.layout",properties:{showSideContent:{type:"boolean",group:"Appearance",defaultValue:true},showMainContent:{type:"boolean",group:"Appearance",defaultValue:true},sideContentVisibility:{type:"sap.ui.layout.SideContentVisibility",group:"Appearance",defaultValue:c.ShowAboveS},sideContentFallDown:{type:"sap.ui.layout.SideContentFallDown",group:"Appearance",defaultValue:b.OnMinimumWidth},equalSplit:{type:"boolean",group:"Appearance",defaultValue:false},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false},sideContentPosition:{type:"sap.ui.layout.SideContentPosition",group:"Appearance",defaultValue:a.End}},defaultAggregation:"mainContent",events:{breakpointChanged:{parameters:{currentBreakpoint:{type:"string"}}}},aggregations:{mainContent:{type:"sap.ui.core.Control",multiple:true},sideContent:{type:"sap.ui.core.Control",multiple:true}}}});var S="S",M="M",L="L",X="XL",H="sapUiHidden",d="sapUiDSCSpan12",e="sapUiDSCMCFixed",f="sapUiDSCSCFixed",g=3,h=4,i=6,j=8,k=9,m=12,I="Invalid Breakpoint. Expected: S, M, L or XL",n="SCGridCell",o="MCGridCell",p=720,r=1024,s=1440;D.prototype.init=function(){this._bSuppressInitialFireBreakPointChange=true;};D.prototype.setSideContentVisibility=function(v,t){this.setProperty("sideContentVisibility",v,true);if(!t&&this.$().length){this._setResizeData(this.getCurrentBreakpoint());this._changeGridState();}return this;};D.prototype.setShowSideContent=function(v,t){this.setProperty("showSideContent",v,true);this._SCVisible=v;if(!t&&this.$().length){this._setResizeData(this.getCurrentBreakpoint(),this.getEqualSplit());if(this._currentBreakpoint===S){this._MCVisible=true;}this._changeGridState();}return this;};D.prototype.setShowMainContent=function(v,t){this.setProperty("showMainContent",v,true);this._MCVisible=v;if(!t&&this.$().length){this._setResizeData(this.getCurrentBreakpoint(),this.getEqualSplit());if(this._currentBreakpoint===S){this._SCVisible=true;}this._changeGridState();}return this;};D.prototype.getShowSideContent=function(){if(this._currentBreakpoint===S){return this._SCVisible&&this.getProperty("showSideContent");}else{return this.getProperty("showSideContent");}};D.prototype.getShowMainContent=function(){if(this._currentBreakpoint===S){return this._MCVisible&&this.getProperty("showMainContent");}else{return this.getProperty("showMainContent");}};D.prototype.setEqualSplit=function(t){this._MCVisible=true;this._SCVisible=true;this.setProperty("equalSplit",t,true);if(this._currentBreakpoint){this._setResizeData(this._currentBreakpoint,t);this._changeGridState();}return this;};D.prototype.addSideContent=function(t){this.addAggregation("sideContent",t,true);this._rerenderControl(this.getAggregation("sideContent"),this.$(n));return this;};D.prototype.addMainContent=function(t){this.addAggregation("mainContent",t,true);this._rerenderControl(this.getAggregation("mainContent"),this.$(o));return this;};D.prototype.toggle=function(){if(this._currentBreakpoint===S){if(!this.getProperty("showMainContent")){this.setShowMainContent(true,true);this._MCVisible=false;}if(!this.getProperty("showSideContent")){this.setShowSideContent(true,true);this._SCVisible=false;}if(this._MCVisible&&!this._SCVisible){this._SCVisible=true;this._MCVisible=false;}else if(!this._MCVisible&&this._SCVisible){this._MCVisible=true;this._SCVisible=false;}this._changeGridState();}return this;};D.prototype.getCurrentBreakpoint=function(){return this._currentBreakpoint;};D.prototype.onBeforeRendering=function(){this._detachContainerResizeListener();this._SCVisible=this.getProperty("showSideContent");this._MCVisible=this.getProperty("showMainContent");if(!this.getContainerQuery()){this._iWindowWidth=q(window).width();this._setBreakpointFromWidth(this._iWindowWidth);this._setResizeData(this._currentBreakpoint,this.getEqualSplit());}};D.prototype.onAfterRendering=function(){if(this.getContainerQuery()){this._attachContainerResizeListener();this._adjustToScreenSize();}else{var t=this;q(window).resize(function(){t._adjustToScreenSize();});}this._changeGridState();this._initScrolling();};D.prototype.exit=function(){this._detachContainerResizeListener();if(this._oSCScroller){this._oSCScroller.destroy();this._oSCScroller=null;}if(this._oMCScroller){this._oMCScroller.destroy();this._oMCScroller=null;}};D.prototype._rerenderControl=function(t,$){if(this.getDomRef()){var u=sap.ui.getCore().createRenderManager();this.getRenderer().renderControls(u,t);u.flush($[0]);u.destroy();}return this;};D.prototype._initScrolling=function(){var t=this.getId(),u=t+"-"+n,v=t+"-"+o;if(!this._oSCScroller&&!this._oMCScroller){q.sap.require("sap.ui.core.delegate.ScrollEnablement");this._oSCScroller=new sap.ui.core.delegate.ScrollEnablement(this,null,{scrollContainerId:u,horizontal:false,vertical:true});this._oMCScroller=new sap.ui.core.delegate.ScrollEnablement(this,null,{scrollContainerId:v,horizontal:false,vertical:true});}};D.prototype._attachContainerResizeListener=function(){if(!this._sContainerResizeListener){this._sContainerResizeListener=R.register(this,q.proxy(this._adjustToScreenSize,this));}};D.prototype._detachContainerResizeListener=function(){if(this._sContainerResizeListener){R.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null;}};D.prototype._getBreakPointFromWidth=function(w){if(w<=p&&this._currentBreakpoint!==S){return S;}else if((w>p)&&(w<=r)&&this._currentBreakpoint!==M){return M;}else if((w>r)&&(w<=s)&&this._currentBreakpoint!==L){return L;}else if(w>s&&this._currentBreakpoint!==X){return X;}return this._currentBreakpoint;};D.prototype._setBreakpointFromWidth=function(w){this._currentBreakpoint=this._getBreakPointFromWidth(w);if(this._bSuppressInitialFireBreakPointChange){this._bSuppressInitialFireBreakPointChange=false;}else{this.fireBreakpointChanged({currentBreakpoint:this._currentBreakpoint});}};D.prototype._adjustToScreenSize=function(){if(this.getContainerQuery()){this._iWindowWidth=this.$().parent().width();}else{this._iWindowWidth=q(window).width();}if(this._iWindowWidth!==this._iOldWindowWidth){this._iOldWindowWidth=this._iWindowWidth;this._oldBreakPoint=this._currentBreakpoint;this._setBreakpointFromWidth(this._iWindowWidth);if((this._oldBreakPoint!==this._currentBreakpoint)||(this._currentBreakpoint===M&&this.getSideContentFallDown()===b.OnMinimumWidth)){this._setResizeData(this._currentBreakpoint,this.getEqualSplit());this._changeGridState();}}};D.prototype._setResizeData=function(t,u){var v=this.getSideContentVisibility(),w=this.getSideContentFallDown();if(!u){switch(t){case S:this._setSpanSize(m,m);if(this.getProperty("showSideContent")&&this.getProperty("showMainContent")){this._SCVisible=v===c.AlwaysShow;}this._bFixedSideContent=false;break;case M:var x=Math.ceil((33.333/100)*this._iWindowWidth);if(w===b.BelowL||w===b.BelowXL||(x<=320&&w===b.OnMinimumWidth)){this._setSpanSize(m,m);this._bFixedSideContent=false;}else{this._setSpanSize(h,j);this._bFixedSideContent=true;}this._SCVisible=v===c.ShowAboveS||v===c.AlwaysShow;this._MCVisible=true;break;case L:if(w===b.BelowXL){this._setSpanSize(m,m);}else{this._setSpanSize(h,j);}this._SCVisible=v===c.ShowAboveS||v===c.ShowAboveM||v===c.AlwaysShow;this._MCVisible=true;this._bFixedSideContent=false;break;case X:this._setSpanSize(g,k);this._SCVisible=v!==c.NeverShow;this._MCVisible=true;this._bFixedSideContent=false;break;default:throw new Error(I);}}else{switch(t){case S:this._setSpanSize(m,m);this._SCVisible=false;break;default:this._setSpanSize(i,i);this._SCVisible=true;this._MCVisible=true;}this._bFixedSideContent=false;}return this;};D.prototype._shouldSetHeight=function(){var t,B,O,u,v,F,w;t=(this._iScSpan+this._iMcSpan)===m;B=this._MCVisible&&this._SCVisible;O=!this._MCVisible&&this._SCVisible;u=this._MCVisible&&!this._SCVisible;v=O||u;F=this._fixedSideContent;w=this.getSideContentVisibility()===c.NeverShow;return((t&&B)||v||F||w);};D.prototype._changeGridState=function(){var $=this.$(n),t=this.$(o),u=this.getProperty("showMainContent"),v=this.getProperty("showSideContent");if(this._bFixedSideContent){$.removeClass().addClass(f);t.removeClass().addClass(e);}else{$.removeClass(f);t.removeClass(e);}if(this._SCVisible&&this._MCVisible&&v&&u){if(!this._bFixedSideContent){t.removeClass().addClass("sapUiDSCSpan"+this._iMcSpan);$.removeClass().addClass("sapUiDSCSpan"+this._iScSpan);}if(this._shouldSetHeight()){$.css("height","100%").css("float","left");t.css("height","100%").css("float","left");}else{$.css("height","auto").css("float","none");t.css("height","auto").css("float","none");}}else if(!this._SCVisible&&!this._MCVisible){t.addClass(H);$.addClass(H);}else if(this._MCVisible&&u){t.removeClass().addClass(d);$.addClass(H);}else if(this._SCVisible&&v){$.removeClass().addClass(d);t.addClass(H);}else if(!u&&!v){t.addClass(H);$.addClass(H);}};D.prototype._setSpanSize=function(t,u){this._iScSpan=t;this._iMcSpan=u;};return D;});
