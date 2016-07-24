
(function (i, e, n) {
	var a = i.L,
		t = {};
	t.version = '0.7.7';
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = t
	} else if (typeof define === 'function' && define.amd) {
		define(t)
	}
	;
	t.noConflict = function () {
		i.L = a;
		return this
	};
	i.L = t;
	t.Util = {
		extend: function (t) {
			var o = Array.prototype.slice.call(arguments, 1),
				i, e, s, n;
			for (e = 0, s = o.length; e < s; e++) {
				n = o[e] || {};
				for (i in n) {
					if (n.hasOwnProperty(i)) {
						t[i] = n[i]
					}
				}
			}
			;
			return t
		},
		bind: function (t, i) {
			var e = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
			return function () {
				return t.apply(i, e || arguments)
			}
		},
		stamp: (function () {
			var i = 0,
				t = '_leaflet_id';
			return function (e) {
				e[t] = e[t] || ++i;
				return e[t]
			}
		}()),
		invokeEach: function (t, i, e) {
			var n, o;
			if (typeof t === 'object') {
				o = Array.prototype.slice.call(arguments, 3);
				for (n in t) {
					i.apply(e, [n, t[n]].concat(o))
				}
				;
				return !0
			}
			;
			return !1
		},
		limitExecByInterval: function (t, i, e) {
			var n, o;
			return function s() {
				var a = arguments;
				if (n) {
					o = !0;
					return
				}
				;
				n = !0;
				setTimeout(function () {
					n = !1;
					if (o) {
						s.apply(e, a);
						o = !1
					}
				}, i);
				t.apply(e, a)
			}
		},
		falseFn: function () {
			return !1
		},
		formatNum: function (t, i) {
			var e = Math.pow(10, i || 5);
			return Math.round(t * e) / e
		},
		trim: function (t) {
			return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
		},
		splitWords: function (i) {
			return t.Util.trim(i).split(/\s+/)
		},
		setOptions: function (i, e) {
			i.options = t.extend({}, i.options, e);
			return i.options
		},
		getParamString: function (t, i, e) {
			var o = [];
			for (var n in t) {
				o.push(encodeURIComponent(e ? n.toUpperCase() : n) + '=' + encodeURIComponent(t[n]))
			}
			;
			return ((!i || i.indexOf('?') === -1) ? '?' : '&') + o.join('&')
		},
		template: function (t, i) {
			return t.replace(/\{ *([\w_]+) *\}/g, function (t, e) {
				var o = i[e];
				if (o === n) {
					throw new Error('No value provided for variable ' + t)
				} else if (typeof o === 'function') {
					o = o(i)
				}
				;
				return o
			})
		},
		isArray: Array.isArray || function (t) {
			return (Object.prototype.toString.call(t) === '[object Array]')
		},
		emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
	};
	(function () {
		function e(t) {
			var e, n, o = ['webkit', 'moz', 'o', 'ms'];
			for (e = 0; e < o.length && !n; e++) {
				n = i[o[e] + t]
			}
			;
			return n
		};
		var o = 0;

		function s(t) {
			var e = +new Date(),
				n = Math.max(0, 16 - (e - o));
			o = e + n;
			return i.setTimeout(t, n)
		};
		var n = i.requestAnimationFrame || e('RequestAnimationFrame') || s,
			a = i.cancelAnimationFrame || e('CancelAnimationFrame') || e('CancelRequestAnimationFrame') || function (t) {
					i.clearTimeout(t)
				};
		t.Util.requestAnimFrame = function (e, o, a, r) {
			e = t.bind(e, o);
			if (a && n === s) {
				e()
			} else {
				return n.call(i, e, r)
			}
		};
		t.Util.cancelAnimFrame = function (t) {
			if (t) {
				a.call(i, t)
			}
		}
	}());
	t.extend = t.Util.extend;
	t.bind = t.Util.bind;
	t.stamp = t.Util.stamp;
	t.setOptions = t.Util.setOptions;
	t.Class = function () {
	};
	t.Class.extend = function (i) {
		var n = function () {
				if (this.initialize) {
					this.initialize.apply(this, arguments)
				}
				;
				if (this._initHooks) {
					this.callInitHooks()
				}
			},
			a = function () {
			};
		a.prototype = this.prototype;
		var e = new a();
		e.constructor = n;
		n.prototype = e;
		for (var o in this) {
			if (this.hasOwnProperty(o) && o !== 'prototype') {
				n[o] = this[o]
			}
		}
		;
		if (i.statics) {
			t.extend(n, i.statics);
			delete i.statics
		}
		;
		if (i.includes) {
			t.Util.extend.apply(null, [e].concat(i.includes));
			delete i.includes
		}
		;
		if (i.options && e.options) {
			i.options = t.extend({}, e.options, i.options)
		}
		;
		t.extend(e, i);
		e._initHooks = [];
		var s = this;
		n.__super__ = s.prototype;
		e.callInitHooks = function () {
			if (this._initHooksCalled) {
				return
			}
			;
			if (s.prototype.callInitHooks) {
				s.prototype.callInitHooks.call(this)
			}
			;
			this._initHooksCalled = !0;
			for (var t = 0, i = e._initHooks.length; t < i; t++) {
				e._initHooks[t].call(this)
			}
		};
		return n
	};
	t.Class.include = function (i) {
		t.extend(this.prototype, i)
	};
	t.Class.mergeOptions = function (i) {
		t.extend(this.prototype.options, i)
	};
	t.Class.addInitHook = function (t) {
		var i = Array.prototype.slice.call(arguments, 1),
			e = typeof t === 'function' ? t : function () {
				this[t].apply(this, i)
			};
		this.prototype._initHooks = this.prototype._initHooks || [];
		this.prototype._initHooks.push(e)
	};
	var o = '_leaflet_events';
	t.Mixin = {};
	t.Mixin.Events = {
		addEventListener: function (i, e, n) {
			if (t.Util.invokeEach(i, this.addEventListener, this, e, n)) {
				return this
			}
			;
			var s = this[o] = this[o] || {},
				r = n && n !== this && t.stamp(n),
				h, p, c, a, l, f, u;
			i = t.Util.splitWords(i);
			for (h = 0, p = i.length; h < p; h++) {
				c = {
					action: e,
					context: n || this
				};
				a = i[h];
				if (r) {
					l = a + '_idx';
					f = l + '_len';
					u = s[l] = s[l] || {};
					if (!u[r]) {
						u[r] = [];
						s[f] = (s[f] || 0) + 1
					}
					;
					u[r].push(c)
				} else {
					s[a] = s[a] || [];
					s[a].push(c)
				}
			}
			;
			return this
		},
		hasEventListeners: function (t) {
			var i = this[o];
			return !!i && ((t in i && i[t].length > 0) || (t + '_idx' in i && i[t + '_idx_len'] > 0))
		},
		removeEventListener: function (i, e, n) {
			if (!this[o]) {
				return this
			}
			;
			if (!i) {
				return this.clearAllEventListeners()
			}
			;
			if (t.Util.invokeEach(i, this.removeEventListener, this, e, n)) {
				return this
			}
			;
			var a = this[o],
				f = n && n !== this && t.stamp(n),
				l, d, u, s, r, c, p, h, m;
			i = t.Util.splitWords(i);
			for (l = 0, d = i.length; l < d; l++) {
				u = i[l];
				c = u + '_idx';
				p = c + '_len';
				h = a[c];
				if (!e) {
					delete a[u];
					delete a[c];
					delete a[p]
				} else {
					s = f && h ? h[f] : a[u];
					if (s) {
						for (r = s.length - 1; r >= 0; r--) {
							if ((s[r].action === e) && (!n || (s[r].context === n))) {
								m = s.splice(r, 1);
								m[0].action = t.Util.falseFn
							}
						}
						;
						if (n && h && (s.length === 0)) {
							delete h[f];
							a[p]--
						}
					}
				}
			}
			;
			return this
		},
		clearAllEventListeners: function () {
			delete this[o];
			return this
		},
		fireEvent: function (i, e) {
			if (!this.hasEventListeners(i)) {
				return this
			}
			;
			var u = t.Util.extend({}, e, {
				type: i,
				target: this
			});
			var r = this[o],
				s, n, a, h, l;
			if (r[i]) {
				s = r[i].slice();
				for (n = 0, a = s.length; n < a; n++) {
					s[n].action.call(s[n].context, u)
				}
			}
			;
			h = r[i + '_idx'];
			for (l in h) {
				s = h[l].slice();
				if (s) {
					for (n = 0, a = s.length; n < a; n++) {
						s[n].action.call(s[n].context, u)
					}
				}
			}
			;
			return this
		},
		addOneTimeEventListener: function (i, e, n) {
			if (t.Util.invokeEach(i, this.addOneTimeEventListener, this, e, n)) {
				return this
			}
			;
			var o = t.bind(function () {
				this.removeEventListener(i, e, n).removeEventListener(i, o, n)
			}, this);
			return this.addEventListener(i, e, n).addEventListener(i, o, n)
		}
	};
	t.Mixin.Events.on = t.Mixin.Events.addEventListener;
	t.Mixin.Events.off = t.Mixin.Events.removeEventListener;
	t.Mixin.Events.once = t.Mixin.Events.addOneTimeEventListener;
	t.Mixin.Events.fire = t.Mixin.Events.fireEvent;
	(function () {
		var s = 'ActiveXObject' in i,
			v = s && !e.addEventListener,
			o = navigator.userAgent.toLowerCase(),
			r = o.indexOf('webkit') !== -1,
			y = o.indexOf('chrome') !== -1,
			u = o.indexOf('phantom') !== -1,
			P = o.indexOf('android') !== -1,
			c = o.search('android [23]') !== -1,
			L = o.indexOf('gecko') !== -1,
			a = typeof orientation !== n + '',
			f = !i.PointerEvent && i.MSPointerEvent,
			p = (i.PointerEvent && i.navigator.pointerEnabled) || f,
			x = ('devicePixelRatio' in i && i.devicePixelRatio > 1) || ('matchMedia' in i && i.matchMedia('(min-resolution:144dpi)') && i.matchMedia('(min-resolution:144dpi)').matches),
			h = e.documentElement,
			d = s && ('transition' in h.style),
			l = ('WebKitCSSMatrix' in i) && ('m11' in new i.WebKitCSSMatrix()) && !c,
			m = 'MozPerspective' in h.style,
			g = 'OTransition' in h.style,
			w = !i.L_DISABLE_3D && (d || l || m || g) && !u,
			T = !i.L_NO_TOUCH && !u && (p || 'ontouchstart' in i || (i.DocumentTouch && e instanceof i.DocumentTouch));
		t.Browser = {
			ie: s,
			ielt9: v,
			webkit: r,
			gecko: L && !r && !i.opera && !s,
			android: P,
			android23: c,
			chrome: y,
			ie3d: d,
			webkit3d: l,
			gecko3d: m,
			opera3d: g,
			any3d: w,
			mobile: a,
			mobileWebkit: a && r,
			mobileWebkit3d: a && l,
			mobileOpera: a && i.opera,
			touch: T,
			msPointer: f,
			pointer: p,
			retina: x
		}
	}());
	t.Point = function (t, i, e) {
		this.x = (e ? Math.round(t) : t);
		this.y = (e ? Math.round(i) : i)
	};
	t.Point.prototype = {
		clone: function () {
			return new t.Point(this.x, this.y)
		},
		add: function (i) {
			return this.clone()._add(t.point(i))
		},
		_add: function (t) {
			this.x += t.x;
			this.y += t.y;
			return this
		},
		subtract: function (i) {
			return this.clone()._subtract(t.point(i))
		},
		_subtract: function (t) {
			this.x -= t.x;
			this.y -= t.y;
			return this
		},
		divideBy: function (t) {
			return this.clone()._divideBy(t)
		},
		_divideBy: function (t) {
			this.x /= t;
			this.y /= t;
			return this
		},
		multiplyBy: function (t) {
			return this.clone()._multiplyBy(t)
		},
		_multiplyBy: function (t) {
			this.x *= t;
			this.y *= t;
			return this
		},
		round: function () {
			return this.clone()._round()
		},
		_round: function () {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			return this
		},
		floor: function () {
			return this.clone()._floor()
		},
		_floor: function () {
			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			return this
		},
		distanceTo: function (i) {
			i = t.point(i);
			var e = i.x - this.x,
				n = i.y - this.y;
			return Math.sqrt(e * e + n * n)
		},
		equals: function (i) {
			i = t.point(i);
			return i.x === this.x && i.y === this.y
		},
		contains: function (i) {
			i = t.point(i);
			return Math.abs(i.x) <= Math.abs(this.x) && Math.abs(i.y) <= Math.abs(this.y)
		},
		toString: function () {
			return 'Point(' + t.Util.formatNum(this.x) + ', ' + t.Util.formatNum(this.y) + ')'
		}
	};
	t.point = function (i, e, o) {
		if (i instanceof t.Point) {
			return i
		}
		;
		if (t.Util.isArray(i)) {
			return new t.Point(i[0], i[1])
		}
		;
		if (i === n || i === null) {
			return i
		}
		;
		return new t.Point(i, e, o)
	};
	t.Bounds = function (t, i) {
		if (!t) {
			return
		}
		;
		var n = i ? [t, i] : t;
		for (var e = 0, o = n.length; e < o; e++) {
			this.extend(n[e])
		}
	};
	t.Bounds.prototype = {
		extend: function (i) {
			i = t.point(i);
			if (!this.min && !this.max) {
				this.min = i.clone();
				this.max = i.clone()
			} else {
				this.min.x = Math.min(i.x, this.min.x);
				this.max.x = Math.max(i.x, this.max.x);
				this.min.y = Math.min(i.y, this.min.y);
				this.max.y = Math.max(i.y, this.max.y)
			}
			;
			return this
		},
		getCenter: function (i) {
			return new t.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, i)
		},
		getBottomLeft: function () {
			return new t.Point(this.min.x, this.max.y)
		},
		getTopRight: function () {
			return new t.Point(this.max.x, this.min.y)
		},
		getSize: function () {
			return this.max.subtract(this.min)
		},
		contains: function (i) {
			var e, n;
			if (typeof i[0] === 'number' || i instanceof t.Point) {
				i = t.point(i)
			} else {
				i = t.bounds(i)
			}
			;
			if (i instanceof t.Bounds) {
				e = i.min;
				n = i.max
			} else {
				e = n = i
			}
			;
			return (e.x >= this.min.x) && (n.x <= this.max.x) && (e.y >= this.min.y) && (n.y <= this.max.y)
		},
		intersects: function (i) {
			i = t.bounds(i);
			var e = this.min,
				n = this.max,
				o = i.min,
				s = i.max,
				a = (s.x >= e.x) && (o.x <= n.x),
				r = (s.y >= e.y) && (o.y <= n.y);
			return a && r
		},
		isValid: function () {
			return !!(this.min && this.max)
		}
	};
	t.bounds = function (i, e) {
		if (!i || i instanceof t.Bounds) {
			return i
		}
		;
		return new t.Bounds(i, e)
	};
	t.Transformation = function (t, i, e, n) {
		this._a = t;
		this._b = i;
		this._c = e;
		this._d = n
	};
	t.Transformation.prototype = {
		transform: function (t, i) {
			return this._transform(t.clone(), i)
		},
		_transform: function (t, i) {
			i = i || 1;
			t.x = i * (this._a * t.x + this._b);
			t.y = i * (this._c * t.y + this._d);
			return t
		},
		untransform: function (i, e) {
			e = e || 1;
			return new t.Point((i.x / e - this._b) / this._a, (i.y / e - this._d) / this._c)
		}
	};
	t.DomUtil = {
		get: function (t) {
			return (typeof t === 'string' ? e.getElementById(t) : t)
		},
		getStyle: function (t, i) {
			var n = t.style[i];
			if (!n && t.currentStyle) {
				n = t.currentStyle[i]
			}
			;
			if ((!n || n === 'auto') && e.defaultView) {
				var o = e.defaultView.getComputedStyle(t, null);
				n = o ? o[i] : null
			}
			;
			return n === 'auto' ? null : n
		},
		getViewportOffset: function (i) {
			var o = 0,
				s = 0,
				n = i,
				a = e.body,
				h = e.documentElement,
				r;
			do {
				o += n.offsetTop || 0;
				s += n.offsetLeft || 0;
				o += parseInt(t.DomUtil.getStyle(n, 'borderTopWidth'), 10) || 0;
				s += parseInt(t.DomUtil.getStyle(n, 'borderLeftWidth'), 10) || 0;
				r = t.DomUtil.getStyle(n, 'position');
				if (n.offsetParent === a && r === 'absolute') {
					break
				}
				;
				if (r === 'fixed') {
					o += a.scrollTop || h.scrollTop || 0;
					s += a.scrollLeft || h.scrollLeft || 0;
					break
				}
				;
				if (r === 'relative' && !n.offsetLeft) {
					var u = t.DomUtil.getStyle(n, 'width'),
						c = t.DomUtil.getStyle(n, 'max-width'),
						l = n.getBoundingClientRect();
					if (u !== 'none' || c !== 'none') {
						s += l.left + n.clientLeft
					}
					;
					o += l.top + (a.scrollTop || h.scrollTop || 0);
					break
				}
				;
				n = n.offsetParent
			}
			while (n);
			n = i;
			do {
				if (n === a) {
					break
				}
				;
				o -= n.scrollTop || 0;
				s -= n.scrollLeft || 0;
				n = n.parentNode
			}
			while (n);
			return new t.Point(s, o)
		},
		documentIsLtr: function () {
			if (!t.DomUtil._docIsLtrCached) {
				t.DomUtil._docIsLtrCached = !0;
				t.DomUtil._docIsLtr = t.DomUtil.getStyle(e.body, 'direction') === 'ltr'
			}
			;
			return t.DomUtil._docIsLtr
		},
		create: function (t, i, n) {
			var o = e.createElement(t);
			o.className = i;
			if (n) {
				n.appendChild(o)
			}
			;
			return o
		},
		hasClass: function (i, e) {
			if (i.classList !== n) {
				return i.classList.contains(e)
			}
			;
			var o = t.DomUtil._getClass(i);
			return o.length > 0 && new RegExp('(^|\\s)' + e + '(\\s|$)').test(o)
		},
		addClass: function (i, e) {
			if (i.classList !== n) {
				var a = t.Util.splitWords(e);
				for (var o = 0, r = a.length; o < r; o++) {
					i.classList.add(a[o])
				}
			} else if (!t.DomUtil.hasClass(i, e)) {
				var s = t.DomUtil._getClass(i);
				t.DomUtil._setClass(i, (s ? s + ' ' : '') + e)
			}
		},
		removeClass: function (i, e) {
			if (i.classList !== n) {
				i.classList.remove(e)
			} else {
				t.DomUtil._setClass(i, t.Util.trim((' ' + t.DomUtil._getClass(i) + ' ').replace(' ' + e + ' ', ' ')))
			}
		},
		_setClass: function (t, i) {
			if (t.className.baseVal === n) {
				t.className = i
			} else {
				t.className.baseVal = i
			}
		},
		_getClass: function (t) {
			return t.className.baseVal === n ? t.className : t.className.baseVal
		},
		setOpacity: function (t, i) {
			if ('opacity' in t.style) {
				t.style.opacity = i
			} else if ('filter' in t.style) {
				var e = !1,
					o = 'DXImageTransform.Microsoft.Alpha';
				try {
					e = t.filters.item(o)
				} catch (n) {
					if (i === 1) {
						return
					}
				}
				;
				i = Math.round(i * 100);
				if (e) {
					e.Enabled = (i !== 100);
					e.Opacity = i
				} else {
					t.style.filter += ' progid:' + o + '(opacity=' + i + ')'
				}
			}
		},
		testProp: function (t) {
			var n = e.documentElement.style;
			for (var i = 0; i < t.length; i++) {
				if (t[i] in n) {
					return t[i]
				}
			}
			;
			return !1
		},
		getTranslateString: function (i) {
			var e = t.Browser.webkit3d,
				n = 'translate' + (e ? '3d' : '') + '(',
				o = (e ? ',0' : '') + ')';
			return n + i.x + 'px,' + i.y + 'px' + o
		},
		getScaleString: function (i, e) {
			var n = t.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * i))),
				o = ' scale(' + i + ') ';
			return n + o
		},
		setPosition: function (i, e, n) {
			i._leaflet_pos = e;
			if (!n && t.Browser.any3d) {
				i.style[t.DomUtil.TRANSFORM] = t.DomUtil.getTranslateString(e)
			} else {
				i.style.left = e.x + 'px';
				i.style.top = e.y + 'px'
			}
		},
		getPosition: function (t) {
			return t._leaflet_pos
		}
	};
	t.DomUtil.TRANSFORM = t.DomUtil.testProp(['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);
	t.DomUtil.TRANSITION = t.DomUtil.testProp(['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);
	t.DomUtil.TRANSITION_END = t.DomUtil.TRANSITION === 'webkitTransition' || t.DomUtil.TRANSITION === 'OTransition' ? t.DomUtil.TRANSITION + 'End' : 'transitionend';
	(function () {
		if ('onselectstart' in e) {
			t.extend(t.DomUtil, {
				disableTextSelection: function () {
					t.DomEvent.on(i, 'selectstart', t.DomEvent.preventDefault)
				},
				enableTextSelection: function () {
					t.DomEvent.off(i, 'selectstart', t.DomEvent.preventDefault)
				}
			})
		} else {
			var n = t.DomUtil.testProp(['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);
			t.extend(t.DomUtil, {
				disableTextSelection: function () {
					if (n) {
						var t = e.documentElement.style;
						this._userSelect = t[n];
						t[n] = 'none'
					}
				},
				enableTextSelection: function () {
					if (n) {
						e.documentElement.style[n] = this._userSelect;
						delete this._userSelect
					}
				}
			})
		}
		;
		t.extend(t.DomUtil, {
			disableImageDrag: function () {
				t.DomEvent.on(i, 'dragstart', t.DomEvent.preventDefault)
			},
			enableImageDrag: function () {
				t.DomEvent.off(i, 'dragstart', t.DomEvent.preventDefault)
			}
		})
	})();
	t.LatLng = function (t, i, e) {
		t = parseFloat(t);
		i = parseFloat(i);
		if (isNaN(t) || isNaN(i)) {
			throw new Error('Invalid LatLng object: (' + t + ', ' + i + ')')
		}
		;
		this.lat = t;
		this.lng = i;
		if (e !== n) {
			this.alt = parseFloat(e)
		}
	};
	t.extend(t.LatLng, {
		DEG_TO_RAD: Math.PI / 180,
		RAD_TO_DEG: 180 / Math.PI,
		MAX_MARGIN: 1.0E-9
	});
	t.LatLng.prototype = {
		equals: function (i) {
			if (!i) {
				return !1
			}
			;
			i = t.latLng(i);
			var e = Math.max(Math.abs(this.lat - i.lat), Math.abs(this.lng - i.lng));
			return e <= t.LatLng.MAX_MARGIN
		},
		toString: function (i) {
			return 'LatLng(' + t.Util.formatNum(this.lat, i) + ', ' + t.Util.formatNum(this.lng, i) + ')'
		},
		distanceTo: function (i) {
			i = t.latLng(i);
			var a = 6378137,
				e = t.LatLng.DEG_TO_RAD,
				r = (i.lat - this.lat) * e,
				h = (i.lng - this.lng) * e,
				l = this.lat * e,
				u = i.lat * e,
				n = Math.sin(r / 2),
				o = Math.sin(h / 2),
				s = n * n + o * o * Math.cos(l) * Math.cos(u);
			return a * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s))
		},
		wrap: function (i, e) {
			var n = this.lng;
			i = i || -180;
			e = e || 180;
			n = (n + e) % (e - i) + (n < i || n === e ? e : i);
			return new t.LatLng(this.lat, n)
		}
	};
	t.latLng = function (i, e) {
		if (i instanceof t.LatLng) {
			return i
		}
		;
		if (t.Util.isArray(i)) {
			if (typeof i[0] === 'number' || typeof i[0] === 'string') {
				return new t.LatLng(i[0], i[1], i[2])
			} else {
				return null
			}
		}
		;
		if (i === n || i === null) {
			return i
		}
		;
		if (typeof i === 'object' && 'lat' in i) {
			return new t.LatLng(i.lat, 'lng' in i ? i.lng : i.lon)
		}
		;
		if (e === n) {
			return null
		}
		;
		return new t.LatLng(i, e)
	};
	t.LatLngBounds = function (t, i) {
		if (!t) {
			return
		}
		;
		var n = i ? [t, i] : t;
		for (var e = 0, o = n.length; e < o; e++) {
			this.extend(n[e])
		}
	};
	t.LatLngBounds.prototype = {
		extend: function (i) {
			if (!i) {
				return this
			}
			;
			var e = t.latLng(i);
			if (e !== null) {
				i = e
			} else {
				i = t.latLngBounds(i)
			}
			;
			if (i instanceof t.LatLng) {
				if (!this._southWest && !this._northEast) {
					this._southWest = new t.LatLng(i.lat, i.lng);
					this._northEast = new t.LatLng(i.lat, i.lng)
				} else {
					this._southWest.lat = Math.min(i.lat, this._southWest.lat);
					this._southWest.lng = Math.min(i.lng, this._southWest.lng);
					this._northEast.lat = Math.max(i.lat, this._northEast.lat);
					this._northEast.lng = Math.max(i.lng, this._northEast.lng)
				}
			} else if (i instanceof t.LatLngBounds) {
				this.extend(i._southWest);
				this.extend(i._northEast)
			}
			;
			return this
		},
		pad: function (i) {
			var e = this._southWest,
				n = this._northEast,
				o = Math.abs(e.lat - n.lat) * i,
				s = Math.abs(e.lng - n.lng) * i;
			return new t.LatLngBounds(new t.LatLng(e.lat - o, e.lng - s), new t.LatLng(n.lat + o, n.lng + s))
		},
		getCenter: function () {
			return new t.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
		},
		getSouthWest: function () {
			return this._southWest
		},
		getNorthEast: function () {
			return this._northEast
		},
		getNorthWest: function () {
			return new t.LatLng(this.getNorth(), this.getWest())
		},
		getSouthEast: function () {
			return new t.LatLng(this.getSouth(), this.getEast())
		},
		getWest: function () {
			return this._southWest.lng
		},
		getSouth: function () {
			return this._southWest.lat
		},
		getEast: function () {
			return this._northEast.lng
		},
		getNorth: function () {
			return this._northEast.lat
		},
		contains: function (i) {
			if (typeof i[0] === 'number' || i instanceof t.LatLng) {
				i = t.latLng(i)
			} else {
				i = t.latLngBounds(i)
			}
			;
			var o = this._southWest,
				s = this._northEast,
				e, n;
			if (i instanceof t.LatLngBounds) {
				e = i.getSouthWest();
				n = i.getNorthEast()
			} else {
				e = n = i
			}
			;
			return (e.lat >= o.lat) && (n.lat <= s.lat) && (e.lng >= o.lng) && (n.lng <= s.lng)
		},
		intersects: function (i) {
			i = t.latLngBounds(i);
			var e = this._southWest,
				n = this._northEast,
				o = i.getSouthWest(),
				s = i.getNorthEast(),
				a = (s.lat >= e.lat) && (o.lat <= n.lat),
				r = (s.lng >= e.lng) && (o.lng <= n.lng);
			return a && r
		},
		toBBoxString: function () {
			return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',')
		},
		equals: function (i) {
			if (!i) {
				return !1
			}
			;
			i = t.latLngBounds(i);
			return this._southWest.equals(i.getSouthWest()) && this._northEast.equals(i.getNorthEast())
		},
		isValid: function () {
			return !!(this._southWest && this._northEast)
		}
	};
	t.latLngBounds = function (i, e) {
		if (!i || i instanceof t.LatLngBounds) {
			return i
		}
		;
		return new t.LatLngBounds(i, e)
	};
	t.Projection = {};
	t.Projection.SphericalMercator = {
		MAX_LATITUDE: 85.0511287798,
		project: function (i) {
			var n = t.LatLng.DEG_TO_RAD,
				o = this.MAX_LATITUDE,
				s = Math.max(Math.min(o, i.lat), -o),
				a = i.lng * n,
				e = s * n;
			e = Math.log(Math.tan((Math.PI / 4) + (e / 2)));
			return new t.Point(a, e)
		},
		unproject: function (i) {
			var e = t.LatLng.RAD_TO_DEG,
				n = i.x * e,
				o = (2 * Math.atan(Math.exp(i.y)) - (Math.PI / 2)) * e;
			return new t.LatLng(o, n)
		}
	};
	t.Projection.LonLat = {
		project: function (i) {
			return new t.Point(i.lng, i.lat)
		},
		unproject: function (i) {
			return new t.LatLng(i.y, i.x)
		}
	};
	t.CRS = {
		latLngToPoint: function (t, i) {
			var e = this.projection.project(t),
				n = this.scale(i);
			return this.transformation._transform(e, n)
		},
		pointToLatLng: function (t, i) {
			var e = this.scale(i),
				n = this.transformation.untransform(t, e);
			return this.projection.unproject(n)
		},
		project: function (t) {
			return this.projection.project(t)
		},
		scale: function (t) {
			return 256 * Math.pow(2, t)
		},
		getSize: function (i) {
			var e = this.scale(i);
			return t.point(e, e)
		}
	};
	t.CRS.Simple = t.extend({}, t.CRS, {
		projection: t.Projection.LonLat,
		transformation: new t.Transformation(1, 0, -1, 0),
		scale: function (t) {
			return Math.pow(2, t)
		}
	});
	t.CRS.EPSG3857 = t.extend({}, t.CRS, {
		code: 'EPSG:3857',
		projection: t.Projection.SphericalMercator,
		transformation: new t.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),
		project: function (t) {
			var i = this.projection.project(t),
				e = 6378137;
			return i.multiplyBy(e)
		}
	});
	t.CRS.EPSG900913 = t.extend({}, t.CRS.EPSG3857, {
		code: 'EPSG:900913'
	});
	t.CRS.EPSG4326 = t.extend({}, t.CRS, {
		code: 'EPSG:4326',
		projection: t.Projection.LonLat,
		transformation: new t.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
	});
	t.Map = t.Class.extend({
		includes: t.Mixin.Events,
		options: {
			crs: t.CRS.EPSG3857,
			fadeAnimation: t.DomUtil.TRANSITION && !t.Browser.android23,
			trackResize: !0,
			markerZoomAnimation: t.DomUtil.TRANSITION && t.Browser.any3d
		},
		initialize: function (i, e) {
			e = t.setOptions(this, e);
			this._initContainer(i);
			this._initLayout();
			this._onResize = t.bind(this._onResize, this);
			this._initEvents();
			if (e.maxBounds) {
				this.setMaxBounds(e.maxBounds)
			}
			;
			if (e.center && e.zoom !== n) {
				this.setView(t.latLng(e.center), e.zoom, {
					reset: !0
				})
			}
			;
			this._handlers = [];
			this._layers = {};
			this._zoomBoundLayers = {};
			this._tileLayersNum = 0;
			this.callInitHooks();
			this._addLayers(e.layers)
		},
		setView: function (i, e) {
			e = e === n ? this.getZoom() : e;
			this._resetView(t.latLng(i), this._limitZoom(e));
			return this
		},
		setZoom: function (t, i) {
			if (!this._loaded) {
				this._zoom = this._limitZoom(t);
				return this
			}
			;
			return this.setView(this.getCenter(), t, {
				zoom: i
			})
		},
		zoomIn: function (t, i) {
			return this.setZoom(this._zoom + (t || 1), i)
		},
		zoomOut: function (t, i) {
			return this.setZoom(this._zoom - (t || 1), i)
		},
		setZoomAround: function (i, e, n) {
			var s = this.getZoomScale(e),
				o = this.getSize().divideBy(2),
				a = i instanceof t.Point ? i : this.latLngToContainerPoint(i),
				r = a.subtract(o).multiplyBy(1 - 1 / s),
				h = this.containerPointToLatLng(o.add(r));
			return this.setView(h, e, {
				zoom: n
			})
		},
		fitBounds: function (i, e) {
			e = e || {};
			i = i.getBounds ? i.getBounds() : t.latLngBounds(i);
			var o = t.point(e.paddingTopLeft || e.padding || [0, 0]),
				s = t.point(e.paddingBottomRight || e.padding || [0, 0]),
				n = this.getBoundsZoom(i, !1, o.add(s));
			n = (e.maxZoom) ? Math.min(e.maxZoom, n) : n;
			var a = s.subtract(o).divideBy(2),
				r = this.project(i.getSouthWest(), n),
				h = this.project(i.getNorthEast(), n),
				l = this.unproject(r.add(h).divideBy(2).add(a), n);
			return this.setView(l, n, e)
		},
		fitWorld: function (t) {
			return this.fitBounds([
				[-90, -180],
				[90, 180]
			], t)
		},
		panTo: function (t, i) {
			return this.setView(t, this._zoom, {
				pan: i
			})
		},
		panBy: function (i) {
			this.fire('movestart');
			this._rawPanBy(t.point(i));
			this.fire('move');
			return this.fire('moveend')
		},
		setMaxBounds: function (i) {
			i = t.latLngBounds(i);
			this.options.maxBounds = i;
			if (!i) {
				return this.off('moveend', this._panInsideMaxBounds, this)
			}
			;
			if (this._loaded) {
				this._panInsideMaxBounds()
			}
			;
			return this.on('moveend', this._panInsideMaxBounds, this)
		},
		panInsideBounds: function (t, i) {
			var e = this.getCenter(),
				n = this._limitCenter(e, this._zoom, t);
			if (e.equals(n)) {
				return this
			}
			;
			return this.panTo(n, i)
		},
		addLayer: function (i) {
			var e = t.stamp(i);
			if (this._layers[e]) {
				return this
			}
			;
			this._layers[e] = i;
			if (i.options && (!isNaN(i.options.maxZoom) || !isNaN(i.options.minZoom))) {
				this._zoomBoundLayers[e] = i;
				this._updateZoomLevels()
			}
			;
			if (this.options.zoomAnimation && t.TileLayer && (i instanceof t.TileLayer)) {
				this._tileLayersNum++;
				this._tileLayersToLoad++;
				i.on('load', this._onTileLayerLoad, this)
			}
			;
			if (this._loaded) {
				this._layerAdd(i)
			}
			;
			return this
		},
		removeLayer: function (i) {
			var e = t.stamp(i);
			if (!this._layers[e]) {
				return this
			}
			;
			if (this._loaded) {
				i.onRemove(this)
			}
			;
			delete this._layers[e];
			if (this._loaded) {
				this.fire('layerremove', {
					layer: i
				})
			}
			;
			if (this._zoomBoundLayers[e]) {
				delete this._zoomBoundLayers[e];
				this._updateZoomLevels()
			}
			;
			if (this.options.zoomAnimation && t.TileLayer && (i instanceof t.TileLayer)) {
				this._tileLayersNum--;
				this._tileLayersToLoad--;
				i.off('load', this._onTileLayerLoad, this)
			}
			;
			return this
		},
		hasLayer: function (i) {
			if (!i) {
				return !1
			}
			;
			return (t.stamp(i) in this._layers)
		},
		eachLayer: function (t, i) {
			for (var e in this._layers) {
				t.call(i, this._layers[e])
			}
			;
			return this
		},
		invalidateSize: function (i) {
			if (!this._loaded) {
				return this
			}
			;
			i = t.extend({
				animate: !1,
				pan: !0
			}, i === !0 ? {
				animate: !0
			} : i);
			var o = this.getSize();
			this._sizeChanged = !0;
			this._initialCenter = null;
			var n = this.getSize(),
				s = o.divideBy(2).round(),
				a = n.divideBy(2).round(),
				e = s.subtract(a);
			if (!e.x && !e.y) {
				return this
			}
			;
			if (i.animate && i.pan) {
				this.panBy(e)
			} else {
				if (i.pan) {
					this._rawPanBy(e)
				}
				;
				this.fire('move');
				if (i.debounceMoveend) {
					clearTimeout(this._sizeTimer);
					this._sizeTimer = setTimeout(t.bind(this.fire, this, 'moveend'), 200)
				} else {
					this.fire('moveend')
				}
			}
			;
			return this.fire('resize', {
				oldSize: o,
				newSize: n
			})
		},
		addHandler: function (t, i) {
			if (!i) {
				return this
			}
			;
			var e = this[t] = new i(this);
			this._handlers.push(e);
			if (this.options[t]) {
				e.enable()
			}
			;
			return this
		},
		remove: function () {
			if (this._loaded) {
				this.fire('unload')
			}
			;
			this._initEvents('off');
			try {
				delete this._container._leaflet
			} catch (t) {
				this._container._leaflet = n
			}
			;
			this._clearPanes();
			if (this._clearControlPos) {
				this._clearControlPos()
			}
			;
			this._clearHandlers();
			return this
		},
		getCenter: function () {
			this._checkIfLoaded();
			if (this._initialCenter && !this._moved()) {
				return this._initialCenter
			}
			;
			return this.layerPointToLatLng(this._getCenterLayerPoint())
		},
		getZoom: function () {
			return this._zoom
		},
		getBounds: function () {
			var i = this.getPixelBounds(),
				e = this.unproject(i.getBottomLeft()),
				n = this.unproject(i.getTopRight());
			return new t.LatLngBounds(e, n)
		},
		getMinZoom: function () {
			return this.options.minZoom === n ? (this._layersMinZoom === n ? 0 : this._layersMinZoom) : this.options.minZoom
		},
		getMaxZoom: function () {
			return this.options.maxZoom === n ? (this._layersMaxZoom === n ? Infinity : this._layersMaxZoom) : this.options.maxZoom
		},
		getBoundsZoom: function (i, e, n) {
			i = t.latLngBounds(i);
			var o = this.getMinZoom() - (e ? 1 : 0),
				h = this.getMaxZoom(),
				a = this.getSize(),
				l = i.getNorthWest(),
				u = i.getSouthEast(),
				r = !0,
				s;
			n = t.point(n || [0, 0]);
			do {
				o++;
				s = this.project(u, o).subtract(this.project(l, o)).add(n);
				r = !e ? a.contains(s) : s.x < a.x || s.y < a.y
			}
			while (r && o <= h);
			if (r && e) {
				return null
			}
			;
			return e ? o : o - 1
		},
		getSize: function () {
			if (!this._size || this._sizeChanged) {
				this._size = new t.Point(this._container.clientWidth, this._container.clientHeight);
				this._sizeChanged = !1
			}
			;
			return this._size.clone()
		},
		getPixelBounds: function () {
			var i = this._getTopLeftPoint();
			return new t.Bounds(i, i.add(this.getSize()))
		},
		getPixelOrigin: function () {
			this._checkIfLoaded();
			return this._initialTopLeftPoint
		},
		getPanes: function () {
			return this._panes
		},
		getContainer: function () {
			return this._container
		},
		getZoomScale: function (t) {
			var i = this.options.crs;
			return i.scale(t) / i.scale(this._zoom)
		},
		getScaleZoom: function (t) {
			return this._zoom + (Math.log(t) / Math.LN2)
		},
		project: function (i, e) {
			e = e === n ? this._zoom : e;
			return this.options.crs.latLngToPoint(t.latLng(i), e)
		},
		unproject: function (i, e) {
			e = e === n ? this._zoom : e;
			return this.options.crs.pointToLatLng(t.point(i), e)
		},
		layerPointToLatLng: function (i) {
			var e = t.point(i).add(this.getPixelOrigin());
			return this.unproject(e)
		},
		latLngToLayerPoint: function (i) {
			var e = this.project(t.latLng(i))._round();
			return e._subtract(this.getPixelOrigin())
		},
		containerPointToLayerPoint: function (i) {
			return t.point(i).subtract(this._getMapPanePos())
		},
		layerPointToContainerPoint: function (i) {
			return t.point(i).add(this._getMapPanePos())
		},
		containerPointToLatLng: function (i) {
			var e = this.containerPointToLayerPoint(t.point(i));
			return this.layerPointToLatLng(e)
		},
		latLngToContainerPoint: function (i) {
			return this.layerPointToContainerPoint(this.latLngToLayerPoint(t.latLng(i)))
		},
		mouseEventToContainerPoint: function (i) {
			return t.DomEvent.getMousePosition(i, this._container)
		},
		mouseEventToLayerPoint: function (t) {
			return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
		},
		mouseEventToLatLng: function (t) {
			return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
		},
		_initContainer: function (i) {
			var e = this._container = t.DomUtil.get(i);
			if (!e) {
				throw new Error('Map container not found.')
			} else if (e._leaflet) {
				throw new Error('Map container is already initialized.')
			}
			;
			e._leaflet = !0
		},
		_initLayout: function () {
			var e = this._container;
			t.DomUtil.addClass(e, 'leaflet-container' + (t.Browser.touch ? ' leaflet-touch' : '') + (t.Browser.retina ? ' leaflet-retina' : '') + (t.Browser.ielt9 ? ' leaflet-oldie' : '') + (this.options.fadeAnimation ? ' leaflet-fade-anim' : ''));
			var i = t.DomUtil.getStyle(e, 'position');
			if (i !== 'absolute' && i !== 'relative' && i !== 'fixed') {
				e.style.position = 'relative'
			}
			;
			this._initPanes();
			if (this._initControlPos) {
				this._initControlPos()
			}
		},
		_initPanes: function () {
			var i = this._panes = {};
			this._mapPane = i.mapPane = this._createPane('leaflet-map-pane', this._container);
			this._tilePane = i.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
			i.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
			i.shadowPane = this._createPane('leaflet-shadow-pane');
			i.overlayPane = this._createPane('leaflet-overlay-pane');
			i.markerPane = this._createPane('leaflet-marker-pane');
			i.popupPane = this._createPane('leaflet-popup-pane');
			var e = ' leaflet-zoom-hide';
			if (!this.options.markerZoomAnimation) {
				t.DomUtil.addClass(i.markerPane, e);
				t.DomUtil.addClass(i.shadowPane, e);
				t.DomUtil.addClass(i.popupPane, e)
			}
		},
		_createPane: function (i, e) {
			return t.DomUtil.create('div', i, e || this._panes.objectsPane)
		},
		_clearPanes: function () {
			this._container.removeChild(this._mapPane)
		},
		_addLayers: function (i) {
			i = i ? (t.Util.isArray(i) ? i : [i]) : [];
			for (var e = 0, n = i.length; e < n; e++) {
				this.addLayer(i[e])
			}
		},
		_resetView: function (i, e, n, o) {
			var s = (this._zoom !== e);
			if (!o) {
				this.fire('movestart');
				if (s) {
					this.fire('zoomstart')
				}
			}
			;
			this._zoom = e;
			this._initialCenter = i;
			this._initialTopLeftPoint = this._getNewTopLeftPoint(i);
			if (!n) {
				t.DomUtil.setPosition(this._mapPane, new t.Point(0, 0))
			} else {
				this._initialTopLeftPoint._add(this._getMapPanePos())
			}
			;
			this._tileLayersToLoad = this._tileLayersNum;
			var a = !this._loaded;
			this._loaded = !0;
			this.fire('viewreset', {
				hard: !n
			});
			if (a) {
				this.fire('load');
				this.eachLayer(this._layerAdd, this)
			}
			;
			this.fire('move');
			if (s || o) {
				this.fire('zoomend')
			}
			;
			this.fire('moveend', {
				hard: !n
			})
		},
		_rawPanBy: function (i) {
			t.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(i))
		},
		_getZoomSpan: function () {
			return this.getMaxZoom() - this.getMinZoom()
		},
		_updateZoomLevels: function () {
			var i, e = Infinity,
				o = -Infinity,
				s = this._getZoomSpan();
			for (i in this._zoomBoundLayers) {
				var t = this._zoomBoundLayers[i];
				if (!isNaN(t.options.minZoom)) {
					e = Math.min(e, t.options.minZoom)
				}
				;
				if (!isNaN(t.options.maxZoom)) {
					o = Math.max(o, t.options.maxZoom)
				}
			}
			;
			if (i === n) {
				this._layersMaxZoom = this._layersMinZoom = n
			} else {
				this._layersMaxZoom = o;
				this._layersMinZoom = e
			}
			;
			if (s !== this._getZoomSpan()) {
				this.fire('zoomlevelschange')
			}
		},
		_panInsideMaxBounds: function () {
			this.panInsideBounds(this.options.maxBounds)
		},
		_checkIfLoaded: function () {
			if (!this._loaded) {
				throw new Error('Set map center and zoom first.')
			}
		},
		_initEvents: function (e) {
			if (!t.DomEvent) {
				return
			}
			;
			e = e || 'on';
			t.DomEvent[e](this._container, 'click', this._onMouseClick, this);
			var o = ['dblclick', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'mousemove', 'contextmenu'],
				n, s;
			for (n = 0, s = o.length; n < s; n++) {
				t.DomEvent[e](this._container, o[n], this._fireMouseEvent, this)
			}
			;
			if (this.options.trackResize) {
				t.DomEvent[e](i, 'resize', this._onResize, this)
			}
		},
		_onResize: function () {
			t.Util.cancelAnimFrame(this._resizeRequest);
			this._resizeRequest = t.Util.requestAnimFrame(function () {
				this.invalidateSize({
					debounceMoveend: !0
				})
			}, this, !1, this._container)
		},
		_onMouseClick: function (i) {
			if (!this._loaded || (!i._simulated && ((this.dragging && this.dragging.moved()) || (this.boxZoom && this.boxZoom.moved()))) || t.DomEvent._skipped(i)) {
				return
			}
			;
			this.fire('preclick');
			this._fireMouseEvent(i)
		},
		_fireMouseEvent: function (i) {
			if (!this._loaded || t.DomEvent._skipped(i)) {
				return
			}
			;
			var e = i.type;
			e = (e === 'mouseenter' ? 'mouseover' : (e === 'mouseleave' ? 'mouseout' : e));
			if (!this.hasEventListeners(e)) {
				return
			}
			;
			if (e === 'contextmenu') {
				t.DomEvent.preventDefault(i)
			}
			;
			var n = this.mouseEventToContainerPoint(i),
				o = this.containerPointToLayerPoint(n),
				s = this.layerPointToLatLng(o);
			this.fire(e, {
				latlng: s,
				layerPoint: o,
				containerPoint: n,
				originalEvent: i
			})
		},
		_onTileLayerLoad: function () {
			this._tileLayersToLoad--;
			if (this._tileLayersNum && !this._tileLayersToLoad) {
				this.fire('tilelayersload')
			}
		},
		_clearHandlers: function () {
			for (var t = 0, i = this._handlers.length; t < i; t++) {
				this._handlers[t].disable()
			}
		},
		whenReady: function (t, i) {
			if (this._loaded) {
				t.call(i || this, this)
			} else {
				this.on('load', t, i)
			}
			;
			return this
		},
		_layerAdd: function (t) {
			t.onAdd(this);
			this.fire('layeradd', {
				layer: t
			})
		},
		_getMapPanePos: function () {
			return t.DomUtil.getPosition(this._mapPane)
		},
		_moved: function () {
			var t = this._getMapPanePos();
			return t && !t.equals([0, 0])
		},
		_getTopLeftPoint: function () {
			return this.getPixelOrigin().subtract(this._getMapPanePos())
		},
		_getNewTopLeftPoint: function (t, i) {
			var e = this.getSize()._divideBy(2);
			return this.project(t, i)._subtract(e)._round()
		},
		_latLngToNewLayerPoint: function (t, i, e) {
			var n = this._getNewTopLeftPoint(e, i).add(this._getMapPanePos());
			return this.project(t, i)._subtract(n)
		},
		_getCenterLayerPoint: function () {
			return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
		},
		_getCenterOffset: function (t) {
			return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
		},
		_limitCenter: function (i, e, n) {
			if (!n) {
				return i
			}
			;
			var o = this.project(i, e),
				s = this.getSize().divideBy(2),
				a = new t.Bounds(o.subtract(s), o.add(s)),
				r = this._getBoundsOffset(a, n, e);
			return this.unproject(o.add(r), e)
		},
		_limitOffset: function (i, e) {
			if (!e) {
				return i
			}
			;
			var n = this.getPixelBounds(),
				o = new t.Bounds(n.min.add(i), n.max.add(i));
			return i.add(this._getBoundsOffset(o, e))
		},
		_getBoundsOffset: function (i, e, n) {
			var o = this.project(e.getNorthWest(), n).subtract(i.min),
				s = this.project(e.getSouthEast(), n).subtract(i.max),
				a = this._rebound(o.x, -s.x),
				r = this._rebound(o.y, -s.y);
			return new t.Point(a, r)
		},
		_rebound: function (t, i) {
			return t + i > 0 ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i))
		},
		_limitZoom: function (t) {
			var i = this.getMinZoom(),
				e = this.getMaxZoom();
			return Math.max(i, Math.min(e, t))
		}
	});
	t.map = function (i, e) {
		return new t.Map(i, e)
	};
	t.Projection.Mercator = {
		MAX_LATITUDE: 85.0840591556,
		R_MINOR: 6356752.314245179,
		R_MAJOR: 6378137,
		project: function (i) {
			var s = t.LatLng.DEG_TO_RAD,
				a = this.MAX_LATITUDE,
				u = Math.max(Math.min(a, i.lat), -a),
				o = this.R_MAJOR,
				c = this.R_MINOR,
				f = i.lng * s * o,
				e = u * s,
				r = c / o,
				h = Math.sqrt(1.0 - r * r),
				n = h * Math.sin(e);
			n = Math.pow((1 - n) / (1 + n), h * 0.5);
			var l = Math.tan(0.5 * ((Math.PI * 0.5) - e)) / n;
			e = -o * Math.log(l);
			return new t.Point(f, e)
		},
		unproject: function (i) {
			var a = t.LatLng.RAD_TO_DEG,
				n = this.R_MAJOR,
				u = this.R_MINOR,
				c = i.x * a / n,
				r = u / n,
				h = Math.sqrt(1 - (r * r)),
				l = Math.exp(-i.y / n),
				e = (Math.PI / 2) - 2 * Math.atan(l),
				f = 15,
				p = 1e-7,
				d = f,
				o = 0.1,
				s;
			while ((Math.abs(o) > p) && (--d > 0)) {
				s = h * Math.sin(e);
				o = (Math.PI / 2) - 2 * Math.atan(l * Math.pow((1.0 - s) / (1.0 + s), 0.5 * h)) - e;
				e += o
			}
			;
			return new t.LatLng(e * a, c)
		}
	};
	t.CRS.EPSG3395 = t.extend({}, t.CRS, {
		code: 'EPSG:3395',
		projection: t.Projection.Mercator,
		transformation: (function () {
			var e = t.Projection.Mercator,
				n = e.R_MAJOR,
				i = 0.5 / (Math.PI * n);
			return new t.Transformation(i, 0.5, -i, 0.5)
		}())
	});
	t.TileLayer = t.Class.extend({
		includes: t.Mixin.Events,
		options: {
			minZoom: 0,
			maxZoom: 18,
			tileSize: 256,
			subdomains: 'abc',
			errorTileUrl: '',
			attribution: '',
			zoomOffset: 0,
			opacity: 1,
			unloadInvisibleTiles: t.Browser.mobile,
			updateWhenIdle: t.Browser.mobile
		},
		initialize: function (i, e) {
			e = t.setOptions(this, e);
			if (e.detectRetina && t.Browser.retina && e.maxZoom > 0) {
				e.tileSize = Math.floor(e.tileSize / 2);
				e.zoomOffset++;
				if (e.minZoom > 0) {
					e.minZoom--
				}
				;
				this.options.maxZoom--
			}
			;
			if (e.bounds) {
				e.bounds = t.latLngBounds(e.bounds)
			}
			;
			this._url = i;
			var n = this.options.subdomains;
			if (typeof n === 'string') {
				this.options.subdomains = n.split('')
			}
		},
		onAdd: function (i) {
			this._map = i;
			this._animated = i._zoomAnimated;
			this._initContainer();
			i.on({
				'viewreset': this._reset,
				'moveend': this._update
			}, this);
			if (this._animated) {
				i.on({
					'zoomanim': this._animateZoom,
					'zoomend': this._endZoomAnim
				}, this)
			}
			;
			if (!this.options.updateWhenIdle) {
				this._limitedUpdate = t.Util.limitExecByInterval(this._update, 150, this);
				i.on('move', this._limitedUpdate, this)
			}
			;
			this._reset();
			this._update()
		},
		addTo: function (t) {
			t.addLayer(this);
			return this
		},
		onRemove: function (t) {
			this._container.parentNode.removeChild(this._container);
			t.off({
				'viewreset': this._reset,
				'moveend': this._update
			}, this);
			if (this._animated) {
				t.off({
					'zoomanim': this._animateZoom,
					'zoomend': this._endZoomAnim
				}, this)
			}
			;
			if (!this.options.updateWhenIdle) {
				t.off('move', this._limitedUpdate, this)
			}
			;
			this._container = null;
			this._map = null
		},
		bringToFront: function () {
			var t = this._map._panes.tilePane;
			if (this._container) {
				t.appendChild(this._container);
				this._setAutoZIndex(t, Math.max)
			}
			;
			return this
		},
		bringToBack: function () {
			var t = this._map._panes.tilePane;
			if (this._container) {
				t.insertBefore(this._container, t.firstChild);
				this._setAutoZIndex(t, Math.min)
			}
			;
			return this
		},
		getAttribution: function () {
			return this.options.attribution
		},
		getContainer: function () {
			return this._container
		},
		setOpacity: function (t) {
			this.options.opacity = t;
			if (this._map) {
				this._updateOpacity()
			}
			;
			return this
		},
		setZIndex: function (t) {
			this.options.zIndex = t;
			this._updateZIndex();
			return this
		},
		setUrl: function (t, i) {
			this._url = t;
			if (!i) {
				this.redraw()
			}
			;
			return this
		},
		redraw: function () {
			if (this._map) {
				this._reset({
					hard: !0
				});
				this._update()
			}
			;
			return this
		},
		_updateZIndex: function () {
			if (this._container && this.options.zIndex !== n) {
				this._container.style.zIndex = this.options.zIndex
			}
		},
		_setAutoZIndex: function (t, i) {
			var o = t.children,
				n = -i(Infinity, -Infinity),
				s, e, a;
			for (e = 0, a = o.length; e < a; e++) {
				if (o[e] !== this._container) {
					s = parseInt(o[e].style.zIndex, 10);
					if (!isNaN(s)) {
						n = i(n, s)
					}
				}
			}
			;
			this.options.zIndex = this._container.style.zIndex = (isFinite(n) ? n : 0) + i(1, -1)
		},
		_updateOpacity: function () {
			var i, e = this._tiles;
			if (t.Browser.ielt9) {
				for (i in e) {
					t.DomUtil.setOpacity(e[i], this.options.opacity)
				}
			} else {
				t.DomUtil.setOpacity(this._container, this.options.opacity)
			}
		},
		_initContainer: function () {
			var e = this._map._panes.tilePane;
			if (!this._container) {
				this._container = t.DomUtil.create('div', 'leaflet-layer');
				this._updateZIndex();
				if (this._animated) {
					var i = 'leaflet-tile-container';
					this._bgBuffer = t.DomUtil.create('div', i, this._container);
					this._tileContainer = t.DomUtil.create('div', i, this._container)
				} else {
					this._tileContainer = this._container
				}
				;
				e.appendChild(this._container);
				if (this.options.opacity < 1) {
					this._updateOpacity()
				}
			}
		},
		_reset: function (t) {
			for (var i in this._tiles) {
				this.fire('tileunload', {
					tile: this._tiles[i]
				})
			}
			;
			this._tiles = {};
			this._tilesToLoad = 0;
			if (this.options.reuseTiles) {
				this._unusedTiles = []
			}
			;
			this._tileContainer.innerHTML = '';
			if (this._animated && t && t.hard) {
				this._clearBgBuffer()
			}
			;
			this._initContainer()
		},
		_getTileSize: function () {
			var t = this._map,
				n = t.getZoom() + this.options.zoomOffset,
				i = this.options.maxNativeZoom,
				e = this.options.tileSize;
			if (i && n > i) {
				e = Math.round(t.getZoomScale(n) / t.getZoomScale(i) * e)
			}
			;
			return e
		},
		_update: function () {
			if (!this._map) {
				return
			}
			;
			var e = this._map,
				n = e.getPixelBounds(),
				o = e.getZoom(),
				s = this._getTileSize();
			if (o > this.options.maxZoom || o < this.options.minZoom) {
				return
			}
			;
			var i = t.bounds(n.min.divideBy(s)._floor(), n.max.divideBy(s)._floor());
			this._addTilesFromCenterOut(i);
			if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
				this._removeOtherTiles(i)
			}
		},
		_addTilesFromCenterOut: function (i) {
			var o = [],
				l = i.getCenter(),
				s, n, r;
			for (s = i.min.y; s <= i.max.y; s++) {
				for (n = i.min.x; n <= i.max.x; n++) {
					r = new t.Point(n, s);
					if (this._tileShouldBeLoaded(r)) {
						o.push(r)
					}
				}
			}
			;
			var a = o.length;
			if (a === 0) {
				return
			}
			;
			o.sort(function (t, i) {
				return t.distanceTo(l) - i.distanceTo(l)
			});
			var h = e.createDocumentFragment();
			if (!this._tilesToLoad) {
				this.fire('loading')
			}
			;
			this._tilesToLoad += a;
			for (n = 0; n < a; n++) {
				this._addTile(o[n], h)
			}
			;
			this._tileContainer.appendChild(h)
		},
		_tileShouldBeLoaded: function (t) {
			if ((t.x + ':' + t.y) in this._tiles) {
				return !1
			}
			;
			var i = this.options;
			if (!i.continuousWorld) {
				var a = this._getWrapTileNum();
				if ((i.noWrap && (t.x < 0 || t.x >= a.x)) || t.y < 0 || t.y >= a.y) {
					return !1
				}
			}
			;
			if (i.bounds) {
				var e = this._getTileSize(),
					s = t.multiplyBy(e),
					r = s.add([e, e]),
					n = this._map.unproject(s),
					o = this._map.unproject(r);
				if (!i.continuousWorld && !i.noWrap) {
					n = n.wrap();
					o = o.wrap()
				}
				;
				if (!i.bounds.intersects([n, o])) {
					return !1
				}
			}
			;
			return !0
		},
		_removeOtherTiles: function (t) {
			var i, e, n, o;
			for (o in this._tiles) {
				i = o.split(':');
				e = parseInt(i[0], 10);
				n = parseInt(i[1], 10);
				if (e < t.min.x || e > t.max.x || n < t.min.y || n > t.max.y) {
					this._removeTile(o)
				}
			}
		},
		_removeTile: function (i) {
			var e = this._tiles[i];
			this.fire('tileunload', {
				tile: e,
				url: e.src
			});
			if (this.options.reuseTiles) {
				t.DomUtil.removeClass(e, 'leaflet-tile-loaded');
				this._unusedTiles.push(e)
			} else if (e.parentNode === this._tileContainer) {
				this._tileContainer.removeChild(e)
			}
			;
			if (!t.Browser.android) {
				e.onload = null;
				e.src = t.Util.emptyImageUrl
			}
			;
			delete this._tiles[i]
		},
		_addTile: function (i, e) {
			var o = this._getTilePos(i),
				n = this._getTile();
			t.DomUtil.setPosition(n, o, t.Browser.chrome);
			this._tiles[i.x + ':' + i.y] = n;
			this._loadTile(n, i);
			if (n.parentNode !== this._tileContainer) {
				e.appendChild(n)
			}
		},
		_getZoomForUrl: function () {
			var t = this.options,
				i = this._map.getZoom();
			if (t.zoomReverse) {
				i = t.maxZoom - i
			}
			;
			i += t.zoomOffset;
			return t.maxNativeZoom ? Math.min(i, t.maxNativeZoom) : i
		},
		_getTilePos: function (t) {
			var i = this._map.getPixelOrigin(),
				e = this._getTileSize();
			return t.multiplyBy(e).subtract(i)
		},
		getTileUrl: function (i) {
			return t.Util.template(this._url, t.extend({
				s: this._getSubdomain(i),
				z: i.z,
				x: i.x,
				y: i.y
			}, this.options))
		},
		_getWrapTileNum: function () {
			var t = this._map.options.crs,
				i = t.getSize(this._map.getZoom());
			return i.divideBy(this._getTileSize())._floor()
		},
		_adjustTilePoint: function (t) {
			var i = this._getWrapTileNum();
			if (!this.options.continuousWorld && !this.options.noWrap) {
				t.x = ((t.x % i.x) + i.x) % i.x
			}
			;
			if (this.options.tms) {
				t.y = i.y - t.y - 1
			}
			;
			t.z = this._getZoomForUrl()
		},
		_getSubdomain: function (t) {
			var i = Math.abs(t.x + t.y) % this.options.subdomains.length;
			return this.options.subdomains[i]
		},
		_getTile: function () {
			if (this.options.reuseTiles && this._unusedTiles.length > 0) {
				var t = this._unusedTiles.pop();
				this._resetTile(t);
				return t
			}
			;
			return this._createTile()
		},
		_resetTile: function () {
		},
		_createTile: function () {
			var i = t.DomUtil.create('img', 'leaflet-tile');
			i.style.width = i.style.height = this._getTileSize() + 'px';
			i.galleryimg = 'no';
			i.onselectstart = i.onmousemove = t.Util.falseFn;
			if (t.Browser.ielt9 && this.options.opacity !== n) {
				t.DomUtil.setOpacity(i, this.options.opacity)
			}
			;
			if (t.Browser.mobileWebkit3d) {
				i.style.WebkitBackfaceVisibility = 'hidden'
			}
			;
			return i
		},
		_loadTile: function (t, i) {
			t._layer = this;
			t.onload = this._tileOnLoad;
			t.onerror = this._tileOnError;
			this._adjustTilePoint(i);
			t.src = this.getTileUrl(i);
			this.fire('tileloadstart', {
				tile: t,
				url: t.src
			})
		},
		_tileLoaded: function () {
			this._tilesToLoad--;
			if (this._animated) {
				t.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated')
			}
			;
			if (!this._tilesToLoad) {
				this.fire('load');
				if (this._animated) {
					clearTimeout(this._clearBgBufferTimer);
					this._clearBgBufferTimer = setTimeout(t.bind(this._clearBgBuffer, this), 500)
				}
			}
		},
		_tileOnLoad: function () {
			var i = this._layer;
			if (this.src !== t.Util.emptyImageUrl) {
				t.DomUtil.addClass(this, 'leaflet-tile-loaded');
				i.fire('tileload', {
					tile: this,
					url: this.src
				})
			}
			;
			i._tileLoaded()
		},
		_tileOnError: function () {
			var t = this._layer;
			t.fire('tileerror', {
				tile: this,
				url: this.src
			});
			var i = t.options.errorTileUrl;
			if (i) {
				this.src = i
			}
			;
			t._tileLoaded()
		}
	});
	t.tileLayer = function (i, e) {
		return new t.TileLayer(i, e)
	};
	t.TileLayer.WMS = t.TileLayer.extend({
		defaultWmsParams: {
			service: 'WMS',
			request: 'GetMap',
			version: '1.1.1',
			layers: '',
			styles: '',
			format: 'image/jpeg',
			transparent: !1
		},
		initialize: function (i, e) {
			this._url = i;
			var n = t.extend({}, this.defaultWmsParams),
				s = e.tileSize || this.options.tileSize;
			if (e.detectRetina && t.Browser.retina) {
				n.width = n.height = s * 2
			} else {
				n.width = n.height = s
			}
			;
			for (var o in e) {
				if (!this.options.hasOwnProperty(o) && o !== 'crs') {
					n[o] = e[o]
				}
			}
			;
			this.wmsParams = n;
			t.setOptions(this, e)
		},
		onAdd: function (i) {
			this._crs = this.options.crs || i.options.crs;
			this._wmsVersion = parseFloat(this.wmsParams.version);
			var e = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
			this.wmsParams[e] = this._crs.code;
			t.TileLayer.prototype.onAdd.call(this, i)
		},
		getTileUrl: function (i) {
			var s = this._map,
				o = this.options.tileSize,
				a = i.multiplyBy(o),
				h = a.add([o, o]),
				e = this._crs.project(s.unproject(a, i.z)),
				n = this._crs.project(s.unproject(h, i.z)),
				l = this._wmsVersion >= 1.3 && this._crs === t.CRS.EPSG4326 ? [n.y, e.x, e.y, n.x].join(',') : [e.x, n.y, n.x, e.y].join(','),
				r = t.Util.template(this._url, {
					s: this._getSubdomain(i)
				});
			return r + t.Util.getParamString(this.wmsParams, r, !0) + '&BBOX=' + l
		},
		setParams: function (i, e) {
			t.extend(this.wmsParams, i);
			if (!e) {
				this.redraw()
			}
			;
			return this
		}
	});
	t.tileLayer.wms = function (i, e) {
		return new t.TileLayer.WMS(i, e)
	};
	t.TileLayer.Canvas = t.TileLayer.extend({
		options: {
			async: !1
		},
		initialize: function (i) {
			t.setOptions(this, i)
		},
		redraw: function () {
			if (this._map) {
				this._reset({
					hard: !0
				});
				this._update()
			}
			;
			for (var t in this._tiles) {
				this._redrawTile(this._tiles[t])
			}
			;
			return this
		},
		_redrawTile: function (t) {
			this.drawTile(t, t._tilePoint, this._map._zoom)
		},
		_createTile: function () {
			var i = t.DomUtil.create('canvas', 'leaflet-tile');
			i.width = i.height = this.options.tileSize;
			i.onselectstart = i.onmousemove = t.Util.falseFn;
			return i
		},
		_loadTile: function (t, i) {
			t._layer = this;
			t._tilePoint = i;
			this._redrawTile(t);
			if (!this.options.async) {
				this.tileDrawn(t)
			}
		},
		drawTile: function () {
		},
		tileDrawn: function (t) {
			this._tileOnLoad.call(t)
		}
	});
	t.tileLayer.canvas = function (i) {
		return new t.TileLayer.Canvas(i)
	};
	t.ImageOverlay = t.Class.extend({
		includes: t.Mixin.Events,
		options: {
			opacity: 1
		},
		initialize: function (i, e, n) {
			this._url = i;
			this._bounds = t.latLngBounds(e);
			t.setOptions(this, n)
		},
		onAdd: function (i) {
			this._map = i;
			if (!this._image) {
				this._initImage()
			}
			;
			i._panes.overlayPane.appendChild(this._image);
			i.on('viewreset', this._reset, this);
			if (i.options.zoomAnimation && t.Browser.any3d) {
				i.on('zoomanim', this._animateZoom, this)
			}
			;
			this._reset()
		},
		onRemove: function (t) {
			t.getPanes().overlayPane.removeChild(this._image);
			t.off('viewreset', this._reset, this);
			if (t.options.zoomAnimation) {
				t.off('zoomanim', this._animateZoom, this)
			}
		},
		addTo: function (t) {
			t.addLayer(this);
			return this
		},
		setOpacity: function (t) {
			this.options.opacity = t;
			this._updateOpacity();
			return this
		},
		bringToFront: function () {
			if (this._image) {
				this._map._panes.overlayPane.appendChild(this._image)
			}
			;
			return this
		},
		bringToBack: function () {
			var t = this._map._panes.overlayPane;
			if (this._image) {
				t.insertBefore(this._image, t.firstChild)
			}
			;
			return this
		},
		setUrl: function (t) {
			this._url = t;
			this._image.src = this._url
		},
		getAttribution: function () {
			return this.options.attribution
		},
		_initImage: function () {
			this._image = t.DomUtil.create('img', 'leaflet-image-layer');
			if (this._map.options.zoomAnimation && t.Browser.any3d) {
				t.DomUtil.addClass(this._image, 'leaflet-zoom-animated')
			} else {
				t.DomUtil.addClass(this._image, 'leaflet-zoom-hide')
			}
			;
			this._updateOpacity();
			t.extend(this._image, {
				galleryimg: 'no',
				onselectstart: t.Util.falseFn,
				onmousemove: t.Util.falseFn,
				onload: t.bind(this._onImageLoad, this),
				src: this._url
			})
		},
		_animateZoom: function (i) {
			var e = this._map,
				s = this._image,
				n = e.getZoomScale(i.zoom),
				a = this._bounds.getNorthWest(),
				r = this._bounds.getSouthEast(),
				o = e._latLngToNewLayerPoint(a, i.zoom, i.center),
				h = e._latLngToNewLayerPoint(r, i.zoom, i.center)._subtract(o),
				l = o._add(h._multiplyBy((1 / 2) * (1 - 1 / n)));
			s.style[t.DomUtil.TRANSFORM] = t.DomUtil.getTranslateString(l) + ' scale(' + n + ') '
		},
		_reset: function () {
			var i = this._image,
				e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
				n = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
			t.DomUtil.setPosition(i, e);
			i.style.width = n.x + 'px';
			i.style.height = n.y + 'px'
		},
		_onImageLoad: function () {
			this.fire('load')
		},
		_updateOpacity: function () {
			t.DomUtil.setOpacity(this._image, this.options.opacity)
		}
	});
	t.imageOverlay = function (i, e, n) {
		return new t.ImageOverlay(i, e, n)
	};
	t.Icon = t.Class.extend({
		options: {
			className: ''
		},
		initialize: function (i) {
			t.setOptions(this, i)
		},
		createIcon: function (t) {
			return this._createIcon('icon', t)
		},
		createShadow: function (t) {
			return this._createIcon('shadow', t)
		},
		_createIcon: function (t, i) {
			var n = this._getIconUrl(t);
			if (!n) {
				if (t === 'icon') {
					throw new Error('iconUrl not set in Icon options (see the docs).')
				}
				;
				return null
			}
			;
			var e;
			if (!i || i.tagName !== 'IMG') {
				e = this._createImg(n)
			} else {
				e = this._createImg(n, i)
			}
			;
			this._setIconStyles(e, t);
			return e
		},
		_setIconStyles: function (i, e) {
			var o = this.options,
				s = t.point(o[e + 'Size']),
				n;
			if (e === 'shadow') {
				n = t.point(o.shadowAnchor || o.iconAnchor)
			} else {
				n = t.point(o.iconAnchor)
			}
			;
			if (!n && s) {
				n = s.divideBy(2, !0)
			}
			;
			i.className = 'leaflet-marker-' + e + ' ' + o.className;
			if (n) {
				i.style.marginLeft = (-n.x) + 'px';
				i.style.marginTop = (-n.y) + 'px'
			}
			;
			if (s) {
				i.style.width = s.x + 'px';
				i.style.height = s.y + 'px'
			}
		},
		_createImg: function (t, i) {
			i = i || e.createElement('img');
			i.src = t;
			return i
		},
		_getIconUrl: function (i) {
			if (t.Browser.retina && this.options[i + 'RetinaUrl']) {
				return this.options[i + 'RetinaUrl']
			}
			;
			return this.options[i + 'Url']
		}
	});
	t.icon = function (i) {
		return new t.Icon(i)
	};
	t.Icon.Default = t.Icon.extend({
		options: {
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		},
		_getIconUrl: function (i) {
			var n = i + 'Url';
			if (this.options[n]) {
				return this.options[n]
			}
			;
			if (t.Browser.retina && i === 'icon') {
				i += '-2x'
			}
			;
			var e = t.Icon.Default.imagePath;
			if (!e) {
				throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.')
			}
			;
			return e + '/marker-' + i + '.png'
		}
	});
	t.Icon.Default.imagePath = (function () {
		var o = e.getElementsByTagName('script'),
			s = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/,
			t, a, i, r, n;
		for (t = 0, a = o.length; t < a; t++) {
			i = o[t].src;
			r = i.match(s);
			if (r) {
				n = i.split(s)[0];
				return (n ? n + '/' : '') + 'images'
			}
		}
	}());
	t.Marker = t.Class.extend({
		includes: t.Mixin.Events,
		options: {
			icon: new t.Icon.Default(),
			title: '',
			alt: '',
			clickable: !0,
			draggable: !1,
			keyboard: !0,
			zIndexOffset: 0,
			opacity: 1,
			riseOnHover: !1,
			riseOffset: 250
		},
		initialize: function (i, e) {
			t.setOptions(this, e);
			this._latlng = t.latLng(i)
		},
		onAdd: function (t) {
			this._map = t;
			t.on('viewreset', this.update, this);
			this._initIcon();
			this.update();
			this.fire('add');
			if (t.options.zoomAnimation && t.options.markerZoomAnimation) {
				t.on('zoomanim', this._animateZoom, this)
			}
		},
		addTo: function (t) {
			t.addLayer(this);
			return this
		},
		onRemove: function (t) {
			if (this.dragging) {
				this.dragging.disable()
			}
			;
			this._removeIcon();
			this._removeShadow();
			this.fire('remove');
			t.off({
				'viewreset': this.update,
				'zoomanim': this._animateZoom
			}, this);
			this._map = null
		},
		getLatLng: function () {
			return this._latlng
		},
		setLatLng: function (i) {
			this._latlng = t.latLng(i);
			this.update();
			return this.fire('move', {
				latlng: this._latlng
			})
		},
		setZIndexOffset: function (t) {
			this.options.zIndexOffset = t;
			this.update();
			return this
		},
		setIcon: function (t) {
			this.options.icon = t;
			if (this._map) {
				this._initIcon();
				this.update()
			}
			;
			if (this._popup) {
				this.bindPopup(this._popup)
			}
			;
			return this
		},
		update: function () {
			if (this._icon) {
				this._setPos(this._map.latLngToLayerPoint(this._latlng).round())
			}
			;
			return this
		},
		_initIcon: function () {
			var i = this.options,
				a = this._map,
				l = (a.options.zoomAnimation && a.options.markerZoomAnimation),
				r = l ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide',
				e = i.icon.createIcon(this._icon),
				h = !1;
			if (e !== this._icon) {
				if (this._icon) {
					this._removeIcon()
				}
				;
				h = !0;
				if (i.title) {
					e.title = i.title
				}
				;
				if (i.alt) {
					e.alt = i.alt
				}
			}
			;
			t.DomUtil.addClass(e, r);
			if (i.keyboard) {
				e.tabIndex = '0'
			}
			;
			this._icon = e;
			this._initInteraction();
			if (i.riseOnHover) {
				t.DomEvent.on(e, 'mouseover', this._bringToFront, this).on(e, 'mouseout', this._resetZIndex, this)
			}
			;
			var n = i.icon.createShadow(this._shadow),
				s = !1;
			if (n !== this._shadow) {
				this._removeShadow();
				s = !0
			}
			;
			if (n) {
				t.DomUtil.addClass(n, r)
			}
			;
			this._shadow = n;
			if (i.opacity < 1) {
				this._updateOpacity()
			}
			;
			var o = this._map._panes;
			if (h) {
				o.markerPane.appendChild(this._icon)
			}
			;
			if (n && s) {
				o.shadowPane.appendChild(this._shadow)
			}
		},
		_removeIcon: function () {
			if (this.options.riseOnHover) {
				t.DomEvent.off(this._icon, 'mouseover', this._bringToFront).off(this._icon, 'mouseout', this._resetZIndex)
			}
			;
			this._map._panes.markerPane.removeChild(this._icon);
			this._icon = null
		},
		_removeShadow: function () {
			if (this._shadow) {
				this._map._panes.shadowPane.removeChild(this._shadow)
			}
			;
			this._shadow = null
		},
		_setPos: function (i) {
			t.DomUtil.setPosition(this._icon, i);
			if (this._shadow) {
				t.DomUtil.setPosition(this._shadow, i)
			}
			;
			this._zIndex = i.y + this.options.zIndexOffset;
			this._resetZIndex()
		},
		_updateZIndex: function (t) {
			this._icon.style.zIndex = this._zIndex + t
		},
		_animateZoom: function (t) {
			var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
			this._setPos(i)
		},
		_initInteraction: function () {
			if (!this.options.clickable) {
				return
			}
			;
			var i = this._icon,
				n = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];
			t.DomUtil.addClass(i, 'leaflet-clickable');
			t.DomEvent.on(i, 'click', this._onMouseClick, this);
			t.DomEvent.on(i, 'keypress', this._onKeyPress, this);
			for (var e = 0; e < n.length; e++) {
				t.DomEvent.on(i, n[e], this._fireMouseEvent, this)
			}
			;
			if (t.Handler.MarkerDrag) {
				this.dragging = new t.Handler.MarkerDrag(this);
				if (this.options.draggable) {
					this.dragging.enable()
				}
			}
		},
		_onMouseClick: function (i) {
			var e = this.dragging && this.dragging.moved();
			if (this.hasEventListeners(i.type) || e) {
				t.DomEvent.stopPropagation(i)
			}
			;
			if (e) {
				return
			}
			;
			if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) {
				return
			}
			;
			this.fire(i.type, {
				originalEvent: i,
				latlng: this._latlng
			})
		},
		_onKeyPress: function (t) {
			if (t.keyCode === 13) {
				this.fire('click', {
					originalEvent: t,
					latlng: this._latlng
				})
			}
		},
		_fireMouseEvent: function (i) {
			this.fire(i.type, {
				originalEvent: i,
				latlng: this._latlng
			});
			if (i.type === 'contextmenu' && this.hasEventListeners(i.type)) {
				t.DomEvent.preventDefault(i)
			}
			;
			if (i.type !== 'mousedown') {
				t.DomEvent.stopPropagation(i)
			} else {
				t.DomEvent.preventDefault(i)
			}
		},
		setOpacity: function (t) {
			this.options.opacity = t;
			if (this._map) {
				this._updateOpacity()
			}
			;
			return this
		},
		_updateOpacity: function () {
			t.DomUtil.setOpacity(this._icon, this.options.opacity);
			if (this._shadow) {
				t.DomUtil.setOpacity(this._shadow, this.options.opacity)
			}
		},
		_bringToFront: function () {
			this._updateZIndex(this.options.riseOffset)
		},
		_resetZIndex: function () {
			this._updateZIndex(0)
		}
	});
	t.marker = function (i, e) {
		return new t.Marker(i, e)
	};
	t.DivIcon = t.Icon.extend({
		options: {
			iconSize: [12, 12],
			className: 'leaflet-div-icon',
			html: !1
		},
		createIcon: function (t) {
			var i = (t && t.tagName === 'DIV') ? t : e.createElement('div'),
				n = this.options;
			if (n.html !== !1) {
				i.innerHTML = n.html
			} else {
				i.innerHTML = ''
			}
			;
			if (n.bgPos) {
				i.style.backgroundPosition = (-n.bgPos.x) + 'px ' + (-n.bgPos.y) + 'px'
			}
			;
			this._setIconStyles(i, 'icon');
			return i
		},
		createShadow: function () {
			return null
		}
	});
	t.divIcon = function (i) {
		return new t.DivIcon(i)
	};
	t.Map.mergeOptions({
		closePopupOnClick: !0
	});
	t.Popup = t.Class.extend({
		includes: t.Mixin.Events,
		options: {
			minWidth: 50,
			maxWidth: 300,
			autoPan: !0,
			closeButton: !0,
			offset: [0, 7],
			autoPanPadding: [5, 5],
			keepInView: !1,
			className: '',
			zoomAnimation: !0
		},
		initialize: function (i, e) {
			t.setOptions(this, i);
			this._source = e;
			this._animated = t.Browser.any3d && this.options.zoomAnimation;
			this._isOpen = !1
		},
		onAdd: function (i) {
			this._map = i;
			if (!this._container) {
				this._initLayout()
			}
			;
			var e = i.options.fadeAnimation;
			if (e) {
				t.DomUtil.setOpacity(this._container, 0)
			}
			;
			i._panes.popupPane.appendChild(this._container);
			i.on(this._getEvents(), this);
			this.update();
			if (e) {
				t.DomUtil.setOpacity(this._container, 1)
			}
			;
			this.fire('open');
			i.fire('popupopen', {
				popup: this
			});
			if (this._source) {
				this._source.fire('popupopen', {
					popup: this
				})
			}
		},
		addTo: function (t) {
			t.addLayer(this);
			return this
		},
		openOn: function (t) {
			t.openPopup(this);
			return this
		},
		onRemove: function (i) {
			i._panes.popupPane.removeChild(this._container);
			t.Util.falseFn(this._container.offsetWidth);
			i.off(this._getEvents(), this);
			if (i.options.fadeAnimation) {
				t.DomUtil.setOpacity(this._container, 0)
			}
			;
			this._map = null;
			this.fire('close');
			i.fire('popupclose', {
				popup: this
			});
			if (this._source) {
				this._source.fire('popupclose', {
					popup: this
				})
			}
		},
		getLatLng: function () {
			return this._latlng
		},
		setLatLng: function (i) {
			this._latlng = t.latLng(i);
			if (this._map) {
				this._updatePosition();
				this._adjustPan()
			}
			;
			return this
		},
		getContent: function () {
			return this._content
		},
		setContent: function (t) {
			this._content = t;
			this.update();
			return this
		},
		update: function () {
			if (!this._map) {
				return
			}
			;
			this._container.style.visibility = 'hidden';
			this._updateContent();
			this._updateLayout();
			this._updatePosition();
			this._container.style.visibility = '';
			this._adjustPan()
		},
		_getEvents: function () {
			var t = {
				viewreset: this._updatePosition
			};
			if (this._animated) {
				t.zoomanim = this._zoomAnimation
			}
			;
			if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
				t.preclick = this._close
			}
			;
			if (this.options.keepInView) {
				t.moveend = this._adjustPan
			}
			;
			return t
		},
		_close: function () {
			if (this._map) {
				this._map.closePopup(this)
			}
		},
		_initLayout: function () {
			var i = 'leaflet-popup',
				s = i + ' ' + this.options.className + ' leaflet-zoom-' + (this._animated ? 'animated' : 'hide'),
				o = this._container = t.DomUtil.create('div', s),
				e;
			if (this.options.closeButton) {
				e = this._closeButton = t.DomUtil.create('a', i + '-close-button', o);
				e.href = '#close';
				e.innerHTML = '&#215;';
				t.DomEvent.disableClickPropagation(e);
				t.DomEvent.on(e, 'click', this._onCloseButtonClick, this)
			}
			;
			var n = this._wrapper = t.DomUtil.create('div', i + '-content-wrapper', o);
			t.DomEvent.disableClickPropagation(n);
			this._contentNode = t.DomUtil.create('div', i + '-content', n);
			t.DomEvent.disableScrollPropagation(this._contentNode);
			t.DomEvent.on(n, 'contextmenu', t.DomEvent.stopPropagation);
			this._tipContainer = t.DomUtil.create('div', i + '-tip-container', o);
			this._tip = t.DomUtil.create('div', i + '-tip', this._tipContainer)
		},
		_updateContent: function () {
			if (!this._content) {
				return
			}
			;
			if (typeof this._content === 'string') {
				this._contentNode.innerHTML = this._content
			} else {
				while (this._contentNode.hasChildNodes()) {
					this._contentNode.removeChild(this._contentNode.firstChild)
				}
				;
				this._contentNode.appendChild(this._content)
			}
			;
			this.fire('contentupdate')
		},
		_updateLayout: function () {
			var n = this._contentNode,
				i = n.style;
			i.width = '';
			i.whiteSpace = 'nowrap';
			var e = n.offsetWidth;
			e = Math.min(e, this.options.maxWidth);
			e = Math.max(e, this.options.minWidth);
			i.width = (e + 1) + 'px';
			i.whiteSpace = '';
			i.height = '';
			var a = n.offsetHeight,
				o = this.options.maxHeight,
				s = 'leaflet-popup-scrolled';
			if (o && a > o) {
				i.height = o + 'px';
				t.DomUtil.addClass(n, s)
			} else {
				t.DomUtil.removeClass(n, s)
			}
			;
			this._containerWidth = this._container.offsetWidth
		},
		_updatePosition: function () {
			if (!this._map) {
				return
			}
			;
			var i = this._map.latLngToLayerPoint(this._latlng),
				e = this._animated,
				n = t.point(this.options.offset);
			if (e) {
				t.DomUtil.setPosition(this._container, i)
			}
			;
			this._containerBottom = -n.y - (e ? 0 : i.y);
			this._containerLeft = -Math.round(this._containerWidth / 2) + n.x + (e ? 0 : i.x);
			this._container.style.bottom = this._containerBottom + 'px';
			this._container.style.left = this._containerLeft + 'px'
		},
		_zoomAnimation: function (i) {
			var e = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center);
			t.DomUtil.setPosition(this._container, e)
		},
		_adjustPan: function () {
			if (!this.options.autoPan) {
				return
			}
			;
			var r = this._map,
				h = this._container.offsetHeight,
				u = this._containerWidth,
				c = new t.Point(this._containerLeft, -h - this._containerBottom);
			if (this._animated) {
				c._add(t.DomUtil.getPosition(this._container))
			}
			;
			var i = r.layerPointToContainerPoint(c),
				l = t.point(this.options.autoPanPadding),
				o = t.point(this.options.autoPanPaddingTopLeft || l),
				s = t.point(this.options.autoPanPaddingBottomRight || l),
				a = r.getSize(),
				e = 0,
				n = 0;
			if (i.x + u + s.x > a.x) {
				e = i.x + u - a.x + s.x
			}
			;
			if (i.x - e - o.x < 0) {
				e = i.x - o.x
			}
			;
			if (i.y + h + s.y > a.y) {
				n = i.y + h - a.y + s.y
			}
			;
			if (i.y - n - o.y < 0) {
				n = i.y - o.y
			}
			;
			if (e || n) {
				r.fire('autopanstart').panBy([e, n])
			}
		},
		_onCloseButtonClick: function (i) {
			this._close();
			t.DomEvent.stop(i)
		}
	});
	t.popup = function (i, e) {
		return new t.Popup(i, e)
	};
	t.Map.include({
		openPopup: function (i, e, n) {
			this.closePopup();
			if (!(i instanceof t.Popup)) {
				var o = i;
				i = new t.Popup(n).setLatLng(e).setContent(o)
			}
			;
			i._isOpen = !0;
			this._popup = i;
			return this.addLayer(i)
		},
		closePopup: function (t) {
			if (!t || t === this._popup) {
				t = this._popup;
				this._popup = null
			}
			;
			if (t) {
				this.removeLayer(t);
				t._isOpen = !1
			}
			;
			return this
		}
	});
	t.Marker.include({
		openPopup: function () {
			if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
				this._popup.setLatLng(this._latlng);
				this._map.openPopup(this._popup)
			}
			;
			return this
		},
		closePopup: function () {
			if (this._popup) {
				this._popup._close()
			}
			;
			return this
		},
		togglePopup: function () {
			if (this._popup) {
				if (this._popup._isOpen) {
					this.closePopup()
				} else {
					this.openPopup()
				}
			}
			;
			return this
		},
		bindPopup: function (i, e) {
			var n = t.point(this.options.icon.options.popupAnchor || [0, 0]);
			n = n.add(t.Popup.prototype.options.offset);
			if (e && e.offset) {
				n = n.add(e.offset)
			}
			;
			e = t.extend({
				offset: n
			}, e);
			if (!this._popupHandlersAdded) {
				this.on('click', this.togglePopup, this).on('remove', this.closePopup, this).on('move', this._movePopup, this);
				this._popupHandlersAdded = !0
			}
			;
			if (i instanceof t.Popup) {
				t.setOptions(i, e);
				this._popup = i;
				i._source = this
			} else {
				this._popup = new t.Popup(e, this).setContent(i)
			}
			;
			return this
		},
		setPopupContent: function (t) {
			if (this._popup) {
				this._popup.setContent(t)
			}
			;
			return this
		},
		unbindPopup: function () {
			if (this._popup) {
				this._popup = null;
				this.off('click', this.togglePopup, this).off('remove', this.closePopup, this).off('move', this._movePopup, this);
				this._popupHandlersAdded = !1
			}
			;
			return this
		},
		getPopup: function () {
			return this._popup
		},
		_movePopup: function (t) {
			this._popup.setLatLng(t.latlng)
		}
	});
	t.LayerGroup = t.Class.extend({
		initialize: function (t) {
			this._layers = {};
			var i, e;
			if (t) {
				for (i = 0, e = t.length; i < e; i++) {
					this.addLayer(t[i])
				}
			}
		},
		addLayer: function (t) {
			var i = this.getLayerId(t);
			this._layers[i] = t;
			if (this._map) {
				this._map.addLayer(t)
			}
			;
			return this
		},
		removeLayer: function (t) {
			var i = t in this._layers ? t : this.getLayerId(t);
			if (this._map && this._layers[i]) {
				this._map.removeLayer(this._layers[i])
			}
			;
			delete this._layers[i];
			return this
		},
		hasLayer: function (t) {
			if (!t) {
				return !1
			}
			;
			return (t in this._layers || this.getLayerId(t) in this._layers)
		},
		clearLayers: function () {
			this.eachLayer(this.removeLayer, this);
			return this
		},
		invoke: function (t) {
			var n = Array.prototype.slice.call(arguments, 1),
				e, i;
			for (e in this._layers) {
				i = this._layers[e];
				if (i[t]) {
					i[t].apply(i, n)
				}
			}
			;
			return this
		},
		onAdd: function (t) {
			this._map = t;
			this.eachLayer(t.addLayer, t)
		},
		onRemove: function (t) {
			this.eachLayer(t.removeLayer, t);
			this._map = null
		},
		addTo: function (t) {
			t.addLayer(this);
			return this
		},
		eachLayer: function (t, i) {
			for (var e in this._layers) {
				t.call(i, this._layers[e])
			}
			;
			return this
		},
		getLayer: function (t) {
			return this._layers[t]
		},
		getLayers: function () {
			var t = [];
			for (var i in this._layers) {
				t.push(this._layers[i])
			}
			;
			return t
		},
		setZIndex: function (t) {
			return this.invoke('setZIndex', t)
		},
		getLayerId: function (i) {
			return t.stamp(i)
		}
	});
	t.layerGroup = function (i) {
		return new t.LayerGroup(i)
	};
	t.FeatureGroup = t.LayerGroup.extend({
		includes: t.Mixin.Events,
		statics: {
			EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
		},
		addLayer: function (i) {
			if (this.hasLayer(i)) {
				return this
			}
			;
			if ('on' in i) {
				i.on(t.FeatureGroup.EVENTS, this._propagateEvent, this)
			}
			;
			t.LayerGroup.prototype.addLayer.call(this, i);
			if (this._popupContent && i.bindPopup) {
				i.bindPopup(this._popupContent, this._popupOptions)
			}
			;
			return this.fire('layeradd', {
				layer: i
			})
		},
		removeLayer: function (i) {
			if (!this.hasLayer(i)) {
				return this
			}
			;
			if (i in this._layers) {
				i = this._layers[i]
			}
			;
			if ('off' in i) {
				i.off(t.FeatureGroup.EVENTS, this._propagateEvent, this)
			}
			;
			t.LayerGroup.prototype.removeLayer.call(this, i);
			if (this._popupContent) {
				this.invoke('unbindPopup')
			}
			;
			return this.fire('layerremove', {
				layer: i
			})
		},
		bindPopup: function (t, i) {
			this._popupContent = t;
			this._popupOptions = i;
			return this.invoke('bindPopup', t, i)
		},
		openPopup: function (t) {
			for (var i in this._layers) {
				this._layers[i].openPopup(t);
				break
			}
			;
			return this
		},
		setStyle: function (t) {
			return this.invoke('setStyle', t)
		},
		bringToFront: function () {
			return this.invoke('bringToFront')
		},
		bringToBack: function () {
			return this.invoke('bringToBack')
		},
		getBounds: function () {
			var i = new t.LatLngBounds();
			this.eachLayer(function (e) {
				i.extend(e instanceof t.Marker ? e.getLatLng() : e.getBounds())
			});
			return i
		},
		_propagateEvent: function (i) {
			i = t.extend({
				layer: i.target,
				target: this
			}, i);
			this.fire(i.type, i)
		}
	});
	t.featureGroup = function (i) {
		return new t.FeatureGroup(i)
	};
	t.Path = t.Class.extend({
		includes: [t.Mixin.Events],
		statics: {
			CLIP_PADDING: (function () {
				var e = t.Browser.mobile ? 1280 : 2000,
					n = (e / Math.max(i.outerWidth, i.outerHeight) - 1) / 2;
				return Math.max(0, Math.min(0.5, n))
			})()
		},
		options: {
			stroke: !0,
			color: '#0033ff',
			dashArray: null,
			lineCap: null,
			lineJoin: null,
			weight: 5,
			opacity: 0.5,
			fill: !1,
			fillColor: null,
			fillOpacity: 0.2,
			clickable: !0
		},
		initialize: function (i) {
			t.setOptions(this, i)
		},
		onAdd: function (t) {
			this._map = t;
			if (!this._container) {
				this._initElements();
				this._initEvents()
			}
			;
			this.projectLatlngs();
			this._updatePath();
			if (this._container) {
				this._map._pathRoot.appendChild(this._container)
			}
			;
			this.fire('add');
			t.on({
				'viewreset': this.projectLatlngs,
				'moveend': this._updatePath
			}, this)
		},
		addTo: function (t) {
			t.addLayer(this);
			return this
		},
		onRemove: function (i) {
			i._pathRoot.removeChild(this._container);
			this.fire('remove');
			this._map = null;
			if (t.Browser.vml) {
				this._container = null;
				this._stroke = null;
				this._fill = null
			}
			;
			i.off({
				'viewreset': this.projectLatlngs,
				'moveend': this._updatePath
			}, this)
		},
		projectLatlngs: function () {
		},
		setStyle: function (i) {
			t.setOptions(this, i);
			if (this._container) {
				this._updateStyle()
			}
			;
			return this
		},
		redraw: function () {
			if (this._map) {
				this.projectLatlngs();
				this._updatePath()
			}
			;
			return this
		}
	});
	t.Map.include({
		_updatePathViewport: function () {
			var i = t.Path.CLIP_PADDING,
				e = this.getSize(),
				o = t.DomUtil.getPosition(this._mapPane),
				n = o.multiplyBy(-1)._subtract(e.multiplyBy(i)._round()),
				s = n.add(e.multiplyBy(1 + i * 2)._round());
			this._pathViewport = new t.Bounds(n, s)
		}
	});
	t.Path.SVG_NS = 'http://www.w3.org/2000/svg';
	t.Browser.svg = !!(e.createElementNS && e.createElementNS(t.Path.SVG_NS, 'svg').createSVGRect);
	t.Path = t.Path.extend({
		statics: {
			SVG: t.Browser.svg
		},
		bringToFront: function () {
			var i = this._map._pathRoot,
				t = this._container;
			if (t && i.lastChild !== t) {
				i.appendChild(t)
			}
			;
			return this
		},
		bringToBack: function () {
			var i = this._map._pathRoot,
				t = this._container,
				e = i.firstChild;
			if (t && e !== t) {
				i.insertBefore(t, e)
			}
			;
			return this
		},
		getPathString: function () {
		},
		_createElement: function (i) {
			return e.createElementNS(t.Path.SVG_NS, i)
		},
		_initElements: function () {
			this._map._initPathRoot();
			this._initPath();
			this._initStyle()
		},
		_initPath: function () {
			this._container = this._createElement('g');
			this._path = this._createElement('path');
			if (this.options.className) {
				t.DomUtil.addClass(this._path, this.options.className)
			}
			;
			this._container.appendChild(this._path)
		},
		_initStyle: function () {
			if (this.options.stroke) {
				this._path.setAttribute('stroke-linejoin', 'round');
				this._path.setAttribute('stroke-linecap', 'round')
			}
			;
			if (this.options.fill) {
				this._path.setAttribute('fill-rule', 'evenodd')
			}
			;
			if (this.options.pointerEvents) {
				this._path.setAttribute('pointer-events', this.options.pointerEvents)
			}
			;
			if (!this.options.clickable && !this.options.pointerEvents) {
				this._path.setAttribute('pointer-events', 'none')
			}
			;
			this._updateStyle()
		},
		_updateStyle: function () {
			if (this.options.stroke) {
				this._path.setAttribute('stroke', this.options.color);
				this._path.setAttribute('stroke-opacity', this.options.opacity);
				this._path.setAttribute('stroke-width', this.options.weight);
				if (this.options.dashArray) {
					this._path.setAttribute('stroke-dasharray', this.options.dashArray)
				} else {
					this._path.removeAttribute('stroke-dasharray')
				}
				;
				if (this.options.lineCap) {
					this._path.setAttribute('stroke-linecap', this.options.lineCap)
				}
				;
				if (this.options.lineJoin) {
					this._path.setAttribute('stroke-linejoin', this.options.lineJoin)
				}
			} else {
				this._path.setAttribute('stroke', 'none')
			}
			;
			if (this.options.fill) {
				this._path.setAttribute('fill', this.options.fillColor || this.options.color);
				this._path.setAttribute('fill-opacity', this.options.fillOpacity)
			} else {
				this._path.setAttribute('fill', 'none')
			}
		},
		_updatePath: function () {
			var t = this.getPathString();
			if (!t) {
				t = 'M0 0'
			}
			;
			this._path.setAttribute('d', t)
		},
		_initEvents: function () {
			if (this.options.clickable) {
				if (t.Browser.svg || !t.Browser.vml) {
					t.DomUtil.addClass(this._path, 'leaflet-clickable')
				}
				;
				t.DomEvent.on(this._container, 'click', this._onMouseClick, this);
				var e = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'mousemove', 'contextmenu'];
				for (var i = 0; i < e.length; i++) {
					t.DomEvent.on(this._container, e[i], this._fireMouseEvent, this)
				}
			}
		},
		_onMouseClick: function (t) {
			if (this._map.dragging && this._map.dragging.moved()) {
				return
			}
			;
			this._fireMouseEvent(t)
		},
		_fireMouseEvent: function (i) {
			if (!this._map || !this.hasEventListeners(i.type)) {
				return
			}
			;
			var e = this._map,
				n = e.mouseEventToContainerPoint(i),
				o = e.containerPointToLayerPoint(n),
				s = e.layerPointToLatLng(o);
			this.fire(i.type, {
				latlng: s,
				layerPoint: o,
				containerPoint: n,
				originalEvent: i
			});
			if (i.type === 'contextmenu') {
				t.DomEvent.preventDefault(i)
			}
			;
			if (i.type !== 'mousemove') {
				t.DomEvent.stopPropagation(i)
			}
		}
	});
	t.Map.include({
		_initPathRoot: function () {
			if (!this._pathRoot) {
				this._pathRoot = t.Path.prototype._createElement('svg');
				this._panes.overlayPane.appendChild(this._pathRoot);
				if (this.options.zoomAnimation && t.Browser.any3d) {
					t.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');
					this.on({
						'zoomanim': this._animatePathZoom,
						'zoomend': this._endPathZoom
					})
				} else {
					t.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide')
				}
				;
				this.on('moveend', this._updateSvgViewport);
				this._updateSvgViewport()
			}
		},
		_animatePathZoom: function (i) {
			var e = this.getZoomScale(i.zoom),
				n = this._getCenterOffset(i.center)._multiplyBy(-e)._add(this._pathViewport.min);
			this._pathRoot.style[t.DomUtil.TRANSFORM] = t.DomUtil.getTranslateString(n) + ' scale(' + e + ') ';
			this._pathZooming = !0
		},
		_endPathZoom: function () {
			this._pathZooming = !1
		},
		_updateSvgViewport: function () {
			if (this._pathZooming) {
				return
			}
			;
			this._updatePathViewport();
			var n = this._pathViewport,
				e = n.min,
				o = n.max,
				s = o.x - e.x,
				a = o.y - e.y,
				i = this._pathRoot,
				r = this._panes.overlayPane;
			if (t.Browser.mobileWebkit) {
				r.removeChild(i)
			}
			;
			t.DomUtil.setPosition(i, e);
			i.setAttribute('width', s);
			i.setAttribute('height', a);
			i.setAttribute('viewBox', [e.x, e.y, s, a].join(' '));
			if (t.Browser.mobileWebkit) {
				r.appendChild(i)
			}
		}
	});
	t.Path.include({
		bindPopup: function (i, e) {
			if (i instanceof t.Popup) {
				this._popup = i
			} else {
				if (!this._popup || e) {
					this._popup = new t.Popup(e, this)
				}
				;
				this._popup.setContent(i)
			}
			;
			if (!this._popupHandlersAdded) {
				this.on('click', this._openPopup, this).on('remove', this.closePopup, this);
				this._popupHandlersAdded = !0
			}
			;
			return this
		},
		unbindPopup: function () {
			if (this._popup) {
				this._popup = null;
				this.off('click', this._openPopup).off('remove', this.closePopup);
				this._popupHandlersAdded = !1
			}
			;
			return this
		},
		openPopup: function (t) {
			if (this._popup) {
				t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)];
				this._openPopup({
					latlng: t
				})
			}
			;
			return this
		},
		closePopup: function () {
			if (this._popup) {
				this._popup._close()
			}
			;
			return this
		},
		_openPopup: function (t) {
			this._popup.setLatLng(t.latlng);
			this._map.openPopup(this._popup)
		}
	});
	t.Browser.vml = !t.Browser.svg && (function () {
			try {
				var n = e.createElement('div');
				n.innerHTML = '<v:shape adj="1"/>';
				var i = n.firstChild;
				i.style.behavior = 'url(#default#VML)';
				return i && (typeof i.adj === 'object')
			} catch (t) {
				return !1
			}
		}());
	t.Path = t.Browser.svg || !t.Browser.vml ? t.Path : t.Path.extend({
		statics: {
			VML: !0,
			CLIP_PADDING: 0.02
		},
		_createElement: (function () {
			try {
				e.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
				return function (t) {
					return e.createElement('<lvml:' + t + ' class="lvml">')
				}
			} catch (t) {
				return function (t) {
					return e.createElement('<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
				}
			}
		}()),
		_initPath: function () {
			var i = this._container = this._createElement('shape');
			t.DomUtil.addClass(i, 'leaflet-vml-shape' + (this.options.className ? ' ' + this.options.className : ''));
			if (this.options.clickable) {
				t.DomUtil.addClass(i, 'leaflet-clickable')
			}
			;
			i.coordsize = '1 1';
			this._path = this._createElement('path');
			i.appendChild(this._path);
			this._map._pathRoot.appendChild(i)
		},
		_initStyle: function () {
			this._updateStyle()
		},
		_updateStyle: function () {
			var e = this._stroke,
				n = this._fill,
				i = this.options,
				o = this._container;
			o.stroked = i.stroke;
			o.filled = i.fill;
			if (i.stroke) {
				if (!e) {
					e = this._stroke = this._createElement('stroke');
					e.endcap = 'round';
					o.appendChild(e)
				}
				;
				e.weight = i.weight + 'px';
				e.color = i.color;
				e.opacity = i.opacity;
				if (i.dashArray) {
					e.dashStyle = t.Util.isArray(i.dashArray) ? i.dashArray.join(' ') : i.dashArray.replace(/( *, *)/g, ' ')
				} else {
					e.dashStyle = ''
				}
				;
				if (i.lineCap) {
					e.endcap = i.lineCap.replace('butt', 'flat')
				}
				;
				if (i.lineJoin) {
					e.joinstyle = i.lineJoin
				}
			} else if (e) {
				o.removeChild(e);
				this._stroke = null
			}
			;
			if (i.fill) {
				if (!n) {
					n = this._fill = this._createElement('fill');
					o.appendChild(n)
				}
				;
				n.color = i.fillColor || i.color;
				n.opacity = i.fillOpacity
			} else if (n) {
				o.removeChild(n);
				this._fill = null
			}
		},
		_updatePath: function () {
			var t = this._container.style;
			t.display = 'none';
			this._path.v = this.getPathString() + ' ';
			t.display = ''
		}
	});
	t.Map.include(t.Browser.svg || !t.Browser.vml ? {} : {
		_initPathRoot: function () {
			if (this._pathRoot) {
				return
			}
			;
			var t = this._pathRoot = e.createElement('div');
			t.className = 'leaflet-vml-container';
			this._panes.overlayPane.appendChild(t);
			this.on('moveend', this._updatePathViewport);
			this._updatePathViewport()
		}
	});
	t.Browser.canvas = (function () {
		return !!e.createElement('canvas').getContext
	}());
	t.Path = (t.Path.SVG && !i.L_PREFER_CANVAS) || !t.Browser.canvas ? t.Path : t.Path.extend({
		statics: {
			CANVAS: !0,
			SVG: !1
		},
		redraw: function () {
			if (this._map) {
				this.projectLatlngs();
				this._requestUpdate()
			}
			;
			return this
		},
		setStyle: function (i) {
			t.setOptions(this, i);
			if (this._map) {
				this._updateStyle();
				this._requestUpdate()
			}
			;
			return this
		},
		onRemove: function (t) {
			t.off('viewreset', this.projectLatlngs, this).off('moveend', this._updatePath, this);
			if (this.options.clickable) {
				this._map.off('click', this._onClick, this);
				this._map.off('mousemove', this._onMouseMove, this)
			}
			;
			this._requestUpdate();
			this.fire('remove');
			this._map = null
		},
		_requestUpdate: function () {
			if (this._map && !t.Path._updateRequest) {
				t.Path._updateRequest = t.Util.requestAnimFrame(this._fireMapMoveEnd, this._map)
			}
		},
		_fireMapMoveEnd: function () {
			t.Path._updateRequest = null;
			this.fire('moveend')
		},
		_initElements: function () {
			this._map._initPathRoot();
			this._ctx = this._map._canvasCtx
		},
		_updateStyle: function () {
			var t = this.options;
			if (t.stroke) {
				this._ctx.lineWidth = t.weight;
				this._ctx.strokeStyle = t.color
			}
			;
			if (t.fill) {
				this._ctx.fillStyle = t.fillColor || t.color
			}
			;
			if (t.lineCap) {
				this._ctx.lineCap = t.lineCap
			}
			;
			if (t.lineJoin) {
				this._ctx.lineJoin = t.lineJoin
			}
		},
		_drawPath: function () {
			var i, e, o, s, n, a;
			this._ctx.beginPath();
			for (i = 0, o = this._parts.length; i < o; i++) {
				for (e = 0, s = this._parts[i].length; e < s; e++) {
					n = this._parts[i][e];
					a = (e === 0 ? 'move' : 'line') + 'To';
					this._ctx[a](n.x, n.y)
				}
				;
				if (this instanceof t.Polygon) {
					this._ctx.closePath()
				}
			}
		},
		_checkIfEmpty: function () {
			return !this._parts.length
		},
		_updatePath: function () {
			if (this._checkIfEmpty()) {
				return
			}
			;
			var t = this._ctx,
				i = this.options;
			this._drawPath();
			t.save();
			this._updateStyle();
			if (i.fill) {
				t.globalAlpha = i.fillOpacity;
				t.fill(i.fillRule || 'evenodd')
			}
			;
			if (i.stroke) {
				t.globalAlpha = i.opacity;
				t.stroke()
			}
			;
			t.restore()
		},
		_initEvents: function () {
			if (this.options.clickable) {
				this._map.on('mousemove', this._onMouseMove, this);
				this._map.on('click dblclick contextmenu', this._fireMouseEvent, this)
			}
		},
		_fireMouseEvent: function (t) {
			if (this._containsPoint(t.layerPoint)) {
				this.fire(t.type, t)
			}
		},
		_onMouseMove: function (t) {
			if (!this._map || this._map._animatingZoom) {
				return
			}
			;
			if (this._containsPoint(t.layerPoint)) {
				this._ctx.canvas.style.cursor = 'pointer';
				this._mouseInside = !0;
				this.fire('mouseover', t)
			} else if (this._mouseInside) {
				this._ctx.canvas.style.cursor = '';
				this._mouseInside = !1;
				this.fire('mouseout', t)
			}
		}
	});
	t.Map.include((t.Path.SVG && !i.L_PREFER_CANVAS) || !t.Browser.canvas ? {} : {
		_initPathRoot: function () {
			var t = this._pathRoot,
				i;
			if (!t) {
				t = this._pathRoot = e.createElement('canvas');
				t.style.position = 'absolute';
				i = this._canvasCtx = t.getContext('2d');
				i.lineCap = 'round';
				i.lineJoin = 'round';
				this._panes.overlayPane.appendChild(t);
				if (this.options.zoomAnimation) {
					this._pathRoot.className = 'leaflet-zoom-animated';
					this.on('zoomanim', this._animatePathZoom);
					this.on('zoomend', this._endPathZoom)
				}
				;
				this.on('moveend', this._updateCanvasViewport);
				this._updateCanvasViewport()
			}
		},
		_updateCanvasViewport: function () {
			if (this._pathZooming) {
				return
			}
			;
			this._updatePathViewport();
			var n = this._pathViewport,
				i = n.min,
				o = n.max.subtract(i),
				e = this._pathRoot;
			t.DomUtil.setPosition(e, i);
			e.width = o.x;
			e.height = o.y;
			e.getContext('2d').translate(-i.x, -i.y)
		}
	});
	t.LineUtil = {
		simplify: function (t, i) {
			if (!i || !t.length) {
				return t.slice()
			}
			;
			var e = i * i;
			t = this._reducePoints(t, e);
			t = this._simplifyDP(t, e);
			return t
		},
		pointToSegmentDistance: function (t, i, e) {
			return Math.sqrt(this._sqClosestPointOnSegment(t, i, e, !0))
		},
		closestPointOnSegment: function (t, i, e) {
			return this._sqClosestPointOnSegment(t, i, e)
		},
		_simplifyDP: function (t, i) {
			var o = t.length,
				r = typeof Uint8Array !== n + '' ? Uint8Array : Array,
				s = new r(o);
			s[0] = s[o - 1] = 1;
			this._simplifyDPStep(t, s, i, 0, o - 1);
			var e, a = [];
			for (e = 0; e < o; e++) {
				if (s[e]) {
					a.push(t[e])
				}
			}
			;
			return a
		},
		_simplifyDPStep: function (t, i, e, n, o) {
			var r = 0,
				a, s, h;
			for (s = n + 1; s <= o - 1; s++) {
				h = this._sqClosestPointOnSegment(t[s], t[n], t[o], !0);
				if (h > r) {
					a = s;
					r = h
				}
			}
			;
			if (r > e) {
				i[a] = 1;
				this._simplifyDPStep(t, i, e, n, a);
				this._simplifyDPStep(t, i, e, a, o)
			}
		},
		_reducePoints: function (t, i) {
			var s = [t[0]];
			for (var e = 1, n = 0, o = t.length; e < o; e++) {
				if (this._sqDist(t[e], t[n]) > i) {
					s.push(t[e]);
					n = e
				}
			}
			;
			if (n < o - 1) {
				s.push(t[o - 1])
			}
			;
			return s
		},
		clipSegment: function (t, i, e, n) {
			var o = n ? this._lastCode : this._getBitCode(t, e),
				s = this._getBitCode(i, e),
				r, a, h;
			this._lastCode = s;
			while (!0) {
				if (!(o | s)) {
					return [t, i]
				} else if (o & s) {
					return !1
				} else {
					r = o || s;
					a = this._getEdgeIntersection(t, i, r, e);
					h = this._getBitCode(a, e);
					if (r === o) {
						t = a;
						o = h
					} else {
						i = a;
						s = h
					}
				}
			}
		},
		_getEdgeIntersection: function (i, e, n, o) {
			var s = e.x - i.x,
				a = e.y - i.y,
				r = o.min,
				h = o.max;
			if (n & 8) {
				return new t.Point(i.x + s * (h.y - i.y) / a, h.y)
			} else if (n & 4) {
				return new t.Point(i.x + s * (r.y - i.y) / a, r.y)
			} else if (n & 2) {
				return new t.Point(h.x, i.y + a * (h.x - i.x) / s)
			} else if (n & 1) {
				return new t.Point(r.x, i.y + a * (r.x - i.x) / s)
			}
		},
		_getBitCode: function (t, i) {
			var e = 0;
			if (t.x < i.min.x) {
				e |= 1
			} else if (t.x > i.max.x) {
				e |= 2
			}
			;
			if (t.y < i.min.y) {
				e |= 4
			} else if (t.y > i.max.y) {
				e |= 8
			}
			;
			return e
		},
		_sqDist: function (t, i) {
			var e = i.x - t.x,
				n = i.y - t.y;
			return e * e + n * n
		},
		_sqClosestPointOnSegment: function (i, e, n, o) {
			var r = e.x,
				h = e.y,
				s = n.x - r,
				a = n.y - h,
				u = s * s + a * a,
				l;
			if (u > 0) {
				l = ((i.x - r) * s + (i.y - h) * a) / u;
				if (l > 1) {
					r = n.x;
					h = n.y
				} else if (l > 0) {
					r += s * l;
					h += a * l
				}
			}
			;
			s = i.x - r;
			a = i.y - h;
			return o ? s * s + a * a : new t.Point(r, h)
		}
	};
	t.Polyline = t.Path.extend({
		initialize: function (i, e) {
			t.Path.prototype.initialize.call(this, e);
			this._latlngs = this._convertLatLngs(i)
		},
		options: {
			smoothFactor: 1.0,
			noClip: !1
		},
		projectLatlngs: function () {
			this._originalPoints = [];
			for (var t = 0, i = this._latlngs.length; t < i; t++) {
				this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
			}
		},
		getPathString: function () {
			for (var t = 0, e = this._parts.length, i = ''; t < e; t++) {
				i += this._getPathPartStr(this._parts[t])
			}
			;
			return i
		},
		getLatLngs: function () {
			return this._latlngs
		},
		setLatLngs: function (t) {
			this._latlngs = this._convertLatLngs(t);
			return this.redraw()
		},
		addLatLng: function (i) {
			this._latlngs.push(t.latLng(i));
			return this.redraw()
		},
		spliceLatLngs: function () {
			var t = [].splice.apply(this._latlngs, arguments);
			this._convertLatLngs(this._latlngs, !0);
			this.redraw();
			return t
		},
		closestLayerPoint: function (i) {
			var a = Infinity,
				u = this._parts,
				r, h, n = null;
			for (var s = 0, f = u.length; s < f; s++) {
				var o = u[s];
				for (var e = 1, c = o.length; e < c; e++) {
					r = o[e - 1];
					h = o[e];
					var l = t.LineUtil._sqClosestPointOnSegment(i, r, h, !0);
					if (l < a) {
						a = l;
						n = t.LineUtil._sqClosestPointOnSegment(i, r, h)
					}
				}
			}
			;
			if (n) {
				n.distance = Math.sqrt(a)
			}
			;
			return n
		},
		getBounds: function () {
			return new t.LatLngBounds(this.getLatLngs())
		},
		_convertLatLngs: function (i, e) {
			var n, o, s = e ? i : [];
			for (n = 0, o = i.length; n < o; n++) {
				if (t.Util.isArray(i[n]) && typeof i[n][0] !== 'number') {
					return
				}
				;
				s[n] = t.latLng(i[n])
			}
			;
			return s
		},
		_initEvents: function () {
			t.Path.prototype._initEvents.call(this)
		},
		_getPathPartStr: function (i) {
			var a = t.Path.VML;
			for (var e = 0, s = i.length, o = '', n; e < s; e++) {
				n = i[e];
				if (a) {
					n._round()
				}
				;
				o += (e ? 'L' : 'M') + n.x + ' ' + n.y
			}
			;
			return o
		},
		_clipPoints: function () {
			var n = this._originalPoints,
				a = n.length,
				i, e, o;
			if (this.options.noClip) {
				this._parts = [n];
				return
			}
			;
			this._parts = [];
			var s = this._parts,
				r = this._map._pathViewport,
				h = t.LineUtil;
			for (i = 0, e = 0; i < a - 1; i++) {
				o = h.clipSegment(n[i], n[i + 1], r, i);
				if (!o) {
					continue
				}
				;
				s[e] = s[e] || [];
				s[e].push(o[0]);
				if ((o[1] !== n[i + 1]) || (i === a - 2)) {
					s[e].push(o[1]);
					e++
				}
			}
		},
		_simplifyPoints: function () {
			var e = this._parts,
				o = t.LineUtil;
			for (var i = 0, n = e.length; i < n; i++) {
				e[i] = o.simplify(e[i], this.options.smoothFactor)
			}
		},
		_updatePath: function () {
			if (!this._map) {
				return
			}
			;
			this._clipPoints();
			this._simplifyPoints();
			t.Path.prototype._updatePath.call(this)
		}
	});
	t.polyline = function (i, e) {
		return new t.Polyline(i, e)
	};
	t.PolyUtil = {};
	t.PolyUtil.clipPolygon = function (i, e) {
		var a, p = [1, 4, 2, 8],
			n, f, c, r, h, l, s, o, u = t.LineUtil;
		for (n = 0, l = i.length; n < l; n++) {
			i[n]._code = u._getBitCode(i[n], e)
		}
		;
		for (c = 0; c < 4; c++) {
			s = p[c];
			a = [];
			for (n = 0, l = i.length, f = l - 1; n < l; f = n++) {
				r = i[n];
				h = i[f];
				if (!(r._code & s)) {
					if (h._code & s) {
						o = u._getEdgeIntersection(h, r, s, e);
						o._code = u._getBitCode(o, e);
						a.push(o)
					}
					;
					a.push(r)
				} else if (!(h._code & s)) {
					o = u._getEdgeIntersection(h, r, s, e);
					o._code = u._getBitCode(o, e);
					a.push(o)
				}
			}
			;
			i = a
		}
		;
		return i
	};
	t.Polygon = t.Polyline.extend({
		options: {
			fill: !0
		},
		initialize: function (i, e) {
			t.Polyline.prototype.initialize.call(this, i, e);
			this._initWithHoles(i)
		},
		_initWithHoles: function (i) {
			var e, o, n;
			if (i && t.Util.isArray(i[0]) && (typeof i[0][0] !== 'number')) {
				this._latlngs = this._convertLatLngs(i[0]);
				this._holes = i.slice(1);
				for (e = 0, o = this._holes.length; e < o; e++) {
					n = this._holes[e] = this._convertLatLngs(this._holes[e]);
					if (n[0].equals(n[n.length - 1])) {
						n.pop()
					}
				}
			}
			;
			i = this._latlngs;
			if (i.length >= 2 && i[0].equals(i[i.length - 1])) {
				i.pop()
			}
		},
		projectLatlngs: function () {
			t.Polyline.prototype.projectLatlngs.call(this);
			this._holePoints = [];
			if (!this._holes) {
				return
			}
			;
			var i, e, n, o;
			for (i = 0, n = this._holes.length; i < n; i++) {
				this._holePoints[i] = [];
				for (e = 0, o = this._holes[i].length; e < o; e++) {
					this._holePoints[i][e] = this._map.latLngToLayerPoint(this._holes[i][e])
				}
			}
		},
		setLatLngs: function (i) {
			if (i && t.Util.isArray(i[0]) && (typeof i[0][0] !== 'number')) {
				this._initWithHoles(i);
				return this.redraw()
			} else {
				return t.Polyline.prototype.setLatLngs.call(this, i)
			}
		},
		_clipPoints: function () {
			var s = this._originalPoints,
				n = [];
			this._parts = [s].concat(this._holePoints);
			if (this.options.noClip) {
				return
			}
			;
			for (var i = 0, o = this._parts.length; i < o; i++) {
				var e = t.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
				if (e.length) {
					n.push(e)
				}
			}
			;
			this._parts = n
		},
		_getPathPartStr: function (i) {
			var e = t.Polyline.prototype._getPathPartStr.call(this, i);
			return e + (t.Browser.svg ? 'z' : 'x')
		}
	});
	t.polygon = function (i, e) {
		return new t.Polygon(i, e)
	};
	(function () {
		function i(i) {
			return t.FeatureGroup.extend({
				initialize: function (t, i) {
					this._layers = {};
					this._options = i;
					this.setLatLngs(t)
				},
				setLatLngs: function (t) {
					var e = 0,
						n = t.length;
					this.eachLayer(function (i) {
						if (e < n) {
							i.setLatLngs(t[e++])
						} else {
							this.removeLayer(i)
						}
					}, this);
					while (e < n) {
						this.addLayer(new i(t[e++], this._options))
					}
					;
					return this
				},
				getLatLngs: function () {
					var t = [];
					this.eachLayer(function (i) {
						t.push(i.getLatLngs())
					});
					return t
				}
			})
		};
		t.MultiPolyline = i(t.Polyline);
		t.MultiPolygon = i(t.Polygon);
		t.multiPolyline = function (i, e) {
			return new t.MultiPolyline(i, e)
		};
		t.multiPolygon = function (i, e) {
			return new t.MultiPolygon(i, e)
		}
	}());
	t.Rectangle = t.Polygon.extend({
		initialize: function (i, e) {
			t.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(i), e)
		},
		setBounds: function (t) {
			this.setLatLngs(this._boundsToLatLngs(t))
		},
		_boundsToLatLngs: function (i) {
			i = t.latLngBounds(i);
			return [i.getSouthWest(), i.getNorthWest(), i.getNorthEast(), i.getSouthEast()]
		}
	});
	t.rectangle = function (i, e) {
		return new t.Rectangle(i, e)
	};
	t.Circle = t.Path.extend({
		initialize: function (i, e, n) {
			t.Path.prototype.initialize.call(this, n);
			this._latlng = t.latLng(i);
			this._mRadius = e
		},
		options: {
			fill: !0
		},
		setLatLng: function (i) {
			this._latlng = t.latLng(i);
			return this.redraw()
		},
		setRadius: function (t) {
			this._mRadius = t;
			return this.redraw()
		},
		projectLatlngs: function () {
			var i = this._getLngRadius(),
				t = this._latlng,
				e = this._map.latLngToLayerPoint([t.lat, t.lng - i]);
			this._point = this._map.latLngToLayerPoint(t);
			this._radius = Math.max(this._point.x - e.x, 1)
		},
		getBounds: function () {
			var e = this._getLngRadius(),
				n = (this._mRadius / 40075017) * 360,
				i = this._latlng;
			return new t.LatLngBounds([i.lat - n, i.lng - e], [i.lat + n, i.lng + e])
		},
		getLatLng: function () {
			return this._latlng
		},
		getPathString: function () {
			var e = this._point,
				i = this._radius;
			if (this._checkIfEmpty()) {
				return ''
			}
			;
			if (t.Browser.svg) {
				return 'M' + e.x + ',' + (e.y - i) + 'A' + i + ',' + i + ',0,1,1,' + (e.x - 0.1) + ',' + (e.y - i) + ' z'
			} else {
				e._round();
				i = Math.round(i);
				return 'AL ' + e.x + ',' + e.y + ' ' + i + ',' + i + ' 0,' + (65535 * 360)
			}
		},
		getRadius: function () {
			return this._mRadius
		},
		_getLatRadius: function () {
			return (this._mRadius / 40075017) * 360
		},
		_getLngRadius: function () {
			return this._getLatRadius() / Math.cos(t.LatLng.DEG_TO_RAD * this._latlng.lat)
		},
		_checkIfEmpty: function () {
			if (!this._map) {
				return !1
			}
			;
			var t = this._map._pathViewport,
				i = this._radius,
				e = this._point;
			return e.x - i > t.max.x || e.y - i > t.max.y || e.x + i < t.min.x || e.y + i < t.min.y
		}
	});
	t.circle = function (i, e, n) {
		return new t.Circle(i, e, n)
	};
	t.CircleMarker = t.Circle.extend({
		options: {
			radius: 10,
			weight: 2
		},
		initialize: function (i, e) {
			t.Circle.prototype.initialize.call(this, i, null, e);
			this._radius = this.options.radius
		},
		projectLatlngs: function () {
			this._point = this._map.latLngToLayerPoint(this._latlng)
		},
		_updateStyle: function () {
			t.Circle.prototype._updateStyle.call(this);
			this.setRadius(this.options.radius)
		},
		setLatLng: function (i) {
			t.Circle.prototype.setLatLng.call(this, i);
			if (this._popup && this._popup._isOpen) {
				this._popup.setLatLng(i)
			}
			;
			return this
		},
		setRadius: function (t) {
			this.options.radius = this._radius = t;
			return this.redraw()
		},
		getRadius: function () {
			return this._radius
		}
	});
	t.circleMarker = function (i, e) {
		return new t.CircleMarker(i, e)
	};
	t.Polyline.include(!t.Path.CANVAS ? {} : {
		_containsPoint: function (i, e) {
			var o, n, a, h, r, l, s, u = this.options.weight / 2;
			if (t.Browser.touch) {
				u += 10
			}
			;
			for (o = 0, h = this._parts.length; o < h; o++) {
				s = this._parts[o];
				for (n = 0, r = s.length, a = r - 1; n < r; a = n++) {
					if (!e && (n === 0)) {
						continue
					}
					;
					l = t.LineUtil.pointToSegmentDistance(i, s[a], s[n]);
					if (l <= u) {
						return !0
					}
				}
			}
			;
			return !1
		}
	});
	t.Polygon.include(!t.Path.CANVAS ? {} : {
		_containsPoint: function (i) {
			var r = !1,
				n, e, o, s, a, h, u, l;
			if (t.Polyline.prototype._containsPoint.call(this, i, !0)) {
				return !0
			}
			;
			for (s = 0, u = this._parts.length; s < u; s++) {
				n = this._parts[s];
				for (a = 0, l = n.length, h = l - 1; a < l; h = a++) {
					e = n[a];
					o = n[h];
					if (((e.y > i.y) !== (o.y > i.y)) && (i.x < (o.x - e.x) * (i.y - e.y) / (o.y - e.y) + e.x)) {
						r = !r
					}
				}
			}
			;
			return r
		}
	});
	t.Circle.include(!t.Path.CANVAS ? {} : {
		_drawPath: function () {
			var t = this._point;
			this._ctx.beginPath();
			this._ctx.arc(t.x, t.y, this._radius, 0, Math.PI * 2, !1)
		},
		_containsPoint: function (t) {
			var i = this._point,
				e = this.options.stroke ? this.options.weight / 2 : 0;
			return (t.distanceTo(i) <= this._radius + e)
		}
	});
	t.CircleMarker.include(!t.Path.CANVAS ? {} : {
		_updateStyle: function () {
			t.Path.prototype._updateStyle.call(this)
		}
	});
	t.GeoJSON = t.FeatureGroup.extend({
		initialize: function (i, e) {
			t.setOptions(this, e);
			this._layers = {};
			if (i) {
				this.addData(i)
			}
		},
		addData: function (i) {
			var a = t.Util.isArray(i) ? i : i.features,
				o, r, s;
			if (a) {
				for (o = 0, r = a.length; o < r; o++) {
					s = a[o];
					if (s.geometries || s.geometry || s.features || s.coordinates) {
						this.addData(a[o])
					}
				}
				;
				return this
			}
			;
			var e = this.options;
			if (e.filter && !e.filter(i)) {
				return
			}
			;
			var n = t.GeoJSON.geometryToLayer(i, e.pointToLayer, e.coordsToLatLng, e);
			n.feature = t.GeoJSON.asFeature(i);
			n.defaultOptions = n.options;
			this.resetStyle(n);
			if (e.onEachFeature) {
				e.onEachFeature(i, n)
			}
			;
			return this.addLayer(n)
		},
		resetStyle: function (i) {
			var e = this.options.style;
			if (e) {
				t.Util.extend(i.options, i.defaultOptions);
				this._setLayerStyle(i, e)
			}
		},
		setStyle: function (t) {
			this.eachLayer(function (i) {
				this._setLayerStyle(i, t)
			}, this)
		},
		_setLayerStyle: function (t, i) {
			if (typeof i === 'function') {
				i = i(t.feature)
			}
			;
			if (t.setStyle) {
				t.setStyle(i)
			}
		}
	});
	t.extend(t.GeoJSON, {
		geometryToLayer: function (i, e, n, o) {
			var l = i.type === 'Feature' ? i.geometry : i,
				s = l.coordinates,
				u = [],
				h, a, r, c;
			n = n || this.coordsToLatLng;
			switch (l.type) {
				case 'Point':
					h = n(s);
					return e ? e(i, h) : new t.Marker(h);
				case 'MultiPoint':
					for (r = 0, c = s.length; r < c; r++) {
						h = n(s[r]);
						u.push(e ? e(i, h) : new t.Marker(h))
					}
					;
					return new t.FeatureGroup(u);
				case 'LineString':
					a = this.coordsToLatLngs(s, 0, n);
					return new t.Polyline(a, o);
				case 'Polygon':
					if (s.length === 2 && !s[1].length) {
						throw new Error('Invalid GeoJSON object.')
					}
					;
					a = this.coordsToLatLngs(s, 1, n);
					return new t.Polygon(a, o);
				case 'MultiLineString':
					a = this.coordsToLatLngs(s, 1, n);
					return new t.MultiPolyline(a, o);
				case 'MultiPolygon':
					a = this.coordsToLatLngs(s, 2, n);
					return new t.MultiPolygon(a, o);
				case 'GeometryCollection':
					for (r = 0, c = l.geometries.length; r < c; r++) {
						u.push(this.geometryToLayer({
							geometry: l.geometries[r],
							type: 'Feature',
							properties: i.properties
						}, e, n, o))
					}
					;
					return new t.FeatureGroup(u);
				default:
					throw new Error('Invalid GeoJSON object.')
			}
		},
		coordsToLatLng: function (i) {
			return new t.LatLng(i[1], i[0], i[2])
		},
		coordsToLatLngs: function (t, i, e) {
			var o, n, s, a = [];
			for (n = 0, s = t.length; n < s; n++) {
				o = i ? this.coordsToLatLngs(t[n], i - 1, e) : (e || this.coordsToLatLng)(t[n]);
				a.push(o)
			}
			;
			return a
		},
		latLngToCoords: function (t) {
			var i = [t.lng, t.lat];
			if (t.alt !== n) {
				i.push(t.alt)
			}
			;
			return i
		},
		latLngsToCoords: function (i) {
			var n = [];
			for (var e = 0, o = i.length; e < o; e++) {
				n.push(t.GeoJSON.latLngToCoords(i[e]))
			}
			;
			return n
		},
		getFeature: function (i, e) {
			return i.feature ? t.extend({}, i.feature, {
				geometry: e
			}) : t.GeoJSON.asFeature(e)
		},
		asFeature: function (t) {
			if (t.type === 'Feature') {
				return t
			}
			;
			return {
				type: 'Feature',
				properties: {},
				geometry: t
			}
		}
	});
	var s = {
		toGeoJSON: function () {
			return t.GeoJSON.getFeature(this, {
				type: 'Point',
				coordinates: t.GeoJSON.latLngToCoords(this.getLatLng())
			})
		}
	};
	t.Marker.include(s);
	t.Circle.include(s);
	t.CircleMarker.include(s);
	t.Polyline.include({
		toGeoJSON: function () {
			return t.GeoJSON.getFeature(this, {
				type: 'LineString',
				coordinates: t.GeoJSON.latLngsToCoords(this.getLatLngs())
			})
		}
	});
	t.Polygon.include({
		toGeoJSON: function () {
			var i = [t.GeoJSON.latLngsToCoords(this.getLatLngs())],
				e, o, n;
			i[0].push(i[0][0]);
			if (this._holes) {
				for (e = 0, o = this._holes.length; e < o; e++) {
					n = t.GeoJSON.latLngsToCoords(this._holes[e]);
					n.push(n[0]);
					i.push(n)
				}
			}
			;
			return t.GeoJSON.getFeature(this, {
				type: 'Polygon',
				coordinates: i
			})
		}
	});
	(function () {
		function i(i) {
			return function () {
				var e = [];
				this.eachLayer(function (t) {
					e.push(t.toGeoJSON().geometry.coordinates)
				});
				return t.GeoJSON.getFeature(this, {
					type: i,
					coordinates: e
				})
			}
		};
		t.MultiPolyline.include({
			toGeoJSON: i('MultiLineString')
		});
		t.MultiPolygon.include({
			toGeoJSON: i('MultiPolygon')
		});
		t.LayerGroup.include({
			toGeoJSON: function () {
				var e = this.feature && this.feature.geometry,
					n = [],
					o;
				if (e && e.type === 'MultiPoint') {
					return i('MultiPoint').call(this)
				}
				;
				var s = e && e.type === 'GeometryCollection';
				this.eachLayer(function (i) {
					if (i.toGeoJSON) {
						o = i.toGeoJSON();
						n.push(s ? o.geometry : t.GeoJSON.asFeature(o))
					}
				});
				if (s) {
					return t.GeoJSON.getFeature(this, {
						geometries: n,
						type: 'GeometryCollection'
					})
				}
				;
				return {
					type: 'FeatureCollection',
					features: n
				}
			}
		})
	}());
	t.geoJson = function (i, e) {
		return new t.GeoJSON(i, e)
	};
	t.DomEvent = {
		addListener: function (i, e, n, o) {
			var r = t.stamp(n),
				h = '_leaflet_' + e + r,
				s, a, l;
			if (i[h]) {
				return this
			}
			;
			s = function (e) {
				return n.call(o || i, e || t.DomEvent._getEvent())
			};
			if (t.Browser.pointer && e.indexOf('touch') === 0) {
				return this.addPointerListener(i, e, s, r)
			}
			;
			if (t.Browser.touch && (e === 'dblclick') && this.addDoubleTapListener) {
				this.addDoubleTapListener(i, s, r)
			}
			;
			if ('addEventListener' in i) {
				if (e === 'mousewheel') {
					i.addEventListener('DOMMouseScroll', s, !1);
					i.addEventListener(e, s, !1)
				} else if ((e === 'mouseenter') || (e === 'mouseleave')) {
					a = s;
					l = (e === 'mouseenter' ? 'mouseover' : 'mouseout');
					s = function (e) {
						if (!t.DomEvent._checkMouse(i, e)) {
							return
						}
						;
						return a(e)
					};
					i.addEventListener(l, s, !1)
				} else if (e === 'click' && t.Browser.android) {
					a = s;
					s = function (i) {
						return t.DomEvent._filterClick(i, a)
					};
					i.addEventListener(e, s, !1)
				} else {
					i.addEventListener(e, s, !1)
				}
			} else if ('attachEvent' in i) {
				i.attachEvent('on' + e, s)
			}
			;
			i[h] = s;
			return this
		},
		removeListener: function (i, e, n) {
			var s = t.stamp(n),
				a = '_leaflet_' + e + s,
				o = i[a];
			if (!o) {
				return this
			}
			;
			if (t.Browser.pointer && e.indexOf('touch') === 0) {
				this.removePointerListener(i, e, s)
			} else if (t.Browser.touch && (e === 'dblclick') && this.removeDoubleTapListener) {
				this.removeDoubleTapListener(i, s)
			} else if ('removeEventListener' in i) {
				if (e === 'mousewheel') {
					i.removeEventListener('DOMMouseScroll', o, !1);
					i.removeEventListener(e, o, !1)
				} else if ((e === 'mouseenter') || (e === 'mouseleave')) {
					i.removeEventListener((e === 'mouseenter' ? 'mouseover' : 'mouseout'), o, !1)
				} else {
					i.removeEventListener(e, o, !1)
				}
			} else if ('detachEvent' in i) {
				i.detachEvent('on' + e, o)
			}
			;
			i[a] = null;
			return this
		},
		stopPropagation: function (i) {
			if (i.stopPropagation) {
				i.stopPropagation()
			} else {
				i.cancelBubble = !0
			}
			;
			t.DomEvent._skipped(i);
			return this
		},
		disableScrollPropagation: function (i) {
			var e = t.DomEvent.stopPropagation;
			return t.DomEvent.on(i, 'mousewheel', e).on(i, 'MozMousePixelScroll', e)
		},
		disableClickPropagation: function (i) {
			var n = t.DomEvent.stopPropagation;
			for (var e = t.Draggable.START.length - 1; e >= 0; e--) {
				t.DomEvent.on(i, t.Draggable.START[e], n)
			}
			;
			return t.DomEvent.on(i, 'click', t.DomEvent._fakeStop).on(i, 'dblclick', n)
		},
		preventDefault: function (t) {
			if (t.preventDefault) {
				t.preventDefault()
			} else {
				t.returnValue = !1
			}
			;
			return this
		},
		stop: function (i) {
			return t.DomEvent.preventDefault(i).stopPropagation(i)
		},
		getMousePosition: function (i, e) {
			if (!e) {
				return new t.Point(i.clientX, i.clientY)
			}
			;
			var n = e.getBoundingClientRect();
			return new t.Point(i.clientX - n.left - e.clientLeft, i.clientY - n.top - e.clientTop)
		},
		getWheelDelta: function (t) {
			var i = 0;
			if (t.wheelDelta) {
				i = t.wheelDelta / 120
			}
			;
			if (t.detail) {
				i = -t.detail / 3
			}
			;
			return i
		},
		_skipEvents: {},
		_fakeStop: function (i) {
			t.DomEvent._skipEvents[i.type] = !0
		},
		_skipped: function (t) {
			var i = this._skipEvents[t.type];
			this._skipEvents[t.type] = !1;
			return i
		},
		_checkMouse: function (t, i) {
			var e = i.relatedTarget;
			if (!e) {
				return !0
			}
			;
			try {
				while (e && (e !== t)) {
					e = e.parentNode
				}
			} catch (n) {
				return !1
			}
			;
			return (e !== t)
		},
		_getEvent: function () {
			var t = i.event;
			if (!t) {
				var e = arguments.callee.caller;
				while (e) {
					t = e['arguments'][0];
					if (t && i.Event === t.constructor) {
						break
					}
					;
					e = e.caller
				}
			}
			;
			return t
		},
		_filterClick: function (i, e) {
			var o = (i.timeStamp || i.originalEvent.timeStamp),
				n = t.DomEvent._lastClick && (o - t.DomEvent._lastClick);
			if ((n && n > 100 && n < 500) || (i.target._simulatedClick && !i._simulated)) {
				t.DomEvent.stop(i);
				return
			}
			;
			t.DomEvent._lastClick = o;
			return e(i)
		}
	};
	t.DomEvent.on = t.DomEvent.addListener;
	t.DomEvent.off = t.DomEvent.removeListener;
	t.Draggable = t.Class.extend({
		includes: t.Mixin.Events,
		statics: {
			START: t.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
			END: {
				mousedown: 'mouseup',
				touchstart: 'touchend',
				pointerdown: 'touchend',
				MSPointerDown: 'touchend'
			},
			MOVE: {
				mousedown: 'mousemove',
				touchstart: 'touchmove',
				pointerdown: 'touchmove',
				MSPointerDown: 'touchmove'
			}
		},
		initialize: function (t, i) {
			this._element = t;
			this._dragStartTarget = i || t
		},
		enable: function () {
			if (this._enabled) {
				return
			}
			;
			for (var i = t.Draggable.START.length - 1; i >= 0; i--) {
				t.DomEvent.on(this._dragStartTarget, t.Draggable.START[i], this._onDown, this)
			}
			;
			this._enabled = !0
		},
		disable: function () {
			if (!this._enabled) {
				return
			}
			;
			for (var i = t.Draggable.START.length - 1; i >= 0; i--) {
				t.DomEvent.off(this._dragStartTarget, t.Draggable.START[i], this._onDown, this)
			}
			;
			this._enabled = !1;
			this._moved = !1
		},
		_onDown: function (i) {
			this._moved = !1;
			if (i.shiftKey || ((i.which !== 1) && (i.button !== 1) && !i.touches)) {
				return
			}
			;
			t.DomEvent.stopPropagation(i);
			if (t.Draggable._disabled) {
				return
			}
			;
			t.DomUtil.disableImageDrag();
			t.DomUtil.disableTextSelection();
			if (this._moving) {
				return
			}
			;
			var n = i.touches ? i.touches[0] : i;
			this._startPoint = new t.Point(n.clientX, n.clientY);
			this._startPos = this._newPos = t.DomUtil.getPosition(this._element);
			t.DomEvent.on(e, t.Draggable.MOVE[i.type], this._onMove, this).on(e, t.Draggable.END[i.type], this._onUp, this)
		},
		_onMove: function (i) {
			if (i.touches && i.touches.length > 1) {
				this._moved = !0;
				return
			}
			;
			var o = (i.touches && i.touches.length === 1 ? i.touches[0] : i),
				s = new t.Point(o.clientX, o.clientY),
				n = s.subtract(this._startPoint);
			if (!n.x && !n.y) {
				return
			}
			;
			if (t.Browser.touch && Math.abs(n.x) + Math.abs(n.y) < 3) {
				return
			}
			;
			t.DomEvent.preventDefault(i);
			if (!this._moved) {
				this.fire('dragstart');
				this._moved = !0;
				this._startPos = t.DomUtil.getPosition(this._element).subtract(n);
				t.DomUtil.addClass(e.body, 'leaflet-dragging');
				this._lastTarget = i.target || i.srcElement;
				t.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target')
			}
			;
			this._newPos = this._startPos.add(n);
			this._moving = !0;
			t.Util.cancelAnimFrame(this._animRequest);
			this._animRequest = t.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)
		},
		_updatePosition: function () {
			this.fire('predrag');
			t.DomUtil.setPosition(this._element, this._newPos);
			this.fire('drag')
		},
		_onUp: function () {
			t.DomUtil.removeClass(e.body, 'leaflet-dragging');
			if (this._lastTarget) {
				t.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
				this._lastTarget = null
			}
			;
			for (var i in t.Draggable.MOVE) {
				t.DomEvent.off(e, t.Draggable.MOVE[i], this._onMove).off(e, t.Draggable.END[i], this._onUp)
			}
			;
			t.DomUtil.enableImageDrag();
			t.DomUtil.enableTextSelection();
			if (this._moved && this._moving) {
				t.Util.cancelAnimFrame(this._animRequest);
				this.fire('dragend', {
					distance: this._newPos.distanceTo(this._startPos)
				})
			}
			;
			this._moving = !1
		}
	});
	t.Handler = t.Class.extend({
		initialize: function (t) {
			this._map = t
		},
		enable: function () {
			if (this._enabled) {
				return
			}
			;
			this._enabled = !0;
			this.addHooks()
		},
		disable: function () {
			if (!this._enabled) {
				return
			}
			;
			this._enabled = !1;
			this.removeHooks()
		},
		enabled: function () {
			return !!this._enabled
		}
	});
	t.Map.mergeOptions({
		dragging: !0,
		inertia: !t.Browser.android23,
		inertiaDeceleration: 3400,
		inertiaMaxSpeed: Infinity,
		inertiaThreshold: t.Browser.touch ? 32 : 18,
		easeLinearity: 0.25,
		worldCopyJump: !1
	});
	t.Map.Drag = t.Handler.extend({
		addHooks: function () {
			if (!this._draggable) {
				var i = this._map;
				this._draggable = new t.Draggable(i._mapPane, i._container);
				this._draggable.on({
					'dragstart': this._onDragStart,
					'drag': this._onDrag,
					'dragend': this._onDragEnd
				}, this);
				if (i.options.worldCopyJump) {
					this._draggable.on('predrag', this._onPreDrag, this);
					i.on('viewreset', this._onViewReset, this);
					i.whenReady(this._onViewReset, this)
				}
			}
			;
			this._draggable.enable()
		},
		removeHooks: function () {
			this._draggable.disable()
		},
		moved: function () {
			return this._draggable && this._draggable._moved
		},
		_onDragStart: function () {
			var t = this._map;
			if (t._panAnim) {
				t._panAnim.stop()
			}
			;
			t.fire('movestart').fire('dragstart');
			if (t.options.inertia) {
				this._positions = [];
				this._times = []
			}
		},
		_onDrag: function () {
			if (this._map.options.inertia) {
				var t = this._lastTime = +new Date(),
					i = this._lastPos = this._draggable._newPos;
				this._positions.push(i);
				this._times.push(t);
				if (t - this._times[0] > 200) {
					this._positions.shift();
					this._times.shift()
				}
			}
			;
			this._map.fire('move').fire('drag')
		},
		_onViewReset: function () {
			var t = this._map.getSize()._divideBy(2),
				i = this._map.latLngToLayerPoint([0, 0]);
			this._initialWorldOffset = i.subtract(t).x;
			this._worldWidth = this._map.project([0, 180]).x
		},
		_onPreDrag: function () {
			var e = this._worldWidth,
				i = Math.round(e / 2),
				t = this._initialWorldOffset,
				n = this._draggable._newPos.x,
				o = (n - i + t) % e + i - t,
				s = (n + i + t) % e - i - t,
				a = Math.abs(o + t) < Math.abs(s + t) ? o : s;
			this._draggable._newPos.x = a
		},
		_onDragEnd: function (i) {
			var e = this._map,
				o = e.options,
				u = +new Date() - this._lastTime,
				d = !o.inertia || u > o.inertiaThreshold || !this._positions[0];
			e.fire('dragend', i);
			if (d) {
				e.fire('moveend')
			} else {
				var c = this._lastPos.subtract(this._positions[0]),
					f = (this._lastTime + u - this._times[0]) / 1000,
					s = o.easeLinearity,
					a = c.multiplyBy(s / f),
					r = a.distanceTo([0, 0]),
					h = Math.min(o.inertiaMaxSpeed, r),
					p = a.multiplyBy(h / r),
					l = h / (o.inertiaDeceleration * s),
					n = p.multiplyBy(-l / 2).round();
				if (!n.x || !n.y) {
					e.fire('moveend')
				} else {
					n = e._limitOffset(n, e.options.maxBounds);
					t.Util.requestAnimFrame(function () {
						e.panBy(n, {
							duration: l,
							easeLinearity: s,
							noMoveStart: !0
						})
					})
				}
			}
		}
	});
	t.Map.addInitHook('addHandler', 'dragging', t.Map.Drag);
	t.Map.mergeOptions({
		doubleClickZoom: !0
	});
	t.Map.DoubleClickZoom = t.Handler.extend({
		addHooks: function () {
			this._map.on('dblclick', this._onDoubleClick, this)
		},
		removeHooks: function () {
			this._map.off('dblclick', this._onDoubleClick, this)
		},
		_onDoubleClick: function (t) {
			var i = this._map,
				e = i.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
			if (i.options.doubleClickZoom === 'center') {
				i.setZoom(e)
			} else {
				i.setZoomAround(t.containerPoint, e)
			}
		}
	});
	t.Map.addInitHook('addHandler', 'doubleClickZoom', t.Map.DoubleClickZoom);
	t.Map.mergeOptions({
		scrollWheelZoom: !0
	});
	t.Map.ScrollWheelZoom = t.Handler.extend({
		addHooks: function () {
			t.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
			t.DomEvent.on(this._map._container, 'MozMousePixelScroll', t.DomEvent.preventDefault);
			this._delta = 0
		},
		removeHooks: function () {
			t.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
			t.DomEvent.off(this._map._container, 'MozMousePixelScroll', t.DomEvent.preventDefault)
		},
		_onWheelScroll: function (i) {
			var n = t.DomEvent.getWheelDelta(i);
			this._delta += n;
			this._lastMousePos = this._map.mouseEventToContainerPoint(i);
			if (!this._startTime) {
				this._startTime = +new Date()
			}
			;
			var e = Math.max(40 - (+new Date() - this._startTime), 0);
			clearTimeout(this._timer);
			this._timer = setTimeout(t.bind(this._performZoom, this), e);
			t.DomEvent.preventDefault(i);
			t.DomEvent.stopPropagation(i)
		},
		_performZoom: function () {
			var i = this._map,
				t = this._delta,
				e = i.getZoom();
			t = t > 0 ? Math.ceil(t) : Math.floor(t);
			t = Math.max(Math.min(t, 4), -4);
			t = i._limitZoom(e + t) - e;
			this._delta = 0;
			this._startTime = null;
			if (!t) {
				return
			}
			;
			if (i.options.scrollWheelZoom === 'center') {
				i.setZoom(e + t)
			} else {
				i.setZoomAround(this._lastMousePos, e + t)
			}
		}
	});
	t.Map.addInitHook('addHandler', 'scrollWheelZoom', t.Map.ScrollWheelZoom);
	t.extend(t.DomEvent, {
		_touchstart: t.Browser.msPointer ? 'MSPointerDown' : t.Browser.pointer ? 'pointerdown' : 'touchstart',
		_touchend: t.Browser.msPointer ? 'MSPointerUp' : t.Browser.pointer ? 'pointerup' : 'touchend',
		addDoubleTapListener: function (i, n, o) {
			var r, u = !1,
				m = 250,
				s, c = '_leaflet_',
				f = this._touchstart,
				p = this._touchend,
				a = [];

			function d(i) {
				var n;
				if (t.Browser.pointer) {
					a.push(i.pointerId);
					n = a.length
				} else {
					n = i.touches.length
				}
				;
				if (n > 1) {
					return
				}
				;
				var e = Date.now(),
					o = e - (r || e);
				s = i.touches ? i.touches[0] : i;
				u = (o > 0 && o <= m);
				r = e
			};

			function h(i) {
				if (t.Browser.pointer) {
					var l = a.indexOf(i.pointerId);
					if (l === -1) {
						return
					}
					;
					a.splice(l, 1)
				}
				;
				if (u) {
					if (t.Browser.pointer) {
						var h = {},
							e;
						for (var o in s) {
							e = s[o];
							if (typeof e === 'function') {
								h[o] = e.bind(s)
							} else {
								h[o] = e
							}
						}
						;
						s = h
					}
					;
					s.type = 'dblclick';
					n(s);
					r = null
				}
			};
			i[c + f + o] = d;
			i[c + p + o] = h;
			var l = t.Browser.pointer ? e.documentElement : i;
			i.addEventListener(f, d, !1);
			l.addEventListener(p, h, !1);
			if (t.Browser.pointer) {
				l.addEventListener(t.DomEvent.POINTER_CANCEL, h, !1)
			}
			;
			return this
		},
		removeDoubleTapListener: function (i, n) {
			var o = '_leaflet_';
			i.removeEventListener(this._touchstart, i[o + this._touchstart + n], !1);
			(t.Browser.pointer ? e.documentElement : i).removeEventListener(this._touchend, i[o + this._touchend + n], !1);
			if (t.Browser.pointer) {
				e.documentElement.removeEventListener(t.DomEvent.POINTER_CANCEL, i[o + this._touchend + n], !1)
			}
			;
			return this
		}
	});
	t.extend(t.DomEvent, {
		POINTER_DOWN: t.Browser.msPointer ? 'MSPointerDown' : 'pointerdown',
		POINTER_MOVE: t.Browser.msPointer ? 'MSPointerMove' : 'pointermove',
		POINTER_UP: t.Browser.msPointer ? 'MSPointerUp' : 'pointerup',
		POINTER_CANCEL: t.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',
		_pointers: [],
		_pointerDocumentListener: !1,
		addPointerListener: function (t, i, e, n) {
			switch (i) {
				case 'touchstart':
					return this.addPointerListenerStart(t, i, e, n);
				case 'touchend':
					return this.addPointerListenerEnd(t, i, e, n);
				case 'touchmove':
					return this.addPointerListenerMove(t, i, e, n);
				default:
					throw 'Unknown touch event type'
			}
		},
		addPointerListenerStart: function (i, n, o, s) {
			var l = '_leaflet_',
				a = this._pointers,
				h = function (i) {
					if (i.pointerType !== 'mouse' && i.pointerType !== i.MSPOINTER_TYPE_MOUSE) {
						t.DomEvent.preventDefault(i)
					}
					;
					var n = !1;
					for (var e = 0; e < a.length; e++) {
						if (a[e].pointerId === i.pointerId) {
							n = !0;
							break
						}
					}
					;
					if (!n) {
						a.push(i)
					}
					;
					i.touches = a.slice();
					i.changedTouches = [i];
					o(i)
				};
			i[l + 'touchstart' + s] = h;
			i.addEventListener(this.POINTER_DOWN, h, !1);
			if (!this._pointerDocumentListener) {
				var r = function (t) {
					for (var i = 0; i < a.length; i++) {
						if (a[i].pointerId === t.pointerId) {
							a.splice(i, 1);
							break
						}
					}
				};
				e.documentElement.addEventListener(this.POINTER_UP, r, !1);
				e.documentElement.addEventListener(this.POINTER_CANCEL, r, !1);
				this._pointerDocumentListener = !0
			}
			;
			return this
		},
		addPointerListenerMove: function (t, i, e, n) {
			var a = '_leaflet_',
				o = this._pointers;

			function s(t) {
				if ((t.pointerType === t.MSPOINTER_TYPE_MOUSE || t.pointerType === 'mouse') && t.buttons === 0) {
					return
				}
				;
				for (var i = 0; i < o.length; i++) {
					if (o[i].pointerId === t.pointerId) {
						o[i] = t;
						break
					}
				}
				;
				t.touches = o.slice();
				t.changedTouches = [t];
				e(t)
			};
			t[a + 'touchmove' + n] = s;
			t.addEventListener(this.POINTER_MOVE, s, !1);
			return this
		},
		addPointerListenerEnd: function (t, i, e, n) {
			var a = '_leaflet_',
				o = this._pointers,
				s = function (t) {
					for (var i = 0; i < o.length; i++) {
						if (o[i].pointerId === t.pointerId) {
							o.splice(i, 1);
							break
						}
					}
					;
					t.touches = o.slice();
					t.changedTouches = [t];
					e(t)
				};
			t[a + 'touchend' + n] = s;
			t.addEventListener(this.POINTER_UP, s, !1);
			t.addEventListener(this.POINTER_CANCEL, s, !1);
			return this
		},
		removePointerListener: function (t, i, e) {
			var o = '_leaflet_',
				n = t[o + i + e];
			switch (i) {
				case 'touchstart':
					t.removeEventListener(this.POINTER_DOWN, n, !1);
					break;
				case 'touchmove':
					t.removeEventListener(this.POINTER_MOVE, n, !1);
					break;
				case 'touchend':
					t.removeEventListener(this.POINTER_UP, n, !1);
					t.removeEventListener(this.POINTER_CANCEL, n, !1);
					break
			}
			;
			return this
		}
	});
	t.Map.mergeOptions({
		touchZoom: t.Browser.touch && !t.Browser.android23,
		bounceAtZoomLimits: !0
	});
	t.Map.TouchZoom = t.Handler.extend({
		addHooks: function () {
			t.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this)
		},
		removeHooks: function () {
			t.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this)
		},
		_onTouchStart: function (i) {
			var n = this._map;
			if (!i.touches || i.touches.length !== 2 || n._animatingZoom || this._zooming) {
				return
			}
			;
			var o = n.mouseEventToLayerPoint(i.touches[0]),
				s = n.mouseEventToLayerPoint(i.touches[1]),
				a = n._getCenterLayerPoint();
			this._startCenter = o.add(s)._divideBy(2);
			this._startDist = o.distanceTo(s);
			this._moved = !1;
			this._zooming = !0;
			this._centerOffset = a.subtract(this._startCenter);
			if (n._panAnim) {
				n._panAnim.stop()
			}
			;
			t.DomEvent.on(e, 'touchmove', this._onTouchMove, this).on(e, 'touchend', this._onTouchEnd, this);
			t.DomEvent.preventDefault(i)
		},
		_onTouchMove: function (i) {
			var e = this._map;
			if (!i.touches || i.touches.length !== 2 || !this._zooming) {
				return
			}
			;
			var n = e.mouseEventToLayerPoint(i.touches[0]),
				o = e.mouseEventToLayerPoint(i.touches[1]);
			this._scale = n.distanceTo(o) / this._startDist;
			this._delta = n._add(o)._divideBy(2)._subtract(this._startCenter);
			if (this._scale === 1) {
				return
			}
			;
			if (!e.options.bounceAtZoomLimits) {
				if ((e.getZoom() === e.getMinZoom() && this._scale < 1) || (e.getZoom() === e.getMaxZoom() && this._scale > 1)) {
					return
				}
			}
			;
			if (!this._moved) {
				t.DomUtil.addClass(e._mapPane, 'leaflet-touching');
				e.fire('movestart').fire('zoomstart');
				this._moved = !0
			}
			;
			t.Util.cancelAnimFrame(this._animRequest);
			this._animRequest = t.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container);
			t.DomEvent.preventDefault(i)
		},
		_updateOnMove: function () {
			var t = this._map,
				i = this._getScaleOrigin(),
				e = t.layerPointToLatLng(i),
				n = t.getScaleZoom(this._scale);
			t._animateZoom(e, n, this._startCenter, this._scale, this._delta, !1, !0)
		},
		_onTouchEnd: function () {
			if (!this._moved || !this._zooming) {
				this._zooming = !1;
				return
			}
			;
			var i = this._map;
			this._zooming = !1;
			t.DomUtil.removeClass(i._mapPane, 'leaflet-touching');
			t.Util.cancelAnimFrame(this._animRequest);
			t.DomEvent.off(e, 'touchmove', this._onTouchMove).off(e, 'touchend', this._onTouchEnd);
			var o = this._getScaleOrigin(),
				r = i.layerPointToLatLng(o),
				s = i.getZoom(),
				n = i.getScaleZoom(this._scale) - s,
				h = (n > 0 ? Math.ceil(n) : Math.floor(n)),
				a = i._limitZoom(s + h),
				l = i.getZoomScale(a) / this._scale;
			i._animateZoom(r, a, o, l)
		},
		_getScaleOrigin: function () {
			var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
			return this._startCenter.add(t)
		}
	});
	t.Map.addInitHook('addHandler', 'touchZoom', t.Map.TouchZoom);
	t.Map.mergeOptions({
		tap: !0,
		tapTolerance: 15
	});
	t.Map.Tap = t.Handler.extend({
		addHooks: function () {
			t.DomEvent.on(this._map._container, 'touchstart', this._onDown, this)
		},
		removeHooks: function () {
			t.DomEvent.off(this._map._container, 'touchstart', this._onDown, this)
		},
		_onDown: function (i) {
			if (!i.touches) {
				return
			}
			;
			t.DomEvent.preventDefault(i);
			this._fireClick = !0;
			if (i.touches.length > 1) {
				this._fireClick = !1;
				clearTimeout(this._holdTimeout);
				return
			}
			;
			var n = i.touches[0],
				o = n.target;
			this._startPos = this._newPos = new t.Point(n.clientX, n.clientY);
			if (o.tagName && o.tagName.toLowerCase() === 'a') {
				t.DomUtil.addClass(o, 'leaflet-active')
			}
			;
			this._holdTimeout = setTimeout(t.bind(function () {
				if (this._isTapValid()) {
					this._fireClick = !1;
					this._onUp();
					this._simulateEvent('contextmenu', n)
				}
			}, this), 1000);
			t.DomEvent.on(e, 'touchmove', this._onMove, this).on(e, 'touchend', this._onUp, this)
		},
		_onUp: function (i) {
			clearTimeout(this._holdTimeout);
			t.DomEvent.off(e, 'touchmove', this._onMove, this).off(e, 'touchend', this._onUp, this);
			if (this._fireClick && i && i.changedTouches) {
				var o = i.changedTouches[0],
					n = o.target;
				if (n && n.tagName && n.tagName.toLowerCase() === 'a') {
					t.DomUtil.removeClass(n, 'leaflet-active')
				}
				;
				if (this._isTapValid()) {
					this._simulateEvent('click', o)
				}
			}
		},
		_isTapValid: function () {
			return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
		},
		_onMove: function (i) {
			var e = i.touches[0];
			this._newPos = new t.Point(e.clientX, e.clientY)
		},
		_simulateEvent: function (t, n) {
			var o = e.createEvent('MouseEvents');
			o._simulated = !0;
			n.target._simulatedClick = !0;
			o.initMouseEvent(t, !0, !0, i, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null);
			n.target.dispatchEvent(o)
		}
	});
	if (t.Browser.touch && !t.Browser.pointer) {
		t.Map.addInitHook('addHandler', 'tap', t.Map.Tap)
	}
	;
	t.Map.mergeOptions({
		boxZoom: !0
	});
	t.Map.BoxZoom = t.Handler.extend({
		initialize: function (t) {
			this._map = t;
			this._container = t._container;
			this._pane = t._panes.overlayPane;
			this._moved = !1
		},
		addHooks: function () {
			t.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this)
		},
		removeHooks: function () {
			t.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
			this._moved = !1
		},
		moved: function () {
			return this._moved
		},
		_onMouseDown: function (i) {
			this._moved = !1;
			if (!i.shiftKey || ((i.which !== 1) && (i.button !== 1))) {
				return !1
			}
			;
			t.DomUtil.disableTextSelection();
			t.DomUtil.disableImageDrag();
			this._startLayerPoint = this._map.mouseEventToLayerPoint(i);
			t.DomEvent.on(e, 'mousemove', this._onMouseMove, this).on(e, 'mouseup', this._onMouseUp, this).on(e, 'keydown', this._onKeyDown, this)
		},
		_onMouseMove: function (i) {
			if (!this._moved) {
				this._box = t.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
				t.DomUtil.setPosition(this._box, this._startLayerPoint);
				this._container.style.cursor = 'crosshair';
				this._map.fire('boxzoomstart')
			}
			;
			var e = this._startLayerPoint,
				n = this._box,
				o = this._map.mouseEventToLayerPoint(i),
				s = o.subtract(e),
				a = new t.Point(Math.min(o.x, e.x), Math.min(o.y, e.y));
			t.DomUtil.setPosition(n, a);
			this._moved = !0;
			n.style.width = (Math.max(0, Math.abs(s.x) - 4)) + 'px';
			n.style.height = (Math.max(0, Math.abs(s.y) - 4)) + 'px'
		},
		_finish: function () {
			if (this._moved) {
				this._pane.removeChild(this._box);
				this._container.style.cursor = ''
			}
			;
			t.DomUtil.enableTextSelection();
			t.DomUtil.enableImageDrag();
			t.DomEvent.off(e, 'mousemove', this._onMouseMove).off(e, 'mouseup', this._onMouseUp).off(e, 'keydown', this._onKeyDown)
		},
		_onMouseUp: function (i) {
			this._finish();
			var e = this._map,
				o = e.mouseEventToLayerPoint(i);
			if (this._startLayerPoint.equals(o)) {
				return
			}
			;
			var n = new t.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint), e.layerPointToLatLng(o));
			e.fitBounds(n);
			e.fire('boxzoomend', {
				boxZoomBounds: n
			})
		},
		_onKeyDown: function (t) {
			if (t.keyCode === 27) {
				this._finish()
			}
		}
	});
	t.Map.addInitHook('addHandler', 'boxZoom', t.Map.BoxZoom);
	t.Map.mergeOptions({
		keyboard: !0,
		keyboardPanOffset: 80,
		keyboardZoomOffset: 1
	});
	t.Map.Keyboard = t.Handler.extend({
		keyCodes: {
			left: [37],
			right: [39],
			down: [40],
			up: [38],
			zoomIn: [187, 107, 61, 171],
			zoomOut: [189, 109, 173]
		},
		initialize: function (t) {
			this._map = t;
			this._setPanOffset(t.options.keyboardPanOffset);
			this._setZoomOffset(t.options.keyboardZoomOffset)
		},
		addHooks: function () {
			var i = this._map._container;
			if (i.tabIndex === -1) {
				i.tabIndex = '0'
			}
			;
			t.DomEvent.on(i, 'focus', this._onFocus, this).on(i, 'blur', this._onBlur, this).on(i, 'mousedown', this._onMouseDown, this);
			this._map.on('focus', this._addHooks, this).on('blur', this._removeHooks, this)
		},
		removeHooks: function () {
			this._removeHooks();
			var i = this._map._container;
			t.DomEvent.off(i, 'focus', this._onFocus, this).off(i, 'blur', this._onBlur, this).off(i, 'mousedown', this._onMouseDown, this);
			this._map.off('focus', this._addHooks, this).off('blur', this._removeHooks, this)
		},
		_onMouseDown: function () {
			if (this._focused) {
				return
			}
			;
			var t = e.body,
				n = e.documentElement,
				o = t.scrollTop || n.scrollTop,
				s = t.scrollLeft || n.scrollLeft;
			this._map._container.focus();
			i.scrollTo(s, o)
		},
		_onFocus: function () {
			this._focused = !0;
			this._map.fire('focus')
		},
		_onBlur: function () {
			this._focused = !1;
			this._map.fire('blur')
		},
		_setPanOffset: function (t) {
			var o = this._panKeys = {},
				e = this.keyCodes,
				i, n;
			for (i = 0, n = e.left.length; i < n; i++) {
				o[e.left[i]] = [-1 * t, 0]
			}
			;
			for (i = 0, n = e.right.length; i < n; i++) {
				o[e.right[i]] = [t, 0]
			}
			;
			for (i = 0, n = e.down.length; i < n; i++) {
				o[e.down[i]] = [0, t]
			}
			;
			for (i = 0, n = e.up.length; i < n; i++) {
				o[e.up[i]] = [0, -1 * t]
			}
		},
		_setZoomOffset: function (t) {
			var o = this._zoomKeys = {},
				e = this.keyCodes,
				i, n;
			for (i = 0, n = e.zoomIn.length; i < n; i++) {
				o[e.zoomIn[i]] = t
			}
			;
			for (i = 0, n = e.zoomOut.length; i < n; i++) {
				o[e.zoomOut[i]] = -t
			}
		},
		_addHooks: function () {
			t.DomEvent.on(e, 'keydown', this._onKeyDown, this)
		},
		_removeHooks: function () {
			t.DomEvent.off(e, 'keydown', this._onKeyDown, this)
		},
		_onKeyDown: function (i) {
			var n = i.keyCode,
				e = this._map;
			if (n in this._panKeys) {
				if (e._panAnim && e._panAnim._inProgress) {
					return
				}
				;
				e.panBy(this._panKeys[n]);
				if (e.options.maxBounds) {
					e.panInsideBounds(e.options.maxBounds)
				}
			} else if (n in this._zoomKeys) {
				e.setZoom(e.getZoom() + this._zoomKeys[n])
			} else {
				return
			}
			;
			t.DomEvent.stop(i)
		}
	});
	t.Map.addInitHook('addHandler', 'keyboard', t.Map.Keyboard);
	t.Handler.MarkerDrag = t.Handler.extend({
		initialize: function (t) {
			this._marker = t
		},
		addHooks: function () {
			var i = this._marker._icon;
			if (!this._draggable) {
				this._draggable = new t.Draggable(i, i)
			}
			;
			this._draggable.on('dragstart', this._onDragStart, this).on('drag', this._onDrag, this).on('dragend', this._onDragEnd, this);
			this._draggable.enable();
			t.DomUtil.addClass(this._marker._icon, 'leaflet-marker-draggable')
		},
		removeHooks: function () {
			this._draggable.off('dragstart', this._onDragStart, this).off('drag', this._onDrag, this).off('dragend', this._onDragEnd, this);
			this._draggable.disable();
			t.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable')
		},
		moved: function () {
			return this._draggable && this._draggable._moved
		},
		_onDragStart: function () {
			this._marker.closePopup().fire('movestart').fire('dragstart')
		},
		_onDrag: function () {
			var i = this._marker,
				e = i._shadow,
				n = t.DomUtil.getPosition(i._icon),
				o = i._map.layerPointToLatLng(n);
			if (e) {
				t.DomUtil.setPosition(e, n)
			}
			;
			i._latlng = o;
			i.fire('move', {
				latlng: o
			}).fire('drag')
		},
		_onDragEnd: function (t) {
			this._marker.fire('moveend').fire('dragend', t)
		}
	});
	t.Control = t.Class.extend({
		options: {
			position: 'topright'
		},
		initialize: function (i) {
			t.setOptions(this, i)
		},
		getPosition: function () {
			return this.options.position
		},
		setPosition: function (t) {
			var i = this._map;
			if (i) {
				i.removeControl(this)
			}
			;
			this.options.position = t;
			if (i) {
				i.addControl(this)
			}
			;
			return this
		},
		getContainer: function () {
			return this._container
		},
		addTo: function (i) {
			this._map = i;
			var e = this._container = this.onAdd(i),
				o = this.getPosition(),
				n = i._controlCorners[o];
			t.DomUtil.addClass(e, 'leaflet-control');
			if (o.indexOf('bottom') !== -1) {
				n.insertBefore(e, n.firstChild)
			} else {
				n.appendChild(e)
			}
			;
			return this
		},
		removeFrom: function (t) {
			var i = this.getPosition(),
				e = t._controlCorners[i];
			e.removeChild(this._container);
			this._map = null;
			if (this.onRemove) {
				this.onRemove(t)
			}
			;
			return this
		},
		_refocusOnMap: function () {
			if (this._map) {
				this._map.getContainer().focus()
			}
		}
	});
	t.control = function (i) {
		return new t.Control(i)
	};
	t.Map.include({
		addControl: function (t) {
			t.addTo(this);
			return this
		},
		removeControl: function (t) {
			t.removeFrom(this);
			return this
		},
		_initControlPos: function () {
			var n = this._controlCorners = {},
				e = 'leaflet-',
				o = this._controlContainer = t.DomUtil.create('div', e + 'control-container', this._container);

			function i(i, s) {
				var a = e + i + ' ' + e + s;
				n[i + s] = t.DomUtil.create('div', a, o)
			};
			i('top', 'left');
			i('top', 'right');
			i('bottom', 'left');
			i('bottom', 'right')
		},
		_clearControlPos: function () {
			this._container.removeChild(this._controlContainer)
		}
	});
	t.Control.Zoom = t.Control.extend({
		options: {
			position: 'topleft',
			zoomInText: '+',
			zoomInTitle: 'Zoom in',
			zoomOutText: '-',
			zoomOutTitle: 'Zoom out'
		},
		onAdd: function (i) {
			var e = 'leaflet-control-zoom',
				n = t.DomUtil.create('div', e + ' leaflet-bar');
			this._map = i;
			this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + '-in', n, this._zoomIn, this);
			this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + '-out', n, this._zoomOut, this);
			this._updateDisabled();
			i.on('zoomend zoomlevelschange', this._updateDisabled, this);
			return n
		},
		onRemove: function (t) {
			t.off('zoomend zoomlevelschange', this._updateDisabled, this)
		},
		_zoomIn: function (t) {
			this._map.zoomIn(t.shiftKey ? 3 : 1)
		},
		_zoomOut: function (t) {
			this._map.zoomOut(t.shiftKey ? 3 : 1)
		},
		_createButton: function (i, e, n, o, a, r) {
			var s = t.DomUtil.create('a', n, o);
			s.innerHTML = i;
			s.href = '#';
			s.title = e;
			var h = t.DomEvent.stopPropagation;
			t.DomEvent.on(s, 'click', h).on(s, 'mousedown', h).on(s, 'dblclick', h).on(s, 'click', t.DomEvent.preventDefault).on(s, 'click', a, r).on(s, 'click', this._refocusOnMap, r);
			return s
		},
		_updateDisabled: function () {
			var i = this._map,
				e = 'leaflet-disabled';
			t.DomUtil.removeClass(this._zoomInButton, e);
			t.DomUtil.removeClass(this._zoomOutButton, e);
			if (i._zoom === i.getMinZoom()) {
				t.DomUtil.addClass(this._zoomOutButton, e)
			}
			;
			if (i._zoom === i.getMaxZoom()) {
				t.DomUtil.addClass(this._zoomInButton, e)
			}
		}
	});
	t.Map.mergeOptions({
		zoomControl: !0
	});
	t.Map.addInitHook(function () {
		if (this.options.zoomControl) {
			this.zoomControl = new t.Control.Zoom();
			this.addControl(this.zoomControl)
		}
	});
	t.control.zoom = function (i) {
		return new t.Control.Zoom(i)
	};
	t.Control.Attribution = t.Control.extend({
		options: {
			position: 'bottomright',
			prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
		},
		initialize: function (i) {
			t.setOptions(this, i);
			this._attributions = {}
		},
		onAdd: function (i) {
			this._container = t.DomUtil.create('div', 'leaflet-control-attribution');
			t.DomEvent.disableClickPropagation(this._container);
			for (var e in i._layers) {
				if (i._layers[e].getAttribution) {
					this.addAttribution(i._layers[e].getAttribution())
				}
			}
			;
			i.on('layeradd', this._onLayerAdd, this).on('layerremove', this._onLayerRemove, this);
			this._update();
			return this._container
		},
		onRemove: function (t) {
			t.off('layeradd', this._onLayerAdd).off('layerremove', this._onLayerRemove)
		},
		setPrefix: function (t) {
			this.options.prefix = t;
			this._update();
			return this
		},
		addAttribution: function (t) {
			if (!t) {
				return
			}
			;
			if (!this._attributions[t]) {
				this._attributions[t] = 0
			}
			;
			this._attributions[t]++;
			this._update();
			return this
		},
		removeAttribution: function (t) {
			if (!t) {
				return
			}
			;
			if (this._attributions[t]) {
				this._attributions[t]--;
				this._update()
			}
			;
			return this
		},
		_update: function () {
			if (!this._map) {
				return
			}
			;
			var i = [];
			for (var e in this._attributions) {
				if (this._attributions[e]) {
					i.push(e)
				}
			}
			;
			var t = [];
			if (this.options.prefix) {
				t.push(this.options.prefix)
			}
			;
			if (i.length) {
				t.push(i.join(', '))
			}
			;
			this._container.innerHTML = t.join(' | ')
		},
		_onLayerAdd: function (t) {
			if (t.layer.getAttribution) {
				this.addAttribution(t.layer.getAttribution())
			}
		},
		_onLayerRemove: function (t) {
			if (t.layer.getAttribution) {
				this.removeAttribution(t.layer.getAttribution())
			}
		}
	});
	t.Map.mergeOptions({
		attributionControl: !0
	});
	t.Map.addInitHook(function () {
		if (this.options.attributionControl) {
			this.attributionControl = (new t.Control.Attribution()).addTo(this)
		}
	});
	t.control.attribution = function (i) {
		return new t.Control.Attribution(i)
	};
	t.Control.Scale = t.Control.extend({
		options: {
			position: 'bottomleft',
			maxWidth: 100,
			metric: !0,
			imperial: !0,
			updateWhenIdle: !1
		},
		onAdd: function (i) {
			this._map = i;
			var e = 'leaflet-control-scale',
				n = t.DomUtil.create('div', e),
				o = this.options;
			this._addScales(o, e, n);
			i.on(o.updateWhenIdle ? 'moveend' : 'move', this._update, this);
			i.whenReady(this._update, this);
			return n
		},
		onRemove: function (t) {
			t.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this)
		},
		_addScales: function (i, e, n) {
			if (i.metric) {
				this._mScale = t.DomUtil.create('div', e + '-line', n)
			}
			;
			if (i.imperial) {
				this._iScale = t.DomUtil.create('div', e + '-line', n)
			}
		},
		_update: function () {
			var t = this._map.getBounds(),
				o = t.getCenter().lat,
				s = 6378137 * Math.PI * Math.cos(o * Math.PI / 180),
				a = s * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
				i = this._map.getSize(),
				e = this.options,
				n = 0;
			if (i.x > 0) {
				n = a * (e.maxWidth / i.x)
			}
			;
			this._updateScales(e, n)
		},
		_updateScales: function (t, i) {
			if (t.metric && i) {
				this._updateMetric(i)
			}
			;
			if (t.imperial && i) {
				this._updateImperial(i)
			}
		},
		_updateMetric: function (t) {
			var i = this._getRoundNum(t);
			this._mScale.style.width = this._getScaleWidth(i / t) + 'px';
			this._mScale.innerHTML = i < 1000 ? i + ' m' : (i / 1000) + ' km'
		},
		_updateImperial: function (t) {
			var i = t * 3.2808399,
				e = this._iScale,
				n, o, s;
			if (i > 5280) {
				n = i / 5280;
				o = this._getRoundNum(n);
				e.style.width = this._getScaleWidth(o / n) + 'px';
				e.innerHTML = o + ' mi'
			} else {
				s = this._getRoundNum(i);
				e.style.width = this._getScaleWidth(s / i) + 'px';
				e.innerHTML = s + ' ft'
			}
		},
		_getScaleWidth: function (t) {
			return Math.round(this.options.maxWidth * t) - 10
		},
		_getRoundNum: function (t) {
			var e = Math.pow(10, (Math.floor(t) + '').length - 1),
				i = t / e;
			i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1;
			return e * i
		}
	});
	t.control.scale = function (i) {
		return new t.Control.Scale(i)
	};
	t.Control.Layers = t.Control.extend({
		options: {
			collapsed: !0,
			position: 'topright',
			autoZIndex: !0
		},
		initialize: function (i, e, n) {
			t.setOptions(this, n);
			this._layers = {};
			this._lastZIndex = 0;
			this._handlingClick = !1;
			for (var o in i) {
				this._addLayer(i[o], o)
			}
			;
			for (o in e) {
				this._addLayer(e[o], o, !0)
			}
		},
		onAdd: function (t) {
			this._initLayout();
			this._update();
			t.on('layeradd', this._onLayerChange, this).on('layerremove', this._onLayerChange, this);
			return this._container
		},
		onRemove: function (t) {
			t.off('layeradd', this._onLayerChange, this).off('layerremove', this._onLayerChange, this)
		},
		addBaseLayer: function (t, i) {
			this._addLayer(t, i);
			this._update();
			return this
		},
		addOverlay: function (t, i) {
			this._addLayer(t, i, !0);
			this._update();
			return this
		},
		removeLayer: function (i) {
			var e = t.stamp(i);
			delete this._layers[e];
			this._update();
			return this
		},
		_initLayout: function () {
			var e = 'leaflet-control-layers',
				i = this._container = t.DomUtil.create('div', e);
			i.setAttribute('aria-haspopup', !0);
			if (!t.Browser.touch) {
				t.DomEvent.disableClickPropagation(i).disableScrollPropagation(i)
			} else {
				t.DomEvent.on(i, 'click', t.DomEvent.stopPropagation)
			}
			;
			var o = this._form = t.DomUtil.create('form', e + '-list');
			if (this.options.collapsed) {
				if (!t.Browser.android) {
					t.DomEvent.on(i, 'mouseover', this._expand, this).on(i, 'mouseout', this._collapse, this)
				}
				;
				var n = this._layersLink = t.DomUtil.create('a', e + '-toggle', i);
				n.href = '#';
				n.title = 'Layers';
				if (t.Browser.touch) {
					t.DomEvent.on(n, 'click', t.DomEvent.stop).on(n, 'click', this._expand, this)
				} else {
					t.DomEvent.on(n, 'focus', this._expand, this)
				}
				;
				t.DomEvent.on(o, 'click', function () {
					setTimeout(t.bind(this._onInputClick, this), 0)
				}, this);
				this._map.on('click', this._collapse, this)
			} else {
				this._expand()
			}
			;
			this._baseLayersList = t.DomUtil.create('div', e + '-base', o);
			this._separator = t.DomUtil.create('div', e + '-separator', o);
			this._overlaysList = t.DomUtil.create('div', e + '-overlays', o);
			i.appendChild(o)
		},
		_addLayer: function (i, e, n) {
			var o = t.stamp(i);
			this._layers[o] = {
				layer: i,
				name: e,
				overlay: n
			};
			if (this.options.autoZIndex && i.setZIndex) {
				this._lastZIndex++;
				i.setZIndex(this._lastZIndex)
			}
		},
		_update: function () {
			if (!this._container) {
				return
			}
			;
			this._baseLayersList.innerHTML = '';
			this._overlaysList.innerHTML = '';
			var i = !1,
				e = !1,
				n, t;
			for (n in this._layers) {
				t = this._layers[n];
				this._addItem(t);
				e = e || t.overlay;
				i = i || !t.overlay
			}
			;
			this._separator.style.display = e && i ? '' : 'none'
		},
		_onLayerChange: function (i) {
			var e = this._layers[t.stamp(i.layer)];
			if (!e) {
				return
			}
			;
			if (!this._handlingClick) {
				this._update()
			}
			;
			var n = e.overlay ? (i.type === 'layeradd' ? 'overlayadd' : 'overlayremove') : (i.type === 'layeradd' ? 'baselayerchange' : null);
			if (n) {
				this._map.fire(n, e)
			}
		},
		_createRadioElement: function (t, i) {
			var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
			if (i) {
				n += ' checked="checked"'
			}
			;
			n += '/>';
			var o = e.createElement('div');
			o.innerHTML = n;
			return o.firstChild
		},
		_addItem: function (i) {
			var o = e.createElement('label'),
				n, a = this._map.hasLayer(i.layer);
			if (i.overlay) {
				n = e.createElement('input');
				n.type = 'checkbox';
				n.className = 'leaflet-control-layers-selector';
				n.defaultChecked = a
			} else {
				n = this._createRadioElement('leaflet-base-layers', a)
			}
			;
			n.layerId = t.stamp(i.layer);
			t.DomEvent.on(n, 'click', this._onInputClick, this);
			var s = e.createElement('span');
			s.innerHTML = ' ' + i.name;
			o.appendChild(n);
			o.appendChild(s);
			var r = i.overlay ? this._overlaysList : this._baseLayersList;
			r.appendChild(o);
			return o
		},
		_onInputClick: function () {
			var i, e, t, n = this._form.getElementsByTagName('input'),
				o = n.length;
			this._handlingClick = !0;
			for (i = 0; i < o; i++) {
				e = n[i];
				t = this._layers[e.layerId];
				if (e.checked && !this._map.hasLayer(t.layer)) {
					this._map.addLayer(t.layer)
				} else if (!e.checked && this._map.hasLayer(t.layer)) {
					this._map.removeLayer(t.layer)
				}
			}
			;
			this._handlingClick = !1;
			this._refocusOnMap()
		},
		_expand: function () {
			t.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded')
		},
		_collapse: function () {
			this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '')
		}
	});
	t.control.layers = function (i, e, n) {
		return new t.Control.Layers(i, e, n)
	};
	t.PosAnimation = t.Class.extend({
		includes: t.Mixin.Events,
		run: function (i, e, n, o) {
			this.stop();
			this._el = i;
			this._inProgress = !0;
			this._newPos = e;
			this.fire('start');
			i.style[t.DomUtil.TRANSITION] = 'all ' + (n || 0.25) + 's cubic-bezier(0,0,' + (o || 0.5) + ',1)';
			t.DomEvent.on(i, t.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
			t.DomUtil.setPosition(i, e);
			t.Util.falseFn(i.offsetWidth);
			this._stepTimer = setInterval(t.bind(this._onStep, this), 50)
		},
		stop: function () {
			if (!this._inProgress) {
				return
			}
			;
			t.DomUtil.setPosition(this._el, this._getPos());
			this._onTransitionEnd();
			t.Util.falseFn(this._el.offsetWidth)
		},
		_onStep: function () {
			var t = this._getPos();
			if (!t) {
				this._onTransitionEnd();
				return
			}
			;
			this._el._leaflet_pos = t;
			this.fire('step')
		},
		_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
		_getPos: function () {
			var n, o, e, a = this._el,
				s = i.getComputedStyle(a);
			if (t.Browser.any3d) {
				e = s[t.DomUtil.TRANSFORM].match(this._transformRe);
				if (!e) {
					return
				}
				;
				n = parseFloat(e[1]);
				o = parseFloat(e[2])
			} else {
				n = parseFloat(s.left);
				o = parseFloat(s.top)
			}
			;
			return new t.Point(n, o, !0)
		},
		_onTransitionEnd: function () {
			t.DomEvent.off(this._el, t.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
			if (!this._inProgress) {
				return
			}
			;
			this._inProgress = !1;
			this._el.style[t.DomUtil.TRANSITION] = '';
			this._el._leaflet_pos = this._newPos;
			clearInterval(this._stepTimer);
			this.fire('step').fire('end')
		}
	});
	t.Map.include({
		setView: function (i, e, o) {
			e = e === n ? this._zoom : this._limitZoom(e);
			i = this._limitCenter(t.latLng(i), e, this.options.maxBounds);
			o = o || {};
			if (this._panAnim) {
				this._panAnim.stop()
			}
			;
			if (this._loaded && !o.reset && o !== !0) {
				if (o.animate !== n) {
					o.zoom = t.extend({
						animate: o.animate
					}, o.zoom);
					o.pan = t.extend({
						animate: o.animate
					}, o.pan)
				}
				;
				var s = (this._zoom !== e) ? this._tryAnimatedZoom && this._tryAnimatedZoom(i, e, o.zoom) : this._tryAnimatedPan(i, o.pan);
				if (s) {
					clearTimeout(this._sizeTimer);
					return this
				}
			}
			;
			this._resetView(i, e);
			return this
		},
		panBy: function (i, e) {
			i = t.point(i).round();
			e = e || {};
			if (!i.x && !i.y) {
				return this
			}
			;
			if (!this._panAnim) {
				this._panAnim = new t.PosAnimation();
				this._panAnim.on({
					'step': this._onPanTransitionStep,
					'end': this._onPanTransitionEnd
				}, this)
			}
			;
			if (!e.noMoveStart) {
				this.fire('movestart')
			}
			;
			if (e.animate !== !1) {
				t.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');
				var n = this._getMapPanePos().subtract(i);
				this._panAnim.run(this._mapPane, n, e.duration || 0.25, e.easeLinearity)
			} else {
				this._rawPanBy(i);
				this.fire('move').fire('moveend')
			}
			;
			return this
		},
		_onPanTransitionStep: function () {
			this.fire('move')
		},
		_onPanTransitionEnd: function () {
			t.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
			this.fire('moveend')
		},
		_tryAnimatedPan: function (t, i) {
			var e = this._getCenterOffset(t)._floor();
			if ((i && i.animate) !== !0 && !this.getSize().contains(e)) {
				return !1
			}
			;
			this.panBy(e, i);
			return !0
		}
	});
	t.PosAnimation = t.DomUtil.TRANSITION ? t.PosAnimation : t.PosAnimation.extend({
		run: function (i, e, n, o) {
			this.stop();
			this._el = i;
			this._inProgress = !0;
			this._duration = n || 0.25;
			this._easeOutPower = 1 / Math.max(o || 0.5, 0.2);
			this._startPos = t.DomUtil.getPosition(i);
			this._offset = e.subtract(this._startPos);
			this._startTime = +new Date();
			this.fire('start');
			this._animate()
		},
		stop: function () {
			if (!this._inProgress) {
				return
			}
			;
			this._step();
			this._complete()
		},
		_animate: function () {
			this._animId = t.Util.requestAnimFrame(this._animate, this);
			this._step()
		},
		_step: function () {
			var t = (+new Date()) - this._startTime,
				i = this._duration * 1000;
			if (t < i) {
				this._runFrame(this._easeOut(t / i))
			} else {
				this._runFrame(1);
				this._complete()
			}
		},
		_runFrame: function (i) {
			var e = this._startPos.add(this._offset.multiplyBy(i));
			t.DomUtil.setPosition(this._el, e);
			this.fire('step')
		},
		_complete: function () {
			t.Util.cancelAnimFrame(this._animId);
			this._inProgress = !1;
			this.fire('end')
		},
		_easeOut: function (t) {
			return 1 - Math.pow(1 - t, this._easeOutPower)
		}
	});
	t.Map.mergeOptions({
		zoomAnimation: !0,
		zoomAnimationThreshold: 4
	});
	if (t.DomUtil.TRANSITION) {
		t.Map.addInitHook(function () {
			this._zoomAnimated = this.options.zoomAnimation && t.DomUtil.TRANSITION && t.Browser.any3d && !t.Browser.android23 && !t.Browser.mobileOpera;
			if (this._zoomAnimated) {
				t.DomEvent.on(this._mapPane, t.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
			}
		})
	}
	;
	t.Map.include(!t.DomUtil.TRANSITION ? {} : {
		_catchTransitionEnd: function (t) {
			if (this._animatingZoom && t.propertyName.indexOf('transform') >= 0) {
				this._onZoomTransitionEnd()
			}
		},
		_nothingToAnimate: function () {
			return !this._container.getElementsByClassName('leaflet-zoom-animated').length
		},
		_tryAnimatedZoom: function (t, i, e) {
			if (this._animatingZoom) {
				return !0
			}
			;
			e = e || {};
			if (!this._zoomAnimated || e.animate === !1 || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold) {
				return !1
			}
			;
			var n = this.getZoomScale(i),
				o = this._getCenterOffset(t)._divideBy(1 - 1 / n),
				s = this._getCenterLayerPoint()._add(o);
			if (e.animate !== !0 && !this.getSize().contains(o)) {
				return !1
			}
			;
			this.fire('movestart').fire('zoomstart');
			this._animateZoom(t, i, s, n, null, !0);
			return !0
		},
		_animateZoom: function (i, e, n, o, s, a, r) {
			if (!r) {
				this._animatingZoom = !0
			}
			;
			t.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');
			this._animateToCenter = i;
			this._animateToZoom = e;
			if (t.Draggable) {
				t.Draggable._disabled = !0
			}
			;
			t.Util.requestAnimFrame(function () {
				this.fire('zoomanim', {
					center: i,
					zoom: e,
					origin: n,
					scale: o,
					delta: s,
					backwards: a
				});
				setTimeout(t.bind(this._onZoomTransitionEnd, this), 250)
			}, this)
		},
		_onZoomTransitionEnd: function () {
			if (!this._animatingZoom) {
				return
			}
			;
			this._animatingZoom = !1;
			t.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');
			t.Util.requestAnimFrame(function () {
				this._resetView(this._animateToCenter, this._animateToZoom, !0, !0);
				if (t.Draggable) {
					t.Draggable._disabled = !1
				}
			}, this)
		}
	});
	t.TileLayer.include({
		_animateZoom: function (i) {
			if (!this._animating) {
				this._animating = !0;
				this._prepareBgBuffer()
			}
			;
			var e = this._bgBuffer,
				n = t.DomUtil.TRANSFORM,
				o = i.delta ? t.DomUtil.getTranslateString(i.delta) : e.style[n],
				s = t.DomUtil.getScaleString(i.scale, i.origin);
			e.style[n] = i.backwards ? s + ' ' + o : o + ' ' + s
		},
		_endZoomAnim: function () {
			var i = this._tileContainer,
				n = this._bgBuffer;
			i.style.visibility = '';
			i.parentNode.appendChild(i);
			t.Util.falseFn(n.offsetWidth);
			var e = this._map.getZoom();
			if (e > this.options.maxZoom || e < this.options.minZoom) {
				this._clearBgBuffer()
			}
			;
			this._animating = !1
		},
		_clearBgBuffer: function () {
			var i = this._map;
			if (i && !i._animatingZoom && !i.touchZoom._zooming) {
				this._bgBuffer.innerHTML = '';
				this._bgBuffer.style[t.DomUtil.TRANSFORM] = ''
			}
		},
		_prepareBgBuffer: function () {
			var e = this._tileContainer,
				i = this._bgBuffer,
				n = this._getLoadedTilesPercentage(i),
				o = this._getLoadedTilesPercentage(e);
			if (i && n > 0.5 && o < 0.5) {
				e.style.visibility = 'hidden';
				this._stopLoadingImages(e);
				return
			}
			;
			i.style.visibility = 'hidden';
			i.style[t.DomUtil.TRANSFORM] = '';
			this._tileContainer = i;
			i = this._bgBuffer = e;
			this._stopLoadingImages(i);
			clearTimeout(this._clearBgBufferTimer)
		},
		_getLoadedTilesPercentage: function (t) {
			var n = t.getElementsByTagName('img'),
				i, e, o = 0;
			for (i = 0, e = n.length; i < e; i++) {
				if (n[i].complete) {
					o++
				}
			}
			;
			return o / e
		},
		_stopLoadingImages: function (i) {
			var o = Array.prototype.slice.call(i.getElementsByTagName('img')),
				n, s, e;
			for (n = 0, s = o.length; n < s; n++) {
				e = o[n];
				if (!e.complete) {
					e.onload = t.Util.falseFn;
					e.onerror = t.Util.falseFn;
					e.src = t.Util.emptyImageUrl;
					e.parentNode.removeChild(e)
				}
			}
		}
	});
	t.Map.include({
		_defaultLocateOptions: {
			watch: !1,
			setView: !1,
			maxZoom: Infinity,
			timeout: 10000,
			maximumAge: 0,
			enableHighAccuracy: !1
		},
		locate: function (i) {
			i = this._locateOptions = t.extend(this._defaultLocateOptions, i);
			if (!navigator.geolocation) {
				this._handleGeolocationError({
					code: 0,
					message: 'Geolocation not supported.'
				});
				return this
			}
			;
			var e = t.bind(this._handleGeolocationResponse, this),
				n = t.bind(this._handleGeolocationError, this);
			if (i.watch) {
				this._locationWatchId = navigator.geolocation.watchPosition(e, n, i)
			} else {
				navigator.geolocation.getCurrentPosition(e, n, i)
			}
			;
			return this
		},
		stopLocate: function () {
			if (navigator.geolocation) {
				navigator.geolocation.clearWatch(this._locationWatchId)
			}
			;
			if (this._locateOptions) {
				this._locateOptions.setView = !1
			}
			;
			return this
		},
		_handleGeolocationError: function (t) {
			var i = t.code,
				e = t.message || (i === 1 ? 'permission denied' : (i === 2 ? 'position unavailable' : 'timeout'));
			if (this._locateOptions.setView && !this._loaded) {
				this.fitWorld()
			}
			;
			this.fire('locationerror', {
				code: i,
				message: 'Geolocation error: ' + e + '.'
			})
		},
		_handleGeolocationResponse: function (i) {
			var e = i.coords.latitude,
				o = i.coords.longitude,
				r = new t.LatLng(e, o),
				s = 180 * i.coords.accuracy / 40075017,
				h = s / Math.cos(t.LatLng.DEG_TO_RAD * e),
				l = t.latLngBounds([e - s, o - h], [e + s, o + h]),
				u = this._locateOptions;
			if (u.setView) {
				var c = Math.min(this.getBoundsZoom(l), u.maxZoom);
				this.setView(r, c)
			}
			;
			var a = {
				latlng: r,
				bounds: l,
				timestamp: i.timestamp
			};
			for (var n in i.coords) {
				if (typeof i.coords[n] === 'number') {
					a[n] = i.coords[n]
				}
			}
			;
			this.fire('locationfound', a)
		}
	})
}(window, document));
(function (t, a) {
	if (typeof define === 'function' && define.amd) {
		define(['leaflet'], a)
	} else if (typeof modules === 'object' && module.exports) {
		module.exports = a(require('leaflet'))
	} else {
		a(L)
	}
}(this, function (a) {
	'use strict';
	a.TileLayer.Provider = a.TileLayer.extend({
		initialize: function (e, i) {
			var r = a.TileLayer.Provider.providers,
				l = e.split('.'),
				o = l[0],
				s = l[1];
			if (!r[o]) {
				throw 'No such provider (' + o + ')'
			}
			;
			var t = {
				url: r[o].url,
				options: r[o].options
			};
			if (s && 'variants' in r[o]) {
				if (!(s in r[o].variants)) {
					throw 'No such variant of ' + o + ' (' + s + ')'
				}
				;
				var n = r[o].variants[s],
					p;
				if (typeof n === 'string') {
					p = {
						variant: n
					}
				} else {
					p = n.options
				}
				;
				t = {
					url: n.url || t.url,
					options: a.Util.extend({}, t.options, p)
				}
			}
			;
			var u = window.location.protocol === 'file:' || t.options.forceHTTP;
			if (t.url.indexOf('//') === 0 && u) {
				t.url = 'http:' + t.url
			}
			;
			if (t.options.retina) {
				if (i.detectRetina && a.Browser.retina) {
					i.detectRetina = !1
				} else {
					t.options.retina = ''
				}
			}
			;
			var m = function (a) {
				if (a.indexOf('{attribution.') === -1) {
					return a
				}
				;
				return a.replace(/\{attribution.(\w*)\}/, function (a, t) {
					return m(r[t].options.attribution)
				})
			};
			t.options.attribution = m(t.options.attribution);
			var d = a.Util.extend({}, t.options, i);
			a.TileLayer.prototype.initialize.call(this, t.url, d)
		}
	});
	a.TileLayer.Provider.providers = {
		OpenStreetMap: {
			url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			},
			variants: {
				Mapnik: {},
				BlackAndWhite: {
					url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
					options: {
						maxZoom: 18
					}
				},
				DE: {
					url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
					options: {
						maxZoom: 18
					}
				},
				France: {
					url: '//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
					options: {
						attribution: '&copy; Openstreetmap France | {attribution.OpenStreetMap}'
					}
				},
				HOT: {
					url: '//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
					options: {
						attribution: '{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
					}
				}
			}
		},
		OpenSeaMap: {
			url: 'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
			options: {
				attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
			}
		},
		OpenTopoMap: {
			url: '//{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
			options: {
				maxZoom: 17,
				attribution: 'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			}
		},
		Thunderforest: {
			url: '//{s}.tile.thunderforest.com/{variant}/{z}/{x}/{y}.png',
			options: {
				attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, {attribution.OpenStreetMap}',
				variant: 'cycle'
			},
			variants: {
				OpenCycleMap: 'cycle',
				Transport: {
					options: {
						variant: 'transport',
						maxZoom: 19
					}
				},
				TransportDark: {
					options: {
						variant: 'transport-dark',
						maxZoom: 19
					}
				},
				SpinalMap: {
					options: {
						variant: 'spinal-map',
						maxZoom: 11
					}
				},
				Landscape: 'landscape',
				Outdoors: 'outdoors',
				Pioneer: 'pioneer'
			}
		},
		OpenMapSurfer: {
			url: 'http://korona.geog.uni-heidelberg.de/tiles/{variant}/x={x}&y={y}&z={z}',
			options: {
				maxZoom: 20,
				variant: 'roads',
				attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data {attribution.OpenStreetMap}'
			},
			variants: {
				Roads: 'roads',
				AdminBounds: {
					options: {
						variant: 'adminb',
						maxZoom: 19
					}
				},
				Grayscale: {
					options: {
						variant: 'roadsg',
						maxZoom: 19
					}
				}
			}
		},
		Hydda: {
			url: '//{s}.tile.openstreetmap.se/hydda/{variant}/{z}/{x}/{y}.png',
			options: {
				variant: 'full',
				attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data {attribution.OpenStreetMap}'
			},
			variants: {
				Full: 'full',
				Base: 'base',
				RoadsAndLabels: 'roads_and_labels'
			}
		},
		MapBox: {
			url: '//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
			options: {
				attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data {attribution.OpenStreetMap}',
				subdomains: 'abcd'
			}
		},
		Stamen: {
			url: '//stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
			options: {
				attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data {attribution.OpenStreetMap}',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				variant: 'toner',
				ext: 'png'
			},
			variants: {
				Toner: 'toner',
				TonerBackground: 'toner-background',
				TonerHybrid: 'toner-hybrid',
				TonerLines: 'toner-lines',
				TonerLabels: 'toner-labels',
				TonerLite: 'toner-lite',
				Watercolor: {
					options: {
						variant: 'watercolor',
						minZoom: 1,
						maxZoom: 16
					}
				},
				Terrain: {
					options: {
						variant: 'terrain',
						minZoom: 4,
						maxZoom: 18,
						bounds: [
							[22, -132],
							[70, -56]
						]
					}
				},
				TerrainBackground: {
					options: {
						variant: 'terrain-background',
						minZoom: 4,
						maxZoom: 18,
						bounds: [
							[22, -132],
							[70, -56]
						]
					}
				},
				TopOSMRelief: {
					options: {
						variant: 'toposm-color-relief',
						ext: 'jpg',
						bounds: [
							[22, -132],
							[51, -56]
						]
					}
				},
				TopOSMFeatures: {
					options: {
						variant: 'toposm-features',
						bounds: [
							[22, -132],
							[51, -56]
						],
						opacity: 0.9
					}
				}
			}
		},
		Esri: {
			url: '//server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}',
			options: {
				variant: 'World_Street_Map',
				attribution: 'Tiles &copy; Esri'
			},
			variants: {
				WorldStreetMap: {
					options: {
						attribution: '{attribution.Esri} &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
					}
				},
				DeLorme: {
					options: {
						variant: 'Specialty/DeLorme_World_Base_Map',
						minZoom: 1,
						maxZoom: 11,
						attribution: '{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme'
					}
				},
				WorldTopoMap: {
					options: {
						variant: 'World_Topo_Map',
						attribution: '{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
					}
				},
				WorldImagery: {
					options: {
						variant: 'World_Imagery',
						attribution: '{attribution.Esri} &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					}
				},
				WorldTerrain: {
					options: {
						variant: 'World_Terrain_Base',
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
					}
				},
				WorldShadedRelief: {
					options: {
						variant: 'World_Shaded_Relief',
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Source: Esri'
					}
				},
				WorldPhysical: {
					options: {
						variant: 'World_Physical_Map',
						maxZoom: 8,
						attribution: '{attribution.Esri} &mdash; Source: US National Park Service'
					}
				},
				OceanBasemap: {
					options: {
						variant: 'Ocean_Basemap',
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
					}
				},
				NatGeoWorldMap: {
					options: {
						variant: 'NatGeo_World_Map',
						maxZoom: 16,
						attribution: '{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
					}
				},
				WorldGrayCanvas: {
					options: {
						variant: 'Canvas/World_Light_Gray_Base',
						maxZoom: 16,
						attribution: '{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ'
					}
				}
			}
		},
		OpenWeatherMap: {
			url: 'http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
				opacity: 0.5
			},
			variants: {
				Clouds: 'clouds',
				CloudsClassic: 'clouds_cls',
				Precipitation: 'precipitation',
				PrecipitationClassic: 'precipitation_cls',
				Rain: 'rain',
				RainClassic: 'rain_cls',
				Pressure: 'pressure',
				PressureContour: 'pressure_cntr',
				Wind: 'wind',
				Temperature: 'temp',
				Snow: 'snow'
			}
		},
		HERE: {
			url: '//{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}',
			options: {
				attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
				subdomains: '1234',
				mapID: 'newest',
				'app_id': '<insert your app_id here>',
				'app_code': '<insert your app_code here>',
				base: 'base',
				variant: 'normal.day',
				maxZoom: 20,
				type: 'maptile',
				language: 'eng',
				format: 'png8',
				size: '256'
			},
			variants: {
				normalDay: 'normal.day',
				normalDayCustom: 'normal.day.custom',
				normalDayGrey: 'normal.day.grey',
				normalDayMobile: 'normal.day.mobile',
				normalDayGreyMobile: 'normal.day.grey.mobile',
				normalDayTransit: 'normal.day.transit',
				normalDayTransitMobile: 'normal.day.transit.mobile',
				normalNight: 'normal.night',
				normalNightMobile: 'normal.night.mobile',
				normalNightGrey: 'normal.night.grey',
				normalNightGreyMobile: 'normal.night.grey.mobile',
				basicMap: {
					options: {
						type: 'basetile'
					}
				},
				mapLabels: {
					options: {
						type: 'labeltile',
						format: 'png'
					}
				},
				trafficFlow: {
					options: {
						base: 'traffic',
						type: 'flowtile'
					}
				},
				carnavDayGrey: 'carnav.day.grey',
				hybridDay: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day'
					}
				},
				hybridDayMobile: {
					options: {
						base: 'aerial',
						variant: 'hybrid.day.mobile'
					}
				},
				pedestrianDay: 'pedestrian.day',
				pedestrianNight: 'pedestrian.night',
				satelliteDay: {
					options: {
						base: 'aerial',
						variant: 'satellite.day'
					}
				},
				terrainDay: {
					options: {
						base: 'aerial',
						variant: 'terrain.day'
					}
				},
				terrainDayMobile: {
					options: {
						base: 'aerial',
						variant: 'terrain.day.mobile'
					}
				}
			}
		},
		FreeMapSK: {
			url: 'http://t{s}.freemap.sk/T/{z}/{x}/{y}.jpeg',
			options: {
				minZoom: 8,
				maxZoom: 16,
				subdomains: '1234',
				bounds: [
					[47.204642, 15.996093],
					[49.830896, 22.576904]
				],
				attribution: '{attribution.OpenStreetMap}, vizualization CC-By-SA 2.0 <a href="http://freemap.sk">Freemap.sk</a>'
			}
		},
		MtbMap: {
			url: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
			options: {
				attribution: '{attribution.OpenStreetMap} &amp; USGS'
			}
		},
		CartoDB: {
			url: 'http://{s}.basemaps.cartocdn.com/{variant}/{z}/{x}/{y}.png',
			options: {
				attribution: '{attribution.OpenStreetMap} &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
				subdomains: 'abcd',
				maxZoom: 19,
				variant: 'light_all'
			},
			variants: {
				Positron: 'light_all',
				PositronNoLabels: 'light_nolabels',
				PositronOnlyLabels: 'light_only_labels',
				DarkMatter: 'dark_all',
				DarkMatterNoLabels: 'dark_nolabels',
				DarkMatterOnlyLabels: 'dark_only_labels'
			}
		},
		HikeBike: {
			url: 'http://{s}.tiles.wmflabs.org/{variant}/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: '{attribution.OpenStreetMap}',
				variant: 'hikebike'
			},
			variants: {
				HikeBike: {},
				HillShading: {
					options: {
						maxZoom: 15,
						variant: 'hillshading'
					}
				}
			}
		},
		BasemapAT: {
			url: '//maps{s}.wien.gv.at/basemap/{variant}/normal/google3857/{z}/{y}/{x}.{format}',
			options: {
				maxZoom: 19,
				attribution: 'Datenquelle: <a href="www.basemap.at">basemap.at</a>',
				subdomains: ['', '1', '2', '3', '4'],
				format: 'png',
				bounds: [
					[46.358770, 8.782379],
					[49.037872, 17.189532]
				],
				variant: 'geolandbasemap'
			},
			variants: {
				basemap: 'geolandbasemap',
				grau: 'bmapgrau',
				overlay: 'bmapoverlay',
				highdpi: {
					options: {
						variant: 'bmaphidpi',
						format: 'jpeg'
					}
				},
				orthofoto: {
					options: {
						variant: 'bmaporthofoto30cm',
						format: 'jpeg'
					}
				}
			}
		},
		NASAGIBS: {
			url: '//map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
			options: {
				attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
				bounds: [
					[-85.0511287776, -179.999999975],
					[85.0511287776, 179.999999975]
				],
				minZoom: 1,
				maxZoom: 9,
				format: 'jpg',
				time: '',
				tilematrixset: 'GoogleMapsCompatible_Level'
			},
			variants: {
				ModisTerraTrueColorCR: 'MODIS_Terra_CorrectedReflectance_TrueColor',
				ModisTerraBands367CR: 'MODIS_Terra_CorrectedReflectance_Bands367',
				ViirsEarthAtNight2012: {
					options: {
						variant: 'VIIRS_CityLights_2012',
						maxZoom: 8
					}
				},
				ModisTerraLSTDay: {
					options: {
						variant: 'MODIS_Terra_Land_Surface_Temp_Day',
						format: 'png',
						maxZoom: 7,
						opacity: 0.75
					}
				},
				ModisTerraSnowCover: {
					options: {
						variant: 'MODIS_Terra_Snow_Cover',
						format: 'png',
						maxZoom: 8,
						opacity: 0.75
					}
				},
				ModisTerraAOD: {
					options: {
						variant: 'MODIS_Terra_Aerosol',
						format: 'png',
						maxZoom: 6,
						opacity: 0.75
					}
				},
				ModisTerraChlorophyll: {
					options: {
						variant: 'MODIS_Terra_Chlorophyll_A',
						format: 'png',
						maxZoom: 7,
						opacity: 0.75
					}
				}
			}
		},
		NLS: {
			url: '//nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg',
			options: {
				attribution: '<a href="http://geo.nls.uk/maps/">National Library of Scotland Historic Maps</a>',
				bounds: [
					[49.6, -12],
					[61.7, 3]
				],
				minZoom: 1,
				maxZoom: 18,
				subdomains: '0123',
			}
		}
	};
	a.tileLayer.provider = function (t, o) {
		return new a.TileLayer.Provider(t, o)
	};
	return a
}));
;
