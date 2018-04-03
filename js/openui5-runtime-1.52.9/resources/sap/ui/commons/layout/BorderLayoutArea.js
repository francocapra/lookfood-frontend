/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/library','sap/ui/core/CustomStyleClassSupport','sap/ui/core/Element'],function(q,l,C,E){"use strict";var B=E.extend("sap.ui.commons.layout.BorderLayoutArea",{metadata:{library:"sap.ui.commons",properties:{areaId:{type:"sap.ui.commons.layout.BorderLayoutAreaTypes",group:"Identification",defaultValue:sap.ui.commons.layout.BorderLayoutAreaTypes.top,deprecated:true},overflowX:{type:"string",group:"Misc",defaultValue:'auto'},overflowY:{type:"string",group:"Misc",defaultValue:'auto'},contentAlign:{type:"string",group:"Misc",defaultValue:'left'},size:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'100px'},visible:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});C.apply(B.prototype);B.prototype.getAreaId=function(){var p=this.getParent();return(p&&p instanceof sap.ui.commons.layout.BorderLayout)?this.sParentAggregationName:undefined;};B.prototype.setVisible=function(v,b){var a=this.getAreaId();if(a==="center"||!b){this.setProperty("visible",v);return this;}this.setProperty("visible",v,true);this.getParent().getMetadata().getRenderer().animate(this,v);return this;};return B;},true);
