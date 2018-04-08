/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Global'],function(q){"use strict";function u(i){return sap.ui.getCore().getUIArea(this.id)!=null;}function f(i,o){return sap.ui.getCore().getUIArea(this.id);}function a(c,i){return c.getUIArea().getInterface();}q.fn.root=function(r){if(r){sap.ui.getCore().setRoot(this.get(0),r);return this;}var c=this.control();if(c.length>0){return c.map(a);}var U=this.uiarea();if(U.length>0){return U;}this.each(function(i){sap.ui.getCore().createUIArea(this);});return this;};q.fn.uiarea=function(i){var U=this.slice("[id]").filter(u).map(f).get();return typeof(i)==="number"?U[i]:U;};q.fn.control=function(i,I){var c=this.map(function(){var C;if(I){var $=q(this).closest("[data-sap-ui],[data-sap-ui-related]");C=$.attr("data-sap-ui-related")||$.attr("id");}else{C=q(this).closest("[data-sap-ui]").attr("id");}return sap.ui.getCore().byId(C);});return c.get(i);};q.fn.sapui=function(c,i,C){return this.each(function(){var o=null;if(this){if(c.indexOf(".")==-1){c="sap.ui.commons."+c;}var b=q.sap.getObject(c);if(b){if(typeof C=='object'&&typeof C.press=='function'){C.press=q.proxy(C.press,this);}o=new(b)(i,C);o.placeAt(this);}}});};return q;});