window["sap-ui-optimized"] = true;
try {
	/*!
	 * UI development toolkit for HTML5 (OpenUI5)
	 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
	 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
	 */
	if (window.jQuery && window.jQuery.sap && window.jQuery.sap.declare) {
		window.jQuery.sap.declare("sap.ui.Device", false);
	}
	if (typeof window.sap !== "object" && typeof window.sap !== "function") {
		window.sap = {};
	}
	if (typeof window.sap.ui !== "object") {
		window.sap.ui = {};
	}(function () {
		"use strict";
		if (typeof window.sap.ui.Device === "object" || typeof window.sap.ui.Device === "function") {
			var c = "1.52.9";
			window.sap.ui.Device._checkAPIVersion(c);
			return;
		}
		var d = {};

		function p(i, w) {
			return ("000" + String(i)).slice(-w);
		}
		var F = 0,
			E = 1,
			W = 2,
			I = 3,
			D = 4,
			T = 5;
		var g = function () {
			this.defaultComponent = 'DEVICE';
			this.sWindowName = (window.top == window) ? "" : "[" + window.location.pathname.split('/').slice(-1)[0] + "] ";
			this.log = function (i, s, a) {
				a = a || this.defaultComponent || '';
				var b = new Date(),
					e = {
						time: p(b.getHours(), 2) + ":" + p(b.getMinutes(), 2) + ":" + p(b.getSeconds(), 2),
						date: p(b.getFullYear(), 4) + "-" + p(b.getMonth() + 1, 2) + "-" + p(b.getDate(), 2),
						timestamp: b.getTime(),
						level: i,
						message: s || "",
						component: a || ""
					};
				if (window.console) {
					var f = e.date + " " + e.time + " " + this.sWindowName + e.message + " - " + e.component;
					switch (i) {
						case F:
						case E:
							console.error(f);
							break;
						case W:
							console.warn(f);
							break;
						case I:
							console.info ? console.info(f) : console.log(f);
							break;
						case D:
							console.debug ? console.debug(f) : console.log(f);
							break;
						case T:
							console.trace ? console.trace(f) : console.log(f);
							break;
					}
				}
				return e;
			};
		};
		var l = new g();
		l.log(I, "Device API logging initialized");
		d._checkAPIVersion = function (s) {
			var v = "1.52.9";
			if (v != s) {
				l.log(W, "Device API version differs: " + v + " <-> " + s);
			}
		};
		var h = {};

		function j(e, f, a) {
			if (!h[e]) {
				h[e] = [];
			}
			h[e].push({
				oListener: a,
				fFunction: f
			});
		}

		function k(e, f, a) {
			var b = h[e];
			if (!b) {
				return this;
			}
			for (var i = 0, q = b.length; i < q; i++) {
				if (b[i].fFunction === f && b[i].oListener === a) {
					b.splice(i, 1);
					break;
				}
			}
			if (b.length == 0) {
				delete h[e];
			}
		}

		function n(e, a) {
			var b = h[e],
				f;
			if (b) {
				b = b.slice();
				for (var i = 0, q = b.length; i < q; i++) {
					f = b[i];
					f.fFunction.call(f.oListener || window, a);
				}
			}
		}
		var O = {
			"WINDOWS": "win",
			"MACINTOSH": "mac",
			"LINUX": "linux",
			"IOS": "iOS",
			"ANDROID": "Android",
			"BLACKBERRY": "bb",
			"WINDOWS_PHONE": "winphone"
		};

		function o(a) {
			a = a || navigator.userAgent;
			var b, e;

			function f() {
				var s = navigator.platform;
				if (s.indexOf("Win") != -1) {
					var t = /Windows NT (\d+).(\d)/i;
					var v = a.match(t);
					var w = "";
					if (v[1] == "6") {
						if (v[2] == 1) {
							w = "7";
						} else if (v[2] > 1) {
							w = "8";
						}
					} else {
						w = v[1];
					}
					return {
						"name": O.WINDOWS,
						"versionStr": w
					};
				} else if (s.indexOf("Mac") != -1) {
					return {
						"name": O.MACINTOSH,
						"versionStr": ""
					};
				} else if (s.indexOf("Linux") != -1) {
					return {
						"name": O.LINUX,
						"versionStr": ""
					};
				}
				l.log(I, "OS detection returned no result");
				return null;
			}
			b = /Windows Phone (?:OS )?([\d.]*)/;
			e = a.match(b);
			if (e) {
				return ({
					"name": O.WINDOWS_PHONE,
					"versionStr": e[1]
				});
			}
			if (a.indexOf("(BB10;") > 0) {
				b = /\sVersion\/([\d.]+)\s/;
				e = a.match(b);
				if (e) {
					return {
						"name": O.BLACKBERRY,
						"versionStr": e[1]
					};
				} else {
					return {
						"name": O.BLACKBERRY,
						"versionStr": '10'
					};
				}
			}
			b = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;
			e = a.match(b);
			if (e) {
				var i = /iPhone|iPad|iPod/;
				var q = /PlayBook|BlackBerry/;
				if (e[0].match(i)) {
					e[3] = e[3].replace(/_/g, ".");
					return ({
						"name": O.IOS,
						"versionStr": e[3]
					});
				} else if (e[2].match(/Android/)) {
					e[2] = e[2].replace(/\s/g, "");
					return ({
						"name": O.ANDROID,
						"versionStr": e[3]
					});
				} else if (e[0].match(q)) {
					return ({
						"name": O.BLACKBERRY,
						"versionStr": e[4]
					});
				}
			}
			b = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
			e = a.match(b);
			if (e) {
				return ({
					"name": O.ANDROID,
					"versionStr": e.length == 3 ? e[2] : ""
				});
			}
			return f();
		}

		function r(a) {
			d.os = o(a) || {};
			d.os.OS = O;
			d.os.version = d.os.versionStr ? parseFloat(d.os.versionStr) : -1;
			if (d.os.name) {
				for (var b in O) {
					if (O[b] === d.os.name) {
						d.os[b.toLowerCase()] = true;
					}
				}
			}
		}
		r();
		d._setOS = r;
		var B = {
			"INTERNET_EXPLORER": "ie",
			"EDGE": "ed",
			"FIREFOX": "ff",
			"CHROME": "cr",
			"SAFARI": "sf",
			"ANDROID": "an"
		};
		var u = navigator.userAgent;
		/*!
		 * Taken from jQuery JavaScript Library v1.7.1
		 * http://jquery.com/
		 *
		 * Copyright 2011, John Resig
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * Includes Sizzle.js
		 * http://sizzlejs.com/
		 * Copyright 2011, The Dojo Foundation
		 * Released under the MIT, BSD, and GPL Licenses.
		 *
		 * Date: Mon Nov 21 21:11:03 2011 -0500
		 */

		function y(a) {
			var b = (a || u).toLowerCase();
			var e = /(webkit)[ \/]([\w.]+)/;
			var f = /(opera)(?:.*version)?[ \/]([\w.]+)/;
			var i = /(msie) ([\w.]+)/;
			var q = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
			var s = /(edge)[ \/]([\w.]+)/;
			var t = /(mozilla)(?:.*? rv:([\w.]+))?/;
			var v = s.exec(b) || q.exec(b) || e.exec(b) || f.exec(b) || i.exec(b) || b.indexOf("compatible") < 0 && t.exec(b) || [];
			var w = {
				browser: v[1] || "",
				version: v[2] || "0"
			};
			w[w.browser] = true;
			return w;
		}

		function z(a, e) {
			var b = y(a);
			var f = a || u;
			var i = e || window.navigator;
			var q;
			if (b.mozilla) {
				q = /Mobile/;
				if (f.match(/Firefox\/(\d+\.\d+)/)) {
					var v = parseFloat(RegExp.$1);
					return {
						name: B.FIREFOX,
						versionStr: "" + v,
						version: v,
						mozilla: true,
						mobile: q.test(f)
					};
				} else {
					return {
						mobile: q.test(f),
						mozilla: true,
						version: -1
					};
				}
			} else if (b.webkit) {
				var s = f.toLowerCase().match(/webkit[\/]([\d.]+)/);
				var w;
				if (s) {
					w = s[1];
				}
				q = /Mobile/;
				if (f.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/)) {
					var v = parseFloat(RegExp.$2);
					return {
						name: B.CHROME,
						versionStr: "" + v,
						version: v,
						mobile: q.test(f),
						webkit: true,
						webkitVersion: w
					};
				} else if (f.match(/FxiOS\/(\d+\.\d+)/)) {
					var v = parseFloat(RegExp.$1);
					return {
						name: B.FIREFOX,
						versionStr: "" + v,
						version: v,
						mobile: true,
						webkit: true,
						webkitVersion: w
					};
				} else if (f.match(/Android .+ Version\/(\d+\.\d+)/)) {
					var v = parseFloat(RegExp.$1);
					return {
						name: B.ANDROID,
						versionStr: "" + v,
						version: v,
						mobile: q.test(f),
						webkit: true,
						webkitVersion: w
					};
				} else {
					var t = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
					var x = i.standalone;
					if (t.test(f)) {
						var w1 = t.exec(f);
						var v = parseFloat(w1[2]);
						return {
							name: B.SAFARI,
							versionStr: "" + v,
							fullscreen: false,
							webview: false,
							version: v,
							mobile: q.test(f),
							webkit: true,
							webkitVersion: w,
							phantomJS: w1[1] === "PhantomJS"
						};
					} else if (/iPhone|iPad|iPod/.test(f) && !(/CriOS/.test(f)) && !(/FxiOS/.test(f)) && (x === true || x === false)) {
						return {
							name: B.SAFARI,
							version: -1,
							fullscreen: x,
							webview: !x,
							mobile: q.test(f),
							webkit: true,
							webkitVersion: w
						};
					} else {
						return {
							mobile: q.test(f),
							webkit: true,
							webkitVersion: w,
							version: -1
						};
					}
				}
			} else if (b.msie || b.trident) {
				var v;
				if (document.documentMode && !a) {
					if (document.documentMode === 7) {
						v = 8.0;
					} else {
						v = parseFloat(document.documentMode);
					}
				} else {
					v = parseFloat(b.version);
				}
				return {
					name: B.INTERNET_EXPLORER,
					versionStr: "" + v,
					version: v,
					msie: true,
					mobile: false
				};
			} else if (b.edge) {
				var v = v = parseFloat(b.version);
				return {
					name: B.EDGE,
					versionStr: "" + v,
					version: v,
					edge: true
				};
			}
			return {
				name: "",
				versionStr: "",
				version: -1,
				mobile: false
			};
		}
		d._testUserAgent = z;

		function A() {
			d.browser = z();
			d.browser.BROWSER = B;
			if (d.browser.name) {
				for (var b in B) {
					if (B[b] === d.browser.name) {
						d.browser[b.toLowerCase()] = true;
					}
				}
			}
		}
		A();
		d.support = {};
		d.support.touch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
		if (d.browser.phantomJS) {
			d.support.touch = false;
		}
		d.support.pointer = !!window.PointerEvent;
		d.support.matchmedia = !!window.matchMedia;
		var m = d.support.matchmedia ? window.matchMedia("all and (max-width:0px)") : null;
		d.support.matchmedialistener = !!(m && m.addListener);
		if (d.browser.safari && d.browser.version < 6 && !d.browser.fullscreen && !d.browser.webview) {
			d.support.matchmedialistener = false;
		}
		d.support.orientation = !!("orientation" in window && "onorientationchange" in window);
		d.support.retina = (window.retina || window.devicePixelRatio >= 2);
		d.support.websocket = ('WebSocket' in window);
		d.support.input = {};
		d.support.input.placeholder = ('placeholder' in document.createElement("input"));
		d.media = {};
		var R = {
			"SAP_3STEPS": "3Step",
			"SAP_4STEPS": "4Step",
			"SAP_6STEPS": "6Step",
			"SAP_STANDARD": "Std",
			"SAP_STANDARD_EXTENDED": "StdExt"
		};
		d.media.RANGESETS = R;
		d.media._predefinedRangeSets = {};
		d.media._predefinedRangeSets[R.SAP_3STEPS] = {
			points: [520, 960],
			unit: "px",
			name: R.SAP_3STEPS,
			names: ["S", "M", "L"]
		};
		d.media._predefinedRangeSets[R.SAP_4STEPS] = {
			points: [520, 760, 960],
			unit: "px",
			name: R.SAP_4STEPS,
			names: ["S", "M", "L", "XL"]
		};
		d.media._predefinedRangeSets[R.SAP_6STEPS] = {
			points: [241, 400, 541, 768, 960],
			unit: "px",
			name: R.SAP_6STEPS,
			names: ["XS", "S", "M", "L", "XL", "XXL"]
		};
		d.media._predefinedRangeSets[R.SAP_STANDARD] = {
			points: [600, 1024],
			unit: "px",
			name: R.SAP_STANDARD,
			names: ["Phone", "Tablet", "Desktop"]
		};
		d.media._predefinedRangeSets[R.SAP_STANDARD_EXTENDED] = {
			points: [600, 1024, 1440],
			unit: "px",
			name: R.SAP_STANDARD_EXTENDED,
			names: ["Phone", "Tablet", "Desktop", "LargeDesktop"]
		};
		var _ = R.SAP_STANDARD;
		var C = d.support.matchmedialistener ? 0 : 100;
		var G = {};
		var H = null;

		function J(f, t, a) {
			a = a || "px";
			var q = "all";
			if (f > 0) {
				q = q + " and (min-width:" + f + a + ")";
			}
			if (t > 0) {
				q = q + " and (max-width:" + t + a + ")";
			}
			return q;
		}

		function K(a) {
			if (!d.support.matchmedialistener && H == Q()[0]) {
				return;
			}
			if (G[a].timer) {
				clearTimeout(G[a].timer);
				G[a].timer = null;
			}
			G[a].timer = setTimeout(function () {
				var b = M(a, false);
				if (b) {
					n("media_" + a, b);
				}
			}, C);
		}

		function L(s, i) {
			var q = G[s].queries[i];
			var a = {
				from: q.from,
				unit: G[s].unit
			};
			if (q.to >= 0) {
				a.to = q.to;
			}
			if (G[s].names) {
				a.name = G[s].names[i];
			}
			return a;
		}

		function M(a, b, f) {
			f = f || d.media.matches;
			if (G[a]) {
				var e = G[a].queries;
				var s = null;
				for (var i = 0, t = e.length; i < t; i++) {
					var q = e[i];
					if ((q != G[a].currentquery || b) && f(q.from, q.to, G[a].unit)) {
						if (!b) {
							G[a].currentquery = q;
						}
						if (!G[a].noClasses && G[a].names && !b) {
							N(a, G[a].names[i]);
						}
						s = L(a, i);
					}
				}
				return s;
			}
			l.log(W, "No queryset with name " + a + " found", 'DEVICE.MEDIA');
			return null;
		}

		function N(s, a, b) {
			var e = "sapUiMedia-" + s + "-";
			P(e + a, b, e);
		}

		function P(s, b, a) {
			var e = document.documentElement;
			if (e.className.length == 0) {
				if (!b) {
					e.className = s;
				}
			} else {
				var f = e.className.split(" ");
				var q = "";
				for (var i = 0; i < f.length; i++) {
					if ((a && f[i].indexOf(a) != 0) || (!a && f[i] != s)) {
						q = q + f[i] + " ";
					}
				}
				if (!b) {
					q = q + s;
				}
				e.className = q;
			}
		}

		function Q() {
			return [window.innerWidth, window.innerHeight];
		}

		function S(v, a) {
			if (a === "em" || a === "rem") {
				var s = window.getComputedStyle || function (e) {
					return e.currentStyle;
				};
				var x = s(document.documentElement).fontSize;
				var f = (x && x.indexOf("px") >= 0) ? parseFloat(x, 10) : 16;
				return v * f;
			}
			return v;
		}

		function U(f, t, e, s) {
			f = S(f, e);
			t = S(t, e);
			var w = s[0];
			var a = f < 0 || f <= w;
			var b = t < 0 || w <= t;
			return a && b;
		}

		function V(f, t, a) {
			return U(f, t, a, Q());
		}

		function X(f, t, a) {
			var q = J(f, t, a);
			var b = window.matchMedia(q);
			return b && b.matches;
		}
		d.media.matches = d.support.matchmedia ? X : V;
		d.media.attachHandler = function (f, a, s) {
			var b = s || _;
			j("media_" + b, f, a);
		};
		d.media.detachHandler = function (f, a, s) {
			var b = s || _;
			k("media_" + b, f, a);
		};
		d.media.initRangeSet = function (s, a, b, e, f) {
			var t;
			if (!s) {
				t = d.media._predefinedRangeSets[_];
			} else if (s && d.media._predefinedRangeSets[s]) {
				t = d.media._predefinedRangeSets[s];
			} else {
				t = {
					name: s,
					unit: (b || "px").toLowerCase(),
					points: a || [],
					names: e,
					noClasses: !!f
				};
			}
			if (d.media.hasRangeSet(t.name)) {
				l.log(I, "Range set " + t.name + " has already been initialized", 'DEVICE.MEDIA');
				return;
			}
			s = t.name;
			t.queries = [];
			t.timer = null;
			t.currentquery = null;
			t.listener = function () {
				return K(s);
			};
			var v, w, x;
			var w1 = t.points;
			for (var i = 0, x1 = w1.length; i <= x1; i++) {
				v = (i == 0) ? 0 : w1[i - 1];
				w = (i == w1.length) ? -1 : w1[i];
				x = J(v, w, t.unit);
				t.queries.push({
					query: x,
					from: v,
					to: w
				});
			}
			if (t.names && t.names.length != t.queries.length) {
				t.names = null;
			}
			G[t.name] = t;
			if (d.support.matchmedialistener) {
				var y1 = t.queries;
				for (var i = 0; i < y1.length; i++) {
					var q = y1[i];
					q.media = window.matchMedia(q.query);
					q.media.addListener(t.listener);
				}
			} else {
				window.addEventListener("resize", t.listener, false);
				window.addEventListener("orientationchange", t.listener, false);
			}
			t.listener();
		};
		d.media.getCurrentRange = function (s, w) {
			if (!d.media.hasRangeSet(s)) {
				return null;
			}
			return M(s, true, isNaN(w) ? null : function (f, t, a) {
				return U(f, t, a, [w, 0]);
			});
		};
		d.media.hasRangeSet = function (s) {
			return s && !!G[s];
		};
		d.media.removeRangeSet = function (s) {
			if (!d.media.hasRangeSet(s)) {
				l.log(I, "RangeSet " + s + " not found, thus could not be removed.", 'DEVICE.MEDIA');
				return;
			}
			for (var x in R) {
				if (s === R[x]) {
					l.log(W, "Cannot remove default rangeset - no action taken.", 'DEVICE.MEDIA');
					return;
				}
			}
			var a = G[s];
			if (d.support.matchmedialistener) {
				var q = a.queries;
				for (var i = 0; i < q.length; i++) {
					q[i].media.removeListener(a.listener);
				}
			} else {
				window.removeEventListener("resize", a.listener, false);
				window.removeEventListener("orientationchange", a.listener, false);
			}
			N(s, "", true);
			delete h["media_" + s];
			delete G[s];
		};
		var Y = {
			"TABLET": "tablet",
			"PHONE": "phone",
			"DESKTOP": "desktop",
			"COMBI": "combi"
		};
		d.system = {};

		function Z(a, b) {
			var t = $(b);
			var i = d.os.windows && d.os.version >= 8;
			var e = d.os.windows && d.os.version === 7;
			var s = {};
			s.tablet = !!(((d.support.touch && !e) || i || !!a) && t);
			s.phone = !!(d.os.windows_phone || ((d.support.touch && !e) || !!a) && !t);
			s.desktop = !!((!s.tablet && !s.phone) || i || e);
			s.combi = !!(s.desktop && s.tablet);
			s.SYSTEMTYPE = Y;
			for (var f in Y) {
				P("sap-" + Y[f], !s[Y[f]]);
			}
			return s;
		}

		function $(a) {
			var u = a || navigator.userAgent;
			var i = d.os.windows && d.os.version >= 8;
			if (d.os.name === d.os.OS.IOS) {
				return /ipad/i.test(u);
			} else {
				if (d.support.touch) {
					if (i) {
						return true;
					}
					if (d.browser.chrome && d.os.android && d.os.version >= 4.4) {
						return !/Mobile Safari\/[.0-9]+/.test(u);
					} else {
						var b = window.devicePixelRatio ? window.devicePixelRatio : 1;
						if (d.os.android && d.browser.webkit && (parseFloat(d.browser.webkitVersion) > 537.10)) {
							b = 1;
						}
						var t = (Math.min(window.screen.width / b, window.screen.height / b) >= 600);
						if (s1() && (window.screen.height === 552 || window.screen.height === 553) && (/Nexus 7/i.test(u))) {
							t = true;
						}
						return t;
					}
				} else {
					var e = (/(?=android)(?=.*mobile)/i.test(u));
					return (d.browser.msie && u.indexOf("Touch") !== -1) || (d.os.android && !e);
				}
			}
		}

		function a1(a, b) {
			d.system = Z(a, b);
			if (d.system.tablet || d.system.phone) {
				d.browser.mobile = true;
			}
		}
		a1();
		d._getSystem = Z;
		d.orientation = {};
		d.resize = {};
		d.orientation.attachHandler = function (f, a) {
			j("orientation", f, a);
		};
		d.resize.attachHandler = function (f, a) {
			j("resize", f, a);
		};
		d.orientation.detachHandler = function (f, a) {
			k("orientation", f, a);
		};
		d.resize.detachHandler = function (f, a) {
			k("resize", f, a);
		};

		function b1(i) {
			i.landscape = s1(true);
			i.portrait = !i.landscape;
		}

		function c1() {
			b1(d.orientation);
			n("orientation", {
				landscape: d.orientation.landscape
			});
		}

		function d1() {
			e1(d.resize);
			n("resize", {
				height: d.resize.height,
				width: d.resize.width
			});
		}

		function e1(i) {
			i.width = Q()[0];
			i.height = Q()[1];
		}

		function f1() {
			var w = d.orientation.landscape;
			var i = s1();
			if (w != i) {
				c1();
			}
			if (!k1) {
				k1 = window.setTimeout(g1, 150);
			}
		}

		function g1() {
			d1();
			k1 = null;
		}
		var h1 = false;
		var i1 = false;
		var j1;
		var k1;
		var l1;
		var m1 = Q()[1];
		var n1 = Q()[0];
		var o1 = false;
		var p1;
		var q1 = /INPUT|TEXTAREA|SELECT/;
		var r1 = d.os.ios && d.browser.name === "sf" && ((d.system.phone && d.os.version >= 7 && d.os.version < 7.1) || (d.system.tablet && d.os.version >= 7));

		function s1(f) {
			if (d.support.touch && d.support.orientation && d.os.android) {
				if (o1 && f) {
					return !d.orientation.landscape;
				}
				if (o1) {
					return d.orientation.landscape;
				}
			} else if (d.support.matchmedia && d.support.orientation) {
				return !!window.matchMedia("(orientation: landscape)").matches;
			}
			var s = Q();
			return s[0] > s[1];
		}

		function t1(e) {
			if (e.type == "resize") {
				if (r1 && q1.test(document.activeElement.tagName) && !h1) {
					return;
				}
				var w = Q()[1];
				var i = Q()[0];
				var t = new Date().getTime();
				if (w === m1 && i === n1) {
					return;
				}
				i1 = true;
				if ((m1 != w) && (n1 == i)) {
					if (!p1 || (t - p1 > 300)) {
						o1 = (w < m1);
					}
					d1();
				} else {
					n1 = i;
				}
				p1 = t;
				m1 = w;
				if (l1) {
					window.clearTimeout(l1);
					l1 = null;
				}
				l1 = window.setTimeout(v1, 1200);
			} else if (e.type == "orientationchange") {
				h1 = true;
			}
			if (j1) {
				clearTimeout(j1);
				j1 = null;
			}
			j1 = window.setTimeout(u1, 50);
		}

		function u1() {
			if (i1 && (h1 || (d.system.tablet && d.os.ios && d.os.version >= 9))) {
				c1();
				d1();
				h1 = false;
				i1 = false;
				if (l1) {
					window.clearTimeout(l1);
					l1 = null;
				}
			}
			j1 = null;
		}

		function v1() {
			h1 = false;
			i1 = false;
			l1 = null;
		}
		d._update = function (a) {
			u = navigator.userAgent;
			l.log(W, "Device API values manipulated: NOT PRODUCTIVE FEATURE!!! This should be only used for test purposes. Only use if you know what you are doing.");
			A();
			r();
			a1(a);
		};
		e1(d.resize);
		b1(d.orientation);
		window.sap.ui.Device = d;
		if (d.support.touch && d.support.orientation) {
			window.addEventListener("resize", t1, false);
			window.addEventListener("orientationchange", t1, false);
		} else {
			window.addEventListener("resize", f1, false);
		}
		d.media.initRangeSet();
		d.media.initRangeSet(R["SAP_STANDARD_EXTENDED"]);
		if (sap.ui.define) {
			sap.ui.define("sap/ui/Device", [], function () {
				return d;
			});
		}
	}());
	/*!
	 * URI.js - Mutating URLs
	 *
	 * Version: 1.11.2
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.com/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *   GPL v3 http://opensource.org/licenses/GPL-3.0
	 *
	 */
	(function (r, f) {
		if (typeof exports === 'object') {
			module.exports = f(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
		} else if (typeof define === 'function' && define.amd) {
			r.URI = f(r.punycode, r.IPv6, r.SecondLevelDomains, r);
			define('sap/ui/thirdparty/URI', [], function () {
				return r.URI;
			});
		} else {
			r.URI = f(r.punycode, r.IPv6, r.SecondLevelDomains, r);
		}
	}(this, function (a, I, S, r) {
		"use strict";
		var _ = r && r.URI;

		function U(c, d) {
			if (!(this instanceof U)) {
				return new U(c, d);
			}
			if (c === undefined) {
				if (typeof location !== 'undefined') {
					c = location.href + "";
				} else {
					c = "";
				}
			}
			this.href(c);
			if (d !== undefined) {
				return this.absoluteTo(d);
			}
			return this;
		};
		var p = U.prototype;
		var h = Object.prototype.hasOwnProperty;

		function b(s) {
			return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
		}

		function g(v) {
			if (v === undefined) {
				return 'Undefined';
			}
			return String(Object.prototype.toString.call(v)).slice(8, -1);
		}

		function f(c) {
			return g(c) === "Array";
		}

		function j(d, v) {
			var l = {};
			var i, c;
			if (f(v)) {
				for (i = 0, c = v.length; i < c; i++) {
					l[v[i]] = true;
				}
			} else {
				l[v] = true;
			}
			for (i = 0, c = d.length; i < c; i++) {
				if (l[d[i]] !== undefined) {
					d.splice(i, 1);
					c--;
					i--;
				}
			}
			return d;
		}

		function k(l, v) {
			var i, c;
			if (f(v)) {
				for (i = 0, c = v.length; i < c; i++) {
					if (!k(l, v[i])) {
						return false;
					}
				}
				return true;
			}
			var d = g(v);
			for (i = 0, c = l.length; i < c; i++) {
				if (d === 'RegExp') {
					if (typeof l[i] === 'string' && l[i].match(v)) {
						return true;
					}
				} else if (l[i] === v) {
					return true;
				}
			}
			return false;
		}

		function m(c, t) {
			if (!f(c) || !f(t)) {
				return false;
			}
			if (c.length !== t.length) {
				return false;
			}
			c.sort();
			t.sort();
			for (var i = 0, l = c.length; i < l; i++) {
				if (c[i] !== t[i]) {
					return false;
				}
			}
			return true;
		}
		U._parts = function () {
			return {
				protocol: null,
				username: null,
				password: null,
				hostname: null,
				urn: null,
				port: null,
				path: null,
				query: null,
				fragment: null,
				duplicateQueryParameters: U.duplicateQueryParameters,
				escapeQuerySpace: U.escapeQuerySpace
			};
		};
		U.duplicateQueryParameters = false;
		U.escapeQuerySpace = true;
		U.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
		U.idn_expression = /[^a-z0-9\.-]/i;
		U.punycode_expression = /(xn--)/i;
		U.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		U.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
		U.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
		U.defaultPorts = {
			http: "80",
			https: "443",
			ftp: "21",
			gopher: "70",
			ws: "80",
			wss: "443"
		};
		U.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
		U.domAttributes = {
			'a': 'href',
			'blockquote': 'cite',
			'link': 'href',
			'base': 'href',
			'script': 'src',
			'form': 'action',
			'img': 'src',
			'area': 'href',
			'iframe': 'src',
			'embed': 'src',
			'source': 'src',
			'track': 'src',
			'input': 'src'
		};
		U.getDomAttribute = function (c) {
			if (!c || !c.nodeName) {
				return undefined;
			}
			var d = c.nodeName.toLowerCase();
			if (d === 'input' && c.type !== 'image') {
				return undefined;
			}
			return U.domAttributes[d];
		};

		function n(v) {
			return escape(v);
		}

		function o(s) {
			return encodeURIComponent(s).replace(/[!'()*]/g, n).replace(/\*/g, "%2A");
		}
		U.encode = o;
		U.decode = decodeURIComponent;
		U.iso8859 = function () {
			U.encode = escape;
			U.decode = unescape;
		};
		U.unicode = function () {
			U.encode = o;
			U.decode = decodeURIComponent;
		};
		U.characters = {
			pathname: {
				encode: {
					expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
					map: {
						"%24": "$",
						"%26": "&",
						"%2B": "+",
						"%2C": ",",
						"%3B": ";",
						"%3D": "=",
						"%3A": ":",
						"%40": "@"
					}
				},
				decode: {
					expression: /[\/\?#]/g,
					map: {
						"/": "%2F",
						"?": "%3F",
						"#": "%23"
					}
				}
			},
			reserved: {
				encode: {
					expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
					map: {
						"%3A": ":",
						"%2F": "/",
						"%3F": "?",
						"%23": "#",
						"%5B": "[",
						"%5D": "]",
						"%40": "@",
						"%21": "!",
						"%24": "$",
						"%26": "&",
						"%27": "'",
						"%28": "(",
						"%29": ")",
						"%2A": "*",
						"%2B": "+",
						"%2C": ",",
						"%3B": ";",
						"%3D": "="
					}
				}
			}
		};
		U.encodeQuery = function (s, e) {
			var c = U.encode(s + "");
			return e ? c.replace(/%20/g, '+') : c;
		};
		U.decodeQuery = function (s, c) {
			s += "";
			try {
				return U.decode(c ? s.replace(/\+/g, '%20') : s);
			} catch (e) {
				return s;
			}
		};
		U.recodePath = function (s) {
			var c = (s + "").split('/');
			for (var i = 0, l = c.length; i < l; i++) {
				c[i] = U.encodePathSegment(U.decode(c[i]));
			}
			return c.join('/');
		};
		U.decodePath = function (s) {
			var c = (s + "").split('/');
			for (var i = 0, l = c.length; i < l; i++) {
				c[i] = U.decodePathSegment(c[i]);
			}
			return c.join('/');
		};
		var u = {
			'encode': 'encode',
			'decode': 'decode'
		};
		var w;
		var y = function (d, w) {
			return function (s) {
				return U[w](s + "").replace(U.characters[d][w].expression, function (c) {
					return U.characters[d][w].map[c];
				});
			};
		};
		for (w in u) {
			U[w + "PathSegment"] = y("pathname", u[w]);
		}
		U.encodeReserved = y("reserved", "encode");
		U.parse = function (s, c) {
			var d;
			if (!c) {
				c = {};
			}
			d = s.indexOf('#');
			if (d > -1) {
				c.fragment = s.substring(d + 1) || null;
				s = s.substring(0, d);
			}
			d = s.indexOf('?');
			if (d > -1) {
				c.query = s.substring(d + 1) || null;
				s = s.substring(0, d);
			}
			if (s.substring(0, 2) === '//') {
				c.protocol = null;
				s = s.substring(2);
				s = U.parseAuthority(s, c);
			} else {
				d = s.indexOf(':');
				if (d > -1) {
					c.protocol = s.substring(0, d) || null;
					if (c.protocol && !c.protocol.match(U.protocol_expression)) {
						c.protocol = undefined;
					} else if (c.protocol === 'file') {
						s = s.substring(d + 3);
					} else if (s.substring(d + 1, d + 3) === '//') {
						s = s.substring(d + 3);
						s = U.parseAuthority(s, c);
					} else {
						s = s.substring(d + 1);
						c.urn = true;
					}
				}
			}
			c.path = s;
			return c;
		};
		U.parseHost = function (s, c) {
			var d = s.indexOf('/');
			var e;
			var t;
			if (d === -1) {
				d = s.length;
			}
			if (s.charAt(0) === "[") {
				e = s.indexOf(']');
				c.hostname = s.substring(1, e) || null;
				c.port = s.substring(e + 2, d) || null;
			} else if (s.indexOf(':') !== s.lastIndexOf(':')) {
				c.hostname = s.substring(0, d) || null;
				c.port = null;
			} else {
				t = s.substring(0, d).split(':');
				c.hostname = t[0] || null;
				c.port = t[1] || null;
			}
			if (c.hostname && s.substring(d).charAt(0) !== '/') {
				d++;
				s = "/" + s;
			}
			return s.substring(d) || '/';
		};
		U.parseAuthority = function (s, c) {
			s = U.parseUserinfo(s, c);
			return U.parseHost(s, c);
		};
		U.parseUserinfo = function (s, c) {
			var d = s.indexOf('/');
			var e = d > -1 ? s.lastIndexOf('@', d) : s.indexOf('@');
			var t;
			if (e > -1 && (d === -1 || e < d)) {
				t = s.substring(0, e).split(':');
				c.username = t[0] ? U.decode(t[0]) : null;
				t.shift();
				c.password = t[0] ? U.decode(t.join(':')) : null;
				s = s.substring(e + 1);
			} else {
				c.username = null;
				c.password = null;
			}
			return s;
		};
		U.parseQuery = function (s, e) {
			if (!s) {
				return {};
			}
			s = s.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
			if (!s) {
				return {};
			}
			var c = {};
			var d = s.split('&');
			var l = d.length;
			var v, t, x;
			for (var i = 0; i < l; i++) {
				v = d[i].split('=');
				t = U.decodeQuery(v.shift(), e);
				x = v.length ? U.decodeQuery(v.join('='), e) : null;
				if (c[t]) {
					if (typeof c[t] === "string") {
						c[t] = [c[t]];
					}
					c[t].push(x);
				} else {
					c[t] = x;
				}
			}
			return c;
		};
		U.build = function (c) {
			var t = "";
			if (c.protocol) {
				t += c.protocol + ":";
			}
			if (!c.urn && (t || c.hostname)) {
				t += '//';
			}
			t += (U.buildAuthority(c) || '');
			if (typeof c.path === "string") {
				if (c.path.charAt(0) !== '/' && typeof c.hostname === "string") {
					t += '/';
				}
				t += c.path;
			}
			if (typeof c.query === "string" && c.query) {
				t += '?' + c.query;
			}
			if (typeof c.fragment === "string" && c.fragment) {
				t += '#' + c.fragment;
			}
			return t;
		};
		U.buildHost = function (c) {
			var t = "";
			if (!c.hostname) {
				return "";
			} else if (U.ip6_expression.test(c.hostname)) {
				if (c.port) {
					t += "[" + c.hostname + "]:" + c.port;
				} else {
					t += c.hostname;
				}
			} else {
				t += c.hostname;
				if (c.port) {
					t += ':' + c.port;
				}
			}
			return t;
		};
		U.buildAuthority = function (c) {
			return U.buildUserinfo(c) + U.buildHost(c);
		};
		U.buildUserinfo = function (c) {
			var t = "";
			if (c.username) {
				t += U.encode(c.username);
				if (c.password) {
					t += ':' + U.encode(c.password);
				}
				t += "@";
			}
			return t;
		};
		U.buildQuery = function (d, c, e) {
			var t = "";
			var l, s, i, v;
			for (s in d) {
				if (h.call(d, s) && s) {
					if (f(d[s])) {
						l = {};
						for (i = 0, v = d[s].length; i < v; i++) {
							if (d[s][i] !== undefined && l[d[s][i] + ""] === undefined) {
								t += "&" + U.buildQueryParameter(s, d[s][i], e);
								if (c !== true) {
									l[d[s][i] + ""] = true;
								}
							}
						}
					} else if (d[s] !== undefined) {
						t += '&' + U.buildQueryParameter(s, d[s], e);
					}
				}
			}
			return t.substring(1);
		};
		U.buildQueryParameter = function (c, v, e) {
			return U.encodeQuery(c, e) + (v !== null ? "=" + U.encodeQuery(v, e) : "");
		};
		U.addQuery = function (d, c, v) {
			if (typeof c === "object") {
				for (var e in c) {
					if (h.call(c, e)) {
						U.addQuery(d, e, c[e]);
					}
				}
			} else if (typeof c === "string") {
				if (d[c] === undefined) {
					d[c] = v;
					return;
				} else if (typeof d[c] === "string") {
					d[c] = [d[c]];
				}
				if (!f(v)) {
					v = [v];
				}
				d[c] = d[c].concat(v);
			} else {
				throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
			}
		};
		U.removeQuery = function (d, c, v) {
			var i, l, e;
			if (f(c)) {
				for (i = 0, l = c.length; i < l; i++) {
					d[c[i]] = undefined;
				}
			} else if (typeof c === "object") {
				for (e in c) {
					if (h.call(c, e)) {
						U.removeQuery(d, e, c[e]);
					}
				}
			} else if (typeof c === "string") {
				if (v !== undefined) {
					if (d[c] === v) {
						d[c] = undefined;
					} else if (f(d[c])) {
						d[c] = j(d[c], v);
					}
				} else {
					d[c] = undefined;
				}
			} else {
				throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
			}
		};
		U.hasQuery = function (d, c, v, e) {
			if (typeof c === "object") {
				for (var i in c) {
					if (h.call(c, i)) {
						if (!U.hasQuery(d, i, c[i])) {
							return false;
						}
					}
				}
				return true;
			} else if (typeof c !== "string") {
				throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");
			}
			switch (g(v)) {
				case 'Undefined':
					return c in d;
				case 'Boolean':
					var l = Boolean(f(d[c]) ? d[c].length : d[c]);
					return v === l;
				case 'Function':
					return !!v(d[c], c, d);
				case 'Array':
					if (!f(d[c])) {
						return false;
					}
					var s = e ? k : m;
					return s(d[c], v);
				case 'RegExp':
					if (!f(d[c])) {
						return Boolean(d[c] && d[c].match(v));
					}
					if (!e) {
						return false;
					}
					return k(d[c], v);
				case 'Number':
					v = String(v);
				case 'String':
					if (!f(d[c])) {
						return d[c] === v;
					}
					if (!e) {
						return false;
					}
					return k(d[c], v);
				default:
					throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
			}
		};
		U.commonPath = function (c, t) {
			var l = Math.min(c.length, t.length);
			var d;
			for (d = 0; d < l; d++) {
				if (c.charAt(d) !== t.charAt(d)) {
					d--;
					break;
				}
			}
			if (d < 1) {
				return c.charAt(0) === t.charAt(0) && c.charAt(0) === '/' ? '/' : '';
			}
			if (c.charAt(d) !== '/' || t.charAt(d) !== '/') {
				d = c.substring(0, d).lastIndexOf('/');
			}
			return c.substring(0, d + 1);
		};
		U.withinString = function (s, c) {
			return s.replace(U.find_uri_expression, c);
		};
		U.ensureValidHostname = function (v) {
			if (v.match(U.invalid_hostname_characters)) {
				if (!a) {
					throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available");
				}
				if (a.toASCII(v).match(U.invalid_hostname_characters)) {
					throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-]");
				}
			}
		};
		U.noConflict = function (c) {
			if (c) {
				var d = {
					URI: this.noConflict()
				};
				if (URITemplate && typeof URITemplate.noConflict == "function") {
					d.URITemplate = URITemplate.noConflict();
				}
				if (I && typeof I.noConflict == "function") {
					d.IPv6 = I.noConflict();
				}
				if (SecondLevelDomains && typeof SecondLevelDomains.noConflict == "function") {
					d.SecondLevelDomains = SecondLevelDomains.noConflict();
				}
				return d;
			} else if (r.URI === this) {
				r.URI = _;
			}
			return this;
		};
		p.build = function (d) {
			if (d === true) {
				this._deferred_build = true;
			} else if (d === undefined || this._deferred_build) {
				this._string = U.build(this._parts);
				this._deferred_build = false;
			}
			return this;
		};
		p.clone = function () {
			return new U(this);
		};
		p.valueOf = p.toString = function () {
			return this.build(false)._string;
		};
		u = {
			protocol: 'protocol',
			username: 'username',
			password: 'password',
			hostname: 'hostname',
			port: 'port'
		};
		y = function (w) {
			return function (v, c) {
				if (v === undefined) {
					return this._parts[w] || "";
				} else {
					this._parts[w] = v || null;
					this.build(!c);
					return this;
				}
			};
		};
		for (w in u) {
			p[w] = y(u[w]);
		}
		u = {
			query: '?',
			fragment: '#'
		};
		y = function (w, c) {
			return function (v, d) {
				if (v === undefined) {
					return this._parts[w] || "";
				} else {
					if (v !== null) {
						v = v + "";
						if (v.charAt(0) === c) {
							v = v.substring(1);
						}
					}
					this._parts[w] = v;
					this.build(!d);
					return this;
				}
			};
		};
		for (w in u) {
			p[w] = y(w, u[w]);
		}
		u = {
			search: ['?', 'query'],
			hash: ['#', 'fragment']
		};
		y = function (w, c) {
			return function (v, d) {
				var t = this[w](v, d);
				return typeof t === "string" && t.length ? (c + t) : t;
			};
		};
		for (w in u) {
			p[w] = y(u[w][1], u[w][0]);
		}
		p.pathname = function (v, c) {
			if (v === undefined || v === true) {
				var d = this._parts.path || (this._parts.hostname ? '/' : '');
				return v ? U.decodePath(d) : d;
			} else {
				this._parts.path = v ? U.recodePath(v) : "/";
				this.build(!c);
				return this;
			}
		};
		p.path = p.pathname;
		p.href = function (c, d) {
			var e;
			if (c === undefined) {
				return this.toString();
			}
			this._string = "";
			this._parts = U._parts();
			var _ = c instanceof U;
			var i = typeof c === "object" && (c.hostname || c.path || c.pathname);
			if (c.nodeName) {
				var l = U.getDomAttribute(c);
				c = c[l] || "";
				i = false;
			}
			if (!_ && i && c.pathname !== undefined) {
				c = c.toString();
			}
			if (typeof c === "string") {
				this._parts = U.parse(c, this._parts);
			} else if (_ || i) {
				var s = _ ? c._parts : c;
				for (e in s) {
					if (h.call(this._parts, e)) {
						this._parts[e] = s[e];
					}
				}
			} else {
				throw new TypeError("invalid input");
			}
			this.build(!d);
			return this;
		};
		p.is = function (c) {
			var i = false;
			var d = false;
			var e = false;
			var l = false;
			var s = false;
			var t = false;
			var a = false;
			var v = !this._parts.urn;
			if (this._parts.hostname) {
				v = false;
				d = U.ip4_expression.test(this._parts.hostname);
				e = U.ip6_expression.test(this._parts.hostname);
				i = d || e;
				l = !i;
				s = l && S && S.has(this._parts.hostname);
				t = l && U.idn_expression.test(this._parts.hostname);
				a = l && U.punycode_expression.test(this._parts.hostname);
			}
			switch (c.toLowerCase()) {
				case 'relative':
					return v;
				case 'absolute':
					return !v;
				case 'domain':
				case 'name':
					return l;
				case 'sld':
					return s;
				case 'ip':
					return i;
				case 'ip4':
				case 'ipv4':
				case 'inet4':
					return d;
				case 'ip6':
				case 'ipv6':
				case 'inet6':
					return e;
				case 'idn':
					return t;
				case 'url':
					return !this._parts.urn;
				case 'urn':
					return !!this._parts.urn;
				case 'punycode':
					return a;
			}
			return null;
		};
		var z = p.protocol;
		var A = p.port;
		var B = p.hostname;
		p.protocol = function (v, c) {
			if (v !== undefined) {
				if (v) {
					v = v.replace(/:(\/\/)?$/, '');
					if (v.match(/[^a-zA-z0-9\.+-]/)) {
						throw new TypeError("Protocol '" + v + "' contains characters other than [A-Z0-9.+-]");
					}
				}
			}
			return z.call(this, v, c);
		};
		p.scheme = p.protocol;
		p.port = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v !== undefined) {
				if (v === 0) {
					v = null;
				}
				if (v) {
					v += "";
					if (v.charAt(0) === ":") {
						v = v.substring(1);
					}
					if (v.match(/[^0-9]/)) {
						throw new TypeError("Port '" + v + "' contains characters other than [0-9]");
					}
				}
			}
			return A.call(this, v, c);
		};
		p.hostname = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v !== undefined) {
				var x = {};
				U.parseHost(v, x);
				v = x.hostname;
			}
			return B.call(this, v, c);
		};
		p.host = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined) {
				return this._parts.hostname ? U.buildHost(this._parts) : "";
			} else {
				U.parseHost(v, this._parts);
				this.build(!c);
				return this;
			}
		};
		p.authority = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined) {
				return this._parts.hostname ? U.buildAuthority(this._parts) : "";
			} else {
				U.parseAuthority(v, this._parts);
				this.build(!c);
				return this;
			}
		};
		p.userinfo = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined) {
				if (!this._parts.username) {
					return "";
				}
				var t = U.buildUserinfo(this._parts);
				return t.substring(0, t.length - 1);
			} else {
				if (v[v.length - 1] !== '@') {
					v += '@';
				}
				U.parseUserinfo(v, this._parts);
				this.build(!c);
				return this;
			}
		};
		p.resource = function (v, c) {
			var d;
			if (v === undefined) {
				return this.path() + this.search() + this.hash();
			}
			d = U.parse(v);
			this._parts.path = d.path;
			this._parts.query = d.query;
			this._parts.fragment = d.fragment;
			this.build(!c);
			return this;
		};
		p.subdomain = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined) {
				if (!this._parts.hostname || this.is('IP')) {
					return "";
				}
				var d = this._parts.hostname.length - this.domain().length - 1;
				return this._parts.hostname.substring(0, d) || "";
			} else {
				var e = this._parts.hostname.length - this.domain().length;
				var s = this._parts.hostname.substring(0, e);
				var i = new RegExp('^' + b(s));
				if (v && v.charAt(v.length - 1) !== '.') {
					v += ".";
				}
				if (v) {
					U.ensureValidHostname(v);
				}
				this._parts.hostname = this._parts.hostname.replace(i, v);
				this.build(!c);
				return this;
			}
		};
		p.domain = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (typeof v === 'boolean') {
				c = v;
				v = undefined;
			}
			if (v === undefined) {
				if (!this._parts.hostname || this.is('IP')) {
					return "";
				}
				var t = this._parts.hostname.match(/\./g);
				if (t && t.length < 2) {
					return this._parts.hostname;
				}
				var e = this._parts.hostname.length - this.tld(c).length - 1;
				e = this._parts.hostname.lastIndexOf('.', e - 1) + 1;
				return this._parts.hostname.substring(e) || "";
			} else {
				if (!v) {
					throw new TypeError("cannot set domain empty");
				}
				U.ensureValidHostname(v);
				if (!this._parts.hostname || this.is('IP')) {
					this._parts.hostname = v;
				} else {
					var d = new RegExp(b(this.domain()) + "$");
					this._parts.hostname = this._parts.hostname.replace(d, v);
				}
				this.build(!c);
				return this;
			}
		};
		p.tld = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (typeof v === 'boolean') {
				c = v;
				v = undefined;
			}
			if (v === undefined) {
				if (!this._parts.hostname || this.is('IP')) {
					return "";
				}
				var d = this._parts.hostname.lastIndexOf('.');
				var t = this._parts.hostname.substring(d + 1);
				if (c !== true && S && S.list[t.toLowerCase()]) {
					return S.get(this._parts.hostname) || t;
				}
				return t;
			} else {
				var e;
				if (!v) {
					throw new TypeError("cannot set TLD empty");
				} else if (v.match(/[^a-zA-Z0-9-]/)) {
					if (S && S.is(v)) {
						e = new RegExp(b(this.tld()) + "$");
						this._parts.hostname = this._parts.hostname.replace(e, v);
					} else {
						throw new TypeError("TLD '" + v + "' contains characters other than [A-Z0-9]");
					}
				} else if (!this._parts.hostname || this.is('IP')) {
					throw new ReferenceError("cannot set TLD on non-domain host");
				} else {
					e = new RegExp(b(this.tld()) + "$");
					this._parts.hostname = this._parts.hostname.replace(e, v);
				}
				this.build(!c);
				return this;
			}
		};
		p.directory = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined || v === true) {
				if (!this._parts.path && !this._parts.hostname) {
					return '';
				}
				if (this._parts.path === '/') {
					return '/';
				}
				var d = this._parts.path.length - this.filename().length - 1;
				var i = this._parts.path.substring(0, d) || (this._parts.hostname ? "/" : "");
				return v ? U.decodePath(i) : i;
			} else {
				var e = this._parts.path.length - this.filename().length;
				var l = this._parts.path.substring(0, e);
				var s = new RegExp('^' + b(l));
				if (!this.is('relative')) {
					if (!v) {
						v = '/';
					}
					if (v.charAt(0) !== '/') {
						v = "/" + v;
					}
				}
				if (v && v.charAt(v.length - 1) !== '/') {
					v += '/';
				}
				v = U.recodePath(v);
				this._parts.path = this._parts.path.replace(s, v);
				this.build(!c);
				return this;
			}
		};
		p.filename = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined || v === true) {
				if (!this._parts.path || this._parts.path === '/') {
					return "";
				}
				var d = this._parts.path.lastIndexOf('/');
				var e = this._parts.path.substring(d + 1);
				return v ? U.decodePathSegment(e) : e;
			} else {
				var i = false;
				if (v.charAt(0) === '/') {
					v = v.substring(1);
				}
				if (v.match(/\.?\//)) {
					i = true;
				}
				var l = new RegExp(b(this.filename()) + "$");
				v = U.recodePath(v);
				this._parts.path = this._parts.path.replace(l, v);
				if (i) {
					this.normalizePath(c);
				} else {
					this.build(!c);
				}
				return this;
			}
		};
		p.suffix = function (v, c) {
			if (this._parts.urn) {
				return v === undefined ? '' : this;
			}
			if (v === undefined || v === true) {
				if (!this._parts.path || this._parts.path === '/') {
					return "";
				}
				var d = this.filename();
				var e = d.lastIndexOf('.');
				var s, i;
				if (e === -1) {
					return "";
				}
				s = d.substring(e + 1);
				i = (/^[a-z0-9%]+$/i).test(s) ? s : "";
				return v ? U.decodePathSegment(i) : i;
			} else {
				if (v.charAt(0) === '.') {
					v = v.substring(1);
				}
				var l = this.suffix();
				var t;
				if (!l) {
					if (!v) {
						return this;
					}
					this._parts.path += '.' + U.recodePath(v);
				} else if (!v) {
					t = new RegExp(b("." + l) + "$");
				} else {
					t = new RegExp(b(l) + "$");
				}
				if (t) {
					v = U.recodePath(v);
					this._parts.path = this._parts.path.replace(t, v);
				}
				this.build(!c);
				return this;
			}
		};
		p.segment = function (s, v, c) {
			var d = this._parts.urn ? ':' : '/';
			var e = this.path();
			var t = e.substring(0, 1) === '/';
			var x = e.split(d);
			if (s !== undefined && typeof s !== 'number') {
				c = v;
				v = s;
				s = undefined;
			}
			if (s !== undefined && typeof s !== 'number') {
				throw new Error("Bad segment '" + s + "', must be 0-based integer");
			}
			if (t) {
				x.shift();
			}
			if (s < 0) {
				s = Math.max(x.length + s, 0);
			}
			if (v === undefined) {
				return s === undefined ? x : x[s];
			} else if (s === null || x[s] === undefined) {
				if (f(v)) {
					x = [];
					for (var i = 0, l = v.length; i < l; i++) {
						if (!v[i].length && (!x.length || !x[x.length - 1].length)) {
							continue;
						}
						if (x.length && !x[x.length - 1].length) {
							x.pop();
						}
						x.push(v[i]);
					}
				} else if (v || (typeof v === "string")) {
					if (x[x.length - 1] === "") {
						x[x.length - 1] = v;
					} else {
						x.push(v);
					}
				}
			} else {
				if (v || (typeof v === "string" && v.length)) {
					x[s] = v;
				} else {
					x.splice(s, 1);
				}
			}
			if (t) {
				x.unshift("");
			}
			return this.path(x.join(d), c);
		};
		p.segmentCoded = function (s, v, c) {
			var d, i, l;
			if (typeof s !== 'number') {
				c = v;
				v = s;
				s = undefined;
			}
			if (v === undefined) {
				d = this.segment(s, v, c);
				if (!f(d)) {
					d = d !== undefined ? U.decode(d) : undefined;
				} else {
					for (i = 0, l = d.length; i < l; i++) {
						d[i] = U.decode(d[i]);
					}
				}
				return d;
			}
			if (!f(v)) {
				v = typeof v === 'string' ? U.encode(v) : v;
			} else {
				for (i = 0, l = v.length; i < l; i++) {
					v[i] = U.decode(v[i]);
				}
			}
			return this.segment(s, v, c);
		};
		var q = p.query;
		p.query = function (v, c) {
			if (v === true) {
				return U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
			} else if (typeof v === "function") {
				var d = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
				var e = v.call(this, d);
				this._parts.query = U.buildQuery(e || d, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
				this.build(!c);
				return this;
			} else if (v !== undefined && typeof v !== "string") {
				this._parts.query = U.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
				this.build(!c);
				return this;
			} else {
				return q.call(this, v, c);
			}
		};
		p.setQuery = function (c, v, d) {
			var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
			if (typeof c === "object") {
				for (var i in c) {
					if (h.call(c, i)) {
						e[i] = c[i];
					}
				}
			} else if (typeof c === "string") {
				e[c] = v !== undefined ? v : null;
			} else {
				throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
			}
			this._parts.query = U.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
			if (typeof c !== "string") {
				d = v;
			}
			this.build(!d);
			return this;
		};
		p.addQuery = function (c, v, d) {
			var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
			U.addQuery(e, c, v === undefined ? null : v);
			this._parts.query = U.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
			if (typeof c !== "string") {
				d = v;
			}
			this.build(!d);
			return this;
		};
		p.removeQuery = function (c, v, d) {
			var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
			U.removeQuery(e, c, v);
			this._parts.query = U.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
			if (typeof c !== "string") {
				d = v;
			}
			this.build(!d);
			return this;
		};
		p.hasQuery = function (c, v, d) {
			var e = U.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
			return U.hasQuery(e, c, v, d);
		};
		p.setSearch = p.setQuery;
		p.addSearch = p.addQuery;
		p.removeSearch = p.removeQuery;
		p.hasSearch = p.hasQuery;
		p.normalize = function () {
			if (this._parts.urn) {
				return this.normalizeProtocol(false).normalizeQuery(false).normalizeFragment(false).build();
			}
			return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
		};
		p.normalizeProtocol = function (c) {
			if (typeof this._parts.protocol === "string") {
				this._parts.protocol = this._parts.protocol.toLowerCase();
				this.build(!c);
			}
			return this;
		};
		p.normalizeHostname = function (c) {
			if (this._parts.hostname) {
				if (this.is('IDN') && a) {
					this._parts.hostname = a.toASCII(this._parts.hostname);
				} else if (this.is('IPv6') && I) {
					this._parts.hostname = I.best(this._parts.hostname);
				}
				this._parts.hostname = this._parts.hostname.toLowerCase();
				this.build(!c);
			}
			return this;
		};
		p.normalizePort = function (c) {
			if (typeof this._parts.protocol === "string" && this._parts.port === U.defaultPorts[this._parts.protocol]) {
				this._parts.port = null;
				this.build(!c);
			}
			return this;
		};
		p.normalizePath = function (c) {
			if (this._parts.urn) {
				return this;
			}
			if (!this._parts.path || this._parts.path === '/') {
				return this;
			}
			var d;
			var e = this._parts.path;
			var i, l;
			if (e.charAt(0) !== '/') {
				d = true;
				e = '/' + e;
			}
			e = e.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/');
			while (true) {
				i = e.indexOf('/../');
				if (i === -1) {
					break;
				} else if (i === 0) {
					e = e.substring(3);
					break;
				}
				l = e.substring(0, i).lastIndexOf('/');
				if (l === -1) {
					l = i;
				}
				e = e.substring(0, l) + e.substring(i + 3);
			}
			if (d && this.is('relative')) {
				e = e.substring(1);
			}
			e = U.recodePath(e);
			this._parts.path = e;
			this.build(!c);
			return this;
		};
		p.normalizePathname = p.normalizePath;
		p.normalizeQuery = function (c) {
			if (typeof this._parts.query === "string") {
				if (!this._parts.query.length) {
					this._parts.query = null;
				} else {
					this.query(U.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
				}
				this.build(!c);
			}
			return this;
		};
		p.normalizeFragment = function (c) {
			if (!this._parts.fragment) {
				this._parts.fragment = null;
				this.build(!c);
			}
			return this;
		};
		p.normalizeSearch = p.normalizeQuery;
		p.normalizeHash = p.normalizeFragment;
		p.iso8859 = function () {
			var e = U.encode;
			var d = U.decode;
			U.encode = escape;
			U.decode = decodeURIComponent;
			this.normalize();
			U.encode = e;
			U.decode = d;
			return this;
		};
		p.unicode = function () {
			var e = U.encode;
			var d = U.decode;
			U.encode = o;
			U.decode = unescape;
			this.normalize();
			U.encode = e;
			U.decode = d;
			return this;
		};
		p.readable = function () {
			var c = this.clone();
			c.username("").password("").normalize();
			var t = '';
			if (c._parts.protocol) {
				t += c._parts.protocol + '://';
			}
			if (c._parts.hostname) {
				if (c.is('punycode') && a) {
					t += a.toUnicode(c._parts.hostname);
					if (c._parts.port) {
						t += ":" + c._parts.port;
					}
				} else {
					t += c.host();
				}
			}
			if (c._parts.hostname && c._parts.path && c._parts.path.charAt(0) !== '/') {
				t += '/';
			}
			t += c.path(true);
			if (c._parts.query) {
				var q = '';
				for (var i = 0, d = c._parts.query.split('&'), l = d.length; i < l; i++) {
					var e = (d[i] || "").split('=');
					q += '&' + U.decodeQuery(e[0], this._parts.escapeQuerySpace).replace(/&/g, '%26');
					if (e[1] !== undefined) {
						q += "=" + U.decodeQuery(e[1], this._parts.escapeQuerySpace).replace(/&/g, '%26');
					}
				}
				t += '?' + q.substring(1);
			}
			t += U.decodeQuery(c.hash(), true);
			return t;
		};
		p.absoluteTo = function (c) {
			var d = this.clone();
			var e = ['protocol', 'username', 'password', 'hostname', 'port'];
			var l, i, p;
			if (this._parts.urn) {
				throw new Error('URNs do not have any generally defined hierarchical components');
			}
			if (!(c instanceof U)) {
				c = new U(c);
			}
			if (!d._parts.protocol) {
				d._parts.protocol = c._parts.protocol;
			}
			if (this._parts.hostname) {
				return d;
			}
			for (i = 0; p = e[i]; i++) {
				d._parts[p] = c._parts[p];
			}
			e = ['query', 'path'];
			for (i = 0; p = e[i]; i++) {
				if (!d._parts[p] && c._parts[p]) {
					d._parts[p] = c._parts[p];
				}
			}
			if (d.path().charAt(0) !== '/') {
				l = c.directory();
				d._parts.path = (l ? (l + '/') : '') + d._parts.path;
				d.normalizePath();
			}
			d.build();
			return d;
		};
		p.relativeTo = function (c) {
			var d = this.clone().normalize();
			var e, i, l, s, t;
			if (d._parts.urn) {
				throw new Error('URNs do not have any generally defined hierarchical components');
			}
			c = new U(c).normalize();
			e = d._parts;
			i = c._parts;
			s = d.path();
			t = c.path();
			if (s.charAt(0) !== '/') {
				throw new Error('URI is already relative');
			}
			if (t.charAt(0) !== '/') {
				throw new Error('Cannot calculate a URI relative to another relative URI');
			}
			if (e.protocol === i.protocol) {
				e.protocol = null;
			}
			if (e.username !== i.username || e.password !== i.password) {
				return d.build();
			}
			if (e.protocol !== null || e.username !== null || e.password !== null) {
				return d.build();
			}
			if (e.hostname === i.hostname && e.port === i.port) {
				e.hostname = null;
				e.port = null;
			} else {
				return d.build();
			}
			if (s === t) {
				e.path = '';
				return d.build();
			}
			l = U.commonPath(d.path(), c.path());
			if (!l) {
				return d.build();
			}
			var v = i.path.substring(l.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
			e.path = v + e.path.substring(l.length);
			return d.build();
		};
		p.equals = function (c) {
			var d = this.clone();
			var t = new U(c);
			var e = {};
			var i = {};
			var l = {};
			var s, v, x;
			d.normalize();
			t.normalize();
			if (d.toString() === t.toString()) {
				return true;
			}
			s = d.query();
			v = t.query();
			d.query("");
			t.query("");
			if (d.toString() !== t.toString()) {
				return false;
			}
			if (s.length !== v.length) {
				return false;
			}
			e = U.parseQuery(s, this._parts.escapeQuerySpace);
			i = U.parseQuery(v, this._parts.escapeQuerySpace);
			for (x in e) {
				if (h.call(e, x)) {
					if (!f(e[x])) {
						if (e[x] !== i[x]) {
							return false;
						}
					} else if (!m(e[x], i[x])) {
						return false;
					}
					l[x] = true;
				}
			}
			for (x in i) {
				if (h.call(i, x)) {
					if (!l[x]) {
						return false;
					}
				}
			}
			return true;
		};
		p.duplicateQueryParameters = function (v) {
			this._parts.duplicateQueryParameters = !!v;
			return this;
		};
		p.escapeQuerySpace = function (v) {
			this._parts.escapeQuerySpace = !!v;
			return this;
		};
		return U;
	}));
	/*!
	 * UI development toolkit for HTML5 (OpenUI5)
	 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
	 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
	 */
	if (!('baseURI' in Node.prototype)) {
		Object.defineProperty(Node.prototype, 'baseURI', {
			get: function () {
				var d = this.ownerDocument || this,
					b = d.querySelector("base[href]") || window.location;
				return b.href;
			},
			configurable: true
		});
	}
	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.3.0
	 */
	(function () {
		"use strict";

		function l(x) {
			return typeof x === 'function' || (typeof x === 'object' && x !== null);
		}

		function a(x) {
			return typeof x === 'function';
		}

		function b(x) {
			return typeof x === 'object' && x !== null;
		}
		var d;
		if (!Array.isArray) {
			d = function (x) {
				return Object.prototype.toString.call(x) === '[object Array]';
			};
		} else {
			d = Array.isArray;
		}
		var f = d;
		var g = 0;
		var h = {}.toString;
		var j;
		var k;
		var m = function asap(c, e) {
			B[g] = c;
			B[g + 1] = e;
			g += 2;
			if (g === 2) {
				if (k) {
					k(C);
				} else {
					E();
				}
			}
		};

		function n(c) {
			k = c;
		}

		function o(c) {
			m = c;
		}
		var p = (typeof window !== 'undefined') ? window : undefined;
		var q = p || {};
		var s = q.MutationObserver || q.WebKitMutationObserver;
		var t = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
		var u = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

		function v() {
			var c = process.nextTick;
			var e = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
			if (Array.isArray(e) && e[1] === '0' && e[2] === '10') {
				c = setImmediate;
			}
			return function () {
				c(C);
			};
		}

		function w() {
			return function () {
				j(C);
			};
		}

		function y() {
			var i = 0;
			var c = new s(C);
			var e = document.createTextNode('');
			c.observe(e, {
				characterData: true
			});
			return function () {
				e.data = (i = ++i % 2);
			};
		}

		function z() {
			var c = new MessageChannel();
			c.port1.onmessage = C;
			return function () {
				c.port2.postMessage(0);
			};
		}

		function A() {
			return function () {
				setTimeout(C, 1);
			};
		}
		var B = new Array(1000);

		function C() {
			for (var i = 0; i < g; i += 2) {
				var c = B[i];
				var e = B[i + 1];
				c(e);
				B[i] = undefined;
				B[i + 1] = undefined;
			}
			g = 0;
		}

		function D() {
			try {
				var r = require;
				var c = r('vertx');
				j = c.runOnLoop || c.runOnContext;
				return w();
			} catch (e) {
				return A();
			}
		}
		var E;
		if (t) {
			E = v();
		} else if (s) {
			E = y();
		} else if (u) {
			E = z();
		} else if (p === undefined && typeof require === 'function') {
			E = D();
		} else {
			E = A();
		}

		function F() {}
		var G = void 0;
		var H = 1;
		var I = 2;
		var J = new Y();

		function K() {
			return new TypeError("You cannot resolve a promise with itself");
		}

		function L() {
			return new TypeError('A promises callback cannot return that same promise.');
		}

		function M(c) {
			try {
				return c.then;
			} catch (e) {
				J.error = e;
				return J;
			}
		}

		function N(c, i, r, x) {
			try {
				c.call(i, r, x);
			} catch (e) {
				return e;
			}
		}

		function O(c, e, i) {
			m(function (c) {
				var r = false;
				var x = N(i, e, function (P) {
					if (r) {
						return;
					}
					r = true;
					if (e !== P) {
						S(c, P);
					} else {
						U(c, P);
					}
				}, function (P) {
					if (r) {
						return;
					}
					r = true;
					V(c, P);
				}, 'Settle: ' + (c._label || ' unknown promise'));
				if (!r && x) {
					r = true;
					V(c, x);
				}
			}, c);
		}

		function Q(c, e) {
			if (e._state === H) {
				U(c, e._result);
			} else if (e._state === I) {
				V(c, e._result);
			} else {
				W(e, undefined, function (i) {
					S(c, i);
				}, function (r) {
					V(c, r);
				});
			}
		}

		function R(c, e) {
			if (e.constructor === c.constructor) {
				Q(c, e);
			} else {
				var i = M(e);
				if (i === J) {
					V(c, J.error);
				} else if (i === undefined) {
					U(c, e);
				} else if (a(i)) {
					O(c, e, i);
				} else {
					U(c, e);
				}
			}
		}

		function S(c, e) {
			if (c === e) {
				V(c, K());
			} else if (l(e)) {
				R(c, e);
			} else {
				U(c, e);
			}
		}

		function T(c) {
			if (c._onerror) {
				c._onerror(c._result);
			}
			X(c);
		}

		function U(c, e) {
			if (c._state !== G) {
				return;
			}
			c._result = e;
			c._state = H;
			if (c._subscribers.length !== 0) {
				m(X, c);
			}
		}

		function V(c, r) {
			if (c._state !== G) {
				return;
			}
			c._state = I;
			c._result = r;
			m(T, c);
		}

		function W(c, e, i, r) {
			var x = c._subscribers;
			var P = x.length;
			c._onerror = null;
			x[P] = e;
			x[P + H] = i;
			x[P + I] = r;
			if (P === 0 && c._state) {
				m(X, c);
			}
		}

		function X(c) {
			var e = c._subscribers;
			var r = c._state;
			if (e.length === 0) {
				return;
			}
			var x, P, t1 = c._result;
			for (var i = 0; i < e.length; i += 3) {
				x = e[i];
				P = e[i + r];
				if (x) {
					_(r, x, P, t1);
				} else {
					P(t1);
				}
			}
			c._subscribers.length = 0;
		}

		function Y() {
			this.error = null;
		}
		var Z = new Y();

		function $(c, i) {
			try {
				return c(i);
			} catch (e) {
				Z.error = e;
				return Z;
			}
		}

		function _(c, e, i, r) {
			var x = a(i),
				P, t1, u1, v1;
			if (x) {
				P = $(i, r);
				if (P === Z) {
					v1 = true;
					t1 = P.error;
					P = null;
				} else {
					u1 = true;
				}
				if (e === P) {
					V(e, L());
					return;
				}
			} else {
				P = r;
				u1 = true;
			}
			if (e._state !== G) {} else if (x && u1) {
				S(e, P);
			} else if (v1) {
				V(e, t1);
			} else if (c === H) {
				U(e, P);
			} else if (c === I) {
				V(e, P);
			}
		}

		function a1(c, r) {
			try {
				r(function resolvePromise(i) {
					S(c, i);
				}, function rejectPromise(i) {
					V(c, i);
				});
			} catch (e) {
				V(c, e);
			}
		}

		function b1(c, i) {
			var e = this;
			e._instanceConstructor = c;
			e.promise = new c(F);
			if (e._validateInput(i)) {
				e._input = i;
				e.length = i.length;
				e._remaining = i.length;
				e._init();
				if (e.length === 0) {
					U(e.promise, e._result);
				} else {
					e.length = e.length || 0;
					e._enumerate();
					if (e._remaining === 0) {
						U(e.promise, e._result);
					}
				}
			} else {
				V(e.promise, e._validationError());
			}
		}
		b1.prototype._validateInput = function (i) {
			return f(i);
		};
		b1.prototype._validationError = function () {
			return new Error('Array Methods must be provided an Array');
		};
		b1.prototype._init = function () {
			this._result = new Array(this.length);
		};
		var c1 = b1;
		b1.prototype._enumerate = function () {
			var e = this;
			var c = e.length;
			var r = e.promise;
			var x = e._input;
			for (var i = 0; r._state === G && i < c; i++) {
				e._eachEntry(x[i], i);
			}
		};
		b1.prototype._eachEntry = function (e, i) {
			var r = this;
			var c = r._instanceConstructor;
			if (b(e)) {
				if (e.constructor === c && e._state !== G) {
					e._onerror = null;
					r._settledAt(e._state, i, e._result);
				} else {
					r._willSettleAt(c.resolve(e), i);
				}
			} else {
				r._remaining--;
				r._result[i] = e;
			}
		};
		b1.prototype._settledAt = function (c, i, e) {
			var r = this;
			var x = r.promise;
			if (x._state === G) {
				r._remaining--;
				if (c === I) {
					V(x, e);
				} else {
					r._result[i] = e;
				}
			}
			if (r._remaining === 0) {
				U(x, r._result);
			}
		};
		b1.prototype._willSettleAt = function (c, i) {
			var e = this;
			W(c, undefined, function (r) {
				e._settledAt(H, i, r);
			}, function (r) {
				e._settledAt(I, i, r);
			});
		};

		function d1(e) {
			return new c1(this, e).promise;
		}
		var e1 = d1;

		function f1(e) {
			var c = this;
			var r = new c(F);
			if (!f(e)) {
				V(r, new TypeError('You must pass an array to race.'));
				return r;
			}
			var x = e.length;

			function P(u1) {
				S(r, u1);
			}

			function t1(u1) {
				V(r, u1);
			}
			for (var i = 0; r._state === G && i < x; i++) {
				W(c.resolve(e[i]), undefined, P, t1);
			}
			return r;
		}
		var g1 = f1;

		function h1(c) {
			var e = this;
			if (c && typeof c === 'object' && c.constructor === e) {
				return c;
			}
			var i = new e(F);
			S(i, c);
			return i;
		}
		var i1 = h1;

		function j1(r) {
			var c = this;
			var e = new c(F);
			V(e, r);
			return e;
		}
		var k1 = j1;
		var l1 = 0;

		function m1() {
			throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
		}

		function n1() {
			throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
		}
		var o1 = p1;

		function p1(r) {
			this._id = l1++;
			this._state = undefined;
			this._result = undefined;
			this._subscribers = [];
			if (F !== r) {
				if (!a(r)) {
					m1();
				}
				if (!(this instanceof p1)) {
					n1();
				}
				a1(this, r);
			}
		}
		p1.all = e1;
		p1.race = g1;
		p1.resolve = i1;
		p1.reject = k1;
		p1._setScheduler = n;
		p1._setAsap = o;
		p1._asap = m;
		p1.prototype = {
			constructor: p1,
			then: function (c, e) {
				var i = this;
				var r = i._state;
				if (r === H && !c || r === I && !e) {
					return this;
				}
				var x = new this.constructor(F);
				var P = i._result;
				if (r) {
					var t1 = arguments[r - 1];
					m(function () {
						_(r, x, t1, P);
					});
				} else {
					W(i, x, c, e);
				}
				return x;
			},
			'catch': function (c) {
				return this.then(null, c);
			}
		};

		function q1() {
			var c;
			if (typeof global !== 'undefined') {
				c = global;
			} else if (typeof self !== 'undefined') {
				c = self;
			} else {
				try {
					c = Function('return this')();
				} catch (e) {
					throw new Error('polyfill failed because global object is unavailable in this environment');
				}
			}
			var P = c.Promise;
			if (P && Object.prototype.toString.call(P.resolve()).indexOf('[object ') === 0) {
				return;
			}
			c.Promise = o1;
		}
		var r1 = q1;
		var s1 = {
			'Promise': o1,
			'polyfill': r1
		};
		if (typeof define === 'function' && define['amd']) {
			define('sap/ui/thirdparty/es6-promise', function () {
				return s1;
			});
		} else if (typeof module !== 'undefined' && module['exports']) {
			module['exports'] = s1;
		}
		if (typeof this !== 'undefined') {
			this['ES6Promise'] = s1;
		}
	}).call(this);
	/*!
	 * jQuery JavaScript Library v2.2.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-04-05T19:26Z
	 */
	(function (g, f) {
		if (typeof module === "object" && typeof module.exports === "object") {
			module.exports = g.document ? f(g, true) : function (w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return f(w);
			};
		} else {
			f(g);
		}
	}(typeof window !== "undefined" ? window : this, function (w, c) {
		var d = [];
		var f = w.document;
		var g = d.slice;
		var h = d.concat;
		var k = d.push;
		var o = d.indexOf;
		var q = {};
		var r = q.toString;
		var u = q.hasOwnProperty;
		var x = {};
		var y = "2.2.3",
			Q = function (s, a) {
				return new Q.fn.init(s, a);
			},
			z = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			A = /^-ms-/,
			B = /-([\da-z])/gi,
			C = function (a, l) {
				return l.toUpperCase();
			};
		Q.fn = Q.prototype = {
			jquery: y,
			constructor: Q,
			selector: "",
			length: 0,
			toArray: function () {
				return g.call(this);
			},
			get: function (n) {
				return n != null ? (n < 0 ? this[n + this.length] : this[n]) : g.call(this);
			},
			pushStack: function (e) {
				var a = Q.merge(this.constructor(), e);
				a.prevObject = this;
				a.context = this.context;
				return a;
			},
			each: function (a) {
				return Q.each(this, a);
			},
			map: function (a) {
				return this.pushStack(Q.map(this, function (e, i) {
					return a.call(e, i, e);
				}));
			},
			slice: function () {
				return this.pushStack(g.apply(this, arguments));
			},
			first: function () {
				return this.eq(0);
			},
			last: function () {
				return this.eq(-1);
			},
			eq: function (i) {
				var l = this.length,
					j = +i + (i < 0 ? l : 0);
				return this.pushStack(j >= 0 && j < l ? [this[j]] : []);
			},
			end: function () {
				return this.prevObject || this.constructor();
			},
			push: k,
			sort: d.sort,
			splice: d.splice
		};
		Q.extend = Q.fn.extend = function () {
			var a, n, s, b, e, j, t = arguments[0] || {},
				i = 1,
				l = arguments.length,
				m = false;
			if (typeof t === "boolean") {
				m = t;
				t = arguments[i] || {};
				i++;
			}
			if (typeof t !== "object" && !Q.isFunction(t)) {
				t = {};
			}
			if (i === l) {
				t = this;
				i--;
			}
			for (; i < l; i++) {
				if ((a = arguments[i]) != null) {
					for (n in a) {
						s = t[n];
						b = a[n];
						if (t === b) {
							continue;
						}
						if (m && b && (Q.isPlainObject(b) || (e = Q.isArray(b)))) {
							if (e) {
								e = false;
								j = s && Q.isArray(s) ? s : [];
							} else {
								j = s && Q.isPlainObject(s) ? s : {};
							}
							t[n] = Q.extend(m, j, b);
						} else if (b !== undefined) {
							t[n] = b;
						}
					}
				}
			}
			return t;
		};
		Q.extend({
			expando: "jQuery" + (y + Math.random()).replace(/\D/g, ""),
			isReady: true,
			error: function (m) {
				throw new Error(m);
			},
			noop: function () {},
			isFunction: function (a) {
				return Q.type(a) === "function";
			},
			isArray: Array.isArray,
			isWindow: function (a) {
				return a != null && a === a.window;
			},
			isNumeric: function (a) {
				var b = a && a.toString();
				return !Q.isArray(a) && (b - parseFloat(b) + 1) >= 0;
			},
			isPlainObject: function (a) {
				var b;
				if (Q.type(a) !== "object" || a.nodeType || Q.isWindow(a)) {
					return false;
				}
				if (a.constructor && !u.call(a, "constructor") && !u.call(a.constructor.prototype || {}, "isPrototypeOf")) {
					return false;
				}
				for (b in a) {}
				return b === undefined || u.call(a, b);
			},
			isEmptyObject: function (a) {
				var n;
				for (n in a) {
					return false;
				}
				return true;
			},
			type: function (a) {
				if (a == null) {
					return a + "";
				}
				return typeof a === "object" || typeof a === "function" ? q[r.call(a)] || "object" : typeof a;
			},
			globalEval: function (a) {
				var s, i = eval;
				a = Q.trim(a);
				if (a) {
					if (a.indexOf("use strict") === 1) {
						s = f.createElement("script");
						s.text = a;
						f.head.appendChild(s).parentNode.removeChild(s);
					} else {
						i(a);
					}
				}
			},
			camelCase: function (s) {
				return s.replace(A, "ms-").replace(B, C);
			},
			nodeName: function (e, n) {
				return e.nodeName && e.nodeName.toLowerCase() === n.toLowerCase();
			},
			each: function (a, b) {
				var l, i = 0;
				if (D(a)) {
					l = a.length;
					for (; i < l; i++) {
						if (b.call(a[i], i, a[i]) === false) {
							break;
						}
					}
				} else {
					for (i in a) {
						if (b.call(a[i], i, a[i]) === false) {
							break;
						}
					}
				}
				return a;
			},
			trim: function (t) {
				return t == null ? "" : (t + "").replace(z, "");
			},
			makeArray: function (d, a) {
				var b = a || [];
				if (d != null) {
					if (D(Object(d))) {
						Q.merge(b, typeof d === "string" ? [d] : d);
					} else {
						k.call(b, d);
					}
				}
				return b;
			},
			inArray: function (e, d, i) {
				return d == null ? -1 : o.call(d, e, i);
			},
			merge: function (a, s) {
				var l = +s.length,
					j = 0,
					i = a.length;
				for (; j < l; j++) {
					a[i++] = s[j];
				}
				a.length = i;
				return a;
			},
			grep: function (e, a, b) {
				var j, m = [],
					i = 0,
					l = e.length,
					n = !b;
				for (; i < l; i++) {
					j = !a(e[i], i);
					if (j !== n) {
						m.push(e[i]);
					}
				}
				return m;
			},
			map: function (e, a, b) {
				var l, v, i = 0,
					j = [];
				if (D(e)) {
					l = e.length;
					for (; i < l; i++) {
						v = a(e[i], i, b);
						if (v != null) {
							j.push(v);
						}
					}
				} else {
					for (i in e) {
						v = a(e[i], i, b);
						if (v != null) {
							j.push(v);
						}
					}
				}
				return h.apply([], j);
			},
			guid: 1,
			proxy: function (a, b) {
				var t, e, p;
				if (typeof b === "string") {
					t = a[b];
					b = a;
					a = t;
				}
				if (!Q.isFunction(a)) {
					return undefined;
				}
				e = g.call(arguments, 2);
				p = function () {
					return a.apply(b || this, e.concat(g.call(arguments)));
				};
				p.guid = a.guid = a.guid || Q.guid++;
				return p;
			},
			now: Date.now,
			support: x
		});
		if (typeof Symbol === "function") {
			Q.fn[Symbol.iterator] = d[Symbol.iterator];
		}
		Q.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, n) {
			q["[object " + n + "]"] = n.toLowerCase();
		});

		function D(a) {
			var l = !!a && "length" in a && a.length,
				t = Q.type(a);
			if (t === "function" || Q.isWindow(a)) {
				return false;
			}
			return t === "array" || l === 0 || typeof l === "number" && l > 0 && (l - 1) in a;
		}
		var S =
			/*!
			 * Sizzle CSS Selector Engine v2.2.1
			 * http://sizzlejs.com/
			 *
			 * Copyright jQuery Foundation and other contributors
			 * Released under the MIT license
			 * http://jquery.org/license
			 *
			 * Date: 2015-10-17
			 */
			(function (w) {
				var i, x, l, n, p, t, s, v, w1, _2, a3, b3, f, c3, d3, e3, f3, g3, h3, i3 = "sizzle" + 1 * new Date(),
					j3 = w.document,
					k3 = 0,
					l3 = 0,
					m3 = N3(),
					n3 = N3(),
					o3 = N3(),
					p3 = function (a, b) {
						if (a === b) {
							a3 = true;
						}
						return 0;
					},
					q3 = 1 << 31,
					u = ({}).hasOwnProperty,
					d = [],
					r3 = d.pop,
					s3 = d.push,
					k = d.push,
					g = d.slice,
					o = function (a, b) {
						var i = 0,
							j = a.length;
						for (; i < j; i++) {
							if (a[i] === b) {
								return i;
							}
						}
						return -1;
					},
					t3 = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
					u3 = "[\\x20\\t\\r\\n\\f]",
					v3 = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
					w3 = "\\[" + u3 + "*(" + v3 + ")(?:" + u3 + "*([*^$|!~]?=)" + u3 + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + v3 + "))|)" + u3 + "*\\]",
					x3 = ":(" + v3 + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + w3 + ")*)|" + ".*" + ")\\)|)",
					y3 = new RegExp(u3 + "+", "g"),
					z = new RegExp("^" + u3 + "+|((?:^|[^\\\\])(?:\\\\.)*)" + u3 + "+$", "g"),
					z3 = new RegExp("^" + u3 + "*," + u3 + "*"),
					A3 = new RegExp("^" + u3 + "*([>+~]|" + u3 + ")" + u3 + "*"),
					B3 = new RegExp("=" + u3 + "*([^\\]'\"]*?)" + u3 + "*\\]", "g"),
					C3 = new RegExp(x3),
					D3 = new RegExp("^" + v3 + "$"),
					E3 = {
						"ID": new RegExp("^#(" + v3 + ")"),
						"CLASS": new RegExp("^\\.(" + v3 + ")"),
						"TAG": new RegExp("^(" + v3 + "|[*])"),
						"ATTR": new RegExp("^" + w3),
						"PSEUDO": new RegExp("^" + x3),
						"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + u3 + "*(even|odd|(([+-]|)(\\d*)n|)" + u3 + "*(?:([+-]|)" + u3 + "*(\\d+)|))" + u3 + "*\\)|)", "i"),
						"bool": new RegExp("^(?:" + t3 + ")$", "i"),
						"needsContext": new RegExp("^" + u3 + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + u3 + "*((?:-\\d)?\\d*)" + u3 + "*\\)|)(?=[^-]|$)", "i")
					},
					F3 = /^(?:input|select|textarea|button)$/i,
					G3 = /^h\d$/i,
					H3 = /^[^{]+\{\s*\[native \w/,
					L = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
					I3 = /[+~]/,
					J3 = /'|\\/g,
					K3 = new RegExp("\\\\([\\da-f]{1,6}" + u3 + "?|(" + u3 + ")|.)", "ig"),
					L3 = function (_, a, b) {
						var j = "0x" + a - 0x10000;
						return j !== j || b ? a : j < 0 ? String.fromCharCode(j + 0x10000) : String.fromCharCode(j >> 10 | 0xD800, j & 0x3FF | 0xDC00);
					},
					M3 = function () {
						b3();
					};
				try {
					k.apply((d = g.call(j3.childNodes)), j3.childNodes);
					d[j3.childNodes.length].nodeType;
				} catch (e) {
					k = {
						apply: d.length ? function (a, b) {
							s3.apply(a, g.call(b));
						} : function (a, b) {
							var j = a.length,
								i = 0;
							while ((a[j++] = b[i++])) {}
							a.length = j - 1;
						}
					};
				}

				function S(a, b, j, _) {
					var m, i, d4, e4, f4, g4, h4, i4, j4 = b && b.ownerDocument,
						k4 = b ? b.nodeType : 9;
					j = j || [];
					if (typeof a !== "string" || !a || k4 !== 1 && k4 !== 9 && k4 !== 11) {
						return j;
					}
					if (!_) {
						if ((b ? b.ownerDocument || b : j3) !== f) {
							b3(b);
						}
						b = b || f;
						if (d3) {
							if (k4 !== 11 && (g4 = L.exec(a))) {
								if ((m = g4[1])) {
									if (k4 === 9) {
										if ((d4 = b.getElementById(m))) {
											if (d4.id === m) {
												j.push(d4);
												return j;
											}
										} else {
											return j;
										}
									} else {
										if (j4 && (d4 = j4.getElementById(m)) && h3(b, d4) && d4.id === m) {
											j.push(d4);
											return j;
										}
									}
								} else if (g4[2]) {
									k.apply(j, b.getElementsByTagName(a));
									return j;
								} else if ((m = g4[3]) && x.getElementsByClassName && b.getElementsByClassName) {
									k.apply(j, b.getElementsByClassName(m));
									return j;
								}
							}
							if (x.qsa && !o3[a + " "] && (!e3 || !e3.test(a))) {
								if (k4 !== 1) {
									j4 = b;
									i4 = a;
								} else if (b.nodeName.toLowerCase() !== "object") {
									if ((e4 = b.getAttribute("id"))) {
										e4 = e4.replace(J3, "\\$&");
									} else {
										b.setAttribute("id", (e4 = i3));
									}
									h4 = t(a);
									i = h4.length;
									f4 = D3.test(e4) ? "#" + e4 : "[id='" + e4 + "']";
									while (i--) {
										h4[i] = f4 + " " + X3(h4[i]);
									}
									i4 = h4.join(",");
									j4 = I3.test(a) && V3(b.parentNode) || b;
								}
								if (i4) {
									try {
										k.apply(j, j4.querySelectorAll(i4));
										return j;
									} catch (l4) {} finally {
										if (e4 === i3) {
											b.removeAttribute("id");
										}
									}
								}
							}
						}
					}
					return v(a.replace(z, "$1"), b, j, _);
				}

				function N3() {
					var a = [];

					function b(j, m) {
						if (a.push(j + " ") > l.cacheLength) {
							delete b[a.shift()];
						}
						return (b[j + " "] = m);
					}
					return b;
				}

				function O3(a) {
					a[i3] = true;
					return a;
				}

				function P3(a) {
					var b = f.createElement("div");
					try {
						return !!a(b);
					} catch (e) {
						return false;
					} finally {
						if (b.parentNode) {
							b.parentNode.removeChild(b);
						}
						b = null;
					}
				}

				function Q3(a, b) {
					var d = a.split("|"),
						i = d.length;
					while (i--) {
						l.attrHandle[d[i]] = b;
					}
				}

				function R3(a, b) {
					var j = b && a,
						m = j && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || q3) - (~a.sourceIndex || q3);
					if (m) {
						return m;
					}
					if (j) {
						while ((j = j.nextSibling)) {
							if (j === b) {
								return -1;
							}
						}
					}
					return a ? 1 : -1;
				}

				function S3(a) {
					return function (b) {
						var j = b.nodeName.toLowerCase();
						return j === "input" && b.type === a;
					};
				}

				function T3(a) {
					return function (b) {
						var j = b.nodeName.toLowerCase();
						return (j === "input" || j === "button") && b.type === a;
					};
				}

				function U3(a) {
					return O3(function (b) {
						b = +b;
						return O3(function (m, g3) {
							var j, _ = a([], m.length, b),
								i = _.length;
							while (i--) {
								if (m[(j = _[i])]) {
									m[j] = !(g3[j] = m[j]);
								}
							}
						});
					});
				}

				function V3(a) {
					return a && typeof a.getElementsByTagName !== "undefined" && a;
				}
				x = S.support = {};
				p = S.isXML = function (a) {
					var R1 = a && (a.ownerDocument || a).documentElement;
					return R1 ? R1.nodeName !== "HTML" : false;
				};
				b3 = S.setDocument = function (j) {
					var _, d4, e4 = j ? j.ownerDocument || j : j3;
					if (e4 === f || e4.nodeType !== 9 || !e4.documentElement) {
						return f;
					}
					f = e4;
					c3 = f.documentElement;
					d3 = !p(f);
					if ((d4 = f.defaultView) && d4.top !== d4) {
						if (d4.addEventListener) {
							d4.addEventListener("unload", M3, false);
						} else if (d4.attachEvent) {
							d4.attachEvent("onunload", M3);
						}
					}
					x.attributes = P3(function (a) {
						a.className = "i";
						return !a.getAttribute("className");
					});
					x.getElementsByTagName = P3(function (a) {
						a.appendChild(f.createComment(""));
						return !a.getElementsByTagName("*").length;
					});
					x.getElementsByClassName = H3.test(f.getElementsByClassName);
					x.getById = P3(function (a) {
						c3.appendChild(a).id = i3;
						return !f.getElementsByName || !f.getElementsByName(i3).length;
					});
					if (x.getById) {
						l.find["ID"] = function (a, b) {
							if (typeof b.getElementById !== "undefined" && d3) {
								var m = b.getElementById(a);
								return m ? [m] : [];
							}
						};
						l.filter["ID"] = function (a) {
							var b = a.replace(K3, L3);
							return function (m) {
								return m.getAttribute("id") === b;
							};
						};
					} else {
						delete l.find["ID"];
						l.filter["ID"] = function (a) {
							var b = a.replace(K3, L3);
							return function (m) {
								var j = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
								return j && j.value === b;
							};
						};
					}
					l.find["TAG"] = x.getElementsByTagName ? function (a, b) {
						if (typeof b.getElementsByTagName !== "undefined") {
							return b.getElementsByTagName(a);
						} else if (x.qsa) {
							return b.querySelectorAll(a);
						}
					} : function (a, b) {
						var m, f4 = [],
							i = 0,
							g4 = b.getElementsByTagName(a);
						if (a === "*") {
							while ((m = g4[i++])) {
								if (m.nodeType === 1) {
									f4.push(m);
								}
							}
							return f4;
						}
						return g4;
					};
					l.find["CLASS"] = x.getElementsByClassName && function (a, b) {
						if (typeof b.getElementsByClassName !== "undefined" && d3) {
							return b.getElementsByClassName(a);
						}
					};
					f3 = [];
					e3 = [];
					if ((x.qsa = H3.test(f.querySelectorAll))) {
						P3(function (a) {
							c3.appendChild(a).innerHTML = "<a id='" + i3 + "'></a>" + "<select id='" + i3 + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
							if (a.querySelectorAll("[msallowcapture^='']").length) {
								e3.push("[*^$]=" + u3 + "*(?:''|\"\")");
							}
							if (!a.querySelectorAll("[selected]").length) {
								e3.push("\\[" + u3 + "*(?:value|" + t3 + ")");
							}
							if (!a.querySelectorAll("[id~=" + i3 + "-]").length) {
								e3.push("~=");
							}
							if (!a.querySelectorAll(":checked").length) {
								e3.push(":checked");
							}
							if (!a.querySelectorAll("a#" + i3 + "+*").length) {
								e3.push(".#.+[+~]");
							}
						});
						P3(function (a) {
							var b = f.createElement("input");
							b.setAttribute("type", "hidden");
							a.appendChild(b).setAttribute("name", "D");
							if (a.querySelectorAll("[name=d]").length) {
								e3.push("name" + u3 + "*[*^$|!~]?=");
							}
							if (!a.querySelectorAll(":enabled").length) {
								e3.push(":enabled", ":disabled");
							}
							a.querySelectorAll("*,:x");
							e3.push(",.*:");
						});
					}
					if ((x.matchesSelector = H3.test((g3 = c3.matches || c3.webkitMatchesSelector || c3.mozMatchesSelector || c3.oMatchesSelector || c3.msMatchesSelector)))) {
						P3(function (a) {
							x.disconnectedMatch = g3.call(a, "div");
							g3.call(a, "[s!='']:x");
							f3.push("!=", x3);
						});
					}
					e3 = e3.length && new RegExp(e3.join("|"));
					f3 = f3.length && new RegExp(f3.join("|"));
					_ = H3.test(c3.compareDocumentPosition);
					h3 = _ || H3.test(c3.contains) ? function (a, b) {
						var m = a.nodeType === 9 ? a.documentElement : a,
							f4 = b && b.parentNode;
						return a === f4 || !!(f4 && f4.nodeType === 1 && (m.contains ? m.contains(f4) : a.compareDocumentPosition && a.compareDocumentPosition(f4) & 16));
					} : function (a, b) {
						if (b) {
							while ((b = b.parentNode)) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};
					p3 = _ ? function (a, b) {
						if (a === b) {
							a3 = true;
							return 0;
						}
						var m = !a.compareDocumentPosition - !b.compareDocumentPosition;
						if (m) {
							return m;
						}
						m = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
						if (m & 1 || (!x.sortDetached && b.compareDocumentPosition(a) === m)) {
							if (a === f || a.ownerDocument === j3 && h3(j3, a)) {
								return -1;
							}
							if (b === f || b.ownerDocument === j3 && h3(j3, b)) {
								return 1;
							}
							return _2 ? (o(_2, a) - o(_2, b)) : 0;
						}
						return m & 4 ? -1 : 1;
					} : function (a, b) {
						if (a === b) {
							a3 = true;
							return 0;
						}
						var m, i = 0,
							f4 = a.parentNode,
							g4 = b.parentNode,
							ap = [a],
							bp = [b];
						if (!f4 || !g4) {
							return a === f ? -1 : b === f ? 1 : f4 ? -1 : g4 ? 1 : _2 ? (o(_2, a) - o(_2, b)) : 0;
						} else if (f4 === g4) {
							return R3(a, b);
						}
						m = a;
						while ((m = m.parentNode)) {
							ap.unshift(m);
						}
						m = b;
						while ((m = m.parentNode)) {
							bp.unshift(m);
						}
						while (ap[i] === bp[i]) {
							i++;
						}
						return i ? R3(ap[i], bp[i]) : ap[i] === j3 ? -1 : bp[i] === j3 ? 1 : 0;
					};
					return f;
				};
				S.matches = function (a, b) {
					return S(a, null, null, b);
				};
				S.matchesSelector = function (a, b) {
					if ((a.ownerDocument || a) !== f) {
						b3(a);
					}
					b = b.replace(B3, "='$1']");
					if (x.matchesSelector && d3 && !o3[b + " "] && (!f3 || !f3.test(b)) && (!e3 || !e3.test(b))) {
						try {
							var j = g3.call(a, b);
							if (j || x.disconnectedMatch || a.document && a.document.nodeType !== 11) {
								return j;
							}
						} catch (e) {}
					}
					return S(b, f, null, [a]).length > 0;
				};
				S.contains = function (a, b) {
					if ((a.ownerDocument || a) !== f) {
						b3(a);
					}
					return h3(a, b);
				};
				S.attr = function (a, b) {
					if ((a.ownerDocument || a) !== f) {
						b3(a);
					}
					var j = l.attrHandle[b.toLowerCase()],
						m = j && u.call(l.attrHandle, b.toLowerCase()) ? j(a, b, !d3) : undefined;
					return m !== undefined ? m : x.attributes || !d3 ? a.getAttribute(b) : (m = a.getAttributeNode(b)) && m.specified ? m.value : null;
				};
				S.error = function (m) {
					throw new Error("Syntax error, unrecognized expression: " + m);
				};
				S.uniqueSort = function (a) {
					var b, m = [],
						j = 0,
						i = 0;
					a3 = !x.detectDuplicates;
					_2 = !x.sortStable && a.slice(0);
					a.sort(p3);
					if (a3) {
						while ((b = a[i++])) {
							if (b === a[i]) {
								j = m.push(i);
							}
						}
						while (j--) {
							a.splice(m[j], 1);
						}
					}
					_2 = null;
					return a;
				};
				n = S.getText = function (a) {
					var b, j = "",
						i = 0,
						m = a.nodeType;
					if (!m) {
						while ((b = a[i++])) {
							j += n(b);
						}
					} else if (m === 1 || m === 9 || m === 11) {
						if (typeof a.textContent === "string") {
							return a.textContent;
						} else {
							for (a = a.firstChild; a; a = a.nextSibling) {
								j += n(a);
							}
						}
					} else if (m === 3 || m === 4) {
						return a.nodeValue;
					}
					return j;
				};
				l = S.selectors = {
					cacheLength: 50,
					createPseudo: O3,
					match: E3,
					attrHandle: {},
					find: {},
					relative: {
						">": {
							dir: "parentNode",
							first: true
						},
						" ": {
							dir: "parentNode"
						},
						"+": {
							dir: "previousSibling",
							first: true
						},
						"~": {
							dir: "previousSibling"
						}
					},
					preFilter: {
						"ATTR": function (m) {
							m[1] = m[1].replace(K3, L3);
							m[3] = (m[3] || m[4] || m[5] || "").replace(K3, L3);
							if (m[2] === "~=") {
								m[3] = " " + m[3] + " ";
							}
							return m.slice(0, 4);
						},
						"CHILD": function (m) {
							m[1] = m[1].toLowerCase();
							if (m[1].slice(0, 3) === "nth") {
								if (!m[3]) {
									S.error(m[0]);
								}
								m[4] = +(m[4] ? m[5] + (m[6] || 1) : 2 * (m[3] === "even" || m[3] === "odd"));
								m[5] = +((m[7] + m[8]) || m[3] === "odd");
							} else if (m[3]) {
								S.error(m[0]);
							}
							return m;
						},
						"PSEUDO": function (m) {
							var a, b = !m[6] && m[2];
							if (E3["CHILD"].test(m[0])) {
								return null;
							}
							if (m[3]) {
								m[2] = m[4] || m[5] || "";
							} else if (b && C3.test(b) && (a = t(b, true)) && (a = b.indexOf(")", b.length - a) - b.length)) {
								m[0] = m[0].slice(0, a);
								m[2] = b.slice(0, a);
							}
							return m.slice(0, 3);
						}
					},
					filter: {
						"TAG": function (a) {
							var b = a.replace(K3, L3).toLowerCase();
							return a === "*" ? function () {
								return true;
							} : function (j) {
								return j.nodeName && j.nodeName.toLowerCase() === b;
							};
						},
						"CLASS": function (a) {
							var b = m3[a + " "];
							return b || (b = new RegExp("(^|" + u3 + ")" + a + "(" + u3 + "|$)")) && m3(a, function (j) {
								return b.test(typeof j.className === "string" && j.className || typeof j.getAttribute !== "undefined" && j.getAttribute("class") || "");
							});
						},
						"ATTR": function (a, b, j) {
							return function (m) {
								var _ = S.attr(m, a);
								if (_ == null) {
									return b === "!=";
								}
								if (!b) {
									return true;
								}
								_ += "";
								return b === "=" ? _ === j : b === "!=" ? _ !== j : b === "^=" ? j && _.indexOf(j) === 0 : b === "*=" ? j && _.indexOf(j) > -1 : b === "$=" ? j && _.slice(-j.length) === j : b === "~=" ? (" " + _.replace(y3, " ") + " ").indexOf(j) > -1 : b === "|=" ? _ === j || _.slice(0, j.length + 1) === j + "-" : false;
							};
						},
						"CHILD": function (a, b, j, m, _) {
							var d4 = a.slice(0, 3) !== "nth",
								e4 = a.slice(-4) !== "last",
								f4 = b === "of-type";
							return m === 1 && _ === 0 ? function (g4) {
								return !!g4.parentNode;
							} : function (g4, h4, i4) {
								var j4, k4, l4, m4, n4, o4, E = d4 !== e4 ? "nextSibling" : "previousSibling",
									p4 = g4.parentNode,
									q4 = f4 && g4.nodeName.toLowerCase(),
									r4 = !i4 && !f4,
									s4 = false;
								if (p4) {
									if (d4) {
										while (E) {
											m4 = g4;
											while ((m4 = m4[E])) {
												if (f4 ? m4.nodeName.toLowerCase() === q4 : m4.nodeType === 1) {
													return false;
												}
											}
											o4 = E = a === "only" && !o4 && "nextSibling";
										}
										return true;
									}
									o4 = [e4 ? p4.firstChild : p4.lastChild];
									if (e4 && r4) {
										m4 = p4;
										l4 = m4[i3] || (m4[i3] = {});
										k4 = l4[m4.uniqueID] || (l4[m4.uniqueID] = {});
										j4 = k4[a] || [];
										n4 = j4[0] === k3 && j4[1];
										s4 = n4 && j4[2];
										m4 = n4 && p4.childNodes[n4];
										while ((m4 = ++n4 && m4 && m4[E] || (s4 = n4 = 0) || o4.pop())) {
											if (m4.nodeType === 1 && ++s4 && m4 === g4) {
												k4[a] = [k3, n4, s4];
												break;
											}
										}
									} else {
										if (r4) {
											m4 = g4;
											l4 = m4[i3] || (m4[i3] = {});
											k4 = l4[m4.uniqueID] || (l4[m4.uniqueID] = {});
											j4 = k4[a] || [];
											n4 = j4[0] === k3 && j4[1];
											s4 = n4;
										}
										if (s4 === false) {
											while ((m4 = ++n4 && m4 && m4[E] || (s4 = n4 = 0) || o4.pop())) {
												if ((f4 ? m4.nodeName.toLowerCase() === q4 : m4.nodeType === 1) && ++s4) {
													if (r4) {
														l4 = m4[i3] || (m4[i3] = {});
														k4 = l4[m4.uniqueID] || (l4[m4.uniqueID] = {});
														k4[a] = [k3, s4];
													}
													if (m4 === g4) {
														break;
													}
												}
											}
										}
									}
									s4 -= _;
									return s4 === m || (s4 % m === 0 && s4 / m >= 0);
								}
							};
						},
						"PSEUDO": function (a, b) {
							var j, m = l.pseudos[a] || l.setFilters[a.toLowerCase()] || S.error("unsupported pseudo: " + a);
							if (m[i3]) {
								return m(b);
							}
							if (m.length > 1) {
								j = [a, a, "", b];
								return l.setFilters.hasOwnProperty(a.toLowerCase()) ? O3(function (_, g3) {
									var d4, e4 = m(_, b),
										i = e4.length;
									while (i--) {
										d4 = o(_, e4[i]);
										_[d4] = !(g3[d4] = e4[i]);
									}
								}) : function (_) {
									return m(_, 0, j);
								};
							}
							return m;
						}
					},
					pseudos: {
						"not": O3(function (a) {
							var b = [],
								j = [],
								m = s(a.replace(z, "$1"));
							return m[i3] ? O3(function (_, g3, d4, e4) {
								var f4, g4 = m(_, null, e4, []),
									i = _.length;
								while (i--) {
									if ((f4 = g4[i])) {
										_[i] = !(g3[i] = f4);
									}
								}
							}) : function (_, d4, e4) {
								b[0] = _;
								m(b, null, e4, j);
								b[0] = null;
								return !j.pop();
							};
						}),
						"has": O3(function (a) {
							return function (b) {
								return S(a, b).length > 0;
							};
						}),
						"contains": O3(function (a) {
							a = a.replace(K3, L3);
							return function (b) {
								return (b.textContent || b.innerText || n(b)).indexOf(a) > -1;
							};
						}),
						"lang": O3(function (a) {
							if (!D3.test(a || "")) {
								S.error("unsupported lang: " + a);
							}
							a = a.replace(K3, L3).toLowerCase();
							return function (b) {
								var j;
								do {
									if ((j = d3 ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))) {
										j = j.toLowerCase();
										return j === a || j.indexOf(a + "-") === 0;
									}
								} while ((b = b.parentNode) && b.nodeType === 1);
								return false;
							};
						}),
						"target": function (a) {
							var b = w.location && w.location.hash;
							return b && b.slice(1) === a.id;
						},
						"root": function (a) {
							return a === c3;
						},
						"focus": function (a) {
							return a === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
						},
						"enabled": function (a) {
							return a.disabled === false;
						},
						"disabled": function (a) {
							return a.disabled === true;
						},
						"checked": function (a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" && !!a.checked) || (b === "option" && !!a.selected);
						},
						"selected": function (a) {
							if (a.parentNode) {
								a.parentNode.selectedIndex;
							}
							return a.selected === true;
						},
						"empty": function (a) {
							for (a = a.firstChild; a; a = a.nextSibling) {
								if (a.nodeType < 6) {
									return false;
								}
							}
							return true;
						},
						"parent": function (a) {
							return !l.pseudos["empty"](a);
						},
						"header": function (a) {
							return G3.test(a.nodeName);
						},
						"input": function (a) {
							return F3.test(a.nodeName);
						},
						"button": function (a) {
							var b = a.nodeName.toLowerCase();
							return b === "input" && a.type === "button" || b === "button";
						},
						"text": function (a) {
							var b;
							return a.nodeName.toLowerCase() === "input" && a.type === "text" && ((b = a.getAttribute("type")) == null || b.toLowerCase() === "text");
						},
						"first": U3(function () {
							return [0];
						}),
						"last": U3(function (m, a) {
							return [a - 1];
						}),
						"eq": U3(function (m, a, b) {
							return [b < 0 ? b + a : b];
						}),
						"even": U3(function (m, a) {
							var i = 0;
							for (; i < a; i += 2) {
								m.push(i);
							}
							return m;
						}),
						"odd": U3(function (m, a) {
							var i = 1;
							for (; i < a; i += 2) {
								m.push(i);
							}
							return m;
						}),
						"lt": U3(function (m, a, b) {
							var i = b < 0 ? b + a : b;
							for (; --i >= 0;) {
								m.push(i);
							}
							return m;
						}),
						"gt": U3(function (m, a, b) {
							var i = b < 0 ? b + a : b;
							for (; ++i < a;) {
								m.push(i);
							}
							return m;
						})
					}
				};
				l.pseudos["nth"] = l.pseudos["eq"];
				for (i in {
						radio: true,
						checkbox: true,
						file: true,
						password: true,
						image: true
					}) {
					l.pseudos[i] = S3(i);
				}
				for (i in {
						submit: true,
						reset: true
					}) {
					l.pseudos[i] = T3(i);
				}

				function W3() {}
				W3.prototype = l.filters = l.pseudos;
				l.setFilters = new W3();
				t = S.tokenize = function (a, b) {
					var m, j, _, d4, e4, f4, g4, h4 = n3[a + " "];
					if (h4) {
						return b ? 0 : h4.slice(0);
					}
					e4 = a;
					f4 = [];
					g4 = l.preFilter;
					while (e4) {
						if (!m || (j = z3.exec(e4))) {
							if (j) {
								e4 = e4.slice(j[0].length) || e4;
							}
							f4.push((_ = []));
						}
						m = false;
						if ((j = A3.exec(e4))) {
							m = j.shift();
							_.push({
								value: m,
								type: j[0].replace(z, " ")
							});
							e4 = e4.slice(m.length);
						}
						for (d4 in l.filter) {
							if ((j = E3[d4].exec(e4)) && (!g4[d4] || (j = g4[d4](j)))) {
								m = j.shift();
								_.push({
									value: m,
									type: d4,
									matches: j
								});
								e4 = e4.slice(m.length);
							}
						}
						if (!m) {
							break;
						}
					}
					return b ? e4.length : e4 ? S.error(a) : n3(a, f4).slice(0);
				};

				function X3(a) {
					var i = 0,
						b = a.length,
						j = "";
					for (; i < b; i++) {
						j += a[i].value;
					}
					return j;
				}

				function Y3(m, a, b) {
					var E = a.dir,
						j = b && E === "parentNode",
						_ = l3++;
					return a.first ? function (d4, e4, f4) {
						while ((d4 = d4[E])) {
							if (d4.nodeType === 1 || j) {
								return m(d4, e4, f4);
							}
						}
					} : function (d4, e4, f4) {
						var g4, h4, i4, j4 = [k3, _];
						if (f4) {
							while ((d4 = d4[E])) {
								if (d4.nodeType === 1 || j) {
									if (m(d4, e4, f4)) {
										return true;
									}
								}
							}
						} else {
							while ((d4 = d4[E])) {
								if (d4.nodeType === 1 || j) {
									i4 = d4[i3] || (d4[i3] = {});
									h4 = i4[d4.uniqueID] || (i4[d4.uniqueID] = {});
									if ((g4 = h4[E]) && g4[0] === k3 && g4[1] === _) {
										return (j4[2] = g4[2]);
									} else {
										h4[E] = j4;
										if ((j4[2] = m(d4, e4, f4))) {
											return true;
										}
									}
								}
							}
						}
					};
				}

				function Z3(m) {
					return m.length > 1 ? function (a, b, j) {
						var i = m.length;
						while (i--) {
							if (!m[i](a, b, j)) {
								return false;
							}
						}
						return true;
					} : m[0];
				}

				function $3(a, b, j) {
					var i = 0,
						m = b.length;
					for (; i < m; i++) {
						S(a, b[i], j);
					}
					return j;
				}

				function _3(a, m, b, j, _) {
					var d4, e4 = [],
						i = 0,
						f4 = a.length,
						g4 = m != null;
					for (; i < f4; i++) {
						if ((d4 = a[i])) {
							if (!b || b(d4, j, _)) {
								e4.push(d4);
								if (g4) {
									m.push(i);
								}
							}
						}
					}
					return e4;
				}

				function a4(a, b, m, j, _, d4) {
					if (j && !j[i3]) {
						j = a4(j);
					}
					if (_ && !_[i3]) {
						_ = a4(_, d4);
					}
					return O3(function (e4, f4, g4, h4) {
						var i4, i, j4, k4 = [],
							l4 = [],
							m4 = f4.length,
							n4 = e4 || $3(b || "*", g4.nodeType ? [g4] : g4, []),
							o4 = a && (e4 || !b) ? _3(n4, k4, a, g4, h4) : n4,
							p4 = m ? _ || (e4 ? a : m4 || j) ? [] : f4 : o4;
						if (m) {
							m(o4, p4, g4, h4);
						}
						if (j) {
							i4 = _3(p4, l4);
							j(i4, [], g4, h4);
							i = i4.length;
							while (i--) {
								if ((j4 = i4[i])) {
									p4[l4[i]] = !(o4[l4[i]] = j4);
								}
							}
						}
						if (e4) {
							if (_ || a) {
								if (_) {
									i4 = [];
									i = p4.length;
									while (i--) {
										if ((j4 = p4[i])) {
											i4.push((o4[i] = j4));
										}
									}
									_(null, (p4 = []), i4, h4);
								}
								i = p4.length;
								while (i--) {
									if ((j4 = p4[i]) && (i4 = _ ? o(e4, j4) : k4[i]) > -1) {
										e4[i4] = !(f4[i4] = j4);
									}
								}
							}
						} else {
							p4 = _3(p4 === f4 ? p4.splice(m4, p4.length) : p4);
							if (_) {
								_(null, f4, p4, h4);
							} else {
								k.apply(f4, p4);
							}
						}
					});
				}

				function b4(a) {
					var b, m, j, _ = a.length,
						d4 = l.relative[a[0].type],
						e4 = d4 || l.relative[" "],
						i = d4 ? 1 : 0,
						f4 = Y3(function (i4) {
							return i4 === b;
						}, e4, true),
						g4 = Y3(function (i4) {
							return o(b, i4) > -1;
						}, e4, true),
						h4 = [function (i4, j4, k4) {
							var l4 = (!d4 && (k4 || j4 !== w1)) || ((b = j4).nodeType ? f4(i4, j4, k4) : g4(i4, j4, k4));
							b = null;
							return l4;
						}];
					for (; i < _; i++) {
						if ((m = l.relative[a[i].type])) {
							h4 = [Y3(Z3(h4), m)];
						} else {
							m = l.filter[a[i].type].apply(null, a[i].matches);
							if (m[i3]) {
								j = ++i;
								for (; j < _; j++) {
									if (l.relative[a[j].type]) {
										break;
									}
								}
								return a4(i > 1 && Z3(h4), i > 1 && X3(a.slice(0, i - 1).concat({
									value: a[i - 2].type === " " ? "*" : ""
								})).replace(z, "$1"), m, i < j && b4(a.slice(i, j)), j < _ && b4((a = a.slice(j))), j < _ && X3(a));
							}
							h4.push(m);
						}
					}
					return Z3(h4);
				}

				function c4(a, b) {
					var m = b.length > 0,
						_ = a.length > 0,
						d4 = function (e4, f4, g4, h4, i4) {
							var j4, j, k4, l4 = 0,
								i = "0",
								m4 = e4 && [],
								n4 = [],
								o4 = w1,
								p4 = e4 || _ && l.find["TAG"]("*", i4),
								q4 = (k3 += o4 == null ? 1 : Math.random() || 0.1),
								r4 = p4.length;
							if (i4) {
								w1 = f4 === f || f4 || i4;
							}
							for (; i !== r4 && (j4 = p4[i]) != null; i++) {
								if (_ && j4) {
									j = 0;
									if (!f4 && j4.ownerDocument !== f) {
										b3(j4);
										g4 = !d3;
									}
									while ((k4 = a[j++])) {
										if (k4(j4, f4 || f, g4)) {
											h4.push(j4);
											break;
										}
									}
									if (i4) {
										k3 = q4;
									}
								}
								if (m) {
									if ((j4 = !k4 && j4)) {
										l4--;
									}
									if (e4) {
										m4.push(j4);
									}
								}
							}
							l4 += i;
							if (m && i !== l4) {
								j = 0;
								while ((k4 = b[j++])) {
									k4(m4, n4, f4, g4);
								}
								if (e4) {
									if (l4 > 0) {
										while (i--) {
											if (!(m4[i] || n4[i])) {
												n4[i] = r3.call(h4);
											}
										}
									}
									n4 = _3(n4);
								}
								k.apply(h4, n4);
								if (i4 && !e4 && n4.length > 0 && (l4 + b.length) > 1) {
									S.uniqueSort(h4);
								}
							}
							if (i4) {
								k3 = q4;
								w1 = o4;
							}
							return m4;
						};
					return m ? O3(d4) : d4;
				}
				s = S.compile = function (a, m) {
					var i, b = [],
						j = [],
						_ = o3[a + " "];
					if (!_) {
						if (!m) {
							m = t(a);
						}
						i = m.length;
						while (i--) {
							_ = b4(m[i]);
							if (_[i3]) {
								b.push(_);
							} else {
								j.push(_);
							}
						}
						_ = o3(a, c4(j, b));
						_.selector = a;
					}
					return _;
				};
				v = S.select = function (a, b, j, m) {
					var i, _, d4, e4, f4, g4 = typeof a === "function" && a,
						h4 = !m && t((a = g4.selector || a));
					j = j || [];
					if (h4.length === 1) {
						_ = h4[0] = h4[0].slice(0);
						if (_.length > 2 && (d4 = _[0]).type === "ID" && x.getById && b.nodeType === 9 && d3 && l.relative[_[1].type]) {
							b = (l.find["ID"](d4.matches[0].replace(K3, L3), b) || [])[0];
							if (!b) {
								return j;
							} else if (g4) {
								b = b.parentNode;
							}
							a = a.slice(_.shift().value.length);
						}
						i = E3["needsContext"].test(a) ? 0 : _.length;
						while (i--) {
							d4 = _[i];
							if (l.relative[(e4 = d4.type)]) {
								break;
							}
							if ((f4 = l.find[e4])) {
								if ((m = f4(d4.matches[0].replace(K3, L3), I3.test(_[0].type) && V3(b.parentNode) || b))) {
									_.splice(i, 1);
									a = m.length && X3(_);
									if (!a) {
										k.apply(j, m);
										return j;
									}
									break;
								}
							}
						}
					}(g4 || s(a, h4))(m, b, !d3, j, !b || I3.test(a) && V3(b.parentNode) || b);
					return j;
				};
				x.sortStable = i3.split("").sort(p3).join("") === i3;
				x.detectDuplicates = !!a3;
				b3();
				x.sortDetached = P3(function (a) {
					return a.compareDocumentPosition(f.createElement("div")) & 1;
				});
				if (!P3(function (a) {
						a.innerHTML = "<a href='#'></a>";
						return a.firstChild.getAttribute("href") === "#";
					})) {
					Q3("type|href|height|width", function (a, b, p) {
						if (!p) {
							return a.getAttribute(b, b.toLowerCase() === "type" ? 1 : 2);
						}
					});
				}
				if (!x.attributes || !P3(function (a) {
						a.innerHTML = "<input/>";
						a.firstChild.setAttribute("value", "");
						return a.firstChild.getAttribute("value") === "";
					})) {
					Q3("value", function (a, b, p) {
						if (!p && a.nodeName.toLowerCase() === "input") {
							return a.defaultValue;
						}
					});
				}
				if (!P3(function (a) {
						return a.getAttribute("disabled") == null;
					})) {
					Q3(t3, function (a, b, p) {
						var j;
						if (!p) {
							return a[b] === true ? b.toLowerCase() : (j = a.getAttributeNode(b)) && j.specified ? j.value : null;
						}
					});
				}
				return S;
			})(w);
		Q.find = S;
		Q.expr = S.selectors;
		Q.expr[":"] = Q.expr.pseudos;
		Q.uniqueSort = Q.unique = S.uniqueSort;
		Q.text = S.getText;
		Q.isXMLDoc = S.isXML;
		Q.contains = S.contains;
		var E = function (e, E, a) {
			var m = [],
				t = a !== undefined;
			while ((e = e[E]) && e.nodeType !== 9) {
				if (e.nodeType === 1) {
					if (t && Q(e).is(a)) {
						break;
					}
					m.push(e);
				}
			}
			return m;
		};
		var F = function (n, e) {
			var m = [];
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== e) {
					m.push(n);
				}
			}
			return m;
		};
		var G = Q.expr.match.needsContext;
		var H = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
		var I = /^.[^:#\[\.,]*$/;

		function J(e, a, n) {
			if (Q.isFunction(a)) {
				return Q.grep(e, function (b, i) {
					return !!a.call(b, i, b) !== n;
				});
			}
			if (a.nodeType) {
				return Q.grep(e, function (b) {
					return (b === a) !== n;
				});
			}
			if (typeof a === "string") {
				if (I.test(a)) {
					return Q.filter(a, e, n);
				}
				a = Q.filter(a, e);
			}
			return Q.grep(e, function (b) {
				return (o.call(a, b) > -1) !== n;
			});
		}
		Q.filter = function (e, a, n) {
			var b = a[0];
			if (n) {
				e = ":not(" + e + ")";
			}
			return a.length === 1 && b.nodeType === 1 ? Q.find.matchesSelector(b, e) ? [b] : [] : Q.find.matches(e, Q.grep(a, function (b) {
				return b.nodeType === 1;
			}));
		};
		Q.fn.extend({
			find: function (s) {
				var i, l = this.length,
					a = [],
					b = this;
				if (typeof s !== "string") {
					return this.pushStack(Q(s).filter(function () {
						for (i = 0; i < l; i++) {
							if (Q.contains(b[i], this)) {
								return true;
							}
						}
					}));
				}
				for (i = 0; i < l; i++) {
					Q.find(s, b[i], a);
				}
				a = this.pushStack(l > 1 ? Q.unique(a) : a);
				a.selector = this.selector ? this.selector + " " + s : s;
				return a;
			},
			filter: function (s) {
				return this.pushStack(J(this, s || [], false));
			},
			not: function (s) {
				return this.pushStack(J(this, s || [], true));
			},
			is: function (s) {
				return !!J(this, typeof s === "string" && G.test(s) ? Q(s) : s || [], false).length;
			}
		});
		var K, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
			M = Q.fn.init = function (s, a, b) {
				var m, e;
				if (!s) {
					return this;
				}
				b = b || K;
				if (typeof s === "string") {
					if (s[0] === "<" && s[s.length - 1] === ">" && s.length >= 3) {
						m = [null, s, null];
					} else {
						m = L.exec(s);
					}
					if (m && (m[1] || !a)) {
						if (m[1]) {
							a = a instanceof Q ? a[0] : a;
							Q.merge(this, Q.parseHTML(m[1], a && a.nodeType ? a.ownerDocument || a : f, true));
							if (H.test(m[1]) && Q.isPlainObject(a)) {
								for (m in a) {
									if (Q.isFunction(this[m])) {
										this[m](a[m]);
									} else {
										this.attr(m, a[m]);
									}
								}
							}
							return this;
						} else {
							e = f.getElementById(m[2]);
							if (e && e.parentNode) {
								this.length = 1;
								this[0] = e;
							}
							this.context = f;
							this.selector = s;
							return this;
						}
					} else if (!a || a.jquery) {
						return (a || b).find(s);
					} else {
						return this.constructor(a).find(s);
					}
				} else if (s.nodeType) {
					this.context = this[0] = s;
					this.length = 1;
					return this;
				} else if (Q.isFunction(s)) {
					return b.ready !== undefined ? b.ready(s) : s(Q);
				}
				if (s.selector !== undefined) {
					this.selector = s.selector;
					this.context = s.context;
				}
				return Q.makeArray(s, this);
			};
		M.prototype = Q.fn;
		K = Q(f);
		var N = /^(?:parents|prev(?:Until|All))/,
			O = {
				children: true,
				contents: true,
				next: true,
				prev: true
			};
		Q.fn.extend({
			has: function (t) {
				var a = Q(t, this),
					l = a.length;
				return this.filter(function () {
					var i = 0;
					for (; i < l; i++) {
						if (Q.contains(this, a[i])) {
							return true;
						}
					}
				});
			},
			closest: function (s, a) {
				var b, i = 0,
					l = this.length,
					m = [],
					p = G.test(s) || typeof s !== "string" ? Q(s, a || this.context) : 0;
				for (; i < l; i++) {
					for (b = this[i]; b && b !== a; b = b.parentNode) {
						if (b.nodeType < 11 && (p ? p.index(b) > -1 : b.nodeType === 1 && Q.find.matchesSelector(b, s))) {
							m.push(b);
							break;
						}
					}
				}
				return this.pushStack(m.length > 1 ? Q.uniqueSort(m) : m);
			},
			index: function (e) {
				if (!e) {
					return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
				}
				if (typeof e === "string") {
					return o.call(Q(e), this[0]);
				}
				return o.call(this, e.jquery ? e[0] : e);
			},
			add: function (s, a) {
				return this.pushStack(Q.uniqueSort(Q.merge(this.get(), Q(s, a))));
			},
			addBack: function (s) {
				return this.add(s == null ? this.prevObject : this.prevObject.filter(s));
			}
		});

		function P(a, E) {
			while ((a = a[E]) && a.nodeType !== 1) {}
			return a;
		}
		Q.each({
			parent: function (e) {
				var p = e.parentNode;
				return p && p.nodeType !== 11 ? p : null;
			},
			parents: function (e) {
				return E(e, "parentNode");
			},
			parentsUntil: function (e, i, a) {
				return E(e, "parentNode", a);
			},
			next: function (e) {
				return P(e, "nextSibling");
			},
			prev: function (e) {
				return P(e, "previousSibling");
			},
			nextAll: function (e) {
				return E(e, "nextSibling");
			},
			prevAll: function (e) {
				return E(e, "previousSibling");
			},
			nextUntil: function (e, i, a) {
				return E(e, "nextSibling", a);
			},
			prevUntil: function (e, i, a) {
				return E(e, "previousSibling", a);
			},
			siblings: function (e) {
				return F((e.parentNode || {}).firstChild, e);
			},
			children: function (e) {
				return F(e.firstChild);
			},
			contents: function (e) {
				return e.contentDocument || Q.merge([], e.childNodes);
			}
		}, function (n, a) {
			Q.fn[n] = function (b, s) {
				var m = Q.map(this, a, b);
				if (n.slice(-5) !== "Until") {
					s = b;
				}
				if (s && typeof s === "string") {
					m = Q.filter(s, m);
				}
				if (this.length > 1) {
					if (!O[n]) {
						Q.uniqueSort(m);
					}
					if (N.test(n)) {
						m.reverse();
					}
				}
				return this.pushStack(m);
			};
		});
		var R = (/\S+/g);

		function T(a) {
			var b = {};
			Q.each(a.match(R) || [], function (_, e) {
				b[e] = true;
			});
			return b;
		}
		Q.Callbacks = function (a) {
			a = typeof a === "string" ? T(a) : Q.extend({}, a);
			var b, m, e, l, i = [],
				j = [],
				n = -1,
				p = function () {
					l = a.once;
					e = b = true;
					for (; j.length; n = -1) {
						m = j.shift();
						while (++n < i.length) {
							if (i[n].apply(m[0], m[1]) === false && a.stopOnFalse) {
								n = i.length;
								m = false;
							}
						}
					}
					if (!a.memory) {
						m = false;
					}
					b = false;
					if (l) {
						if (m) {
							i = [];
						} else {
							i = "";
						}
					}
				},
				s = {
					add: function () {
						if (i) {
							if (m && !b) {
								n = i.length - 1;
								j.push(m);
							}(function add(t) {
								Q.each(t, function (_, v) {
									if (Q.isFunction(v)) {
										if (!a.unique || !s.has(v)) {
											i.push(v);
										}
									} else if (v && v.length && Q.type(v) !== "string") {
										add(v);
									}
								});
							})(arguments);
							if (m && !b) {
								p();
							}
						}
						return this;
					},
					remove: function () {
						Q.each(arguments, function (_, t) {
							var v;
							while ((v = Q.inArray(t, i, v)) > -1) {
								i.splice(v, 1);
								if (v <= n) {
									n--;
								}
							}
						});
						return this;
					},
					has: function (t) {
						return t ? Q.inArray(t, i) > -1 : i.length > 0;
					},
					empty: function () {
						if (i) {
							i = [];
						}
						return this;
					},
					disable: function () {
						l = j = [];
						i = m = "";
						return this;
					},
					disabled: function () {
						return !i;
					},
					lock: function () {
						l = j = [];
						if (!m) {
							i = m = "";
						}
						return this;
					},
					locked: function () {
						return !!l;
					},
					fireWith: function (t, v) {
						if (!l) {
							v = v || [];
							v = [t, v.slice ? v.slice() : v];
							j.push(v);
							if (!b) {
								p();
							}
						}
						return this;
					},
					fire: function () {
						s.fireWith(this, arguments);
						return this;
					},
					fired: function () {
						return !!e;
					}
				};
			return s;
		};
		Q.extend({
			Deferred: function (a) {
				var t = [
						["resolve", "done", Q.Callbacks("once memory"), "resolved"],
						["reject", "fail", Q.Callbacks("once memory"), "rejected"],
						["notify", "progress", Q.Callbacks("memory")]
					],
					s = "pending",
					p = {
						state: function () {
							return s;
						},
						always: function () {
							b.done(arguments).fail(arguments);
							return this;
						},
						then: function () {
							var e = arguments;
							return Q.Deferred(function (n) {
								Q.each(t, function (i, j) {
									var l = Q.isFunction(e[i]) && e[i];
									b[j[1]](function () {
										var m = l && l.apply(this, arguments);
										if (m && Q.isFunction(m.promise)) {
											m.promise().progress(n.notify).done(n.resolve).fail(n.reject);
										} else {
											n[j[0] + "With"](this === p ? n.promise() : this, l ? [m] : arguments);
										}
									});
								});
								e = null;
							}).promise();
						},
						promise: function (e) {
							return e != null ? Q.extend(e, p) : p;
						}
					},
					b = {};
				p.pipe = p.then;
				Q.each(t, function (i, e) {
					var l = e[2],
						j = e[3];
					p[e[1]] = l.add;
					if (j) {
						l.add(function () {
							s = j;
						}, t[i ^ 1][2].disable, t[2][2].lock);
					}
					b[e[0]] = function () {
						b[e[0] + "With"](this === b ? p : this, arguments);
						return this;
					};
					b[e[0] + "With"] = l.fireWith;
				});
				p.promise(b);
				if (a) {
					a.call(b, b);
				}
				return b;
			},
			when: function (s) {
				var i = 0,
					a = g.call(arguments),
					l = a.length,
					b = l !== 1 || (s && Q.isFunction(s.promise)) ? l : 0,
					e = b === 1 ? s : Q.Deferred(),
					j = function (i, t, v) {
						return function (_) {
							t[i] = this;
							v[i] = arguments.length > 1 ? g.call(arguments) : _;
							if (v === p) {
								e.notifyWith(t, v);
							} else if (!(--b)) {
								e.resolveWith(t, v);
							}
						};
					},
					p, m, n;
				if (l > 1) {
					p = new Array(l);
					m = new Array(l);
					n = new Array(l);
					for (; i < l; i++) {
						if (a[i] && Q.isFunction(a[i].promise)) {
							a[i].promise().progress(j(i, m, p)).done(j(i, n, a)).fail(e.reject);
						} else {
							--b;
						}
					}
				}
				if (!b) {
					e.resolveWith(n, a);
				}
				return e.promise();
			}
		});
		var U;
		Q.fn.ready = function (a) {
			Q.ready.promise().done(a);
			return this;
		};
		Q.extend({
			isReady: false,
			readyWait: 1,
			holdReady: function (a) {
				if (a) {
					Q.readyWait++;
				} else {
					Q.ready(true);
				}
			},
			ready: function (a) {
				if (a === true ? --Q.readyWait : Q.isReady) {
					return;
				}
				Q.isReady = true;
				if (a !== true && --Q.readyWait > 0) {
					return;
				}
				U.resolveWith(f, [Q]);
				if (Q.fn.triggerHandler) {
					Q(f).triggerHandler("ready");
					Q(f).off("ready");
				}
			}
		});

		function V() {
			f.removeEventListener("DOMContentLoaded", V);
			w.removeEventListener("load", V);
			Q.ready();
		}
		Q.ready.promise = function (a) {
			if (!U) {
				U = Q.Deferred();
				if (f.readyState === "complete" || (f.readyState !== "loading" && !f.documentElement.doScroll)) {
					w.setTimeout(Q.ready);
				} else {
					f.addEventListener("DOMContentLoaded", V);
					w.addEventListener("load", V);
				}
			}
			return U.promise(a);
		};
		Q.ready.promise();
		var W = function (e, a, b, v, j, l, m) {
			var i = 0,
				n = e.length,
				p = b == null;
			if (Q.type(b) === "object") {
				j = true;
				for (i in b) {
					W(e, a, i, b[i], true, l, m);
				}
			} else if (v !== undefined) {
				j = true;
				if (!Q.isFunction(v)) {
					m = true;
				}
				if (p) {
					if (m) {
						a.call(e, v);
						a = null;
					} else {
						p = a;
						a = function (s, b, v) {
							return p.call(Q(s), v);
						};
					}
				}
				if (a) {
					for (; i < n; i++) {
						a(e[i], b, m ? v : v.call(e[i], i, a(e[i], b)));
					}
				}
			}
			return j ? e : p ? a.call(e) : n ? a(e[0], b) : l;
		};
		var X = function (a) {
			return a.nodeType === 1 || a.nodeType === 9 || !(+a.nodeType);
		};

		function Y() {
			this.expando = Q.expando + Y.uid++;
		}
		Y.uid = 1;
		Y.prototype = {
			register: function (a, i) {
				var v = i || {};
				if (a.nodeType) {
					a[this.expando] = v;
				} else {
					Object.defineProperty(a, this.expando, {
						value: v,
						writable: true,
						configurable: true
					});
				}
				return a[this.expando];
			},
			cache: function (a) {
				if (!X(a)) {
					return {};
				}
				var v = a[this.expando];
				if (!v) {
					v = {};
					if (X(a)) {
						if (a.nodeType) {
							a[this.expando] = v;
						} else {
							Object.defineProperty(a, this.expando, {
								value: v,
								configurable: true
							});
						}
					}
				}
				return v;
			},
			set: function (a, b, v) {
				var p, e = this.cache(a);
				if (typeof b === "string") {
					e[b] = v;
				} else {
					for (p in b) {
						e[p] = b[p];
					}
				}
				return e;
			},
			get: function (a, b) {
				return b === undefined ? this.cache(a) : a[this.expando] && a[this.expando][b];
			},
			access: function (a, b, v) {
				var s;
				if (b === undefined || ((b && typeof b === "string") && v === undefined)) {
					s = this.get(a, b);
					return s !== undefined ? s : this.get(a, Q.camelCase(b));
				}
				this.set(a, b, v);
				return v !== undefined ? v : b;
			},
			remove: function (a, b) {
				var i, n, e, j = a[this.expando];
				if (j === undefined) {
					return;
				}
				if (b === undefined) {
					this.register(a);
				} else {
					if (Q.isArray(b)) {
						n = b.concat(b.map(Q.camelCase));
					} else {
						e = Q.camelCase(b);
						if (b in j) {
							n = [b, e];
						} else {
							n = e;
							n = n in j ? [n] : (n.match(R) || []);
						}
					}
					i = n.length;
					while (i--) {
						delete j[n[i]];
					}
				}
				if (b === undefined || Q.isEmptyObject(j)) {
					if (a.nodeType) {
						a[this.expando] = undefined;
					} else {
						delete a[this.expando];
					}
				}
			},
			hasData: function (a) {
				var b = a[this.expando];
				return b !== undefined && !Q.isEmptyObject(b);
			}
		};
		var Z = new Y();
		var $ = new Y();
		var a1 = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			b1 = /[A-Z]/g;

		function c1(a, b, i) {
			var n;
			if (i === undefined && a.nodeType === 1) {
				n = "data-" + b.replace(b1, "-$&").toLowerCase();
				i = a.getAttribute(n);
				if (typeof i === "string") {
					try {
						i = i === "true" ? true : i === "false" ? false : i === "null" ? null : +i + "" === i ? +i : a1.test(i) ? Q.parseJSON(i) : i;
					} catch (e) {}
					$.set(a, b, i);
				} else {
					i = undefined;
				}
			}
			return i;
		}
		Q.extend({
			hasData: function (e) {
				return $.hasData(e) || Z.hasData(e);
			},
			data: function (e, n, a) {
				return $.access(e, n, a);
			},
			removeData: function (e, n) {
				$.remove(e, n);
			},
			_data: function (e, n, a) {
				return Z.access(e, n, a);
			},
			_removeData: function (e, n) {
				Z.remove(e, n);
			}
		});
		Q.fn.extend({
			data: function (a, v) {
				var i, n, b, e = this[0],
					j = e && e.attributes;
				if (a === undefined) {
					if (this.length) {
						b = $.get(e);
						if (e.nodeType === 1 && !Z.get(e, "hasDataAttrs")) {
							i = j.length;
							while (i--) {
								if (j[i]) {
									n = j[i].name;
									if (n.indexOf("data-") === 0) {
										n = Q.camelCase(n.slice(5));
										c1(e, n, b[n]);
									}
								}
							}
							Z.set(e, "hasDataAttrs", true);
						}
					}
					return b;
				}
				if (typeof a === "object") {
					return this.each(function () {
						$.set(this, a);
					});
				}
				return W(this, function (v) {
					var b, l;
					if (e && v === undefined) {
						b = $.get(e, a) || $.get(e, a.replace(b1, "-$&").toLowerCase());
						if (b !== undefined) {
							return b;
						}
						l = Q.camelCase(a);
						b = $.get(e, l);
						if (b !== undefined) {
							return b;
						}
						b = c1(e, l, undefined);
						if (b !== undefined) {
							return b;
						}
						return;
					}
					l = Q.camelCase(a);
					this.each(function () {
						var b = $.get(this, l);
						$.set(this, l, v);
						if (a.indexOf("-") > -1 && b !== undefined) {
							$.set(this, a, v);
						}
					});
				}, null, v, arguments.length > 1, null, true);
			},
			removeData: function (a) {
				return this.each(function () {
					$.remove(this, a);
				});
			}
		});
		Q.extend({
			queue: function (e, t, a) {
				var b;
				if (e) {
					t = (t || "fx") + "queue";
					b = Z.get(e, t);
					if (a) {
						if (!b || Q.isArray(a)) {
							b = Z.access(e, t, Q.makeArray(a));
						} else {
							b.push(a);
						}
					}
					return b || [];
				}
			},
			dequeue: function (e, t) {
				t = t || "fx";
				var a = Q.queue(e, t),
					s = a.length,
					b = a.shift(),
					i = Q._queueHooks(e, t),
					n = function () {
						Q.dequeue(e, t);
					};
				if (b === "inprogress") {
					b = a.shift();
					s--;
				}
				if (b) {
					if (t === "fx") {
						a.unshift("inprogress");
					}
					delete i.stop;
					b.call(e, n, i);
				}
				if (!s && i) {
					i.empty.fire();
				}
			},
			_queueHooks: function (e, t) {
				var a = t + "queueHooks";
				return Z.get(e, a) || Z.access(e, a, {
					empty: Q.Callbacks("once memory").add(function () {
						Z.remove(e, [t + "queue", a]);
					})
				});
			}
		});
		Q.fn.extend({
			queue: function (t, a) {
				var s = 2;
				if (typeof t !== "string") {
					a = t;
					t = "fx";
					s--;
				}
				if (arguments.length < s) {
					return Q.queue(this[0], t);
				}
				return a === undefined ? this : this.each(function () {
					var b = Q.queue(this, t, a);
					Q._queueHooks(this, t);
					if (t === "fx" && b[0] !== "inprogress") {
						Q.dequeue(this, t);
					}
				});
			},
			dequeue: function (t) {
				return this.each(function () {
					Q.dequeue(this, t);
				});
			},
			clearQueue: function (t) {
				return this.queue(t || "fx", []);
			},
			promise: function (t, a) {
				var b, e = 1,
					j = Q.Deferred(),
					l = this,
					i = this.length,
					m = function () {
						if (!(--e)) {
							j.resolveWith(l, [l]);
						}
					};
				if (typeof t !== "string") {
					a = t;
					t = undefined;
				}
				t = t || "fx";
				while (i--) {
					b = Z.get(l[i], t + "queueHooks");
					if (b && b.empty) {
						e++;
						b.empty.add(m);
					}
				}
				m();
				return j.promise(a);
			}
		});
		var d1 = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
		var e1 = new RegExp("^(?:([+-])=|)(" + d1 + ")([a-z%]*)$", "i");
		var f1 = ["Top", "Right", "Bottom", "Left"];
		var g1 = function (e, a) {
			e = a || e;
			return Q.css(e, "display") === "none" || !Q.contains(e.ownerDocument, e);
		};

		function h1(e, p, v, t) {
			var a, s = 1,
				m = 20,
				b = t ? function () {
					return t.cur();
				} : function () {
					return Q.css(e, p, "");
				},
				i = b(),
				j = v && v[3] || (Q.cssNumber[p] ? "" : "px"),
				l = (Q.cssNumber[p] || j !== "px" && +i) && e1.exec(Q.css(e, p));
			if (l && l[3] !== j) {
				j = j || l[3];
				v = v || [];
				l = +i || 1;
				do {
					s = s || ".5";
					l = l / s;
					Q.style(e, p, l + j);
				} while (s !== (s = b() / i) && s !== 1 && --m);
			}
			if (v) {
				l = +l || +i || 0;
				a = v[1] ? l + (v[1] + 1) * v[2] : +v[2];
				if (t) {
					t.unit = j;
					t.start = l;
					t.end = a;
				}
			}
			return a;
		}
		var i1 = (/^(?:checkbox|radio)$/i);
		var j1 = (/<([\w:-]+)/);
		var k1 = (/^$|\/(?:java|ecma)script/i);
		var l1 = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
		l1.optgroup = l1.option;
		l1.tbody = l1.tfoot = l1.colgroup = l1.caption = l1.thead;
		l1.th = l1.td;

		function m1(a, t) {
			var b = typeof a.getElementsByTagName !== "undefined" ? a.getElementsByTagName(t || "*") : typeof a.querySelectorAll !== "undefined" ? a.querySelectorAll(t || "*") : [];
			return t === undefined || t && Q.nodeName(a, t) ? Q.merge([a], b) : b;
		}

		function n1(e, a) {
			var i = 0,
				l = e.length;
			for (; i < l; i++) {
				Z.set(e[i], "globalEval", !a || Z.get(a[i], "globalEval"));
			}
		}
		var o1 = /<|&#?\w+;/;

		function p1(e, a, s, b, m) {
			var n, t, p, v, _, j, w1 = a.createDocumentFragment(),
				_2 = [],
				i = 0,
				l = e.length;
			for (; i < l; i++) {
				n = e[i];
				if (n || n === 0) {
					if (Q.type(n) === "object") {
						Q.merge(_2, n.nodeType ? [n] : n);
					} else if (!o1.test(n)) {
						_2.push(a.createTextNode(n));
					} else {
						t = t || w1.appendChild(a.createElement("div"));
						p = (j1.exec(n) || ["", ""])[1].toLowerCase();
						v = l1[p] || l1._default;
						t.innerHTML = v[1] + Q.htmlPrefilter(n) + v[2];
						j = v[0];
						while (j--) {
							t = t.lastChild;
						}
						Q.merge(_2, t.childNodes);
						t = w1.firstChild;
						t.textContent = "";
					}
				}
			}
			w1.textContent = "";
			i = 0;
			while ((n = _2[i++])) {
				if (b && Q.inArray(n, b) > -1) {
					if (m) {
						m.push(n);
					}
					continue;
				}
				_ = Q.contains(n.ownerDocument, n);
				t = m1(w1.appendChild(n), "script");
				if (_) {
					n1(t);
				}
				if (s) {
					j = 0;
					while ((n = t[j++])) {
						if (k1.test(n.type || "")) {
							s.push(n);
						}
					}
				}
			}
			return w1;
		}(function () {
			var a = f.createDocumentFragment(),
				b = a.appendChild(f.createElement("div")),
				i = f.createElement("input");
			i.setAttribute("type", "radio");
			i.setAttribute("checked", "checked");
			i.setAttribute("name", "t");
			b.appendChild(i);
			x.checkClone = b.cloneNode(true).cloneNode(true).lastChild.checked;
			b.innerHTML = "<textarea>x</textarea>";
			x.noCloneChecked = !!b.cloneNode(true).lastChild.defaultValue;
		})();
		var q1 = /^key/,
			r1 = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			s1 = /^([^.]*)(?:\.(.+)|)/;

		function t1() {
			return true;
		}

		function u1() {
			return false;
		}

		function v1() {
			try {
				return f.activeElement;
			} catch (e) {}
		}

		function on(e, t, s, a, b, i) {
			var j, l;
			if (typeof t === "object") {
				if (typeof s !== "string") {
					a = a || s;
					s = undefined;
				}
				for (l in t) {
					on(e, l, s, a, t[l], i);
				}
				return e;
			}
			if (a == null && b == null) {
				b = s;
				a = s = undefined;
			} else if (b == null) {
				if (typeof s === "string") {
					b = a;
					a = undefined;
				} else {
					b = a;
					a = s;
					s = undefined;
				}
			}
			if (b === false) {
				b = u1;
			} else if (!b) {
				return e;
			}
			if (i === 1) {
				j = b;
				b = function (m) {
					Q().off(m);
					return j.apply(this, arguments);
				};
				b.guid = j.guid || (j.guid = Q.guid++);
			}
			return e.each(function () {
				Q.event.add(this, t, b, a, s);
			});
		}
		Q.event = {
			global: {},
			add: function (a, b, i, j, s) {
				var l, m, n, p, t, v, _, w1, _2, a3, b3, c3 = Z.get(a);
				if (!c3) {
					return;
				}
				if (i.handler) {
					l = i;
					i = l.handler;
					s = l.selector;
				}
				if (!i.guid) {
					i.guid = Q.guid++;
				}
				if (!(p = c3.events)) {
					p = c3.events = {};
				}
				if (!(m = c3.handle)) {
					m = c3.handle = function (e) {
						return typeof Q !== "undefined" && Q.event.triggered !== e.type ? Q.event.dispatch.apply(a, arguments) : undefined;
					};
				}
				b = (b || "").match(R) || [""];
				t = b.length;
				while (t--) {
					n = s1.exec(b[t]) || [];
					_2 = b3 = n[1];
					a3 = (n[2] || "").split(".").sort();
					if (!_2) {
						continue;
					}
					_ = Q.event.special[_2] || {};
					_2 = (s ? _.delegateType : _.bindType) || _2;
					_ = Q.event.special[_2] || {};
					v = Q.extend({
						type: _2,
						origType: b3,
						data: j,
						handler: i,
						guid: i.guid,
						selector: s,
						needsContext: s && Q.expr.match.needsContext.test(s),
						namespace: a3.join(".")
					}, l);
					if (!(w1 = p[_2])) {
						w1 = p[_2] = [];
						w1.delegateCount = 0;
						if (!_.setup || _.setup.call(a, j, a3, m) === false) {
							if (a.addEventListener) {
								a.addEventListener(_2, m);
							}
						}
					}
					if (_.add) {
						_.add.call(a, v);
						if (!v.handler.guid) {
							v.handler.guid = i.guid;
						}
					}
					if (s) {
						w1.splice(w1.delegateCount++, 0, v);
					} else {
						w1.push(v);
					}
					Q.event.global[_2] = true;
				}
			},
			remove: function (e, a, b, s, m) {
				var j, i, l, n, t, p, v, _, w1, _2, a3, b3 = Z.hasData(e) && Z.get(e);
				if (!b3 || !(n = b3.events)) {
					return;
				}
				a = (a || "").match(R) || [""];
				t = a.length;
				while (t--) {
					l = s1.exec(a[t]) || [];
					w1 = a3 = l[1];
					_2 = (l[2] || "").split(".").sort();
					if (!w1) {
						for (w1 in n) {
							Q.event.remove(e, w1 + a[t], b, s, true);
						}
						continue;
					}
					v = Q.event.special[w1] || {};
					w1 = (s ? v.delegateType : v.bindType) || w1;
					_ = n[w1] || [];
					l = l[2] && new RegExp("(^|\\.)" + _2.join("\\.(?:.*\\.|)") + "(\\.|$)");
					i = j = _.length;
					while (j--) {
						p = _[j];
						if ((m || a3 === p.origType) && (!b || b.guid === p.guid) && (!l || l.test(p.namespace)) && (!s || s === p.selector || s === "**" && p.selector)) {
							_.splice(j, 1);
							if (p.selector) {
								_.delegateCount--;
							}
							if (v.remove) {
								v.remove.call(e, p);
							}
						}
					}
					if (i && !_.length) {
						if (!v.teardown || v.teardown.call(e, _2, b3.handle) === false) {
							Q.removeEvent(e, w1, b3.handle);
						}
						delete n[w1];
					}
				}
				if (Q.isEmptyObject(n)) {
					Z.remove(e, "handle events");
				}
			},
			dispatch: function (e) {
				e = Q.event.fix(e);
				var i, j, a, m, b, l = [],
					n = g.call(arguments),
					p = (Z.get(this, "events") || {})[e.type] || [],
					s = Q.event.special[e.type] || {};
				n[0] = e;
				e.delegateTarget = this;
				if (s.preDispatch && s.preDispatch.call(this, e) === false) {
					return;
				}
				l = Q.event.handlers.call(this, e, p);
				i = 0;
				while ((m = l[i++]) && !e.isPropagationStopped()) {
					e.currentTarget = m.elem;
					j = 0;
					while ((b = m.handlers[j++]) && !e.isImmediatePropagationStopped()) {
						if (!e.rnamespace || e.rnamespace.test(b.namespace)) {
							e.handleObj = b;
							e.data = b.data;
							a = ((Q.event.special[b.origType] || {}).handle || b.handler).apply(m.elem, n);
							if (a !== undefined) {
								if ((e.result = a) === false) {
									e.preventDefault();
									e.stopPropagation();
								}
							}
						}
					}
				}
				if (s.postDispatch) {
					s.postDispatch.call(this, e);
				}
				return e.result;
			},
			handlers: function (e, a) {
				var i, m, s, b, j = [],
					l = a.delegateCount,
					n = e.target;
				if (l && n.nodeType && (e.type !== "click" || isNaN(e.button) || e.button < 1)) {
					for (; n !== this; n = n.parentNode || this) {
						if (n.nodeType === 1 && (n.disabled !== true || e.type !== "click")) {
							m = [];
							for (i = 0; i < l; i++) {
								b = a[i];
								s = b.selector + " ";
								if (m[s] === undefined) {
									m[s] = b.needsContext ? Q(s, this).index(n) > -1 : Q.find(s, this, null, [n]).length;
								}
								if (m[s]) {
									m.push(b);
								}
							}
							if (m.length) {
								j.push({
									elem: n,
									handlers: m
								});
							}
						}
					}
				}
				if (l < a.length) {
					j.push({
						elem: this,
						handlers: a.slice(l)
					});
				}
				return j;
			},
			props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function (e, a) {
					if (e.which == null) {
						e.which = a.charCode != null ? a.charCode : a.keyCode;
					}
					return e;
				}
			},
			mouseHooks: {
				props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
				filter: function (e, a) {
					var b, i, j, l = a.button;
					if (e.pageX == null && a.clientX != null) {
						b = e.target.ownerDocument || f;
						i = b.documentElement;
						j = b.body;
						e.pageX = a.clientX + (i && i.scrollLeft || j && j.scrollLeft || 0) - (i && i.clientLeft || j && j.clientLeft || 0);
						e.pageY = a.clientY + (i && i.scrollTop || j && j.scrollTop || 0) - (i && i.clientTop || j && j.clientTop || 0);
					}
					if (!e.which && l !== undefined) {
						e.which = (l & 1 ? 1 : (l & 2 ? 3 : (l & 4 ? 2 : 0)));
					}
					return e;
				}
			},
			fix: function (e) {
				if (e[Q.expando]) {
					return e;
				}
				var i, p, a, t = e.type,
					b = e,
					j = this.fixHooks[t];
				if (!j) {
					this.fixHooks[t] = j = r1.test(t) ? this.mouseHooks : q1.test(t) ? this.keyHooks : {};
				}
				a = j.props ? this.props.concat(j.props) : this.props;
				e = new Q.Event(b);
				i = a.length;
				while (i--) {
					p = a[i];
					e[p] = b[p];
				}
				if (!e.target) {
					e.target = f;
				}
				if (e.target.nodeType === 3) {
					e.target = e.target.parentNode;
				}
				return j.filter ? j.filter(e, b) : e;
			},
			special: {
				load: {
					noBubble: true
				},
				focus: {
					trigger: function () {
						if (this !== v1() && this.focus) {
							this.focus();
							return false;
						}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function () {
						if (this === v1() && this.blur) {
							this.blur();
							return false;
						}
					},
					delegateType: "focusout"
				},
				click: {
					trigger: function () {
						if (this.type === "checkbox" && this.click && Q.nodeName(this, "input")) {
							this.click();
							return false;
						}
					},
					_default: function (e) {
						return Q.nodeName(e.target, "a");
					}
				},
				beforeunload: {
					postDispatch: function (e) {
						if (e.result !== undefined && e.originalEvent) {
							e.originalEvent.returnValue = e.result;
						}
					}
				}
			}
		};
		Q.removeEvent = function (e, t, a) {
			if (e.removeEventListener) {
				e.removeEventListener(t, a);
			}
		};
		Q.Event = function (s, p) {
			if (!(this instanceof Q.Event)) {
				return new Q.Event(s, p);
			}
			if (s && s.type) {
				this.originalEvent = s;
				this.type = s.type;
				this.isDefaultPrevented = s.defaultPrevented || s.defaultPrevented === undefined && s.returnValue === false ? t1 : u1;
			} else {
				this.type = s;
			}
			if (p) {
				Q.extend(this, p);
			}
			this.timeStamp = s && s.timeStamp || Q.now();
			this[Q.expando] = true;
		};
		Q.Event.prototype = {
			constructor: Q.Event,
			isDefaultPrevented: u1,
			isPropagationStopped: u1,
			isImmediatePropagationStopped: u1,
			preventDefault: function () {
				var e = this.originalEvent;
				this.isDefaultPrevented = t1;
				if (e) {
					e.preventDefault();
				}
			},
			stopPropagation: function () {
				var e = this.originalEvent;
				this.isPropagationStopped = t1;
				if (e) {
					e.stopPropagation();
				}
			},
			stopImmediatePropagation: function () {
				var e = this.originalEvent;
				this.isImmediatePropagationStopped = t1;
				if (e) {
					e.stopImmediatePropagation();
				}
				this.stopPropagation();
			}
		};
		Q.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function (a, b) {
			Q.event.special[a] = {
				delegateType: b,
				bindType: b,
				handle: function (e) {
					var i, t = this,
						j = e.relatedTarget,
						l = e.handleObj;
					if (!j || (j !== t && !Q.contains(t, j))) {
						e.type = l.origType;
						i = l.handler.apply(this, arguments);
						e.type = b;
					}
					return i;
				}
			};
		});
		Q.fn.extend({
			on: function (t, s, a, b) {
				return on(this, t, s, a, b);
			},
			one: function (t, s, a, b) {
				return on(this, t, s, a, b, 1);
			},
			off: function (t, s, a) {
				var b, e;
				if (t && t.preventDefault && t.handleObj) {
					b = t.handleObj;
					Q(t.delegateTarget).off(b.namespace ? b.origType + "." + b.namespace : b.origType, b.selector, b.handler);
					return this;
				}
				if (typeof t === "object") {
					for (e in t) {
						this.off(e, s, t[e]);
					}
					return this;
				}
				if (s === false || typeof s === "function") {
					a = s;
					s = undefined;
				}
				if (a === false) {
					a = u1;
				}
				return this.each(function () {
					Q.event.remove(this, t, a, s);
				});
			}
		});
		var x1 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
			y1 = /<script|<style|<link/i,
			z1 = /checked\s*(?:[^=]|=\s*.checked.)/i,
			A1 = /^true\/(.*)/,
			B1 = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

		function C1(e, a) {
			return Q.nodeName(e, "table") && Q.nodeName(a.nodeType !== 11 ? a : a.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
		}

		function D1(e) {
			e.type = (e.getAttribute("type") !== null) + "/" + e.type;
			return e;
		}

		function E1(e) {
			var m = A1.exec(e.type);
			if (m) {
				e.type = m[1];
			} else {
				e.removeAttribute("type");
			}
			return e;
		}

		function F1(s, a) {
			var i, l, t, p, b, e, j, m;
			if (a.nodeType !== 1) {
				return;
			}
			if (Z.hasData(s)) {
				p = Z.access(s);
				b = Z.set(a, p);
				m = p.events;
				if (m) {
					delete b.handle;
					b.events = {};
					for (t in m) {
						for (i = 0, l = m[t].length; i < l; i++) {
							Q.event.add(a, t, m[t][i]);
						}
					}
				}
			}
			if ($.hasData(s)) {
				e = $.access(s);
				j = Q.extend({}, e);
				$.set(a, j);
			}
		}

		function G1(s, a) {
			var n = a.nodeName.toLowerCase();
			if (n === "input" && i1.test(s.type)) {
				a.checked = s.checked;
			} else if (n === "input" || n === "textarea") {
				a.defaultValue = s.defaultValue;
			}
		}

		function H1(a, b, e, j) {
			b = h.apply([], b);
			var m, n, s, p, t, v, i = 0,
				l = a.length,
				_ = l - 1,
				w1 = b[0],
				_2 = Q.isFunction(w1);
			if (_2 || (l > 1 && typeof w1 === "string" && !x.checkClone && z1.test(w1))) {
				return a.each(function (a3) {
					var b3 = a.eq(a3);
					if (_2) {
						b[0] = w1.call(this, a3, b3.html());
					}
					H1(b3, b, e, j);
				});
			}
			if (l) {
				m = p1(b, a[0].ownerDocument, false, a, j);
				n = m.firstChild;
				if (m.childNodes.length === 1) {
					m = n;
				}
				if (n || j) {
					s = Q.map(m1(m, "script"), D1);
					p = s.length;
					for (; i < l; i++) {
						t = m;
						if (i !== _) {
							t = Q.clone(t, true, true);
							if (p) {
								Q.merge(s, m1(t, "script"));
							}
						}
						e.call(a[i], t, i);
					}
					if (p) {
						v = s[s.length - 1].ownerDocument;
						Q.map(s, E1);
						for (i = 0; i < p; i++) {
							t = s[i];
							if (k1.test(t.type || "") && !Z.access(t, "globalEval") && Q.contains(v, t)) {
								if (t.src) {
									if (Q._evalUrl) {
										Q._evalUrl(t.src);
									}
								} else {
									Q.globalEval(t.textContent.replace(B1, ""));
								}
							}
						}
					}
				}
			}
			return a;
		}

		function I1(e, s, a) {
			var n, b = s ? Q.filter(s, e) : e,
				i = 0;
			for (;
				(n = b[i]) != null; i++) {
				if (!a && n.nodeType === 1) {
					Q.cleanData(m1(n));
				}
				if (n.parentNode) {
					if (a && Q.contains(n.ownerDocument, n)) {
						n1(m1(n, "script"));
					}
					n.parentNode.removeChild(n);
				}
			}
			return e;
		}
		Q.extend({
			htmlPrefilter: function (a) {
				return a.replace(x1, "<$1></$2>");
			},
			clone: function (e, a, b) {
				var i, l, s, j, m = e.cloneNode(true),
					n = Q.contains(e.ownerDocument, e);
				if (!x.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !Q.isXMLDoc(e)) {
					j = m1(m);
					s = m1(e);
					for (i = 0, l = s.length; i < l; i++) {
						G1(s[i], j[i]);
					}
				}
				if (a) {
					if (b) {
						s = s || m1(e);
						j = j || m1(m);
						for (i = 0, l = s.length; i < l; i++) {
							F1(s[i], j[i]);
						}
					} else {
						F1(e, m);
					}
				}
				j = m1(m, "script");
				if (j.length > 0) {
					n1(j, !n && m1(e, "script"));
				}
				return m;
			},
			cleanData: function (e) {
				var a, b, t, s = Q.event.special,
					i = 0;
				for (;
					(b = e[i]) !== undefined; i++) {
					if (X(b)) {
						if ((a = b[Z.expando])) {
							if (a.events) {
								for (t in a.events) {
									if (s[t]) {
										Q.event.remove(b, t);
									} else {
										Q.removeEvent(b, t, a.handle);
									}
								}
							}
							b[Z.expando] = undefined;
						}
						if (b[$.expando]) {
							b[$.expando] = undefined;
						}
					}
				}
			}
		});
		Q.fn.extend({
			domManip: H1,
			detach: function (s) {
				return I1(this, s, true);
			},
			remove: function (s) {
				return I1(this, s);
			},
			text: function (v) {
				return W(this, function (v) {
					return v === undefined ? Q.text(this) : this.empty().each(function () {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							this.textContent = v;
						}
					});
				}, null, v, arguments.length);
			},
			append: function () {
				return H1(this, arguments, function (e) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var t = C1(this, e);
						t.appendChild(e);
					}
				});
			},
			prepend: function () {
				return H1(this, arguments, function (e) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var t = C1(this, e);
						t.insertBefore(e, t.firstChild);
					}
				});
			},
			before: function () {
				return H1(this, arguments, function (e) {
					if (this.parentNode) {
						this.parentNode.insertBefore(e, this);
					}
				});
			},
			after: function () {
				return H1(this, arguments, function (e) {
					if (this.parentNode) {
						this.parentNode.insertBefore(e, this.nextSibling);
					}
				});
			},
			empty: function () {
				var e, i = 0;
				for (;
					(e = this[i]) != null; i++) {
					if (e.nodeType === 1) {
						Q.cleanData(m1(e, false));
						e.textContent = "";
					}
				}
				return this;
			},
			clone: function (a, b) {
				a = a == null ? false : a;
				b = b == null ? a : b;
				return this.map(function () {
					return Q.clone(this, a, b);
				});
			},
			html: function (v) {
				return W(this, function (v) {
					var a = this[0] || {},
						i = 0,
						l = this.length;
					if (v === undefined && a.nodeType === 1) {
						return a.innerHTML;
					}
					if (typeof v === "string" && !y1.test(v) && !l1[(j1.exec(v) || ["", ""])[1].toLowerCase()]) {
						v = Q.htmlPrefilter(v);
						try {
							for (; i < l; i++) {
								a = this[i] || {};
								if (a.nodeType === 1) {
									Q.cleanData(m1(a, false));
									a.innerHTML = v;
								}
							}
							a = 0;
						} catch (e) {}
					}
					if (a) {
						this.empty().append(v);
					}
				}, null, v, arguments.length);
			},
			replaceWith: function () {
				var i = [];
				return H1(this, arguments, function (e) {
					var p = this.parentNode;
					if (Q.inArray(this, i) < 0) {
						Q.cleanData(m1(this));
						if (p) {
							p.replaceChild(e, this);
						}
					}
				}, i);
			}
		});
		Q.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function (n, a) {
			Q.fn[n] = function (s) {
				var e, b = [],
					j = Q(s),
					l = j.length - 1,
					i = 0;
				for (; i <= l; i++) {
					e = i === l ? this : this.clone(true);
					Q(j[i])[a](e);
					k.apply(b, e.get());
				}
				return this.pushStack(b);
			};
		});
		var J1, K1 = {
			HTML: "block",
			BODY: "block"
		};

		function L1(n, a) {
			var e = Q(a.createElement(n)).appendTo(a.body),
				b = Q.css(e[0], "display");
			e.detach();
			return b;
		}

		function M1(n) {
			var a = f,
				b = K1[n];
			if (!b) {
				b = L1(n, a);
				if (b === "none" || !b) {
					J1 = (J1 || Q("<iframe frameborder='0' width='0' height='0'/>")).appendTo(a.documentElement);
					a = J1[0].contentDocument;
					a.write();
					a.close();
					b = L1(n, a);
					J1.detach();
				}
				K1[n] = b;
			}
			return b;
		}
		var N1 = (/^margin/);
		var O1 = new RegExp("^(" + d1 + ")(?!px)[a-z%]+$", "i");
		var P1 = function (e) {
			var v = e.ownerDocument.defaultView;
			if (!v || !v.opener) {
				v = w;
			}
			return v.getComputedStyle(e);
		};
		var Q1 = function (e, a, b, i) {
			var j, n, l = {};
			for (n in a) {
				l[n] = e.style[n];
				e.style[n] = a[n];
			}
			j = b.apply(e, i || []);
			for (n in a) {
				e.style[n] = l[n];
			}
			return j;
		};
		var R1 = f.documentElement;
		(function () {
			var p, b, a, e, i = f.createElement("div"),
				j = f.createElement("div");
			if (!j.style) {
				return;
			}
			j.style.backgroundClip = "content-box";
			j.cloneNode(true).style.backgroundClip = "";
			x.clearCloneStyle = j.style.backgroundClip === "content-box";
			i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
			i.appendChild(j);

			function l() {
				j.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
				j.innerHTML = "";
				R1.appendChild(i);
				var m = w.getComputedStyle(j);
				p = m.top !== "1%";
				e = m.marginLeft === "2px";
				b = m.width === "4px";
				j.style.marginRight = "50%";
				a = m.marginRight === "4px";
				R1.removeChild(i);
			}
			Q.extend(x, {
				pixelPosition: function () {
					l();
					return p;
				},
				boxSizingReliable: function () {
					if (b == null) {
						l();
					}
					return b;
				},
				pixelMarginRight: function () {
					if (b == null) {
						l();
					}
					return a;
				},
				reliableMarginLeft: function () {
					if (b == null) {
						l();
					}
					return e;
				},
				reliableMarginRight: function () {
					var m, n = j.appendChild(f.createElement("div"));
					n.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
					n.style.marginRight = n.style.width = "0";
					j.style.width = "1px";
					R1.appendChild(i);
					m = !parseFloat(w.getComputedStyle(n).marginRight);
					R1.removeChild(i);
					j.removeChild(n);
					return m;
				}
			});
		})();

		function S1(e, n, a) {
			var b, m, i, j, s = e.style;
			a = a || P1(e);
			j = a ? a.getPropertyValue(n) || a[n] : undefined;
			if ((j === "" || j === undefined) && !Q.contains(e.ownerDocument, e)) {
				j = Q.style(e, n);
			}
			if (a) {
				if (!x.pixelMarginRight() && O1.test(j) && N1.test(n)) {
					b = s.width;
					m = s.minWidth;
					i = s.maxWidth;
					s.minWidth = s.maxWidth = s.width = j;
					j = a.width;
					s.width = b;
					s.minWidth = m;
					s.maxWidth = i;
				}
			}
			return j !== undefined ? j + "" : j;
		}

		function T1(a, b) {
			return {
				get: function () {
					if (a()) {
						delete this.get;
						return;
					}
					return (this.get = b).apply(this, arguments);
				}
			};
		}
		var U1 = /^(none|table(?!-c[ea]).+)/,
			V1 = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			W1 = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			X1 = ["Webkit", "O", "Moz", "ms"],
			Y1 = f.createElement("div").style;

		function Z1(n) {
			if (n in Y1) {
				return n;
			}
			var a = n[0].toUpperCase() + n.slice(1),
				i = X1.length;
			while (i--) {
				n = X1[i] + a;
				if (n in Y1) {
					return n;
				}
			}
		}

		function $1(e, v, s) {
			var m = e1.exec(v);
			return m ? Math.max(0, m[2] - (s || 0)) + (m[3] || "px") : v;
		}

		function _1(e, n, a, b, s) {
			var i = a === (b ? "border" : "content") ? 4 : n === "width" ? 1 : 0,
				v = 0;
			for (; i < 4; i += 2) {
				if (a === "margin") {
					v += Q.css(e, a + f1[i], true, s);
				}
				if (b) {
					if (a === "content") {
						v -= Q.css(e, "padding" + f1[i], true, s);
					}
					if (a !== "margin") {
						v -= Q.css(e, "border" + f1[i] + "Width", true, s);
					}
				} else {
					v += Q.css(e, "padding" + f1[i], true, s);
					if (a !== "padding") {
						v += Q.css(e, "border" + f1[i] + "Width", true, s);
					}
				}
			}
			return v;
		}

		function a2(e, n, a) {
			var v = true,
				b = n === "width" ? e.offsetWidth : e.offsetHeight,
				s = P1(e),
				i = Q.css(e, "boxSizing", false, s) === "border-box";
			if (f.msFullscreenElement && w.top !== w) {
				if (e.getClientRects().length) {
					b = Math.round(e.getBoundingClientRect()[n] * 100);
				}
			}
			if (b <= 0 || b == null) {
				b = S1(e, n, s);
				if (b < 0 || b == null) {
					b = e.style[n];
				}
				if (O1.test(b)) {
					return b;
				}
				v = i && (x.boxSizingReliable() || b === e.style[n]);
				b = parseFloat(b) || 0;
			}
			return (b + _1(e, n, a || (i ? "border" : "content"), v, s)) + "px";
		}

		function b2(e, s) {
			var a, b, i, v = [],
				j = 0,
				l = e.length;
			for (; j < l; j++) {
				b = e[j];
				if (!b.style) {
					continue;
				}
				v[j] = Z.get(b, "olddisplay");
				a = b.style.display;
				if (s) {
					if (!v[j] && a === "none") {
						b.style.display = "";
					}
					if (b.style.display === "" && g1(b)) {
						v[j] = Z.access(b, "olddisplay", M1(b.nodeName));
					}
				} else {
					i = g1(b);
					if (a !== "none" || !i) {
						Z.set(b, "olddisplay", i ? a : Q.css(b, "display"));
					}
				}
			}
			for (j = 0; j < l; j++) {
				b = e[j];
				if (!b.style) {
					continue;
				}
				if (!s || b.style.display === "none" || b.style.display === "") {
					b.style.display = s ? v[j] || "" : "none";
				}
			}
			return e;
		}
		Q.extend({
			cssHooks: {
				opacity: {
					get: function (e, a) {
						if (a) {
							var b = S1(e, "opacity");
							return b === "" ? "1" : b;
						}
					}
				}
			},
			cssNumber: {
				"animationIterationCount": true,
				"columnCount": true,
				"fillOpacity": true,
				"flexGrow": true,
				"flexShrink": true,
				"fontWeight": true,
				"lineHeight": true,
				"opacity": true,
				"order": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			},
			cssProps: {
				"float": "cssFloat"
			},
			style: function (e, n, v, a) {
				if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
					return;
				}
				var b, t, i, j = Q.camelCase(n),
					s = e.style;
				n = Q.cssProps[j] || (Q.cssProps[j] = Z1(j) || j);
				i = Q.cssHooks[n] || Q.cssHooks[j];
				if (v !== undefined) {
					t = typeof v;
					if (t === "string" && (b = e1.exec(v)) && b[1]) {
						v = h1(e, n, b);
						t = "number";
					}
					if (v == null || v !== v) {
						return;
					}
					if (t === "number") {
						v += b && b[3] || (Q.cssNumber[j] ? "" : "px");
					}
					if (!x.clearCloneStyle && v === "" && n.indexOf("background") === 0) {
						s[n] = "inherit";
					}
					if (!i || !("set" in i) || (v = i.set(e, v, a)) !== undefined) {
						s[n] = v;
					}
				} else {
					if (i && "get" in i && (b = i.get(e, false, a)) !== undefined) {
						return b;
					}
					return s[n];
				}
			},
			css: function (e, n, a, s) {
				var v, b, i, j = Q.camelCase(n);
				n = Q.cssProps[j] || (Q.cssProps[j] = Z1(j) || j);
				i = Q.cssHooks[n] || Q.cssHooks[j];
				if (i && "get" in i) {
					v = i.get(e, true, a);
				}
				if (v === undefined) {
					v = S1(e, n, s);
				}
				if (v === "normal" && n in W1) {
					v = W1[n];
				}
				if (a === "" || a) {
					b = parseFloat(v);
					return a === true || isFinite(b) ? b || 0 : v;
				}
				return v;
			}
		});
		Q.each(["height", "width"], function (i, n) {
			Q.cssHooks[n] = {
				get: function (e, a, b) {
					if (a) {
						return U1.test(Q.css(e, "display")) && e.offsetWidth === 0 ? Q1(e, V1, function () {
							return a2(e, n, b);
						}) : a2(e, n, b);
					}
				},
				set: function (e, v, a) {
					var m, s = a && P1(e),
						b = a && _1(e, n, a, Q.css(e, "boxSizing", false, s) === "border-box", s);
					if (b && (m = e1.exec(v)) && (m[3] || "px") !== "px") {
						e.style[n] = v;
						v = Q.css(e, n);
					}
					return $1(e, v, b);
				}
			};
		});
		Q.cssHooks.marginLeft = T1(x.reliableMarginLeft, function (e, a) {
			if (a) {
				return (parseFloat(S1(e, "marginLeft")) || e.getBoundingClientRect().left - Q1(e, {
					marginLeft: 0
				}, function () {
					return e.getBoundingClientRect().left;
				})) + "px";
			}
		});
		Q.cssHooks.marginRight = T1(x.reliableMarginRight, function (e, a) {
			if (a) {
				return Q1(e, {
					"display": "inline-block"
				}, S1, [e, "marginRight"]);
			}
		});
		Q.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function (p, s) {
			Q.cssHooks[p + s] = {
				expand: function (v) {
					var i = 0,
						e = {},
						a = typeof v === "string" ? v.split(" ") : [v];
					for (; i < 4; i++) {
						e[p + f1[i] + s] = a[i] || a[i - 2] || a[0];
					}
					return e;
				}
			};
			if (!N1.test(p)) {
				Q.cssHooks[p + s].set = $1;
			}
		});
		Q.fn.extend({
			css: function (n, v) {
				return W(this, function (e, n, v) {
					var s, l, m = {},
						i = 0;
					if (Q.isArray(n)) {
						s = P1(e);
						l = n.length;
						for (; i < l; i++) {
							m[n[i]] = Q.css(e, n[i], false, s);
						}
						return m;
					}
					return v !== undefined ? Q.style(e, n, v) : Q.css(e, n);
				}, n, v, arguments.length > 1);
			},
			show: function () {
				return b2(this, true);
			},
			hide: function () {
				return b2(this);
			},
			toggle: function (s) {
				if (typeof s === "boolean") {
					return s ? this.show() : this.hide();
				}
				return this.each(function () {
					if (g1(this)) {
						Q(this).show();
					} else {
						Q(this).hide();
					}
				});
			}
		});

		function c2(e, a, p, b, i) {
			return new c2.prototype.init(e, a, p, b, i);
		}
		Q.Tween = c2;
		c2.prototype = {
			constructor: c2,
			init: function (e, a, p, b, i, j) {
				this.elem = e;
				this.prop = p;
				this.easing = i || Q.easing._default;
				this.options = a;
				this.start = this.now = this.cur();
				this.end = b;
				this.unit = j || (Q.cssNumber[p] ? "" : "px");
			},
			cur: function () {
				var a = c2.propHooks[this.prop];
				return a && a.get ? a.get(this) : c2.propHooks._default.get(this);
			},
			run: function (p) {
				var e, a = c2.propHooks[this.prop];
				if (this.options.duration) {
					this.pos = e = Q.easing[this.easing](p, this.options.duration * p, 0, 1, this.options.duration);
				} else {
					this.pos = e = p;
				}
				this.now = (this.end - this.start) * e + this.start;
				if (this.options.step) {
					this.options.step.call(this.elem, this.now, this);
				}
				if (a && a.set) {
					a.set(this);
				} else {
					c2.propHooks._default.set(this);
				}
				return this;
			}
		};
		c2.prototype.init.prototype = c2.prototype;
		c2.propHooks = {
			_default: {
				get: function (t) {
					var a;
					if (t.elem.nodeType !== 1 || t.elem[t.prop] != null && t.elem.style[t.prop] == null) {
						return t.elem[t.prop];
					}
					a = Q.css(t.elem, t.prop, "");
					return !a || a === "auto" ? 0 : a;
				},
				set: function (t) {
					if (Q.fx.step[t.prop]) {
						Q.fx.step[t.prop](t);
					} else if (t.elem.nodeType === 1 && (t.elem.style[Q.cssProps[t.prop]] != null || Q.cssHooks[t.prop])) {
						Q.style(t.elem, t.prop, t.now + t.unit);
					} else {
						t.elem[t.prop] = t.now;
					}
				}
			}
		};
		c2.propHooks.scrollTop = c2.propHooks.scrollLeft = {
			set: function (t) {
				if (t.elem.nodeType && t.elem.parentNode) {
					t.elem[t.prop] = t.now;
				}
			}
		};
		Q.easing = {
			linear: function (p) {
				return p;
			},
			swing: function (p) {
				return 0.5 - Math.cos(p * Math.PI) / 2;
			},
			_default: "swing"
		};
		Q.fx = c2.prototype.init;
		Q.fx.step = {};
		var d2, e2, f2 = /^(?:toggle|show|hide)$/,
			g2 = /queueHooks$/;

		function h2() {
			w.setTimeout(function () {
				d2 = undefined;
			});
			return (d2 = Q.now());
		}

		function i2(t, a) {
			var b, i = 0,
				e = {
					height: t
				};
			a = a ? 1 : 0;
			for (; i < 4; i += 2 - a) {
				b = f1[i];
				e["margin" + b] = e["padding" + b] = t;
			}
			if (a) {
				e.opacity = e.width = t;
			}
			return e;
		}

		function j2(v, p, a) {
			var t, b = (m2.tweeners[p] || []).concat(m2.tweeners["*"]),
				i = 0,
				l = b.length;
			for (; i < l; i++) {
				if ((t = b[i].call(a, p, v))) {
					return t;
				}
			}
		}

		function k2(e, p, a) {
			var b, v, t, i, j, l, m, n, s = this,
				_ = {},
				w1 = e.style,
				_2 = e.nodeType && g1(e),
				a3 = Z.get(e, "fxshow");
			if (!a.queue) {
				j = Q._queueHooks(e, "fx");
				if (j.unqueued == null) {
					j.unqueued = 0;
					l = j.empty.fire;
					j.empty.fire = function () {
						if (!j.unqueued) {
							l();
						}
					};
				}
				j.unqueued++;
				s.always(function () {
					s.always(function () {
						j.unqueued--;
						if (!Q.queue(e, "fx").length) {
							j.empty.fire();
						}
					});
				});
			}
			if (e.nodeType === 1 && ("height" in p || "width" in p)) {
				a.overflow = [w1.overflow, w1.overflowX, w1.overflowY];
				m = Q.css(e, "display");
				n = m === "none" ? Z.get(e, "olddisplay") || M1(e.nodeName) : m;
				if (n === "inline" && Q.css(e, "float") === "none") {
					w1.display = "inline-block";
				}
			}
			if (a.overflow) {
				w1.overflow = "hidden";
				s.always(function () {
					w1.overflow = a.overflow[0];
					w1.overflowX = a.overflow[1];
					w1.overflowY = a.overflow[2];
				});
			}
			for (b in p) {
				v = p[b];
				if (f2.exec(v)) {
					delete p[b];
					t = t || v === "toggle";
					if (v === (_2 ? "hide" : "show")) {
						if (v === "show" && a3 && a3[b] !== undefined) {
							_2 = true;
						} else {
							continue;
						}
					}
					_[b] = a3 && a3[b] || Q.style(e, b);
				} else {
					m = undefined;
				}
			}
			if (!Q.isEmptyObject(_)) {
				if (a3) {
					if ("hidden" in a3) {
						_2 = a3.hidden;
					}
				} else {
					a3 = Z.access(e, "fxshow", {});
				}
				if (t) {
					a3.hidden = !_2;
				}
				if (_2) {
					Q(e).show();
				} else {
					s.done(function () {
						Q(e).hide();
					});
				}
				s.done(function () {
					var b;
					Z.remove(e, "fxshow");
					for (b in _) {
						Q.style(e, b, _[b]);
					}
				});
				for (b in _) {
					i = j2(_2 ? a3[b] : 0, b, s);
					if (!(b in a3)) {
						a3[b] = i.start;
						if (_2) {
							i.end = i.start;
							i.start = b === "width" || b === "height" ? 1 : 0;
						}
					}
				}
			} else if ((m === "none" ? M1(e.nodeName) : m) === "inline") {
				w1.display = m;
			}
		}

		function l2(p, s) {
			var i, n, e, v, a;
			for (i in p) {
				n = Q.camelCase(i);
				e = s[n];
				v = p[i];
				if (Q.isArray(v)) {
					e = v[1];
					v = p[i] = v[0];
				}
				if (i !== n) {
					p[n] = v;
					delete p[i];
				}
				a = Q.cssHooks[n];
				if (a && "expand" in a) {
					v = a.expand(v);
					delete p[n];
					for (i in v) {
						if (!(i in p)) {
							p[i] = v[i];
							s[i] = e;
						}
					}
				} else {
					s[n] = e;
				}
			}
		}

		function m2(e, p, a) {
			var b, s, i = 0,
				l = m2.prefilters.length,
				j = Q.Deferred().always(function () {
					delete t.elem;
				}),
				t = function () {
					if (s) {
						return false;
					}
					var v = d2 || h2(),
						_ = Math.max(0, m.startTime + m.duration - v),
						w1 = _ / m.duration || 0,
						_2 = 1 - w1,
						i = 0,
						l = m.tweens.length;
					for (; i < l; i++) {
						m.tweens[i].run(_2);
					}
					j.notifyWith(e, [m, _2, _]);
					if (_2 < 1 && l) {
						return _;
					} else {
						j.resolveWith(e, [m]);
						return false;
					}
				},
				m = j.promise({
					elem: e,
					props: Q.extend({}, p),
					opts: Q.extend(true, {
						specialEasing: {},
						easing: Q.easing._default
					}, a),
					originalProperties: p,
					originalOptions: a,
					startTime: d2 || h2(),
					duration: a.duration,
					tweens: [],
					createTween: function (v, _) {
						var w1 = Q.Tween(e, m.opts, v, _, m.opts.specialEasing[v] || m.opts.easing);
						m.tweens.push(w1);
						return w1;
					},
					stop: function (v) {
						var i = 0,
							l = v ? m.tweens.length : 0;
						if (s) {
							return this;
						}
						s = true;
						for (; i < l; i++) {
							m.tweens[i].run(1);
						}
						if (v) {
							j.notifyWith(e, [m, 1, 0]);
							j.resolveWith(e, [m, v]);
						} else {
							j.rejectWith(e, [m, v]);
						}
						return this;
					}
				}),
				n = m.props;
			l2(n, m.opts.specialEasing);
			for (; i < l; i++) {
				b = m2.prefilters[i].call(m, e, n, m.opts);
				if (b) {
					if (Q.isFunction(b.stop)) {
						Q._queueHooks(m.elem, m.opts.queue).stop = Q.proxy(b.stop, b);
					}
					return b;
				}
			}
			Q.map(n, j2, m);
			if (Q.isFunction(m.opts.start)) {
				m.opts.start.call(e, m);
			}
			Q.fx.timer(Q.extend(t, {
				elem: e,
				anim: m,
				queue: m.opts.queue
			}));
			return m.progress(m.opts.progress).done(m.opts.done, m.opts.complete).fail(m.opts.fail).always(m.opts.always);
		}
		Q.Animation = Q.extend(m2, {
			tweeners: {
				"*": [function (p, v) {
					var t = this.createTween(p, v);
					h1(t.elem, p, e1.exec(v), t);
					return t;
				}]
			},
			tweener: function (p, a) {
				if (Q.isFunction(p)) {
					a = p;
					p = ["*"];
				} else {
					p = p.match(R);
				}
				var b, i = 0,
					l = p.length;
				for (; i < l; i++) {
					b = p[i];
					m2.tweeners[b] = m2.tweeners[b] || [];
					m2.tweeners[b].unshift(a);
				}
			},
			prefilters: [k2],
			prefilter: function (a, p) {
				if (p) {
					m2.prefilters.unshift(a);
				} else {
					m2.prefilters.push(a);
				}
			}
		});
		Q.speed = function (s, e, a) {
			var b = s && typeof s === "object" ? Q.extend({}, s) : {
				complete: a || !a && e || Q.isFunction(s) && s,
				duration: s,
				easing: a && e || e && !Q.isFunction(e) && e
			};
			b.duration = Q.fx.off ? 0 : typeof b.duration === "number" ? b.duration : b.duration in Q.fx.speeds ? Q.fx.speeds[b.duration] : Q.fx.speeds._default;
			if (b.queue == null || b.queue === true) {
				b.queue = "fx";
			}
			b.old = b.complete;
			b.complete = function () {
				if (Q.isFunction(b.old)) {
					b.old.call(this);
				}
				if (b.queue) {
					Q.dequeue(this, b.queue);
				}
			};
			return b;
		};
		Q.fn.extend({
			fadeTo: function (s, t, e, a) {
				return this.filter(g1).css("opacity", 0).show().end().animate({
					opacity: t
				}, s, e, a);
			},
			animate: function (p, s, e, a) {
				var b = Q.isEmptyObject(p),
					i = Q.speed(s, e, a),
					j = function () {
						var l = m2(this, Q.extend({}, p), i);
						if (b || Z.get(this, "finish")) {
							l.stop(true);
						}
					};
				j.finish = j;
				return b || i.queue === false ? this.each(j) : this.queue(i.queue, j);
			},
			stop: function (t, a, b) {
				var s = function (e) {
					var i = e.stop;
					delete e.stop;
					i(b);
				};
				if (typeof t !== "string") {
					b = a;
					a = t;
					t = undefined;
				}
				if (a && t !== false) {
					this.queue(t || "fx", []);
				}
				return this.each(function () {
					var e = true,
						i = t != null && t + "queueHooks",
						j = Q.timers,
						l = Z.get(this);
					if (i) {
						if (l[i] && l[i].stop) {
							s(l[i]);
						}
					} else {
						for (i in l) {
							if (l[i] && l[i].stop && g2.test(i)) {
								s(l[i]);
							}
						}
					}
					for (i = j.length; i--;) {
						if (j[i].elem === this && (t == null || j[i].queue === t)) {
							j[i].anim.stop(b);
							e = false;
							j.splice(i, 1);
						}
					}
					if (e || !b) {
						Q.dequeue(this, t);
					}
				});
			},
			finish: function (t) {
				if (t !== false) {
					t = t || "fx";
				}
				return this.each(function () {
					var i, a = Z.get(this),
						b = a[t + "queue"],
						e = a[t + "queueHooks"],
						j = Q.timers,
						l = b ? b.length : 0;
					a.finish = true;
					Q.queue(this, t, []);
					if (e && e.stop) {
						e.stop.call(this, true);
					}
					for (i = j.length; i--;) {
						if (j[i].elem === this && j[i].queue === t) {
							j[i].anim.stop(true);
							j.splice(i, 1);
						}
					}
					for (i = 0; i < l; i++) {
						if (b[i] && b[i].finish) {
							b[i].finish.call(this);
						}
					}
					delete a.finish;
				});
			}
		});
		Q.each(["toggle", "show", "hide"], function (i, n) {
			var a = Q.fn[n];
			Q.fn[n] = function (s, e, b) {
				return s == null || typeof s === "boolean" ? a.apply(this, arguments) : this.animate(i2(n, true), s, e, b);
			};
		});
		Q.each({
			slideDown: i2("show"),
			slideUp: i2("hide"),
			slideToggle: i2("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function (n, p) {
			Q.fn[n] = function (s, e, a) {
				return this.animate(p, s, e, a);
			};
		});
		Q.timers = [];
		Q.fx.tick = function () {
			var t, i = 0,
				a = Q.timers;
			d2 = Q.now();
			for (; i < a.length; i++) {
				t = a[i];
				if (!t() && a[i] === t) {
					a.splice(i--, 1);
				}
			}
			if (!a.length) {
				Q.fx.stop();
			}
			d2 = undefined;
		};
		Q.fx.timer = function (t) {
			Q.timers.push(t);
			if (t()) {
				Q.fx.start();
			} else {
				Q.timers.pop();
			}
		};
		Q.fx.interval = 13;
		Q.fx.start = function () {
			if (!e2) {
				e2 = w.setInterval(Q.fx.tick, Q.fx.interval);
			}
		};
		Q.fx.stop = function () {
			w.clearInterval(e2);
			e2 = null;
		};
		Q.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		};
		Q.fn.delay = function (t, a) {
			t = Q.fx ? Q.fx.speeds[t] || t : t;
			a = a || "fx";
			return this.queue(a, function (n, b) {
				var e = w.setTimeout(n, t);
				b.stop = function () {
					w.clearTimeout(e);
				};
			});
		};
		(function () {
			var i = f.createElement("input"),
				s = f.createElement("select"),
				a = s.appendChild(f.createElement("option"));
			i.type = "checkbox";
			x.checkOn = i.value !== "";
			x.optSelected = a.selected;
			s.disabled = true;
			x.optDisabled = !a.disabled;
			i = f.createElement("input");
			i.value = "t";
			i.type = "radio";
			x.radioValue = i.value === "t";
		})();
		var n2, o2 = Q.expr.attrHandle;
		Q.fn.extend({
			attr: function (n, v) {
				return W(this, Q.attr, n, v, arguments.length > 1);
			},
			removeAttr: function (n) {
				return this.each(function () {
					Q.removeAttr(this, n);
				});
			}
		});
		Q.extend({
			attr: function (e, n, v) {
				var a, b, i = e.nodeType;
				if (i === 3 || i === 8 || i === 2) {
					return;
				}
				if (typeof e.getAttribute === "undefined") {
					return Q.prop(e, n, v);
				}
				if (i !== 1 || !Q.isXMLDoc(e)) {
					n = n.toLowerCase();
					b = Q.attrHooks[n] || (Q.expr.match.bool.test(n) ? n2 : undefined);
				}
				if (v !== undefined) {
					if (v === null) {
						Q.removeAttr(e, n);
						return;
					}
					if (b && "set" in b && (a = b.set(e, v, n)) !== undefined) {
						return a;
					}
					e.setAttribute(n, v + "");
					return v;
				}
				if (b && "get" in b && (a = b.get(e, n)) !== null) {
					return a;
				}
				a = Q.find.attr(e, n);
				return a == null ? undefined : a;
			},
			attrHooks: {
				type: {
					set: function (e, v) {
						if (!x.radioValue && v === "radio" && Q.nodeName(e, "input")) {
							var a = e.value;
							e.setAttribute("type", v);
							if (a) {
								e.value = a;
							}
							return v;
						}
					}
				}
			},
			removeAttr: function (e, v) {
				var n, p, i = 0,
					a = v && v.match(R);
				if (a && e.nodeType === 1) {
					while ((n = a[i++])) {
						p = Q.propFix[n] || n;
						if (Q.expr.match.bool.test(n)) {
							e[p] = false;
						}
						e.removeAttribute(n);
					}
				}
			}
		});
		n2 = {
			set: function (e, v, n) {
				if (v === false) {
					Q.removeAttr(e, n);
				} else {
					e.setAttribute(n, n);
				}
				return n;
			}
		};
		Q.each(Q.expr.match.bool.source.match(/\w+/g), function (i, n) {
			var a = o2[n] || Q.find.attr;
			o2[n] = function (e, n, b) {
				var j, l;
				if (!b) {
					l = o2[n];
					o2[n] = j;
					j = a(e, n, b) != null ? n.toLowerCase() : null;
					o2[n] = l;
				}
				return j;
			};
		});
		var p2 = /^(?:input|select|textarea|button)$/i,
			q2 = /^(?:a|area)$/i;
		Q.fn.extend({
			prop: function (n, v) {
				return W(this, Q.prop, n, v, arguments.length > 1);
			},
			removeProp: function (n) {
				return this.each(function () {
					delete this[Q.propFix[n] || n];
				});
			}
		});
		Q.extend({
			prop: function (e, n, v) {
				var a, b, i = e.nodeType;
				if (i === 3 || i === 8 || i === 2) {
					return;
				}
				if (i !== 1 || !Q.isXMLDoc(e)) {
					n = Q.propFix[n] || n;
					b = Q.propHooks[n];
				}
				if (v !== undefined) {
					if (b && "set" in b && (a = b.set(e, v, n)) !== undefined) {
						return a;
					}
					return (e[n] = v);
				}
				if (b && "get" in b && (a = b.get(e, n)) !== null) {
					return a;
				}
				return e[n];
			},
			propHooks: {
				tabIndex: {
					get: function (e) {
						var t = Q.find.attr(e, "tabindex");
						return t ? parseInt(t, 10) : p2.test(e.nodeName) || q2.test(e.nodeName) && e.href ? 0 : -1;
					}
				}
			},
			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		});
		if (!x.optSelected) {
			Q.propHooks.selected = {
				get: function (e) {
					var p = e.parentNode;
					if (p && p.parentNode) {
						p.parentNode.selectedIndex;
					}
					return null;
				},
				set: function (e) {
					var p = e.parentNode;
					if (p) {
						p.selectedIndex;
						if (p.parentNode) {
							p.parentNode.selectedIndex;
						}
					}
				}
			};
		}
		Q.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
			Q.propFix[this.toLowerCase()] = this;
		});
		var r2 = /[\t\r\n\f]/g;

		function s2(e) {
			return e.getAttribute && e.getAttribute("class") || "";
		}
		Q.fn.extend({
			addClass: function (v) {
				var a, e, b, l, m, j, n, i = 0;
				if (Q.isFunction(v)) {
					return this.each(function (j) {
						Q(this).addClass(v.call(this, j, s2(this)));
					});
				}
				if (typeof v === "string" && v) {
					a = v.match(R) || [];
					while ((e = this[i++])) {
						l = s2(e);
						b = e.nodeType === 1 && (" " + l + " ").replace(r2, " ");
						if (b) {
							j = 0;
							while ((m = a[j++])) {
								if (b.indexOf(" " + m + " ") < 0) {
									b += m + " ";
								}
							}
							n = Q.trim(b);
							if (l !== n) {
								e.setAttribute("class", n);
							}
						}
					}
				}
				return this;
			},
			removeClass: function (v) {
				var a, e, b, l, m, j, n, i = 0;
				if (Q.isFunction(v)) {
					return this.each(function (j) {
						Q(this).removeClass(v.call(this, j, s2(this)));
					});
				}
				if (!arguments.length) {
					return this.attr("class", "");
				}
				if (typeof v === "string" && v) {
					a = v.match(R) || [];
					while ((e = this[i++])) {
						l = s2(e);
						b = e.nodeType === 1 && (" " + l + " ").replace(r2, " ");
						if (b) {
							j = 0;
							while ((m = a[j++])) {
								while (b.indexOf(" " + m + " ") > -1) {
									b = b.replace(" " + m + " ", " ");
								}
							}
							n = Q.trim(b);
							if (l !== n) {
								e.setAttribute("class", n);
							}
						}
					}
				}
				return this;
			},
			toggleClass: function (v, s) {
				var t = typeof v;
				if (typeof s === "boolean" && t === "string") {
					return s ? this.addClass(v) : this.removeClass(v);
				}
				if (Q.isFunction(v)) {
					return this.each(function (i) {
						Q(this).toggleClass(v.call(this, i, s2(this), s), s);
					});
				}
				return this.each(function () {
					var a, i, b, e;
					if (t === "string") {
						i = 0;
						b = Q(this);
						e = v.match(R) || [];
						while ((a = e[i++])) {
							if (b.hasClass(a)) {
								b.removeClass(a);
							} else {
								b.addClass(a);
							}
						}
					} else if (v === undefined || t === "boolean") {
						a = s2(this);
						if (a) {
							Z.set(this, "__className__", a);
						}
						if (this.setAttribute) {
							this.setAttribute("class", a || v === false ? "" : Z.get(this, "__className__") || "");
						}
					}
				});
			},
			hasClass: function (s) {
				var a, e, i = 0;
				a = " " + s + " ";
				while ((e = this[i++])) {
					if (e.nodeType === 1 && (" " + s2(e) + " ").replace(r2, " ").indexOf(a) > -1) {
						return true;
					}
				}
				return false;
			}
		});
		var t2 = /\r/g,
			u2 = /[\x20\t\r\n\f]+/g;
		Q.fn.extend({
			val: function (v) {
				var a, b, e, j = this[0];
				if (!arguments.length) {
					if (j) {
						a = Q.valHooks[j.type] || Q.valHooks[j.nodeName.toLowerCase()];
						if (a && "get" in a && (b = a.get(j, "value")) !== undefined) {
							return b;
						}
						b = j.value;
						return typeof b === "string" ? b.replace(t2, "") : b == null ? "" : b;
					}
					return;
				}
				e = Q.isFunction(v);
				return this.each(function (i) {
					var l;
					if (this.nodeType !== 1) {
						return;
					}
					if (e) {
						l = v.call(this, i, Q(this).val());
					} else {
						l = v;
					}
					if (l == null) {
						l = "";
					} else if (typeof l === "number") {
						l += "";
					} else if (Q.isArray(l)) {
						l = Q.map(l, function (v) {
							return v == null ? "" : v + "";
						});
					}
					a = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()];
					if (!a || !("set" in a) || a.set(this, l, "value") === undefined) {
						this.value = l;
					}
				});
			}
		});
		Q.extend({
			valHooks: {
				option: {
					get: function (e) {
						var v = Q.find.attr(e, "value");
						return v != null ? v : Q.trim(Q.text(e)).replace(u2, " ");
					}
				},
				select: {
					get: function (e) {
						var v, a, b = e.options,
							j = e.selectedIndex,
							l = e.type === "select-one" || j < 0,
							m = l ? null : [],
							n = l ? j + 1 : b.length,
							i = j < 0 ? n : l ? j : 0;
						for (; i < n; i++) {
							a = b[i];
							if ((a.selected || i === j) && (x.optDisabled ? !a.disabled : a.getAttribute("disabled") === null) && (!a.parentNode.disabled || !Q.nodeName(a.parentNode, "optgroup"))) {
								v = Q(a).val();
								if (l) {
									return v;
								}
								m.push(v);
							}
						}
						return m;
					},
					set: function (e, v) {
						var a, b, j = e.options,
							l = Q.makeArray(v),
							i = j.length;
						while (i--) {
							b = j[i];
							if (b.selected = Q.inArray(Q.valHooks.option.get(b), l) > -1) {
								a = true;
							}
						}
						if (!a) {
							e.selectedIndex = -1;
						}
						return l;
					}
				}
			}
		});
		Q.each(["radio", "checkbox"], function () {
			Q.valHooks[this] = {
				set: function (e, v) {
					if (Q.isArray(v)) {
						return (e.checked = Q.inArray(Q(e).val(), v) > -1);
					}
				}
			};
			if (!x.checkOn) {
				Q.valHooks[this].get = function (e) {
					return e.getAttribute("value") === null ? "on" : e.value;
				};
			}
		});
		var v2 = /^(?:focusinfocus|focusoutblur)$/;
		Q.extend(Q.event, {
			trigger: function (e, a, b, j) {
				var i, l, t, m, n, p, s, v = [b || f],
					_ = u.call(e, "type") ? e.type : e,
					w1 = u.call(e, "namespace") ? e.namespace.split(".") : [];
				l = t = b = b || f;
				if (b.nodeType === 3 || b.nodeType === 8) {
					return;
				}
				if (v2.test(_ + Q.event.triggered)) {
					return;
				}
				if (_.indexOf(".") > -1) {
					w1 = _.split(".");
					_ = w1.shift();
					w1.sort();
				}
				n = _.indexOf(":") < 0 && "on" + _;
				e = e[Q.expando] ? e : new Q.Event(_, typeof e === "object" && e);
				e.isTrigger = j ? 2 : 3;
				e.namespace = w1.join(".");
				e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + w1.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
				e.result = undefined;
				if (!e.target) {
					e.target = b;
				}
				a = a == null ? [e] : Q.makeArray(a, [e]);
				s = Q.event.special[_] || {};
				if (!j && s.trigger && s.trigger.apply(b, a) === false) {
					return;
				}
				if (!j && !s.noBubble && !Q.isWindow(b)) {
					m = s.delegateType || _;
					if (!v2.test(m + _)) {
						l = l.parentNode;
					}
					for (; l; l = l.parentNode) {
						v.push(l);
						t = l;
					}
					if (t === (b.ownerDocument || f)) {
						v.push(t.defaultView || t.parentWindow || w);
					}
				}
				i = 0;
				while ((l = v[i++]) && !e.isPropagationStopped()) {
					e.type = i > 1 ? m : s.bindType || _;
					p = (Z.get(l, "events") || {})[e.type] && Z.get(l, "handle");
					if (p) {
						p.apply(l, a);
					}
					p = n && l[n];
					if (p && p.apply && X(l)) {
						e.result = p.apply(l, a);
						if (e.result === false) {
							e.preventDefault();
						}
					}
				}
				e.type = _;
				if (!j && !e.isDefaultPrevented()) {
					if ((!s._default || s._default.apply(v.pop(), a) === false) && X(b)) {
						if (n && Q.isFunction(b[_]) && !Q.isWindow(b)) {
							t = b[n];
							if (t) {
								b[n] = null;
							}
							Q.event.triggered = _;
							b[_]();
							Q.event.triggered = undefined;
							if (t) {
								b[n] = t;
							}
						}
					}
				}
				return e.result;
			},
			simulate: function (t, a, b) {
				var e = Q.extend(new Q.Event(), b, {
					type: t,
					isSimulated: true
				});
				Q.event.trigger(e, null, a);
				if (e.isDefaultPrevented()) {
					b.preventDefault();
				}
			}
		});
		Q.fn.extend({
			trigger: function (t, a) {
				return this.each(function () {
					Q.event.trigger(t, a, this);
				});
			},
			triggerHandler: function (t, a) {
				var e = this[0];
				if (e) {
					return Q.event.trigger(t, a, e, true);
				}
			}
		});
		Q.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, n) {
			Q.fn[n] = function (a, b) {
				return arguments.length > 0 ? this.on(n, null, a, b) : this.trigger(n);
			};
		});
		Q.fn.extend({
			hover: function (a, b) {
				return this.mouseenter(a).mouseleave(b || a);
			}
		});
		x.focusin = "onfocusin" in w;
		if (!x.focusin) {
			Q.each({
				focus: "focusin",
				blur: "focusout"
			}, function (a, b) {
				var e = function (i) {
					Q.event.simulate(b, i.target, Q.event.fix(i));
				};
				Q.event.special[b] = {
					setup: function () {
						var i = this.ownerDocument || this,
							j = Z.access(i, b);
						if (!j) {
							i.addEventListener(a, e, true);
						}
						Z.access(i, b, (j || 0) + 1);
					},
					teardown: function () {
						var i = this.ownerDocument || this,
							j = Z.access(i, b) - 1;
						if (!j) {
							i.removeEventListener(a, e, true);
							Z.remove(i, b);
						} else {
							Z.access(i, b, j);
						}
					}
				};
			});
		}
		var w2 = w.location;
		var x2 = Q.now();
		var y2 = (/\?/);
		Q.parseJSON = function (a) {
			return JSON.parse(a + "");
		};
		Q.parseXML = function (a) {
			var b;
			if (!a || typeof a !== "string") {
				return null;
			}
			try {
				b = (new w.DOMParser()).parseFromString(a, "text/xml");
			} catch (e) {
				b = undefined;
			}
			if (!b || b.getElementsByTagName("parsererror").length) {
				Q.error("Invalid XML: " + a);
			}
			return b;
		};
		var z2 = /#.*$/,
			A2 = /([?&])_=[^&]*/,
			B2 = /^(.*?):[ \t]*([^\r\n]*)$/mg,
			C2 = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			D2 = /^(?:GET|HEAD)$/,
			E2 = /^\/\//,
			F2 = {},
			G2 = {},
			H2 = "*/".concat("*"),
			I2 = f.createElement("a");
		I2.href = w2.href;

		function J2(s) {
			return function (a, b) {
				if (typeof a !== "string") {
					b = a;
					a = "*";
				}
				var e, i = 0,
					j = a.toLowerCase().match(R) || [];
				if (Q.isFunction(b)) {
					while ((e = j[i++])) {
						if (e[0] === "+") {
							e = e.slice(1) || "*";
							(s[e] = s[e] || []).unshift(b);
						} else {
							(s[e] = s[e] || []).push(b);
						}
					}
				}
			};
		}

		function K2(s, a, b, j) {
			var i = {},
				e = (s === G2);

			function l(m) {
				var n;
				i[m] = true;
				Q.each(s[m] || [], function (_, p) {
					var t = p(a, b, j);
					if (typeof t === "string" && !e && !i[t]) {
						a.dataTypes.unshift(t);
						l(t);
						return false;
					} else if (e) {
						return !(n = t);
					}
				});
				return n;
			}
			return l(a.dataTypes[0]) || !i["*"] && l("*");
		}

		function L2(t, s) {
			var a, b, e = Q.ajaxSettings.flatOptions || {};
			for (a in s) {
				if (s[a] !== undefined) {
					(e[a] ? t : (b || (b = {})))[a] = s[a];
				}
			}
			if (b) {
				Q.extend(true, t, b);
			}
			return t;
		}

		function M2(s, j, a) {
			var b, t, e, i, l = s.contents,
				m = s.dataTypes;
			while (m[0] === "*") {
				m.shift();
				if (b === undefined) {
					b = s.mimeType || j.getResponseHeader("Content-Type");
				}
			}
			if (b) {
				for (t in l) {
					if (l[t] && l[t].test(b)) {
						m.unshift(t);
						break;
					}
				}
			}
			if (m[0] in a) {
				e = m[0];
			} else {
				for (t in a) {
					if (!m[0] || s.converters[t + " " + m[0]]) {
						e = t;
						break;
					}
					if (!i) {
						i = t;
					}
				}
				e = e || i;
			}
			if (e) {
				if (e !== m[0]) {
					m.unshift(e);
				}
				return a[e];
			}
		}

		function N2(s, a, j, i) {
			var b, l, m, t, p, n = {},
				v = s.dataTypes.slice();
			if (v[1]) {
				for (m in s.converters) {
					n[m.toLowerCase()] = s.converters[m];
				}
			}
			l = v.shift();
			while (l) {
				if (s.responseFields[l]) {
					j[s.responseFields[l]] = a;
				}
				if (!p && i && s.dataFilter) {
					a = s.dataFilter(a, s.dataType);
				}
				p = l;
				l = v.shift();
				if (l) {
					if (l === "*") {
						l = p;
					} else if (p !== "*" && p !== l) {
						m = n[p + " " + l] || n["* " + l];
						if (!m) {
							for (b in n) {
								t = b.split(" ");
								if (t[1] === l) {
									m = n[p + " " + t[0]] || n["* " + t[0]];
									if (m) {
										if (m === true) {
											m = n[b];
										} else if (n[b] !== true) {
											l = t[0];
											v.unshift(t[1]);
										}
										break;
									}
								}
							}
						}
						if (m !== true) {
							if (m && s.throws) {
								a = m(a);
							} else {
								try {
									a = m(a);
								} catch (e) {
									return {
										state: "parsererror",
										error: m ? e : "No conversion from " + p + " to " + l
									};
								}
							}
						}
					}
				}
			}
			return {
				state: "success",
				data: a
			};
		}
		Q.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: w2.href,
				type: "GET",
				isLocal: C2.test(w2.protocol),
				global: true,
				processData: true,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": H2,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": true,
					"text json": Q.parseJSON,
					"text xml": Q.parseXML
				},
				flatOptions: {
					url: true,
					context: true
				}
			},
			ajaxSetup: function (t, s) {
				return s ? L2(L2(t, Q.ajaxSettings), s) : L2(Q.ajaxSettings, t);
			},
			ajaxPrefilter: J2(F2),
			ajaxTransport: J2(G2),
			ajax: function (a, b) {
				if (typeof a === "object") {
					b = a;
					a = undefined;
				}
				b = b || {};
				var t, j, l, m, n, p, v, i, s = Q.ajaxSetup({}, b),
					_ = s.context || s,
					w1 = s.context && (_.nodeType || _.jquery) ? Q(_) : Q.event,
					_2 = Q.Deferred(),
					a3 = Q.Callbacks("once memory"),
					b3 = s.statusCode || {},
					c3 = {},
					d3 = {},
					e3 = 0,
					f3 = "canceled",
					g3 = {
						readyState: 0,
						getResponseHeader: function (i3) {
							var j3;
							if (e3 === 2) {
								if (!m) {
									m = {};
									while ((j3 = B2.exec(l))) {
										m[j3[1].toLowerCase()] = j3[2];
									}
								}
								j3 = m[i3.toLowerCase()];
							}
							return j3 == null ? null : j3;
						},
						getAllResponseHeaders: function () {
							return e3 === 2 ? l : null;
						},
						setRequestHeader: function (i3, j3) {
							var k3 = i3.toLowerCase();
							if (!e3) {
								i3 = d3[k3] = d3[k3] || i3;
								c3[i3] = j3;
							}
							return this;
						},
						overrideMimeType: function (i3) {
							if (!e3) {
								s.mimeType = i3;
							}
							return this;
						},
						statusCode: function (i3) {
							var j3;
							if (i3) {
								if (e3 < 2) {
									for (j3 in i3) {
										b3[j3] = [b3[j3], i3[j3]];
									}
								} else {
									g3.always(i3[g3.status]);
								}
							}
							return this;
						},
						abort: function (i3) {
							var j3 = i3 || f3;
							if (t) {
								t.abort(j3);
							}
							h3(0, j3);
							return this;
						}
					};
				_2.promise(g3).complete = a3.add;
				g3.success = g3.done;
				g3.error = g3.fail;
				s.url = ((a || s.url || w2.href) + "").replace(z2, "").replace(E2, w2.protocol + "//");
				s.type = b.method || b.type || s.method || s.type;
				s.dataTypes = Q.trim(s.dataType || "*").toLowerCase().match(R) || [""];
				if (s.crossDomain == null) {
					p = f.createElement("a");
					try {
						p.href = s.url;
						p.href = p.href;
						s.crossDomain = I2.protocol + "//" + I2.host !== p.protocol + "//" + p.host;
					} catch (e) {
						s.crossDomain = true;
					}
				}
				if (s.data && s.processData && typeof s.data !== "string") {
					s.data = Q.param(s.data, s.traditional);
				}
				K2(F2, s, b, g3);
				if (e3 === 2) {
					return g3;
				}
				v = Q.event && s.global;
				if (v && Q.active++ === 0) {
					Q.event.trigger("ajaxStart");
				}
				s.type = s.type.toUpperCase();
				s.hasContent = !D2.test(s.type);
				j = s.url;
				if (!s.hasContent) {
					if (s.data) {
						j = (s.url += (y2.test(j) ? "&" : "?") + s.data);
						delete s.data;
					}
					if (s.cache === false) {
						s.url = A2.test(j) ? j.replace(A2, "$1_=" + x2++) : j + (y2.test(j) ? "&" : "?") + "_=" + x2++;
					}
				}
				if (s.ifModified) {
					if (Q.lastModified[j]) {
						g3.setRequestHeader("If-Modified-Since", Q.lastModified[j]);
					}
					if (Q.etag[j]) {
						g3.setRequestHeader("If-None-Match", Q.etag[j]);
					}
				}
				if (s.data && s.hasContent && s.contentType !== false || b.contentType) {
					g3.setRequestHeader("Content-Type", s.contentType);
				}
				g3.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + H2 + "; q=0.01" : "") : s.accepts["*"]);
				for (i in s.headers) {
					g3.setRequestHeader(i, s.headers[i]);
				}
				if (s.beforeSend && (s.beforeSend.call(_, g3, s) === false || e3 === 2)) {
					return g3.abort();
				}
				f3 = "abort";
				for (i in {
						success: 1,
						error: 1,
						complete: 1
					}) {
					g3[i](s[i]);
				}
				t = K2(G2, s, b, g3);
				if (!t) {
					h3(-1, "No Transport");
				} else {
					g3.readyState = 1;
					if (v) {
						w1.trigger("ajaxSend", [g3, s]);
					}
					if (e3 === 2) {
						return g3;
					}
					if (s.async && s.timeout > 0) {
						n = w.setTimeout(function () {
							g3.abort("timeout");
						}, s.timeout);
					}
					try {
						e3 = 1;
						t.send(c3, h3);
					} catch (e) {
						if (e3 < 2) {
							h3(-1, e);
						} else {
							throw e;
						}
					}
				}

				function h3(i3, j3, k3, l3) {
					var m3, n3, o3, p3, q3, r3 = j3;
					if (e3 === 2) {
						return;
					}
					e3 = 2;
					if (n) {
						w.clearTimeout(n);
					}
					t = undefined;
					l = l3 || "";
					g3.readyState = i3 > 0 ? 4 : 0;
					m3 = i3 >= 200 && i3 < 300 || i3 === 304;
					if (k3) {
						p3 = M2(s, g3, k3);
					}
					p3 = N2(s, p3, g3, m3);
					if (m3) {
						if (s.ifModified) {
							q3 = g3.getResponseHeader("Last-Modified");
							if (q3) {
								Q.lastModified[j] = q3;
							}
							q3 = g3.getResponseHeader("etag");
							if (q3) {
								Q.etag[j] = q3;
							}
						}
						if (i3 === 204 || s.type === "HEAD") {
							r3 = "nocontent";
						} else if (i3 === 304) {
							r3 = "notmodified";
						} else {
							r3 = p3.state;
							n3 = p3.data;
							o3 = p3.error;
							m3 = !o3;
						}
					} else {
						o3 = r3;
						if (i3 || !r3) {
							r3 = "error";
							if (i3 < 0) {
								i3 = 0;
							}
						}
					}
					g3.status = i3;
					g3.statusText = (j3 || r3) + "";
					if (m3) {
						_2.resolveWith(_, [n3, r3, g3]);
					} else {
						_2.rejectWith(_, [g3, r3, o3]);
					}
					g3.statusCode(b3);
					b3 = undefined;
					if (v) {
						w1.trigger(m3 ? "ajaxSuccess" : "ajaxError", [g3, s, m3 ? n3 : o3]);
					}
					a3.fireWith(_, [g3, r3]);
					if (v) {
						w1.trigger("ajaxComplete", [g3, s]);
						if (!(--Q.active)) {
							Q.event.trigger("ajaxStop");
						}
					}
				}
				return g3;
			},
			getJSON: function (a, b, e) {
				return Q.get(a, b, e, "json");
			},
			getScript: function (a, b) {
				return Q.get(a, undefined, b, "script");
			}
		});
		Q.each(["get", "post"], function (i, m) {
			Q[m] = function (a, b, e, t) {
				if (Q.isFunction(b)) {
					t = t || e;
					e = b;
					b = undefined;
				}
				return Q.ajax(Q.extend({
					url: a,
					type: m,
					dataType: t,
					data: b,
					success: e
				}, Q.isPlainObject(a) && a));
			};
		});
		Q._evalUrl = function (a) {
			return Q.ajax({
				url: a,
				type: "GET",
				dataType: "script",
				async: false,
				global: false,
				"throws": true
			});
		};
		Q.fn.extend({
			wrapAll: function (a) {
				var b;
				if (Q.isFunction(a)) {
					return this.each(function (i) {
						Q(this).wrapAll(a.call(this, i));
					});
				}
				if (this[0]) {
					b = Q(a, this[0].ownerDocument).eq(0).clone(true);
					if (this[0].parentNode) {
						b.insertBefore(this[0]);
					}
					b.map(function () {
						var e = this;
						while (e.firstElementChild) {
							e = e.firstElementChild;
						}
						return e;
					}).append(this);
				}
				return this;
			},
			wrapInner: function (a) {
				if (Q.isFunction(a)) {
					return this.each(function (i) {
						Q(this).wrapInner(a.call(this, i));
					});
				}
				return this.each(function () {
					var s = Q(this),
						b = s.contents();
					if (b.length) {
						b.wrapAll(a);
					} else {
						s.append(a);
					}
				});
			},
			wrap: function (a) {
				var b = Q.isFunction(a);
				return this.each(function (i) {
					Q(this).wrapAll(b ? a.call(this, i) : a);
				});
			},
			unwrap: function () {
				return this.parent().each(function () {
					if (!Q.nodeName(this, "body")) {
						Q(this).replaceWith(this.childNodes);
					}
				}).end();
			}
		});
		Q.expr.filters.hidden = function (e) {
			return !Q.expr.filters.visible(e);
		};
		Q.expr.filters.visible = function (e) {
			return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0;
		};
		var O2 = /%20/g,
			P2 = /\[\]$/,
			Q2 = /\r?\n/g,
			R2 = /^(?:submit|button|image|reset|file)$/i,
			S2 = /^(?:input|select|textarea|keygen)/i;

		function T2(p, a, t, b) {
			var n;
			if (Q.isArray(a)) {
				Q.each(a, function (i, v) {
					if (t || P2.test(p)) {
						b(p, v);
					} else {
						T2(p + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, t, b);
					}
				});
			} else if (!t && Q.type(a) === "object") {
				for (n in a) {
					T2(p + "[" + n + "]", a[n], t, b);
				}
			} else {
				b(p, a);
			}
		}
		Q.param = function (a, t) {
			var p, s = [],
				b = function (e, v) {
					v = Q.isFunction(v) ? v() : (v == null ? "" : v);
					s[s.length] = encodeURIComponent(e) + "=" + encodeURIComponent(v);
				};
			if (t === undefined) {
				t = Q.ajaxSettings && Q.ajaxSettings.traditional;
			}
			if (Q.isArray(a) || (a.jquery && !Q.isPlainObject(a))) {
				Q.each(a, function () {
					b(this.name, this.value);
				});
			} else {
				for (p in a) {
					T2(p, a[p], t, b);
				}
			}
			return s.join("&").replace(O2, "+");
		};
		Q.fn.extend({
			serialize: function () {
				return Q.param(this.serializeArray());
			},
			serializeArray: function () {
				return this.map(function () {
					var e = Q.prop(this, "elements");
					return e ? Q.makeArray(e) : this;
				}).filter(function () {
					var t = this.type;
					return this.name && !Q(this).is(":disabled") && S2.test(this.nodeName) && !R2.test(t) && (this.checked || !i1.test(t));
				}).map(function (i, e) {
					var v = Q(this).val();
					return v == null ? null : Q.isArray(v) ? Q.map(v, function (v) {
						return {
							name: e.name,
							value: v.replace(Q2, "\r\n")
						};
					}) : {
						name: e.name,
						value: v.replace(Q2, "\r\n")
					};
				}).get();
			}
		});
		Q.ajaxSettings.xhr = function () {
			try {
				return new w.XMLHttpRequest();
			} catch (e) {}
		};
		var U2 = {
				0: 200,
				1223: 204
			},
			V2 = Q.ajaxSettings.xhr();
		x.cors = !!V2 && ("withCredentials" in V2);
		x.ajax = V2 = !!V2;
		Q.ajaxTransport(function (a) {
			var b, j;
			if (x.cors || V2 && !a.crossDomain) {
				return {
					send: function (l, m) {
						var i, n = a.xhr();
						n.open(a.type, a.url, a.async, a.username, a.password);
						if (a.xhrFields) {
							for (i in a.xhrFields) {
								n[i] = a.xhrFields[i];
							}
						}
						if (a.mimeType && n.overrideMimeType) {
							n.overrideMimeType(a.mimeType);
						}
						if (!a.crossDomain && !l["X-Requested-With"]) {
							l["X-Requested-With"] = "XMLHttpRequest";
						}
						for (i in l) {
							n.setRequestHeader(i, l[i]);
						}
						b = function (t) {
							return function () {
								if (b) {
									b = j = n.onload = n.onerror = n.onabort = n.onreadystatechange = null;
									if (t === "abort") {
										n.abort();
									} else if (t === "error") {
										if (typeof n.status !== "number") {
											m(0, "error");
										} else {
											m(n.status, n.statusText);
										}
									} else {
										m(U2[n.status] || n.status, n.statusText, (n.responseType || "text") !== "text" || typeof n.responseText !== "string" ? {
											binary: n.response
										} : {
											text: n.responseText
										}, n.getAllResponseHeaders());
									}
								}
							};
						};
						n.onload = b();
						j = n.onerror = b("error");
						if (n.onabort !== undefined) {
							n.onabort = j;
						} else {
							n.onreadystatechange = function () {
								if (n.readyState === 4) {
									w.setTimeout(function () {
										if (b) {
											j();
										}
									});
								}
							};
						}
						b = b("abort");
						try {
							n.send(a.hasContent && a.data || null);
						} catch (e) {
							if (b) {
								throw e;
							}
						}
					},
					abort: function () {
						if (b) {
							b();
						}
					}
				};
			}
		});
		Q.ajaxPrefilter(function (s) {
			if (s.crossDomain) {
				s.contents.script = false;
			}
		});
		Q.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function (t) {
					Q.globalEval(t);
					return t;
				}
			}
		});
		Q.ajaxPrefilter("script", function (s) {
			if (s.cache === undefined) {
				s.cache = false;
			}
			if (s.crossDomain) {
				s.type = "GET";
			}
		});
		Q.ajaxTransport("script", function (s) {
			if (s.crossDomain) {
				var a, b;
				return {
					send: function (_, e) {
						a = Q("<script>").prop({
							charset: s.scriptCharset,
							src: s.url
						}).on("load error", b = function (i) {
							a.remove();
							b = null;
							if (i) {
								e(i.type === "error" ? 404 : 200, i.type);
							}
						});
						f.head.appendChild(a[0]);
					},
					abort: function () {
						if (b) {
							b();
						}
					}
				};
			}
		});
		var W2 = [],
			X2 = /(=)\?(?=&|$)|\?\?/;
		Q.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function () {
				var a = W2.pop() || (Q.expando + "_" + (x2++));
				this[a] = true;
				return a;
			}
		});
		Q.ajaxPrefilter("json jsonp", function (s, a, j) {
			var b, e, i, l = s.jsonp !== false && (X2.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && X2.test(s.data) && "data");
			if (l || s.dataTypes[0] === "jsonp") {
				b = s.jsonpCallback = Q.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
				if (l) {
					s[l] = s[l].replace(X2, "$1" + b);
				} else if (s.jsonp !== false) {
					s.url += (y2.test(s.url) ? "&" : "?") + s.jsonp + "=" + b;
				}
				s.converters["script json"] = function () {
					if (!i) {
						Q.error(b + " was not called");
					}
					return i[0];
				};
				s.dataTypes[0] = "json";
				e = w[b];
				w[b] = function () {
					i = arguments;
				};
				j.always(function () {
					if (e === undefined) {
						Q(w).removeProp(b);
					} else {
						w[b] = e;
					}
					if (s[b]) {
						s.jsonpCallback = a.jsonpCallback;
						W2.push(b);
					}
					if (i && Q.isFunction(e)) {
						e(i[0]);
					}
					i = e = undefined;
				});
				return "script";
			}
		});
		Q.parseHTML = function (a, b, e) {
			if (!a || typeof a !== "string") {
				return null;
			}
			if (typeof b === "boolean") {
				e = b;
				b = false;
			}
			b = b || f;
			var p = H.exec(a),
				s = !e && [];
			if (p) {
				return [b.createElement(p[1])];
			}
			p = p1([a], b, s);
			if (s && s.length) {
				Q(s).remove();
			}
			return Q.merge([], p.childNodes);
		};
		var Y2 = Q.fn.load;
		Q.fn.load = function (a, p, b) {
			if (typeof a !== "string" && Y2) {
				return Y2.apply(this, arguments);
			}
			var s, t, e, i = this,
				j = a.indexOf(" ");
			if (j > -1) {
				s = Q.trim(a.slice(j));
				a = a.slice(0, j);
			}
			if (Q.isFunction(p)) {
				b = p;
				p = undefined;
			} else if (p && typeof p === "object") {
				t = "POST";
			}
			if (i.length > 0) {
				Q.ajax({
					url: a,
					type: t || "GET",
					dataType: "html",
					data: p
				}).done(function (l) {
					e = arguments;
					i.html(s ? Q("<div>").append(Q.parseHTML(l)).find(s) : l);
				}).always(b && function (l, m) {
					i.each(function () {
						b.apply(this, e || [l.responseText, m, l]);
					});
				});
			}
			return this;
		};
		Q.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, t) {
			Q.fn[t] = function (a) {
				return this.on(t, a);
			};
		});
		Q.expr.filters.animated = function (e) {
			return Q.grep(Q.timers, function (a) {
				return e === a.elem;
			}).length;
		};

		function Z2(e) {
			return Q.isWindow(e) ? e : e.nodeType === 9 && e.defaultView;
		}
		Q.offset = {
			setOffset: function (e, a, i) {
				var b, j, l, m, n, p, s, t = Q.css(e, "position"),
					v = Q(e),
					_ = {};
				if (t === "static") {
					e.style.position = "relative";
				}
				n = v.offset();
				l = Q.css(e, "top");
				p = Q.css(e, "left");
				s = (t === "absolute" || t === "fixed") && (l + p).indexOf("auto") > -1;
				if (s) {
					b = v.position();
					m = b.top;
					j = b.left;
				} else {
					m = parseFloat(l) || 0;
					j = parseFloat(p) || 0;
				}
				if (Q.isFunction(a)) {
					a = a.call(e, i, Q.extend({}, n));
				}
				if (a.top != null) {
					_.top = (a.top - n.top) + m;
				}
				if (a.left != null) {
					_.left = (a.left - n.left) + j;
				}
				if ("using" in a) {
					a.using.call(e, _);
				} else {
					v.css(_);
				}
			}
		};
		Q.fn.extend({
			offset: function (a) {
				if (arguments.length) {
					return a === undefined ? this : this.each(function (i) {
						Q.offset.setOffset(this, a, i);
					});
				}
				var b, e, j = this[0],
					l = {
						top: 0,
						left: 0
					},
					m = j && j.ownerDocument;
				if (!m) {
					return;
				}
				b = m.documentElement;
				if (!Q.contains(b, j)) {
					return l;
				}
				l = j.getBoundingClientRect();
				e = Z2(m);
				return {
					top: l.top + e.pageYOffset - b.clientTop,
					left: l.left + e.pageXOffset - b.clientLeft
				};
			},
			position: function () {
				if (!this[0]) {
					return;
				}
				var a, b, e = this[0],
					p = {
						top: 0,
						left: 0
					};
				if (Q.css(e, "position") === "fixed") {
					b = e.getBoundingClientRect();
				} else {
					a = this.offsetParent();
					b = this.offset();
					if (!Q.nodeName(a[0], "html")) {
						p = a.offset();
					}
					p.top += Q.css(a[0], "borderTopWidth", true);
					p.left += Q.css(a[0], "borderLeftWidth", true);
				}
				return {
					top: b.top - p.top - Q.css(e, "marginTop", true),
					left: b.left - p.left - Q.css(e, "marginLeft", true)
				};
			},
			offsetParent: function () {
				return this.map(function () {
					var a = this.offsetParent;
					while (a && Q.css(a, "position") === "static") {
						a = a.offsetParent;
					}
					return a || R1;
				});
			}
		});
		Q.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function (m, p) {
			var t = "pageYOffset" === p;
			Q.fn[m] = function (v) {
				return W(this, function (e, m, v) {
					var a = Z2(e);
					if (v === undefined) {
						return a ? a[p] : e[m];
					}
					if (a) {
						a.scrollTo(!t ? v : a.pageXOffset, t ? v : a.pageYOffset);
					} else {
						e[m] = v;
					}
				}, m, v, arguments.length);
			};
		});
		Q.each(["top", "left"], function (i, p) {
			Q.cssHooks[p] = T1(x.pixelPosition, function (e, a) {
				if (a) {
					a = S1(e, p);
					return O1.test(a) ? Q(e).position()[p] + "px" : a;
				}
			});
		});
		Q.each({
			Height: "height",
			Width: "width"
		}, function (n, t) {
			Q.each({
				padding: "inner" + n,
				content: t,
				"": "outer" + n
			}, function (a, b) {
				Q.fn[b] = function (m, v) {
					var e = arguments.length && (a || typeof m !== "boolean"),
						i = a || (m === true || v === true ? "margin" : "border");
					return W(this, function (j, t, v) {
						var l;
						if (Q.isWindow(j)) {
							return j.document.documentElement["client" + n];
						}
						if (j.nodeType === 9) {
							l = j.documentElement;
							return Math.max(j.body["scroll" + n], l["scroll" + n], j.body["offset" + n], l["offset" + n], l["client" + n]);
						}
						return v === undefined ? Q.css(j, t, i) : Q.style(j, t, v, i);
					}, t, e ? m : undefined, e, null);
				};
			});
		});
		Q.fn.extend({
			bind: function (t, a, b) {
				return this.on(t, null, a, b);
			},
			unbind: function (t, a) {
				return this.off(t, null, a);
			},
			delegate: function (s, t, a, b) {
				return this.on(t, s, a, b);
			},
			undelegate: function (s, t, a) {
				return arguments.length === 1 ? this.off(s, "**") : this.off(t, s || "**", a);
			},
			size: function () {
				return this.length;
			}
		});
		Q.fn.andSelf = Q.fn.addBack;
		if (typeof define === "function" && define.amd) {
			define("jquery", [], function () {
				return Q;
			});
		}
		var $2 = w.jQuery,
			_$ = w.$;
		Q.noConflict = function (a) {
			if (w.$ === Q) {
				w.$ = _$;
			}
			if (a && w.jQuery === Q) {
				w.jQuery = $2;
			}
			return Q;
		};
		if (!c) {
			w.jQuery = w.$ = Q;
		}
		return Q;
	}));
	/*!
	 * jQuery UI Position 1.10.4
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/position/
	 */
	(function ($, u) {
		$.ui = $.ui || {};
		var c, m = Math.max,
			a = Math.abs,
			r = Math.round,
			b = /left|center|right/,
			d = /top|center|bottom/,
			e = /[\+\-]\d+(\.[\d]+)?%?/,
			f = /^\w+/,
			g = /%$/,
			_ = $.fn.position;

		function h(o, w, i) {
			return [parseFloat(o[0]) * (g.test(o[0]) ? w / 100 : 1), parseFloat(o[1]) * (g.test(o[1]) ? i / 100 : 1)];
		}

		function p(i, k) {
			return parseInt($.css(i, k), 10) || 0;
		}

		function j(i) {
			var k = i[0];
			if (k.nodeType === 9) {
				return {
					width: i.width(),
					height: i.height(),
					offset: {
						top: 0,
						left: 0
					}
				};
			}
			if ($.isWindow(k)) {
				return {
					width: i.width(),
					height: i.height(),
					offset: {
						top: i.scrollTop(),
						left: i.scrollLeft()
					}
				};
			}
			if (k.preventDefault) {
				return {
					width: 0,
					height: 0,
					offset: {
						top: k.pageY,
						left: k.pageX
					}
				};
			}
			if (typeof window.SVGElement !== "undefined" && k instanceof window.SVGElement) {
				var l = k.getBoundingClientRect();
				return {
					width: l.width,
					height: l.height,
					offset: i.offset()
				};
			}
			return {
				width: i.outerWidth(),
				height: i.outerHeight(),
				offset: i.offset()
			};
		}
		$.position = {
			scrollbarWidth: function () {
				if (c !== u) {
					return c;
				}
				var w, i, k = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					l = k.children()[0];
				$("body").append(k);
				w = l.offsetWidth;
				k.css("overflow", "scroll");
				i = l.offsetWidth;
				if (w === i) {
					i = k[0].clientWidth;
				}
				k.remove();
				return (c = w - i);
			},
			getScrollInfo: function (w) {
				var o = w.isWindow || w.isDocument ? "" : w.element.css("overflow-x"),
					i = w.isWindow || w.isDocument ? "" : w.element.css("overflow-y"),
					k = o === "scroll" || (o === "auto" && w.width < w.element[0].scrollWidth),
					l = i === "scroll" || (i === "auto" && w.height < w.element[0].scrollHeight);
				return {
					width: l ? $.position.scrollbarWidth() : 0,
					height: k ? $.position.scrollbarWidth() : 0
				};
			},
			getWithinInfo: function (i) {
				var w = $(i || window),
					k = $.isWindow(w[0]),
					l = !!w[0] && w[0].nodeType === 9;
				return {
					element: w,
					isWindow: k,
					isDocument: l,
					offset: w.offset() || {
						left: 0,
						top: 0
					},
					scrollLeft: w.scrollLeft(),
					scrollTop: w.scrollTop(),
					width: k ? w.width() : w.outerWidth(),
					height: k ? w.height() : w.outerHeight()
				};
			}
		};
		$.fn.position = function (o) {
			if (!o || !o.of) {
				return _.apply(this, arguments);
			}
			o = $.extend({}, o);
			var k, t, l, n, q, s, v = $(o.of),
				w = $.position.getWithinInfo(o.within),
				x = $.position.getScrollInfo(w),
				y = (o.collision || "flip").split(" "),
				z = {};
			s = j(v);
			if (v[0].preventDefault) {
				o.at = "left top";
			}
			t = s.width;
			l = s.height;
			n = s.offset;
			q = $.extend({}, n);
			$.each(["my", "at"], function () {
				var i = (o[this] || "").split(" "),
					A, B;
				if (i.length === 1) {
					i = b.test(i[0]) ? i.concat(["center"]) : d.test(i[0]) ? ["center"].concat(i) : ["center", "center"];
				}
				i[0] = b.test(i[0]) ? i[0] : "center";
				i[1] = d.test(i[1]) ? i[1] : "center";
				A = e.exec(i[0]);
				B = e.exec(i[1]);
				z[this] = [A ? A[0] : 0, B ? B[0] : 0];
				o[this] = [f.exec(i[0])[0], f.exec(i[1])[0]];
			});
			if (y.length === 1) {
				y[1] = y[0];
			}
			if (o.at[0] === "right") {
				q.left += t;
			} else if (o.at[0] === "center") {
				q.left += t / 2;
			}
			if (o.at[1] === "bottom") {
				q.top += l;
			} else if (o.at[1] === "center") {
				q.top += l / 2;
			}
			k = h(z.at, t, l);
			q.left += k[0];
			q.top += k[1];
			return this.each(function () {
				var A, B, C = $(this),
					D = C.outerWidth(),
					E = C.outerHeight(),
					F = p(this, "marginLeft"),
					G = p(this, "marginTop"),
					H = D + F + p(this, "marginRight") + x.width,
					I = E + G + p(this, "marginBottom") + x.height,
					J = $.extend({}, q),
					K = h(z.my, C.outerWidth(), C.outerHeight());
				if (o.my[0] === "right") {
					J.left -= D;
				} else if (o.my[0] === "center") {
					J.left -= D / 2;
				}
				if (o.my[1] === "bottom") {
					J.top -= E;
				} else if (o.my[1] === "center") {
					J.top -= E / 2;
				}
				J.left += K[0];
				J.top += K[1];
				if (!$.support.offsetFractions) {
					J.left = r(J.left);
					J.top = r(J.top);
				}
				A = {
					marginLeft: F,
					marginTop: G
				};
				$.each(["left", "top"], function (i, L) {
					if ($.ui.position[y[i]]) {
						$.ui.position[y[i]][L](J, {
							targetWidth: t,
							targetHeight: l,
							elemWidth: D,
							elemHeight: E,
							collisionPosition: A,
							collisionWidth: H,
							collisionHeight: I,
							offset: [k[0] + K[0], k[1] + K[1]],
							my: o.my,
							at: o.at,
							within: w,
							elem: C
						});
					}
				});
				if (o.using) {
					B = function (i) {
						var L = n.left - J.left,
							M = L + t - D,
							N = n.top - J.top,
							O = N + l - E,
							P = {
								target: {
									element: v,
									left: n.left,
									top: n.top,
									width: t,
									height: l
								},
								element: {
									element: C,
									left: J.left,
									top: J.top,
									width: D,
									height: E
								},
								horizontal: M < 0 ? "left" : L > 0 ? "right" : "center",
								vertical: O < 0 ? "top" : N > 0 ? "bottom" : "middle"
							};
						if (t < D && a(L + M) < t) {
							P.horizontal = "center";
						}
						if (l < E && a(N + O) < l) {
							P.vertical = "middle";
						}
						if (m(a(L), a(M)) > m(a(N), a(O))) {
							P.important = "horizontal";
						} else {
							P.important = "vertical";
						}
						o.using.call(this, i, P);
					};
				}
				C.offset($.extend(J, {
					using: B
				}));
			});
		};
		$.ui.position = {
			fit: {
				left: function (i, k) {
					var w = k.within,
						l = w.isWindow ? w.scrollLeft : w.offset.left,
						o = w.width,
						n = i.left - k.collisionPosition.marginLeft,
						q = l - n,
						s = n + k.collisionWidth - o - l,
						t;
					if (k.collisionWidth > o) {
						if (q > 0 && s <= 0) {
							t = i.left + q + k.collisionWidth - o - l;
							i.left += q - t;
						} else if (s > 0 && q <= 0) {
							i.left = l;
						} else {
							if (q > s) {
								i.left = l + o - k.collisionWidth;
							} else {
								i.left = l;
							}
						}
					} else if (q > 0) {
						i.left += q;
					} else if (s > 0) {
						i.left -= s;
					} else {
						i.left = m(i.left - n, i.left);
					}
				},
				top: function (i, k) {
					var w = k.within,
						l = w.isWindow ? w.scrollTop : w.offset.top,
						o = k.within.height,
						n = i.top - k.collisionPosition.marginTop,
						q = l - n,
						s = n + k.collisionHeight - o - l,
						t;
					if (k.collisionHeight > o) {
						if (q > 0 && s <= 0) {
							t = i.top + q + k.collisionHeight - o - l;
							i.top += q - t;
						} else if (s > 0 && q <= 0) {
							i.top = l;
						} else {
							if (q > s) {
								i.top = l + o - k.collisionHeight;
							} else {
								i.top = l;
							}
						}
					} else if (q > 0) {
						i.top += q;
					} else if (s > 0) {
						i.top -= s;
					} else {
						i.top = m(i.top - n, i.top);
					}
				}
			},
			flip: {
				left: function (i, k) {
					var w = k.within,
						l = w.offset.left + w.scrollLeft,
						o = w.width,
						n = w.isWindow ? w.scrollLeft : w.offset.left,
						q = i.left - k.collisionPosition.marginLeft,
						s = q - n,
						t = q + k.collisionWidth - o - n,
						v = k.my[0] === "left" ? -k.elemWidth : k.my[0] === "right" ? k.elemWidth : 0,
						x = k.at[0] === "left" ? k.targetWidth : k.at[0] === "right" ? -k.targetWidth : 0,
						y = -2 * k.offset[0],
						z, A;
					if (s < 0) {
						z = i.left + v + x + y + k.collisionWidth - o - l;
						if (z < 0 || z < a(s)) {
							i.left += v + x + y;
						}
					} else if (t > 0) {
						A = i.left - k.collisionPosition.marginLeft + v + x + y - n;
						if (A > 0 || a(A) < t) {
							i.left += v + x + y;
						}
					}
				},
				top: function (i, k) {
					var w = k.within,
						l = w.offset.top + w.scrollTop,
						o = w.height,
						n = w.isWindow ? w.scrollTop : w.offset.top,
						q = i.top - k.collisionPosition.marginTop,
						s = q - n,
						t = q + k.collisionHeight - o - n,
						v = k.my[1] === "top",
						x = v ? -k.elemHeight : k.my[1] === "bottom" ? k.elemHeight : 0,
						y = k.at[1] === "top" ? k.targetHeight : k.at[1] === "bottom" ? -k.targetHeight : 0,
						z = -2 * k.offset[1],
						A, B;
					if (s < 0) {
						B = i.top + x + y + z + k.collisionHeight - o - l;
						if ((i.top + x + y + z) > s && (B < 0 || B < a(s))) {
							i.top += x + y + z;
						}
					} else if (t > 0) {
						A = i.top - k.collisionPosition.marginTop + x + y + z - n;
						if ((i.top + x + y + z) > t && (A > 0 || a(A) < t)) {
							i.top += x + y + z;
						}
					}
				}
			},
			flipfit: {
				left: function () {
					$.ui.position.flip.left.apply(this, arguments);
					$.ui.position.fit.left.apply(this, arguments);
				},
				top: function () {
					$.ui.position.flip.top.apply(this, arguments);
					$.ui.position.fit.top.apply(this, arguments);
				}
			}
		};
		(function () {
			var t, k, l, o, i, n = document.getElementsByTagName("body")[0],
				q = document.createElement("div");
			t = document.createElement(n ? "div" : "body");
			l = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			};
			if (n) {
				$.extend(l, {
					position: "absolute",
					left: "-1000px",
					top: "-1000px"
				});
			}
			for (i in l) {
				t.style[i] = l[i];
			}
			t.appendChild(q);
			k = n || document.documentElement;
			k.insertBefore(t, k.firstChild);
			q.style.cssText = "position: absolute; left: 10.7432222px;";
			o = $(q).offset().left;
			$.support.offsetFractions = o > 10 && o < 11;
			t.innerHTML = "";
			k.removeChild(t);
		})();
	}(jQuery));
	/*!
	 * UI development toolkit for HTML5 (OpenUI5)
	 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
	 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
	 */
	(function (q, D, a) {
		"use strict";
		if (!q) {
			throw new Error("Loading of jQuery failed");
		}
		if (q.sap) {
			return;
		}
		if (D.browser.edge || D.browser.safari) {
			a.Promise = undefined;
		}
		if (!a.Promise) {
			ES6Promise.polyfill();
		}
		var _ = [];

		function b(l, m) {
			_.push({
				level: l,
				message: m
			});
		}

		function c(d, i) {
			if (i === undefined) {
				i = new URI(document.baseURI).search("");
			}
			return new URI(d, i).toString();
		}
		var f;
		var g = /^[0-9]+(?:\.([0-9]+)(?:\.([0-9]+))?)?(.*)$/;

		function V(M, i, d, s) {
			if (M instanceof V) {
				return M;
			}
			if (!(this instanceof V)) {
				return new V(M, i, d, s);
			}
			var m;
			if (typeof M === "string") {
				m = g.exec(M);
			} else if (Array.isArray(M)) {
				m = M;
			} else {
				m = arguments;
			}
			m = m || [];

			function n(v) {
				v = parseInt(v, 10);
				return isNaN(v) ? 0 : v;
			}
			M = n(m[0]);
			i = n(m[1]);
			d = n(m[2]);
			s = String(m[3] || "");
			this.toString = function () {
				return M + "." + i + "." + d + s;
			};
			this.getMajor = function () {
				return M;
			};
			this.getMinor = function () {
				return i;
			};
			this.getPatch = function () {
				return d;
			};
			this.getSuffix = function () {
				return s;
			};
			this.compareTo = function () {
				var o = V.apply(a, arguments);
				return M - o.getMajor() || i - o.getMinor() || d - o.getPatch() || ((s < o.getSuffix()) ? -1 : (s === o.getSuffix()) ? 0 : 1);
			};
		}
		V.prototype.inRange = function (m, M) {
			return this.compareTo(m) >= 0 && this.compareTo(M) < 0;
		};
		var J = V(q.fn.jquery);
		if (J.compareTo("2.2.3") != 0) {
			b("warning", "SAPUI5's default jQuery version is 2.2.3; current version is " + q.fn.jquery + ". Please note that we only support version 2.2.3.");
		}
		if (!q.browser) {
			q.browser = (function (d) {
				var r = /(webkit)[ \/]([\w.]+)/,
					i = /(opera)(?:.*version)?[ \/]([\w.]+)/,
					j = /(msie) ([\w.]+)/,
					l = /(mozilla)(?:.*? rv:([\w.]+))?/,
					d = d.toLowerCase(),
					m = r.exec(d) || i.exec(d) || j.exec(d) || d.indexOf("compatible") < 0 && l.exec(d) || [],
					n = {};
				if (m[1]) {
					n[m[1]] = true;
					n.version = m[2] || "0";
					if (n.webkit) {
						n.safari = true;
					}
				}
				return n;
			}(a.navigator.userAgent));
		}
		if (D.browser.msie) {
			q.support = q.support || {};
			q.support.cors = true;
			if (a.ActiveXObject !== undefined && J.inRange("1.11", "2")) {
				var C = function () {
					try {
						return new XMLHttpRequest();
					} catch (e) {}
				};
				var h = function () {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {}
				};
				q.ajaxSettings = q.ajaxSettings || {};
				q.ajaxSettings.xhr = function () {
					return !this.isLocal ? C() : h();
				};
			}
		}
		if (D.browser.firefox) {
			var G = a.getComputedStyle;
			a.getComputedStyle = function (d, i) {
				var o = G.call(this, d, i);
				if (o === null) {
					return document.body.cloneNode(false).style;
				}
				return o;
			};
		}
		if (D.browser.firefox && a.Proxy) {
			(function () {
				var s = false,
					d = false;
				var i = Promise.prototype.then,
					j = Promise.prototype.catch,
					l = a.setTimeout,
					m = a.setInterval,
					Q = [];

				function n(r) {
					if (!d) {
						d = true;
						l(function () {
							var v = Q;
							Q = [];
							d = false;
							v.forEach(function (K) {
								K();
							});
						}, 0);
					}
					Q.push(r);
				}

				function w(r, v, K) {
					if (typeof r !== "function") {
						return r;
					}
					return function () {
						var M = Array.prototype.slice.call(arguments);
						if (s || d) {
							return new Promise(function (N, O) {
								n(function () {
									var R;
									try {
										R = r.apply(a, M);
										N(R);
									} catch (T) {
										O(T);
									}
								});
							});
						}
						return r.apply(a, M);
					};
				}
				Promise.prototype.then = function (T, r) {
					var W = w(T),
						v = w(r);
					return i.call(this, W, v);
				};
				Promise.prototype.catch = function (r) {
					var W = w(r);
					return j.call(this, W);
				};

				function o(r) {
					var W = function () {
						var v;
						if (d) {
							v = [W, 0].concat(arguments);
							l.apply(a, v);
						} else {
							r.apply(a, arguments);
						}
					};
					return W;
				}
				a.setTimeout = function (v) {
					var r = Array.prototype.slice.call(arguments),
						K = typeof v === "string" ? new Function(v) : v,
						W = o(K);
					r[0] = W;
					return l.apply(a, r);
				};
				a.setInterval = function (v) {
					var r = Array.prototype.slice.call(arguments),
						K = typeof v === "string" ? new Function(v) : v,
						W = o(K, true);
					r[0] = W;
					return m.apply(a, r);
				};
				a.XMLHttpRequest = new Proxy(a.XMLHttpRequest, {
					construct: function (T, r, N) {
						var X = new T(),
							v = false,
							K = false,
							R = 0,
							M;

						function O(Y) {
							var Z = function ($) {
								var a1 = X.readyState;

								function b1() {
									R = a1;
									if (Z.active) {
										return Y.call(M, $);
									}
								}
								if (!v && s) {
									K = true;
								}
								if (K) {
									l(b1, 0);
									return true;
								}
								return b1();
							};
							Y.wrappedHandler = Z;
							Z.active = true;
							return Z;
						}

						function U(Y) {
							return W(Y.wrappedHandler);
						}

						function W(Y) {
							if (typeof Y === "function") {
								Y.active = false;
							}
							return Y;
						}
						M = new Proxy(X, {
							get: function (Y, Z, $) {
								var a1 = Y[Z];
								switch (Z) {
									case "readyState":
										return R;
									case "addEventListener":
										return function (b1, c1, d1) {
											a1.call(Y, b1, O(c1), d1);
										};
									case "removeEventListener":
										return function (b1, c1, d1) {
											a1.call(Y, b1, U(c1), d1);
										};
									case "open":
										return function (b1, c1, d1) {
											v = d1 === false;
											a1.apply(Y, arguments);
											R = Y.readyState;
										};
									case "send":
										return function () {
											s = v;
											a1.apply(Y, arguments);
											R = Y.readyState;
											s = false;
										};
								}
								if (typeof a1 === "function") {
									return function () {
										return a1.apply(Y, arguments);
									};
								}
								return a1;
							},
							set: function (Y, Z, $) {
								if (Z.indexOf("on") === 0) {
									W(Y[Z]);
									if (typeof $ === "function") {
										Y[Z] = O($);
										return true;
									}
								}
								Y[Z] = $;
								return true;
							}
						});
						M.addEventListener("readystatechange", function () {});
						return M;
					}
				});
			})();
		}
		var k = (function () {
			var T, U, r, d = /^(.*\/)?download\/configurator[\/\?]/,
				i = /^(.*\/)?(sap-ui-(core|custom|boot|merged)(-.*)?)\.js([?#]|$)/,
				j = /^(.*\/)?resources\//;
			q("script[src]").each(function () {
				var s = this.getAttribute("src"),
					m;
				if ((m = s.match(d)) !== null) {
					T = this;
					U = s;
					r = (m[1] || "") + "resources/";
					return false;
				} else if ((m = s.match(i)) !== null) {
					T = this;
					U = s;
					r = m[1] || "";
					return false;
				} else if (this.id == 'sap-ui-bootstrap' && (m = s.match(j))) {
					T = this;
					U = s;
					r = m[0];
					return false;
				}
			});
			return {
				tag: T,
				url: U,
				resourceRoot: r
			};
		})();
		(function () {
			if (/sap-bootstrap-debug=(true|x|X)/.test(location.search)) {
				debugger;
			}
			var r;
			try {
				r = a.localStorage.getItem("sap-ui-reboot-URL");
				a.localStorage.removeItem("sap-ui-reboot-URL");
			} catch (e) {}
			if (r && r !== "undefined") {
				var U = confirm("WARNING!\n\nUI5 will be booted from the URL below.\nPress 'Cancel' unless you have configured this.\n\n" + r);
				if (U) {
					var s = k.tag,
						d = "<script src=\"" + r + "\"";
					q.each(s.attributes, function (i, o) {
						if (o.nodeName.indexOf("data-sap-ui-") == 0) {
							d += " " + o.nodeName + "=\"" + o.nodeValue.replace(/"/g, "&quot;") + "\"";
						}
					});
					d += "></script>";
					s.parentNode.removeChild(s);
					q("#sap-ui-bootstrap-cachebusted").remove();
					a["sap-ui-config"] && a["sap-ui-config"].resourceRoots && (a["sap-ui-config"].resourceRoots[""] = undefined);
					document.write(d);
					var R = new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: " + r);
					R.name = "Restart";
					throw R;
				}
			}
		})();
		(function () {
			var U = /(?:^|\?|&)sap-ui-debug=([^&]*)(?:&|$)/.exec(location.search),
				d = U && decodeURIComponent(U[1]);
			try {
				d = d || a.localStorage.getItem("sap-ui-debug");
			} catch (e) {}
			if (typeof d === 'string') {
				if (/^(?:false|true|x|X)$/.test(d)) {
					d = d !== 'false';
				}
			} else {
				d = !!d;
			}
			a["sap-ui-debug"] = d;
			if (/-dbg\.js([?#]|$)/.test(k.url)) {
				a["sap-ui-loaddbg"] = true;
				a["sap-ui-debug"] = d = d || true;
			}
			if (a["sap-ui-optimized"] && d) {
				a["sap-ui-loaddbg"] = true;
				if (d === true) {
					var s = k.url.replace(/\/(?:sap-ui-cachebuster\/)?([^\/]+)\.js/, "/$1-dbg.js");
					a["sap-ui-optimized"] = false;
					document.write("<script type=\"text/javascript\" src=\"" + s + "\"></script>");
					var r = new Error("This is not a real error. Aborting UI5 bootstrap and restarting from: " + s);
					r.name = "Restart";
					throw r;
				}
			}
		})();
		var p = a["sap-ui-config"] = (function () {
			function n(o) {
				q.each(o, function (i, v) {
					var m = i.toLowerCase();
					if (!o.hasOwnProperty(m)) {
						o[m] = v;
						delete o[i];
					}
				});
				return o;
			}
			var s = k.tag,
				d = a["sap-ui-config"],
				j = "sap-ui-config.json";
			if (typeof d === "string") {
				b("warning", "Loading external bootstrap configuration from \"" + d + "\". This is a design time feature and not for productive usage!");
				if (d !== j) {
					b("warning", "The external bootstrap configuration file should be named \"" + j + "\"!");
				}
				q.ajax({
					url: d,
					dataType: 'json',
					async: false,
					success: function (o, T, i) {
						d = o;
					},
					error: function (i, T, o) {
						b("error", "Loading externalized bootstrap configuration from \"" + d + "\" failed! Reason: " + o + "!");
						d = undefined;
					}
				});
				d = d || {};
				d.__loaded = true;
			}
			d = n(d || {});
			d.resourceroots = d.resourceroots || {};
			d.themeroots = d.themeroots || {};
			d.resourceroots[''] = d.resourceroots[''] || k.resourceRoot;
			d['xx-loadallmode'] = /(^|\/)(sap-?ui5|[^\/]+-all).js([?#]|$)/.test(k.url);
			if (s) {
				var l = s.getAttribute("data-sap-ui-config");
				if (l) {
					try {
						q.extend(d, n((new Function("return {" + l + "};"))()));
					} catch (e) {
						b("error", "failed to parse data-sap-ui-config attribute: " + (e.message || e));
					}
				}
				q.each(s.attributes, function (i, o) {
					var m = o.name.match(/^data-sap-ui-(.*)$/);
					if (m) {
						m = m[1].toLowerCase();
						if (m === 'resourceroots') {
							q.extend(d[m], q.parseJSON(o.value));
						} else if (m === 'theme-roots') {
							q.extend(d.themeroots, q.parseJSON(o.value));
						} else if (m !== 'config') {
							d[m] = o.value;
						}
					}
				});
			}
			return d;
		}());
		var t = 0;
		if (p['xx-nosync'] === 'warn' || /(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(a.location.search)) {
			t = 1;
		}
		if (p['xx-nosync'] === true || p['xx-nosync'] === 'true' || /(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(a.location.search)) {
			t = 2;
		}
		if (t && p.__loaded) {
			b(t === 1 ? "warning" : "error", "[nosync]: configuration loaded via sync XHR");
		}
		if (p.noconflict === true || p.noconflict === "true" || p.noconflict === "x") {
			q.noConflict();
		}
		q.sap = {};
		q.sap.Version = V;
		q.sap.now = !(a.performance && performance.now && performance.timing) ? Date.now : (function () {
			var n = performance.timing.navigationStart;
			return function perfnow() {
				return n + performance.now();
			};
		}());

		function u(d, i, j) {
			return function (v) {
				try {
					if (v != null || i === 'string') {
						if (v) {
							localStorage.setItem(d, i === 'boolean' ? 'X' : v);
						} else {
							localStorage.removeItem(d);
						}
						j(v);
					}
					v = localStorage.getItem(d);
					return i === 'boolean' ? v === 'X' : v;
				} catch (e) {
					q.sap.log.warning("Could not access localStorage while accessing '" + d + "' (value: '" + v + "', are cookies disabled?): " + e.message);
				}
			};
		}
		q.sap.debug = u('sap-ui-debug', '', function reloadHint(d) {
			alert("Usage of debug sources is " + (d ? "on" : "off") + " now.\nFor the change to take effect, you need to reload the page.");
		});
		q.sap.setReboot = u('sap-ui-reboot-URL', 'string', function rebootUrlHint(r) {
			if (r) {
				alert("Next time this app is launched (only once), it will load UI5 from:\n" + r + ".\nPlease reload the application page now.");
			}
		});
		q.sap.statistics = u('sap-ui-statistics', 'boolean', function gatewayStatsHint(U) {
			alert("Usage of Gateway statistics " + (U ? "on" : "off") + " now.\nFor the change to take effect, you need to reload the page.");
		});
		(function () {
			var d = 0,
				j = 1,
				W = 2,
				l = 3,
				n = 4,
				T = 5,
				s = (a.top == a) ? "" : "[" + a.location.pathname.split('/').slice(-1)[0] + "] ",
				o = [],
				M = {
					'': j
				},
				r = null,
				K = false;

			function N(i, w) {
				return ("000" + String(i)).slice(-w);
			}

			function O(i) {
				return (!i || isNaN(M[i])) ? M[''] : M[i];
			}

			function Q() {
				if (!r) {
					r = {
						listeners: [],
						onLogEntry: function (m) {
							for (var i = 0; i < r.listeners.length; i++) {
								if (r.listeners[i].onLogEntry) {
									r.listeners[i].onLogEntry(m);
								}
							}
						},
						attach: function (i, m) {
							if (m) {
								r.listeners.push(m);
								if (m.onAttachToLog) {
									m.onAttachToLog(i);
								}
							}
						},
						detach: function (m, v) {
							for (var i = 0; i < r.listeners.length; i++) {
								if (r.listeners[i] === v) {
									if (v.onDetachFromLog) {
										v.onDetachFromLog(m);
									}
									r.listeners.splice(i, 1);
									return;
								}
							}
						}
					};
				}
				return r;
			}

			function R(i, m, v, w, X) {
				if (i <= O(w)) {
					if (K) {
						if (!X && !w && typeof v === "function") {
							X = v;
							v = "";
						}
						if (!X && typeof w === "function") {
							X = w;
							w = "";
						}
					}
					var Y = q.sap.now(),
						Z = new Date(Y),
						$ = Math.floor((Y - Math.floor(Y)) * 1000),
						a1 = {
							time: N(Z.getHours(), 2) + ":" + N(Z.getMinutes(), 2) + ":" + N(Z.getSeconds(), 2) + "." + N(Z.getMilliseconds(), 3) + N($, 3),
							date: N(Z.getFullYear(), 4) + "-" + N(Z.getMonth() + 1, 2) + "-" + N(Z.getDate(), 2),
							timestamp: Y,
							level: i,
							message: String(m || ""),
							details: String(v || ""),
							component: String(w || "")
						};
					if (K && typeof X === "function") {
						a1.supportInfo = X();
					}
					o.push(a1);
					if (r) {
						r.onLogEntry(a1);
					}
					if (a.console) {
						var b1 = a1.date + " " + a1.time + " " + s + a1.message + " - " + a1.details + " " + a1.component;
						switch (i) {
							case d:
							case j:
								console.error(b1);
								break;
							case W:
								console.warn(b1);
								break;
							case l:
								console.info ? console.info(b1) : console.log(b1);
								break;
							case n:
								console.debug ? console.debug(b1) : console.log(b1);
								break;
							case T:
								console.trace ? console.trace(b1) : console.log(b1);
								break;
						}
						if (console.info && a1.supportInfo) {
							console.info(a1.supportInfo);
						}
					}
					return a1;
				}
			}

			function U(i) {
				this.fatal = function (m, v, w, X) {
					R(d, m, v, w || i, X);
					return this;
				};
				this.error = function error(m, v, w, X) {
					R(j, m, v, w || i, X);
					return this;
				};
				this.warning = function warning(m, v, w, X) {
					R(W, m, v, w || i, X);
					return this;
				};
				this.info = function info(m, v, w, X) {
					R(l, m, v, w || i, X);
					return this;
				};
				this.debug = function debug(m, v, w, X) {
					R(n, m, v, w || i, X);
					return this;
				};
				this.trace = function trace(m, v, w, X) {
					R(T, m, v, w || i, X);
					return this;
				};
				this.setLevel = function setLevel(m, w) {
					w = w || i || '';
					M[w] = m;
					var X = [];
					q.each(q.sap.log.LogLevel, function (Y, v) {
						X[v] = Y;
					});
					R(l, "Changing log level " + (w ? "for '" + w + "' " : "") + "to " + X[m], "", "jQuery.sap.log");
					return this;
				};
				this.getLevel = function getLevel(m) {
					return O(m || i);
				};
				this.isLoggable = function (m, v) {
					return (m == null ? n : m) <= O(v || i);
				};
			}
			q.sap.log = q.extend(new U(), {
				Level: {
					NONE: d - 1,
					FATAL: d,
					ERROR: j,
					WARNING: W,
					INFO: l,
					DEBUG: n,
					TRACE: T,
					ALL: (T + 1)
				},
				getLogger: function (i, m) {
					if (!isNaN(m) && M[i] == null) {
						M[i] = m;
					}
					return new U(i);
				},
				getLogEntries: function () {
					return o.slice();
				},
				addLogListener: function (r) {
					Q().attach(this, r);
					return this;
				},
				removeLogListener: function (r) {
					Q().detach(this, r);
					return this;
				},
				logSupportInfo: function logSupportInfo(i) {
					K = i;
				}
			});
			q.sap.log.LogLevel = q.sap.log.Level;
			q.sap.log.getLog = q.sap.log.getLogEntries;
			q.sap.assert = function (i, m) {
				if (!i) {
					var v = typeof m === "function" ? m() : m;
					if (a.console && console.assert) {
						console.assert(i, s + v);
					} else {
						q.sap.log.debug("[Assertions] " + v);
					}
				}
			};
			p.loglevel = (function () {
				var m = /(?:\?|&)sap-ui-log(?:L|-l)evel=([^&]*)/.exec(a.location.search);
				return m && m[1];
			}()) || p.loglevel;
			if (p.loglevel) {
				q.sap.log.setLevel(q.sap.log.Level[p.loglevel.toUpperCase()] || parseInt(p.loglevel, 10));
			}
			q.sap.log.info("SAP Logger started.");
			q.each(_, function (i, e) {
				q.sap.log[e.level](e.message);
			});
			_ = null;
		}());
		q.sap.factory = function factory(o) {
			function d() {}
			d.prototype = o;
			return d;
		};
		q.sap.newObject = function newObject(o) {
			return Object.create(o || null);
		};
		q.sap.getter = function getter(v) {
			return function () {
				return v;
			};
		};
		q.sap.getObject = function getObject(n, N, o) {
			var O = o || a,
				d = (n || "").split("."),
				l = d.length,
				j = isNaN(N) ? 0 : l - N,
				i;
			if (t && o === a) {
				q.sap.log.error("[nosync] getObject called to retrieve global name '" + n + "'");
			}
			for (i = 0; O && i < l; i++) {
				if (!O[d[i]] && i < j) {
					O[d[i]] = {};
				}
				O = O[d[i]];
			}
			return O;
		};
		q.sap.setObject = function (n, v, o) {
			var O = o || a,
				N = (n || "").split("."),
				l = N.length,
				i;
			if (l > 0) {
				for (i = 0; O && i < l - 1; i++) {
					if (!O[N[i]]) {
						O[N[i]] = {};
					}
					O = O[N[i]];
				}
				O[N[l - 1]] = v;
			}
		};

		function P() {
			function M(i, l, a1, b1, c1) {
				this.id = i;
				this.info = l;
				this.start = a1;
				this.end = b1;
				this.pause = 0;
				this.resume = 0;
				this.duration = 0;
				this.time = 0;
				this.categories = c1;
				this.average = false;
				this.count = 0;
				this.completeDuration = 0;
			}

			function m(l) {
				if (!r) {
					return true;
				}
				if (!l) {
					return r === null;
				}
				for (var i = 0; i < r.length; i++) {
					if (l.indexOf(r[i]) > -1) {
						return true;
					}
				}
				return false;
			}

			function d(i) {
				if (!i) {
					i = ["javascript"];
				}
				i = typeof i === "string" ? i.split(",") : i;
				if (!m(i)) {
					return null;
				}
				return i;
			}

			function j(l, a1) {
				for (var i = 0; i < a1.length; i++) {
					if (l.categories.indexOf(a1[i]) > -1) {
						return true;
					}
				}
				return a1.length === 0;
			}
			var n = false,
				o = q.ajax,
				r = null,
				s = [],
				O = [],
				v = {},
				w = {};
			this.getActive = function () {
				return n;
			};
			this.setActive = function (i, l) {
				if (!l) {
					l = null;
				} else if (typeof l === "string") {
					l = l.split(",");
				}
				r = l;
				if (n === i) {
					return;
				}
				n = i;
				if (n) {
					for (var $ in v) {
						this[$] = v[$];
					}
					v = {};
					q.ajax = function (a1, b1) {
						if (typeof a1 === 'object') {
							b1 = a1;
							a1 = undefined;
						}
						b1 = b1 || {};
						var c1 = c(a1 || b1.url);
						q.sap.measure.start(c1, "Request for " + c1, "xmlhttprequest");
						var d1 = b1.complete;
						b1.complete = function () {
							q.sap.measure.end(c1);
							if (d1) {
								d1.apply(this, arguments);
							}
						};
						return o.call(this, a1, b1);
					};
				} else if (o) {
					q.ajax = o;
				}
				return n;
			};
			v["start"] = function (i, l, a1) {
				if (!n) {
					return;
				}
				a1 = d(a1);
				if (!a1) {
					return;
				}
				var b1 = q.sap.now(),
					c1 = new M(i, l, b1, 0, a1);
				if (q.sap.log.getLevel("sap.ui.Performance") >= 4 && a.console && console.time) {
					console.time(l + " - " + i);
				}
				if (c1) {
					w[i] = c1;
					return this.getMeasurement(c1.id);
				} else {
					return false;
				}
			};
			v["pause"] = function (i) {
				if (!n) {
					return;
				}
				var l = q.sap.now();
				var a1 = w[i];
				if (a1 && a1.end > 0) {
					return false;
				}
				if (a1 && a1.pause == 0) {
					a1.pause = l;
					if (a1.pause >= a1.resume && a1.resume > 0) {
						a1.duration = a1.duration + a1.pause - a1.resume;
						a1.resume = 0;
					} else if (a1.pause >= a1.start) {
						a1.duration = a1.pause - a1.start;
					}
				}
				if (a1) {
					return this.getMeasurement(a1.id);
				} else {
					return false;
				}
			};
			v["resume"] = function (i) {
				if (!n) {
					return;
				}
				var l = q.sap.now();
				var a1 = w[i];
				if (a1 && a1.pause > 0) {
					a1.pause = 0;
					a1.resume = l;
				}
				if (a1) {
					return this.getMeasurement(a1.id);
				} else {
					return false;
				}
			};
			v["end"] = function (i) {
				if (!n) {
					return;
				}
				var l = q.sap.now();
				var a1 = w[i];
				if (a1 && !a1.end) {
					a1.end = l;
					if (a1.end >= a1.resume && a1.resume > 0) {
						a1.duration = a1.duration + a1.end - a1.resume;
						a1.resume = 0;
					} else if (a1.pause > 0) {
						a1.pause = 0;
					} else if (a1.end >= a1.start) {
						if (a1.average) {
							a1.completeDuration += (a1.end - a1.start);
							a1.count++;
							a1.duration = a1.completeDuration / a1.count;
							a1.start = l;
						} else {
							a1.duration = a1.end - a1.start;
						}
					}
					if (a1.end >= a1.start) {
						a1.time = a1.end - a1.start;
					}
				}
				if (a1) {
					if (q.sap.log.getLevel("sap.ui.Performance") >= 4 && a.console && console.timeEnd) {
						console.timeEnd(a1.info + " - " + i);
					}
					return this.getMeasurement(i);
				} else {
					return false;
				}
			};
			v["clear"] = function () {
				w = {};
			};
			v["remove"] = function (i) {
				delete w[i];
			};
			v["add"] = function (i, l, a1, b1, c1, d1, e1) {
				if (!n) {
					return;
				}
				e1 = d(e1);
				if (!e1) {
					return false;
				}
				var f1 = new M(i, l, a1, b1, e1);
				f1.time = c1;
				f1.duration = d1;
				if (f1) {
					w[i] = f1;
					return this.getMeasurement(f1.id);
				} else {
					return false;
				}
			};
			v["average"] = function (i, l, a1) {
				if (!n) {
					return;
				}
				a1 = d(a1);
				if (!a1) {
					return;
				}
				var b1 = w[i],
					c1 = q.sap.now();
				if (!b1 || !b1.average) {
					this.start(i, l, a1);
					b1 = w[i];
					b1.average = true;
				} else {
					if (!b1.end) {
						b1.completeDuration += (c1 - b1.start);
						b1.count++;
					}
					b1.start = c1;
					b1.end = 0;
				}
				return this.getMeasurement(b1.id);
			};
			this.getMeasurement = function (i) {
				var l = w[i];
				if (l) {
					var a1 = {};
					for (var b1 in l) {
						a1[b1] = l[b1];
					}
					return a1;
				} else {
					return false;
				}
			};
			this.getAllMeasurements = function (i) {
				return this.filterMeasurements(function (l) {
					return l;
				}, i);
			};
			this.filterMeasurements = function () {
				var l, a1, i = 0,
					b1 = [],
					c1 = typeof arguments[i] === "function" ? arguments[i++] : undefined,
					d1 = typeof arguments[i] === "boolean" ? arguments[i++] : undefined,
					e1 = Array.isArray(arguments[i]) ? arguments[i] : [];
				for (var f1 in w) {
					l = this.getMeasurement(f1);
					a1 = (d1 === false && l.end === 0) || (d1 !== false && (!d1 || l.end));
					if (a1 && j(l, e1) && (!c1 || c1(l))) {
						b1.push(l);
					}
				}
				return b1;
			};
			this.registerMethod = function (i, l, a1, b1) {
				var c1 = l[a1];
				if (c1 && typeof c1 === "function") {
					var d1 = s.indexOf(c1) > -1;
					if (!d1) {
						O.push({
							func: c1,
							obj: l,
							method: a1,
							id: i
						});
						l[a1] = function () {
							q.sap.measure.average(i, i + " method average", b1);
							var e1 = c1.apply(this, arguments);
							q.sap.measure.end(i);
							return e1;
						};
						s.push(l[a1]);
						return true;
					}
				} else {
					q.sap.log.debug(a1 + " in not a function. jQuery.sap.measure.register failed");
				}
				return false;
			};
			this.unregisterMethod = function (i, l, a1) {
				var b1 = l[a1],
					c1 = s.indexOf(b1);
				if (b1 && c1 > -1) {
					l[a1] = O[c1].func;
					s.splice(c1, 1);
					O.splice(c1, 1);
					return true;
				}
				return false;
			};
			this.unregisterAllMethods = function () {
				while (O.length > 0) {
					var i = O[0];
					this.unregisterMethod(i.id, i.obj, i.method);
				}
			};
			var K = [];
			var N;
			this.getAllInteractionMeasurements = function (i) {
				if (i) {
					q.sap.measure.endInteraction(true);
				}
				return K;
			};
			this.filterInteractionMeasurements = function (a1) {
				var b1 = [];
				if (a1) {
					for (var i = 0, l = K.length; i < l; i++) {
						if (a1(K[i])) {
							b1.push(K[i]);
						}
					}
				}
				return b1;
			};
			this.getPendingInteractionMeasurement = function () {
				return N;
			};
			this.clearInteractionMeasurements = function () {
				K = [];
			};

			function Q(i) {
				if (i.start > N.start && i.end < N.end) {
					return i;
				}
			}

			function R(i) {
				return i.startTime > 0 && i.startTime <= i.requestStart && i.requestStart <= i.responseEnd;
			}

			function T(i) {
				this.end = i.responseEnd > this.end ? i.responseEnd : this.end;
				N.requestTime += (i.responseEnd - i.startTime);
				if (this.roundtripHigherLimit <= i.startTime) {
					N.navigation += (this.navigationHigherLimit - this.navigationLowerLimit);
					N.roundtrip += (this.roundtripHigherLimit - this.roundtripLowerLimit);
					this.navigationLowerLimit = i.startTime;
					this.roundtripLowerLimit = i.startTime;
				}
				if (i.responseEnd > this.roundtripHigherLimit) {
					this.roundtripHigherLimit = i.responseEnd;
				}
				if (i.requestStart > this.navigationHigherLimit) {
					this.navigationHigherLimit = i.requestStart;
				}
			}

			function U(i) {
				var l = {
					start: i[0].startTime,
					end: i[0].responseEnd,
					navigationLowerLimit: i[0].startTime,
					navigationHigherLimit: i[0].requestStart,
					roundtripLowerLimit: i[0].startTime,
					roundtripHigherLimit: i[0].responseEnd
				};
				i.forEach(T, l);
				N.navigation += (l.navigationHigherLimit - l.navigationLowerLimit);
				N.roundtrip += (l.roundtripHigherLimit - l.roundtripLowerLimit);
				if (N.networkTime) {
					var a1 = N.requestTime - N.networkTime;
					N.networkTime = a1 / i.length;
				} else {
					N.networkTime = 0;
				}
				if (N.processing === 0) {
					var b1 = N.start - a.performance.timing.fetchStart;
					N.duration = l.end - b1;
					N.processing = l.start - b1;
				}
			}

			function W(i) {
				if (N) {
					N.end = i;
					N.duration = N.processing;
					N.requests = q.sap.measure.getRequestTimings();
					N.incompleteRequests = 0;
					N.measurements = q.sap.measure.filterMeasurements(Q, true);
					var l = N.requests.filter(R);
					if (l.length > 0) {
						U(l);
						N.incompleteRequests = N.requests.length - l.length;
					}
					var a1 = N.processing - N.navigation - N.roundtrip;
					N.processing = a1 > -1 ? a1 : 0;
					K.push(N);
					q.sap.log.info("Interaction step finished: trigger: " + N.trigger + "; duration: " + N.duration + "; requests: " + N.requests.length, "jQuery.sap.measure");
					N = null;
				}
			}

			function X(i) {
				var l, a1;
				if (i) {
					var b1, c1;
					b1 = sap.ui.require("sap/ui/core/Component");
					while (b1 && i && i.getParent) {
						c1 = b1.getOwnerComponentFor(i);
						if (c1 || i instanceof b1) {
							c1 = c1 || i;
							var d1 = c1.getManifestEntry("sap.app");
							l = d1 && d1.id || c1.getMetadata().getName();
							a1 = d1 && d1.applicationVersion && d1.applicationVersion.version;
						}
						i = i.getParent();
					}
				}
				return {
					id: l ? l : "undetermined",
					version: a1 ? a1 : ""
				};
			}
			this.startInteraction = function (i, l) {
				var a1 = q.sap.now();
				if (N) {
					W(a1);
				}
				this.clearRequestTimings();
				var b1 = X(l);
				N = {
					event: i,
					trigger: l && l.getId ? l.getId() : "undetermined",
					component: b1.id,
					appVersion: b1.version,
					start: a1,
					end: 0,
					navigation: 0,
					roundtrip: 0,
					processing: 0,
					duration: 0,
					requests: [],
					measurements: [],
					sapStatistics: [],
					requestTime: 0,
					networkTime: 0,
					bytesSent: 0,
					bytesReceived: 0,
					requestCompression: undefined,
					busyDuration: 0
				};
				q.sap.log.info("Interaction step started: trigger: " + N.trigger + "; type: " + N.event, "jQuery.sap.measure");
			};
			this.endInteraction = function (i) {
				if (N) {
					if (!i) {
						N.processing = q.sap.now() - N.start;
					} else {
						W(q.sap.now());
					}
				}
			};
			this.setRequestBufferSize = function (i) {
				if (!a.performance) {
					return;
				}
				if (a.performance.setResourceTimingBufferSize) {
					a.performance.setResourceTimingBufferSize(i);
				} else if (a.performance.webkitSetResourceTimingBufferSize) {
					a.performance.webkitSetResourceTimingBufferSize(i);
				}
			};
			this.getRequestTimings = function () {
				if (a.performance && a.performance.getEntriesByType) {
					return a.performance.getEntriesByType("resource");
				}
				return [];
			};
			this.clearRequestTimings = function () {
				if (!a.performance) {
					return;
				}
				if (a.performance.clearResourceTimings) {
					a.performance.clearResourceTimings();
				} else if (a.performance.webkitClearResourceTimings) {
					a.performance.webkitClearResourceTimings();
				}
			};
			this.setRequestBufferSize(1000);
			var Y = location.search.match(/sap-ui-measure=([^\&]*)/);
			if (Y && Y[1]) {
				if (Y[1] === "true" || Y[1] === "x" || Y[1] === "X") {
					this.setActive(true);
				} else {
					this.setActive(true, Y[1]);
				}
			} else {
				var Z = function () {
					return null;
				};
				for (var $ in v) {
					this[$] = Z;
				}
			}
		}
		q.sap.measure = new P();

		function S(n, d, T) {
			var i = [],
				o = 0,
				j = 0,
				s;
			this.startTask = function (m) {
				var r = i.length;
				i[r] = {
					name: m,
					finished: false
				};
				o++;
				return r;
			};
			this.finishTask = function (m, r) {
				if (!i[m] || i[m].finished) {
					throw new Error("trying to finish non existing or already finished task");
				}
				i[m].finished = true;
				o--;
				if (r === false) {
					j++;
				}
				if (o === 0) {
					q.sap.log.info("Sync point '" + n + "' finished (tasks:" + i.length + ", open:" + o + ", failures:" + j + ")");
					if (s) {
						clearTimeout(s);
						s = null;
					}
					l();
				}
			};

			function l() {
				d && d(o, j);
				d = null;
			}
			if (!isNaN(T)) {
				s = setTimeout(function () {
					q.sap.log.info("Sync point '" + n + "' timed out (tasks:" + i.length + ", open:" + o + ", failures:" + j + ")");
					l();
				}, T);
			}
			q.sap.log.info("Sync point '" + n + "' created" + (T ? "(timeout after " + T + " ms)" : ""));
		}
		q.sap.syncPoint = function (n, d, T) {
			return new S(n, d, T);
		};
		var x = (function () {
			var o = q.sap.log.getLogger("sap.ui.ModuleSystem", (/sap-ui-xx-debug(M|-m)odule(L|-l)oading=(true|x|X)/.test(location.search) || p["xx-debugModuleLoading"]) ? q.sap.log.Level.DEBUG : q.sap.log.Level.INFO),
				U = {
					'': {
						'url': 'resources/'
					}
				},
				r = 0,
				v = -1,
				w = 1,
				K = 2,
				M = 3,
				R = 4,
				N = 5,
				O = {},
				Q = {},
				T = {},
				W = !(/(?:^|\?|&)sap-ui-(?:xx-)?preload=async(?:&|$)/.test(location.search) || p.preload === 'async' || p['xx-preload'] === 'async'),
				X = {
					'sap/ui/thirdparty/blanket.js': {
						amd: true,
						exports: 'blanket'
					},
					'sap/ui/thirdparty/caja-html-sanitizer.js': {
						amd: false,
						exports: 'html'
					},
					'sap/ui/thirdparty/crossroads.js': {
						amd: true,
						exports: 'crossroads',
						deps: ['sap/ui/thirdparty/signals']
					},
					'sap/ui/thirdparty/d3.js': {
						amd: true,
						exports: 'd3'
					},
					'sap/ui/thirdparty/datajs.js': {
						amd: true,
						exports: 'OData'
					},
					'sap/ui/thirdparty/es6-promise.js': {
						amd: true,
						exports: 'ES6Promise'
					},
					'sap/ui/thirdparty/flexie.js': {
						exports: 'Flexie'
					},
					'sap/ui/thirdparty/handlebars.js': {
						amd: true,
						exports: 'Handlebars'
					},
					'sap/ui/thirdparty/hasher.js': {
						amd: true,
						exports: 'hasher',
						deps: ['sap/ui/thirdparty/signals']
					},
					'sap/ui/thirdparty/IPv6.js': {
						amd: true,
						exports: 'IPv6'
					},
					'sap/ui/thirdparty/iscroll-lite.js': {
						exports: 'iScroll'
					},
					'sap/ui/thirdparty/iscroll.js': {
						exports: 'iScroll'
					},
					'sap/ui/thirdparty/jquery.js': {
						amd: true
					},
					'sap/ui/thirdparty/jquery-mobile-custom.js': {
						amd: true,
						exports: 'jQuery.mobile'
					},
					'sap/ui/thirdparty/jszip.js': {
						amd: true,
						exports: 'JSZip'
					},
					'sap/ui/thirdparty/less.js': {
						amd: true,
						exports: 'less'
					},
					'sap/ui/thirdparty/mobify-carousel.js': {
						exports: 'Mobify'
					},
					'sap/ui/thirdparty/punycode.js': {
						amd: true,
						exports: 'punycode'
					},
					'sap/ui/thirdparty/require.js': {
						exports: 'define'
					},
					'sap/ui/thirdparty/SecondLevelDomains.js': {
						amd: true,
						exports: 'SecondLevelDomains'
					},
					'sap/ui/thirdparty/signals.js': {
						amd: true,
						exports: 'signals'
					},
					'sap/ui/thirdparty/sinon.js': {
						amd: true,
						exports: 'sinon'
					},
					'sap/ui/thirdparty/sinon-server.js': {
						amd: true,
						exports: 'sinon'
					},
					'sap/ui/thirdparty/unorm.js': {
						exports: 'UNorm'
					},
					'sap/ui/thirdparty/unormdata.js': {
						exports: 'UNorm',
						deps: ['sap/ui/thirdparty/unorm']
					},
					'sap/ui/thirdparty/URI.js': {
						amd: true,
						exports: 'URI'
					},
					'sap/ui/thirdparty/URITemplate.js': {
						amd: true,
						exports: 'URITemplate',
						deps: ['sap/ui/thirdparty/URI']
					},
					'sap/ui/thirdparty/vkbeautify.js': {
						exports: 'vkbeautify'
					},
					'sap/ui/thirdparty/zyngascroll.js': {
						exports: 'Scroller'
					},
					'sap/ui/demokit/js/esprima.js': {
						amd: true,
						exports: 'esprima'
					},
					'sap/ui/thirdparty/RequestRecorder.js': {
						amd: true,
						exports: 'RequestRecorder',
						deps: ['sap/ui/thirdparty/URI', 'sap/ui/thirdparty/sinon']
					}
				},
				Y = [],
				Z = "",
				$ = 512 * 1024,
				a1 = "fragment",
				b1 = "view",
				c1 = {
					js: [b1, a1, "controller", "designtime"],
					xml: [b1, a1],
					json: [b1, a1],
					html: [b1, a1]
				},
				d1 = new RegExp("(\\.(?:" + c1.js.join("|") + "))?\\.js$"),
				e1, f1;
			(function () {
				var s = "",
					d = "";
				q.each(c1, function (i, j) {
					s = (s ? s + "|" : "") + i;
					d = (d ? d + "|" : "") + "(?:(?:" + j.join("\\.|") + "\\.)?" + i + ")";
				});
				s = "\\.(" + s + ")$";
				d = "\\.(?:" + d + "|[^./]+)$";
				o.debug("constructed regexp for file types :" + s);
				o.debug("constructed regexp for file sub-types :" + d);
				e1 = new RegExp(s);
				f1 = new RegExp(d);
			}());
			var g1;
			(function () {
				var d = a["sap-ui-debug"];

				function m(j) {
					if (!/\/\*\*\/$/.test(j)) {
						j = j.replace(/\/$/, '/**/');
					}
					return j.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g, function (l) {
						switch (l) {
							case '**/':
								return '(?:[^/]+/)*';
							case '*':
								return '[^/]*';
							default:
								return '\\' + l;
						}
					});
				}
				if (typeof d === 'string') {
					var s = "^(?:" + d.split(/,/).map(m).join("|") + ")",
						i = new RegExp(s);
					g1 = function (j) {
						return i.test(j);
					};
					o.debug("Modules that should be excluded from preload: '" + s + "'");
				} else if (d === true) {
					g1 = function () {
						return true;
					};
					o.debug("All modules should be excluded from preload");
				}
			})();

			function h1(d) {
				this.name = d;
				this.state = r;
				this.url = this.loaded = this.data = this.group = null;
				this.content = O;
			}
			h1.prototype.ready = function (d, i) {
				if (this.state === r) {
					this.state = R;
					this.url = d;
					this.content = i;
				}
				return this;
			};
			h1.prototype.preload = function (d, i, j) {
				if (this.state === r && !(g1 && g1(this.name))) {
					this.state = v;
					this.url = d;
					this.data = i;
					this.group = j;
				}
				return this;
			};
			h1.get = function (m) {
				return Q[m] || (Q[m] = new h1(m));
			};
			h1.prototype.value = function () {
				if (this.state === R) {
					if (this.content === O) {
						var s = X[this.name],
							d = s && (Array.isArray(s.exports) ? s.exports[0] : s.exports);
						this.content = q.sap.getObject(d || j1(this.name));
					}
					return this.content;
				}
				return;
			};
			h1.get("sap/ui/thirdparty/URI.js").ready(f, URI);
			h1.get("sap/ui/Device.js").ready(f, D);
			h1.get("jquery.sap.global.js").ready(f, q);

			function i1(s) {
				if (/^jquery\.sap\./.test(s)) {
					return s;
				}
				return s.replace(/\./g, "/");
			}

			function j1(s) {
				if (!/\.js$/.test(s)) {
					return;
				}
				s = s.slice(0, -3);
				if (/^jquery\.sap\./.test(s)) {
					return s;
				}
				return s.replace(/\//g, ".");
			}

			function k1(s, d) {
				var i = s.split(/\//),
					l, j, v1, m;
				if (arguments.length === 1 && i.length > 0) {
					m = f1.exec(i[i.length - 1]);
					if (m) {
						d = m[0];
						i[i.length - 1] = i[i.length - 1].slice(0, m.index);
					} else {
						d = "";
					}
				}
				for (l = i.length; l >= 0; l--) {
					j = i.slice(0, l).join('/');
					if (U[j]) {
						v1 = U[j].url;
						if (l < i.length) {
							v1 += i.slice(l).join('/');
						}
						if (v1.slice(-1) === '/') {
							v1 = v1.slice(0, -1);
						}
						return v1 + (d || '');
					}
				}
			}

			function l1(s) {
				var d, i, j;
				s = c(s);
				for (d in U) {
					if (U.hasOwnProperty(d)) {
						i = U[d].absoluteUrl.slice(0, -1);
						if (s.indexOf(i) === 0) {
							j = d + s.slice(i.length);
							if (j.charAt(0) === '/') {
								j = j.slice(1);
							}
							if (Q[j] && Q[j].data) {
								return j;
							}
						}
					}
				}
			}

			function m1(d) {
				if (!d.stack) {
					try {
						throw d;
					} catch (i) {
						return i.stack;
					}
				}
				return d.stack;
			}

			function n1(d, i) {
				if (!D.browser.phantomJS) {
					var j = m1(d);
					if (j && i) {
						d.stack = j + "\nCaused by: " + i;
					}
				}
				if (a.console && !D.browser.chrome) {
					console.error(d.message + "\nCaused by: " + i);
				}
			}
			var o1 = /(?:^|\/)\.+/;
			var p1 = /^\.*$/;

			function q1(s, d) {
				var m = o1.exec(d),
					v1, w1, i, j, l;
				if (!m) {
					return d;
				}
				if (m.index === 0 && s == null) {
					throw new Error("relative name not supported ('" + d + "'");
				}
				v1 = (m.index === 0 ? s + d : d).split('/');
				for (i = 0, j = 0, l = v1.length; i < l; i++) {
					var w1 = v1[i];
					if (p1.test(w1)) {
						if (w1 === '.' || w1 === '') {
							continue;
						} else if (w1 === '..') {
							if (j === 0) {
								throw new Error("Can't navigate to parent of root (base='" + s + "', name='" + d + "'");
							}
							j--;
						} else {
							throw new Error("illegal path segment '" + w1 + "'");
						}
					} else {
						v1[j++] = w1;
					}
				}
				v1.length = j;
				return v1.join('/');
			}

			function r1(m) {
				var d;
				d = h1.get(m);
				if (d.state > r) {
					return d;
				}
				if (o.isLoggable()) {
					o.debug(Z + "declare module '" + m + "'");
				}
				d.state = R;
				if (Y.length === 0) {
					Y.push(m);
					d.url = d.url || f;
				}
				return d;
			}

			function s1(d, s, j) {
				var l = o.isLoggable(),
					m = d1.exec(s),
					v1 = X[s],
					w1, x1, y1, z1, i, A1;
				if (!m) {
					throw new Error("can only require Javascript module, not " + s);
				}
				y1 = h1.get(s);
				if (v1 && v1.deps && !v1.deps.requested) {
					if (l) {
						o.debug("require dependencies of raw module " + s);
					}
					return u1(y1, v1.deps, function () {
						v1.deps.requested = true;
						return s1(d, s, j);
					}, j);
				}
				w1 = s.slice(0, m.index);
				x1 = m[0];
				if (l) {
					o.debug(Z + "require '" + s + "' of type '" + x1 + "'");
				}
				if (y1.state !== r) {
					if (y1.state === v) {
						y1.state = K;
						q.sap.measure.start(s, "Require module " + s + " (preloaded)", ["require"]);
						t1(s, j);
						q.sap.measure.end(s);
					}
					if (y1.state === R) {
						if (l) {
							o.debug(Z + "module '" + s + "' has already been loaded (skipped).");
						}
						return y1.value();
					} else if (y1.state === N) {
						var B1 = new Error("found in negative cache: '" + s + "' from " + y1.url + ": " + y1.errorMessage);
						n1(B1, y1.errorStack);
						throw B1;
					} else {
						return;
					}
				}
				q.sap.measure.start(s, "Require module " + s, ["require"]);
				y1.state = w;
				z1 = a["sap-ui-loaddbg"] ? ["-dbg", ""] : [""];
				for (i = 0; i < z1.length && y1.state !== K; i++) {
					y1.url = k1(w1, z1[i] + x1);
					if (l) {
						o.debug(Z + "loading " + (z1[i] ? z1[i] + " version of " : "") + "'" + s + "' from '" + y1.url + "'");
					}
					if (!j && t && s !== 'sap/ui/core/Core.js') {
						A1 = "[nosync] loading module '" + y1.url + "'";
						if (t === 1) {
							o.error(A1);
						} else {
							throw new Error(A1);
						}
					}
					q.ajax({
						url: y1.url,
						dataType: 'text',
						async: false,
						success: function (C1, D1, E1) {
							y1.state = K;
							y1.data = C1;
						},
						error: function (C1, D1, E1) {
							y1.state = N;
							y1.errorMessage = C1 ? C1.status + " - " + C1.statusText : D1;
							y1.errorStack = E1 && E1.stack;
							y1.loadError = true;
						}
					});
				}
				if (y1.state === K) {
					t1(s, j);
				}
				q.sap.measure.end(s);
				if (y1.state !== R) {
					if (a["sap-ui-debug"]) {
						q.sap.includeScript(y1.url);
					}
					var B1 = new Error("failed to load '" + s + "' from " + y1.url + ": " + y1.errorMessage);
					n1(B1, y1.errorStack);
					B1.loadError = y1.loadError;
					throw B1;
				}
				return y1.value();
			}

			function callPreloadWrapperFn(fn) {
				callPreloadWrapperFn.count++;
				return fn.call(a);
			}
			callPreloadWrapperFn.count = 0;

			function applyAMDFactoryFn(fn, dep) {
				applyAMDFactoryFn.count++;
				return fn.apply(a, dep);
			}
			applyAMDFactoryFn.count = 0;

			function evalModuleStr(script) {
				evalModuleStr.count++;
				return a.eval(script);
			}
			evalModuleStr.count = 0;

			function t1(m, d) {
				var i = Q[m],
					s = X[m],
					l = o.isLoggable(),
					j, v1, w1, x1, y1;
				if (i && i.state === K && typeof i.data !== "undefined") {
					w1 = (s === true || (s && s.amd)) && typeof a.define === "function" && a.define.amd;
					y1 = W;
					try {
						if (w1) {
							delete a.define.amd;
						}
						W = d;
						if (l) {
							o.debug(Z + "executing '" + m + "'");
							j = Z;
							Z = Z + ": ";
						}
						i.state = M;
						Y.push(m);
						if (typeof i.data === "function") {
							callPreloadWrapperFn(i.data);
						} else if (Array.isArray(i.data)) {
							sap.ui.define.apply(sap.ui, i.data);
						} else {
							v1 = i.data;
							if (v1) {
								x1 = /\/\/[#@] source(Mapping)?URL=(.*)$/.exec(v1);
								if (x1 && x1[1] && /[^/]+\.js\.map$/.test(x1[2])) {
									v1 = v1.slice(0, x1.index) + x1[0].slice(0, -x1[2].length) + URI(x1[2]).absoluteTo(i.url);
								} else if (!x1) {
									v1 += "\n//# sourceURL=" + c(i.url);
									if (D.browser.safari || D.browser.chrome) {
										v1 += "?eval";
									}
								}
							}
							if (typeof q.sap.require._hook === "function") {
								v1 = q.sap.require._hook(v1, m);
							}
							if (a.execScript && (!i.data || i.data.length < $)) {
								try {
									i.data && a.execScript(v1);
								} catch (e) {
									Y.pop();
									q.sap.globalEval(i.data);
									throw e;
								}
							} else {
								evalModuleStr(v1);
							}
						}
						Y.pop();
						i.state = R;
						i.data = undefined;
						i.value();
						if (l) {
							Z = j;
							o.debug(Z + "finished executing '" + m + "'");
						}
					} catch (z1) {
						i.state = N;
						i.errorStack = z1 && z1.stack;
						i.errorMessage = ((z1.toString && z1.toString()) || z1.message) + (z1.line ? "(line " + z1.line + ")" : "");
						i.data = undefined;
					} finally {
						if (w1) {
							a.define.amd = w1;
						}
						W = y1;
					}
				}
			}

			function u1(d, j, l, m) {
				var s = [],
					v1 = o.isLoggable(),
					w1, i, x1;
				w1 = d && d.name.slice(0, d.name.lastIndexOf('/') + 1);
				j = j.slice();
				for (i = 0; i < j.length; i++) {
					j[i] = q1(w1, j[i]) + ".js";
				}
				for (i = 0; i < j.length; i++) {
					x1 = j[i];
					if (v1) {
						o.debug(Z + "require '" + x1 + "'");
					}
					s[i] = s1(d, x1, m);
					if (v1) {
						o.debug(Z + "require '" + x1 + "': done.");
					}
				}
				return l(s);
			}
			q.sap.getModulePath = function (m, s) {
				return k1(i1(m), s);
			};
			q.sap.getResourcePath = k1;
			q.sap.registerModulePath = function registerModulePath(m, d) {
				m = m.replace(/\./g, "/");
				d = d || '.';
				q.sap.registerResourcePath(m, d);
			};
			q.sap.registerResourcePath = function registerResourcePath(s, d) {
				function i(m, v1) {
					return m.url === v1.url && !m["final"] === !v1["final"];
				}
				s = String(s || "");
				if (typeof d === 'string' || d instanceof String) {
					d = {
						'url': d
					};
				}
				var j = U[s];
				if (j && j["final"] == true) {
					if (!d || !i(j, d)) {
						o.warning("registerResourcePath with prefix " + s + " already set as final to '" + j.url + "'. This call is ignored.");
					}
					return;
				}
				if (!d || d.url == null) {
					if (j) {
						delete U[s];
						o.info("registerResourcePath ('" + s + "') (registration removed)");
					}
				} else {
					d.url = String(d.url);
					var l = d.url.search(/[?#]/);
					if (l !== -1) {
						d.url = d.url.slice(0, l);
					}
					if (d.url.slice(-1) != '/') {
						d.url += '/';
					}
					d.absoluteUrl = c(d.url);
					U[s] = d;
					if (!j || !i(j, d)) {
						o.info("registerResourcePath ('" + s + "', '" + d.url + "')" + (d['final'] ? " (final)" : ""));
					}
				}
			};
			q.sap.registerModuleShims = function (s) {
				for (var d in s) {
					var i = s[d];
					if (Array.isArray(i)) {
						i = {
							deps: i
						};
					}
					X[d + ".js"] = i;
				}
			};
			q.sap.isDeclared = function isDeclared(m, i) {
				m = i1(m) + ".js";
				return Q[m] && (i || Q[m].state !== v);
			};
			q.sap.isResourceLoaded = function isResourceLoaded(s) {
				return !!Q[s];
			};
			q.sap.getAllDeclaredModules = function () {
				var m = [];
				q.each(Q, function (s, d) {
					if (d && d.state !== v) {
						var i = j1(s);
						if (i) {
							m.push(i);
						}
					}
				});
				return m;
			};
			if (p.resourceroots) {
				q.each(p.resourceroots, q.sap.registerModulePath);
			}
			o.info("URL prefixes set to:");
			for (var n in U) {
				o.info("  " + (n ? "'" + n + "'" : "(default)") + " : " + U[n].url + ((U[n]['final']) ? " (final)" : ""));
			}
			q.sap.declare = function (m, d) {
				var s = m;
				if (typeof (m) === "object") {
					s = m.modName;
					m = i1(m.modName) + (m.type ? "." + m.type : "") + ".js";
				} else {
					m = i1(m) + ".js";
				}
				r1(m);
				if (d !== false) {
					q.sap.getObject(s, 1);
				}
			};
			q.sap.require = function (m) {
				if (arguments.length > 1) {
					for (var i = 0; i < arguments.length; i++) {
						q.sap.require(arguments[i]);
					}
					return this;
				}
				if (typeof (m) === "object") {
					m = i1(m.modName) + (m.type ? "." + m.type : "") + ".js";
				} else {
					m = i1(m) + ".js";
				}
				s1(null, m, false);
			};
			a.sap = a.sap || {};
			sap.ui = sap.ui || {};
			sap.ui.define = function (m, d, i, j) {
				var l = o.isLoggable(),
					s;
				if (typeof m === 'string') {
					s = m + '.js';
				} else {
					j = i;
					i = d;
					d = m;
					s = Y[Y.length - 1];
				}
				m = j1(s);
				if (!Array.isArray(d)) {
					j = i;
					i = d;
					d = [];
				}
				if (l) {
					o.debug("define(" + s + ", " + "['" + d.join("','") + "']" + ")");
				}
				var v1 = r1(s);
				v1.content = undefined;
				u1(v1, d, function (w1) {
					if (l) {
						o.debug("define(" + s + "): calling factory " + typeof i);
					}
					if (j && t !== 2) {
						var x1 = s.split('/').slice(0, -1).join('.');
						if (x1) {
							q.sap.getObject(x1, 0);
						}
					}
					if (typeof i === 'function') {
						v1.content = applyAMDFactoryFn(i, w1);
					} else {
						v1.content = i;
					}
					if (j && t !== 2) {
						if (v1.content == null) {
							o.error("module '" + s + "' returned no content, but should be exported");
						} else {
							if (l) {
								o.debug("exporting content of '" + s + "': as global object");
							}
							q.sap.setObject(m, v1.content);
						}
					}
				}, W);
			};
			sap.ui.predefine = function (m, d, i, j) {
				if (typeof m !== 'string') {
					throw new Error("sap.ui.predefine requires a module name");
				}
				var s = m + '.js';
				h1.get(s).preload("<unknown>/" + m, [m, d, i, j], null);
				if (s.match(/\/library\.js$/)) {
					T[j1(s) + "-preload"] = true;
				}
			};
			sap.ui.require = function (d, i) {
				if (typeof d === 'string') {
					return h1.get(d + '.js').value();
				}
				u1(null, d, function (m) {
					if (typeof i === 'function') {
						setTimeout(function () {
							i.apply(a, m);
						}, 0);
					}
				}, true);
			};
			sap.ui.require.stat = function (s) {
				var i = 0;
				Object.keys(Q).sort().forEach(function (m) {
					if (Q[m].state >= s) {
						o.info((++i) + " " + m + " " + Q[m].state);
					}
				});
				o.info("apply AMD factory function: #" + applyAMDFactoryFn.count);
				o.info("call preload wrapper function: #" + callPreloadWrapperFn.count);
				o.info("eval module string : #" + evalModuleStr.count);
			};
			sap.ui.requireSync = function (m) {
				return s1(null, m + ".js", false);
			};
			q.sap.preloadModules = function (s, d, i) {
				var j, l, m;
				q.sap.log.error("[Deprecated] jQuery.sap.preloadModules was never a public API and will be removed soon. Migrate to Core.loadLibraries()!");
				if (!d && t) {
					m = "[nosync] synchronous preload of '" + s + "'";
					if (t === 1) {
						o.warning(m);
					} else {
						throw new Error(m);
					}
				}
				if (T[s]) {
					return;
				}
				T[s] = true;
				j = q.sap.getModulePath(s, ".json");
				o.debug("preload file " + s);
				l = i && i.startTask("load " + s);
				q.ajax({
					dataType: "json",
					async: d,
					url: j,
					success: function (v1) {
						if (v1) {
							q.sap.registerPreloadedModules(v1, j);
							if (Array.isArray(v1.dependencies)) {
								v1.dependencies.forEach(function (w1) {
									q.sap.preloadModules(w1, d, i);
								});
							}
						}
						i && i.finishTask(l);
					},
					error: function (v1, w1, x1) {
						o.error("failed to preload '" + s + "': " + (x1 || w1));
						i && i.finishTask(l, false);
					}
				});
			};
			q.sap.registerPreloadedModules = function (d) {
				var i = V(d.version || "1.0").compareTo("2.0") < 0;
				if (o.isLoggable()) {
					o.debug(Z + "adding preloaded modules from '" + d.url + "'");
				}
				if (d.name) {
					T[d.name] = true;
				}
				q.each(d.modules, function (s, j) {
					s = i ? i1(s) + ".js" : s;
					h1.get(s).preload(d.url + "/" + s, j, d.name);
					if (s.match(/\/library\.js$/)) {
						T[j1(s) + "-preload"] = true;
					}
				});
			};
			q.sap.unloadResources = function (s, d, j, l) {
				var m = [];
				if (d == null) {
					d = true;
				}
				if (d) {
					q.each(Q, function (i, v1) {
						if (v1 && v1.group === s) {
							m.push(i);
						}
					});
					delete T[s];
				} else {
					if (Q[s]) {
						m.push(s);
					}
				}
				q.each(m, function (i, v1) {
					var w1 = Q[v1];
					if (w1 && l && v1.match(/\.js$/)) {
						q.sap.setObject(j1(v1), undefined);
					}
					if (w1 && (j || w1.state === v)) {
						delete Q[v1];
					}
				});
			};
			q.sap.getResourceName = function (m, s) {
				return i1(m) + (s == null ? ".js" : s);
			};
			q.sap.loadResource = function (s, m) {
				var i, j, l, v1, w1;
				if (typeof s === "string") {
					m = m || {};
				} else {
					m = s || {};
					s = m.name;
					if (!s && m.url) {
						s = l1(m.url);
					}
				}
				m = q.extend({
					failOnError: true,
					async: false
				}, m);
				i = m.dataType;
				if (i == null && s) {
					i = (i = e1.exec(s)) && i[1];
				}
				w1 = m.async ? new q.Deferred() : null;

				function x1(d, e) {
					if (d == null && m.failOnError) {
						v1 = e || new Error("no data returned for " + s);
						if (m.async) {
							w1.reject(v1);
							q.sap.log.error(v1);
						}
						return null;
					}
					if (m.async) {
						w1.resolve(d);
					}
					return d;
				}

				function y1(d) {
					var z1 = q.ajaxSettings.converters["text " + i];
					if (typeof z1 === "function") {
						d = z1(d);
					}
					return x1(d);
				}
				if (s && Q[s]) {
					j = Q[s].data;
					Q[s].state = K;
				}
				if (j != null) {
					if (m.async) {
						setTimeout(function () {
							y1(j);
						}, 0);
					} else {
						j = y1(j);
					}
				} else {
					if (!m.async && t) {
						if (t >= 1) {
							o.error("[nosync] loading resource '" + (s || m.url) + "' with sync XHR");
						} else {
							throw new Error("[nosync] loading resource '" + (s || m.url) + "' with sync XHR");
						}
					}
					q.ajax({
						url: l = m.url || k1(s),
						async: m.async,
						dataType: i,
						headers: m.headers,
						success: function (d, z1, A1) {
							j = x1(d);
						},
						error: function (d, z1, A1) {
							v1 = new Error("resource " + s + " could not be loaded from " + l + ". Check for 'file not found' or parse errors. Reason: " + A1);
							v1.status = z1;
							v1.error = A1;
							v1.statusCode = d.status;
							j = x1(null, v1);
						}
					});
				}
				if (m.async) {
					return Promise.resolve(w1);
				}
				if (v1 != null && m.failOnError) {
					throw v1;
				}
				return j;
			};
			q.sap._loadJSResourceAsync = function (s, i) {
				var m = h1.get(s);
				if (!m.loaded) {
					var d;
					var j = function (l) {
						return new Promise(function (v1, w1) {
							function x1(e) {
								q.sap.log.info("Javascript resource loaded: " + s);
								d.removeEventListener('load', x1);
								d.removeEventListener('error', y1);
								m.state = R;
								v1();
							}

							function y1(e) {
								d.removeEventListener('load', x1);
								d.removeEventListener('error', y1);
								if (l) {
									o.warning("retry loading Javascript resource: " + s);
								} else {
									o.error("failed to load Javascript resource: " + s);
									m.state = N;
								}
								w1();
							}
							var z1 = m.url = k1(s);
							m.state = w;
							d = a.document.createElement('SCRIPT');
							d.src = z1;
							d.setAttribute("data-sap-ui-module", s);
							d.addEventListener('load', x1);
							d.addEventListener('error', y1);
							y(d);
						});
					};
					m.loaded = j(true).catch(function (e) {
						if (d && d.parentNode) {
							d.parentNode.removeChild(d);
						}
						return j(false);
					});
				}
				if (i) {
					return m.loaded.catch(function () {
						return undefined;
					});
				}
				return m.loaded;
			};
			return function () {
				var m = {};
				q.each(U, function (s, d) {
					m[s] = d.url;
				});
				return {
					modules: Q,
					prefixes: m
				};
			};
		}());

		function y(o) {
			var d = a.document.getElementsByTagName("head")[0];
			if (d) {
				d.appendChild(o);
			}
		}

		function z(U, m, l, d) {
			var s = a.document.createElement("script");
			s.src = U;
			s.type = "text/javascript";
			if (m && typeof m === "object") {
				Object.keys(m).forEach(function (K) {
					if (m[K] != null) {
						s.setAttribute(K, m[K]);
					}
				});
			}
			if (l) {
				q(s).load(function () {
					l();
					q(s).off("load");
				});
			}
			if (d) {
				q(s).error(function () {
					d();
					q(s).off("error");
				});
			}
			var o, i = m && m.id;
			if ((i && (o = q.sap.domById(i)) && o.tagName === "SCRIPT")) {
				q(o).remove();
			}
			y(s);
		}
		q.sap.includeScript = function includeScript(U, i, l, d) {
			if (typeof U === "string") {
				var m = typeof i === "string" ? {
					id: i
				} : i;
				z(U, m, l, d);
			} else {
				if (U.id) {
					U.attributes = U.attributes || {};
					U.attributes.id = U.id;
				}
				return new Promise(function (r, R) {
					z(U.url, U.attributes, r, R);
				});
			}
		};

		function A(U, m, l, d) {
			var i = function (U, m, l, d) {
				var j = document.createElement("link");
				j.type = "text/css";
				j.rel = "stylesheet";
				j.href = U;
				if (m && typeof m === "object") {
					Object.keys(m).forEach(function (K) {
						if (m[K] != null) {
							j.setAttribute(K, m[K]);
						}
					});
				}
				var n = function () {
					q(j).attr("data-sap-ui-ready", "false").off("error");
					if (d) {
						d();
					}
				};
				var r = function () {
					q(j).attr("data-sap-ui-ready", "true").off("load");
					if (l) {
						l();
					}
				};
				if (D.browser.msie || D.browser.edge) {
					var s = r;
					r = function (v) {
						var R;
						try {
							R = v.target && v.target.sheet && v.target.sheet.rules;
						} catch (w) {}
						if (R && R.length > 0) {
							s();
						} else {
							n();
						}
					};
				}
				q(j).load(r);
				q(j).error(n);
				return j;
			};
			var o = q.sap.domById(m && m.id);
			var j = i(U, m, l, d);
			if (o && o.tagName === "LINK" && o.rel === "stylesheet") {
				if (l || d || o.href !== c(U)) {
					if (o.getAttribute("data-sap-ui-foucmarker") === j.id) {
						q(o).removeAttr("id").before(j);
					} else {
						q(o).replaceWith(j);
					}
				} else {
					if (o.getAttribute("data-sap-ui-foucmarker") === j.id) {
						o.removeAttribute("data-sap-ui-foucmarker");
					}
				}
			} else {
				o = q('#sap-ui-core-customcss');
				if (o.length > 0) {
					o.first().before(j);
				} else {
					y(j);
				}
			}
		}
		q.sap.includeStyleSheet = function includeStyleSheet(U, i, l, d) {
			if (typeof U === "string") {
				var m = typeof i === "string" ? {
					id: i
				} : i;
				A(U, m, l, d);
			} else {
				if (U.id) {
					U.attributes = U.attributes || {};
					U.attributes.id = U.id;
				}
				return new Promise(function (r, R) {
					A(U.url, U.attributes, r, R);
				});
			}
		};
		if (!(p.productive === true || p.productive === "true" || p.productive === "x")) {
			var L = false;
			document.addEventListener('keydown', function (e) {
				try {
					if (e.keyCode === 18) {
						L = (typeof e.location !== "number" || e.location === 1);
						return;
					}
					if (e.shiftKey && e.altKey && e.ctrlKey && L) {
						if (e.keyCode === 80) {
							sap.ui.require(['sap/ui/core/support/techinfo/TechnicalInfo'], function (T) {
								T.open(function () {
									var i = x();
									return {
										modules: i.modules,
										prefixes: i.prefixes,
										config: p
									};
								});
							});
						} else if (e.keyCode === 83) {
							sap.ui.require(['sap/ui/core/support/Support'], function (d) {
								var s = d.getStub();
								if (s.getType() != d.StubType.APPLICATION) {
									return;
								}
								s.openSupportTool();
							});
						}
					}
				} catch (o) {}
			});
		}
		if (!q.support) {
			q.support = {};
		}
		q.extend(q.support, {
			touch: D.support.touch
		});
		var B = ["Webkit", "ms", "Moz"];
		var E = document.documentElement.style;
		var F = function (d, j) {
			if (q.support[d] === undefined) {
				if (E[j] !== undefined) {
					q.support[d] = true;
					if (j === "boxFlex" || j === "flexOrder" || j === "flexGrow") {
						if (!D.browser.chrome || D.browser.version > 28) {
							q.support.flexBoxPrefixed = false;
						}
					}
					return;
				} else {
					j = j.charAt(0).toUpperCase() + j.slice(1);
					for (var i in B) {
						if (E[B[i] + j] !== undefined) {
							q.support[d] = true;
							return;
						}
					}
				}
				q.support[d] = false;
			}
		};
		F("cssTransforms", "transform");
		F("cssTransforms3d", "perspective");
		F("cssTransitions", "transition");
		F("cssAnimations", "animationName");
		if (q.support.cssGradients === undefined) {
			var H = document.createElement('div'),
				E = H.style;
			try {
				E.backgroundImage = "linear-gradient(left top, red, white)";
				E.backgroundImage = "-moz-linear-gradient(left top, red, white)";
				E.backgroundImage = "-webkit-linear-gradient(left top, red, white)";
				E.backgroundImage = "-ms-linear-gradient(left top, red, white)";
				E.backgroundImage = "-webkit-gradient(linear, left top, right bottom, from(red), to(white))";
			} catch (e) {}
			q.support.cssGradients = (E.backgroundImage && E.backgroundImage.indexOf("gradient") > -1);
			H = null;
		}
		q.support.flexBoxPrefixed = true;
		F("flexBoxLayout", "boxFlex");
		F("newFlexBoxLayout", "flexGrow");
		if (!q.support.newFlexBoxLayout && E.msFlexOrder !== undefined) {
			q.support.ie10FlexBoxLayout = true;
		} else {
			q.support.ie10FlexBoxLayout = false;
		}
		if (q.support.flexBoxLayout || q.support.newFlexBoxLayout || q.support.ie10FlexBoxLayout) {
			q.support.hasFlexBoxSupport = true;
		} else {
			q.support.hasFlexBoxSupport = false;
		}
		var I = function (s) {
			this.mSettings = s || {};
			this.sMode = this.mSettings.mode || I.Mode.ALLOW;
			this.fnCallback = this.mSettings.callback;
			this.iTimeout = this.mSettings.timeout || 10000;
			this.bBlockEvents = this.mSettings.blockEvents !== false;
			this.bShowBlockLayer = this.mSettings.showBlockLayer !== false;
			this.bAllowSameOrigin = this.mSettings.allowSameOrigin !== false;
			this.sParentOrigin = '';
			this.bUnlocked = false;
			this.bRunnable = false;
			this.bParentUnlocked = false;
			this.bParentResponded = false;
			this.sStatus = "pending";
			this.aFPChilds = [];
			var d = this;
			this.iTimer = setTimeout(function () {
				if (d.bRunnable && d.bParentResponded && !d.bParentUnlocked) {
					q.sap.log.error("Reached timeout of " + d.iTimeout + "ms waiting for the parent to be unlocked", "", "jQuery.sap.FrameOptions");
				} else {
					q.sap.log.error("Reached timeout of " + d.iTimeout + "ms waiting for a response from parent window", "", "jQuery.sap.FrameOptions");
				}
				d._callback(false);
			}, this.iTimeout);
			var i = function () {
				d._handlePostMessage.apply(d, arguments);
			};
			I.__window.addEventListener('message', i);
			if (I.__parent === I.__self || I.__parent == null || this.sMode === I.Mode.ALLOW) {
				this._applyState(true, true);
			} else {
				this._lock();
				if (this.sMode === I.Mode.DENY) {
					q.sap.log.error("Embedding blocked because configuration mode is set to 'DENY'", "", "jQuery.sap.FrameOptions");
					this._callback(false);
					return;
				}
				if (this.bAllowSameOrigin) {
					try {
						var o = I.__parent;
						var O = false;
						var T = true;
						do {
							var j = o.document.domain;
							if (o == I.__top) {
								if (j != undefined) {
									O = true;
								}
								break;
							}
							o = o.parent;
						} while (T);
						if (O) {
							this._applyState(true, true);
						}
					} catch (e) {
						this._sendRequireMessage();
					}
				} else {
					this._sendRequireMessage();
				}
			}
		};
		I.Mode = {
			TRUSTED: 'trusted',
			ALLOW: 'allow',
			DENY: 'deny'
		};
		I.__window = a;
		I.__parent = parent;
		I.__self = self;
		I.__top = top;
		I._events = ["mousedown", "mouseup", "click", "dblclick", "mouseover", "mouseout", "touchstart", "touchend", "touchmove", "touchcancel", "keydown", "keypress", "keyup"];
		I.prototype.match = function (s, d) {
			if (!(/\*/i.test(d))) {
				return s == d;
			} else {
				d = d.replace(/\//gi, "\\/");
				d = d.replace(/\./gi, "\\.");
				d = d.replace(/\*/gi, ".*");
				d = d.replace(/:\.\*$/gi, ":\\d*");
				if (d.substr(d.length - 1, 1) !== '$') {
					d = d + '$';
				}
				if (d.substr(0, 1) !== '^') {
					d = '^' + d;
				}
				var r = new RegExp(d, 'i');
				return r.test(s);
			}
		};
		I._lockHandler = function (o) {
			o.stopPropagation();
			o.preventDefault();
		};
		I.prototype._createBlockLayer = function () {
			if (document.readyState == "complete") {
				var l = document.createElement("div");
				l.style.position = "absolute";
				l.style.top = "-1000px";
				l.style.bottom = "-1000px";
				l.style.left = "-1000px";
				l.style.right = "-1000px";
				l.style.opacity = "0";
				l.style.backgroundColor = "white";
				l.style.zIndex = 2147483647;
				document.body.appendChild(l);
				this._lockDiv = l;
			}
		};
		I.prototype._setCursor = function () {
			if (this._lockDiv) {
				this._lockDiv.style.cursor = this.sStatus == "denied" ? "not-allowed" : "wait";
			}
		};
		I.prototype._lock = function () {
			var d = this;
			if (this.bBlockEvents) {
				for (var i = 0; i < I._events.length; i++) {
					document.addEventListener(I._events[i], I._lockHandler, true);
				}
			}
			if (this.bShowBlockLayer) {
				this._blockLayer = function () {
					d._createBlockLayer();
					d._setCursor();
				};
				if (document.readyState == "complete") {
					this._blockLayer();
				} else {
					document.addEventListener("readystatechange", this._blockLayer);
				}
			}
		};
		I.prototype._unlock = function () {
			if (this.bBlockEvents) {
				for (var i = 0; i < I._events.length; i++) {
					document.removeEventListener(I._events[i], I._lockHandler, true);
				}
			}
			if (this.bShowBlockLayer) {
				document.removeEventListener("readystatechange", this._blockLayer);
				if (this._lockDiv) {
					document.body.removeChild(this._lockDiv);
					delete this._lockDiv;
				}
			}
		};
		I.prototype._callback = function (s) {
			this.sStatus = s ? "allowed" : "denied";
			this._setCursor();
			clearTimeout(this.iTimer);
			if (typeof this.fnCallback === 'function') {
				this.fnCallback.call(null, s);
			}
		};
		I.prototype._applyState = function (i, d) {
			if (this.bUnlocked) {
				return;
			}
			if (i) {
				this.bRunnable = true;
			}
			if (d) {
				this.bParentUnlocked = true;
			}
			if (!this.bRunnable || !this.bParentUnlocked) {
				return;
			}
			this._unlock();
			this._callback(true);
			this._notifyChildFrames();
			this.bUnlocked = true;
		};
		I.prototype._applyTrusted = function (T) {
			if (T) {
				this._applyState(true, false);
			} else {
				this._callback(false);
			}
		};
		I.prototype._check = function (d) {
			if (this.bRunnable) {
				return;
			}
			var T = false;
			if (this.bAllowSameOrigin && this.sParentOrigin && I.__window.document.URL.indexOf(this.sParentOrigin) == 0) {
				T = true;
			} else if (this.mSettings.whitelist && this.mSettings.whitelist.length != 0) {
				var s = this.sParentOrigin.split('//')[1];
				s = s.split(':')[0];
				for (var i = 0; i < this.mSettings.whitelist.length; i++) {
					var m = s.indexOf(this.mSettings.whitelist[i]);
					if (m != -1 && s.substring(m) == this.mSettings.whitelist[i]) {
						T = true;
						break;
					}
				}
			}
			if (T) {
				this._applyTrusted(T);
			} else if (this.mSettings.whitelistService) {
				var j = this;
				var l = new XMLHttpRequest();
				var n = this.mSettings.whitelistService + '?parentOrigin=' + encodeURIComponent(this.sParentOrigin);
				l.onreadystatechange = function () {
					if (l.readyState == 4) {
						j._handleXmlHttpResponse(l, d);
					}
				};
				l.open('GET', n, true);
				l.setRequestHeader('Accept', 'application/json');
				l.send();
			} else {
				q.sap.log.error("Embedding blocked because the whitelist or the whitelist service is not configured correctly", "", "jQuery.sap.FrameOptions");
				this._callback(false);
			}
		};
		I.prototype._handleXmlHttpResponse = function (d, i) {
			if (d.status === 200) {
				var T = false;
				var r = d.responseText;
				var R = JSON.parse(r);
				if (R.active == false) {
					this._applyState(true, true);
				} else if (i) {
					return;
				} else {
					if (this.match(this.sParentOrigin, R.origin)) {
						T = R.framing;
					}
					if (!T) {
						q.sap.log.error("Embedding blocked because the whitelist service does not allow framing", "", "jQuery.sap.FrameOptions");
					}
					this._applyTrusted(T);
				}
			} else {
				q.sap.log.error("The configured whitelist service is not available: " + d.status, "", "jQuery.sap.FrameOptions");
				this._callback(false);
			}
		};
		I.prototype._notifyChildFrames = function () {
			for (var i = 0; i < this.aFPChilds.length; i++) {
				this.aFPChilds[i].postMessage('SAPFrameProtection*parent-unlocked', '*');
			}
		};
		I.prototype._sendRequireMessage = function () {
			I.__parent.postMessage('SAPFrameProtection*require-origin', '*');
			if (this.mSettings.whitelistService) {
				setTimeout(function () {
					if (!this.bParentResponded) {
						this._check(true);
					}
				}.bind(this), 10);
			}
		};
		I.prototype._handlePostMessage = function (o) {
			var s = o.source,
				d = o.data;
			if (s === I.__self || s == null || typeof d !== "string" || d.indexOf("SAPFrameProtection*") === -1) {
				return;
			}
			if (s === I.__parent) {
				this.bParentResponded = true;
				if (!this.sParentOrigin) {
					this.sParentOrigin = o.origin;
					this._check();
				}
				if (d == "SAPFrameProtection*parent-unlocked") {
					this._applyState(false, true);
				}
			} else if (s.parent === I.__self && d == "SAPFrameProtection*require-origin" && this.bUnlocked) {
				s.postMessage("SAPFrameProtection*parent-unlocked", "*");
			} else {
				s.postMessage("SAPFrameProtection*parent-origin", "*");
				this.aFPChilds.push(s);
			}
		};
		q.sap.FrameOptions = I;
	}(jQuery, sap.ui.Device, window));
	jQuery.sap.globalEval = function () {
		"use strict";
		eval(arguments[0]);
	};
	jQuery.sap.declare('sap-ui-core');
	jQuery.sap.declare('sap.ui.Device', false);
	jQuery.sap.declare('sap.ui.thirdparty.URI', false);
	jQuery.sap.declare('sap.ui.thirdparty.baseuri', false);
	jQuery.sap.declare('sap.ui.thirdparty.es6-promise', false);
	jQuery.sap.declare('sap.ui.thirdparty.jquery', false);
	jQuery.sap.declare('sap.ui.thirdparty.jqueryui.jquery-ui-position', false);
	jQuery.sap.declare('jquery.sap.global', false);
	sap.ui.predefine('jquery.sap.act', ['jquery.sap.global'], function (q) {
		"use strict";
		if (typeof window.jQuery.sap.act === "object" || typeof window.jQuery.sap.act === "function") {
			return q;
		}
		var _ = {},
			a = true,
			b = null,
			c = 10000,
			d = [],
			e = false,
			f = null;

		function g() {
			b = null;
			if (e && document.hidden !== true) {
				h();
				return;
			}
			a = false;
			f.observe(document.documentElement, {
				childList: true,
				attributes: true,
				subtree: true,
				characterData: true
			});
		}

		function h() {
			if (document.hidden) {
				return;
			}
			if (!a) {
				a = true;
				j(d);
				f.disconnect();
			}
			if (b) {
				e = true;
			} else {
				b = setTimeout(g, c);
				e = false;
			}
		}

		function j(l) {
			if (l.length == 0) {
				return;
			}
			var k = l.slice();
			setTimeout(function () {
				var I;
				for (var i = 0, L = k.length; i < L; i++) {
					I = k[i];
					I.fFunction.call(I.oListener || window);
				}
			}, 0);
		}
		_.attachActivate = function (F, l) {
			d.push({
				oListener: l,
				fFunction: F
			});
		};
		_.detachActivate = function (F, l) {
			for (var i = 0, L = d.length; i < L; i++) {
				if (d[i].fFunction === F && d[i].oListener === l) {
					d.splice(i, 1);
					break;
				}
			}
		};
		_.isActive = function () {
			return a;
		};
		_.refresh = h;
		var E = ["resize", "orientationchange", "mousemove", "mousedown", "mouseup", "paste", "cut", "keydown", "keyup", "DOMMouseScroll", "mousewheel"];
		if ('ontouchstart' in window) {
			E.push("touchstart", "touchmove", "touchend", "touchcancel");
		}
		for (var i = 0; i < E.length; i++) {
			window.addEventListener(E[i], _.refresh, true);
		}
		if (window.MutationObserver) {
			f = new window.MutationObserver(_.refresh);
		} else if (window.WebKitMutationObserver) {
			f = new window.WebKitMutationObserver(_.refresh);
		} else {
			f = {
				observe: function () {
					document.documentElement.addEventListener("DOMSubtreeModified", _.refresh);
				},
				disconnect: function () {
					document.documentElement.removeEventListener("DOMSubtreeModified", _.refresh);
				}
			};
		}
		if (typeof document.hidden === "boolean") {
			document.addEventListener("visibilitychange", function () {
				if (document.hidden !== true) {
					_.refresh();
				}
			}, false);
		}
		h();
		q.sap.act = _;
		return q;
	});
	sap.ui.predefine('jquery.sap.encoder', ['jquery.sap.global'], function (q) {
		"use strict";

		function h(i, l) {
			var g = i.toString(16);
			if (l) {
				while (l > g.length) {
					g = "0" + g;
				}
			}
			return g;
		}
		var r = /[\x00-\x2b\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\xff\u2028\u2029]/g,
			a = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/,
			H = {
				"<": "&lt;",
				">": "&gt;",
				"&": "&amp;",
				"\"": "&quot;"
			};
		var f = function (g) {
			var E = H[g];
			if (!E) {
				if (a.test(g)) {
					E = "&#xfffd;";
				} else {
					E = "&#x" + h(g.charCodeAt(0)) + ";";
				}
				H[g] = E;
			}
			return E;
		};
		q.sap.encodeHTML = function (S) {
			return S.replace(r, f);
		};
		q.sap.encodeXML = function (S) {
			return S.replace(r, f);
		};
		q.sap.escapeHTML = function (S) {
			return S.replace(r, f);
		};
		var b = /[\x00-\x2b\x2d\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\xff\u2028\u2029]/g,
			j = {};
		var J = function (g) {
			var E = j[g];
			if (!E) {
				var i = g.charCodeAt(0);
				if (i < 256) {
					E = "\\x" + h(i, 2);
				} else {
					E = "\\u" + h(i, 4);
				}
				j[g] = E;
			}
			return E;
		};
		q.sap.encodeJS = function (S) {
			return S.replace(b, J);
		};
		q.sap.escapeJS = function (S) {
			return S.replace(b, J);
		};
		var c = /[\x00-\x2c\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\uffff]/g,
			u = {};
		var U = function (g) {
			var E = u[g];
			if (!E) {
				var i = g.charCodeAt(0);
				if (i < 128) {
					E = "%" + h(i, 2);
				} else if (i < 2048) {
					E = "%" + h((i >> 6) | 192, 2) + "%" + h((i & 63) | 128, 2);
				} else {
					E = "%" + h((i >> 12) | 224, 2) + "%" + h(((i >> 6) & 63) | 128, 2) + "%" + h((i & 63) | 128, 2);
				}
				u[g] = E;
			}
			return E;
		};
		q.sap.encodeURL = function (S) {
			return S.replace(c, U);
		};
		q.sap.encodeURLParameters = function (p) {
			if (!p) {
				return "";
			}
			var g = [];
			q.each(p, function (n, v) {
				if (q.type(v) === "string") {
					v = q.sap.encodeURL(v);
				}
				g.push(q.sap.encodeURL(n) + "=" + v);
			});
			return g.join("&");
		};
		var d = /[\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xff\u2028\u2029][0-9A-Fa-f]?/g;
		var C = function (g) {
			var i = g.charCodeAt(0);
			if (g.length == 1) {
				return "\\" + h(i);
			} else {
				return "\\" + h(i) + " " + g.substr(1);
			}
		};
		q.sap.encodeCSS = function (S) {
			return S.replace(d, C);
		};

		function W(p, g, i, k) {
			if (p) {
				this.protocol = p.toUpperCase();
			}
			if (g) {
				this.host = g.toUpperCase();
			}
			this.port = i;
			this.path = k;
		}
		var w = [];
		q.sap.clearUrlWhitelist = function () {
			w.splice(0, w.length);
		};
		q.sap.addUrlWhitelist = function (p, g, i, k) {
			var E = new W(p, g, i, k);
			var I = w.length;
			w[I] = E;
		};
		q.sap.removeUrlWhitelist = function (i) {
			w.splice(i, 1);
		};
		q.sap.getUrlWhitelist = function () {
			return w.slice();
		};
		q.sap.validateUrl = function (g) {
			var k = /^(?:([^:\/?#]+):)?((?:\/\/((?:\[[^\]]+\]|[^\/?#:]+))(?::([0-9]+))?)?([^?#]*))(?:\?([^#]*))?(?:#(.*))?$/.exec(g);
			if (!k) {
				return false;
			}
			var p = k[1],
				B = k[2],
				l = k[3],
				P = k[4],
				m = k[5],
				Q = k[6],
				n = k[7];
			var o = /^([a-z0-9-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*$/i;
			var t = /^([a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*$/i;
			var v = t;
			var x = /^([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+(?:\.([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
			var y = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
			var z = /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
			var A = /^\[[^\]]+\]$/;
			var D = /^\[(((([0-9a-f]{1,4}:){6}|(::([0-9a-f]{1,4}:){5})|(([0-9a-f]{1,4})?::([0-9a-f]{1,4}:){4})|((([0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){3})|((([0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){2})|((([0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:)|((([0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::))(([0-9a-f]{1,4}:[0-9a-f]{1,4})|(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])))|((([0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4})|((([0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::))\]$/i;
			var E = /^([a-z0-9]([a-z0-9\-]*[a-z0-9])?\.)*[a-z0-9]([a-z0-9\-]*[a-z0-9])?$/i;
			if (p) {
				p = p.toUpperCase();
				if (w.length <= 0) {
					if (!/^(https?|ftp)/i.test(p)) {
						return false;
					}
				}
			}
			if (l) {
				if (y.test(l)) {
					if (!z.test(l)) {
						return false;
					}
				} else if (A.test(l)) {
					if (!D.test(l)) {
						return false;
					}
				} else if (!E.test(l)) {
					return false;
				}
				l = l.toUpperCase();
			}
			if (m) {
				if (p === "MAILTO") {
					var F = B.split(",");
					for (var i = 0; i < F.length; i++) {
						if (!x.test(F[i])) {
							return false;
						}
					}
				} else {
					var G = m.split("/");
					for (var i = 0; i < G.length; i++) {
						if (!o.test(G[i])) {
							return false;
						}
					}
				}
			}
			if (Q) {
				if (!t.test(Q)) {
					return false;
				}
			}
			if (n) {
				if (!v.test(n)) {
					return false;
				}
			}
			if (w.length > 0) {
				var I = false;
				for (var i = 0; i < w.length; i++) {
					if (!p || !w[i].protocol || p == w[i].protocol) {
						var O = false;
						if (l && w[i].host && /^\*/.test(w[i].host)) {
							var K = w[i].host.slice(1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
							var L = RegExp(K + "$");
							if (L.test(l)) {
								O = true;
							}
						} else if (!l || !w[i].host || l == w[i].host) {
							O = true;
						}
						if (O) {
							if ((!l && !P) || !w[i].port || P == w[i].port) {
								if (w[i].path && /\*$/.test(w[i].path)) {
									var M = w[i].path.slice(0, -1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
									var L = RegExp("^" + M);
									if (L.test(m)) {
										I = true;
									}
								} else if (!w[i].path || m == w[i].path) {
									I = true;
								}
							}
						}
					}
					if (I) {
						break;
					}
				}
				if (!I) {
					return false;
				}
			}
			return true;
		};
		q.sap._sanitizeHTML = function (g, o) {
			return s(g, o || {
				uriRewriter: function (i) {
					if (q.sap.validateUrl(i)) {
						return i;
					}
				}
			});
		};
		q.sap._setHTMLSanitizer = function (s) {
			s = s || e;
		};

		function e(g, o) {
			if (!window.html || !window.html.sanitize) {
				q.sap.require("sap.ui.thirdparty.caja-html-sanitizer");
			}
			var t = o.tagPolicy || window.html.makeTagPolicy(o.uriRewriter, o.tokenPolicy);
			return window.html.sanitizeWithPolicy(g, t);
		}
		var s = e;
		return q;
	});
	sap.ui.predefine('jquery.sap.events', ['jquery.sap.global', 'sap/ui/Device', 'jquery.sap.keycodes', 'jquery.sap.dom', 'jquery.sap.script', "sap/ui/thirdparty/jquery-mobile-custom"], function (q, D) {
		"use strict";
		var o, a, b, c, d, m, I = false;
		if (D.browser.webkit && /Mobile/.test(navigator.userAgent) && D.support.touch) {
			I = true;
			(function () {
				var e = window.document,
					H = false,
					j = null,
					B = false,
					S, C, i = 0;
				m = ["mousedown", "mouseover", "mouseup", "mouseout", "click"];
				var E = function (J, K) {
					if (!H) {
						return;
					}
					var M = K.type == "touchend" ? K.changedTouches[0] : K.touches[0];
					var L = e.createEvent('MouseEvent');
					L.initMouseEvent(J, true, true, window, K.detail, M.screenX, M.screenY, M.clientX, M.clientY, K.ctrlKey, K.shiftKey, K.altKey, K.metaKey, K.button, K.relatedTarget);
					L.isSynthetic = true;
					window.setTimeout(function () {
						j.dispatchEvent(L);
					}, 0);
				};
				var F = function (J) {
					return J.target.tagName.match(/input|textarea|select/i);
				};
				d = function (J) {
					if (!J.isSynthetic && !F(J)) {
						J.stopPropagation();
						J.preventDefault();
					}
				};
				o = function (J) {
					var K = J.touches,
						L;
					H = (K.length == 1 && !F(J));
					B = false;
					if (H) {
						L = K[0];
						j = L.target;
						if (j.nodeType === 3) {
							j = j.parentNode;
						}
						S = L.clientX;
						C = L.clientY;
						E("mousedown", J);
					}
				};
				a = function (J) {
					var K;
					if (H) {
						K = J.touches[0];
						if (Math.abs(K.clientX - S) > 10 || Math.abs(K.clientY - C) > 10) {
							B = true;
						}
						if (B) {
							E("mousemove", J);
						}
					}
				};
				b = function (J) {
					E("mouseup", J);
					if (!B) {
						E("click", J);
					}
				};
				c = function (J) {
					E("mouseup", J);
				};
				for (; i < m.length; i++) {
					e.addEventListener(m[i], d, true);
				}
				e.addEventListener('touchstart', o, true);
				e.addEventListener('touchmove', a, true);
				e.addEventListener('touchend', b, true);
				e.addEventListener('touchcancel', c, true);
				q.sap.disableTouchToMouseHandling = function () {
					var i = 0;
					if (!I) {
						return;
					}
					e.removeEventListener('touchstart', o, true);
					e.removeEventListener('touchmove', a, true);
					e.removeEventListener('touchend', b, true);
					e.removeEventListener('touchcancel', c, true);
					for (; i < m.length; i++) {
						e.removeEventListener(m[i], d, true);
					}
				};
			}());
		}
		if (!q.sap.disableTouchToMouseHandling) {
			q.sap.disableTouchToMouseHandling = function () {};
		}
		q.sap.ControlEvents = ["click", "dblclick", "contextmenu", "focusin", "focusout", "keydown", "keypress", "keyup", "mousedown", "mouseout", "mouseover", "mouseup", "select", "selectstart", "dragstart", "dragenter", "dragover", "dragleave", "dragend", "drop", "paste", "cut", "input"];
		if (D.support.touch) {
			q.sap.ControlEvents.push("touchstart", "touchend", "touchmove", "touchcancel");
		}
		q.sap.PseudoEvents = {
			sapdown: {
				sName: "sapdown",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_DOWN && !k(e);
				}
			},
			sapdownmodifiers: {
				sName: "sapdownmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_DOWN && k(e);
				}
			},
			sapshow: {
				sName: "sapshow",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return (e.keyCode == q.sap.KeyCodes.F4 && !k(e)) || (e.keyCode == q.sap.KeyCodes.ARROW_DOWN && h(e, false, true, false));
				}
			},
			sapup: {
				sName: "sapup",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_UP && !k(e);
				}
			},
			sapupmodifiers: {
				sName: "sapupmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_UP && k(e);
				}
			},
			saphide: {
				sName: "saphide",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_UP && h(e, false, true, false);
				}
			},
			sapleft: {
				sName: "sapleft",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_LEFT && !k(e);
				}
			},
			sapleftmodifiers: {
				sName: "sapleftmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_LEFT && k(e);
				}
			},
			sapright: {
				sName: "sapright",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_RIGHT && !k(e);
				}
			},
			saprightmodifiers: {
				sName: "saprightmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ARROW_RIGHT && k(e);
				}
			},
			saphome: {
				sName: "saphome",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.HOME && !k(e);
				}
			},
			saphomemodifiers: {
				sName: "saphomemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.HOME && k(e);
				}
			},
			saptop: {
				sName: "saptop",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.HOME && h(e, true, false, false);
				}
			},
			sapend: {
				sName: "sapend",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.END && !k(e);
				}
			},
			sapendmodifiers: {
				sName: "sapendmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.END && k(e);
				}
			},
			sapbottom: {
				sName: "sapbottom",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.END && h(e, true, false, false);
				}
			},
			sappageup: {
				sName: "sappageup",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.PAGE_UP && !k(e);
				}
			},
			sappageupmodifiers: {
				sName: "sappageupmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.PAGE_UP && k(e);
				}
			},
			sappagedown: {
				sName: "sappagedown",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.PAGE_DOWN && !k(e);
				}
			},
			sappagedownmodifiers: {
				sName: "sappagedownmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.PAGE_DOWN && k(e);
				}
			},
			sapselect: {
				sName: "sapselect",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return (e.keyCode == q.sap.KeyCodes.ENTER || e.keyCode == q.sap.KeyCodes.SPACE) && !k(e);
				}
			},
			sapselectmodifiers: {
				sName: "sapselectmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return (e.keyCode == q.sap.KeyCodes.ENTER || e.keyCode == q.sap.KeyCodes.SPACE) && k(e);
				}
			},
			sapspace: {
				sName: "sapspace",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.SPACE && !k(e);
				}
			},
			sapspacemodifiers: {
				sName: "sapspacemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.SPACE && k(e);
				}
			},
			sapenter: {
				sName: "sapenter",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ENTER && !k(e);
				}
			},
			sapentermodifiers: {
				sName: "sapentermodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ENTER && k(e);
				}
			},
			sapbackspace: {
				sName: "sapbackspace",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.BACKSPACE && !k(e);
				}
			},
			sapbackspacemodifiers: {
				sName: "sapbackspacemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.BACKSPACE && k(e);
				}
			},
			sapdelete: {
				sName: "sapdelete",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.DELETE && !k(e);
				}
			},
			sapdeletemodifiers: {
				sName: "sapdeletemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.DELETE && k(e);
				}
			},
			sapexpand: {
				sName: "sapexpand",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.NUMPAD_PLUS && !k(e);
				}
			},
			sapexpandmodifiers: {
				sName: "sapexpandmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.NUMPAD_PLUS && k(e);
				}
			},
			sapcollapse: {
				sName: "sapcollapse",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.NUMPAD_MINUS && !k(e);
				}
			},
			sapcollapsemodifiers: {
				sName: "sapcollapsemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.NUMPAD_MINUS && k(e);
				}
			},
			sapcollapseall: {
				sName: "sapcollapseall",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.NUMPAD_ASTERISK && !k(e);
				}
			},
			sapescape: {
				sName: "sapescape",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.ESCAPE && !k(e);
				}
			},
			saptabnext: {
				sName: "saptabnext",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.TAB && !k(e);
				}
			},
			saptabprevious: {
				sName: "saptabprevious",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.TAB && h(e, false, false, true);
				}
			},
			sapskipforward: {
				sName: "sapskipforward",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.F6 && !k(e);
				}
			},
			sapskipback: {
				sName: "sapskipback",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					return e.keyCode == q.sap.KeyCodes.F6 && h(e, false, false, true);
				}
			},
			sapdecrease: {
				sName: "sapdecrease",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
					return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && !k(e);
				}
			},
			sapminus: {
				sName: "sapminus",
				aTypes: ["keypress"],
				fnCheck: function (e) {
					var C = String.fromCharCode(e.which);
					return C == '-';
				}
			},
			sapdecreasemodifiers: {
				sName: "sapdecreasemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
					return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && k(e);
				}
			},
			sapincrease: {
				sName: "sapincrease",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
					return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_UP) && !k(e);
				}
			},
			sapplus: {
				sName: "sapplus",
				aTypes: ["keypress"],
				fnCheck: function (e) {
					var C = String.fromCharCode(e.which);
					return C == '+';
				}
			},
			sapincreasemodifiers: {
				sName: "sapincreasemodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
					return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_UP) && k(e);
				}
			},
			sapprevious: {
				sName: "sapprevious",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
					return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_UP) && !k(e);
				}
			},
			sappreviousmodifiers: {
				sName: "sappreviousmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var i = R ? q.sap.KeyCodes.ARROW_RIGHT : q.sap.KeyCodes.ARROW_LEFT;
					return (e.keyCode == i || e.keyCode == q.sap.KeyCodes.ARROW_UP) && k(e);
				}
			},
			sapnext: {
				sName: "sapnext",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
					return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && !k(e);
				}
			},
			sapnextmodifiers: {
				sName: "sapnextmodifiers",
				aTypes: ["keydown"],
				fnCheck: function (e) {
					var R = sap.ui.getCore().getConfiguration().getRTL();
					var N = R ? q.sap.KeyCodes.ARROW_LEFT : q.sap.KeyCodes.ARROW_RIGHT;
					return (e.keyCode == N || e.keyCode == q.sap.KeyCodes.ARROW_DOWN) && k(e);
				}
			},
			sapdelayeddoubleclick: {
				sName: "sapdelayeddoubleclick",
				aTypes: ["click"],
				fnCheck: function (e) {
					var i = q(e.target);
					var j = e.timeStamp;
					var B = i.data("sapdelayeddoubleclick_lastClickTimestamp");
					var C = B || 0;
					i.data("sapdelayeddoubleclick_lastClickTimestamp", j);
					var E = j - C;
					return (E >= 300 && E <= 1300);
				}
			}
		};
		var P = ["sapdown", "sapdownmodifiers", "sapshow", "sapup", "sapupmodifiers", "saphide", "sapleft", "sapleftmodifiers", "sapright", "saprightmodifiers", "saphome", "saphomemodifiers", "saptop", "sapend", "sapendmodifiers", "sapbottom", "sappageup", "sappageupmodifiers", "sappagedown", "sappagedownmodifiers", "sapselect", "sapselectmodifiers", "sapspace", "sapspacemodifiers", "sapenter", "sapentermodifiers", "sapexpand", "sapbackspace", "sapbackspacemodifiers", "sapdelete", "sapdeletemodifiers", "sapexpandmodifiers", "sapcollapse", "sapcollapsemodifiers", "sapcollapseall", "sapescape", "saptabnext", "saptabprevious", "sapskipforward", "sapskipback", "sapprevious", "sappreviousmodifiers", "sapnext", "sapnextmodifiers", "sapdecrease", "sapminus", "sapdecreasemodifiers", "sapincrease", "sapplus", "sapincreasemodifiers", "sapdelayeddoubleclick"];
		(function initTouchEventSupport() {
			q.sap.touchEventMode = "SIM";
			var e = [];
			var j = [];
			if (D.support.touch) {
				q.sap.touchEventMode = "ON";
				q.event.props.push("touches", "targetTouches", "changedTouches");
			}
			var B = function (U, V, W) {
				var X = "__" + U + "Handler";
				var Y = "sap" + U;
				e.push(Y);
				j.push({
					sName: U,
					aTypes: [Y],
					fnCheck: function (Z) {
						return true;
					}
				});
				q.event.special[Y] = {
					add: function (Z) {
						var $ = this,
							a1 = q(this),
							b1 = {
								domRef: $,
								eventName: U,
								sapEventName: Y,
								eventHandle: Z
							};
						var c1 = function (d1) {
							W(d1, b1);
						};
						Z.__sapSimulatedEventHandler = c1;
						for (var i = 0; i < V.length; i++) {
							a1.on(V[i], c1);
						}
					},
					remove: function (Z) {
						var $ = q(this);
						var W = Z.__sapSimulatedEventHandler;
						$.removeData(X + Z.guid);
						for (var i = 0; i < V.length; i++) {
							q.event.remove(this, V[i], W);
						}
					}
				};
			};
			var M = function (U, V) {
				var $ = q(V.domRef);
				if (U.isMarked("delayedMouseEvent")) {
					return;
				}
				if (!(U.type != "mouseout" || (U.type === "mouseout" && q.sap.checkMouseEnterOrLeave(U, V.domRef)))) {
					var W = true;
					var X = $.data("__touchstart_control");
					if (X) {
						var Y = q.sap.domById(X);
						if (Y && q.sap.checkMouseEnterOrLeave(U, Y)) {
							W = false;
						}
					}
					if (W) {
						return;
					}
				}
				var Z = q.event.fix(U.originalEvent || U);
				Z.type = V.sapEventName;
				if (Z.isMarked("firstUIArea")) {
					Z.setMark("handledByUIArea", false);
				}
				var a1 = [{
					identifier: 1,
					pageX: Z.pageX,
					pageY: Z.pageY,
					clientX: Z.clientX,
					clientY: Z.clientY,
					screenX: Z.screenX,
					screenY: Z.screenY,
					target: Z.target,
					radiusX: 1,
					radiusY: 1,
					rotationAngle: 0
				}];
				switch (V.eventName) {
					case "touchstart":
					case "touchmove":
						Z.touches = Z.changedTouches = Z.targetTouches = a1;
						break;
					case "touchend":
						Z.changedTouches = a1;
						Z.touches = Z.targetTouches = [];
						break;
				}
				if (V.eventName === "touchstart" || $.data("__touch_in_progress")) {
					$.data("__touch_in_progress", "X");
					var b1 = q.fn.control ? q(U.target).control(0) : null;
					if (b1) {
						$.data("__touchstart_control", b1.getId());
					}
					if (U.type === "mouseout") {
						Z.setMarked("fromMouseout");
					}
					if (U.type !== "dragstart") {
						V.eventHandle.handler.call(V.domRef, Z);
					}
					if ((V.eventName === "touchend" || U.type === "dragstart") && !Z.isMarked("fromMouseout")) {
						$.removeData("__touch_in_progress");
						$.removeData("__touchstart_control");
					}
				}
			};
			var E = !(D.os.windows_phone && D.os.version < 10);
			if (E) {
				B("touchstart", ["mousedown"], M);
				B("touchend", ["mouseup", "mouseout"], M);
				B("touchmove", ["mousemove", "dragstart"], M);
			}
			if (D.os.ios) {
				var S = function (U, V) {
					var W = q.event.fix(U.originalEvent || U);
					W.type = V.sapEventName;
					if (!window.getSelection || !window.getSelection() || window.getSelection().toString() === "") {
						V.eventHandle.handler.call(V.domRef, W);
					}
				};
				B("contextmenu", ["taphold"], S);
			}
			if (D.support.touch && E) {
				var F = false,
					C = q.vmouse.moveDistanceThreshold,
					H, J, O, K, L;
				var N = function (U, V, W) {
					var X = q.event.fix(U.originalEvent || U);
					X.type = V.sapEventName;
					delete X.touches;
					delete X.changedTouches;
					delete X.targetTouches;
					X.screenX = W.screenX;
					X.screenY = W.screenY;
					X.clientX = W.clientX;
					X.clientY = W.clientY;
					X.ctrlKey = W.ctrlKey;
					X.altKey = W.altKey;
					X.shiftKey = W.shiftKey;
					X.button = 0;
					return X;
				};
				var Q = function (U, V) {
					if (U.isMarked("handledByTouchToMouse")) {
						return;
					}
					U.setMarked("handledByTouchToMouse");
					if (!F) {
						var W = U.originalEvent.touches[0];
						F = (Math.abs(W.pageX - H) > C || Math.abs(W.pageY - J) > C);
					}
					if (D.os.blackberry) {
						if (L && U.timeStamp - L < 50) {
							return;
						}
						L = U.timeStamp;
					}
					var X = N(U, V, U.touches[0]);
					q.sap.delayedCall(0, this, function () {
						X.setMark("handledByUIArea", false);
						V.eventHandle.handler.call(V.domRef, X);
					});
				};
				var R = function (U, V) {
					if (U.isMarked("handledByTouchToMouse")) {
						return;
					}
					U.setMarked("handledByTouchToMouse");
					var W, X, Y;

					function Z() {
						return N(U, V, V.eventName === "mouseup" ? U.changedTouches[0] : U.touches[0]);
					}
					if (U.type === "touchstart") {
						var $ = U.originalEvent.touches[0];
						F = false;
						L = 0;
						H = $.pageX;
						J = $.pageY;
						O = Math.round($.pageX - q(U.target).offset().left);
						K = Math.round($.pageY - q(U.target).offset().top);
						W = Z();
						q.sap.delayedCall(0, this, function () {
							W.setMark("handledByUIArea", false);
							V.eventHandle.handler.call(V.domRef, W);
						});
					} else if (U.type === "touchend") {
						X = Z();
						Y = !F;
						q.sap.delayedCall(0, this, function () {
							X.setMark("handledByUIArea", false);
							V.eventHandle.handler.call(V.domRef, X);
							if (Y) {
								X.type = "click";
								X.getPseudoTypes = q.Event.prototype.getPseudoTypes;
								X.setMark("handledByUIArea", false);
								X.offsetX = O;
								X.offsetY = K;
								V.eventHandle.handler.call(V.domRef, X);
							}
						});
					}
				};
				q.sap.disableTouchToMouseHandling();
				B("mousedown", ["touchstart"], R);
				B("mousemove", ["touchmove"], Q);
				B("mouseup", ["touchend", "touchcancel"], R);
			}
			e.push("swipe", "tap", "swipeleft", "swiperight", "scrollstart", "scrollstop");
			j.push({
				sName: "swipebegin",
				aTypes: ["swipeleft", "swiperight"],
				fnCheck: function (U) {
					var V = sap.ui.getCore().getConfiguration().getRTL();
					return (V && U.type === "swiperight") || (!V && U.type === "swipeleft");
				}
			});
			j.push({
				sName: "swipeend",
				aTypes: ["swipeleft", "swiperight"],
				fnCheck: function (U) {
					var V = sap.ui.getCore().getConfiguration().getRTL();
					return (!V && U.type === "swiperight") || (V && U.type === "swipeleft");
				}
			});
			if (q.sap.Version(q.fn.jquery).compareTo("1.9.1") < 0) {
				q.sap.ControlEvents = q.sap.ControlEvents.concat(e);
			} else {
				q.sap.ControlEvents = e.concat(q.sap.ControlEvents);
			}
			for (var i = 0; i < j.length; i++) {
				q.sap.PseudoEvents[j[i].sName] = j[i];
				P.push(j[i].sName);
			}
		}());

		function f() {
			var e = q.sap.PseudoEvents,
				R = [];
			for (var N in e) {
				if (e[N].aTypes) {
					for (var j = 0, i = e[N].aTypes.length; j < i; j++) {
						var B = e[N].aTypes[j];
						if (R.indexOf(B) == -1) {
							R.push(B);
						}
					}
				}
			}
			return R;
		}
		var g = f();

		function h(e, C, i, S) {
			return e.shiftKey == S && e.altKey == i && l(e) == C;
		}

		function k(e) {
			return e.shiftKey || e.altKey || l(e);
		}

		function l(e) {
			return !!(e.metaKey || e.ctrlKey);
		}
		q.Event.prototype.getPseudoTypes = function () {
			var e = [];
			if (g.indexOf(this.type) != -1) {
				var j = P;
				var B = j.length;
				var C = null;
				for (var i = 0; i < B; i++) {
					C = q.sap.PseudoEvents[j[i]];
					if (C.aTypes && C.aTypes.indexOf(this.type) > -1 && C.fnCheck && C.fnCheck(this)) {
						e.push(C.sName);
					}
				}
			}
			this.getPseudoTypes = function () {
				return e.slice();
			};
			return e.slice();
		};
		q.Event.prototype.isPseudoType = function (e) {
			var i = this.getPseudoTypes();
			if (e) {
				return i.indexOf(e) > -1;
			} else {
				return i.length > 0;
			}
		};
		q.sap.bindAnyEvent = function bindAnyEvent(C) {
			if (C) {
				q(document).bind(q.sap.ControlEvents.join(" "), C);
			}
		};
		q.sap.unbindAnyEvent = function unbindAnyEvent(C) {
			if (C) {
				q(document).unbind(q.sap.ControlEvents.join(" "), C);
			}
		};
		q.sap.checkMouseEnterOrLeave = function checkMouseEnterOrLeave(E, i) {
			if (E.type != "mouseover" && E.type != "mouseout") {
				return false;
			}
			var j = false;
			var B = i;
			var C = E.relatedTarget;
			try {
				while (C && C !== B) {
					C = C.parentNode;
				}
				if (C !== B) {
					j = true;
				}
			} catch (e) {}
			return j;
		};
		q.sap.isSpecialKey = function (e) {
			var K = q.sap.KeyCodes,
				i = e.which,
				S = n(e) || p(e) || (i >= 33 && i <= 36) || (i >= 44 && i <= 46) || (i >= 112 && i <= 123) || (i === K.BREAK) || (i === K.BACKSPACE) || (i === K.TAB) || (i === K.ENTER) || (i === K.ESCAPE) || (i === K.SCROLL_LOCK);
			switch (e.type) {
				case "keydown":
				case "keyup":
					return S;
				case "keypress":
					return (i === 0 || i === K.BACKSPACE || i === K.ESCAPE || i === K.ENTER) || false;
				default:
					return false;
			}
		};

		function n(e) {
			var K = q.sap.KeyCodes,
				i = e.which;
			return (i === K.SHIFT) || (i === K.CONTROL) || (i === K.ALT) || (i === K.CAPS_LOCK) || (i === K.NUM_LOCK);
		}

		function p(e) {
			var K = e.which,
				i = (K >= 37 && K <= 40);
			switch (e.type) {
				case "keydown":
				case "keyup":
					return i;
				case "keypress":
					return K === 0;
				default:
					return false;
			}
		}
		q.Event.prototype.getOffsetX = function () {
			if (this.type == 'click') {
				if (this.offsetX) {
					return this.offsetX;
				}
				if (this.layerX) {
					return this.layerX;
				}
				if (this.originalEvent.layerX) {
					return this.originalEvent.layerX;
				}
			}
			return 0;
		};
		q.Event.prototype.getOffsetY = function () {
			if (this.type == 'click') {
				if (this.offsetY) {
					return this.offsetY;
				}
				if (this.layerY) {
					return this.layerY;
				}
				if (this.originalEvent.layerY) {
					return this.originalEvent.layerY;
				}
			}
			return 0;
		};
		var s = q.Event.prototype.stopImmediatePropagation;
		q.Event.prototype.stopImmediatePropagation = function (S) {
			s.apply(this, arguments);
			if (S) {
				this._bIsStopHandlers = true;
			}
		};
		q.Event.prototype.isImmediateHandlerPropagationStopped = function () {
			return !!this._bIsStopHandlers;
		};
		var G = function (e) {
			while (e && e.originalEvent && e !== e.originalEvent) {
				e = e.originalEvent;
			}
			return e;
		};
		q.Event.prototype.setMark = function (K, V) {
			K = K || "handledByControl";
			V = arguments.length < 2 ? true : V;
			var N = G(this);
			N["_sapui_" + K] = V;
		};
		q.Event.prototype.setMarked = q.Event.prototype.setMark;
		q.Event.prototype.isMarked = function (K) {
			return !!this.getMark(K);
		};
		q.Event.prototype.getMark = function (K) {
			K = K || "handledByControl";
			var N = G(this);
			return N["_sapui_" + K];
		};
		q.sap._FASTNAVIGATIONKEY = "sap-ui-fastnavgroup";

		function r(R) {
			var $ = q(R).closest('[data-sap-ui-customfastnavgroup="true"]');
			return $[0];
		}

		function t(R) {
			var e = r(R);
			if (e) {
				return e;
			}
			var $ = q(R).closest('[data-' + q.sap._FASTNAVIGATIONKEY + '="true"]');
			return $[0];
		}

		function u(R, S, N) {
			var $ = q(R),
				e, i;
			if (N) {
				e = q.merge($.find("*"), q.merge($.nextAll(), $.parents().nextAll()));
				i = e.find(':sapTabbable').addBack(':sapTabbable');
			} else {
				e = q.merge($.prevAll(), $.parents().prevAll());
				i = q.merge($.parents(':sapTabbable'), e.find(':sapTabbable').addBack(':sapTabbable'));
			}
			var i = q.unique(i);
			return i.filter(function () {
				return w(S, this);
			});
		}

		function v(R, S) {
			var e = q.sap.domById("sap-ui-static");
			if (!e) {
				return R;
			}
			var j = [];
			for (var i = 0; i < S.length; i++) {
				if (q.contains(e, S[i])) {
					j.push(S[i]);
				}
			}
			return R.filter(function () {
				if (j.length && w(j, this)) {
					return true;
				}
				return !q.contains(e, this);
			});
		}

		function w(C, R) {
			for (var i = 0; i < C.length; i++) {
				if (C[i] === R || q.contains(C[i], R)) {
					return true;
				}
			}
			return false;
		}

		function x(F, $, S, e) {
			var j, B;
			for (var i = $.length - 1; i >= 0; i--) {
				j = t($[i]);
				if (j != S) {
					if (e) {
						S = j;
						e = false;
					} else {
						B = q($[i + 1]);
						break;
					}
				}
			}
			if (!B && !e) {
				B = F;
			}
			return B;
		}

		function y(S, e, F) {
			if (!e || e.length == 0) {
				e = [document];
			}
			if (!w(e, S)) {
				return;
			}
			var j = t(S),
				$ = v(q(e).find(':sapTabbable').addBack(':sapTabbable'), e),
				B = $.first(),
				C = v(u(S, e, F), e),
				E, H;
			if (F) {
				for (var i = 0; i < C.length; i++) {
					E = t(C[i]);
					if (E != j) {
						H = q(C[i]);
						break;
					}
				}
				if (!H || !H.length) {
					H = B;
				}
			} else {
				H = x(B, C, j, true);
				if (!H || !H.length) {
					if ($.length == 1) {
						H = q($[0]);
					} else if ($.length > 1) {
						j = t($.eq(-1));
						E = t($.eq(-2));
						if (j != E) {
							H = $.eq(-1);
						} else {
							H = x(B, $, j, false);
						}
					}
				}
			}
			if (H && H.length) {
				var J = H[0],
					K = null,
					L = r(J);
				if (L && L.id) {
					var M = sap.ui.getCore().byId(L.id);
					if (M) {
						K = q.Event("BeforeFastNavigationFocus");
						K.target = J;
						K.source = S;
						K.forward = F;
						M._handleEvent(K);
					}
				}
				if (!K || !K.isDefaultPrevented()) {
					q.sap.focus(J);
				}
			}
		}
		q.sap.handleF6GroupNavigation = function (e, S) {
			if (e.type != "keydown" || e.keyCode != q.sap.KeyCodes.F6 || e.isMarked("sapui5_handledF6GroupNavigation") || e.isMarked() || e.isDefaultPrevented()) {
				return;
			}
			e.setMark("sapui5_handledF6GroupNavigation");
			e.setMarked();
			e.preventDefault();
			if (S && S.skip) {
				return;
			}
			var i = S && S.target ? S.target : document.activeElement,
				j = null;
			if (S && S.scope) {
				j = Array.isArray(S.scope) ? S.scope : [S.scope];
			}
			y(i, j, !e.shiftKey);
		};
		q(function () {
			q(document).on("keydown", function (e) {
				q.sap.handleF6GroupNavigation(e, null);
			});
		});
		q.sap._refreshMouseEventDelayedFlag = function (N) {
			N = N || navigator;
			q.sap.isMouseEventDelayed = !!(D.browser.mobile && !((D.os.ios && D.os.version >= 8 && D.browser.safari && !D.browser.webview) || (D.browser.chrome && !/SAMSUNG/.test(N.userAgent) && D.browser.version >= 32)));
		};
		q.sap._refreshMouseEventDelayedFlag(navigator);
		var T = {};
		var z;

		function A() {
			if (!z) {
				z = function (e) {
					var i = q.sap.log.isLoggable(q.sap.log.Level.DEBUG);
					var E = T[e.type];
					var O = E.originalTriggerHook;
					var j = window.performance.now();
					var B;
					if (!e.isPropagationStopped() && !e.isSimulated) {
						for (var C in E.domRefs) {
							var F = E.domRefs[C];
							if (F.excludedDomRefs.indexOf(e.target) === -1 && q.sap.containsOrEquals(F.domRef, e.target)) {
								e.preventDefault();
								e.stopImmediatePropagation();
								B = window.performance.now();
								if (i) {
									q.sap.log.debug("Perf: jQuery trigger supression event handler " + e.type + " took " + (B - j) + " milliseconds.");
								}
								return false;
							}
						}
					}
					if (O && O.call(this, e) === false) {
						return false;
					}
				};
			}
			return z;
		}

		function _(e) {
			if (!q.event.special[e]) {
				q.event.special[e] = {};
			}
			var S = q.event.special[e],
				i = S.trigger;
			S.trigger = A();
			return i;
		}
		q.sap._suppressTriggerEvent = function (e, i, E) {
			var j = T[e];
			var B = q.sap.uid();
			if (!j) {
				j = T[e] = {
					domRefs: {},
					originalTriggerHook: _(e)
				};
			}
			j.domRefs[B] = {
				domRef: i,
				excludedDomRefs: [].concat(E)
			};
			return {
				id: B,
				type: e
			};
		};
		q.sap._releaseTriggerEvent = function (H) {
			if (!H) {
				return;
			}
			var e = T[H.type];
			if (!e) {
				return;
			} else if (!e.domRefs[H.id] || !e.domRefs[H.id].domRef) {
				q.sap.log.warning("Release trigger event for event type " + H.type + "on Control " + H.id + ": DomRef does not exists");
				return;
			}
			delete e.domRefs[H.id];
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.keycodes', ['jquery.sap.global'], function (q) {
		"use strict";
		q.sap.KeyCodes = {
			BACKSPACE: 8,
			TAB: 9,
			ENTER: 13,
			SHIFT: 16,
			CONTROL: 17,
			ALT: 18,
			BREAK: 19,
			CAPS_LOCK: 20,
			ESCAPE: 27,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			ARROW_LEFT: 37,
			ARROW_UP: 38,
			ARROW_RIGHT: 39,
			ARROW_DOWN: 40,
			PRINT: 44,
			INSERT: 45,
			DELETE: 46,
			DIGIT_0: 48,
			DIGIT_1: 49,
			DIGIT_2: 50,
			DIGIT_3: 51,
			DIGIT_4: 52,
			DIGIT_5: 53,
			DIGIT_6: 54,
			DIGIT_7: 55,
			DIGIT_8: 56,
			DIGIT_9: 57,
			A: 65,
			B: 66,
			C: 67,
			D: 68,
			E: 69,
			F: 70,
			G: 71,
			H: 72,
			I: 73,
			J: 74,
			K: 75,
			L: 76,
			M: 77,
			N: 78,
			O: 79,
			P: 80,
			Q: 81,
			R: 82,
			S: 83,
			T: 84,
			U: 85,
			V: 86,
			W: 87,
			X: 88,
			Y: 89,
			Z: 90,
			WINDOWS: 91,
			CONTEXT_MENU: 93,
			TURN_OFF: 94,
			SLEEP: 95,
			NUMPAD_0: 96,
			NUMPAD_1: 97,
			NUMPAD_2: 98,
			NUMPAD_3: 99,
			NUMPAD_4: 100,
			NUMPAD_5: 101,
			NUMPAD_6: 102,
			NUMPAD_7: 103,
			NUMPAD_8: 104,
			NUMPAD_9: 105,
			NUMPAD_ASTERISK: 106,
			NUMPAD_PLUS: 107,
			NUMPAD_MINUS: 109,
			NUMPAD_COMMA: 110,
			NUMPAD_SLASH: 111,
			F1: 112,
			F2: 113,
			F3: 114,
			F4: 115,
			F5: 116,
			F6: 117,
			F7: 118,
			F8: 119,
			F9: 120,
			F10: 121,
			F11: 122,
			F12: 123,
			NUM_LOCK: 144,
			SCROLL_LOCK: 145,
			OPEN_BRACKET: 186,
			PLUS: 187,
			COMMA: 188,
			SLASH: 189,
			DOT: 190,
			PIPE: 191,
			SEMICOLON: 192,
			MINUS: 219,
			GREAT_ACCENT: 220,
			EQUALS: 221,
			SINGLE_QUOTE: 222,
			BACKSLASH: 226
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.mobile', ['jquery.sap.global', 'sap/ui/Device', 'jquery.sap.dom', 'jquery.sap.events'], function (q, D) {
		"use strict";
		(function ($) {
			var F = /(?:\?|&)sap-ui-xx-fakeOS=([^&]+)/;
			$.sap.simulateMobileOnDesktop = false;
			if ((D.browser.webkit || D.browser.msie) && !q.support.touch) {
				var r = document.location.search.match(F);
				var a = r && r[1] || q.sap.byId("sap-ui-bootstrap").attr("data-sap-ui-xx-fakeOS");
				if (a) {
					q.sap.log.error("The experimental parameter 'sap-ui-xx-fakeOS' must NOT be used. The results are unreliable. The parameter will be removed in one of the next versions of UI5!");
					$.sap.simulateMobileOnDesktop = true;
					var u = {
						ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.48 (KHTML, like Gecko) Version/5.1 Mobile/9A406 Safari/7534.48.3",
						iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.48 (KHTML, like Gecko) Version/5.1 Mobile/9A406 Safari/7534.48.3",
						ipad: "Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206",
						android: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; GT-I9100 Build/IML74K) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.46",
						android_phone: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; GT-I9100 Build/IML74K) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.46",
						android_tablet: "Mozilla/5.0 (Linux; Android 4.1.2; Nexus 7 Build/JZ054K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19",
						blackberry: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
						winphone: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)"
					}[a];
					if (u && (D.browser.webkit && a !== "winphone" || D.browser.msie && a === "winphone")) {
						if (D.browser.safari) {
							var _ = window.navigator;
							window.navigator = {};
							window.navigator.__proto__ = _;
							window.navigator.__defineGetter__('userAgent', function () {
								return u;
							});
						} else {
							Object.defineProperty(navigator, "userAgent", {
								get: function () {
									return u;
								}
							});
						}
						if (D.browser.webkit) {
							q.browser.msie = q.browser.opera = q.browser.mozilla = false;
							q.browser.webkit = true;
							q.browser.version = "534.46";
						}
						D._update($.sap.simulateMobileOnDesktop);
					}
				}
			}
			$.os = $.extend({
				os: D.os.name,
				version: D.os.versionStr,
				fVersion: D.os.version
			}, $.os);
			$.os[D.os.name] = true;
			$.extend($.support, {
				retina: window.devicePixelRatio >= 2
			});
			$.device = $.extend({}, $.device);
			$.device.is = $.extend({
				standalone: window.navigator.standalone,
				landscape: D.orientation.landscape,
				portrait: D.orientation.portrait,
				iphone: D.os.ios && D.system.phone,
				ipad: D.os.ios && D.system.tablet,
				android_phone: D.system.phone && D.os.android,
				android_tablet: D.system.tablet && D.os.android,
				tablet: D.system.tablet,
				phone: D.system.phone,
				desktop: D.system.desktop
			}, $.device.is);
			if (D.os.windows_phone) {
				var t;
				t = document.createElement("meta");
				t.setAttribute("name", "msapplication-tap-highlight");
				t.setAttribute("content", "no");
				document.head.appendChild(t);
				t = document.createElement("style");
				t.appendChild(document.createTextNode('@-ms-viewport{width:device-width;}'));
				document.head.appendChild(t);
			}
			var b = false;
			$.sap.initMobile = function (o) {
				var c = $("head");
				if (!b) {
					b = true;
					o = $.extend({}, {
						viewport: true,
						statusBar: "default",
						hideBrowser: true,
						preventScroll: true,
						preventPhoneNumberDetection: true,
						useFullScreenHeight: true,
						homeIconPrecomposed: false,
						mobileWebAppCapable: "default"
					}, o);
					if (D.os.ios && o.preventPhoneNumberDetection) {
						c.append($('<meta name="format-detection" content="telephone=no">'));
					} else if (D.browser.msie) {
						c.append($('<meta http-equiv="cleartype" content="on">'));
						c.append($('<meta name="msapplication-tap-highlight" content="no">'));
					}
					var i = D.os.ios && D.os.version >= 7 && D.os.version < 8 && D.browser.name === "sf";
					if (o.viewport) {
						var m;
						if (i && D.system.phone) {
							m = 'minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
						} else if (i && D.system.tablet) {
							m = 'initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
						} else if ($.device.is.iphone && (Math.max(window.screen.height, window.screen.width) === 568)) {
							m = "user-scalable=0, initial-scale=1.0";
						} else if (D.os.android && D.os.version < 3) {
							m = "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
						} else {
							m = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
						}
						c.append($('<meta name="viewport" content="' + m + '">'));
					}
					if (o.mobileWebAppCapable === "default") {
						if (D.os.ios) {
							c.append($('<meta name="apple-mobile-web-app-capable" content="yes">'));
						}
					} else {
						$.sap.setMobileWebAppCapable(o.mobileWebAppCapable);
					}
					if (D.os.ios) {
						c.append($('<meta name="apple-mobile-web-app-status-bar-style" content="' + o.statusBar + '">'));
					}
					if (o.useFullScreenHeight) {
						$(function () {
							document.documentElement.style.height = "100%";
						});
					}
					if (o.preventScroll && D.os.ios) {
						$(function () {
							document.documentElement.style.position = "fixed";
							document.documentElement.style.overflow = "hidden";
							document.documentElement.style.height = "100%";
							document.documentElement.style.width = "100%";
						});
					}
				}
				if (o && o.homeIcon) {
					var I;
					if (typeof o.homeIcon === "string") {
						I = {
							phone: o.homeIcon
						};
					} else {
						I = $.extend({}, o.homeIcon);
					}
					I.precomposed = o.homeIconPrecomposed || I.precomposed;
					I.favicon = o.homeIcon.icon || I.favicon;
					I.icon = undefined;
					$.sap.setIcons(I);
				}
			};
			$.sap.setIcons = function (i) {
				if (!i || (typeof i !== "object")) {
					$.sap.log.warning("Call to jQuery.sap.setIcons() has been ignored because there were no icons given or the argument was not an object.");
					return;
				}
				var c = $("head"),
					p = i.precomposed ? "-precomposed" : "",
					g = function (h) {
						return i[h] || i['tablet@2'] || i['phone@2'] || i['phone'] || i['tablet'];
					},
					s = {
						"phone": "",
						"tablet": "76x76",
						"phone@2": "120x120",
						"tablet@2": "152x152"
					};
				if (i["favicon"]) {
					var d = c.find("[rel^=shortcut]");
					d.each(function () {
						if (this.rel === "shortcut icon") {
							$(this).remove();
						}
					});
					c.append($('<link rel="shortcut icon" href="' + i["favicon"] + '" />'));
				}
				if (g("phone")) {
					c.find("[rel=apple-touch-icon]").remove();
					c.find("[rel=apple-touch-icon-precomposed]").remove();
				}
				for (var e in s) {
					i[e] = i[e] || g(e);
					if (i[e]) {
						var f = s[e];
						c.append($('<link rel="apple-touch-icon' + p + '" ' + (f ? 'sizes="' + f + '"' : "") + ' href="' + i[e] + '" />'));
					}
				}
			};
			$.sap.setMobileWebAppCapable = function (v) {
				if (!D.system.tablet && !D.system.phone) {
					return;
				}
				var h = $("head"),
					p = ["", "apple"],
					n = "mobile-web-app-capable",
					c = v ? "yes" : "no",
					i, N, w;
				for (i = 0; i < p.length; i++) {
					N = p[i] ? (p[i] + "-" + n) : n;
					w = h.children('meta[name="' + N + '"]');
					if (w.length) {
						w.attr("content", c);
					} else {
						h.append($('<meta name="' + N + '" content="' + c + '">'));
					}
				}
			};
		})(q);
		return q;
	});
	sap.ui.predefine('jquery.sap.properties', ['jquery.sap.global', 'sap/ui/Device'], function (q, D) {
		"use strict";
		var P = function () {
			this.mProperties = {};
			this.aKeys = null;
		};
		P.prototype.getProperty = function (k, d) {
			var v = this.mProperties[k];
			if (typeof (v) == "string") {
				return v;
			} else if (d) {
				return d;
			}
			return null;
		};
		P.prototype.getKeys = function () {
			return this.aKeys || (this.aKeys = Object.keys(this.mProperties));
		};
		P.prototype.setProperty = function (k, v) {
			if (typeof (v) != "string") {
				return;
			}
			if (typeof (this.mProperties[k]) != "string" && this.aKeys) {
				this.aKeys.push(String(k));
			}
			this.mProperties[k] = v;
		};
		P.prototype.clone = function () {
			var c = new P();
			c.mProperties = q.extend({}, this.mProperties);
			return c;
		};
		var f = D.browser.chrome ? function (s, c) {
			if (c > 2 && 40 * c > s.length) {
				Number(s);
			}
			return s;
		} : function (s) {
			return s;
		};
		var r = /(?:\r\n|\r|\n|^)[ \t\f]*/;
		var a = /(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)|([ \t\f]*[ \t\f:=][ \t\f]*)/g;
		var b = /(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)/g;
		var e = {
			'\\f': '\f',
			'\\n': '\n',
			'\\r': '\r',
			'\\t': '\t'
		};

		function p(t, o) {
			var l = t.split(r),
				L, c, k, v, i, m, d, C;

			function g(s) {
				if (v) {
					v = v + s;
					C++;
				} else {
					v = s;
					C = 0;
				}
			}
			o.mProperties = {};
			for (i = 0; i < l.length; i++) {
				L = l[i];
				if (L === "" || L.charAt(0) === "#" || L.charAt(0) === "!") {
					continue;
				}
				c = a;
				c.lastIndex = d = 0;
				k = null;
				v = "";
				while ((m = c.exec(L)) !== null) {
					if (d < m.index) {
						g(L.slice(d, m.index));
					}
					d = c.lastIndex;
					if (m[1]) {
						if (m[1].length !== 6) {
							throw new Error("Incomplete Unicode Escape '" + m[1] + "'");
						}
						g(String.fromCharCode(parseInt(m[1].slice(2), 16)));
					} else if (m[2]) {
						g(e[m[2]] || m[2].slice(1));
					} else if (m[3]) {
						L = l[++i];
						c.lastIndex = d = 0;
					} else if (m[4]) {
						k = v;
						v = "";
						c = b;
						c.lastIndex = d;
					}
				}
				if (d < L.length) {
					g(L.slice(d));
				}
				if (k == null) {
					k = v;
					v = "";
				}
				o.mProperties[k] = f(v, v ? C : 0);
			}
		}
		q.sap.properties = function properties(m) {
			m = q.extend({
				url: undefined,
				headers: {}
			}, m);
			var A = !!m.async,
				o = new P(),
				R;

			function _(t) {
				if (typeof t === "string") {
					p(t, o);
					return o;
				}
				return m.returnNullIfMissing ? null : o;
			}
			if (typeof m.url === "string") {
				R = q.sap.loadResource({
					url: m.url,
					dataType: 'text',
					headers: m.headers,
					failOnError: false,
					async: A
				});
			}
			if (A) {
				if (!R) {
					return Promise.resolve(_(null));
				}
				return R.then(function (v) {
					return _(v);
				}, function (v) {
					throw (v instanceof Error ? v : new Error("Problem during loading of property file '" + m.url + "': " + v));
				});
			}
			return _(R);
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.resources', ['jquery.sap.global', 'jquery.sap.properties', 'jquery.sap.strings'], function (q) {
		"use strict";
		var r = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
		var M = {
			"he": "iw",
			"yi": "ji",
			"id": "in",
			"sr": "sh"
		};
		var a = {
			"iw": "he",
			"ji": "yi",
			"in": "id",
			"sn": "sr"
		};
		var b = {
			"en_US_saptrc": "1Q",
			"en_US_sappsd": "2Q"
		};
		var c = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;

		function n(L) {
			var m;
			if (typeof L === 'string' && (m = r.exec(L.replace(/_/g, '-')))) {
				var i = m[1].toLowerCase();
				i = M[i] || i;
				var S = m[2] ? m[2].toLowerCase() : undefined;
				var R = m[3] ? m[3].toUpperCase() : undefined;
				var v = m[4] ? m[4].slice(1) : undefined;
				var p = m[6];
				if ((p && (m = c.exec(p))) || (v && (m = c.exec(v)))) {
					return "en_US_" + m[1].toLowerCase();
				}
				if (i === "zh" && !R) {
					if (S === "hans") {
						R = "CN";
					} else if (S === "hant") {
						R = "TW";
					}
				}
				return i + (R ? "_" + R + (v ? "_" + v.replace("-", "_") : "") : "");
			}
		}

		function d() {
			var L;
			if (window.sap && window.sap.ui && sap.ui.getCore) {
				L = sap.ui.getCore().getConfiguration().getLanguage();
				L = n(L);
			}
			return L || "en";
		}

		function e(L) {
			if (!L) {
				return null;
			}
			if (L === "zh_HK") {
				return "zh_TW";
			}
			var p = L.lastIndexOf('_');
			if (p >= 0) {
				return L.slice(0, p);
			}
			return L !== 'en' ? 'en' : '';
		}

		function f(L) {
			var m;
			if (typeof L === 'string' && (m = r.exec(L.replace(/_/g, '-')))) {
				var i = m[1].toLowerCase();
				i = a[i] || i;
				return i + (m[3] ? "-" + m[3].toUpperCase() + (m[4] ? "-" + m[4].slice(1).replace("_", "-") : "") : "");
			}
		}
		var g = /^((?:[^?#]*\/)?[^\/?#]*)(\.[^.\/?#]+)((?:\?([^#]*))?(?:#(.*))?)$/;
		var A = [".properties", ".hdbtextbundle"];

		function s(u) {
			var m = g.exec(u);
			if (!m || A.indexOf(m[2]) < 0) {
				throw new Error("resource URL '" + u + "' has unknown type (should be one of " + A.join(",") + ")");
			}
			return {
				url: u,
				prefix: m[1],
				ext: m[2],
				query: m[4],
				hash: (m[5] || ""),
				suffix: m[2] + (m[3] || "")
			};
		}

		function B(u, L, i, k) {
			this.sLocale = this._sNextLocale = n(L) || d();
			this.oUrlInfo = s(u);
			this.bIncludeInfo = i;
			this.aCustomBundles = [];
			this.aPropertyFiles = [];
			this.aLocales = [];
			if (k) {
				var m = function () {
					return this;
				}.bind(this);
				return l(this).then(m, m);
			}
			h(this);
		}
		B.prototype._enhance = function (C) {
			if (C instanceof B) {
				this.aCustomBundles.push(C);
			} else {
				q.sap.log.error("Custom ResourceBundle is either undefined or not an instanceof jQuery.sap.util.ResourceBundle. Therefore this custom ResourceBundle will be ignored!");
			}
		};
		B.prototype.getText = function (k, m, C) {
			var v = null,
				i;
			for (i = this.aCustomBundles.length - 1; i >= 0; i--) {
				v = this.aCustomBundles[i].getText(k, m, true);
				if (v != null) {
					return v;
				}
			}
			for (i = 0; i < this.aPropertyFiles.length; i++) {
				v = this.aPropertyFiles[i].getProperty(k);
				if (typeof v === "string") {
					break;
				}
			}
			while (typeof v !== "string" && this._sNextLocale != null) {
				var p = h(this);
				if (p) {
					v = p.getProperty(k);
				}
			}
			if (!C && typeof v !== "string") {
				v = k;
			}
			if (typeof v === "string") {
				if (m) {
					v = q.sap.formatMessage(v, m);
				}
				if (this.bIncludeInfo) {
					v = new String(v);
					v.originInfo = {
						source: "Resource Bundle",
						url: this.oUrlInfo.url,
						locale: this.sLocale,
						key: k
					};
				}
			}
			return v;
		};
		B.prototype.hasText = function (k) {
			return this.aPropertyFiles.length > 0 && typeof this.aPropertyFiles[0].getProperty(k) === "string";
		};

		function l(o) {
			if (o._sNextLocale != null) {
				return t(o, true).then(function (p) {
					return p || l(o);
				});
			}
			return Promise.resolve(null);
		}

		function h(o) {
			while (o._sNextLocale != null) {
				var p = t(o, false);
				if (p) {
					return p;
				}
			}
			return null;
		}

		function j(L, S) {
			return !S || S.length === 0 || S.indexOf(L) >= 0;
		}

		function t(o, i) {
			var L = o._sNextLocale;
			o._sNextLocale = e(L);
			var S = window.sap && window.sap.ui && sap.ui.getCore && sap.ui.getCore().getConfiguration().getSupportedLanguages();
			if (L != null && j(L, S)) {
				var u = o.oUrlInfo,
					U, H;
				if (u.ext === '.hdbtextbundle') {
					if (b[L]) {
						U = u.prefix + u.suffix + '?' + (u.query ? u.query + "&" : "") + "sap-language=" + b[L] + (u.hash ? "#" + u.hash : "");
					} else {
						U = u.url;
					}
					H = {
						"Accept-Language": f(L) || ""
					};
				} else {
					U = u.prefix + (L ? "_" + L : "") + u.suffix;
				}
				var p = q.sap.properties({
					url: U,
					headers: H,
					async: !!i,
					returnNullIfMissing: true
				});
				var k = function (P) {
					if (P) {
						o.aPropertyFiles.push(P);
						o.aLocales.push(L);
					}
					return P;
				};
				return i ? p.then(k) : k(p);
			}
			return i ? Promise.resolve(null) : null;
		}
		q.sap.resources = function resources(p) {
			p = q.extend({
				url: "",
				locale: undefined,
				includeInfo: false
			}, p);
			return new B(p.url, p.locale, p.includeInfo, !!p.async);
		};
		q.sap.resources.isBundle = function (o) {
			return o instanceof B;
		};
		q.sap.resources._getFallbackLocales = function (L, S) {
			var T = n(L),
				i = [];
			while (T != null) {
				if (j(T, S)) {
					i.push(T);
				}
				T = e(T);
			}
			return i;
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.script', ['jquery.sap.global'], function (q) {
		"use strict";
		var I = 0;
		q.sap.uid = function uid() {
			return "id-" + new Date().valueOf() + "-" + I++;
		};
		q.sap.hashCode = function (s) {
			var i = s.length,
				h = 0;
			while (i--) {
				h = (h << 5) - h + s.charCodeAt(i);
				h = h & h;
			}
			return h;
		};
		q.sap.delayedCall = function delayedCall(d, o, m, p) {
			return setTimeout(function () {
				if (q.type(m) == "string") {
					m = o[m];
				}
				m.apply(o, p || []);
			}, d);
		};
		q.sap.clearDelayedCall = function clearDelayedCall(d) {
			clearTimeout(d);
			return this;
		};
		q.sap.intervalCall = function intervalCall(i, o, m, p) {
			return setInterval(function () {
				if (q.type(m) == "string") {
					m = o[m];
				}
				m.apply(o, p || []);
			}, i);
		};
		q.sap.clearIntervalCall = function clearIntervalCall(i) {
			clearInterval(i);
			return this;
		};
		var U = function (u) {
			this.mParams = {};
			var Q = u || window.location.href;
			if (Q.indexOf('#') >= 0) {
				Q = Q.slice(0, Q.indexOf('#'));
			}
			if (Q.indexOf("?") >= 0) {
				Q = Q.slice(Q.indexOf("?") + 1);
				var p = Q.split("&"),
					P = {},
					a, n, v;
				for (var i = 0; i < p.length; i++) {
					a = p[i].split("=");
					n = decodeURIComponent(a[0]);
					v = a.length > 1 ? decodeURIComponent(a[1].replace(/\+/g, ' ')) : "";
					if (n) {
						if (!Object.prototype.hasOwnProperty.call(P, n)) {
							P[n] = [];
						}
						P[n].push(v);
					}
				}
				this.mParams = P;
			}
		};
		U.prototype = {};
		U.prototype.get = function (n, a) {
			var v = Object.prototype.hasOwnProperty.call(this.mParams, n) ? this.mParams[n] : [];
			return a === true ? v : (v[0] || null);
		};
		q.sap.getUriParameters = function getUriParameters(u) {
			return new U(u);
		};
		q.sap.unique = function (a) {
			var l = a.length;
			if (l > 1) {
				a.sort();
				var j = 0;
				for (var i = 1; i < l; i++) {
					if (a[i] !== a[j]) {
						a[++j] = a[i];
					}
				}
				if (++j < l) {
					a.splice(j, l - j);
				}
			}
			return a;
		};
		q.sap.equal = function (a, b, m, c, d) {
			if (typeof m == "boolean") {
				c = m;
				m = undefined;
			}
			if (!d) {
				d = 0;
			}
			if (!m) {
				m = 10;
			}
			if (d > m) {
				return false;
			}
			if (a === b) {
				return true;
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (!c && a.length !== b.length) {
					return false;
				}
				if (a.length > b.length) {
					return false;
				}
				for (var i = 0; i < a.length; i++) {
					if (!q.sap.equal(a[i], b[i], m, c, d + 1)) {
						return false;
					}
				}
				return true;
			}
			if (typeof a == "object" && typeof b == "object") {
				if (!a || !b) {
					return false;
				}
				if (a.constructor !== b.constructor) {
					return false;
				}
				if (!c && Object.keys(a).length !== Object.keys(b).length) {
					return false;
				}
				if (a.nodeName && b.nodeName && a.namespaceURI && b.namespaceURI) {
					return a.isEqualNode(b);
				}
				if (a instanceof Date) {
					return a.valueOf() === b.valueOf();
				}
				for (var i in a) {
					if (!q.sap.equal(a[i], b[i], m, c, d + 1)) {
						return false;
					}
				}
				return true;
			}
			return false;
		};
		q.sap.each = function (o, c) {
			var a = Array.isArray(o),
				l, i;
			if (a) {
				for (i = 0, l = o.length; i < l; i++) {
					if (c.call(o[i], i, o[i]) === false) {
						break;
					}
				}
			} else {
				for (i in o) {
					if (c.call(o[i], i, o[i]) === false) {
						break;
					}
				}
			}
			return o;
		};
		q.sap.forIn = function (o, c) {
			for (var n in o) {
				if (c(n, o[n]) === false) {
					return;
				}
			}
		};
		q.sap.arraySymbolDiff = function (o, n, s) {
			var S = {},
				O = [],
				N = [],
				a, v, b, c = 0,
				d = 0,
				e, f, g, h, D = [];
			if (o === n || q.sap.equal(o, n)) {
				return D;
			}
			s = s || function (V) {
				if (typeof V !== "string") {
					V = JSON.stringify(V) || "";
				}
				return q.sap.hashCode(V);
			};
			for (var i = 0; i < n.length; i++) {
				v = s(n[i]);
				b = S[v];
				if (!b) {
					b = S[v] = {
						iNewCount: 0,
						iOldCount: 0
					};
				}
				b.iNewCount++;
				N[i] = {
					symbol: b
				};
			}
			for (var i = 0; i < o.length; i++) {
				v = s(o[i]);
				b = S[v];
				if (!b) {
					b = S[v] = {
						iNewCount: 0,
						iOldCount: 0
					};
				}
				b.iOldCount++;
				b.iOldLine = i;
				O[i] = {
					symbol: b
				};
			}
			for (var i = 0; i < N.length; i++) {
				b = N[i].symbol;
				if (b.iNewCount === 1 && b.iOldCount === 1) {
					N[i].line = b.iOldLine;
					O[b.iOldLine].line = i;
				}
			}
			for (var i = 0; i < N.length - 1; i++) {
				a = N[i].line;
				if (a !== undefined && a < O.length - 1) {
					if (O[a + 1].symbol === N[i + 1].symbol) {
						O[a + 1].line = i + 1;
						N[i + 1].line = a + 1;
					}
				}
			}
			for (var i = N.length - 1; i > 0; i--) {
				a = N[i].line;
				if (a !== undefined && a > 0) {
					if (O[a - 1].symbol === N[i - 1].symbol) {
						O[a - 1].line = i - 1;
						N[i - 1].line = a - 1;
					}
				}
			}
			while (c < o.length || d < n.length) {
				f = O[c] && O[c].line;
				e = N[d] && N[d].line;
				if (c < o.length && (f === undefined || f < d)) {
					D.push({
						index: d,
						type: "delete"
					});
					c++;
				} else if (d < n.length && (e === undefined || e < c)) {
					D.push({
						index: d,
						type: "insert"
					});
					d++;
				} else if (d === f) {
					d++;
					c++;
				} else {
					h = f - d;
					g = e - c;
					if (h <= g) {
						D.push({
							index: d,
							type: "insert"
						});
						d++;
					} else {
						D.push({
							index: d,
							type: "delete"
						});
						c++;
					}
				}
			}
			return D;
		};
		q.sap.arrayDiff = function (o, n, c, u) {
			c = c || function (v, V) {
				return q.sap.equal(v, V);
			};
			var O = [];
			var N = [];
			var m = [];
			for (var i = 0; i < n.length; i++) {
				var a = n[i];
				var f = 0;
				var t;
				if (u && c(o[i], a)) {
					f = 1;
					t = i;
				} else {
					for (var j = 0; j < o.length; j++) {
						if (c(o[j], a)) {
							f++;
							t = j;
							if (u || f > 1) {
								break;
							}
						}
					}
				}
				if (f == 1) {
					var M = {
						oldIndex: t,
						newIndex: i
					};
					if (m[t]) {
						delete O[t];
						delete N[m[t].newIndex];
					} else {
						N[i] = {
							data: n[i],
							row: t
						};
						O[t] = {
							data: o[t],
							row: i
						};
						m[t] = M;
					}
				}
			}
			for (var i = 0; i < n.length - 1; i++) {
				if (N[i] && !N[i + 1] && N[i].row + 1 < o.length && !O[N[i].row + 1] && c(o[N[i].row + 1], n[i + 1])) {
					N[i + 1] = {
						data: n[i + 1],
						row: N[i].row + 1
					};
					O[N[i].row + 1] = {
						data: O[N[i].row + 1],
						row: i + 1
					};
				}
			}
			for (var i = n.length - 1; i > 0; i--) {
				if (N[i] && !N[i - 1] && N[i].row > 0 && !O[N[i].row - 1] && c(o[N[i].row - 1], n[i - 1])) {
					N[i - 1] = {
						data: n[i - 1],
						row: N[i].row - 1
					};
					O[N[i].row - 1] = {
						data: O[N[i].row - 1],
						row: i - 1
					};
				}
			}
			var d = [];
			if (n.length == 0) {
				for (var i = 0; i < o.length; i++) {
					d.push({
						index: 0,
						type: 'delete'
					});
				}
			} else {
				var b = 0;
				if (!O[0]) {
					for (var i = 0; i < o.length && !O[i]; i++) {
						d.push({
							index: 0,
							type: 'delete'
						});
						b = i + 1;
					}
				}
				for (var i = 0; i < n.length; i++) {
					if (!N[i] || N[i].row > b) {
						d.push({
							index: i,
							type: 'insert'
						});
					} else {
						b = N[i].row + 1;
						for (var j = N[i].row + 1; j < o.length && (!O[j] || O[j].row < i); j++) {
							d.push({
								index: i + 1,
								type: 'delete'
							});
							b = j + 1;
						}
					}
				}
			}
			return d;
		};
		q.sap._createJSTokenizer = function () {
			var a, b, e = {
					'"': '"',
					'\'': '\'',
					'\\': '\\',
					'/': '/',
					b: '\b',
					f: '\f',
					n: '\n',
					r: '\r',
					t: '\t'
				},
				t, d = function (m) {
					throw {
						name: 'SyntaxError',
						message: m,
						at: a,
						text: t
					};
				},
				n = function (c) {
					if (c && c !== b) {
						d("Expected '" + c + "' instead of '" + b + "'");
					}
					b = t.charAt(a);
					a += 1;
					return b;
				},
				f = function () {
					var f, s = '';
					if (b === '-') {
						s = '-';
						n('-');
					}
					while (b >= '0' && b <= '9') {
						s += b;
						n();
					}
					if (b === '.') {
						s += '.';
						while (n() && b >= '0' && b <= '9') {
							s += b;
						}
					}
					if (b === 'e' || b === 'E') {
						s += b;
						n();
						if (b === '-' || b === '+') {
							s += b;
							n();
						}
						while (b >= '0' && b <= '9') {
							s += b;
							n();
						}
					}
					f = +s;
					if (!isFinite(f)) {
						d("Bad number");
					} else {
						return f;
					}
				},
				s = function () {
					var c, i, s = '',
						k, u;
					if (b === '"' || b === '\'') {
						k = b;
						while (n()) {
							if (b === k) {
								n();
								return s;
							}
							if (b === '\\') {
								n();
								if (b === 'u') {
									u = 0;
									for (i = 0; i < 4; i += 1) {
										c = parseInt(n(), 16);
										if (!isFinite(c)) {
											break;
										}
										u = u * 16 + c;
									}
									s += String.fromCharCode(u);
								} else if (typeof e[b] === 'string') {
									s += e[b];
								} else {
									break;
								}
							} else {
								s += b;
							}
						}
					}
					d("Bad string");
				},
				g = function () {
					var g = '',
						c = function (b) {
							return b === "_" || b === "$" || (b >= "0" && b <= "9") || (b >= "a" && b <= "z") || (b >= "A" && b <= "Z");
						};
					if (c(b)) {
						g += b;
					} else {
						d("Bad name");
					}
					while (n()) {
						if (b === ' ') {
							n();
							return g;
						}
						if (b === ':') {
							return g;
						}
						if (c(b)) {
							g += b;
						} else {
							d("Bad name");
						}
					}
					d("Bad name");
				},
				w = function () {
					while (b && b <= ' ') {
						n();
					}
				},
				h = function () {
					switch (b) {
						case 't':
							n('t');
							n('r');
							n('u');
							n('e');
							return true;
						case 'f':
							n('f');
							n('a');
							n('l');
							n('s');
							n('e');
							return false;
						case 'n':
							n('n');
							n('u');
							n('l');
							n('l');
							return null;
					}
					d("Unexpected '" + b + "'");
				},
				v, j = function () {
					var j = [];
					if (b === '[') {
						n('[');
						w();
						if (b === ']') {
							n(']');
							return j;
						}
						while (b) {
							j.push(v());
							w();
							if (b === ']') {
								n(']');
								return j;
							}
							n(',');
							w();
						}
					}
					d("Bad array");
				},
				o = function () {
					var k, o = {};
					if (b === '{') {
						n('{');
						w();
						if (b === '}') {
							n('}');
							return o;
						}
						while (b) {
							if (b >= "0" && b <= "9") {
								k = f();
							} else if (b === '"' || b === '\'') {
								k = s();
							} else {
								k = g();
							}
							w();
							n(':');
							if (Object.hasOwnProperty.call(o, k)) {
								d('Duplicate key "' + k + '"');
							}
							o[k] = v();
							w();
							if (b === '}') {
								n('}');
								return o;
							}
							n(',');
							w();
						}
					}
					d("Bad object");
				};
			v = function () {
				w();
				switch (b) {
					case '{':
						return o();
					case '[':
						return j();
					case '"':
					case '\'':
						return s();
					case '-':
						return f();
					default:
						return b >= '0' && b <= '9' ? f() : h();
				}
			};

			function p(c, i) {
				var r;
				t = c;
				a = i || 0;
				b = ' ';
				r = v();
				if (isNaN(i)) {
					w();
					if (b) {
						d("Syntax error");
					}
					return r;
				} else {
					return {
						result: r,
						at: a - 1
					};
				}
			}
			return {
				array: j,
				error: d,
				getIndex: function () {
					return a - 1;
				},
				getCh: function () {
					return b;
				},
				init: function (c, i) {
					t = c;
					a = i || 0;
					b = ' ';
				},
				name: g,
				next: n,
				number: f,
				parseJS: p,
				setIndex: function (i) {
					if (i < a - 1) {
						throw new Error("Must not set index " + i + " before previous index " + (a - 1));
					}
					a = i;
					n();
				},
				string: s,
				value: v,
				white: w,
				word: h
			};
		};
		q.sap.parseJS = q.sap._createJSTokenizer().parseJS;
		q.sap.extend = function () {
			var s, c, a, n, o, b, t = arguments[0] || {},
				i = 1,
				l = arguments.length,
				d = false;
			if (typeof t === "boolean") {
				d = t;
				t = arguments[i] || {};
				i++;
			}
			if (typeof t !== "object" && !q.isFunction(t)) {
				t = {};
			}
			for (; i < l; i++) {
				o = arguments[i];
				for (n in o) {
					s = t[n];
					a = o[n];
					if (t === a) {
						continue;
					}
					if (d && a && (q.isPlainObject(a) || (c = Array.isArray(a)))) {
						if (c) {
							c = false;
							b = Array.isArray(s) ? s : [];
						} else {
							b = s && q.isPlainObject(s) ? s : {};
						}
						t[n] = q.sap.extend(d, b, a);
					} else {
						t[n] = a;
					}
				}
			}
			return t;
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.sjax', ['jquery.sap.global'], function (q) {
		"use strict";
		q.sap.sjaxSettings = {
			complexResult: true,
			fallback: undefined
		};
		q.sap.sjax = function sjax(o) {
			var s = q.extend(true, {}, q.sap.sjaxSettings, o, {
				async: false,
				success: function (d, t, x) {
					r = {
						success: true,
						data: d,
						status: t,
						statusCode: x && x.status
					};
				},
				error: function (x, t, e) {
					r = {
						success: false,
						data: undefined,
						status: t,
						error: e,
						statusCode: x.status,
						errorResponse: x.responseText
					};
				}
			});
			var r;
			q.ajax(s);
			if (!s.complexResult) {
				return r.success ? r.data : s.fallback;
			}
			return r;
		};
		q.sap.syncHead = function (u) {
			return q.sap.sjax({
				type: 'HEAD',
				url: u
			}).success;
		};
		q.sap.syncGet = function syncGet(u, d, D) {
			return q.sap.sjax({
				url: u,
				data: d,
				type: 'GET',
				dataType: D || 'text'
			});
		};
		q.sap.syncPost = function syncPost(u, d, D) {
			return q.sap.sjax({
				url: u,
				data: d,
				type: 'POST',
				dataType: D || 'text'
			});
		};
		q.sap.syncGetText = function syncGetText(u, d, f) {
			return q.sap.sjax({
				url: u,
				data: d,
				type: 'GET',
				dataType: 'text',
				fallback: f,
				complexResult: (arguments.length < 3)
			});
		};
		q.sap.syncGetJSON = function syncGetJSON(u, d, f) {
			return q.sap.sjax({
				url: u,
				data: d || null,
				type: 'GET',
				dataType: 'json',
				fallback: f,
				complexResult: (arguments.length < 3)
			});
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.strings', ['jquery.sap.global'], function (q) {
		"use strict";
		q.sap.endsWith = function endsWith(s, e) {
			if (typeof (e) != "string" || e == "") {
				return false;
			}
			var p = s.lastIndexOf(e);
			return p >= 0 && p == s.length - e.length;
		};
		q.sap.endsWithIgnoreCase = function endsWithIgnoreCase(s, e) {
			if (typeof (e) != "string" || e == "") {
				return false;
			}
			s = s.toUpperCase();
			e = e.toUpperCase();
			return q.sap.endsWith(s, e);
		};
		q.sap.startsWith = function startsWith(s, S) {
			if (typeof (S) != "string" || S == "") {
				return false;
			}
			if (s == S) {
				return true;
			}
			return s.indexOf(S) == 0;
		};
		q.sap.startsWithIgnoreCase = function startsWithIgnoreCase(s, S) {
			if (typeof (S) != "string" || S == "") {
				return false;
			}
			s = s.toUpperCase();
			S = S.toUpperCase();
			return q.sap.startsWith(s, S);
		};
		q.sap.charToUpperCase = function charToUpperCase(s, p) {
			if (!s) {
				return s;
			}
			if (!p || isNaN(p) || p <= 0 || p >= s.length) {
				p = 0;
			}
			var C = s.charAt(p).toUpperCase();
			if (p > 0) {
				return s.substring(0, p) + C + s.substring(p + 1);
			}
			return C + s.substring(p + 1);
		};
		q.sap.padLeft = function padLeft(s, p, l) {
			if (!s) {
				s = "";
			}
			while (s.length < l) {
				s = p + s;
			}
			return s;
		};
		q.sap.padRight = function padRight(s, p, l) {
			if (!s) {
				s = "";
			}
			while (s.length < l) {
				s = s + p;
			}
			return s;
		};
		var r = /-(.)/ig;
		q.sap.camelCase = function camelCase(s) {
			return s.replace(r, function (m, C) {
				return C.toUpperCase();
			});
		};
		var a = /([A-Z])/g;
		q.sap.hyphen = function hyphen(s) {
			return s.replace(a, function (m, C) {
				return "-" + C.toLowerCase();
			});
		};
		var b = /[[\]{}()*+?.\\^$|]/g;
		q.sap.escapeRegExp = function escapeRegExp(s) {
			return s.replace(b, "\\$&");
		};
		q.sap.formatMessage = function formatMessage(p, v) {
			if (arguments.length > 2 || (v != null && !Array.isArray(v))) {
				v = Array.prototype.slice.call(arguments, 1);
			}
			v = v || [];
			return p.replace(c, function ($, d, e, f, o) {
				if (d) {
					return "'";
				} else if (e) {
					return e.replace(/''/g, "'");
				} else if (f) {
					return String(v[parseInt(f, 10)]);
				}
				throw new Error("formatMessage: pattern syntax error at pos. " + o);
			});
		};
		var c = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
		return q;
	});
	sap.ui.predefine('jquery.sap.trace', ['jquery.sap.global', 'sap/ui/thirdparty/URI', 'sap/ui/Device', 'sap/ui/Global'], function (q, U, D) {
		"use strict";
		var f = k(),
			t, I, m, R = E(),
			C = E().substr(-8, 8) + R,
			H = window.location.host,
			a = D.os.name + "_" + D.os.version,
			b = D.browser.name + "_" + D.browser.version,
			A = "",
			c = "",
			e, T, F, p = {},
			S = 0,
			d, o, g, h, j = 0;

		function k() {
			var i = !!document.querySelector("meta[name=sap-ui-fesr][content=true]"),
				P = window.location.search.match(/[\?|&]sap-ui-(?:xx-)?fesr=(true|x|X|false)&?/);
			if (P) {
				i = P[1] && P[1] != "false";
			}
			return i;
		}

		function l() {
			if (!(window.performance && window.performance.getEntries)) {
				q.sap.log.warning("Interaction tracking is not supported on browsers with insufficient performance API");
			}
			if (!m) {
				m = true;
				var X = window.XMLHttpRequest.prototype.open,
					i = window.XMLHttpRequest.prototype.send,
					s = window.XMLHttpRequest.prototype.setRequestHeader;
				window.XMLHttpRequest.prototype.open = function () {
					X.apply(this, arguments);
					if (I || f || t) {
						var G = new U(arguments[1]).host();
						if (!G || G === H) {
							T = E();
							if (I || f) {
								this.addEventListener("readystatechange", n);
								this.pendingInteraction = p;
								if (f) {
									if (g) {
										this.setRequestHeader("SAP-Perf-FESRec", g);
										this.setRequestHeader("SAP-Perf-FESRec-opt", h);
										g = null;
										h = null;
										F = T;
										S++;
									} else if (!F) {
										F = T;
									}
									if (c != p.appVersion) {
										c = p.appVersion;
										A = c ? w(c) : "";
									}
									this.setRequestHeader("SAP-PASSPORT", B(e, R, T, p.component + A, p.trigger + "_" + p.event + "_" + S));
								}
							}
							if (!f && t) {
								this.setRequestHeader("SAP-PASSPORT", B(e, R, T));
							}
						}
					}
				};
				window.XMLHttpRequest.prototype.send = function () {
					i.apply(this, arguments);
					if ((I || f) && this.pendingInteraction) {
						this.pendingInteraction.bytesSent += arguments[0] ? arguments[0].length * 2 : 0;
					}
				};
				window.XMLHttpRequest.prototype.setRequestHeader = function (G, V) {
					s.apply(this, arguments);
					if (I || f) {
						if (!this.requestHeaderLength) {
							this.requestHeaderLength = 0;
						}
						this.requestHeaderLength += (G.length + V.length + 3) * 2;
					}
				};
				window.addEventListener("scroll", q.sap.interaction.notifyScrollEvent);
				window.addEventListener("mousewheel", q.sap.interaction.notifyScrollEvent);
			}
		}

		function n() {
			if (this.readyState === 4 && this.pendingInteraction && !this.pendingInteraction.completed) {
				var s = this.getResponseHeader("content-length"),
					i = this.getResponseHeader("content-encoding") === "gzip",
					G = this.getResponseHeader("sap-perf-fesrec");
				this.pendingInteraction.bytesReceived += s ? parseInt(s, 10) : 0;
				this.pendingInteraction.bytesReceived += this.getAllResponseHeaders().length * 2;
				this.pendingInteraction.bytesSent += this.requestHeaderLength || 0;
				this.pendingInteraction.requestCompression = i && (this.pendingInteraction.requestCompression !== false);
				this.pendingInteraction.networkTime += G ? Math.round(parseFloat(G, 10) / 1000) : 0;
				var J = this.getResponseHeader("sap-statistics");
				if (J) {
					var K = q.sap.measure.getRequestTimings();
					this.pendingInteraction.sapStatistics.push({
						url: this.responseURL,
						statistics: J,
						timing: K ? K[K.length - 1] : undefined
					});
				}
				delete this.requestHeaderLength;
				delete this.pendingInteraction;
			}
		}

		function r(i) {
			return [v(R, 32), v(F, 32), v(i.navigation, 16), v(i.roundtrip, 16), v(i.duration, 16), v(i.requests.length - i.incompleteRequests, 8), v(C, 40), v(i.networkTime, 16), v(i.requestTime, 16), v(a, 20), "SAP_UI5"].join(",");
		}

		function u(i) {
			return [v(i.component, 20, true), v(i.trigger + "_" + i.event, 20, true), "", v(b, 20), v(i.bytesSent, 16), v(i.bytesReceived, 16), "", "", v(i.processing, 16), i.requestCompression ? "X" : "", "", "", "", "", v(i.busyDuration, 16), "", "", "", "", v(i.component, 70, true)].join(",");
		}

		function v(i, L, s) {
			if (!i) {
				i = i === 0 ? "0" : "";
			} else if (typeof i === "number") {
				var G = i;
				i = Math.round(i).toString();
				if (i.length > L || G < 0) {
					i = "-1";
				}
			} else {
				i = s ? i.substr(-L, L) : i.substr(0, L);
			}
			return i;
		}

		function w(V) {
			var i = new q.sap.Version(V);
			return "@" + i.getMajor() + "." + i.getMinor() + "." + i.getPatch();
		}
		q.sap.interaction = {};
		q.sap.interaction.setActive = function (i) {
			if (i && !I) {
				l();
			}
			I = i;
		};
		q.sap.interaction.getActive = function () {
			return I || f;
		};
		q.sap.interaction.notifyStepStart = function (i, s) {
			if (I || f) {
				if (o || s) {
					var G;
					if (s) {
						G = "startup";
					} else if (o.originalEvent) {
						G = o.originalEvent.type;
					} else {
						G = o.type;
					}
					q.sap.measure.startInteraction(G, i);
					var J = q.sap.measure.getAllInteractionMeasurements();
					var K = J[J.length - 1];
					var P = q.sap.measure.getPendingInteractionMeasurement();
					p = P ? P : p;
					if (f && K && K.requests.length > 0) {
						g = r(K);
						h = u(K);
					}
					o = null;
				}
			}
		};
		q.sap.interaction.notifyStepEnd = function () {
			if (I || f) {
				if (d) {
					q.sap.clearDelayedCall(d);
				}
				d = q.sap.delayedCall(1, q.sap.measure, "endInteraction");
			}
		};
		q.sap.interaction.notifyEventStart = function (i) {
			o = (I || f) ? i : null;
		};

		function x() {
			q.sap.interaction.notifyStepStart();
			j = 0;
		}
		q.sap.interaction.notifyScrollEvent = function (i) {
			if (I || f) {
				if (!j) {
					q.sap.interaction.notifyEventStart(i);
				} else {
					q.sap.clearDelayedCall(j);
				}
				j = q.sap.delayedCall(250, undefined, x);
			}
		};
		q.sap.interaction.notifyEventEnd = function () {
			if (o) {
				if (o.type.match(/^(mousedown|touchstart|keydown)$/)) {
					q.sap.measure.endInteraction(true);
				}
			}
		};
		q.sap.interaction.setStepComponent = function (s) {
			if ((I || f) && s) {
				p.component = s;
			}
		};
		q.sap.fesr = {};
		q.sap.fesr.setActive = function (i) {
			if (i && !f) {
				f = true;
				if (!I) {
					l();
				}
			} else if (!i) {
				f = false;
			}
		};
		q.sap.fesr.getActive = function () {
			return f;
		};
		q.sap.fesr.getCurrentTransactionId = function () {
			return T;
		};
		q.sap.fesr.getRootId = function () {
			return R;
		};
		q.sap.fesr.addBusyDuration = function (i) {
			if (!p.busyDuration) {
				p.busyDuration = 0;
			}
			p.busyDuration += i;
		};
		q.sap.passport = {};
		q.sap.passport.setActive = function (i) {
			if (i && !t) {
				t = true;
				l();
			} else if (!i) {
				t = false;
			}
		};

		function y(s) {
			var G = [];
			for (var i = 0; i < s.length; ++i) {
				G.push(s.charCodeAt(i));
			}
			return G;
		}

		function z(s) {
			var G = "";
			for (var i = 0; i < s.length; i++) {
				var J = s[i].toString(16);
				J = Array(2 - J.length + 1).join("0") + J;
				G += J;
			}
			return G;
		}

		function B(i, s, G, J, K) {
			var L = [0x2A, 0x54, 0x48, 0x2A, 0x03, 0x00, 0xE6, 0x00, 0x00, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x50, 0x6C, 0x75, 0x67, 0x49, 0x6E, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x55, 0x73, 0x65, 0x72, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00, 0x05, 0x53, 0x41, 0x50, 0x5F, 0x45, 0x32, 0x45, 0x5F, 0x54, 0x41, 0x5F, 0x50, 0x6C, 0x75, 0x67, 0x49, 0x6E, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x34, 0x36, 0x33, 0x35, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x33, 0x31, 0x31, 0x45, 0x45, 0x30, 0x41, 0x35, 0x44, 0x32, 0x35, 0x30, 0x39, 0x39, 0x39, 0x43, 0x33, 0x39, 0x32, 0x42, 0x36, 0x38, 0x20, 0x20, 0x20, 0x00, 0x07, 0x46, 0x35, 0x00, 0x00, 0x00, 0x31, 0x1E, 0xE0, 0xA5, 0xD2, 0x4E, 0xDB, 0xB2, 0xE4, 0x4B, 0x68, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xE2, 0x2A, 0x54, 0x48, 0x2A];
			var M = [372, 32];
			var N = [149, 32];
			var O = [9, 32];
			var P = [117, 32];
			var Q = [75, 40];
			var V = [7, 2];
			var W = y("SAP_E2E_TA_UI5LIB");
			W = W.concat(y(new Array(32 + 1 - W.length).join(' ')));
			if (J) {
				J = y(J.substr(-32, 32));
				J = J.concat(y(new Array(32 + 1 - J.length).join(' ')));
				L.splice.apply(L, O.concat(J));
				L.splice.apply(L, P.concat(J));
			} else {
				L.splice.apply(L, O.concat(W));
				L.splice.apply(L, P.concat(W));
			}
			L.splice.apply(L, N.concat(y(G)));
			L.splice.apply(L, V.concat(i));
			if (K) {
				K = y(K.substr(-40, 40));
				K = K.concat(y(new Array(40 + 1 - K.length).join(' ')));
				L.splice.apply(L, Q.concat(K));
			}
			var X = z(L).toUpperCase();
			return X.substring(0, M[0]).concat(s) + X.substring(M[0] + M[1]);
		}
		q.sap.passport.traceFlags = function (i) {
			switch (i) {
				case 'low':
					e = [0x00, 0x00];
					break;
				case 'medium':
					e = [0x89, 0x0A];
					break;
				case 'high':
					e = [0x9F, 0x0D];
					break;
				default:
					e = [];
					e.push((parseInt(i, 16) & 0xFF00) / 256);
					e.push((parseInt(i, 16) & 0xFF));
			}
			return e;
		};

		function E() {
			var i = function () {
				var K = Math.floor(Math.random() * 0x10000);
				return (new Array(4 + 1 - K.toString(16).length)).join('0') + K.toString(16);
			};
			var s = function () {
				var K = (Math.floor(Math.random() * 0x10000) & 0x0fff) + 0x4000;
				return (new Array(4 + 1 - K.toString(16).length)).join('0') + K.toString(16);
			};
			var G = function () {
				var K = (Math.floor(Math.random() * 0x10000) & 0x3fff) + 0x8000;
				return (new Array(4 + 1 - K.toString(16).length)).join('0') + K.toString(16);
			};
			var J = (i() + i() + i() + s() + G() + i() + i() + i());
			return J.toUpperCase();
		}
		e = q.sap.passport.traceFlags();
		q.sap.interaction.notifyStepStart(null, true);
		if (f) {
			l();
		}
		if (/sap-ui-xx-e2e-trace=(true|x|X)/.test(location.search)) {
			sap.ui.requireSync("sap/ui/core/support/trace/E2eTraceLib");
		}
		return q;
	});
	sap.ui.predefine('jquery.sap.ui', ['jquery.sap.global', 'sap/ui/Global'], function (q) {
		"use strict";

		function u(i) {
			return sap.ui.getCore().getUIArea(this.id) != null;
		}

		function f(i, o) {
			return sap.ui.getCore().getUIArea(this.id);
		}

		function a(c, i) {
			return c.getUIArea().getInterface();
		}
		q.fn.root = function (r) {
			if (r) {
				sap.ui.getCore().setRoot(this.get(0), r);
				return this;
			}
			var c = this.control();
			if (c.length > 0) {
				return c.map(a);
			}
			var U = this.uiarea();
			if (U.length > 0) {
				return U;
			}
			this.each(function (i) {
				sap.ui.getCore().createUIArea(this);
			});
			return this;
		};
		q.fn.uiarea = function (i) {
			var U = this.slice("[id]").filter(u).map(f).get();
			return typeof (i) === "number" ? U[i] : U;
		};
		q.fn.control = function (i, I) {
			var c = this.map(function () {
				var C;
				if (I) {
					var $ = q(this).closest("[data-sap-ui],[data-sap-ui-related]");
					C = $.attr("data-sap-ui-related") || $.attr("id");
				} else {
					C = q(this).closest("[data-sap-ui]").attr("id");
				}
				return sap.ui.getCore().byId(C);
			});
			return c.get(i);
		};
		q.fn.sapui = function (c, i, C) {
			return this.each(function () {
				var o = null;
				if (this) {
					if (c.indexOf(".") == -1) {
						c = "sap.ui.commons." + c;
					}
					var b = q.sap.getObject(c);
					if (b) {
						if (typeof C == 'object' && typeof C.press == 'function') {
							C.press = q.proxy(C.press, this);
						}
						o = new(b)(i, C);
						o.placeAt(this);
					}
				}
			});
		};
		return q;
	});
	sap.ui.predefine('jquery.sap.unicode', ['jquery.sap.global', 'sap/ui/Device'], function (jQuery, Device) {
		'use strict';
		var bNativeSupport = !!String.prototype.normalize;
		if (!bNativeSupport && !Device.browser.mobile) {
			jQuery.sap.require("sap.ui.thirdparty.unorm");
			jQuery.sap.require("sap.ui.thirdparty.unormdata");
			String.prototype.normalize = function (s) {
				switch (s) {
					case 'NFC':
						return jQuery.sap.isStringNFC(this) ? this : UNorm.nfc(this);
					case 'NFD':
						return UNorm.nfd(this);
					case 'NFKC':
						return UNorm.nfkc(this);
					case 'NFKD':
						return UNorm.nfkd(this);
					default:
						return jQuery.sap.isStringNFC(this) ? this : UNorm.nfc(this);
				}
			};
		}
		var mData = {};
		(function () {
			var N = [
				[0x0340, 0x0341],
				[0x0343, 0x0344], 0x374, 0x037E, 0x387, [0x0958, 0x095F],
				[0x09DC, 0x09DD], 0x09DF, 0x0A33, 0x0A36, [0x0A59, 0x0A5B], 0x0A5E, [0x0B5C, 0x0B5D], 0x0F43, 0x0F4D, 0x0F52, 0x0F57, 0x0F5C, 0x0F69, 0x0F73, [0x0F75, 0x0F76], 0x0F78, 0x0F81, 0x0F93, 0x0F9D, 0x0FA2, 0x0FA7, 0x0FAC, 0x0FB9, 0x1F71, 0x1F73, 0x1F75, 0x1F77, 0x1F79, 0x1F7B, 0x1F7D, 0x1FBB, 0x1FBE, 0x1FC9, 0x1FCB, 0x1FD3, 0x1FDB, 0x1FE3, 0x1FEB, [0x1FEE, 0x1FEF], 0x1FF9, 0x1FFB, 0x1FFD, [0x2000, 0x2001], 0x2126, [0x212A, 0x212B], 0x2329, 0x232A, 0x2ADC, [0xF900, 0xFA0D], 0xFA10, 0xFA12, [0xFA15, 0xFA1E], 0xFA20, 0xFA22, [0xFA25, 0xFA26],
				[0xFA2A, 0xFA6D],
				[0xFA70, 0xFAD9], 0xFB1D, 0xFB1F, [0xFB2A, 0xFB36],
				[0xFB38, 0xFB3C], 0xFB3E, [0xFB40, 0xFB41],
				[0xFB43, 0xFB44],
				[0xFB46, 0xFB4E],
				[0x1D15E, 0x1D164],
				[0x1D1BB, 0x1D1C0],
				[0x2F800, 0x2FA1D],
				[0x0300, 0x0304],
				[0x0306, 0x030C], 0x030F, 0x311, [0x0313, 0x0314], 0x031B, [0x0323, 0x0328],
				[0x032D, 0x032E],
				[0x0330, 0x0331], 0x338, 0x342, 0x345, [0x0653, 0x0655], 0x093C, 0x09BE, 0x09D7, 0x0B3E, 0x0B56, 0x0B57, 0x0BBE, 0x0BD7, 0x0C56, 0x0CC2, [0x0CD5, 0x0CD6], 0x0D3E, 0x0D57, 0x0DCA, 0x0DCF, 0x0DDF, 0x102E, [0x1161, 0x1175],
				[0x11A8, 0x11C2], 0x1B35, [0x3099, 0x309A], 0x110BA, 0x11127, 0x1133E, 0x11357, 0x114B0, 0x114BA, 0x114BD, 0x115AF
			];
			for (var i = 0; i < N.length; i++) {
				if (typeof N[i] == "number") {
					mData[N[i]] = true;
				} else {
					var a = N[i][0];
					var b = N[i][1];
					while (a <= b) {
						mData[a++] = true;
					}
				}
			}
		}());

		function isHighSurrogate(c) {
			return c >= 0xD800 && c <= 0xDBFF;
		}

		function isLowSurrogate(c) {
			return c >= 0xDC00 && c <= 0xDFFF;
		}

		function getCanonicalClass(cp) {
			var dunit, hash;
			hash = cp & 0xFF00;
			dunit = UNorm.UChar.udata[hash];
			if (dunit === undefined) {
				dunit = UNorm.UChar.udata[hash] = {};
			} else if (typeof dunit === "string") {
				dunit = UNorm.UChar.udata[hash] = eval("(" + dunit + ")");
			}
			return dunit[cp] && !!dunit[cp][1] ? (dunit[cp][1] & 0xff) : 0;
		}

		function isNotAllowed(c) {
			return mData[c];
		}

		function nfcQuickCheck(s) {
			if (!/^[\u0001-\u00ff]*$/.test(s)) {
				var l = 0;
				for (var i = 0; i < s.length; ++i) {
					var c = s.charCodeAt(i);
					if (isHighSurrogate(c)) {
						var n = s.charCodeAt(i + 1);
						if (isLowSurrogate(n)) {
							c = (c - 0xD800) * 0x400 + (n - 0xDC00) + 0x10000;
							++i;
						}
					}
					var a = getCanonicalClass(c);
					if (l > a && a !== 0 || isNotAllowed(c)) {
						return false;
					}
					l = a;
				}
			}
			return true;
		}

		function nfcNativeCheck(s) {
			return s.normalize("NFC") === s;
		}
		jQuery.sap.isStringNFC = (bNativeSupport ? nfcNativeCheck : nfcQuickCheck);
		return jQuery;
	});
	sap.ui.predefine('sap/ui/Global', ['jquery.sap.global', 'jquery.sap.dom'], function (q) {
		"use strict";
		if (window.OpenAjax && window.OpenAjax.hub) {
			OpenAjax.hub.registerLibrary("sap", "http://www.sap.com/", "0.1", {});
		}
		if (typeof window.sap !== "object" && typeof window.sap !== "function") {
			window.sap = {};
		}
		if (typeof window.sap.ui !== "object") {
			window.sap.ui = {};
		}
		sap.ui = q.extend(sap.ui, {
			version: "1.52.9",
			buildinfo: {
				lastchange: "",
				buildtime: "20180315-1334"
			}
		});
		var c = window["sap-ui-config"] || {};
		var s = 0;
		if (c['xx-nosync'] === 'warn' || /(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)) {
			s = 1;
		}
		if (c['xx-nosync'] === true || c['xx-nosync'] === 'true' || /(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)) {
			s = 2;
		}
		var v = null;
		sap.ui.getVersionInfo = function (o) {
			if (typeof o !== "object") {
				o = {
					library: o
				};
			}
			o.async = o.async === true;
			o.failOnError = o.failOnError !== false;
			if (!sap.ui.versioninfo) {
				if (o.async && v instanceof Promise) {
					return v.then(function () {
						return sap.ui.getVersionInfo(o);
					});
				}
				var h = function (V) {
					v = null;
					if (V === null) {
						return undefined;
					}
					sap.ui.versioninfo = V;
					return sap.ui.getVersionInfo(o);
				};
				var H = function (e) {
					v = null;
					throw e;
				};
				var r = q.sap.loadResource("sap-ui-version.json", {
					async: o.async,
					failOnError: o.async || o.failOnError
				});
				if (r instanceof Promise) {
					v = r;
					return r.then(h, H);
				} else {
					return h(r);
				}
			} else {
				var R;
				if (typeof o.library !== "undefined") {
					var L = sap.ui.versioninfo.libraries;
					if (L) {
						for (var i = 0, l = L.length; i < l; i++) {
							if (L[i].name === o.library) {
								R = L[i];
								break;
							}
						}
					}
				} else {
					R = sap.ui.versioninfo;
				}
				return o.async ? Promise.resolve(R) : R;
			}
		};
		sap.ui.namespace = function (n) {
			return q.sap.getObject(n, 0);
		};
		sap.ui.lazyRequire = function (C, m, M) {
			if (s === 2) {
				q.sap.log.error("[nosync] lazy stub creation ignored for '" + C + "'");
				return;
			}
			var f = C.replace(/\//gi, "\."),
				l = f.lastIndexOf("."),
				p = f.substr(0, l),
				a = f.substr(l + 1),
				P = q.sap.getObject(p, 0),
				o = P[a],
				b = (m || "new").split(" "),
				i = b.indexOf("new");
			M = M || f;
			if (!o) {
				if (i >= 0) {
					o = function () {
						if (s) {
							if (s === 1) {
								q.sap.log.error("[nosync] lazy stub for constructor '" + f + "' called");
							}
						} else {
							q.sap.log.debug("lazy stub for constructor '" + f + "' called.");
						}
						q.sap.require(M);
						var r = P[a];
						if (r._sapUiLazyLoader) {
							throw new Error("lazyRequire: stub '" + f + "'has not been replaced by module '" + M + "'");
						}
						var I = Object.create(r.prototype);
						var R = r.apply(I, arguments);
						if (R && (typeof R === "function" || typeof R === "object")) {
							I = R;
						}
						return I;
					};
					o._sapUiLazyLoader = true;
					b.splice(i, 1);
				} else {
					o = {};
				}
				P[a] = o;
			}
			b.forEach(function (d) {
				if (!o[d]) {
					o[d] = function () {
						if (s) {
							if (s === 1) {
								q.sap.log.error("[no-sync] lazy stub for method '" + f + "." + d + "' called");
							}
						} else {
							q.sap.log.debug("lazy stub for method '" + f + "." + d + "' called.");
						}
						q.sap.require(M);
						var r = P[a];
						if (r[d]._sapUiLazyLoader) {
							throw new Error("lazyRequire: stub '" + f + "." + d + "' has not been replaced by loaded module '" + M + "'");
						}
						return r[d].apply(r, arguments);
					};
					o[d]._sapUiLazyLoader = true;
				}
			});
		};
		sap.ui.lazyRequire._isStub = function (C) {
			var l = C.lastIndexOf("."),
				a = C.slice(0, l),
				p = C.slice(l + 1),
				o = q.sap.getObject(a);
			return !!(o && typeof o[p] === "function" && o[p]._sapUiLazyLoader);
		};
		sap.ui.resource = function (l, r) {
			var m = r.match(/^themes\/([^\/]+)\//);
			if (m) {
				l += ".themes." + m[1];
				r = r.substr(m[0].length);
			}
			return q.sap.getModulePath(l, '/') + r;
		};
		sap.ui.localResources = function (n) {
			q.sap.registerModulePath(n, "./" + n.replace(/\./g, "/"));
		};
		return sap.ui;
	});
	sap.ui.predefine('sap/ui/base/BindingParser', ['jquery.sap.global', './ExpressionParser', 'sap/ui/model/BindingMode', 'sap/ui/model/Filter', 'sap/ui/model/Sorter', 'jquery.sap.script'], function (q, E, B, F, S) {
		"use strict";
		var a = {
			_keepBindingStrings: false
		};
		var r = /^\{\s*[a-zA-Z$_][a-zA-Z0-9$_]*\s*:/;
		var b = /(\\[\\\{\}])|(\{)/g;
		var c = /([\\\{\}])/g;

		function d(e, R) {
			function l() {
				var i, n = e.length,
					m = new Array(n);
				for (i = 0; i < n; i += 1) {
					m[i] = e[i].apply(this, arguments);
				}
				if (R) {
					return R.apply(this, m);
				}
				return n > 1 ? m.join(" ") : m[0];
			}
			l.textFragments = R && R.textFragments || "sap.ui.base.BindingParser: composeFormatters";
			return l;
		}

		function f(e) {
			var m = function () {
				var R = [],
					l = e.length,
					i;
				for (i = 0; i < l; i++) {
					if (typeof e[i] === "number") {
						R.push(arguments[e[i]]);
					} else {
						R.push(e[i]);
					}
				}
				return R.join('');
			};
			m.textFragments = e;
			return m;
		}

		function g(p) {
			var P = p.indexOf(">"),
				o = {
					path: p
				};
			if (P > 0) {
				o.model = p.slice(0, P);
				o.path = p.slice(P + 1);
			}
			return o;
		}

		function h(o, s) {
			try {
				a.mergeParts(o);
			} catch (e) {
				q.sap.log.error("Cannot merge parts: " + e.message, s, "sap.ui.base.BindingParser");
			}
		}

		function j(e, i) {
			function l(o, P) {
				if (typeof o[P] === "string") {
					var t, N = o[P];
					if (o[P][0] === ".") {
						t = q.sap.getObject(o[P].slice(1), undefined, e.oContext);
						o[P] = e.bStaticContext ? t : (t && t.bind(e.oContext));
					} else {
						o[P] = q.sap.getObject(o[P]);
					}
					if (typeof (o[P]) !== "function") {
						if (e.bTolerateFunctionsNotFound) {
							e.aFunctionsNotFound = e.aFunctionsNotFound || [];
							e.aFunctionsNotFound.push(N);
						} else {
							q.sap.log.error(P + " function " + N + " not found!");
						}
					}
				}
			}

			function m(o) {
				var t;
				if (typeof o.type === "string") {
					if (o.type[0] === ".") {
						t = q.sap.getObject(o.type.slice(1), undefined, e.oContext);
					} else {
						t = q.sap.getObject(o.type);
					}
					if (typeof t === "function") {
						o.type = new t(o.formatOptions, o.constraints);
					} else {
						o.type = t;
					}
					delete o.formatOptions;
					delete o.constraints;
				}
			}

			function n(o) {
				if (o != null && typeof o === 'object') {
					for (var N in o) {
						l(o, N);
					}
				}
			}

			function p(o, P) {
				var v = o[P];
				if (Array.isArray(v)) {
					v.forEach(function (O, I) {
						p(v, I);
					});
					return;
				}
				if (v && typeof v === 'object') {
					l(v, 'test');
					p(v, 'filters');
					p(v, 'condition');
					o[P] = new F(v);
				}
			}

			function s(o, P) {
				var v = o[P];
				if (Array.isArray(v)) {
					v.forEach(function (O, I) {
						s(v, I);
					});
					return;
				}
				if (v && typeof v === 'object') {
					l(v, "group");
					l(v, "comparator");
					o[P] = new S(v);
				}
			}
			if (typeof i === 'object') {
				if (Array.isArray(i.parts)) {
					i.parts.forEach(function (P) {
						j(e, P);
					});
				}
				m(i);
				p(i, 'filters');
				s(i, 'sorter');
				n(i.events);
				l(i, 'formatter');
				l(i, 'factory');
				l(i, 'groupHeaderFactory');
			}
			return i;
		}

		function k(e, i, s) {
			var p = q.sap.parseJS,
				P, l;
			if (r.test(i.slice(s))) {
				P = p(i, s);
				j(e, P.result);
				return P;
			}
			l = i.indexOf('}', s);
			if (l < s) {
				throw new SyntaxError("no closing braces found in '" + i + "' after pos:" + s);
			}
			return {
				result: g(i.slice(s + 1, l)),
				at: l + 1
			};
		}
		a.simpleParser = function (s, C) {
			if (q.sap.startsWith(s, "{") && q.sap.endsWith(s, "}")) {
				return g(s.slice(1, -1));
			}
		};
		a.simpleParser.escape = function (v) {
			return v;
		};
		a.complexParser = function (s, C, u, t, e) {
			var i = false,
				o = {
					parts: []
				},
				M = false,
				l = {
					oContext: C,
					aFunctionsNotFound: undefined,
					bStaticContext: e,
					bTolerateFunctionsNotFound: t
				},
				n = [],
				U, p = 0,
				m, v;

			function w(I, x, y) {
				var z = E.parse(k.bind(null, l), s, x);

				function A(z, D) {
					if (z.parts) {
						z.parts.forEach(A);
						i = i || D !== undefined;
					} else {
						z.mode = y;
					}
				}
				if (I.charAt(z.at) !== "}") {
					throw new SyntaxError("Expected '}' and instead saw '" + I.charAt(z.at) + "' in expression binding " + I + " at position " + z.at);
				}
				z.at += 1;
				if (z.result) {
					A(z.result);
				} else {
					n[n.length - 1] = String(z.constant);
					U = true;
				}
				return z;
			}
			b.lastIndex = 0;
			while ((m = b.exec(s)) !== null) {
				if (p < m.index) {
					n.push(s.slice(p, m.index));
				}
				if (m[1]) {
					n.push(m[1].slice(1));
					U = true;
				} else {
					n.push(o.parts.length);
					if (s.indexOf(":=", m.index) === m.index + 1) {
						v = w(s, m.index + 3, B.OneTime);
					} else if (s.charAt(m.index + 1) === "=") {
						v = w(s, m.index + 2, B.OneWay);
					} else {
						v = k(l, s, m.index);
					}
					if (v.result) {
						o.parts.push(v.result);
						M = M || "parts" in v.result;
					}
					b.lastIndex = v.at;
				}
				p = b.lastIndex;
			}
			if (p < s.length) {
				n.push(s.slice(p));
			}
			if (o.parts.length > 0) {
				if (n.length === 1) {
					o = o.parts[0];
					M = i;
				} else {
					o.formatter = f(n);
				}
				if (M) {
					h(o, s);
				}
				if (a._keepBindingStrings) {
					o.bindingString = s;
				}
				if (l.aFunctionsNotFound) {
					o.functionsNotFound = l.aFunctionsNotFound;
				}
				return o;
			} else if (u && U) {
				return n.join('');
			}
		};
		a.complexParser.escape = function (v) {
			return v.replace(c, "\\$1");
		};
		a.mergeParts = function (o) {
			var e = [],
				p = [];
			o.parts.forEach(function (v) {
				var i, l = function () {
						return v;
					},
					n, s = p.length;

				function m() {
					return arguments[s];
				}
				if (v && typeof v === "object") {
					if (v.parts) {
						for (n in v) {
							if (n !== "formatter" && n !== "parts") {
								throw new Error("Unsupported property: " + n);
							}
						}
						p = p.concat(v.parts);
						i = p.length;
						if (v.formatter) {
							l = function () {
								return v.formatter.apply(this, Array.prototype.slice.call(arguments, s, i));
							};
						} else if (i - s > 1) {
							l = function () {
								return Array.prototype.slice.call(arguments, s, i).join(" ");
							};
						} else {
							l = m;
						}
					} else if (v.path) {
						p.push(v);
						l = m;
					}
				}
				e.push(l);
			});
			o.parts = p;
			o.formatter = d(e, o.formatter);
		};
		a.parseExpression = function (i, s) {
			return E.parse(k.bind(null, {}), i, s);
		};
		return a;
	}, true);
	sap.ui.predefine('sap/ui/base/DataType', ['jquery.sap.global'], function (q) {
		"use strict";
		var D = function () {
			throw new Error();
		};
		D.prototype.getName = function () {
			return undefined;
		};
		D.prototype.getBaseType = function () {
			return undefined;
		};
		D.prototype.getPrimitiveType = function () {
			var T = this;
			while (T.getBaseType()) {
				T = T.getBaseType();
			}
			return T;
		};
		D.prototype.getComponentType = function () {
			return undefined;
		};
		D.prototype.getDefaultValue = function () {
			return undefined;
		};
		D.prototype.isArrayType = function () {
			return false;
		};
		D.prototype.parseValue = function (v) {
			return v;
		};
		D.prototype.isValid = undefined;
		D.prototype.setNormalizer = function (n) {
			this._fnNormalizer = typeof n === "function" ? n : undefined;
		};
		D.prototype.normalize = function (v) {
			return this._fnNormalizer ? this._fnNormalizer(v) : v;
		};

		function c(n, s, B) {
			s = s || {};
			var o = B || D.prototype;
			var T = Object.create(o);
			T.getName = function () {
				return n;
			};
			if (s.hasOwnProperty("defaultValue")) {
				var v = s.defaultValue;
				T.getDefaultValue = function () {
					return v;
				};
			}
			if (s.isValid) {
				var i = s.isValid;
				T.isValid = o.isValid ? function (V) {
					if (!o.isValid(V)) {
						return false;
					}
					return i(V);
				} : i;
			}
			if (s.parseValue) {
				T.parseValue = s.parseValue;
			}
			T.getBaseType = function () {
				return B;
			};
			return T;
		}
		var a = c("array", {
			defaultValue: []
		});

		function b(e) {
			var T = Object.create(D.prototype);
			T.getName = function () {
				return e.getName() + "[]";
			};
			T.getComponentType = function () {
				return e;
			};
			T.isValid = function (v) {
				if (v === null) {
					return true;
				}
				if (Array.isArray(v)) {
					for (var i = 0; i < v.length; i++) {
						if (!e.isValid(v[i])) {
							return false;
						}
					}
					return true;
				}
				return false;
			};
			T.parseValue = function (v) {
				var V = v.split(",");
				for (var i = 0; i < V.length; i++) {
					V[i] = e.parseValue(V[i]);
				}
				return V;
			};
			T.isArrayType = function () {
				return true;
			};
			T.getBaseType = function () {
				return a;
			};
			return T;
		}

		function d(T, e) {
			var V = {},
				s;
			for (var n in e) {
				var f = e[n];
				if (!s) {
					s = f;
				}
				if (typeof f !== "string") {
					throw new Error("Value " + f + " for enum type " + T + " is not a string");
				}
				if (!V.hasOwnProperty(f) || n == f) {
					V[f] = n;
				}
			}
			var o = Object.create(D.prototype);
			o.getName = function () {
				return T;
			};
			o.isValid = function (v) {
				return typeof v === "string" && V.hasOwnProperty(v);
			};
			o.parseValue = function (f) {
				return e[f];
			};
			o.getDefaultValue = function () {
				return s;
			};
			o.getBaseType = function () {
				return t.string;
			};
			return o;
		}
		var t = {
			"any": c("any", {
				defaultValue: null,
				isValid: function (v) {
					return true;
				}
			}),
			"boolean": c("boolean", {
				defaultValue: false,
				isValid: function (v) {
					return typeof v === "boolean";
				},
				parseValue: function (v) {
					return v == "true";
				}
			}),
			"int": c("int", {
				defaultValue: 0,
				isValid: function (v) {
					return typeof v === "number" && Math.floor(v) == v;
				},
				parseValue: function (v) {
					return parseInt(v, 10);
				}
			}),
			"float": c("float", {
				defaultValue: 0.0,
				isValid: function (v) {
					return typeof v === "number";
				},
				parseValue: function (v) {
					return parseFloat(v);
				}
			}),
			"string": c("string", {
				defaultValue: "",
				isValid: function (v) {
					return typeof v === "string" || v instanceof String;
				},
				parseValue: function (v) {
					return v;
				}
			}),
			"object": c("object", {
				defaultValue: null,
				isValid: function (v) {
					return typeof v === "object" || typeof v === "function";
				},
				parseValue: function (v) {
					return v ? JSON.parse(v) : null;
				}
			}),
			"function": c("function", {
				defaultValue: null,
				isValid: function (v) {
					return v == null || typeof v === 'function';
				},
				parseValue: function (v) {
					throw new TypeError("values of type function can't be parsed from a string");
				}
			})
		};
		D.getType = function (T) {
			var o = t[T];
			if (!o) {
				if (T.indexOf("[]", T.length - 2) > 0) {
					var C = T.slice(0, -2),
						e = this.getType(C);
					o = e && b(e);
					if (o) {
						t[T] = o;
					}
				} else {
					o = q.sap.getObject(T);
					if (o instanceof D) {
						t[T] = o;
					} else if (q.isPlainObject(o)) {
						o = t[T] = d(T, o);
					} else {
						if (o) {
							q.sap.log.warning("'" + T + "' is not a valid data type. Falling back to type 'any'.");
							o = t.any;
						} else {
							q.sap.log.error("data type '" + T + "' could not be found.");
							o = undefined;
						}
					}
				}
			}
			return o;
		};
		D.createType = c;
		var I = {};
		D.registerInterfaceTypes = function (T) {
			for (var i = 0; i < T.length; i++) {
				q.sap.setObject(T[i], I[T[i]] = new String(T[i]));
			}
		};
		D.isInterfaceType = function (T) {
			return I.hasOwnProperty(T) && q.sap.getObject(T) === I[T];
		};
		return D;
	}, true);
	sap.ui.predefine('sap/ui/base/Event', ['jquery.sap.global', './Object'], function (q, B) {
		"use strict";
		var E = B.extend("sap.ui.base.Event", {
			constructor: function (i, s, p) {
				B.apply(this);
				if (arguments.length > 0) {
					this.init(i, s, p);
				}
			}
		});
		E.prototype.init = function (i, s, p) {
			this.sId = i;
			this.oSource = s;
			this.mParameters = p || {};
			this.bCancelBubble = false;
			this.bPreventDefault = false;
		};
		E.prototype.reset = function () {
			this.sId = "";
			this.oSource = null;
			this.mParameters = null;
			this.bCancelBubble = false;
			this.bPreventDefault = false;
		};
		E.prototype.getId = function () {
			return this.sId;
		};
		E.prototype.getSource = function () {
			return this.oSource;
		};
		E.prototype.getParameters = function () {
			return this.mParameters;
		};
		E.prototype.getParameter = function (n) {
			return this.mParameters[n];
		};
		E.prototype.cancelBubble = function () {
			this.bCancelBubble = true;
		};
		E.prototype.preventDefault = function () {
			this.bPreventDefault = true;
		};
		return E;
	});
	sap.ui.predefine('sap/ui/base/EventProvider', ['jquery.sap.global', './Event', './Object', './ObjectPool'], function (q, E, B, O) {
		"use strict";
		var a = B.extend("sap.ui.base.EventProvider", {
			constructor: function () {
				B.call(this);
				this.mEventRegistry = {};
			}
		});
		var b = "EventHandlerChange";
		a.M_EVENTS = {
			EventHandlerChange: b
		};
		a.prototype.oEventPool = new O(E);
		a.prototype.attachEvent = function (e, d, f, l) {
			var m = this.mEventRegistry;
			if (typeof (d) === "function") {
				l = f;
				f = d;
				d = undefined;
			}
			var c = m[e];
			if (!Array.isArray(c)) {
				c = m[e] = [];
			}
			c.push({
				oListener: l,
				fFunction: f,
				oData: d
			});
			if (m[b]) {
				this.fireEvent(b, {
					EventId: e,
					type: 'listenerAttached',
					listener: l,
					func: f,
					data: d
				});
			}
			return this;
		};
		a.prototype.attachEventOnce = function (e, d, f, l) {
			if (typeof (d) === "function") {
				l = f;
				f = d;
				d = undefined;
			}

			function o() {
				this.detachEvent(e, o);
				f.apply(l || this, arguments);
			}
			this.attachEvent(e, d, o, undefined);
			return this;
		};
		a.prototype.detachEvent = function (e, f, l) {
			var m = this.mEventRegistry;
			var c = m[e];
			if (!Array.isArray(c)) {
				return this;
			}
			var l;
			for (var i = 0, L = c.length; i < L; i++) {
				if (c[i].fFunction === f && c[i].oListener === l) {
					l = c[i];
					c.splice(i, 1);
					break;
				}
			}
			if (c.length == 0) {
				delete m[e];
			}
			if (l && m[b]) {
				this.fireEvent(b, {
					EventId: e,
					type: 'listenerDetached',
					listener: l.listener,
					func: l.fFunction,
					data: l.oData
				});
			}
			return this;
		};
		a.prototype.fireEvent = function (e, p, A, c) {
			if (typeof p === "boolean") {
				c = A;
				A = p;
			}
			var P = this,
				d = false,
				f, o, i, l, I;
			do {
				f = P.mEventRegistry[e];
				if (Array.isArray(f)) {
					f = f.slice();
					o = o || this.oEventPool.borrowObject(e, this, p);
					for (i = 0, l = f.length; i < l; i++) {
						I = f[i];
						I.fFunction.call(I.oListener || P, o, I.oData);
					}
					c = c && !o.bCancelBubble;
				}
				P = P.getEventingParent();
			} while (c && P);
			if (o) {
				d = o.bPreventDefault;
				this.oEventPool.returnObject(o);
			}
			return A ? !d : this;
		};
		a.prototype.hasListeners = function (e) {
			return !!this.mEventRegistry[e];
		};
		a.getEventList = function (e) {
			return e.mEventRegistry;
		};
		a.prototype.getEventingParent = function () {
			return null;
		};
		a.prototype.toString = function () {
			if (this.getMetadata) {
				return "EventProvider " + this.getMetadata().getName();
			} else {
				return "EventProvider";
			}
		};
		a.prototype.destroy = function () {
			this.mEventRegistry = {};
			B.prototype.destroy.apply(this, arguments);
		};
		return a;
	});
	sap.ui.predefine('sap/ui/base/Exception', function () {
		"use strict";
		var E = function (m) {
			this.name = "Exception";
			this.message = m;
		};
		return E;
	}, true);
	sap.ui.predefine('sap/ui/base/Interface', [], function () {
		"use strict";
		var B;
		var I = function (o, m, f) {
			if (!o) {
				return o;
			}
			B = B || sap.ui.requireSync('sap/ui/base/Object');

			function c(o, M) {
				return function () {
					var t = o[M].apply(o, arguments);
					if (f) {
						return this;
					} else {
						return (t instanceof B) ? t.getInterface() : t;
					}
				};
			}
			if (!m) {
				return {};
			}
			var M;
			for (var i = 0, a = m.length; i < a; i++) {
				M = m[i];
				this[M] = c(o, M);
			}
		};
		return I;
	}, true);
	sap.ui.predefine('sap/ui/base/ManagedObject', ['jquery.sap.global', './BindingParser', './DataType', './EventProvider', './ManagedObjectMetadata', '../model/BindingMode', '../model/CompositeBinding', '../model/Context', '../model/FormatException', '../model/ListBinding', '../model/Model', '../model/ParseException', '../model/TreeBinding', '../model/Type', '../model/ValidateException', 'jquery.sap.act', 'jquery.sap.script', 'jquery.sap.strings'], function (q, B, D, E, M, d, C, e, F, L, f, P, T, g, V) {
		"use strict";
		var I;
		var h = E.extend("sap.ui.base.ManagedObject", {
			metadata: {
				"abstract": true,
				publicMethods: ["getId", "getMetadata", "getModel", "setModel", "hasModel", "bindProperty", "unbindProperty", "bindAggregation", "unbindAggregation", "bindObject", "unbindObject", "getObjectBinding"],
				library: "sap.ui.core",
				properties: {},
				aggregations: {},
				associations: {},
				events: {
					"validationSuccess": {
						enableEventBubbling: true,
						parameters: {
							element: {
								type: 'sap.ui.base.ManagedObject'
							},
							property: {
								type: 'string'
							},
							type: {
								type: 'sap.ui.model.Type'
							},
							newValue: {
								type: 'any'
							},
							oldValue: {
								type: 'any'
							}
						}
					},
					"validationError": {
						enableEventBubbling: true,
						parameters: {
							element: {
								type: 'sap.ui.base.ManagedObject'
							},
							property: {
								type: 'string'
							},
							type: {
								type: 'sap.ui.model.Type'
							},
							newValue: {
								type: 'any'
							},
							oldValue: {
								type: 'any'
							},
							message: {
								type: 'string'
							}
						}
					},
					"parseError": {
						enableEventBubbling: true,
						parameters: {
							element: {
								type: 'sap.ui.base.ManagedObject'
							},
							property: {
								type: 'string'
							},
							type: {
								type: 'sap.ui.model.Type'
							},
							newValue: {
								type: 'any'
							},
							oldValue: {
								type: 'any'
							},
							message: {
								type: 'string'
							}
						}
					},
					"formatError": {
						enableEventBubbling: true,
						parameters: {
							element: {
								type: 'sap.ui.base.ManagedObject'
							},
							property: {
								type: 'string'
							},
							type: {
								type: 'sap.ui.model.Type'
							},
							newValue: {
								type: 'any'
							},
							oldValue: {
								type: 'any'
							}
						}
					},
					"modelContextChange": {}
				},
				specialSettings: {
					id: 'sap.ui.core.ID',
					models: 'object',
					bindingContexts: 'object',
					objectBindings: 'object',
					metadataContexts: 'object',
					Type: {
						type: 'string',
						visibility: 'hidden'
					}
				}
			},
			constructor: function (i, s, o) {
				var t = this;
				E.call(this);
				if (typeof i !== 'string' && i !== undefined) {
					o = s;
					s = i;
					i = s && s.id;
				}
				if (!i) {
					i = this.getMetadata().uid();
				} else {
					var p = h._fnIdPreprocessor;
					i = (p ? p.call(this, i) : i);
					var a = I || (I = D.getType("sap.ui.core.ID"));
					if (!a.isValid(i)) {
						throw new Error("\"" + i + "\" is not a valid ID.");
					}
				}
				this.sId = i;
				this.mProperties = this.getMetadata().createPropertyBag();
				this.mAggregations = {};
				this.mAssociations = {};
				this.oParent = null;
				this.aDelegates = [];
				this.aBeforeDelegates = [];
				this.iSuppressInvalidate = 0;
				this.oPropagatedProperties = h._oEmptyPropagatedProperties;
				this.mSkipPropagation = {};
				this.oModels = {};
				this.aPropagationListeners = [];
				this.oBindingContexts = {};
				this.mElementBindingContexts = {};
				this.mBindingInfos = {};
				this.mObjectBindingInfos = {};
				this._oContextualSettings = h._defaultContextualSettings;
				this._sOwnerId = h._sOwnerId;
				(function () {
					var c = false;
					if (t.register) {
						t.register();
					}
					try {
						if (t._initCompositeSupport) {
							t._initCompositeSupport(s);
						}
						if (t.init) {
							t.init();
						}
						t.applySettings(s, o);
						c = true;
					} finally {
						if (!c && t.deregister) {
							t.deregister();
						}
					}
				}());
			}
		}, M);
		h.create = function (v, K, s) {
			if (!v || v instanceof h || typeof v !== "object" || v instanceof String) {
				return v;
			}

			function a(t) {
				if (typeof t === "function") {
					return t;
				}
				if (typeof t === "string") {
					return q.sap.getObject(t);
				}
			}
			var c = a(v.Type) || a(K && K.type);
			if (typeof c === "function") {
				return new c(v, s);
			}
			var b = "Don't know how to create a ManagedObject from " + v + " (" + (typeof v) + ")";
			q.sap.log.fatal(b);
			throw new Error(b);
		};
		var S;

		function j(i) {
			if (!S) {
				S = sap.ui.require("sap/ui/core/StashedControlSupport");
			}
			if (S) {
				return S.getStashedControls(i);
			}
			return [];
		}
		h._fnIdPreprocessor = null;
		h._fnSettingsPreprocessor = null;
		h.runWithPreprocessors = function (a, p, t) {
			var o = {
				id: this._fnIdPreprocessor,
				settings: this._fnSettingsPreprocessor
			};
			p = p || {};
			this._fnIdPreprocessor = p.id;
			this._fnSettingsPreprocessor = p.settings;
			try {
				return a.call(t);
			} finally {
				this._fnIdPreprocessor = o.id;
				this._fnSettingsPreprocessor = o.settings;
			}
		};
		h.prototype.applySettings = function (s, o) {
			if (!s || q.isEmptyObject(s)) {
				return this;
			}
			var t = this,
				a = this.getMetadata(),
				v = a.getJSONKeys(),
				b = h.create,
				p = h._fnSettingsPreprocessor,
				K, c, n;

			function r(O) {
				for (var i = 0, w = O.length; i < w; i++) {
					var x = O[i];
					if (Array.isArray(x)) {
						r(x);
					} else {
						t[n._sMutator](b(x, n, o));
					}
				}
			}
			p && p.call(this, s);
			if (s.metadataContexts && this._processMetadataContexts) {
				this._processMetadataContexts(s.metadataContexts, s);
			}
			if (s.models) {
				if (typeof s.models !== "object") {
					throw new Error("models must be a simple object");
				}
				if (s.models instanceof f) {
					this.setModel(s.models);
				} else {
					for (K in s.models) {
						this.setModel(s.models[K], K === "undefined" ? undefined : K);
					}
				}
			}
			if (s.bindingContexts) {
				if (typeof s.bindingContexts !== "object") {
					throw new Error("bindingContexts must be a simple object");
				}
				if (s.bindingContexts instanceof e) {
					this.setBindingContext(s.bindingContexts);
				} else {
					for (K in s.bindingContexts) {
						this.setBindingContext(s.bindingContexts[K], K === "undefined" ? undefined : K);
					}
				}
			}
			if (s.objectBindings) {
				if (typeof s.objectBindings !== "string" && typeof s.objectBindings !== "object") {
					throw new Error("binding must be a string or simple object");
				}
				if (typeof s.objectBindings === "string" || s.objectBindings.path) {
					this.bindObject(s.objectBindings);
				} else {
					for (var K in s.objectBindings) {
						s.objectBindings.model = K;
						this.bindObject(s.objectBindings[K]);
					}
				}
			}
			for (K in s) {
				c = s[K];
				if ((n = v[K]) !== undefined) {
					var u;
					switch (n._iKind) {
						case 0:
							u = this.extractBindingInfo(c, o);
							if (u && typeof u === "object") {
								this.bindProperty(K, u);
							} else {
								this[n._sMutator](u || c);
							}
							break;
						case 1:
							u = n.altTypes && this.extractBindingInfo(c, o);
							if (u && typeof u === "object") {
								this.bindProperty(K, u);
							} else {
								if (Array.isArray(c)) {
									if (c.length > 1) {
										q.sap.log.error("Tried to add an array of controls to a single aggregation");
									}
									c = c[0];
								}
								this[n._sMutator](b(u || c, n, o));
							}
							break;
						case 2:
							u = this.extractBindingInfo(c, o);
							if (u && typeof u === "object") {
								this.bindAggregation(K, u);
							} else {
								c = u || c;
								if (c) {
									if (Array.isArray(c)) {
										r(c);
									} else {
										t[n._sMutator](b(c, n, o));
									}
								}
							}
							break;
						case 3:
							this[n._sMutator](c);
							break;
						case 4:
							if (c) {
								if (Array.isArray(c)) {
									for (var i = 0, l = c.length; i < l; i++) {
										this[n._sMutator](c[i]);
									}
								} else {
									this[n._sMutator](c);
								}
							}
							break;
						case 5:
							if (typeof c == "function") {
								this[n._sMutator](c);
							} else {
								this[n._sMutator](c[0], c[1], c[2]);
							}
							break;
						case -1:
						default:
							break;
					}
				} else {}
			}
			return this;
		};
		h.escapeSettingsValue = function (v) {
			return (typeof v === "string") ? h.bindingParser.escape(v) : v;
		};
		h.prototype.toString = function () {
			return "ManagedObject " + this.getMetadata().getName() + "#" + this.getId();
		};
		h.prototype.getId = function () {
			return this.sId;
		};
		h.prototype.setProperty = function (p, v, s) {
			var o = this.mProperties[p];
			v = this.validateProperty(p, v);
			if (q.sap.equal(o, v)) {
				this.mProperties[p] = v;
				return this;
			}
			if (s) {
				q.sap.act.refresh();
				this.iSuppressInvalidate++;
			}
			this.mProperties[p] = v;
			if (!this.isInvalidateSuppressed()) {
				this.invalidate();
			}
			this.updateModelProperty(p, v, o);
			if (this.mEventRegistry["_change"]) {
				E.prototype.fireEvent.call(this, "_change", {
					"id": this.getId(),
					"name": p,
					"oldValue": o,
					"newValue": v
				});
			}
			if (this._observer) {
				this._observer.propertyChange(this, p, o, v);
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return this;
		};
		h.prototype.getProperty = function (p) {
			var v = this.mProperties[p],
				o = this.getMetadata().getProperty(p),
				t;
			if (!o) {
				throw new Error("Property \"" + p + "\" does not exist in " + this);
			}
			t = D.getType(o.type);
			if (t instanceof D && t.isArrayType() && Array.isArray(v)) {
				v = v.slice(0);
			}
			if (v instanceof String) {
				v = v.valueOf();
			}
			return v;
		};
		h.prototype.validateProperty = function (p, v) {
			var o = this.getMetadata().getProperty(p),
				t;
			if (!o) {
				throw new Error("Property \"" + p + "\" does not exist in " + this);
			}
			t = D.getType(o.type);
			if (t instanceof D && t.isArrayType() && Array.isArray(v)) {
				v = v.slice(0);
			}
			if (v == null) {
				v = o.getDefaultValue();
			} else if (t instanceof D) {
				if (t.getName() == "string") {
					if (!(typeof v == "string" || v instanceof String)) {
						v = "" + v;
					}
				} else if (t.getName() == "string[]") {
					if (typeof v == "string") {
						v = [v];
					}
					if (!Array.isArray(v)) {
						throw new Error("\"" + v + "\" is of type " + typeof v + ", expected string[]" + " for property \"" + p + "\" of " + this);
					}
					for (var i = 0; i < v.length; i++) {
						if (typeof v[i] !== "string") {
							v[i] = "" + v[i];
						}
					}
				} else if (!t.isValid(v)) {
					throw new Error("\"" + v + "\" is of type " + typeof v + ", expected " + t.getName() + " for property \"" + p + "\" of " + this);
				}
			}
			if (t && t.normalize && typeof t.normalize === "function") {
				v = t.normalize(v);
			}
			return v;
		};
		h.prototype.isPropertyInitial = function (p) {
			return !Object.prototype.hasOwnProperty.call(this.mProperties, p) && !this.isBound(p);
		};
		h.prototype.resetProperty = function (p) {
			if (this.mProperties.hasOwnProperty(p)) {
				var o = this.getMetadata().getProperty(p);
				this[o._sMutator](null);
				if (this.mProperties[p] === o.getDefaultValue()) {
					delete this.mProperties[p];
				}
			}
			return this;
		};
		h.prototype.getOriginInfo = function (p) {
			var v = this.mProperties[p];
			if (!(v instanceof String && v.originInfo)) {
				return null;
			}
			return v.originInfo;
		};
		h.prototype.setAssociation = function (a, i, s) {
			if (i instanceof h) {
				i = i.getId();
			} else if (i != null && typeof i !== "string") {
				return this;
			}
			if (this.mAssociations[a] === i) {
				return this;
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			if (this._observer && this.mAssociations[a] != null) {
				this._observer.associationChange(this, a, "remove", this.mAssociations[a]);
			}
			this.mAssociations[a] = i;
			if (this._observer && this.mAssociations[a] != null) {
				this._observer.associationChange(this, a, "insert", i);
			}
			if (!this.isInvalidateSuppressed()) {
				this.invalidate();
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return this;
		};
		h.prototype.getAssociation = function (a, o) {
			var r = this.mAssociations[a];
			if (!r) {
				r = this.mAssociations[a] = o || null;
			} else {
				if (typeof r.length === 'number' && !(r.propertyIsEnumerable('length'))) {
					return r.slice();
				}
				return r;
			}
			return r;
		};
		h.prototype.addAssociation = function (a, i, s) {
			if (i instanceof h) {
				i = i.getId();
			} else if (typeof i !== "string") {
				return this;
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			var b = this.mAssociations[a];
			if (!b) {
				b = this.mAssociations[a] = [i];
			} else {
				b.push(i);
			}
			if (this._observer) {
				this._observer.associationChange(this, a, "insert", i);
			}
			if (!this.isInvalidateSuppressed()) {
				this.invalidate();
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return this;
		};
		h.prototype.removeAssociation = function (a, o, s) {
			var b = this.mAssociations[a];
			var c = null;
			if (!b) {
				return null;
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			if (typeof (o) == "object" && o.getId) {
				o = o.getId();
			}
			if (typeof (o) == "string") {
				for (var i = 0; i < b.length; i++) {
					if (b[i] == o) {
						o = i;
						break;
					}
				}
			}
			if (typeof (o) == "number") {
				if (o < 0 || o >= b.length) {
					q.sap.log.warning("ManagedObject.removeAssociation called with invalid index: " + a + ", " + o);
				} else {
					c = b[o];
					b.splice(o, 1);
					if (this._observer) {
						this._observer.associationChange(this, a, "remove", c);
					}
					if (!this.isInvalidateSuppressed()) {
						this.invalidate();
					}
				}
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return c;
		};
		h.prototype.removeAllAssociation = function (a, s) {
			var i = this.mAssociations[a];
			if (!i) {
				return [];
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			delete this.mAssociations[a];
			if (this._observer) {
				this._observer.associationChange(this, a, "remove", i);
			}
			if (!this.isInvalidateSuppressed()) {
				this.invalidate();
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return i;
		};
		h.prototype.validateAggregation = function (a, o, b) {
			var c = this.getMetadata(),
				A = c.getManagedAggregation(a),
				l, t, i, n;
			if (!A) {
				throw new Error("Aggregation \"" + a + "\" does not exist in " + this);
			}
			if (A.multiple !== b) {
				throw new Error("Aggregation '" + a + "' of " + this + " used with wrong cardinality (declared as " + (A.multiple ? "0..n" : "0..1") + ")");
			}
			if (!A.multiple && !o) {
				return o;
			}
			t = q.sap.getObject(A.type);
			if (typeof t === "function" && o instanceof t) {
				return o;
			}
			if (o && o.getMetadata && o.getMetadata().isInstanceOf(A.type)) {
				return o;
			}
			l = A.altTypes;
			if (l && l.length) {
				if (o == null) {
					return o;
				}
				for (i = 0; i < l.length; i++) {
					t = D.getType(l[i]);
					if (t instanceof D) {
						if (t.isValid(o)) {
							return o;
						}
					}
				}
			}
			n = "\"" + o + "\" is not valid for aggregation \"" + a + "\" of " + this;
			if (D.isInterfaceType(A.type)) {
				return o;
			} else {
				throw new Error(n);
			}
		};
		h.prototype.setAggregation = function (a, o, s) {
			var O = this.mAggregations[a];
			if (O === o) {
				return this;
			}
			o = this.validateAggregation(a, o, false);
			if (s) {
				this.iSuppressInvalidate++;
			}
			if (O instanceof h) {
				O.setParent(null);
			} else {
				if (this._observer != null && O != null) {
					this._observer.aggregationChange(this, a, "remove", O);
				}
			}
			this.mAggregations[a] = o;
			if (o instanceof h) {
				o.setParent(this, a, s);
			} else {
				if (!this.isInvalidateSuppressed()) {
					this.invalidate();
				}
				if (this._observer != null && o != null) {
					this._observer.aggregationChange(this, a, "insert", o);
				}
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return this;
		};
		h.prototype.getAggregation = function (a, o) {
			var c = this.mAggregations[a];
			if (!c) {
				c = this.mAggregations[a] = o || null;
			}
			if (c) {
				if (typeof c.length === 'number' && !(c.propertyIsEnumerable('length'))) {
					return c.slice();
				}
				return c;
			} else {
				return null;
			}
		};
		h.prototype.indexOfAggregation = function (a, o) {
			var c = this.mAggregations[a];
			if (c) {
				if (c.length == undefined) {
					return -2;
				}
				for (var i = 0; i < c.length; i++) {
					if (c[i] == o) {
						return i;
					}
				}
			}
			return -1;
		};
		h.prototype.insertAggregation = function (a, o, b, s) {
			if (!o) {
				return this;
			}
			o = this.validateAggregation(a, o, true);
			var c = this.mAggregations[a] || (this.mAggregations[a] = []);
			var i;
			if (b < 0) {
				i = 0;
			} else if (b > c.length) {
				i = c.length;
			} else {
				i = b;
			}
			if (i !== b) {
				q.sap.log.warning("ManagedObject.insertAggregation: index '" + b + "' out of range [0," + c.length + "], forced to " + i);
			}
			c.splice(i, 0, o);
			o.setParent(this, a, s);
			return this;
		};
		h.prototype.addAggregation = function (a, o, s) {
			if (!o) {
				return this;
			}
			o = this.validateAggregation(a, o, true);
			var c = this.mAggregations[a];
			if (!c) {
				c = this.mAggregations[a] = [o];
			} else {
				c.push(o);
			}
			o.setParent(this, a, s);
			return this;
		};
		h.prototype.removeAggregation = function (a, o, s) {
			var c = this.mAggregations[a],
				b = null,
				i;
			if (!c) {
				return null;
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			if (typeof (o) == "string") {
				for (i = 0; i < c.length; i++) {
					if (c[i] && c[i].getId() === o) {
						o = i;
						break;
					}
				}
			}
			if (typeof (o) == "object") {
				for (i = 0; i < c.length; i++) {
					if (c[i] == o) {
						o = i;
						break;
					}
				}
			}
			if (typeof (o) == "number") {
				if (o < 0 || o >= c.length) {
					q.sap.log.warning("ManagedObject.removeAggregation called with invalid index: " + a + ", " + o);
				} else {
					b = c[o];
					c.splice(o, 1);
					b.setParent(null);
					if (!this.isInvalidateSuppressed()) {
						this.invalidate();
					}
				}
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return b;
		};
		h.prototype.removeAllAggregation = function (a, s) {
			var c = this.mAggregations[a];
			if (!c) {
				return [];
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			delete this.mAggregations[a];
			for (var i = 0; i < c.length; i++) {
				c[i].setParent(null);
			}
			if (!this.isInvalidateSuppressed()) {
				this.invalidate();
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return c;
		};
		h.prototype.destroyAggregation = function (a, s) {
			var b = this.mAggregations[a],
				i, l;
			j(this.getId()).forEach(function (c) {
				if (c.sParentAggregationName === a) {
					c.destroy();
				}
			});
			if (!b) {
				return this;
			}
			if (s) {
				this.iSuppressInvalidate++;
			}
			delete this.mAggregations[a];
			if (b instanceof h) {
				b.destroy(s);
				if (this._observer) {
					this._observer.aggregationChange(this, a, "remove", b);
				}
			} else if (Array.isArray(b)) {
				for (i = b.length - 1; i >= 0; i--) {
					l = b[i];
					if (l) {
						l.destroy(s);
						if (this._observer) {
							this._observer.aggregationChange(this, a, "remove", l);
						}
					}
				}
			}
			if (!this.isInvalidateSuppressed()) {
				this.invalidate();
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			return this;
		};
		h.prototype.invalidate = function () {
			if (this.oParent) {
				this.oParent.invalidate(this);
			}
		};
		h.prototype.isInvalidateSuppressed = function () {
			var i = this.iSuppressInvalidate > 0;
			if (this.oParent && this.oParent instanceof h) {
				i = i || this.oParent.isInvalidateSuppressed();
			}
			return i;
		};
		h.prototype._removeChild = function (c, a, s) {
			if (!a) {
				q.sap.log.error("Cannot remove aggregated child without aggregation name.", null, this);
			} else {
				if (s) {
					this.iSuppressInvalidate++;
				}
				var i = this.indexOfAggregation(a, c);
				var A = this.getMetadata().getAggregation(a);
				if (i == -2) {
					if (A && this[A._sMutator]) {
						this[A._sMutator](null);
					} else {
						this.setAggregation(a, null, s);
					}
				} else if (i > -1) {
					if (A && this[A._sRemoveMutator]) {
						this[A._sRemoveMutator](i);
					} else {
						this.removeAggregation(a, i, s);
					}
				}
				if (s) {
					this.iSuppressInvalidate--;
				}
			}
		};

		function k(a, b) {
			while (a && a !== b) {
				a = a.oParent;
			}
			return !!a;
		}
		h.prototype.setParent = function (p, a, s) {
			if (!p) {
				if (this.oParent) {
					if (this.oParent._observer) {
						this.oParent._observer.aggregationChange(this.oParent, this.sParentAggregationName, "remove", this);
					}
				}
				this.oParent = null;
				this.sParentAggregationName = null;
				var o = h._oEmptyPropagatedProperties;
				if (o !== this.oPropagatedProperties) {
					this.oPropagatedProperties = o;
					if (!this._bIsBeingDestroyed) {
						setTimeout(function () {
							if (!this.oParent) {
								this.updateBindings(true, null);
								this.updateBindingContext(false, undefined, true);
								this.propagateProperties(true);
								this.fireModelContextChange();
							}
						}.bind(this), 0);
					}
				}
				this._oContextualSettings = h._defaultContextualSettings;
				if (!this._bIsBeingDestroyed) {
					setTimeout(function () {
						if (!this.oParent) {
							this._propagateContextualSettings();
						}
					}.bind(this), 0);
				}
				q.sap.act.refresh();
				return;
			}
			if (k(p, this)) {
				throw new Error("Cycle detected: new parent '" + p + "' is already a descendant of (or equal to) '" + this + "'");
			}
			if (s) {
				q.sap.act.refresh();
				this.iSuppressInvalidate++;
			}
			var O = this.getParent();
			if (O) {
				O._removeChild(this, this.sParentAggregationName);
			}
			this.oParent = p;
			this.sParentAggregationName = a;
			var o = p._getPropertiesToPropagate();
			if (o !== this.oPropagatedProperties) {
				this.oPropagatedProperties = o;
				if (this.hasModel()) {
					this.updateBindings(true, null);
					this.updateBindingContext(false, undefined, true);
					this.propagateProperties(true);
				}
				this._callPropagationListener();
				this.fireModelContextChange();
			}
			this._applyContextualSettings(p._oContextualSettings);
			if (p && !this.isInvalidateSuppressed()) {
				p.invalidate(this);
			}
			if (s) {
				this.iSuppressInvalidate--;
			}
			if (p._observer) {
				p._observer.aggregationChange(p, a, "insert", this);
			}
			return this;
		};
		h.prototype._applyContextualSettings = function (c) {
			if (this._oContextualSettings !== c) {
				this._oContextualSettings = c;
				this._propagateContextualSettings();
				this._onContextualSettingsChanged();
			}
		};
		h.prototype._onContextualSettingsChanged = function () {};
		h.prototype._propagateContextualSettings = function () {
			var s = this._oContextualSettings,
				a, A, i;
			for (a in this.mAggregations) {
				A = this.mAggregations[a];
				if (A instanceof h) {
					A._applyContextualSettings(s);
				} else if (A instanceof Array) {
					for (i = 0; i < A.length; i++) {
						if (A[i] instanceof h) {
							A[i]._applyContextualSettings(s);
						}
					}
				}
			}
		};
		h.prototype._getContextualSettings = function () {
			return this._oContextualSettings;
		};
		h.prototype.getParent = function () {
			return this.oParent;
		};
		h.prototype.destroy = function (s) {
			var t = this;
			this._bIsBeingDestroyed = true;
			if (s) {
				this.iSuppressInvalidate++;
			}
			if (this.exit) {
				this.exit();
			}
			if (this._exitCompositeSupport) {
				this._exitCompositeSupport();
			}
			for (var a in this.mAggregations) {
				this.destroyAggregation(a, s);
			}
			j(this.getId()).forEach(function (c) {
				c.destroy();
			});
			if (this.deregister) {
				this.deregister();
			}
			if (this.oParent && this.sParentAggregationName) {
				this.oParent._removeChild(this, this.sParentAggregationName, s);
			}
			delete this.oParent;
			q.each(this.mBindingInfos, function (n, b) {
				if (b.factory) {
					t.unbindAggregation(n, true);
				} else {
					t.unbindProperty(n, true);
				}
			});
			q.each(this.mObjectBindingInfos, function (n, b) {
				t.unbindObject(n, true);
			});
			if (s) {
				this.iSuppressInvalidate--;
			}
			if (this._observer) {
				this._observer.objectDestroyed(this);
			}
			E.prototype.destroy.apply(this, arguments);
			this.setParent = function () {
				throw Error("The object with ID " + t.getId() + " was destroyed and cannot be used anymore.");
			};
			this.bIsDestroyed = true;
		};
		h.bindingParser = B.simpleParser;
		h.prototype.isBinding = function (v, K) {
			return typeof this.extractBindingInfo(v) === "object";
		};
		h.prototype.extractBindingInfo = function (v, s) {
			if (v && typeof v === "object") {
				if (v.ui5object) {
					delete v.ui5object;
				} else if (v.path != undefined || v.parts) {
					if (v.template) {
						v.template = h.create(v.template);
					}
					return v;
				}
			}
			if (typeof v === "string") {
				return h.bindingParser(v, s, true);
			}
		};
		h.prototype.getBindingInfo = function (n) {
			return this.mBindingInfos[n];
		};
		h.prototype.bindObject = function (p, a) {
			var b = {},
				s, i;
			if (typeof p == "object") {
				b = p;
				p = b.path;
			} else {
				b.path = p;
				b.parameters = a;
			}
			i = p.indexOf(">");
			if (i > 0) {
				b.model = p.substr(0, i);
				b.path = p.substr(i + 1);
			}
			s = b.model;
			if (this.mObjectBindingInfos[s]) {
				this.unbindObject(s, true);
			}
			this.mObjectBindingInfos[s] = b;
			if (this.getModel(s)) {
				this._bindObject(b);
			}
			return this;
		};
		h.prototype._bindObject = function (b) {
			var o, c, s, a, t = this;
			var i = function (l) {
				t.setElementBindingContext(o.getBoundContext(), s);
			};
			s = b.model;
			a = this.getModel(s);
			c = this.getBindingContext(s);
			o = a.bindContext(b.path, c, b.parameters);
			o.attachChange(i);
			b.binding = o;
			b.modelChangeHandler = i;
			o.attachEvents(b.events);
			o.initialize();
		};
		h.prototype.bindContext = function (p) {
			return this.bindObject(p);
		};
		h.prototype.unbindContext = function (s) {
			return this.unbindObject(s);
		};
		h.prototype.unbindObject = function (s, _) {
			var b = this.mObjectBindingInfos[s];
			if (b) {
				if (b.binding) {
					b.binding.detachChange(b.modelChangeHandler);
					b.binding.detachEvents(b.events);
					b.binding.destroy();
				}
				delete this.mObjectBindingInfos[s];
				delete this.mElementBindingContexts[s];
				if (!_) {
					this.updateBindingContext(false, s);
					this.propagateProperties(s);
					this.fireModelContextChange();
				}
			}
			return this;
		};
		h.prototype.bindProperty = function (n, b, _, a) {
			var s, A = true,
				p = this.getMetadata().getPropertyLikeSetting(n);
			if (!p) {
				throw new Error("Property \"" + n + "\" does not exist in " + this);
			}
			if (typeof b == "string") {
				b = {
					parts: [{
						path: b,
						type: _ instanceof g ? _ : undefined,
						mode: a
					}],
					formatter: typeof _ === 'function' ? _ : undefined
				};
			}
			if (!b.parts) {
				b.parts = [];
				b.parts[0] = {
					path: b.path,
					targetType: b.targetType,
					type: b.type,
					suspended: b.suspended,
					formatOptions: b.formatOptions,
					constraints: b.constraints,
					model: b.model,
					mode: b.mode
				};
				delete b.path;
				delete b.targetType;
				delete b.mode;
				delete b.model;
			}
			for (var i = 0; i < b.parts.length; i++) {
				var o = b.parts[i];
				if (typeof o == "string") {
					o = {
						path: o
					};
					b.parts[i] = o;
				}
				s = o.path.indexOf(">");
				if (s > 0) {
					o.model = o.path.substr(0, s);
					o.path = o.path.substr(s + 1);
				}
				if (b.formatter && o.mode != d.OneWay && o.mode != d.OneTime) {
					o.mode = d.OneWay;
				}
				if (!this.getModel(o.model)) {
					A = false;
				}
			}
			if (this.isBound(n)) {
				this.unbindProperty(n, true);
			}
			this.mBindingInfos[n] = b;
			if (this._observer) {
				this._observer.bindingChange(this, n, "prepare", b, "property");
			}
			if (A) {
				this._bindProperty(n, b);
			}
			return this;
		};
		h.prototype._bindProperty = function (n, b) {
			var o, c, a, s, i = d.TwoWay,
				t, l, p = this.getMetadata().getPropertyLikeSetting(n),
				r = p._iKind === 0 ? p.type : p.altTypes[0],
				u = this,
				v = [],
				w = function (y) {
					u.updateProperty(n);
					var z = a.getDataState();
					if (z) {
						var A = z.getControlMessages();
						if (A && A.length > 0) {
							var G = sap.ui.getCore().getMessageManager();
							z.setControlMessages([]);
							if (A) {
								G.removeMessages(A);
							}
						}
						z.setInvalidValue(undefined);
					}
					if (a.getBindingMode() === d.OneTime && a.isResolved()) {
						a.detachChange(w);
						a.detachEvents(b.events);
						a.destroy();
					}
				},
				x = function () {
					var y = a.getDataState();
					if (!y) {
						return;
					}
					if (u.refreshDataState) {
						u.refreshDataState(n, y);
					}
				};
			c = this.getBindingContext(b.model);
			b.parts.forEach(function (y) {
				c = u.getBindingContext(y.model);
				o = u.getModel(y.model);
				t = y.type;
				if (typeof t == "string") {
					l = q.sap.getObject(t);
					if (typeof l !== "function") {
						throw new Error("Cannot find type \"" + t + "\" used in control \"" + u.getId() + "\"!");
					}
					t = new l(y.formatOptions, y.constraints);
				}
				a = o.bindProperty(y.path, c, b.parameters);
				a.setType(t, y.targetType || r);
				a.setFormatter(y.formatter);
				if (y.suspended) {
					a.suspend(true);
				}
				s = y.mode || o.getDefaultBindingMode();
				a.setBindingMode(s);
				if (s != d.TwoWay) {
					i = d.OneWay;
				}
				v.push(a);
			});
			if (v.length > 1 || (b.formatter && b.formatter.textFragments)) {
				t = b.type;
				if (typeof t == "string") {
					l = q.sap.getObject(t);
					t = new l(b.formatOptions, b.constraints);
				}
				a = new C(v, b.useRawValues, b.useInternalValues);
				a.setType(t, b.targetType || r);
				a.setBindingMode(b.mode || i);
			} else {
				a = v[0];
			}
			a.attachChange(w);
			if (this.refreshDataState) {
				a.attachAggregatedDataStateChange(x);
			}
			a.setFormatter(q.proxy(b.formatter, this));
			b.binding = a;
			b.modelChangeHandler = w;
			b.dataStateChangeHandler = x;
			a.attachEvents(b.events);
			a.initialize();
			if (this._observer) {
				this._observer.bindingChange(this, n, "ready", b, "property");
			}
		};
		h.prototype.unbindProperty = function (n, s) {
			var b = this.mBindingInfos[n];
			if (b) {
				if (b.binding) {
					b.binding.detachChange(b.modelChangeHandler);
					if (this.refreshDataState) {
						b.binding.detachAggregatedDataStateChange(b.dataStateChangeHandler);
					}
					b.binding.detachEvents(b.events);
					b.binding.destroy();
				}
				if (this._observer) {
					this._observer.bindingChange(this, n, "remove", this.mBindingInfos[n], "property");
				}
				delete this.mBindingInfos[n];
				if (!s) {
					this.resetProperty(n);
				}
			}
			return this;
		};
		h.prototype.updateProperty = function (n) {
			var b = this.mBindingInfos[n],
				o = b.binding,
				p = this.getMetadata().getPropertyLikeSetting(n);
			if (b.skipPropertyUpdate) {
				return;
			}
			try {
				var v = o.getExternalValue();
				b.skipModelUpdate = true;
				this[p._sMutator](v);
				b.skipModelUpdate = false;
			} catch (a) {
				b.skipModelUpdate = false;
				if (a instanceof F) {
					this.fireFormatError({
						element: this,
						property: n,
						type: o.getType(),
						newValue: o.getValue(),
						oldValue: this[p._sGetter](),
						exception: a,
						message: a.message
					}, false, true);
					b.skipModelUpdate = true;
					this.resetProperty(n);
					b.skipModelUpdate = false;
				} else {
					throw a;
				}
			}
		};
		h.prototype.updateModelProperty = function (n, v, o) {
			if (this.isBound(n)) {
				var b = this.mBindingInfos[n],
					a = b.binding;
				if (b.skipModelUpdate || (a && a.isSuspended())) {
					return;
				}
				if (a && a.getBindingMode() == d.TwoWay) {
					try {
						b.skipPropertyUpdate = true;
						a.setExternalValue(v);
						b.skipPropertyUpdate = false;
						var c = a.getExternalValue();
						if (v != c) {
							this.updateProperty(n);
						}
						if (a.hasValidation()) {
							this.fireValidationSuccess({
								element: this,
								property: n,
								type: a.getType(),
								newValue: v,
								oldValue: o
							}, false, true);
						}
					} catch (i) {
						b.skipPropertyUpdate = false;
						if (i instanceof P) {
							this.fireParseError({
								element: this,
								property: n,
								type: a.getType(),
								newValue: v,
								oldValue: o,
								exception: i,
								message: i.message
							}, false, true);
						} else if (i instanceof V) {
							this.fireValidationError({
								element: this,
								property: n,
								type: a.getType(),
								newValue: v,
								oldValue: o,
								exception: i,
								message: i.message
							}, false, true);
						} else {
							throw i;
						}
					}
				}
			}
		};
		var m = 1;
		h.prototype.bindAggregation = function (n, b) {
			var p, t, s, a, o = this.getMetadata(),
				A = o.getAggregation(n);
			if (!A) {
				throw new Error("Aggregation \"" + n + "\" does not exist in " + this);
			}
			if (!A.multiple) {
				q.sap.log.error("Binding of single aggregation \"" + n + "\" of " + this + " is not supported!");
			}
			if (typeof b == "string") {
				p = arguments[1];
				t = arguments[2];
				s = arguments[3];
				a = arguments[4];
				b = {
					path: p,
					sorter: s,
					filters: a
				};
				if (t instanceof h) {
					b.template = t;
				} else if (typeof t === "function") {
					b.factory = t;
				}
			}
			if (this.isBound(n)) {
				this.unbindAggregation(n);
			}
			if (!(b.template || b.factory)) {
				if (A._doesNotRequireFactory) {
					b.factory = function () {
						throw new Error("dummy factory called unexpectedly ");
					};
				} else {
					throw new Error("Missing template or factory function for aggregation " + n + " of " + this + " !");
				}
			}
			if (b.template) {
				if (b.template._sapui_candidateForDestroy) {
					q.sap.log.warning("A binding template that is marked as 'candidate for destroy' is reused in a binding. " + "You can use 'templateShareable:true' to fix this issue for all bindings that are affected " + "(The template is used in aggregation '" + n + "' of object '" + this.getId() + "'). " + "For more information, see documentation under 'Aggregation Binding'.");
					delete b.template._sapui_candidateForDestroy;
				}
				if (b.templateShareable === undefined) {
					b.templateShareable = m;
				}
				b.factory = function (c) {
					return b.template.clone(c);
				};
			}
			var i = b.path.indexOf(">");
			if (i > 0) {
				b.model = b.path.substr(0, i);
				b.path = b.path.substr(i + 1);
			}
			this.mBindingInfos[n] = b;
			if (this._observer) {
				this._observer.bindingChange(this, n, "prepare", b, "aggregation");
			}
			if (this.getModel(b.model)) {
				this._bindAggregation(n, b);
			}
			return this;
		};
		h.prototype._bindAggregation = function (n, b) {
			var t = this,
				o, a = function (l) {
					var u = "update" + n.substr(0, 1).toUpperCase() + n.substr(1);
					if (t[u]) {
						var s = l && l.getParameter("reason");
						if (s) {
							t[u](s);
						} else {
							t[u]();
						}
					} else {
						t.updateAggregation(n);
					}
				},
				c = function (l) {
					var r = "refresh" + n.substr(0, 1).toUpperCase() + n.substr(1);
					if (t[r]) {
						t[r](l.getParameter("reason"));
					} else {
						a(l);
					}
				};
			var i = this.getModel(b.model);
			if (this.isTreeBinding(n)) {
				o = i.bindTree(b.path, this.getBindingContext(b.model), b.filters, b.parameters, b.sorter);
			} else {
				o = i.bindList(b.path, this.getBindingContext(b.model), b.sorter, b.filters, b.parameters);
				if (this.bUseExtendedChangeDetection) {
					o.enableExtendedChangeDetection(!b.template, b.key);
				}
			}
			if (b.suspended) {
				o.suspend(true);
			}
			b.binding = o;
			b.modelChangeHandler = a;
			b.modelRefreshHandler = c;
			o.attachChange(a);
			o.attachRefresh(c);
			o.attachEvents(b.events);
			o.initialize();
			if (this._observer) {
				this._observer.bindingChange(this, n, "ready", b, "aggregation");
			}
		};
		h.prototype.unbindAggregation = function (n, s) {
			var b = this.mBindingInfos[n],
				a = this.getMetadata().getAggregation(n);
			if (b) {
				if (b.binding) {
					b.binding.detachChange(b.modelChangeHandler);
					b.binding.detachRefresh(b.modelRefreshHandler);
					b.binding.detachEvents(b.events);
					b.binding.destroy();
				}
				if (b.template) {
					if (!b.templateShareable && b.template.destroy) {
						b.template.destroy();
					}
					if (b.templateShareable === m) {
						b.template._sapui_candidateForDestroy = true;
					}
				}
				if (this._observer) {
					this._observer.bindingChange(this, n, "remove", this.mBindingInfos[n], "aggregation");
				}
				delete this.mBindingInfos[n];
				if (!s) {
					this[a._sDestructor]();
				}
			}
			return this;
		};
		h.prototype.updateAggregation = function (n) {
			var b = this.mBindingInfos[n],
				o = b.binding,
				a = b.factory,
				A = this.getMetadata().getAggregation(n),
				G, c, l, s = A._sMutator + "Group",
				t = this;

			function p(i, x) {
				if (t.bUseExtendedChangeDetection) {
					return M.uid('clone');
				} else {
					return i.getId() + "-" + x;
				}
			}

			function u(x, l, y, z) {
				var H = x[A._sGetter]() || [],
					J, K;
				if (H.length > l.length) {
					for (var i = l.length; i < H.length; i++) {
						K = H[i];
						x[A._sRemoveMutator](K);
						K.destroy("KeepDom");
					}
				}
				for (var i = 0; i < l.length; i++) {
					J = l[i];
					K = H[i];
					if (y) {
						y(J);
					}
					if (K) {
						K.setBindingContext(J, b.model);
					} else {
						K = a(p(x, i), J);
						K.setBindingContext(J, b.model);
						x[A._sMutator](K);
					}
					if (z) {
						z(J, K);
					}
				}
			}

			function r(x, l) {
				var y = l.diff,
					z = x[A._sGetter]() || [],
					H, J, K, i;
				if (!y || z.length === 0) {
					u(x, l);
					return;
				}
				for (i = 0; i < y.length; i++) {
					H = y[i];
					switch (H.type) {
						case "insert":
							K = l[H.index];
							J = a(p(x, H.index), K);
							J.setBindingContext(K, b.model);
							x[A._sInsertMutator](J, H.index);
							break;
						case "delete":
							J = x[A._sRemoveMutator](H.index);
							J.destroy("KeepDom");
							break;
						default:
							q.sap.log.error("Unknown diff type \"" + H.type + "\"");
					}
				}
				z = x[A._sGetter]() || [];
				for (i = 0; i < z.length; i++) {
					z[i].setBindingContext(l[i]);
				}
			}

			function v(i) {
				var N = o.getGroup(i);
				if (N.key !== G) {
					var x;
					if (b.groupHeaderFactory) {
						x = b.groupHeaderFactory(N);
					}
					t[s](N, x);
					G = N.key;
				}
			}

			function w(i, x) {
				u(i, x, null, function (y, z) {
					w(z, o.getNodeContexts(y));
				});
			}
			if (o instanceof L) {
				l = o.getContexts(b.startIndex, b.length);
				c = o.isGrouped() && t[s];
				if (c || o.bWasGrouped) {
					this[A._sDestructor]();
					u(this, l, c ? v : undefined);
				} else if (this.bUseExtendedChangeDetection) {
					r(this, l);
				} else {
					if (!b.template) {
						this[A._sDestructor]();
					}
					u(this, l);
				}
				o.bWasGrouped = c;
			} else if (o instanceof T) {
				if (!b.template) {
					this[A._sDestructor]();
				}
				w(this, o.getRootContexts());
			}
		};
		h.prototype.refreshAggregation = function (n) {
			var b = this.mBindingInfos[n],
				o = b.binding;
			o.getContexts(b.startIndex, b.length);
		};
		h.prototype.propagateMessages = function (n, a) {
			q.sap.log.warning("Message for " + this + ", Property " + n);
		};
		h.prototype.isTreeBinding = function (n) {
			return false;
		};
		h.prototype.updateBindings = function (u, s) {
			var t = this,
				n, b;

			function a(b) {
				var p = b.parts,
					i;
				if (p) {
					if (p.length == 1) {
						return (u || p[0].model == s) && !b.binding.updateRequired(t.getModel(p[0].model));
					} else {
						for (i = 0; i < p.length; i++) {
							if ((u || p[i].model == s) && !b.binding.aBindings[i].updateRequired(t.getModel(p[i].model))) {
								return true;
							}
						}
					}
				} else {
					return (u || b.model == s) && !b.binding.updateRequired(t.getModel(b.model));
				}
			}

			function c(b) {
				var p = b.parts,
					i;
				if (p) {
					for (i = 0; i < p.length; i++) {
						if (!t.getModel(p[i].model)) {
							return false;
						}
					}
					return true;
				} else {
					return !!t.getModel(b.model);
				}
			}

			function r(b) {
				if (t.refreshDataState) {
					t.refreshDataState(n, b.binding.getDataState());
				}
				b.binding.detachChange(b.modelChangeHandler);
				if (b.modelRefreshHandler) {
					b.binding.detachRefresh(b.modelRefreshHandler);
				}
				b.binding.detachEvents(b.events);
				b.binding.destroy();
				delete b.binding;
				delete b.modelChangeHandler;
				delete b.dataStateChangeHandler;
				delete b.modelRefreshHandler;
			}
			for (n in this.mBindingInfos) {
				b = this.mBindingInfos[n];
				if (b.binding && a(b)) {
					if (this._observer) {
						var l = b.factory ? "aggregation" : "property";
						this._observer.bindingChange(this, n, "remove", b, l);
					}
					r(b);
				}
				if (!b.binding && c(b)) {
					if (b.factory) {
						this._bindAggregation(n, b);
					} else {
						this._bindProperty(n, b);
					}
				}
			}
			for (n in this.mObjectBindingInfos) {
				b = this.mObjectBindingInfos[n];
				if (b.binding && a(b)) {
					r(b);
				}
				if (!b.binding && c(b)) {
					this._bindObject(b);
				}
			}
		};
		h.prototype.isBound = function (n) {
			return (n in this.mBindingInfos);
		};
		h.prototype.getObjectBinding = function (s) {
			return this.mObjectBindingInfos[s] && this.mObjectBindingInfos[s].binding;
		};
		h.prototype.getEventingParent = function () {
			return this.oParent;
		};
		h.prototype.getBinding = function (n) {
			return this.mBindingInfos[n] && this.mBindingInfos[n].binding;
		};
		h.prototype.getBindingPath = function (n) {
			var i = this.mBindingInfos[n];
			return i && (i.path || (i.parts && i.parts[0] && i.parts[0].path));
		};
		h.prototype.setBindingContext = function (c, s) {
			var o = this.oBindingContexts[s];
			if (e.hasChanged(o, c)) {
				this.oBindingContexts[s] = c;
				this.updateBindingContext(false, s);
				this.propagateProperties(s);
				this.fireModelContextChange();
			}
			return this;
		};
		h.prototype.setElementBindingContext = function (c, s) {
			var o = this.mElementBindingContexts[s];
			if (e.hasChanged(o, c)) {
				this.mElementBindingContexts[s] = c;
				this.updateBindingContext(true, s);
				this.propagateProperties(s);
				this.fireModelContextChange();
			}
			return this;
		};
		h.prototype.updateBindingContext = function (s, a, u) {
			var o, b = {},
				c, l, n, p, i;
			if (u) {
				for (c in this.oModels) {
					if (this.oModels.hasOwnProperty(c)) {
						b[c] = c;
					}
				}
				for (c in this.oPropagatedProperties.oModels) {
					if (this.oPropagatedProperties.oModels.hasOwnProperty(c)) {
						b[c] = c;
					}
				}
			} else {
				b[a] = a;
			}
			for (c in b) {
				if (b.hasOwnProperty(c)) {
					c = c === "undefined" ? undefined : c;
					o = this.getModel(c);
					p = this.mObjectBindingInfos[c];
					if (o && p && !s) {
						if (!p.binding) {
							this._bindObject(p);
						} else {
							l = this._getBindingContext(c);
							if (e.hasChanged(p.binding.getContext(), l)) {
								p.binding.setContext(l);
							}
						}
						continue;
					}
					l = this.getBindingContext(c);
					for (n in this.mBindingInfos) {
						var p = this.mBindingInfos[n],
							r = p.binding,
							t = p.parts;
						if (!r) {
							continue;
						}
						if (t && t.length > 1) {
							for (i = 0; i < t.length; i++) {
								if (t[i].model == c) {
									r.aBindings[i].setContext(l);
								}
							}
						} else if (p.factory) {
							if (p.model == c) {
								r.setContext(l);
							}
						} else {
							if (t[0].model == c) {
								r.setContext(l);
							}
						}
					}
				}
			}
		};
		h.prototype.getBindingContext = function (s) {
			var o = this.getModel(s),
				a = this.mElementBindingContexts[s];
			if (a && !o) {
				return a;
			} else if (a && o && a.getModel() === o) {
				return a;
			} else {
				return this._getBindingContext(s);
			}
		};
		h.prototype._getBindingContext = function (s) {
			var o = this.getModel(s),
				c = this.oBindingContexts[s],
				p = this.oPropagatedProperties.oBindingContexts[s];
			if (c && !o) {
				return this.oBindingContexts[s];
			} else if (c && o && c.getModel() === o) {
				return this.oBindingContexts[s];
			} else if (p && o && p.getModel() !== o) {
				return undefined;
			} else {
				return p;
			}
		};
		h.prototype.setModel = function (o, n) {
			if (!o && this.oModels[n]) {
				delete this.oModels[n];
				this.propagateProperties(n);
				this.updateBindings(false, n);
				this.fireModelContextChange();
			} else if (o && o !== this.oModels[n]) {
				this.oModels[n] = o;
				this.propagateProperties(n);
				this.updateBindingContext(false, n);
				this.updateBindings(false, n);
				this.fireModelContextChange();
			}
			return this;
		};
		h.prototype.addPropagationListener = function (l) {
			this.aPropagationListeners.push(l);
			this.propagateProperties(false);
			this._callPropagationListener(l);
			return this;
		};
		h.prototype.removePropagationListener = function (l) {
			var a = this.aPropagationListeners;
			var i = a.indexOf(l);
			if (i >= 0) {
				a.splice(i, 1);
				this.propagateProperties(false);
			}
			return this;
		};
		h.prototype.getPropagationListeners = function () {
			return this.oPropagatedProperties.aPropagationListeners.concat(this.aPropagationListeners);
		};
		h.prototype._callPropagationListener = function (l) {
			var a;
			if (l) {
				l(this);
			} else {
				a = this.getPropagationListeners();
				for (var i = 0; i < a.length; i++) {
					l = a[i];
					l(this);
				}
			}
			return this;
		};
		h._oEmptyPropagatedProperties = {
			oModels: {},
			oBindingContexts: {},
			aPropagationListeners: []
		};
		h.prototype.propagateProperties = function (n) {
			var p = this._getPropertiesToPropagate(),
				u = n === true,
				U = n === false,
				N = u ? undefined : n,
				a, A, i;
			for (a in this.mAggregations) {
				if (this.mSkipPropagation[a]) {
					continue;
				}
				A = this.mAggregations[a];
				if (A instanceof h) {
					this._propagateProperties(n, A, p, u, N, U);
				} else if (A instanceof Array) {
					for (i = 0; i < A.length; i++) {
						if (A[i] instanceof h) {
							this._propagateProperties(n, A[i], p, u, N, U);
						}
					}
				}
			}
		};
		h.prototype._propagateProperties = function (n, o, p, u, N, U) {
			if (!p) {
				p = this._getPropertiesToPropagate();
				u = n === true;
				U = n === false;
				N = u ? undefined : n;
			}
			if (o.oPropagatedProperties !== p) {
				o.oPropagatedProperties = p;
				if (U !== true) {
					o.updateBindings(u, N);
					o.updateBindingContext(false, N, u);
				}
				o.propagateProperties(n);
				if (U || u) {
					o._callPropagationListener();
				}
				o.fireModelContextChange();
			}
		};
		h.prototype._getPropertiesToPropagate = function () {
			var n = q.isEmptyObject(this.oModels),
				N = q.isEmptyObject(this.oBindingContexts),
				b = this.aPropagationListeners.length === 0,
				a = q.isEmptyObject(this.mElementBindingContexts);

			function c(l, o, p, r) {
				return l ? o : q.extend({}, o, p, r);
			}

			function i(l, o, p) {
				return l ? o : o.concat(p);
			}
			if (N && n && a && b) {
				return this.oPropagatedProperties;
			} else {
				return {
					oModels: c(n, this.oPropagatedProperties.oModels, this.oModels),
					oBindingContexts: c((N && a), this.oPropagatedProperties.oBindingContexts, this.oBindingContexts, this.mElementBindingContexts),
					aPropagationListeners: i(b, this.oPropagatedProperties.aPropagationListeners, this.aPropagationListeners)
				};
			}
		};
		h.prototype.getModel = function (n) {
			return this.oModels[n] || this.oPropagatedProperties.oModels[n];
		};
		h.prototype.hasModel = function () {
			return !(q.isEmptyObject(this.oModels) && q.isEmptyObject(this.oPropagatedProperties.oModels));
		};
		h.prototype.clone = function (s, a, o) {
			var c = true,
				b = true;
			if (o) {
				c = !!o.cloneChildren;
				b = !!o.cloneBindings;
			}
			if (!s) {
				s = M.uid("clone") || q.sap.uid();
			}
			if (!a && c) {
				a = this.findAggregatedObjects(true).map(function (O) {
					return O.getId();
				});
			}
			var n = this.getMetadata(),
				p = n._oClass,
				r = this.getId() + "-" + s,
				t = {},
				u = this.mProperties,
				K, N, v, w = h.bindingParser.escape,
				i;
			var x = Object.keys(u);
			i = x.length;
			while (i > 0) {
				K = x[--i];
				if (!(this.isBound(K) && b)) {
					if (typeof u[K] === "string") {
						t[K] = w(u[K]);
					} else {
						t[K] = u[K];
					}
				}
			}
			t["models"] = this.oModels;
			t["bindingContexts"] = this.oBindingContexts;
			if (c) {
				for (N in this.mAggregations) {
					var A = this.mAggregations[N];
					if (n.hasAggregation(N) && !(this.isBound(N) && b)) {
						if (A instanceof h) {
							t[N] = A.clone(s, a);
						} else if (Array.isArray(A)) {
							t[N] = [];
							for (var i = 0; i < A.length; i++) {
								t[N].push(A[i].clone(s, a));
							}
						} else {
							t[N] = A;
						}
					}
				}
				var y = j(this.getId());
				for (var i = 0, l = y.length; i < l; i++) {
					var z = y[i].clone(s);
					z.sParentId = r;
					z.sParentAggregationName = y[i].sParentAggregationName;
				}
				for (N in this.mAssociations) {
					var G = this.mAssociations[N];
					if (Array.isArray(G)) {
						G = G.slice(0);
						for (var i = 0; i < G.length; i++) {
							if (a.indexOf(G[i]) >= 0) {
								G[i] += "-" + s;
							}
						}
					} else if (a.indexOf(G) >= 0) {
						G += "-" + s;
					}
					t[N] = G;
				}
			}
			v = new p(r, t);
			for (N in this.mObjectBindingInfos) {
				v.mObjectBindingInfos[N] = q.extend({}, this.mObjectBindingInfos[N]);
			}
			for (N in this.mEventRegistry) {
				v.mEventRegistry[N] = this.mEventRegistry[N].slice();
			}
			if (b) {
				for (N in this.mBindingInfos) {
					var H = this.mBindingInfos[N];
					var J = q.extend({}, H);
					if (!H.templateShareable && H.template && H.template.clone) {
						J.template = H.template.clone(s, a);
						delete J.factory;
					} else if (H.templateShareable === m) {
						H.templateShareable = J.templateShareable = true;
						q.sap.log.error("During a clone operation, a template was found that neither was marked with 'templateShareable:true' nor 'templateShareable:false'. " + "The framework won't destroy the template. This could cause errors (e.g. duplicate IDs) or memory leaks " + "(The template is used in aggregation '" + N + "' of object '" + this.getId() + "')." + "For more information, see documentation under 'Aggregation Binding'.");
					}
					delete J.binding;
					delete J.modelChangeHandler;
					delete J.dataStateChangeHandler;
					delete J.modelRefreshHandler;
					if (H.factory || H.template) {
						v.bindAggregation(N, J);
					} else {
						v.bindProperty(N, J);
					}
				}
			}
			if (h._supportInfo) {
				h._supportInfo.addSupportInfo(v.getId(), h._supportInfo.byId(this.getId()));
			}
			if (this._cloneMetadataContexts) {
				this._cloneMetadataContexts(v);
			}
			return v;
		};
		h._handleLocalizationChange = function (p) {
			var i;
			if (p === 1) {
				q.each(this.oModels, function (n, o) {
					if (o && o._handleLocalizationChange) {
						o._handleLocalizationChange();
					}
				});
			} else if (p === 2) {
				q.each(this.mBindingInfos, function (n, b) {
					var a = b.parts;
					if (a) {
						for (i = 0; i < a.length; i++) {
							if (b.type && b.type._handleLocalizationChange) {
								b.type._handleLocalizationChange();
							}
						}
						if (b.modelChangeHandler) {
							b.modelChangeHandler();
						}
					}
				});
			}
		};
		h.prototype.findAggregatedObjects = function (r, c) {
			var A = [];
			if (c && typeof c !== "function") {
				c = null;
			}

			function b(o) {
				var a, i, n;
				for (n in o.mAggregations) {
					a = o.mAggregations[n];
					if (Array.isArray(a)) {
						for (i = 0; i < a.length; i++) {
							if (!c || c(a[i])) {
								A.push(a[i]);
							}
							if (r) {
								b(a[i]);
							}
						}
					} else if (a instanceof h) {
						if (!c || c(a)) {
							A.push(a);
						}
						if (r) {
							b(a);
						}
					}
				}
			}
			b(this);
			return A;
		};
		h._defaultContextualSettings = {};
		return h;
	});
	sap.ui.predefine('sap/ui/base/ManagedObjectMetadata', ['jquery.sap.global', './DataType', './Metadata'], function (q, D, M) {
		"use strict";
		var b = function (C, o) {
			M.apply(this, arguments);
		};
		b.prototype = Object.create(M.prototype);
		var h = Object.prototype.hasOwnProperty;

		function c(n) {
			return n.charAt(0).toUpperCase() + n.slice(1);
		}
		var r = /(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;
		var S = {
			'children': -3,
			'ies': 'y',
			'ves': 'f',
			'oes': -2,
			'ses': -2,
			'ches': -2,
			'shes': -2,
			'xes': -2,
			's': -1
		};

		function g(n) {
			return n.replace(r, function ($, p) {
				var R = S[p.toLowerCase()];
				return typeof R === "string" ? R : p.slice(0, R);
			});
		}

		function e(f, n) {
			return function () {
				q.sap.log.warning("Usage of deprecated feature: " + n);
				return f.apply(this, arguments);
			};
		}

		function j(o, i) {
			var a = null;
			for (var n in i) {
				if (h.call(i, n) && typeof o[n] === 'undefined') {
					a = a || {};
					a[n] = i[n];
				}
			}
			return a;
		}
		var K = {
			SPECIAL_SETTING: -1,
			PROPERTY: 0,
			SINGLE_AGGREGATION: 1,
			MULTIPLE_AGGREGATION: 2,
			SINGLE_ASSOCIATION: 3,
			MULTIPLE_ASSOCIATION: 4,
			EVENT: 5
		};
		b._guessSingularName = g;

		function k(C, n, i) {
			i = typeof i !== 'object' ? {
				type: i
			} : i;
			this.name = n;
			this.type = i.type || 'any';
			this.visibility = i.visibility || 'public';
			this.defaultValue = i.defaultValue;
			this.appData = j(this, i);
			this._oParent = C;
			this._sUID = "special:" + n;
			this._iKind = K.SPECIAL_SETTING;
		}

		function P(C, n, i) {
			i = typeof i !== 'object' ? {
				type: i
			} : i;
			this.name = n;
			this.type = i.type || 'string';
			this.group = i.group || 'Misc';
			this.defaultValue = i.defaultValue !== null ? i.defaultValue : null;
			this.bindable = !!i.bindable;
			this.deprecated = !!i.deprecated || false;
			this.visibility = 'public';
			this.appData = j(this, i);
			this._oParent = C;
			this._sUID = n;
			this._iKind = K.PROPERTY;
			var N = c(n);
			this._sMutator = 'set' + N;
			this._sGetter = 'get' + N;
			if (this.bindable) {
				this._sBind = 'bind' + N;
				this._sUnbind = 'unbind' + N;
			} else {
				this._sBind = this._sUnbind = undefined;
			}
			this._oType = null;
		}
		P.prototype.generate = function (a) {
			var t = this,
				n = t.name;
			a(t._sGetter, function () {
				return this.getProperty(n);
			});
			a(t._sMutator, function (v) {
				this.setProperty(n, v);
				return this;
			}, t);
			if (t.bindable) {
				a(t._sBind, function (p, f, m) {
					this.bindProperty(n, p, f, m);
					return this;
				}, t);
				a(t._sUnbind, function (p) {
					this.unbindProperty(n, p);
					return this;
				});
			}
		};
		P.prototype.getType = function () {
			return this._oType || (this._oType = D.getType(this.type));
		};
		P.prototype.getDefaultValue = function () {
			var d = this.defaultValue,
				t;
			if (d === null) {
				t = this.getType();
				if (t instanceof D) {
					d = t.getDefaultValue();
				}
			}
			return d;
		};
		P.prototype.get = function (i) {
			return i[this._sGetter]();
		};
		P.prototype.set = function (i, v) {
			return i[this._sMutator](v);
		};

		function A(C, n, i) {
			i = typeof i !== 'object' ? {
				type: i
			} : i;
			this.name = n;
			this.type = i.type || 'sap.ui.core.Control';
			this.altTypes = i.altTypes || undefined;
			this.multiple = typeof i.multiple === 'boolean' ? i.multiple : true;
			this.singularName = this.multiple ? i.singularName || g(n) : undefined;
			this.bindable = !!i.bindable;
			this.deprecated = i.deprecated || false;
			this.visibility = i.visibility || 'public';
			this._doesNotRequireFactory = !!i._doesNotRequireFactory;
			this.appData = j(this, i);
			this._oParent = C;
			this._sUID = 'aggregation:' + n;
			this._iKind = this.multiple ? K.MULTIPLE_AGGREGATION : K.SINGLE_AGGREGATION;
			var N = c(n);
			this._sGetter = 'get' + N;
			if (this.multiple) {
				var a = c(this.singularName);
				this._sMutator = 'add' + a;
				this._sInsertMutator = 'insert' + a;
				this._sRemoveMutator = 'remove' + a;
				this._sRemoveAllMutator = 'removeAll' + N;
				this._sIndexGetter = 'indexOf' + a;
			} else {
				this._sMutator = 'set' + N;
				this._sInsertMutator = this._sRemoveMutator = this._sRemoveAllMutator = this._sIndexGetter = undefined;
			}
			this._sDestructor = 'destroy' + N;
			if (this.bindable) {
				this._sBind = 'bind' + N;
				this._sUnbind = 'unbind' + N;
			} else {
				this._sBind = this._sUnbind = undefined;
			}
		}
		A.prototype.generate = function (d) {
			var m = this,
				n = m.name;
			if (!m.multiple) {
				d(m._sGetter, function () {
					return this.getAggregation(n);
				});
				d(m._sMutator, function (v) {
					this.setAggregation(n, v);
					return this;
				}, m);
			} else {
				d(m._sGetter, function () {
					return this.getAggregation(n, []);
				});
				d(m._sMutator, function (a) {
					this.addAggregation(n, a);
					return this;
				}, m);
				d(m._sInsertMutator, function (i, a) {
					this.insertAggregation(n, i, a);
					return this;
				}, m);
				d(m._sRemoveMutator, function (a) {
					return this.removeAggregation(n, a);
				});
				d(m._sRemoveAllMutator, function () {
					return this.removeAllAggregation(n);
				});
				d(m._sIndexGetter, function (a) {
					return this.indexOfAggregation(n, a);
				});
			}
			d(m._sDestructor, function () {
				this.destroyAggregation(n);
				return this;
			});
			if (m.bindable) {
				d(m._sBind, function (p, t, s, f) {
					this.bindAggregation(n, p, t, s, f);
					return this;
				}, m);
				d(m._sUnbind, function (p) {
					this.unbindAggregation(n, p);
					return this;
				});
			}
		};
		A.prototype.getType = function () {
			return this._oType || (this._oType = D.getType(this.type));
		};
		A.prototype.get = function (i) {
			return i[this._sGetter]();
		};
		A.prototype.set = function (i, v) {
			return i[this._sMutator](v);
		};
		A.prototype.add = function (i, v) {
			return i[this._sMutator](v);
		};
		A.prototype.insert = function (i, v, p) {
			return i[this._sInsertMutator](v, p);
		};
		A.prototype.remove = function (i, v) {
			return i[this._sRemoveMutator](v);
		};
		A.prototype.removeAll = function (i) {
			return i[this._sRemoveAllMutator]();
		};
		A.prototype.indexOf = function (i, v) {
			return i[this._sIndexGetter](v);
		};

		function l(C, n, i) {
			i = typeof i !== 'object' ? {
				type: i
			} : i;
			this.name = n;
			this.type = i.type || 'sap.ui.core.Control';
			this.multiple = i.multiple || false;
			this.singularName = this.multiple ? i.singularName || g(n) : undefined;
			this.deprecated = i.deprecated || false;
			this.visibility = 'public';
			this.appData = j(this, i);
			this._oParent = C;
			this._sUID = 'association:' + n;
			this._iKind = this.multiple ? K.MULTIPLE_ASSOCIATION : K.SINGLE_ASSOCIATION;
			var N = c(n);
			this._sGetter = 'get' + N;
			if (this.multiple) {
				var a = c(this.singularName);
				this._sMutator = 'add' + a;
				this._sRemoveMutator = 'remove' + a;
				this._sRemoveAllMutator = 'removeAll' + a;
			} else {
				this._sMutator = 'set' + N;
				this._sRemoveMutator = this._sRemoveAllMutator = undefined;
			}
		}
		l.prototype.generate = function (d) {
			var t = this,
				n = t.name;
			if (!t.multiple) {
				d(t._sGetter, function () {
					return this.getAssociation(n);
				});
				d(t._sMutator, function (v) {
					this.setAssociation(n, v);
					return this;
				}, t);
			} else {
				d(t._sGetter, function () {
					return this.getAssociation(n, []);
				});
				d(t._sMutator, function (a) {
					this.addAssociation(n, a);
					return this;
				}, t);
				d(t._sRemoveMutator, function (a) {
					return this.removeAssociation(n, a);
				});
				d(t._sRemoveAllMutator, function () {
					return this.removeAllAssociation(n);
				});
			}
		};
		l.prototype.getType = function () {
			return this._oType || (this._oType = D.getType(this.type));
		};
		l.prototype.get = function (i) {
			return i[this._sGetter]();
		};
		l.prototype.set = function (i, v) {
			return i[this._sMutator](v);
		};
		l.prototype.remove = function (i, v) {
			return i[this._sRemoveMutator](v);
		};
		l.prototype.removeAll = function (i) {
			return i[this._sRemoveAllMutator]();
		};

		function E(C, n, i) {
			this.name = n;
			this.allowPreventDefault = i.allowPreventDefault || false;
			this.deprecated = i.deprecated || false;
			this.visibility = 'public';
			this.allowPreventDefault = !!i.allowPreventDefault;
			this.enableEventBubbling = !!i.enableEventBubbling;
			this.appData = j(this, i);
			this._oParent = C;
			this._sUID = 'event:' + n;
			this._iKind = K.EVENT;
			var N = c(n);
			this._sMutator = 'attach' + N;
			this._sDetachMutator = 'detach' + N;
			this._sTrigger = 'fire' + N;
		}
		E.prototype.generate = function (a) {
			var t = this,
				n = t.name,
				i = t.allowPreventDefault,
				m = t.enableEventBubbling;
			a(t._sMutator, function (d, f, o) {
				this.attachEvent(n, d, f, o);
				return this;
			}, t);
			a(t._sDetachMutator, function (f, o) {
				this.detachEvent(n, f, o);
				return this;
			});
			a(t._sTrigger, function (p) {
				return this.fireEvent(n, p, i, m);
			});
		};
		E.prototype.attach = function (i, d, f, a) {
			return i[this._sMutator](d, f, a);
		};
		E.prototype.detach = function (i, f, a) {
			return i[this._sDetachMutator](f, a);
		};
		E.prototype.fire = function (i, p, a, d) {
			return i[this._sTrigger](p, a, d);
		};
		b.prototype.metaFactorySpecialSetting = k;
		b.prototype.metaFactoryProperty = P;
		b.prototype.metaFactoryAggregation = A;
		b.prototype.metaFactoryAssociation = l;
		b.prototype.metaFactoryEvent = E;
		b.prototype.applySettings = function (C) {
			var t = this,
				s = C.metadata;
			M.prototype.applySettings.call(this, C);

			function n(I, F) {
				var R = {},
					N;
				if (I) {
					for (N in I) {
						if (h.call(I, N)) {
							R[N] = new F(t, N, I[N]);
						}
					}
				}
				return R;
			}

			function f(I, p) {
				var R = {},
					N;
				for (N in I) {
					if (p === (I[N].visibility === 'public')) {
						R[N] = I[N];
					}
				}
				return R;
			}
			var a = /([a-z][^.]*(?:\.[a-z][^.]*)*)\./;

			function d(N) {
				var m = a.exec(N);
				return (m && m[1]) || "";
			}
			this._sLibraryName = s.library || d(this.getName());
			this._mSpecialSettings = n(s.specialSettings, this.metaFactorySpecialSetting);
			this._mProperties = n(s.properties, this.metaFactoryProperty);
			var i = n(s.aggregations, this.metaFactoryAggregation);
			this._mAggregations = f(i, true);
			this._mPrivateAggregations = f(i, false);
			this._sDefaultAggregation = s.defaultAggregation || null;
			this._sDefaultProperty = s.defaultProperty || null;
			this._mAssociations = n(s.associations, this.metaFactoryAssociation);
			this._mEvents = n(s.events, this.metaFactoryEvent);
			this._oDesignTime = C.metadata["designTime"];
			if (C.metadata.__version > 1.0) {
				this.generateAccessors();
			}
		};
		b.prototype.afterApplySettings = function () {
			M.prototype.afterApplySettings.call(this);
			var p = this.getParent();
			if (p instanceof b) {
				this._mAllEvents = q.extend({}, p._mAllEvents, this._mEvents);
				this._mAllProperties = q.extend({}, p._mAllProperties, this._mProperties);
				this._mAllPrivateAggregations = q.extend({}, p._mAllPrivateAggregations, this._mPrivateAggregations);
				this._mAllAggregations = q.extend({}, p._mAllAggregations, this._mAggregations);
				this._mAllAssociations = q.extend({}, p._mAllAssociations, this._mAssociations);
				this._sDefaultAggregation = this._sDefaultAggregation || p._sDefaultAggregation;
				this._sDefaultProperty = this._sDefaultProperty || p._sDefaultProperty;
				this._mAllSpecialSettings = q.extend({}, p._mAllSpecialSettings, this._mSpecialSettings);
			} else {
				this._mAllEvents = this._mEvents;
				this._mAllProperties = this._mProperties;
				this._mAllPrivateAggregations = this._mPrivateAggregations;
				this._mAllAggregations = this._mAggregations;
				this._mAllAssociations = this._mAssociations;
				this._mAllSpecialSettings = this._mSpecialSettings;
			}
		};
		b.Kind = K;
		b.prototype.getLibraryName = function () {
			return this._sLibraryName;
		};
		b.prototype.addProperty = function (n, i) {
			var p = this._mProperties[n] = new P(this, n, i);
			if (!this._mAllProperties[n]) {
				this._mAllProperties[n] = p;
			}
		};
		b.prototype.hasProperty = function (n) {
			return !!this._mAllProperties[n];
		};
		b.prototype.getProperty = function (n) {
			var p = this._mAllProperties[n];
			return typeof p === 'object' ? p : undefined;
		};
		b.prototype.getProperties = function () {
			return this._mProperties;
		};
		b.prototype.getAllProperties = function () {
			return this._mAllProperties;
		};
		b.prototype.hasAggregation = function (n) {
			return !!this._mAllAggregations[n];
		};
		b.prototype.getAggregation = function (n) {
			n = n || this._sDefaultAggregation;
			var a = n ? this._mAllAggregations[n] : undefined;
			return typeof a === 'object' ? a : undefined;
		};
		b.prototype.getAggregations = function () {
			return this._mAggregations;
		};
		b.prototype.getAllAggregations = function () {
			return this._mAllAggregations;
		};
		b.prototype.getAllPrivateAggregations = function () {
			return this._mAllPrivateAggregations;
		};
		b.prototype.getManagedAggregation = function (a) {
			a = a || this._sDefaultAggregation;
			var o = a ? this._mAllAggregations[a] || this._mAllPrivateAggregations[a] : undefined;
			return typeof o === 'object' ? o : undefined;
		};
		b.prototype.getDefaultAggregationName = function () {
			return this._sDefaultAggregation;
		};
		b.prototype.getDefaultAggregation = function () {
			return this.getAggregation();
		};
		b.prototype.getDefaultPropertyName = function () {
			return this._sDefaultProperty;
		};
		b.prototype.getDefaultProperty = function () {
			return this.getProperty(this.getDefaultPropertyName());
		};
		b.prototype.getPropertyLikeSetting = function (n) {
			var p = this._mAllProperties[n];
			if (typeof p === 'object') {
				return p;
			}
			p = this._mAllAggregations[n];
			return (typeof p === 'object' && p.altTypes && p.altTypes.length > 0) ? p : undefined;
		};
		b.prototype.hasAssociation = function (n) {
			return !!this._mAllAssociations[n];
		};
		b.prototype.getAssociation = function (n) {
			var a = this._mAllAssociations[n];
			return typeof a === 'object' ? a : undefined;
		};
		b.prototype.getAssociations = function () {
			return this._mAssociations;
		};
		b.prototype.getAllAssociations = function () {
			return this._mAllAssociations;
		};
		b.prototype.hasEvent = function (n) {
			return !!this._mAllEvents[n];
		};
		b.prototype.getEvent = function (n) {
			var o = this._mAllEvents[n];
			return typeof o === 'object' ? o : undefined;
		};
		b.prototype.getEvents = function () {
			return this._mEvents;
		};
		b.prototype.getAllEvents = function () {
			return this._mAllEvents;
		};
		b.prototype.addSpecialSetting = function (n, i) {
			var s = new k(this, n, i);
			this._mSpecialSettings[n] = s;
			if (!this._mAllSpecialSettings[n]) {
				this._mAllSpecialSettings[n] = s;
			}
		};
		b.prototype.hasSpecialSetting = function (n) {
			return !!this._mAllSpecialSettings[n];
		};
		b.prototype.getPropertyDefaults = function () {
			var d = this._mDefaults;
			if (d) {
				return d;
			}
			if (this.getParent() instanceof b) {
				d = q.extend({}, this.getParent().getPropertyDefaults());
			} else {
				d = {};
			}
			for (var s in this._mProperties) {
				d[s] = this._mProperties[s].getDefaultValue();
			}
			this._mDefaults = d;
			return d;
		};
		b.prototype.createPropertyBag = function () {
			if (!this._fnPropertyBagFactory) {
				this._fnPropertyBagFactory = function PropertyBag() {};
				this._fnPropertyBagFactory.prototype = this.getPropertyDefaults();
			}
			return new(this._fnPropertyBagFactory)();
		};
		b.prototype._enrichChildInfos = function () {
			q.sap.log.error("obsolete call to ManagedObjectMetadata._enrichChildInfos. This private method will be deleted soon");
		};
		b.prototype.getJSONKeys = function () {
			if (this._mJSONKeys) {
				return this._mJSONKeys;
			}
			var a = {},
				J = {};

			function d(m) {
				var n, i, p;
				for (n in m) {
					i = m[n];
					p = a[n];
					if (!p || i._iKind < p._iKind) {
						a[n] = J[n] = i;
					}
					J[i._sUID] = i;
				}
			}
			d(this._mAllSpecialSettings);
			d(this.getAllProperties());
			d(this.getAllAggregations());
			d(this.getAllAssociations());
			d(this.getAllEvents());
			this._mJSONKeys = J;
			this._mAllSettings = a;
			return this._mJSONKeys;
		};
		b.prototype.getAllSettings = function () {
			if (!this._mAllSettings) {
				this.getJSONKeys();
			}
			return this._mAllSettings;
		};
		b.prototype.removeUnknownSettings = function (s) {
			if (s == null) {
				return s;
			}
			var v = this.getJSONKeys(),
				R = {},
				n;
			for (n in s) {
				if (h.call(v, n)) {
					R[n] = s[n];
				}
			}
			return R;
		};
		b.prototype.generateAccessors = function () {
			var p = this.getClass().prototype,
				a = this.getName() + ".",
				m = this._aPublicMethods,
				n;

			function d(f, i, o) {
				if (!p[f]) {
					p[f] = (o && o.deprecated) ? e(i, a + o.name) : i;
				}
				m.push(f);
			}
			for (n in this._mProperties) {
				this._mProperties[n].generate(d);
			}
			for (n in this._mAggregations) {
				this._mAggregations[n].generate(d);
			}
			for (n in this._mAssociations) {
				this._mAssociations[n].generate(d);
			}
			for (n in this._mEvents) {
				this._mEvents[n].generate(d);
			}
		};

		function u(m) {
			if (typeof m._oDesignTime === "object" || !m._oDesignTime) {
				return Promise.resolve(m._oDesignTime || null);
			}
			return new Promise(function (R) {
				var s;
				if (typeof m._oDesignTime === "string") {
					s = m._oDesignTime;
				} else {
					s = q.sap.getResourceName(m.getName(), ".designtime");
				}
				sap.ui.require([s], function (d) {
					d.designtimeModule = s;
					m._oDesignTime = d;
					R(d);
				});
			});
		}
		b.prototype.loadDesignTime = function () {
			if (!this._oDesignTimePromise) {
				var W;
				var p = this.getParent();
				if (p instanceof b) {
					W = p.loadDesignTime();
				} else {
					W = Promise.resolve(null);
				}
				this._oDesignTimePromise = u(this).then(function (o) {
					return W.then(function (a) {
						if (a) {
							delete a["designtimeModule"];
						}
						return q.sap.extend(true, {}, a, o);
					});
				});
			}
			return this._oDesignTimePromise;
		};
		var U = {},
			w;

		function x(i) {
			i = (w || (w = sap.ui.getCore().getConfiguration().getUIDPrefix())) + i;
			var C = U[i] || 0;
			U[i] = C + 1;
			return i + C;
		}
		b.uid = x;
		b.prototype.uid = function () {
			var i = this._sUIDToken;
			if (typeof i !== "string") {
				i = this.getName();
				i = i.slice(i.lastIndexOf('.') + 1);
				i = i.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ").slice(-1)[0];
				i = this._sUIDToken = i.replace(/([^A-Za-z0-9-_.:])|([0-9]+$)/g, "").toLowerCase();
			}
			return x(i);
		};
		var y;
		b.isGeneratedId = function (i) {
			w = w || sap.ui.getCore().getConfiguration().getUIDPrefix();
			y = y || new RegExp("(^|-{1,3})" + q.sap.escapeRegExp(w));
			return y.test(i);
		};
		return b;
	}, true);
	sap.ui.predefine('sap/ui/base/Metadata', ['jquery.sap.global', 'jquery.sap.script'], function (q) {
		"use strict";
		var M = function (c, C) {
			if (!C || typeof C.metadata !== "object") {
				C = {
					metadata: C || {},
					constructor: q.sap.getObject(c)
				};
				C.metadata.__version = 1.0;
			}
			C.metadata.__version = C.metadata.__version || 2.0;
			if (typeof C.constructor !== "function") {
				throw Error("constructor for class " + c + " must have been declared before creating metadata for it");
			}
			this._sClassName = c;
			this._oClass = C.constructor;
			this.extend(C);
		};
		M.prototype.extend = function (c) {
			this.applySettings(c);
			this.afterApplySettings();
		};
		M.prototype.applySettings = function (c) {
			var t = this,
				s = c.metadata,
				p;
			if (s.baseType) {
				var P = q.sap.getObject(s.baseType);
				if (typeof P !== "function") {
					q.sap.log.fatal("base class '" + s.baseType + "' does not exist");
				}
				if (P.getMetadata) {
					this._oParent = P.getMetadata();
				} else {
					this._oParent = new M(s.baseType, {});
				}
			} else {
				this._oParent = undefined;
			}
			this._bAbstract = !!s["abstract"];
			this._bFinal = !!s["final"];
			this._sStereotype = s.stereotype || (this._oParent ? this._oParent._sStereotype : "object");
			this._bDeprecated = !!s["deprecated"];
			this._aInterfaces = s.interfaces || [];
			this._aPublicMethods = s.publicMethods || [];
			this._bInterfacesUnique = false;
			p = this._oClass.prototype;
			for (var n in c) {
				if (n !== "metadata" && n !== "constructor") {
					p[n] = c[n];
					if (!n.match(/^_|^on|^init$|^exit$/)) {
						t._aPublicMethods.push(n);
					}
				}
			}
		};
		M.prototype.afterApplySettings = function () {
			if (this._oParent) {
				this._aAllPublicMethods = this._oParent._aAllPublicMethods.concat(this._aPublicMethods);
				this._bInterfacesUnique = false;
			} else {
				this._aAllPublicMethods = this._aPublicMethods;
			}
		};
		M.prototype.getStereotype = function () {
			return this._sStereotype;
		};
		M.prototype.getName = function () {
			return this._sClassName;
		};
		M.prototype.getClass = function () {
			return this._oClass;
		};
		M.prototype.getParent = function () {
			return this._oParent;
		};
		M.prototype._dedupInterfaces = function () {
			if (!this._bInterfacesUnique) {
				q.sap.unique(this._aInterfaces);
				q.sap.unique(this._aPublicMethods);
				q.sap.unique(this._aAllPublicMethods);
				this._bInterfacesUnique = true;
			}
		};
		M.prototype.getPublicMethods = function () {
			this._dedupInterfaces();
			return this._aPublicMethods;
		};
		M.prototype.getAllPublicMethods = function () {
			this._dedupInterfaces();
			return this._aAllPublicMethods;
		};
		M.prototype.getInterfaces = function () {
			this._dedupInterfaces();
			return this._aInterfaces;
		};
		M.prototype.isInstanceOf = function (I) {
			if (this._oParent) {
				if (this._oParent.isInstanceOf(I)) {
					return true;
				}
			}
			var a = this._aInterfaces;
			for (var i = 0, l = a.length; i < l; i++) {
				if (a[i] === I) {
					return true;
				}
			}
			return false;
		};
		M.prototype.isAbstract = function () {
			return this._bAbstract;
		};
		M.prototype.isFinal = function () {
			return this._bFinal;
		};
		M.prototype.isDeprecated = function () {
			return this._bDeprecated;
		};
		M.prototype.addPublicMethods = function (m) {
			var n = (m instanceof Array) ? m : arguments;
			Array.prototype.push.apply(this._aPublicMethods, n);
			Array.prototype.push.apply(this._aAllPublicMethods, n);
			this._bInterfacesUnique = false;
		};
		M.createClass = function (b, c, C, F) {
			if (typeof b === "string") {
				F = C;
				C = c;
				c = b;
				b = null;
			}
			F = F || M;
			if (typeof F.preprocessClassInfo === "function") {
				C = F.preprocessClassInfo(C);
			}
			C = C || {};
			C.metadata = C.metadata || {};
			if (!C.hasOwnProperty('constructor')) {
				C.constructor = undefined;
			}
			var f = C.constructor;
			if (b) {
				if (!f) {
					if (C.metadata.deprecated) {
						f = function () {
							q.sap.log.warning("Usage of deprecated class: " + c);
							b.apply(this, arguments);
						};
					} else {
						f = function () {
							b.apply(this, arguments);
						};
					}
				}
				f.prototype = Object.create(b.prototype);
				f.prototype.constructor = f;
				C.metadata.baseType = b.getMetadata().getName();
			} else {
				f = f || function () {};
				delete C.metadata.baseType;
			}
			C.constructor = f;
			q.sap.setObject(c, f);
			var m = new F(c, C);
			f.getMetadata = f.prototype.getMetadata = q.sap.getter(m);
			if (!f.getMetadata().isFinal()) {
				f.extend = function (s, S, a) {
					return M.createClass(f, s, S, a || F);
				};
			}
			return f;
		};
		return M;
	}, true);
	sap.ui.predefine('sap/ui/base/Object', ['jquery.sap.global', './Interface', './Metadata'], function (q, I, M) {
		"use strict";
		var B = M.createClass("sap.ui.base.Object", {
			constructor: function () {
				if (!(this instanceof B)) {
					throw Error("Cannot instantiate object: \"new\" is missing!");
				}
			}
		});
		B.prototype.destroy = function () {};
		B.prototype.getInterface = function () {
			var i = new I(this, this.getMetadata().getAllPublicMethods());
			this.getInterface = q.sap.getter(i);
			return i;
		};
		B.defineClass = function (c, s, F) {
			var m = new(F || M)(c, s);
			var C = m.getClass();
			C.getMetadata = C.prototype.getMetadata = q.sap.getter(m);
			if (!m.isFinal()) {
				C.extend = function (S, o, f) {
					return M.createClass(C, S, o, f || F);
				};
			}
			q.sap.log.debug("defined class '" + c + "'" + (m.getParent() ? " as subclass of " + m.getParent().getName() : ""));
			return m;
		};
		return B;
	}, true);
	sap.ui.predefine('sap/ui/base/ObjectPool', ['./Object'], function (B) {
		"use strict";
		var O = B.extend("sap.ui.base.ObjectPool", {
			constructor: function (o) {
				B.call(this);
				this.oObjectClass = o;
				this.aFreeObjects = [];
			}
		});
		O.prototype.borrowObject = function () {
			var o = this.aFreeObjects.length == 0 ? new this.oObjectClass() : this.aFreeObjects.pop();
			o.init.apply(o, arguments);
			return o;
		};
		O.prototype.returnObject = function (o) {
			o.reset();
			this.aFreeObjects.push(o);
		};
		return O;
	});
	sap.ui.predefine('sap/ui/core/BusyIndicatorUtils', ['jquery.sap.global'], function (q) {
		"use strict";
		var B = function () {};
		B.getElement = function (s) {
			var S = "sapUiLocalBusyIndicatorSizeMedium";
			if (s === "Large") {
				S = "sapUiLocalBusyIndicatorSizeBig";
			}
			var c = document.createElement("div");
			c.className = "sapUiLocalBusyIndicator " + S + " sapUiLocalBusyIndicatorFade";
			c.setAttribute("role", "progressbar");
			c.setAttribute("aria-valuemin", "0");
			c.setAttribute("aria-valuemax", "100");
			c.setAttribute("alt", "");
			c.setAttribute("tabIndex", "0");
			var r = sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");
			var t = r.getText("BUSY_TEXT");
			c.setAttribute("title", t);
			var a = document.createElement("div");
			a.className = "sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimStandard";
			a.appendChild(document.createElement("div"));
			a.appendChild(document.createElement("div"));
			a.appendChild(document.createElement("div"));
			c.appendChild(a);
			return c;
		};
		B.addHTML = function ($, b, s) {
			var e = B.getElement(s),
				S = "sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimStandard",
				a = e.children[0];
			e.id = b;
			var d = $.get(0);
			d.appendChild(e);
			d.className += " sapUiLocalBusy";
			if (s === sap.ui.core.BusyIndicatorSize.Small) {
				S = "sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimSmall";
			} else if (s === sap.ui.core.BusyIndicatorSize.Auto) {
				a.className = S;
				var w = a.offsetWidth;
				if ($[0].offsetWidth < w) {
					S = "sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimSmall";
				}
			}
			a.className = S;
			$.attr('aria-busy', true);
			return q(e);
		};
		B.animateIE9 = {
			start: function () {},
			stop: function () {}
		};
		return B;
	}, true);
	sap.ui.predefine('sap/ui/core/Component', ['jquery.sap.global', 'sap/ui/base/ManagedObject', './Manifest', './ComponentMetadata', './Core', 'sap/ui/thirdparty/URI', 'jquery.sap.trace'], function (q, M, a, C, b, U) {
		"use strict";

		function c(u) {
			['sap-client', 'sap-server'].forEach(function (n) {
				if (!u.hasSearch(n)) {
					var v = sap.ui.getCore().getConfiguration().getSAPParam(n);
					if (v) {
						u.addSearch(n, v);
					}
				}
			});
		}

		function d(D, m, s, S) {
			if (s) {
				for (var n in D) {
					if (!m[n] && s[n] && s[n].uri) {
						m[n] = S;
					}
				}
			}
		}

		function g(m, o, K, e) {
			var D = o.getEntry(K);
			if (D !== undefined && !q.isPlainObject(D)) {
				return D;
			}
			var p, P;
			if (e && (p = m.getParent()) instanceof C) {
				P = p.getManifestEntry(K, e);
			}
			if (P || D) {
				D = q.extend(true, {}, P, D);
			}
			return D;
		}

		function f(o, e) {
			var i = Object.create(Object.getPrototypeOf(o));
			i._oMetadata = o;
			i._oManifest = e;
			for (var m in o) {
				if (!/^(getManifest|getManifestObject|getManifestEntry|getMetadataVersion)$/.test(m) && typeof o[m] === "function") {
					i[m] = o[m].bind(o);
				}
			}
			i.getManifest = function () {
				return e && e.getJson();
			};
			i.getManifestObject = function () {
				return e;
			};
			i.getManifestEntry = function (K, n) {
				return g(o, e, K, n);
			};
			i.getMetadataVersion = function () {
				return 2;
			};
			return i;
		}

		function r(e, o, t) {
			var i = M._sOwnerId;
			try {
				M._sOwnerId = o;
				return e.call(t);
			} finally {
				M._sOwnerId = i;
			}
		}
		var h = M.extend("sap.ui.core.Component", {
			constructor: function (i, s) {
				var e = Array.prototype.slice.call(arguments);
				if (typeof i !== "string") {
					s = i;
					i = undefined;
				}
				if (s && typeof s._metadataProxy === "object") {
					this._oMetadataProxy = s._metadataProxy;
					this._oManifest = s._metadataProxy._oManifest;
					delete s._metadataProxy;
					this.getMetadata = function () {
						return this._oMetadataProxy;
					};
				}
				if (s && typeof s._cacheTokens === "object") {
					this._mCacheTokens = s._cacheTokens;
					delete s._cacheTokens;
				}
				if (s && typeof s._manifestModels === "object") {
					this._mManifestModels = s._manifestModels;
					delete s._manifestModels;
				} else {
					this._mManifestModels = {};
				}
				this._mServices = {};
				M.apply(this, e);
			},
			metadata: {
				stereotype: "component",
				"abstract": true,
				specialSettings: {
					componentData: 'any'
				},
				version: "0.0",
				includes: [],
				dependencies: {
					libs: [],
					components: [],
					ui5version: ""
				},
				config: {},
				customizing: {},
				library: "sap.ui.core"
			}
		}, C);
		h.prototype.getManifest = function () {
			if (!this._oManifest) {
				return this.getMetadata().getManifest();
			} else {
				return this._oManifest.getJson();
			}
		};
		h.prototype.getManifestEntry = function (K) {
			return this._getManifestEntry(K);
		};
		h.prototype._getManifestEntry = function (K, m) {
			if (!this._oManifest) {
				return this.getMetadata().getManifestEntry(K, m);
			} else {
				return g(this.getMetadata(), this._oManifest, K, m);
			}
		};
		h.prototype.getManifestObject = function () {
			if (!this._oManifest) {
				return this.getMetadata().getManifestObject();
			} else {
				return this._oManifest;
			}
		};
		h.prototype._isVariant = function () {
			if (this._oManifest) {
				var m = this._oMetadataProxy._oMetadata.getManifestEntry("/sap.app/id");
				return m !== this.getManifestEntry("/sap.app/id");
			} else {
				return false;
			}
		};
		h.activateCustomizing = function (s) {};
		h.deactivateCustomizing = function (s) {};
		h.getOwnerIdFor = function (o) {
			var O = (o instanceof M) && o._sOwnerId;
			return O || undefined;
		};
		h.getOwnerComponentFor = function (o) {
			var O = h.getOwnerIdFor(o);
			return O && sap.ui.component(O);
		};
		h.prototype.runAsOwner = function (e) {
			return r(e, this.getId());
		};
		h.prototype.getInterface = function () {
			return this;
		};
		h.prototype._initCompositeSupport = function (s) {
			this.oComponentData = s && s.componentData;
			if (!this._isVariant()) {
				this.getMetadata().init();
			} else {
				this._oManifest.init(this);
			}
			this.initComponentModels();
			if (this.onWindowError) {
				this._fnWindowErrorHandler = q.proxy(function (e) {
					var E = e.originalEvent;
					this.onWindowError(E.message, E.filename, E.lineno);
				}, this);
				q(window).bind("error", this._fnWindowErrorHandler);
			}
			if (this.onWindowBeforeUnload) {
				this._fnWindowBeforeUnloadHandler = q.proxy(this.onWindowBeforeUnload, this);
				q(window).bind("beforeunload", this._fnWindowBeforeUnloadHandler);
			}
			if (this.onWindowUnload) {
				this._fnWindowUnloadHandler = q.proxy(this.onWindowUnload, this);
				q(window).bind("unload", this._fnWindowUnloadHandler);
			}
		};
		h.prototype.destroy = function () {
			for (var L in this._mServices) {
				if (this._mServices[L].instance) {
					this._mServices[L].instance.destroy();
				}
			}
			delete this._mServices;
			for (var m in this._mManifestModels) {
				this._mManifestModels[m].destroy();
			}
			delete this._mManifestModels;
			if (this._fnWindowErrorHandler) {
				q(window).unbind("error", this._fnWindowErrorHandler);
				delete this._fnWindowErrorHandler;
			}
			if (this._fnWindowBeforeUnloadHandler) {
				q(window).unbind("beforeunload", this._fnWindowBeforeUnloadHandler);
				delete this._fnWindowBeforeUnloadHandler;
			}
			if (this._fnWindowUnloadHandler) {
				q(window).unbind("unload", this._fnWindowUnloadHandler);
				delete this._fnWindowUnloadHandler;
			}
			if (this._oEventBus) {
				this._oEventBus.destroy();
				delete this._oEventBus;
			}
			M.prototype.destroy.apply(this, arguments);
			sap.ui.getCore().getMessageManager().unregisterObject(this);
			if (!this._isVariant()) {
				this.getMetadata().exit();
			} else {
				this._oManifest.exit(this);
			}
		};
		h.prototype.getComponentData = function () {
			return this.oComponentData;
		};
		h.prototype.getEventBus = function () {
			if (!this._oEventBus) {
				var E = sap.ui.requireSync("sap/ui/core/EventBus");
				this._oEventBus = new E();
			}
			return this._oEventBus;
		};
		h.prototype.initComponentModels = function () {
			var m = this.getMetadata();
			if (m.isBaseClass()) {
				return;
			}
			var o = this._getManifestEntry("/sap.app/dataSources", true) || {};
			var e = this._getManifestEntry("/sap.ui5/models", true) || {};
			this._initComponentModels(e, o);
		};
		h.prototype._initComponentModels = function (m, D) {
			var A = h._createManifestModelConfigurations({
				models: m,
				dataSources: D,
				component: this,
				mergeParent: true,
				cacheTokens: this._mCacheTokens
			});
			if (!A) {
				return;
			}
			var e = {};
			for (var s in A) {
				if (!this._mManifestModels[s]) {
					e[s] = A[s];
				}
			}
			var i = h._createManifestModels(e, this.toString());
			for (var s in i) {
				this._mManifestModels[s] = i[s];
			}
			for (var s in this._mManifestModels) {
				var o = this._mManifestModels[s];
				this.setModel(o, s || undefined);
			}
		};
		h.prototype.getService = function (L) {
			if (!this._mServices[L]) {
				this._mServices[L] = {};
				this._mServices[L].promise = new Promise(function (R, e) {
					sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"], function (S) {
						var s = this.getManifestEntry("/sap.ui5/services/" + L);
						var i = s.factoryName;
						if (!i) {
							e(new Error("Service " + L + " not declared!"));
							return;
						}
						var o = S.get(i);
						if (o) {
							o.createInstance({
								scopeObject: this,
								scopeType: "component",
								settings: s.settings || {}
							}).then(function (m) {
								if (!this.bIsDestroyed) {
									this._mServices[L].instance = m;
									this._mServices[L].interface = m.getInterface();
									R(this._mServices[L].interface);
								} else {
									e(new Error("Service " + L + " could not be loaded as its Component was destroyed."));
								}
							}.bind(this)).catch(e);
						} else {
							var E = "The ServiceFactory " + i + " for Service " + L + " not found in ServiceFactoryRegistry!";
							var O = this.getManifestEntry("/sap.ui5/services/" + L + "/optional");
							if (!O) {
								q.sap.log.error(E);
							}
							e(new Error(E));
						}
					}.bind(this));
				}.bind(this));
			}
			return this._mServices[L].promise;
		};

		function j(o) {
			var s = o.getManifestEntry("/sap.ui5/services");
			for (var S in s) {
				if (s[S].lazy === false) {
					o.getService(S);
				}
			}
		}
		h.prototype.createComponent = function (u) {
			var m = {
				async: true
			};
			if (u && typeof u === "object") {
				m.usage = u.usage;
				["id", "async", "settings", "componentData"].forEach(function (n) {
					if (u[n] !== undefined) {
						m[n] = u[n];
					}
				});
			} else if (typeof u === "string") {
				m.usage = u;
			}
			return this._createComponent(m);
		};
		h.prototype._createComponent = function (m) {
			if (m && m.usage) {
				var u = m.usage;
				var e = this.getManifestEntry("/sap.ui5/componentUsages/" + u);
				if (!e) {
					throw new Error("Component usage \"" + u + "\" not declared in Component \"" + this.getManifestObject().getComponentName() + "\"!");
				}
				m = q.extend(true, e, m);
			}
			return this.runAsOwner(function () {
				return sap.ui.component(m);
			});
		};
		h._createManifestModelConfigurations = function (o) {
			var e = o.component;
			var m = o.manifest || e.getManifestObject();
			var n = o.mergeParent;
			var p = o.cacheTokens || {};
			var L = e ? e.toString() : m.getComponentName();
			var s = sap.ui.getCore().getConfiguration();
			if (!o.models) {
				return null;
			}
			var t = {
				models: o.models,
				dataSources: o.dataSources || {},
				origin: {
					dataSources: {},
					models: {}
				}
			};
			if (e && n) {
				var u = e.getMetadata();
				while (u instanceof C) {
					var v = u.getManifestObject();
					var w = u.getManifestEntry("/sap.app/dataSources");
					d(t.dataSources, t.origin.dataSources, w, v);
					var x = u.getManifestEntry("/sap.ui5/models");
					d(t.models, t.origin.models, x, v);
					u = u.getParent();
				}
			}
			var y = {};
			for (var z in t.models) {
				var A = t.models[z];
				var I = false;
				var B = null;
				if (typeof A === 'string') {
					A = {
						dataSource: A
					};
				}
				if (A.dataSource) {
					var D = t.dataSources && t.dataSources[A.dataSource];
					if (typeof D === 'object') {
						if (D.type === undefined) {
							D.type = 'OData';
						}
						if (!A.type) {
							switch (D.type) {
								case 'OData':
									if (D.settings && D.settings.odataVersion === "4.0") {
										A.type = 'sap.ui.model.odata.v4.ODataModel';
									} else {
										A.type = 'sap.ui.model.odata.v2.ODataModel';
									}
									break;
								case 'JSON':
									A.type = 'sap.ui.model.json.JSONModel';
									break;
								case 'XML':
									A.type = 'sap.ui.model.xml.XMLModel';
									break;
								default:
							}
						}
						if (A.type === 'sap.ui.model.odata.v4.ODataModel' && D.settings && D.settings.odataVersion) {
							A.settings = A.settings || {};
							A.settings.odataVersion = D.settings.odataVersion;
						}
						if (!A.uri) {
							A.uri = D.uri;
							I = true;
						}
						if (D.type === 'OData' && D.settings && typeof D.settings.maxAge === "number") {
							A.settings = A.settings || {};
							A.settings.headers = A.settings.headers || {};
							A.settings.headers["Cache-Control"] = "max-age=" + D.settings.maxAge;
						}
						if (D.type === 'OData' && D.settings && D.settings.annotations) {
							var E = D.settings.annotations;
							for (var i = 0; i < E.length; i++) {
								var F = t.dataSources[E[i]];
								if (!F) {
									q.sap.log.error("Component Manifest: ODataAnnotation \"" + E[i] + "\" for dataSource \"" + A.dataSource + "\" could not be found in manifest", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
									continue;
								}
								if (F.type !== 'ODataAnnotation') {
									q.sap.log.error("Component Manifest: dataSource \"" + E[i] + "\" was expected to have type \"ODataAnnotation\" but was \"" + F.type + "\"", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
									continue;
								}
								if (!F.uri) {
									q.sap.log.error("Component Manifest: Missing \"uri\" for ODataAnnotation \"" + E[i] + "\"", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
									continue;
								}
								var G = new U(F.uri);
								if (A.type === 'sap.ui.model.odata.v2.ODataModel') {
									["sap-language", "sap-client"].forEach(function (Y) {
										if (!G.hasQuery(Y) && s.getSAPParam(Y)) {
											G.setQuery(Y, s.getSAPParam(Y));
										}
									});
									var H = p.dataSources && p.dataSources[F.uri];
									if (H) {
										var J = function () {
											if (!G.hasQuery("sap-language")) {
												q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for ODataAnnotation \"" + E[i] + "\" (" + G.toString() + "). " + "Missing \"sap-language\" URI parameter", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
												return;
											}
											if (!G.hasQuery("sap-client")) {
												q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for ODataAnnotation \"" + E[i] + "\" (" + G.toString() + "). " + "Missing \"sap-client\" URI parameter", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
												return;
											}
											if (!G.hasQuery("sap-client", s.getSAPParam("sap-client"))) {
												q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for ODataAnnotation \"" + E[i] + "\" (" + G.toString() + "). " + "URI parameter \"sap-client=" + G.query(true)["sap-client"] + "\" must be identical with configuration \"sap-client=" + s.getSAPParam("sap-client") + "\"", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
												return;
											}
											if (G.hasQuery("sap-context-token") && !G.hasQuery("sap-context-token", H)) {
												var Y = G.query(true)["sap-context-token"];
												q.sap.log.warning("Component Manifest: Overriding existing \"sap-context-token=" + Y + "\" with provided value \"" + H + "\" for ODataAnnotation \"" + E[i] + "\" (" + G.toString() + ").", "[\"sap.app\"][\"dataSources\"][\"" + E[i] + "\"]", L);
											}
											G.setQuery("sap-context-token", H);
										};
										J();
									}
								}
								var K = t.origin.dataSources[E[i]] || m;
								var N = K.resolveUri(G).toString();
								A.settings = A.settings || {};
								A.settings.annotationURI = A.settings.annotationURI || [];
								A.settings.annotationURI.push(N);
							}
						}
					} else {
						q.sap.log.error("Component Manifest: dataSource \"" + A.dataSource + "\" for model \"" + z + "\" not found or invalid", "[\"sap.app\"][\"dataSources\"][\"" + A.dataSource + "\"]", L);
					}
				}
				if (!A.type) {
					q.sap.log.error("Component Manifest: Missing \"type\" for model \"" + z + "\"", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
					continue;
				}
				if (A.type === 'sap.ui.model.odata.ODataModel' && (!A.settings || A.settings.json === undefined)) {
					A.settings = A.settings || {};
					A.settings.json = true;
				}
				if (A.uri) {
					var O = new U(A.uri);
					var P = (I ? t.origin.dataSources[A.dataSource] : t.origin.models[z]) || m;
					O = P.resolveUri(O);
					if (A.dataSource) {
						c(O);
						if (A.type === 'sap.ui.model.odata.v2.ODataModel') {
							B = A.settings && A.settings.metadataUrlParams;
							if ((!B || typeof B['sap-language'] === 'undefined') && !O.hasQuery('sap-language') && s.getSAPParam('sap-language')) {
								A.settings = A.settings || {};
								B = A.settings.metadataUrlParams = A.settings.metadataUrlParams || {};
								B['sap-language'] = s.getSAPParam('sap-language');
							}
							if (p.dataSources) {
								var H = p.dataSources[D.uri];
								if (H) {
									var Q = function () {
										if (O.hasQuery("sap-context-token")) {
											q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for model \"" + z + "\" (" + O.toString() + "). " + "Model URI already contains parameter \"sap-context-token=" + O.query(true)["sap-context-token"] + "\"", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
											return;
										}
										if ((!B || typeof B["sap-language"] === "undefined") && !O.hasQuery("sap-language")) {
											q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for model \"" + z + "\" (" + O.toString() + "). " + "Missing \"sap-language\" parameter", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
											return;
										}
										if (!O.hasQuery("sap-client")) {
											q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for model \"" + z + "\" (" + O.toString() + "). " + "Missing \"sap-client\" parameter", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
											return;
										}
										if (!O.hasQuery("sap-client", s.getSAPParam("sap-client"))) {
											q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for model \"" + z + "\" (" + O.toString() + "). " + "URI parameter \"sap-client=" + O.query(true)["sap-client"] + "\" must be identical with configuration \"sap-client=" + s.getSAPParam("sap-client") + "\"", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
											return;
										}
										if (B && typeof B["sap-client"] !== "undefined") {
											if (B["sap-client"] !== s.getSAPParam("sap-client")) {
												q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token=" + H + "\" for model \"" + z + "\" (" + O.toString() + "). " + "Parameter metadataUrlParams[\"sap-client\"] = \"" + B["sap-client"] + "\" must be identical with configuration \"sap-client=" + s.getSAPParam("sap-client") + "\"", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
												return;
											}
										}
										if (B && B["sap-context-token"] && B["sap-context-token"] !== H) {
											q.sap.log.warning("Component Manifest: Overriding existing \"sap-context-token=" + B["sap-context-token"] + "\" with provided value \"" + H + "\" for model \"" + z + "\" (" + O.toString() + ").", "[\"sap.ui5\"][\"models\"][\"" + z + "\"]", L);
										}
										if (!B) {
											A.settings = A.settings || {};
											B = A.settings.metadataUrlParams = A.settings.metadataUrlParams || {};
										}
										B["sap-context-token"] = H;
									};
									Q();
								}
							}
						}
					}
					A.uri = O.toString();
				}
				if (A.uriSettingName === undefined) {
					switch (A.type) {
						case 'sap.ui.model.odata.ODataModel':
						case 'sap.ui.model.odata.v2.ODataModel':
						case 'sap.ui.model.odata.v4.ODataModel':
							A.uriSettingName = 'serviceUrl';
							break;
						case 'sap.ui.model.resource.ResourceModel':
							A.uriSettingName = 'bundleUrl';
							break;
						default:
					}
				}
				var S;
				var R;
				if (e) {
					R = e.getComponentData();
				} else {
					R = o.componentData;
				}
				S = R && R.startupParameters && R.startupParameters["sap-system"];
				if (!S) {
					S = s.getSAPParam("sap-system");
				}
				var T = false;
				var V;
				if (S && ["sap.ui.model.odata.ODataModel", "sap.ui.model.odata.v2.ODataModel"].indexOf(A.type) != -1) {
					T = true;
					V = sap.ui.requireSync("sap/ui/model/odata/ODataUtils");
				}
				if (A.uri) {
					if (T) {
						A.preOriginBaseUri = A.uri.split("?")[0];
						A.uri = V.setOrigin(A.uri, {
							alias: S
						});
						A.postOriginBaseUri = A.uri.split("?")[0];
					}
					if (A.uriSettingName !== undefined) {
						A.settings = A.settings || {};
						if (!A.settings[A.uriSettingName]) {
							A.settings[A.uriSettingName] = A.uri;
						}
					} else if (A.settings) {
						A.settings = [A.uri, A.settings];
					} else {
						A.settings = [A.uri];
					}
				} else {
					if (T && A.uriSettingName !== undefined && A.settings && A.settings[A.uriSettingName]) {
						A.preOriginBaseUri = A.settings[A.uriSettingName].split("?")[0];
						A.settings[A.uriSettingName] = V.setOrigin(A.settings[A.uriSettingName], {
							alias: S
						});
						A.postOriginUri = A.settings[A.uriSettingName].split("?")[0];
					}
				}
				if (T && A.settings && A.settings.annotationURI) {
					var W = [].concat(A.settings.annotationURI);
					var X = [];
					for (var i = 0; i < W.length; i++) {
						X.push(V.setAnnotationOrigin(W[i], {
							alias: S,
							preOriginBaseUri: A.preOriginBaseUri,
							postOriginBaseUri: A.postOriginBaseUri
						}));
					}
					A.settings.annotationURI = X;
				}
				if (A.settings && !Array.isArray(A.settings)) {
					A.settings = [A.settings];
				}
				y[z] = A;
			}
			return y;
		};
		h._createManifestModels = function (m, L) {
			var e = {};
			for (var s in m) {
				var o = m[s];
				try {
					q.sap.require(o.type);
				} catch (E) {
					q.sap.log.error("Component Manifest: Class \"" + o.type + "\" for model \"" + s + "\" could not be loaded. " + E, "[\"sap.ui5\"][\"models\"][\"" + s + "\"]", L);
					continue;
				}
				var i = q.sap.getObject(o.type);
				if (!i) {
					q.sap.log.error("Component Manifest: Class \"" + o.type + "\" for model \"" + s + "\" could not be found", "[\"sap.ui5\"][\"models\"][\"" + s + "\"]", L);
					continue;
				}
				var A = [null].concat(o.settings || []);
				var F = i.bind.apply(i, A);
				var n = new F();
				e[s] = n;
			}
			return e;
		};

		function k(m, o, e) {
			var i = {
				afterManifest: {},
				afterPreload: {}
			};
			var n = q.extend(true, {}, m.getEntry("/sap.app/dataSources"));
			var p = q.extend(true, {}, m.getEntry("/sap.ui5/models"));
			var A = h._createManifestModelConfigurations({
				models: p,
				dataSources: n,
				manifest: m,
				componentData: o,
				cacheTokens: e
			});
			var P = q.sap.getUriParameters().get("sap-ui-xx-preload-component-models-" + m.getComponentName());
			var s = P && P.split(",");
			for (var t in A) {
				var u = A[t];
				if (!u.preload && s && s.indexOf(t) > -1) {
					u.preload = true;
					q.sap.log.warning("FOR TESTING ONLY!!! Activating preload for model \"" + t + "\" (" + u.type + ")", m.getComponentName(), "sap.ui.core.Component");
				}
				if (u.type === "sap.ui.model.resource.ResourceModel" && Array.isArray(u.settings) && u.settings.length > 0 && u.settings[0].async !== true) {
					i.afterPreload[t] = u;
				} else if (u.preload) {
					if (q.sap.isDeclared(u.type, true)) {
						i.afterManifest[t] = u;
					} else {
						q.sap.log.warning("Can not preload model \"" + t + "\" as required class has not been loaded: \"" + u.type + "\"", m.getComponentName(), "sap.ui.core.Component");
					}
				}
			}
			return i;
		}
		h._fnLoadComponentCallback = null;
		h._fnOnInstanceCreated = null;
		sap.ui.component = function (v) {
			if (!v) {
				throw new Error("sap.ui.component cannot be called without parameter!");
			}
			if (typeof v === 'string') {
				return sap.ui.getCore().getComponent(v);
			}

			function e(o) {
				var n = v.name,
					I = v.id,
					m = v.componentData,
					p = n + '.Component',
					S = v.settings;
				var t = new o(q.extend({}, S, {
					id: I,
					componentData: m,
					_cacheTokens: v.asyncHints && v.asyncHints.cacheTokens
				}));
				q.sap.log.info("Component instance Id = " + t.getId());
				var H = t.getMetadata().handleValidation() !== undefined || v.handleValidation;
				if (H) {
					if (t.getMetadata().handleValidation() !== undefined) {
						H = t.getMetadata().handleValidation();
					} else {
						H = v.handleValidation;
					}
					sap.ui.getCore().getMessageManager().registerObject(t, H);
				}
				j(t);
				if (typeof h._fnOnInstanceCreated === "function") {
					var P = h._fnOnInstanceCreated(t, v);
					if (v.async && P instanceof Promise) {
						return P.then(function () {
							return t;
						});
					}
				}
				return t;
			}
			var i = l(v, {
				failOnError: true,
				createModels: true,
				waitFor: v.asyncHints && v.asyncHints.waitFor
			});
			if (v.async) {
				var s = M._sOwnerId;
				return i.then(function (o) {
					return r(function () {
						return e(o);
					}, s);
				});
			} else {
				return e(i);
			}
		};
		sap.ui.component.load = function (o, F) {
			return l(o, {
				failOnError: F,
				preloadOnly: o.asyncHints && o.asyncHints.preloadOnly
			});
		};

		function l(o, O) {
			var n = o.name,
				u = o.url,
				m = sap.ui.getCore().getConfiguration(),
				p = /^(sync|async)$/.test(m.getComponentPreload()),
				s = o.manifest,
				t, w, x, y, z, A;

			function B(R) {
				var x = new a(JSON.parse(JSON.stringify(R)));
				return o.async ? Promise.resolve(x) : x;
			}
			if (s === undefined) {
				t = o.manifestFirst === undefined ? m.getManifestFirst() : !!o.manifestFirst;
				w = o.manifestUrl;
			} else {
				if (o.async === undefined) {
					o.async = true;
				}
				t = !!s;
				w = s && typeof s === 'string' ? s : undefined;
				x = s && typeof s === 'object' ? B(s) : undefined;
			}
			q.sap.interaction.setStepComponent(n);
			if (!x && w) {
				x = a.load({
					manifestUrl: w,
					componentName: n,
					async: o.async
				});
			}
			if (x && !o.async) {
				n = x.getComponentName();
			}
			if (!(x && o.async)) {
				if (!n) {
					throw new Error("The name of the component is undefined.");
				}
			}
			if (n && u) {
				q.sap.registerModulePath(n, u);
			}
			if (t && !x) {
				x = a.load({
					manifestUrl: q.sap.getModulePath(n) + "/manifest.json",
					componentName: n,
					async: o.async,
					failOnError: false
				});
			}

			function D() {
				return q.sap.getResourceName(n + ".Component", "");
			}

			function E(e) {
				var i = n + '.Component';
				if (!e) {
					var v = "The specified component controller '" + i + "' could not be found!";
					if (O.failOnError) {
						throw new Error(v);
					} else {
						q.sap.log.warning(v);
					}
				}
				if (x) {
					var R = f(e.getMetadata(), x);
					var S = function () {
						var T = Array.prototype.slice.call(arguments);
						var V;
						if (T.length === 0 || typeof T[0] === "object") {
							V = T[0] = T[0] || {};
						} else if (typeof T[0] === "string") {
							V = T[1] = T[1] || {};
						}
						V._metadataProxy = R;
						if (y) {
							V._manifestModels = y;
						}
						var W = Object.create(e.prototype);
						e.apply(W, T);
						return W;
					};
					S.getMetadata = function () {
						return R;
					};
					S.extend = function () {
						throw new Error("Extending Components created by Manifest is not supported!");
					};
					return S;
				} else {
					return e;
				}
			}

			function F(v, i) {
				if (typeof v === 'object') {
					if (v.url) {
						q.sap.registerModulePath(v.name, v.url);
					}
					return (v.lazy && i !== true) ? undefined : v.name;
				}
				return v;
			}

			function G(i, v) {
				var R = i + '.Component',
					S;
				if (p && i != null && !q.sap.isDeclared(R, true)) {
					if (v) {
						S = q.sap.getResourceName(R, '-preload.js');
						return q.sap._loadJSResourceAsync(S, true);
					}
					try {
						S = R + '-preload';
						q.sap.require(S);
					} catch (e) {
						q.sap.log.warning("couldn't preload component from " + S + ": " + ((e && e.message) || e));
					}
				} else if (v) {
					return Promise.resolve();
				}
			}

			function H(e, x, i) {
				var v = [];
				var R = i ? function (Y) {
					v.push(Y);
				} : q.noop;
				x.defineResourceRoots();
				var S = x.getEntry("/sap.ui5/dependencies/libs");
				if (S) {
					var T = [];
					for (var V in S) {
						if (!S[V].lazy) {
							T.push(V);
						}
					}
					if (T.length > 0) {
						q.sap.log.info("Component \"" + e + "\" is loading libraries: \"" + T.join(", ") + "\"");
						R(sap.ui.getCore().loadLibraries(T, {
							async: i
						}));
					}
				}
				var W = x.getEntry("/sap.ui5/extends/component");
				if (W) {
					R(G(W, i));
				}
				var X = x.getEntry("/sap.ui5/dependencies/components");
				if (X) {
					for (var e in X) {
						if (!X[e].lazy) {
							R(G(e, i));
						}
					}
				}
				return i ? Promise.all(v) : undefined;
			}
			if (o.async) {
				var I = o.asyncHints || {},
					J = [],
					K = function (e) {
						e = e.then(function (v) {
							return {
								result: v,
								rejected: false
							};
						}, function (v) {
							return {
								result: v,
								rejected: true
							};
						});
						return e;
					},
					L = function (e) {
						if (e) {
							J.push(K(e));
						}
					},
					N = function ($) {
						return $;
					},
					P, Q;
				if (x && O.createModels) {
					L(x.then(function (x) {
						z = k(x, o.componentData, I.cacheTokens);
						return x;
					}).then(function (x) {
						if (Object.keys(z.afterManifest).length > 0) {
							y = h._createManifestModels(z.afterManifest, x.getComponentName());
						}
						return x;
					}));
				}
				P = [];
				if (Array.isArray(I.preloadBundles)) {
					I.preloadBundles.forEach(function (v) {
						P.push(q.sap._loadJSResourceAsync(F(v, true), true));
					});
				}
				if (Array.isArray(I.libs)) {
					Q = I.libs.map(F).filter(N);
					P.push(sap.ui.getCore().loadLibraries(Q, {
						preloadOnly: true
					}));
				}
				P = Promise.all(P);
				if (Q && !O.preloadOnly) {
					P = P.then(function () {
						return sap.ui.getCore().loadLibraries(Q);
					});
				}
				L(P);
				if (!x) {
					L(G(n, true));
				} else {
					L(x.then(function (x) {
						var e = x.getComponentName();
						if (u) {
							q.sap.registerModulePath(e, u);
						}
						return G(e, true).then(function () {
							if (!O.createModels) {
								return null;
							}
							var R = Object.keys(z.afterPreload);
							if (R.length === 0) {
								return null;
							}
							return new Promise(function (i) {
								sap.ui.require(["sap/ui/model/resource/ResourceModel"], function (v) {
									i(v);
								});
							}).then(function (i) {
								function v(S) {
									var T = z.afterPreload[S];
									if (Array.isArray(T.settings) && T.settings.length > 0) {
										var V = T.settings[0];
										return i.loadResourceBundle(V, true).then(function (W) {
											V.bundle = W;
										}, function (W) {
											q.sap.log.error("Component Manifest: Could not preload ResourceBundle for ResourceModel. " + "The model will be skipped here and tried to be created on Component initialization.", "[\"sap.ui5\"][\"models\"][\"" + S + "\"]", e);
											q.sap.log.error(W);
											delete z.afterPreload[S];
										});
									} else {
										return Promise.resolve();
									}
								}
								return Promise.all(R.map(v)).then(function () {
									if (Object.keys(z.afterPreload).length > 0) {
										var S = h._createManifestModels(z.afterPreload, x.getComponentName());
										if (!y) {
											y = {};
										}
										for (var T in S) {
											y[T] = S[T];
										}
									}
								});
							});
						});
					}));
					A = function (e) {
						if (typeof h._fnLoadComponentCallback === "function") {
							var i = q.extend(true, {}, o);
							var v = q.extend(true, {}, e);
							try {
								h._fnLoadComponentCallback(i, v);
							} catch (R) {
								q.sap.log.error("Callback for loading the component \"" + x.getComponentName() + "\" run into an error. The callback was skipped and the component loading resumed.", R, "sap.ui.core.Component");
							}
						}
					};
				}
				if (I.components) {
					q.each(I.components, function (i, v) {
						L(G(F(v), true));
					});
				}
				return Promise.all(J).then(function (v) {
					var R = [],
						e = false,
						i;
					e = v.some(function (S) {
						if (S && S.rejected) {
							i = S.result;
							return true;
						}
						R.push(S.result);
					});
					if (e) {
						return Promise.reject(i);
					}
					return R;
				}).then(function (v) {
					if (x && A) {
						x.then(A);
					}
					return v;
				}).then(function (v) {
					q.sap.log.debug("Component.load: all promises fulfilled, then " + v);
					if (x) {
						return x.then(function (e) {
							x = e;
							n = x.getComponentName();
							return H(n, x, true);
						});
					} else {
						return v;
					}
				}).then(function () {
					if (O.preloadOnly) {
						return true;
					}
					return new Promise(function (e, i) {
						sap.ui.require([D()], function (v) {
							e(E(v));
						});
					});
				}).then(function (e) {
					var i = O.waitFor;
					if (i) {
						var v = Array.isArray(i) ? i : [i];
						return Promise.all(v).then(function () {
							return e;
						});
					}
					return e;
				}).catch(function (e) {
					if (y) {
						for (var n in y) {
							var i = y[n];
							if (i && typeof i.destroy === "function") {
								i.destroy();
							}
						}
					}
					throw e;
				});
			}
			if (x) {
				H(n, x);
			}
			G(n);
			return E(sap.ui.requireSync(D()));
		}
		return h;
	});
	sap.ui.predefine('sap/ui/core/ComponentMetadata', ['jquery.sap.global', 'sap/ui/base/ManagedObjectMetadata', 'sap/ui/core/Manifest', 'sap/ui/thirdparty/URI', 'jquery.sap.resources'], function (q, M, b, U) {
		"use strict";
		var C = function (c, o) {
			M.apply(this, arguments);
		};
		C.prototype = Object.create(M.prototype);
		C.preprocessClassInfo = function (c) {
			if (c && typeof c.metadata === "string") {
				c.metadata = {
					_src: c.metadata
				};
			}
			return c;
		};
		C.prototype.applySettings = function (c) {
			var s = c.metadata;
			var n = this.getName(),
				p = n.replace(/\.\w+?$/, "");
			if (s._src) {
				if (s._src == "component.json") {
					q.sap.log.warning("Usage of declaration \"metadata: 'component.json'\" is deprecated (component " + n + "). Use \"metadata: 'json'\" instead.");
				} else if (s._src != "json") {
					throw new Error("Invalid metadata declaration for component " + n + ": \"" + s._src + "\"! Use \"metadata: 'json'\" to load metadata from component.json.");
				}
				var r = p.replace(/\./g, "/") + "/component.json";
				q.sap.log.info("The metadata of the component " + n + " is loaded from file " + r + ".");
				try {
					var R = q.sap.loadResource(r, {
						dataType: "json"
					});
					q.extend(s, R);
				} catch (e) {
					q.sap.log.error("Failed to load component metadata from \"" + r + "\" (component " + n + ")! Reason: " + e);
				}
			}
			M.prototype.applySettings.call(this, c);
			this._sComponentName = p;
			this._bInitialized = false;
			this._iInstanceCount = 0;
			var m = s["manifest"];
			if (m) {
				s.__metadataVersion = 2;
				if (typeof m === "string" && m === "json") {
					var r = p.replace(/\./g, "/") + "/manifest.json";
					q.sap.log.info("The manifest of the component " + n + " is loaded from file " + r + ".");
					try {
						var R = q.sap.loadResource(r, {
							dataType: "json"
						});
						m = R;
					} catch (e) {
						q.sap.log.error("Failed to load component manifest from \"" + r + "\" (component " + n + ")! Reason: " + e);
						m = {};
					}
				}
			} else {
				s.__metadataVersion = 1;
				m = {};
			}
			m["name"] = m["name"] || n;
			m["sap.app"] = m["sap.app"] || {
				"id": p
			};
			m["sap.ui5"] = m["sap.ui5"] || {};
			if (!this.isBaseClass()) {
				m["sap.ui5"]["extends"] = m["sap.ui5"]["extends"] || {};
			}
			this._convertLegacyMetadata(s, m);
			this._oStaticInfo = s;
			this._oManifest = new b(m, {
				componentName: this._sComponentName,
				baseUrl: q.sap.getModulePath(this._sComponentName) + "/",
				process: s.__metadataVersion === 2
			});
		};
		C.prototype.init = function () {
			if (this._iInstanceCount === 0) {
				var p = this.getParent();
				if (p instanceof C) {
					p.init();
				}
				this._oManifest.init();
				this._bInitialized = true;
			}
			this._iInstanceCount++;
		};
		C.prototype.exit = function () {
			var i = Math.max(this._iInstanceCount - 1, 0);
			if (i === 0) {
				this._oManifest.exit();
				var p = this.getParent();
				if (p instanceof C) {
					p.exit();
				}
				this._bInitialized = false;
			}
			this._iInstanceCount = i;
		};
		C.prototype.onInitComponent = function (i) {
			q.sap.log.error("The function ComponentMetadata#onInitComponent will be removed soon!");
		};
		C.prototype.onExitComponent = function (i) {
			q.sap.log.error("The function ComponentMetadata#onExitComponent will be removed soon!");
		};
		C.prototype.isBaseClass = function () {
			return /^sap\.ui\.core\.(UI)?Component$/.test(this.getName());
		};
		C.prototype.getMetadataVersion = function () {
			return this._oStaticInfo.__metadataVersion;
		};
		C.prototype.getManifestObject = function () {
			return this._oManifest;
		};
		C.prototype.getManifest = function () {
			if (this.getMetadataVersion() === 1) {
				return this._oManifest.getRawJson();
			}
			return this._oManifest.getJson();
		};
		C.prototype._getManifest = function () {
			q.sap.log.warning("ComponentMetadata#_getManifest: do not use deprecated functions anymore!");
			return this._oManifest.getJson();
		};
		C.prototype.getRawManifest = function () {
			return this._oManifest.getRawJson();
		};
		C.prototype._getRawManifest = function () {
			q.sap.log.warning("ComponentMetadata#_getRawManifest: do not use deprecated functions anymore!");
			return this._oManifest.getRawJson();
		};
		C.prototype.getManifestEntry = function (k, m) {
			var d = this._oManifest.getEntry(k);
			if (d !== undefined && !q.isPlainObject(d)) {
				return d;
			}
			var p, P;
			if (m && (p = this.getParent()) instanceof C) {
				P = p.getManifestEntry(k, m);
			}
			if (P || d) {
				d = q.extend(true, {}, P, d);
			}
			return d;
		};
		C.prototype.getCustomEntry = function (k, m) {
			if (!k || k.indexOf(".") <= 0) {
				q.sap.log.warning("Component Metadata entries with keys without namespace prefix can not be read via getCustomEntry. Key: " + k + ", Component: " + this.getName());
				return null;
			}
			var p, d = this._oStaticInfo[k] || {};
			if (!q.isPlainObject(d)) {
				q.sap.log.warning("Custom Component Metadata entry with key '" + k + "' must be an object. Component: " + this.getName());
				return null;
			}
			if (m && (p = this.getParent()) instanceof C) {
				return q.extend(true, {}, p.getCustomEntry(k, m), d);
			}
			return q.extend(true, {}, d);
		};
		C.prototype.getComponentName = function () {
			return this._sComponentName;
		};
		C.prototype.getDependencies = function () {
			if (!this._oLegacyDependencies) {
				var d = this.getManifestEntry("/sap.ui5/dependencies"),
					u = d && d.minUI5Version || null,
					l = d && d.libs || {},
					c = d && d.components || {};
				var L = {
					ui5version: u,
					libs: [],
					components: []
				};
				for (var s in l) {
					L.libs.push(s);
				}
				for (var a in c) {
					L.components.push(a);
				}
				this._oLegacyDependencies = L;
			}
			return this._oLegacyDependencies;
		};
		C.prototype.getIncludes = function () {
			if (!this._aLegacyIncludes) {
				var I = [],
					r = this.getManifestEntry("/sap.ui5/resources") || {},
					c = r && r.css || [],
					j = r && r.js || [];
				for (var i = 0, l = c.length; i < l; i++) {
					if (c[i] && c[i].uri) {
						I.push(c[i].uri);
					}
				}
				for (var i = 0, l = j.length; i < l; i++) {
					if (j[i] && j[i].uri) {
						I.push(j[i].uri);
					}
				}
				this._aLegacyIncludes = (I.length > 0) ? I : null;
			}
			return this._aLegacyIncludes;
		};
		C.prototype.getUI5Version = function () {
			return this.getManifestEntry("/sap.ui5/dependencies/minUI5Version");
		};
		C.prototype.getComponents = function () {
			return this.getDependencies().components;
		};
		C.prototype.getLibs = function () {
			return this.getDependencies().libs;
		};
		C.prototype.getVersion = function () {
			return this.getManifestEntry("/sap.app/applicationVersion/version");
		};
		C.prototype.getConfig = function (k, d) {
			var c = this.getManifestEntry("/sap.ui5/config", !d);
			if (!c) {
				return {};
			}
			if (!k) {
				return c;
			}
			return c.hasOwnProperty(k) ? c[k] : {};
		};
		C.prototype.getCustomizing = function (d) {
			return this.getManifestEntry("/sap.ui5/extends/extensions", !d);
		};
		C.prototype.getModels = function (d) {
			if (!this._oLegacyModels) {
				this._oLegacyModels = {};
				var D = this.getManifestEntry("/sap.ui5/models") || {};
				for (var s in D) {
					var o = D[s];
					this._oLegacyModels[s] = o.settings || {};
					this._oLegacyModels[s].type = o.type;
					this._oLegacyModels[s].uri = o.uri;
				}
			}
			var p, m = q.extend(true, {}, this._oLegacyModels);
			if (!d && (p = this.getParent()) instanceof C) {
				m = q.extend(true, {}, p.getModels(), m);
			}
			return m;
		};
		C.prototype.handleValidation = function () {
			return this.getManifestEntry("/sap.ui5/handleValidation");
		};
		C.prototype.getServices = function () {
			q.sap.log.warning("Usage of sap.ui.core.ComponentMetadata.protoype.getServices is deprecated!");
			return this._oStaticInfo.services || {};
		};
		C.prototype._convertLegacyMetadata = function (s, c) {
			var f = function (a, t) {
				var o = {};
				if (a) {
					for (var i = 0, l = a.length; i < l; i++) {
						var v = a[i];
						if (typeof v === "string") {
							o[v] = typeof t === "function" && t(v) || {};
						}
					}
				}
				return o;
			};
			var A = c["sap.app"];
			var u = c["sap.ui5"];
			for (var n in s) {
				var v = s[n];
				if (v !== undefined) {
					switch (n) {
						case "name":
							c[n] = c[n] || v;
							A["id"] = A["id"] || v;
							break;
						case "description":
						case "keywords":
							A[n] = A[n] || v;
							break;
						case "version":
							var d = A.applicationVersion = A.applicationVersion || {};
							d.version = d.version || v;
							break;
						case "config":
							u[n] = u[n] || v;
							break;
						case "customizing":
							var e = u["extends"] = u["extends"] || {};
							e.extensions = e.extensions || v;
							break;
						case "dependencies":
							if (!u[n]) {
								u[n] = {};
								u[n].minUI5Version = v.ui5version;
								u[n].libs = f(v.libs);
								u[n].components = f(v.components);
							}
							break;
						case "includes":
							if (!u["resources"]) {
								u["resources"] = {};
								if (v && v.length > 0) {
									for (var i = 0, l = v.length; i < l; i++) {
										var r = v[i];
										var m = r.match(/\.(css|js)$/i);
										if (m) {
											u["resources"][m[1]] = u["resources"][m[1]] || [];
											u["resources"][m[1]].push({
												"uri": r
											});
										}
									}
								}
							}
							break;
						case "handleValidation":
							if (u[n] === undefined) {
								u[n] = v;
							}
							break;
						case "models":
							if (!u["models"]) {
								var g = {};
								for (var h in v) {
									var D = v[h];
									var j = {};
									for (var k in D) {
										var p = D[k];
										switch (k) {
											case "type":
											case "uri":
												j[k] = p;
												break;
											default:
												j.settings = j.settings || {};
												j.settings[k] = p;
										}
									}
									g[h] = j;
								}
								u["models"] = g;
							}
							break;
					}
				}
			}
		};
		return C;
	}, true);
	sap.ui.predefine('sap/ui/core/Configuration', ['jquery.sap.global', '../Device', '../Global', '../base/Object', './Locale', 'sap/ui/thirdparty/URI', 'jquery.sap.script'], function (q, D, G, B, L, U) {
		"use strict";
		var C, a;
		var b = B.extend("sap.ui.core.Configuration", {
			constructor: function (o) {
				this._oCore = o;

				function j() {
					function e() {
						if (D.os.android) {
							var m = navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);
							if (m) {
								return m[1];
							}
						}
						return navigator.language;
					}
					return c((navigator.languages && navigator.languages[0]) || e() || navigator.userLanguage || navigator.browserLanguage) || new L("en");
				}
				var k = {
					"theme": {
						type: "string",
						defaultValue: "base"
					},
					"language": {
						type: "Locale",
						defaultValue: j()
					},
					"formatLocale": {
						type: "Locale",
						defaultValue: null
					},
					"calendarType": {
						type: "string",
						defaultValue: null
					},
					"accessibility": {
						type: "boolean",
						defaultValue: true
					},
					"autoAriaBodyRole": {
						type: "boolean",
						defaultValue: true,
						noUrl: true
					},
					"animation": {
						type: "boolean",
						defaultValue: true
					},
					"animationMode": {
						type: b.AnimationMode,
						defaultValue: undefined
					},
					"rtl": {
						type: "boolean",
						defaultValue: null
					},
					"debug": {
						type: "boolean",
						defaultValue: false
					},
					"inspect": {
						type: "boolean",
						defaultValue: false
					},
					"originInfo": {
						type: "boolean",
						defaultValue: false
					},
					"noConflict": {
						type: "boolean",
						defaultValue: false,
						noUrl: true
					},
					"noDuplicateIds": {
						type: "boolean",
						defaultValue: true
					},
					"trace": {
						type: "boolean",
						defaultValue: false,
						noUrl: true
					},
					"modules": {
						type: "string[]",
						defaultValue: [],
						noUrl: true
					},
					"areas": {
						type: "string[]",
						defaultValue: null,
						noUrl: true
					},
					"onInit": {
						type: "code",
						defaultValue: undefined,
						noUrl: true
					},
					"uidPrefix": {
						type: "string",
						defaultValue: "__",
						noUrl: true
					},
					"ignoreUrlParams": {
						type: "boolean",
						defaultValue: false,
						noUrl: true
					},
					"preload": {
						type: "string",
						defaultValue: "auto"
					},
					"rootComponent": {
						type: "string",
						defaultValue: "",
						noUrl: true
					},
					"preloadLibCss": {
						type: "string[]",
						defaultValue: []
					},
					"application": {
						type: "string",
						defaultValue: ""
					},
					"appCacheBuster": {
						type: "string[]",
						defaultValue: []
					},
					"bindingSyntax": {
						type: "string",
						defaultValue: "default",
						noUrl: true
					},
					"versionedLibCss": {
						type: "boolean",
						defaultValue: false
					},
					"manifestFirst": {
						type: "boolean",
						defaultValue: false
					},
					"whitelistService": {
						type: "string",
						defaultValue: null,
						noUrl: true
					},
					"frameOptions": {
						type: "string",
						defaultValue: "default",
						noUrl: true
					},
					"frameOptionsConfig": {
						type: "object",
						defaultValue: undefined,
						noUrl: true
					},
					"support": {
						type: "string[]",
						defaultValue: null
					},
					"xx-rootComponentNode": {
						type: "string",
						defaultValue: "",
						noUrl: true
					},
					"xx-appCacheBusterMode": {
						type: "string",
						defaultValue: "sync"
					},
					"xx-appCacheBusterHooks": {
						type: "object",
						defaultValue: undefined,
						noUrl: true
					},
					"xx-disableCustomizing": {
						type: "boolean",
						defaultValue: false,
						noUrl: true
					},
					"xx-loadAllMode": {
						type: "boolean",
						defaultValue: false,
						noUrl: true
					},
					"xx-viewCache": {
						type: "boolean",
						defaultValue: true
					},
					"xx-test-mobile": {
						type: "boolean",
						defaultValue: false
					},
					"xx-domPatching": {
						type: "boolean",
						defaultValue: false
					},
					"xx-libraryPreloadFiles": {
						type: "string[]",
						defaultValue: []
					},
					"xx-componentPreload": {
						type: "string",
						defaultValue: ""
					},
					"xx-designMode": {
						type: "boolean",
						defaultValue: false
					},
					"xx-supportedLanguages": {
						type: "string[]",
						defaultValue: []
					},
					"xx-bootTask": {
						type: "function",
						defaultValue: undefined,
						noUrl: true
					},
					"xx-suppressDeactivationOfControllerCode": {
						type: "boolean",
						defaultValue: false
					},
					"xx-lesssupport": {
						type: "boolean",
						defaultValue: false
					},
					"xx-handleValidation": {
						type: "boolean",
						defaultValue: false
					},
					"xx-fiori2Adaptation": {
						type: "string[]",
						defaultValue: []
					},
					"xx-cache-use": {
						type: "boolean",
						defaultValue: true
					},
					"xx-cache-excludedKeys": {
						type: "string[]",
						defaultValue: []
					},
					"xx-cache-serialization": {
						type: "boolean",
						defaultValue: false
					},
					"xx-nosync": {
						type: "string",
						defaultValue: ""
					},
					"xx-waitForTheme": {
						type: "boolean",
						defaultValue: false
					},
					"xx-xml-processing": {
						type: "string",
						defaultValue: ""
					},
					"statistics": {
						type: "boolean",
						defaultValue: false
					}
				};
				var l = {
					"xx-test": "1.15",
					"flexBoxPolyfill": "1.14",
					"sapMeTabContainer": "1.14",
					"sapMeProgessIndicator": "1.14",
					"sapMGrowingList": "1.14",
					"sapMListAsTable": "1.14",
					"sapMDialogWithPadding": "1.14",
					"sapCoreBindingSyntax": "1.24"
				};
				this.oFormatSettings = new b.FormatSettings(this);
				var p = this;

				function r(e, V) {
					if (typeof V === "undefined" || V === null) {
						return;
					}
					switch (k[e].type) {
						case "boolean":
							if (typeof V === "string") {
								if (k[e].defaultValue) {
									p[e] = V.toLowerCase() != "false";
								} else {
									p[e] = V.toLowerCase() === "true" || V.toLowerCase() === "x";
								}
							} else {
								p[e] = !!V;
							}
							break;
						case "string":
							p[e] = "" + V;
							break;
						case "code":
							p[e] = typeof V === "function" ? V : String(V);
							break;
						case "function":
							if (typeof V !== "function") {
								throw new Error("unsupported value");
							}
							p[e] = V;
							break;
						case "string[]":
							if (Array.isArray(V)) {
								p[e] = V;
							} else if (typeof V === "string") {
								p[e] = V.split(/[ ,;]/).map(function (s) {
									return s.trim();
								});
							} else {
								throw new Error("unsupported value");
							}
							break;
						case "object":
							if (typeof V !== "object") {
								throw new Error("unsupported value");
							}
							p[e] = V;
							break;
						case "Locale":
							var F = c(V);
							if (F || k[e].defaultValue == null) {
								p[e] = F;
							} else {
								throw new Error("unsupported value");
							}
							break;
						default:
							var v = k[e].type;
							if (typeof v === "object") {
								i(v, V, e);
								p[e] = V;
							} else {
								throw new Error("illegal state");
							}
					}
				}

				function u(H) {
					var m, s;
					try {
						m = new U(H, window.location.href).normalize();
						s = m.path();
						return s + (s.slice(-1) === '/' ? '' : '/') + "UI5/";
					} catch (e) {}
				}
				for (var n in k) {
					p[n] = k[n].defaultValue;
				}
				var w = window["sap-ui-config"] || {};
				w.oninit = w.oninit || w["evt-oninit"];
				for (var n in k) {
					if (w.hasOwnProperty(n.toLowerCase())) {
						r(n, w[n.toLowerCase()]);
					} else if (!/^xx-/.test(n) && w.hasOwnProperty("xx-" + n.toLowerCase())) {
						r(n, w["xx-" + n.toLowerCase()]);
					}
				}
				if (w.libs) {
					p.modules = w.libs.split(",").map(function (e) {
						return e.trim() + ".library";
					}).concat(p.modules);
				}
				var P = "compatversion";
				var x = w[P];
				var y = q.sap.Version("1.14");
				this._compatversion = {};

				function _(e) {
					var v = !e ? x || y.toString() : w[P + "-" + e.toLowerCase()] || x || l[e] || y.toString();
					v = q.sap.Version(v.toLowerCase() === "edge" ? G.version : v);
					return q.sap.Version(v.getMajor(), v.getMinor());
				}
				this._compatversion._default = _();
				for (var n in l) {
					this._compatversion[n] = _(n);
				}

				function z(s) {
					var m = document.querySelector("META[name='" + s + "']"),
						e = m && m.getAttribute("content");
					if (e) {
						return e;
					}
				}
				if (!p.ignoreUrlParams) {
					var A = "sap-ui-";
					var E = q.sap.getUriParameters();
					if (E.mParams['sap-language']) {
						var V = p.sapLogonLanguage = E.get('sap-language');
						var F = V && c(M[V.toUpperCase()] || V);
						if (F) {
							p.language = F;
						} else if (V && !E.get('sap-locale') && !E.get('sap-ui-language')) {
							q.sap.log.warning("sap-language '" + V + "' is not a valid BCP47 language tag and will only be used as SAP logon language");
						}
					}
					if (E.mParams['sap-locale']) {
						r("language", E.get('sap-locale'));
					}
					if (E.mParams['sap-rtl']) {
						var V = E.get('sap-rtl');
						if (V === "X" || V === "x") {
							r('rtl', true);
						} else {
							r('rtl', false);
						}
					}
					if (E.mParams['sap-theme']) {
						var V = E.get('sap-theme');
						if (V === "") {
							p['theme'] = k['theme'].defaultValue;
						} else {
							r('theme', V);
						}
					}
					if (E.mParams['sap-statistics']) {
						var V = E.get('sap-statistics');
						r('statistics', V);
					}
					for (var n in k) {
						if (k[n].noUrl) {
							continue;
						}
						var V = E.get(A + n);
						if (V == null && !/^xx-/.test(n)) {
							V = E.get(A + "xx-" + n);
						}
						if (V === "") {
							p[n] = k[n].defaultValue;
						} else {
							r(n, V);
						}
					}
					if (E.mParams['sap-ui-legacy-date-format']) {
						this.oFormatSettings.setLegacyDateFormat(E.get('sap-ui-legacy-date-format'));
					}
					if (E.mParams['sap-ui-legacy-time-format']) {
						this.oFormatSettings.setLegacyTimeFormat(E.get('sap-ui-legacy-time-format'));
					}
					if (E.mParams['sap-ui-legacy-number-format']) {
						this.oFormatSettings.setLegacyNumberFormat(E.get('sap-ui-legacy-number-format'));
					}
				}
				p.sapparams = p.sapparams || {};
				p.sapparams['sap-language'] = this.getSAPLogonLanguage();
				['sap-client', 'sap-server', 'sap-system'].forEach(function (s) {
					if (!p.ignoreUrlParams && E.get(s)) {
						p.sapparams[s] = E.get(s);
					} else {
						p.sapparams[s] = z(s);
					}
				});
				this.derivedRTL = L._impliesRTL(p.language);
				var T = p.theme;
				var H;
				var I = T.indexOf("@");
				if (I >= 0) {
					H = u(T.slice(I + 1));
					if (H) {
						p.theme = T.slice(0, I);
						p.themeRoot = H;
					} else {
						p.theme = (w.theme && w.theme !== T) ? w.theme : "base";
						I = -1;
					}
				}
				p.theme = this._normalizeTheme(p.theme, H);
				var J = p['languagesDeliveredWithCore'] = L._coreI18nLocales;
				var K = p['xx-supportedLanguages'];
				if (K.length === 0 || (K.length === 1 && K[0] === '*')) {
					K = [];
				} else if (K.length === 1 && K[0] === 'default') {
					K = J || [];
				}
				p['xx-supportedLanguages'] = K;
				var N = p['xx-fiori2Adaptation'];
				if (N.length === 0 || (N.length === 1 && N[0] === 'false')) {
					N = false;
				} else if (N.length === 1 && N[0] === 'true') {
					N = true;
				}
				p['xx-fiori2Adaptation'] = N;
				if (p["bindingSyntax"] === "default") {
					p["bindingSyntax"] = (p.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26") < 0) ? "simple" : "complex";
				}
				if (!p["whitelistService"]) {
					var O = z('sap.whitelistService');
					if (O) {
						p["whitelistService"] = O;
						if (p["frameOptions"] === "default") {
							p["frameOptions"] = "trusted";
						}
					}
				}
				if (p["frameOptions"] === "default" || (p["frameOptions"] !== "allow" && p["frameOptions"] !== "deny" && p["frameOptions"] !== "trusted")) {
					p["frameOptions"] = "allow";
				}
				var Q = p['preloadLibCss'];
				if (Q.length > 0) {
					Q.appManaged = Q[0].slice(0, 1) === "!";
					if (Q.appManaged) {
						Q[0] = Q[0].slice(1);
					}
					if (Q[0] === "*") {
						Q.shift();
						p.modules.forEach(function (e) {
							var m = e.match(/^(.*)\.library$/);
							if (m) {
								Q.unshift(m[1]);
							}
						});
					}
				}
				for (var n in k) {
					if (p[n] !== k[n].defaultValue) {
						q.sap.log.info("  " + n + " = " + p[n]);
					}
				}
				if (this.getAnimationMode() === undefined) {
					if (this.animation) {
						this.setAnimationMode(b.AnimationMode.full);
					} else {
						this.setAnimationMode(b.AnimationMode.minimal);
					}
				} else {
					this.setAnimationMode(this.getAnimationMode());
				}
			},
			getVersion: function () {
				if (this._version) {
					return this._version;
				}
				this._version = new q.sap.Version(G.version);
				return this._version;
			},
			getCompatibilityVersion: function (F) {
				if (typeof (F) === "string" && this._compatversion[F]) {
					return this._compatversion[F];
				}
				return this._compatversion._default;
			},
			getTheme: function () {
				return this.theme;
			},
			_setTheme: function (T) {
				this.theme = T;
				return this;
			},
			_normalizeTheme: function (T, s) {
				if (T && s == null && T.match(/^sap_corbu$/i)) {
					return "sap_goldreflection";
				}
				return T;
			},
			getLanguage: function () {
				return this.language.sLocaleId;
			},
			getLanguageTag: function () {
				return this.language.toString();
			},
			getSAPLogonLanguage: function () {
				return this.sapLogonLanguage || this.language.getSAPLogonLanguage();
			},
			setLanguage: function (l, s) {
				var o = c(l),
					O = this.getRTL(),
					m;
				h(o, "Configuration.setLanguage: sLanguage must be a valid BCP47 language tag");
				h(s == null || (typeof s === 'string' && /[A-Z0-9]{2,2}/i.test(s)), "Configuration.setLanguage: sSAPLogonLanguage must be null or be a string of length 2, consisting of digits and latin characters only", true);
				if (o.toString() != this.getLanguageTag() || s !== this.sapLogonLanguage) {
					this.language = o;
					this.sapLogonLanguage = s || undefined;
					this.sapparams['sap-language'] = this.getSAPLogonLanguage();
					m = this._collect();
					m.language = this.getLanguageTag();
					this.derivedRTL = L._impliesRTL(o);
					if (O != this.getRTL()) {
						m.rtl = this.getRTL();
					}
					this._endCollect();
				}
				return this;
			},
			getLocale: function () {
				return this.language;
			},
			getSAPParam: function (n) {
				return this.sapparams && this.sapparams[n];
			},
			getXMLProcessingMode: function () {
				return this["xx-xml-processing"];
			},
			setXMLProcessingMode: function (m) {
				this["xx-xml-processing"] = m;
				return this;
			},
			isUI5CacheOn: function () {
				return this["xx-cache-use"];
			},
			setUI5CacheOn: function (o) {
				this["xx-cache-use"] = o;
				return this;
			},
			isUI5CacheSerializationSupportOn: function () {
				return this["xx-cache-serialization"];
			},
			setUI5CacheSerializationSupport: function (o) {
				this["xx-cache-serialization"] = o;
				return this;
			},
			getUI5CacheExcludedKeys: function () {
				return this["xx-cache-excludedKeys"];
			},
			getCalendarType: function () {
				var n;
				if (!C) {
					G.getCore().loadLibrary('sap.ui.core');
					C = sap.ui.require("sap/ui/core/library").CalendarType;
				}
				if (!a) {
					a = sap.ui.requireSync("sap/ui/core/LocaleData");
				}
				if (this.calendarType) {
					for (n in C) {
						if (n.toLowerCase() === this.calendarType.toLowerCase()) {
							this.calendarType = n;
							return this.calendarType;
						}
					}
					q.sap.log.warning("Parameter 'calendarType' is set to " + this.calendarType + " which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale");
				}
				var l = this.oFormatSettings.getLegacyDateFormat();
				switch (l) {
					case "A":
					case "B":
						return C.Islamic;
					case "7":
					case "8":
					case "9":
						return C.Japanese;
				}
				return a.getInstance(this.getLocale()).getPreferredCalendarType();
			},
			setCalendarType: function (s) {
				var m;
				if (this.calendarType !== s) {
					m = this._collect();
					this.calendarType = m.calendarType = s;
					this._endCollect();
				}
				return this;
			},
			getFormatLocale: function () {
				return (this.formatLocale || this.language).toString();
			},
			setFormatLocale: function (F) {
				var o = c(F),
					m;
				h(F == null || typeof F === "string" && o, "sFormatLocale must be a BCP47 language tag or Java Locale id or null");
				if (t(o) !== t(this.formatLocale)) {
					this.formatLocale = o;
					m = this._collect();
					m.formatLocale = t(o);
					this._endCollect();
				}
				return this;
			},
			getLanguagesDeliveredWithCore: function () {
				return this["languagesDeliveredWithCore"];
			},
			getSupportedLanguages: function () {
				return this["xx-supportedLanguages"];
			},
			getAccessibility: function () {
				return this.accessibility;
			},
			getAutoAriaBodyRole: function () {
				return this.autoAriaBodyRole;
			},
			getAnimation: function () {
				return this.animation;
			},
			getAnimationMode: function () {
				return this.animationMode;
			},
			setAnimationMode: function (A) {
				i(b.AnimationMode, A, "animationMode");
				this.animation = (A !== b.AnimationMode.minimal && A !== b.AnimationMode.none);
				this.animationMode = A;
				if (this._oCore && this._oCore._setupAnimation) {
					this._oCore._setupAnimation();
				}
			},
			getRTL: function () {
				return this.rtl === null ? this.derivedRTL : this.rtl;
			},
			getFiori2Adaptation: function () {
				return this["xx-fiori2Adaptation"];
			},
			setRTL: function (r) {
				h(r === null || typeof r === "boolean", "bRTL must be null or a boolean");
				var o = this.getRTL(),
					m;
				this.rtl = r;
				if (o != this.getRTL()) {
					m = this._collect();
					m.rtl = this.getRTL();
					this._endCollect();
				}
				return this;
			},
			getDebug: function () {
				return this.debug;
			},
			getInspect: function () {
				return this.inspect;
			},
			getOriginInfo: function () {
				return this.originInfo;
			},
			getNoDuplicateIds: function () {
				return this.noDuplicateIds;
			},
			getTrace: function () {
				return this.trace;
			},
			getUIDPrefix: function () {
				return this.uidPrefix;
			},
			getDesignMode: function () {
				return this["xx-designMode"];
			},
			getSuppressDeactivationOfControllerCode: function () {
				return this["xx-suppressDeactivationOfControllerCode"];
			},
			getControllerCodeDeactivated: function () {
				return this.getDesignMode() && !this.getSuppressDeactivationOfControllerCode();
			},
			getApplication: function () {
				return this.application;
			},
			getRootComponent: function () {
				return this.rootComponent;
			},
			getAppCacheBuster: function () {
				return this.appCacheBuster;
			},
			getAppCacheBusterMode: function () {
				return this["xx-appCacheBusterMode"];
			},
			getAppCacheBusterHooks: function () {
				return this["xx-appCacheBusterHooks"];
			},
			getDisableCustomizing: function () {
				return this["xx-disableCustomizing"];
			},
			getViewCache: function () {
				return this["xx-viewCache"];
			},
			getDomPatching: function () {
				return this["xx-domPatching"];
			},
			getPreload: function () {
				return this.preload;
			},
			getManifestFirst: function () {
				return this.manifestFirst;
			},
			getComponentPreload: function () {
				return this['xx-componentPreload'] || this.preload;
			},
			getFormatSettings: function () {
				return this.oFormatSettings;
			},
			getFrameOptions: function () {
				return this.frameOptions;
			},
			getWhitelistService: function () {
				return this.whitelistService;
			},
			getSupportMode: function () {
				return this.support;
			},
			_collect: function () {
				var m = this.mChanges || (this.mChanges = {
					__count: 0
				});
				m.__count++;
				return m;
			},
			_endCollect: function () {
				var m = this.mChanges;
				if (m && (--m.__count) === 0) {
					delete m.__count;
					this._oCore && this._oCore.fireLocalizationChanged(m);
					delete this.mChanges;
				}
			},
			getStatistics: function () {
				var r = this.statistics;
				try {
					r = r || window.localStorage.getItem("sap-ui-statistics") == "X";
				} catch (e) {}
				return r;
			},
			getNoNativeScroll: function () {
				return false;
			},
			getHandleValidation: function () {
				return this["xx-handleValidation"];
			},
			applySettings: function (s) {
				function e(j, m) {
					var n, k;
					for (n in m) {
						k = "set" + n.slice(0, 1).toUpperCase() + n.slice(1);
						if (n === 'formatSettings' && j.oFormatSettings) {
							e(j.oFormatSettings, m[n]);
						} else if (typeof j[k] === 'function') {
							j[k](m[n]);
						} else {
							q.sap.log.warning("Configuration.applySettings: unknown setting '" + n + "' ignored");
						}
					}
				}
				this._collect();
				e(this, s);
				this._endCollect();
				return this;
			}
		});
		b.AnimationMode = {
			full: "full",
			basic: "basic",
			minimal: "minimal",
			none: "none"
		};

		function c(l) {
			try {
				if (l && typeof l === 'string') {
					return new L(l);
				}
			} catch (e) {}
		}

		function t(l) {
			return l ? l.toString() : null;
		}
		var M = {
			"ZH": "zh-Hans",
			"ZF": "zh-Hant",
			"1Q": "en-US-x-saptrc",
			"2Q": "en-US-x-sappsd"
		};
		var d = {
			"": {
				pattern: null
			},
			"1": {
				pattern: "dd.MM.yyyy"
			},
			"2": {
				pattern: "MM/dd/yyyy"
			},
			"3": {
				pattern: "MM-dd-yyyy"
			},
			"4": {
				pattern: "yyyy.MM.dd"
			},
			"5": {
				pattern: "yyyy/MM/dd"
			},
			"6": {
				pattern: "yyyy-MM-dd"
			},
			"7": {
				pattern: "Gyy.MM.dd"
			},
			"8": {
				pattern: "Gyy/MM/dd"
			},
			"9": {
				pattern: "Gyy-MM-dd"
			},
			"A": {
				pattern: "yyyy/MM/dd"
			},
			"B": {
				pattern: "yyyy/MM/dd"
			},
			"C": {
				pattern: "yyyy/MM/dd",
				ignore: true
			}
		};
		var f = {
			"": {
				"short": null,
				medium: null,
				dayPeriods: null
			},
			"0": {
				"short": "HH:mm",
				medium: "HH:mm:ss",
				dayPeriods: null
			},
			"1": {
				"short": "hh:mm a",
				medium: "hh:mm:ss a",
				dayPeriods: ["AM", "PM"]
			},
			"2": {
				"short": "hh:mm a",
				medium: "hh:mm:ss a",
				dayPeriods: ["am", "pm"]
			},
			"3": {
				"short": "KK:mm a",
				medium: "KK:mm:ss a",
				dayPeriods: ["AM", "PM"]
			},
			"4": {
				"short": "KK:mm a",
				medium: "KK:mm:ss a",
				dayPeriods: ["am", "pm"]
			}
		};
		var g = {
			"": {
				groupingSeparator: null,
				decimalSeparator: null
			},
			" ": {
				groupingSeparator: ".",
				decimalSeparator: ","
			},
			"X": {
				groupingSeparator: ",",
				decimalSeparator: "."
			},
			"Y": {
				groupingSeparator: " ",
				decimalSeparator: ","
			}
		};

		function h(e, m) {
			if (!e) {
				throw new Error(m);
			}
		}

		function i(e, v, p) {
			var V = [];
			for (var k in e) {
				if (e.hasOwnProperty(k)) {
					if (e[k] === v) {
						return;
					}
					V.push(e[k]);
				}
			}
			throw new Error("Unsupported Enumeration value for " + p + ", valid values are: " + V.join(", "));
		}
		B.extend("sap.ui.core.Configuration.FormatSettings", {
			constructor: function (o) {
				this.oConfiguration = o;
				this.mSettings = {};
				this.sLegacyDateFormat = undefined;
				this.sLegacyTimeFormat = undefined;
				this.sLegacyNumberFormatSymbolSet = undefined;
			},
			getFormatLocale: function () {
				function e(j) {
					var o = j.oConfiguration.language;
					if (!q.isEmptyObject(j.mSettings)) {
						var l = o.toString();
						if (l.indexOf("-x-") < 0) {
							l = l + "-x-sapufmt";
						} else if (l.indexOf("-sapufmt") <= l.indexOf("-x-")) {
							l = l + "-sapufmt";
						}
						o = new L(l);
					}
					return o;
				}
				return this.oConfiguration.formatLocale || e(this);
			},
			_set: function (k, v) {
				var o = this.mSettings[k];
				if (v != null) {
					this.mSettings[k] = v;
				} else {
					delete this.mSettings[k];
				}
				if ((o == null != v == null) || !q.sap.equal(o, v)) {
					var m = this.oConfiguration._collect();
					m[k] = v;
					this.oConfiguration._endCollect();
				}
			},
			getDatePattern: function (s) {
				return this.mSettings["dateFormats-" + s];
			},
			setDatePattern: function (s, p) {
				h(s == "short" || s == "medium" || s == "long" || s == "full", "sStyle must be short, medium, long or full");
				this._set("dateFormats-" + s, p);
				return this;
			},
			getTimePattern: function (s) {
				return this.mSettings["timeFormats-" + s];
			},
			setTimePattern: function (s, p) {
				h(s == "short" || s == "medium" || s == "long" || s == "full", "sStyle must be short, medium, long or full");
				this._set("timeFormats-" + s, p);
				return this;
			},
			getNumberSymbol: function (T) {
				return this.mSettings["symbols-latn-" + T];
			},
			setNumberSymbol: function (T, s) {
				h(T == "decimal" || T == "group" || T == "plusSign" || T == "minusSign", "sType must be decimal, group, plusSign or minusSign");
				this._set("symbols-latn-" + T, s);
				return this;
			},
			setFirstDayOfWeek: function (v) {
				h(typeof v == "number" && v >= 0 && v <= 6, "iValue must be an integer value between 0 and 6");
				this._set("weekData-firstDay", v);
				return this;
			},
			_setDayPeriods: function (w, T) {
				this._set("dayPeriods-format-" + w, T);
				return this;
			},
			getLegacyDateFormat: function () {
				return this.sLegacyDateFormat || undefined;
			},
			setLegacyDateFormat: function (F) {
				F = F ? String(F).toUpperCase() : "";
				h(!F || d.hasOwnProperty(F), "sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");
				if (d[F].ignore) {
					q.sap.log.warning("The ABAP date format '" + F + "' (" + d[F].pattern + ") is not supported yet. Falling back to locale specific date formats.");
					F = "";
				}
				var m = this.oConfiguration._collect();
				this.sLegacyDateFormat = m.legacyDateFormat = F;
				this.setDatePattern("short", d[F].pattern);
				this.setDatePattern("medium", d[F].pattern);
				this.oConfiguration._endCollect();
				return this;
			},
			getLegacyTimeFormat: function () {
				return this.sLegacyTimeFormat || undefined;
			},
			setLegacyTimeFormat: function (F) {
				h(!F || f.hasOwnProperty(F), "sFormatId must be one of ['0','1','2','3','4'] or empty");
				var m = this.oConfiguration._collect();
				this.sLegacyTimeFormat = m.legacyTimeFormat = F = F || "";
				this.setTimePattern("short", f[F]["short"]);
				this.setTimePattern("medium", f[F]["medium"]);
				this._setDayPeriods("abbreviated", f[F].dayPeriods);
				this.oConfiguration._endCollect();
				return this;
			},
			getLegacyNumberFormat: function () {
				return this.sLegacyNumberFormat || undefined;
			},
			setLegacyNumberFormat: function (F) {
				F = F ? F.toUpperCase() : "";
				h(!F || g.hasOwnProperty(F), "sFormatId must be one of [' ','X','Y'] or empty");
				var m = this.oConfiguration._collect();
				this.sLegacyNumberFormat = m.legacyNumberFormat = F;
				this.setNumberSymbol("group", g[F].groupingSeparator);
				this.setNumberSymbol("decimal", g[F].decimalSeparator);
				this.oConfiguration._endCollect();
				return this;
			},
			setLegacyDateCalendarCustomizing: function (m) {
				h(Array.isArray(m), "aMappings must be an Array");
				var e = this.oConfiguration._collect();
				this.aLegacyDateCalendarCustomizing = e.legacyDateCalendarCustomizing = m;
				this.oConfiguration._endCollect();
				return this;
			},
			getLegacyDateCalendarCustomizing: function () {
				return this.aLegacyDateCalendarCustomizing;
			},
			getCustomLocaleData: function () {
				return this.mSettings;
			}
		});
		return b;
	});
	sap.ui.predefine('sap/ui/core/Control', ['jquery.sap.global', './CustomStyleClassSupport', './Element', './UIArea', './RenderManager', './ResizeHandler', './BusyIndicatorUtils'], function (q, C, E, U, R, a, B) {
		"use strict";
		var b = E.extend("sap.ui.core.Control", {
			metadata: {
				stereotype: "control",
				"abstract": true,
				publicMethods: ["placeAt", "attachBrowserEvent", "detachBrowserEvent", "getControlsByFieldGroup", "triggerValidateFieldGroup", "checkFieldGroupIds"],
				library: "sap.ui.core",
				properties: {
					"busy": {
						type: "boolean",
						defaultValue: false
					},
					"busyIndicatorDelay": {
						type: "int",
						defaultValue: 1000
					},
					"busyIndicatorSize": {
						type: "sap.ui.core.BusyIndicatorSize",
						defaultValue: 'Medium'
					},
					"visible": {
						type: "boolean",
						group: "Appearance",
						defaultValue: true
					},
					"fieldGroupIds": {
						type: "string[]",
						defaultValue: []
					}
				},
				events: {
					validateFieldGroup: {
						enableEventBubbling: true,
						parameters: {
							fieldGroupIds: {
								type: "string[]"
							}
						}
					}
				}
			},
			constructor: function (i, S) {
				this.bAllowTextSelection = true;
				E.apply(this, arguments);
				this.bOutput = this.getDomRef() != null;
			},
			renderer: null
		});
		b.prototype.clone = function () {
			var j = E.prototype.clone.apply(this, arguments);
			if (this.aBindParameters) {
				for (var i = 0, l = this.aBindParameters.length; i < l; i++) {
					var P = this.aBindParameters[i];
					j.attachBrowserEvent(P.sEventType, P.fnHandler, P.oListener !== this ? P.oListener : undefined);
				}
			}
			j.bAllowTextSelection = this.bAllowTextSelection;
			return j;
		};
		C.apply(b.prototype);
		b.prototype.isActive = function () {
			return q.sap.domById(this.sId) != null;
		};
		b.prototype.invalidate = function (O) {
			var u;
			if (this.bOutput && (u = this.getUIArea())) {
				if (!this._bIsBeingDestroyed) {
					u.addInvalidatedControl(this);
				}
			} else {
				var P = this.getParent();
				if (P && (this.bOutput || !(this.getVisible && this.getVisible() === false))) {
					P.invalidate(this);
				}
			}
		};
		b.prototype.rerender = function () {
			U.rerenderControl(this);
		};
		b.prototype.getDomRef = function (S) {
			if (this.bOutput === false && !this.oParent) {
				return null;
			}
			return E.prototype.getDomRef.call(this, S);
		};
		b.prototype.allowTextSelection = function (i) {
			this.bAllowTextSelection = i;
			return this;
		};
		b.prototype.attachBrowserEvent = function (i, j, l) {
			if (i && (typeof (i) === "string")) {
				if (typeof j === "function") {
					if (!this.aBindParameters) {
						this.aBindParameters = [];
					}
					l = l || this;
					var P = j.bind(l);
					this.aBindParameters.push({
						sEventType: i,
						fnHandler: j,
						oListener: l,
						fnProxy: P
					});
					if (!this._sapui_bInAfterRenderingPhase) {
						this.$().bind(i, P);
					}
				}
			}
			return this;
		};
		b.prototype.detachBrowserEvent = function (j, k, l) {
			if (j && (typeof (j) === "string")) {
				if (typeof (k) === "function") {
					var $ = this.$(),
						i, P;
					l = l || this;
					if (this.aBindParameters) {
						for (i = this.aBindParameters.length - 1; i >= 0; i--) {
							P = this.aBindParameters[i];
							if (P.sEventType === j && P.fnHandler === k && P.oListener === l) {
								this.aBindParameters.splice(i, 1);
								$.unbind(j, P.fnProxy);
							}
						}
					}
				}
			}
			return this;
		};
		b.prototype.getRenderer = function () {
			return R.getRenderer(this);
		};
		b.prototype.placeAt = function (i, P) {
			var j = sap.ui.getCore();
			if (j.isInitialized()) {
				var k = i;
				if (typeof k === "string") {
					k = j.byId(i);
				}
				var I = false;
				if (!(k instanceof E)) {
					k = j.createUIArea(i);
					I = true;
				}
				if (!k) {
					return this;
				}
				if (!I) {
					var l = k.getMetadata().getAggregation("content");
					var m = true;
					if (l) {
						if (!l.multiple || l.type != "sap.ui.core.Control") {
							m = false;
						}
					} else if (!k.addContent || !k.insertContent || !k.removeAllContent) {
						m = false;
					}
					if (!m) {
						q.sap.log.warning("placeAt cannot be processed because container " + k + " does not have an aggregation 'content'.");
						return this;
					}
				}
				if (typeof P === "number") {
					k.insertContent(this, P);
				} else {
					P = P || "last";
					switch (P) {
						case "last":
							k.addContent(this);
							break;
						case "first":
							k.insertContent(this, 0);
							break;
						case "only":
							k.removeAllContent();
							k.addContent(this);
							break;
						default:
							q.sap.log.warning("Position " + P + " is not supported for function placeAt.");
					}
				}
			} else {
				var t = this;
				j.attachInitEvent(function () {
					t.placeAt(i, P);
				});
			}
			return this;
		};
		b.prototype.onselectstart = function (i) {
			if (!this.bAllowTextSelection) {
				i.preventDefault();
				i.stopPropagation();
			}
		};
		b.prototype.getIdForLabel = function () {
			return this.getId();
		};
		b.prototype.destroy = function (S) {
			this._bIsBeingDestroyed = true;
			this._cleanupBusyIndicator();
			a.deregisterAllForControl(this.getId());
			if (!this.getVisible()) {
				var P = document.getElementById(R.createInvisiblePlaceholderId(this));
				if (P && P.parentNode) {
					P.parentNode.removeChild(P);
				}
			}
			E.prototype.destroy.call(this, S);
		};
		var p = ["focusin", "focusout", "keydown", "keypress", "keyup", "mousedown", "touchstart", "touchmove", "mouseup", "touchend", "click"],
			r = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|tr)$/i,
			o = {
				onBeforeRendering: function () {
					if (this.getBusy() && this.getDomRef() && !this._busyIndicatorDelayedCallId && this.getDomRef("busyIndicator")) {
						H.call(this, false);
					}
				},
				onAfterRendering: function () {
					if (this.getBusy() && this.getDomRef() && !this._busyIndicatorDelayedCallId && !this.getDomRef("busyIndicator")) {
						var D = this.getBusyIndicatorDelay();
						if (D) {
							this._busyIndicatorDelayedCallId = q.sap.delayedCall(D, this, A);
						} else {
							A.call(this);
						}
					}
				}
			};

		function A() {
			if (!this.getBusy()) {
				return;
			}
			var $ = this.$(this._sBusySection);
			if (this._busyIndicatorDelayedCallId) {
				q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);
				delete this._busyIndicatorDelayedCallId;
			}
			if (!$ || $.length === 0) {
				q.sap.log.warning("BusyIndicator could not be rendered. The outer control instance is not valid anymore.");
				return;
			}
			var t = $.get(0) && $.get(0).tagName;
			if (r.test(t)) {
				q.sap.log.warning("BusyIndicator cannot be placed in elements with tag '" + t + "'.");
				return;
			}
			if ($.css('position') == 'static') {
				this._busyStoredPosition = 'static';
				$.css('position', 'relative');
			}
			this._$BusyIndicator = B.addHTML($, this.getId() + "-busyIndicator", this.getBusyIndicatorSize());
			H.call(this, true);
		}

		function f() {
			var $ = this.$(this._sBusySection);
			$.removeClass('sapUiLocalBusy');
			$.removeAttr('aria-busy');
			if (this._busyStoredPosition) {
				$.css('position', this._busyStoredPosition);
				delete this._busyStoredPosition;
			}
			if (this._$BusyIndicator) {
				H.call(this, false);
				this._$BusyIndicator.remove();
				delete this._$BusyIndicator;
			}
		}

		function s(i) {
			var t = i.target === this._$BusyIndicator.get(0);
			if (t && i.type === 'keydown' && i.keyCode === 9) {
				q.sap.log.debug("Local Busy Indicator Event keydown handled: " + i.type);
				var j = i.shiftKey ? this.oBusyTabbableBefore : this.oBusyTabbableAfter;
				j.setAttribute("tabindex", -1);
				this.bIgnoreBusyFocus = true;
				j.focus();
				this.bIgnoreBusyFocus = false;
				j.setAttribute("tabindex", 0);
			} else if (t && (i.type === 'mousedown' || i.type === 'touchdown')) {
				q.sap.log.debug("Local Busy Indicator click handled on busy area: " + i.target.id);
			} else {
				q.sap.log.debug("Local Busy Indicator Event Suppressed: " + i.type);
				i.preventDefault();
				i.stopImmediatePropagation();
			}
		}

		function c() {
			if (!this.bIgnoreBusyFocus) {
				this._$BusyIndicator.get(0).focus();
			}
		}

		function d(i) {
			var j = document.createElement("span");
			j.setAttribute("tabindex", 0);
			j.addEventListener('focusin', i);
			return j;
		}

		function e(i, j) {
			if (i.parentNode) {
				i.parentNode.removeChild(i);
			}
			i.removeEventListener('focusin', j);
		}

		function g(j, $, k) {
			var S = [];
			for (var i = 0; i < p.length; i++) {
				j.addEventListener(p[i], k, {
					capture: true,
					passive: false
				});
				S.push(q.sap._suppressTriggerEvent(p[i], j, $.get(0)));
			}
			$.bind('keydown', k);
			return S;
		}

		function h(j, $, k, S) {
			var i;
			if (j) {
				for (i = 0; i < p.length; i++) {
					j.removeEventListener(p[i], k, {
						capture: true,
						passive: false
					});
				}
			}
			if (S) {
				for (i = 0; i < S.length; i++) {
					q.sap._releaseTriggerEvent(S[i]);
				}
			}
			if ($) {
				$.unbind('keydown', k);
			}
		}

		function H(i) {
			var j = this.getDomRef(this._sBusySection);
			if (i) {
				if (j) {
					this.fnRedirectBusyFocus = c.bind(this);
					this.oBusyTabbableBefore = d(this.fnRedirectBusyFocus);
					this.oBusyTabbableAfter = d(this.fnRedirectBusyFocus);
					j.parentNode.insertBefore(this.oBusyTabbableBefore, j);
					j.parentNode.insertBefore(this.oBusyTabbableAfter, j.nextSibling);
					this._fnSuppressDefaultAndStopPropagationHandler = s.bind(this);
					this._aSuppressHandler = g(j, this._$BusyIndicator, this._fnSuppressDefaultAndStopPropagationHandler);
				} else {
					q.sap.log.warning("fnHandleInteraction called with bBusy true, but no DOMRef exists!");
				}
			} else {
				if (this.oBusyTabbableBefore) {
					e(this.oBusyTabbableBefore, this.fnRedirectBusyFocus);
					delete this.oBusyTabbableBefore;
				}
				if (this.oBusyTabbableAfter) {
					e(this.oBusyTabbableAfter, this.fnRedirectBusyFocus);
					delete this.oBusyTabbableAfter;
				}
				delete this.fnRedirectBusyFocus;
				h(j, this._$BusyIndicator, this._fnSuppressDefaultAndStopPropagationHandler, this._aSuppressHandler);
			}
		}
		b.prototype.setBusy = function (i, j) {
			if (!!i == this.getProperty("busy")) {
				return this;
			}
			this._sBusySection = j;
			this.setProperty("busy", i, true);
			if (i) {
				this.addDelegate(o, false, this);
			} else {
				this.removeDelegate(o);
				if (this._busyIndicatorDelayedCallId) {
					q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);
					delete this._busyIndicatorDelayedCallId;
				}
			}
			if (!this.getDomRef()) {
				return this;
			}
			if (i) {
				if (this.getBusyIndicatorDelay() <= 0) {
					A.call(this);
				} else {
					this._busyIndicatorDelayedCallId = q.sap.delayedCall(this.getBusyIndicatorDelay(), this, A);
				}
			} else {
				f.call(this);
			}
			return this;
		};
		b.prototype.isBusy = b.prototype.getBusy;
		b.prototype.setBusyIndicatorDelay = function (D) {
			this.setProperty("busyIndicatorDelay", D, true);
			return this;
		};
		b.prototype._cleanupBusyIndicator = function () {
			if (this._busyIndicatorDelayedCallId) {
				q.sap.clearDelayedCall(this._busyIndicatorDelayedCallId);
				delete this._busyIndicatorDelayedCallId;
			}
			H.call(this, false);
		};
		b.prototype.getControlsByFieldGroupId = function (F) {
			return this.findAggregatedObjects(true, function (i) {
				if (i instanceof b) {
					return i.checkFieldGroupIds(F);
				}
				return false;
			});
		};
		b.prototype.checkFieldGroupIds = function (F) {
			if (typeof F === "string") {
				if (F === "") {
					return this.checkFieldGroupIds([]);
				}
				return this.checkFieldGroupIds(F.split(","));
			}
			var j = this._getFieldGroupIds();
			if (Array.isArray(F)) {
				var k = 0;
				for (var i = 0; i < F.length; i++) {
					if (j.indexOf(F[i]) > -1) {
						k++;
					}
				}
				return k === F.length;
			} else if (!F && j.length > 0) {
				return true;
			}
			return false;
		};
		b.prototype.triggerValidateFieldGroup = function (F) {
			this.fireValidateFieldGroup({
				fieldGroupIds: F
			});
		};
		return b;
	});
	sap.ui.predefine('sap/ui/core/Core', ['jquery.sap.global', 'sap/ui/Device', 'sap/ui/Global', 'sap/ui/base/BindingParser', 'sap/ui/base/DataType', 'sap/ui/base/EventProvider', 'sap/ui/base/Interface', 'sap/ui/base/Object', 'sap/ui/base/ManagedObject', './Component', './Configuration', './Control', './Element', './ElementMetadata', './FocusHandler', './RenderManager', './ResizeHandler', './ThemeCheck', './UIArea', './message/MessageManager', 'jquery.sap.act', 'jquery.sap.dom', 'jquery.sap.events', 'jquery.sap.mobile', 'jquery.sap.properties', 'jquery.sap.resources', 'jquery.sap.script', 'jquery.sap.sjax'], function (q, D, G, B, a, E, I, c, M, C, d, f, g, h, F, R, j, T, U, k) {
		"use strict";

		function r(o, m) {
			var b = sap.ui.require(m);
			return typeof b === 'function' && (o instanceof b);
		}
		var s = U._oRenderLog;
		var L = {};
		var t = {};
		var _;
		var u = c.extend("sap.ui.core.Core", {
			constructor: function () {
				if (sap.ui.getCore && sap.ui.getCore()) {
					return sap.ui.getCore();
				}
				var b = this,
					l = q.sap.log,
					e = "sap.ui.core.Core";
				c.call(this);
				_ = new E();
				["attachEvent", "detachEvent", "getEventingParent"].forEach(function (v) {
					u.prototype[v] = _[v].bind(_);
				});
				this.bBooted = false;
				this.bInitialized = false;
				this.bDomReady = false;
				this.aPlugins = [];
				this.mLibraries = {};
				this.mResourceBundles = {};
				this.mUIAreas = {};
				this.oModels = {};
				this.oEventBus = null;
				this.mElements = {};
				this.mObjects = {
					"component": {},
					"template": {}
				};
				this.oRootComponent = null;
				this.aInitListeners = [];
				this.bInitLegacyLib = false;
				this._sRerenderTimer = this;
				this.aPrerenderingTasks = [];
				l.info("Creating Core", null, e);
				q.sap.measure.start("coreComplete", "Core.js - complete");
				q.sap.measure.start("coreBoot", "Core.js - boot");
				q.sap.measure.start("coreInit", "Core.js - init");
				this.oConfiguration = new d(this);
				var o = this.oConfiguration["frameOptionsConfig"] || {};
				o.mode = this.oConfiguration.getFrameOptions();
				o.whitelistService = this.oConfiguration.getWhitelistService();
				this.oFrameOptions = new q.sap.FrameOptions(o);
				if (this.oConfiguration["bindingSyntax"] === "complex") {
					M.bindingParser = B.complexParser;
				}
				if (this.oConfiguration["xx-designMode"] == true) {
					B._keepBindingStrings = true;
				}
				this._grantFriendAccess();
				var m = this.oConfiguration.modules;
				if (this.oConfiguration.getDebug()) {
					m.unshift("sap.ui.debug.DebugEnv");
				}
				var i = m.indexOf("sap.ui.core.library");
				if (i != 0) {
					if (i > 0) {
						m.splice(i, 1);
					}
					m.unshift("sap.ui.core.library");
				}
				if (this.oConfiguration["xx-lesssupport"] && m.indexOf("sap.ui.core.plugin.LessSupport") == -1) {
					l.info("Including LessSupport into declared modules");
					m.push("sap.ui.core.plugin.LessSupport");
				}
				var p = this.oConfiguration.preload;
				if (window["sap-ui-debug"] === true) {
					p = "";
				}
				if (p === "auto") {
					p = (window["sap-ui-optimized"] && !this.oConfiguration['xx-loadAllMode']) ? "sync" : "";
				}
				this.oConfiguration.preload = p;
				var n = p === "async";
				this.oConfiguration['xx-libraryPreloadFiles'].forEach(function (v) {
					var k1 = String(v).trim().split(/\s*:\s*/),
						l1 = k1[0],
						m1 = k1[1];
					if (k1.length === 1) {
						m1 = l1;
						l1 = '';
					}
					if (/^(?:none|js|json|both)$/.test(m1)) {
						w[l1] = m1;
					}
				});
				l.info("Declared modules: " + m, e);
				this._setupThemes();
				this._setupContentDirection();
				var $ = q("html");
				this._setupBrowser($);
				this._setupOS($);
				this._setupLang($);
				this._setupAnimation($);
				sap.ui.getCore = q.sap.getter(this.getInterface());
				this.oRenderManager = new R();
				var N = q.sap.syncPoint("UI5 Document Ready", function (v, k1) {
					b.bDomReady = true;
					b.init();
				});
				var O = N.startTask("document.ready");
				var P = N.startTask("preload and boot");
				q(function () {
					l.trace("document is ready");
					N.finishTask(O);
				});
				var Q = q.sap.syncPoint("UI5 Core Preloads and Bootstrap Script", function (v, k1) {
					l.trace("Core loaded: open=" + v + ", failures=" + k1);
					b._boot(n, function () {
						N.finishTask(P);
						q.sap.measure.end("coreBoot");
					});
				});
				var V = Q.startTask("create sp2 tasks task");
				if (this.oConfiguration["versionedLibCss"]) {
					var W = Q.startTask("load version info");
					var X = function (v) {
						if (v) {
							l.trace("Loaded \"sap-ui-version.json\".");
						} else {
							l.error("Could not load \"sap-ui-version.json\".");
						}
						Q.finishTask(W);
					};
					var Y = sap.ui.getVersionInfo({
						async: n,
						failOnError: false
					});
					if (Y instanceof Promise) {
						Y.then(X, function (v) {
							l.error("Unexpected error when loading \"sap-ui-version.json\": " + v);
							Q.finishTask(W);
						});
					} else {
						X(Y);
					}
				}
				var Z = this.oConfiguration["xx-bootTask"];
				if (Z) {
					var a1 = Q.startTask("custom boot task");
					Z(function (v) {
						Q.finishTask(a1, typeof v === "undefined" || v === true);
					});
				}
				this._polyfillFlexbox();
				var b1 = Q.startTask("bootstrap script");
				this.boot = function () {
					if (this.bBooted) {
						return;
					}
					this.bBooted = true;
					Q.finishTask(b1);
				};
				if (p === "sync" || p === "async") {
					var c1 = m.reduce(function (v, k1) {
						var l1 = k1.search(/\.library$/);
						if (l1 >= 0) {
							v.push(k1.slice(0, l1));
						}
						return v;
					}, []);
					var d1 = this.loadLibraries(c1, {
						async: n,
						preloadOnly: true
					});
					if (n) {
						var e1 = Q.startTask("preload bootstrap libraries");
						d1.then(function () {
							Q.finishTask(e1);
						}, function () {
							Q.finishTask(e1, false);
						});
					}
				}
				var f1 = this.oConfiguration.getAppCacheBuster();
				if (f1 && f1.length > 0) {
					var g1 = sap.ui.requireSync('sap/ui/core/AppCacheBuster');
					g1.boot(Q);
				}
				if (this.oConfiguration.getSupportMode() !== null) {
					var h1 = Q.startTask("support info script");
					var i1 = function (v) {
						v.initSupportRules(b.oConfiguration.getSupportMode());
						Q.finishTask(h1);
					};
					var j1 = function (v) {
						v.initializeSupportMode(b.oConfiguration.getSupportMode(), n);
						if (n) {
							sap.ui.require(["sap/ui/support/Bootstrap"], i1);
						} else {
							i1(sap.ui.requireSync("sap/ui/support/Bootstrap"));
						}
					};
					if (n) {
						sap.ui.require(["sap/ui/core/support/Support"], j1);
					} else {
						j1(sap.ui.requireSync("sap/ui/core/support/Support"));
					}
				}
				Q.finishTask(V);
			},
			metadata: {
				publicMethods: ["boot", "isInitialized", "isThemeApplied", "attachInitEvent", "attachInit", "getRenderManager", "createRenderManager", "getConfiguration", "setRoot", "createUIArea", "getUIArea", "getUIDirty", "getElementById", "getCurrentFocusedControlId", "getControl", "getComponent", "getTemplate", "lock", "unlock", "isLocked", "attachEvent", "detachEvent", "applyChanges", "getEventBus", "applyTheme", "setThemeRoot", "attachThemeChanged", "detachThemeChanged", "getStaticAreaRef", "attachThemeScopingChanged", "detachThemeScopingChanged", "fireThemeScopingChanged", "notifyContentDensityChanged", "registerPlugin", "unregisterPlugin", "getLibraryResourceBundle", "byId", "getLoadedLibraries", "loadLibrary", "loadLibraries", "initLibrary", "includeLibraryTheme", "setModel", "getModel", "hasModel", "isMobile", "attachControlEvent", "detachControlEvent", "attachIntervalTimer", "detachIntervalTimer", "attachParseError", "detachParseError", "fireParseError", "attachValidationError", "detachValidationError", "fireValidationError", "attachFormatError", "detachFormatError", "fireFormatError", "attachValidationSuccess", "detachValidationSuccess", "fireValidationSuccess", "attachLocalizationChanged", "detachLocalizationChanged", "attachLibraryChanged", "detachLibraryChanged", "isStaticAreaRef", "createComponent", "getRootComponent", "getApplication", "setMessageManager", "getMessageManager", "byFieldGroupId", "addPrerenderingTask"]
			}
		});
		u.M_EVENTS = {
			ControlEvent: "ControlEvent",
			UIUpdated: "UIUpdated",
			ThemeChanged: "ThemeChanged",
			ThemeScopingChanged: "themeScopingChanged",
			LocalizationChanged: "localizationChanged",
			LibraryChanged: "libraryChanged",
			ValidationError: "validationError",
			ParseError: "parseError",
			FormatError: "formatError",
			ValidationSuccess: "validationSuccess"
		};
		var S = "sap-ui-static";
		u.prototype._grantFriendAccess = function () {
			var b = this;
			h.prototype.register = function (m) {
				b.registerElementClass(m);
			};
			g.prototype.register = function () {
				b.registerElement(this);
			};
			g.prototype.deregister = function () {
				b.deregisterElement(this);
			};
			g._updateFocusInfo = function (e) {
				if (b.oFocusHandler) {
					b.oFocusHandler.updateControlFocusInfo(e);
				}
			};
			C.prototype.register = function () {
				b.registerObject(this);
			};
			C.prototype.deregister = function () {
				var e = this.sId;
				for (var i in b.mElements) {
					var o = b.mElements[i];
					if (o._sapui_candidateForDestroy && o._sOwnerId === e && !o.getParent()) {
						q.sap.log.debug("destroying dangling template " + o + " when destroying the owner component");
						o.destroy();
					}
				}
				b.deregisterObject(this);
			};
		};
		u.prototype._setupThemes = function () {
			var l = q.sap.log,
				b = "sap.ui.core.Core";
			var o = window["sap-ui-config"];
			if (this.oConfiguration.themeRoot) {
				o = o || {};
				o.themeroots = o.themeroots || {};
				o.themeroots[this.oConfiguration.getTheme()] = this.oConfiguration.themeRoot;
			}
			if (o) {
				if (o.themeroots) {
					for (var e in o.themeroots) {
						var i = o.themeroots[e];
						if (typeof i === "string") {
							this.setThemeRoot(e, i);
						} else {
							for (var m in i) {
								if (m.length > 0) {
									this.setThemeRoot(e, [m], i[m]);
								} else {
									this.setThemeRoot(e, i[m]);
								}
							}
						}
					}
				}
			}
			this.sTheme = this.oConfiguration.getTheme();
			q(document.documentElement).addClass("sapUiTheme-" + this.sTheme);
			l.info("Declared theme " + this.sTheme, null, b);
		};
		u.prototype._setupContentDirection = function () {
			var l = q.sap.log,
				b = "sap.ui.core.Core",
				e = this.oConfiguration.getRTL() ? "rtl" : "ltr";
			q(document.documentElement).attr("dir", e);
			l.info("Content direction set to '" + e + "'", null, b);
		};
		u.prototype._setupBrowser = function ($) {
			var l = q.sap.log,
				e = "sap.ui.core.Core";
			$ = $ || q("html");
			var b = D.browser;
			var i = b.name;
			if (i === b.BROWSER.CHROME) {
				q.browser.safari = false;
				q.browser.chrome = true;
			} else if (i === b.BROWSER.SAFARI) {
				q.browser.safari = true;
				q.browser.chrome = false;
				if (b.mobile) {
					i = "m" + i;
				}
			}
			if (i) {
				q.browser.fVersion = b.version;
				q.browser.mobile = b.mobile;
				i = i + (b.version === -1 ? "" : Math.floor(b.version));
				$.attr("data-sap-ui-browser", i);
				l.debug("Browser-Id: " + i, null, e);
			}
		};
		u.prototype._setupOS = function ($) {
			$ = $ || q("html");
			$.attr("data-sap-ui-os", D.os.name + D.os.versionStr);
			var o = null;
			switch (D.os.name) {
				case D.os.OS.IOS:
					o = "sap-ios";
					break;
				case D.os.OS.ANDROID:
					o = "sap-android";
					break;
				case D.os.OS.BLACKBERRY:
					o = "sap-bb";
					break;
				case D.os.OS.WINDOWS_PHONE:
					o = "sap-winphone";
					break;
			}
			if (o) {
				$.addClass(o);
			}
		};
		u.prototype._setupLang = function ($) {
			$ = $ || q("html");
			var b = function () {
				var l = this.oConfiguration.getLocale();
				if (l) {
					$.attr("lang", l.toString());
				} else {
					$.removeAttr("lang");
				}
			};
			b.call(this);
			this.attachLocalizationChanged(b, this);
		};
		u.prototype._setupAnimation = function ($) {
			if (this.oConfiguration) {
				$ = $ || q("html");
				var b = this.oConfiguration.getAnimation();
				$.attr("data-sap-ui-animation", b ? "on" : "off");
				q.fx.off = !b;
				var e = this.oConfiguration.getAnimationMode();
				$.attr("data-sap-ui-animation-mode", e);
			}
		};
		u.prototype._polyfillFlexbox = function () {
			var b = new q.sap.Version(this.oConfiguration.getCompatibilityVersion("flexBoxPolyfill"));
			if (b.compareTo("1.16") >= 0) {
				q.support.useFlexBoxPolyfill = false;
			} else if (!q.support.flexBoxLayout && !q.support.newFlexBoxLayout && !q.support.ie10FlexBoxLayout) {
				q.support.useFlexBoxPolyfill = true;
			} else {
				q.support.useFlexBoxPolyfill = false;
			}
		};
		u.prototype._boot = function (b, e) {
			var i = this.oConfiguration['preloadLibCss'];
			if (i && i.length > 0 && !i.appManaged) {
				this.includeLibraryTheme("sap-ui-merged", undefined, "?l=" + i.join(","));
			}
			if (b) {
				return this._requireModulesAsync().then(function () {
					e();
				});
			}
			var l = this;
			this.oConfiguration.modules.forEach(function (n) {
				var m = n.match(/^(.*)\.library$/);
				if (m) {
					l.loadLibrary(m[1]);
				} else {
					q.sap.require(n);
				}
			});
			e();
		};
		u.prototype._requireModulesAsync = function () {
			var l = [],
				b = [];
			this.oConfiguration.modules.forEach(function (e) {
				var m = e.match(/^(.*)\.library$/);
				if (m) {
					l.push(m[1]);
				} else {
					b.push(q.sap.getResourceName(e, ""));
				}
			});
			return Promise.all([this.loadLibraries(l), new Promise(function (e) {
				sap.ui.require(b, function () {
					e(Array.prototype.slice.call(arguments));
				});
			})]);
		};
		u.prototype.applyTheme = function (b, e) {
			b = this.oConfiguration._normalizeTheme(b, e);
			if (e) {
				this.setThemeRoot(b, e);
			}
			if (b && this.sTheme != b) {
				var i = this.sTheme;
				this._updateThemeUrls(b, true);
				this.sTheme = b;
				this.oConfiguration._setTheme(b);
				q(document.documentElement).removeClass("sapUiTheme-" + i).addClass("sapUiTheme-" + b);
				if (this.oThemeCheck) {
					this.oThemeCheck.fireThemeChangedEvent(false);
				}
			}
		};
		u.prototype._updateThemeUrl = function (l, b, e) {
			var i = l.id.slice(13),
				Q = l.href.search(/[?#]/),
				m, n, o = "library",
				p = this.oConfiguration.getRTL() ? "-RTL" : "",
				v, N;
			if (Q > -1) {
				m = l.href.substring(0, Q);
				n = l.href.substring(Q);
			} else {
				m = l.href;
				n = "";
			}
			m = m.substring(m.lastIndexOf("/") + 1);
			if ((N = i.indexOf("-[")) > 0) {
				o += i.slice(N + 2, -1);
				i = i.slice(0, N);
			}
			if (m === (o + ".css") || m === (o + "-RTL.css")) {
				m = o + p + ".css";
			}
			v = this._getThemePath(i, b) + m + n;
			if (v != l.href) {
				if (e) {
					l.setAttribute("data-sap-ui-foucmarker", l.id);
				}
				q.sap.includeStyleSheet(v, l.id);
			}
		};
		u.prototype._updateThemeUrls = function (b, e) {
			var i = this;
			q("link[id^=sap-ui-theme-]").each(function () {
				i._updateThemeUrl(this, b, e);
			});
		};
		u.prototype._ensureThemeRoot = function (l, b) {
			if (this._mThemeRoots) {
				var p = this._mThemeRoots[b + " " + l] || this._mThemeRoots[b];
				if (p) {
					p = p + l.replace(/\./g, "/") + "/themes/" + b + "/";
					q.sap.registerModulePath(l + ".themes." + b, p);
				}
			}
		};
		u.prototype._getThemePath = function (l, b) {
			this._ensureThemeRoot(l, b);
			return q.sap.getModulePath(l + ".themes." + b, "/");
		};
		u.prototype.setThemeRoot = function (b, l, e) {
			if (!this._mThemeRoots) {
				this._mThemeRoots = {};
			}
			if (e === undefined) {
				e = l;
				l = undefined;
			}
			e = e + (e.slice(-1) == "/" ? "" : "/");
			if (l) {
				for (var i = 0; i < l.length; i++) {
					var m = l[i];
					this._mThemeRoots[b + " " + m] = e;
				}
			} else {
				this._mThemeRoots[b] = e;
			}
			return this;
		};
		u.prototype.init = function () {
			if (this.bInitialized) {
				return;
			}
			var l = q.sap.log,
				b = "sap.ui.core.Core.init()";
			this.boot();
			l.info("Initializing", null, b);
			this.oFocusHandler = new F(document.body, this);
			this.oRenderManager._setFocusHandler(this.oFocusHandler);
			this.oResizeHandler = new j(this);
			this.oThemeCheck = new T(this);
			l.info("Initialized", null, b);
			q.sap.measure.end("coreInit");
			this.bInitialized = true;
			l.info("Starting Plugins", null, b);
			this.startPlugins();
			l.info("Plugins started", null, b);
			this._createUIAreas();
			this.oThemeCheck.fireThemeChangedEvent(true);
			this._executeOnInit();
			this._setupRootComponent();
			this._setBodyAccessibilityRole();
			this._executeInitListeners();
			if (this.isThemeApplied() || !this.oConfiguration['xx-waitForTheme']) {
				this.renderPendingUIUpdates("during Core init");
			} else {
				s.debug("delay initial rendering until theme has been loaded");
				_.attachEventOnce(u.M_EVENTS.ThemeChanged, function () {
					setTimeout(this.renderPendingUIUpdates.bind(this, "after theme has been loaded"), D.browser.safari ? 50 : 0);
				}, this);
			}
			q.sap.measure.end("coreComplete");
		};
		u.prototype._createUIAreas = function () {
			var o = this.oConfiguration;
			if (o.areas) {
				for (var i = 0, l = o.areas.length; i < l; i++) {
					this.createUIArea(o.areas[i]);
				}
				o.areas = undefined;
			}
		};
		u.prototype._executeOnInit = function () {
			var o = this.oConfiguration;
			if (o.onInit) {
				if (typeof o.onInit === "function") {
					o.onInit();
				} else {
					q.sap.globalEval(o.onInit);
				}
				o.onInit = undefined;
			}
		};
		u.prototype._setupRootComponent = function () {
			var l = q.sap.log,
				b = "sap.ui.core.Core.init()",
				o = this.oConfiguration;
			var e = o.getRootComponent();
			if (e) {
				l.info("Loading Root Component: " + e, null, b);
				var i = sap.ui.component({
					name: e
				});
				this.oRootComponent = i;
				var m = o["xx-rootComponentNode"];
				if (m && r(i, 'sap/ui/core/UIComponent')) {
					var n = q.sap.domById(m);
					if (n) {
						l.info("Creating ComponentContainer for Root Component: " + e, null, b);
						var p = sap.ui.requireSync('sap/ui/core/ComponentContainer'),
							v = new p({
								component: i,
								propagateModel: true
							});
						v.placeAt(n);
					}
				}
			} else {
				var N = o.getApplication();
				if (N) {
					l.warning("The configuration 'application' is deprecated. Please use the configuration 'component' instead! Please migrate from sap.ui.app.Application to sap.ui.core.Component.");
					l.info("Loading Application: " + N, null, b);
					q.sap.require(N);
					var O = q.sap.getObject(N);
					var P = new O();
				}
			}
		};
		u.prototype._setBodyAccessibilityRole = function () {
			var o = this.oConfiguration;
			var $ = q("body");
			if (o.getAccessibility() && o.getAutoAriaBodyRole() && !$.attr("role")) {
				$.attr("role", "application");
			}
		};
		u.prototype._executeInitListeners = function () {
			var l = q.sap.log,
				b = "sap.ui.core.Core.init()";
			var e = this.aInitListeners;
			this.aInitListeners = undefined;
			if (e && e.length > 0) {
				l.info("Fire Loaded Event", null, b);
				e.forEach(function (i) {
					i();
				});
			}
		};
		u.prototype.isInitialized = function () {
			return this.bInitialized;
		};
		u.prototype.isThemeApplied = function () {
			return T.themeLoaded;
		};
		u.prototype.attachInitEvent = function (b) {
			if (this.aInitListeners) {
				this.aInitListeners.push(b);
			}
		};
		u.prototype.attachInit = function (b) {
			if (this.aInitListeners) {
				this.aInitListeners.push(b);
			} else {
				b();
			}
		};
		u.prototype.lock = function () {
			this.bLocked = true;
		};
		u.prototype.unlock = function () {
			this.bLocked = false;
		};
		u.prototype.isLocked = function () {
			return this.bLocked;
		};
		u.prototype.getConfiguration = function () {
			return this.oConfiguration;
		};
		u.prototype.getRenderManager = function () {
			return this.createRenderManager();
		};
		u.prototype.createRenderManager = function () {
			var o = new R();
			o._setFocusHandler(this.oFocusHandler);
			return o.getInterface();
		};
		u.prototype.getCurrentFocusedControlId = function () {
			if (!this.isInitialized()) {
				throw new Error("Core must be initialized");
			}
			return this.oFocusHandler.getCurrentFocusedControlId();
		};
		var w = {};

		function x(l) {
			var b = 'both';
			if (typeof l === 'object') {
				if (l.json === true) {
					b = 'json';
				} else if (l.json === false) {
					b = 'js';
				}
				l = l.name;
			}
			var e = w[l] || w[''] || 'both';
			if (e === 'both') {
				e = b;
			} else if (e !== b && b !== 'both') {
				e = 'none';
			}
			return {
				name: l,
				fileType: e
			};
		}

		function y(l) {
			var b = this;
			l = x(l);
			var i = l.name,
				m = l.fileType,
				n = i.replace(/\./g, '/');
			if (m === 'none' || q.sap.isResourceLoaded(n + '/library.js')) {
				return Promise.resolve(true);
			}
			var o = t[i] || (t[i] = {});
			if (o.promise) {
				return o.promise;
			}
			o.pending = true;
			o.async = true;
			var p;
			if (m !== 'json') {
				var P = n + '/library-preload.js';
				p = q.sap._loadJSResourceAsync(P).then(function () {
					return A(i);
				}, function (e) {
					if (m !== 'js') {
						q.sap.log.error("failed to load '" + P + "' (" + (e && e.message || e) + "), falling back to library-preload.json");
						return H(i);
					}
				});
			} else {
				p = H(i);
			}
			o.promise = p.then(function (e) {
				var v = [],
					N = z(i);
				if (e && e.length) {
					v = e.map(y.bind(b));
				}
				if (N && q.sap.Version(N._version).compareTo("1.9.0") >= 0) {
					v.push(b.getLibraryResourceBundle(i, true));
				}
				return Promise.all(v).then(function () {
					o.pending = false;
				});
			});
			return o.promise;
		}

		function z(l) {
			var m = l.replace(/\./g, '/') + '/manifest.json';
			if (q.sap.isResourceLoaded(m)) {
				return q.sap.loadResource(m, {
					dataType: 'json',
					async: false,
					failOnError: false
				});
			}
		}

		function A(l) {
			var m = z(l);
			var b = m && m["sap.ui5"] && m["sap.ui5"].dependencies && m["sap.ui5"].dependencies.libs;
			if (b) {
				return Object.keys(b).reduce(function (e, i) {
					if (!b[i].lazy) {
						e.push(i);
					}
					return e;
				}, []);
			}
		}

		function H(l) {
			var b = q.sap.getModulePath(l + ".library-preload", ".json");
			return Promise.resolve(q.ajax({
				dataType: "json",
				url: b
			})).then(function (e) {
				if (e) {
					e.url = b;
					q.sap.registerPreloadedModules(e);
					var i = e.dependencies;
					if (Array.isArray(i)) {
						i = i.map(function (m) {
							return m.replace(/\.library-preload$/, '');
						});
					}
					return i;
				}
			}, function (e, i, m) {
				q.sap.log.error("failed to load '" + b + "': " + (m || i));
			});
		}

		function J(l) {
			l = x(l);
			var b = l.name,
				i = l.fileType,
				m = b.replace(/\./g, '/');
			if (i === 'none' || q.sap.isResourceLoaded(m + '/library.js')) {
				return;
			}
			var n = t[b] || (t[b] = {});
			if (n.pending === false) {
				return;
			}
			if (n.pending) {
				if (n.async) {
					q.sap.log.warning("request to load " + b + " synchronously while async loading is pending; this causes a duplicate request and should be avoided by caller");
				} else {
					q.sap.log.warning("request to load " + b + " synchronously while sync loading is pending (cycle, ignored)");
					return;
				}
			}
			n.pending = true;
			n.async = false;
			var o;
			n.promise = new Promise(function (v, N) {
				o = v;
			});
			var p;
			if (i !== 'json') {
				var P = m + '/library-preload';
				try {
					sap.ui.requireSync(P);
					p = A(b);
				} catch (e) {
					q.sap.log.error("failed to load '" + P + "' (" + (e && e.message || e) + ")");
					if (e && e.loadError && i !== 'js') {
						p = K(b);
					}
				}
			} else {
				p = K(b);
			}
			if (p && p.length) {
				p.forEach(J);
			}
			n.pending = false;
			o();
		}

		function K(l) {
			var b = q.sap.getModulePath(l + ".library-preload", ".json");
			var e;
			q.ajax({
				dataType: "json",
				async: false,
				url: b,
				success: function (i) {
					if (i) {
						i.url = b;
						q.sap.registerPreloadedModules(i);
						e = i.dependencies;
					}
				},
				error: function (i, m, n) {
					q.sap.log.error("failed to load '" + b + "': " + (n || m));
				}
			});
			if (Array.isArray(e)) {
				e = e.map(function (i) {
					return i.replace(/\.library-preload$/, '');
				});
			}
			return e;
		}
		u.prototype.loadLibrary = function (l, v) {
			if (typeof v === 'boolean') {
				v = {
					async: v
				};
			}
			if (typeof v === 'object') {
				if (v.async) {
					if (v.url && t[l] == null) {
						q.sap.registerModulePath(l, v.url);
					}
					return this.loadLibraries([l]);
				}
				v = v.url;
			}
			if (!L[l]) {
				var m = l + ".library",
					b;
				if (v) {
					q.sap.registerModulePath(l, v);
				}
				if (this.oConfiguration['xx-loadAllMode'] && !q.sap.isDeclared(m)) {
					b = m + "-all";
					q.sap.log.debug("load all-in-one file " + b);
					q.sap.require(b);
				} else if (this.oConfiguration.preload === 'sync' || this.oConfiguration.preload === 'async') {
					J(l);
				}
				q.sap.require(m);
				if (!L[l]) {
					q.sap.log.warning("library " + l + " didn't initialize itself");
					this.initLibrary(l);
				}
				if (this.oThemeCheck && this.isInitialized()) {
					this.oThemeCheck.fireThemeChangedEvent(true);
				}
			}
			return this.mLibraries[l];
		};
		u.prototype.loadLibraries = function (l, o) {
			o = q.extend({
				async: true,
				preloadOnly: false
			}, o);
			var b = this,
				p = this.oConfiguration.preload === 'sync' || this.oConfiguration.preload === 'async',
				e = o.async,
				i = !o.preloadOnly;

			function m() {
				return l.map(function (P) {
					if (typeof P === 'object') {
						P = P.name;
					}
					return P.replace(/\./g, "/") + "/library";
				});
			}

			function n() {
				if (b.oThemeCheck && b.isInitialized()) {
					b.oThemeCheck.fireThemeChangedEvent(true);
				}
			}

			function v() {
				return new Promise(function (P, Q) {
					sap.ui.require(m(), function () {
						n();
						P();
					});
				});
			}

			function N() {
				m().forEach(sap.ui.requireSync);
				n();
			}
			if (e) {
				var O = p ? Promise.all(l.map(y.bind(this))) : Promise.resolve(true);
				return i ? O.then(v) : O;
			} else {
				if (p) {
					l.forEach(J);
				}
				if (i) {
					N();
				}
			}
		};
		u.prototype.createComponent = function (v, b, i, m) {
			if (typeof v === "string") {
				v = {
					name: v,
					url: b
				};
				if (typeof i === "object") {
					v.settings = i;
				} else {
					v.id = i;
					v.settings = m;
				}
			}
			return sap.ui.component(v);
		};
		u.prototype.getRootComponent = function () {
			return this.oRootComponent;
		};
		u.prototype.initLibrary = function (l) {
			var b = typeof l === 'string';
			if (b) {
				l = {
					name: l
				};
			}
			var e = l.name,
				m = q.sap.log,
				n = "sap.ui.core.Core.initLibrary()";
			if (b) {
				m.error("[Deprecated] library " + e + " uses old fashioned initLibrary() call (rebuild with newest generator)");
			}
			if (!e || L[e]) {
				return;
			}
			m.debug("Analyzing Library " + e, null, n);
			L[e] = true;

			function o(N, O) {
				var P, V;
				for (P in O) {
					V = O[P];
					if (V !== undefined) {
						if (Array.isArray(N[P])) {
							if (N[P].length === 0) {
								N[P] = V;
							} else {
								N[P] = q.sap.unique(N[P].concat(V));
							}
						} else if (N[P] === undefined) {
							N[P] = V;
						} else if (P != "name") {
							q.sap.log.warning("library info setting ignored: " + P + "=" + V);
						}
					}
				}
				return N;
			}
			q.sap.getObject(e, 0);
			this.mLibraries[e] = l = o(this.mLibraries[e] || {
				name: e,
				dependencies: [],
				types: [],
				interfaces: [],
				controls: [],
				elements: []
			}, l);
			for (var i = 0; i < l.dependencies.length; i++) {
				var p = l.dependencies[i];
				m.debug("resolve Dependencies to " + p, null, n);
				if (L[p] !== true) {
					m.warning("Dependency from " + e + " to " + p + " has not been resolved by library itself", null, n);
					this.loadLibrary(p);
				}
			}
			a.registerInterfaceTypes(l.interfaces);
			for (var i = 0; i < l.types.length; i++) {
				if (!/^(any|boolean|float|int|string|object|void)$/.test(l.types[i])) {
					q.sap.declare(l.types[i]);
				}
			}
			var v = l.controls.concat(l.elements);
			for (var i = 0; i < v.length; i++) {
				sap.ui.lazyRequire(v[i], "new extend getMetadata");
			}
			if (!l.noLibraryCSS) {
				this._ensureThemeRoot(e, this.sTheme);
				this._ensureThemeRoot(e, "base");
				if (this.oConfiguration['preloadLibCss'].indexOf(e) < 0) {
					var Q = this._getLibraryCssQueryParams(l);
					this.includeLibraryTheme(e, undefined, Q);
				}
			}
			l.sName = l.name;
			l.aControls = l.controls;
			this.fireLibraryChanged({
				name: e,
				stereotype: "library",
				operation: "add",
				metadata: l
			});
		};
		u.prototype.includeLibraryTheme = function (l, v, Q) {
			if ((l != "sap.ui.legacy") && (l != "sap.ui.classic")) {
				if (!v) {
					v = "";
				}
				var b = (this.oConfiguration.getRTL() ? "-RTL" : "");
				var e, i = l + (v.length > 0 ? "-[" + v + "]" : v);
				if (l && l.indexOf(":") == -1) {
					e = "library" + v + b;
				} else {
					e = l.substring(l.indexOf(":") + 1) + v;
					l = l.substring(0, l.indexOf(":"));
				}
				var m = this._getThemePath(l, this.sTheme) + e + ".css" + (Q ? Q : "");
				q.sap.log.info("Including " + m + " -  sap.ui.core.Core.includeLibraryTheme()");
				q.sap.includeStyleSheet(m, "sap-ui-theme-" + i);
				var P = sap.ui.require("sap/ui/core/theming/Parameters");
				if (P) {
					P._addLibraryTheme(i);
				}
			}
		};
		u.prototype._getLibraryCssQueryParams = function (l) {
			var Q;
			if (this.oConfiguration["versionedLibCss"] && l) {
				Q = "?version=" + l.version;
				if (G.versioninfo) {
					Q += "&sap-ui-dist-version=" + G.versioninfo.version;
				}
			}
			return Q;
		};
		u.prototype.getLoadedLibraries = function () {
			return q.extend({}, this.mLibraries);
		};
		u.prototype.getLibraryResourceBundle = function (l, b, e) {
			var m, i, v, n;
			if (typeof l === "boolean") {
				e = l;
				l = undefined;
				b = undefined;
			}
			if (typeof b === "boolean") {
				e = b;
				b = undefined;
			}
			l = l || "sap.ui.core";
			b = b || this.getConfiguration().getLanguage();
			i = l + "/" + b;
			v = this.mResourceBundles[i];
			if (!v || (!e && v instanceof Promise)) {
				m = z(l);
				if (m && q.sap.Version(m._version).compareTo("1.9.0") >= 0) {
					n = m["sap.ui5"] && m["sap.ui5"].library && m["sap.ui5"].library.i18n;
				}
				if (n !== false) {
					v = q.sap.resources({
						url: sap.ui.resource(l, typeof n === "string" ? n : 'messagebundle.properties'),
						locale: b,
						async: e
					});
					if (v instanceof Promise) {
						v = v.then(function (o) {
							this.mResourceBundles[i] = o;
							return o;
						}.bind(this));
					}
					this.mResourceBundles[i] = v;
				}
			}
			return e ? Promise.resolve(v) : v;
		};
		u.prototype.setRoot = function (o, b) {
			if (b) {
				b.placeAt(o, "only");
			}
		};
		u.prototype.createUIArea = function (o) {
			var b = this;
			if (!o) {
				throw new Error("oDomRef must not be null");
			}
			if (typeof (o) === "string") {
				var i = o;
				if (i == S) {
					o = this.getStaticAreaRef();
				} else {
					o = q.sap.domById(o);
					if (!o) {
						throw new Error("DOM element with ID '" + i + "' not found in page, but application tries to insert content.");
					}
				}
			}
			if (!o.id || o.id.length == 0) {
				o.id = q.sap.uid();
			}
			var e = o.id;
			if (!this.mUIAreas[e]) {
				this.mUIAreas[e] = new U(this, o);
				if (!q.isEmptyObject(this.oModels)) {
					var p = {
						oModels: q.extend({}, this.oModels),
						oBindingContexts: {},
						aPropagationListeners: []
					};
					b.mUIAreas[e]._propagateProperties(true, b.mUIAreas[e], p, true);
				}
			} else {
				this.mUIAreas[e].setRootNode(o);
			}
			return this.mUIAreas[e];
		};
		u.prototype.getUIArea = function (o) {
			var i = "";
			if (typeof (o) == "string") {
				i = o;
			} else {
				i = o.id;
			}
			if (i) {
				return this.mUIAreas[i];
			}
			return null;
		};
		u.prototype.addInvalidatedUIArea = function (o) {
			if (!this._sRerenderTimer) {
				s.debug("Registering timer for delayed re-rendering");
				this._sRerenderTimer = q.sap.delayedCall(0, this, "renderPendingUIUpdates");
			}
		};
		u.MAX_RENDERING_ITERATIONS = 20;
		u.prototype.renderPendingUIUpdates = function (b) {
			s.debug("Render pending UI updates: start (" + (b || "by timer") + ")");
			q.sap.measure.start("renderPendingUIUpdates", "Render pending UI updates in all UIAreas");
			var e = false,
				l = u.MAX_RENDERING_ITERATIONS > 0,
				i = 0;
			this._bRendering = true;
			do {
				if (l) {
					i++;
					if (i > u.MAX_RENDERING_ITERATIONS) {
						this._bRendering = false;
						throw new Error("Rendering has been re-started too many times (" + i + "). Add URL parameter sap-ui-xx-debugRendering=true for a detailed analysis.");
					}
					if (i > 1) {
						s.debug("Render pending UI updates: iteration " + i);
					}
				}
				if (this._sRerenderTimer) {
					if (this._sRerenderTimer !== this) {
						q.sap.clearDelayedCall(this._sRerenderTimer);
					}
					this._sRerenderTimer = undefined;
				}
				this.runPrerenderingTasks();
				var m = this.mUIAreas;
				for (var n in m) {
					e = m[n].rerender() || e;
				}
			} while (l && this._sRerenderTimer);
			this._bRendering = false;
			if (e) {
				this.fireUIUpdated();
			}
			s.debug("Render pending UI updates: finished");
			q.sap.measure.end("renderPendingUIUpdates");
		};
		u.prototype.getUIDirty = function () {
			return !!(this._sRerenderTimer || this._bRendering);
		};
		u.prototype.attachUIUpdated = function (b, l) {
			_.attachEvent(u.M_EVENTS.UIUpdated, b, l);
		};
		u.prototype.detachUIUpdated = function (b, l) {
			_.detachEvent(u.M_EVENTS.UIUpdated, b, l);
		};
		u.prototype.fireUIUpdated = function (p) {
			_.fireEvent(u.M_EVENTS.UIUpdated, p);
		};
		u.prototype.notifyContentDensityChanged = function () {
			this.fireThemeChanged();
		};
		u.prototype.attachThemeChanged = function (b, l) {
			_.attachEvent(u.M_EVENTS.ThemeChanged, b, l);
		};
		u.prototype.detachThemeChanged = function (b, l) {
			_.detachEvent(u.M_EVENTS.ThemeChanged, b, l);
		};
		u.prototype.fireThemeChanged = function (p) {
			q.sap.scrollbarSize(true);
			var P = sap.ui.require("sap/ui/core/theming/Parameters");
			if (P) {
				P.reset(true);
			}
			var e = u.M_EVENTS.ThemeChanged;
			var o = q.Event(e);
			o.theme = p && p.theme || this.getConfiguration().getTheme();
			q.each(this.mElements, function (i, b) {
				b._handleEvent(o);
			});
			q.sap.act.refresh();
			_.fireEvent(e, p);
		};
		u.prototype.attachThemeScopingChanged = function (b, l) {
			_.attachEvent(u.M_EVENTS.ThemeScopingChanged, b, l);
		};
		u.prototype.detachThemeScopingChanged = function (b, l) {
			_.detachEvent(u.M_EVENTS.ThemeScopingChanged, b, l);
		};
		u.prototype.fireThemeScopingChanged = function (p) {
			_.fireEvent(u.M_EVENTS.ThemeScopingChanged, p);
		};
		u.prototype.attachLocalizationChanged = function (b, l) {
			_.attachEvent(u.M_EVENTS.LocalizationChanged, b, l);
		};
		u.prototype.detachLocalizationChanged = function (b, l) {
			_.detachEvent(u.M_EVENTS.LocalizationChanged, b, l);
		};
		u.prototype.fireLocalizationChanged = function (m) {
			var e = u.M_EVENTS.LocalizationChanged,
				b = q.Event(e, {
					changes: m
				}),
				i = M._handleLocalizationChange;
			q.sap.log.info("localization settings changed: " + Object.keys(m).join(","), null, "sap.ui.core.Core");
			q.each(this.oModels, function (N, o) {
				if (o && o._handleLocalizationChange) {
					o._handleLocalizationChange();
				}
			});

			function n(p) {
				q.each(this.mUIAreas, function () {
					i.call(this, p);
				});
				q.each(this.mObjects["component"], function () {
					i.call(this, p);
				});
				q.each(this.mElements, function () {
					i.call(this, p);
				});
			}
			n.call(this, 1);
			n.call(this, 2);
			if (m.rtl != undefined) {
				q(document.documentElement).attr("dir", m.rtl ? "rtl" : "ltr");
				this._updateThemeUrls(this.sTheme);
				q.each(this.mUIAreas, function () {
					this.invalidate();
				});
				q.sap.log.info("RTL mode " + m.rtl ? "activated" : "deactivated");
			}
			q.each(this.mElements, function (l, o) {
				this._handleEvent(b);
			});
			_.fireEvent(e, {
				changes: m
			});
		};
		u.prototype.attachLibraryChanged = function (b, l) {
			_.attachEvent(u.M_EVENTS.LibraryChanged, b, l);
		};
		u.prototype.detachLibraryChanged = function (b, l) {
			_.detachEvent(u.M_EVENTS.LibraryChanged, b, l);
		};
		u.prototype.fireLibraryChanged = function (p) {
			_.fireEvent(u.M_EVENTS.LibraryChanged, p);
		};
		u.prototype.applyChanges = function () {
			this.renderPendingUIUpdates("forced by applyChanges");
		};
		u.prototype.registerElementClass = function (m) {
			var n = m.getName(),
				l = m.getLibraryName() || "",
				o = this.mLibraries[l],
				b = f.prototype.isPrototypeOf(m.getClass().prototype) ? 'controls' : 'elements';
			if (!o) {
				q.sap.getObject(l, 0);
				o = this.mLibraries[l] = {
					name: l,
					dependencies: [],
					types: [],
					interfaces: [],
					controls: [],
					elements: []
				};
			}
			if (o[b].indexOf(n) < 0) {
				o[b].push(n);
				q.sap.log.debug("Class " + m.getName() + " registered for library " + m.getLibraryName());
				this.fireLibraryChanged({
					name: m.getName(),
					stereotype: m.getStereotype(),
					operation: "add",
					metadata: m
				});
			}
		};
		u.prototype.registerElement = function (e) {
			var i = e.getId(),
				o = this.mElements[i];
			if (o && o !== e) {
				if (o._sapui_candidateForDestroy) {
					q.sap.log.debug("destroying dangling template " + o + " when creating new object with same ID");
					o.destroy();
				} else {
					if (this.oConfiguration.getNoDuplicateIds()) {
						q.sap.log.error("adding element with duplicate id '" + i + "'");
						throw new Error("Error: adding element with duplicate id '" + i + "'");
					} else {
						q.sap.log.warning("adding element with duplicate id '" + i + "'");
					}
				}
			}
			this.mElements[i] = e;
		};
		u.prototype.deregisterElement = function (e) {
			delete this.mElements[e.getId()];
		};
		u.prototype.registerObject = function (o) {
			var i = o.getId(),
				b = o.getMetadata().getStereotype(),
				e = this.getObject(b, i);
			if (e && e !== o) {
				q.sap.log.error("adding object \"" + b + "\" with duplicate id '" + i + "'");
				throw new Error("Error: adding object \"" + b + "\" with duplicate id '" + i + "'");
			}
			this.mObjects[b][i] = o;
		};
		u.prototype.deregisterObject = function (o) {
			var i = o.getId(),
				b = o.getMetadata().getStereotype();
			delete this.mObjects[b][i];
		};
		u.prototype.byId = function (i) {
			return i == null ? undefined : this.mElements[i];
		};
		u.prototype.getControl = u.prototype.byId;
		u.prototype.getElementById = u.prototype.byId;
		u.prototype.getObject = function (b, i) {
			return i == null ? undefined : this.mObjects[b] && this.mObjects[b][i];
		};
		u.prototype.getComponent = function (i) {
			return this.getObject("component", i);
		};
		u.prototype.getTemplate = function (i) {
			var b = sap.ui.requireSync('sap/ui/core/tmpl/Template');
			return b.byId(i);
		};
		u.prototype.getStaticAreaRef = function () {
			var o = q.sap.domById(S);
			if (!o) {
				if (!this.bDomReady) {
					throw new Error("DOM is not ready yet. Static UIArea cannot be created.");
				}
				var b = {
					id: S
				};
				if (q("body").attr("role") != "application") {
					b.role = "application";
				}
				var l = this.getConfiguration().getRTL() ? "right" : "left";
				o = q("<DIV/>", b).css({
					"height": "0",
					"width": "0",
					"overflow": "hidden",
					"float": l
				}).prependTo(document.body)[0];
				this.createUIArea(o).bInitial = false;
			}
			return o;
		};
		u.prototype.isStaticAreaRef = function (o) {
			return o && (o.id === S);
		};
		u._I_INTERVAL = 200;
		j.prototype.I_INTERVAL = u._I_INTERVAL;
		u.prototype.attachIntervalTimer = function (b, l) {
			if (!this.oTimedTrigger) {
				var e = sap.ui.requireSync("sap/ui/core/IntervalTrigger");
				this.oTimedTrigger = new e(u._I_INTERVAL);
			}
			this.oTimedTrigger.addListener(b, l);
		};
		u.prototype.detachIntervalTimer = function (b, l) {
			if (this.oTimedTrigger) {
				this.oTimedTrigger.removeListener(b, l);
			}
		};
		u.prototype.attachControlEvent = function (b, l) {
			_.attachEvent(u.M_EVENTS.ControlEvent, b, l);
		};
		u.prototype.detachControlEvent = function (b, l) {
			_.detachEvent(u.M_EVENTS.ControlEvent, b, l);
		};
		u.prototype.fireControlEvent = function (p) {
			_.fireEvent(u.M_EVENTS.ControlEvent, p);
		};
		u.prototype._handleControlEvent = function (e, b) {
			var o = q.Event(e.type);
			q.extend(o, e);
			o.originalEvent = undefined;
			this.fireControlEvent({
				"browserEvent": o,
				"uiArea": b
			});
		};
		u.prototype.getApplication = function () {
			return sap.ui.getApplication && sap.ui.getApplication();
		};
		u.prototype.registerPlugin = function (p) {
			if (!p) {
				return;
			}
			for (var i = 0, l = this.aPlugins.length; i < l; i++) {
				if (this.aPlugins[i] === p) {
					return;
				}
			}
			this.aPlugins.push(p);
			if (this.bInitialized && p && p.startPlugin) {
				p.startPlugin(this);
			}
		};
		u.prototype.unregisterPlugin = function (p) {
			if (!p) {
				return;
			}
			var P = -1;
			for (var i = this.aPlugins.length; i--; i >= 0) {
				if (this.aPlugins[i] === p) {
					P = i;
					break;
				}
			}
			if (P == -1) {
				return;
			}
			if (this.bInitialized && p && p.stopPlugin) {
				p.stopPlugin(this);
			}
			this.aPlugins.splice(P, 1);
		};
		u.prototype.startPlugins = function () {
			for (var i = 0, l = this.aPlugins.length; i < l; i++) {
				var p = this.aPlugins[i];
				if (p && p.startPlugin) {
					p.startPlugin(this, true);
				}
			}
		};
		u.prototype.stopPlugins = function () {
			for (var i = 0, l = this.aPlugins.length; i < l; i++) {
				var p = this.aPlugins[i];
				if (p && p.stopPlugin) {
					p.stopPlugin(this);
				}
			}
		};
		u.prototype.setModel = function (m, n) {
			var b = this,
				p;
			if (!m && this.oModels[n]) {
				delete this.oModels[n];
				if (q.isEmptyObject(b.oModels) && q.isEmptyObject(b.oBindingContexts)) {
					p = M._oEmptyPropagatedProperties;
				} else {
					p = {
						oModels: q.extend({}, b.oModels),
						oBindingContexts: {},
						aPropagationListeners: []
					};
				}
				q.each(this.mUIAreas, function (i, o) {
					if (m != o.getModel(n)) {
						o._propagateProperties(n, o, p, false, n);
					}
				});
			} else if (m && m !== this.oModels[n]) {
				this.oModels[n] = m;
				q.each(this.mUIAreas, function (i, o) {
					if (m != o.getModel(n)) {
						var p = {
							oModels: q.extend({}, b.oModels),
							oBindingContexts: {},
							aPropagationListeners: []
						};
						o._propagateProperties(n, o, p, false, n);
					}
				});
			}
			return this;
		};
		u.prototype.setMessageManager = function (m) {
			this.oMessageManager = m;
		};
		u.prototype.getMessageManager = function () {
			if (!this.oMessageManager) {
				this.oMessageManager = new k();
			}
			return this.oMessageManager;
		};
		u.prototype.byFieldGroupId = function (v) {
			var b = [];
			for (var n in this.mElements) {
				var e = this.mElements[n];
				if (e instanceof f && e.checkFieldGroupIds(v)) {
					b.push(e);
				}
			}
			return b;
		};
		u.prototype.getModel = function (n) {
			return this.oModels[n];
		};
		u.prototype.hasModel = function () {
			return !q.isEmptyObject(this.oModels);
		};
		u.prototype.getEventBus = function () {
			if (!this.oEventBus) {
				var b = sap.ui.requireSync('sap/ui/core/EventBus');
				this.oEventBus = new b();
			}
			return this.oEventBus;
		};
		u.prototype.attachValidationError = function (o, b, l) {
			if (typeof (o) === "function") {
				l = b;
				b = o;
				o = undefined;
			}
			_.attachEvent(u.M_EVENTS.ValidationError, o, b, l);
			return this;
		};
		u.prototype.detachValidationError = function (b, l) {
			_.detachEvent(u.M_EVENTS.ValidationError, b, l);
			return this;
		};
		u.prototype.attachParseError = function (o, b, l) {
			if (typeof (o) === "function") {
				l = b;
				b = o;
				o = undefined;
			}
			_.attachEvent(u.M_EVENTS.ParseError, o, b, l);
			return this;
		};
		u.prototype.detachParseError = function (b, l) {
			_.detachEvent(u.M_EVENTS.ParseError, b, l);
			return this;
		};
		u.prototype.attachFormatError = function (o, b, l) {
			if (typeof (o) === "function") {
				l = b;
				b = o;
				o = undefined;
			}
			_.attachEvent(u.M_EVENTS.FormatError, o, b, l);
			return this;
		};
		u.prototype.detachFormatError = function (b, l) {
			_.detachEvent(u.M_EVENTS.FormatError, b, l);
			return this;
		};
		u.prototype.attachValidationSuccess = function (o, b, l) {
			if (typeof (o) === "function") {
				l = b;
				b = o;
				o = undefined;
			}
			_.attachEvent(u.M_EVENTS.ValidationSuccess, o, b, l);
			return this;
		};
		u.prototype.detachValidationSuccess = function (b, l) {
			_.detachEvent(u.M_EVENTS.ValidationSuccess, b, l);
			return this;
		};
		u.prototype.fireParseError = function (m) {
			_.fireEvent(u.M_EVENTS.ParseError, m);
			return this;
		};
		u.prototype.fireValidationError = function (m) {
			_.fireEvent(u.M_EVENTS.ValidationError, m);
			return this;
		};
		u.prototype.fireFormatError = function (m) {
			_.fireEvent(u.M_EVENTS.FormatError, m);
			return this;
		};
		u.prototype.fireValidationSuccess = function (m) {
			_.fireEvent(u.M_EVENTS.ValidationSuccess, m);
			return this;
		};
		u.prototype.isMobile = function () {
			return D.browser.mobile;
		};
		u.prototype._getEventProvider = function () {
			return _;
		};
		u.prototype.addPrerenderingTask = function (p, b) {
			if (b) {
				this.aPrerenderingTasks.unshift(p);
			} else {
				this.aPrerenderingTasks.push(p);
			}
			this.addInvalidatedUIArea();
		};
		u.prototype.runPrerenderingTasks = function () {
			var b = this.aPrerenderingTasks.slice();
			this.aPrerenderingTasks = [];
			b.forEach(function (p) {
				p();
			});
		};
		u.prototype.destroy = function () {
			this.oFocusHandler.destroy();
			_.destroy();
			c.prototype.destroy.call(this);
		};
		sap.ui.setRoot = function (o, b) {
			sap.ui.getCore().setRoot(o, b);
		};
		return new u().getInterface();
	});
	sap.ui.predefine('sap/ui/core/CustomStyleClassSupport', ['jquery.sap.global', './Element'], function (q, E) {
		"use strict";
		var C = function () {
			if (!(this instanceof E)) {
				return;
			}
			var o = this.clone;
			this.clone = function () {
				var c = o.apply(this, arguments);
				if (this.aCustomStyleClasses) {
					c.aCustomStyleClasses = this.aCustomStyleClasses.slice();
				}
				if (this.mCustomStyleClassMap) {
					c.mCustomStyleClassMap = q.extend({}, this.mCustomStyleClassMap);
				}
				return c;
			};
			var r = /\S+/g;
			this.addStyleClass = function (s, S) {
				var c, m = false;
				var a = [],
					b = g();
				if (!this.aCustomStyleClasses) {
					this.aCustomStyleClasses = [];
				}
				if (!this.mCustomStyleClassMap) {
					this.mCustomStyleClassMap = {};
				}
				if (s && typeof s === "string") {
					if (s.indexOf("\"") > -1) {
						return this;
					}
					if (s.indexOf("'") > -1) {
						return this;
					}
					c = s.match(r) || [];
					c.forEach(function (d) {
						if (!this.mCustomStyleClassMap[d]) {
							this.mCustomStyleClassMap[d] = true;
							this.aCustomStyleClasses.push(d);
							if (b && b.indexOf(d) > -1) {
								a.push(d);
							}
							m = true;
						}
					}.bind(this));
					if (!m) {
						return this;
					}
					var R = this.getDomRef();
					if (R) {
						q(R).addClass(s);
					} else if (S === false) {
						this.invalidate();
					}
					if (a.length > 0) {
						f(this, a, true);
					}
				}
				return this;
			};
			this.removeStyleClass = function (s, S) {
				var c, e = false,
					n;
				var a = [],
					b = g();
				if (s && typeof s === "string" && this.aCustomStyleClasses && this.mCustomStyleClassMap) {
					c = s.match(r) || [];
					c.forEach(function (d) {
						if (this.mCustomStyleClassMap[d]) {
							e = true;
							n = this.aCustomStyleClasses.indexOf(d);
							if (n !== -1) {
								this.aCustomStyleClasses.splice(n, 1);
								delete this.mCustomStyleClassMap[d];
								if (b && b.indexOf(d) > -1) {
									a.push(d);
								}
							}
						}
					}.bind(this));
				}
				if (e) {
					var R = this.getDomRef();
					if (R) {
						q(R).removeClass(s);
					} else if (S === false) {
						this.invalidate();
					}
					if (a.length > 0) {
						f(this, a, false);
					}
				}
				return this;
			};
			this.toggleStyleClass = function (s, a) {
				if (s && typeof s === "string") {
					if (a === true) {
						this.addStyleClass(s);
					} else if (a === false) {
						this.removeStyleClass(s);
					} else if (a === undefined) {
						this.hasStyleClass(s) ? this.removeStyleClass(s) : this.addStyleClass(s);
					} else {
						q.sap.log.warning(this.toString() + "- toggleStyleClass(): bAdd should be a boolean or undefined, but is '" + a + "'");
					}
				}
				return this;
			};
			this.hasStyleClass = function (s) {
				var c;
				if (s && typeof s === "string" && this.mCustomStyleClassMap) {
					c = s.match(r) || [];
					return c.length !== 0 && c.every(function (a) {
						return this.mCustomStyleClassMap[a];
					}.bind(this));
				}
				return false;
			};
			this.getMetadata().addPublicMethods(["addStyleClass", "removeStyleClass", "toggleStyleClass", "hasStyleClass"]);
		};
		var P;

		function g() {
			if (!P) {
				P = sap.ui.require("sap/ui/core/theming/Parameters");
			}
			if (P) {
				return P._getScopes(true);
			}
		}

		function f(e, s, i) {
			sap.ui.getCore().fireThemeScopingChanged({
				scopes: s,
				added: i,
				element: e
			});
		}
		return C;
	}, true);
	sap.ui.predefine('sap/ui/core/Element', ['jquery.sap.global', '../base/Object', '../base/ManagedObject', './ElementMetadata', '../Device', 'jquery.sap.strings', 'jquery.sap.trace'], function (q, B, M, E, D) {
		"use strict";
		var a = M.extend("sap.ui.core.Element", {
			metadata: {
				stereotype: "element",
				"abstract": true,
				publicMethods: ["getId", "getMetadata", "getTooltip_AsString", "getTooltip_Text", "getModel", "setModel", "hasModel", "bindElement", "unbindElement", "getElementBinding", "prop", "getLayoutData", "setLayoutData"],
				library: "sap.ui.core",
				aggregations: {
					tooltip: {
						name: "tooltip",
						type: "sap.ui.core.TooltipBase",
						altTypes: ["string"],
						multiple: false
					},
					customData: {
						name: "customData",
						type: "sap.ui.core.CustomData",
						multiple: true,
						singularName: "customData"
					},
					layoutData: {
						name: "layoutData",
						type: "sap.ui.core.LayoutData",
						multiple: false,
						singularName: "layoutData"
					},
					dependents: {
						name: "dependents",
						type: "sap.ui.core.Element",
						multiple: true
					}
				}
			},
			constructor: function (i, s) {
				M.apply(this, arguments);
			},
			renderer: null
		}, E);
		a.defineClass = function (c, s, m) {
			return B.defineClass(c, s, m || E);
		};
		a.prototype.getInterface = function () {
			return this;
		};
		a.prototype._handleEvent = function (e) {
			var t = this,
				h = "on" + e.type;

			function b(d) {
				var i, l, o;
				if (d && (l = d.length) > 0) {
					d = l === 1 ? d : d.slice();
					for (i = 0; i < l; i++) {
						if (e.isImmediateHandlerPropagationStopped()) {
							return;
						}
						o = d[i].oDelegate;
						if (o[h]) {
							o[h].call(d[i].vThis === true ? t : d[i].vThis || o, e);
						}
					}
				}
			}
			b(this.aBeforeDelegates);
			if (e.isImmediateHandlerPropagationStopped()) {
				return;
			}
			if (this[h]) {
				this[h](e);
			}
			b(this.aDelegates);
		};
		a.create = M.create;
		a.prototype.toString = function () {
			return "Element " + this.getMetadata().getName() + "#" + this.sId;
		};
		a.prototype.getDomRef = function (s) {
			return q.sap.domById(s ? this.getId() + "-" + s : this.getId());
		};
		a.prototype.$ = function (s) {
			return q(this.getDomRef(s));
		};
		a.prototype.isActive = function () {
			return this.oParent && this.oParent.isActive();
		};
		a.prototype.prop = function (p, v) {
			var P = this.getMetadata().getAllSettings()[p];
			if (P) {
				if (arguments.length == 1) {
					return this[P._sGetter]();
				} else {
					this[P._sMutator](v);
					return this;
				}
			}
		};
		a.prototype.insertDependent = function (e, i) {
			return this.insertAggregation("dependents", e, i, true);
		};
		a.prototype.addDependent = function (e) {
			return this.addAggregation("dependents", e, true);
		};
		a.prototype.removeDependent = function (e) {
			return this.removeAggregation("dependents", e, true);
		};
		a.prototype.removeAllDependents = function () {
			return this.removeAllAggregation("dependents", true);
		};
		a.prototype.destroyDependents = function () {
			return this.destroyAggregation("dependents", true);
		};
		a.prototype.rerender = function () {
			if (this.oParent) {
				this.oParent.rerender();
			}
		};
		a.prototype.getUIArea = function () {
			return this.oParent ? this.oParent.getUIArea() : null;
		};
		a.prototype.destroy = function (s) {
			a._updateFocusInfo(this);
			M.prototype.destroy.call(this, s);
			if (s !== "KeepDom" || this.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")) {
				this.$().remove();
			} else {
				q.sap.log.debug("DOM is not removed on destroy of " + this);
			}
		};
		a.prototype.fireEvent = function (e, p, A, b) {
			if (this.hasListeners(e)) {
				q.sap.interaction.notifyStepStart(this);
			}
			if (typeof p === 'boolean') {
				b = A;
				A = p;
				p = null;
			}
			p = p || {};
			p.id = p.id || this.getId();
			return M.prototype.fireEvent.call(this, e, p, A, b);
		};
		a.prototype.addDelegate = function (d, c, t, C) {
			if (!d) {
				return this;
			}
			this.removeDelegate(d);
			if (typeof c === "object") {
				C = t;
				t = c;
				c = false;
			}
			if (typeof t === "boolean") {
				C = t;
				t = undefined;
			}(c ? this.aBeforeDelegates : this.aDelegates).push({
				oDelegate: d,
				bClone: !!C,
				vThis: ((t === this) ? true : t)
			});
			return this;
		};
		a.prototype.removeDelegate = function (d) {
			var i;
			for (i = 0; i < this.aDelegates.length; i++) {
				if (this.aDelegates[i].oDelegate == d) {
					this.aDelegates.splice(i, 1);
					i--;
				}
			}
			for (i = 0; i < this.aBeforeDelegates.length; i++) {
				if (this.aBeforeDelegates[i].oDelegate == d) {
					this.aBeforeDelegates.splice(i, 1);
					i--;
				}
			}
			return this;
		};
		a.prototype.addEventDelegate = function (d, t) {
			return this.addDelegate(d, false, t, true);
		};
		a.prototype.removeEventDelegate = function (d) {
			return this.removeDelegate(d);
		};
		a.prototype.getFocusDomRef = function () {
			return this.getDomRef() || null;
		};
		a.prototype.focus = function () {
			q.sap.focus(this.getFocusDomRef());
		};
		a.prototype.getFocusInfo = function () {
			return {
				id: this.getId()
			};
		};
		a.prototype.applyFocusInfo = function (f) {
			this.focus();
			return this;
		};
		a.prototype._refreshTooltipBaseDelegate = function (t) {
			var T = sap.ui.require('sap/ui/core/TooltipBase');
			if (T) {
				var o = this.getTooltip();
				if (o instanceof T) {
					this.removeDelegate(o);
				}
				if (t instanceof T) {
					t._currentControl = this;
					this.addDelegate(t);
				}
			}
		};
		a.prototype.setTooltip = function (t) {
			this._refreshTooltipBaseDelegate(t);
			this.setAggregation("tooltip", t);
			return this;
		};
		a.prototype.getTooltip = function () {
			return this.getAggregation("tooltip");
		};
		a.runWithPreprocessors = M.runWithPreprocessors;
		a.prototype.getTooltip_AsString = function () {
			var t = this.getTooltip();
			if (typeof t === "string" || t instanceof String) {
				return t;
			}
			return undefined;
		};
		a.prototype.getTooltip_Text = function () {
			var t = this.getTooltip();
			if (t && typeof t.getText === "function") {
				return t.getText();
			}
			return t;
		};
		(function () {
			var g = function (e, k) {
				var d = e.getAggregation("customData");
				if (d) {
					for (var i = 0; i < d.length; i++) {
						if (d[i].getKey() == k) {
							return d[i];
						}
					}
				}
				return null;
			};
			var s = function (e, k, v, w) {
				if (v === null) {
					var d = g(e, k);
					if (!d) {
						return;
					}
					var b = e.getAggregation("customData").length;
					if (b == 1) {
						e.destroyAggregation("customData", true);
					} else {
						e.removeAggregation("customData", d, true);
						d.destroy();
					}
				} else {
					var C = sap.ui.requireSync('sap/ui/core/CustomData');
					var d = g(e, k);
					if (d) {
						d.setValue(v);
						d.setWriteToDom(w);
					} else {
						var d = new C({
							key: k,
							value: v,
							writeToDom: w
						});
						e.addAggregation("customData", d, true);
					}
				}
			};
			a.prototype.data = function () {
				var b = arguments.length;
				if (b == 0) {
					var d = this.getAggregation("customData"),
						r = {};
					if (d) {
						for (var i = 0; i < d.length; i++) {
							r[d[i].getKey()] = d[i].getValue();
						}
					}
					return r;
				} else if (b == 1) {
					var c = arguments[0];
					if (c === null) {
						this.destroyAggregation("customData", true);
						return this;
					} else if (typeof c == "string") {
						var e = g(this, c);
						return e ? e.getValue() : null;
					} else if (typeof c == "object") {
						for (var k in c) {
							s(this, k, c[k]);
						}
						return this;
					} else {
						throw new Error("When data() is called with one argument, this argument must be a string, an object or null, but is " + (typeof c) + ":" + c + " (on UI Element with ID '" + this.getId() + "')");
					}
				} else if (b == 2) {
					s(this, arguments[0], arguments[1]);
					return this;
				} else if (b == 3) {
					s(this, arguments[0], arguments[1], arguments[2]);
					return this;
				} else {
					throw new Error("data() may only be called with 0-3 arguments (on UI Element with ID '" + this.getId() + "')");
				}
			};
		})();
		a.prototype.clone = function (I, l) {
			var c = M.prototype.clone.apply(this, arguments);
			for (var i = 0; i < this.aDelegates.length; i++) {
				if (this.aDelegates[i].bClone) {
					c.aDelegates.push(this.aDelegates[i]);
				}
			}
			for (var i = 0; i < this.aBeforeDelegates.length; i++) {
				if (this.aBeforeDelegates[i].bClone) {
					c.aBeforeDelegates.push(this.aBeforeDelegates[i]);
				}
			}
			if (this._sapui_declarativeSourceInfo) {
				c._sapui_declarativeSourceInfo = q.extend({}, this._sapui_declarativeSourceInfo);
			}
			return c;
		};
		a.prototype.findElements = M.prototype.findAggregatedObjects;
		a.prototype.setLayoutData = function (l) {
			this.setAggregation("layoutData", l, true);
			var L = this.getParent();
			if (L) {
				var e = q.Event("LayoutDataChange");
				e.srcControl = this;
				L._handleEvent(e);
			}
			return this;
		};
		a.prototype.bindElement = M.prototype.bindObject;
		a.prototype.unbindElement = M.prototype.unbindObject;
		a.prototype.getElementBinding = M.prototype.getObjectBinding;
		a.prototype._getFieldGroupIds = function () {
			var f;
			if (this.getMetadata().hasProperty("fieldGroupIds")) {
				f = this.getFieldGroupIds();
			}
			if (!f || f.length == 0) {
				var p = this.getParent();
				if (p && p._getFieldGroupIds) {
					return p._getFieldGroupIds();
				}
			}
			return f || [];
		};
		a.prototype._getMediaContainerWidth = function () {
			if (typeof this._oContextualSettings === "undefined") {
				return undefined;
			}
			return this._oContextualSettings.contextualWidth;
		};
		a.prototype._getCurrentMediaContainerRange = function (n) {
			var w = this._getMediaContainerWidth();
			n = n || D.media.RANGESETS.SAP_STANDARD;
			return D.media.getCurrentRange(n, w);
		};
		a.prototype._onContextualSettingsChanged = function () {
			var w = this._getMediaContainerWidth(),
				s = w !== undefined,
				p = s ^ !!this._bUsingContextualWidth,
				l = this._aContextualWidthListeners || [];
			if (p) {
				if (s) {
					l.forEach(function (L) {
						D.media.detachHandler(L.callback, L.listener, L.name);
					});
				} else {
					l.forEach(function (L) {
						D.media.attachHandler(L.callback, L.listener, L.name);
					});
				}
				this._bUsingContextualWidth = s;
			}
			l.forEach(function (L) {
				var m = this._getCurrentMediaContainerRange(L.name);
				if (m.from !== L.media.from) {
					L.media = m;
					L.callback.call(L.listener || window, m);
				}
			}, this);
		};
		a.prototype._attachMediaContainerWidthChange = function (f, l, n) {
			n = n || D.media.RANGESETS.SAP_STANDARD;
			this._aContextualWidthListeners = this._aContextualWidthListeners || [];
			this._aContextualWidthListeners.push({
				callback: f,
				listener: l,
				name: n,
				media: this._getCurrentMediaContainerRange(n)
			});
			if (!this._bUsingContextualWidth) {
				D.media.attachHandler(f, l, n);
			}
		};
		a.prototype._detachMediaContainerWidthChange = function (f, l, n) {
			var L;
			n = n || D.media.RANGESETS.SAP_STANDARD;
			if (!this._aContextualWidthListeners) {
				return;
			}
			for (var i = 0, b = this._aContextualWidthListeners.length; i < b; i++) {
				L = this._aContextualWidthListeners[i];
				if (L.callback === f && L.listener === l && L.name === n) {
					if (!this._bUsingContextualWidth) {
						D.media.detachHandler(f, l, n);
					}
					this._aContextualWidthListeners.splice(i, 1);
					break;
				}
			}
		};
		return a;
	});
	sap.ui.predefine('sap/ui/core/ElementMetadata', ['jquery.sap.global', 'sap/ui/base/ManagedObjectMetadata'], function (q, M) {
		"use strict";
		var E = function (c, C) {
			M.apply(this, arguments);
		};
		E.prototype = Object.create(M.prototype);
		E.uid = M.uid;
		E.prototype.getElementName = function () {
			return this._sClassName;
		};
		E.prototype.getRendererName = function () {
			return this._sRendererName;
		};
		E.prototype.getRenderer = function () {
			var r = this.getRendererName();
			if (!r) {
				return;
			}
			var R = q.sap.getObject(r);
			if (R) {
				return R;
			}
			q.sap.require(r);
			return q.sap.getObject(r);
		};
		E.prototype.applySettings = function (c) {
			var s = c.metadata;
			this._sVisibility = s["visibility"] || "public";
			var r = c.hasOwnProperty("renderer") ? (c.renderer || "") : undefined;
			delete c.renderer;
			M.prototype.applySettings.call(this, c);
			this._sRendererName = this.getName() + "Renderer";
			if (typeof r !== "undefined") {
				if (typeof r === "string") {
					this._sRendererName = r || undefined;
					return;
				}
				if (typeof r === "function") {
					r = {
						render: r
					};
				}
				var p = this.getParent();
				var b;
				if (p instanceof E) {
					b = p.getRenderer();
				}
				if (!b) {
					b = sap.ui.requireSync('sap/ui/core/Renderer');
				}
				var R = Object.create(b);
				q.extend(R, r);
				q.sap.setObject(this.getRendererName(), R);
			}
		};
		E.prototype.afterApplySettings = function () {
			M.prototype.afterApplySettings.apply(this, arguments);
			this.register && this.register(this);
		};
		E.prototype.isHidden = function () {
			return this._sVisibility === "hidden";
		};
		return E;
	}, true);
	sap.ui.predefine('sap/ui/core/FocusHandler', ['jquery.sap.global', '../Device', '../base/Object', 'jquery.sap.script'], function (q, D, B) {
		"use strict";
		var F = B.extend("sap.ui.core.FocusHandler", {
			constructor: function (r, c) {
				B.apply(this);
				this.oCore = c;
				this.oCurrent = null;
				this.oLast = null;
				this.aEventQueue = [];
				this.oLastFocusedControlInfo = null;
				this.fEventHandler = q.proxy(this.onEvent, this);
				if (r.addEventListener && !D.browser.msie) {
					r.addEventListener("focus", this.fEventHandler, true);
					r.addEventListener("blur", this.fEventHandler, true);
				} else {
					q(r).bind("activate", this.fEventHandler);
					q(r).bind("deactivate", this.fEventHandler);
				}
				q.sap.log.debug("FocusHandler setup on Root " + r.type + (r.id ? ": " + r.id : ""), null, "sap.ui.core.FocusHandler");
			}
		});
		F.prototype.getCurrentFocusedControlId = function () {
			var c = null;
			try {
				var a = q(document.activeElement);
				if (a.is(":focus")) {
					c = a.control();
				}
			} catch (e) {}
			return c && c.length > 0 ? c[0].getId() : null;
		};
		F.prototype.getControlFocusInfo = function (c) {
			c = c || this.getCurrentFocusedControlId();
			if (!c) {
				return null;
			}
			var C = this.oCore && this.oCore.byId(c);
			if (C) {
				return {
					id: c,
					control: C,
					info: C.getFocusInfo(),
					type: C.getMetadata().getName(),
					focusref: C.getFocusDomRef()
				};
			}
			return null;
		};
		F.prototype.updateControlFocusInfo = function (c) {
			if (c && this.oLastFocusedControlInfo && this.oLastFocusedControlInfo.control === c) {
				var C = c.getId();
				this.oLastFocusedControlInfo = this.getControlFocusInfo(C);
				q.sap.log.debug("Update focus info of control " + C, null, "sap.ui.core.FocusHandler");
			}
		};
		F.prototype.restoreFocus = function (c) {
			var i = c || this.oLastFocusedControlInfo;
			if (!i) {
				return;
			}
			var C = this.oCore && this.oCore.byId(i.id);
			if (C && i.info && C.getMetadata().getName() == i.type && C.getFocusDomRef() != i.focusref && (c || C !== i.control)) {
				q.sap.log.debug("Apply focus info of control " + i.id, null, "sap.ui.core.FocusHandler");
				i.control = C;
				this.oLastFocusedControlInfo = i;
				C.applyFocusInfo(i.info);
			} else {
				q.sap.log.debug("Apply focus info of control " + i.id + " not possible", null, "sap.ui.core.FocusHandler");
			}
		};
		F.prototype.destroy = function (e) {
			var r = e.data.oRootRef;
			if (r) {
				if (r.removeEventListener && !D.browser.msie) {
					r.removeEventListener("focus", this.fEventHandler, true);
					r.removeEventListener("blur", this.fEventHandler, true);
				} else {
					q(r).unbind("activate", this.fEventHandler);
					q(r).unbind("deactivate", this.fEventHandler);
				}
			}
			this.oCore = null;
		};
		F.prototype.onEvent = function (b) {
			var e = q.event.fix(b);
			q.sap.log.debug("Event " + e.type + " reached Focus Handler (target: " + e.target + (e.target ? e.target.id : "") + ")", null, "sap.ui.core.FocusHandler");
			var a = (e.type == "focus" || e.type == "focusin" || e.type == "activate") ? "focus" : "blur";
			this.aEventQueue.push({
				type: a,
				controlId: g(e.target)
			});
			if (this.aEventQueue.length == 1) {
				this.processEvent();
			}
		};
		F.prototype.processEvent = function () {
			var e = this.aEventQueue[0];
			if (!e) {
				return;
			}
			try {
				if (e.type == "focus") {
					this.onfocusEvent(e.controlId);
				} else if (e.type == "blur") {
					this.onblurEvent(e.controlId);
				}
			} finally {
				this.aEventQueue.shift();
				if (this.aEventQueue.length > 0) {
					this.processEvent();
				}
			}
		};
		F.prototype.onfocusEvent = function (c) {
			var C = this.oCore && this.oCore.byId(c);
			if (C) {
				this.oLastFocusedControlInfo = this.getControlFocusInfo(c);
				q.sap.log.debug("Store focus info of control " + c, null, "sap.ui.core.FocusHandler");
			}
			this.oCurrent = c;
			if (!this.oLast) {
				return;
			}
			if (this.oLast != this.oCurrent) {
				t(this.oLast, c, this.oCore);
			}
			this.oLast = null;
		};
		F.prototype.onblurEvent = function (c) {
			if (!this.oCurrent) {
				return;
			}
			this.oLast = c;
			this.oCurrent = null;
			q.sap.delayedCall(0, this, "checkForLostFocus");
		};
		F.prototype.checkForLostFocus = function () {
			if (this.oCurrent == null && this.oLast != null) {
				t(this.oLast, null, this.oCore);
			}
			this.oLast = null;
		};
		var g = function (d) {
			var i = q(d).closest("[data-sap-ui]").attr("id");
			if (i) {
				return i;
			}
			return null;
		};
		var t = function (c, r, C) {
			var o = c ? C && C.byId(c) : null;
			if (o) {
				var R = r ? C.byId(r) : null;
				var e = q.Event("sapfocusleave");
				e.target = o.getDomRef();
				e.relatedControlId = R ? R.getId() : null;
				e.relatedControlFocusInfo = R ? R.getFocusInfo() : null;
				var a = o.getUIArea();
				var u = null;
				if (a) {
					u = C.getUIArea(a.getId());
				} else {
					var p = C.getStaticAreaRef();
					if (q.sap.containsOrEquals(p, e.target)) {
						u = C.getUIArea(p.id);
					}
				}
				if (u) {
					u._handleEvent(e);
				}
			}
		};
		return F;
	});
	sap.ui.predefine('sap/ui/core/LabelEnablement', ['jquery.sap.global', '../base/ManagedObject'], function (q, M) {
		"use strict";

		function l(o, m) {
			var F = sap.ui.require(m);
			return typeof F === 'function' && (o instanceof F);
		}
		var C = {};
		var N = ["sap.m.Link", "sap.m.Select", "sap.m.Label", "sap.m.Text"];

		function t(i, I) {
			if (!i) {
				return null;
			}
			var o = sap.ui.getCore().byId(i);
			if (o && I && (!l(o, 'sap/ui/core/Control') || o.getDomRef())) {
				o.invalidate();
			}
			return o;
		}

		function f(d) {
			var i = d.getLabelFor() || d._sAlternativeId || '';
			return i;
		}

		function r(o, d) {
			var s = o.getId();
			var O = o.__sLabeledControl;
			var n = d ? null : f(o);
			if (O == n) {
				return;
			}
			if (!d) {
				o.invalidate();
			}
			if (n) {
				o.__sLabeledControl = n;
			} else {
				delete o.__sLabeledControl;
			}
			var e;
			if (O) {
				e = C[O];
				if (e) {
					e = e.filter(function (i) {
						return i != s;
					});
					if (e.length) {
						C[O] = e;
					} else {
						delete C[O];
					}
				}
			}
			if (n) {
				e = C[n] || [];
				e.push(s);
				C[n] = e;
			}
			var g = t(O, true);
			var h = t(n, true);
			if (g) {
				o.detachRequiredChange(g);
			}
			if (h) {
				o.attachRequiredChange(h);
			}
		}

		function c(o) {
			if (!o) {
				throw new Error("sap.ui.core.LabelEnablement cannot enrich null");
			}
			var m = o.getMetadata();
			if (!m.isInstanceOf("sap.ui.core.Label")) {
				throw new Error("sap.ui.core.LabelEnablement only supports Controls with interface sap.ui.core.Label");
			}
			var d = m.getAssociation("labelFor");
			if (!d || d.multiple) {
				throw new Error("sap.ui.core.LabelEnablement only supports Controls with a to-1 association 'labelFor'");
			}
		}

		function a(o) {
			if (!o) {
				return true;
			}
			var n = o.getMetadata().getName();
			return N.indexOf(n) < 0;
		}
		var L = {};
		L.writeLabelForAttribute = function (R, o) {
			if (!o || !o.getLabelForRendering) {
				return;
			}
			var s = o.getLabelForRendering();
			if (!s) {
				return;
			}
			var d = t(s);
			if (d && d.getIdForLabel) {
				s = d.getIdForLabel();
			}
			if (s && a(d)) {
				R.writeAttributeEscaped("for", s);
			}
		};
		L.getReferencingLabels = function (e) {
			var i = e ? e.getId() : null;
			if (!i) {
				return [];
			}
			return C[i] || [];
		};
		L.isRequired = function (e) {
			if (b(e)) {
				return true;
			}
			var d = L.getReferencingLabels(e),
				o;
			for (var i = 0; i < d.length; i++) {
				o = sap.ui.getCore().byId(d[i]);
				if (b(o)) {
					return true;
				}
			}
			return false;
		};

		function b(e) {
			return !!(e && e.getRequired && e.getRequired());
		}
		L.enrich = function (o) {
			c(o);
			o.__orig_setLabelFor = o.setLabelFor;
			o.setLabelFor = function (i) {
				var d = this.__orig_setLabelFor.apply(this, arguments);
				r(this);
				return d;
			};
			o.__orig_exit = o.exit;
			o.exit = function () {
				this._sAlternativeId = null;
				r(this, true);
				if (o.__orig_exit) {
					o.__orig_exit.apply(this, arguments);
				}
			};
			o.setAlternativeLabelFor = function (i) {
				if (i instanceof M) {
					i = i.getId();
				} else if (i != null && typeof i !== "string") {
					return this;
				}
				this._sAlternativeId = i;
				r(this);
				return this;
			};
			o.getLabelForRendering = function () {
				var i = this.getLabelFor() || this._sAlternativeId;
				var o = t(i);
				return a(o) ? i : "";
			};
			if (!o.getMetadata().getProperty("required")) {
				return;
			}
			o.__orig_setRequired = o.setRequired;
			o.setRequired = function (R) {
				var O = this.getRequired(),
					d = this.__orig_setRequired.apply(this, arguments);
				if (this.getRequired() !== O) {
					t(this.__sLabeledControl, true);
				}
				return d;
			};
			o.isRequired = function () {
				var F = t(this.getLabelForRendering(), false);
				return b(this) || b(F);
			};
			o.isDisplayOnly = function () {
				if (this.getDisplayOnly) {
					return this.getDisplayOnly();
				} else {
					return false;
				}
			};
			o.disableRequiredChangeCheck = function (n) {
				this._bNoRequiredChangeCheck = n;
			};
			o.attachRequiredChange = function (F) {
				if (F && !this._bNoRequiredChangeCheck) {
					if (F.getMetadata().getProperty("required")) {
						F.attachEvent("_change", _, this);
					}
					this._bRequiredAttached = true;
				}
			};
			o.detachRequiredChange = function (F) {
				if (F && !this._bNoRequiredChangeCheck) {
					if (F.getMetadata().getProperty("required")) {
						F.detachEvent("_change", _, this);
					}
					this._bRequiredAttached = false;
				}
			};

			function _(e) {
				if (e.getParameter("name") == "required") {
					this.invalidate();
				}
			}
			o.__orig_onAfterRendering = o.onAfterRendering;
			o.onAfterRendering = function (e) {
				var d;
				if (this.__orig_onAfterRendering) {
					d = this.__orig_onAfterRendering.apply(this, arguments);
				}
				if (!this._bNoRequiredChangeCheck && !this._bRequiredAttached && this.__sLabeledControl) {
					var F = t(this.__sLabeledControl, false);
					this.attachRequiredChange(F);
				}
				return d;
			};
		};
		return L;
	}, true);
	sap.ui.predefine('sap/ui/core/Locale', ['jquery.sap.global', 'sap/ui/base/Object'], function (q, B) {
		"use strict";
		var a = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
		var L = B.extend("sap.ui.core.Locale", {
			constructor: function (l) {
				B.apply(this);
				var r = a.exec(l.replace(/_/g, "-"));
				if (r === null) {
					throw "The given language '" + l + "' does not adhere to BCP-47.";
				}
				this.sLocaleId = l;
				this.sLanguage = r[1] || null;
				this.sScript = r[2] || null;
				this.sRegion = r[3] || null;
				this.sVariant = (r[4] && r[4].slice(1)) || null;
				this.sExtension = (r[5] && r[5].slice(1)) || null;
				this.sPrivateUse = r[6] || null;
				if (this.sLanguage) {
					this.sLanguage = this.sLanguage.toLowerCase();
				}
				if (this.sScript) {
					this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, function ($) {
						return $.toUpperCase();
					});
				}
				if (this.sRegion) {
					this.sRegion = this.sRegion.toUpperCase();
				}
			},
			getLanguage: function () {
				return this.sLanguage;
			},
			getScript: function () {
				return this.sScript;
			},
			getRegion: function () {
				return this.sRegion;
			},
			getVariant: function () {
				return this.sVariant;
			},
			getVariantSubtags: function () {
				return this.sVariant ? this.sVariant.split('-') : [];
			},
			getExtension: function () {
				return this.sExtension;
			},
			getExtensionSubtags: function () {
				return this.sExtension ? this.sExtension.slice(2).split('-') : [];
			},
			getPrivateUse: function () {
				return this.sPrivateUse;
			},
			getPrivateUseSubtags: function () {
				return this.sPrivateUse ? this.sPrivateUse.slice(2).split('-') : [];
			},
			hasPrivateUseSubtag: function (s) {
				return this.getPrivateUseSubtags().indexOf(s) >= 0;
			},
			toString: function () {
				var r = [this.sLanguage];
				if (this.sScript) {
					r.push(this.sScript);
				}
				if (this.sRegion) {
					r.push(this.sRegion);
				}
				if (this.sVariant) {
					r.push(this.sVariant);
				}
				if (this.sExtension) {
					r.push(this.sExtension);
				}
				if (this.sPrivateUse) {
					r.push(this.sPrivateUse);
				}
				return r.join("-");
			},
			getSAPLogonLanguage: function () {
				var l = this.sLanguage || "",
					m;
				if (l.indexOf("-") >= 0) {
					l = l.slice(0, l.indexOf("-"));
				}
				l = M[l] || l;
				if (l === "zh") {
					if (this.sScript === "Hant" || (!this.sScript && this.sRegion === "TW")) {
						l = "zf";
					}
				}
				if (this.sPrivateUse && (m = /-(saptrc|sappsd)(?:-|$)/i.exec(this.sPrivateUse))) {
					l = (m[1].toLowerCase() === "saptrc") ? "1Q" : "2Q";
				}
				return l.toUpperCase();
			}
		});
		var M = {
			"iw": "he",
			"ji": "yi",
			"in": "id",
			"sh": "sr"
		};

		function g(v) {
			var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(v);
			return (m && m[2]) ? m[2].split(/,/) : null;
		}
		var A = g("$cldr-rtl-locales:ar,fa,he$") || [];
		L._cldrLocales = g("$cldr-locales:ar,ar_EG,ar_SA,bg,br,ca,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,nn,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$");
		L._coreI18nLocales = g("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
		L._impliesRTL = function (l) {
			var o = l instanceof L ? l : new L(l);
			var s = o.getLanguage() || "";
			s = (s && M[s]) || s;
			var r = o.getRegion() || "";
			if (r && A.indexOf(s + "_" + r) >= 0) {
				return true;
			}
			return A.indexOf(s) >= 0;
		};
		return L;
	});
	sap.ui.predefine('sap/ui/core/Manifest', ['jquery.sap.global', 'sap/ui/base/Object', 'sap/ui/thirdparty/URI', 'jquery.sap.resources'], function (q, B, U) {
		"use strict";
		var r = /\{\{([^\}\}]+)\}\}/g;

		function g(v) {
			var V = q.sap.Version(v);
			return V.getSuffix() ? q.sap.Version(V.getMajor() + "." + V.getMinor() + "." + V.getPatch()) : V;
		}

		function p(o, c) {
			for (var k in o) {
				if (!o.hasOwnProperty(k)) {
					continue;
				}
				var v = o[k];
				switch (typeof v) {
					case "object":
						if (v) {
							p(v, c);
						}
						break;
					case "string":
						c(o, k, v);
						break;
					default:
				}
			}
		}

		function a(o, P) {
			if (o && P && typeof P === "string" && P[0] === "/") {
				var b = P.substring(1).split("/"),
					s;
				for (var i = 0, l = b.length; i < l; i++) {
					s = b[i];
					o = o.hasOwnProperty(s) ? o[s] : undefined;
					if (o === null || typeof o !== "object") {
						if (i + 1 < l && o !== undefined) {
							o = undefined;
						}
						break;
					}
				}
				return o;
			}
			return o && o[P];
		}

		function d(o) {
			if (o && typeof o === 'object' && !Object.isFrozen(o)) {
				Object.freeze(o);
				for (var k in o) {
					if (o.hasOwnProperty(k)) {
						d(o[k]);
					}
				}
			}
		}
		var M = B.extend("sap.ui.core.Manifest", {
			constructor: function (m, o) {
				B.apply(this, arguments);
				this._uid = q.sap.uid();
				this._iInstanceCount = 0;
				this._bIncludesLoaded = false;
				this._oRawManifest = m;
				this._bProcess = !(o && o.process === false);
				this._sComponentName = o && o.componentName;
				var c = this.getComponentName(),
					b = o && o.baseUrl || c && q.sap.getModulePath(c, "/");
				if (b) {
					this._oBaseUri = new U(b).absoluteTo(new U().search(""));
				}
				d(this._oRawManifest);
				this._oManifest = this._bProcess ? null : this._oRawManifest;
			},
			_processEntries: function (m) {
				var t = this;
				var c = (m["sap.app"] && m["sap.app"]["i18n"]) || "i18n/i18n.properties";
				var R;
				p(m, function (o, k, v) {
					o[k] = v.replace(r, function (s, b) {
						if (!R) {
							R = q.sap.resources({
								url: t.resolveUri(new U(c)).toString()
							});
						}
						return R.getText(b);
					});
				});
				return m;
			},
			getJson: function () {
				if (!this._oManifest) {
					this._oManifest = this._processEntries(q.extend(true, {}, this._oRawManifest));
				}
				return this._oManifest;
			},
			getRawJson: function () {
				return this._oRawManifest;
			},
			getEntry: function (P) {
				if (!P || P.indexOf(".") <= 0) {
					q.sap.log.warning("Manifest entries with keys without namespace prefix can not be read via getEntry. Key: " + P + ", Component: " + this.getComponentName());
					return null;
				}
				var m = this.getJson();
				var e = a(m, P);
				if (P && P[0] !== "/" && !q.isPlainObject(e)) {
					q.sap.log.warning("Manifest entry with key '" + P + "' must be an object. Component: " + this.getComponentName());
					return null;
				}
				return e;
			},
			checkUI5Version: function () {
				var m = this.getEntry("/sap.ui5/dependencies/minUI5Version");
				if (m && q.sap.log.isLoggable(q.sap.log.LogLevel.WARNING) && sap.ui.getCore().getConfiguration().getDebug()) {
					sap.ui.getVersionInfo({
						async: true
					}).then(function (v) {
						var o = g(m);
						var V = g(v && v.version);
						if (o.compareTo(V) > 0) {
							q.sap.log.warning("Component \"" + this.getComponentName() + "\" requires at least version \"" + o.toString() + "\" but running on \"" + V.toString() + "\"!");
						}
					}.bind(this), function (e) {
						q.sap.log.warning("The validation of the version for Component \"" + this.getComponentName() + "\" failed! Reasion: " + e);
					}.bind(this));
				}
			},
			loadIncludes: function () {
				if (this._bIncludesLoaded) {
					return;
				}
				var R = this.getEntry("/sap.ui5/resources");
				if (!R) {
					return;
				}
				var c = this.getComponentName();
				var J = R["js"];
				if (J) {
					for (var i = 0; i < J.length; i++) {
						var o = J[i];
						var f = o.uri;
						if (f) {
							var m = f.match(/\.js$/i);
							if (m) {
								var s = c.replace(/\./g, '/') + (f.slice(0, 1) === '/' ? '' : '/') + f.slice(0, m.index);
								q.sap.log.info("Component \"" + c + "\" is loading JS: \"" + s + "\"");
								sap.ui.requireSync(s);
							}
						}
					}
				}
				var C = R["css"];
				if (C) {
					for (var j = 0; j < C.length; j++) {
						var b = C[j];
						if (b.uri) {
							var e = this.resolveUri(new U(b.uri)).toString();
							q.sap.log.info("Component \"" + c + "\" is loading CSS: \"" + e + "\"");
							q.sap.includeStyleSheet(e, {
								id: b.id,
								"data-sap-ui-manifest-uid": this._uid
							});
						}
					}
				}
				this._bIncludesLoaded = true;
			},
			removeIncludes: function () {
				if (!this._bIncludesLoaded) {
					return;
				}
				var R = this.getEntry("/sap.ui5/resources");
				if (!R) {
					return;
				}
				var c = this.getComponentName();
				var C = R["css"];
				if (C) {
					var l = document.querySelectorAll("link[data-sap-ui-manifest-uid='" + this._uid + "']");
					for (var i = 0; i < l.length; i++) {
						var L = l[i];
						q.sap.log.info("Component \"" + c + "\" is removing CSS: \"" + L.href + "\"");
						L.parentNode.removeChild(L);
					}
				}
				this._bIncludesLoaded = false;
			},
			loadDependencies: function () {
				var D = this.getEntry("/sap.ui5/dependencies"),
					c = this.getComponentName();
				if (D) {
					var l = D["libs"];
					if (l) {
						for (var L in l) {
							if (!l[L].lazy) {
								q.sap.log.info("Component \"" + c + "\" is loading library: \"" + L + "\"");
								sap.ui.getCore().loadLibrary(L);
							}
						}
					}
					var C = D["components"];
					if (C) {
						for (var n in C) {
							if (!C[n].lazy) {
								q.sap.log.info("Component \"" + c + "\" is loading component: \"" + n + ".Component\"");
								sap.ui.component.load({
									name: n
								});
							}
						}
					}
				}
			},
			defineResourceRoots: function () {
				var R = this.getEntry("/sap.ui5/resourceRoots");
				if (R) {
					for (var s in R) {
						var b = R[s];
						var o = new U(b);
						if (o.is("absolute") || (o.path() && o.path()[0] === "/")) {
							q.sap.log.error("Resource root for \"" + s + "\" is absolute and therefore won't be registered! \"" + b + "\"", this.getComponentName());
							continue;
						}
						b = this.resolveUri(o).toString();
						q.sap.registerModulePath(s, b);
					}
				}
			},
			getComponentName: function () {
				var R = this.getRawJson();
				return this._sComponentName || a(R, "/sap.ui5/componentName") || a(R, "/sap.app/id");
			},
			resolveUri: function (u) {
				return M._resolveUriRelativeTo(u, this._oBaseUri);
			},
			init: function (i) {
				if (this._iInstanceCount === 0) {
					this.checkUI5Version();
					this.defineResourceRoots();
					this.loadDependencies();
					this.loadIncludes();
					this.activateCustomizing();
				}
				if (i) {
					this.activateCustomizing(i);
				}
				this._iInstanceCount++;
			},
			exit: function (i) {
				var I = Math.max(this._iInstanceCount - 1, 0);
				if (i) {
					this.deactivateCustomizing(i);
				}
				if (I === 0) {
					this.deactivateCustomizing();
					this.removeIncludes();
				}
				this._iInstanceCount = I;
			},
			activateCustomizing: function (i) {
				var u = this.getEntry("sap.ui5", true),
					e = u && u["extends"] && u["extends"].extensions;
				if (!q.isEmptyObject(e)) {
					var C = sap.ui.requireSync('sap/ui/core/CustomizingConfiguration');
					if (!i) {
						C.activateForComponent(this.getComponentName());
					} else {
						C.activateForComponentInstance(i);
					}
				}
			},
			deactivateCustomizing: function (i) {
				var C = sap.ui.require('sap/ui/core/CustomizingConfiguration');
				if (C) {
					if (!i) {
						C.deactivateForComponent(this.getComponentName());
					} else {
						C.deactivateForComponentInstance(i);
					}
				}
			}
		});
		M._resolveUriRelativeTo = function (u, b) {
			if (u.is("absolute") || (u.path() && u.path()[0] === "/")) {
				return u;
			}
			var P = new U().search("");
			b = b.absoluteTo(P);
			return u.absoluteTo(b).relativeTo(P);
		};
		M.load = function (o) {
			var m = o && o.manifestUrl,
				c = o && o.componentName,
				A = o && o.async,
				f = o && o.failOnError;
			var b = new U(m);
			["sap-language", "sap-client"].forEach(function (n) {
				if (!b.hasQuery(n)) {
					var v = sap.ui.getCore().getConfiguration().getSAPParam(n);
					if (v) {
						b.addQuery(n, v);
					}
				}
			});
			m = b.toString();
			q.sap.log.info("Loading manifest via URL: " + m);
			var e = q.sap.loadResource({
				url: m,
				dataType: "json",
				async: typeof A !== "undefined" ? A : false,
				headers: {
					"Accept-Language": sap.ui.getCore().getConfiguration().getLanguageTag()
				},
				failOnError: typeof f !== "undefined" ? f : true
			});
			if (A) {
				return e.then(function (e) {
					return new M(e, {
						componentName: c,
						process: false
					});
				});
			}
			return new M(e, {
				componentName: c,
				process: false
			});
		};
		return M;
	});
	sap.ui.predefine('sap/ui/core/RenderManager', ['jquery.sap.global', '../base/Interface', '../base/Object', './LabelEnablement', 'jquery.sap.act', 'jquery.sap.encoder', 'jquery.sap.dom', 'jquery.sap.trace'], function (q, I, B, L) {
		"use strict";
		var c = ["renderControl", "write", "writeEscaped", "translate", "writeAcceleratorKey", "writeControlData", "writeInvisiblePlaceholderData", "writeElementData", "writeAttribute", "writeAttributeEscaped", "addClass", "writeClasses", "addStyle", "writeStyles", "writeAccessibilityState", "writeIcon", "getConfiguration", "getHTML", "cleanupControlWithoutRendering"];
		var N = ["render", "flush", "destroy"];

		function R() {
			var t = this,
				F, l, o, S, p, u;
			this._setFocusHandler = function (n) {
				F = n;
			};

			function v() {
				l = t.aBuffer = [];
				o = t.aRenderedControls = [];
				S = t.aStyleStack = [{}];
			}
			this.write = function (T) {
				l.push.apply(l, arguments);
				return this;
			};
			this.writeEscaped = function (T, e) {
				if (T != null) {
					T = q.sap.encodeHTML(String(T));
					if (e) {
						T = T.replace(/&#xa;/g, "<br>");
					}
					l.push(T);
				}
				return this;
			};
			this.writeAttribute = function (n, V) {
				l.push(" ", n, "=\"", V, "\"");
				return this;
			};
			this.writeAttributeEscaped = function (n, V) {
				l.push(" ", n, "=\"", q.sap.encodeHTML(String(V)), "\"");
				return this;
			};
			this.addStyle = function (n, e) {
				if (e != null) {
					var i = S[S.length - 1];
					if (!i.aStyle) {
						i.aStyle = [];
					}
					i.aStyle.push(n + ":" + e);
				}
				return this;
			};
			this.writeStyles = function () {
				var e = S[S.length - 1];
				if (e.aStyle) {
					this.write(" style=\"" + e.aStyle.join(";") + "\" ");
				}
				e.aStyle = null;
				return this;
			};
			this.addClass = function (n) {
				if (n) {
					var e = S[S.length - 1];
					if (!e.aClasses) {
						e.aClasses = [];
					}
					e.aClasses.push(n);
				}
				return this;
			};
			this.writeClasses = function (e) {
				var j = S[S.length - 1];
				var E;
				if (e) {
					E = e.aCustomStyleClasses;
				} else if (e === false) {
					E = [];
				} else {
					E = j.aCustomStyleClasses;
				}
				if (j.aClasses || E) {
					var G = [].concat(j.aClasses || [], E || []);
					G.sort();
					G = G.filter(function (n, i) {
						return i == 0 || n !== G[i - 1];
					});
					this.write(" class=\"", G.join(" "), "\" ");
				}
				if (!e) {
					j.aCustomStyleClasses = null;
				}
				j.aClasses = null;
				return this;
			};

			function w(e) {
				u = true;
				try {
					var E = q.Event("BeforeRendering");
					E.srcControl = e;
					e._handleEvent(E);
				} finally {
					u = false;
				}
			}
			this.cleanupControlWithoutRendering = function (e) {
				if (!e || !e.getDomRef()) {
					return;
				}
				w(e);
				e.bOutput = false;
			};
			this.renderControl = function (e) {
				if (!e) {
					return this;
				}
				if (!p) {
					p = [];
				}
				if (p && p.length > 0) {
					q.sap.measure.pause(p[0] + "---renderControl");
				} else if (e.getParent() && e.getParent().getMetadata().getName() == "sap.ui.core.UIArea") {
					q.sap.measure.pause(e.getParent().getId() + "---rerender");
				}
				p.unshift(e.getId());
				q.sap.measure.start(e.getId() + "---renderControl", "Rendering of " + e.getMetadata().getName(), ["rendering", "control"]);
				var j = l.length;
				var n = {};
				if (e.aCustomStyleClasses && e.aCustomStyleClasses.length > 0) {
					n.aCustomStyleClasses = e.aCustomStyleClasses;
				}
				S.push(n);
				q.sap.measure.pause(e.getId() + "---renderControl");
				var E;
				var M = e.getMetadata();
				var V = e.getVisible();
				if (V) {
					E = M.getRenderer();
				} else {
					var G = M.getProperty("visible");
					var U = G && G._oParent && G._oParent.getName() == "sap.ui.core.Control";
					E = U ? s : M.getRenderer();
				}
				q.sap.measure.resume(e.getId() + "---renderControl");
				w(e);
				var H = e.aBindParameters;
				if (H && H.length > 0) {
					var J = q(e.getDomRef());
					if (J && J[0]) {
						for (var i = 0; i < H.length; i++) {
							var P = H[i];
							J.unbind(P.sEventType, P.fnProxy);
						}
					}
				}
				if (E && typeof E.render === "function") {
					E.render(z, e);
				} else {
					q.sap.log.error("The renderer for class " + M.getName() + " is not defined or does not define a render function! Rendering of " + e.getId() + " will be skipped!");
				}
				S.pop();
				o.push(e);
				if (e.getUIArea && e.getUIArea()) {
					e.getUIArea()._onControlRendered(e);
				}
				e.bOutput = l.length != j;
				if (E === s) {
					e.bOutput = "invisible";
				}
				q.sap.measure.end(e.getId() + "---renderControl");
				p.shift();
				if (p && p.length > 0) {
					q.sap.measure.resume(p[0] + "---renderControl");
				} else if (e.getParent() && e.getParent().getMetadata().getName() == "sap.ui.core.UIArea") {
					q.sap.measure.resume(e.getParent().getId() + "---rerender");
				}
				return this;
			};
			this.getHTML = function (e) {
				var i = l;
				var j = l = this.aBuffer = [];
				this.renderControl(e);
				l = this.aBuffer = i;
				return j.join("");
			};

			function x(n) {
				var i, E = o.length;
				for (i = 0; i < E; i++) {
					o[i]._sapui_bInAfterRenderingPhase = true;
				}
				u = true;
				try {
					for (i = 0; i < E; i++) {
						var G = o[i];
						if (G.bOutput && G.bOutput !== "invisible") {
							var H = q.Event("AfterRendering");
							H.srcControl = G;
							q.sap.measure.start(G.getId() + "---AfterRendering", "AfterRendering of " + G.getMetadata().getName(), ["rendering", "after"]);
							G._handleEvent(H);
							q.sap.measure.end(G.getId() + "---AfterRendering");
						}
					}
				} finally {
					for (i = 0; i < E; i++) {
						delete o[i]._sapui_bInAfterRenderingPhase;
					}
					u = false;
				}
				try {
					F.restoreFocus(n);
				} catch (e) {
					q.sap.log.warning("Problems while restoring the focus after rendering: " + e, null);
				}
				for (i = 0; i < E; i++) {
					var G = o[i],
						J = G.aBindParameters;
					if (J && J.length > 0) {
						var K = q(G.getDomRef());
						if (K && K[0]) {
							for (var j = 0; j < J.length; j++) {
								var P = J[j];
								K.bind(P.sEventType, P.fnProxy);
							}
						}
					}
				}
			}

			function y(P) {
				var e = F ? F.getControlFocusInfo() : null;
				var H = l.join("");
				P(H);
				x(e);
				v();
				q.sap.act.refresh();
				q.sap.interaction.notifyStepEnd();
			}
			this.flush = function (T, e, j) {
				if (!e && (typeof j !== "number") && !j) {
					R.preserveContent(T);
				}
				y(function (H) {
					for (var i = 0; i < o.length; i++) {
						var n = o[i].getDomRef();
						if (n && !R.isPreservedContent(n)) {
							if (R.isInlineTemplate(n)) {
								q(n).empty();
							} else {
								q(n).remove();
							}
						}
					}
					if (typeof j === "number") {
						if (j <= 0) {
							q(T).prepend(H);
						} else {
							var $ = q(T).children().eq(j - 1);
							if ($.length === 1) {
								$.after(H);
							} else {
								q(T).append(H);
							}
						}
					} else if (!j) {
						q(T).html(H);
					} else {
						q(T).append(H);
					}
				});
			};
			this.render = function (e, T) {
				if (u) {
					q.sap.log.error("Render must not be called within Before or After Rendering Phase. Call ignored.", null, this);
					return;
				}
				v();
				this.renderControl(e);
				y(function (H) {
					if (e && T) {
						var i = e.getDomRef();
						if (!i || R.isPreservedContent(i)) {
							i = q.sap.domById(a.Invisible + e.getId()) || q.sap.domById(a.Dummy + e.getId());
						}
						var n = i && i.parentNode != T;
						var j = function () {
							var E = q(T);
							if (T.innerHTML == "") {
								E.html(H);
							} else {
								E.append(H);
							}
						};
						if (n) {
							if (!R.isPreservedContent(i)) {
								if (R.isInlineTemplate(i)) {
									q(i).empty();
								} else {
									q(i).remove();
								}
							}
							if (H) {
								j();
							}
						} else {
							if (H) {
								if (i) {
									if (R.isInlineTemplate(i)) {
										q(i).html(H);
									} else if (r()) {
										q.sap.replaceDOM(i, H, true);
									} else {
										q(i).replaceWith(H);
									}
								} else {
									j();
								}
							} else {
								if (R.isInlineTemplate(i)) {
									q(i).empty();
								} else {
									if (!e.getParent() || !e.getParent()._onChildRerenderedEmpty || !e.getParent()._onChildRerenderedEmpty(e, i)) {
										q(i).remove();
									}
								}
							}
						}
					}
				});
			};
			this.destroy = function () {
				v();
			};
			var z = {};
			var C = {};
			c.forEach(function (M) {
				z[M] = C[M] = t[M];
			});
			N.forEach(function (M) {
				C[M] = t[M];
			});
			this.getRendererInterface = function () {
				return z;
			};
			this.getInterface = function () {
				return C;
			};
			v();
		}
		R.prototype.getConfiguration = function () {
			return sap.ui.getCore().getConfiguration();
		};
		R.prototype.translate = function (K) {};
		R.prototype.writeAcceleratorKey = function () {
			return this;
		};
		R.prototype.writeControlData = function (C) {
			this.writeElementData(C);
			return this;
		};
		R.prototype.writeInvisiblePlaceholderData = function (e) {
			var p = R.createInvisiblePlaceholderId(e),
				P = ' ' + 'id="' + p + '" ' + 'class="sapUiHiddenPlaceholder" ' + 'data-sap-ui="' + p + '" ' + 'style="display: none;"' + 'aria-hidden="true" ';
			this.write(P);
			return this;
		};
		R.prototype.writeElementData = function (e) {
			var j = e.getId();
			if (j) {
				this.writeAttribute("id", j).writeAttribute("data-sap-ui", j);
			}
			var n = e.getCustomData();
			var l = n.length;
			for (var i = 0; i < l; i++) {
				var C = n[i]._checkWriteToDom(e);
				if (C) {
					this.writeAttributeEscaped(C.key, C.value);
				}
			}
			var o = false;
			if (e.getDragDropConfig) {
				o = e.getDragDropConfig().some(function (v) {
					return v.isDraggable(e);
				});
			}
			if (!o) {
				var p = e.getParent();
				if (p && p.getDragDropConfig) {
					o = p.getDragDropConfig().some(function (v) {
						return v.isDraggable(e);
					});
				}
			}
			if (o) {
				this.writeAttribute("draggable", "true");
			}
			return this;
		};
		R.prototype.writeAccessibilityState = function (e, P) {
			if (!sap.ui.getCore().getConfiguration().getAccessibility()) {
				return this;
			}
			if (arguments.length == 1 && !(k(e, 'sap/ui/core/Element'))) {
				P = e;
				e = null;
			}
			var j = {};
			if (e != null) {
				var M = e.getMetadata();
				var l = function (E, i, v) {
					var y = M.getProperty(E);
					if (y && e[y._sGetter]() === v) {
						j[i] = "true";
					}
				};
				var n = function (E, v) {
					var y = M.getAssociation(E);
					if (y && y.multiple) {
						var z = e[y._sGetter]();
						if (E == "ariaLabelledBy") {
							var C = L.getReferencingLabels(e);
							var F = C.length;
							if (F) {
								var G = [];
								for (var i = 0; i < F; i++) {
									if (z.indexOf(C[i]) < 0) {
										G.push(C[i]);
									}
								}
								z = G.concat(z);
							}
						}
						if (z.length > 0) {
							j[v] = z.join(" ");
						}
					}
				};
				l("editable", "readonly", false);
				l("enabled", "disabled", false);
				l("visible", "hidden", false);
				if (L.isRequired(e)) {
					j["required"] = "true";
				}
				l("selected", "selected", true);
				l("checked", "checked", true);
				n("ariaDescribedBy", "describedby");
				n("ariaLabelledBy", "labelledby");
			}
			if (P) {
				var o = function (v) {
					var i = typeof (v);
					return v === null || v === "" || i === "number" || i === "string" || i === "boolean";
				};
				var t = {};
				var x, u, w;
				for (x in P) {
					u = P[x];
					if (o(u)) {
						t[x] = u;
					} else if (typeof (u) === "object" && o(u.value)) {
						w = "";
						if (u.append && (x === "describedby" || x === "labelledby")) {
							w = j[x] ? j[x] + " " : "";
						}
						t[x] = w + u.value;
					}
				}
				q.extend(j, t);
			}
			if (k(e, 'sap/ui/core/Element') && e.getParent() && e.getParent().enhanceAccessibilityState) {
				e.getParent().enhanceAccessibilityState(e, j);
			}
			for (var p in j) {
				if (j[p] != null && j[p] !== "") {
					this.writeAttributeEscaped(p === "role" ? p : "aria-" + p, j[p]);
				}
			}
			return this;
		};
		R.prototype.writeIcon = function (u, C, e) {
			var i = sap.ui.requireSync("sap/ui/core/IconPool"),
				j = i.isIconURI(u),
				S = j ? "<span " : "<img ",
				l = false,
				n, p, o, t, v, w;
			if (typeof C === "string") {
				C = [C];
			}
			if (j) {
				o = i.getIconInfo(u);
				if (!o) {
					q.sap.log.error("An unregistered icon: " + u + " is used in sap.ui.core.RenderManager's writeIcon method.");
					return this;
				}
				if (!C) {
					C = [];
				}
				C.push("sapUiIcon");
				if (!o.suppressMirroring) {
					C.push("sapUiIconMirrorInRTL");
				}
			}
			this.write(S);
			if (Array.isArray(C) && C.length) {
				n = C.join(" ");
				this.write("class=\"" + n + "\" ");
			}
			if (j) {
				t = {
					"data-sap-ui-icon-content": o.content,
					"role": "presentation",
					"title": o.text || null
				};
				this.write("style=\"font-family: " + o.fontFamily + ";\" ");
			} else {
				t = {
					role: "presentation",
					alt: "",
					src: u
				};
			}
			e = q.extend(t, e);
			if (!e.id) {
				e.id = q.sap.uid();
			}
			if (j) {
				v = e.alt || e.title || o.text || o.name;
				w = e.id + "-label";
				if (e["aria-labelledby"]) {
					l = true;
					e["aria-labelledby"] += (" " + w);
				} else if (!e.hasOwnProperty("aria-label")) {
					e["aria-label"] = v;
				}
			}
			if (typeof e === "object") {
				for (p in e) {
					if (e.hasOwnProperty(p) && e[p] !== null) {
						this.writeAttributeEscaped(p, e[p]);
					}
				}
			}
			if (j) {
				this.write(">");
				if (l) {
					this.write("<span style=\"display:none;\" id=\"" + w + "\">" + v + "</span>");
				}
				this.write("</span>");
			} else {
				this.write("/>");
			}
			return this;
		};
		R.prototype.getRenderer = function (C) {
			return R.getRenderer(C);
		};
		var a = R.RenderPrefixes = {
			Invisible: "sap-ui-invisible-",
			Dummy: "sap-ui-dummy-"
		};
		R.getRenderer = function (C) {
			return C.getMetadata().getRenderer();
		};
		R.forceRepaint = function (v) {
			var o = typeof v == "string" ? q.sap.domById(v) : v;
			if (o) {
				q.sap.log.debug("forcing a repaint for " + (o.id || String(o)));
				var O = o.style.display;
				var e = document.activeElement;
				o.style.display = "none";
				o.offsetHeight;
				o.style.display = O;
				if (document.activeElement !== e) {
					q.sap.focus(e);
				}
			}
		};
		R.createInvisiblePlaceholderId = function (e) {
			return a.Invisible + e.getId();
		};
		var b = "sap-ui-preserve",
			d = "sap-ui-static",
			A = "data-sap-ui-preserve",
			f = "data-sap-ui-area";

		function g() {
			var $ = q.sap.byId(b);
			if ($.length === 0) {
				$ = q("<DIV/>", {
					"aria-hidden": "true",
					id: b
				}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width", "0").css("height", "0").css("overflow", "hidden").appendTo(document.body);
			}
			return $;
		}

		function m(n) {
			q("<DIV/>", {
				id: a.Dummy + n.id
			}).addClass("sapUiHidden").insertBefore(n);
		}
		R.preserveContent = function (o, p, P) {
			sap.ui.getCore().getEventBus().publish("sap.ui", "__preserveContent", {
				domNode: o
			});
			var $ = g();

			function e(i) {
				if (i.id === b || i.id === d) {
					return;
				}
				if (i.hasAttribute(A)) {
					if (i === o) {
						m(i);
					}
					$.append(i);
				} else if (P && i.id) {
					R.markPreservableContent(q(i), i.id);
					$.append(i);
					return;
				}
				if (!i.hasAttribute(f)) {
					var n = i.firstChild;
					while (n) {
						i = n;
						n = n.nextSibling;
						if (i.nodeType === 1) {
							e(i);
						}
					}
				}
			}
			q.sap.measure.start(o.id + "---preserveContent", "preserveContent for " + o.id, ["rendering", "preserve"]);
			if (p) {
				e(o);
			} else {
				q(o).children().each(function (i, n) {
					e(n);
				});
			}
			q.sap.measure.end(o.id + "---preserveContent");
		};
		R.findPreservedContent = function (i) {
			var $ = g(),
				e = $.children("[" + A + "='" + i.replace(/(:|\.)/g, '\\$1') + "']");
			return e;
		};
		R.markPreservableContent = function ($, i) {
			$.attr(A, i);
		};
		R.isPreservedContent = function (o) {
			return (o && o.getAttribute(A) && o.parentNode && o.parentNode.id == b);
		};
		R.getPreserveAreaRef = function () {
			return g()[0];
		};
		var h = "data-sap-ui-template";
		R.markInlineTemplate = function ($) {
			$.attr(h, "");
		};
		R.isInlineTemplate = function (o) {
			return (o && o.hasAttribute(h));
		};

		function k(o, M) {
			var F = sap.ui.require(M);
			return typeof F === 'function' && (o instanceof F);
		}
		var D;

		function r() {
			if (D === undefined) {
				D = sap.ui.getCore().getConfiguration().getDomPatching();
				if (D) {
					q.sap.log.warning("DOM Patching is enabled: This feature should be used only for testing purposes!");
				}
			}
			return D;
		}
		var s = {
			render: function (o, C) {
				o.write("<span");
				o.writeInvisiblePlaceholderData(C);
				o.write("></span>");
			}
		};
		return R;
	}, true);
	sap.ui.predefine('sap/ui/core/ResizeHandler', ['jquery.sap.global', 'sap/ui/base/Object', 'jquery.sap.act', 'jquery.sap.script'], function (q, B) {
		"use strict";
		var l = q.sap.log.getLogger("sap.ui.core.ResizeHandler", q.sap.log.Level.ERROR);

		function a(o, m) {
			var F = sap.ui.require(m);
			return typeof F === 'function' && (o instanceof F);
		}
		var c = null;
		var R = B.extend("sap.ui.core.ResizeHandler", {
			constructor: function (C) {
				B.apply(this);
				c = C;
				this.aResizeListeners = [];
				this.bRegistered = false;
				this.iIdCounter = 0;
				this.fDestroyHandler = this.destroy.bind(this);
				q(window).bind("unload", this.fDestroyHandler);
				q.sap.act.attachActivate(d, this);
			}
		});

		function b() {
			if (this.bRegistered) {
				this.bRegistered = false;
				sap.ui.getCore().detachIntervalTimer(this.checkSizes, this);
			}
		}

		function d() {
			if (!this.bRegistered && this.aResizeListeners.length > 0) {
				this.bRegistered = true;
				sap.ui.getCore().attachIntervalTimer(this.checkSizes, this);
			}
		}
		R.prototype.destroy = function (e) {
			q.sap.act.detachActivate(d, this);
			q(window).unbind("unload", this.fDestroyHandler);
			c = null;
			this.aResizeListeners = [];
			b.call(this);
		};
		R.prototype.attachListener = function (r, h) {
			var i = a(r, 'sap/ui/core/Control'),
				D = i ? r.getDomRef() : r,
				w = D ? D.offsetWidth : 0,
				H = D ? D.offsetHeight : 0,
				I = "rs-" + Date.now() + "-" + this.iIdCounter++,
				e;
			if (i) {
				e = ("Control " + r.getId());
			} else if (r.id) {
				e = r.id;
			} else {
				e = String(r);
			}
			this.aResizeListeners.push({
				sId: I,
				oDomRef: i ? null : r,
				oControl: i ? r : null,
				fHandler: h,
				iWidth: w,
				iHeight: H,
				dbg: e
			});
			l.debug("registered " + e);
			d.call(this);
			return I;
		};
		R.prototype.detachListener = function (I) {
			var r = this.aResizeListeners;
			for (var i = 0; i < r.length; i++) {
				if (r[i].sId === I) {
					r.splice(i, 1);
					l.debug("deregistered " + I);
					break;
				}
			}
			if (r.length === 0) {
				b.call(this);
			}
		};
		R.prototype.checkSizes = function () {
			var D = l.isLoggable();
			if (D) {
				l.debug("checkSizes:");
			}
			this.aResizeListeners.forEach(function (r) {
				if (r) {
					var C = !!r.oControl,
						o = C ? r.oControl.getDomRef() : r.oDomRef;
					if (o && q.contains(document.documentElement, o)) {
						var O = r.iWidth,
							i = r.iHeight,
							n = o.offsetWidth,
							N = o.offsetHeight;
						if (O != n || i != N) {
							r.iWidth = n;
							r.iHeight = N;
							var e = q.Event("resize");
							e.target = o;
							e.currentTarget = o;
							e.size = {
								width: n,
								height: N
							};
							e.oldSize = {
								width: O,
								height: i
							};
							e.control = C ? r.oControl : null;
							if (D) {
								l.debug("resize detected for '" + r.dbg + "': " + e.oldSize.width + "x" + e.oldSize.height + " -> " + e.size.width + "x" + e.size.height);
							}
							r.fHandler(e);
						}
					}
				}
			});
			if (R._keepActive != true && R._keepActive != false) {
				R._keepActive = false;
			}
			if (!q.sap.act.isActive() && !R._keepActive) {
				b.call(this);
			}
		};
		R.register = function (r, h) {
			if (!c || !c.oResizeHandler) {
				return null;
			}
			return c.oResizeHandler.attachListener(r, h);
		};
		R.deregister = function (i) {
			if (!c || !c.oResizeHandler) {
				return;
			}
			c.oResizeHandler.detachListener(i);
		};
		R.deregisterAllForControl = function (C) {
			if (!c || !c.oResizeHandler) {
				return;
			}
			c.oResizeHandler.aResizeListeners.filter(function (r) {
				return r && r.oControl && r.oControl.getId() === C;
			}).forEach(function (r) {
				R.deregister(r.sId);
			});
		};
		return R;
	});
	sap.ui.predefine('sap/ui/core/ThemeCheck', ['jquery.sap.global', 'sap/ui/Device', 'sap/ui/Global', 'sap/ui/base/Object', 'sap/ui/thirdparty/URI', 'jquery.sap.script'], function (q, D, G, B, U) {
		"use strict";
		var m = 150;
		var T = B.extend("sap.ui.core.ThemeCheck", {
			constructor: function (C) {
				this._oCore = C;
				this._iCount = 0;
				this._CUSTOMCSSCHECK = /\.sapUiThemeDesignerCustomCss/i;
				this._CUSTOMID = "sap-ui-core-customcss";
				this._customCSSAdded = false;
				this._themeCheckedForCustom = null;
				this._sFallbackTheme = null;
				this._mThemeFallback = {};
				this._oThemeMetaDataCheckElement = null;
			},
			getInterface: function () {
				return this;
			},
			fireThemeChangedEvent: function (o) {
				c(this);
				d.apply(this, [true]);
				if (!o && !this._sThemeCheckId) {
					this._oCore.fireThemeChanged({
						theme: this._oCore.getConfiguration().getTheme()
					});
				}
			}
		});
		T.themeLoaded = false;

		function s(f) {
			try {
				return f.cssRules;
			} catch (e) {
				if (e.name !== 'SecurityError' && e.name !== 'InvalidAccessError') {
					throw e;
				} else {
					return null;
				}
			}
		}

		function h(e) {
			var C = s(e);
			return !!C && C.length > 0;
		}
		T.checkStyle = function (i, l) {
			var S = document.getElementById(i);
			try {
				var n = false,
					L = false,
					f = false,
					I = false;
				n = !S;
				L = !!(S && (S.getAttribute("data-sap-ui-ready") === "true" || S.getAttribute("data-sap-ui-ready") === "false"));
				f = !!(S && S.sheet && S.sheet.href === S.href && h(S.sheet));
				I = !!(S && S.innerHTML && S.innerHTML.length > 0);
				var r = n || f || I || L;
				if (l) {
					q.sap.log.debug("ThemeCheck: " + i + ": " + r + " (noLinkElement: " + n + ", sheet: " + f + ", innerHtml: " + I + ", linkElementFinishedLoading: " + L + ")");
				}
				return r;
			} catch (e) {
				if (l) {
					q.sap.log.error("ThemeCheck: " + i + ": Error during check styles '" + i + "'", e);
				}
			}
			return false;
		};

		function c(t) {
			T.themeLoaded = false;
			if (t._sThemeCheckId) {
				q.sap.clearDelayedCall(t._sThemeCheckId);
				t._sThemeCheckId = null;
				t._iCount = 0;
				t._sFallbackTheme = null;
				t._mThemeFallback = {};
				if (t._oThemeMetaDataCheckElement && t._oThemeMetaDataCheckElement.parentNode) {
					t._oThemeMetaDataCheckElement.parentNode.removeChild(t._oThemeMetaDataCheckElement);
					t._oThemeMetaDataCheckElement = null;
				}
			}
		}

		function a(t) {
			var L = t._oCore.getLoadedLibraries();
			var e = t._oCore.getConfiguration().getTheme();
			var p = t._oCore._getThemePath("sap.ui.core", e) + "custom.css";
			var I = e.indexOf("sap_") === 0 || e === "base";
			var r = true;
			var f = [];
			if (!!t._customCSSAdded && t._themeCheckedForCustom === e) {
				L[t._CUSTOMID] = {};
			}

			function j(k) {
				var S = "sap-ui-theme-" + k;
				var n = T.checkStyle(S, true);
				if (n) {
					var o = document.querySelectorAll("link[data-sap-ui-foucmarker='" + S + "']");
					if (o.length > 0) {
						for (var i = 0, l = o.length; i < l; i++) {
							o[i].parentNode.removeChild(o[i]);
						}
						q.sap.log.debug("ThemeCheck: Old stylesheets removed for library: " + k);
					}
				}
				r = r && n;
				if (r) {
					if (t._themeCheckedForCustom != e) {
						if (!I && b(t, k)) {
							var C = p;
							var u = t._oCore._getLibraryCssQueryParams(L["sap.ui.core"]);
							if (u) {
								C += u;
							}
							q.sap.includeStyleSheet(C, t._CUSTOMID);
							t._customCSSAdded = true;
							q.sap.log.warning("ThemeCheck: delivered custom CSS needs to be loaded, Theme not yet applied");
							t._themeCheckedForCustom = e;
							r = false;
							return false;
						} else {
							var v = q("LINK[id='" + t._CUSTOMID + "']");
							if (v.length > 0) {
								v.remove();
								q.sap.log.debug("ThemeCheck: Custom CSS removed");
							}
							t._customCSSAdded = false;
						}
					}
				}
				if (!I && n && !t._mThemeFallback[k]) {
					var w = document.getElementById(S);
					if (w && w.getAttribute("data-sap-ui-ready") === "false" && !(w.sheet && h(w.sheet))) {
						f.push(k);
					}
				}
			}
			q.each(L, j);
			if (f.length > 0) {
				if (!t._sFallbackTheme) {
					if (!t._oThemeMetaDataCheckElement) {
						t._oThemeMetaDataCheckElement = document.createElement("style");
						q.each(L, function (l) {
							var C = "sapThemeMetaData-UI5-" + l.replace(/\./g, "-");
							t._oThemeMetaDataCheckElement.classList.add(C);
						});
						document.head.appendChild(t._oThemeMetaDataCheckElement);
					}
					t._sFallbackTheme = g(t._oThemeMetaDataCheckElement);
				}
				if (t._sFallbackTheme) {
					f.forEach(function (l) {
						var S = "sap-ui-theme-" + l;
						var o = document.getElementById(S);
						q.sap.log.warning("ThemeCheck: Custom theme '" + e + "' could not be loaded for library '" + l + "'. " + "Falling back to its base theme '" + t._sFallbackTheme + "'.");
						t._oCore._updateThemeUrl(o, t._sFallbackTheme);
						t._mThemeFallback[l] = true;
					});
					r = false;
				}
			}
			if (!r) {
				q.sap.log.warning("ThemeCheck: Theme not yet applied.");
			} else {
				t._themeCheckedForCustom = e;
			}
			return r;
		}

		function g(t) {
			function e() {
				var f = window.getComputedStyle(t).getPropertyValue("background-image");
				var i = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)/i.exec(f);
				if (!i || i.length < 2) {
					return null;
				}
				var M = i[1];
				if (M.charAt(0) !== "{" && M.charAt(M.length - 1) !== "}") {
					try {
						M = decodeURI(M);
					} catch (j) {}
				}
				M = M.replace(/\\"/g, '"');
				M = M.replace(/%20/g, " ");
				try {
					return JSON.parse(M);
				} catch (j) {
					return null;
				}
			}
			var o = e();
			if (o && o.Extends && o.Extends[0]) {
				return o.Extends[0];
			} else {
				return null;
			}
		}

		function b(t, l) {
			var f = q.sap.domById("sap-ui-theme-" + l);
			if (!f) {
				return false;
			}
			var j = window.getComputedStyle(f, ':after');
			var k = j ? j.getPropertyValue('content') : null;
			if (!k && D.browser.safari) {
				var n = document.documentElement;
				n.classList.add("sapUiThemeDesignerCustomCss");
				k = window.getComputedStyle(n, ":after").getPropertyValue("content");
				n.classList.remove("sapUiThemeDesignerCustomCss");
			}
			if (k && k !== "none") {
				try {
					if (k[0] === "'" || k[0] === '"') {
						k = k.substring(1, k.length - 1);
					}
					return k === "true";
				} catch (e) {
					q.sap.log.error("Custom check: Error parsing JSON string for custom.css indication.", e);
				}
			}
			var r = f.sheet ? s(f.sheet) : null;
			if (!r || r.length === 0) {
				q.sap.log.warning("Custom check: Failed retrieving a CSS rule from stylesheet " + l);
				return false;
			}
			for (var i = 0;
				(i < 2 && i < r.length); i++) {
				if (t._CUSTOMCSSCHECK.test(r[i].selectorText)) {
					return true;
				}
			}
			return false;
		}

		function d(f) {
			this._iCount++;
			var e = this._iCount > m;
			if (!a(this) && !e) {
				var i;
				if (this._iCount <= 100) {
					i = 2;
				} else if (this._iCount <= 110) {
					i = 500;
				} else {
					i = 1000;
				}
				this._sThemeCheckId = q.sap.delayedCall(i, this, d);
			} else if (!f) {
				c(this);
				T.themeLoaded = true;
				this._oCore.fireThemeChanged({
					theme: this._oCore.getConfiguration().getTheme()
				});
				if (e) {
					q.sap.log.warning("ThemeCheck: max. check cycles reached.");
				}
			} else {
				T.themeLoaded = true;
			}
		}
		return T;
	});
	sap.ui.predefine('sap/ui/core/UIArea', ['jquery.sap.global', 'sap/ui/base/ManagedObject', './Element', './RenderManager', 'jquery.sap.act', 'jquery.sap.ui', 'jquery.sap.keycodes', 'jquery.sap.trace'], function (q, M, E, R) {
		"use strict";
		var C;
		var r = q.sap.log.getLogger("sap.ui.Rendering", ((window["sap-ui-config"] && window["sap-ui-config"]["xx-debugRendering"]) || /sap-ui-xx-debug(R|-r)endering=(true|x|X)/.test(document.location.search)) ? q.sap.log.Level.DEBUG : Math.min(q.sap.log.Level.INFO, q.sap.log.getLevel())),
			d = function (c) {
				return c;
			},
			D = q.noop,
			f = q.noop;
		if (r.isLoggable()) {
			d = function (c) {
				var l;
				try {
					throw new Error();
				} catch (e) {
					l = e.stack || e.stacktrace || (e.sourceURL ? e.sourceURL + ":" + e.line : null);
					l = l ? l.split(/\n\s*/g).slice(2) : undefined;
				}
				return {
					obj: c,
					location: l
				};
			};
			D = function (t, c) {
				var o = sap.ui.getCore(),
					m = {},
					n, b;
				for (n in c) {
					b = o.byId(n);
					m[n] = {
						type: b ? b.getMetadata().getName() : (c[n].obj === t ? "UIArea" : "(no such control)"),
						location: c[n].location,
						reason: c[n].reason
					};
				}
				r.debug("  UIArea '" + t.getId() + "', pending updates: " + JSON.stringify(m, null, "\t"));
			};
			f = function (b, A) {
				var n;
				for (n in A) {
					if (b[n] != null) {
						if (b[n].obj !== A[n].obj) {
							A[n].reason = "replaced during rendering";
						} else {
							A[n].reason = "invalidated again during rendering";
						}
					} else {
						A[n].reason = "invalidated during rendering";
					}
				}
			};
		}
		var U = M.extend("sap.ui.core.UIArea", {
			constructor: function (c, o) {
				if (arguments.length === 0) {
					return;
				}
				M.apply(this);
				this.oCore = c;
				this.bLocked = false;
				this.bInitial = true;
				this.aContentToRemove = [];
				this.bNeedsRerendering = false;
				if (o != null) {
					this.setRootNode(o);
					this.bNeedsRerendering = this.bNeedsRerendering && !q.sap.domById(o.id + "-Init");
				}
				this.mInvalidatedControls = {};
				if (!this.bNeedsRerendering) {
					this.bRenderSelf = false;
				} else {
					this.oCore.addInvalidatedUIArea(this);
				}
			},
			metadata: {
				publicMethods: ["setRootNode", "getRootNode", "setRootControl", "getRootControl", "lock", "unlock", "isLocked"],
				aggregations: {
					content: {
						name: "content",
						type: "sap.ui.core.Control",
						multiple: true,
						singularName: "content"
					},
					dependents: {
						name: "dependents",
						type: "sap.ui.core.Control",
						multiple: true
					}
				}
			}
		});
		U.prototype.isInvalidateSuppressed = function () {
			return this.iSuppressInvalidate > 0;
		};
		U.prototype.getId = function () {
			return this.oRootNode ? this.oRootNode.id : null;
		};
		U.prototype.getUIArea = function () {
			return this;
		};
		U.prototype.setRootNode = function (o) {
			if (this.oRootNode === o) {
				return;
			}
			if (this.oRootNode) {
				this._ondetach();
			}
			this.oRootNode = o;
			if (this.getContent().length > 0) {
				this.invalidate();
			}
			if (this.oRootNode) {
				this._onattach();
			}
		};
		U.prototype.getRootNode = function () {
			return this.oRootNode;
		};
		U.prototype.setRootControl = function (o) {
			this.removeAllContent();
			this.addContent(o);
		};
		U.prototype.getRootControl = function (i) {
			var c = this.getContent();
			if (c.length > 0) {
				if (i >= 0 && i < c.length) {
					return c[i];
				}
				return c[0];
			}
			return null;
		};
		U.prototype._addRemovedContent = function (o) {
			if (this.oRootNode && o) {
				this.aContentToRemove.push(o);
			}
		};
		U.prototype.addContent = function (c, _) {
			this.addAggregation("content", c, _);
			if (_ !== true) {
				this.invalidate();
			}
			return this;
		};
		U.prototype.removeContent = function (c, _) {
			var o = this.removeAggregation("content", c, _);
			if (!_) {
				var b;
				if (o && o.getDomRef) {
					b = o.getDomRef();
				}
				this._addRemovedContent(b);
			}
			return o;
		};
		U.prototype.removeAllContent = function () {
			var c = this.removeAllAggregation("content");
			for (var i = 0; i < c.length; i++) {
				var o;
				var b = c[i];
				if (b && b.getDomRef) {
					o = b.getDomRef();
				}
				this._addRemovedContent(o);
			}
			return c;
		};
		U.prototype.destroyContent = function () {
			var c = this.getContent();
			for (var i = 0; i < c.length; i++) {
				var o;
				var b = c[i];
				if (b && b.getDomRef) {
					o = b.getDomRef();
				}
				this._addRemovedContent(o);
			}
			this.destroyAggregation("content");
			return this;
		};
		U.prototype.lock = function () {
			this.bLocked = true;
		};
		U.prototype.unlock = function () {
			if (this.bLocked && this.bNeedsRerendering) {
				this.oCore.addInvalidatedUIArea(this);
			}
			this.bLocked = false;
		};
		U.prototype.isLocked = function () {
			return this.bLocked;
		};
		U.prototype.getBindingContext = function () {
			return null;
		};
		U.prototype.getEventingParent = function () {
			return this.oCore._getEventProvider();
		};
		U.prototype.isActive = function () {
			return q.sap.domById(this.getId()) != null;
		};
		U.prototype.invalidate = function () {
			this.addInvalidatedControl(this);
		};
		U.prototype.addInvalidatedControl = function (c) {
			if (this.bRenderSelf) {
				return;
			}
			if (!this.bNeedsRerendering) {
				this.oCore.addInvalidatedUIArea(this);
			}
			var i = c.getId();
			if (c === this) {
				this.bRenderSelf = true;
				this.bNeedsRerendering = true;
				this.mInvalidatedControls = {};
				this.mInvalidatedControls[i] = d(this);
				return;
			}
			if (this.mInvalidatedControls[i]) {
				return;
			}
			if (!this.bRenderSelf) {
				this.mInvalidatedControls[i] = d(c);
				this.bNeedsRerendering = true;
			}
		};
		U.prototype.rerender = function (b) {
			var t = this;

			function c() {
				t.bRenderSelf = false;
				t.aContentToRemove = [];
				t.mInvalidatedControls = {};
				t.bNeedsRerendering = false;
			}

			function g() {
				try {
					return document.activeElement;
				} catch (y) {}
			}
			if (b) {
				this.bNeedsRerendering = true;
			}
			if (this.bLocked || !this.bNeedsRerendering) {
				return false;
			}
			var h = this.bRenderSelf,
				j = this.aContentToRemove,
				I = this.mInvalidatedControls,
				u = false;
			c();
			q.sap.measure.pause("renderPendingUIUpdates");
			q.sap.measure.start(this.getId() + "---rerender", "Rerendering of " + this.getMetadata().getName());
			D(this, I);
			if (h) {
				if (this.oRootNode) {
					r.debug("Full Rendering of UIArea '" + this.getId() + "'");
					R.preserveContent(this.oRootNode, false, this.bInitial);
					this.bInitial = false;
					var k = function (y, z) {
						var m = y.length;
						var A;
						for (var i = 0; i < m; i++) {
							A = z ? y[i].getDomRef() : y[i];
							if (A && !R.isPreservedContent(A) && t.oRootNode === A.parentNode) {
								q(A).remove();
							}
						}
						return m;
					};
					var F = g();
					var s = this.oCore.oFocusHandler.getControlFocusInfo();
					k(j);
					var l = this.getContent();
					var m = k(l, true);
					var o = g();
					for (var i = 0; i < m; i++) {
						if (l[i] && l[i].getParent() === this) {
							this.oCore.oRenderManager.render(l[i], this.oRootNode, true);
						}
					}
					u = true;
					if (F && F != o && o === g()) {
						try {
							this.oCore.oFocusHandler.restoreFocus(s);
						} catch (e) {
							q.sap.log.warning("Problems while restoring the focus after full UIArea rendering: " + e, null, this);
						}
					}
				} else {
					r.debug("Full Rendering of UIArea '" + this.getId() + "' postponed, no root node");
				}
			} else {
				var w = function (y) {
					for (;;) {
						if (y.getMetadata && y.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")) {
							break;
						}
						y = y.getParent();
						if (!y || y === t) {
							return false;
						}
						if (I.hasOwnProperty(y.getId())) {
							return true;
						}
					}
				};
				for (var n in I) {
					var x = this.oCore.byId(n);
					if (x && !w(x)) {
						x.rerender();
						u = true;
					}
				}
			}
			f(I, this.mInvalidatedControls);
			q.sap.measure.end(this.getId() + "---rerender");
			q.sap.measure.resume("renderPendingUIUpdates");
			return u;
		};
		U.prototype._onControlRendered = function (c) {
			var i = c.getId();
			if (this.mInvalidatedControls[i]) {
				delete this.mInvalidatedControls[i];
			}
		};
		U.rerenderControl = function (c) {
			var o = null;
			if (c) {
				o = c.getDomRef();
				if (!o || R.isPreservedContent(o)) {
					o = q.sap.domById(R.RenderPrefixes.Invisible + c.getId());
				}
			}
			var b = o && o.parentNode;
			if (b) {
				var u = c.getUIArea();
				var e = u ? u.oCore.oRenderManager : sap.ui.getCore().createRenderManager();
				r.debug("Rerender Control '" + c.getId() + "'" + (u ? "" : " (using a temp. RenderManager)"));
				R.preserveContent(o, true, false);
				e.render(c, b);
			} else {
				var u = c.getUIArea();
				u && u._onControlRendered(c);
				r.warning("Couldn't rerender '" + c.getId() + "', as its DOM location couldn't be determined");
			}
		};
		var a = /^(mousedown|mouseup|click|keydown|keyup|keypress|touchstart|touchend|tap)$/;
		var p = [],
			P = [];
		var v = {
			mousemove: 1,
			mouseover: 1,
			mouseout: 1,
			scroll: 1,
			dragover: 1,
			dragenter: 1,
			dragleave: 1
		};
		U.addEventPreprocessor = function (b) {
			p.push(b);
		};
		U.getEventPreprocessors = function () {
			return p;
		};
		U.addEventPostprocessor = function (b) {
			P.push(b);
		};
		U.getEventPostprocessors = function () {
			return P;
		};
		U.prototype._handleEvent = function (e) {
			var o = null,
				I;
			o = q(e.target).control(0);
			q.sap.act.refresh();
			if (o === null) {
				return;
			}
			if (e.isMarked("delayedMouseEvent")) {
				return;
			}
			var h = e.getMark("handledByUIArea"),
				s = this.getId();
			if (h && h !== s) {
				e.setMark("firstUIArea", false);
				return;
			}
			e.setMarked("firstUIArea");
			e.srcControl = o;
			if (e.type === "contextmenu" && e.shiftKey && e.altKey && !!(e.metaKey || e.ctrlKey)) {
				q.sap.log.info("Suppressed forwarding the contextmenu event as control event because CTRL+SHIFT+ALT is pressed!");
				return;
			}
			p.forEach(function (m) {
				m(e);
			});
			this.oCore._handleControlEvent(e, s);
			if (this.bLocked || this.oCore.isLocked()) {
				return;
			}
			if (q.sap.interaction.getActive()) {
				I = e.type.match(a);
				if (I) {
					q.sap.interaction.notifyEventStart(e);
				}
			}
			var b = [];
			if (e.getPseudoTypes) {
				b = e.getPseudoTypes();
			}
			b.push(e.type);
			var g = false;
			while (o instanceof E && o.isActive() && !e.isPropagationStopped()) {
				for (var i = 0, c = b.length; i < c; i++) {
					var t = b[i];
					e.type = t;
					e.currentTarget = o.getDomRef();
					o._handleEvent(e);
					if (e.isImmediatePropagationStopped()) {
						break;
					}
				}
				if (!g) {
					g = this._handleGroupChange(e, o);
				}
				if (e.isPropagationStopped()) {
					break;
				}
				if (o.bStopEventBubbling) {
					break;
				}
				var j = o.getDomRef();
				if (!j) {
					break;
				}
				j = j.parentNode;
				o = null;
				if (e.isMarked("fromMouseout") && q.sap.containsOrEquals(j, e.relatedTarget)) {
					break;
				}
				while (j && j !== this.getRootNode()) {
					if (j.id) {
						o = q(j).control(0);
						if (o) {
							break;
						}
					}
					j = j.parentNode;
				}
			}
			P.forEach(function (m) {
				m(e);
			});
			if (I) {
				q.sap.interaction.notifyEventEnd(e);
			}
			e.currentTarget = this.getRootNode();
			e.setMark("handledByUIArea", s);
			if (e.isPropagationStopped()) {
				q.sap.log.debug("'" + e.type + "' propagation has been stopped");
			}
			var k = e.type;
			if (!v[k]) {
				var l = q(e.target).control(0);
				if (l) {
					q.sap.log.debug("Event fired: '" + k + "' on " + l, "", "sap.ui.core.UIArea");
				} else {
					q.sap.log.debug("Event fired: '" + k + "'", "", "sap.ui.core.UIArea");
				}
			}
		};
		U.prototype._onattach = function () {
			var o = this.getRootNode();
			if (o == null) {
				return;
			}
			q(o).attr("data-sap-ui-area", o.id).bind(q.sap.ControlEvents.join(" "), this._handleEvent.bind(this));
		};
		U.prototype._ondetach = function () {
			var o = this.getRootNode();
			if (o == null) {
				return;
			}
			q(o).removeAttr("data-sap-ui-area").unbind();
		};
		U.prototype.clone = function () {
			throw new Error("UIArea can't be cloned");
		};
		U.prototype._handleGroupChange = function (e, o) {
			var k = U._oFieldGroupValidationKey;
			if (e.type === "focusin") {
				if (U._iFieldGroupDelayTimer) {
					q.sap.clearDelayedCall(U._iFieldGroupDelayTimer);
					U._iFieldGroupDelayTimer = null;
				}
				U._iFieldGroupDelayTimer = q.sap.delayedCall(0, this, this.setFieldGroupControl, [o]);
				return true;
			} else if (this.getFieldGroupControl() && e.type === "keyup" && e.keyCode === k.keyCode && e.shiftKey === k.shiftKey && e.altKey === k.altKey && e.ctrlKey === k.ctrlKey) {
				if (U._iFieldGroupTriggerDelay) {
					q.sap.clearDelayedCall(U._iFieldGroupTriggerDelay);
				}
				var c = this.getFieldGroupControl(),
					b = (c ? c._getFieldGroupIds() : []);
				if (b.length > 0) {
					c.triggerValidateFieldGroup(b);
				}
				return true;
			}
			return false;
		};
		U.prototype.setFieldGroupControl = function (e) {
			function b(e, h) {
				var j = e.getParent();
				if (j) {
					if (h(j)) {
						return j;
					} else {
						return b(j, h);
					}
				}
				return null;
			}
			var c = this.getFieldGroupControl();
			if (e != c) {
				var o = null;
				C = C || sap.ui.require('sap/ui/core/Control');
				if (C) {
					if (e instanceof C) {
						o = e;
					} else {
						o = b(e, function (e) {
							return e instanceof C;
						});
					}
				}
				var g = (c ? c._getFieldGroupIds() : []),
					n = (o ? o._getFieldGroupIds() : []),
					t = [];
				for (var i = 0; i < g.length; i++) {
					var s = g[i];
					if (n.indexOf(s) === -1) {
						t.push(s);
					}
				}
				if (t.length > 0) {
					c.triggerValidateFieldGroup(t);
				}
				U._oFieldGroupControl = o;
			}
			return this;
		};
		U.prototype.getFieldGroupControl = function () {
			if (U._oFieldGroupControl && !U._oFieldGroupControl.bIsDestroyed) {
				return U._oFieldGroupControl;
			}
			return null;
		};
		U._oFieldGroupControl = null;
		U._iFieldGroupDelayTimer = null;
		U._oFieldGroupValidationKey = {
			keyCode: q.sap.KeyCodes.ENTER,
			shiftKey: false,
			altKey: false,
			ctrlKey: false
		};
		U._oRenderLog = r;
		return U;
	});
	sap.ui.predefine('sap/ui/core/message/ControlMessageProcessor', ['jquery.sap.global', 'sap/ui/core/message/MessageProcessor'], function (q, M) {
		"use strict";
		var C = M.extend("sap.ui.core.message.ControlMessageProcessor", {
			constructor: function () {
				if (!C._instance) {
					M.apply(this, arguments);
					C._instance = this;
				}
				return C._instance;
			},
			metadata: {}
		});
		C._instance = null;
		C.prototype.setMessages = function (m) {
			this.mOldMessages = this.mMessages === null ? {} : this.mMessages;
			this.mMessages = m || {};
			this.checkMessages();
			delete this.mOldMessages;
		};
		C.prototype.checkMessages = function () {
			var m, t = this,
				a = q.extend(this.mMessages, {});
			q.each(this.mOldMessages, function (T) {
				if (!(T in a)) {
					a[T] = [];
				}
			});
			q.each(a, function (T) {
				var b, c, p = T.split('/');
				if (!p[0]) {
					p.shift();
				}
				c = sap.ui.getCore().byId(p[0]);
				if (!c) {
					return;
				}
				b = c.getBinding(p[1]);
				m = t.mMessages[T] ? t.mMessages[T] : [];
				if (b) {
					var d = b.getDataState();
					d.setControlMessages(m);
					b.checkDataState();
				} else {
					c.propagateMessages(p[1], m);
				}
			});
		};
		return C;
	});
	sap.ui.predefine('sap/ui/core/message/Message', ['jquery.sap.global', 'sap/ui/base/Object', './MessageProcessor'], function (q, O, M) {
		"use strict";
		var a = O.extend("sap.ui.core.message.Message", {
			constructor: function (p) {
				O.apply(this, arguments);
				this.id = p.id ? p.id : q.sap.uid();
				this.message = p.message;
				this.description = p.description;
				this.descriptionUrl = p.descriptionUrl;
				this.additionalText = p.additionalText;
				this.setType(p.type);
				this.code = p.code;
				this.target = p.target;
				this.processor = p.processor;
				this.persistent = p.persistent || false;
				this.technical = p.technical || false;
				this.references = p.references || {};
				this.validation = !!p.validation;
				this.date = p.date || Date.now();
			}
		});
		a.prototype.getId = function () {
			return this.id;
		};
		a.prototype.setMessage = function (m) {
			this.message = m;
		};
		a.prototype.getMessage = function () {
			return this.message;
		};
		a.prototype.setDescription = function (d) {
			this.description = d;
		};
		a.prototype.getDescription = function () {
			return this.description;
		};
		a.prototype.setAdditionalText = function (A) {
			this.additionalText = A;
		};
		a.prototype.getAdditionalText = function () {
			return this.additionalText;
		};
		a.prototype.getDescriptionUrl = function () {
			return this.descriptionUrl;
		};
		a.prototype.setDescriptionUrl = function (d) {
			this.descriptionUrl = d;
		};
		a.prototype.setType = function (t) {
			if (t in sap.ui.core.MessageType) {
				this.type = t;
			} else {
				q.sap.log.error("MessageType must be of type sap.ui.core.MessageType");
			}
		};
		a.prototype.getType = function () {
			return this.type;
		};
		a.prototype.setTarget = function (t) {
			this.target = t;
		};
		a.prototype.getTarget = function () {
			return this.target;
		};
		a.prototype.setMessageProcessor = function (m) {
			if (m instanceof M) {
				this.processor = m;
			} else {
				q.sap.log.error("MessageProcessor must be an instance of sap.ui.core.message.MessageProcessor");
			}
		};
		a.prototype.getMessageProcessor = function () {
			return this.processor;
		};
		a.prototype.setCode = function (c) {
			this.code = c;
		};
		a.prototype.getCode = function () {
			return this.code;
		};
		a.prototype.setPersistent = function (p) {
			this.persistent = p;
		};
		a.prototype.getPersistent = function () {
			return this.persistent;
		};
		a.prototype.setTechnical = function (t) {
			this.technical = t;
		};
		a.prototype.getTechnical = function () {
			return this.technical;
		};
		a.prototype.addReference = function (i, p) {
			if (!i) {
				return;
			}
			if (!this.references[i]) {
				this.references[i] = {
					properties: {}
				};
			}
			if (!this.references[i].properties[p]) {
				this.references[i].properties[p] = true;
			}
		};
		a.prototype.removeReference = function (i, p) {
			if (!i) {
				return;
			}
			if (i in this.references) {
				if (!p) {
					delete this.references[i];
				} else {
					if (this.references[i].properties[p]) {
						delete this.references[i].properties[p];
					}
				}
			}
		};
		a.prototype.setDate = function (d) {
			this.date = d;
		};
		a.prototype.getDate = function () {
			return this.date;
		};
		return a;
	});
	sap.ui.predefine('sap/ui/core/message/MessageManager', ['jquery.sap.global', 'sap/ui/base/EventProvider', 'sap/ui/base/ManagedObject', 'sap/ui/model/message/MessageModel', './Message', './ControlMessageProcessor'], function (q, E, M, c, d, C) {
		"use strict";
		var e = E.extend("sap.ui.core.message.MessageManager", {
			constructor: function () {
				E.apply(this, arguments);
				this.mProcessors = {};
				this.mObjects = {};
				this.mMessages = {};
				var h = sap.ui.getCore().getConfiguration().getHandleValidation();
				if (h) {
					sap.ui.getCore().attachValidationSuccess(h, this._handleSuccess, this);
					sap.ui.getCore().attachValidationError(h, this._handleError, this);
					sap.ui.getCore().attachParseError(h, this._handleError, this);
					sap.ui.getCore().attachFormatError(h, this._handleError, this);
				}
			},
			metadata: {
				publicMethods: ["addMessages", "removeMessages", "removeAllMessages", "registerMessageProcessor", "unregisterMessageProcessor", "registerObject", "unregisterObject", "getMessageModel", "destroy"]
			}
		});
		e.prototype._handleError = function (o, h) {
			if (!this.oControlMessageProcessor) {
				this.oControlMessageProcessor = new C();
			}
			if (h) {
				var a = o.getParameter("element");
				var p = o.getParameter("property");
				var t = a.getId() + '/' + p;
				var P = this.oControlMessageProcessor.getId();
				var T = o.sId === "formatError";
				if (this.mMessages[P] && this.mMessages[P][t]) {
					this._removeMessages(this.mMessages[P][t], true);
				}
				var r = {};
				r[a.getId()] = {
					properties: {},
					fieldGroupIds: a.getFieldGroupIds ? a.getFieldGroupIds() : undefined
				};
				r[a.getId()].properties[p] = true;
				var m = new d({
					type: sap.ui.core.MessageType.Error,
					message: o.getParameter("message"),
					target: t,
					processor: this.oControlMessageProcessor,
					technical: T,
					references: r,
					validation: true
				});
				this.addMessages(m);
			}
			o.cancelBubble();
		};
		e.prototype._handleSuccess = function (o, h) {
			if (!this.oControlMessageProcessor) {
				this.oControlMessageProcessor = new C();
			}
			if (h) {
				var a = o.getParameter("element");
				var p = o.getParameter("property");
				var t = a.getId() + '/' + p;
				var P = this.oControlMessageProcessor.getId();
				if (this.mMessages[P] && this.mMessages[P][t]) {
					this._removeMessages(this.mMessages[P][t], true);
				}
			}
			o.cancelBubble();
		};
		e.prototype.addMessages = function (m) {
			var o = m;
			if (!m) {
				return;
			} else if (Array.isArray(m)) {
				for (var i = 0; i < m.length; i++) {
					o = m[i];
					this._importMessage(o);
				}
			} else {
				this._importMessage(m);
			}
			this._updateMessageModel();
		};
		e.prototype._importMessage = function (m) {
			var s = m.getTarget(),
				p = m.getMessageProcessor(),
				P = p && p.getId();
			if (!this.mMessages[P]) {
				this.mMessages[P] = {};
			}
			var a = this.mMessages[P][s] ? this.mMessages[P][s] : [];
			a.push(m);
			this.mMessages[P][s] = a;
		};
		e.prototype._pushMessages = function () {
			var t = this;
			q.each(this.mProcessors, function (i, p) {
				var m = t.mMessages[i] ? t.mMessages[i] : {};
				t._sortMessages(m);
				m = Object.keys(m).length === 0 ? null : q.extend(true, {}, m);
				p.setMessages(m);
			});
		};
		e.prototype._sortMessages = function (m) {
			var s = {
				'Error': 0,
				'Warning': 1,
				'Success': 2,
				'Information': 3
			};
			if (Array.isArray(m)) {
				m = {
					"ignored": m
				};
			}
			q.each(m, function (t, f) {
				if (f.length > 0) {
					f.sort(function (a, b) {
						return s[a.type] - s[b.type];
					});
				}
			});
		};
		e.prototype._updateMessageModel = function () {
			var m = [];
			var o = this.getMessageModel();
			q.each(this.mMessages, function (p, a) {
				q.each(a, function (k, v) {
					m = q.merge(m, v);
				});
			});
			this._pushMessages();
			o.setData(m);
		};
		e.prototype.removeAllMessages = function () {
			this.aMessages = [];
			this.mMessages = {};
			this._updateMessageModel();
		};
		e.prototype.removeMessages = function (m) {
			return this._removeMessages.apply(this, arguments);
		};
		e.prototype._removeMessages = function (m, o) {
			var t = this;
			if (!m || (Array.isArray(m) && m.length == 0)) {
				return;
			} else if (Array.isArray(m)) {
				var O = m.slice(0);
				for (var i = 0; i < O.length; i++) {
					if (!o || O[i].validation) {
						t._removeMessage(O[i]);
					}
				}
			} else if (m instanceof d && (!o || m.validation)) {
				t._removeMessage(m);
			} else {
				q.each(m, function (T, a) {
					t._removeMessages(a, o);
				});
			}
			this._updateMessageModel();
		};
		e.prototype._removeMessage = function (m) {
			var p = m.getMessageProcessor(),
				P = p && p.getId(),
				a = this.mMessages[P];
			if (!a) {
				return;
			}
			var b = a[m.getTarget()];
			if (b) {
				for (var i = 0; i < b.length; i++) {
					var o = b[i];
					if (q.sap.equal(o, m)) {
						b.splice(i, 1);
						--i;
					}
				}
				if (a[m.getTarget()].length === 0) {
					delete a[m.getTarget()];
				}
			}
		};
		e.prototype.onMessageChange = function (o) {
			var O = o.getParameter('oldMessages');
			var n = o.getParameter('newMessages');
			this.removeMessages(O);
			this.addMessages(n);
		};
		e.prototype.registerMessageProcessor = function (p) {
			var P = p.getId();
			if (!this.mProcessors[P]) {
				this.mProcessors[P] = p;
				p.attachMessageChange(this.onMessageChange, this);
				if (P in this.mMessages) {
					this._pushMessages();
				}
			}
		};
		e.prototype.unregisterMessageProcessor = function (p) {
			this.removeMessages(this.mMessages[p.getId()]);
			delete this.mProcessors[p.getId()];
			p.detachMessageChange(this.onMessageChange, this);
		};
		e.prototype.registerObject = function (o, h) {
			if (!o instanceof M) {
				q.sap.log.error(this + " : " + o.toString() + " is not an instance of sap.ui.base.ManagedObject");
				return;
			}
			o.attachValidationSuccess(h, this._handleSuccess, this);
			o.attachValidationError(h, this._handleError, this);
			o.attachParseError(h, this._handleError, this);
			o.attachFormatError(h, this._handleError, this);
		};
		e.prototype.unregisterObject = function (o) {
			if (!o instanceof M) {
				q.sap.log.error(this + " : " + o.toString() + " is not an instance of sap.ui.base.ManagedObject");
				return;
			}
			o.detachValidationSuccess(this._handleSuccess);
			o.detachValidationError(this._handleError);
			o.detachParseError(this._handleError);
			o.detachFormatError(this._handleError);
		};
		e.prototype.destroy = function () {
			q.sap.log.warning("Deprecated: Do not call destroy on a MessageManager");
		};
		e.prototype.getMessageModel = function () {
			if (!this.oMessageModel) {
				this.oMessageModel = new c(this);
				this.oMessageModel.setData([]);
			}
			return this.oMessageModel;
		};
		return e;
	});
	sap.ui.predefine('sap/ui/core/message/MessageProcessor', ['jquery.sap.global', 'sap/ui/base/EventProvider'], function (q, E) {
		"use strict";
		var M = E.extend("sap.ui.core.message.MessageProcessor", {
			constructor: function () {
				E.apply(this, arguments);
				this.mMessages = null;
				this.id = q.sap.uid();
				sap.ui.getCore().getMessageManager().registerMessageProcessor(this);
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getId", "setMessages", "attachMessageChange", "detachMessageChange"]
			}
		});
		M.M_EVENTS = {
			messageChange: "messageChange"
		};
		M.prototype.attachMessageChange = function (d, f, l) {
			this.attachEvent("messageChange", d, f, l);
			return this;
		};
		M.prototype.detachMessageChange = function (f, l) {
			this.detachEvent("messageChange", f, l);
			return this;
		};
		M.prototype.fireMessageChange = function (a) {
			this.fireEvent("messageChange", a);
			return this;
		};
		M.prototype.getId = function () {
			return this.id;
		};
		M.prototype.destroy = function () {
			sap.ui.getCore().getMessageManager().unregisterMessageProcessor(this);
			E.prototype.destroy.apply(this, arguments);
		};
		return M;
	});
	sap.ui.predefine('sap/ui/model/Binding', ['jquery.sap.global', 'sap/ui/base/EventProvider', './ChangeReason', './DataState'], function (q, E, C, D) {
		"use strict";
		var B = E.extend("sap.ui.model.Binding", {
			constructor: function (m, p, c, P) {
				E.apply(this);
				this.oModel = m;
				this.bRelative = !q.sap.startsWith(p, '/');
				this.sPath = p;
				this.oContext = c;
				this.vMessages = undefined;
				this.mParameters = P;
				this.bInitial = false;
				this.bSuspended = false;
				this.oDataState = null;
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getPath", "getContext", "getModel", "attachChange", "detachChange", "refresh", "isInitial", "attachDataStateChange", "detachDataStateChange", "attachAggregatedDataStateChange", "detachAggregatedDataStateChange", "attachDataRequested", "detachDataRequested", "attachDataReceived", "detachDataReceived", "suspend", "resume", "isSuspended"]
			}
		});
		B.prototype.getPath = function () {
			return this.sPath;
		};
		B.prototype.getContext = function () {
			return this.oContext;
		};
		B.prototype.setContext = function (c) {
			if (this.oContext != c) {
				sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(), true);
				this.oContext = c;
				this.oDataState = null;
				this._fireChange({
					reason: C.Context
				});
			}
		};
		B.prototype.getMessages = function () {
			return this.vMessages;
		};
		B.prototype.getDataState = function () {
			if (!this.oDataState) {
				this.oDataState = new D();
			}
			return this.oDataState;
		};
		B.prototype.getModel = function () {
			return this.oModel;
		};
		B.prototype.attachChange = function (f, l) {
			if (!this.hasListeners("change")) {
				this.oModel.addBinding(this);
			}
			this.attachEvent("change", f, l);
		};
		B.prototype.detachChange = function (f, l) {
			this.detachEvent("change", f, l);
			if (!this.hasListeners("change")) {
				this.oModel.removeBinding(this);
			}
		};
		B.prototype._fireDataStateChange = function (a) {
			this.fireEvent("DataStateChange", a);
		};
		B.prototype.attachDataStateChange = function (f, l) {
			this.attachEvent("DataStateChange", f, l);
		};
		B.prototype.detachDataStateChange = function (f, l) {
			this.detachEvent("DataStateChange", f, l);
		};
		B.prototype.attachAggregatedDataStateChange = function (f, l) {
			this.attachEvent("AggregatedDataStateChange", f, l);
		};
		B.prototype.detachAggregatedDataStateChange = function (f, l) {
			this.detachEvent("AggregatedDataStateChange", f, l);
		};
		B.prototype._fireChange = function (a) {
			this.fireEvent("change", a);
		};
		B.prototype.attachDataRequested = function (f, l) {
			this.attachEvent("dataRequested", f, l);
		};
		B.prototype.detachDataRequested = function (f, l) {
			this.detachEvent("dataRequested", f, l);
		};
		B.prototype.fireDataRequested = function (a) {
			this.fireEvent("dataRequested", a);
		};
		B.prototype.attachDataReceived = function (f, l) {
			this.attachEvent("dataReceived", f, l);
		};
		B.prototype.detachDataReceived = function (f, l) {
			this.detachEvent("dataReceived", f, l);
		};
		B.prototype.fireDataReceived = function (a) {
			this.fireEvent("dataReceived", a);
		};
		B.prototype.updateRequired = function (m) {
			return m && this.getModel() === m;
		};
		B.prototype.hasValidation = function () {
			return !!this.getType();
		};
		B.prototype.checkUpdate = function (f) {
			if (this.bSuspended && !f) {
				return;
			}
			this._fireChange({
				reason: C.Change
			});
		};
		B.prototype.refresh = function (f) {
			if (this.bSuspended && !f) {
				return;
			}
			this.checkUpdate(f);
		};
		B.prototype.initialize = function () {
			if (!this.bSuspended) {
				this.checkUpdate(true);
			}
			return this;
		};
		B.prototype._refresh = function (f) {
			this.refresh(f);
		};
		B.prototype.isResolved = function () {
			if (this.bRelative && !this.oContext) {
				return false;
			}
			return true;
		};
		B.prototype.isInitial = function () {
			return this.bInitial;
		};
		B.prototype.isRelative = function () {
			return this.bRelative;
		};
		B.prototype.attachEvents = function (e) {
			if (!e) {
				return this;
			}
			var t = this;
			q.each(e, function (s, h) {
				var m = "attach" + s.substring(0, 1).toUpperCase() + s.substring(1);
				if (t[m]) {
					t[m](h);
				} else {
					q.sap.log.warning(t.toString() + " has no handler for event '" + s + "'");
				}
			});
			return this;
		};
		B.prototype.detachEvents = function (e) {
			if (!e) {
				return this;
			}
			var t = this;
			q.each(e, function (s, h) {
				var m = "detach" + s.substring(0, 1).toUpperCase() + s.substring(1);
				if (t[m]) {
					t[m](h);
				} else {
					q.sap.log.warning(t.toString() + " has no handler for event '" + s + "'");
				}
			});
			return this;
		};
		B.prototype.attachRefresh = function (f, l) {
			this.attachEvent("refresh", f, l);
		};
		B.prototype.detachRefresh = function (f, l) {
			this.detachEvent("refresh", f, l);
		};
		B.prototype._fireRefresh = function (a) {
			this.fireEvent("refresh", a);
		};
		B.prototype.suspend = function () {
			this.bSuspended = true;
		};
		B.prototype.isSuspended = function () {
			return this.bSuspended;
		};
		B.prototype.resume = function () {
			this.bSuspended = false;
			this.checkUpdate();
		};
		B.prototype.destroy = function () {
			this.bIsBeingDestroyed = true;
			sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(), true);
			E.prototype.destroy.apply(this, arguments);
			this.bIsBeingDestroyed = false;
		};
		return B;
	});
	sap.ui.predefine('sap/ui/model/BindingMode', function () {
		"use strict";
		var B = {
			Default: "Default",
			OneTime: "OneTime",
			OneWay: "OneWay",
			TwoWay: "TwoWay"
		};
		return B;
	}, true);
	sap.ui.predefine('sap/ui/model/ChangeReason', function () {
		"use strict";
		var C = {
			Sort: "sort",
			Filter: "filter",
			Change: "change",
			Context: "context",
			Refresh: "refresh",
			Expand: "expand",
			Collapse: "collapse",
			Remove: "remove",
			Add: "add",
			Binding: "binding"
		};
		return C;
	}, true);
	sap.ui.predefine('sap/ui/model/ClientContextBinding', ['./ContextBinding'], function (C) {
		"use strict";
		var a = C.extend("sap.ui.model.ClientContextBinding", {
			constructor: function (m, p, c, P, e) {
				C.call(this, m, p, c, P, e);
				var t = this;
				m.createBindingContext(p, c, P, function (c) {
					t.bInitial = false;
					t.oElementContext = c;
				});
			}
		});
		a.prototype.refresh = function (f) {
			var t = this;
			this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function (c) {
				if (t.oElementContext === c && !f) {
					t.oModel.checkUpdate(true, c);
				} else {
					t.oElementContext = c;
					t._fireChange();
				}
			}, true);
		};
		a.prototype.initialize = function () {
			var t = this;
			this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function (c) {
				t.oElementContext = c;
				t._fireChange();
			}, true);
		};
		a.prototype.setContext = function (c) {
			var t = this;
			if (this.oContext != c) {
				this.oContext = c;
				this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function (c) {
					t.oElementContext = c;
					t._fireChange();
				});
			}
		};
		return a;
	});
	sap.ui.predefine('sap/ui/model/ClientListBinding', ['jquery.sap.global', './ChangeReason', './Filter', './FilterType', './ListBinding', './FilterProcessor', './Sorter', './SorterProcessor'], function (q, C, F, a, L, b, S, c) {
		"use strict";
		var d = L.extend("sap.ui.model.ClientListBinding", {
			constructor: function (m, p, o, s, f, P) {
				L.apply(this, arguments);
				this.oModel.checkFilterOperation(this.aApplicationFilters);
				this.bIgnoreSuspend = false;
				this.update();
			},
			metadata: {
				publicMethods: ["getLength"]
			}
		});
		d.prototype._getContexts = function (s, l) {
			if (!s) {
				s = 0;
			}
			if (!l) {
				l = Math.min(this.iLength, this.oModel.iSizeLimit);
			}
			var e = Math.min(s + l, this.aIndices.length),
				o, f = [],
				p = this.oModel.resolve(this.sPath, this.oContext);
			if (p && !q.sap.endsWith(p, "/")) {
				p += "/";
			}
			for (var i = s; i < e; i++) {
				o = this.oModel.getContext(p + this.aIndices[i]);
				f.push(o);
			}
			return f;
		};
		d.prototype.setContext = function (o) {
			if (this.oContext != o) {
				this.oContext = o;
				if (this.isRelative()) {
					this.update();
					this._fireChange({
						reason: C.Context
					});
				}
			}
		};
		d.prototype.getLength = function () {
			return this.iLength;
		};
		d.prototype._getLength = function () {
			return this.aIndices.length;
		};
		d.prototype.updateIndices = function () {
			this.aIndices = [];
			for (var i = 0; i < this.oList.length; i++) {
				this.aIndices.push(i);
			}
		};
		d.prototype.sort = function (s) {
			if (this.bSuspended) {
				this.checkUpdate(true);
			}
			if (!s) {
				this.aSorters = null;
				this.updateIndices();
				this.applyFilter();
			} else {
				if (s instanceof S) {
					s = [s];
				}
				this.aSorters = s;
				this.applySort();
			}
			this.bIgnoreSuspend = true;
			this._fireChange({
				reason: C.Sort
			});
			this._fireSort({
				sorter: s
			});
			this.bIgnoreSuspend = false;
			return this;
		};
		d.prototype.applySort = function () {
			var t = this;
			if (!this.aSorters || this.aSorters.length == 0) {
				return;
			}
			this.aIndices = c.apply(this.aIndices, this.aSorters, function (r, p) {
				return t.oModel.getProperty(p, t.oList[r]);
			});
		};
		d.prototype.filter = function (f, s) {
			this.oModel.checkFilterOperation(f);
			if (this.bSuspended) {
				this.checkUpdate(true);
			}
			this.updateIndices();
			if (f instanceof F) {
				f = [f];
			}
			if (s == a.Application) {
				this.aApplicationFilters = f || [];
			} else if (s == a.Control) {
				this.aFilters = f || [];
			} else {
				this.aFilters = f || [];
				this.aApplicationFilters = [];
			}
			f = this.aFilters.concat(this.aApplicationFilters);
			if (f.length == 0) {
				this.iLength = this._getLength();
			} else {
				this.applyFilter();
			}
			this.applySort();
			this.bIgnoreSuspend = true;
			this._fireChange({
				reason: C.Filter
			});
			if (s == a.Application) {
				this._fireFilter({
					filters: this.aApplicationFilters
				});
			} else {
				this._fireFilter({
					filters: this.aFilters
				});
			}
			this.bIgnoreSuspend = false;
			return this;
		};
		d.prototype.applyFilter = function () {
			if (!this.aFilters) {
				return;
			}
			var f = this.aFilters.concat(this.aApplicationFilters),
				t = this;
			this.aIndices = b.apply(this.aIndices, f, function (r, p) {
				return t.oModel.getProperty(p, t.oList[r]);
			});
			this.iLength = this.aIndices.length;
		};
		d.prototype.getDistinctValues = function (p) {
			var r = [],
				m = {},
				v, t = this;
			q.each(this.oList, function (i, o) {
				v = t.oModel.getProperty(p, o);
				if (!m[v]) {
					m[v] = true;
					r.push(v);
				}
			});
			return r;
		};
		return d;
	});
	sap.ui.predefine('sap/ui/model/ClientModel', ['jquery.sap.global', './ClientContextBinding', './ClientListBinding', './ClientPropertyBinding', './ClientTreeBinding', './Model'], function (q, C, a, b, c, M) {
		"use strict";
		var d = M.extend("sap.ui.model.ClientModel", {
			constructor: function (D) {
				M.apply(this, arguments);
				this.bCache = true;
				this.aPendingRequestHandles = [];
				this.mUnsupportedFilterOperators = {
					"Any": true,
					"All": true
				};
				if (typeof D == "string") {
					this.loadData(D);
				}
			},
			metadata: {
				publicMethods: ["loadData", "setData", "getData", "setProperty", "forceNoCache"]
			}
		});
		d.prototype.getData = function () {
			return this.oData;
		};
		d.prototype.createBindingContext = function (p, o, P, f) {
			if (typeof o == "function") {
				f = o;
				o = null;
			}
			if (typeof P == "function") {
				f = P;
				P = null;
			}
			var s = this.resolve(p, o),
				n = (s == undefined) ? undefined : this.getContext(s ? s : "/");
			if (!n) {
				n = null;
			}
			if (f) {
				f(n);
			}
			return n;
		};
		d.prototype._ajax = function (p) {
			var t = this;
			if (this.bDestroyed) {
				return;
			}

			function w(f) {
				return function () {
					var i = q.inArray(r, t.aPendingRequestHandles);
					if (i > -1) {
						t.aPendingRequestHandles.splice(i, 1);
					}
					if (!(r && r.bSuppressErrorHandlerCall)) {
						f.apply(this, arguments);
					}
				};
			}
			p.success = w(p.success);
			p.error = w(p.error);
			var r = q.ajax(p);
			if (p.async) {
				this.aPendingRequestHandles.push(r);
			}
		};
		d.prototype.destroy = function () {
			M.prototype.destroy.apply(this, arguments);
			if (this.aPendingRequestHandles) {
				for (var i = this.aPendingRequestHandles.length - 1; i >= 0; i--) {
					var r = this.aPendingRequestHandles[i];
					if (r && r.abort) {
						r.bSuppressErrorHandlerCall = true;
						r.abort();
					}
				}
				delete this.aPendingRequestHandles;
			}
		};
		d.prototype.destroyBindingContext = function (o) {};
		d.prototype.bindContext = function (p, o, P) {
			var B = new C(this, p, o, P);
			return B;
		};
		d.prototype.updateBindings = function (f) {
			this.checkUpdate(f);
		};
		d.prototype.forceNoCache = function (f) {
			this.bCache = !f;
		};
		return d;
	});
	sap.ui.predefine('sap/ui/model/ClientPropertyBinding', ['./PropertyBinding'], function (P) {
		"use strict";
		var C = P.extend("sap.ui.model.ClientPropertyBinding", {
			constructor: function (m, p, c, a) {
				P.apply(this, arguments);
				this.oValue = this._getValue();
			}
		});
		C.prototype.getValue = function () {
			return this.oValue;
		};
		C.prototype._getValue = function () {
			var p = this.sPath.substr(this.sPath.lastIndexOf("/") + 1);
			if (p == "__name__") {
				var a = this.oContext.split("/");
				return a[a.length - 1];
			}
			return this.oModel.getProperty(this.sPath, this.oContext);
		};
		C.prototype.setContext = function (c) {
			if (this.oContext != c) {
				sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(), true);
				this.oContext = c;
				if (this.isRelative()) {
					this.checkUpdate();
				}
			}
		};
		return C;
	});
	sap.ui.predefine('sap/ui/model/ClientTreeBinding', ['jquery.sap.global', './ChangeReason', './Context', './TreeBinding', 'sap/ui/model/SorterProcessor', 'sap/ui/model/FilterProcessor', 'sap/ui/model/FilterType'], function (q, C, a, T, S, F, b) {
		"use strict";
		var c = T.extend("sap.ui.model.ClientTreeBinding", {
			constructor: function (m, p, o, A, P, s) {
				T.apply(this, arguments);
				if (!this.oContext) {
					this.oContext = "";
				}
				this._mLengthsCache = {};
				this.filterInfo = {};
				this.filterInfo.aFilteredContexts = [];
				this.filterInfo.oParentContext = {};
				if (A) {
					this.oModel.checkFilterOperation(A);
					if (this.oModel._getObject(this.sPath, this.oContext)) {
						this.filter(A, b.Application);
					}
				}
			}
		});
		c.prototype.getRootContexts = function (s, l) {
			if (!s) {
				s = 0;
			}
			if (!l) {
				l = this.oModel.iSizeLimit;
			}
			var r = this.oModel.resolve(this.sPath, this.oContext),
				t = this,
				d, o, e;
			if (!r) {
				return [];
			}
			if (!this.oModel.isList(r)) {
				o = this.oModel.getContext(r);
				if (this.bDisplayRootNode) {
					d = [o];
				} else {
					d = this.getNodeContexts(o, s, l);
				}
			} else {
				d = [];
				e = this._sanitizePath(r);
				q.each(this.oModel._getObject(e), function (i, O) {
					t._saveSubContext(O, d, e, i);
				});
				this._applySorter(d);
				this._setLengthCache(e, d.length);
				d = d.slice(s, s + l);
			}
			return d;
		};
		c.prototype.getNodeContexts = function (o, s, l) {
			if (!s) {
				s = 0;
			}
			if (!l) {
				l = this.oModel.iSizeLimit;
			}
			var d = this._sanitizePath(o.getPath());
			var e = [],
				t = this,
				n = this.oModel._getObject(d),
				A = this.mParameters && this.mParameters.arrayNames,
				k;
			if (n) {
				if (Array.isArray(n)) {
					n.forEach(function (f, i) {
						t._saveSubContext(f, e, d, i);
					});
				} else {
					k = A || Object.keys(n);
					k.forEach(function (K) {
						var f = n[K];
						if (f) {
							if (Array.isArray(f)) {
								f.forEach(function (g, h) {
									t._saveSubContext(g, e, d, K + "/" + h);
								});
							} else if (typeof f == "object") {
								t._saveSubContext(f, e, d, K);
							}
						}
					});
				}
			}
			this._applySorter(e);
			this._setLengthCache(d, e.length);
			return e.slice(s, s + l);
		};
		c.prototype.hasChildren = function (o) {
			if (o == undefined) {
				return false;
			}
			return this.getChildCount(o) > 0;
		};
		c.prototype.getChildCount = function (o) {
			var p = o ? o.sPath : this.getPath();
			if (this.oContext) {
				p = this.oModel.resolve(p, this.oContext);
			}
			p = this._sanitizePath(p);
			if (this._mLengthsCache[p] === undefined) {
				if (o) {
					this.getNodeContexts(o);
				} else {
					this.getRootContexts();
				}
			}
			return this._mLengthsCache[p];
		};
		c.prototype._sanitizePath = function (s) {
			if (!q.sap.endsWith(s, "/")) {
				s = s + "/";
			}
			if (!q.sap.startsWith(s, "/")) {
				s = "/" + s;
			}
			return s;
		};
		c.prototype._saveSubContext = function (n, d, s, N) {
			if (n && typeof n == "object") {
				var o = this.oModel.getContext(s + N);
				if (this.aAllFilters && !this.bIsFiltering) {
					if (q.inArray(o, this.filterInfo.aFilteredContexts) != -1) {
						d.push(o);
					}
				} else {
					d.push(o);
				}
			}
		};
		c.prototype.filter = function (f, s) {
			if (f && !Array.isArray(f)) {
				f = [f];
			}
			this.oModel.checkFilterOperation(f);
			if (s == b.Application) {
				this.aApplicationFilters = f || [];
			} else if (s == b.Control) {
				this.aFilters = f || [];
			} else {
				this.aFilters = f || [];
				this.aApplicationFilters = [];
			}
			f = this.aFilters.concat(this.aApplicationFilters);
			if (f.length == 0) {
				this.aAllFilters = null;
			} else {
				this.aAllFilters = f;
				this.applyFilter();
			}
			this._mLengthsCache = {};
			this._fireChange({
				reason: "filter"
			});
			this._fireFilter({
				filters: f
			});
			return this;
		};
		c.prototype.applyFilter = function () {
			var r = this.oModel.resolve(this.sPath, this.oContext);
			this.filterInfo.aFilteredContexts = [];
			this.filterInfo.oParentContext = {};
			if (!r) {
				return;
			}
			var o = this.oModel.getContext(r);
			this._applyFilterRecursive(o);
		};
		c.prototype._applyFilterRecursive = function (p) {
			var t = this,
				f = [];
			if (q.isEmptyObject(this.aAllFilters)) {
				return;
			}
			this.bIsFiltering = true;
			var u = this.getNodeContexts(p, 0, Number.MAX_VALUE);
			this.bIsFiltering = false;
			if (u.length > 0) {
				q.each(u, function (i, o) {
					o._parentContext = p;
					t._applyFilterRecursive(o);
				});
				f = F.apply(u, this.aAllFilters, function (o, P) {
					return t.oModel.getProperty(P, o);
				});
				if (f.length > 0) {
					q.merge(this.filterInfo.aFilteredContexts, f);
					this.filterInfo.aFilteredContexts.push(p);
					this.filterInfo.oParentContext = p;
				}
				if (q.inArray(this.filterInfo.oParentContext, u) != -1) {
					this.filterInfo.aFilteredContexts.push(p);
					this.filterInfo.oParentContext = p;
				}
			}
		};
		c.prototype.sort = function (s) {
			s = s || [];
			this.aSorters = Array.isArray(s) ? s : [s];
			this._fireChange({
				reason: C.Sort
			});
			return this;
		};
		c.prototype._applySorter = function (d) {
			var t = this;
			S.apply(d, this.aSorters, function (o, p) {
				return t.oModel.getProperty(p, o);
			}, function (o) {
				return o.getPath();
			});
		};
		c.prototype._setLengthCache = function (k, l) {
			this._mLengthsCache[k] = l;
		};
		c.prototype.checkUpdate = function (f) {
			this.applyFilter();
			this._mLengthsCache = {};
			this._fireChange();
		};
		return c;
	});
	sap.ui.predefine('sap/ui/model/CompositeBinding', ['jquery.sap.global', 'sap/ui/base/DataType', './BindingMode', './ChangeReason', './PropertyBinding', './CompositeType', './CompositeDataState'], function (q, D, B, C, P, a, b) {
		"use strict";
		var c = P.extend("sap.ui.model.CompositeBinding", {
			constructor: function (d, r, i) {
				P.apply(this, [null, ""]);
				this.aBindings = d;
				this.aValues = null;
				this.bRawValues = r;
				this.bPreventUpdate = false;
				this.bInternalValues = i;
			},
			metadata: {
				publicMethods: ["getBindings", "attachChange", "detachChange"]
			}
		});
		c.prototype.getPath = function () {
			return null;
		};
		c.prototype.getModel = function () {
			return null;
		};
		c.prototype.getContext = function () {
			return null;
		};
		c.prototype.isResolved = function () {
			var r = false;
			q.each(this.aBindings, function (i, o) {
				r = o.isResolved();
				if (!r) {
					return false;
				}
			});
			return r;
		};
		c.prototype.setType = function (t, i) {
			if (t && !(t instanceof a)) {
				throw new Error("Only CompositeType can be used as type for composite bindings!");
			}
			P.prototype.setType.apply(this, arguments);
			if (this.oType) {
				this.bRawValues = this.oType.getUseRawValues();
				this.bInternalValues = this.oType.getUseInternalValues();
				if (this.bRawValues && this.bInternalValues) {
					throw new Error(this.oType + " has both 'bUseRawValues' & 'bUseInternalValues' set to true. Only one of them is allowed to be true");
				}
			}
		};
		c.prototype.setContext = function (o) {
			q.each(this.aBindings, function (i, d) {
				if (!o || d.updateRequired(o.getModel())) {
					d.setContext(o);
				}
			});
		};
		c.prototype.setValue = function (v) {
			var V;
			if (this.bSuspended) {
				return;
			}
			q.each(this.aBindings, function (i, o) {
				V = v[i];
				if (V !== undefined) {
					o.setValue(V);
				}
			});
			this.getDataState().setValue(this.getValue());
		};
		c.prototype.getValue = function () {
			var v = [],
				V;
			q.each(this.aBindings, function (i, o) {
				V = o.getValue();
				v.push(V);
			});
			return v;
		};
		c.prototype.getOriginalValue = function () {
			var v = [],
				V;
			q.each(this.aBindings, function (i, o) {
				V = o.getDataState().getOriginalValue();
				v.push(V);
			});
			return v;
		};
		c.prototype.setExternalValue = function (v) {
			var V, d, I = this.sInternalType && D.getType(this.sInternalType),
				t = this;
			if (this.fnFormatter) {
				q.sap.log.warning("Tried to use twoway binding, but a formatter function is used");
				return;
			}
			var o = this.getDataState();
			if (this.oType) {
				try {
					if (this.oType.getParseWithValues()) {
						d = [];
						if (this.bRawValues) {
							d = this.getValue();
						} else {
							q.each(this.aBindings, function (i, f) {
								d.push(f.getExternalValue());
							});
						}
					}
					V = this.oType.parseValue(v, this.sInternalType, d);
					this.oType.validateValue(V);
				} catch (e) {
					o.setInvalidValue(v);
					this.checkDataState();
					throw e;
				}
			} else if (Array.isArray(v) && I instanceof D && I.isArrayType()) {
				V = v;
			} else if (typeof v == "string") {
				V = v.split(" ");
			} else {
				V = [v];
			}
			if (this.bRawValues) {
				this.setValue(V);
			} else {
				q.each(this.aBindings, function (i, f) {
					v = V[i];
					if (v !== undefined) {
						if (t.bInternalValues) {
							f.setInternalValue(v);
						} else {
							f.setExternalValue(v);
						}
					}
				});
			}
			o.setValue(this.getValue());
			o.setInvalidValue(undefined);
		};
		c.prototype.getExternalValue = function () {
			var v = [];
			if (this.bRawValues) {
				v = this.getValue();
			} else {
				this.aBindings.forEach(function (o) {
					v.push(this.bInternalValues ? o.getInternalValue() : o.getExternalValue());
				}.bind(this));
			}
			return this._toExternalValue(v);
		};
		c.prototype._toExternalValue = function (v) {
			var V, i = this.sInternalType && D.getType(this.sInternalType);
			if (this.fnFormatter) {
				V = this.fnFormatter.apply(this, v);
			} else if (this.oType) {
				V = this.oType.formatValue(v, this.sInternalType);
			} else if (i instanceof D && i.isArrayType()) {
				V = v;
			} else if (v.length > 1) {
				V = v.join(" ");
			} else {
				V = v[0];
			}
			return V;
		};
		c.prototype.getBindings = function () {
			return this.aBindings;
		};
		c.prototype.hasValidation = function () {
			if (this.getType()) {
				return true;
			}
			var d = this.getBindings();
			for (var i = 0; i < d.length; ++i) {
				if (d[i].hasValidation()) {
					return true;
				}
			}
			return false;
		};
		c.prototype.attachChange = function (f, l) {
			var t = this;
			this.fChangeHandler = function (e) {
				if (t.bSuspended) {
					return;
				}
				var o = e.getSource();
				if (o.getBindingMode() == B.OneTime) {
					o.detachChange(t.fChangeHandler);
				}
				t.checkUpdate(true);
			};
			this.attachEvent("change", f, l);
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.attachChange(t.fChangeHandler);
				});
			}
		};
		c.prototype.detachChange = function (f, l) {
			var t = this;
			this.detachEvent("change", f, l);
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.detachChange(t.fChangeHandler);
				});
			}
		};
		c.prototype.attachDataStateChange = function (f, l) {
			var t = this;
			this.fDataStateChangeHandler = function (e) {
				var o = e.getSource();
				if (o.getBindingMode() == B.OneTime) {
					o.detachDataStateChange(t.fChangeHandler);
				}
				t.checkDataState();
			};
			this.attachEvent("DataStateChange", f, l);
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.attachEvent("DataStateChange", t.fDataStateChangeHandler);
				});
			}
		};
		c.prototype.detachDataStateChange = function (f, l) {
			var t = this;
			this.detachEvent("DataStateChange", f, l);
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.detachEvent("DataStateChange", t.fDataStateChangeHandler);
				});
			}
		};
		c.prototype.attachAggregatedDataStateChange = function (f, l) {
			var t = this;
			if (!this.fDataStateChangeHandler) {
				this.fDataStateChangeHandler = function (e) {
					var o = e.getSource();
					if (o.getBindingMode() == B.OneTime) {
						o.detachDataStateChange(t.fChangeHandler);
					}
					t.checkDataState();
				};
			}
			this.attachEvent("AggregatedDataStateChange", f, l);
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.attachEvent("DataStateChange", t.fDataStateChangeHandler);
				});
			}
		};
		c.prototype.detachAggregatedDataStateChange = function (f, l) {
			var t = this;
			this.detachEvent("AggregatedDataStateChange", f, l);
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.detachEvent("DataStateChange", t.fDataStateChangeHandler);
				});
			}
		};
		c.prototype.updateRequired = function (m) {
			var u = false;
			q.each(this.aBindings, function (i, o) {
				u = u || o.updateRequired(m);
			});
			return u;
		};
		c.prototype.initialize = function () {
			this.bPreventUpdate = true;
			if (this.aBindings) {
				q.each(this.aBindings, function (i, o) {
					o.initialize();
				});
			}
			this.bPreventUpdate = false;
			if (!this.bSuspended) {
				this.checkUpdate(true);
			}
			return this;
		};
		c.prototype.getDataState = function () {
			if (!this.oDataState) {
				this.oDataState = new b(this.aBindings.map(function (o) {
					return o.getDataState();
				}));
			}
			return this.oDataState;
		};
		c.prototype.suspend = function () {
			this.bSuspended = true;
			q.each(this.aBindings, function (i, o) {
				o.suspend();
			});
		};
		c.prototype.resume = function () {
			q.each(this.aBindings, function (i, o) {
				o.resume();
			});
			this.bSuspended = false;
			this.checkUpdate(true);
		};
		c.prototype.checkUpdate = function (f) {
			var d = false;
			if (this.bPreventUpdate || (this.bSuspended && !f)) {
				return;
			}
			var o = this.getDataState();
			var O = this.getOriginalValue();
			if (f || !q.sap.equal(O, this.aOriginalValues)) {
				this.aOriginalValues = O;
				o.setOriginalValue(O);
				d = true;
			}
			var v = this.getValue();
			if (!q.sap.equal(v, this.aValues) || f) {
				this.aValues = v;
				o.setValue(v);
				this._fireChange({
					reason: C.Change
				});
				d = true;
			}
			if (d) {
				this.checkDataState();
			}
		};
		return c;
	});
	sap.ui.predefine('sap/ui/model/CompositeDataState', ['jquery.sap.global', './DataState'], function (q, D) {
		"use strict";
		var C = D.extend("sap.ui.model.CompositeDataState", {
			metadata: {},
			constructor: function (d) {
				D.apply(this, arguments);
				this.mProperties.originalValue = [];
				this.mProperties.originalInternalValue = [];
				this.mProperties.value = [];
				this.mProperties.invalidValue = undefined;
				this.mProperties.internalValue = [];
				this.mChangedProperties = q.sap.extend({}, this.mProperties);
				this.aDataStates = d;
			}
		});
		C.prototype._hasInnerInvalidValues = function () {
			return this.aDataStates.reduce(function (i, d) {
				if (d.getInvalidValue() !== undefined) {
					return true;
				} else {
					return i;
				}
			}, false);
		};
		C.prototype.getInternalProperty = function (p) {
			var r;
			if (p === "invalidValue" && this._hasInnerInvalidValues()) {
				r = this.aDataStates.map(function (d) {
					return d.getProperty("invalidValue") || d.getProperty("value");
				});
			} else {
				r = this.aDataStates.map(function (d) {
					return d.getProperty(p);
				});
			}
			return r;
		};
		C.prototype.getProperty = function (p) {
			var v = D.prototype.getProperty.apply(this, arguments);
			var I = this.getInternalProperty(p);
			var r;
			switch (p) {
				case "modelMessages":
				case "controlMessages":
					r = v;
					for (var i = 0; i < I.length; ++i) {
						r = r.concat(I[i]);
					}
					break;
				default:
					r = I || v;
			}
			return r;
		};
		C.prototype.getModelMessages = function () {
			return this.getProperty("modelMessages");
		};
		C.prototype.getControlMessages = function () {
			return this.getProperty("controlMessages");
		};
		C.prototype.getMessages = function () {
			return this.aDataStates.reduce(function (m, d) {
				return m.concat(d.getMessages());
			}, D.prototype.getMessages.apply(this, arguments));
		};
		C.prototype.containsValues = function (v) {
			if (Array.isArray(v)) {
				for (var i = 0; i < v.length; i++) {
					if (v[i] !== undefined) {
						return true;
					}
				}
				return false;
			} else {
				return !!v;
			}
		};
		C.prototype.isDirty = function () {
			return this.aDataStates.reduce(function (i, d) {
				if (d.isDirty()) {
					return true;
				} else {
					return i;
				}
			}, D.prototype.isDirty.apply(this, arguments));
		};
		C.prototype.isControlDirty = function () {
			return this.aDataStates.reduce(function (i, d) {
				if (d.isControlDirty()) {
					return true;
				} else {
					return i;
				}
			}, D.prototype.isControlDirty.apply(this, arguments));
		};
		C.prototype.isLaundering = function () {
			return this.aDataStates.reduce(function (i, d) {
				if (d.isLaundering()) {
					return true;
				} else {
					return i;
				}
			}, D.prototype.isLaundering.apply(this, arguments));
		};
		C.prototype.getInvalidValue = function () {
			var v = this.mChangedProperties["invalidValue"];
			var i = this.getInternalProperty("invalidValue");
			if (i && this.containsValues(i)) {
				v = i;
				this.setInvalidValue(i);
			}
			return v;
		};
		C.prototype.changed = function (n) {
			if (n === false) {
				this.mProperties = q.sap.extend({}, this.mChangedProperties);
				this.aDataStates.forEach(function (d) {
					d.changed(false);
				});
			}
			return this.aDataStates.reduce(function (l, d) {
				if (l) {
					return true;
				} else {
					return d.changed();
				}
			}, !q.sap.equal(this.mProperties, this.mChangedProperties));
		};
		C.prototype.getChanges = function () {
			var c = {};
			var i, k, m;
			var I = [];
			for (i = 0; i < this.aDataStates.length; ++i) {
				m = this.aDataStates[i].getChanges();
				for (k in m) {
					c[k] = [];
				}
				I.push(m);
			}
			var h = this._hasInnerInvalidValues();
			var a = {};
			for (k in c) {
				for (i = 0; i < I.length; ++i) {
					m = I[i][k];
					if (!a[k]) {
						a[k] = [];
					}
					if (m) {
						a[k].push(m.value);
					} else {
						var v = this.aDataStates[i].getProperty(k);
						if (k === "invalidValue" && h && !v) {
							v = this.aDataStates[i].getProperty("value");
						}
						a[k].push(v);
					}
				}
			}
			q.each(this.mChangedProperties, function (p, v) {
				if (this.mChangedProperties[p] && !q.sap.equal(this.mChangedProperties[p], this.mProperties[p])) {
					a[p] = {};
					a[p].value = this.mChangedProperties[p];
					a[p].oldValue = this.mProperties[p];
				}
			}.bind(this));
			var M = this.getMessages();
			var o = this._getOldMessages();
			if (M.length > 0 || o.length > 0) {
				a["messages"] = {};
				a["messages"].oldValue = o;
				a["messages"].value = M;
			}
			return a;
		};
		return C;
	});
	sap.ui.predefine('sap/ui/model/CompositeType', ['./FormatException', './ParseException', './SimpleType', './ValidateException'], function (F, P, S, V) {
		"use strict";
		var C = S.extend("sap.ui.model.CompositeType", {
			constructor: function (f, c) {
				S.apply(this, arguments);
				this.sName = "CompositeType";
				this.bUseRawValues = false;
				this.bParseWithValues = false;
				this.bUseInternalValues = false;
			},
			metadata: {
				"abstract": true,
				publicMethods: []
			}
		});
		C.prototype.getUseRawValues = function () {
			return this.bUseRawValues;
		};
		C.prototype.getUseInternalValues = function () {
			return this.bUseInternalValues;
		};
		C.prototype.getParseWithValues = function () {
			return this.bParseWithValues;
		};
		return C;
	});
	sap.ui.predefine('sap/ui/model/Context', ['sap/ui/base/Object'], function (B) {
		"use strict";
		var C = B.extend("sap.ui.model.Context", {
			constructor: function (m, p) {
				B.apply(this);
				this.oModel = m;
				this.sPath = p;
				this.bForceRefresh = false;
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getModel", "getPath", "getProperty", "getObject"]
			}
		});
		C.prototype.getModel = function () {
			return this.oModel;
		};
		C.prototype.getPath = function (p) {
			return this.sPath + (p ? "/" + p : "");
		};
		C.prototype.getProperty = function (p) {
			return this.oModel.getProperty(p, this);
		};
		C.prototype.getObject = function (p, P) {
			if (jQuery.isPlainObject(p)) {
				P = p;
				p = undefined;
			}
			return this.oModel.getObject(p, this, P);
		};
		C.prototype.setForceRefresh = function (f) {
			this.bForceRefresh = f;
		};
		C.prototype.isRefreshForced = function () {
			return this.bForceRefresh;
		};
		C.prototype.setPreliminary = function (p) {
			this.bPreliminary = p;
		};
		C.prototype.isPreliminary = function () {
			return this.bPreliminary;
		};
		C.prototype.setUpdated = function (u) {
			this.bUpdated = u;
		};
		C.prototype.isUpdated = function () {
			return this.bUpdated;
		};
		C.hasChanged = function (o, n) {
			var c = false;
			if (o !== n) {
				c = true;
			} else if (n && n.isUpdated()) {
				c = true;
			} else if (n && n.isRefreshForced()) {
				c = true;
			}
			return c;
		};
		C.prototype.toString = function () {
			return this.sPath;
		};
		return C;
	});
	sap.ui.predefine('sap/ui/model/ContextBinding', ['./Binding'], function (B) {
		"use strict";
		var C = B.extend("sap.ui.model.ContextBinding", {
			constructor: function (m, p, c, P, e) {
				B.call(this, m, p, c, P, e);
				this.oElementContext = null;
				this.bInitial = true;
			},
			metadata: {
				publicMethods: ["getElementContext"]
			}
		});
		C.prototype.checkUpdate = function (f) {};
		C.prototype.getBoundContext = function () {
			return this.oElementContext;
		};
		return C;
	});
	sap.ui.predefine('sap/ui/model/DataState', ['jquery.sap.global', '../base/Object'], function (q, B) {
		"use strict";
		var D = B.extend("sap.ui.model.DataState", {
			metadata: {},
			constructor: function () {
				this.mProperties = {
					modelMessages: [],
					controlMessages: [],
					laundering: false,
					originalValue: undefined,
					originalInternalValue: undefined,
					value: undefined,
					invalidValue: undefined,
					internalValue: undefined,
					dirty: false,
					messages: []
				};
				this.mChangedProperties = q.sap.extend({}, this.mProperties);
			}
		});
		D.prototype._sortMessages = function (m) {
			var s = {
				'Error': 0,
				'Warning': 1,
				'Success': 2,
				'Info': 3
			};
			m.sort(function (a, b) {
				return s[a.type] - s[b.type];
			});
		};
		D.prototype.setProperty = function (p, v) {
			this.mChangedProperties[p] = v;
			return this;
		};
		D.prototype.calculateChanges = function () {
			for (var p in this.mChangedProperties) {
				var c = this.mChangedProperties[p].value;
				if (!q.sap.equal(this.mProperties[p], c)) {
					if (Array.isArray(c)) {
						c = c.slice(0);
					}
					this.mProperties[p] = c;
				}
			}
			return this;
		};
		D.prototype.getProperty = function (p) {
			return this.mChangedProperties[p];
		};
		D.prototype.getMessages = function () {
			var m = [];
			var c = this.mChangedProperties['controlMessages'];
			var M = this.mChangedProperties['modelMessages'];
			if (M || c) {
				m = m.concat(M ? M : [], c ? c : []);
				this._sortMessages(m);
			}
			return m;
		};
		D.prototype._getOldMessages = function () {
			var m = [];
			var c = this.mProperties['controlMessages'];
			var M = this.mProperties['modelMessages'];
			if (M || c) {
				m = m.concat(M ? M : [], c ? c : []);
				this._sortMessages(m);
			}
			return m;
		};
		D.prototype.setModelMessages = function (m) {
			this.mChangedProperties["modelMessages"] = m || [];
			return this;
		};
		D.prototype.getModelMessages = function () {
			return this.getProperty("modelMessages");
		};
		D.prototype.setControlMessages = function (m) {
			this.mChangedProperties["controlMessages"] = m || [];
			return this;
		};
		D.prototype.getControlMessages = function () {
			return this.getProperty("controlMessages");
		};
		D.prototype.isDirty = function () {
			var v = this.mChangedProperties["value"];
			var o = this.mChangedProperties["originalValue"];
			var c = this.mChangedProperties["invalidValue"] !== undefined;
			return c || !q.sap.equal(v, o);
		};
		D.prototype.isControlDirty = function () {
			return this.mChangedProperties["invalidValue"] !== undefined;
		};
		D.prototype.isLaundering = function () {
			return this.mChangedProperties["laundering"];
		};
		D.prototype.setLaundering = function (l) {
			this.mChangedProperties["laundering"] = l;
			return this;
		};
		D.prototype.getValue = function (v) {
			return this.getProperty("value");
		};
		D.prototype.setValue = function (v) {
			this.mChangedProperties["value"] = v;
			return this;
		};
		D.prototype.getInvalidValue = function () {
			return this.getProperty("invalidValue");
		};
		D.prototype.setInvalidValue = function (i) {
			this.mChangedProperties["invalidValue"] = i;
			return this;
		};
		D.prototype.getOriginalValue = function () {
			return this.getProperty("originalValue");
		};
		D.prototype.setOriginalValue = function (o) {
			this.mChangedProperties["originalValue"] = o;
			return this;
		};
		D.prototype.changed = function (n) {
			if (n === false) {
				this.mProperties = q.sap.extend({}, this.mChangedProperties);
			}
			return !q.sap.equal(this.mChangedProperties, this.mProperties);
		};
		D.prototype.getChanges = function () {
			var c = {};
			q.each(this.mChangedProperties, function (p, v) {
				if (!q.sap.equal(this.mChangedProperties[p], this.mProperties[p])) {
					c[p] = {};
					c[p].value = this.mChangedProperties[p];
					c[p].oldValue = this.mProperties[p];
				}
			}.bind(this));
			var m = this.getMessages();
			var o = this._getOldMessages();
			if (m.length > 0 || o.length > 0) {
				c["messages"] = {};
				c["messages"].oldValue = o;
				c["messages"].value = m;
			}
			return c;
		};
		return D;
	});
	sap.ui.predefine('sap/ui/model/Filter', ['jquery.sap.global', 'sap/ui/base/Object', './FilterOperator'], function (q, B, F) {
		"use strict";
		var c = B.extend("sap.ui.model.Filter", {
			constructor: function (f, o, v, V) {
				if (typeof f === "object" && !Array.isArray(f)) {
					this.sPath = f.path;
					this.sOperator = f.operator;
					this.oValue1 = f.value1;
					this.oValue2 = f.value2;
					this.sVariable = f.variable;
					this.oCondition = f.condition;
					this.aFilters = f.filters || f.aFilters;
					this.bAnd = f.and || f.bAnd;
					this.fnTest = f.test;
					this.fnCompare = f.comparator;
				} else {
					if (Array.isArray(f)) {
						this.aFilters = f;
					} else {
						this.sPath = f;
					}
					if (q.type(o) === "boolean") {
						this.bAnd = o;
					} else if (q.type(o) === "function") {
						this.fnTest = o;
					} else {
						this.sOperator = o;
					}
					this.oValue1 = v;
					this.oValue2 = V;
					if (this.sOperator === F.Any || this.sOperator === F.All) {
						throw new Error("The filter operators 'Any' and 'All' are only supported with the parameter object notation.");
					}
				}
				if (this.sOperator === F.Any) {
					if (this.sVariable && this.oCondition) {
						this._checkLambdaArgumentTypes();
					} else if (!this.sVariable && !this.oCondition) {} else {
						throw new Error("When using the filter operator 'Any', a lambda variable and a condition have to be given or neither.");
					}
				} else if (this.sOperator === F.All) {
					this._checkLambdaArgumentTypes();
				} else {
					if (Array.isArray(this.aFilters) && !this.sPath && !this.sOperator && !this.oValue1 && !this.oValue2) {
						this._bMultiFilter = true;
						if (!this.aFilters.every(i)) {
							q.sap.log.error("Filter in Aggregation of Multi filter has to be instance of sap.ui.model.Filter");
						}
					} else if (!this.aFilters && this.sPath !== undefined && ((this.sOperator && this.oValue1 !== undefined) || this.fnTest)) {
						this._bMultiFilter = false;
					} else {
						q.sap.log.error("Wrong parameters defined for filter.");
					}
				}
			}
		});
		c.prototype._checkLambdaArgumentTypes = function () {
			if (!this.sVariable || typeof this.sVariable !== "string") {
				throw new Error("When using the filter operators 'Any' or 'All', a string has to be given as argument 'variable'.");
			}
			if (!i(this.oCondition)) {
				throw new Error("When using the filter operator 'Any' or 'All', a valid instance of sap.ui.model.Filter has to be given as argument 'condition'.");
			}
		};

		function i(v) {
			return v instanceof c;
		}
		c.defaultComparator = function (a, b) {
			if (a == b) {
				return 0;
			}
			if (a == null || b == null) {
				return NaN;
			}
			if (typeof a == "string" && typeof b == "string") {
				return a.localeCompare(b);
			}
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return NaN;
		};
		return c;
	});
	sap.ui.predefine('sap/ui/model/FilterOperator', function () {
		"use strict";
		var F = {
			EQ: "EQ",
			NE: "NE",
			LT: "LT",
			LE: "LE",
			GT: "GT",
			GE: "GE",
			BT: "BT",
			Contains: "Contains",
			StartsWith: "StartsWith",
			EndsWith: "EndsWith",
			All: "All",
			Any: "Any"
		};
		return F;
	}, true);
	sap.ui.predefine('sap/ui/model/FilterProcessor', ['./Filter', 'jquery.sap.global', "jquery.sap.unicode"], function (F, q) {
		"use strict";
		var a = {};
		a.apply = function (d, f, g) {
			if (!d) {
				return [];
			} else if (!f || f.length == 0) {
				return d.slice();
			}
			var t = this,
				o = {},
				b, c = [],
				G = false,
				e = true;
			q.each(f, function (j, h) {
				if (h.sPath !== undefined) {
					b = o[h.sPath];
					if (!b) {
						b = o[h.sPath] = [];
					}
				} else {
					b = o["__multiFilter"];
					if (!b) {
						b = o["__multiFilter"] = [];
					}
				}
				b.push(h);
			});
			q.each(d, function (i, r) {
				e = true;
				q.each(o, function (p, b) {
					if (p !== "__multiFilter") {
						G = false;
						q.each(b, function (j, h) {
							var v = g(r, p),
								T = t.getFilterFunction(h);
							if (!h.fnCompare) {
								v = t.normalizeFilterValue(v);
							}
							if (v !== undefined && T(v)) {
								G = true;
								return false;
							}
						});
					} else {
						G = false;
						q.each(b, function (j, h) {
							G = t._resolveMultiFilter(h, r, g);
							if (G) {
								return false;
							}
						});
					}
					if (!G) {
						e = false;
						return false;
					}
				});
				if (e) {
					c.push(r);
				}
			});
			return c;
		};
		a.normalizeFilterValue = function (v) {
			if (typeof v == "string") {
				if (String.prototype.normalize && (sap.ui.Device.browser.msie || sap.ui.Device.browser.edge)) {
					v = v.normalize("NFKD");
				}
				v = v.toUpperCase();
				if (String.prototype.normalize) {
					v = v.normalize("NFC");
				}
				return v;
			}
			if (v instanceof Date) {
				return v.getTime();
			}
			return v;
		};
		a._resolveMultiFilter = function (m, r, g) {
			var t = this,
				M = !!m.bAnd,
				f = m.aFilters;
			if (f) {
				q.each(f, function (i, o) {
					var l = false;
					if (o._bMultiFilter) {
						l = t._resolveMultiFilter(o, r, g);
					} else if (o.sPath !== undefined) {
						var v = g(r, o.sPath),
							T = t.getFilterFunction(o);
						if (!o.fnCompare) {
							v = t.normalizeFilterValue(v);
						}
						if (v !== undefined && T(v)) {
							l = true;
						}
					}
					if (l !== M) {
						M = l;
						return false;
					}
				});
			}
			return M;
		};
		a.getFilterFunction = function (f) {
			if (f.fnTest) {
				return f.fnTest;
			}
			var v = f.oValue1,
				V = f.oValue2,
				c = f.fnCompare || F.defaultComparator;
			if (!f.fnCompare) {
				v = this.normalizeFilterValue(v);
				V = this.normalizeFilterValue(V);
			}
			switch (f.sOperator) {
				case "EQ":
					f.fnTest = function (b) {
						return c(b, v) === 0;
					};
					break;
				case "NE":
					f.fnTest = function (b) {
						return c(b, v) !== 0;
					};
					break;
				case "LT":
					f.fnTest = function (b) {
						return c(b, v) < 0;
					};
					break;
				case "LE":
					f.fnTest = function (b) {
						return c(b, v) <= 0;
					};
					break;
				case "GT":
					f.fnTest = function (b) {
						return c(b, v) > 0;
					};
					break;
				case "GE":
					f.fnTest = function (b) {
						return c(b, v) >= 0;
					};
					break;
				case "BT":
					f.fnTest = function (b) {
						return (c(b, v) >= 0) && (c(b, V) <= 0);
					};
					break;
				case "Contains":
					f.fnTest = function (b) {
						if (b == null) {
							return false;
						}
						if (typeof b != "string") {
							throw new Error("Only \"String\" values are supported for the FilterOperator: \"Contains\".");
						}
						return b.indexOf(v) != -1;
					};
					break;
				case "StartsWith":
					f.fnTest = function (b) {
						if (b == null) {
							return false;
						}
						if (typeof b != "string") {
							throw new Error("Only \"String\" values are supported for the FilterOperator: \"StartsWith\".");
						}
						return b.indexOf(v) == 0;
					};
					break;
				case "EndsWith":
					f.fnTest = function (b) {
						if (b == null) {
							return false;
						}
						if (typeof b != "string") {
							throw new Error("Only \"String\" values are supported for the FilterOperator: \"EndsWith\".");
						}
						var p = b.lastIndexOf(v);
						if (p == -1) {
							return false;
						}
						return p == b.length - new String(f.oValue1).length;
					};
					break;
				default:
					q.sap.log.error("The filter operator \"" + f.sOperator + "\" is unknown, filter will be ignored.");
					f.fnTest = function (b) {
						return true;
					};
			}
			return f.fnTest;
		};
		return a;
	});
	sap.ui.predefine('sap/ui/model/FilterType', function () {
		"use strict";
		var F = {
			Application: "Application",
			Control: "Control"
		};
		return F;
	}, true);
	sap.ui.predefine('sap/ui/model/FormatException', ['sap/ui/base/Exception'], function (E) {
		"use strict";
		var F = function (m) {
			this.name = "FormatException";
			this.message = m;
		};
		F.prototype = Object.create(E.prototype);
		return F;
	}, true);
	sap.ui.predefine('sap/ui/model/ListBinding', ['jquery.sap.global', './Binding', './Filter', './Sorter'], function (q, B, F, S) {
		"use strict";
		var L = B.extend("sap.ui.model.ListBinding", {
			constructor: function (M, p, c, s, f, P) {
				B.call(this, M, p, c, P);
				this.aSorters = m(s, S);
				this.aFilters = [];
				this.aApplicationFilters = m(f, F);
				this.bUseExtendedChangeDetection = false;
				this.bDetectUpdates = true;
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getContexts", "getCurrentContexts", "sort", "attachSort", "detachSort", "filter", "attachFilter", "detachFilter", "getDistinctValues", "isGrouped", "getLength", "isLengthFinal"]
			}
		});

		function m(a, b) {
			if (Array.isArray(a)) {
				return a;
			}
			return a instanceof b ? [a] : [];
		}
		L.prototype.getCurrentContexts = function () {
			return this.getContexts();
		};
		L.prototype.getLength = function () {
			return 0;
		};
		L.prototype.isLengthFinal = function () {
			return true;
		};
		L.prototype.getDistinctValues = function (p) {
			return null;
		};
		L.prototype.attachSort = function (f, l) {
			this.attachEvent("sort", f, l);
		};
		L.prototype.detachSort = function (f, l) {
			this.detachEvent("sort", f, l);
		};
		L.prototype._fireSort = function (a) {
			this.fireEvent("sort", a);
		};
		L.prototype.attachFilter = function (f, l) {
			this.attachEvent("filter", f, l);
		};
		L.prototype.detachFilter = function (f, l) {
			this.detachEvent("filter", f, l);
		};
		L.prototype._fireFilter = function (a) {
			this.fireEvent("filter", a);
		};
		L.prototype.isGrouped = function () {
			return !!(this.aSorters && this.aSorters[0] && this.aSorters[0].fnGroup);
		};
		L.prototype.getGroup = function (c) {
			return this.aSorters[0].getGroup(c);
		};
		L.prototype.enableExtendedChangeDetection = function (d, k) {
			this.bUseExtendedChangeDetection = true;
			this.bDetectUpdates = d;
			if (typeof k === "string") {
				this.getEntryKey = function (c) {
					return c.getProperty(k);
				};
			} else if (typeof k === "function") {
				this.getEntryKey = k;
			}
			if (this.update) {
				this.update();
			}
		};
		L.prototype.getContextData = function (c) {
			var C;
			if (this.getEntryKey && !this.bDetectUpdates) {
				C = this.getEntryKey(c);
				if (this.isGrouped()) {
					C += "-" + this.getGroup(c).key;
				}
			} else {
				C = this.getEntryData(c);
			}
			return C;
		};
		L.prototype.getEntryData = function (c) {
			return JSON.stringify(c.getObject());
		};
		return L;
	});
	sap.ui.predefine('sap/ui/model/Model', ['jquery.sap.global', 'sap/ui/core/message/MessageProcessor', './BindingMode', './Context', './Filter', './FilterOperator'], function (q, M, B, C, F, a) {
		"use strict";
		var b = M.extend("sap.ui.model.Model", {
			constructor: function () {
				M.apply(this, arguments);
				this.oData = {};
				this.bDestroyed = false;
				this.aBindings = [];
				this.mContexts = {};
				this.iSizeLimit = 100;
				this.sDefaultBindingMode = B.TwoWay;
				this.mSupportedBindingModes = {
					"OneWay": true,
					"TwoWay": true,
					"OneTime": true
				};
				this.mUnsupportedFilterOperators = {};
				this.bLegacySyntax = false;
				this.sUpdateTimer = null;
			},
			metadata: {
				"abstract": true,
				publicMethods: ["bindProperty", "bindList", "bindTree", "bindContext", "createBindingContext", "destroyBindingContext", "getProperty", "getDefaultBindingMode", "setDefaultBindingMode", "isBindingModeSupported", "attachParseError", "detachParseError", "attachRequestCompleted", "detachRequestCompleted", "attachRequestFailed", "detachRequestFailed", "attachRequestSent", "detachRequestSent", "attachPropertyChange", "detachPropertyChange", "setSizeLimit", "refresh", "isList", "getObject"]
			}
		});
		b.M_EVENTS = {
			ParseError: "parseError",
			RequestFailed: "requestFailed",
			RequestSent: "requestSent",
			RequestCompleted: "requestCompleted",
			PropertyChange: "propertyChange"
		};
		b.prototype.attachRequestFailed = function (d, f, l) {
			this.attachEvent("requestFailed", d, f, l);
			return this;
		};
		b.prototype.detachRequestFailed = function (f, l) {
			this.detachEvent("requestFailed", f, l);
			return this;
		};
		b.prototype.fireRequestFailed = function (A) {
			this.fireEvent("requestFailed", A);
			return this;
		};
		b.prototype.attachParseError = function (d, f, l) {
			this.attachEvent("parseError", d, f, l);
			return this;
		};
		b.prototype.detachParseError = function (f, l) {
			this.detachEvent("parseError", f, l);
			return this;
		};
		b.prototype.fireParseError = function (A) {
			this.fireEvent("parseError", A);
			return this;
		};
		b.prototype.attachRequestSent = function (d, f, l) {
			this.attachEvent("requestSent", d, f, l);
			return this;
		};
		b.prototype.detachRequestSent = function (f, l) {
			this.detachEvent("requestSent", f, l);
			return this;
		};
		b.prototype.fireRequestSent = function (A) {
			this.fireEvent("requestSent", A);
			return this;
		};
		b.prototype.attachRequestCompleted = function (d, f, l) {
			this.attachEvent("requestCompleted", d, f, l);
			return this;
		};
		b.prototype.detachRequestCompleted = function (f, l) {
			this.detachEvent("requestCompleted", f, l);
			return this;
		};
		b.prototype.fireRequestCompleted = function (A) {
			this.fireEvent("requestCompleted", A);
			return this;
		};
		b.prototype.attachMessageChange = function (d, f, l) {
			this.attachEvent("messageChange", d, f, l);
			return this;
		};
		b.prototype.detachMessageChange = function (f, l) {
			this.detachEvent("messageChange", f, l);
			return this;
		};
		b.prototype.firePropertyChange = function (A) {
			this.fireEvent("propertyChange", A);
			return this;
		};
		b.prototype.attachPropertyChange = function (d, f, l) {
			this.attachEvent("propertyChange", d, f, l);
			return this;
		};
		b.prototype.detachPropertyChange = function (f, l) {
			this.detachEvent("propertyChange", f, l);
			return this;
		};
		b.prototype.getObject = function (p, c, P) {
			return this.getProperty(p, c, P);
		};
		b.prototype.getContext = function (p) {
			if (!q.sap.startsWith(p, "/")) {
				throw new Error("Path " + p + " must start with a / ");
			}
			var c = this.mContexts[p];
			if (!c) {
				c = new C(this, p);
				this.mContexts[p] = c;
			}
			return c;
		};
		b.prototype.resolve = function (p, c) {
			var i = typeof p == "string" && !q.sap.startsWith(p, "/"),
				r = p,
				s;
			if (i) {
				if (c) {
					s = c.getPath();
					r = s + (q.sap.endsWith(s, "/") ? "" : "/") + p;
				} else {
					r = this.isLegacySyntax() ? "/" + p : undefined;
				}
			}
			if (!p && c) {
				r = c.getPath();
			}
			if (r && r !== "/" && q.sap.endsWith(r, "/")) {
				r = r.substr(0, r.length - 1);
			}
			return r;
		};
		b.prototype.addBinding = function (o) {
			this.aBindings.push(o);
		};
		b.prototype.removeBinding = function (o) {
			for (var i = 0; i < this.aBindings.length; i++) {
				if (this.aBindings[i] == o) {
					this.aBindings.splice(i, 1);
					break;
				}
			}
		};
		b.prototype.getDefaultBindingMode = function () {
			return this.sDefaultBindingMode;
		};
		b.prototype.setDefaultBindingMode = function (m) {
			if (this.isBindingModeSupported(m)) {
				this.sDefaultBindingMode = m;
				return this;
			}
			throw new Error("Binding mode " + m + " is not supported by this model.", this);
		};
		b.prototype.isBindingModeSupported = function (m) {
			return (m in this.mSupportedBindingModes);
		};
		b.prototype.setLegacySyntax = function (l) {
			this.bLegacySyntax = l;
		};
		b.prototype.isLegacySyntax = function () {
			return this.bLegacySyntax;
		};
		b.prototype.setSizeLimit = function (s) {
			this.iSizeLimit = s;
		};
		b.prototype.getInterface = function () {
			return this;
		};
		b.prototype.refresh = function (f) {
			this.checkUpdate(f);
			if (f) {
				this.fireMessageChange({
					oldMessages: this.mMessages
				});
			}
		};
		b.prototype.checkUpdate = function (f, A) {
			if (A) {
				if (!this.sUpdateTimer) {
					this.sUpdateTimer = q.sap.delayedCall(0, this, function () {
						this.checkUpdate(f);
					});
				}
				return;
			}
			if (this.sUpdateTimer) {
				q.sap.clearDelayedCall(this.sUpdateTimer);
				this.sUpdateTimer = null;
			}
			var c = this.aBindings.slice(0);
			q.each(c, function (i, o) {
				o.checkUpdate(f);
			});
		};
		b.prototype.setMessages = function (m) {
			m = m || {};
			if (!q.sap.equal(this.mMessages, m)) {
				this.mMessages = m;
				this.checkMessages();
			}
		};
		b.prototype.getMessagesByPath = function (p) {
			if (this.mMessages) {
				return this.mMessages[p] || [];
			}
			return null;
		};
		b.prototype.checkMessages = function () {
			q.each(this.aBindings, function (i, o) {
				if (o.checkDataState) {
					o.checkDataState();
				}
			});
		};
		b.prototype.destroy = function () {
			M.prototype.destroy.apply(this, arguments);
			this.oData = {};
			this.aBindings = [];
			this.mContexts = {};
			if (this.sUpdateTimer) {
				q.sap.clearDelayedCall(this.sUpdateTimer);
			}
			this.bDestroyed = true;
		};
		b.prototype.getMetaModel = function () {
			return undefined;
		};
		b.prototype.getOriginalProperty = function (p, c) {
			return this.getProperty(p, c);
		};
		b.prototype.isLaundering = function (p, c) {
			return false;
		};
		b.prototype.checkFilterOperation = function (f) {
			_(f, function (o) {
				if (this.mUnsupportedFilterOperators[o.sOperator]) {
					throw new Error("Filter instances contain an unsupported FilterOperator: " + o.sOperator);
				}
			}.bind(this));
		};

		function _(f, c) {
			f = f || [];
			if (f instanceof F) {
				f = [f];
			}
			for (var i = 0; i < f.length; i++) {
				var o = f[i];
				c(o);
				_(o.oCondition, c);
				_(o.aFilters, c);
			}
		}
		return b;
	});
	sap.ui.predefine('sap/ui/model/ParseException', ['sap/ui/base/Exception'], function (E) {
		"use strict";
		var P = function (m) {
			this.name = "ParseException";
			this.message = m;
		};
		P.prototype = Object.create(E.prototype);
		return P;
	}, true);
	sap.ui.predefine('sap/ui/model/PropertyBinding', ['jquery.sap.global', './Binding', './SimpleType', './DataState'], function (q, B, S, D) {
		"use strict";
		var P = B.extend("sap.ui.model.PropertyBinding", {
			constructor: function (m, p, c, a) {
				B.apply(this, arguments);
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getValue", "setValue", "setType", "getType", "setFormatter", "getFormatter", "getExternalValue", "setExternalValue", "getBindingMode"]
			}
		});
		P.prototype.getExternalValue = function () {
			return this._toExternalValue(this.getValue());
		};
		P.prototype._toExternalValue = function (v) {
			if (this.oType) {
				v = this.oType.formatValue(v, this.sInternalType);
			}
			if (this.fnFormatter) {
				v = this.fnFormatter(v);
			}
			return v;
		};
		P.prototype.setExternalValue = function (v) {
			if (this.fnFormatter) {
				q.sap.log.warning("Tried to use twoway binding, but a formatter function is used");
				return;
			}
			var d = this.getDataState();
			try {
				if (this.oType) {
					v = this.oType.parseValue(v, this.sInternalType);
					this.oType.validateValue(v);
				}
			} catch (e) {
				d.setInvalidValue(v);
				this.checkDataState();
				throw e;
			}
			d.setInvalidValue(undefined);
			this.setValue(v);
		};
		P.prototype.getInternalValue = function () {
			var v = this.getValue();
			var f;
			if (this.oType && v !== null && v !== undefined) {
				f = this.oType.getModelFormat();
				return f.parse(v);
			}
			return v;
		};
		P.prototype.setInternalValue = function (v) {
			var f;
			if (this.fnFormatter) {
				q.sap.log.warning("Tried to use twoway binding, but a formatter function is used");
				return;
			}
			var d = this.getDataState();
			try {
				if (this.oType && v !== null && v !== undefined) {
					f = this.oType.getModelFormat();
					v = f.format(v);
					this.oType.validateValue(v);
				}
			} catch (e) {
				d.setInvalidValue(v);
				this.checkDataState();
				throw e;
			}
			d.setInvalidValue(undefined);
			this.setValue(v);
		};
		P.prototype.setType = function (t, i) {
			this.oType = t;
			this.sInternalType = i;
		};
		P.prototype.getType = function () {
			return this.oType;
		};
		P.prototype.setFormatter = function (f) {
			this.fnFormatter = f;
		};
		P.prototype.getFormatter = function () {
			return this.fnFormatter;
		};
		P.prototype.getBindingMode = function () {
			return this.sMode;
		};
		P.prototype.setBindingMode = function (b) {
			this.sMode = b;
		};
		P.prototype.resume = function () {
			this.bSuspended = false;
			this.checkUpdate(true);
		};
		P.prototype.checkDataState = function (p) {
			var r = this.oModel ? this.oModel.resolve(this.sPath, this.oContext) : null,
				d = this.getDataState(),
				t = this;

			function f() {
				t.fireEvent("AggregatedDataStateChange", {
					dataState: d
				});
				d.changed(false);
				t._sDataStateTimout = null;
			}
			if (!p || r && r in p) {
				if (r) {
					d.setModelMessages(this.oModel.getMessagesByPath(r));
				}
				if (d && d.changed()) {
					if (this.mEventRegistry["DataStateChange"]) {
						this.fireEvent("DataStateChange", {
							dataState: d
						});
					}
					if (this.bIsBeingDestroyed) {
						f();
					} else if (this.mEventRegistry["AggregatedDataStateChange"]) {
						if (!this._sDataStateTimout) {
							this._sDataStateTimout = setTimeout(f, 0);
						}
					}
				}
			}
		};
		return P;
	});
	sap.ui.predefine('sap/ui/model/SimpleType', ['sap/ui/base/DataType', './FormatException', './ParseException', './Type', './ValidateException'], function (D, F, P, T, V) {
		"use strict";
		var m = {
			format: function (v) {
				return v;
			},
			parse: function (v) {
				return v;
			}
		};
		var S = T.extend("sap.ui.model.SimpleType", {
			constructor: function (f, c) {
				T.apply(this, arguments);
				this.setFormatOptions(f || {});
				this.setConstraints(c || {});
				this.sName = "SimpleType";
			},
			metadata: {
				"abstract": true,
				publicMethods: ["setConstraints", "setFormatOptions", "formatValue", "parseValue", "validateValue"]
			}
		});
		S.prototype.getModelFormat = function () {
			return m;
		};
		S.prototype.setConstraints = function (c) {
			this.oConstraints = c;
		};
		S.prototype.setFormatOptions = function (f) {
			this.oFormatOptions = f;
		};
		S.prototype.getPrimitiveType = function (i) {
			switch (i) {
				case "any":
				case "boolean":
				case "int":
				case "float":
				case "string":
				case "object":
					return i;
				default:
					var I = D.getType(i);
					return I && I.getPrimitiveType().getName();
			}
		};
		return S;
	});
	sap.ui.predefine('sap/ui/model/Sorter', ['sap/ui/base/Object'], function (B) {
		"use strict";
		var S = B.extend("sap.ui.model.Sorter", {
			constructor: function (p, d, g, c) {
				if (typeof p === "object") {
					var s = p;
					p = s.path;
					d = s.descending;
					g = s.group;
					c = s.comparator;
				}
				this.sPath = p;
				var i = this.sPath.indexOf(">");
				if (i > 0) {
					jQuery.sap.log.error("Model names are not allowed in sorter-paths: \"" + this.sPath + "\"");
					this.sPath = this.sPath.substr(i + 1);
				}
				this.bDescending = d;
				this.vGroup = g;
				if (typeof g == "boolean" && g) {
					this.fnGroup = function (C) {
						return C.getProperty(this.sPath);
					};
				}
				if (typeof g == "function") {
					this.fnGroup = g;
				}
				this.fnCompare = c;
			},
			getGroup: function (c) {
				var g = this.fnGroup(c);
				if (typeof g === "string" || typeof g === "number" || typeof g === "boolean" || g == null) {
					g = {
						key: g
					};
				}
				return g;
			},
			getGroupFunction: function () {
				return this.fnGroup && this.fnGroup.bind(this);
			}
		});
		S.defaultComparator = function (a, b) {
			if (a == b) {
				return 0;
			}
			if (b == null) {
				return -1;
			}
			if (a == null) {
				return 1;
			}
			if (typeof a == "string" && typeof b == "string") {
				return a.localeCompare(b);
			}
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		};
		return S;
	});
	sap.ui.predefine('sap/ui/model/SorterProcessor', ['jquery.sap.global', './Sorter'], function (q, S) {
		"use strict";
		var c = {};
		c.apply = function (d, s, g, G) {
			var t = this,
				e = [],
				C = [],
				v, o;
			if (!s || s.length == 0) {
				return d;
			}
			for (var j = 0; j < s.length; j++) {
				o = s[j];
				C[j] = o.fnCompare || S.defaultComparator;
				q.each(d, function (i, r) {
					v = g(r, o.sPath);
					if (typeof v == "string") {
						v = v.toLocaleUpperCase();
					}
					if (!e[j]) {
						e[j] = [];
					}
					if (G) {
						r = G(r);
					}
					e[j][r] = v;
				});
			}
			d.sort(function (a, b) {
				if (G) {
					a = G(a);
					b = G(b);
				}
				var f = e[0][a],
					h = e[0][b];
				return t._applySortCompare(s, a, b, f, h, e, C, 0);
			});
			return d;
		};
		c._applySortCompare = function (s, a, b, v, d, e, C, D) {
			var o = s[D],
				f = C[D],
				r;
			r = f(v, d);
			if (o.bDescending) {
				r = -r;
			}
			if (r == 0 && s[D + 1]) {
				v = e[D + 1][a];
				d = e[D + 1][b];
				r = this._applySortCompare(s, a, b, v, d, e, C, D + 1);
			}
			return r;
		};
		return c;
	});
	sap.ui.predefine('sap/ui/model/TreeBinding', ['jquery.sap.global', './Binding', './Filter', './Sorter'], function (q, B, F, S) {
		"use strict";
		var T = B.extend("sap.ui.model.TreeBinding", {
			constructor: function (M, p, c, f, P, s) {
				B.call(this, M, p, c, P);
				this.aFilters = [];
				this.aSorters = m(s, S);
				this.aApplicationFilters = m(f, F);
				this.bDisplayRootNode = P && P.displayRootNode === true;
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getRootContexts", "getNodeContexts", "hasChildren", "filter"]
			}
		});

		function m(a, b) {
			if (Array.isArray(a)) {
				return a;
			}
			return a instanceof b ? [a] : [];
		}
		T.prototype.getChildCount = function (c) {
			if (!c) {
				return this.getRootContexts().length;
			}
			return this.getNodeContexts(c).length;
		};
		T.prototype.attachFilter = function (f, l) {
			this.attachEvent("_filter", f, l);
		};
		T.prototype.detachFilter = function (f, l) {
			this.detachEvent("_filter", f, l);
		};
		T.prototype._fireFilter = function (a) {
			this.fireEvent("_filter", a);
		};
		return T;
	});
	sap.ui.predefine('sap/ui/model/Type', ['sap/ui/base/Object'], function (B) {
		"use strict";
		var T = B.extend("sap.ui.model.Type", {
			constructor: function () {
				B.apply(this, arguments);
				this.sName = "Type";
			},
			metadata: {
				"abstract": true,
				publicMethods: ["getName"]
			}
		});
		T.prototype.getName = function () {
			return this.sName;
		};
		T.prototype.toString = function () {
			return "Type " + this.getMetadata().getName();
		};
		return T;
	});
	sap.ui.predefine('sap/ui/model/ValidateException', ['sap/ui/base/Exception'], function (E) {
		"use strict";
		var V = function (m, v) {
			this.name = "ValidateException";
			this.message = m;
			this.violatedConstraints = v;
		};
		V.prototype = Object.create(E.prototype);
		return V;
	}, true);
	sap.ui.predefine('sap/ui/model/message/MessageListBinding', ['jquery.sap.global', 'sap/ui/model/ChangeReason', 'sap/ui/model/ClientListBinding'], function (q, C, a) {
		"use strict";
		var M = a.extend("sap.ui.model.message.MessageListBinding");
		M.prototype.getContexts = function (s, l) {
			this.iLastStartIndex = s;
			this.iLastLength = l;
			if (!s) {
				s = 0;
			}
			if (!l) {
				l = Math.min(this.iLength, this.oModel.iSizeLimit);
			}
			var c = this._getContexts(s, l),
				o = {};
			if (this.bUseExtendedChangeDetection) {
				for (var i = 0; i < c.length; i++) {
					o[c[i].getPath()] = c[i].getObject();
				}
				if (this.aLastContexts && s < this.iLastEndIndex) {
					var t = this;
					var d = q.sap.arrayDiff(this.aLastContexts, c, function (O, n) {
						return q.sap.equal(O && t.oLastContextData && t.oLastContextData[O.getPath()], n && o && o[n.getPath()]);
					});
					c.diff = d;
				}
				this.iLastEndIndex = s + l;
				this.aLastContexts = c.slice(0);
				this.oLastContextData = q.extend(true, {}, o);
			}
			return c;
		};
		M.prototype.update = function () {
			var l = this.oModel._getObject(this.sPath, this.oContext);
			if (Array.isArray(l)) {
				if (this.bUseExtendedChangeDetection) {
					this.oList = q.extend(true, [], l);
				} else {
					this.oList = l.slice(0);
				}
				this.updateIndices();
				this.applyFilter();
				this.applySort();
				this.iLength = this._getLength();
			} else {
				this.oList = [];
				this.aIndices = [];
				this.iLength = 0;
			}
		};
		M.prototype.checkUpdate = function (f) {
			if (this.bSuspended && !this.bIgnoreSuspend) {
				return;
			}
			if (!this.bUseExtendedChangeDetection) {
				var l = this.oModel._getObject(this.sPath, this.oContext);
				if (!q.sap.equal(this.oList, l) || f) {
					this.update();
					this._fireChange({
						reason: C.Change
					});
				}
			} else {
				var c = false;
				var t = this;
				var l = this.oModel._getObject(this.sPath, this.oContext);
				if (!q.sap.equal(this.oList, l)) {
					this.update();
				}
				var b = this._getContexts(this.iLastStartIndex, this.iLastLength);
				if (this.aLastContexts) {
					if (this.aLastContexts.length != b.length) {
						c = true;
					} else {
						q.each(this.aLastContexts, function (i, o) {
							if (!q.sap.equal(b[i].getObject(), t.oLastContextData[o.getPath()])) {
								c = true;
								return false;
							}
						});
					}
				} else {
					c = true;
				}
				if (c || f) {
					this._fireChange({
						reason: C.Change
					});
				}
			}
		};
		return M;
	});
	sap.ui.predefine('sap/ui/model/message/MessageModel', ['jquery.sap.global', 'sap/ui/model/BindingMode', 'sap/ui/model/ClientModel', 'sap/ui/model/Context', './MessageListBinding', './MessagePropertyBinding'], function (q, B, C, a, M, b) {
		"use strict";
		var c = C.extend("sap.ui.model.message.MessageModel", {
			constructor: function (m) {
				C.apply(this, arguments);
				this.sDefaultBindingMode = B.OneWay;
				this.mSupportedBindingModes = {
					"OneWay": true,
					"TwoWay": false,
					"OneTime": false
				};
				this.oMessageManager = m;
			}
		});
		c.prototype.setData = function (d) {
			this.oData = d;
			this.checkUpdate();
		};
		c.prototype.fireMessageChange = function (A) {
			this.fireEvent("messageChange", A);
			return this;
		};
		c.prototype.bindProperty = function (p, o, P) {
			var d = new b(this, p, o, P);
			return d;
		};
		c.prototype.bindList = function (p, o, s, f, P) {
			var d = new M(this, p, o, s, f, P);
			return d;
		};
		c.prototype.setProperty = function (p, v, o) {
			q.sap.log.error(this + "not implemented: Only 'OneWay' binding mode supported");
		};
		c.prototype.getProperty = function (p, o) {
			return this._getObject(p, o);
		};
		c.prototype._getObject = function (p, o) {
			var n;
			if (o instanceof a) {
				n = this._getObject(o.getPath());
			} else if (o) {
				n = o;
			}
			if (!p) {
				return n;
			}
			var P = p.split("/"),
				i = 0;
			if (!P[0]) {
				n = this.oData;
				i++;
			}
			while (n && P[i]) {
				n = n[P[i]];
				i++;
			}
			return n;
		};
		return c;
	});
	sap.ui.predefine('sap/ui/model/message/MessagePropertyBinding', ['jquery.sap.global', 'sap/ui/model/ChangeReason', 'sap/ui/model/ClientPropertyBinding'], function (q, C, a) {
		"use strict";
		var M = a.extend("sap.ui.model.message.MessagePropertyBinding");
		M.prototype.setValue = function (v) {
			if (!q.sap.equal(this.oValue, v)) {
				this.oModel.setProperty(this.sPath, v, this.oContext);
			}
		};
		M.prototype.checkUpdate = function (f) {
			var v = this._getValue();
			if (!q.sap.equal(v, this.oValue) || f) {
				this.oValue = v;
				this._fireChange({
					reason: C.Change
				});
			}
		};
		return M;
	});
	sap.ui.predefine('jquery.sap.dom', ['jquery.sap.global', 'sap/ui/Device'], function (q, D) {
		"use strict";
		q.sap.domById = function domById(i, w) {
			return i ? (w || window).document.getElementById(i) : null;
		};
		q.sap.byId = function byId(i, C) {
			var e = "";
			if (i) {
				e = "#" + i.replace(/(:|\.)/g, '\\$1');
			}
			return q(e, C);
		};
		q.sap.focus = function focus(o) {
			if (!o) {
				return;
			}
			o.focus();
			return true;
		};

		function g() {
			var r = document.documentElement;
			if (!r) {
				return 16;
			}
			return parseFloat(window.getComputedStyle(r).getPropertyValue("font-size"));
		}
		q.sap.pxToRem = function (P) {
			return parseFloat(P) / g();
		};
		q.sap.remToPx = function (r) {
			return parseFloat(r) * g();
		};
		q.fn.cursorPos = function cursorPos(P) {
			var l = arguments.length,
				t, T;
			t = this.prop("tagName");
			T = this.prop("type");
			if (this.length === 1 && ((t == "INPUT" && (T == "text" || T == "password" || T == "search")) || t == "TEXTAREA")) {
				var o = this.get(0);
				if (l > 0) {
					if (typeof (o.selectionStart) == "number") {
						o.focus();
						o.selectionStart = P;
						o.selectionEnd = P;
					}
					return this;
				} else {
					if (typeof (o.selectionStart) == "number") {
						return o.selectionStart;
					}
					return -1;
				}
			} else {
				return this;
			}
		};
		q.fn.selectText = function selectText(s, E) {
			var o = this.get(0);
			try {
				if (typeof (o.selectionStart) === "number") {
					o.setSelectionRange(s > 0 ? s : 0, E);
				}
			} catch (e) {}
			return this;
		};
		q.fn.getSelectedText = function () {
			var o = this.get(0);
			try {
				if (typeof o.selectionStart === "number") {
					return o.value.substring(o.selectionStart, o.selectionEnd);
				}
			} catch (e) {}
			return "";
		};
		q.fn.outerHTML = function outerHTML() {
			var o = this.get(0);
			if (o && o.outerHTML) {
				return q.trim(o.outerHTML);
			} else {
				var e = this[0] ? this[0].ownerDocument : document;
				var i = e.createElement("div");
				i.appendChild(o.cloneNode(true));
				return i.innerHTML;
			}
		};
		q.sap.containsOrEquals = function containsOrEquals(o, e) {
			if (e && o && e != document && e != window) {
				return (o === e) || q.contains(o, e);
			}
			return false;
		};
		q.fn.rect = function rect() {
			var o = this.get(0);
			if (o) {
				if (o.getBoundingClientRect) {
					var C = o.getBoundingClientRect();
					var r = {
						top: C.top,
						left: C.left,
						width: C.right - C.left,
						height: C.bottom - C.top
					};
					var w = q.sap.ownerWindow(o);
					r.left += q(w).scrollLeft();
					r.top += q(w).scrollTop();
					return r;
				} else {
					return {
						top: 10,
						left: 10,
						width: o.offsetWidth,
						height: o.offsetWidth
					};
				}
			}
			return null;
		};
		q.fn.rectContains = function rectContains(P, i) {
			var r = this.rect();
			if (r) {
				return P >= r.left && P <= r.left + r.width && i >= r.top && i <= r.top + r.height;
			}
			return false;
		};

		function h(e) {
			var t = q.prop(e, "tabIndex");
			return t != null && t >= 0 && (!q.attr(e, "disabled") || q.attr(e, "tabindex"));
		}
		q.fn.hasTabIndex = function () {
			return h(this.get(0));
		};

		function a(e) {
			return (e.offsetWidth <= 0 && e.offsetHeight <= 0) || q.css(e, 'visibility') === 'hidden';
		}

		function f(C, F) {
			var o = F ? C.firstChild : C.lastChild,
				e;
			while (o) {
				if (o.nodeType == 1 && !a(o)) {
					if (h(o)) {
						return o;
					}
					e = f(o, F);
					if (e) {
						return e;
					}
				}
				o = F ? o.nextSibling : o.previousSibling;
			}
			return null;
		}
		q.fn.firstFocusableDomRef = function firstFocusableDomRef() {
			var C = this.get(0);
			if (!C || a(C)) {
				return null;
			}
			return f(C, true);
		};
		q.fn.lastFocusableDomRef = function lastFocusableDomRef() {
			var C = this.get(0);
			if (!C || a(C)) {
				return null;
			}
			return f(C, false);
		};
		q.fn.scrollLeftRTL = function scrollLeftRTL(P) {
			var o = this.get(0);
			if (o) {
				if (P === undefined) {
					if (D.browser.msie || D.browser.edge) {
						return o.scrollWidth - o.scrollLeft - o.clientWidth;
					} else if (D.browser.firefox || (D.browser.safari && D.browser.version >= 10)) {
						return o.scrollWidth + o.scrollLeft - o.clientWidth;
					} else if (D.browser.webkit) {
						return o.scrollLeft;
					} else {
						return o.scrollLeft;
					}
				} else {
					o.scrollLeft = q.sap.denormalizeScrollLeftRTL(P, o);
					return this;
				}
			}
		};
		q.fn.scrollRightRTL = function scrollRightRTL() {
			var o = this.get(0);
			if (o) {
				if (D.browser.msie) {
					return o.scrollLeft;
				} else if (D.browser.firefox || (D.browser.safari && D.browser.version >= 10)) {
					return (-o.scrollLeft);
				} else if (D.browser.webkit) {
					return o.scrollWidth - o.scrollLeft - o.clientWidth;
				} else {
					return o.scrollLeft;
				}
			}
		};
		q.sap.denormalizeScrollLeftRTL = function (n, o) {
			if (o) {
				if (D.browser.msie || D.browser.edge) {
					return o.scrollWidth - o.clientWidth - n;
				} else if (D.browser.firefox || (D.browser.safari && D.browser.version >= 10)) {
					return o.clientWidth + n - o.scrollWidth;
				} else if (D.browser.webkit) {
					return n;
				} else {
					return n;
				}
			}
		};
		q.sap.denormalizeScrollBeginRTL = function (n, o) {
			if (o) {
				if (D.browser.msie) {
					return n;
				} else if (D.browser.webkit) {
					return o.scrollWidth - o.clientWidth - n;
				} else if (D.browser.firefox) {
					return -n;
				} else {
					return n;
				}
			}
		};
		/*
		 * The following methods are taken from jQuery UI core but modified.
		 *
		 * jQuery UI Core
		 * http://jqueryui.com
		 *
		 * Copyright 2014 jQuery Foundation and other contributors
		 * Released under the MIT license.
		 * http://jquery.org/license
		 *
		 * http://api.jqueryui.com/category/ui-core/
		 */

		q.support.selectstart = "onselectstart" in document.createElement("div");
		q.fn.extend({
			disableSelection: function () {
				return this.on((q.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
					e.preventDefault();
				});
			},
			enableSelection: function () {
				return this.off(".ui-disableSelection");
			}
		});
		/*!
		 * The following functions are taken from jQuery UI 1.8.17 but modified
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 */

		function v(e) {
			var o = q(e).offsetParent();
			var O = false;
			var $ = q(e).parents().filter(function () {
				if (this === o) {
					O = true;
				}
				return O;
			});
			return !q(e).add($).filter(function () {
				return q.css(this, "visibility") === "hidden" || q.expr.filters.hidden(this);
			}).length;
		}

		function b(e, i) {
			var n = e.nodeName.toLowerCase();
			if (n === "area") {
				var m = e.parentNode,
					l = m.name,
					o;
				if (!e.href || !l || m.nodeName.toLowerCase() !== "map") {
					return false;
				}
				o = q("img[usemap='#" + l + "']")[0];
				return !!o && v(o);
			}
			return (/input|select|textarea|button|object/.test(n) ? !e.disabled : n == "a" ? e.href || i : i) && v(e);
		}
		if (!q.expr[":"].focusable) {
			/*!
			 * The following function is taken from jQuery UI 1.8.17
			 *
			 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
			 * Dual licensed under the MIT or GPL Version 2 licenses.
			 * http://jquery.org/license
			 *
			 * http://docs.jquery.com/UI
			 *
			 * But since visible is modified, focusable is different too the jQuery UI version too.
			 */
			q.extend(q.expr[":"], {
				focusable: function (e) {
					return b(e, !isNaN(q.attr(e, "tabindex")));
				}
			});
		}
		if (!q.expr[":"].sapTabbable) {
			/*!
			 * The following function is taken from
			 * jQuery UI Core 1.11.1
			 * http://jqueryui.com
			 *
			 * Copyright 2014 jQuery Foundation and other contributors
			 * Released under the MIT license.
			 * http://jquery.org/license
			 *
			 * http://api.jqueryui.com/category/ui-core/
			 */
			q.extend(q.expr[":"], {
				sapTabbable: function (e) {
					var t = q.attr(e, "tabindex"),
						i = isNaN(t);
					return (i || t >= 0) && b(e, !i);
				}
			});
		}
		if (!q.expr[":"].sapFocusable) {
			q.extend(q.expr[":"], {
				sapFocusable: function (e) {
					return b(e, !isNaN(q.attr(e, "tabindex")));
				}
			});
		}
		if (!q.fn.zIndex) {
			q.fn.zIndex = function (z) {
				if (z !== undefined) {
					return this.css("zIndex", z);
				}
				if (this.length) {
					var e = q(this[0]),
						i, l;
					while (e.length && e[0] !== document) {
						i = e.css("position");
						if (i === "absolute" || i === "relative" || i === "fixed") {
							l = parseInt(e.css("zIndex"), 10);
							if (!isNaN(l) && l !== 0) {
								return l;
							}
						}
						e = e.parent();
					}
				}
				return 0;
			};
		}
		q.fn.parentByAttribute = function parentByAttribute(A, V) {
			if (this.length > 0) {
				if (V) {
					return this.first().parents("[" + A + "='" + V + "']").get(0);
				} else {
					return this.first().parents("[" + A + "]").get(0);
				}
			}
		};
		q.sap.ownerWindow = function ownerWindow(o) {
			if (o.ownerDocument.parentWindow) {
				return o.ownerDocument.parentWindow;
			}
			return o.ownerDocument.defaultView;
		};
		var _ = {};
		q.sap.scrollbarSize = function (C, F) {
			if (typeof C === "boolean") {
				F = C;
				C = null;
			}
			var K = C || "#DEFAULT";
			if (F) {
				if (C) {
					delete _[C];
				} else {
					_ = {};
				}
			}
			if (_[K]) {
				return _[K];
			}
			if (!document.body) {
				return {
					width: 0,
					height: 0
				};
			}
			var A = q("<DIV/>").css("visibility", "hidden").css("height", "0").css("width", "0").css("overflow", "hidden");
			if (C) {
				A.addClass(C);
			}
			A.prependTo(document.body);
			var $ = q("<div style=\"visibility:visible;position:absolute;height:100px;width:100px;overflow:scroll;opacity:0;\"></div>");
			A.append($);
			var o = $.get(0);
			var w = o.offsetWidth - o.scrollWidth;
			var H = o.offsetHeight - o.scrollHeight;
			A.remove();
			if (w === 0 || H === 0) {
				return {
					width: w,
					height: H
				};
			}
			_[K] = {
				width: w,
				height: H
			};
			return _[K];
		};
		var c;

		function d() {
			return c || (c = sap.ui.require('sap/ui/core/Control'));
		}
		q.sap.syncStyleClass = function (s, S, e) {
			if (!s) {
				return e;
			}
			var C = d();
			if (C && S instanceof C) {
				S = S.$();
			} else if (typeof S === "string") {
				S = q.sap.byId(S);
			} else if (!(S instanceof q)) {
				return e;
			}
			var i = !!S.closest("." + s).length;
			if (e instanceof q) {
				e.toggleClass(s, i);
			} else if (C && e instanceof C) {
				e.toggleStyleClass(s, i);
			} else {}
			return e;
		};

		function j(A, V, P) {
			var s = this.attr(A);
			if (!s) {
				return this.attr(A, V);
			}
			var e = s.split(" ");
			if (e.indexOf(V) == -1) {
				P ? e.unshift(V) : e.push(V);
				this.attr(A, e.join(" "));
			}
			return this;
		}

		function k(A, V) {
			var s = this.attr(A) || "",
				e = s.split(" "),
				i = e.indexOf(V);
			if (i == -1) {
				return this;
			}
			e.splice(i, 1);
			if (e.length) {
				this.attr(A, e.join(" "));
			} else {
				this.removeAttr(A);
			}
			return this;
		}
		q.fn.addAriaLabelledBy = function (i, P) {
			return j.call(this, "aria-labelledby", i, P);
		};
		q.fn.removeAriaLabelledBy = function (i) {
			return k.call(this, "aria-labelledby", i);
		};
		q.fn.addAriaDescribedBy = function (i, P) {
			return j.call(this, "aria-describedby", i, P);
		};
		q.fn.removeAriaDescribedBy = function (i) {
			return k.call(this, "aria-describedby", i);
		};

		function p(o, n) {
			if (o.childElementCount != n.childElementCount || o.tagName != n.tagName) {
				o.parentNode.replaceChild(n, o);
				return false;
			}
			if (o.isEqualNode(n)) {
				return true;
			}
			var O = o.attributes;
			for (var i = 0, e = O.length; i < e; i++) {
				var A = O[i].name;
				if (n.getAttribute(A) === null) {
					o.removeAttribute(A);
					e = e - 1;
					i = i - 1;
				}
			}
			var N = n.attributes;
			for (var i = 0, e = N.length; i < e; i++) {
				var A = N[i].name,
					l = o.getAttribute(A),
					m = n.getAttribute(A);
				if (l === null || l !== m) {
					o.setAttribute(A, m);
				}
			}
			var s = n.childNodes.length;
			if (!s && !o.hasChildNodes()) {
				return true;
			}
			if (!n.childElementCount) {
				if (!s) {
					o.textContent = "";
				} else if (s == 1 && n.firstChild.nodeType == 3) {
					o.textContent = n.textContent;
				} else {
					o.innerHTML = n.innerHTML;
				}
				return true;
			}
			for (var i = 0, r = 0, e = s; i < e; i++) {
				var t = o.childNodes[i],
					u = n.childNodes[i - r];
				if (u.nodeType == 1) {
					if (!p(t, u)) {
						r = r + 1;
					}
				} else {
					t.nodeValue = u.nodeValue;
				}
			}
			return true;
		}
		q.sap.replaceDOM = function (o, n, C) {
			var N;
			if (typeof n === "string") {
				N = q.parseHTML(n)[0];
			} else {
				N = n;
			}
			if (C) {
				q.cleanData([o]);
				q.cleanData(o.getElementsByTagName("*"));
			}
			return p(o, N);
		};
		return q;
	});
	/*!
	 * UI development toolkit for HTML5 (OpenUI5)
	 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
	 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
	 */
	sap.ui.predefine('sap/ui/base/ExpressionParser', ['jquery.sap.global', 'sap/ui/thirdparty/URI', 'jquery.sap.strings'], function (q, U) {
		"use strict";
		//License granted by Douglas Crockford to SAP, Apache License 2.0
		//    (http://www.apache.org/licenses/LICENSE-2.0)
		var u = f.bind(null, undefined),
			d = {
				"Array": Array,
				"Boolean": Boolean,
				"Date": Date,
				"encodeURIComponent": encodeURIComponent,
				"Infinity": Infinity,
				"isFinite": isFinite,
				"isNaN": isNaN,
				"JSON": JSON,
				"Math": Math,
				"NaN": NaN,
				"Number": Number,
				"Object": Object,
				"odata": {
					"compare": function () {
						var O;
						O = sap.ui.requireSync("sap/ui/model/odata/v4/ODataUtils");
						return O.compare.apply(O, arguments);
					},
					"fillUriTemplate": function () {
						if (!U.expand) {
							sap.ui.requireSync("sap/ui/thirdparty/URITemplate");
						}
						return U.expand.apply(U, arguments).toString();
					},
					"uriEncode": function () {
						var O;
						O = sap.ui.requireSync("sap/ui/model/odata/ODataUtils");
						return O.formatValue.apply(O, arguments);
					}
				},
				"parseFloat": parseFloat,
				"parseInt": parseInt,
				"RegExp": RegExp,
				"String": String,
				"undefined": undefined
			},
			r = /\d/,
			E = "sap.ui.base.ExpressionParser",
			a = /[a-z_$][a-z0-9_$]*/i,
			b = /[a-z_$]/i,
			p = [E],
			P = E + "#parse",
			s = {
				"BINDING": {
					led: l,
					nud: function (T, e) {
						return B.bind(null, T.value);
					}
				},
				"ERROR": {
					lbp: Infinity,
					led: function (T, e, L) {
						k(T.value.message, T.value.text, T.value.at);
					},
					nud: function (T, e) {
						k(T.value.message, T.value.text, T.value.at);
					}
				},
				"IDENTIFIER": {
					led: l,
					nud: function (T, e) {
						if (!(T.value in e.globals)) {
							q.sap.log.warning("Unsupported global identifier '" + T.value + "' in expression parser input '" + e.input + "'", undefined, E);
						}
						return f.bind(null, e.globals[T.value]);
					}
				},
				"CONSTANT": {
					led: l,
					nud: function (T, e) {
						return f.bind(null, T.value);
					}
				},
				".": {
					lbp: 18,
					led: function (T, e, L) {
						return D.bind(null, L, e.advance("IDENTIFIER").value);
					},
					nud: l
				},
				"(": {
					lbp: 17,
					led: function (T, e, L) {
						var i = [],
							v = true;
						while (e.current().id !== ")") {
							if (v) {
								v = false;
							} else {
								e.advance(",");
							}
							i.push(e.expression(0));
						}
						e.advance(")");
						return F.bind(null, L, i);
					},
					nud: function (T, e) {
						var v = e.expression(0);
						e.advance(")");
						return v;
					}
				},
				"[": {
					lbp: 18,
					led: function (T, e, L) {
						var N = e.expression(0);
						e.advance("]");
						return g.bind(null, L, N);
					},
					nud: function (T, e) {
						var i = [],
							v = true;
						while (e.current().id !== "]") {
							if (v) {
								v = false;
							} else {
								e.advance(",");
							}
							i.push(e.current().id === "," ? u : e.expression(0));
						}
						e.advance("]");
						return A.bind(null, i);
					}
				},
				"!": {
					lbp: 15,
					led: l,
					nud: function (T, e) {
						return h.bind(null, e.expression(this.lbp), function (x) {
							return !x;
						});
					}
				},
				"typeof": {
					lbp: 15,
					led: l,
					nud: function (T, e) {
						return h.bind(null, e.expression(this.lbp), function (x) {
							return typeof x;
						});
					}
				},
				"?": {
					lbp: 4,
					led: function (T, e, L) {
						var i, v;
						v = e.expression(this.lbp - 1);
						e.advance(":");
						i = e.expression(this.lbp - 1);
						return C.bind(null, L, v, i);
					},
					nud: l
				},
				")": {
					led: l,
					nud: l
				},
				"]": {
					led: l,
					nud: l
				},
				"{": {
					led: l,
					nud: function (T, e) {
						var i = true,
							K, v = {},
							V;
						while (e.current().id !== "}") {
							if (i) {
								i = false;
							} else {
								e.advance(",");
							}
							if (e.current() && e.current().id === "CONSTANT" && typeof e.current().value === "string") {
								K = e.advance().value;
							} else {
								K = e.advance("IDENTIFIER").value;
							}
							e.advance(":");
							V = e.expression(0);
							v[K] = V;
						}
						e.advance("}");
						return M.bind(null, v);
					}
				},
				"}": {
					lbp: -1,
					led: l,
					nud: l
				},
				",": {
					led: l,
					nud: l
				},
				":": {
					led: l,
					nud: l
				}
			},
			t = ["===", "!==", "!", "||", "&&", ".", "(", ")", "{", "}", ":", ",", "?", "*", "/", "%", "+", "-", "<=", "<", ">=", ">", "[", "]"],
			c;
		t.forEach(function (T, i) {
			t[i] = q.sap.escapeRegExp(T);
		});
		c = new RegExp(t.join("|"), "g");
		j("*", 14, function (x, y) {
			return x * y;
		});
		j("/", 14, function (x, y) {
			return x / y;
		});
		j("%", 14, function (x, y) {
			return x % y;
		});
		j("+", 13, function (x, y) {
			return x + y;
		}).nud = function (T, e) {
			return h.bind(null, e.expression(this.lbp), function (x) {
				return +x;
			});
		};
		j("-", 13, function (x, y) {
			return x - y;
		}).nud = function (T, e) {
			return h.bind(null, e.expression(this.lbp), function (x) {
				return -x;
			});
		};
		j("<=", 11, function (x, y) {
			return x <= y;
		});
		j("<", 11, function (x, y) {
			return x < y;
		});
		j(">=", 11, function (x, y) {
			return x >= y;
		});
		j(">", 11, function (x, y) {
			return x > y;
		});
		j("in", 11, function (x, y) {
			return x in y;
		});
		j("===", 10, function (x, y) {
			return x === y;
		});
		j("!==", 10, function (x, y) {
			return x !== y;
		});
		j("&&", 7, function (x, y) {
			return x && y();
		}, true);
		j("||", 6, function (x, y) {
			return x || y();
		}, true);

		function A(e, v) {
			var R = [];
			e.forEach(function (w, i) {
				R[i] = w(v);
			});
			return R;
		}

		function B(i, e) {
			return e[i];
		}

		function C(e, T, i, v) {
			return e(v) ? T(v) : i(v);
		}

		function f(v) {
			return v;
		}

		function D(L, i, e) {
			var v = L(e),
				w = v[i];
			return typeof w === "function" ? w.bind(v) : w;
		}

		function F(L, e, v) {
			var R = [];
			e.forEach(function (w, i) {
				R[i] = w(v);
			});
			return L(v).apply(null, R);
		}

		function I(L, R, O, e, i) {
			return O(L(i), e ? R.bind(null, i) : R(i));
		}

		function M(e, i) {
			var K, R = {};
			for (K in e) {
				R[K] = e[K](i);
			}
			return R;
		}

		function g(L, N, e) {
			return L(e)[N(e)];
		}

		function h(R, O, e) {
			return O(R(e));
		}

		function j(i, e, O, L) {
			s[i] = {
				lbp: e,
				led: function (T, v, w) {
					var x = L ? this.lbp - 1 : this.lbp;
					return I.bind(null, w, v.expression(x), O, L);
				},
				nud: l
			};
			return s[i];
		}

		function k(e, i, v) {
			var w = new SyntaxError(e);
			w.at = v;
			w.text = i;
			if (v !== undefined) {
				e += " at position " + v;
			}
			q.sap.log.error(e, i, E);
			throw w;
		}

		function l(T) {
			k("Unexpected " + T.id, T.input, T.start + 1);
		}

		function m(R, v, S) {
			var w = [],
				x = [],
				t = [],
				T = q.sap._createJSTokenizer();

			function y(G, S, H) {
				var J = false,
					K, L, i;

				function N(G) {
					if (H) {
						if (G.parts) {
							G.parts.forEach(N);
						} else {
							G.targetType = G.targetType || "any";
						}
					}
				}
				for (K in G) {
					switch (typeof G[K]) {
						case "boolean":
						case "number":
						case "string":
						case "undefined":
							break;
						default:
							J = true;
					}
				}
				N(G);
				if (J) {
					L = q.sap.parseJS(v, S).result;
					N(L);
				} else {
					L = G;
				}
				for (i = 0; i < w.length; i += 1) {
					if (q.sap.equal(x[i], L)) {
						return i;
					}
				}
				x[i] = L;
				w[i] = G;
				return i;
			}

			function z() {
				var i, G, H, J, K;
				T.white();
				i = T.getCh();
				H = T.getIndex();
				if ((i === "$" || i === "%") && v[H + 1] === "{") {
					G = R(v, H + 1);
					K = {
						id: "BINDING",
						value: y(G.result, H + 1, i === "%")
					};
					T.setIndex(G.at);
				} else if (b.test(i)) {
					J = a.exec(v.slice(H));
					switch (J[0]) {
						case "false":
						case "null":
						case "true":
							K = {
								id: "CONSTANT",
								value: T.word()
							};
							break;
						case "in":
						case "typeof":
							K = {
								id: J[0]
							};
							T.setIndex(H + J[0].length);
							break;
						default:
							K = {
								id: "IDENTIFIER",
								value: J[0]
							};
							T.setIndex(H + J[0].length);
					}
				} else if (r.test(i) || i === "." && r.test(v[H + 1])) {
					K = {
						id: "CONSTANT",
						value: T.number()
					};
				} else if (i === "'" || i === '"') {
					K = {
						id: "CONSTANT",
						value: T.string()
					};
				} else {
					c.lastIndex = H;
					J = c.exec(v);
					if (!J || J.index !== H) {
						return false;
					}
					K = {
						id: J[0]
					};
					T.setIndex(H + J[0].length);
				}
				K.input = v;
				K.start = H;
				K.end = T.getIndex();
				t.push(K);
				return true;
			}
			T.init(v, S);
			try {
				while (z()) {}
			} catch (e) {
				if (e.name === "SyntaxError") {
					t.push({
						id: "ERROR",
						value: e
					});
				} else {
					throw e;
				}
			}
			return {
				at: T.getIndex(),
				parts: w,
				tokens: t
			};
		}

		function n(e, i) {
			return function () {
				try {
					return e.apply(this, arguments);
				} catch (v) {
					q.sap.log.warning(String(v), i, E);
				}
			};
		}

		function o(t, i, G) {
			var e, N = 0,
				v = {
					advance: w,
					current: x,
					expression: y,
					globals: G,
					input: i
				},
				T;

			function w(z) {
				var T = t[N];
				if (z) {
					if (!T) {
						k("Expected " + z + " but instead saw end of input", i);
					} else if (T.id !== z) {
						k("Expected " + z + " but instead saw " + i.slice(T.start, T.end), i, T.start + 1);
					}
				}
				N += 1;
				return T;
			}

			function x() {
				return t[N];
			}

			function y(z) {
				var L;
				T = w();
				if (!T) {
					k("Expected expression but instead saw end of input", i);
				}
				L = s[T.id].nud(T, v);
				while (N < t.length) {
					T = x();
					if (z >= (s[T.id].lbp || 0)) {
						break;
					}
					w();
					L = s[T.id].led(T, v, L);
				}
				return L;
			}
			e = y(0);
			return {
				at: x() && x().start,
				formatter: n(e, i)
			};
		}
		return {
			parse: function (R, i, S, G) {
				var e, T;
				q.sap.measure.average(P, "", p);
				T = m(R, i, S);
				e = o(T.tokens, i, G || d);
				q.sap.measure.end(P);
				if (!T.parts.length) {
					return {
						constant: e.formatter(),
						at: e.at || T.at
					};
				}

				function v() {
					return e.formatter(arguments);
				}
				v.textFragments = true;
				return {
					result: {
						formatter: v,
						parts: T.parts
					},
					at: e.at || T.at
				};
			}
		};
	}, true);
	jQuery.sap.registerPreloadedModules({
		"name": "sap-ui-core-preload",
		"version": "2.0",
		"modules": {
			"sap/ui/thirdparty/jquery-mobile-custom.js": function () {
				/*
				 * jQuery Mobile v1.3.1
				 * http://jquerymobile.com
				 *
				 * Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
				 * Released under the MIT license.
				 * http://jquery.org/license
				 *
				 */
				(function (r, d, f) {
					if (typeof define === "function" && define.amd) {
						define(["jquery"], function ($) {
							f($, r, d);
							return $.mobile;
						});
					} else {
						f(r.jQuery, r, d);
					}
				}(this, document, function (Q, d, f, u) {
					// About: License
					// Copyright (c) 2010 "Cowboy" Ben Alman,
					// Dual licensed under the MIT and GPL licenses.
					// http://benalman.com/about/license/
					(function ($, d, u) {
						var s = 'hashchange',
							a = f,
							b, c = $.event.special,
							g = a.documentMode,
							h = 'on' + s in d && (g === u || g > 7);

						function i(e) {
							e = e || location.href;
							return '#' + e.replace(/^[^#]*#?(.*)$/, '$1');
						};
						$.fn[s] = function (e) {
							return e ? this.bind(s, e) : this.trigger(s);
						};
						$.fn[s].delay = 50;
						c[s] = $.extend(c[s], {
							setup: function () {
								if (h) {
									return false;
								}
								$(b.start);
							},
							teardown: function () {
								if (h) {
									return false;
								}
								$(b.stop);
							}
						});
						b = (function () {
							var j = {},
								t, l = i(),
								k = function (v) {
									return v;
								},
								m = k,
								n = k;
							j.start = function () {
								t || p();
							};
							j.stop = function () {
								t && clearTimeout(t);
								t = u;
							};

							function p() {
								var e = i(),
									o = n(l);
								if (e !== l) {
									m(l = e, o);
									$(d).trigger(s);
								} else if (o !== l) {
									location.href = location.href.replace(/#.*/, '') + o;
								}
								t = setTimeout(p, $.fn[s].delay);
							};
							d.attachEvent && !d.addEventListener && !h && (function () {
								var o, q;
								j.start = function () {
									if (!o) {
										q = $.fn[s].src;
										q = q && q + i();
										o = $('<iframe tabindex="-1" title="empty"/>').hide().one('load', function () {
											q || m(i());
											p();
										}).attr('src', q || 'javascript:0').insertAfter('body')[0].contentWindow;
										a.onpropertychange = function () {
											try {
												if (event.propertyName === 'title') {
													o.document.title = a.title;
												}
											} catch (e) {}
										};
									}
								};
								j.stop = k;
								n = function () {
									return i(o.location.href);
								};
								m = function (e, r) {
									var v = o.document,
										w = $.fn[s].domain;
									if (e !== r) {
										v.title = a.title;
										v.open();
										w && v.write('<script>document.domain="' + w + '"</script>');
										v.close();
										o.location.hash = e;
									}
								};
							})();
							return j;
						})();
					})(Q, this);
					(function ($) {
						$.mobile = {};
						Q.mobile.orientationChangeEnabled = true;
					}(Q));
					(function ($, d, u) {
						var n = {};
						$.mobile = $.extend($.mobile, {
							version: "1.3.1",
							ns: "",
							subPageUrlKey: "ui-page",
							activePageClass: "ui-page-active",
							activeBtnClass: "ui-btn-active",
							focusClass: "ui-focus",
							ajaxEnabled: true,
							hashListeningEnabled: true,
							linkBindingEnabled: true,
							defaultPageTransition: "fade",
							maxTransitionWidth: false,
							minScrollBack: 250,
							touchOverflowEnabled: false,
							defaultDialogTransition: "pop",
							pageLoadErrorMessage: "Error Loading Page",
							pageLoadErrorMessageTheme: "e",
							phonegapNavigationEnabled: false,
							autoInitializePage: true,
							pushStateEnabled: true,
							ignoreContentEnabled: false,
							orientationChangeEnabled: true,
							buttonMarkup: {
								hoverDelay: 200
							},
							window: $(d),
							document: $(f),
							keyCode: {
								ALT: 18,
								BACKSPACE: 8,
								CAPS_LOCK: 20,
								COMMA: 188,
								COMMAND: 91,
								COMMAND_LEFT: 91,
								COMMAND_RIGHT: 93,
								CONTROL: 17,
								DELETE: 46,
								DOWN: 40,
								END: 35,
								ENTER: 13,
								ESCAPE: 27,
								HOME: 36,
								INSERT: 45,
								LEFT: 37,
								MENU: 93,
								NUMPAD_ADD: 107,
								NUMPAD_DECIMAL: 110,
								NUMPAD_DIVIDE: 111,
								NUMPAD_ENTER: 108,
								NUMPAD_MULTIPLY: 106,
								NUMPAD_SUBTRACT: 109,
								PAGE_DOWN: 34,
								PAGE_UP: 33,
								PERIOD: 190,
								RIGHT: 39,
								SHIFT: 16,
								SPACE: 32,
								TAB: 9,
								UP: 38,
								WINDOWS: 91
							},
							behaviors: {},
							silentScroll: function (y) {
								if ($.type(y) !== "number") {
									y = $.mobile.defaultHomeScroll;
								}
								$.event.special.scrollstart.enabled = false;
								setTimeout(function () {
									d.scrollTo(0, y);
									$.mobile.document.trigger("silentscroll", {
										x: 0,
										y: y
									});
								}, 20);
								setTimeout(function () {
									$.event.special.scrollstart.enabled = true;
								}, 150);
							},
							nsNormalizeDict: n,
							nsNormalize: function (p) {
								if (!p) {
									return;
								}
								return n[p] || (n[p] = $.camelCase($.mobile.ns + p));
							},
							getInheritedTheme: function (a, b) {
								var e = a[0],
									l = "",
									r = /ui-(bar|body|overlay)-([a-z])\b/,
									c, m;
								while (e) {
									c = e.className || "";
									if (c && (m = r.exec(c)) && (l = m[2])) {
										break;
									}
									e = e.parentNode;
								}
								return l || b || "a";
							},
							closestPageData: function (a) {
								return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page");
							},
							enhanceable: function (a) {
								return this.haveParents(a, "enhance");
							},
							hijackable: function (a) {
								return this.haveParents(a, "ajax");
							},
							haveParents: function (a, b) {
								if (!$.mobile.ignoreContentEnabled) {
									return a;
								}
								var g = a.length,
									h = $(),
									e, k, l;
								for (var i = 0; i < g; i++) {
									k = a.eq(i);
									l = false;
									e = a[i];
									while (e) {
										var c = e.getAttribute ? e.getAttribute("data-" + $.mobile.ns + b) : "";
										if (c === "false") {
											l = true;
											break;
										}
										e = e.parentNode;
									}
									if (!l) {
										h = h.add(k);
									}
								}
								return h;
							},
							getScreenHeight: function () {
								return d.innerHeight || $.mobile.window.height();
							}
						}, $.mobile);
						$.fn.jqmData = function (p, v) {
							var r;
							if (typeof p !== "undefined") {
								if (p) {
									p = $.mobile.nsNormalize(p);
								}
								if (arguments.length < 2 || v === u) {
									r = this.data(p);
								} else {
									r = this.data(p, v);
								}
							}
							return r;
						};
						$.jqmData = function (e, p, v) {
							var r;
							if (typeof p !== "undefined") {
								r = $.data(e, p ? $.mobile.nsNormalize(p) : p, v);
							}
							return r;
						};
						$.fn.jqmRemoveData = function (p) {
							return this.removeData($.mobile.nsNormalize(p));
						};
						$.jqmRemoveData = function (e, p) {
							return $.removeData(e, $.mobile.nsNormalize(p));
						};
						$.fn.removeWithDependents = function () {
							$.removeWithDependents(this);
						};
						$.removeWithDependents = function (e) {
							var a = $(e);
							(a.jqmData('dependents') || $()).remove();
							a.remove();
						};
						$.fn.addDependents = function (a) {
							$.addDependents($(this), a);
						};
						$.addDependents = function (e, a) {
							var b = $(e).jqmData('dependents') || $();
							$(e).jqmData('dependents', $.merge(b, a));
						};
						$.fn.getEncodedText = function () {
							return $("<div/>").text($(this).text()).html();
						};
						$.fn.jqmEnhanceable = function () {
							return $.mobile.enhanceable(this);
						};
						$.fn.jqmHijackable = function () {
							return $.mobile.hijackable(this);
						};
						var o = $.find,
							j = /:jqmData\(([^)]*)\)/g;
						$.find = function (s, c, r, e) {
							s = s.replace(j, "[data-" + ($.mobile.ns || "") + "$1]");
							return o.call(this, s, c, r, e);
						};
						$.extend($.find, o);
					})(Q, this);
					(function ($, u) {
						/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
						d.matchMedia = d.matchMedia || (function (a, u) {
							var b, c = a.documentElement,
								r = c.firstElementChild || c.firstChild,
								e = a.createElement("body"),
								g = a.createElement("div");
							g.id = "mq-test-1";
							g.style.cssText = "position:absolute;top:-100em";
							e.style.background = "none";
							e.appendChild(g);
							return function (q) {
								g.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
								c.insertBefore(e, r);
								b = g.offsetWidth === 42;
								c.removeChild(e);
								return {
									matches: b,
									media: q
								};
							};
						}(f));
						$.mobile.media = function (q) {
							return d.matchMedia(q).matches;
						};
					})(Q);
					(function ($, u) {
						var s = {
							touch: "ontouchend" in f
						};
						if (d.sap && sap.ui && sap.ui.Device && sap.ui.Device.support) {
							s.touch = sap.ui.Device.support.touch
						}
						$.mobile.support = $.mobile.support || {};
						$.extend($.support, s);
						$.extend($.mobile.support, s);
					}(Q));
					(function ($, u) {
						$.extend($.support, {
							orientation: "orientation" in d && "onorientationchange" in d
						});
					}(Q));
					(function ($, u) {
						function p(a) {
							var i = a.charAt(0).toUpperCase() + a.substr(1),
								t = (a + " " + e.join(i + " ") + i).split(" ");
							for (var v in t) {
								if (c[t[v]] !== u) {
									return true;
								}
							}
						}
						var b = $("<body>").prependTo("html"),
							c = b[0].style,
							e = ["Webkit", "Moz", "O"],
							g = "palmGetResource" in d,
							o = d.opera,
							h = d.operamini && ({}).toString.call(d.operamini) === "[object OperaMini]",
							j = d.blackberry && !p("-webkit-transform");

						function k(a, v, t) {
							var w = f.createElement('div'),
								x = function (C) {
									return C.charAt(0).toUpperCase() + C.substr(1);
								},
								y = function (C) {
									if (C === "") {
										return "";
									} else {
										return "-" + C.charAt(0).toLowerCase() + C.substr(1) + "-";
									}
								},
								z = function (C) {
									var D = y(C) + a + ": " + v + ";",
										E = x(C),
										F = E + (E === "" ? a : x(a));
									w.setAttribute("style", D);
									if (!!w.style[F]) {
										B = true;
									}
								},
								A = t ? t : e,
								B;
							for (var i = 0; i < A.length; i++) {
								z(A[i]);
							}
							return !!B;
						}

						function l() {
							var a = "transform-3d",
								i = $.mobile.media("(-" + e.join("-" + a + "),(-") + "-" + a + "),(" + a + ")");
							if (i) {
								return !!i;
							}
							var v = f.createElement("div"),
								w = {
									'MozTransform': '-moz-transform',
									'transform': 'transform'
								};
							b.append(v);
							for (var t in w) {
								if (v.style[t] !== u) {
									v.style[t] = 'translate3d( 100px, 1px, 1px )';
									i = d.getComputedStyle(v).getPropertyValue(w[t]);
								}
							}
							return (!!i && i !== "none");
						}

						function m() {
							var a = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
								i = $("head base"),
								t = null,
								v = "",
								w, x;
							if (!i.length) {
								i = t = $("<base>", {
									"href": a
								}).appendTo("head");
							} else {
								v = i.attr("href");
							}
							w = $("<a href='testurl' />").prependTo(b);
							x = w[0].href;
							i[0].href = v || location.pathname;
							if (t) {
								t.remove();
							}
							return x.indexOf(a) === 0;
						}

						function n() {
							var a = f.createElement('x'),
								i = f.documentElement,
								t = d.getComputedStyle,
								v = t && t(a, ''),
								w;
							if (!('pointerEvents' in a.style)) {
								return false;
							}
							a.style.pointerEvents = 'auto';
							a.style.pointerEvents = 'x';
							i.appendChild(a);
							w = v && v.pointerEvents === 'auto';
							i.removeChild(a);
							return !!w;
						}

						function q() {
							var a = f.createElement("div");
							return typeof a.getBoundingClientRect !== "undefined";
						}
						$.extend($.mobile, {
							browser: {}
						});
						$.mobile.browser.oldIE = (function () {
							var v = 3,
								i = f.createElement("div"),
								a = i.all || [];
							do {
								i.innerHTML = "<!--[if gt IE " + (++v) + "]><br><![endif]-->";
							} while (a[0]);
							return v > 4 ? v : !v;
						})();

						function r() {
							var w = d,
								a = navigator.userAgent,
								i = navigator.platform,
								t = a.match(/AppleWebKit\/([0-9]+)/),
								v = !!t && t[1],
								x = a.match(/Fennec\/([0-9]+)/),
								y = !!x && x[1],
								z = a.match(/Opera Mobi\/([0-9]+)/),
								A = !!z && z[1];
							if (((i.indexOf("iPhone") > -1 || i.indexOf("iPad") > -1 || i.indexOf("iPod") > -1) && v && v < 534) || (w.operamini && ({}).toString.call(w.operamini) === "[object OperaMini]") || (z && A < 7458) || (a.indexOf("Android") > -1 && v && v < 533) || (y && y < 6) || ("palmGetResource" in d && v && v < 534) || (a.indexOf("MeeGo") > -1 && a.indexOf("NokiaBrowser/8.5.0") > -1)) {
								return false;
							}
							return true;
						}
						$.extend($.support, {
							cssTransitions: "WebKitTransitionEvent" in d || k('transition', 'height 100ms linear', ["Webkit", "Moz", ""]) && !$.mobile.browser.oldIE && !o,
							pushState: "pushState" in history && "replaceState" in history && !(d.navigator.userAgent.indexOf("Firefox") >= 0 && d.top !== d) && (d.navigator.userAgent.search(/CriOS/) === -1),
							mediaquery: $.mobile.media("only all"),
							cssPseudoElement: !!p("content"),
							touchOverflow: !!p("overflowScrolling"),
							cssTransform3d: l(),
							boxShadow: !!p("boxShadow") && !j,
							fixedPosition: r(),
							scrollTop: ("pageXOffset" in d || "scrollTop" in f.documentElement || "scrollTop" in b[0]) && !g && !h,
							dynamicBaseTag: m(),
							cssPointerEvents: n(),
							boundingRect: q()
						});
						b.remove();
						var s = (function () {
							var a = d.navigator.userAgent;
							return a.indexOf("Nokia") > -1 && (a.indexOf("Symbian/3") > -1 || a.indexOf("Series60/5") > -1) && a.indexOf("AppleWebKit") > -1 && a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/);
						})();
						$.mobile.gradeA = function () {
							return ($.support.mediaquery || $.mobile.browser.oldIE && $.mobile.browser.oldIE >= 7) && ($.support.boundingRect || $.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null);
						};
						$.mobile.ajaxBlacklist = d.blackberry && !d.WebKitPoint || h || s;
						if (s) {
							$(function () {
								$("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet");
							});
						}
						if (!$.support.boxShadow) {
							$("html").addClass("ui-mobile-nosupport-boxshadow");
						}
					})(Q);
					(function ($, u) {
						var a = $.mobile.window,
							s, h;
						$.event.special.navigate = s = {
							bound: false,
							pushStateEnabled: true,
							originalEventName: u,
							isPushStateEnabled: function () {
								return $.support.pushState && $.mobile.pushStateEnabled === true && this.isHashChangeEnabled();
							},
							isHashChangeEnabled: function () {
								return $.mobile.hashListeningEnabled === true;
							},
							popstate: function (e) {
								var n = new $.Event("navigate"),
									b = new $.Event("beforenavigate"),
									c = e.originalEvent.state || {},
									g = location.href;
								a.trigger(b);
								if (b.isDefaultPrevented()) {
									return;
								}
								if (e.historyState) {
									$.extend(c, e.historyState);
								}
								n.originalEvent = e;
								setTimeout(function () {
									a.trigger(n, {
										state: c
									});
								}, 0);
							},
							hashchange: function (e, b) {
								var n = new $.Event("navigate"),
									c = new $.Event("beforenavigate");
								a.trigger(c);
								if (c.isDefaultPrevented()) {
									return;
								}
								n.originalEvent = e;
								a.trigger(n, {
									state: e.hashchangeState || {}
								});
							},
							setup: function (b, n) {
								if (s.bound) {
									return;
								}
								s.bound = true;
								if (s.isPushStateEnabled()) {
									s.originalEventName = "popstate";
									a.bind("popstate.navigate", s.popstate);
								} else if (s.isHashChangeEnabled()) {
									s.originalEventName = "hashchange";
									a.bind("hashchange.navigate", s.hashchange);
								}
							}
						};
					})(Q);
					(function ($) {
						$.event.special.throttledresize = {
							setup: function () {
								$(this).bind("resize", h);
							},
							teardown: function () {
								$(this).unbind("resize", h);
							}
						};
						var t = 250,
							h = function () {
								c = (new Date()).getTime();
								b = c - l;
								if (b >= t) {
									l = c;
									$(this).trigger("throttledresize");
								} else {
									if (a) {
										clearTimeout(a);
									}
									a = setTimeout(h, t - b);
								}
							},
							l = 0,
							a, c, b;
					})(Q);
					(function ($, d) {
						var w = $(d),
							e = "orientationchange",
							s, g, l, i, a, p = {
								"0": true,
								"180": true
							};
						if ($.support.orientation) {
							var b = d.innerWidth || w.width(),
								c = d.innerHeight || w.height(),
								h = 50;
							i = b > c && (b - c) > h;
							a = p[d.orientation];
							if ((i && a) || (!i && !a)) {
								p = {
									"-90": true,
									"90": true
								};
							}
						}
						$.event.special.orientationchange = $.extend({}, $.event.special.orientationchange, {
							setup: function () {
								if ($.support.orientation && !$.event.special.orientationchange.disabled) {
									return false;
								}
								l = g();
								w.bind("throttledresize", j);
							},
							teardown: function () {
								if ($.support.orientation && !$.event.special.orientationchange.disabled) {
									return false;
								}
								w.unbind("throttledresize", j);
							},
							add: function (k) {
								var o = k.handler;
								k.handler = function (m) {
									m.orientation = g();
									return o.apply(this, arguments);
								};
							}
						});

						function j() {
							var o = g();
							if (o !== l) {
								l = o;
								w.trigger(e);
							}
						}
						$.event.special.orientationchange.orientation = g = function () {
							var k = true,
								m = f.documentElement;
							if ($.support.orientation) {
								k = p[d.orientation];
							} else {
								k = m && m.clientWidth / m.clientHeight < 1.1;
							}
							return k ? "portrait" : "landscape";
						};
						$.fn[e] = function (k) {
							return k ? this.bind(e, k) : this.trigger(e);
						};
						if ($.attrFn) {
							$.attrFn[e] = true;
						}
					}(Q, this));
					(function ($, d, f, u) {
						var a = "virtualMouseBindings",
							c = "virtualTouchID",
							v = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
							g = "clientX clientY pageX pageY screenX screenY".split(" "),
							m = $.event.mouseHooks ? $.event.mouseHooks.props : [],
							h = $.event.props.concat(m),
							l = {},
							r = 0,
							s = 0,
							n = 0,
							p = false,
							q = [],
							w = false,
							z = false,
							A = "addEventListener" in f,
							B = $(f),
							C = 1,
							D = 0,
							E;
						$.vmouse = {
							moveDistanceThreshold: 10,
							clickDistanceThreshold: 10,
							resetTimerDuration: 1500
						};

						function F(e) {
							while (e && typeof e.originalEvent !== "undefined") {
								e = e.originalEvent;
							}
							return e;
						}

						function G(e, b) {
							var t = e.type,
								o, k, x, y, _, a1, i, j, b1;
							e = $.Event(e);
							e.type = b;
							o = e.originalEvent;
							k = $.event.props;
							if (t.search(/^(mouse|click)/) > -1) {
								k = h;
							}
							if (o) {
								for (i = k.length, y; i;) {
									y = k[--i];
									e[y] = o[y];
								}
							}
							if (t.search(/mouse(down|up)|click/) > -1 && !e.which) {
								e.which = 1;
							}
							if (t.search(/^touch/) !== -1) {
								x = F(o);
								t = x.touches;
								_ = x.changedTouches;
								a1 = (t && t.length) ? t[0] : ((_ && _.length) ? _[0] : u);
								if (a1) {
									for (j = 0, b1 = g.length; j < b1; j++) {
										y = g[j];
										e[y] = a1[y];
									}
								}
							}
							return e;
						}

						function H(e) {
							var j = {},
								b, k;
							while (e) {
								b = $.data(e, a);
								for (k in b) {
									if (b[k]) {
										j[k] = j.hasVirtualBinding = true;
									}
								}
								e = e.parentNode;
							}
							return j;
						}

						function I(e, j) {
							var b;
							while (e) {
								b = $.data(e, a);
								if (b && (!j || b[j])) {
									return e;
								}
								e = e.parentNode;
							}
							return null;
						}

						function J() {
							z = false;
						}

						function K() {
							z = true;
						}

						function L() {
							D = 0;
							q.length = 0;
							w = false;
							K();
						}

						function M() {
							J();
						}

						function N() {
							O();
							r = setTimeout(function () {
								r = 0;
								L();
							}, $.vmouse.resetTimerDuration);
						}

						function O() {
							if (r) {
								clearTimeout(r);
								r = 0;
							}
						}

						function P(e, b, j) {
							var k;
							if ((j && j[e]) || (!j && I(b.target, e))) {
								k = G(b, e);
								$(b.target).trigger(k);
							}
							return k;
						}

						function R(e) {
							var t = $.data(e.target, c);
							if (!w && (!D || D !== t)) {
								var b = P("v" + e.type, e);
								if (b) {
									if (b.isDefaultPrevented()) {
										e.preventDefault();
									}
									if (b.isPropagationStopped()) {
										e.stopPropagation();
									}
									if (b.isImmediatePropagationStopped()) {
										e.stopImmediatePropagation();
									}
								}
							}
						}

						function S(e) {
							var b = F(e).touches,
								j, k;
							if (b && b.length === 1) {
								j = e.target;
								k = H(j);
								if (k.hasVirtualBinding) {
									D = C++;
									$.data(j, c, D);
									O();
									M();
									p = false;
									var t = F(e).touches[0];
									s = t.pageX;
									n = t.pageY;
									P("vmouseover", e, k);
									P("vmousedown", e, k);
								}
							}
						}

						function T(e) {
							if (z) {
								return;
							}
							if (!p) {
								P("vmousecancel", e, H(e.target));
							}
							p = true;
							N();
						}

						function U(e) {
							if (z) {
								return;
							}
							var t = F(e).touches[0],
								b = p,
								j = $.vmouse.moveDistanceThreshold,
								k = H(e.target);
							p = p || (Math.abs(t.pageX - s) > j || Math.abs(t.pageY - n) > j);
							if (p && !b) {
								P("vmousecancel", e, k);
							}
							P("vmousemove", e, k);
							N();
						}

						function V(e) {
							if (z) {
								return;
							}
							K();
							var b = H(e.target),
								t;
							P("vmouseup", e, b);
							if (!p) {
								P("vclick", e, b);
								if ($.support.touch) {
									t = F(e).changedTouches[0];
									q.push({
										touchID: D,
										x: t.clientX,
										y: t.clientY + d.scrollY,
										target: e.target
									});
									w = true;
								}
							}
							P("vmouseout", e, b);
							p = false;
							N();
						}

						function W(e) {
							var b = $.data(e, a),
								k;
							if (b) {
								for (k in b) {
									if (b[k]) {
										return true;
									}
								}
							}
							return false;
						}

						function X() {}

						function Y(e) {
							var b = e.substr(1);
							return {
								setup: function (j, k) {
									if (!W(this)) {
										$.data(this, a, {});
									}
									var o = $.data(this, a);
									o[e] = true;
									l[e] = (l[e] || 0) + 1;
									if (l[e] === 1) {
										B.bind(b, R);
									}
									$(this).bind(b, X);
									if (A) {
										l["touchstart"] = (l["touchstart"] || 0) + 1;
										if (l["touchstart"] === 1) {
											B.bind("touchstart", S).bind("touchend", V).bind("touchmove", U);
										}
									}
								},
								teardown: function (j, k) {
									--l[e];
									if (!l[e]) {
										B.unbind(b, R);
									}
									if (A) {
										--l["touchstart"];
										if (!l["touchstart"]) {
											B.unbind("touchstart", S).unbind("touchmove", U).unbind("touchend", V).unbind("scroll", T);
										}
									}
									var o = $(this),
										t = $.data(this, a);
									if (t) {
										t[e] = false;
									}
									o.unbind(b, X);
									if (!W(this)) {
										o.removeData(a);
									}
								}
							};
						}
						for (var i = 0; i < v.length; i++) {
							$.event.special[v[i]] = Y(v[i]);
						}
						if (A) {
							function Z(e) {
								var b = q.length,
									t = e.target,
									x, y, j, i, o, k;
								if (b) {
									x = e.clientX;
									y = e.clientY + d.scrollY;
									E = $.vmouse.clickDistanceThreshold;
									j = t;
									while (j) {
										for (i = 0; i < b; i++) {
											o = q[i];
											k = 0;
											if ((j === t && Math.abs(o.x - x) < E && Math.abs(o.y - y) < E) || $.data(j, c) === o.touchID) {
												if (!e.isSynthetic) {
													e._sapui_delayedMouseEvent = true;
												}
												if (t === o.target) {
													return;
												}
												e.preventDefault();
												e.stopPropagation();
												return;
											}
										}
										j = j.parentNode;
									}
								}
							};
							if (!(sap.ui.Device.os.windows_phone && sap.ui.Device.os.version < 10)) {
								f.addEventListener("mousedown", Z, true);
								f.addEventListener("mouseup", Z, true);
								f.addEventListener("click", Z, true);
							}
						}
					})(Q, d, f);
					(function ($, d, u) {
						var a = $(f);
						$.each(("touchstart touchmove touchend " + "tap taphold " + "swipe swipeleft swiperight " + "scrollstart scrollstop").split(" "), function (i, n) {
							$.fn[n] = function (h) {
								return h ? this.bind(n, h) : this.trigger(n);
							};
							if ($.attrFn) {
								$.attrFn[n] = true;
							}
						});
						var s = $.mobile.support.touch,
							b = "touchmove scroll",
							t = s ? "touchstart" : "mousedown",
							c = s ? "touchend touchcancel" : "mouseup",
							e = s ? "touchmove" : "mousemove";

						function g(o, h, i) {
							var j = i.type;
							i.type = h;
							$.event.dispatch.call(o, i);
							i.type = j;
						}
						$.event.special.scrollstart = {
							enabled: true,
							setup: function () {
								var h = this,
									i = $(h),
									j, k;

								function l(m, n) {
									j = n;
									g(h, j ? "scrollstart" : "scrollstop", m);
								}
								i.bind(b, function (m) {
									if (!$.event.special.scrollstart.enabled) {
										return;
									}
									if (!j) {
										l(m, true);
									}
									clearTimeout(k);
									k = setTimeout(function () {
										l(m, false);
									}, 50);
								});
							}
						};
						$.event.special.tap = {
							tapholdThreshold: 750,
							setup: function () {
								var h = this,
									i = $(h);
								i.bind("vmousedown", function (j) {
									if (j.which && j.which !== 1) {
										return;
									}
									var o = j.target,
										k = j.originalEvent,
										l;

									function m() {
										clearTimeout(l);
									}

									function n() {
										m();
										i.unbind("vclick", q).unbind("vmouseup", m);
										a.unbind("vmousecancel", n).unbind("vmouseup", p);
									}

									function p(j) {
										if (j.target !== o && !$.contains(o, j.target)) {
											n();
										}
									}

									function q(j) {
										n();
										if (o === j.target) {
											g(h, "tap", j);
										}
									}
									i.bind("vmouseup", m).bind("vclick", q);
									a.bind("vmousecancel", n).bind("vmouseup", p);
									l = setTimeout(function () {
										var T = $.event.fix(k);
										T.type = "taphold";
										g(h, "taphold", T);
									}, $.event.special.tap.tapholdThreshold);
								});
							}
						};
						$.event.special.swipe = {
							scrollSupressionThreshold: 30,
							durationThreshold: 1000,
							horizontalDistanceThreshold: 30,
							verticalDistanceThreshold: 75,
							start: function (h) {
								var i = h.originalEvent && h.originalEvent.touches ? h.originalEvent.touches[0] : h;
								return {
									time: (new Date()).getTime(),
									coords: [i.pageX, i.pageY],
									origin: $(h.target)
								};
							},
							stop: function (h) {
								var i = h.originalEvent && h.originalEvent.touches ? h.originalEvent.touches[0] : h;
								return {
									time: (new Date()).getTime(),
									coords: [i.pageX, i.pageY]
								};
							},
							handleSwipe: function (h, i) {
								if (i.time - h.time < $.event.special.swipe.durationThreshold && Math.abs(h.coords[0] - i.coords[0]) > $.event.special.swipe.horizontalDistanceThreshold && Math.abs(h.coords[1] - i.coords[1]) < $.event.special.swipe.verticalDistanceThreshold) {
									h.origin.trigger("swipe").trigger(h.coords[0] > i.coords[0] ? "swipeleft" : "swiperight");
								}
							},
							setup: function () {
								var h = this,
									i = $(h);
								i.bind(t, function (j) {
									if (j.isMarked("swipestartHandled")) {
										return;
									}
									j.setMarked("swipestartHandled");
									var k = $.event.special.swipe.start(j),
										l;

									function m(j) {
										if (!k) {
											return;
										}
										l = $.event.special.swipe.stop(j);
										if (!sap.ui.Device.system.desktop || sap.ui.Device.browser.name !== "cr") {
											if (!sap.ui.Device.os.blackberry && Math.abs(k.coords[0] - l.coords[0]) > $.event.special.swipe.scrollSupressionThreshold) {
												j.preventDefault();
											}
										}
									}

									function n(j) {
										i.unbind(e, m).unbind(c, n);
										if (k && l) {
											$.event.special.swipe.handleSwipe(k, l);
										}
										k = l = u;
									}
									i.bind(e, m).bind(c, n);
								});
							}
						};
						$.each({
							scrollstop: "scrollstart",
							taphold: "tap",
							swipeleft: "swipe",
							swiperight: "swipe"
						}, function (h, i) {
							$.event.special[h] = {
								setup: function () {
									$(this).bind(i, $.noop);
								}
							};
						});
					})(Q, this);
				}));
			}
		}
	});
	sap.ui.requireSync("sap/ui/core/Core");
	// as this module contains the Core, we ensure that the Core has been booted
	sap.ui.getCore().boot && sap.ui.getCore().boot();
} catch (oError) {
	if (oError.name != "Restart") {
		throw oError;
	}
}
//# sourceMappingURL=sap-ui-core.js.map