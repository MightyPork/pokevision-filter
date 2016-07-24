/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function (t, n) {
	var L, Ae, l = typeof n,
		i = t.document,
		Wt = t.location,
		It = t.jQuery,
		zt = t.$,
		H = {},
		T = [],
		Q = "1.9.1",
		je = T.concat,
		K = T.push,
		y = T.slice,
		De = T.indexOf,
		Xt = H.toString,
		E = H.hasOwnProperty,
		Z = Q.trim,
		e = function (t, n) {
			return new e.fn.init(t, n, Ae)
		},
		M = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		u = /\S+/g,
		Ut = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		Vt = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		Le = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		Yt = /^[\],:{}\s]*$/,
		Jt = /(?:^|:|,)(?:\s*\[)+/g,
		Gt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		Qt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		Kt = /^-ms-/,
		Zt = /-([\da-z])/gi,
		en = function (e, t) {
			return t.toUpperCase()
		},
		c = function (t) {
			if (i.addEventListener || t.type === "load" || i.readyState === "complete") {
				He();
				e.ready()
			}
		},
		He = function () {
			if (i.addEventListener) {
				i.removeEventListener("DOMContentLoaded", c, !1);
				t.removeEventListener("load", c, !1)
			} else {
				i.detachEvent("onreadystatechange", c);
				t.detachEvent("onload", c)
			}
		};
	e.fn = e.prototype = {
		jquery: Q,
		constructor: e,
		init: function (t, r, o) {
			var s, a;
			if (!t) {
				return this
			}
			;
			if (typeof t === "string") {
				if (t.charAt(0) === "<" && t.charAt(t.length - 1) === ">" && t.length >= 3) {
					s = [null, t, null]
				} else {
					s = Vt.exec(t)
				}
				;
				if (s && (s[1] || !r)) {
					if (s[1]) {
						r = r instanceof e ? r[0] : r;
						e.merge(this, e.parseHTML(s[1], r && r.nodeType ? r.ownerDocument || r : i, !0));
						if (Le.test(s[1]) && e.isPlainObject(r)) {
							for (s in r) {
								if (e.isFunction(this[s])) {
									this[s](r[s])
								} else {
									this.attr(s, r[s])
								}
							}
						}
						;
						return this
					} else {
						a = i.getElementById(s[2]);
						if (a && a.parentNode) {
							if (a.id !== s[2]) {
								return o.find(t)
							}
							;
							this.length = 1;
							this[0] = a
						}
						;
						this.context = i;
						this.selector = t;
						return this
					}
				} else if (!r || r.jquery) {
					return (r || o).find(t)
				} else {
					return this.constructor(r).find(t)
				}
			} else if (t.nodeType) {
				this.context = this[0] = t;
				this.length = 1;
				return this
			} else if (e.isFunction(t)) {
				return o.ready(t)
			}
			;
			if (t.selector !== n) {
				this.selector = t.selector;
				this.context = t.context
			}
			;
			return e.makeArray(t, this)
		},
		selector: "",
		length: 0,
		size: function () {
			return this.length
		},
		toArray: function () {
			return y.call(this)
		},
		get: function (e) {
			return e == null ? this.toArray() : (e < 0 ? this[this.length + e] : this[e])
		},
		pushStack: function (t) {
			var n = e.merge(this.constructor(), t);
			n.prevObject = this;
			n.context = this.context;
			return n
		},
		each: function (t, n) {
			return e.each(this, t, n)
		},
		ready: function (t) {
			e.ready.promise().done(t);
			return this
		},
		slice: function () {
			return this.pushStack(y.apply(this, arguments))
		},
		first: function () {
			return this.eq(0)
		},
		last: function () {
			return this.eq(-1)
		},
		eq: function (e) {
			var n = this.length,
				t = +e + (e < 0 ? n : 0);
			return this.pushStack(t >= 0 && t < n ? [this[t]] : [])
		},
		map: function (t) {
			return this.pushStack(e.map(this, function (e, n) {
				return t.call(e, n, e)
			}))
		},
		end: function () {
			return this.prevObject || this.constructor(null)
		},
		push: K,
		sort: [].sort,
		splice: [].splice
	};
	e.fn.init.prototype = e.fn;
	e.extend = e.fn.extend = function () {
		var r, a, i, s, l, u, t = arguments[0] || {},
			o = 1,
			c = arguments.length,
			f = !1;
		if (typeof t === "boolean") {
			f = t;
			t = arguments[1] || {};
			o = 2
		}
		;
		if (typeof t !== "object" && !e.isFunction(t)) {
			t = {}
		}
		;
		if (c === o) {
			t = this;
			--o
		}
		;
		for (; o < c; o++) {
			if ((l = arguments[o]) != null) {
				for (s in l) {
					r = t[s];
					i = l[s];
					if (t === i) {
						continue
					}
					;
					if (f && i && (e.isPlainObject(i) || (a = e.isArray(i)))) {
						if (a) {
							a = !1;
							u = r && e.isArray(r) ? r : []
						} else {
							u = r && e.isPlainObject(r) ? r : {}
						}
						;
						t[s] = e.extend(f, u, i)
					} else if (i !== n) {
						t[s] = i
					}
				}
			}
		}
		;
		return t
	};
	e.extend({
		noConflict: function (n) {
			if (t.$ === e) {
				t.$ = zt
			}
			;
			if (n && t.jQuery === e) {
				t.jQuery = It
			}
			;
			return e
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function (t) {
			if (t) {
				e.readyWait++
			} else {
				e.ready(!0)
			}
		},
		ready: function (t) {
			if (t === !0 ? --e.readyWait : e.isReady) {
				return
			}
			;
			if (!i.body) {
				return setTimeout(e.ready)
			}
			;
			e.isReady = !0;
			if (t !== !0 && --e.readyWait > 0) {
				return
			}
			;
			L.resolveWith(i, [e]);
			if (e.fn.trigger) {
				e(i).trigger("ready").off("ready")
			}
		},
		isFunction: function (t) {
			return e.type(t) === "function"
		},
		isArray: Array.isArray || function (t) {
			return e.type(t) === "array"
		},
		isWindow: function (e) {
			return e != null && e == e.window
		},
		isNumeric: function (e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function (e) {
			if (e == null) {
				return String(e)
			}
			;
			return typeof e === "object" || typeof e === "function" ? H[Xt.call(e)] || "object" : typeof e
		},
		isPlainObject: function (t) {
			if (!t || e.type(t) !== "object" || t.nodeType || e.isWindow(t)) {
				return !1
			}
			;
			try {
				if (t.constructor && !E.call(t, "constructor") && !E.call(t.constructor.prototype, "isPrototypeOf")) {
					return !1
				}
			} catch (i) {
				return !1
			}
			;
			var r;
			for (r in t) {
			}
			;
			return r === n || E.call(t, r)
		},
		isEmptyObject: function (e) {
			var t;
			for (t in e) {
				return !1
			}
			;
			return !0
		},
		error: function (e) {
			throw new Error(e)
		},
		parseHTML: function (t, n, r) {
			if (!t || typeof t !== "string") {
				return null
			}
			;
			if (typeof n === "boolean") {
				r = n;
				n = !1
			}
			;
			n = n || i;
			var o = Le.exec(t),
				s = !r && [];
			if (o) {
				return [n.createElement(o[1])]
			}
			;
			o = e.buildFragment([t], n, s);
			if (s) {
				e(s).remove()
			}
			;
			return e.merge([], o.childNodes)
		},
		parseJSON: function (n) {
			if (t.JSON && t.JSON.parse) {
				return t.JSON.parse(n)
			}
			;
			if (n === null) {
				return n
			}
			;
			if (typeof n === "string") {
				n = e.trim(n);
				if (n) {
					if (Yt.test(n.replace(Gt, "@").replace(Qt, "]").replace(Jt, ""))) {
						return (new Function("return " + n))()
					}
				}
			}
			;
			e.error("Invalid JSON: " + n)
		},
		parseXML: function (i) {
			var o, s;
			if (!i || typeof i !== "string") {
				return null
			}
			;
			try {
				if (t.DOMParser) {
					s = new DOMParser();
					o = s.parseFromString(i, "text/xml")
				} else {
					o = new ActiveXObject("Microsoft.XMLDOM");
					o.async = "false";
					o.loadXML(i)
				}
			} catch (r) {
				o = n
			}
			;
			if (!o || !o.documentElement || o.getElementsByTagName("parsererror").length) {
				e.error("Invalid XML: " + i)
			}
			;
			return o
		},
		noop: function () {
		},
		globalEval: function (n) {
			if (n && e.trim(n)) {
				(t.execScript || function (e) {
					t["eval"].call(t, e)
				})(n)
			}
		},
		camelCase: function (e) {
			return e.replace(Kt, "ms-").replace(Zt, en)
		},
		nodeName: function (e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function (e, t, n) {
			var r, i = 0,
				o = e.length,
				s = ee(e);
			if (n) {
				if (s) {
					for (; i < o; i++) {
						r = t.apply(e[i], n);
						if (r === !1) {
							break
						}
					}
				} else {
					for (i in e) {
						r = t.apply(e[i], n);
						if (r === !1) {
							break
						}
					}
				}
			} else {
				if (s) {
					for (; i < o; i++) {
						r = t.call(e[i], i, e[i]);
						if (r === !1) {
							break
						}
					}
				} else {
					for (i in e) {
						r = t.call(e[i], i, e[i]);
						if (r === !1) {
							break
						}
					}
				}
			}
			;
			return e
		},
		trim: Z && !Z.call("\uFEFF\xA0") ? function (e) {
			return e == null ? "" : Z.call(e)
		} : function (e) {
			return e == null ? "" : (e + "").replace(Ut, "")
		},
		makeArray: function (t, n) {
			var i = n || [];
			if (t != null) {
				if (ee(Object(t))) {
					e.merge(i, typeof t === "string" ? [t] : t)
				} else {
					K.call(i, t)
				}
			}
			;
			return i
		},
		inArray: function (e, t, n) {
			var i;
			if (t) {
				if (De) {
					return De.call(t, e, n)
				}
				;
				i = t.length;
				n = n ? n < 0 ? Math.max(0, i + n) : n : 0;
				for (; n < i; n++) {
					if (n in t && t[n] === e) {
						return n
					}
				}
			}
			;
			return -1
		},
		merge: function (e, t) {
			var o = t.length,
				r = e.length,
				i = 0;
			if (typeof o === "number") {
				for (; i < o; i++) {
					e[r++] = t[i]
				}
			} else {
				while (t[i] !== n) {
					e[r++] = t[i++]
				}
			}
			;
			e.length = r;
			return e
		},
		grep: function (e, t, n) {
			var r, o = [],
				i = 0,
				s = e.length;
			n = !!n;
			for (; i < s; i++) {
				r = !!t(e[i], i);
				if (n !== r) {
					o.push(e[i])
				}
			}
			;
			return o
		},
		map: function (e, t, n) {
			var r, i = 0,
				s = e.length,
				a = ee(e),
				o = [];
			if (a) {
				for (; i < s; i++) {
					r = t(e[i], i, n);
					if (r != null) {
						o[o.length] = r
					}
				}
			} else {
				for (i in e) {
					r = t(e[i], i, n);
					if (r != null) {
						o[o.length] = r
					}
				}
			}
			;
			return je.apply([], o)
		},
		guid: 1,
		proxy: function (t, i) {
			var o, r, s;
			if (typeof i === "string") {
				s = t[i];
				i = t;
				t = s
			}
			;
			if (!e.isFunction(t)) {
				return n
			}
			;
			o = y.call(arguments, 2);
			r = function () {
				return t.apply(i || this, o.concat(y.call(arguments)))
			};
			r.guid = t.guid = t.guid || e.guid++;
			return r
		},
		access: function (t, i, r, o, s, l, u) {
			var a = 0,
				c = t.length,
				f = r == null;
			if (e.type(r) === "object") {
				s = !0;
				for (a in r) {
					e.access(t, i, a, r[a], !0, l, u)
				}
			} else if (o !== n) {
				s = !0;
				if (!e.isFunction(o)) {
					u = !0
				}
				;
				if (f) {
					if (u) {
						i.call(t, o);
						i = null
					} else {
						f = i;
						i = function (t, n, i) {
							return f.call(e(t), i)
						}
					}
				}
				;
				if (i) {
					for (; a < c; a++) {
						i(t[a], r, u ? o : o.call(t[a], a, i(t[a], r)))
					}
				}
			}
			;
			return s ? t : f ? i.call(t) : c ? i(t[0], r) : l
		},
		now: function () {
			return (new Date()).getTime()
		}
	});
	e.ready.promise = function (n) {
		if (!L) {
			L = e.Deferred();
			if (i.readyState === "complete") {
				setTimeout(e.ready)
			} else if (i.addEventListener) {
				i.addEventListener("DOMContentLoaded", c, !1);
				t.addEventListener("load", c, !1)
			} else {
				i.attachEvent("onreadystatechange", c);
				t.attachEvent("onload", c);
				var o = !1;
				try {
					o = t.frameElement == null && i.documentElement
				} catch (r) {
				}
				;
				if (o && o.doScroll) {
					(function s() {
						if (!e.isReady) {
							try {
								o.doScroll("left")
							} catch (t) {
								return setTimeout(s, 50)
							}
							;
							He();
							e.ready()
						}
					})()
				}
			}
		}
		;
		return L.promise(n)
	};
	e.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
		H["[object " + t + "]"] = t.toLowerCase()
	});

	function ee(t) {
		var n = t.length,
			i = e.type(t);
		if (e.isWindow(t)) {
			return !1
		}
		;
		if (t.nodeType === 1 && n) {
			return !0
		}
		;
		return i === "array" || i !== "function" && (n === 0 || typeof n === "number" && n > 0 && (n - 1) in t)
	};
	Ae = e(i);
	var Se = {};

	function tn(t) {
		var n = Se[t] = {};
		e.each(t.match(u) || [], function (e, t) {
			n[t] = !0
		});
		return n
	};
	e.Callbacks = function (t) {
		t = typeof t === "string" ? (Se[t] || tn(t)) : e.extend({}, t);
		var a, o, f, l, s, c, i = [],
			r = !t.once && [],
			p = function (e) {
				o = t.memory && e;
				f = !0;
				s = c || 0;
				c = 0;
				l = i.length;
				a = !0;
				for (; i && s < l; s++) {
					if (i[s].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
						o = !1;
						break
					}
				}
				;
				a = !1;
				if (i) {
					if (r) {
						if (r.length) {
							p(r.shift())
						}
					} else if (o) {
						i = []
					} else {
						u.disable()
					}
				}
			},
			u = {
				add: function () {
					if (i) {
						var n = i.length;
						(function r(n) {
							e.each(n, function (n, o) {
								var s = e.type(o);
								if (s === "function") {
									if (!t.unique || !u.has(o)) {
										i.push(o)
									}
								} else if (o && o.length && s !== "string") {
									r(o)
								}
							})
						})(arguments);
						if (a) {
							l = i.length
						} else if (o) {
							c = n;
							p(o)
						}
					}
					;
					return this
				},
				remove: function () {
					if (i) {
						e.each(arguments, function (t, n) {
							var r;
							while ((r = e.inArray(n, i, r)) > -1) {
								i.splice(r, 1);
								if (a) {
									if (r <= l) {
										l--
									}
									;
									if (r <= s) {
										s--
									}
								}
							}
						})
					}
					;
					return this
				},
				has: function (t) {
					return t ? e.inArray(t, i) > -1 : !!(i && i.length)
				},
				empty: function () {
					i = [];
					return this
				},
				disable: function () {
					i = r = o = n;
					return this
				},
				disabled: function () {
					return !i
				},
				lock: function () {
					r = n;
					if (!o) {
						u.disable()
					}
					;
					return this
				},
				locked: function () {
					return !r
				},
				fireWith: function (e, t) {
					t = t || [];
					t = [e, t.slice ? t.slice() : t];
					if (i && (!f || r)) {
						if (a) {
							r.push(t)
						} else {
							p(t)
						}
					}
					;
					return this
				},
				fire: function () {
					u.fireWith(this, arguments);
					return this
				},
				fired: function () {
					return !!f
				}
			};
		return u
	};
	e.extend({
		Deferred: function (t) {
			var r = [
					["resolve", "done", e.Callbacks("once memory"), "resolved"],
					["reject", "fail", e.Callbacks("once memory"), "rejected"],
					["notify", "progress", e.Callbacks("memory")]
				],
				o = "pending",
				i = {
					state: function () {
						return o
					},
					always: function () {
						n.done(arguments).fail(arguments);
						return this
					},
					then: function () {
						var t = arguments;
						return e.Deferred(function (o) {
							e.each(r, function (r, s) {
								var l = s[0],
									a = e.isFunction(t[r]) && t[r];
								n[s[1]](function () {
									var t = a && a.apply(this, arguments);
									if (t && e.isFunction(t.promise)) {
										t.promise().done(o.resolve).fail(o.reject).progress(o.notify)
									} else {
										o[l + "With"](this === i ? o.promise() : this, a ? [t] : arguments)
									}
								})
							});
							t = null
						}).promise()
					},
					promise: function (t) {
						return t != null ? e.extend(t, i) : i
					}
				},
				n = {};
			i.pipe = i.then;
			e.each(r, function (e, t) {
				var s = t[2],
					a = t[3];
				i[t[1]] = s.add;
				if (a) {
					s.add(function () {
						o = a
					}, r[e ^ 1][2].disable, r[2][2].lock)
				}
				;
				n[t[0]] = function () {
					n[t[0] + "With"](this === n ? i : this, arguments);
					return this
				};
				n[t[0] + "With"] = s.fireWith
			});
			i.promise(n);
			if (t) {
				t.call(n, n)
			}
			;
			return n
		},
		when: function (t) {
			var n = 0,
				r = y.call(arguments),
				i = r.length,
				s = i !== 1 || (t && e.isFunction(t.promise)) ? i : 0,
				o = s === 1 ? t : e.Deferred(),
				u = function (e, t, n) {
					return function (i) {
						t[e] = this;
						n[e] = arguments.length > 1 ? y.call(arguments) : i;
						if (n === a) {
							o.notifyWith(t, n)
						} else if (!(--s)) {
							o.resolveWith(t, n)
						}
					}
				},
				a, f, l;
			if (i > 1) {
				a = new Array(i);
				f = new Array(i);
				l = new Array(i);
				for (; n < i; n++) {
					if (r[n] && e.isFunction(r[n].promise)) {
						r[n].promise().done(u(n, l, r)).fail(o.reject).progress(u(n, f, a))
					} else {
						--s
					}
				}
			}
			;
			if (!s) {
				o.resolveWith(l, r)
			}
			;
			return o.promise()
		}
	});
	e.support = (function () {
		var o, u, a, s, f, c, p, d, g, h, n = i.createElement("div");
		n.setAttribute("className", "t");
		n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		u = n.getElementsByTagName("*");
		a = n.getElementsByTagName("a")[0];
		if (!u || !a || !u.length) {
			return {}
		}
		;
		f = i.createElement("select");
		p = f.appendChild(i.createElement("option"));
		s = n.getElementsByTagName("input")[0];
		a.style.cssText = "top:1px;float:left;opacity:.5";
		o = {
			getSetAttribute: n.className !== "t",
			leadingWhitespace: n.firstChild.nodeType === 3,
			tbody: !n.getElementsByTagName("tbody").length,
			htmlSerialize: !!n.getElementsByTagName("link").length,
			style: /top/.test(a.getAttribute("style")),
			hrefNormalized: a.getAttribute("href") === "/a",
			opacity: /^0.5/.test(a.style.opacity),
			cssFloat: !!a.style.cssFloat,
			checkOn: !!s.value,
			optSelected: p.selected,
			enctype: !!i.createElement("form").enctype,
			html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			boxModel: i.compatMode === "CSS1Compat",
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		};
		s.checked = !0;
		o.noCloneChecked = s.cloneNode(!0).checked;
		f.disabled = !0;
		o.optDisabled = !p.disabled;
		try {
			delete n.test
		} catch (r) {
			o.deleteExpando = !1
		}
		;
		s = i.createElement("input");
		s.setAttribute("value", "");
		o.input = s.getAttribute("value") === "";
		s.value = "t";
		s.setAttribute("type", "radio");
		o.radioValue = s.value === "t";
		s.setAttribute("checked", "t");
		s.setAttribute("name", "t");
		c = i.createDocumentFragment();
		c.appendChild(s);
		o.appendChecked = s.checked;
		o.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
		if (n.attachEvent) {
			n.attachEvent("onclick", function () {
				o.noCloneEvent = !1
			});
			n.cloneNode(!0).click()
		}
		;
		for (h in {
			submit: !0,
			change: !0,
			focusin: !0
		}) {
			n.setAttribute(d = "on" + h, "t");
			o[h + "Bubbles"] = d in t || n.attributes[d].expando === !1
		}
		;
		n.style.backgroundClip = "content-box";
		n.cloneNode(!0).style.backgroundClip = "";
		o.clearCloneStyle = n.style.backgroundClip === "content-box";
		e(function () {
			var s, r, e, u = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				a = i.getElementsByTagName("body")[0];
			if (!a) {
				return
			}
			;
			s = i.createElement("div");
			s.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
			a.appendChild(s).appendChild(n);
			n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			e = n.getElementsByTagName("td");
			e[0].style.cssText = "padding:0;margin:0;border:0;display:none";
			g = (e[0].offsetHeight === 0);
			e[0].style.display = "";
			e[1].style.display = "none";
			o.reliableHiddenOffsets = g && (e[0].offsetHeight === 0);
			n.innerHTML = "";
			n.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
			o.boxSizing = (n.offsetWidth === 4);
			o.doesNotIncludeMarginInBodyOffset = (a.offsetTop !== 1);
			if (t.getComputedStyle) {
				o.pixelPosition = (t.getComputedStyle(n, null) || {}).top !== "1%";
				o.boxSizingReliable = (t.getComputedStyle(n, null) || {
						width: "4px"
					}).width === "4px";
				r = n.appendChild(i.createElement("div"));
				r.style.cssText = n.style.cssText = u;
				r.style.marginRight = r.style.width = "0";
				n.style.width = "1px";
				o.reliableMarginRight = !parseFloat((t.getComputedStyle(r, null) || {}).marginRight)
			}
			;
			if (typeof n.style.zoom !== l) {
				n.innerHTML = "";
				n.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1";
				o.inlineBlockNeedsLayout = (n.offsetWidth === 3);
				n.style.display = "block";
				n.innerHTML = "<div></div>";
				n.firstChild.style.width = "5px";
				o.shrinkWrapBlocks = (n.offsetWidth !== 3);
				if (o.inlineBlockNeedsLayout) {
					a.style.zoom = 1
				}
			}
			;
			a.removeChild(s);
			s = n = e = r = null
		});
		u = f = c = p = a = s = null;
		return o
	})();
	var Pt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		Rt = /([A-Z])/g;

	function Me(t, i, r, o) {
		if (!e.acceptData(t)) {
			return
		}
		;
		var l, u, f = e.expando,
			p = typeof i === "string",
			c = t.nodeType,
			a = c ? e.cache : t,
			s = c ? t[f] : t[f] && f;
		if ((!s || !a[s] || (!o && !a[s].data)) && p && r === n) {
			return
		}
		;
		if (!s) {
			if (c) {
				t[f] = s = T.pop() || e.guid++
			} else {
				s = f
			}
		}
		;
		if (!a[s]) {
			a[s] = {};
			if (!c) {
				a[s].toJSON = e.noop
			}
		}
		;
		if (typeof i === "object" || typeof i === "function") {
			if (o) {
				a[s] = e.extend(a[s], i)
			} else {
				a[s].data = e.extend(a[s].data, i)
			}
		}
		;
		l = a[s];
		if (!o) {
			if (!l.data) {
				l.data = {}
			}
			;
			l = l.data
		}
		;
		if (r !== n) {
			l[e.camelCase(i)] = r
		}
		;
		if (p) {
			u = l[i];
			if (u == null) {
				u = l[e.camelCase(i)]
			}
		} else {
			u = l
		}
		;
		return u
	};

	function qe(t, n, i) {
		if (!e.acceptData(t)) {
			return
		}
		;
		var a, u, s, l = t.nodeType,
			r = l ? e.cache : t,
			o = l ? t[e.expando] : e.expando;
		if (!r[o]) {
			return
		}
		;
		if (n) {
			s = i ? r[o] : r[o].data;
			if (s) {
				if (!e.isArray(n)) {
					if (n in s) {
						n = [n]
					} else {
						n = e.camelCase(n);
						if (n in s) {
							n = [n]
						} else {
							n = n.split(" ")
						}
					}
				} else {
					n = n.concat(e.map(n, e.camelCase))
				}
				;
				for (a = 0, u = n.length; a < u; a++) {
					delete s[n[a]]
				}
				;
				if (!(i ? te : e.isEmptyObject)(s)) {
					return
				}
			}
		}
		;
		if (!i) {
			delete r[o].data;
			if (!te(r[o])) {
				return
			}
		}
		;
		if (l) {
			e.cleanData([t], !0)
		} else if (e.support.deleteExpando || r != r.window) {
			delete r[o]
		} else {
			r[o] = null
		}
	};
	e.extend({
		cache: {},
		expando: "jQuery" + (Q + Math.random()).replace(/\D/g, ""),
		noData: {
			"embed": !0,
			"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			"applet": !0
		},
		hasData: function (t) {
			t = t.nodeType ? e.cache[t[e.expando]] : t[e.expando];
			return !!t && !te(t)
		},
		data: function (e, t, n) {
			return Me(e, t, n)
		},
		removeData: function (e, t) {
			return qe(e, t)
		},
		_data: function (e, t, n) {
			return Me(e, t, n, !0)
		},
		_removeData: function (e, t) {
			return qe(e, t, !0)
		},
		acceptData: function (t) {
			if (t.nodeType && t.nodeType !== 1 && t.nodeType !== 9) {
				return !1
			}
			;
			var n = t.nodeName && e.noData[t.nodeName.toLowerCase()];
			return !n || n !== !0 && t.getAttribute("classid") === n
		}
	});
	e.fn.extend({
		data: function (t, i) {
			var s, o, r = this[0],
				a = 0,
				l = null;
			if (t === n) {
				if (this.length) {
					l = e.data(r);
					if (r.nodeType === 1 && !e._data(r, "parsedAttrs")) {
						s = r.attributes;
						for (; a < s.length; a++) {
							o = s[a].name;
							if (!o.indexOf("data-")) {
								o = e.camelCase(o.slice(5));
								Fe(r, o, l[o])
							}
						}
						;
						e._data(r, "parsedAttrs", !0)
					}
				}
				;
				return l
			}
			;
			if (typeof t === "object") {
				return this.each(function () {
					e.data(this, t)
				})
			}
			;
			return e.access(this, function (i) {
				if (i === n) {
					return r ? Fe(r, t, e.data(r, t)) : null
				}
				;
				this.each(function () {
					e.data(this, t, i)
				})
			}, null, i, arguments.length > 1, null, !0)
		},
		removeData: function (t) {
			return this.each(function () {
				e.removeData(this, t)
			})
		}
	});

	function Fe(t, i, r) {
		if (r === n && t.nodeType === 1) {
			var s = "data-" + i.replace(Rt, "-$1").toLowerCase();
			r = t.getAttribute(s);
			if (typeof r === "string") {
				try {
					r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : Pt.test(r) ? e.parseJSON(r) : r
				} catch (o) {
				}
				;
				e.data(t, i, r)
			} else {
				r = n
			}
		}
		;
		return r
	};

	function te(t) {
		var n;
		for (n in t) {
			if (n === "data" && e.isEmptyObject(t[n])) {
				continue
			}
			;
			if (n !== "toJSON") {
				return !1
			}
		}
		;
		return !0
	};
	e.extend({
		queue: function (t, n, i) {
			var r;
			if (t) {
				n = (n || "fx") + "queue";
				r = e._data(t, n);
				if (i) {
					if (!r || e.isArray(i)) {
						r = e._data(t, n, e.makeArray(i))
					} else {
						r.push(i)
					}
				}
				;
				return r || []
			}
		},
		dequeue: function (t, n) {
			n = n || "fx";
			var o = e.queue(t, n),
				s = o.length,
				i = o.shift(),
				r = e._queueHooks(t, n),
				a = function () {
					e.dequeue(t, n)
				};
			if (i === "inprogress") {
				i = o.shift();
				s--
			}
			;
			r.cur = i;
			if (i) {
				if (n === "fx") {
					o.unshift("inprogress")
				}
				;
				delete r.stop;
				i.call(t, a, r)
			}
			;
			if (!s && r) {
				r.empty.fire()
			}
		},
		_queueHooks: function (t, n) {
			var i = n + "queueHooks";
			return e._data(t, i) || e._data(t, i, {
					empty: e.Callbacks("once memory").add(function () {
						e._removeData(t, n + "queue");
						e._removeData(t, i)
					})
				})
		}
	});
	e.fn.extend({
		queue: function (t, i) {
			var r = 2;
			if (typeof t !== "string") {
				i = t;
				t = "fx";
				r--
			}
			;
			if (arguments.length < r) {
				return e.queue(this[0], t)
			}
			;
			return i === n ? this : this.each(function () {
				var n = e.queue(this, t, i);
				e._queueHooks(this, t);
				if (t === "fx" && n[0] !== "inprogress") {
					e.dequeue(this, t)
				}
			})
		},
		dequeue: function (t) {
			return this.each(function () {
				e.dequeue(this, t)
			})
		},
		delay: function (t, n) {
			t = e.fx ? e.fx.speeds[t] || t : t;
			n = n || "fx";
			return this.queue(n, function (e, n) {
				var i = setTimeout(e, t);
				n.stop = function () {
					clearTimeout(i)
				}
			})
		},
		clearQueue: function (e) {
			return this.queue(e || "fx", [])
		},
		promise: function (t, i) {
			var r, s = 1,
				a = e.Deferred(),
				o = this,
				l = this.length,
				u = function () {
					if (!(--s)) {
						a.resolveWith(o, [o])
					}
				};
			if (typeof t !== "string") {
				i = t;
				t = n
			}
			;
			t = t || "fx";
			while (l--) {
				r = e._data(o[l], t + "queueHooks");
				if (r && r.empty) {
					s++;
					r.empty.add(u)
				}
			}
			;
			u();
			return a.promise(i)
		}
	});
	var w, ke, Y = /[\t\r\n]/g,
		Ft = /\r/g,
		Ot = /^(?:input|select|textarea|button|object)$/i,
		Bt = /^(?:a|area)$/i,
		Ee = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
		J = /^(?:checked|selected)$/i,
		m = e.support.getSetAttribute,
		G = e.support.input;
	e.fn.extend({
		attr: function (t, n) {
			return e.access(this, e.attr, t, n, arguments.length > 1)
		},
		removeAttr: function (t) {
			return this.each(function () {
				e.removeAttr(this, t)
			})
		},
		prop: function (t, n) {
			return e.access(this, e.prop, t, n, arguments.length > 1)
		},
		removeProp: function (t) {
			t = e.propFix[t] || t;
			return this.each(function () {
				try {
					this[t] = n;
					delete this[t]
				} catch (e) {
				}
			})
		},
		addClass: function (t) {
			var s, n, i, r, a, o = 0,
				l = this.length,
				f = typeof t === "string" && t;
			if (e.isFunction(t)) {
				return this.each(function (n) {
					e(this).addClass(t.call(this, n, this.className))
				})
			}
			;
			if (f) {
				s = (t || "").match(u) || [];
				for (; o < l; o++) {
					n = this[o];
					i = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(Y, " ") : " ");
					if (i) {
						a = 0;
						while ((r = s[a++])) {
							if (i.indexOf(" " + r + " ") < 0) {
								i += r + " "
							}
						}
						;
						n.className = e.trim(i)
					}
				}
			}
			;
			return this
		},
		removeClass: function (t) {
			var s, i, n, r, a, o = 0,
				l = this.length,
				f = arguments.length === 0 || typeof t === "string" && t;
			if (e.isFunction(t)) {
				return this.each(function (n) {
					e(this).removeClass(t.call(this, n, this.className))
				})
			}
			;
			if (f) {
				s = (t || "").match(u) || [];
				for (; o < l; o++) {
					i = this[o];
					n = i.nodeType === 1 && (i.className ? (" " + i.className + " ").replace(Y, " ") : "");
					if (n) {
						a = 0;
						while ((r = s[a++])) {
							while (n.indexOf(" " + r + " ") >= 0) {
								n = n.replace(" " + r + " ", " ")
							}
						}
						;
						i.className = t ? e.trim(n) : ""
					}
				}
			}
			;
			return this
		},
		toggleClass: function (t, n) {
			var i = typeof t,
				r = typeof n === "boolean";
			if (e.isFunction(t)) {
				return this.each(function (i) {
					e(this).toggleClass(t.call(this, i, this.className, n), n)
				})
			}
			;
			return this.each(function () {
				if (i === "string") {
					var o, f = 0,
						a = e(this),
						s = n,
						c = t.match(u) || [];
					while ((o = c[f++])) {
						s = r ? s : !a.hasClass(o);
						a[s ? "addClass" : "removeClass"](o)
					}
				} else if (i === l || i === "boolean") {
					if (this.className) {
						e._data(this, "__className__", this.className)
					}
					;
					this.className = this.className || t === !1 ? "" : e._data(this, "__className__") || ""
				}
			})
		},
		hasClass: function (e) {
			var n = " " + e + " ",
				t = 0,
				i = this.length;
			for (; t < i; t++) {
				if (this[t].nodeType === 1 && (" " + this[t].className + " ").replace(Y, " ").indexOf(n) >= 0) {
					return !0
				}
			}
			;
			return !1
		},
		val: function (t) {
			var r, i, s, o = this[0];
			if (!arguments.length) {
				if (o) {
					i = e.valHooks[o.type] || e.valHooks[o.nodeName.toLowerCase()];
					if (i && "get" in i && (r = i.get(o, "value")) !== n) {
						return r
					}
					;
					r = o.value;
					return typeof r === "string" ? r.replace(Ft, "") : r == null ? "" : r
				}
				;
				return
			}
			;
			s = e.isFunction(t);
			return this.each(function (r) {
				var o, a = e(this);
				if (this.nodeType !== 1) {
					return
				}
				;
				if (s) {
					o = t.call(this, r, a.val())
				} else {
					o = t
				}
				;
				if (o == null) {
					o = ""
				} else if (typeof o === "number") {
					o += ""
				} else if (e.isArray(o)) {
					o = e.map(o, function (e) {
						return e == null ? "" : e + ""
					})
				}
				;
				i = e.valHooks[this.type] || e.valHooks[this.nodeName.toLowerCase()];
				if (!i || !("set" in i) || i.set(this, o, "value") === n) {
					this.value = o
				}
			})
		}
	});
	e.extend({
		valHooks: {
			option: {
				get: function (e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function (t) {
					var s, n, a = t.options,
						i = t.selectedIndex,
						r = t.type === "select-one" || i < 0,
						l = r ? null : [],
						u = r ? i + 1 : a.length,
						o = i < 0 ? u : r ? i : 0;
					for (; o < u; o++) {
						n = a[o];
						if ((n.selected || o === i) && (e.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !e.nodeName(n.parentNode, "optgroup"))) {
							s = e(n).val();
							if (r) {
								return s
							}
							;
							l.push(s)
						}
					}
					;
					return l
				},
				set: function (t, n) {
					var i = e.makeArray(n);
					e(t).find("option").each(function () {
						this.selected = e.inArray(e(this).val(), i) >= 0
					});
					if (!i.length) {
						t.selectedIndex = -1
					}
					;
					return i
				}
			}
		},
		attr: function (t, i, r) {
			var o, a, s, u = t.nodeType;
			if (!t || u === 3 || u === 8 || u === 2) {
				return
			}
			;
			if (typeof t.getAttribute === l) {
				return e.prop(t, i, r)
			}
			;
			a = u !== 1 || !e.isXMLDoc(t);
			if (a) {
				i = i.toLowerCase();
				o = e.attrHooks[i] || (Ee.test(i) ? ke : w)
			}
			;
			if (r !== n) {
				if (r === null) {
					e.removeAttr(t, i)
				} else if (o && a && "set" in o && (s = o.set(t, r, i)) !== n) {
					return s
				} else {
					t.setAttribute(i, r + "");
					return r
				}
			} else if (o && a && "get" in o && (s = o.get(t, i)) !== null) {
				return s
			} else {
				if (typeof t.getAttribute !== l) {
					s = t.getAttribute(i)
				}
				;
				return s == null ? n : s
			}
		},
		removeAttr: function (t, n) {
			var i, r, s = 0,
				o = n && n.match(u);
			if (o && t.nodeType === 1) {
				while ((i = o[s++])) {
					r = e.propFix[i] || i;
					if (Ee.test(i)) {
						if (!m && J.test(i)) {
							t[e.camelCase("default-" + i)] = t[r] = !1
						} else {
							t[r] = !1
						}
					} else {
						e.attr(t, i, "")
					}
					;
					t.removeAttribute(m ? i : r)
				}
			}
		},
		attrHooks: {
			type: {
				set: function (t, n) {
					if (!e.support.radioValue && n === "radio" && e.nodeName(t, "input")) {
						var i = t.value;
						t.setAttribute("type", n);
						if (i) {
							t.value = i
						}
						;
						return n
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function (t, i, r) {
			var s, o, l, a = t.nodeType;
			if (!t || a === 3 || a === 8 || a === 2) {
				return
			}
			;
			l = a !== 1 || !e.isXMLDoc(t);
			if (l) {
				i = e.propFix[i] || i;
				o = e.propHooks[i]
			}
			;
			if (r !== n) {
				if (o && "set" in o && (s = o.set(t, r, i)) !== n) {
					return s
				} else {
					return (t[i] = r)
				}
			} else {
				if (o && "get" in o && (s = o.get(t, i)) !== null) {
					return s
				} else {
					return t[i]
				}
			}
		},
		propHooks: {
			tabIndex: {
				get: function (e) {
					var t = e.getAttributeNode("tabindex");
					return t && t.specified ? parseInt(t.value, 10) : Ot.test(e.nodeName) || Bt.test(e.nodeName) && e.href ? 0 : n
				}
			}
		}
	});
	ke = {
		get: function (t, i) {
			var r = e.prop(t, i),
				o = typeof r === "boolean" && t.getAttribute(i),
				s = typeof r === "boolean" ? G && m ? o != null : J.test(i) ? t[e.camelCase("default-" + i)] : !!o : t.getAttributeNode(i);
			return s && s.value !== !1 ? i.toLowerCase() : n
		},
		set: function (t, n, i) {
			if (n === !1) {
				e.removeAttr(t, i)
			} else if (G && m || !J.test(i)) {
				t.setAttribute(!m && e.propFix[i] || i, i)
			} else {
				t[e.camelCase("default-" + i)] = t[i] = !0
			}
			;
			return i
		}
	};
	if (!G || !m) {
		e.attrHooks.value = {
			get: function (t, i) {
				var r = t.getAttributeNode(i);
				return e.nodeName(t, "input") ? t.defaultValue : r && r.specified ? r.value : n
			},
			set: function (t, n, i) {
				if (e.nodeName(t, "input")) {
					t.defaultValue = n
				} else {
					return w && w.set(t, n, i)
				}
			}
		}
	}
	;
	if (!m) {
		w = e.valHooks.button = {
			get: function (e, t) {
				var i = e.getAttributeNode(t);
				return i && (t === "id" || t === "name" || t === "coords" ? i.value !== "" : i.specified) ? i.value : n
			},
			set: function (e, t, i) {
				var r = e.getAttributeNode(i);
				if (!r) {
					e.setAttributeNode((r = e.ownerDocument.createAttribute(i)))
				}
				;
				r.value = t += "";
				return i === "value" || t === e.getAttribute(i) ? t : n
			}
		};
		e.attrHooks.contenteditable = {
			get: w.get,
			set: function (e, t, n) {
				w.set(e, t === "" ? !1 : t, n)
			}
		};
		e.each(["width", "height"], function (t, n) {
			e.attrHooks[n] = e.extend(e.attrHooks[n], {
				set: function (e, t) {
					if (t === "") {
						e.setAttribute(n, "auto");
						return t
					}
				}
			})
		})
	}
	;
	if (!e.support.hrefNormalized) {
		e.each(["href", "src", "width", "height"], function (t, i) {
			e.attrHooks[i] = e.extend(e.attrHooks[i], {
				get: function (e) {
					var t = e.getAttribute(i, 2);
					return t == null ? n : t
				}
			})
		});
		e.each(["href", "src"], function (t, n) {
			e.propHooks[n] = {
				get: function (e) {
					return e.getAttribute(n, 4)
				}
			}
		})
	}
	;
	if (!e.support.style) {
		e.attrHooks.style = {
			get: function (e) {
				return e.style.cssText || n
			},
			set: function (e, t) {
				return (e.style.cssText = t + "")
			}
		}
	}
	;
	if (!e.support.optSelected) {
		e.propHooks.selected = e.extend(e.propHooks.selected, {
			get: function (e) {
				var t = e.parentNode;
				if (t) {
					t.selectedIndex;
					if (t.parentNode) {
						t.parentNode.selectedIndex
					}
				}
				;
				return null
			}
		})
	}
	;
	if (!e.support.enctype) {
		e.propFix.enctype = "encoding"
	}
	;
	if (!e.support.checkOn) {
		e.each(["radio", "checkbox"], function () {
			e.valHooks[this] = {
				get: function (e) {
					return e.getAttribute("value") === null ? "on" : e.value
				}
			}
		})
	}
	;
	e.each(["radio", "checkbox"], function () {
		e.valHooks[this] = e.extend(e.valHooks[this], {
			set: function (t, n) {
				if (e.isArray(n)) {
					return (t.checked = e.inArray(e(t).val(), n) >= 0)
				}
			}
		})
	});
	var V = /^(?:input|select|textarea)$/i,
		Mt = /^key/,
		qt = /^(?:mouse|contextmenu)|click/,
		Ne = /^(?:focusinfocus|focusoutblur)$/,
		Ce = /^([^.]*)(?:\.(.+)|)$/;

	function q() {
		return !0
	};

	function N() {
		return !1
	};
	e.event = {
		global: {},
		add: function (t, i, r, o, s) {
			var y, g, v, m, f, c, p, d, a, b, x, h = e._data(t);
			if (!h) {
				return
			}
			;
			if (r.handler) {
				m = r;
				r = m.handler;
				s = m.selector
			}
			;
			if (!r.guid) {
				r.guid = e.guid++
			}
			;
			if (!(g = h.events)) {
				g = h.events = {}
			}
			;
			if (!(c = h.handle)) {
				c = h.handle = function (t) {
					return typeof e !== l && (!t || e.event.triggered !== t.type) ? e.event.dispatch.apply(c.elem, arguments) : n
				};
				c.elem = t
			}
			;
			i = (i || "").match(u) || [""];
			v = i.length;
			while (v--) {
				y = Ce.exec(i[v]) || [];
				a = x = y[1];
				b = (y[2] || "").split(".").sort();
				f = e.event.special[a] || {};
				a = (s ? f.delegateType : f.bindType) || a;
				f = e.event.special[a] || {};
				p = e.extend({
					type: a,
					origType: x,
					data: o,
					handler: r,
					guid: r.guid,
					selector: s,
					needsContext: s && e.expr.match.needsContext.test(s),
					namespace: b.join(".")
				}, m);
				if (!(d = g[a])) {
					d = g[a] = [];
					d.delegateCount = 0;
					if (!f.setup || f.setup.call(t, o, b, c) === !1) {
						if (t.addEventListener) {
							t.addEventListener(a, c, !1)
						} else if (t.attachEvent) {
							t.attachEvent("on" + a, c)
						}
					}
				}
				;
				if (f.add) {
					f.add.call(t, p);
					if (!p.handler.guid) {
						p.handler.guid = r.guid
					}
				}
				;
				if (s) {
					d.splice(d.delegateCount++, 0, p)
				} else {
					d.push(p)
				}
				;
				e.event.global[a] = !0
			}
			;
			t = null
		},
		remove: function (t, n, i, r, o) {
			var h, a, l, y, g, p, f, c, s, m, v, d = e.hasData(t) && e._data(t);
			if (!d || !(p = d.events)) {
				return
			}
			;
			n = (n || "").match(u) || [""];
			g = n.length;
			while (g--) {
				l = Ce.exec(n[g]) || [];
				s = v = l[1];
				m = (l[2] || "").split(".").sort();
				if (!s) {
					for (s in p) {
						e.event.remove(t, s + n[g], i, r, !0)
					}
					;
					continue
				}
				;
				f = e.event.special[s] || {};
				s = (r ? f.delegateType : f.bindType) || s;
				c = p[s] || [];
				l = l[2] && new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)");
				y = h = c.length;
				while (h--) {
					a = c[h];
					if ((o || v === a.origType) && (!i || i.guid === a.guid) && (!l || l.test(a.namespace)) && (!r || r === a.selector || r === "**" && a.selector)) {
						c.splice(h, 1);
						if (a.selector) {
							c.delegateCount--
						}
						;
						if (f.remove) {
							f.remove.call(t, a)
						}
					}
				}
				;
				if (y && !c.length) {
					if (!f.teardown || f.teardown.call(t, m, d.handle) === !1) {
						e.removeEvent(t, s, d.handle)
					}
					;
					delete p[s]
				}
			}
			;
			if (e.isEmptyObject(p)) {
				delete d.handle;
				e._removeData(t, "events")
			}
		},
		trigger: function (r, o, s, a) {
			var d, h, f, m, p, c, y, v = [s || i],
				u = E.call(r, "type") ? r.type : r,
				g = E.call(r, "namespace") ? r.namespace.split(".") : [];
			f = c = s = s || i;
			if (s.nodeType === 3 || s.nodeType === 8) {
				return
			}
			;
			if (Ne.test(u + e.event.triggered)) {
				return
			}
			;
			if (u.indexOf(".") >= 0) {
				g = u.split(".");
				u = g.shift();
				g.sort()
			}
			;
			h = u.indexOf(":") < 0 && "on" + u;
			r = r[e.expando] ? r : new e.Event(u, typeof r === "object" && r);
			r.isTrigger = !0;
			r.namespace = g.join(".");
			r.namespace_re = r.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
			r.result = n;
			if (!r.target) {
				r.target = s
			}
			;
			o = o == null ? [r] : e.makeArray(o, [r]);
			p = e.event.special[u] || {};
			if (!a && p.trigger && p.trigger.apply(s, o) === !1) {
				return
			}
			;
			if (!a && !p.noBubble && !e.isWindow(s)) {
				m = p.delegateType || u;
				if (!Ne.test(m + u)) {
					f = f.parentNode
				}
				;
				for (; f; f = f.parentNode) {
					v.push(f);
					c = f
				}
				;
				if (c === (s.ownerDocument || i)) {
					v.push(c.defaultView || c.parentWindow || t)
				}
			}
			;
			y = 0;
			while ((f = v[y++]) && !r.isPropagationStopped()) {
				r.type = y > 1 ? m : p.bindType || u;
				d = (e._data(f, "events") || {})[r.type] && e._data(f, "handle");
				if (d) {
					d.apply(f, o)
				}
				;
				d = h && f[h];
				if (d && e.acceptData(f) && d.apply && d.apply(f, o) === !1) {
					r.preventDefault()
				}
			}
			;
			r.type = u;
			if (!a && !r.isDefaultPrevented()) {
				if ((!p._default || p._default.apply(s.ownerDocument, o) === !1) && !(u === "click" && e.nodeName(s, "a")) && e.acceptData(s)) {
					if (h && s[u] && !e.isWindow(s)) {
						c = s[h];
						if (c) {
							s[h] = null
						}
						;
						e.event.triggered = u;
						try {
							s[u]()
						} catch (l) {
						}
						;
						e.event.triggered = n;
						if (c) {
							s[h] = c
						}
					}
				}
			}
			;
			return r.result
		},
		dispatch: function (t) {
			t = e.event.fix(t);
			var a, s, i, r, l, u = [],
				f = y.call(arguments),
				c = (e._data(this, "events") || {})[t.type] || [],
				o = e.event.special[t.type] || {};
			f[0] = t;
			t.delegateTarget = this;
			if (o.preDispatch && o.preDispatch.call(this, t) === !1) {
				return
			}
			;
			u = e.event.handlers.call(this, t, c);
			a = 0;
			while ((r = u[a++]) && !t.isPropagationStopped()) {
				t.currentTarget = r.elem;
				l = 0;
				while ((i = r.handlers[l++]) && !t.isImmediatePropagationStopped()) {
					if (!t.namespace_re || t.namespace_re.test(i.namespace)) {
						t.handleObj = i;
						t.data = i.data;
						s = ((e.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, f);
						if (s !== n) {
							if ((t.result = s) === !1) {
								t.preventDefault();
								t.stopPropagation()
							}
						}
					}
				}
			}
			;
			if (o.postDispatch) {
				o.postDispatch.call(this, t)
			}
			;
			return t.result
		},
		handlers: function (t, i) {
			var s, a, o, l, f = [],
				u = i.delegateCount,
				r = t.target;
			if (u && r.nodeType && (!t.button || t.type !== "click")) {
				for (; r != this; r = r.parentNode || this) {
					if (r.nodeType === 1 && (r.disabled !== !0 || t.type !== "click")) {
						o = [];
						for (l = 0; l < u; l++) {
							a = i[l];
							s = a.selector + " ";
							if (o[s] === n) {
								o[s] = a.needsContext ? e(s, this).index(r) >= 0 : e.find(s, this, null, [r]).length
							}
							;
							if (o[s]) {
								o.push(a)
							}
						}
						;
						if (o.length) {
							f.push({
								elem: r,
								handlers: o
							})
						}
					}
				}
			}
			;
			if (u < i.length) {
				f.push({
					elem: this,
					handlers: i.slice(u)
				})
			}
			;
			return f
		},
		fix: function (t) {
			if (t[e.expando]) {
				return t
			}
			;
			var s, a, l, r = t.type,
				o = t,
				n = this.fixHooks[r];
			if (!n) {
				this.fixHooks[r] = n = qt.test(r) ? this.mouseHooks : Mt.test(r) ? this.keyHooks : {}
			}
			;
			l = n.props ? this.props.concat(n.props) : this.props;
			t = new e.Event(o);
			s = l.length;
			while (s--) {
				a = l[s];
				t[a] = o[a]
			}
			;
			if (!t.target) {
				t.target = o.srcElement || i
			}
			;
			if (t.target.nodeType === 3) {
				t.target = t.target.parentNode
			}
			;
			t.metaKey = !!t.metaKey;
			return n.filter ? n.filter(t, o) : t
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (e, t) {
				if (e.which == null) {
					e.which = t.charCode != null ? t.charCode : t.keyCode
				}
				;
				return e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function (e, t) {
				var r, a, o, s = t.button,
					l = t.fromElement;
				if (e.pageX == null && t.clientX != null) {
					a = e.target.ownerDocument || i;
					o = a.documentElement;
					r = a.body;
					e.pageX = t.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0);
					e.pageY = t.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)
				}
				;
				if (!e.relatedTarget && l) {
					e.relatedTarget = l === e.target ? t.toElement : l
				}
				;
				if (!e.which && s !== n) {
					e.which = (s & 1 ? 1 : (s & 2 ? 3 : (s & 4 ? 2 : 0)))
				}
				;
				return e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			click: {
				trigger: function () {
					if (e.nodeName(this, "input") && this.type === "checkbox" && this.click) {
						this.click();
						return !1
					}
				}
			},
			focus: {
				trigger: function () {
					if (this !== i.activeElement && this.focus) {
						try {
							this.focus();
							return !1
						} catch (e) {
						}
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === i.activeElement && this.blur) {
						this.blur();
						return !1
					}
				},
				delegateType: "focusout"
			},
			beforeunload: {
				postDispatch: function (e) {
					if (e.result !== n) {
						e.originalEvent.returnValue = e.result
					}
				}
			}
		},
		simulate: function (t, n, i, r) {
			var o = e.extend(new e.Event(), i, {
				type: t,
				isSimulated: !0,
				originalEvent: {}
			});
			if (r) {
				e.event.trigger(o, null, n)
			} else {
				e.event.dispatch.call(n, o)
			}
			;
			if (o.isDefaultPrevented()) {
				i.preventDefault()
			}
		}
	};
	e.removeEvent = i.removeEventListener ? function (e, t, n) {
		if (e.removeEventListener) {
			e.removeEventListener(t, n, !1)
		}
	} : function (e, t, n) {
		var i = "on" + t;
		if (e.detachEvent) {
			if (typeof e[i] === l) {
				e[i] = null
			}
			;
			e.detachEvent(i, n)
		}
	};
	e.Event = function (t, n) {
		if (!(this instanceof e.Event)) {
			return new e.Event(t, n)
		}
		;
		if (t && t.type) {
			this.originalEvent = t;
			this.type = t.type;
			this.isDefaultPrevented = (t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault()) ? q : N
		} else {
			this.type = t
		}
		;
		if (n) {
			e.extend(this, n)
		}
		;
		this.timeStamp = t && t.timeStamp || e.now();
		this[e.expando] = !0
	};
	e.Event.prototype = {
		isDefaultPrevented: N,
		isPropagationStopped: N,
		isImmediatePropagationStopped: N,
		preventDefault: function () {
			var e = this.originalEvent;
			this.isDefaultPrevented = q;
			if (!e) {
				return
			}
			;
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = !1
			}
		},
		stopPropagation: function () {
			var e = this.originalEvent;
			this.isPropagationStopped = q;
			if (!e) {
				return
			}
			;
			if (e.stopPropagation) {
				e.stopPropagation()
			}
			;
			e.cancelBubble = !0
		},
		stopImmediatePropagation: function () {
			this.isImmediatePropagationStopped = q;
			this.stopPropagation()
		}
	};
	e.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function (t, n) {
		e.event.special[t] = {
			delegateType: n,
			bindType: n,
			handle: function (t) {
				var r, o = this,
					i = t.relatedTarget,
					s = t.handleObj;
				if (!i || (i !== o && !e.contains(o, i))) {
					t.type = s.origType;
					r = s.handler.apply(this, arguments);
					t.type = n
				}
				;
				return r
			}
		}
	});
	if (!e.support.submitBubbles) {
		e.event.special.submit = {
			setup: function () {
				if (e.nodeName(this, "form")) {
					return !1
				}
				;
				e.event.add(this, "click._submit keypress._submit", function (t) {
					var r = t.target,
						i = e.nodeName(r, "input") || e.nodeName(r, "button") ? r.form : n;
					if (i && !e._data(i, "submitBubbles")) {
						e.event.add(i, "submit._submit", function (e) {
							e._submit_bubble = !0
						});
						e._data(i, "submitBubbles", !0)
					}
				})
			},
			postDispatch: function (t) {
				if (t._submit_bubble) {
					delete t._submit_bubble;
					if (this.parentNode && !t.isTrigger) {
						e.event.simulate("submit", this.parentNode, t, !0)
					}
				}
			},
			teardown: function () {
				if (e.nodeName(this, "form")) {
					return !1
				}
				;
				e.event.remove(this, "._submit")
			}
		}
	}
	;
	if (!e.support.changeBubbles) {
		e.event.special.change = {
			setup: function () {
				if (V.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") {
						e.event.add(this, "propertychange._change", function (e) {
							if (e.originalEvent.propertyName === "checked") {
								this._just_changed = !0
							}
						});
						e.event.add(this, "click._change", function (t) {
							if (this._just_changed && !t.isTrigger) {
								this._just_changed = !1
							}
							;
							e.event.simulate("change", this, t, !0)
						})
					}
					;
					return !1
				}
				;
				e.event.add(this, "beforeactivate._change", function (t) {
					var n = t.target;
					if (V.test(n.nodeName) && !e._data(n, "changeBubbles")) {
						e.event.add(n, "change._change", function (t) {
							if (this.parentNode && !t.isSimulated && !t.isTrigger) {
								e.event.simulate("change", this.parentNode, t, !0)
							}
						});
						e._data(n, "changeBubbles", !0)
					}
				})
			},
			handle: function (e) {
				var t = e.target;
				if (this !== t || e.isSimulated || e.isTrigger || (t.type !== "radio" && t.type !== "checkbox")) {
					return e.handleObj.handler.apply(this, arguments)
				}
			},
			teardown: function () {
				e.event.remove(this, "._change");
				return !V.test(this.nodeName)
			}
		}
	}
	;
	if (!e.support.focusinBubbles) {
		e.each({
			focus: "focusin",
			blur: "focusout"
		}, function (t, n) {
			var r = 0,
				o = function (t) {
					e.event.simulate(n, t.target, e.event.fix(t), !0)
				};
			e.event.special[n] = {
				setup: function () {
					if (r++ === 0) {
						i.addEventListener(t, o, !0)
					}
				},
				teardown: function () {
					if (--r === 0) {
						i.removeEventListener(t, o, !0)
					}
				}
			}
		})
	}
	;
	e.fn.extend({
		on: function (t, i, r, o, s) {
			var l, a;
			if (typeof t === "object") {
				if (typeof i !== "string") {
					r = r || i;
					i = n
				}
				;
				for (l in t) {
					this.on(l, i, r, t[l], s)
				}
				;
				return this
			}
			;
			if (r == null && o == null) {
				o = i;
				r = i = n
			} else if (o == null) {
				if (typeof i === "string") {
					o = r;
					r = n
				} else {
					o = r;
					r = i;
					i = n
				}
			}
			;
			if (o === !1) {
				o = N
			} else if (!o) {
				return this
			}
			;
			if (s === 1) {
				a = o;
				o = function (t) {
					e().off(t);
					return a.apply(this, arguments)
				};
				o.guid = a.guid || (a.guid = e.guid++)
			}
			;
			return this.each(function () {
				e.event.add(this, t, o, r, i)
			})
		},
		one: function (e, t, n, i) {
			return this.on(e, t, n, i, 1)
		},
		off: function (t, i, r) {
			var o, s;
			if (t && t.preventDefault && t.handleObj) {
				o = t.handleObj;
				e(t.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler);
				return this
			}
			;
			if (typeof t === "object") {
				for (s in t) {
					this.off(s, i, t[s])
				}
				;
				return this
			}
			;
			if (i === !1 || typeof i === "function") {
				r = i;
				i = n
			}
			;
			if (r === !1) {
				r = N
			}
			;
			return this.each(function () {
				e.event.remove(this, t, r, i)
			})
		},
		bind: function (e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function (e, t) {
			return this.off(e, null, t)
		},
		delegate: function (e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function (e, t, n) {
			return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
		},
		trigger: function (t, n) {
			return this.each(function () {
				e.event.trigger(t, n, this)
			})
		},
		triggerHandler: function (t, n) {
			var i = this[0];
			if (i) {
				return e.event.trigger(t, n, i, !0)
			}
		}
	});
	/*!
	 * Sizzle CSS Selector Engine
	 * Copyright 2012 jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://sizzlejs.com/
	 */
	(function (t, n) {
		var T, j, i, D, K, R, N, L, C, u, f, c, d, k, H, A, W, o = "sizzle" + -(new Date()),
			b = t.document,
			l = {},
			h = 0,
			ae = 0,
			Z = V(),
			ee = V(),
			te = V(),
			g = typeof n,
			ne = 1 << 31,
			M = [],
			le = M.pop,
			E = M.push,
			S = M.slice,
			I = M.indexOf || function (e) {
					var t = 0,
						n = this.length;
					for (; t < n; t++) {
						if (this[t] === e) {
							return t
						}
					}
					;
					return -1
				},
			a = "[\\x20\\t\\r\\n\\f]",
			x = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			ie = x.replace("w", "w#"),
			ue = "([*^$|!~]?=)",
			re = "\\[" + a + "*(" + x + ")" + a + "*(?:" + ue + a + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ie + ")|)|)" + a + "*\\]",
			z = ":(" + x + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + re.replace(3, 8) + ")*)|.*)\\)|)",
			q = new RegExp("^" + a + "+|((?:^|[^\\\\])(?:\\\\.)*)" + a + "+$", "g"),
			fe = new RegExp("^" + a + "*," + a + "*"),
			ce = new RegExp("^" + a + "*([\\x20\\t\\r\\n\\f>+~])" + a + "*"),
			pe = new RegExp(z),
			de = new RegExp("^" + ie + "$"),
			F = {
				"ID": new RegExp("^#(" + x + ")"),
				"CLASS": new RegExp("^\\.(" + x + ")"),
				"NAME": new RegExp("^\\[name=['\"]?(" + x + ")['\"]?\\]"),
				"TAG": new RegExp("^(" + x.replace("w", "w*") + ")"),
				"ATTR": new RegExp("^" + re),
				"PSEUDO": new RegExp("^" + z),
				"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + a + "*(even|odd|(([+-]|)(\\d*)n|)" + a + "*(?:([+-]|)" + a + "*(\\d+)|))" + a + "*\\)|)", "i"),
				"needsContext": new RegExp("^" + a + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + a + "*((?:-\\d)?\\d*)" + a + "*\\)|)(?=[^-]|$)", "i")
			},
			X = /[\x20\t\r\n\f]*[+~]/,
			he = /^[^{]+\{\s*\[native code/,
			ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			me = /^(?:input|select|textarea|button)$/i,
			ye = /^h\d$/i,
			ve = /'|\\/g,
			be = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			m = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
			y = function (e, t) {
				var n = "0x" + t - 0x10000;
				return n !== n ? t : n < 0 ? String.fromCharCode(n + 0x10000) : String.fromCharCode(n >> 10 | 0xD800, n & 0x3FF | 0xDC00)
			};
		try {
			S.call(b.documentElement.childNodes, 0)[0].nodeType
		} catch (s) {
			S = function (e) {
				var t, n = [];
				while ((t = this[e++])) {
					n.push(t)
				}
				;
				return n
			}
		}
		;

		function U(e) {
			return he.test(e + "")
		};

		function V() {
			var e, t = [];
			return (e = function (n, r) {
				if (t.push(n += " ") > i.cacheLength) {
					delete e[t.shift()]
				}
				;
				return (e[n] = r)
			})
		};

		function p(e) {
			e[o] = !0;
			return e
		};

		function v(e) {
			var n = u.createElement("div");
			try {
				return e(n)
			} catch (t) {
				return !1
			} finally {
				n = null
			}
		};

		function r(e, t, n, i) {
			var g, s, a, p, m, h, y, f, x, v;
			if ((t ? t.ownerDocument || t : b) !== u) {
				C(t)
			}
			;
			t = t || u;
			n = n || [];
			if (!e || typeof e !== "string") {
				return n
			}
			;
			if ((p = t.nodeType) !== 1 && p !== 9) {
				return []
			}
			;
			if (!c && !i) {
				if ((g = ge.exec(e))) {
					if ((a = g[1])) {
						if (p === 9) {
							s = t.getElementById(a);
							if (s && s.parentNode) {
								if (s.id === a) {
									n.push(s);
									return n
								}
							} else {
								return n
							}
						} else {
							if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && A(t, s) && s.id === a) {
								n.push(s);
								return n
							}
						}
					} else if (g[2]) {
						E.apply(n, S.call(t.getElementsByTagName(e), 0));
						return n
					} else if ((a = g[3]) && l.getByClassName && t.getElementsByClassName) {
						E.apply(n, S.call(t.getElementsByClassName(a), 0));
						return n
					}
				}
				;
				if (l.qsa && !d.test(e)) {
					y = !0;
					f = o;
					x = t;
					v = p === 9 && e;
					if (p === 1 && t.nodeName.toLowerCase() !== "object") {
						h = O(e);
						if ((y = t.getAttribute("id"))) {
							f = y.replace(ve, "\\$&")
						} else {
							t.setAttribute("id", f)
						}
						;
						f = "[id='" + f + "'] ";
						m = h.length;
						while (m--) {
							h[m] = f + B(h[m])
						}
						;
						x = X.test(e) && t.parentNode || t;
						v = h.join(",")
					}
					;
					if (v) {
						try {
							E.apply(n, S.call(x.querySelectorAll(v), 0));
							return n
						} catch (r) {
						} finally {
							if (!y) {
								t.removeAttribute("id")
							}
						}
					}
				}
			}
			;
			return Ce(e.replace(q, "$1"), t, n, i)
		};
		K = r.isXML = function (e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? t.nodeName !== "HTML" : !1
		};
		C = r.setDocument = function (e) {
			var t = e ? e.ownerDocument || e : b;
			if (t === u || t.nodeType !== 9 || !t.documentElement) {
				return u
			}
			;
			u = t;
			f = t.documentElement;
			c = K(t);
			l.tagNameNoComments = v(function (e) {
				e.appendChild(t.createComment(""));
				return !e.getElementsByTagName("*").length
			});
			l.attributes = v(function (e) {
				e.innerHTML = "<select></select>";
				var t = typeof e.lastChild.getAttribute("multiple");
				return t !== "boolean" && t !== "string"
			});
			l.getByClassName = v(function (e) {
				e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
				if (!e.getElementsByClassName || !e.getElementsByClassName("e").length) {
					return !1
				}
				;
				e.lastChild.className = "e";
				return e.getElementsByClassName("e").length === 2
			});
			l.getByName = v(function (e) {
				e.id = o + 0;
				e.innerHTML = "<a name='" + o + "'></a><div name='" + o + "'></div>";
				f.insertBefore(e, f.firstChild);
				var n = t.getElementsByName && t.getElementsByName(o).length === 2 + t.getElementsByName(o + 0).length;
				l.getIdNotName = !t.getElementById(o);
				f.removeChild(e);
				return n
			});
			i.attrHandle = v(function (e) {
				e.innerHTML = "<a href='#'></a>";
				return e.firstChild && typeof e.firstChild.getAttribute !== g && e.firstChild.getAttribute("href") === "#"
			}) ? {} : {
				"href": function (e) {
					return e.getAttribute("href", 2)
				},
				"type": function (e) {
					return e.getAttribute("type")
				}
			};
			if (l.getIdNotName) {
				i.find["ID"] = function (e, t) {
					if (typeof t.getElementById !== g && !c) {
						var n = t.getElementById(e);
						return n && n.parentNode ? [n] : []
					}
				};
				i.filter["ID"] = function (e) {
					var t = e.replace(m, y);
					return function (e) {
						return e.getAttribute("id") === t
					}
				}
			} else {
				i.find["ID"] = function (e, t) {
					if (typeof t.getElementById !== g && !c) {
						var i = t.getElementById(e);
						return i ? i.id === e || typeof i.getAttributeNode !== g && i.getAttributeNode("id").value === e ? [i] : n : []
					}
				};
				i.filter["ID"] = function (e) {
					var t = e.replace(m, y);
					return function (e) {
						var n = typeof e.getAttributeNode !== g && e.getAttributeNode("id");
						return n && n.value === t
					}
				}
			}
			;
			i.find["TAG"] = l.tagNameNoComments ? function (e, t) {
				if (typeof t.getElementsByTagName !== g) {
					return t.getElementsByTagName(e)
				}
			} : function (e, t) {
				var n, i = [],
					o = 0,
					r = t.getElementsByTagName(e);
				if (e === "*") {
					while ((n = r[o++])) {
						if (n.nodeType === 1) {
							i.push(n)
						}
					}
					;
					return i
				}
				;
				return r
			};
			i.find["NAME"] = l.getByName && function (e, t) {
					if (typeof t.getElementsByName !== g) {
						return t.getElementsByName(name)
					}
				};
			i.find["CLASS"] = l.getByClassName && function (e, t) {
					if (typeof t.getElementsByClassName !== g && !c) {
						return t.getElementsByClassName(e)
					}
				};
			k = [];
			d = [":focus"];
			if ((l.qsa = U(t.querySelectorAll))) {
				v(function (e) {
					e.innerHTML = "<select><option selected=''></option></select>";
					if (!e.querySelectorAll("[selected]").length) {
						d.push("\\[" + a + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
					}
					;
					if (!e.querySelectorAll(":checked").length) {
						d.push(":checked")
					}
				});
				v(function (e) {
					e.innerHTML = "<input type='hidden' i=''/>";
					if (e.querySelectorAll("[i^='']").length) {
						d.push("[*^$]=" + a + "*(?:\"\"|'')")
					}
					;
					if (!e.querySelectorAll(":enabled").length) {
						d.push(":enabled", ":disabled")
					}
					;
					e.querySelectorAll("*,:x");
					d.push(",.*:")
				})
			}
			;
			if ((l.matchesSelector = U((H = f.matchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)))) {
				v(function (e) {
					l.disconnectedMatch = H.call(e, "div");
					H.call(e, "[s!='']:x");
					k.push("!=", z)
				})
			}
			;
			d = new RegExp(d.join("|"));
			k = new RegExp(k.join("|"));
			A = U(f.contains) || f.compareDocumentPosition ? function (e, t) {
				var i = e.nodeType === 9 ? e.documentElement : e,
					n = t && t.parentNode;
				return e === n || !!(n && n.nodeType === 1 && (i.contains ? i.contains(n) : e.compareDocumentPosition && e.compareDocumentPosition(n) & 16))
			} : function (e, t) {
				if (t) {
					while ((t = t.parentNode)) {
						if (t === e) {
							return !0
						}
					}
				}
				;
				return !1
			};
			W = f.compareDocumentPosition ? function (e, n) {
				var i;
				if (e === n) {
					N = !0;
					return 0
				}
				;
				if ((i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n))) {
					if (i & 1 || e.parentNode && e.parentNode.nodeType === 11) {
						if (e === t || A(b, e)) {
							return -1
						}
						;
						if (n === t || A(b, n)) {
							return 1
						}
						;
						return 0
					}
					;
					return i & 4 ? -1 : 1
				}
				;
				return e.compareDocumentPosition ? -1 : 1
			} : function (e, n) {
				var i, r = 0,
					a = e.parentNode,
					l = n.parentNode,
					o = [e],
					s = [n];
				if (e === n) {
					N = !0;
					return 0
				} else if (!a || !l) {
					return e === t ? -1 : n === t ? 1 : a ? -1 : l ? 1 : 0
				} else if (a === l) {
					return oe(e, n)
				}
				;
				i = e;
				while ((i = i.parentNode)) {
					o.unshift(i)
				}
				;
				i = n;
				while ((i = i.parentNode)) {
					s.unshift(i)
				}
				while (o[r] === s[r]) {
					r++
				}
				;
				return r ? oe(o[r], s[r]) : o[r] === b ? -1 : s[r] === b ? 1 : 0
			};
			N = !1;
			[0, 0].sort(W);
			l.detectDuplicates = N;
			return u
		};
		r.matches = function (e, t) {
			return r(e, null, null, t)
		};
		r.matchesSelector = function (e, t) {
			if ((e.ownerDocument || e) !== u) {
				C(e)
			}
			;
			t = t.replace(be, "='$1']");
			if (l.matchesSelector && !c && (!k || !k.test(t)) && !d.test(t)) {
				try {
					var i = H.call(e, t);
					if (i || l.disconnectedMatch || e.document && e.document.nodeType !== 11) {
						return i
					}
				} catch (n) {
				}
			}
			;
			return r(t, u, null, [e]).length > 0
		};
		r.contains = function (e, t) {
			if ((e.ownerDocument || e) !== u) {
				C(e)
			}
			;
			return A(e, t)
		};
		r.attr = function (e, t) {
			var n;
			if ((e.ownerDocument || e) !== u) {
				C(e)
			}
			;
			if (!c) {
				t = t.toLowerCase()
			}
			;
			if ((n = i.attrHandle[t])) {
				return n(e)
			}
			;
			if (c || l.attributes) {
				return e.getAttribute(t)
			}
			;
			return ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
		};
		r.error = function (e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		};
		r.uniqueSort = function (e) {
			var i, r = [],
				t = 1,
				n = 0;
			N = !l.detectDuplicates;
			e.sort(W);
			if (N) {
				for (;
					(i = e[t]); t++) {
					if (i === e[t - 1]) {
						n = r.push(t)
					}
				}
				while (n--) {
					e.splice(r[n], 1)
				}
			}
			;
			return e
		};

		function oe(e, t) {
			var n = t && e,
				i = n && (~t.sourceIndex || ne) - (~e.sourceIndex || ne);
			if (i) {
				return i
			}
			;
			if (n) {
				while ((n = n.nextSibling)) {
					if (n === t) {
						return -1
					}
				}
			}
			;
			return e ? 1 : -1
		};

		function xe(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();
				return n === "input" && t.type === e
			}
		};

		function we(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();
				return (n === "input" || n === "button") && t.type === e
			}
		};

		function w(e) {
			return p(function (t) {
				t = +t;
				return p(function (n, i) {
					var r, o = e([], n.length, t),
						s = o.length;
					while (s--) {
						if (n[(r = o[s])]) {
							n[r] = !(i[r] = n[r])
						}
					}
				})
			})
		};
		D = r.getText = function (e) {
			var i, n = "",
				r = 0,
				t = e.nodeType;
			if (!t) {
				for (;
					(i = e[r]); r++) {
					n += D(i)
				}
			} else if (t === 1 || t === 9 || t === 11) {
				if (typeof e.textContent === "string") {
					return e.textContent
				} else {
					for (e = e.firstChild; e; e = e.nextSibling) {
						n += D(e)
					}
				}
			} else if (t === 3 || t === 4) {
				return e.nodeValue
			}
			;
			return n
		};
		i = r.selectors = {
			cacheLength: 50,
			createPseudo: p,
			match: F,
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				"ATTR": function (e) {
					e[1] = e[1].replace(m, y);
					e[3] = (e[4] || e[5] || "").replace(m, y);
					if (e[2] === "~=") {
						e[3] = " " + e[3] + " "
					}
					;
					return e.slice(0, 4)
				},
				"CHILD": function (e) {
					e[1] = e[1].toLowerCase();
					if (e[1].slice(0, 3) === "nth") {
						if (!e[3]) {
							r.error(e[0])
						}
						;
						e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
						e[5] = +((e[7] + e[8]) || e[3] === "odd")
					} else if (e[3]) {
						r.error(e[0])
					}
					;
					return e
				},
				"PSEUDO": function (e) {
					var n, t = !e[5] && e[2];
					if (F["CHILD"].test(e[0])) {
						return null
					}
					;
					if (e[4]) {
						e[2] = e[4]
					} else if (t && pe.test(t) && (n = O(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length)) {
						e[0] = e[0].slice(0, n);
						e[2] = t.slice(0, n)
					}
					;
					return e.slice(0, 3)
				}
			},
			filter: {
				"TAG": function (e) {
					if (e === "*") {
						return function () {
							return !0
						}
					}
					;
					e = e.replace(m, y).toLowerCase();
					return function (t) {
						return t.nodeName && t.nodeName.toLowerCase() === e
					}
				},
				"CLASS": function (e) {
					var t = Z[e + " "];
					return t || (t = new RegExp("(^|" + a + ")" + e + "(" + a + "|$)")) && Z(e, function (e) {
							return t.test(e.className || (typeof e.getAttribute !== g && e.getAttribute("class")) || "")
						})
				},
				"ATTR": function (e, t, n) {
					return function (i) {
						var o = r.attr(i, e);
						if (o == null) {
							return t === "!="
						}
						;
						if (!t) {
							return !0
						}
						;
						o += "";
						return t === "=" ? o === n : t === "!=" ? o !== n : t === "^=" ? n && o.indexOf(n) === 0 : t === "*=" ? n && o.indexOf(n) > -1 : t === "$=" ? n && o.slice(-n.length) === n : t === "~=" ? (" " + o + " ").indexOf(n) > -1 : t === "|=" ? o === n || o.slice(0, n.length + 1) === n + "-" : !1
					}
				},
				"CHILD": function (e, t, n, i, r) {
					var l = e.slice(0, 3) !== "nth",
						a = e.slice(-4) !== "last",
						s = t === "of-type";
					return i === 1 && r === 0 ? function (e) {
						return !!e.parentNode
					} : function (t, n, u) {
						var p, v, f, c, d, m, y = l !== a ? "nextSibling" : "previousSibling",
							g = t.parentNode,
							x = s && t.nodeName.toLowerCase(),
							b = !u && !s;
						if (g) {
							if (l) {
								while (y) {
									f = t;
									while ((f = f[y])) {
										if (s ? f.nodeName.toLowerCase() === x : f.nodeType === 1) {
											return !1
										}
									}
									;
									m = y = e === "only" && !m && "nextSibling"
								}
								;
								return !0
							}
							;
							m = [a ? g.firstChild : g.lastChild];
							if (a && b) {
								v = g[o] || (g[o] = {});
								p = v[e] || [];
								d = p[0] === h && p[1];
								c = p[0] === h && p[2];
								f = d && g.childNodes[d];
								while ((f = ++d && f && f[y] || (c = d = 0) || m.pop())) {
									if (f.nodeType === 1 && ++c && f === t) {
										v[e] = [h, d, c];
										break
									}
								}
							} else if (b && (p = (t[o] || (t[o] = {}))[e]) && p[0] === h) {
								c = p[1]
							} else {
								while ((f = ++d && f && f[y] || (c = d = 0) || m.pop())) {
									if ((s ? f.nodeName.toLowerCase() === x : f.nodeType === 1) && ++c) {
										if (b) {
											(f[o] || (f[o] = {}))[e] = [h, c]
										}
										;
										if (f === t) {
											break
										}
									}
								}
							}
							;
							c -= r;
							return c === i || (c % i === 0 && c / i >= 0)
						}
					}
				},
				"PSEUDO": function (e, t) {
					var s, n = i.pseudos[e] || i.setFilters[e.toLowerCase()] || r.error("unsupported pseudo: " + e);
					if (n[o]) {
						return n(t)
					}
					;
					if (n.length > 1) {
						s = [e, e, "", t];
						return i.setFilters.hasOwnProperty(e.toLowerCase()) ? p(function (e, i) {
							var r, o = n(e, t),
								s = o.length;
							while (s--) {
								r = I.call(e, o[s]);
								e[r] = !(i[r] = o[s])
							}
						}) : function (e) {
							return n(e, 0, s)
						}
					}
					;
					return n
				}
			},
			pseudos: {
				"not": p(function (e) {
					var n = [],
						i = [],
						t = R(e.replace(q, "$1"));
					return t[o] ? p(function (e, n, i, r) {
						var s, a = t(e, null, r, []),
							o = e.length;
						while (o--) {
							if ((s = a[o])) {
								e[o] = !(n[o] = s)
							}
						}
					}) : function (e, r, o) {
						n[0] = e;
						t(n, null, o, i);
						return !i.pop()
					}
				}),
				"has": p(function (e) {
					return function (t) {
						return r(e, t).length > 0
					}
				}),
				"contains": p(function (e) {
					return function (t) {
						return (t.textContent || t.innerText || D(t)).indexOf(e) > -1
					}
				}),
				"lang": p(function (e) {
					if (!de.test(e || "")) {
						r.error("unsupported lang: " + e)
					}
					;
					e = e.replace(m, y).toLowerCase();
					return function (t) {
						var n;
						do {
							if ((n = c ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang)) {
								n = n.toLowerCase();
								return n === e || n.indexOf(e + "-") === 0
							}
						}
						while ((t = t.parentNode) && t.nodeType === 1);
						return !1
					}
				}),
				"target": function (e) {
					var n = t.location && t.location.hash;
					return n && n.slice(1) === e.id
				},
				"root": function (e) {
					return e === f
				},
				"focus": function (e) {
					return e === u.activeElement && (!u.hasFocus || u.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
				},
				"enabled": function (e) {
					return e.disabled === !1
				},
				"disabled": function (e) {
					return e.disabled === !0
				},
				"checked": function (e) {
					var t = e.nodeName.toLowerCase();
					return (t === "input" && !!e.checked) || (t === "option" && !!e.selected)
				},
				"selected": function (e) {
					if (e.parentNode) {
						e.parentNode.selectedIndex
					}
					;
					return e.selected === !0
				},
				"empty": function (e) {
					for (e = e.firstChild; e; e = e.nextSibling) {
						if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4) {
							return !1
						}
					}
					;
					return !0
				},
				"parent": function (e) {
					return !i.pseudos["empty"](e)
				},
				"header": function (e) {
					return ye.test(e.nodeName)
				},
				"input": function (e) {
					return me.test(e.nodeName)
				},
				"button": function (e) {
					var t = e.nodeName.toLowerCase();
					return t === "input" && e.type === "button" || t === "button"
				},
				"text": function (e) {
					var t;
					return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
				},
				"first": w(function () {
					return [0]
				}),
				"last": w(function (e, t) {
					return [t - 1]
				}),
				"eq": w(function (e, t, n) {
					return [n < 0 ? n + t : n]
				}),
				"even": w(function (e, t) {
					var n = 0;
					for (; n < t; n += 2) {
						e.push(n)
					}
					;
					return e
				}),
				"odd": w(function (e, t) {
					var n = 1;
					for (; n < t; n += 2) {
						e.push(n)
					}
					;
					return e
				}),
				"lt": w(function (e, t, n) {
					var i = n < 0 ? n + t : n;
					for (; --i >= 0;) {
						e.push(i)
					}
					;
					return e
				}),
				"gt": w(function (e, t, n) {
					var i = n < 0 ? n + t : n;
					for (; ++i < t;) {
						e.push(i)
					}
					;
					return e
				})
			}
		};
		for (T in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) {
			i.pseudos[T] = xe(T)
		}
		;
		for (T in {
			submit: !0,
			reset: !0
		}) {
			i.pseudos[T] = we(T)
		}
		;

		function O(e, t) {
			var s, o, l, a, n, u, f, c = ee[e + " "];
			if (c) {
				return t ? 0 : c.slice(0)
			}
			;
			n = e;
			u = [];
			f = i.preFilter;
			while (n) {
				if (!s || (o = fe.exec(n))) {
					if (o) {
						n = n.slice(o[0].length) || n
					}
					;
					u.push(l = [])
				}
				;
				s = !1;
				if ((o = ce.exec(n))) {
					s = o.shift();
					l.push({
						value: s,
						type: o[0].replace(q, " ")
					});
					n = n.slice(s.length)
				}
				;
				for (a in i.filter) {
					if ((o = F[a].exec(n)) && (!f[a] || (o = f[a](o)))) {
						s = o.shift();
						l.push({
							value: s,
							type: a,
							matches: o
						});
						n = n.slice(s.length)
					}
				}
				;
				if (!s) {
					break
				}
			}
			;
			return t ? n.length : n ? r.error(e) : ee(e, u).slice(0)
		};

		function B(e) {
			var t = 0,
				i = e.length,
				n = "";
			for (; t < i; t++) {
				n += e[t].value
			}
			;
			return n
		};

		function Y(e, t, n) {
			var i = t.dir,
				r = n && i === "parentNode",
				s = ae++;
			return t.first ? function (t, n, o) {
				while ((t = t[i])) {
					if (t.nodeType === 1 || r) {
						return e(t, n, o)
					}
				}
			} : function (t, n, a) {
				var u, l, f, c = h + " " + s;
				if (a) {
					while ((t = t[i])) {
						if (t.nodeType === 1 || r) {
							if (e(t, n, a)) {
								return !0
							}
						}
					}
				} else {
					while ((t = t[i])) {
						if (t.nodeType === 1 || r) {
							f = t[o] || (t[o] = {});
							if ((l = f[i]) && l[0] === c) {
								if ((u = l[1]) === !0 || u === j) {
									return u === !0
								}
							} else {
								l = f[i] = [c];
								l[1] = e(t, n, a) || j;
								if (l[1] === !0) {
									return !0
								}
							}
						}
					}
				}
			}
		};

		function J(e) {
			return e.length > 1 ? function (t, n, i) {
				var r = e.length;
				while (r--) {
					if (!e[r](t, n, i)) {
						return !1
					}
				}
				;
				return !0
			} : e[0]
		};

		function P(e, t, n, i, r) {
			var s, a = [],
				o = 0,
				l = e.length,
				u = t != null;
			for (; o < l; o++) {
				if ((s = e[o])) {
					if (!n || n(s, i, r)) {
						a.push(s);
						if (u) {
							t.push(o)
						}
					}
				}
			}
			;
			return a
		};

		function G(e, t, n, i, r, s) {
			if (i && !i[o]) {
				i = G(i)
			}
			;
			if (r && !r[o]) {
				r = G(r, s)
			}
			;
			return p(function (o, s, a, l) {
				var c, f, p, g = [],
					h = [],
					m = s.length,
					y = o || Ne(t || "*", a.nodeType ? [a] : a, []),
					d = e && (o || !t) ? P(y, g, e, a, l) : y,
					u = n ? r || (o ? e : m || i) ? [] : s : d;
				if (n) {
					n(d, u, a, l)
				}
				;
				if (i) {
					c = P(u, h);
					i(c, [], a, l);
					f = c.length;
					while (f--) {
						if ((p = c[f])) {
							u[h[f]] = !(d[h[f]] = p)
						}
					}
				}
				;
				if (o) {
					if (r || e) {
						if (r) {
							c = [];
							f = u.length;
							while (f--) {
								if ((p = u[f])) {
									c.push((d[f] = p))
								}
							}
							;
							r(null, (u = []), c, l)
						}
						;
						f = u.length;
						while (f--) {
							if ((p = u[f]) && (c = r ? I.call(o, p) : g[f]) > -1) {
								o[c] = !(s[c] = p)
							}
						}
					}
				} else {
					u = P(u === s ? u.splice(m, u.length) : u);
					if (r) {
						r(null, s, u, l)
					} else {
						E.apply(s, u)
					}
				}
			})
		};

		function Q(e) {
			var l, r, n, a = e.length,
				u = i.relative[e[0].type],
				f = u || i.relative[" "],
				t = u ? 1 : 0,
				c = Y(function (e) {
					return e === l
				}, f, !0),
				p = Y(function (e) {
					return I.call(l, e) > -1
				}, f, !0),
				s = [function (e, t, n) {
					return (!u && (n || t !== L)) || ((l = t).nodeType ? c(e, t, n) : p(e, t, n))
				}];
			for (; t < a; t++) {
				if ((r = i.relative[e[t].type])) {
					s = [Y(J(s), r)]
				} else {
					r = i.filter[e[t].type].apply(null, e[t].matches);
					if (r[o]) {
						n = ++t;
						for (; n < a; n++) {
							if (i.relative[e[n].type]) {
								break
							}
						}
						;
						return G(t > 1 && J(s), t > 1 && B(e.slice(0, t - 1)).replace(q, "$1"), r, t < n && Q(e.slice(t, n)), n < a && Q((e = e.slice(n))), n < a && B(e))
					}
					;
					s.push(r)
				}
			}
			;
			return J(s)
		};

		function Te(e, t) {
			var o = 0,
				n = t.length > 0,
				s = e.length > 0,
				a = function (a, l, f, c, p) {
					var g, b, y, m = [],
						v = 0,
						d = "0",
						x = a && [],
						w = p != null,
						T = L,
						C = a || s && i.find["TAG"]("*", p && l.parentNode || l),
						N = (h += T == null ? 1 : Math.random() || 0.1);
					if (w) {
						L = l !== u && l;
						j = o
					}
					;
					for (;
						(g = C[d]) != null; d++) {
						if (s && g) {
							b = 0;
							while ((y = e[b++])) {
								if (y(g, l, f)) {
									c.push(g);
									break
								}
							}
							;
							if (w) {
								h = N;
								j = ++o
							}
						}
						;
						if (n) {
							if ((g = !y && g)) {
								v--
							}
							;
							if (a) {
								x.push(g)
							}
						}
					}
					;
					v += d;
					if (n && d !== v) {
						b = 0;
						while ((y = t[b++])) {
							y(x, m, l, f)
						}
						;
						if (a) {
							if (v > 0) {
								while (d--) {
									if (!(x[d] || m[d])) {
										m[d] = le.call(c)
									}
								}
							}
							;
							m = P(m)
						}
						;
						E.apply(c, m);
						if (w && !a && m.length > 0 && (v + t.length) > 1) {
							r.uniqueSort(c)
						}
					}
					;
					if (w) {
						h = N;
						L = T
					}
					;
					return x
				};
			return n ? p(a) : a
		};
		R = r.compile = function (e, t) {
			var i, r = [],
				s = [],
				n = te[e + " "];
			if (!n) {
				if (!t) {
					t = O(e)
				}
				;
				i = t.length;
				while (i--) {
					n = Q(t[i]);
					if (n[o]) {
						r.push(n)
					} else {
						s.push(n)
					}
				}
				;
				n = te(e, Te(s, r))
			}
			;
			return n
		};

		function Ne(e, t, n) {
			var i = 0,
				o = t.length;
			for (; i < o; i++) {
				r(e, t[i], n)
			}
			;
			return n
		};

		function Ce(e, t, n, r) {
			var a, o, s, u, f, l = O(e);
			if (!r) {
				if (l.length === 1) {
					o = l[0] = l[0].slice(0);
					if (o.length > 2 && (s = o[0]).type === "ID" && t.nodeType === 9 && !c && i.relative[o[1].type]) {
						t = i.find["ID"](s.matches[0].replace(m, y), t)[0];
						if (!t) {
							return n
						}
						;
						e = e.slice(o.shift().value.length)
					}
					;
					a = F["needsContext"].test(e) ? 0 : o.length;
					while (a--) {
						s = o[a];
						if (i.relative[(u = s.type)]) {
							break
						}
						;
						if ((f = i.find[u])) {
							if ((r = f(s.matches[0].replace(m, y), X.test(o[0].type) && t.parentNode || t))) {
								o.splice(a, 1);
								e = r.length && B(o);
								if (!e) {
									E.apply(n, S.call(r, 0));
									return n
								}
								;
								break
							}
						}
					}
				}
			}
			;
			R(e, l)(r, t, c, n, X.test(e));
			return n
		};
		i.pseudos["nth"] = i.pseudos["eq"];

		function se() {
		};
		i.filters = se.prototype = i.pseudos;
		i.setFilters = new se();
		C();
		r.attr = e.attr;
		e.find = r;
		e.expr = r.selectors;
		e.expr[":"] = e.expr.pseudos;
		e.unique = r.uniqueSort;
		e.text = r.getText;
		e.isXMLDoc = r.isXML;
		e.contains = r.contains
	})(t);
	var jt = /Until$/,
		Dt = /^(?:parents|prev(?:Until|All))/,
		Lt = /^.[^:#\[\.,]*$/,
		Te = e.expr.match.needsContext,
		Ht = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	e.fn.extend({
		find: function (t) {
			var n, i, o, r = this.length;
			if (typeof t !== "string") {
				o = this;
				return this.pushStack(e(t).filter(function () {
					for (n = 0; n < r; n++) {
						if (e.contains(o[n], this)) {
							return !0
						}
					}
				}))
			}
			;
			i = [];
			for (n = 0; n < r; n++) {
				e.find(t, this[n], i)
			}
			;
			i = this.pushStack(r > 1 ? e.unique(i) : i);
			i.selector = (this.selector ? this.selector + " " : "") + t;
			return i
		},
		has: function (t) {
			var n, i = e(t, this),
				r = i.length;
			return this.filter(function () {
				for (n = 0; n < r; n++) {
					if (e.contains(this, i[n])) {
						return !0
					}
				}
			})
		},
		not: function (e) {
			return this.pushStack(Be(this, e, !1))
		},
		filter: function (e) {
			return this.pushStack(Be(this, e, !0))
		},
		is: function (t) {
			return !!t && (typeof t === "string" ? Te.test(t) ? e(t, this.context).index(this[0]) >= 0 : e.filter(t, this).length > 0 : this.filter(t).length > 0)
		},
		closest: function (t, n) {
			var i, o = 0,
				a = this.length,
				r = [],
				s = Te.test(t) || typeof t !== "string" ? e(t, n || this.context) : 0;
			for (; o < a; o++) {
				i = this[o];
				while (i && i.ownerDocument && i !== n && i.nodeType !== 11) {
					if (s ? s.index(i) > -1 : e.find.matchesSelector(i, t)) {
						r.push(i);
						break
					}
					;
					i = i.parentNode
				}
			}
			;
			return this.pushStack(r.length > 1 ? e.unique(r) : r)
		},
		index: function (t) {
			if (!t) {
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
			}
			;
			if (typeof t === "string") {
				return e.inArray(this[0], e(t))
			}
			;
			return e.inArray(t.jquery ? t[0] : t, this)
		},
		add: function (t, n) {
			var i = typeof t === "string" ? e(t, n) : e.makeArray(t && t.nodeType ? [t] : t),
				r = e.merge(this.get(), i);
			return this.pushStack(e.unique(r))
		},
		addBack: function (e) {
			return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
		}
	});
	e.fn.andSelf = e.fn.addBack;

	function Oe(e, t) {
		do {
			e = e[t]
		}
		while (e && e.nodeType !== 1);
		return e
	};
	e.each({
		parent: function (e) {
			var t = e.parentNode;
			return t && t.nodeType !== 11 ? t : null
		},
		parents: function (t) {
			return e.dir(t, "parentNode")
		},
		parentsUntil: function (t, n, i) {
			return e.dir(t, "parentNode", i)
		},
		next: function (e) {
			return Oe(e, "nextSibling")
		},
		prev: function (e) {
			return Oe(e, "previousSibling")
		},
		nextAll: function (t) {
			return e.dir(t, "nextSibling")
		},
		prevAll: function (t) {
			return e.dir(t, "previousSibling")
		},
		nextUntil: function (t, n, i) {
			return e.dir(t, "nextSibling", i)
		},
		prevUntil: function (t, n, i) {
			return e.dir(t, "previousSibling", i)
		},
		siblings: function (t) {
			return e.sibling((t.parentNode || {}).firstChild, t)
		},
		children: function (t) {
			return e.sibling(t.firstChild)
		},
		contents: function (t) {
			return e.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : e.merge([], t.childNodes)
		}
	}, function (t, n) {
		e.fn[t] = function (i, r) {
			var o = e.map(this, n, i);
			if (!jt.test(t)) {
				r = i
			}
			;
			if (r && typeof r === "string") {
				o = e.filter(r, o)
			}
			;
			o = this.length > 1 && !Ht[t] ? e.unique(o) : o;
			if (this.length > 1 && Dt.test(t)) {
				o = o.reverse()
			}
			;
			return this.pushStack(o)
		}
	});
	e.extend({
		filter: function (t, n, i) {
			if (i) {
				t = ":not(" + t + ")"
			}
			;
			return n.length === 1 ? e.find.matchesSelector(n[0], t) ? [n[0]] : [] : e.find.matches(t, n)
		},
		dir: function (t, i, r) {
			var s = [],
				o = t[i];
			while (o && o.nodeType !== 9 && (r === n || o.nodeType !== 1 || !e(o).is(r))) {
				if (o.nodeType === 1) {
					s.push(o)
				}
				;
				o = o[i]
			}
			;
			return s
		},
		sibling: function (e, t) {
			var n = [];
			for (; e; e = e.nextSibling) {
				if (e.nodeType === 1 && e !== t) {
					n.push(e)
				}
			}
			;
			return n
		}
	});

	function Be(t, n, i) {
		n = n || 0;
		if (e.isFunction(n)) {
			return e.grep(t, function (e, t) {
				var r = !!n.call(e, t, e);
				return r === i
			})
		} else if (n.nodeType) {
			return e.grep(t, function (e) {
				return (e === n) === i
			})
		} else if (typeof n === "string") {
			var r = e.grep(t, function (e) {
				return e.nodeType === 1
			});
			if (Lt.test(n)) {
				return e.filter(n, r, !i)
			} else {
				n = e.filter(n, r)
			}
		}
		;
		return e.grep(t, function (t) {
			return (e.inArray(t, n) >= 0) === i
		})
	};

	function Pe(e) {
		var n = me.split("|"),
			t = e.createDocumentFragment();
		if (t.createElement) {
			while (n.length) {
				t.createElement(n.pop())
			}
		}
		;
		return t
	};
	var me = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Tt = / jQuery\d+="(?:null|\d+)"/g,
		ye = new RegExp("<(?:" + me + ")[\\s/>]", "i"),
		z = /^\s+/,
		ve = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		be = /<([\w:]+)/,
		xe = /<tbody/i,
		Nt = /<|&#?\w+;/,
		Ct = /<(?:script|style|link)/i,
		X = /^(?:checkbox|radio)$/i,
		kt = /checked\s*(?:[^=]|=\s*.checked.)/i,
		we = /^$|\/(?:java|ecma)script/i,
		Et = /^true\/(.*)/,
		St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		a = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: e.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		At = Pe(i),
		U = At.appendChild(i.createElement("div"));
	a.optgroup = a.option;
	a.tbody = a.tfoot = a.colgroup = a.caption = a.thead;
	a.th = a.td;
	e.fn.extend({
		text: function (t) {
			return e.access(this, function (t) {
				return t === n ? e.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(t))
			}, null, t, arguments.length)
		},
		wrapAll: function (t) {
			if (e.isFunction(t)) {
				return this.each(function (n) {
					e(this).wrapAll(t.call(this, n))
				})
			}
			;
			if (this[0]) {
				var n = e(t, this[0].ownerDocument).eq(0).clone(!0);
				if (this[0].parentNode) {
					n.insertBefore(this[0])
				}
				;
				n.map(function () {
					var e = this;
					while (e.firstChild && e.firstChild.nodeType === 1) {
						e = e.firstChild
					}
					;
					return e
				}).append(this)
			}
			;
			return this
		},
		wrapInner: function (t) {
			if (e.isFunction(t)) {
				return this.each(function (n) {
					e(this).wrapInner(t.call(this, n))
				})
			}
			;
			return this.each(function () {
				var n = e(this),
					i = n.contents();
				if (i.length) {
					i.wrapAll(t)
				} else {
					n.append(t)
				}
			})
		},
		wrap: function (t) {
			var n = e.isFunction(t);
			return this.each(function (i) {
				e(this).wrapAll(n ? t.call(this, i) : t)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				if (!e.nodeName(this, "body")) {
					e(this).replaceWith(this.childNodes)
				}
			}).end()
		},
		append: function () {
			return this.domManip(arguments, !0, function (e) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					this.appendChild(e)
				}
			})
		},
		prepend: function () {
			return this.domManip(arguments, !0, function (e) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					this.insertBefore(e, this.firstChild)
				}
			})
		},
		before: function () {
			return this.domManip(arguments, !1, function (e) {
				if (this.parentNode) {
					this.parentNode.insertBefore(e, this)
				}
			})
		},
		after: function () {
			return this.domManip(arguments, !1, function (e) {
				if (this.parentNode) {
					this.parentNode.insertBefore(e, this.nextSibling)
				}
			})
		},
		remove: function (t, n) {
			var i, r = 0;
			for (;
				(i = this[r]) != null; r++) {
				if (!t || e.filter(t, [i]).length > 0) {
					if (!n && i.nodeType === 1) {
						e.cleanData(o(i))
					}
					;
					if (i.parentNode) {
						if (n && e.contains(i.ownerDocument, i)) {
							ne(o(i, "script"))
						}
						;
						i.parentNode.removeChild(i)
					}
				}
			}
			;
			return this
		},
		empty: function () {
			var t, n = 0;
			for (;
				(t = this[n]) != null; n++) {
				if (t.nodeType === 1) {
					e.cleanData(o(t, !1))
				}
				while (t.firstChild) {
					t.removeChild(t.firstChild)
				}
				;
				if (t.options && e.nodeName(t, "select")) {
					t.options.length = 0
				}
			}
			;
			return this
		},
		clone: function (t, n) {
			t = t == null ? !1 : t;
			n = n == null ? t : n;
			return this.map(function () {
				return e.clone(this, t, n)
			})
		},
		html: function (t) {
			return e.access(this, function (t) {
				var r = this[0] || {},
					s = 0,
					l = this.length;
				if (t === n) {
					return r.nodeType === 1 ? r.innerHTML.replace(Tt, "") : n
				}
				;
				if (typeof t === "string" && !Ct.test(t) && (e.support.htmlSerialize || !ye.test(t)) && (e.support.leadingWhitespace || !z.test(t)) && !a[(be.exec(t) || ["", ""])[1].toLowerCase()]) {
					t = t.replace(ve, "<$1></$2>");
					try {
						for (; s < l; s++) {
							r = this[s] || {};
							if (r.nodeType === 1) {
								e.cleanData(o(r, !1));
								r.innerHTML = t
							}
						}
						;
						r = 0
					} catch (i) {
					}
				}
				;
				if (r) {
					this.empty().append(t)
				}
			}, null, t, arguments.length)
		},
		replaceWith: function (t) {
			var n = e.isFunction(t);
			if (!n && typeof t !== "string") {
				t = e(t).not(this).detach()
			}
			;
			return this.domManip([t], !0, function (t) {
				var i = this.nextSibling,
					n = this.parentNode;
				if (n) {
					e(this).remove();
					n.insertBefore(t, i)
				}
			})
		},
		detach: function (e) {
			return this.remove(e, !0)
		},
		domManip: function (t, i, r) {
			t = je.apply([], t);
			var f, s, c, l, h, u, a = 0,
				p = this.length,
				m = this,
				y = p - 1,
				d = t[0],
				g = e.isFunction(d);
			if (g || !(p <= 1 || typeof d !== "string" || e.support.checkClone || !kt.test(d))) {
				return this.each(function (e) {
					var o = m.eq(e);
					if (g) {
						t[0] = d.call(this, e, i ? o.html() : n)
					}
					;
					o.domManip(t, i, r)
				})
			}
			;
			if (p) {
				u = e.buildFragment(t, this[0].ownerDocument, !1, this);
				f = u.firstChild;
				if (u.childNodes.length === 1) {
					u = f
				}
				;
				if (f) {
					i = i && e.nodeName(f, "tr");
					l = e.map(o(u, "script"), Re);
					c = l.length;
					for (; a < p; a++) {
						s = u;
						if (a !== y) {
							s = e.clone(s, !0, !0);
							if (c) {
								e.merge(l, o(s, "script"))
							}
						}
						;
						r.call(i && e.nodeName(this[a], "table") ? nn(this[a], "tbody") : this[a], s, a)
					}
					;
					if (c) {
						h = l[l.length - 1].ownerDocument;
						e.map(l, We);
						for (a = 0; a < c; a++) {
							s = l[a];
							if (we.test(s.type || "") && !e._data(s, "globalEval") && e.contains(h, s)) {
								if (s.src) {
									e.ajax({
										url: s.src,
										type: "GET",
										dataType: "script",
										async: !1,
										global: !1,
										"throws": !0
									})
								} else {
									e.globalEval((s.text || s.textContent || s.innerHTML || "").replace(St, ""))
								}
							}
						}
					}
					;
					u = f = null
				}
			}
			;
			return this
		}
	});

	function nn(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	};

	function Re(e) {
		var t = e.getAttributeNode("type");
		e.type = (t && t.specified) + "/" + e.type;
		return e
	};

	function We(e) {
		var t = Et.exec(e.type);
		if (t) {
			e.type = t[1]
		} else {
			e.removeAttribute("type")
		}
		;
		return e
	};

	function ne(t, n) {
		var r, i = 0;
		for (;
			(r = t[i]) != null; i++) {
			e._data(r, "globalEval", !n || e._data(n[i], "globalEval"))
		}
	};

	function Ie(t, n) {
		if (n.nodeType !== 1 || !e.hasData(t)) {
			return
		}
		;
		var r, o, a, l = e._data(t),
			i = e._data(n, l),
			s = l.events;
		if (s) {
			delete i.handle;
			i.events = {};
			for (r in s) {
				for (o = 0, a = s[r].length; o < a; o++) {
					e.event.add(n, r, s[r][o])
				}
			}
		}
		;
		if (i.data) {
			i.data = e.extend({}, i.data)
		}
	};

	function rn(t, n) {
		var i, o, r;
		if (n.nodeType !== 1) {
			return
		}
		;
		i = n.nodeName.toLowerCase();
		if (!e.support.noCloneEvent && n[e.expando]) {
			r = e._data(n);
			for (o in r.events) {
				e.removeEvent(n, o, r.handle)
			}
			;
			n.removeAttribute(e.expando)
		}
		;
		if (i === "script" && n.text !== t.text) {
			Re(n).text = t.text;
			We(n)
		} else if (i === "object") {
			if (n.parentNode) {
				n.outerHTML = t.outerHTML
			}
			;
			if (e.support.html5Clone && (t.innerHTML && !e.trim(n.innerHTML))) {
				n.innerHTML = t.innerHTML
			}
		} else if (i === "input" && X.test(t.type)) {
			n.defaultChecked = n.checked = t.checked;
			if (n.value !== t.value) {
				n.value = t.value
			}
		} else if (i === "option") {
			n.defaultSelected = n.selected = t.defaultSelected
		} else if (i === "input" || i === "textarea") {
			n.defaultValue = t.defaultValue
		}
	};
	e.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (t, n) {
		e.fn[t] = function (t) {
			var r, i = 0,
				o = [],
				s = e(t),
				a = s.length - 1;
			for (; i <= a; i++) {
				r = i === a ? this : this.clone(!0);
				e(s[i])[n](r);
				K.apply(o, r.get())
			}
			;
			return this.pushStack(o)
		}
	});

	function o(t, i) {
		var a, s, u = 0,
			r = typeof t.getElementsByTagName !== l ? t.getElementsByTagName(i || "*") : typeof t.querySelectorAll !== l ? t.querySelectorAll(i || "*") : n;
		if (!r) {
			for (r = [], a = t.childNodes || t;
			     (s = a[u]) != null; u++) {
				if (!i || e.nodeName(s, i)) {
					r.push(s)
				} else {
					e.merge(r, o(s, i))
				}
			}
		}
		;
		return i === n || i && e.nodeName(t, i) ? e.merge([t], r) : r
	};

	function on(e) {
		if (X.test(e.type)) {
			e.defaultChecked = e.checked
		}
	};
	e.extend({
		clone: function (t, n, i) {
			var r, u, a, s, l, f = e.contains(t.ownerDocument, t);
			if (e.support.html5Clone || e.isXMLDoc(t) || !ye.test("<" + t.nodeName + ">")) {
				a = t.cloneNode(!0)
			} else {
				U.innerHTML = t.outerHTML;
				U.removeChild(a = U.firstChild)
			}
			;
			if ((!e.support.noCloneEvent || !e.support.noCloneChecked) && (t.nodeType === 1 || t.nodeType === 11) && !e.isXMLDoc(t)) {
				r = o(a);
				l = o(t);
				for (s = 0;
				     (u = l[s]) != null; ++s) {
					if (r[s]) {
						rn(u, r[s])
					}
				}
			}
			;
			if (n) {
				if (i) {
					l = l || o(t);
					r = r || o(a);
					for (s = 0;
					     (u = l[s]) != null; s++) {
						Ie(u, r[s])
					}
				} else {
					Ie(t, a)
				}
			}
			;
			r = o(a, "script");
			if (r.length > 0) {
				ne(r, !f && o(t, "script"))
			}
			;
			r = l = u = null;
			return a
		},
		buildFragment: function (t, n, i, r) {
			var u, s, m, l, h, g, c, y = t.length,
				p = Pe(n),
				f = [],
				d = 0;
			for (; d < y; d++) {
				s = t[d];
				if (s || s === 0) {
					if (e.type(s) === "object") {
						e.merge(f, s.nodeType ? [s] : s)
					} else if (!Nt.test(s)) {
						f.push(n.createTextNode(s))
					} else {
						l = l || p.appendChild(n.createElement("div"));
						h = (be.exec(s) || ["", ""])[1].toLowerCase();
						c = a[h] || a._default;
						l.innerHTML = c[1] + s.replace(ve, "<$1></$2>") + c[2];
						u = c[0];
						while (u--) {
							l = l.lastChild
						}
						;
						if (!e.support.leadingWhitespace && z.test(s)) {
							f.push(n.createTextNode(z.exec(s)[0]))
						}
						;
						if (!e.support.tbody) {
							s = h === "table" && !xe.test(s) ? l.firstChild : c[1] === "<table>" && !xe.test(s) ? l : 0;
							u = s && s.childNodes.length;
							while (u--) {
								if (e.nodeName((g = s.childNodes[u]), "tbody") && !g.childNodes.length) {
									s.removeChild(g)
								}
							}
						}
						;
						e.merge(f, l.childNodes);
						l.textContent = "";
						while (l.firstChild) {
							l.removeChild(l.firstChild)
						}
						;
						l = p.lastChild
					}
				}
			}
			;
			if (l) {
				p.removeChild(l)
			}
			;
			if (!e.support.appendChecked) {
				e.grep(o(f, "input"), on)
			}
			;
			d = 0;
			while ((s = f[d++])) {
				if (r && e.inArray(s, r) !== -1) {
					continue
				}
				;
				m = e.contains(s.ownerDocument, s);
				l = o(p.appendChild(s), "script");
				if (m) {
					ne(l)
				}
				;
				if (i) {
					u = 0;
					while ((s = l[u++])) {
						if (we.test(s.type || "")) {
							i.push(s)
						}
					}
				}
			}
			;
			l = null;
			return p
		},
		cleanData: function (t, n) {
			var i, s, r, o, f = 0,
				a = e.expando,
				u = e.cache,
				c = e.support.deleteExpando,
				p = e.event.special;
			for (;
				(i = t[f]) != null; f++) {
				if (n || e.acceptData(i)) {
					r = i[a];
					o = r && u[r];
					if (o) {
						if (o.events) {
							for (s in o.events) {
								if (p[s]) {
									e.event.remove(i, s)
								} else {
									e.removeEvent(i, s, o.handle)
								}
							}
						}
						;
						if (u[r]) {
							delete u[r];
							if (c) {
								delete i[a]
							} else if (typeof i.removeAttribute !== l) {
								i.removeAttribute(a)
							} else {
								i[a] = null
							}
							;
							T.push(r)
						}
					}
				}
			}
		}
	});
	var k, d, h, I = /alpha\([^)]*\)/i,
		mt = /opacity\s*=\s*([^)]*)/,
		yt = /^(top|right|bottom|left)$/,
		vt = /^(none|table(?!-c[ea]).+)/,
		pe = /^margin/,
		bt = new RegExp("^(" + M + ")(.*)$", "i"),
		D = new RegExp("^(" + M + ")(?!px)[a-z%]+$", "i"),
		xt = new RegExp("^([+-])=(" + M + ")", "i"),
		de = {
			BODY: "block"
		},
		wt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		he = {
			letterSpacing: 0,
			fontWeight: 400
		},
		g = ["Top", "Right", "Bottom", "Left"],
		ge = ["Webkit", "O", "Moz", "ms"];

	function ze(e, t) {
		if (t in e) {
			return t
		}
		;
		var i = t.charAt(0).toUpperCase() + t.slice(1),
			r = t,
			n = ge.length;
		while (n--) {
			t = ge[n] + i;
			if (t in e) {
				return t
			}
		}
		;
		return r
	};

	function S(t, n) {
		t = n || t;
		return e.css(t, "display") === "none" || !e.contains(t.ownerDocument, t)
	};

	function Xe(t, n) {
		var o, i, a, s = [],
			r = 0,
			l = t.length;
		for (; r < l; r++) {
			i = t[r];
			if (!i.style) {
				continue
			}
			;
			s[r] = e._data(i, "olddisplay");
			o = i.style.display;
			if (n) {
				if (!s[r] && o === "none") {
					i.style.display = ""
				}
				;
				if (i.style.display === "" && S(i)) {
					s[r] = e._data(i, "olddisplay", Je(i.nodeName))
				}
			} else {
				if (!s[r]) {
					a = S(i);
					if (o && o !== "none" || !a) {
						e._data(i, "olddisplay", a ? o : e.css(i, "display"))
					}
				}
			}
		}
		;
		for (r = 0; r < l; r++) {
			i = t[r];
			if (!i.style) {
				continue
			}
			;
			if (!n || i.style.display === "none" || i.style.display === "") {
				i.style.display = n ? s[r] || "" : "none"
			}
		}
		;
		return t
	};
	e.fn.extend({
		css: function (t, i) {
			return e.access(this, function (t, i, r) {
				var s, a, l = {},
					o = 0;
				if (e.isArray(i)) {
					a = d(t);
					s = i.length;
					for (; o < s; o++) {
						l[i[o]] = e.css(t, i[o], !1, a)
					}
					;
					return l
				}
				;
				return r !== n ? e.style(t, i, r) : e.css(t, i)
			}, t, i, arguments.length > 1)
		},
		show: function () {
			return Xe(this, !0)
		},
		hide: function () {
			return Xe(this)
		},
		toggle: function (t) {
			var n = typeof t === "boolean";
			return this.each(function () {
				if (n ? t : S(this)) {
					e(this).show()
				} else {
					e(this).hide()
				}
			})
		}
	});
	e.extend({
		cssHooks: {
			opacity: {
				get: function (e, t) {
					if (t) {
						var n = h(e, "opacity");
						return n === "" ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			"columnCount": !0,
			"fillOpacity": !0,
			"fontWeight": !0,
			"lineHeight": !0,
			"opacity": !0,
			"orphans": !0,
			"widows": !0,
			"zIndex": !0,
			"zoom": !0
		},
		cssProps: {
			"float": e.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function (t, i, r, o) {
			if (!t || t.nodeType === 3 || t.nodeType === 8 || !t.style) {
				return
			}
			;
			var l, u, a, f = e.camelCase(i),
				c = t.style;
			i = e.cssProps[f] || (e.cssProps[f] = ze(c, f));
			a = e.cssHooks[i] || e.cssHooks[f];
			if (r !== n) {
				u = typeof r;
				if (u === "string" && (l = xt.exec(r))) {
					r = (l[1] + 1) * l[2] + parseFloat(e.css(t, i));
					u = "number"
				}
				;
				if (r == null || u === "number" && isNaN(r)) {
					return
				}
				;
				if (u === "number" && !e.cssNumber[f]) {
					r += "px"
				}
				;
				if (!e.support.clearCloneStyle && r === "" && i.indexOf("background") === 0) {
					c[i] = "inherit"
				}
				;
				if (!a || !("set" in a) || (r = a.set(t, r, o)) !== n) {
					try {
						c[i] = r
					} catch (s) {
					}
				}
			} else {
				if (a && "get" in a && (l = a.get(t, !1, o)) !== n) {
					return l
				}
				;
				return c[i]
			}
		},
		css: function (t, i, r, o) {
			var u, s, a, l = e.camelCase(i);
			i = e.cssProps[l] || (e.cssProps[l] = ze(t.style, l));
			a = e.cssHooks[i] || e.cssHooks[l];
			if (a && "get" in a) {
				s = a.get(t, !0, r)
			}
			;
			if (s === n) {
				s = h(t, i, o)
			}
			;
			if (s === "normal" && i in he) {
				s = he[i]
			}
			;
			if (r === "" || r) {
				u = parseFloat(s);
				return r === !0 || e.isNumeric(u) ? u || 0 : s
			}
			;
			return s
		},
		swap: function (e, t, n, i) {
			var o, r, s = {};
			for (r in t) {
				s[r] = e.style[r];
				e.style[r] = t[r]
			}
			;
			o = n.apply(e, i || []);
			for (r in t) {
				e.style[r] = s[r]
			}
			;
			return o
		}
	});
	if (t.getComputedStyle) {
		d = function (e) {
			return t.getComputedStyle(e, null)
		};
		h = function (t, i, r) {
			var l, u, f, a = r || d(t),
				s = a ? a.getPropertyValue(i) || a[i] : n,
				o = t.style;
			if (a) {
				if (s === "" && !e.contains(t.ownerDocument, t)) {
					s = e.style(t, i)
				}
				;
				if (D.test(s) && pe.test(i)) {
					l = o.width;
					u = o.minWidth;
					f = o.maxWidth;
					o.minWidth = o.maxWidth = o.width = s;
					s = a.width;
					o.width = l;
					o.minWidth = u;
					o.maxWidth = f
				}
			}
			;
			return s
		}
	} else if (i.documentElement.currentStyle) {
		d = function (e) {
			return e.currentStyle
		};
		h = function (e, t, i) {
			var l, s, a, u = i || d(e),
				r = u ? u[t] : n,
				o = e.style;
			if (r == null && o && o[t]) {
				r = o[t]
			}
			;
			if (D.test(r) && !yt.test(t)) {
				l = o.left;
				s = e.runtimeStyle;
				a = s && s.left;
				if (a) {
					s.left = e.currentStyle.left
				}
				;
				o.left = t === "fontSize" ? "1em" : r;
				r = o.pixelLeft + "px";
				o.left = l;
				if (a) {
					s.left = a
				}
			}
			;
			return r === "" ? "auto" : r
		}
	}
	;

	function Ue(e, t, n) {
		var i = bt.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	};

	function Ve(t, n, i, r, o) {
		var s = i === (r ? "border" : "content") ? 4 : n === "width" ? 1 : 0,
			a = 0;
		for (; s < 4; s += 2) {
			if (i === "margin") {
				a += e.css(t, i + g[s], !0, o)
			}
			;
			if (r) {
				if (i === "content") {
					a -= e.css(t, "padding" + g[s], !0, o)
				}
				;
				if (i !== "margin") {
					a -= e.css(t, "border" + g[s] + "Width", !0, o)
				}
			} else {
				a += e.css(t, "padding" + g[s], !0, o);
				if (i !== "padding") {
					a += e.css(t, "border" + g[s] + "Width", !0, o)
				}
			}
		}
		;
		return a
	};

	function Ye(t, n, i) {
		var s = !0,
			r = n === "width" ? t.offsetWidth : t.offsetHeight,
			o = d(t),
			a = e.support.boxSizing && e.css(t, "boxSizing", !1, o) === "border-box";
		if (r <= 0 || r == null) {
			r = h(t, n, o);
			if (r < 0 || r == null) {
				r = t.style[n]
			}
			;
			if (D.test(r)) {
				return r
			}
			;
			s = a && (e.support.boxSizingReliable || r === t.style[n]);
			r = parseFloat(r) || 0
		}
		;
		return (r + Ve(t, n, i || (a ? "border" : "content"), s, o)) + "px"
	};

	function Je(t) {
		var r = i,
			n = de[t];
		if (!n) {
			n = Ge(t, r);
			if (n === "none" || !n) {
				k = (k || e("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(r.documentElement);
				r = (k[0].contentWindow || k[0].contentDocument).document;
				r.write("<!doctype html><html><body>");
				r.close();
				n = Ge(t, r);
				k.detach()
			}
			;
			de[t] = n
		}
		;
		return n
	};

	function Ge(t, n) {
		var i = e(n.createElement(t)).appendTo(n.body),
			r = e.css(i[0], "display");
		i.remove();
		return r
	};
	e.each(["height", "width"], function (t, n) {
		e.cssHooks[n] = {
			get: function (t, i, r) {
				if (i) {
					return t.offsetWidth === 0 && vt.test(e.css(t, "display")) ? e.swap(t, wt, function () {
						return Ye(t, n, r)
					}) : Ye(t, n, r)
				}
			},
			set: function (t, i, r) {
				var o = r && d(t);
				return Ue(t, i, r ? Ve(t, n, r, e.support.boxSizing && e.css(t, "boxSizing", !1, o) === "border-box", o) : 0)
			}
		}
	});
	if (!e.support.opacity) {
		e.cssHooks.opacity = {
			get: function (e, t) {
				return mt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : t ? "1" : ""
			},
			set: function (t, n) {
				var i = t.style,
					r = t.currentStyle,
					s = e.isNumeric(n) ? "alpha(opacity=" + n * 100 + ")" : "",
					o = r && r.filter || i.filter || "";
				i.zoom = 1;
				if ((n >= 1 || n === "") && e.trim(o.replace(I, "")) === "" && i.removeAttribute) {
					i.removeAttribute("filter");
					if (n === "" || r && !r.filter) {
						return
					}
				}
				;
				i.filter = I.test(o) ? o.replace(I, s) : o + " " + s
			}
		}
	}
	;
	e(function () {
		if (!e.support.reliableMarginRight) {
			e.cssHooks.marginRight = {
				get: function (t, n) {
					if (n) {
						return e.swap(t, {
							"display": "inline-block"
						}, h, [t, "marginRight"])
					}
				}
			}
		}
		;
		if (!e.support.pixelPosition && e.fn.position) {
			e.each(["top", "left"], function (t, n) {
				e.cssHooks[n] = {
					get: function (t, i) {
						if (i) {
							i = h(t, n);
							return D.test(i) ? e(t).position()[n] + "px" : i
						}
					}
				}
			})
		}
	});
	if (e.expr && e.expr.filters) {
		e.expr.filters.hidden = function (t) {
			return t.offsetWidth <= 0 && t.offsetHeight <= 0 || (!e.support.reliableHiddenOffsets && ((t.style && t.style.display) || e.css(t, "display")) === "none")
		};
		e.expr.filters.visible = function (t) {
			return !e.expr.filters.hidden(t)
		}
	}
	;
	e.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (t, n) {
		e.cssHooks[t + n] = {
			expand: function (e) {
				var i = 0,
					o = {},
					r = typeof e === "string" ? e.split(" ") : [e];
				for (; i < 4; i++) {
					o[t + g[i] + n] = r[i] || r[i - 2] || r[0]
				}
				;
				return o
			}
		};
		if (!pe.test(t)) {
			e.cssHooks[t + n].set = Ue
		}
	});
	var pt = /%20/g,
		dt = /\[\]$/,
		ce = /\r?\n/g,
		ht = /^(?:submit|button|image|reset|file)$/i,
		gt = /^(?:input|select|textarea|keygen)/i;
	e.fn.extend({
		serialize: function () {
			return e.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				var t = e.prop(this, "elements");
				return t ? e.makeArray(t) : this
			}).filter(function () {
				var t = this.type;
				return this.name && !e(this).is(":disabled") && gt.test(this.nodeName) && !ht.test(t) && (this.checked || !X.test(t))
			}).map(function (t, n) {
				var i = e(this).val();
				return i == null ? null : e.isArray(i) ? e.map(i, function (e) {
					return {
						name: n.name,
						value: e.replace(ce, "\r\n")
					}
				}) : {
					name: n.name,
					value: i.replace(ce, "\r\n")
				}
			}).get()
		}
	});
	e.param = function (t, i) {
		var r, o = [],
			s = function (t, n) {
				n = e.isFunction(n) ? n() : (n == null ? "" : n);
				o[o.length] = encodeURIComponent(t) + "=" + encodeURIComponent(n)
			};
		if (i === n) {
			i = e.ajaxSettings && e.ajaxSettings.traditional
		}
		;
		if (e.isArray(t) || (t.jquery && !e.isPlainObject(t))) {
			e.each(t, function () {
				s(this.name, this.value)
			})
		} else {
			for (r in t) {
				ie(r, t[r], i, s)
			}
		}
		;
		return o.join("&").replace(pt, "+")
	};

	function ie(t, n, i, r) {
		var o;
		if (e.isArray(n)) {
			e.each(n, function (e, n) {
				if (i || dt.test(t)) {
					r(t, n)
				} else {
					ie(t + "[" + (typeof n === "object" ? e : "") + "]", n, i, r)
				}
			})
		} else if (!i && e.type(n) === "object") {
			for (o in n) {
				ie(t + "[" + o + "]", n[o], i, r)
			}
		} else {
			r(t, n)
		}
	};
	e.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function (t, n) {
		e.fn[n] = function (e, t) {
			return arguments.length > 0 ? this.on(n, null, e, t) : this.trigger(n)
		}
	});
	e.fn.hover = function (e, t) {
		return this.mouseenter(e).mouseleave(t || e)
	};
	var p, f, P = e.now(),
		R = /\?/,
		at = /#.*$/,
		se = /([?&])_=[^&]*/,
		lt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		ft = /^(?:GET|HEAD)$/,
		ct = /^\/\//,
		ae = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		le = e.fn.load,
		ue = {},
		W = {},
		fe = "*/".concat("*");
	try {
		f = Wt.href
	} catch (r) {
		f = i.createElement("a");
		f.href = "";
		f = f.href
	}
	;
	p = ae.exec(f.toLowerCase()) || [];

	function Qe(t) {
		return function (n, i) {
			if (typeof n !== "string") {
				i = n;
				n = "*"
			}
			;
			var r, o = 0,
				s = n.toLowerCase().match(u) || [];
			if (e.isFunction(i)) {
				while ((r = s[o++])) {
					if (r[0] === "+") {
						r = r.slice(1) || "*";
						(t[r] = t[r] || []).unshift(i)
					} else {
						(t[r] = t[r] || []).push(i)
					}
				}
			}
		}
	};

	function Ke(t, n, i, r) {
		var o = {},
			a = (t === W);

		function s(l) {
			var u;
			o[l] = !0;
			e.each(t[l] || [], function (e, t) {
				var l = t(n, i, r);
				if (typeof l === "string" && !a && !o[l]) {
					n.dataTypes.unshift(l);
					s(l);
					return !1
				} else if (a) {
					return !(u = l)
				}
			});
			return u
		};
		return s(n.dataTypes[0]) || !o["*"] && s("*")
	};

	function re(t, i) {
		var o, r, s = e.ajaxSettings.flatOptions || {};
		for (r in i) {
			if (i[r] !== n) {
				(s[r] ? t : (o || (o = {})))[r] = i[r]
			}
		}
		;
		if (o) {
			e.extend(!0, t, o)
		}
		;
		return t
	};
	e.fn.load = function (t, i, r) {
		if (typeof t !== "string" && le) {
			return le.apply(this, arguments)
		}
		;
		var o, l, u, s = this,
			a = t.indexOf(" ");
		if (a >= 0) {
			o = t.slice(a, t.length);
			t = t.slice(0, a)
		}
		;
		if (e.isFunction(i)) {
			r = i;
			i = n
		} else if (i && typeof i === "object") {
			u = "POST"
		}
		;
		if (s.length > 0) {
			e.ajax({
				url: t,
				type: u,
				dataType: "html",
				data: i
			}).done(function (t) {
				l = arguments;
				s.html(o ? e("<div>").append(e.parseHTML(t)).find(o) : t)
			}).complete(r && function (e, t) {
					s.each(r, l || [e.responseText, t, e])
				})
		}
		;
		return this
	};
	e.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, n) {
		e.fn[n] = function (e) {
			return this.on(n, e)
		}
	});
	e.each(["get", "post"], function (t, i) {
		e[i] = function (t, r, o, s) {
			if (e.isFunction(r)) {
				s = s || o;
				o = r;
				r = n
			}
			;
			return e.ajax({
				url: t,
				type: i,
				dataType: s,
				data: r,
				success: o
			})
		}
	});
	e.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: f,
			type: "GET",
			isLocal: ut.test(p[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": fe,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": t.String,
				"text html": !0,
				"text json": e.parseJSON,
				"text xml": e.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function (t, n) {
			return n ? re(re(t, e.ajaxSettings), n) : re(e.ajaxSettings, t)
		},
		ajaxPrefilter: Qe(ue),
		ajaxTransport: Qe(W),
		ajax: function (t, i) {
			if (typeof t === "object") {
				i = t;
				t = n
			}
			;
			i = i || {};
			var d, h, a, x, w, m, g, y, r = e.ajaxSetup({}, i),
				c = r.context || r,
				T = r.context && (c.nodeType || c.jquery) ? e(c) : e.event,
				N = e.Deferred(),
				C = e.Callbacks("once memory"),
				v = r.statusCode || {},
				k = {},
				E = {},
				l = 0,
				S = "canceled",
				o = {
					readyState: 0,
					getResponseHeader: function (e) {
						var t;
						if (l === 2) {
							if (!y) {
								y = {};
								while ((t = lt.exec(x))) {
									y[t[1].toLowerCase()] = t[2]
								}
							}
							;
							t = y[e.toLowerCase()]
						}
						;
						return t == null ? null : t
					},
					getAllResponseHeaders: function () {
						return l === 2 ? x : null
					},
					setRequestHeader: function (e, t) {
						var n = e.toLowerCase();
						if (!l) {
							e = E[n] = E[n] || e;
							k[e] = t
						}
						;
						return this
					},
					overrideMimeType: function (e) {
						if (!l) {
							r.mimeType = e
						}
						;
						return this
					},
					statusCode: function (e) {
						var t;
						if (e) {
							if (l < 2) {
								for (t in e) {
									v[t] = [v[t], e[t]]
								}
							} else {
								o.always(e[o.status])
							}
						}
						;
						return this
					},
					abort: function (e) {
						var t = e || S;
						if (g) {
							g.abort(t)
						}
						;
						b(0, t);
						return this
					}
				};
			N.promise(o).complete = C.add;
			o.success = o.done;
			o.error = o.fail;
			r.url = ((t || r.url || f) + "").replace(at, "").replace(ct, p[1] + "//");
			r.type = i.method || i.type || r.method || r.type;
			r.dataTypes = e.trim(r.dataType || "*").toLowerCase().match(u) || [""];
			if (r.crossDomain == null) {
				d = ae.exec(r.url.toLowerCase());
				r.crossDomain = !!(d && (d[1] !== p[1] || d[2] !== p[2] || (d[3] || (d[1] === "http:" ? 80 : 443)) != (p[3] || (p[1] === "http:" ? 80 : 443))))
			}
			;
			if (r.data && r.processData && typeof r.data !== "string") {
				r.data = e.param(r.data, r.traditional)
			}
			;
			Ke(ue, r, i, o);
			if (l === 2) {
				return o
			}
			;
			m = r.global;
			if (m && e.active++ === 0) {
				e.event.trigger("ajaxStart")
			}
			;
			r.type = r.type.toUpperCase();
			r.hasContent = !ft.test(r.type);
			a = r.url;
			if (!r.hasContent) {
				if (r.data) {
					a = (r.url += (R.test(a) ? "&" : "?") + r.data);
					delete r.data
				}
				;
				if (r.cache === !1) {
					r.url = se.test(a) ? a.replace(se, "$1_=" + P++) : a + (R.test(a) ? "&" : "?") + "_=" + P++
				}
			}
			;
			if (r.ifModified) {
				if (e.lastModified[a]) {
					o.setRequestHeader("If-Modified-Since", e.lastModified[a])
				}
				;
				if (e.etag[a]) {
					o.setRequestHeader("If-None-Match", e.etag[a])
				}
			}
			;
			if (r.data && r.hasContent && r.contentType !== !1 || i.contentType) {
				o.setRequestHeader("Content-Type", r.contentType)
			}
			;
			o.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + fe + "; q=0.01" : "") : r.accepts["*"]);
			for (h in r.headers) {
				o.setRequestHeader(h, r.headers[h])
			}
			;
			if (r.beforeSend && (r.beforeSend.call(c, o, r) === !1 || l === 2)) {
				return o.abort()
			}
			;
			S = "abort";
			for (h in {
				success: 1,
				error: 1,
				complete: 1
			}) {
				o[h](r[h])
			}
			;
			g = Ke(W, r, i, o);
			if (!g) {
				b(-1, "No Transport")
			} else {
				o.readyState = 1;
				if (m) {
					T.trigger("ajaxSend", [o, r])
				}
				;
				if (r.async && r.timeout > 0) {
					w = setTimeout(function () {
						o.abort("timeout")
					}, r.timeout)
				}
				;
				try {
					l = 1;
					g.send(k, b)
				} catch (s) {
					if (l < 2) {
						b(-1, s)
					} else {
						throw s
					}
				}
			}
			;

			function b(t, i, s, u) {
				var f, y, h, b, d, p = i;
				if (l === 2) {
					return
				}
				;
				l = 2;
				if (w) {
					clearTimeout(w)
				}
				;
				g = n;
				x = u || "";
				o.readyState = t > 0 ? 4 : 0;
				if (s) {
					b = sn(r, o, s)
				}
				;
				if (t >= 200 && t < 300 || t === 304) {
					if (r.ifModified) {
						d = o.getResponseHeader("Last-Modified");
						if (d) {
							e.lastModified[a] = d
						}
						;
						d = o.getResponseHeader("etag");
						if (d) {
							e.etag[a] = d
						}
					}
					;
					if (t === 204) {
						f = !0;
						p = "nocontent"
					} else if (t === 304) {
						f = !0;
						p = "notmodified"
					} else {
						f = an(r, b);
						p = f.state;
						y = f.data;
						h = f.error;
						f = !h
					}
				} else {
					h = p;
					if (t || !p) {
						p = "error";
						if (t < 0) {
							t = 0
						}
					}
				}
				;
				o.status = t;
				o.statusText = (i || p) + "";
				if (f) {
					N.resolveWith(c, [y, p, o])
				} else {
					N.rejectWith(c, [o, p, h])
				}
				;
				o.statusCode(v);
				v = n;
				if (m) {
					T.trigger(f ? "ajaxSuccess" : "ajaxError", [o, r, f ? y : h])
				}
				;
				C.fireWith(c, [o, p]);
				if (m) {
					T.trigger("ajaxComplete", [o, r]);
					if (!(--e.active)) {
						e.event.trigger("ajaxStop")
					}
				}
			};
			return o
		},
		getScript: function (t, i) {
			return e.get(t, n, i, "script")
		},
		getJSON: function (t, n, i) {
			return e.get(t, n, i, "json")
		}
	});

	function sn(e, t, i) {
		var l, a, s, r, u = e.contents,
			o = e.dataTypes,
			f = e.responseFields;
		for (r in f) {
			if (r in i) {
				t[f[r]] = i[r]
			}
		}
		while (o[0] === "*") {
			o.shift();
			if (a === n) {
				a = e.mimeType || t.getResponseHeader("Content-Type")
			}
		}
		;
		if (a) {
			for (r in u) {
				if (u[r] && u[r].test(a)) {
					o.unshift(r);
					break
				}
			}
		}
		;
		if (o[0] in i) {
			s = o[0]
		} else {
			for (r in i) {
				if (!o[0] || e.converters[r + " " + o[0]]) {
					s = r;
					break
				}
				;
				if (!l) {
					l = r
				}
			}
			;
			s = s || l
		}
		;
		if (s) {
			if (s !== o[0]) {
				o.unshift(s)
			}
			;
			return i[s]
		}
	};

	function an(e, t) {
		var l, r, i, a, o = {},
			f = 0,
			u = e.dataTypes.slice(),
			s = u[0];
		if (e.dataFilter) {
			t = e.dataFilter(t, e.dataType)
		}
		;
		if (u[1]) {
			for (i in e.converters) {
				o[i.toLowerCase()] = e.converters[i]
			}
		}
		;
		for (;
			(r = u[++f]);) {
			if (r !== "*") {
				if (s !== "*" && s !== r) {
					i = o[s + " " + r] || o["* " + r];
					if (!i) {
						for (l in o) {
							a = l.split(" ");
							if (a[1] === r) {
								i = o[s + " " + a[0]] || o["* " + a[0]];
								if (i) {
									if (i === !0) {
										i = o[l]
									} else if (o[l] !== !0) {
										r = a[0];
										u.splice(f--, 0, r)
									}
									;
									break
								}
							}
						}
					}
					;
					if (i !== !0) {
						if (i && e["throws"]) {
							t = i(t)
						} else {
							try {
								t = i(t)
							} catch (n) {
								return {
									state: "parsererror",
									error: i ? n : "No conversion from " + s + " to " + r
								}
							}
						}
					}
				}
				;
				s = r
			}
		}
		;
		return {
			state: "success",
			data: t
		}
	};
	e.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function (t) {
				e.globalEval(t);
				return t
			}
		}
	});
	e.ajaxPrefilter("script", function (e) {
		if (e.cache === n) {
			e.cache = !1
		}
		;
		if (e.crossDomain) {
			e.type = "GET";
			e.global = !1
		}
	});
	e.ajaxTransport("script", function (t) {
		if (t.crossDomain) {
			var r, o = i.head || e("head")[0] || i.documentElement;
			return {
				send: function (e, n) {
					r = i.createElement("script");
					r.async = !0;
					if (t.scriptCharset) {
						r.charset = t.scriptCharset
					}
					;
					r.src = t.url;
					r.onload = r.onreadystatechange = function (e, t) {
						if (t || !r.readyState || /loaded|complete/.test(r.readyState)) {
							r.onload = r.onreadystatechange = null;
							if (r.parentNode) {
								r.parentNode.removeChild(r)
							}
							;
							r = null;
							if (!t) {
								n(200, "success")
							}
						}
					};
					o.insertBefore(r, o.firstChild)
				},
				abort: function () {
					if (r) {
						r.onload(n, !0)
					}
				}
			}
		}
	});
	var oe = [],
		B = /(=)\?(?=&|$)|\?\?/;
	e.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var t = oe.pop() || (e.expando + "_" + (P++));
			this[t] = !0;
			return t
		}
	});
	e.ajaxPrefilter("json jsonp", function (i, r, o) {
		var s, l, a, u = i.jsonp !== !1 && (B.test(i.url) ? "url" : typeof i.data === "string" && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && B.test(i.data) && "data");
		if (u || i.dataTypes[0] === "jsonp") {
			s = i.jsonpCallback = e.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback;
			if (u) {
				i[u] = i[u].replace(B, "$1" + s)
			} else if (i.jsonp !== !1) {
				i.url += (R.test(i.url) ? "&" : "?") + i.jsonp + "=" + s
			}
			;
			i.converters["script json"] = function () {
				if (!a) {
					e.error(s + " was not called")
				}
				;
				return a[0]
			};
			i.dataTypes[0] = "json";
			l = t[s];
			t[s] = function () {
				a = arguments
			};
			o.always(function () {
				t[s] = l;
				if (i[s]) {
					i.jsonpCallback = r.jsonpCallback;
					oe.push(s)
				}
				;
				if (a && e.isFunction(l)) {
					l(a[0])
				}
				;
				a = l = n
			});
			return "script"
		}
	});
	var b, x, st = 0,
		O = t.ActiveXObject && function () {
				var e;
				for (e in b) {
					b[e](n, !0)
				}
			};

	function Ze() {
		try {
			return new t.XMLHttpRequest()
		} catch (e) {
		}
	};

	function ln() {
		try {
			return new t.ActiveXObject("Microsoft.XMLHTTP")
		} catch (e) {
		}
	};
	e.ajaxSettings.xhr = t.ActiveXObject ? function () {
		return !this.isLocal && Ze() || ln()
	} : Ze;
	x = e.ajaxSettings.xhr();
	e.support.cors = !!x && ("withCredentials" in x);
	x = e.support.ajax = !!x;
	if (x) {
		e.ajaxTransport(function (i) {
			if (!i.crossDomain || e.support.cors) {
				var r;
				return {
					send: function (o, s) {
						var f, u, l = i.xhr();
						if (i.username) {
							l.open(i.type, i.url, i.async, i.username, i.password)
						} else {
							l.open(i.type, i.url, i.async)
						}
						;
						if (i.xhrFields) {
							for (u in i.xhrFields) {
								l[u] = i.xhrFields[u]
							}
						}
						;
						if (i.mimeType && l.overrideMimeType) {
							l.overrideMimeType(i.mimeType)
						}
						;
						if (!i.crossDomain && !o["X-Requested-With"]) {
							o["X-Requested-With"] = "XMLHttpRequest"
						}
						;
						try {
							for (u in o) {
								l.setRequestHeader(u, o[u])
							}
						} catch (a) {
						}
						;
						l.send((i.hasContent && i.data) || null);
						r = function (t, o) {
							var u, d, p, c;
							try {
								if (r && (o || l.readyState === 4)) {
									r = n;
									if (f) {
										l.onreadystatechange = e.noop;
										if (O) {
											delete b[f]
										}
									}
									;
									if (o) {
										if (l.readyState !== 4) {
											l.abort()
										}
									} else {
										c = {};
										u = l.status;
										d = l.getAllResponseHeaders();
										if (typeof l.responseText === "string") {
											c.text = l.responseText
										}
										;
										try {
											p = l.statusText
										} catch (a) {
											p = ""
										}
										;
										if (!u && i.isLocal && !i.crossDomain) {
											u = c.text ? 200 : 404
										} else if (u === 1223) {
											u = 204
										}
									}
								}
							} catch (a) {
								if (!o) {
									s(-1, a)
								}
							}
							;
							if (c) {
								s(u, p, c, d)
							}
						};
						if (!i.async) {
							r()
						} else if (l.readyState === 4) {
							setTimeout(r)
						} else {
							f = ++st;
							if (O) {
								if (!b) {
									b = {};
									e(t).unload(O)
								}
								;
								b[f] = r
							}
							;
							l.onreadystatechange = r
						}
					},
					abort: function () {
						if (r) {
							r(n, !0)
						}
					}
				}
			}
		})
	}
	;
	var v, A, it = /^(?:toggle|show|hide)$/,
		rt = new RegExp("^(?:([+-])=|)(" + M + ")([a-z%]*)$", "i"),
		ot = /queueHooks$/,
		j = [cn],
		C = {
			"*": [function (t, n) {
				var a, l, i = this.createTween(t, n),
					s = rt.exec(n),
					u = i.cur(),
					r = +u || 0,
					o = 1,
					f = 20;
				if (s) {
					a = +s[2];
					l = s[3] || (e.cssNumber[t] ? "" : "px");
					if (l !== "px" && r) {
						r = e.css(i.elem, t, !0) || a || 1;
						do {
							o = o || ".5";
							r = r / o;
							e.style(i.elem, t, r + l)
						}
						while (o !== (o = i.cur() / u) && o !== 1 && --f);
					}
					;
					i.unit = l;
					i.start = r;
					i.end = s[1] ? r + (s[1] + 1) * a : a
				}
				;
				return i
			}]
		};

	function et() {
		setTimeout(function () {
			v = n
		});
		return (v = e.now())
	};

	function un(t, n) {
		e.each(n, function (e, n) {
			var r = (C[e] || []).concat(C["*"]),
				i = 0,
				o = r.length;
			for (; i < o; i++) {
				if (r[i].call(t, e, n)) {
					return
				}
			}
		})
	};

	function tt(t, n, i) {
		var s, a, l = 0,
			c = j.length,
			o = e.Deferred().always(function () {
				delete f.elem
			}),
			f = function () {
				if (a) {
					return !1
				}
				;
				var l = v || et(),
					e = Math.max(0, r.startTime + r.duration - l),
					u = e / r.duration || 0,
					n = 1 - u,
					i = 0,
					s = r.tweens.length;
				for (; i < s; i++) {
					r.tweens[i].run(n)
				}
				;
				o.notifyWith(t, [r, n, e]);
				if (n < 1 && s) {
					return e
				} else {
					o.resolveWith(t, [r]);
					return !1
				}
			},
			r = o.promise({
				elem: t,
				props: e.extend({}, n),
				opts: e.extend(!0, {
					specialEasing: {}
				}, i),
				originalProperties: n,
				originalOptions: i,
				startTime: v || et(),
				duration: i.duration,
				tweens: [],
				createTween: function (n, i) {
					var o = e.Tween(t, r.opts, n, i, r.opts.specialEasing[n] || r.opts.easing);
					r.tweens.push(o);
					return o
				},
				stop: function (e) {
					var n = 0,
						i = e ? r.tweens.length : 0;
					if (a) {
						return this
					}
					;
					a = !0;
					for (; n < i; n++) {
						r.tweens[n].run(1)
					}
					;
					if (e) {
						o.resolveWith(t, [r, e])
					} else {
						o.rejectWith(t, [r, e])
					}
					;
					return this
				}
			}),
			u = r.props;
		fn(u, r.opts.specialEasing);
		for (; l < c; l++) {
			s = j[l].call(r, t, u, r.opts);
			if (s) {
				return s
			}
		}
		;
		un(r, u);
		if (e.isFunction(r.opts.start)) {
			r.opts.start.call(t, r)
		}
		;
		e.fx.timer(e.extend(f, {
			elem: t,
			anim: r,
			queue: r.opts.queue
		}));
		return r.progress(r.opts.progress).done(r.opts.done, r.opts.complete).fail(r.opts.fail).always(r.opts.always)
	};

	function fn(t, n) {
		var r, o, i, s, a;
		for (i in t) {
			o = e.camelCase(i);
			s = n[o];
			r = t[i];
			if (e.isArray(r)) {
				s = r[1];
				r = t[i] = r[0]
			}
			;
			if (i !== o) {
				t[o] = r;
				delete t[i]
			}
			;
			a = e.cssHooks[o];
			if (a && "expand" in a) {
				r = a.expand(r);
				delete t[o];
				for (i in r) {
					if (!(i in t)) {
						t[i] = r[i];
						n[i] = s
					}
				}
			} else {
				n[o] = s
			}
		}
	};
	e.Animation = e.extend(tt, {
		tweener: function (t, n) {
			if (e.isFunction(t)) {
				n = t;
				t = ["*"]
			} else {
				t = t.split(" ")
			}
			;
			var i, r = 0,
				o = t.length;
			for (; r < o; r++) {
				i = t[r];
				C[i] = C[i] || [];
				C[i].unshift(n)
			}
		},
		prefilter: function (e, t) {
			if (t) {
				j.unshift(e)
			} else {
				j.push(e)
			}
		}
	});

	function cn(t, n, i) {
		var r, a, d, p, l, h, c, o, y, u = this,
			s = t.style,
			g = {},
			m = [],
			f = t.nodeType && S(t);
		if (!i.queue) {
			o = e._queueHooks(t, "fx");
			if (o.unqueued == null) {
				o.unqueued = 0;
				y = o.empty.fire;
				o.empty.fire = function () {
					if (!o.unqueued) {
						y()
					}
				}
			}
			;
			o.unqueued++;
			u.always(function () {
				u.always(function () {
					o.unqueued--;
					if (!e.queue(t, "fx").length) {
						o.empty.fire()
					}
				})
			})
		}
		;
		if (t.nodeType === 1 && ("height" in n || "width" in n)) {
			i.overflow = [s.overflow, s.overflowX, s.overflowY];
			if (e.css(t, "display") === "inline" && e.css(t, "float") === "none") {
				if (!e.support.inlineBlockNeedsLayout || Je(t.nodeName) === "inline") {
					s.display = "inline-block"
				} else {
					s.zoom = 1
				}
			}
		}
		;
		if (i.overflow) {
			s.overflow = "hidden";
			if (!e.support.shrinkWrapBlocks) {
				u.always(function () {
					s.overflow = i.overflow[0];
					s.overflowX = i.overflow[1];
					s.overflowY = i.overflow[2]
				})
			}
		}
		;
		for (a in n) {
			p = n[a];
			if (it.exec(p)) {
				delete n[a];
				h = h || p === "toggle";
				if (p === (f ? "hide" : "show")) {
					continue
				}
				;
				m.push(a)
			}
		}
		;
		d = m.length;
		if (d) {
			l = e._data(t, "fxshow") || e._data(t, "fxshow", {});
			if ("hidden" in l) {
				f = l.hidden
			}
			;
			if (h) {
				l.hidden = !f
			}
			;
			if (f) {
				e(t).show()
			} else {
				u.done(function () {
					e(t).hide()
				})
			}
			;
			u.done(function () {
				var n;
				e._removeData(t, "fxshow");
				for (n in g) {
					e.style(t, n, g[n])
				}
			});
			for (a = 0; a < d; a++) {
				r = m[a];
				c = u.createTween(r, f ? l[r] : 0);
				g[r] = l[r] || e.style(t, r);
				if (!(r in l)) {
					l[r] = c.start;
					if (f) {
						c.end = c.start;
						c.start = r === "width" || r === "height" ? 1 : 0
					}
				}
			}
		}
	};

	function s(e, t, n, i, r) {
		return new s.prototype.init(e, t, n, i, r)
	};
	e.Tween = s;
	s.prototype = {
		constructor: s,
		init: function (t, n, i, r, o, s) {
			this.elem = t;
			this.prop = i;
			this.easing = o || "swing";
			this.options = n;
			this.start = this.now = this.cur();
			this.end = r;
			this.unit = s || (e.cssNumber[i] ? "" : "px")
		},
		cur: function () {
			var e = s.propHooks[this.prop];
			return e && e.get ? e.get(this) : s.propHooks._default.get(this)
		},
		run: function (t) {
			var n, i = s.propHooks[this.prop];
			if (this.options.duration) {
				this.pos = n = e.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration)
			} else {
				this.pos = n = t
			}
			;
			this.now = (this.end - this.start) * n + this.start;
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this)
			}
			;
			if (i && i.set) {
				i.set(this)
			} else {
				s.propHooks._default.set(this)
			}
			;
			return this
		}
	};
	s.prototype.init.prototype = s.prototype;
	s.propHooks = {
		_default: {
			get: function (t) {
				var n;
				if (t.elem[t.prop] != null && (!t.elem.style || t.elem.style[t.prop] == null)) {
					return t.elem[t.prop]
				}
				;
				n = e.css(t.elem, t.prop, "");
				return !n || n === "auto" ? 0 : n
			},
			set: function (t) {
				if (e.fx.step[t.prop]) {
					e.fx.step[t.prop](t)
				} else if (t.elem.style && (t.elem.style[e.cssProps[t.prop]] != null || e.cssHooks[t.prop])) {
					e.style(t.elem, t.prop, t.now + t.unit)
				} else {
					t.elem[t.prop] = t.now
				}
			}
		}
	};
	s.propHooks.scrollTop = s.propHooks.scrollLeft = {
		set: function (e) {
			if (e.elem.nodeType && e.elem.parentNode) {
				e.elem[e.prop] = e.now
			}
		}
	};
	e.each(["toggle", "show", "hide"], function (t, n) {
		var i = e.fn[n];
		e.fn[n] = function (e, t, r) {
			return e == null || typeof e === "boolean" ? i.apply(this, arguments) : this.animate(F(n, !0), e, t, r)
		}
	});
	e.fn.extend({
		fadeTo: function (e, t, n, i) {
			return this.filter(S).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		animate: function (t, n, i, r) {
			var a = e.isEmptyObject(t),
				s = e.speed(n, i, r),
				o = function () {
					var n = tt(this, e.extend({}, t), s);
					o.finish = function () {
						n.stop(!0)
					};
					if (a || e._data(this, "finish")) {
						n.stop(!0)
					}
				};
			o.finish = o;
			return a || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
		},
		stop: function (t, i, r) {
			var o = function (e) {
				var t = e.stop;
				delete e.stop;
				t(r)
			};
			if (typeof t !== "string") {
				r = i;
				i = t;
				t = n
			}
			;
			if (i && t !== !1) {
				this.queue(t || "fx", [])
			}
			;
			return this.each(function () {
				var a = !0,
					n = t != null && t + "queueHooks",
					s = e.timers,
					i = e._data(this);
				if (n) {
					if (i[n] && i[n].stop) {
						o(i[n])
					}
				} else {
					for (n in i) {
						if (i[n] && i[n].stop && ot.test(n)) {
							o(i[n])
						}
					}
				}
				;
				for (n = s.length; n--;) {
					if (s[n].elem === this && (t == null || s[n].queue === t)) {
						s[n].anim.stop(r);
						a = !1;
						s.splice(n, 1)
					}
				}
				;
				if (a || !r) {
					e.dequeue(this, t)
				}
			})
		},
		finish: function (t) {
			if (t !== !1) {
				t = t || "fx"
			}
			;
			return this.each(function () {
				var n, o = e._data(this),
					i = o[t + "queue"],
					s = o[t + "queueHooks"],
					r = e.timers,
					a = i ? i.length : 0;
				o.finish = !0;
				e.queue(this, t, []);
				if (s && s.cur && s.cur.finish) {
					s.cur.finish.call(this)
				}
				;
				for (n = r.length; n--;) {
					if (r[n].elem === this && r[n].queue === t) {
						r[n].anim.stop(!0);
						r.splice(n, 1)
					}
				}
				;
				for (n = 0; n < a; n++) {
					if (i[n] && i[n].finish) {
						i[n].finish.call(this)
					}
				}
				;
				delete o.finish
			})
		}
	});

	function F(e, t) {
		var i, n = {
				height: e
			},
			r = 0;
		t = t ? 1 : 0;
		for (; r < 4; r += 2 - t) {
			i = g[r];
			n["margin" + i] = n["padding" + i] = e
		}
		;
		if (t) {
			n.opacity = n.width = e
		}
		;
		return n
	};
	e.each({
		slideDown: F("show"),
		slideUp: F("hide"),
		slideToggle: F("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (t, n) {
		e.fn[t] = function (e, t, i) {
			return this.animate(n, e, t, i)
		}
	});
	e.speed = function (t, n, i) {
		var r = t && typeof t === "object" ? e.extend({}, t) : {
			complete: i || !i && n || e.isFunction(t) && t,
			duration: t,
			easing: i && n || n && !e.isFunction(n) && n
		};
		r.duration = e.fx.off ? 0 : typeof r.duration === "number" ? r.duration : r.duration in e.fx.speeds ? e.fx.speeds[r.duration] : e.fx.speeds._default;
		if (r.queue == null || r.queue === !0) {
			r.queue = "fx"
		}
		;
		r.old = r.complete;
		r.complete = function () {
			if (e.isFunction(r.old)) {
				r.old.call(this)
			}
			;
			if (r.queue) {
				e.dequeue(this, r.queue)
			}
		};
		return r
	};
	e.easing = {
		linear: function (e) {
			return e
		},
		swing: function (e) {
			return 0.5 - Math.cos(e * Math.PI) / 2
		}
	};
	e.timers = [];
	e.fx = s.prototype.init;
	e.fx.tick = function () {
		var r, t = e.timers,
			i = 0;
		v = e.now();
		for (; i < t.length; i++) {
			r = t[i];
			if (!r() && t[i] === r) {
				t.splice(i--, 1)
			}
		}
		;
		if (!t.length) {
			e.fx.stop()
		}
		;
		v = n
	};
	e.fx.timer = function (t) {
		if (t() && e.timers.push(t)) {
			e.fx.start()
		}
	};
	e.fx.interval = 13;
	e.fx.start = function () {
		if (!A) {
			A = setInterval(e.fx.tick, e.fx.interval)
		}
	};
	e.fx.stop = function () {
		clearInterval(A);
		A = null
	};
	e.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	e.fx.step = {};
	if (e.expr && e.expr.filters) {
		e.expr.filters.animated = function (t) {
			return e.grep(e.timers, function (e) {
				return t === e.elem
			}).length
		}
	}
	;
	e.fn.offset = function (t) {
		if (arguments.length) {
			return t === n ? this : this.each(function (n) {
				e.offset.setOffset(this, t, n)
			})
		}
		;
		var i, s, o = {
				top: 0,
				left: 0
			},
			r = this[0],
			a = r && r.ownerDocument;
		if (!a) {
			return
		}
		;
		i = a.documentElement;
		if (!e.contains(i, r)) {
			return o
		}
		;
		if (typeof r.getBoundingClientRect !== l) {
			o = r.getBoundingClientRect()
		}
		;
		s = nt(a);
		return {
			top: o.top + (s.pageYOffset || i.scrollTop) - (i.clientTop || 0),
			left: o.left + (s.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
		}
	};
	e.offset = {
		setOffset: function (t, n, i) {
			var f = e.css(t, "position");
			if (f === "static") {
				t.style.position = "relative"
			}
			;
			var o = e(t),
				s = o.offset(),
				c = e.css(t, "top"),
				p = e.css(t, "left"),
				d = (f === "absolute" || f === "fixed") && e.inArray("auto", [c, p]) > -1,
				r = {},
				a = {},
				l, u;
			if (d) {
				a = o.position();
				l = a.top;
				u = a.left
			} else {
				l = parseFloat(c) || 0;
				u = parseFloat(p) || 0
			}
			;
			if (e.isFunction(n)) {
				n = n.call(t, i, s)
			}
			;
			if (n.top != null) {
				r.top = (n.top - s.top) + l
			}
			;
			if (n.left != null) {
				r.left = (n.left - s.left) + u
			}
			;
			if ("using" in n) {
				n.using.call(t, r)
			} else {
				o.css(r)
			}
		}
	};
	e.fn.extend({
		position: function () {
			if (!this[0]) {
				return
			}
			;
			var t, i, n = {
					top: 0,
					left: 0
				},
				r = this[0];
			if (e.css(r, "position") === "fixed") {
				i = r.getBoundingClientRect()
			} else {
				t = this.offsetParent();
				i = this.offset();
				if (!e.nodeName(t[0], "html")) {
					n = t.offset()
				}
				;
				n.top += e.css(t[0], "borderTopWidth", !0);
				n.left += e.css(t[0], "borderLeftWidth", !0)
			}
			;
			return {
				top: i.top - n.top - e.css(r, "marginTop", !0),
				left: i.left - n.left - e.css(r, "marginLeft", !0)
			}
		},
		offsetParent: function () {
			return this.map(function () {
				var t = this.offsetParent || i.documentElement;
				while (t && (!e.nodeName(t, "html") && e.css(t, "position") === "static")) {
					t = t.offsetParent
				}
				;
				return t || i.documentElement
			})
		}
	});
	e.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (t, i) {
		var r = /Y/.test(i);
		e.fn[t] = function (o) {
			return e.access(this, function (t, o, s) {
				var a = nt(t);
				if (s === n) {
					return a ? (i in a) ? a[i] : a.document.documentElement[o] : t[o]
				}
				;
				if (a) {
					a.scrollTo(!r ? s : e(a).scrollLeft(), r ? s : e(a).scrollTop())
				} else {
					t[o] = s
				}
			}, t, o, arguments.length, null)
		}
	});

	function nt(t) {
		return e.isWindow(t) ? t : t.nodeType === 9 ? t.defaultView || t.parentWindow : !1
	};
	e.each({
		Height: "height",
		Width: "width"
	}, function (t, i) {
		e.each({
			padding: "inner" + t,
			content: i,
			"": "outer" + t
		}, function (r, o) {
			e.fn[o] = function (o, s) {
				var a = arguments.length && (r || typeof o !== "boolean"),
					l = r || (o === !0 || s === !0 ? "margin" : "border");
				return e.access(this, function (i, r, o) {
					var s;
					if (e.isWindow(i)) {
						return i.document.documentElement["client" + t]
					}
					;
					if (i.nodeType === 9) {
						s = i.documentElement;
						return Math.max(i.body["scroll" + t], s["scroll" + t], i.body["offset" + t], s["offset" + t], s["client" + t])
					}
					;
					return o === n ? e.css(i, r, l) : e.style(i, r, o, l)
				}, i, a ? o : n, a, null)
			}
		})
	});
	t.jQuery = t.$ = e;
	if (typeof define === "function" && define.amd && define.amd.jQuery) {
		define("jquery", [], function () {
			return e
		})
	}
})(window);
