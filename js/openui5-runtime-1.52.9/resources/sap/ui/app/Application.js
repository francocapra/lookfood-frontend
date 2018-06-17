/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global', './ApplicationMetadata', 'sap/ui/core/Component', 'jquery.sap.sjax'], function (q, A, C) {
    "use strict";
    var a = C.extend("sap.ui.app.Application", {
        metadata: {
            "abstract": true,
            properties: {
                root: "string",
                config: "any"
            },
            aggregations: {
                rootComponent: {
                    type: "sap.ui.core.UIComponent",
                    multiple: false
                }
            },
            publicMethods: ["getView"],
            deprecated: true
        },
        constructor: function (i, s) {
            if (this.onError) {
                this.onWindowError = this.onError;
            }
            if (this.onBeforeExit) {
                this.onWindowBeforeUnload = this.onBeforeExit;
            }
            if (this.onExit) {
                this.onWindowUnload = this.onExit;
            }
            C.apply(this, arguments);
            if (sap.ui.getApplication) {
                throw new Error("Only one instance of sap.ui.app.Application is allowed");
            }
            sap.ui.getApplication = q.proxy(this._getInstance, this);
            sap.ui.getCore().attachInit(q.proxy(function () {
                this._initRootComponent();
                this.main();
            }, this));
        },
        _initRootComponent: function () {
            var r = this.createRootComponent();
            if (r) {
                this.setRootComponent(r);
                var c = new sap.ui.core.ComponentContainer({
                    component: r
                });
                c.placeAt(this.getRoot() || document.body);
            }
        },
        createRootComponent: function () {
            var r = this.getMetadata().getRootComponent();
            var R;
            if (r) {
                R = sap.ui.component({
                    name: r
                });
            }
            return R;
        },
        getView: function () {
            return this.getRootComponent();
        },
        _getInstance: function () {
            return this;
        },
        main: function () {},
        onBeforeExit: function () {},
        onExit: function () {},
        onError: null,
        setConfig: function (c) {
            if (typeof c === "string") {
                var u = c;
                var c = new sap.ui.model.json.JSONModel();
                var r = q.sap.sjax({
                    url: u,
                    dataType: 'json'
                });
                if (r.success) {
                    c.setData(r.data);
                } else {
                    throw new Error("Could not load config file: " + u);
                }
            }
            if (typeof c === "object" && !c instanceof sap.ui.model.Model) {
                c = new sap.ui.model.JSONModel(c);
            }
            this.setProperty("config", c);
        },
        destroy: function (s) {
            delete sap.ui.getApplication;
            C.prototype.destroy.apply(this, arguments);
        }
    }, A);
    return a;
}, true);