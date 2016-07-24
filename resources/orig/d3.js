
!function () {
	var n = {
		version: '3.5.17'
	};
	var Vr = [].slice,
		N = function (n) {
			return Vr.call(n)
		},
		p = this.document;

	function Xr(n) {
		return n && (n.ownerDocument || n.document || n).documentElement
	};

	function Y(n) {
		return n && (n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView)
	};
	if (p) {
		try {
			N(p.documentElement.childNodes)[0].nodeType
		} catch (ta) {
			N = function (n) {
				var t = n.length,
					e = new Array(t);
				while (t--) e[t] = n[t];
				return e
			}
		}
	}
	;
	if (!Date.now) Date.now = function () {
		return +new Date()
	};
	if (p) {
		try {
			p.createElement('DIV').style.setProperty('opacity', 0, '')
		} catch (ta) {
			var ct = this.Element.prototype,
				Ca = ct.setAttribute,
				za = ct.setAttributeNS,
				Zr = this.CSSStyleDeclaration.prototype,
				La = Zr.setProperty;
			ct.setAttribute = function (n, t) {
				Ca.call(this, n, t + '')
			};
			ct.setAttributeNS = function (n, t, e) {
				za.call(this, n, t, e + '')
			};
			Zr.setProperty = function (n, t, e) {
				La.call(this, n, t + '', e)
			}
		}
	}
	;
	n.ascending = pn;

	function pn(n, t) {
		return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
	};
	n.descending = function (n, t) {
		return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
	};
	n.min = function (n, t) {
		var r = -1,
			u = n.length,
			i, e;
		if (arguments.length === 1) {
			while (++r < u)
				if ((e = n[r]) != null && e >= e) {
					i = e;
					break
				}
			while (++r < u)
				if ((e = n[r]) != null && i > e) i = e
		} else {
			while (++r < u)
				if ((e = t.call(n, n[r], r)) != null && e >= e) {
					i = e;
					break
				}
			while (++r < u)
				if ((e = t.call(n, n[r], r)) != null && i > e) i = e
		}
		;
		return i
	};
	n.max = function (n, t) {
		var r = -1,
			u = n.length,
			i, e;
		if (arguments.length === 1) {
			while (++r < u)
				if ((e = n[r]) != null && e >= e) {
					i = e;
					break
				}
			while (++r < u)
				if ((e = n[r]) != null && e > i) i = e
		} else {
			while (++r < u)
				if ((e = t.call(n, n[r], r)) != null && e >= e) {
					i = e;
					break
				}
			while (++r < u)
				if ((e = t.call(n, n[r], r)) != null && e > i) i = e
		}
		;
		return i
	};
	n.extent = function (n, t) {
		var r = -1,
			a = n.length,
			i, e, u;
		if (arguments.length === 1) {
			while (++r < a)
				if ((e = n[r]) != null && e >= e) {
					i = u = e;
					break
				}
			while (++r < a)
				if ((e = n[r]) != null) {
					if (i > e) i = e;
					if (u < e) u = e
				}
		} else {
			while (++r < a)
				if ((e = t.call(n, n[r], r)) != null && e >= e) {
					i = u = e;
					break
				}
			while (++r < a)
				if ((e = t.call(n, n[r], r)) != null) {
					if (i > e) i = e;
					if (u < e) u = e
				}
		}
		;
		return [i, u]
	};

	function tn(n) {
		return n === null ? NaN : +n
	};

	function q(n) {
		return !isNaN(n)
	};
	n.sum = function (n, t) {
		var i = 0,
			u = n.length,
			r, e = -1;
		if (arguments.length === 1) {
			while (++e < u)
				if (q(r = +n[e])) i += r
		} else {
			while (++e < u)
				if (q(r = +t.call(n, n[e], e))) i += r
		}
		;
		return i
	};
	n.mean = function (n, t) {
		var u = 0,
			a = n.length,
			r, e = -1,
			i = a;
		if (arguments.length === 1) {
			while (++e < a)
				if (q(r = tn(n[e]))) u += r;
				else --i
		} else {
			while (++e < a)
				if (q(r = tn(t.call(n, n[e], e)))) u += r;
				else --i
		}
		;
		if (i) return u / i
	};
	n.quantile = function (n, t) {
		var i = (n.length - 1) * t + 1,
			e = Math.floor(i),
			r = +n[e - 1],
			u = i - e;
		return u ? r + u * (n[e] - r) : r
	};
	n.median = function (t, e) {
		var i = [],
			a = t.length,
			u, r = -1;
		if (arguments.length === 1) {
			while (++r < a)
				if (q(u = tn(t[r]))) i.push(u)
		} else {
			while (++r < a)
				if (q(u = tn(e.call(t, t[r], r)))) i.push(u)
		}
		;
		if (i.length) return n.quantile(i.sort(pn), .5)
	};
	n.variance = function (n, t) {
		var l = n.length,
			e = 0,
			r, i, o = 0,
			u = -1,
			a = 0;
		if (arguments.length === 1) {
			while (++u < l) {
				if (q(r = tn(n[u]))) {
					i = r - e;
					e += i / ++a;
					o += i * (r - e)
				}
			}
		} else {
			while (++u < l) {
				if (q(r = tn(t.call(n, n[u], u)))) {
					i = r - e;
					e += i / ++a;
					o += i * (r - e)
				}
			}
		}
		;
		if (a > 1) return o / (a - 1)
	};
	n.deviation = function () {
		var t = n.variance.apply(this, arguments);
		return t ? Math.sqrt(t) : t
	};

	function Br(n) {
		return {
			left: function (t, e, r, i) {
				if (arguments.length < 3) r = 0;
				if (arguments.length < 4) i = t.length;
				while (r < i) {
					var u = r + i >>> 1;
					if (n(t[u], e) < 0) r = u + 1;
					else i = u
				}
				;
				return r
			},
			right: function (t, e, r, i) {
				if (arguments.length < 3) r = 0;
				if (arguments.length < 4) i = t.length;
				while (r < i) {
					var u = r + i >>> 1;
					if (n(t[u], e) > 0) i = u;
					else r = u + 1
				}
				;
				return r
			}
		}
	};
	var Yr = Br(pn);
	n.bisectLeft = Yr.left;
	n.bisect = n.bisectRight = Yr.right;
	n.bisector = function (n) {
		return Br(n.length === 1 ? function (t, e) {
			return pn(n(t), e)
		} : n)
	};
	n.shuffle = function (n, t, e) {
		if ((r = arguments.length) < 3) {
			e = n.length;
			if (r < 2) t = 0
		}
		;
		var r = e - t,
			u, i;
		while (r) {
			i = Math.random() * r-- | 0;
			u = n[r + t], n[r + t] = n[i + t], n[i + t] = u
		}
		;
		return n
	};
	n.permute = function (n, t) {
		var e = t.length,
			r = new Array(e);
		while (e--) r[e] = n[t[e]];
		return r
	};
	n.pairs = function (n) {
		var t = 0,
			e = n.length - 1,
			u, r = n[0],
			i = new Array(e < 0 ? 0 : e);
		while (t < e) i[t] = [u = r, r = n[++t]];
		return i
	};
	n.transpose = function (t) {
		if (!(r = t.length)) return [];
		for (var i = -1, u = n.min(t, qa), a = new Array(u); ++i < u;) {
			for (var e = -1, r, o = a[i] = new Array(r); ++e < r;) {
				o[e] = t[e][i]
			}
		}
		;
		return a
	};

	function qa(n) {
		return n.length
	};
	n.zip = function () {
		return n.transpose(arguments)
	};
	n.keys = function (n) {
		var t = [];
		for (var e in n) t.push(e);
		return t
	};
	n.values = function (n) {
		var t = [];
		for (var e in n) t.push(n[e]);
		return t
	};
	n.entries = function (n) {
		var e = [];
		for (var t in n) e.push({
			key: t,
			value: n[t]
		});
		return e
	};
	n.merge = function (n) {
		var t = n.length,
			e, a = -1,
			r = 0,
			i, u;
		while (++a < t) r += n[a].length;
		i = new Array(r);
		while (--t >= 0) {
			u = n[t];
			e = u.length;
			while (--e >= 0) {
				i[--r] = u[e]
			}
		}
		;
		return i
	};
	var r = Math.abs;
	n.range = function (n, t, e) {
		if (arguments.length < 3) {
			e = 1;
			if (arguments.length < 2) {
				t = n;
				n = 0
			}
		}
		;
		if ((t - n) / e === Infinity) throw new Error('infinite range');
		var a = [],
			i = Ta(r(e)),
			o = -1,
			u;
		n *= i, t *= i, e *= i;
		if (e < 0)
			while ((u = n + e * ++o) > t) a.push(u / i);
		else
			while ((u = n + e * ++o) < t) a.push(u / i);
		return a
	};

	function Ta(n) {
		var t = 1;
		while (n * t % 1) t *= 10;
		return t
	};

	function Wr(n, t) {
		for (var e in t) {
			Object.defineProperty(n.prototype, e, {
				value: t[e],
				enumerable: !1
			})
		}
	};
	n.map = function (n, t) {
		var r = new T();
		if (n instanceof T) {
			n.forEach(function (n, t) {
				r.set(n, t)
			})
		} else if (Array.isArray(n)) {
			var e = -1,
				u = n.length,
				a;
			if (arguments.length === 1)
				while (++e < u) r.set(e, n[e]);
			else
				while (++e < u) r.set(t.call(n, a = n[e], e), a)
		} else {
			for (var i in n) r.set(i, n[i])
		}
		;
		return r
	};

	function T() {
		this._ = Object.create(null)
	};
	var Aa = '__proto__',
		le = '\x00';
	Wr(T, {
		has: Jr,
		get: function (n) {
			return this._[Nn(n)]
		},
		set: function (n, t) {
			return this._[Nn(n)] = t
		},
		remove: Gr,
		keys: Kr,
		values: function () {
			var n = [];
			for (var t in this._) n.push(this._[t]);
			return n
		},
		entries: function () {
			var t = [];
			for (var n in this._) t.push({
				key: ht(n),
				value: this._[n]
			});
			return t
		},
		size: Qr,
		empty: ni,
		forEach: function (n) {
			for (var t in this._) n.call(this, ht(t), this._[t])
		}
	});

	function Nn(n) {
		return (n += '') === Aa || n[0] === le ? le + n : n
	};

	function ht(n) {
		return (n += '')[0] === le ? n.slice(1) : n
	};

	function Jr(n) {
		return Nn(n) in this._
	};

	function Gr(n) {
		return (n = Nn(n)) in this._ && delete this._[n]
	};

	function Kr() {
		var n = [];
		for (var t in this._) n.push(ht(t));
		return n
	};

	function Qr() {
		var n = 0;
		for (var t in this._) ++n;
		return n
	};

	function ni() {
		for (var n in this._) return !1;
		return !0
	};
	n.nest = function () {
		var t = {},
			e = [],
			a = [],
			i, u;

		function r(n, a, o) {
			if (o >= e.length) return u ? u.call(t, a) : i ? a.sort(i) : a;
			var c = -1,
				p = a.length,
				v = e[o++],
				h, l, f, s = new T(),
				g;
			while (++c < p) {
				if (g = s.get(h = v(l = a[c]))) {
					g.push(l)
				} else {
					s.set(h, [l])
				}
			}
			;
			if (n) {
				l = n();
				f = function (t, e) {
					l.set(t, r(n, e, o))
				}
			} else {
				l = {};
				f = function (t, e) {
					l[t] = r(n, e, o)
				}
			}
			;
			s.forEach(f);
			return l
		};

		function o(n, t) {
			if (t >= e.length) return n;
			var r = [],
				i = a[t++];
			n.forEach(function (n, e) {
				r.push({
					key: n,
					values: o(e, t)
				})
			});
			return i ? r.sort(function (n, t) {
				return i(n.key, t.key)
			}) : r
		};
		t.map = function (n, t) {
			return r(t, n, 0)
		};
		t.entries = function (t) {
			return o(r(n.map, t, 0), 0)
		};
		t.key = function (n) {
			e.push(n);
			return t
		};
		t.sortKeys = function (n) {
			a[e.length - 1] = n;
			return t
		};
		t.sortValues = function (n) {
			i = n;
			return t
		};
		t.rollup = function (n) {
			u = n;
			return t
		};
		return t
	};
	n.set = function (n) {
		var e = new fe();
		if (n)
			for (var t = 0, r = n.length; t < r; ++t) e.add(n[t]);
		return e
	};

	function fe() {
		this._ = Object.create(null)
	};
	Wr(fe, {
		has: Jr,
		add: function (n) {
			this._[Nn(n += '')] = !0;
			return n
		},
		remove: Gr,
		values: Kr,
		size: Qr,
		empty: ni,
		forEach: function (n) {
			for (var t in this._) n.call(this, ht(t))
		}
	});
	n.behavior = {};

	function h(n) {
		return n
	};
	n.rebind = function (n, t) {
		var e = 1,
			i = arguments.length,
			r;
		while (++e < i) n[r = arguments[e]] = Ra(n, t, t[r]);
		return n
	};

	function Ra(n, t, e) {
		return function () {
			var r = e.apply(t, arguments);
			return r === t ? n : r
		}
	};

	function se(n, t) {
		if (t in n) return t;
		t = t.charAt(0).toUpperCase() + t.slice(1);
		for (var e = 0, i = Or.length; e < i; ++e) {
			var r = Or[e] + t;
			if (r in n) return r
		}
	};
	var Or = ['webkit', 'ms', 'moz', 'Moz', 'o', 'O'];

	function s() {
	};
	n.dispatch = function () {
		var n = new ce(),
			t = -1,
			e = arguments.length;
		while (++t < e) n[arguments[t]] = ti(n);
		return n
	};

	function ce() {
	};
	ce.prototype.on = function (n, t) {
		var r = n.indexOf('.'),
			e = '';
		if (r >= 0) {
			e = n.slice(r + 1);
			n = n.slice(0, r)
		}
		;
		if (n) return arguments.length < 2 ? this[n].on(e) : this[n].on(e, t);
		if (arguments.length === 2) {
			if (t == null)
				for (n in this) {
					if (this.hasOwnProperty(n)) this[n].on(e, null)
				}
			;
			return this
		}
	};

	function ti(n) {
		var t = [],
			e = new T();

		function r() {
			var e = t,
				r = -1,
				u = e.length,
				i;
			while (++r < u)
				if (i = e[r].on) i.apply(this, arguments);
			return n
		};
		r.on = function (r, i) {
			var u = e.get(r),
				a;
			if (arguments.length < 2) return u && u.on;
			if (u) {
				u.on = null;
				t = t.slice(0, a = t.indexOf(u)).concat(t.slice(a + 1));
				e.remove(r)
			}
			;
			if (i) t.push(e.set(r, {
				on: i
			}));
			return n
		};
		return r
	};
	n.event = null;

	function Z() {
		n.event.preventDefault()
	};

	function he() {
		var t = n.event,
			e;
		while (e = t.sourceEvent) t = e;
		return t
	};

	function ge(t) {
		var e = new ce(),
			r = 0,
			i = arguments.length;
		while (++r < i) e[arguments[r]] = ti(e);
		e.of = function (r, i) {
			return function (u) {
				try {
					var a = u.sourceEvent = n.event;
					u.target = t;
					n.event = u;
					e[u.type].apply(r, i)
				} finally {
					n.event = a
				}
			}
		};
		return e
	};
	n.requote = function (n) {
		return n.replace(Ea, '\\$&')
	};
	var Ea = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
		st = {}.__proto__ ? function (n, t) {
			n.__proto__ = t
		} : function (n, t) {
			for (var e in t) n[e] = t[e]
		};

	function V(n) {
		st(n, u);
		return n
	};
	var ae = function (n, t) {
			return t.querySelector(n)
		},
		oe = function (n, t) {
			return t.querySelectorAll(n)
		},
		ft = function (n, t) {
			var e = n.matches || n[se(n, 'matchesSelector')];
			ft = function (n, t) {
				return e.call(n, t)
			};
			return ft(n, t)
		};
	if (typeof Sizzle === 'function') {
		ae = function (n, t) {
			return Sizzle(n, t)[0] || null
		};
		oe = Sizzle;
		ft = Sizzle.matchesSelector
	}
	;
	n.selection = function () {
		return n.select(p.documentElement)
	};
	var u = n.selection.prototype = [];
	u.select = function (n) {
		var o = [],
			e, u, a, t;
		n = pe(n);
		for (var i = -1, f = this.length; ++i < f;) {
			o.push(e = []);
			e.parentNode = (a = this[i]).parentNode;
			for (var r = -1, l = a.length; ++r < l;) {
				if (t = a[r]) {
					e.push(u = n.call(t, t.__data__, r, i));
					if (u && '__data__' in t) u.__data__ = t.__data__
				} else {
					e.push(null)
				}
			}
		}
		;
		return V(o)
	};

	function pe(n) {
		return typeof n === 'function' ? n : function () {
			return ae(n, this)
		}
	};
	u.selectAll = function (n) {
		var u = [],
			a, t;
		n = ei(n);
		for (var r = -1, l = this.length; ++r < l;) {
			for (var i = this[r], e = -1, o = i.length; ++e < o;) {
				if (t = i[e]) {
					u.push(a = N(n.call(t, t.__data__, e, r)));
					a.parentNode = t
				}
			}
		}
		;
		return V(u)
	};

	function ei(n) {
		return typeof n === 'function' ? n : function () {
			return oe(n, this)
		}
	};
	var ie = 'http://www.w3.org/1999/xhtml',
		ue = {
			svg: 'http://www.w3.org/2000/svg',
			xhtml: ie,
			xlink: 'http://www.w3.org/1999/xlink',
			xml: 'http://www.w3.org/XML/1998/namespace',
			xmlns: 'http://www.w3.org/2000/xmlns/'
		};
	n.ns = {
		prefix: ue,
		qualify: function (n) {
			var t = n.indexOf(':'),
				e = n;
			if (t >= 0 && (e = n.slice(0, t)) !== 'xmlns') n = n.slice(t + 1);
			return ue.hasOwnProperty(e) ? {
				space: ue[e],
				local: n
			} : n
		}
	};
	u.attr = function (t, e) {
		if (arguments.length < 2) {
			if (typeof t === 'string') {
				var r = this.node();
				t = n.ns.qualify(t);
				return t.local ? r.getAttributeNS(t.space, t.local) : r.getAttribute(t)
			}
			;
			for (e in t) this.each(ri(e, t[e]));
			return this
		}
		;
		return this.each(ri(t, e))
	};

	function ri(t, e) {
		t = n.ns.qualify(t);

		function r() {
			this.removeAttribute(t)
		};

		function i() {
			this.removeAttributeNS(t.space, t.local)
		};

		function u() {
			this.setAttribute(t, e)
		};

		function a() {
			this.setAttributeNS(t.space, t.local, e)
		};

		function o() {
			var n = e.apply(this, arguments);
			if (n == null) this.removeAttribute(t);
			else this.setAttribute(t, n)
		};

		function l() {
			var n = e.apply(this, arguments);
			if (n == null) this.removeAttributeNS(t.space, t.local);
			else this.setAttributeNS(t.space, t.local, n)
		};
		return e == null ? t.local ? i : r : typeof e === 'function' ? t.local ? l : o : t.local ? a : u
	};

	function ii(n) {
		return n.trim().replace(/\s+/g, ' ')
	};
	u.classed = function (n, t) {
		if (arguments.length < 2) {
			if (typeof n === 'string') {
				var r = this.node(),
					i = (n = ai(n)).length,
					e = -1;
				if (t = r.classList) {
					while (++e < i)
						if (!t.contains(n[e])) return !1
				} else {
					t = r.getAttribute('class');
					while (++e < i)
						if (!ui(n[e]).test(t)) return !1
				}
				;
				return !0
			}
			;
			for (t in n) this.each(oi(t, n[t]));
			return this
		}
		;
		return this.each(oi(n, t))
	};

	function ui(t) {
		return new RegExp('(?:^|\\s+)' + n.requote(t) + '(?:\\s+|$)', 'g')
	};

	function ai(n) {
		return (n + '').trim().split(/^|\s+/)
	};

	function oi(n, t) {
		n = ai(n).map(Da);
		var e = n.length;

		function r() {
			var r = -1;
			while (++r < e) n[r](this, t)
		};

		function i() {
			var r = -1,
				i = t.apply(this, arguments);
			while (++r < e) n[r](this, i)
		};
		return typeof t === 'function' ? i : r
	};

	function Da(n) {
		var t = ui(n);
		return function (e, r) {
			if (i = e.classList) return r ? i.add(n) : i.remove(n);
			var i = e.getAttribute('class') || '';
			if (r) {
				t.lastIndex = 0;
				if (!t.test(i)) e.setAttribute('class', ii(i + ' ' + n))
			} else {
				e.setAttribute('class', ii(i.replace(t, ' ')))
			}
		}
	};
	u.style = function (n, t, e) {
		var r = arguments.length;
		if (r < 3) {
			if (typeof n !== 'string') {
				if (r < 2) t = '';
				for (e in n) this.each(li(e, n[e], t));
				return this
			}
			;
			if (r < 2) {
				var i = this.node();
				return Y(i).getComputedStyle(i, null).getPropertyValue(n)
			}
			;
			e = ''
		}
		;
		return this.each(li(n, t, e))
	};

	function li(n, t, e) {
		function r() {
			this.style.removeProperty(n)
		};

		function i() {
			this.style.setProperty(n, t, e)
		};

		function u() {
			var r = t.apply(this, arguments);
			if (r == null) this.style.removeProperty(n);
			else this.style.setProperty(n, r, e)
		};
		return t == null ? r : typeof t === 'function' ? u : i
	};
	u.property = function (n, t) {
		if (arguments.length < 2) {
			if (typeof n === 'string') return this.node()[n];
			for (t in n) this.each(fi(t, n[t]));
			return this
		}
		;
		return this.each(fi(n, t))
	};

	function fi(n, t) {
		function e() {
			delete this[n]
		};

		function r() {
			this[n] = t
		};

		function i() {
			var e = t.apply(this, arguments);
			if (e == null) delete this[n];
			else this[n] = e
		};
		return t == null ? e : typeof t === 'function' ? i : r
	};
	u.text = function (n) {
		return arguments.length ? this.each(typeof n === 'function' ? function () {
			var t = n.apply(this, arguments);
			this.textContent = t == null ? '' : t
		} : n == null ? function () {
			this.textContent = ''
		} : function () {
			this.textContent = n
		}) : this.node().textContent
	};
	u.html = function (n) {
		return arguments.length ? this.each(typeof n === 'function' ? function () {
			var t = n.apply(this, arguments);
			this.innerHTML = t == null ? '' : t
		} : n == null ? function () {
			this.innerHTML = ''
		} : function () {
			this.innerHTML = n
		}) : this.node().innerHTML
	};
	u.append = function (n) {
		n = si(n);
		return this.select(function () {
			return this.appendChild(n.apply(this, arguments))
		})
	};

	function si(t) {
		function e() {
			var n = this.ownerDocument,
				e = this.namespaceURI;
			return e === ie && n.documentElement.namespaceURI === ie ? n.createElement(t) : n.createElementNS(e, t)
		};

		function r() {
			return this.ownerDocument.createElementNS(t.space, t.local)
		};
		return typeof t === 'function' ? t : (t = n.ns.qualify(t)).local ? r : e
	};
	u.insert = function (n, t) {
		n = si(n);
		t = pe(t);
		return this.select(function () {
			return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null)
		})
	};
	u.remove = function () {
		return this.each(Ia)
	};

	function Ia() {
		var n = this.parentNode;
		if (n) n.removeChild(this)
	};
	u.data = function (n, t) {
		var e = -1,
			u = this.length,
			r, l;
		if (!arguments.length) {
			n = new Array(u = (r = this[0]).length);
			while (++e < u) {
				if (l = r[e]) {
					n[e] = l.__data__
				}
			}
			;
			return n
		}
		;

		function f(n, e) {
			var r, l = n.length,
				g = e.length,
				m = Math.min(l, g),
				p = new Array(g),
				f = new Array(g),
				v = new Array(l),
				u, s;
			if (t) {
				var c = new T(),
					d = new Array(l),
					h;
				for (r = -1; ++r < l;) {
					if (u = n[r]) {
						if (c.has(h = t.call(u, u.__data__, r))) {
							v[r] = u
						} else {
							c.set(h, u)
						}
						;
						d[r] = h
					}
				}
				;
				for (r = -1; ++r < g;) {
					if (!(u = c.get(h = t.call(e, s = e[r], r)))) {
						f[r] = ve(s)
					} else if (u !== !0) {
						p[r] = u;
						u.__data__ = s
					}
					;
					c.set(h, !0)
				}
				;
				for (r = -1; ++r < l;) {
					if (r in d && c.get(d[r]) !== !0) {
						v[r] = n[r]
					}
				}
			} else {
				for (r = -1; ++r < m;) {
					u = n[r];
					s = e[r];
					if (u) {
						u.__data__ = s;
						p[r] = u
					} else {
						f[r] = ve(s)
					}
				}
				;
				for (; r < g; ++r) {
					f[r] = ve(e[r])
				}
				;
				for (; r < l; ++r) {
					v[r] = n[r]
				}
			}
			;
			f.update = p;
			f.parentNode = p.parentNode = v.parentNode = n.parentNode;
			a.push(f);
			i.push(p);
			o.push(v)
		};
		var a = hi([]),
			i = V([]),
			o = V([]);
		if (typeof n === 'function') {
			while (++e < u) {
				f(r = this[e], n.call(r, r.parentNode.__data__, e))
			}
		} else {
			while (++e < u) {
				f(r = this[e], n)
			}
		}
		;
		i.enter = function () {
			return a
		};
		i.exit = function () {
			return o
		};
		return i
	};

	function ve(n) {
		return {
			__data__: n
		}
	};
	u.datum = function (n) {
		return arguments.length ? this.property('__data__', n) : this.property('__data__')
	};
	u.filter = function (n) {
		var a = [],
			i, u, r;
		if (typeof n !== 'function') n = ci(n);
		for (var e = 0, l = this.length; e < l; e++) {
			a.push(i = []);
			i.parentNode = (u = this[e]).parentNode;
			for (var t = 0, o = u.length; t < o; t++) {
				if ((r = u[t]) && n.call(r, r.__data__, t, e)) {
					i.push(r)
				}
			}
		}
		;
		return V(a)
	};

	function ci(n) {
		return function () {
			return ft(this, n)
		}
	};
	u.order = function () {
		for (var i = -1, u = this.length; ++i < u;) {
			for (var e = this[i], r = e.length - 1, n = e[r], t; --r >= 0;) {
				if (t = e[r]) {
					if (n && n !== t.nextSibling) n.parentNode.insertBefore(t, n);
					n = t
				}
			}
		}
		;
		return this
	};
	u.sort = function (n) {
		n = Pa.apply(this, arguments);
		for (var t = -1, e = this.length; ++t < e;) this[t].sort(n);
		return this.order()
	};

	function Pa(n) {
		if (!arguments.length) n = pn;
		return function (t, e) {
			return t && e ? n(t.__data__, e.__data__) : !t - !e
		}
	};
	u.each = function (n) {
		return R(this, function (t, e, r) {
			n.call(t, t.__data__, e, r)
		})
	};

	function R(n, t) {
		for (var r = 0, o = n.length; r < o; r++) {
			for (var i = n[r], e = 0, a = i.length, u; e < a; e++) {
				if (u = i[e]) t(u, e, r)
			}
		}
		;
		return n
	};
	u.call = function (n) {
		var t = N(arguments);
		n.apply(t[0] = this, t);
		return this
	};
	u.empty = function () {
		return !this.node()
	};
	u.node = function () {
		for (var t = 0, u = this.length; t < u; t++) {
			for (var r = this[t], n = 0, i = r.length; n < i; n++) {
				var e = r[n];
				if (e) return e
			}
		}
		;
		return null
	};
	u.size = function () {
		var n = 0;
		R(this, function () {
			++n
		});
		return n
	};

	function hi(n) {
		st(n, L);
		return n
	};
	var L = [];
	n.selection.enter = hi;
	n.selection.enter.prototype = L;
	L.append = u.append;
	L.empty = u.empty;
	L.node = u.node;
	L.call = u.call;
	L.size = u.size;
	L.select = function (n) {
		var a = [],
			r, o, l, t, u;
		for (var i = -1, s = this.length; ++i < s;) {
			l = (t = this[i]).update;
			a.push(r = []);
			r.parentNode = t.parentNode;
			for (var e = -1, f = t.length; ++e < f;) {
				if (u = t[e]) {
					r.push(l[e] = o = n.call(t.parentNode, u.__data__, e, i));
					o.__data__ = u.__data__
				} else {
					r.push(null)
				}
			}
		}
		;
		return V(a)
	};
	L.insert = function (n, t) {
		if (arguments.length < 2) t = Ua(this);
		return u.insert.call(this, n, t)
	};

	function Ua(n) {
		var t, e;
		return function (r, i, u) {
			var a = n[u].update,
				l = a.length,
				o;
			if (u != e) e = u, t = 0;
			if (i >= t) t = i + 1;
			while (!(o = a[t]) && ++t < l);
			return o
		}
	};
	n.select = function (n) {
		var t;
		if (typeof n === 'string') {
			t = [ae(n, p)];
			t.parentNode = p.documentElement
		} else {
			t = [n];
			t.parentNode = Xr(n)
		}
		;
		return V([t])
	};
	n.selectAll = function (n) {
		var t;
		if (typeof n === 'string') {
			t = N(oe(n, p));
			t.parentNode = p.documentElement
		} else {
			t = N(n);
			t.parentNode = null
		}
		;
		return V([t])
	};
	u.on = function (n, t, e) {
		var r = arguments.length;
		if (r < 3) {
			if (typeof n !== 'string') {
				if (r < 2) t = !1;
				for (e in n) this.each(gi(e, n[e], t));
				return this
			}
			;
			if (r < 2) return (r = this.node()['__on' + n]) && r._;
			e = !1
		}
		;
		return this.each(gi(n, t, e))
	};

	function gi(t, e, r) {
		var i = '__on' + t,
			u = t.indexOf('.'),
			o = pi;
		if (u > 0) t = t.slice(0, u);
		var a = re.get(t);
		if (a) t = a, o = ja;

		function l() {
			var n = this[i];
			if (n) {
				this.removeEventListener(t, n, n.$);
				delete this[i]
			}
		};

		function f() {
			var n = o(e, N(arguments));
			l.call(this);
			this.addEventListener(t, this[i] = n, n.$ = r);
			n._ = e
		};

		function c() {
			var u = new RegExp('^__on([^.]+)' + n.requote(t) + '$'),
				i;
			for (var e in this) {
				if (i = e.match(u)) {
					var r = this[e];
					this.removeEventListener(i[1], r, r.$);
					delete this[e]
				}
			}
		};
		return u ? e ? f : l : e ? s : c
	};
	var re = n.map({
		mouseenter: 'mouseover',
		mouseleave: 'mouseout'
	});
	if (p) {
		re.forEach(function (n) {
			if ('on' + n in p) re.remove(n)
		})
	}
	;

	function pi(t, e) {
		return function (r) {
			var i = n.event;
			n.event = r;
			e[0] = this.__data__;
			try {
				t.apply(this, e)
			} finally {
				n.event = i
			}
		}
	};

	function ja(n, t) {
		var e = pi(n, t);
		return function (n) {
			var t = this,
				r = n.relatedTarget;
			if (!r || r !== t && !(r.compareDocumentPosition(t) & 8)) {
				e.call(t, n)
			}
		}
	};
	var nn, Na = 0;

	function gt(t) {
		var e = '.dragsuppress-' + ++Na,
			u = 'click' + e,
			i = n.select(Y(t)).on('touchmove' + e, Z).on('dragstart' + e, Z).on('selectstart' + e, Z);
		if (nn == null) {
			nn = 'onselectstart' in t ? !1 : se(t.style, 'userSelect')
		}
		;
		if (nn) {
			var r = Xr(t).style,
				a = r[nn];
			r[nn] = 'none'
		}
		;
		return function (n) {
			i.on(e, null);
			if (nn) r[nn] = a;
			if (n) {
				var t = function () {
					i.on(u, null)
				};
				i.on(u, function () {
					Z();
					t()
				}, !0);
				setTimeout(t, 0)
			}
		}
	};
	n.mouse = function (n) {
		return de(n, he())
	};
	var ee = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;

	function de(t, e) {
		if (e.changedTouches) e = e.changedTouches[0];
		var i = t.ownerSVGElement || t;
		if (i.createSVGPoint) {
			var r = i.createSVGPoint();
			if (ee < 0) {
				var o = Y(t);
				if (o.scrollX || o.scrollY) {
					i = n.select('body').append('svg').style({
						position: 'absolute',
						top: 0,
						left: 0,
						margin: 0,
						padding: 0,
						border: 'none'
					}, 'important');
					var a = i[0][0].getScreenCTM();
					ee = !(a.f || a.e);
					i.remove()
				}
			}
			;
			if (ee) r.x = e.pageX, r.y = e.pageY;
			else r.x = e.clientX, r.y = e.clientY;
			r = r.matrixTransform(t.getScreenCTM().inverse());
			return [r.x, r.y]
		}
		;
		var u = t.getBoundingClientRect();
		return [e.clientX - u.left - t.clientLeft, e.clientY - u.top - t.clientTop]
	};
	n.touch = function (n, t, e) {
		if (arguments.length < 3) e = t, t = he().changedTouches;
		if (t)
			for (var r = 0, u = t.length, i; r < u; ++r) {
				if ((i = t[r]).identifier === e) {
					return de(n, i)
				}
			}
	};
	n.behavior.drag = function () {
		var r = ge(e, 'drag', 'dragstart', 'dragend'),
			t = null,
			u = i(s, n.mouse, Y, 'mousemove', 'mouseup'),
			a = i(Fa, n.touch, h, 'touchmove', 'touchend');

		function e() {
			this.on('mousedown.drag', u).on('touchstart.drag', a)
		};

		function i(e, i, u, a, o) {
			return function () {
				var h = this,
					v = n.event.target.correspondingElement || n.event.target,
					g = h.parentNode,
					p = r.of(h, arguments),
					d = 0,
					f = e(),
					c = '.drag' + (f == null ? '' : '-' + f),
					l, m = n.select(u(v)).on(a + c, M).on(o + c, x),
					y = gt(v),
					s = i(g, f);
				if (t) {
					l = t.apply(h, arguments);
					l = [l.x - s[0], l.y - s[1]]
				} else {
					l = [0, 0]
				}
				;
				p({
					type: 'dragstart'
				});

				function M() {
					var n = i(g, f),
						t, e;
					if (!n) return;
					t = n[0] - s[0];
					e = n[1] - s[1];
					d |= t | e;
					s = n;
					p({
						type: 'drag',
						x: n[0] + l[0],
						y: n[1] + l[1],
						dx: t,
						dy: e
					})
				};

				function x() {
					if (!i(g, f)) return;
					m.on(a + c, null).on(o + c, null);
					y(d);
					p({
						type: 'dragend'
					})
				}
			}
		};
		e.origin = function (n) {
			if (!arguments.length) return t;
			t = n;
			return e
		};
		return n.rebind(e, r, 'on')
	};

	function Fa() {
		return n.event.changedTouches[0].identifier
	};
	n.touches = function (n, t) {
		if (arguments.length < 2) t = he().touches;
		return t ? N(t).map(function (t) {
			var e = de(n, t);
			e.identifier = t.identifier;
			return e
		}) : []
	};
	var ε = 1e-6,
		ε2 = ε * ε,
		π = Math.PI,
		τ = 2 * π,
		τε = τ - ε,
		fπ = π / 2,
		e = π / 180,
		o = 180 / π;

	function vi(n) {
		return n > 0 ? 1 : n < 0 ? -1 : 0
	};

	function me(n, t, e) {
		return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0])
	};

	function di(n) {
		return n > 1 ? 0 : n < -1 ? π : Math.acos(n)
	};

	function X(n) {
		return n > 1 ? fπ : n < -1 ? -fπ : Math.asin(n)
	};

	function Ha(n) {
		return ((n = Math.exp(n)) - 1 / n) / 2
	};

	function mi(n) {
		return ((n = Math.exp(n)) + 1 / n) / 2
	};

	function Oa(n) {
		return ((n = Math.exp(2 * n)) - 1) / (n + 1)
	};

	function yi(n) {
		return (n = Math.sin(n / 2)) * n
	};
	var ρ = Math.SQRT2,
		ρ2 = 2,
		ρ4 = 4;
	n.interpolateZoom = function (n, t) {
		var g = n[0],
			p = n[1],
			e = n[2],
			d = t[0],
			m = t[1],
			r = t[2],
			a = d - g,
			o = m - p,
			l = a * a + o * o,
			f, u;
		if (l < ε2) {
			u = Math.log(r / e) / ρ;
			f = function (n) {
				return [g + n * a, p + n * o, e * Math.exp(ρ * n * u)]
			}
		} else {
			var s = Math.sqrt(l),
				c = (r * r - e * e + ρ4 * l) / (2 * e * ρ2 * s),
				h = (r * r - e * e - ρ4 * l) / (2 * r * ρ2 * s),
				i = Math.log(Math.sqrt(c * c + 1) - c),
				v = Math.log(Math.sqrt(h * h + 1) - h);
			u = (v - i) / ρ;
			f = function (n) {
				var t = n * u,
					r = mi(i),
					l = e / (ρ2 * s) * (r * Oa(ρ * t + i) - Ha(i));
				return [g + l * a, p + l * o, e * r / mi(ρ * t + i)]
			}
		}
		;
		f.duration = u * 1e3;
		return f
	};
	n.behavior.zoom = function () {
		var t = {
				x: 0,
				y: 0,
				k: 1
			},
			N, r, y, l = [960, 500],
			f = Hr,
			s = 250,
			E = 0,
			M = 'mousedown.zoom',
			A = 'mousemove.zoom',
			C = 'mouseup.zoom',
			c, x = 'touchstart.zoom',
			w, u = ge(e, 'zoomstart', 'zoom', 'zoomend'),
			b, h, S, g;
		if (!te) {
			te = 'onwheel' in p ? (lt = function () {
				return -n.event.deltaY * (n.event.deltaMode ? 120 : 1)
			}, 'wheel') : 'onmousewheel' in p ? (lt = function () {
				return n.event.wheelDelta
			}, 'mousewheel') : (lt = function () {
				return -n.event.detail
			}, 'MozMousePixelScroll')
		}
		;

		function e(n) {
			n.on(M, L).on(te + '.zoom', R).on('dblclick.zoom', D).on(x, q)
		};
		e.event = function (e) {
			e.each(function () {
				var e = u.of(this, arguments),
					f = t;
				if (W) {
					n.select(this).transition().each('start.zoom', function () {
						t = this.__chart__ || {
								x: 0,
								y: 0,
								k: 1
							};
						a(e)
					}).tween('zoom:zoom', function () {
						var i = l[0],
							s = l[1],
							u = r ? r[0] : i / 2,
							a = r ? r[1] : s / 2,
							c = n.interpolateZoom([(u - t.x) / t.k, (a - t.y) / t.k, i / t.k], [(u - f.x) / f.k, (a - f.y) / f.k, i / f.k]);
						return function (n) {
							var r = c(n),
								l = i / r[2];
							this.__chart__ = t = {
								x: u - r[0] * l,
								y: a - r[1] * l,
								k: l
							};
							o(e)
						}
					}).each('interrupt.zoom', function () {
						i(e)
					}).each('end.zoom', function () {
						i(e)
					})
				} else {
					this.__chart__ = t;
					a(e);
					o(e);
					i(e)
				}
			})
		};
		e.translate = function (n) {
			if (!arguments.length) return [t.x, t.y];
			t = {
				x: +n[0],
				y: +n[1],
				k: t.k
			};
			k();
			return e
		};
		e.scale = function (n) {
			if (!arguments.length) return t.k;
			t = {
				x: t.x,
				y: t.y,
				k: null
			};
			d(+n);
			k();
			return e
		};
		e.scaleExtent = function (n) {
			if (!arguments.length) return f;
			f = n == null ? Hr : [+n[0], +n[1]];
			return e
		};
		e.center = function (n) {
			if (!arguments.length) return y;
			y = n && [+n[0], +n[1]];
			return e
		};
		e.size = function (n) {
			if (!arguments.length) return l;
			l = n && [+n[0], +n[1]];
			return e
		};
		e.duration = function (n) {
			if (!arguments.length) return s;
			s = +n;
			return e
		};
		e.x = function (n) {
			if (!arguments.length) return h;
			h = n;
			b = n.copy();
			t = {
				x: 0,
				y: 0,
				k: 1
			};
			return e
		};
		e.y = function (n) {
			if (!arguments.length) return g;
			g = n;
			S = n.copy();
			t = {
				x: 0,
				y: 0,
				k: 1
			};
			return e
		};

		function v(n) {
			return [(n[0] - t.x) / t.k, (n[1] - t.y) / t.k]
		};

		function T(n) {
			return [n[0] * t.k + t.x, n[1] * t.k + t.y]
		};

		function d(n) {
			t.k = Math.max(f[0], Math.min(f[1], n))
		};

		function m(n, e) {
			e = T(e);
			t.x += n[0] - e[0];
			t.y += n[1] - e[1]
		};

		function z(i, u, a, o) {
			i.__chart__ = {
				x: t.x,
				y: t.y,
				k: t.k
			};
			d(Math.pow(2, o));
			m(r = u, a);
			i = n.select(i);
			if (s > 0) i = i.transition().duration(s);
			i.call(e.event)
		};

		function k() {
			if (h) h.domain(b.range().map(function (n) {
				return (n - t.x) / t.k
			}).map(b.invert));
			if (g) g.domain(S.range().map(function (n) {
				return (n - t.y) / t.k
			}).map(S.invert))
		};

		function a(n) {
			if (!E++) n({
				type: 'zoomstart'
			})
		};

		function o(n) {
			k();
			n({
				type: 'zoom',
				scale: t.k,
				translate: [t.x, t.y]
			})
		};

		function i(n) {
			if (!--E) n({
				type: 'zoomend'
			}), r = null
		};

		function L() {
			var t = this,
				e = u.of(t, arguments),
				r = 0,
				l = n.select(Y(t)).on(A, c).on(C, h),
				f = v(n.mouse(t)),
				s = gt(t);
			Hn.call(t);
			a(e);

			function c() {
				r = 1;
				m(n.mouse(t), f);
				o(e)
			};

			function h() {
				l.on(A, null).on(C, null);
				s(r);
				i(e)
			}
		};

		function q() {
			var e = this,
				l = u.of(e, arguments),
				r = {},
				f = 0,
				c, s = '.zoom-' + n.event.changedTouches[0].identifier,
				b = 'touchmove' + s,
				S = 'touchend' + s,
				h = [],
				g = n.select(e),
				k = gt(e);
			y();
			a(l);
			g.on(M, null).on(x, y);

			function p() {
				var i = n.touches(e);
				c = t.k;
				i.forEach(function (n) {
					if (n.identifier in r) r[n.identifier] = v(n)
				});
				return i
			};

			function y() {
				var v = n.event.target;
				n.select(v).on(b, N).on(S, E);
				h.push(v);
				var g = n.event.changedTouches;
				for (var a = 0, d = g.length; a < d; ++a) {
					r[g[a].identifier] = null
				}
				;
				var u = p(),
					c = Date.now();
				if (u.length === 1) {
					if (c - w < 500) {
						var i = u[0];
						z(e, i, r[i.identifier], Math.floor(Math.log(t.k) / Math.LN2) + 1);
						Z()
					}
					;
					w = c
				} else if (u.length > 1) {
					var i = u[0],
						o = u[1],
						l = i[0] - o[0],
						s = i[1] - o[1];
					f = l * l + s * s
				}
			};

			function N() {
				var g = n.touches(e),
					t, u, i, a;
				Hn.call(e);
				for (var h = 0, v = g.length; h < v; ++h, a = null) {
					i = g[h];
					if (a = r[i.identifier]) {
						if (u) break;
						t = i, u = a
					}
				}
				;
				if (a) {
					var s = (s = i[0] - t[0]) * s + (s = i[1] - t[1]) * s,
						p = f && Math.sqrt(s / f);
					t = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2];
					u = [(u[0] + a[0]) / 2, (u[1] + a[1]) / 2];
					d(p * c)
				}
				;
				w = null;
				m(t, u);
				o(l)
			};

			function E() {
				if (n.event.touches.length) {
					var e = n.event.changedTouches;
					for (var t = 0, u = e.length; t < u; ++t) {
						delete r[e[t].identifier]
					}
					;
					for (var a in r) {
						return void p()
					}
				}
				;
				n.selectAll(h).on(s, null);
				g.on(M, L).on(x, q);
				k();
				i(l)
			}
		};

		function R() {
			var e = u.of(this, arguments);
			if (c) clearTimeout(c);
			else Hn.call(this), N = v(r = y || n.mouse(this)), a(e);
			c = setTimeout(function () {
				c = null;
				i(e)
			}, 50);
			Z();
			d(Math.pow(2, lt() * .002) * t.k);
			m(r, N);
			o(e)
		};

		function D() {
			var e = n.mouse(this),
				r = Math.log(t.k) / Math.LN2;
			z(this, e, v(e), n.event.shiftKey ? Math.ceil(r) - 1 : Math.floor(r) + 1)
		};
		return n.rebind(e, u, 'on')
	};
	var Hr = [0, Infinity],
		lt, te;
	n.color = en;

	function en() {
	};
	en.prototype.toString = function () {
		return this.rgb() + ''
	};
	n.hsl = E;

	function E(n, t, e) {
		return this instanceof E ? void(this.h = +n, this.s = +t, this.l = +e) : arguments.length < 2 ? n instanceof E ? new E(n.h, n.s, n.l) : bi('' + n, Si, E) : new E(n, t, e)
	};
	var ne = E.prototype = new en();
	ne.brighter = function (n) {
		n = Math.pow(.7, arguments.length ? n : 1);
		return new E(this.h, this.s, this.l / n)
	};
	ne.darker = function (n) {
		n = Math.pow(.7, arguments.length ? n : 1);
		return new E(this.h, this.s, n * this.l)
	};
	ne.rgb = function () {
		return ye(this.h, this.s, this.l)
	};

	function ye(n, t, e) {
		var r, i;
		n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n;
		t = isNaN(t) ? 0 : t < 0 ? 0 : t > 1 ? 1 : t;
		e = e < 0 ? 0 : e > 1 ? 1 : e;
		i = e <= .5 ? e * (1 + t) : e + t - e * t;
		r = 2 * e - i;

		function a(n) {
			if (n > 360) n -= 360;
			else if (n < 0) n += 360;
			if (n < 60) return r + (i - r) * n / 60;
			if (n < 180) return i;
			if (n < 240) return r + (i - r) * (240 - n) / 60;
			return r
		};

		function u(n) {
			return Math.round(a(n) * 255)
		};
		return new d(u(n + 120), u(n), u(n - 120))
	};
	n.hcl = w;

	function w(t, e, r) {
		return this instanceof w ? void(this.h = +t, this.c = +e, this.l = +r) : arguments.length < 2 ? t instanceof w ? new w(t.h, t.c, t.l) : t instanceof b ? xi(t.l, t.a, t.b) : xi((t = ki((t = n.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : new w(t, e, r)
	};
	var Qt = w.prototype = new en();
	Qt.brighter = function (n) {
		return new w(this.h, this.c, Math.min(100, this.l + ot * (arguments.length ? n : 1)))
	};
	Qt.darker = function (n) {
		return new w(this.h, this.c, Math.max(0, this.l - ot * (arguments.length ? n : 1)))
	};
	Qt.rgb = function () {
		return Me(this.h, this.c, this.l).rgb()
	};

	function Me(n, t, r) {
		if (isNaN(n)) n = 0;
		if (isNaN(t)) t = 0;
		return new b(r, Math.cos(n *= e) * t, Math.sin(n) * t)
	};
	n.lab = b;

	function b(n, t, e) {
		return this instanceof b ? void(this.l = +n, this.a = +t, this.b = +e) : arguments.length < 2 ? n instanceof b ? new b(n.l, n.a, n.b) : n instanceof w ? Me(n.h, n.c, n.l) : ki((n = d(n)).r, n.g, n.b) : new b(n, t, e)
	};
	var ot = 18,
		Ur = .95047,
		jr = 1,
		Fr = 1.08883,
		Kt = b.prototype = new en();
	Kt.brighter = function (n) {
		return new b(Math.min(100, this.l + ot * (arguments.length ? n : 1)), this.a, this.b)
	};
	Kt.darker = function (n) {
		return new b(Math.max(0, this.l - ot * (arguments.length ? n : 1)), this.a, this.b)
	};
	Kt.rgb = function () {
		return Mi(this.l, this.a, this.b)
	};

	function Mi(n, t, e) {
		var r = (n + 16) / 116,
			i = r + t / 500,
			u = r - e / 200;
		i = xe(i) * Ur;
		r = xe(r) * jr;
		u = xe(u) * Fr;
		return new d(be(3.2404542 * i - 1.5371385 * r - .4985314 * u), be(-.969266 * i + 1.8760108 * r + .041556 * u), be(.0556434 * i - .2040259 * r + 1.0572252 * u))
	};

	function xi(n, t, e) {
		return n > 0 ? new w(Math.atan2(e, t) * o, Math.sqrt(t * t + e * e), n) : new w(NaN, NaN, n)
	};

	function xe(n) {
		return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037
	};

	function we(n) {
		return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29
	};

	function be(n) {
		return Math.round(255 * (n <= .00304 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055))
	};
	n.rgb = d;

	function d(n, t, e) {
		return this instanceof d ? void(this.r = ~~n, this.g = ~~t, this.b = ~~e) : arguments.length < 2 ? n instanceof d ? new d(n.r, n.g, n.b) : bi('' + n, d, ye) : new d(n, t, e)
	};

	function wi(n) {
		return new d(n >> 16, n >> 8 & 255, n & 255)
	};

	function pt(n) {
		return wi(n) + ''
	};
	var at = d.prototype = new en();
	at.brighter = function (n) {
		n = Math.pow(.7, arguments.length ? n : 1);
		var e = this.r,
			r = this.g,
			i = this.b,
			t = 30;
		if (!e && !r && !i) return new d(t, t, t);
		if (e && e < t) e = t;
		if (r && r < t) r = t;
		if (i && i < t) i = t;
		return new d(Math.min(255, e / n), Math.min(255, r / n), Math.min(255, i / n))
	};
	at.darker = function (n) {
		n = Math.pow(.7, arguments.length ? n : 1);
		return new d(n * this.r, n * this.g, n * this.b)
	};
	at.hsl = function () {
		return Si(this.r, this.g, this.b)
	};
	at.toString = function () {
		return '#' + vn(this.r) + vn(this.g) + vn(this.b)
	};

	function vn(n) {
		return n < 16 ? '0' + Math.max(0, n).toString(16) : Math.min(255, n).toString(16)
	};

	function bi(n, t, e) {
		var u = 0,
			a = 0,
			o = 0,
			l, i, r;
		l = /([a-z]+)\((.*)\)/.exec(n = n.toLowerCase());
		if (l) {
			i = l[2].split(',');
			switch (l[1]) {
				case 'hsl':
				{
					return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100)
				}
					;
				case 'rgb':
				{
					return t(ke(i[0]), ke(i[1]), ke(i[2]))
				}
			}
		}
		;
		if (r = ut.get(n)) {
			return t(r.r, r.g, r.b)
		}
		;
		if (n != null && n.charAt(0) === '#' && !isNaN(r = parseInt(n.slice(1), 16))) {
			if (n.length === 4) {
				u = (r & 3840) >> 4;
				u = u >> 4 | u;
				a = r & 240;
				a = a >> 4 | a;
				o = r & 15;
				o = o << 4 | o
			} else if (n.length === 7) {
				u = (r & 16711680) >> 16;
				a = (r & 65280) >> 8;
				o = r & 255
			}
		}
		;
		return t(u, a, o)
	};

	function Si(n, t, e) {
		var a = Math.min(n /= 255, t /= 255, e /= 255),
			i = Math.max(n, t, e),
			u = i - a,
			r, l, o = (i + a) / 2;
		if (u) {
			l = o < .5 ? u / (i + a) : u / (2 - i - a);
			if (n == i) r = (t - e) / u + (t < e ? 6 : 0);
			else if (t == i) r = (e - n) / u + 2;
			else r = (n - t) / u + 4;
			r *= 60
		} else {
			r = NaN;
			l = o > 0 && o < 1 ? 0 : r
		}
		;
		return new E(r, l, o)
	};

	function ki(n, t, e) {
		n = Se(n);
		t = Se(t);
		e = Se(e);
		var i = we((.4124564 * n + .3575761 * t + .1804375 * e) / Ur),
			r = we((.2126729 * n + .7151522 * t + .072175 * e) / jr),
			u = we((.0193339 * n + .119192 * t + .9503041 * e) / Fr);
		return b(116 * r - 16, 500 * (i - r), 200 * (r - u))
	};

	function Se(n) {
		return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
	};

	function ke(n) {
		var t = parseFloat(n);
		return n.charAt(n.length - 1) === '%' ? Math.round(t * 2.55) : t
	};
	var ut = n.map({
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	});
	ut.forEach(function (n, t) {
		ut.set(n, wi(t))
	});

	function a(n) {
		return typeof n === 'function' ? n : function () {
			return n
		}
	};
	n.functor = a;
	n.xhr = Ne(h);

	function Ne(n) {
		return function (t, e, r) {
			if (arguments.length === 2 && typeof e === 'function') r = e, e = null;
			return vt(t, e, n, r)
		}
	};

	function vt(t, e, r, i) {
		var u = {},
			l = n.dispatch('beforesend', 'progress', 'load', 'error'),
			o = {},
			a = new XMLHttpRequest(),
			f = null;
		if (this.XDomainRequest && !('withCredentials' in a) && /^(http(s)?:)?\/\//.test(t)) a = new XDomainRequest();
		'onload' in a ? a.onload = a.onerror = s : a.onreadystatechange = function () {
			a.readyState > 3 && s()
		};

		function s() {
			var n = a.status,
				e;
			if (!n && Za(a) || n >= 200 && n < 300 || n === 304) {
				try {
					e = r.call(u, a)
				} catch (t) {
					l.error.call(u, t);
					return
				}
				;
				l.load.call(u, e)
			} else {
				l.error.call(u, a)
			}
		};
		a.onprogress = function (t) {
			var e = n.event;
			n.event = t;
			try {
				l.progress.call(u, a)
			} finally {
				n.event = e
			}
		};
		u.header = function (n, t) {
			n = (n + '').toLowerCase();
			if (arguments.length < 2) return o[n];
			if (t == null) delete o[n];
			else o[n] = t + '';
			return u
		};
		u.mimeType = function (n) {
			if (!arguments.length) return e;
			e = n == null ? null : n + '';
			return u
		};
		u.responseType = function (n) {
			if (!arguments.length) return f;
			f = n;
			return u
		};
		u.response = function (n) {
			r = n;
			return u
		};
		['get', 'post'].forEach(function (n) {
			u[n] = function () {
				return u.send.apply(u, [n].concat(N(arguments)))
			}
		});
		u.send = function (n, r, i) {
			if (arguments.length === 2 && typeof r === 'function') i = r, r = null;
			a.open(n, t, !0);
			if (e != null && !('accept' in o)) o['accept'] = e + ',*/*';
			if (a.setRequestHeader)
				for (var s in o) a.setRequestHeader(s, o[s]);
			if (e != null && a.overrideMimeType) a.overrideMimeType(e);
			if (f != null) a.responseType = f;
			if (i != null) u.on('error', i).on('load', function (n) {
				i(null, n)
			});
			l.beforesend.call(u, a);
			a.send(r == null ? null : r);
			return u
		};
		u.abort = function () {
			a.abort();
			return u
		};
		n.rebind(u, l, 'on');
		return i == null ? u : u.get(Ya(i))
	};

	function Ya(n) {
		return n.length === 1 ? function (t, e) {
			n(t == null ? e : null)
		} : n
	};

	function Za(n) {
		var t = n.responseType;
		return t && t !== 'text' ? n.response : n.responseText
	};
	n.dsv = function (n, t) {
		var a = new RegExp('["' + n + '\n]'),
			o = n.charCodeAt(0);

		function e(n, e, r) {
			if (arguments.length < 3) r = e, e = null;
			var a = vt(n, t, e == null ? i : u(e), r);
			a.row = function (n) {
				return arguments.length ? a.response((e = n) == null ? i : u(n)) : e
			};
			return a
		};

		function i(n) {
			return e.parse(n.responseText)
		};

		function u(n) {
			return function (t) {
				return e.parse(t.responseText, n)
			}
		};
		e.parse = function (n, t) {
			var r;
			return e.parseRows(n, function (n, e) {
				if (r) return r(n, e - 1);
				var i = new Function('d', 'return {' + n.map(function (n, t) {
						return JSON.stringify(n) + ': d[' + t + ']'
					}).join(',') + '}');
				r = t ? function (n, e) {
					return t(i(n), e)
				} : i
			})
		};
		e.parseRows = function (n, t) {
			var f = {},
				a = {},
				s = [],
				l = n.length,
				e = 0,
				h = 0,
				i, r;

			function c() {
				if (e >= l) return a;
				if (r) return r = !1, f;
				var u = e;
				if (n.charCodeAt(u) === 34) {
					var t = u;
					while (t++ < l) {
						if (n.charCodeAt(t) === 34) {
							if (n.charCodeAt(t + 1) !== 34) break;
							++t
						}
					}
					;
					e = t + 2;
					var i = n.charCodeAt(t + 1);
					if (i === 13) {
						r = !0;
						if (n.charCodeAt(t + 2) === 10) ++e
					} else if (i === 10) {
						r = !0
					}
					;
					return n.slice(u + 1, t).replace(/""/g, '"')
				}
				while (e < l) {
					var i = n.charCodeAt(e++),
						s = 1;
					if (i === 10) r = !0;
					else if (i === 13) {
						r = !0;
						if (n.charCodeAt(e) === 10) ++e, ++s
					} else if (i !== o) continue;
					return n.slice(u, e - s)
				}
				;
				return n.slice(u)
			}

			while ((i = c()) !== a) {
				var u = [];
				while (i !== f && i !== a) {
					u.push(i);
					i = c()
				}
				;
				if (t && (u = t(u, h++)) == null) continue;
				s.push(u)
			}
			;
			return s
		};
		e.format = function (t) {
			if (Array.isArray(t[0])) return e.formatRows(t);
			var u = new fe(),
				i = [];
			t.forEach(function (n) {
				for (var t in n) {
					if (!u.has(t)) {
						i.push(u.add(t))
					}
				}
			});
			return [i.map(r).join(n)].concat(t.map(function (t) {
				return i.map(function (n) {
					return r(t[n])
				}).join(n)
			})).join('\n')
		};
		e.formatRows = function (n) {
			return n.map(l).join('\n')
		};

		function l(t) {
			return t.map(r).join(n)
		};

		function r(n) {
			return a.test(n) ? '"' + n.replace(/"/g, '""') + '"' : n
		};
		return e
	};
	n.csv = n.dsv(',', 'text/csv');
	n.tsv = n.dsv(' ', 'text/tab-separated-values');
	var tt, et, rt, it, Pr = this[se(this, 'requestAnimationFrame')] || function (n) {
			setTimeout(n, 17)
		};
	n.timer = function () {
		dt.apply(this, arguments)
	};

	function dt(n, t, e) {
		var i = arguments.length;
		if (i < 2) t = 0;
		if (i < 3) e = Date.now();
		var u = e + t,
			r = {
				c: n,
				t: u,
				n: null
			};
		if (et) et.n = r;
		else tt = r;
		et = r;
		if (!rt) {
			it = clearTimeout(it);
			rt = 1;
			Pr(Ee)
		}
		;
		return r
	};

	function Ee() {
		var t = Ni(),
			n = Ei() - t;
		if (n > 24) {
			if (isFinite(n)) {
				clearTimeout(it);
				it = setTimeout(Ee, n)
			}
			;
			rt = 0
		} else {
			rt = 1;
			Pr(Ee)
		}
	};
	n.timer.flush = function () {
		Ni();
		Ei()
	};

	function Ni() {
		var t = Date.now(),
			n = tt;
		while (n) {
			if (t >= n.t && n.c(t - n.t)) n.c = null;
			n = n.n
		}
		;
		return t
	};

	function Ei() {
		var t, n = tt,
			e = Infinity;
		while (n) {
			if (n.c) {
				if (n.t < e) e = n.t;
				n = (t = n).n
			} else {
				n = t ? t.n = n.n : tt = n.n
			}
		}
		;
		et = t;
		return e
	};

	function Ae(n, t) {
		return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1)
	};
	n.round = function (n, t) {
		return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n)
	};
	var ka = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'].map(Va);
	n.formatPrefix = function (t, e) {
		var r = 0;
		if (t = +t) {
			if (t < 0) t *= -1;
			if (e) t = n.round(t, Ae(t, e));
			r = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10);
			r = Math.max(-24, Math.min(24, Math.floor((r - 1) / 3) * 3))
		}
		;
		return ka[8 + r / 3]
	};

	function Va(n, t) {
		var e = Math.pow(10, r(8 - t) * 3);
		return {
			scale: t > 8 ? function (n) {
				return n / e
			} : function (n) {
				return n * e
			},
			symbol: n
		}
	};

	function Xa(t) {
		var a = t.decimal,
			r = t.thousands,
			e = t.grouping,
			i = t.currency,
			u = e && r ? function (n, t) {
				var u = n.length,
					o = [],
					l = 0,
					i = e[0],
					a = 0;
				while (u > 0 && i > 0) {
					if (a + i + 1 > t) i = Math.max(1, t - a);
					o.push(n.substring(u -= i, u + i));
					if ((a += i + 1) > t) break;
					i = e[l = (l + 1) % e.length]
				}
				;
				return o.reverse().join(r)
			} : h;
		return function (t) {
			var o = Ir.exec(t),
				p = o[1] || ' ',
				l = o[2] || '>',
				m = o[3] || '-',
				y = o[4] || '',
				c = o[5],
				v = +o[6],
				d = o[7],
				r = o[8],
				e = o[9],
				f = 1,
				h = '',
				s = '',
				M = !1,
				x = !0;
			if (r) r = +r.substring(1);
			if (c || p === '0' && l === '=') {
				c = p = '0';
				l = '='
			}
			;
			switch (e) {
				case 'n':
					d = !0;
					e = 'g';
					break;
				case '%':
					f = 100;
					s = '%';
					e = 'f';
					break;
				case 'p':
					f = 100;
					s = '%';
					e = 'r';
					break;
				case 'b':
				case 'o':
				case 'x':
				case 'X':
					if (y === '#') h = '0' + e.toLowerCase();
				case 'c':
					x = !1;
				case 'd':
					M = !0;
					r = 0;
					break;
				case 's':
					f = -1;
					e = 'r';
					break
			}
			;
			if (y === '$') h = i[0], s = i[1];
			if (e == 'r' && !r) e = 'g';
			if (r != null) {
				if (e == 'g') r = Math.max(1, Math.min(21, r));
				else if (e == 'e' || e == 'f') r = Math.max(0, Math.min(20, r))
			}
			;
			e = Sa.get(e) || Ba;
			var g = c && d;
			return function (t) {
				var E = s;
				if (M && t % 1) return '';
				var w = t < 0 || t === 0 && 1 / t < 0 ? (t = -t, '-') : m === '-' ? '' : m;
				if (f < 0) {
					var N = n.formatPrefix(t, r);
					t = N.scale(t);
					E = N.symbol + s
				} else {
					t *= f
				}
				;
				t = e(t, r);
				var k = t.lastIndexOf('.'),
					i, y;
				if (k < 0) {
					var S = x ? t.lastIndexOf('e') : -1;
					if (S < 0) i = t, y = '';
					else i = t.substring(0, S), y = t.substring(S)
				} else {
					i = t.substring(0, k);
					y = a + t.substring(k + 1)
				}
				;
				if (!c && d) i = u(i, Infinity);
				var b = h.length + i.length + y.length + (g ? 0 : w.length),
					o = b < v ? new Array(b = v - b + 1).join(p) : '';
				if (g) i = u(o + i, o.length ? v - y.length : Infinity);
				w += h;
				t = i + y;
				return (l === '<' ? w + t + o : l === '>' ? o + w + t : l === '^' ? o.substring(0, b >>= 1) + w + t + o.substring(b) : w + (g ? t : o + t)) + E
			}
		}
	};
	var Ir = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
		Sa = n.map({
			b: function (n) {
				return n.toString(2)
			},
			c: function (n) {
				return String.fromCharCode(n)
			},
			o: function (n) {
				return n.toString(8)
			},
			x: function (n) {
				return n.toString(16)
			},
			X: function (n) {
				return n.toString(16).toUpperCase()
			},
			g: function (n, t) {
				return n.toPrecision(t)
			},
			e: function (n, t) {
				return n.toExponential(t)
			},
			f: function (n, t) {
				return n.toFixed(t)
			},
			r: function (t, e) {
				return (t = n.round(t, Ae(t, e))).toFixed(Math.max(0, Math.min(20, Ae(t * (1 + 1e-15), e))))
			}
		});

	function Ba(n) {
		return n + ''
	};
	var t = n.time = {},
		g = Date;

	function D() {
		this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
	};
	D.prototype = {
		getDate: function () {
			return this._.getUTCDate()
		},
		getDay: function () {
			return this._.getUTCDay()
		},
		getFullYear: function () {
			return this._.getUTCFullYear()
		},
		getHours: function () {
			return this._.getUTCHours()
		},
		getMilliseconds: function () {
			return this._.getUTCMilliseconds()
		},
		getMinutes: function () {
			return this._.getUTCMinutes()
		},
		getMonth: function () {
			return this._.getUTCMonth()
		},
		getSeconds: function () {
			return this._.getUTCSeconds()
		},
		getTime: function () {
			return this._.getTime()
		},
		getTimezoneOffset: function () {
			return 0
		},
		valueOf: function () {
			return this._.valueOf()
		},
		setDate: function () {
			z.setUTCDate.apply(this._, arguments)
		},
		setDay: function () {
			z.setUTCDay.apply(this._, arguments)
		},
		setFullYear: function () {
			z.setUTCFullYear.apply(this._, arguments)
		},
		setHours: function () {
			z.setUTCHours.apply(this._, arguments)
		},
		setMilliseconds: function () {
			z.setUTCMilliseconds.apply(this._, arguments)
		},
		setMinutes: function () {
			z.setUTCMinutes.apply(this._, arguments)
		},
		setMonth: function () {
			z.setUTCMonth.apply(this._, arguments)
		},
		setSeconds: function () {
			z.setUTCSeconds.apply(this._, arguments)
		},
		setTime: function () {
			z.setTime.apply(this._, arguments)
		}
	};
	var z = Date.prototype;

	function rn(n, t, e) {
		function a(t) {
			var e = n(t),
				r = u(e, 1);
			return t - e < r - t ? e : r
		};

		function i(e) {
			t(e = n(new g(e - 1)), 1);
			return e
		};

		function u(n, e) {
			t(n = new g(+n), e);
			return n
		};

		function o(n, r, u) {
			var a = i(n),
				o = [];
			if (u > 1) {
				while (a < r) {
					if (!(e(a) % u)) o.push(new Date(+a));
					t(a, 1)
				}
			} else {
				while (a < r) o.push(new Date(+a)), t(a, 1)
			}
			;
			return o
		};

		function l(n, t, e) {
			try {
				g = D;
				var r = new D();
				r._ = n;
				return o(r, t, e)
			} finally {
				g = Date
			}
		};
		n.floor = n;
		n.round = a;
		n.ceil = i;
		n.offset = u;
		n.range = o;
		var r = n.utc = mt(n);
		r.floor = r;
		r.round = mt(a);
		r.ceil = mt(i);
		r.offset = mt(u);
		r.range = l;
		return n
	};

	function mt(n) {
		return function (t, e) {
			try {
				g = D;
				var r = new D();
				r._ = t;
				return n(r, e)._
			} finally {
				g = Date
			}
		}
	};
	t.year = rn(function (n) {
		n = t.day(n);
		n.setMonth(0, 1);
		return n
	}, function (n, t) {
		n.setFullYear(n.getFullYear() + t)
	}, function (n) {
		return n.getFullYear()
	});
	t.years = t.year.range;
	t.years.utc = t.year.utc.range;
	t.day = rn(function (n) {
		var t = new g(2e3, 0);
		t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate());
		return t
	}, function (n, t) {
		n.setDate(n.getDate() + t)
	}, function (n) {
		return n.getDate() - 1
	});
	t.days = t.day.range;
	t.days.utc = t.day.utc.range;
	t.dayOfYear = function (n) {
		var e = t.year(n);
		return Math.floor((n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 864e5)
	};
	['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].forEach(function (n, e) {
		e = 7 - e;
		var r = t[n] = rn(function (n) {
			(n = t.day(n)).setDate(n.getDate() - (n.getDay() + e) % 7);
			return n
		}, function (n, t) {
			n.setDate(n.getDate() + Math.floor(t) * 7)
		}, function (n) {
			var r = t.year(n).getDay();
			return Math.floor((t.dayOfYear(n) + (r + e) % 7) / 7) - (r !== e)
		});
		t[n + 's'] = r.range;
		t[n + 's'].utc = r.utc.range;
		t[n + 'OfYear'] = function (n) {
			var r = t.year(n).getDay();
			return Math.floor((t.dayOfYear(n) + (r + e) % 7) / 7)
		}
	});
	t.week = t.sunday;
	t.weeks = t.sunday.range;
	t.weeks.utc = t.sunday.utc.range;
	t.weekOfYear = t.sundayOfYear;

	function Wa(e) {
		var S = e.dateTime,
			k = e.date,
			N = e.time,
			m = e.periods,
			a = e.days,
			o = e.shortDays,
			l = e.months,
			f = e.shortMonths;

		function r(n) {
			var e = n.length;

			function t(t) {
				var a = [],
					r = -1,
					o = 0,
					u, l, f;
				while (++r < e) {
					if (n.charCodeAt(r) === 37) {
						a.push(n.slice(o, r));
						if ((l = Rr[u = n.charAt(++r)]) != null) u = n.charAt(++r);
						if (f = i[u]) u = f(t, l == null ? u === 'e' ? ' ' : '0' : l);
						a.push(u);
						o = r + 1
					}
				}
				;
				a.push(n.slice(o, r));
				return a.join('')
			};
			t.parse = function (t) {
				var e = {
						y: 1900,
						m: 0,
						d: 1,
						H: 0,
						M: 0,
						S: 0,
						L: 0,
						Z: null
					},
					a = u(e, n, t, 0);
				if (a != t.length) return null;
				if ('p' in e) e.H = e.H % 12 + e.p * 12;
				var i = e.Z != null && g !== D,
					r = new (i ? D : g)();
				if ('j' in e) r.setFullYear(e.y, 0, e.j);
				else if ('W' in e || 'U' in e) {
					if (!('w' in e)) e.w = 'W' in e ? 1 : 0;
					r.setFullYear(e.y, 0, 1);
					r.setFullYear(e.y, 0, 'W' in e ? (e.w + 6) % 7 + e.W * 7 - (r.getDay() + 5) % 7 : e.w + e.U * 7 - (r.getDay() + 6) % 7)
				} else r.setFullYear(e.y, e.m, e.d);
				r.setHours(e.H + (e.Z / 100 | 0), e.M + e.Z % 100, e.S, e.L);
				return i ? r._ : r
			};
			t.toString = function () {
				return n
			};
			return t
		};

		function u(n, t, e, r) {
			var u, a, o, i = 0,
				l = t.length,
				f = e.length;
			while (i < l) {
				if (r >= f) return -1;
				u = t.charCodeAt(i++);
				if (u === 37) {
					o = t.charAt(i++);
					a = y[o in Rr ? t.charAt(i++) : o];
					if (!a || (r = a(n, e, r)) < 0) return -1
				} else if (u != e.charCodeAt(r++)) {
					return -1
				}
			}
			;
			return r
		};
		r.utc = function (n) {
			var t = r(n);

			function e(n) {
				try {
					g = D;
					var e = new g();
					e._ = n;
					return t(e)
				} finally {
					g = Date
				}
			};
			e.parse = function (n) {
				try {
					g = D;
					var e = t.parse(n);
					return e && e._
				} finally {
					g = Date
				}
			};
			e.toString = t.toString;
			return e
		};
		r.multi = r.utc.multi = so;
		var s = n.map(),
			c = yt(a),
			M = Mt(a),
			h = yt(o),
			x = Mt(o),
			p = yt(l),
			w = Mt(l),
			d = yt(f),
			b = Mt(f);
		m.forEach(function (n, t) {
			s.set(n.toLowerCase(), t)
		});
		var i = {
			a: function (n) {
				return o[n.getDay()]
			},
			A: function (n) {
				return a[n.getDay()]
			},
			b: function (n) {
				return f[n.getMonth()]
			},
			B: function (n) {
				return l[n.getMonth()]
			},
			c: r(S),
			d: function (n, t) {
				return v(n.getDate(), t, 2)
			},
			e: function (n, t) {
				return v(n.getDate(), t, 2)
			},
			H: function (n, t) {
				return v(n.getHours(), t, 2)
			},
			I: function (n, t) {
				return v(n.getHours() % 12 || 12, t, 2)
			},
			j: function (n, e) {
				return v(1 + t.dayOfYear(n), e, 3)
			},
			L: function (n, t) {
				return v(n.getMilliseconds(), t, 3)
			},
			m: function (n, t) {
				return v(n.getMonth() + 1, t, 2)
			},
			M: function (n, t) {
				return v(n.getMinutes(), t, 2)
			},
			p: function (n) {
				return m[+(n.getHours() >= 12)]
			},
			S: function (n, t) {
				return v(n.getSeconds(), t, 2)
			},
			U: function (n, e) {
				return v(t.sundayOfYear(n), e, 2)
			},
			w: function (n) {
				return n.getDay()
			},
			W: function (n, e) {
				return v(t.mondayOfYear(n), e, 2)
			},
			x: r(k),
			X: r(N),
			y: function (n, t) {
				return v(n.getFullYear() % 100, t, 2)
			},
			Y: function (n, t) {
				return v(n.getFullYear() % 1e4, t, 4)
			},
			Z: lo,
			'%': function () {
				return '%'
			}
		};
		var y = {
			a: E,
			A: A,
			b: C,
			B: z,
			c: L,
			d: Ai,
			e: Ai,
			H: Ci,
			I: Ci,
			j: io,
			L: oo,
			m: ro,
			M: uo,
			p: R,
			S: ao,
			U: Ga,
			w: Ja,
			W: Ka,
			x: q,
			X: T,
			y: no,
			Y: Qa,
			Z: to,
			'%': fo
		};

		function E(n, t, e) {
			h.lastIndex = 0;
			var r = h.exec(t.slice(e));
			return r ? (n.w = x.get(r[0].toLowerCase()), e + r[0].length) : -1
		};

		function A(n, t, e) {
			c.lastIndex = 0;
			var r = c.exec(t.slice(e));
			return r ? (n.w = M.get(r[0].toLowerCase()), e + r[0].length) : -1
		};

		function C(n, t, e) {
			d.lastIndex = 0;
			var r = d.exec(t.slice(e));
			return r ? (n.m = b.get(r[0].toLowerCase()), e + r[0].length) : -1
		};

		function z(n, t, e) {
			p.lastIndex = 0;
			var r = p.exec(t.slice(e));
			return r ? (n.m = w.get(r[0].toLowerCase()), e + r[0].length) : -1
		};

		function L(n, t, e) {
			return u(n, i.c.toString(), t, e)
		};

		function q(n, t, e) {
			return u(n, i.x.toString(), t, e)
		};

		function T(n, t, e) {
			return u(n, i.X.toString(), t, e)
		};

		function R(n, t, e) {
			var r = s.get(t.slice(e, e += 2).toLowerCase());
			return r == null ? -1 : (n.p = r, e)
		};
		return r
	};
	var Rr = {
			'-': '',
			_: ' ',
			'0': '0'
		},
		l = /^\s*\d+/,
		Dr = /^%/;

	function v(n, t, e) {
		var i = n < 0 ? '-' : '',
			r = (i ? -n : n) + '',
			u = r.length;
		return i + (u < e ? new Array(e - u + 1).join(t) + r : r)
	};

	function yt(t) {
		return new RegExp('^(?:' + t.map(n.requote).join('|') + ')', 'i')
	};

	function Mt(n) {
		var e = new T(),
			t = -1,
			r = n.length;
		while (++t < r) e.set(n[t].toLowerCase(), t);
		return e
	};

	function Ja(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 1));
		return r ? (n.w = +r[0], e + r[0].length) : -1
	};

	function Ga(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e));
		return r ? (n.U = +r[0], e + r[0].length) : -1
	};

	function Ka(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e));
		return r ? (n.W = +r[0], e + r[0].length) : -1
	};

	function Qa(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 4));
		return r ? (n.y = +r[0], e + r[0].length) : -1
	};

	function no(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 2));
		return r ? (n.y = eo(+r[0]), e + r[0].length) : -1
	};

	function to(n, t, e) {
		return /^[+-]\d{4}$/.test(t = t.slice(e, e + 5)) ? (n.Z = -t, e + 5) : -1
	};

	function eo(n) {
		return n + (n > 68 ? 1900 : 2e3)
	};

	function ro(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 2));
		return r ? (n.m = r[0] - 1, e + r[0].length) : -1
	};

	function Ai(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 2));
		return r ? (n.d = +r[0], e + r[0].length) : -1
	};

	function io(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 3));
		return r ? (n.j = +r[0], e + r[0].length) : -1
	};

	function Ci(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 2));
		return r ? (n.H = +r[0], e + r[0].length) : -1
	};

	function uo(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 2));
		return r ? (n.M = +r[0], e + r[0].length) : -1
	};

	function ao(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 2));
		return r ? (n.S = +r[0], e + r[0].length) : -1
	};

	function oo(n, t, e) {
		l.lastIndex = 0;
		var r = l.exec(t.slice(e, e + 3));
		return r ? (n.L = +r[0], e + r[0].length) : -1
	};

	function lo(n) {
		var t = n.getTimezoneOffset(),
			e = t > 0 ? '-' : '+',
			i = r(t) / 60 | 0,
			u = r(t) % 60;
		return e + v(i, '0', 2) + v(u, '0', 2)
	};

	function fo(n, t, e) {
		Dr.lastIndex = 0;
		var r = Dr.exec(t.slice(e, e + 1));
		return r ? e + r[0].length : -1
	};

	function so(n) {
		var e = n.length,
			t = -1;
		while (++t < e) n[t][0] = this(n[t][0]);
		return function (t) {
			var r = 0,
				e = n[r];
			while (!e[1](t)) e = n[++r];
			return e[0](t)
		}
	};
	n.locale = function (n) {
		return {
			numberFormat: Xa(n),
			timeFormat: Wa(n)
		}
	};
	var Tr = n.locale({
		decimal: '.',
		thousands: ',',
		grouping: [3],
		currency: ['$', ''],
		dateTime: '%a %b %e %X %Y',
		date: '%m/%d/%Y',
		time: '%H:%M:%S',
		periods: ['AM', 'PM'],
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	});
	n.format = Tr.numberFormat;
	n.geo = {};

	function Ce() {
	};
	Ce.prototype = {
		s: 0,
		t: 0,
		add: function (n) {
			zi(n, this.t, nt);
			zi(nt.s, this.s, this);
			if (this.s) this.t += nt.t;
			else this.s = nt.t
		},
		reset: function () {
			this.s = this.t = 0
		},
		valueOf: function () {
			return this.s
		}
	};
	var nt = new Ce();

	function zi(n, t, e) {
		var r = e.s = n + t,
			i = r - n,
			u = r - i;
		e.t = n - u + (t - i)
	};
	n.geo.stream = function (n, t) {
		if (n && qr.hasOwnProperty(n.type)) {
			qr[n.type](n, t)
		} else {
			xt(n, t)
		}
	};

	function xt(n, t) {
		if (n && Lr.hasOwnProperty(n.type)) {
			Lr[n.type](n, t)
		}
	};
	var qr = {
		Feature: function (n, t) {
			xt(n.geometry, t)
		},
		FeatureCollection: function (n, t) {
			var e = n.features,
				r = -1,
				i = e.length;
			while (++r < i) xt(e[r].geometry, t)
		}
	};
	var Lr = {
		Sphere: function (n, t) {
			t.sphere()
		},
		Point: function (n, t) {
			n = n.coordinates;
			t.point(n[0], n[1], n[2])
		},
		MultiPoint: function (n, t) {
			var e = n.coordinates,
				r = -1,
				i = e.length;
			while (++r < i) n = e[r], t.point(n[0], n[1], n[2])
		},
		LineString: function (n, t) {
			ze(n.coordinates, t, 0)
		},
		MultiLineString: function (n, t) {
			var e = n.coordinates,
				r = -1,
				i = e.length;
			while (++r < i) ze(e[r], t, 0)
		},
		Polygon: function (n, t) {
			Li(n.coordinates, t)
		},
		MultiPolygon: function (n, t) {
			var e = n.coordinates,
				r = -1,
				i = e.length;
			while (++r < i) Li(e[r], t)
		},
		GeometryCollection: function (n, t) {
			var e = n.geometries,
				r = -1,
				i = e.length;
			while (++r < i) xt(e[r], t)
		}
	};

	function ze(n, t, e) {
		var i = -1,
			u = n.length - e,
			r;
		t.lineStart();
		while (++i < u) r = n[i], t.point(r[0], r[1], r[2]);
		t.lineEnd()
	};

	function Li(n, t) {
		var e = -1,
			r = n.length;
		t.polygonStart();
		while (++e < r) ze(n[e], t, 1);
		t.polygonEnd()
	};
	n.geo.area = function (t) {
		Qn = 0;
		n.geo.stream(t, m);
		return Qn
	};
	var Qn, Q = new Ce(),
		m = {
			sphere: function () {
				Qn += 4 * π
			},
			point: s,
			lineStart: s,
			lineEnd: s,
			polygonStart: function () {
				Q.reset();
				m.lineStart = co
			},
			polygonEnd: function () {
				var n = 2 * Q;
				Qn += n < 0 ? 4 * π + n : n;
				m.lineStart = m.lineEnd = m.point = s
			}
		};

	function co() {
		var λ00, φ00, λ0, tφ0, rφ0;
		m.point = function (λ, φ) {
			m.point = n;
			λ0 = (λ00 = λ) * e, tφ0 = Math.cos(φ = (φ00 = φ) * e / 2 + π / 4), rφ0 = Math.sin(φ)
		};

		function n(λ, φ) {
			λ *= e;
			φ = φ * e / 2 + π / 4;
			var uλ = λ - λ0,
				aλ = uλ >= 0 ? 1 : -1,
				oλ = aλ * uλ,
				rφ = Math.cos(φ),
				iφ = Math.sin(φ),
				l = iφ0 * iφ,
				f = rφ0 * rφ + l * Math.cos(oλ),
				s = l * aλ * Math.sin(oλ);
			Q.add(Math.atan2(s, f));
			λ0 = λ, rφ0 = rφ, iφ0 = iφ
		};
		m.lineEnd = function () {
			n(λ00, φ00)
		}
	};

	function un(n) {
		var λ = n[0],
			φ = n[1],
			tφ = Math.cos(φ);
		return [tφ * Math.cos(λ), tφ * Math.sin(λ), Math.sin(φ)]
	};

	function wt(n, t) {
		return n[0] * t[0] + n[1] * t[1] + n[2] * t[2]
	};

	function dn(n, t) {
		return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]
	};

	function Le(n, t) {
		n[0] += t[0];
		n[1] += t[1];
		n[2] += t[2]
	};

	function bt(n, t) {
		return [n[0] * t, n[1] * t, n[2] * t]
	};

	function St(n) {
		var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
		n[0] /= t;
		n[1] /= t;
		n[2] /= t
	};

	function kt(n) {
		return [Math.atan2(n[1], n[0]), X(n[2])]
	};

	function Nt(n, t) {
		return r(n[0] - t[0]) < ε && r(n[1] - t[1]) < ε
	};
	n.geo.bounds = function () {
		var λ0, φ0, λ1, φ1, λ_, λ__, φ__, f, sλSum, l, a, u = {
			point: c,
			lineStart: g,
			lineEnd: p,
			polygonStart: function () {
				u.point = v;
				u.lineStart = y;
				u.lineEnd = M;
				sλSum = 0;
				m.polygonStart()
			},
			polygonEnd: function () {
				m.polygonEnd();
				u.point = c;
				u.lineStart = g;
				u.lineEnd = p;
				if (Q < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90);
				else if (sλSum > ε) φ1 = 90;
				else if (sλSum < -ε) φ0 = -90;
				a[0] = λ0, a[1] = λ1
			}
		};

		function c(λ, φ) {
			l.push(a = [λ0 = λ, λ1 = λ]);
			if (φ < φ0) φ0 = φ;
			if (φ > φ1) φ1 = φ
		};

		function h(λ, φ) {
			var p = un([λ * e, φ * e]);
			if (f) {
				var h = dn(f, p),
					v = [h[1], -h[0], 0],
					a = dn(v, h);
				St(a);
				a = kt(a);
				var gλ = λ - λ_,
					l = gλ > 0 ? 1 : -1,
					λi = a[0] * o * l,
					s = r(gλ) > 180;
				if (s ^ (l * λ_ < λi && λi < l * λ)) {
					var φi = a[1] * o;
					if (φi > φ1) φ1 = φi
				} else if (λi = (λi + 360) % 360 - 180, s ^ (l * λ_ < λi && λi < l * λ)) {
					var φi = -a[1] * o;
					if (φi < φ0) φ0 = φi
				} else {
					if (φ < φ0) φ0 = φ;
					if (φ > φ1) φ1 = φ
				}
				;
				if (s) {
					if (λ < λ_) {
						if (t(λ0, λ) > t(λ0, λ1)) λ1 = λ
					} else {
						if (t(λ, λ1) > t(λ0, λ1)) λ0 = λ
					}
				} else {
					if (λ1 >= λ0) {
						if (λ < λ0) λ0 = λ;
						if (λ > λ1) λ1 = λ
					} else {
						if (λ > λ_) {
							if (t(λ0, λ) > t(λ0, λ1)) λ1 = λ
						} else {
							if (t(λ, λ1) > t(λ0, λ1)) λ0 = λ
						}
					}
				}
			} else {
				c(λ, φ)
			}
			;
			f = p, λ_ = λ
		};

		function g() {
			u.point = h
		};

		function p() {
			a[0] = λ0, a[1] = λ1;
			u.point = c;
			f = null
		};

		function v(λ, φ) {
			if (f) {
				var eλ = λ - λ_;
				eλSum += r(eλ) > 180 ? eλ + (eλ > 0 ? 360 : -360) : eλ
			} else λ__ = λ, φ__ = φ;
			m.point(λ, φ);
			h(λ, φ)
		};

		function y() {
			m.lineStart()
		};

		function M() {
			v(λ__, φ__);
			m.lineEnd();
			if (r(sλSum) > ε) λ0 = -(λ1 = 180);
			a[0] = λ0, a[1] = λ1;
			f = null
		};

		function t(λ0, λ1) {
			return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1
		};

		function x(n, t) {
			return n[0] - t[0]
		};

		function d(n, t) {
			return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
		};
		return function (e) {
			φ1 = λ1 = -(λ0 = φ0 = Infinity);
			l = [];
			n.geo.stream(e, u);
			var f = l.length;
			if (f) {
				l.sort(x);
				for (var o = 1, r = l[0], i, s = [r]; o < f; ++o) {
					i = l[o];
					if (d(i[0], r) || d(i[1], r)) {
						if (t(r[0], i[1]) > t(r[0], r[1])) r[1] = i[1];
						if (t(i[0], r[1]) > t(r[0], r[1])) r[0] = i[0]
					} else {
						s.push(r = i)
					}
				}
				;
				var c = -Infinity,
					hλ;
				for (var f = s.length - 1, o = 0, r = s[f], i; o <= f; r = i, ++o) {
					i = s[o];
					if ((hλ = t(r[1], i[0])) > c) c = hλ, λ0 = i[0], λ1 = r[1]
				}
			}
			;
			l = a = null;
			return λ0 === Infinity || φ0 === Infinity ? [
				[NaN, NaN],
				[NaN, NaN]
			] : [
				[λ0, φ0],
				[λ1, φ1]
			]
		}
	}();
	n.geo.centroid = function (t) {
		kn = Kn = G = K = C = F = H = k = hn = gn = O = 0;
		n.geo.stream(t, x);
		var e = hn,
			r = gn,
			i = O,
			u = e * e + r * r + i * i;
		if (u < ε2) {
			e = F, r = H, i = k;
			if (Kn < ε) e = G, r = K, i = C;
			u = e * e + r * r + i * i;
			if (u < ε2) return [NaN, NaN]
		}
		;
		return [Math.atan2(r, e) * o, X(i / Math.sqrt(u)) * o]
	};
	var kn, Kn, G, K, C, F, H, k, hn, gn, O, x = {
		sphere: s,
		point: qe,
		lineStart: qi,
		lineEnd: Ti,
		polygonStart: function () {
			x.lineStart = ho
		},
		polygonEnd: function () {
			x.lineStart = qi
		}
	};

	function qe(λ, φ) {
		λ *= e;
		var rφ = Math.cos(φ *= e);
		En(rφ * Math.cos(λ), rφ * Math.sin(λ), Math.sin(φ))
	};

	function En(n, t, e) {
		++kn;
		G += (n - G) / kn;
		K += (t - K) / kn;
		C += (e - C) / kn
	};

	function qi() {
		var n, t, r;
		x.point = function (λ, φ) {
			λ *= e;
			var oφ = Math.cos(φ *= e);
			n = oφ * Math.cos(λ);
			t = oφ * Math.sin(λ);
			r = Math.sin(φ);
			x.point = i;
			En(n, t, r)
		};

		function i(λ, φ) {
			λ *= e;
			var sφ = Math.cos(φ *= e),
				o = sφ * Math.cos(λ),
				l = sφ * Math.sin(λ),
				f = Math.sin(φ),
				a = Math.atan2(Math.sqrt((a = t * f - r * l) * a + (a = r * o - n * f) * a + (a = n * l - t * o) * a), n * o + t * l + r * f);
			Kn += a;
			F += a * (n + (n = o));
			H += a * (t + (t = l));
			k += a * (r + (r = f));
			En(n, t, r)
		}
	};

	function Ti() {
		x.point = qe
	};

	function ho() {
		var λ00, φ00, n, t, r;
		x.point = function (λ, φ) {
			λ00 = λ, φ00 = φ;
			x.point = i;
			λ *= e;
			var oφ = Math.cos(φ *= e);
			n = oφ * Math.cos(λ);
			t = oφ * Math.sin(λ);
			r = Math.sin(φ);
			En(n, t, r)
		};
		x.lineEnd = function () {
			i(λ00, φ00);
			x.lineEnd = Ti;
			x.point = qe
		};

		function i(λ, φ) {
			λ *= e;
			var vφ = Math.cos(φ *= e),
				a = vφ * Math.cos(λ),
				o = vφ * Math.sin(λ),
				l = Math.sin(φ),
				s = t * l - r * o,
				c = r * a - n * l,
				h = n * o - t * a,
				g = Math.sqrt(s * s + c * c + h * h),
				d = n * a + t * o + r * l,
				p = g && -di(d) / g,
				f = Math.atan2(g, d);
			hn += p * s;
			gn += p * c;
			O += p * h;
			Kn += f;
			F += f * (n + (n = a));
			H += f * (t + (t = o));
			k += f * (r + (r = l));
			En(n, t, r)
		}
	};

	function Ri(n, t) {
		function e(e, r) {
			return e = n(e, r), t(e[0], e[1])
		};
		if (n.invert && t.invert) e.invert = function (e, r) {
			return e = t.invert(e, r), e && n.invert(e[0], e[1])
		};
		return e
	};

	function An() {
		return !0
	};

	function Di(n, t, e, r, u) {
		var f = [],
			l = [];
		n.forEach(function (n) {
			if ((a = n.length - 1) <= 0) return;
			var a, r = n[0],
				o = n[a];
			if (Nt(r, o)) {
				u.lineStart();
				for (var i = 0; i < a; ++i) u.point((r = n[i])[0], r[1]);
				u.lineEnd();
				return
			}
			;
			var t = new Et(r, n, null, !0),
				e = new Et(r, null, t, !1);
			t.o = e;
			f.push(t);
			l.push(e);
			t = new Et(o, n, null, !1);
			e = new Et(o, null, t, !0);
			t.o = e;
			f.push(t);
			l.push(e)
		});
		l.sort(t);
		Ii(f);
		Ii(l);
		if (!f.length) return;
		for (var a = 0, p = e, h = l.length; a < h; ++a) {
			l[a].e = p = !p
		}
		;
		var g = f[0],
			o, c;
		while (1) {
			var i = g,
				s = !0;
			while (i.v)
				if ((i = i.n) === g) return;
			o = i.z;
			u.lineStart();
			do {
				i.v = i.o.v = !0;
				if (i.e) {
					if (s) {
						for (var a = 0, h = o.length; a < h; ++a) u.point((c = o[a])[0], c[1])
					} else {
						r(i.x, i.n.x, 1, u)
					}
					;
					i = i.n
				} else {
					if (s) {
						o = i.p.z;
						for (var a = o.length - 1; a >= 0; --a) u.point((c = o[a])[0], c[1])
					} else {
						r(i.x, i.p.x, -1, u)
					}
					;
					i = i.p
				}
				;
				i = i.o;
				o = i.z;
				s = !s
			}
			while (!i.v);
			u.lineEnd()
		}
	};

	function Ii(n) {
		if (!(r = n.length)) return;
		var r, i = 0,
			t = n[0],
			e;
		while (++i < r) {
			t.n = e = n[i];
			e.p = t;
			t = e
		}
		;
		t.n = e = n[0];
		e.p = t
	};

	function Et(n, t, e, r) {
		this.x = n;
		this.z = t;
		this.o = e;
		this.e = r;
		this.v = !1;
		this.n = this.p = null
	};

	function Pi(t, e, r, i) {
		return function (u, a) {
			var g = e(a),
				M = u.invert(i[0], i[1]),
				o = {
					point: p,
					lineStart: d,
					lineEnd: m,
					polygonStart: function () {
						o.point = y;
						o.lineStart = w;
						o.lineEnd = b;
						f = [];
						h = []
					},
					polygonEnd: function () {
						o.point = p;
						o.lineStart = d;
						o.lineEnd = m;
						f = n.merge(f);
						var t = Mo(M, h);
						if (f.length) {
							if (!l) a.polygonStart(), l = !0;
							Di(f, po, t, r, a)
						} else if (t) {
							if (!l) a.polygonStart(), l = !0;
							a.lineStart();
							r(null, null, 1, a);
							a.lineEnd()
						}
						;
						if (l) a.polygonEnd(), l = !1;
						f = h = null
					},
					sphere: function () {
						a.polygonStart();
						a.lineStart();
						r(null, null, 1, a);
						a.lineEnd();
						a.polygonEnd()
					}
				};

			function p(λ, φ) {
				var r = u(λ, φ);
				if (t(λ = r[0], φ = r[1])) a.point(λ, φ)
			};

			function x(λ, φ) {
				var e = u(λ, φ);
				g.point(e[0], e[1])
			};

			function d() {
				o.point = x;
				g.lineStart()
			};

			function m() {
				o.point = p;
				g.lineEnd()
			};
			var f, v = Ui(),
				c = e(v),
				l = !1,
				h, s;

			function y(λ, φ) {
				s.push([λ, φ]);
				var e = u(λ, φ);
				c.point(e[0], e[1])
			};

			function w() {
				c.lineStart();
				s = []
			};

			function b() {
				y(s[0][0], s[0][1]);
				c.lineEnd();
				var u = c.clean(),
					n = v.buffer(),
					e, t = n.length;
				s.pop();
				h.push(s);
				s = null;
				if (!t) return;
				if (u & 1) {
					e = n[0];
					var t = e.length - 1,
						r = -1,
						i;
					if (t > 0) {
						if (!l) a.polygonStart(), l = !0;
						a.lineStart();
						while (++r < t) a.point((i = e[r])[0], i[1]);
						a.lineEnd()
					}
					;
					return
				}
				;
				if (t > 1 && u & 2) n.push(n.pop().concat(n.shift()));
				f.push(n.filter(go))
			};
			return o
		}
	};

	function go(n) {
		return n.length > 1
	};

	function Ui() {
		var n = [],
			t;
		return {
			lineStart: function () {
				n.push(t = [])
			},
			point: function (λ, φ) {
				t.push([λ, φ])
			},
			lineEnd: s,
			buffer: function () {
				var e = n;
				n = [];
				t = null;
				return e
			},
			rejoin: function () {
				if (n.length > 1) n.push(n.pop().concat(n.shift()))
			}
		}
	};

	function po(n, t) {
		return ((n = n.x)[0] < 0 ? n[1] - fπ - ε : fπ - n[1]) - ((t = t.x)[0] < 0 ? t[1] - fπ - ε : fπ - t[1])
	};
	var zr = Pi(An, vo, yo, [-π, -π / 2]);

	function vo(n) {
		var λ0 = NaN,
			φ0 = NaN,
			eλ0 = NaN,
			t;
		return {
			lineStart: function () {
				n.lineStart();
				t = 1
			},
			point: function (λ1, φ1) {
				var uλ1 = λ1 > 0 ? π : -π,
					aλ = r(λ1 - λ0);
				if (r(aλ - π) < ε) {
					n.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? fπ : -fπ);
					n.point(uλ0, φ0);
					n.lineEnd();
					n.lineStart();
					n.point(uλ1, φ0);
					n.point(λ1, φ0);
					t = 0
				} else if (uλ0 !== uλ1 && aλ >= π) {
					if (r(λ0 - uλ0) < ε) λ0 -= uλ0 * ε;
					if (r(λ1 - uλ1) < ε) λ1 -= uλ1 * ε;
					φ0 = mo(λ0, φ0, λ1, φ1);
					n.point(uλ0, φ0);
					n.lineEnd();
					n.lineStart();
					n.point(uλ1, φ0);
					t = 0
				}
				;
				n.point(λ0 = λ1, φ0 = φ1);
				uλ0 = uλ1
			},
			lineEnd: function () {
				n.lineEnd();
				λ0 = φ0 = NaN
			},
			clean: function () {
				return 2 - t
			}
		}
	};

	function mo(λ0, φ0, λ1, φ1) {
		var uφ0, uφ1, aλ0_λ1 = Math.sin(λ0 - λ1);
		return r(aλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (uφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (uφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (uφ0 * uφ1 * aλ0_λ1)) : (φ0 + φ1) / 2
	};

	function yo(n, t, e, i) {
		var φ;
		if (n == null) {
			φ = e * fπ;
			i.point(-π, φ);
			i.point(0, φ);
			i.point(π, φ);
			i.point(π, 0);
			i.point(π, -φ);
			i.point(0, -φ);
			i.point(-π, -φ);
			i.point(-π, 0);
			i.point(-π, φ)
		} else if (r(n[0] - t[0]) > ε) {
			var u = n[0] < t[0] ? π : -π;
			φ = e * u / 2;
			i.point(-u, φ);
			i.point(0, φ);
			i.point(u, φ)
		} else {
			i.point(t[0], t[1])
		}
	};

	function Mo(n, t) {
		var f = n[0],
			y = n[1],
			w = [Math.sin(f), -Math.cos(f), 0],
			p = 0,
			M = 0;
		Q.reset();
		for (var g = 0, x = t.length; g < x; ++g) {
			var h = t[g],
				m = h.length;
			if (!m) continue;
			var o = h[0],
				λ0 = o[0],
				φ0 = o[1] / 2 + π / 4,
				iφ0 = Math.sin(φ0),
				uφ0 = Math.cos(φ0),
				l = 1;
			while (!0) {
				if (l === m) l = 0;
				n = h[l];
				var λ = n[0],
					φ = n[1] / 2 + π / 4,
					iφ = Math.sin(φ),
					uφ = Math.cos(φ),
					rλ = λ - λ0,
					sλ = rλ >= 0 ? 1 : -1,
					cλ = sλ * rλ,
					a = cλ > π,
					d = iφ0 * iφ;
				Q.add(Math.atan2(d * sλ * Math.sin(cλ), uφ0 * uφ + d * Math.cos(cλ)));
				p += a ? rλ + sλ * τ : rλ;
				if (a ^ λ0 >= f ^ λ >= f) {
					var e = dn(un(o), un(n));
					St(e);
					var v = dn(w, e);
					St(v);
					var φe = (a ^ rλ >= 0 ? -1 : 1) * X(v[2]);
					if (y > φe || y === φe && (e[0] || e[1])) {
						M += a ^ rλ >= 0 ? 1 : -1
					}
				}
				;
				if (!l++) break;
				λ0 = λ, iφ0 = iφ, uφ0 = uφ, o = n
			}
		}
		;
		return (p < -ε || p < ε && Q < -ε) ^ M & 1
	};

	function xo(n) {
		var t = Math.cos(n),
			i = t > 0,
			l = r(t) > ε,
			f = De(n, 6 * e);
		return Pi(a, s, f, i ? [0, -n] : [-π, n - π]);

		function a(λ, φ) {
			return Math.cos(λ) * Math.cos(φ) > t
		};

		function s(n) {
			var t, s, e, f, r;
			return {
				lineStart: function () {
					f = e = !1;
					r = 1
				},
				point: function (λ, φ) {
					var g = [λ, φ],
						p, v = a(λ, φ),
						m = i ? v ? 0 : o(λ, φ) : v ? o(λ + (λ < 0 ? π : -π), φ) : 0;
					if (!t && (f = e = v)) n.lineStart();
					if (v !== e) {
						p = u(t, g);
						if (Nt(t, p) || Nt(g, p)) {
							g[0] += ε;
							g[1] += ε;
							v = a(g[0], g[1])
						}
					}
					;
					if (v !== e) {
						r = 0;
						if (v) {
							n.lineStart();
							p = u(g, t);
							n.point(p[0], p[1])
						} else {
							p = u(t, g);
							n.point(p[0], p[1]);
							n.lineEnd()
						}
						;
						t = p
					} else if (l && t && i ^ v) {
						var d;
						if (!(m & s) && (d = u(g, t, !0))) {
							r = 0;
							if (i) {
								n.lineStart();
								n.point(d[0][0], d[0][1]);
								n.point(d[1][0], d[1][1]);
								n.lineEnd()
							} else {
								n.point(d[1][0], d[1][1]);
								n.lineEnd();
								n.lineStart();
								n.point(d[0][0], d[0][1])
							}
						}
					}
					;
					if (v && (!t || !Nt(t, g))) {
						n.point(g[0], g[1])
					}
					;
					t = g, e = v, s = m
				},
				lineEnd: function () {
					if (e) n.lineEnd();
					t = null
				},
				clean: function () {
					return r | (f && e) << 1
				}
			}
		};

		function u(n, e, i) {
			var N = un(n),
				E = un(e),
				y = [1, 0, 0],
				l = dn(N, E),
				M = wt(l, l),
				g = l[0],
				p = M - g * g;
			if (!p) return !i && n;
			var w = t * M / p,
				b = -t * g / p,
				S = dn(y, l),
				a = bt(y, w),
				k = bt(l, b);
			Le(a, k);
			var o = S,
				s = wt(a, o),
				h = wt(o, o),
				m = s * s - h * (wt(a, a) - 1);
			if (m < 0) return;
			var d = Math.sqrt(m),
				u = bt(o, (-s - d) / h);
			Le(u, a);
			u = kt(u);
			if (!i) return u;
			var λ0 = n[0],
				λ1 = e[0],
				φ0 = n[1],
				φ1 = e[1],
				f;
			if (λ1 < λ0) f = λ0, λ0 = λ1, λ1 = f;
			var δλ = λ1 - λ0,
				c = r(δλ - π) < ε,
				x = c || δλ < ε;
			if (!c && φ1 < φ0) f = φ0, φ0 = φ1, φ1 = f;
			if (x ? c ? φ0 + φ1 > 0 ^ u[1] < (r(u[0] - λ0) < ε ? φ0 : φ1) : φ0 <= u[1] && u[1] <= φ1 : δλ > π ^ (λ0 <= u[0] && u[0] <= λ1)) {
				var v = bt(o, (-s + d) / h);
				Le(v, a);
				return [u, kt(v)]
			}
		};

		function o(λ, φ) {
			var u = i ? n : π - n,
				r = 0;
			if (λ < -u) r |= 1;
			else if (λ > u) r |= 2;
			if (φ < -u) r |= 4;
			else if (φ > u) r |= 8;
			return r
		}
	};

	function ji(n, t, e, r) {
		return function (i) {
			var h = i.a,
				g = i.b,
				s = h.x,
				c = h.y,
				p = g.x,
				v = g.y,
				a = 0,
				o = 1,
				l = p - s,
				f = v - c,
				u;
			u = n - s;
			if (!l && u > 0) return;
			u /= l;
			if (l < 0) {
				if (u < a) return;
				if (u < o) o = u
			} else if (l > 0) {
				if (u > o) return;
				if (u > a) a = u
			}
			;
			u = e - s;
			if (!l && u < 0) return;
			u /= l;
			if (l < 0) {
				if (u > o) return;
				if (u > a) a = u
			} else if (l > 0) {
				if (u < a) return;
				if (u < o) o = u
			}
			;
			u = t - c;
			if (!f && u > 0) return;
			u /= f;
			if (f < 0) {
				if (u < a) return;
				if (u < o) o = u
			} else if (f > 0) {
				if (u > o) return;
				if (u > a) a = u
			}
			;
			u = r - c;
			if (!f && u < 0) return;
			u /= f;
			if (f < 0) {
				if (u > o) return;
				if (u > a) a = u
			} else if (f > 0) {
				if (u < a) return;
				if (u < o) o = u
			}
			;
			if (a > 0) i.a = {
				x: s + a * l,
				y: c + a * f
			};
			if (o < 1) i.b = {
				x: s + o * l,
				y: c + o * f
			};
			return i
		}
	};
	var Gn = 1e9;
	n.geo.clipExtent = function () {
		var t, e, r, i, n, u, a = {
			stream: function (t) {
				if (n) n.valid = !1;
				n = u(t);
				n.valid = !0;
				return n
			},
			extent: function (o) {
				if (!arguments.length) return [
					[t, e],
					[r, i]
				];
				u = Fi(t = +o[0][0], e = +o[0][1], r = +o[1][0], i = +o[1][1]);
				if (n) n.valid = !1, n = null;
				return a
			}
		};
		return a.extent([
			[0, 0],
			[960, 500]
		])
	};

	function Fi(t, e, i, u) {
		return function (r) {
			var E = r,
				d = Ui(),
				A = ji(t, e, i, u),
				f, s, m, y = {
					point: k,
					lineStart: z,
					lineEnd: L,
					polygonStart: function () {
						r = d;
						f = [];
						s = [];
						h = !0
					},
					polygonEnd: function () {
						r = E;
						f = n.merge(f);
						var e = C([t, u]),
							i = h && e,
							a = f.length;
						if (i || a) {
							r.polygonStart();
							if (i) {
								r.lineStart();
								b(null, null, 1, r);
								r.lineEnd()
							}
							;
							if (a) {
								Di(f, l, e, b, r)
							}
							;
							r.polygonEnd()
						}
						;
						f = s = m = null
					}
				};

			function C(n) {
				var a = 0,
					f = s.length,
					o = n[1];
				for (var u = 0; u < f; ++u) {
					for (var r = 1, i = s[u], l = i.length, e = i[0], t; r < l; ++r) {
						t = i[r];
						if (e[1] <= o) {
							if (t[1] > o && me(e, t, n) > 0) ++a
						} else {
							if (t[1] <= o && me(e, t, n) < 0) --a
						}
						;
						e = t
					}
				}
				;
				return a !== 0
			};

			function b(n, r, l, f) {
				var s = 0,
					c = 0;
				if (n == null || (s = a(n, l)) !== (c = a(r, l)) || o(n, r) < 0 ^ l > 0) {
					do {
						f.point(s === 0 || s === 3 ? t : i, s > 1 ? u : e)
					}
					while ((s = (s + l + 4) % 4) !== c);
				} else {
					f.point(r[0], r[1])
				}
			};

			function S(n, r) {
				return t <= n && n <= i && e <= r && r <= u
			};

			function k(n, t) {
				if (S(n, t)) r.point(n, t)
			};
			var M, x, w, g, p, c, v, h;

			function z() {
				y.point = N;
				if (s) s.push(m = []);
				v = !0;
				c = !1;
				g = p = NaN
			};

			function L() {
				if (f) {
					N(M, x);
					if (w && c) d.rejoin();
					f.push(d.buffer())
				}
				;
				y.point = k;
				if (c) r.lineEnd()
			};

			function N(n, t) {
				n = Math.max(-Gn, Math.min(Gn, n));
				t = Math.max(-Gn, Math.min(Gn, t));
				var e = S(n, t);
				if (s) m.push([n, t]);
				if (v) {
					M = n, x = t, w = e;
					v = !1;
					if (e) {
						r.lineStart();
						r.point(n, t)
					}
				} else {
					if (e && c) r.point(n, t);
					else {
						var i = {
							a: {
								x: g,
								y: p
							},
							b: {
								x: n,
								y: t
							}
						};
						if (A(i)) {
							if (!c) {
								r.lineStart();
								r.point(i.a.x, i.a.y)
							}
							;
							r.point(i.b.x, i.b.y);
							if (!e) r.lineEnd();
							h = !1
						} else if (e) {
							r.lineStart();
							r.point(n, t);
							h = !1
						}
					}
				}
				;
				g = n, p = t, c = e
			};
			return y
		};

		function a(n, u) {
			return r(n[0] - t) < ε ? u > 0 ? 0 : 3 : r(n[0] - i) < ε ? u > 0 ? 2 : 1 : r(n[1] - e) < ε ? u > 0 ? 1 : 0 : u > 0 ? 3 : 2
		};

		function l(n, t) {
			return o(n.x, t.x)
		};

		function o(n, t) {
			var e = a(n, 1),
				r = a(t, 1);
			return e !== r ? e - r : e === 0 ? t[1] - n[1] : e === 1 ? n[0] - t[0] : e === 2 ? n[1] - t[1] : t[0] - n[0]
		}
	};

	function Te(n) {
		var φ0 = 0,
			φ1 = π / 3,
			t = Re(n),
			e = t(φ0, φ1);
		e.parallels = function (n) {
			if (!arguments.length) return [φ0 / π * 180, φ1 / π * 180];
			return t(φ0 = n[0] * π / 180, φ1 = n[1] * π / 180)
		};
		return e
	};

	function Hi(φ0, φ1) {
		var rφ0 = Math.sin(φ0),
			e = (rφ0 + Math.sin(φ1)) / 2,
			i = 1 + rφ0 * (2 * e - rφ0),
			ρ0 = Math.sqrt(i) / e;

		function u(λ, φ) {
			var ρ = Math.sqrt(i - 2 * e * Math.sin(φ)) / e;
			return [ρ * Math.sin(λ *= e), ρ0 - ρ * Math.cos(λ)]
		};
		u.invert = function (n, t) {
			var ρ0_y = ρ0 - t;
			return [Math.atan2(n, ρ0_y) / e, X((i - (n * n + ρ0_y * ρ0_y) * e * e) / (2 * e))]
		};
		return u
	}

	(n.geo.conicEqualArea = function () {
		return Te(Hi)
	}).raw = Hi;
	n.geo.albers = function () {
		return n.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
	};
	n.geo.albersUsa = function () {
		var t = n.geo.albers(),
			r = n.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
			i = n.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
			u, a = {
				point: function (n, t) {
					u = [n, t]
				}
			},
			o, l, f;

		function e(n) {
			var t = n[0],
				e = n[1];
			u = null;
			(o(t, e), u) || (l(t, e), u) || f(t, e);
			return u
		};
		e.invert = function (n) {
			var a = t.scale(),
				o = t.translate(),
				e = (n[0] - o[0]) / a,
				u = (n[1] - o[1]) / a;
			return (u >= .12 && u < .234 && e >= -.425 && e < -.214 ? r : u >= .166 && u < .234 && e >= -.214 && e < -.115 ? i : t).invert(n)
		};
		e.stream = function (n) {
			var e = t.stream(n),
				u = r.stream(n),
				a = i.stream(n);
			return {
				point: function (n, t) {
					e.point(n, t);
					u.point(n, t);
					a.point(n, t)
				},
				sphere: function () {
					e.sphere();
					u.sphere();
					a.sphere()
				},
				lineStart: function () {
					e.lineStart();
					u.lineStart();
					a.lineStart()
				},
				lineEnd: function () {
					e.lineEnd();
					u.lineEnd();
					a.lineEnd()
				},
				polygonStart: function () {
					e.polygonStart();
					u.polygonStart();
					a.polygonStart()
				},
				polygonEnd: function () {
					e.polygonEnd();
					u.polygonEnd();
					a.polygonEnd()
				}
			}
		};
		e.precision = function (n) {
			if (!arguments.length) return t.precision();
			t.precision(n);
			r.precision(n);
			i.precision(n);
			return e
		};
		e.scale = function (n) {
			if (!arguments.length) return t.scale();
			t.scale(n);
			r.scale(n * .35);
			i.scale(n);
			return e.translate(t.translate())
		};
		e.translate = function (n) {
			if (!arguments.length) return t.translate();
			var u = t.scale(),
				s = +n[0],
				c = +n[1];
			o = t.translate(n).clipExtent([
				[s - .455 * u, c - .238 * u],
				[s + .455 * u, c + .238 * u]
			]).stream(a).point;
			l = r.translate([s - .307 * u, c + .201 * u]).clipExtent([
				[s - .425 * u + ε, c + .12 * u + ε],
				[s - .214 * u - ε, c + .234 * u - ε]
			]).stream(a).point;
			f = i.translate([s - .205 * u, c + .212 * u]).clipExtent([
				[s - .214 * u + ε, c + .166 * u + ε],
				[s - .115 * u - ε, c + .234 * u - ε]
			]).stream(a).point;
			return e
		};
		return e.scale(1070)
	};
	var Jt, Gt, j = {
		point: s,
		lineStart: s,
		lineEnd: s,
		polygonStart: function () {
			Gt = 0;
			j.lineStart = wo
		},
		polygonEnd: function () {
			j.lineStart = j.lineEnd = j.point = s;
			Jt += r(Gt / 2)
		}
	};

	function wo() {
		var e, r, n, t;
		j.point = function (u, a) {
			j.point = i;
			e = n = u, r = t = a
		};

		function i(e, r) {
			Gt += t * e - n * r;
			n = e, t = r
		};
		j.lineEnd = function () {
			i(e, r)
		}
	};
	var Xn, Bn, Wn, Jn, ba = {
		point: bo,
		lineStart: s,
		lineEnd: s,
		polygonStart: s,
		polygonEnd: s
	};

	function bo(n, t) {
		if (n < Xn) Xn = n;
		if (n > Wn) Wn = n;
		if (t < Bn) Bn = t;
		if (t > Jn) Jn = t
	};

	function So() {
		var r = Oi(4.5),
			t = [],
			n = {
				point: e,
				lineStart: function () {
					n.point = u
				},
				lineEnd: i,
				polygonStart: function () {
					n.lineEnd = o
				},
				polygonEnd: function () {
					n.lineEnd = i;
					n.point = e
				},
				pointRadius: function (t) {
					r = Oi(t);
					return n
				},
				result: function () {
					if (t.length) {
						var n = t.join('');
						t = [];
						return n
					}
				}
			};

		function e(n, e) {
			t.push('M', n, ',', e, r)
		};

		function u(e, r) {
			t.push('M', e, ',', r);
			n.point = a
		};

		function a(n, e) {
			t.push('L', n, ',', e)
		};

		function i() {
			n.point = e
		};

		function o() {
			t.push('Z')
		};
		return n
	};

	function Oi(n) {
		return 'm0,' + n + 'a' + n + ',' + n + ' 0 1,1 0,' + -2 * n + 'a' + n + ',' + n + ' 0 1,1 0,' + 2 * n + 'z'
	};
	var M = {
		point: an,
		lineStart: Yi,
		lineEnd: Zi,
		polygonStart: function () {
			M.lineStart = ko
		},
		polygonEnd: function () {
			M.point = an;
			M.lineStart = Yi;
			M.lineEnd = Zi
		}
	};

	function an(n, t) {
		G += n;
		K += t;
		++C
	};

	function Yi() {
		var n, t;
		M.point = function (r, i) {
			M.point = e;
			an(n = r, t = i)
		};

		function e(e, r) {
			var u = e - n,
				a = r - t,
				i = Math.sqrt(u * u + a * a);
			F += i * (n + e) / 2;
			H += i * (t + r) / 2;
			k += i;
			an(n = e, t = r)
		}
	};

	function Zi() {
		M.point = an
	};

	function ko() {
		var e, r, n, t;
		M.point = function (u, a) {
			M.point = i;
			an(e = n = u, r = t = a)
		};

		function i(e, r) {
			var u = e - n,
				a = r - t,
				i = Math.sqrt(u * u + a * a);
			F += i * (n + e) / 2;
			H += i * (t + r) / 2;
			k += i;
			i = t * e - n * r;
			hn += i * (n + e);
			gn += i * (t + r);
			O += i * 3;
			an(n = e, t = r)
		};
		M.lineEnd = function () {
			i(e, r)
		}
	};

	function No(n) {
		var e = 4.5,
			t = {
				point: r,
				lineStart: function () {
					t.point = u
				},
				lineEnd: i,
				polygonStart: function () {
					t.lineEnd = o
				},
				polygonEnd: function () {
					t.lineEnd = i;
					t.point = r
				},
				pointRadius: function (n) {
					e = n;
					return t
				},
				result: s
			};

		function r(t, r) {
			n.moveTo(t + e, r);
			n.arc(t, r, e, 0, τ)
		};

		function u(e, r) {
			n.moveTo(e, r);
			t.point = a
		};

		function a(t, e) {
			n.lineTo(t, e)
		};

		function i() {
			t.point = r
		};

		function o() {
			n.closePath()
		};
		return t
	};

	function Vi(n) {
		var δ2 = .5,
			a = Math.cos(30 * e),
			t = 16;

		function u(n) {
			return (t ? l : o)(n)
		};

		function o(t) {
			return Bi(t, function (e, r) {
				e = n(e, r);
				t.point(e[0], e[1])
			})
		};

		function l(e) {
			var λ00, φ00, g, p, v, d, m, λ0, u, a, o, l, f, r = {
				point: y,
				lineStart: s,
				lineEnd: h,
				polygonStart: function () {
					e.polygonStart();
					r.lineStart = M
				},
				polygonEnd: function () {
					e.polygonEnd();
					r.lineStart = s
				}
			};

			function y(t, r) {
				t = n(t, r);
				e.point(t[0], t[1])
			};

			function s() {
				u = NaN;
				r.point = c;
				e.lineStart()
			};

			function c(λ, φ) {
				var c = un([λ, φ]),
					h = n(λ, φ);
				i(u, a, λ0, o, l, f, u = h[0], a = h[1], λ0 = λ, o = c[0], l = c[1], f = c[2], t, e);
				e.point(u, a)
			};

			function h() {
				r.point = y;
				e.lineEnd()
			};

			function M() {
				s();
				r.point = x;
				r.lineEnd = w
			};

			function x(λ, φ) {
				c(λ00 = λ, φ00 = φ), g = u, p = a, v = o, d = l, m = f;
				r.point = c
			};

			function w() {
				i(u, a, λ0, o, l, f, g, p, λ00, v, d, m, t, e);
				r.lineEnd = h;
				h()
			};
			return r
		};

		function i(t, e, λ0, o, l, f, c, p, λ1, M, x, w, b, S) {
			var m = c - t,
				y = p - e,
				N = m * m + y * y;
			if (N > 4 * δ2 && b--) {
				var h = o + M,
					g = l + x,
					s = f + w,
					k = Math.sqrt(h * h + g * g + s * s),
					φ2 = Math.asin(s /= k),
					λ2 = r(r(s) - 1) < ε || r(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(g, h),
					E = n(λ2, φ2),
					v = E[0],
					d = E[1],
					A = v - t,
					C = d - e,
					z = y * A - m * C;
				if (z * z / N > δ2 || r((m * A + y * C) / N - .5) > .3 || o * M + l * x + f * w < a) {
					i(t, e, λ0, o, l, f, v, d, λ2, h /= k, g /= k, s, b, S);
					S.point(v, d);
					i(v, d, λ2, h, g, s, c, p, λ1, M, x, w, b, S)
				}
			}
		};
		u.precision = function (n) {
			if (!arguments.length) return Math.sqrt(δ2);
			t = (δ2 = n * n) > 0 && 16;
			return u
		};
		return u
	};
	n.geo.path = function () {
		var e = 4.5,
			a, o, i, r, u;

		function t(t) {
			if (t) {
				if (typeof e === 'function') r.pointRadius(+e.apply(this, arguments));
				if (!u || !u.valid) u = i(r);
				n.geo.stream(t, u)
			}
			;
			return r.result()
		};
		t.area = function (t) {
			Jt = 0;
			n.geo.stream(t, i(j));
			return Jt
		};
		t.centroid = function (t) {
			G = K = C = F = H = k = hn = gn = O = 0;
			n.geo.stream(t, i(M));
			return O ? [hn / O, gn / O] : k ? [F / k, H / k] : C ? [G / C, K / C] : [NaN, NaN]
		};
		t.bounds = function (t) {
			Wn = Jn = -(Xn = Bn = Infinity);
			n.geo.stream(t, i(ba));
			return [
				[Xn, Bn],
				[Wn, Jn]
			]
		};
		t.projection = function (n) {
			if (!arguments.length) return a;
			i = (a = n) ? n.stream || Eo(n) : h;
			return l()
		};
		t.context = function (n) {
			if (!arguments.length) return o;
			r = (o = n) == null ? new So() : new No(n);
			if (typeof e !== 'function') r.pointRadius(e);
			return l()
		};
		t.pointRadius = function (n) {
			if (!arguments.length) return e;
			e = typeof n === 'function' ? n : (r.pointRadius(+n), +n);
			return t
		};

		function l() {
			u = null;
			return t
		};
		return t.projection(n.geo.albersUsa()).context(null)
	};

	function Eo(n) {
		var t = Vi(function (t, e) {
			return n([t * o, e * o])
		});
		return function (n) {
			return Wi(t(n))
		}
	};
	n.geo.transform = function (n) {
		return {
			stream: function (t) {
				var r = new Xi(t);
				for (var e in n) r[e] = n[e];
				return r
			}
		}
	};

	function Xi(n) {
		this.stream = n
	};
	Xi.prototype = {
		point: function (n, t) {
			this.stream.point(n, t)
		},
		sphere: function () {
			this.stream.sphere()
		},
		lineStart: function () {
			this.stream.lineStart()
		},
		lineEnd: function () {
			this.stream.lineEnd()
		},
		polygonStart: function () {
			this.stream.polygonStart()
		},
		polygonEnd: function () {
			this.stream.polygonEnd()
		}
	};

	function Bi(n, t) {
		return {
			point: t,
			sphere: function () {
				n.sphere()
			},
			lineStart: function () {
				n.lineStart()
			},
			lineEnd: function () {
				n.lineEnd()
			},
			polygonStart: function () {
				n.polygonStart()
			},
			polygonEnd: function () {
				n.polygonEnd()
			}
		}
	};
	n.geo.projection = B;
	n.geo.projectionMutator = Re;

	function B(n) {
		return Re(function () {
			return n
		})()
	};

	function Re(t) {
		var f, v, c, d = Vi(function (n, t) {
				n = f(n, t);
				return [n[0] * r + δn, δt - n[1] * r]
			}),
			r = 150,
			a = 480,
			l = 250,
			λ = 0,
			φ = 0,
			δλ = 0,
			δφ = 0,
			δγ = 0,
			δa, δl, m = zr,
			y = h,
			g = null,
			M = null,
			u;

		function i(n) {
			n = c(n[0] * e, n[1] * e);
			return [n[0] * r + δa, δl - n[1] * r]
		};

		function x(n) {
			n = c.invert((n[0] - δa) / r, (δl - n[1]) / r);
			return n && [n[0] * o, n[1] * o]
		};
		i.stream = function (n) {
			if (u) u.valid = !1;
			u = Wi(m(v, d(y(n))));
			u.valid = !0;
			return u
		};
		i.clipAngle = function (n) {
			if (!arguments.length) return g;
			m = n == null ? (g = n, zr) : xo((g = +n) * e);
			return p()
		};
		i.clipExtent = function (n) {
			if (!arguments.length) return M;
			M = n;
			y = n ? Fi(n[0][0], n[0][1], n[1][0], n[1][1]) : h;
			return p()
		};
		i.scale = function (n) {
			if (!arguments.length) return r;
			r = +n;
			return s()
		};
		i.translate = function (n) {
			if (!arguments.length) return [a, l];
			a = +n[0];
			l = +n[1];
			return s()
		};
		i.center = function (n) {
			if (!arguments.length) return [λ * o, φ * o];
			λ = n[0] % 360 * e;
			φ = n[1] % 360 * e;
			return s()
		};
		i.rotate = function (n) {
			if (!arguments.length) return [δλ * o, δφ * o, δγ * o];
			δλ = n[0] % 360 * e;
			δφ = n[1] % 360 * e;
			δγ = n.length > 2 ? n[2] % 360 * e : 0;
			return s()
		};
		n.rebind(i, d, 'precision');

		function s() {
			c = Ri(v = I(δλ, δφ, δγ), f);
			var n = f(λ, φ);
			δa = a - n[0] * r;
			δl = l + n[1] * r;
			return p()
		};

		function p() {
			if (u) u.valid = !1, u = null;
			return i
		};
		return function () {
			f = t.apply(this, arguments);
			i.invert = f.invert && x;
			return s()
		}
	};

	function Wi(n) {
		return Bi(n, function (t, r) {
			n.point(t * e, r * e)
		})
	};

	function Cn(λ, φ) {
		return [λ, φ]
	}

	(n.geo.equirectangular = function () {
		return B(Cn)
	}).raw = Cn.invert = Cn;
	n.geo.rotation = function (n) {
		n = I(n[0] % 360 * e, n[1] * e, n.length > 2 ? n[2] * e : 0);

		function t(t) {
			t = n(t[0] * e, t[1] * e);
			return t[0] *= o, t[1] *= o, t
		};
		t.invert = function (t) {
			t = n.invert(t[0] * e, t[1] * e);
			return t[0] *= o, t[1] *= o, t
		};
		return t
	};

	function Ji(λ, φ) {
		return [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ]
	};
	Ji.invert = Cn;

	function I(δλ, δφ, δγ) {
		return δλ ? δφ || δγ ? Ri(Iλ(δλ), Iφγ(δφ, δγ)) : Iλ(δλ) : δφ || δγ ? Iφγ(δφ, δγ) : Ji
	};

	function d3_geo_forwardRotationλ(δλ) {
		return function (λ, φ) {
			return λ += δλ, [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ]
		}
	};

	function Iλ(δλ) {
		var t = d3_geo_forwardRotationλ(δλ);
		t.invert = d3_geo_forwardRotationλ(-δλ);
		return t
	};

	function Iφγ(δφ, δγ) {
		var iδφ = Math.cos(δφ),
			eδφ = Math.sin(δφ),
			iδγ = Math.cos(δγ),
			eδγ = Math.sin(δγ);

		function r(λ, φ) {
			var rφ = Math.cos(φ),
				i = Math.cos(λ) * rφ,
				u = Math.sin(λ) * rφ,
				a = Math.sin(φ),
				o = a * rδφ + i * eδφ;
			return [Math.atan2(u * rδγ - o * eδγ, i * rδφ - a * eδφ), X(o * rδγ + u * eδγ)]
		};
		r.invert = function (λ, φ) {
			var rφ = Math.cos(φ),
				i = Math.cos(λ) * rφ,
				u = Math.sin(λ) * rφ,
				a = Math.sin(φ),
				o = a * rδγ - u * eδγ;
			return [Math.atan2(u * rδγ + a * eδγ, i * rδφ + o * eδφ), X(o * rδφ - i * eδφ)]
		};
		return r
	};
	n.geo.circle = function () {
		var t = [0, 0],
			r, i = 6,
			u;

		function n() {
			var n = typeof t === 'function' ? t.apply(this, arguments) : t,
				i = I(-n[0] * e, -n[1] * e, 0).invert,
				r = [];
			u(null, null, 1, {
				point: function (n, t) {
					r.push(n = i(n, t));
					n[0] *= o, n[1] *= o
				}
			});
			return {
				type: 'Polygon',
				coordinates: [r]
			}
		};
		n.origin = function (e) {
			if (!arguments.length) return t;
			t = e;
			return n
		};
		n.angle = function (t) {
			if (!arguments.length) return r;
			u = De((r = +t) * e, i * e);
			return n
		};
		n.precision = function (t) {
			if (!arguments.length) return i;
			u = De(r * e, (i = +t) * e);
			return n
		};
		return n.angle(90)
	};

	function De(n, t) {
		var e = Math.cos(n),
			r = Math.sin(n);
		return function (i, u, a, o) {
			var s = a * t;
			if (i != null) {
				i = Gi(e, i);
				u = Gi(e, u);
				if (a > 0 ? i < u : i > u) i += a * τ
			} else {
				i = n + a * τ;
				u = n - .5 * s
			}
			;
			for (var f, l = i; a > 0 ? l > u : l < u; l -= s) {
				o.point((f = kt([e, -r * Math.cos(l), -r * Math.sin(l)]))[0], f[1])
			}
		}
	};

	function Gi(n, t) {
		var e = un(t);
		e[0] -= n;
		St(e);
		var r = di(-e[1]);
		return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - ε) % (2 * Math.PI)
	};
	n.geo.distance = function (n, t) {
		var Δλ = (t[0] - n[0]) * e,
			φ0 = n[1] * e,
			φ1 = t[1] * e,
			iΔλ = Math.sin(Δλ),
			rΔλ = Math.cos(Δλ),
			iφ0 = Math.sin(φ0),
			rφ0 = Math.cos(φ0),
			iφ1 = Math.sin(φ1),
			rφ1 = Math.cos(φ1),
			u;
		return Math.atan2(Math.sqrt((u = rφ1 * iΔλ) * u + (u = rφ0 * iφ1 - iφ0 * rφ1 * rΔλ) * u), iφ0 * iφ1 + rφ0 * rφ1 * rΔλ)
	};
	n.geo.graticule = function () {
		var o, l, e, i, f, s, u, a, c = 10,
			v = c,
			h = 90,
			g = 360,
			y, M, d, m, p = 2.5;

		function t() {
			return {
				type: 'MultiLineString',
				coordinates: x()
			}
		};

		function x() {
			return n.range(Math.ceil(i / h) * h, e, h).map(d).concat(n.range(Math.ceil(a / g) * g, u, g).map(m)).concat(n.range(Math.ceil(l / c) * c, o, c).filter(function (n) {
				return r(n % h) > ε
			}).map(y)).concat(n.range(Math.ceil(s / v) * v, f, v).filter(function (n) {
				return r(n % g) > ε
			}).map(M))
		};
		t.lines = function () {
			return x().map(function (n) {
				return {
					type: 'LineString',
					coordinates: n
				}
			})
		};
		t.outline = function () {
			return {
				type: 'Polygon',
				coordinates: [d(i).concat(m(u).slice(1), d(e).reverse().slice(1), m(a).reverse().slice(1))]
			}
		};
		t.extent = function (n) {
			if (!arguments.length) return t.minorExtent();
			return t.majorExtent(n).minorExtent(n)
		};
		t.majorExtent = function (n) {
			if (!arguments.length) return [
				[i, a],
				[e, u]
			];
			i = +n[0][0], e = +n[1][0];
			a = +n[0][1], u = +n[1][1];
			if (i > e) n = i, i = e, e = n;
			if (a > u) n = a, a = u, u = n;
			return t.precision(p)
		};
		t.minorExtent = function (n) {
			if (!arguments.length) return [
				[l, s],
				[o, f]
			];
			l = +n[0][0], o = +n[1][0];
			s = +n[0][1], f = +n[1][1];
			if (l > o) n = l, l = o, o = n;
			if (s > f) n = s, s = f, f = n;
			return t.precision(p)
		};
		t.step = function (n) {
			if (!arguments.length) return t.minorStep();
			return t.majorStep(n).minorStep(n)
		};
		t.majorStep = function (n) {
			if (!arguments.length) return [h, g];
			h = +n[0], g = +n[1];
			return t
		};
		t.minorStep = function (n) {
			if (!arguments.length) return [c, v];
			c = +n[0], v = +n[1];
			return t
		};
		t.precision = function (n) {
			if (!arguments.length) return p;
			p = +n;
			y = Ki(s, f, 90);
			M = Qi(l, o, p);
			d = Ki(a, u, 90);
			m = Qi(i, e, p);
			return t
		};
		return t.majorExtent([
			[-180, -90 + ε],
			[180, 90 - ε]
		]).minorExtent([
			[-180, -80 - ε],
			[180, 80 + ε]
		])
	};

	function Ki(t, e, r) {
		var i = n.range(t, e - ε, r).concat(e);
		return function (n) {
			return i.map(function (t) {
				return [n, t]
			})
		}
	};

	function Qi(t, e, r) {
		var i = n.range(t, e - ε, r).concat(e);
		return function (n) {
			return i.map(function (t) {
				return [t, n]
			})
		}
	};

	function Ie(n) {
		return n.source
	};

	function Pe(n) {
		return n.target
	};
	n.geo.greatArc = function () {
		var e = Ie,
			i, r = Pe,
			u;

		function t() {
			return {
				type: 'LineString',
				coordinates: [i || e.apply(this, arguments), u || r.apply(this, arguments)]
			}
		};
		t.distance = function () {
			return n.geo.distance(i || e.apply(this, arguments), u || r.apply(this, arguments))
		};
		t.source = function (n) {
			if (!arguments.length) return e;
			e = n, i = typeof n === 'function' ? null : n;
			return t
		};
		t.target = function (n) {
			if (!arguments.length) return r;
			r = n, u = typeof n === 'function' ? null : n;
			return t
		};
		t.precision = function () {
			return arguments.length ? t : 0
		};
		return t
	};
	n.geo.interpolate = function (n, t) {
		return Ao(n[0] * e, n[1] * e, t[0] * e, t[1] * e)
	};

	function Ao(n, t, e, r) {
		var u = Math.cos(t),
			s = Math.sin(t),
			a = Math.cos(r),
			c = Math.sin(r),
			h = u * Math.cos(n),
			g = u * Math.sin(n),
			p = a * Math.cos(e),
			v = a * Math.sin(e),
			i = 2 * Math.asin(Math.sqrt(yi(r - t) + u * a * yi(e - n))),
			l = 1 / Math.sin(i),
			f = i ? function (n) {
				var t = Math.sin(n *= i) * l,
					e = Math.sin(i - n) * l,
					r = e * h + t * p,
					u = e * g + t * v,
					a = e * s + t * c;
				return [Math.atan2(u, r) * o, Math.atan2(a, Math.sqrt(r * r + u * u)) * o]
			} : function () {
				return [n * o, t * o]
			};
		f.distance = i;
		return f
	};
	n.geo.length = function (t) {
		Wt = 0;
		n.geo.stream(t, cn);
		return Wt
	};
	var Wt, cn = {
		sphere: s,
		point: s,
		lineStart: Co,
		lineEnd: s,
		polygonStart: s,
		polygonEnd: s
	};

	function Co() {
		var λ0, nφ0, tφ0;
		cn.point = function (λ, φ) {
			λ0 = λ * e, nφ0 = Math.sin(φ *= e), tφ0 = Math.cos(φ);
			cn.point = i
		};
		cn.lineEnd = function () {
			cn.point = cn.lineEnd = s
		};

		function i(λ, φ) {
			var uφ = Math.sin(φ *= e),
				iφ = Math.cos(φ),
				a = r((λ *= e) - λ0),
				iΔλ = Math.cos(a);
			Wt += Math.atan2(Math.sqrt((a = iφ * Math.sin(a)) * a + (a = iφ0 * uφ - uφ0 * iφ * iΔλ) * a), uφ0 * uφ + iφ0 * iφ * iΔλ);
			λ0 = λ, uφ0 = uφ, iφ0 = iφ
		}
	};

	function zn(n, t) {
		function e(λ, φ) {
			var rλ = Math.cos(λ),
				rφ = Math.cos(φ),
				i = n(rλ * rφ);
			return [i * rφ * Math.sin(λ), i * Math.sin(φ)]
		};
		e.invert = function (n, e) {
			var ρ = Math.sqrt(n * n + e * e),
				r = t(ρ),
				i = Math.sin(r),
				u = Math.cos(r);
			return [Math.atan2(n * i, ρ * u), Math.asin(ρ && e * i / ρ)]
		};
		return e
	};
	var Cr = zn(function (cosλcosφ) {
		return Math.sqrt(2 / (1 + cosλcosφ))
	}, function (ρ) {
		return 2 * Math.asin(ρ / 2)
	});
	(n.geo.azimuthalEqualArea = function () {
		return B(Cr)
	}).raw = Cr;
	var Ar = zn(function (cosλcosφ) {
		var t = Math.acos(cosλcosφ);
		return t && t / Math.sin(t)
	}, h);
	(n.geo.azimuthalEquidistant = function () {
		return B(Ar)
	}).raw = Ar;

	function nu(φ0, φ1) {
		var uφ0 = Math.cos(φ0),
			i = function (φ) {
				return Math.tan(π / 4 + φ / 2)
			},
			e = φ0 === φ1 ? Math.sin(φ0) : Math.log(uφ0 / Math.cos(φ1)) / Math.log(i(φ1) / i(φ0)),
			r = uφ0 * Math.pow(i(φ0), e) / e;
		if (!e) return At;

		function a(λ, φ) {
			if (r > 0) {
				if (φ < -fπ + ε) φ = -fπ + ε
			} else {
				if (φ > fπ - ε) φ = fπ - ε
			}
			;
			var ρ = r / Math.pow(i(φ), e);
			return [ρ * Math.sin(e * λ), r - ρ * Math.cos(e * λ)]
		};
		a.invert = function (n, t) {
			var ρ0_y = r - t,
				ρ = vi(e) * Math.sqrt(n * n + ρ0_y * ρ0_y);
			return [Math.atan2(n, ρ0_y) / e, 2 * Math.atan(Math.pow(r / ρ, 1 / e)) - fπ]
		};
		return a
	}

	(n.geo.conicConformal = function () {
		return Te(nu)
	}).raw = nu;

	function tu(φ0, φ1) {
		var uφ0 = Math.cos(φ0),
			e = φ0 === φ1 ? Math.sin(φ0) : (uφ0 - Math.cos(φ1)) / (φ1 - φ0),
			i = uφ0 / e + φ0;
		if (r(e) < ε) return Cn;

		function a(λ, φ) {
			var ρ = i - φ;
			return [ρ * Math.sin(e * λ), i - ρ * Math.cos(e * λ)]
		};
		a.invert = function (n, t) {
			var ρ0_y = i - t;
			return [Math.atan2(n, ρ0_y) / e, i - vi(e) * Math.sqrt(n * n + ρ0_y * ρ0_y)]
		};
		return a
	}

	(n.geo.conicEquidistant = function () {
		return Te(tu)
	}).raw = tu;
	var Er = zn(function (cosλcosφ) {
		return 1 / cosλcosφ
	}, Math.atan);
	(n.geo.gnomonic = function () {
		return B(Er)
	}).raw = Er;

	function At(λ, φ) {
		return [λ, Math.log(Math.tan(π / 4 + φ / 2))]
	};
	At.invert = function (n, t) {
		return [n, 2 * Math.atan(Math.exp(t)) - fπ]
	};

	function eu(n) {
		var t = B(n),
			r = t.scale,
			i = t.translate,
			u = t.clipExtent,
			e;
		t.scale = function () {
			var n = r.apply(t, arguments);
			return n === t ? e ? t.clipExtent(null) : t : n
		};
		t.translate = function () {
			var n = i.apply(t, arguments);
			return n === t ? e ? t.clipExtent(null) : t : n
		};
		t.clipExtent = function (n) {
			var l = u.apply(t, arguments);
			if (l === t) {
				if (e = n == null) {
					var a = π * r(),
						o = i();
					u([
						[o[0] - a, o[1] - a],
						[o[0] + a, o[1] + a]
					])
				}
			} else if (e) {
				l = null
			}
			;
			return l
		};
		return t.clipExtent(null)
	}

	(n.geo.mercator = function () {
		return eu(At)
	}).raw = At;
	var Nr = zn(function () {
		return 1
	}, Math.asin);
	(n.geo.orthographic = function () {
		return B(Nr)
	}).raw = Nr;
	var kr = zn(function (cosλcosφ) {
		return 1 / (1 + cosλcosφ)
	}, function (ρ) {
		return 2 * Math.atan(ρ)
	});
	(n.geo.stereographic = function () {
		return B(kr)
	}).raw = kr;

	function Ue(λ, φ) {
		return [Math.log(Math.tan(π / 4 + φ / 2)), -λ]
	};
	Ue.invert = function (n, t) {
		return [-t, 2 * Math.atan(Math.exp(n)) - fπ]
	};
	(n.geo.transverseMercator = function () {
		var n = eu(Ue),
			e = n.center,
			t = n.rotate;
		n.center = function (n) {
			return n ? e([-n[1], n[0]]) : (n = e(), [n[1], -n[0]])
		};
		n.rotate = function (n) {
			return n ? t([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : (n = t(), [n[0], n[1], n[2] - 90])
		};
		return t([0, 0, 90])
	}).raw = Ue;
	n.geom = {};

	function mn(n) {
		return n[0]
	};

	function Ln(n) {
		return n[1]
	};
	n.geom.hull = function (n) {
		var e = mn,
			r = Ln;
		if (arguments.length) return t(n);

		function t(n) {
			if (n.length < 3) return [];
			var g = a(e),
				p = a(r),
				t, f = n.length,
				i = [],
				s = [];
			for (t = 0; t < f; t++) {
				i.push([+g.call(this, n[t], t), +p.call(this, n[t], t), t])
			}
			;
			i.sort(zo);
			for (t = 0; t < f; t++) s.push([i[t][0], -i[t][1]]);
			var u = ru(i),
				o = ru(s),
				c = o[0] === u[0],
				h = o[o.length - 1] === u[u.length - 1],
				l = [];
			for (t = u.length - 1; t >= 0; --t) l.push(n[i[u[t]][2]]);
			for (t = +c; t < o.length - h; ++t) l.push(n[i[o[t]][2]]);
			return l
		};
		t.x = function (n) {
			return arguments.length ? (e = n, t) : e
		};
		t.y = function (n) {
			return arguments.length ? (r = n, t) : r
		};
		return t
	};

	function ru(n) {
		var i = n.length,
			r = [0, 1],
			t = 2;
		for (var e = 2; e < i; e++) {
			while (t > 1 && me(n[r[t - 2]], n[r[t - 1]], n[e]) <= 0) --t;
			r[t++] = e
		}
		;
		return r.slice(0, t)
	};

	function zo(n, t) {
		return n[0] - t[0] || n[1] - t[1]
	};
	n.geom.polygon = function (n) {
		st(n, Vn);
		return n
	};
	var Vn = n.geom.polygon.prototype = [];
	Vn.area = function () {
		var e = -1,
			r = this.length,
			t, n = this[r - 1],
			i = 0;
		while (++e < r) {
			t = n;
			n = this[e];
			i += t[1] * n[0] - t[0] * n[1]
		}
		;
		return i * .5
	};
	Vn.centroid = function (n) {
		var i = -1,
			u = this.length,
			a = 0,
			o = 0,
			e, t = this[u - 1],
			r;
		if (!arguments.length) n = -1 / (6 * this.area());
		while (++i < u) {
			e = t;
			t = this[i];
			r = e[0] * t[1] - t[0] * e[1];
			a += (e[0] + t[0]) * r;
			o += (e[1] + t[1]) * r
		}
		;
		return [a * n, o * n]
	};
	Vn.clip = function (n) {
		var u, o = iu(n),
			l = -1,
			f = this.length - iu(this),
			a, s, e = this[f - 1],
			t, r, i;
		while (++l < f) {
			u = n.slice();
			n.length = 0;
			t = this[l];
			r = u[(s = u.length - o) - 1];
			a = -1;
			while (++a < s) {
				i = u[a];
				if (je(i, e, t)) {
					if (!je(r, e, t)) {
						n.push(Fe(r, i, e, t))
					}
					;
					n.push(i)
				} else if (je(r, e, t)) {
					n.push(Fe(r, i, e, t))
				}
				;
				r = i
			}
			;
			if (o) n.push(n[0]);
			e = t
		}
		;
		return n
	};

	function je(n, t, e) {
		return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0])
	};

	function Fe(n, t, e, r) {
		var i = n[0],
			a = e[0],
			o = t[0] - i,
			l = r[0] - a,
			u = n[1],
			f = e[1],
			s = t[1] - u,
			c = r[1] - f,
			h = (l * (u - f) - c * (i - a)) / (c * o - l * s);
		return [i + h * o, u + h * s]
	};

	function iu(n) {
		var t = n[0],
			e = n[n.length - 1];
		return !(t[0] - e[0] || t[1] - e[1])
	};
	var fn, J, sn, br = [],
		Bt, Sn, Sr = [];

	function Lo() {
		Lt(this);
		this.edge = this.site = this.circle = null
	};

	function uu(n) {
		var t = br.pop() || new Lo();
		t.site = n;
		return t
	};

	function He(n) {
		Mn(n);
		sn.remove(n);
		br.push(n);
		Lt(n)
	};

	function qo(n) {
		var c = n.circle,
			a = c.x,
			o = c.cy,
			h = {
				x: a,
				y: o
			},
			l = n.P,
			f = n.N,
			i = [n];
		He(n);
		var e = l;
		while (e.circle && r(a - e.circle.x) < ε && r(o - e.circle.cy) < ε) {
			l = e.P;
			i.unshift(e);
			He(e);
			e = l
		}
		;
		i.unshift(e);
		Mn(e);
		var t = f;
		while (t.circle && r(a - t.circle.x) < ε && r(o - t.circle.cy) < ε) {
			f = t.N;
			i.push(t);
			He(t);
			t = f
		}
		;
		i.push(t);
		Mn(t);
		var s = i.length,
			u;
		for (u = 1; u < s; ++u) {
			t = i[u];
			e = i[u - 1];
			Ct(t.edge, e.site, t.site, h)
		}
		;
		e = i[0];
		t = i[s - 1];
		t.edge = qn(e.site, t.site, null, h);
		yn(e);
		yn(t)
	};

	function To(n) {
		var M = n.x,
			x = n.y,
			t, e, p, v, r = sn._;
		while (r) {
			p = au(r, x) - M;
			if (p > ε) r = r.L;
			else {
				v = M - Ro(r, x);
				if (v > ε) {
					if (!r.R) {
						t = r;
						break
					}
					;
					r = r.R
				} else {
					if (p > -ε) {
						t = r.P;
						e = r
					} else if (v > -ε) {
						t = r;
						e = r.N
					} else {
						t = e = r
					}
					;
					break
				}
			}
		}
		;
		var i = uu(n);
		sn.insert(t, i);
		if (!t && !e) return;
		if (t === e) {
			Mn(t);
			e = uu(t.site);
			sn.insert(i, e);
			i.edge = e.edge = qn(t.site, i.site);
			yn(t);
			yn(e);
			return
		}
		;
		if (!e) {
			i.edge = qn(t.site, i.site);
			return
		}
		;
		Mn(t);
		Mn(e);
		var u = t.site,
			c = u.x,
			h = u.y,
			a = n.x - c,
			o = n.y - h,
			l = e.site,
			f = l.x - c,
			s = l.y - h,
			d = 2 * (a * s - o * f),
			m = a * a + o * o,
			y = f * f + s * s,
			g = {
				x: (s * m - o * y) / d + c,
				y: (a * y - f * m) / d + h
			};
		Ct(e.edge, u, l, g);
		i.edge = qn(u, n, null, g);
		e.edge = qn(n, l, null, g);
		yn(t);
		yn(e)
	};

	function au(n, t) {
		var r = n.site,
			i = r.x,
			h = r.y,
			f = h - t;
		if (!f) return i;
		var c = n.P;
		if (!c) return -Infinity;
		r = c.site;
		var l = r.x,
			s = r.y,
			e = s - t;
		if (!e) return l;
		var u = l - i,
			a = 1 / f - 1 / e,
			o = u / e;
		if (a) return (-o + Math.sqrt(o * o - 2 * a * (u * u / (-2 * e) - s + e / 2 + h - f / 2))) / a + i;
		return (i + l) / 2
	};

	function Ro(n, t) {
		var r = n.N;
		if (r) return au(r, t);
		var e = n.site;
		return e.y === t ? e.x : Infinity
	};

	function ou(n) {
		this.site = n;
		this.edges = []
	};
	ou.prototype.prepare = function () {
		var n = this.edges,
			t = n.length,
			e;
		while (t--) {
			e = n[t].edge;
			if (!e.b || !e.a) n.splice(t, 1)
		}
		;
		n.sort(lu);
		return n.length
	};

	function Do(n) {
		var o = n[0][0],
			l = n[1][0],
			f = n[0][1],
			s = n[1][1],
			t, e, i, u, d = J,
			m = d.length,
			a, c, h, g, v, p;
		while (m--) {
			a = d[m];
			if (!a || !a.prepare()) continue;
			h = a.edges;
			g = h.length;
			c = 0;
			while (c < g) {
				p = h[c].end(), i = p.x, u = p.y;
				v = h[++c % g].start(), t = v.x, e = v.y;
				if (r(i - t) > ε || r(u - e) > ε) {
					h.splice(c, 0, new zt(jo(a.site, p, r(i - o) < ε && s - u > ε ? {
						x: o,
						y: r(t - o) < ε ? e : s
					} : r(u - s) < ε && l - i > ε ? {
						x: r(e - s) < ε ? t : l,
						y: s
					} : r(i - l) < ε && u - f > ε ? {
						x: l,
						y: r(t - l) < ε ? e : f
					} : r(u - f) < ε && i - o > ε ? {
						x: r(e - f) < ε ? t : o,
						y: f
					} : null), a.site, null));
					++g
				}
			}
		}
	};

	function lu(n, t) {
		return t.angle - n.angle
	};

	function Io() {
		Lt(this);
		this.x = this.y = this.arc = this.site = this.cy = null
	};

	function yn(n) {
		var y = n.P,
			M = n.N;
		if (!y || !M) return;
		var g = y.site,
			p = n.site,
			v = M.site;
		if (g === v) return;
		var s = p.x,
			c = p.y,
			u = g.x - s,
			a = g.y - c,
			o = v.x - s,
			r = v.y - c,
			h = 2 * (u * r - a * o);
		if (h >= -ε2) return;
		var d = u * u + a * a,
			m = o * o + r * r,
			l = (r * d - a * m) / h,
			f = (u * m - o * d) / h,
			r = f + c,
			e = Sr.pop() || new Io();
		e.arc = n;
		e.site = p;
		e.x = l + s;
		e.y = r + Math.sqrt(l * l + f * f);
		e.cy = r;
		n.circle = e;
		var i = null,
			t = Sn._;
		while (t) {
			if (e.y < t.y || e.y === t.y && e.x <= t.x) {
				if (t.L) t = t.L;
				else {
					i = t.P;
					break
				}
			} else {
				if (t.R) t = t.R;
				else {
					i = t;
					break
				}
			}
		}
		;
		Sn.insert(i, e);
		if (!i) Bt = e
	};

	function Mn(n) {
		var t = n.circle;
		if (t) {
			if (!t.P) Bt = t.N;
			Sn.remove(t);
			Sr.push(t);
			Lt(t);
			n.circle = null
		}
	};

	function Po(n) {
		var e = fn,
			u = ji(n[0][0], n[0][1], n[1][0], n[1][1]),
			i = e.length,
			t;
		while (i--) {
			t = e[i];
			if (!Uo(t, n) || !u(t) || r(t.a.x - t.b.x) < ε && r(t.a.y - t.b.y) < ε) {
				t.a = t.b = null;
				e.splice(i, 1)
			}
		}
	};

	function Uo(n, t) {
		var o = n.b;
		if (o) return !0;
		var e = n.a,
			f = t[0][0],
			s = t[1][0],
			u = t[0][1],
			a = t[1][1],
			v = n.l,
			d = n.r,
			c = v.x,
			h = v.y,
			g = d.x,
			p = d.y,
			l = (c + g) / 2,
			m = (h + p) / 2,
			r, i;
		if (p === h) {
			if (l < f || l >= s) return;
			if (c > g) {
				if (!e) e = {
					x: l,
					y: u
				};
				else if (e.y >= a) return;
				o = {
					x: l,
					y: a
				}
			} else {
				if (!e) e = {
					x: l,
					y: a
				};
				else if (e.y < u) return;
				o = {
					x: l,
					y: u
				}
			}
		} else {
			r = (c - g) / (p - h);
			i = m - r * l;
			if (r < -1 || r > 1) {
				if (c > g) {
					if (!e) e = {
						x: (u - i) / r,
						y: u
					};
					else if (e.y >= a) return;
					o = {
						x: (a - i) / r,
						y: a
					}
				} else {
					if (!e) e = {
						x: (a - i) / r,
						y: a
					};
					else if (e.y < u) return;
					o = {
						x: (u - i) / r,
						y: u
					}
				}
			} else {
				if (h < p) {
					if (!e) e = {
						x: f,
						y: r * f + i
					};
					else if (e.x >= s) return;
					o = {
						x: s,
						y: r * s + i
					}
				} else {
					if (!e) e = {
						x: s,
						y: r * s + i
					};
					else if (e.x < f) return;
					o = {
						x: f,
						y: r * f + i
					}
				}
			}
		}
		;
		n.a = e;
		n.b = o;
		return !0
	};

	function fu(n, t) {
		this.l = n;
		this.r = t;
		this.a = this.b = null
	};

	function qn(n, t, e, r) {
		var i = new fu(n, t);
		fn.push(i);
		if (e) Ct(i, n, t, e);
		if (r) Ct(i, t, n, r);
		J[n.i].edges.push(new zt(i, n, t));
		J[t.i].edges.push(new zt(i, t, n));
		return i
	};

	function jo(n, t, e) {
		var r = new fu(n, null);
		r.a = t;
		r.b = e;
		fn.push(r);
		return r
	};

	function Ct(n, t, e, r) {
		if (!n.a && !n.b) {
			n.a = r;
			n.l = t;
			n.r = e
		} else if (n.l === e) {
			n.b = r
		} else {
			n.a = r
		}
	};

	function zt(n, t, e) {
		var r = n.a,
			i = n.b;
		this.edge = n;
		this.site = t;
		this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
	};
	zt.prototype = {
		start: function () {
			return this.edge.l === this.site ? this.edge.a : this.edge.b
		},
		end: function () {
			return this.edge.l === this.site ? this.edge.b : this.edge.a
		}
	};

	function Oe() {
		this._ = null
	};

	function Lt(n) {
		n.U = n.C = n.L = n.R = n.P = n.N = null
	};
	Oe.prototype = {
		insert: function (n, t) {
			var e, r, i;
			if (n) {
				t.P = n;
				t.N = n.N;
				if (n.N) n.N.P = t;
				n.N = t;
				if (n.R) {
					n = n.R;
					while (n.L) n = n.L;
					n.L = t
				} else {
					n.R = t
				}
				;
				e = n
			} else if (this._) {
				n = su(this._);
				t.P = null;
				t.N = n;
				n.P = n.L = t;
				e = n
			} else {
				t.P = t.N = null;
				this._ = t;
				e = null
			}
			;
			t.L = t.R = null;
			t.U = e;
			t.C = !0;
			n = t;
			while (e && e.C) {
				r = e.U;
				if (e === r.L) {
					i = r.R;
					if (i && i.C) {
						e.C = i.C = !1;
						r.C = !0;
						n = r
					} else {
						if (n === e.R) {
							Tn(this, e);
							n = e;
							e = n.U
						}
						;
						e.C = !1;
						r.C = !0;
						Rn(this, r)
					}
				} else {
					i = r.L;
					if (i && i.C) {
						e.C = i.C = !1;
						r.C = !0;
						n = r
					} else {
						if (n === e.L) {
							Rn(this, e);
							n = e;
							e = n.U
						}
						;
						e.C = !1;
						r.C = !0;
						Tn(this, r)
					}
				}
				;
				e = n.U
			}
			;
			this._.C = !1
		},
		remove: function (n) {
			if (n.N) n.N.P = n.P;
			if (n.P) n.P.N = n.N;
			n.N = n.P = null;
			var e = n.U,
				t, u = n.L,
				i = n.R,
				r, a;
			if (!u) r = i;
			else if (!i) r = u;
			else r = su(i);
			if (e) {
				if (e.L === n) e.L = r;
				else e.R = r
			} else {
				this._ = r
			}
			;
			if (u && i) {
				a = r.C;
				r.C = n.C;
				r.L = u;
				u.U = r;
				if (r !== i) {
					e = r.U;
					r.U = n.U;
					n = r.R;
					e.L = n;
					r.R = i;
					i.U = r
				} else {
					r.U = e;
					e = r;
					n = r.R
				}
			} else {
				a = n.C;
				n = r
			}
			;
			if (n) n.U = e;
			if (a) return;
			if (n && n.C) {
				n.C = !1;
				return
			}
			;
			do {
				if (n === this._) break;
				if (n === e.L) {
					t = e.R;
					if (t.C) {
						t.C = !1;
						e.C = !0;
						Tn(this, e);
						t = e.R
					}
					;
					if (t.L && t.L.C || t.R && t.R.C) {
						if (!t.R || !t.R.C) {
							t.L.C = !1;
							t.C = !0;
							Rn(this, t);
							t = e.R
						}
						;
						t.C = e.C;
						e.C = t.R.C = !1;
						Tn(this, e);
						n = this._;
						break
					}
				} else {
					t = e.L;
					if (t.C) {
						t.C = !1;
						e.C = !0;
						Rn(this, e);
						t = e.L
					}
					;
					if (t.L && t.L.C || t.R && t.R.C) {
						if (!t.L || !t.L.C) {
							t.R.C = !1;
							t.C = !0;
							Tn(this, t);
							t = e.L
						}
						;
						t.C = e.C;
						e.C = t.L.C = !1;
						Rn(this, e);
						n = this._;
						break
					}
				}
				;
				t.C = !0;
				n = e;
				e = e.U
			}
			while (!n.C);
			if (n) n.C = !1
		}
	};

	function Tn(n, t) {
		var e = t,
			r = t.R,
			i = e.U;
		if (i) {
			if (i.L === e) i.L = r;
			else i.R = r
		} else {
			n._ = r
		}
		;
		r.U = i;
		e.U = r;
		e.R = r.L;
		if (e.R) e.R.U = e;
		r.L = e
	};

	function Rn(n, t) {
		var e = t,
			r = t.L,
			i = e.U;
		if (i) {
			if (i.L === e) i.L = r;
			else i.R = r
		} else {
			n._ = r
		}
		;
		r.U = i;
		e.U = r;
		e.L = r.R;
		if (e.L) e.L.U = e;
		r.R = e
	};

	function su(n) {
		while (n.L) n = n.L;
		return n
	};

	function Ye(n, t) {
		var e = n.sort(Fo).pop(),
			i, u, r;
		fn = [];
		J = new Array(n.length);
		sn = new Oe();
		Sn = new Oe();
		while (!0) {
			r = Bt;
			if (e && (!r || e.y < r.y || e.y === r.y && e.x < r.x)) {
				if (e.x !== i || e.y !== u) {
					J[e.i] = new ou(e);
					To(e);
					i = e.x, u = e.y
				}
				;
				e = n.pop()
			} else if (r) {
				qo(r.arc)
			} else {
				break
			}
		}
		;
		if (t) Po(t), Do(t);
		var a = {
			cells: J,
			edges: fn
		};
		sn = Sn = fn = J = null;
		return a
	};

	function Fo(n, t) {
		return t.y - n.y || t.x - n.x
	};
	n.geom.voronoi = function (n) {
		var r = mn,
			i = Ln,
			o = r,
			l = i,
			e = Zn;
		if (n) return t(n);

		function t(n) {
			var o = new Array(n.length),
				t = e[0][0],
				r = e[0][1],
				i = e[1][0],
				a = e[1][1];
			Ye(u(n), e).cells.forEach(function (e, u) {
				var f = e.edges,
					l = e.site,
					s = o[u] = f.length ? f.map(function (n) {
						var t = n.start();
						return [t.x, t.y]
					}) : l.x >= t && l.x <= i && l.y >= r && l.y <= a ? [
						[t, a],
						[i, a],
						[i, r],
						[t, r]
					] : [];
				s.point = n[u]
			});
			return o
		};

		function u(n) {
			return n.map(function (n, t) {
				return {
					x: Math.round(o(n, t) / ε) * ε,
					y: Math.round(l(n, t) / ε) * ε,
					i: t
				}
			})
		};
		t.links = function (n) {
			return Ye(u(n)).edges.filter(function (n) {
				return n.l && n.r
			}).map(function (t) {
				return {
					source: n[t.l.i],
					target: n[t.r.i]
				}
			})
		};
		t.triangles = function (n) {
			var t = [];
			Ye(u(n)).cells.forEach(function (e, r) {
				var o = e.site,
					l = e.edges.sort(lu),
					f = -1,
					s = l.length,
					c, a, i = l[s - 1].edge,
					u = i.l === o ? i.r : i.l;
				while (++f < s) {
					c = i;
					a = u;
					i = l[f].edge;
					u = i.l === o ? i.r : i.l;
					if (r < a.i && r < u.i && Ho(o, a, u) < 0) {
						t.push([n[r], n[a.i], n[u.i]])
					}
				}
			});
			return t
		};
		t.x = function (n) {
			return arguments.length ? (o = a(r = n), t) : r
		};
		t.y = function (n) {
			return arguments.length ? (l = a(i = n), t) : i
		};
		t.clipExtent = function (n) {
			if (!arguments.length) return e === Zn ? null : e;
			e = n == null ? Zn : n;
			return t
		};
		t.size = function (n) {
			if (!arguments.length) return e === Zn ? null : e && e[1];
			return t.clipExtent(n && [
					[0, 0], n
				])
		};
		return t
	};
	var Zn = [
		[-1e6, -1e6],
		[1e6, 1e6]
	];

	function Ho(n, t, e) {
		return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y)
	};
	n.geom.delaunay = function (t) {
		return n.geom.voronoi().triangles(t)
	};
	n.geom.quadtree = function (n, t, e, i, u) {
		var l = mn,
			f = Ln,
			s;
		if (s = arguments.length) {
			l = Oo;
			f = Yo;
			if (s === 3) {
				u = e;
				i = t;
				e = t = 0
			}
			;
			return o(n)
		}
		;

		function o(n) {
			var c, E = a(l),
				A = a(f),
				M, x, o, w, h, g, p, v;
			if (t != null) {
				h = t, g = e, p = i, v = u
			} else {
				p = v = -(h = g = Infinity);
				M = [], x = [];
				w = n.length;
				if (s)
					for (o = 0; o < w; ++o) {
						c = n[o];
						if (c.x < h) h = c.x;
						if (c.y < g) g = c.y;
						if (c.x > p) p = c.x;
						if (c.y > v) v = c.y;
						M.push(c.x);
						x.push(c.y)
					} else
					for (o = 0; o < w; ++o) {
						var m = +E(c = n[o], o),
							y = +A(c, o);
						if (m < h) h = m;
						if (y < g) g = y;
						if (m > p) p = m;
						if (y > v) v = y;
						M.push(m);
						x.push(y)
					}
			}
			;
			var k = p - h,
				N = v - g;
			if (k > N) v = g + k;
			else p = h + N;

			function S(n, t, e, i, u, a, o, l) {
				if (isNaN(e) || isNaN(i)) return;
				if (n.leaf) {
					var f = n.x,
						s = n.y;
					if (f != null) {
						if (r(f - e) + r(s - i) < .01) {
							b(n, t, e, i, u, a, o, l)
						} else {
							var c = n.point;
							n.x = n.y = n.point = null;
							b(n, c, f, s, u, a, o, l);
							b(n, t, e, i, u, a, o, l)
						}
					} else {
						n.x = e, n.y = i, n.point = t
					}
				} else {
					b(n, t, e, i, u, a, o, l)
				}
			};

			function b(n, t, e, r, i, u, a, o) {
				var l = (i + a) * .5,
					f = (u + o) * .5,
					s = e >= l,
					c = r >= f,
					h = c << 1 | s;
				n.leaf = !1;
				n = n.nodes[h] || (n.nodes[h] = cu());
				if (s) i = l;
				else a = l;
				if (c) u = f;
				else o = f;
				S(n, t, e, r, i, u, a, o)
			};
			var d = cu();
			d.add = function (n) {
				S(d, n, +E(n, ++o), +A(n, o), h, g, p, v)
			};
			d.visit = function (n) {
				Dn(n, d, h, g, p, v)
			};
			d.find = function (n) {
				return Zo(d, n[0], n[1], h, g, p, v)
			};
			o = -1;
			if (t == null) {
				while (++o < w) {
					S(d, n[o], M[o], x[o], h, g, p, v)
				}
				;
				--o
			} else n.forEach(d.add);
			M = x = n = c = null;
			return d
		};
		o.x = function (n) {
			return arguments.length ? (l = n, o) : l
		};
		o.y = function (n) {
			return arguments.length ? (f = n, o) : f
		};
		o.extent = function (n) {
			if (!arguments.length) return t == null ? null : [
				[t, e],
				[i, u]
			];
			if (n == null) t = e = i = u = null;
			else t = +n[0][0], e = +n[0][1], i = +n[1][0], u = +n[1][1];
			return o
		};
		o.size = function (n) {
			if (!arguments.length) return t == null ? null : [i - t, u - e];
			if (n == null) t = e = i = u = null;
			else t = e = 0, i = +n[0], u = +n[1];
			return o
		};
		return o
	};

	function Oo(n) {
		return n.x
	};

	function Yo(n) {
		return n.y
	};

	function cu() {
		return {
			leaf: !0,
			nodes: [],
			point: null,
			x: null,
			y: null
		}
	};

	function Dn(n, t, e, r, i, u) {
		if (!n(t, e, r, i, u)) {
			var o = (e + i) * .5,
				l = (r + u) * .5,
				a = t.nodes;
			if (a[0]) Dn(n, a[0], e, r, o, l);
			if (a[1]) Dn(n, a[1], o, r, i, l);
			if (a[2]) Dn(n, a[2], e, l, o, u);
			if (a[3]) Dn(n, a[3], o, l, i, u)
		}
	};

	function Zo(n, t, e, r, i, u, a) {
		var l = Infinity,
			f;
		(function o(n, s, c, h, g) {
			if (s > u || c > a || h < r || g < i) return;
			if (y = n.point) {
				var y, M = t - n.x,
					x = e - n.y,
					w = M * M + x * x;
				if (w < l) {
					var m = Math.sqrt(l = w);
					r = t - m, i = e - m;
					u = t + m, a = e + m;
					f = y
				}
			}
			;
			var S = n.nodes,
				v = (s + h) * .5,
				d = (c + g) * .5,
				k = t >= v,
				N = e >= d;
			for (var p = N << 1 | k, b = p + 4; p < b; ++p) {
				if (n = S[p & 3]) switch (p & 3) {
					case 0:
						o(n, s, c, v, d);
						break;
					case 1:
						o(n, v, c, h, d);
						break;
					case 2:
						o(n, s, d, v, g);
						break;
					case 3:
						o(n, v, d, h, g);
						break
				}
			}
		})(n, r, i, u, a);
		return f
	};
	n.interpolateRgb = Ze;

	function Ze(t, e) {
		t = n.rgb(t);
		e = n.rgb(e);
		var r = t.r,
			i = t.g,
			u = t.b,
			a = e.r - r,
			o = e.g - i,
			l = e.b - u;
		return function (n) {
			return '#' + vn(Math.round(r + a * n)) + vn(Math.round(i + o * n)) + vn(Math.round(u + l * n))
		}
	};
	n.interpolateObject = hu;

	function hu(n, t) {
		var i = {},
			r = {},
			e;
		for (e in n) {
			if (e in t) {
				i[e] = on(n[e], t[e])
			} else {
				r[e] = n[e]
			}
		}
		;
		for (e in t) {
			if (!(e in n)) {
				r[e] = t[e]
			}
		}
		;
		return function (n) {
			for (e in i) r[e] = i[e](n);
			return r
		}
	};
	n.interpolateNumber = P;

	function P(n, t) {
		n = +n, t = +t;
		return function (e) {
			return n * (1 - e) + t * e
		}
	};
	n.interpolateString = gu;

	function gu(n, t) {
		var a = Vt.lastIndex = Xt.lastIndex = 0,
			l, u, i, r = -1,
			e = [],
			o = [];
		n = n + '', t = t + '';
		while ((l = Vt.exec(n)) && (u = Xt.exec(t))) {
			if ((i = u.index) > a) {
				i = t.slice(a, i);
				if (e[r]) e[r] += i;
				else e[++r] = i
			}
			;
			if ((l = l[0]) === (u = u[0])) {
				if (e[r]) e[r] += u;
				else e[++r] = u
			} else {
				e[++r] = null;
				o.push({
					i: r,
					x: P(l, u)
				})
			}
			;
			a = Xt.lastIndex
		}
		;
		if (a < t.length) {
			i = t.slice(a);
			if (e[r]) e[r] += i;
			else e[++r] = i
		}
		;
		return e.length < 2 ? o[0] ? (t = o[0].x, function (n) {
			return t(n) + ''
		}) : function () {
			return t
		} : (t = o.length, function (n) {
			for (var r = 0, i; r < t; ++r) e[(i = o[r]).i] = i.x(n);
			return e.join('')
		})
	};
	var Vt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
		Xt = new RegExp(Vt.source, 'g');
	n.interpolate = on;

	function on(t, e) {
		var r = n.interpolators.length,
			i;
		while (--r >= 0 && !(i = n.interpolators[r](t, e)));
		return i
	};
	n.interpolators = [function (n, t) {
		var e = typeof t;
		return (e === 'string' ? ut.has(t.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(t) ? Ze : gu : t instanceof en ? Ze : Array.isArray(t) ? qt : e === 'object' && isNaN(t) ? hu : P)(n, t)
	}];
	n.interpolateArray = qt;

	function qt(n, t) {
		var i = [],
			r = [],
			a = n.length,
			o = t.length,
			u = Math.min(n.length, t.length),
			e;
		for (e = 0; e < u; ++e) i.push(on(n[e], t[e]));
		for (; e < a; ++e) r[e] = n[e];
		for (; e < o; ++e) r[e] = t[e];
		return function (n) {
			for (e = 0; e < u; ++e) r[e] = i[e](n);
			return r
		}
	};
	var wr = function () {
			return h
		},
		wa = n.map({
			linear: wr,
			poly: Jo,
			quad: function () {
				return Xo
			},
			cubic: function () {
				return Bo
			},
			sin: function () {
				return Go
			},
			exp: function () {
				return Ko
			},
			circle: function () {
				return Qo
			},
			elastic: nl,
			back: tl,
			bounce: function () {
				return el
			}
		});
	var xa = n.map({
		'in': h,
		out: pu,
		'in-out': vu,
		'out-in': function (n) {
			return vu(pu(n))
		}
	});
	n.ease = function (n) {
		var t = n.indexOf('-'),
			e = t >= 0 ? n.slice(0, t) : n,
			r = t >= 0 ? n.slice(t + 1) : 'in';
		e = wa.get(e) || wr;
		r = xa.get(r) || h;
		return Vo(r(e.apply(null, Vr.call(arguments, 1))))
	};

	function Vo(n) {
		return function (t) {
			return t <= 0 ? 0 : t >= 1 ? 1 : n(t)
		}
	};

	function pu(n) {
		return function (t) {
			return 1 - n(1 - t)
		}
	};

	function vu(n) {
		return function (t) {
			return .5 * (t < .5 ? n(2 * t) : 2 - n(2 - 2 * t))
		}
	};

	function Xo(n) {
		return n * n
	};

	function Bo(n) {
		return n * n * n
	};

	function Wo(n) {
		if (n <= 0) return 0;
		if (n >= 1) return 1;
		var t = n * n,
			e = t * n;
		return 4 * (n < .5 ? e : 3 * (n - t) + e - .75)
	};

	function Jo(n) {
		return function (t) {
			return Math.pow(t, n)
		}
	};

	function Go(n) {
		return 1 - Math.cos(n * fπ)
	};

	function Ko(n) {
		return Math.pow(2, 10 * (n - 1))
	};

	function Qo(n) {
		return 1 - Math.sqrt(1 - n * n)
	};

	function nl(n, t) {
		var e;
		if (arguments.length < 2) t = .45;
		if (arguments.length) e = t / τ * Math.asin(1 / n);
		else n = 1, e = t / 4;
		return function (r) {
			return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * τ / t)
		}
	};

	function tl(n) {
		if (!n) n = 1.70158;
		return function (t) {
			return t * t * ((n + 1) * t - n)
		}
	};

	function el(n) {
		return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
	};
	n.interpolateHcl = rl;

	function rl(t, e) {
		t = n.hcl(t);
		e = n.hcl(e);
		var i = t.h,
			u = t.c,
			o = t.l,
			r = e.h - i,
			a = e.c - u,
			l = e.l - o;
		if (isNaN(a)) a = 0, u = isNaN(u) ? e.c : u;
		if (isNaN(r)) r = 0, i = isNaN(i) ? e.h : i;
		else if (r > 180) r -= 360;
		else if (r < -180) r += 360;
		return function (n) {
			return Me(i + r * n, u + a * n, o + l * n) + ''
		}
	};
	n.interpolateHsl = il;

	function il(t, e) {
		t = n.hsl(t);
		e = n.hsl(e);
		var i = t.h,
			u = t.s,
			o = t.l,
			r = e.h - i,
			a = e.s - u,
			l = e.l - o;
		if (isNaN(a)) a = 0, u = isNaN(u) ? e.s : u;
		if (isNaN(r)) r = 0, i = isNaN(i) ? e.h : i;
		else if (r > 180) r -= 360;
		else if (r < -180) r += 360;
		return function (n) {
			return ye(i + r * n, u + a * n, o + l * n) + ''
		}
	};
	n.interpolateLab = ul;

	function ul(t, e) {
		t = n.lab(t);
		e = n.lab(e);
		var r = t.l,
			i = t.a,
			u = t.b,
			a = e.l - r,
			o = e.a - i,
			l = e.b - u;
		return function (n) {
			return Mi(r + a * n, i + o * n, u + l * n) + ''
		}
	};
	n.interpolateRound = du;

	function du(n, t) {
		t -= n;
		return function (e) {
			return Math.round(n + t * e)
		}
	};
	n.transform = function (t) {
		var e = p.createElementNS(n.ns.prefix.svg, 'g');
		return (n.transform = function (n) {
			if (n != null) {
				e.setAttribute('transform', n);
				var t = e.transform.baseVal.consolidate()
			}
			;
			return new mu(t ? t.matrix : Ma)
		})(t)
	};

	function mu(n) {
		var t = [n.a, n.b],
			e = [n.c, n.d],
			r = Mu(t),
			i = yu(t, e),
			u = Mu(al(e, t, -i)) || 0;
		if (t[0] * e[1] < e[0] * t[1]) {
			t[0] *= -1;
			t[1] *= -1;
			r *= -1;
			i *= -1
		}
		;
		this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * o;
		this.translate = [n.e, n.f];
		this.scale = [r, u];
		this.skew = u ? Math.atan2(i, u) * o : 0
	};
	mu.prototype.toString = function () {
		return 'translate(' + this.translate + ')rotate(' + this.rotate + ')skewX(' + this.skew + ')scale(' + this.scale + ')'
	};

	function yu(n, t) {
		return n[0] * t[0] + n[1] * t[1]
	};

	function Mu(n) {
		var t = Math.sqrt(yu(n, n));
		if (t) {
			n[0] /= t;
			n[1] /= t
		}
		;
		return t
	};

	function al(n, t, e) {
		n[0] += e * t[0];
		n[1] += e * t[1];
		return n
	};
	var Ma = {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	};
	n.interpolateTransform = xu;

	function xn(n) {
		return n.length ? n.pop() + ',' : ''
	};

	function ol(n, t, e, r) {
		if (n[0] !== t[0] || n[1] !== t[1]) {
			var i = e.push('translate(', null, ',', null, ')');
			r.push({
				i: i - 4,
				x: P(n[0], t[0])
			}, {
				i: i - 2,
				x: P(n[1], t[1])
			})
		} else if (t[0] || t[1]) {
			e.push('translate(' + t + ')')
		}
	};

	function ll(n, t, e, r) {
		if (n !== t) {
			if (n - t > 180) t += 360;
			else if (t - n > 180) n += 360;
			r.push({
				i: e.push(xn(e) + 'rotate(', null, ')') - 2,
				x: P(n, t)
			})
		} else if (t) {
			e.push(xn(e) + 'rotate(' + t + ')')
		}
	};

	function fl(n, t, e, r) {
		if (n !== t) {
			r.push({
				i: e.push(xn(e) + 'skewX(', null, ')') - 2,
				x: P(n, t)
			})
		} else if (t) {
			e.push(xn(e) + 'skewX(' + t + ')')
		}
	};

	function sl(n, t, e, r) {
		if (n[0] !== t[0] || n[1] !== t[1]) {
			var i = e.push(xn(e) + 'scale(', null, ',', null, ')');
			r.push({
				i: i - 4,
				x: P(n[0], t[0])
			}, {
				i: i - 2,
				x: P(n[1], t[1])
			})
		} else if (t[0] !== 1 || t[1] !== 1) {
			e.push(xn(e) + 'scale(' + t + ')')
		}
	};

	function xu(t, e) {
		var r = [],
			i = [];
		t = n.transform(t), e = n.transform(e);
		ol(t.translate, e.translate, r, i);
		ll(t.rotate, e.rotate, r, i);
		fl(t.skew, e.skew, r, i);
		sl(t.scale, e.scale, r, i);
		t = e = null;
		return function (n) {
			var t = -1,
				u = i.length,
				e;
			while (++t < u) r[(e = i[t]).i] = e.x(n);
			return r.join('')
		}
	};

	function cl(n, t) {
		t = (t -= n = +n) || 1 / t;
		return function (e) {
			return (e - n) / t
		}
	};

	function hl(n, t) {
		t = (t -= n = +n) || 1 / t;
		return function (e) {
			return Math.max(0, Math.min(1, (e - n) / t))
		}
	};
	n.layout = {};
	n.layout.bundle = function () {
		return function (n) {
			var t = [],
				e = -1,
				r = n.length;
			while (++e < r) t.push(gl(n[e]));
			return t
		}
	};

	function gl(n) {
		var t = n.source,
			e = n.target,
			i = pl(t, e),
			r = [t];
		while (t !== i) {
			t = t.parent;
			r.push(t)
		}
		;
		var u = r.length;
		while (e !== i) {
			r.splice(u, 0, e);
			e = e.parent
		}
		;
		return r
	};

	function wu(n) {
		var e = [],
			t = n.parent;
		while (t != null) {
			e.push(n);
			n = t;
			t = t.parent
		}
		;
		e.push(n);
		return e
	};

	function pl(n, t) {
		if (n === t) return n;
		var r = wu(n),
			i = wu(t),
			e = r.pop(),
			u = i.pop(),
			a = null;
		while (e === u) {
			a = e;
			e = r.pop();
			u = i.pop()
		}
		;
		return a
	};
	n.layout.chord = function () {
		var t = {},
			e, i, u, r, a = 0,
			o, l, f;

		function s() {
			var M = {},
				m = [],
				b = n.range(r),
				x = [],
				p, s, S, t, h;
			e = [];
			i = [];
			p = 0, t = -1;
			while (++t < r) {
				s = 0, h = -1;
				while (++h < r) {
					s += u[t][h]
				}
				;
				m.push(s);
				x.push(n.range(r));
				p += s
			}
			;
			if (o) {
				b.sort(function (n, t) {
					return o(m[n], m[t])
				})
			}
			;
			if (l) {
				x.forEach(function (n, t) {
					n.sort(function (n, e) {
						return l(u[t][n], u[t][e])
					})
				})
			}
			;
			p = (τ - a * r) / p;
			s = 0, t = -1;
			while (++t < r) {
				S = s, h = -1;
				while (++h < r) {
					var g = b[t],
						y = x[g][h],
						w = u[g][y],
						k = s,
						N = s += w * p;
					M[g + '-' + y] = {
						index: g,
						subindex: y,
						startAngle: k,
						endAngle: N,
						value: w
					}
				}
				;
				i[g] = {
					index: g,
					startAngle: S,
					endAngle: s,
					value: m[g]
				};
				s += a
			}
			;
			t = -1;
			while (++t < r) {
				h = t - 1;
				while (++h < r) {
					var v = M[t + '-' + h],
						d = M[h + '-' + t];
					if (v.value || d.value) {
						e.push(v.value < d.value ? {
							source: d,
							target: v
						} : {
							source: v,
							target: d
						})
					}
				}
			}
			;
			if (f) c()
		};

		function c() {
			e.sort(function (n, t) {
				return f((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2)
			})
		};
		t.matrix = function (n) {
			if (!arguments.length) return u;
			r = (u = n) && u.length;
			e = i = null;
			return t
		};
		t.padding = function (n) {
			if (!arguments.length) return a;
			a = n;
			e = i = null;
			return t
		};
		t.sortGroups = function (n) {
			if (!arguments.length) return o;
			o = n;
			e = i = null;
			return t
		};
		t.sortSubgroups = function (n) {
			if (!arguments.length) return l;
			l = n;
			e = null;
			return t
		};
		t.sortChords = function (n) {
			if (!arguments.length) return f;
			f = n;
			if (e) c();
			return t
		};
		t.chords = function () {
			if (!e) s();
			return e
		};
		t.groups = function () {
			if (!i) s();
			return i
		};
		return t
	};
	n.layout.force = function () {
		var t = {},
			o = n.dispatch('start', 'tick', 'end'),
			l, u = [1, 1],
			c, r, g = .9,
			f = da,
			s = ma,
			a = -30,
			p = ya,
			y = .1,
			M = .64,
			e = [],
			i = [],
			v, d, m;

		function x(n) {
			return function (t, e, r, i) {
				if (t.point !== n) {
					var o = t.cx - n.x,
						l = t.cy - n.y,
						f = i - e,
						u = o * o + l * l;
					if (f * f / M < u) {
						if (u < p) {
							var a = t.charge / u;
							n.px -= o * a;
							n.py -= l * a
						}
						;
						return !0
					}
					;
					if (t.point && u && u < p) {
						var a = t.pointCharge / u;
						n.px -= o * a;
						n.py -= l * a
					}
				}
				;
				return !t.charge
			}
		};
		t.tick = function () {
			if ((r *= .99) < .005) {
				l = null;
				o.end({
					type: 'end',
					alpha: r = 0
				});
				return !0
			}
			;
			var b = e.length,
				k = i.length,
				S, f, t, c, M, w, s, h, p;
			for (f = 0; f < k; ++f) {
				t = i[f];
				c = t.source;
				M = t.target;
				h = M.x - c.x;
				p = M.y - c.y;
				if (w = h * h + p * p) {
					w = r * d[f] * ((w = Math.sqrt(w)) - v[f]) / w;
					h *= w;
					p *= w;
					M.x -= h * (s = c.weight + M.weight ? c.weight / (c.weight + M.weight) : .5);
					M.y -= p * s;
					c.x += h * (s = 1 - s);
					c.y += p * s
				}
			}
			;
			if (s = r * y) {
				h = u[0] / 2;
				p = u[1] / 2;
				f = -1;
				if (s)
					while (++f < b) {
						t = e[f];
						t.x += (h - t.x) * s;
						t.y += (p - t.y) * s
					}
			}
			;
			if (a) {
				bu(S = n.geom.quadtree(e), r, m);
				f = -1;
				while (++f < b) {
					if (!(t = e[f]).fixed) {
						S.visit(x(t))
					}
				}
			}
			;
			f = -1;
			while (++f < b) {
				t = e[f];
				if (t.fixed) {
					t.x = t.px;
					t.y = t.py
				} else {
					t.x -= (t.px - (t.px = t.x)) * g;
					t.y -= (t.py - (t.py = t.y)) * g
				}
			}
			;
			o.tick({
				type: 'tick',
				alpha: r
			})
		};
		t.nodes = function (n) {
			if (!arguments.length) return e;
			e = n;
			return t
		};
		t.links = function (n) {
			if (!arguments.length) return i;
			i = n;
			return t
		};
		t.size = function (n) {
			if (!arguments.length) return u;
			u = n;
			return t
		};
		t.linkDistance = function (n) {
			if (!arguments.length) return f;
			f = typeof n === 'function' ? n : +n;
			return t
		};
		t.distance = t.linkDistance;
		t.linkStrength = function (n) {
			if (!arguments.length) return s;
			s = typeof n === 'function' ? n : +n;
			return t
		};
		t.friction = function (n) {
			if (!arguments.length) return g;
			g = +n;
			return t
		};
		t.charge = function (n) {
			if (!arguments.length) return a;
			a = typeof n === 'function' ? n : +n;
			return t
		};
		t.chargeDistance = function (n) {
			if (!arguments.length) return Math.sqrt(p);
			p = n * n;
			return t
		};
		t.gravity = function (n) {
			if (!arguments.length) return y;
			y = +n;
			return t
		};
		t.theta = function (n) {
			if (!arguments.length) return Math.sqrt(M);
			M = n * n;
			return t
		};
		t.alpha = function (n) {
			if (!arguments.length) return r;
			n = +n;
			if (r) {
				if (n > 0) {
					r = n
				} else {
					l.c = null, l.t = NaN, l = null;
					o.end({
						type: 'end',
						alpha: r = 0
					})
				}
			} else if (n > 0) {
				o.start({
					type: 'start',
					alpha: r = n
				});
				l = dt(t.tick)
			}
			;
			return t
		};
		t.start = function () {
			var n, o = e.length,
				l = i.length,
				g = u[0],
				p = u[1],
				c, r;
			for (n = 0; n < o; ++n) {
				(r = e[n]).index = n;
				r.weight = 0
			}
			;
			for (n = 0; n < l; ++n) {
				r = i[n];
				if (typeof r.source == 'number') r.source = e[r.source];
				if (typeof r.target == 'number') r.target = e[r.target];
				++r.source.weight;
				++r.target.weight
			}
			;
			for (n = 0; n < o; ++n) {
				r = e[n];
				if (isNaN(r.x)) r.x = h('x', g);
				if (isNaN(r.y)) r.y = h('y', p);
				if (isNaN(r.px)) r.px = r.x;
				if (isNaN(r.py)) r.py = r.y
			}
			;
			v = [];
			if (typeof f === 'function')
				for (n = 0; n < l; ++n) v[n] = +f.call(this, i[n], n);
			else
				for (n = 0; n < l; ++n) v[n] = f;
			d = [];
			if (typeof s === 'function')
				for (n = 0; n < l; ++n) d[n] = +s.call(this, i[n], n);
			else
				for (n = 0; n < l; ++n) d[n] = s;
			m = [];
			if (typeof a === 'function')
				for (n = 0; n < o; ++n) m[n] = +a.call(this, e[n], n);
			else
				for (n = 0; n < o; ++n) m[n] = a;

			function h(t, e) {
				if (!c) {
					c = new Array(o);
					for (r = 0; r < o; ++r) {
						c[r] = []
					}
					;
					for (r = 0; r < l; ++r) {
						var u = i[r];
						c[u.source.index].push(u.target);
						c[u.target.index].push(u.source)
					}
				}
				;
				var a = c[n],
					r = -1,
					s = a.length,
					f;
				while (++r < s)
					if (!isNaN(f = a[r][t])) return f;
				return Math.random() * e
			};
			return t.resume()
		};
		t.resume = function () {
			return t.alpha(.1)
		};
		t.stop = function () {
			return t.alpha(0)
		};
		t.drag = function () {
			if (!c) c = n.behavior.drag().origin(h).on('dragstart.force', vl).on('drag.force', w).on('dragend.force', dl);
			if (!arguments.length) return c;
			this.on('mouseover.force', ml).on('mouseout.force', yl).call(c)
		};

		function w(e) {
			e.px = n.event.x, e.py = n.event.y;
			t.resume()
		};
		return n.rebind(t, o, 'on')
	};

	function vl(n) {
		n.fixed |= 2
	};

	function dl(n) {
		n.fixed &= ~6
	};

	function ml(n) {
		n.fixed |= 4;
		n.px = n.x, n.py = n.y
	};

	function yl(n) {
		n.fixed &= ~4
	};

	function bu(n, t, e) {
		var u = 0,
			a = 0;
		n.charge = 0;
		if (!n.leaf) {
			var o = n.nodes,
				f = o.length,
				l = -1,
				r;
			while (++l < f) {
				r = o[l];
				if (r == null) continue;
				bu(r, t, e);
				n.charge += r.charge;
				u += r.charge * r.cx;
				a += r.charge * r.cy
			}
		}
		;
		if (n.point) {
			if (!n.leaf) {
				n.point.x += Math.random() - .5;
				n.point.y += Math.random() - .5
			}
			;
			var i = t * e[n.point.index];
			n.charge += n.pointCharge = i;
			u += i * n.point.x;
			a += i * n.point.y
		}
		;
		n.cx = u / n.charge;
		n.cy = a / n.charge
	};
	var da = 20,
		ma = 1,
		ya = Infinity;
	n.layout.hierarchy = function () {
		var e = wl,
			r = Ml,
			t = xl;

		function n(i) {
			var f = [i],
				s = [],
				u;
			i.depth = 0;
			while ((u = f.pop()) != null) {
				s.push(u);
				if ((a = r.call(n, u, u.depth)) && (o = a.length)) {
					var o, a, l;
					while (--o >= 0) {
						f.push(l = a[o]);
						l.parent = u;
						l.depth = u.depth + 1
					}
					;
					if (t) u.value = 0;
					u.children = a
				} else {
					if (t) u.value = +t.call(n, u, u.depth) || 0;
					delete u.children
				}
			}
			;
			A(i, function (n) {
				var r, i;
				if (e && (r = n.children)) r.sort(e);
				if (t && (i = n.parent)) i.value += n.value
			});
			return s
		};
		n.sort = function (t) {
			if (!arguments.length) return e;
			e = t;
			return n
		};
		n.children = function (t) {
			if (!arguments.length) return r;
			r = t;
			return n
		};
		n.value = function (e) {
			if (!arguments.length) return t;
			t = e;
			return n
		};
		n.revalue = function (e) {
			if (t) {
				Pn(e, function (n) {
					if (n.children) n.value = 0
				});
				A(e, function (e) {
					var r;
					if (!e.children) e.value = +t.call(n, e, e.depth) || 0;
					if (r = e.parent) r.value += e.value
				})
			}
			;
			return e
		};
		return n
	};

	function In(t, e) {
		n.rebind(t, e, 'sort', 'children', 'value');
		t.nodes = t;
		t.links = bl;
		return t
	};

	function Pn(n, t) {
		var i = [n];
		while ((n = i.pop()) != null) {
			t(n);
			if ((r = n.children) && (e = r.length)) {
				var e, r;
				while (--e >= 0) i.push(r[e])
			}
		}
	};

	function A(n, t) {
		var u = [n],
			a = [];
		while ((n = u.pop()) != null) {
			a.push(n);
			if ((e = n.children) && (i = e.length)) {
				var r = -1,
					i, e;
				while (++r < i) u.push(e[r])
			}
		}
		while ((n = a.pop()) != null) {
			t(n)
		}
	};

	function Ml(n) {
		return n.children
	};

	function xl(n) {
		return n.value
	};

	function wl(n, t) {
		return t.value - n.value
	};

	function bl(t) {
		return n.merge(t.map(function (n) {
			return (n.children || []).map(function (t) {
				return {
					source: n,
					target: t
				}
			})
		}))
	};
	n.layout.partition = function () {
		var r = n.layout.hierarchy(),
			t = [1, 1];

		function i(n, t, e, r) {
			var u = n.children;
			n.x = t;
			n.y = n.depth * r;
			n.dx = e;
			n.dy = r;
			if (u && (o = u.length)) {
				var a = -1,
					o, l, f;
				e = n.value ? e / n.value : 0;
				while (++a < o) {
					i(l = u[a], t, f = l.value * e, r);
					t += f
				}
			}
		};

		function u(n) {
			var t = n.children,
				e = 0;
			if (t && (i = t.length)) {
				var r = -1,
					i;
				while (++r < i) e = Math.max(e, u(t[r]))
			}
			;
			return 1 + e
		};

		function e(n, e) {
			var a = r.call(this, n, e);
			i(a[0], 0, t[0], t[1] / u(a[0]));
			return a
		};
		e.size = function (n) {
			if (!arguments.length) return t;
			t = n;
			return e
		};
		return In(e, r)
	};
	n.layout.pie = function () {
		var a = Number,
			e = xr,
			r = 0,
			i = τ,
			u = 0;

		function t(o) {
			var f = o.length,
				l = o.map(function (n, e) {
					return +a.call(t, n, e)
				}),
				s = +(typeof r === 'function' ? r.apply(this, arguments) : r),
				c = (typeof i === 'function' ? i.apply(this, arguments) : i) - s,
				h = Math.min(Math.abs(c) / f, +(typeof u === 'function' ? u.apply(this, arguments) : u)),
				g = h * (c < 0 ? -1 : 1),
				p = n.sum(l),
				y = p ? (c - f * g) / p : 0,
				v = n.range(f),
				d = [],
				m;
			if (e != null) v.sort(e === xr ? function (n, t) {
				return l[t] - l[n]
			} : function (n, t) {
				return e(o[n], o[t])
			});
			v.forEach(function (n) {
				d[n] = {
					data: o[n],
					value: m = l[n],
					startAngle: s,
					endAngle: s += m * y + g,
					padAngle: h
				}
			});
			return d
		};
		t.value = function (n) {
			if (!arguments.length) return a;
			a = n;
			return t
		};
		t.sort = function (n) {
			if (!arguments.length) return e;
			e = n;
			return t
		};
		t.startAngle = function (n) {
			if (!arguments.length) return r;
			r = n;
			return t
		};
		t.endAngle = function (n) {
			if (!arguments.length) return i;
			i = n;
			return t
		};
		t.padAngle = function (n) {
			if (!arguments.length) return u;
			u = n;
			return t
		};
		return t
	};
	var xr = {};
	n.layout.stack = function () {
		var r = h,
			i = Ve,
			u = Xe,
			e = Nl,
			a = Sl,
			o = kl;

		function t(l, f) {
			if (!(p = l.length)) return l;
			var g = l.map(function (n, e) {
					return r.call(t, n, e)
				}),
				c = g.map(function (n) {
					return n.map(function (n, e) {
						return [a.call(t, n, e), o.call(t, n, e)]
					})
				}),
				d = i.call(t, c, f);
			g = n.permute(g, d);
			c = n.permute(c, d);
			var m = u.call(t, c, f),
				y = g[0].length,
				p, h, s, v;
			for (s = 0; s < y; ++s) {
				e.call(t, g[0][s], v = m[s], c[0][s][1]);
				for (h = 1; h < p; ++h) {
					e.call(t, g[h][s], v += c[h - 1][s][1], c[h][s][1])
				}
			}
			;
			return l
		};
		t.values = function (n) {
			if (!arguments.length) return r;
			r = n;
			return t
		};
		t.order = function (n) {
			if (!arguments.length) return i;
			i = typeof n === 'function' ? n : va.get(n) || Ve;
			return t
		};
		t.offset = function (n) {
			if (!arguments.length) return u;
			u = typeof n === 'function' ? n : pa.get(n) || Xe;
			return t
		};
		t.x = function (n) {
			if (!arguments.length) return a;
			a = n;
			return t
		};
		t.y = function (n) {
			if (!arguments.length) return o;
			o = n;
			return t
		};
		t.out = function (n) {
			if (!arguments.length) return e;
			e = n;
			return t
		};
		return t
	};

	function Sl(n) {
		return n.x
	};

	function kl(n) {
		return n.y
	};

	function Nl(n, t, e) {
		n.y0 = t;
		n.y = e
	};
	var va = n.map({
		'inside-out': function (t) {
			var i = t.length,
				r, e, u = t.map(El),
				a = t.map(Al),
				c = n.range(i).sort(function (n, t) {
					return u[n] - u[t]
				}),
				o = 0,
				l = 0,
				f = [],
				s = [];
			for (r = 0; r < i; ++r) {
				e = c[r];
				if (o < l) {
					o += a[e];
					f.push(e)
				} else {
					l += a[e];
					s.push(e)
				}
			}
			;
			return s.reverse().concat(f)
		},
		reverse: function (t) {
			return n.range(t.length).reverse()
		},
		'default': Ve
	});
	var pa = n.map({
		silhouette: function (n) {
			var l = n.length,
				u = n[0].length,
				a = [],
				i = 0,
				r, t, e, o = [];
			for (t = 0; t < u; ++t) {
				for (r = 0, e = 0; r < l; r++) e += n[r][t][1];
				if (e > i) i = e;
				a.push(e)
			}
			;
			for (t = 0; t < u; ++t) {
				o[t] = (i - a[t]) / 2
			}
			;
			return o
		},
		wiggle: function (n) {
			var h = n.length,
				f = n[0],
				g = f.length,
				e, t, r, i, s, c, u, a, o, l = [];
			l[0] = a = o = 0;
			for (t = 1; t < g; ++t) {
				for (e = 0, i = 0; e < h; ++e) i += n[e][t][1];
				for (e = 0, s = 0, u = f[t][0] - f[t - 1][0]; e < h; ++e) {
					for (r = 0, c = (n[e][t][1] - n[e][t - 1][1]) / (2 * u); r < e; ++r) {
						c += (n[r][t][1] - n[r][t - 1][1]) / u
					}
					;
					s += c * n[e][t][1]
				}
				;
				l[t] = a -= i ? s / i * u : 0;
				if (a < o) o = a
			}
			;
			for (t = 0; t < g; ++t) l[t] -= o;
			return l
		},
		expand: function (n) {
			var r = n.length,
				u = n[0].length,
				o = 1 / r,
				t, e, i, a = [];
			for (e = 0; e < u; ++e) {
				for (t = 0, i = 0; t < r; t++) i += n[t][e][1];
				if (i)
					for (t = 0; t < r; t++) n[t][e][1] /= i;
				else
					for (t = 0; t < r; t++) n[t][e][1] = o
			}
			;
			for (e = 0; e < u; ++e) a[e] = 0;
			return a
		},
		zero: Xe
	});

	function Ve(t) {
		return n.range(t.length)
	};

	function Xe(n) {
		var t = -1,
			r = n[0].length,
			e = [];
		while (++t < r) e[t] = 0;
		return e
	};

	function El(n) {
		var t = 1,
			e = 0,
			r = n[0][1],
			i, u = n.length;
		for (; t < u; ++t) {
			if ((i = n[t][1]) > r) {
				e = t;
				r = i
			}
		}
		;
		return e
	};

	function Al(n) {
		return n.reduce(Cl, 0)
	};

	function Cl(n, t) {
		return n + t[1]
	};
	n.layout.histogram = function () {
		var e = !0,
			r = Number,
			i = Ll,
			u = zl;

		function t(t, a) {
			var c = [],
				l = t.map(r, this),
				h = i.call(this, l, a),
				f = u.call(this, h, l, a),
				o, a = -1,
				p = l.length,
				g = f.length - 1,
				v = e ? 1 : 1 / p,
				s;
			while (++a < g) {
				o = c[a] = [];
				o.dx = f[a + 1] - (o.x = f[a]);
				o.y = 0
			}
			;
			if (g > 0) {
				a = -1;
				while (++a < p) {
					s = l[a];
					if (s >= h[0] && s <= h[1]) {
						o = c[n.bisect(f, s, 1, g) - 1];
						o.y += v;
						o.push(t[a])
					}
				}
			}
			;
			return c
		};
		t.value = function (n) {
			if (!arguments.length) return r;
			r = n;
			return t
		};
		t.range = function (n) {
			if (!arguments.length) return i;
			i = a(n);
			return t
		};
		t.bins = function (n) {
			if (!arguments.length) return u;
			u = typeof n === 'number' ? function (t) {
				return Su(t, n)
			} : a(n);
			return t
		};
		t.frequency = function (n) {
			if (!arguments.length) return e;
			e = !!n;
			return t
		};
		return t
	};

	function zl(n, t) {
		return Su(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1))
	};

	function Su(n, t) {
		var e = -1,
			r = +n[0],
			u = (n[1] - r) / t,
			i = [];
		while (++e <= t) i[e] = u * e + r;
		return i
	};

	function Ll(t) {
		return [n.min(t), n.max(t)]
	};
	n.layout.pack = function () {
		var u = n.layout.hierarchy().sort(ql),
			r = 0,
			i = [1, 1],
			t;

		function e(n, e) {
			var s = u.call(this, n, e),
				a = s[0],
				o = i[0],
				l = i[1],
				c = t == null ? Math.sqrt : typeof t === 'function' ? t : function () {
					return t
				};
			a.x = a.y = 0;
			A(a, function (n) {
				n.r = +c(n.value)
			});
			A(a, Eu);
			if (r) {
				var f = r * (t ? 1 : Math.max(2 * a.r / o, 2 * a.r / l)) / 2;
				A(a, function (n) {
					n.r += f
				});
				A(a, Eu);
				A(a, function (n) {
					n.r -= f
				})
			}
			;
			Au(a, o / 2, l / 2, t ? 1 : 1 / Math.max(2 * a.r / o, 2 * a.r / l));
			return s
		};
		e.size = function (n) {
			if (!arguments.length) return i;
			i = n;
			return e
		};
		e.radius = function (n) {
			if (!arguments.length) return t;
			t = n == null || typeof n === 'function' ? n : +n;
			return e
		};
		e.padding = function (n) {
			if (!arguments.length) return r;
			r = +n;
			return e
		};
		return In(e, u)
	};

	function ql(n, t) {
		return n.value - t.value
	};

	function Be(n, t) {
		var e = n._pack_next;
		n._pack_next = t;
		t._pack_prev = n;
		t._pack_next = e;
		e._pack_prev = t
	};

	function ku(n, t) {
		n._pack_next = t;
		t._pack_prev = n
	};

	function Nu(n, t) {
		var e = t.x - n.x,
			r = t.y - n.y,
			i = n.r + t.r;
		return .999 * i * i > e * e + r * r
	};

	function Eu(n) {
		if (!(i = n.children) || !(l = i.length)) return;
		var i, p = Infinity,
			v = -Infinity,
			d = Infinity,
			m = -Infinity,
			e, r, t, u, a, o, l;

		function f(n) {
			p = Math.min(n.x - n.r, p);
			v = Math.max(n.x + n.r, v);
			d = Math.min(n.y - n.r, d);
			m = Math.max(n.y + n.r, m)
		};
		i.forEach(Tl);
		e = i[0];
		e.x = -e.r;
		e.y = 0;
		f(e);
		if (l > 1) {
			r = i[1];
			r.x = r.r;
			r.y = 0;
			f(r);
			if (l > 2) {
				t = i[2];
				Cu(e, r, t);
				f(t);
				Be(e, t);
				e._pack_prev = t;
				Be(t, r);
				r = e._pack_next;
				for (u = 3; u < l; u++) {
					Cu(e, r, t = i[u]);
					var c = 0,
						h = 1,
						g = 1;
					for (a = r._pack_next; a !== r; a = a._pack_next, h++) {
						if (Nu(a, t)) {
							c = 1;
							break
						}
					}
					;
					if (c == 1) {
						for (o = e._pack_prev; o !== a._pack_prev; o = o._pack_prev, g++) {
							if (Nu(o, t)) {
								break
							}
						}
					}
					;
					if (c) {
						if (h < g || h == g && r.r < e.r) ku(e, r = a);
						else ku(e = o, r);
						u--
					} else {
						Be(e, t);
						r = t;
						f(t)
					}
				}
			}
		}
		;
		var y = (p + v) / 2,
			M = (d + m) / 2,
			s = 0;
		for (u = 0; u < l; u++) {
			t = i[u];
			t.x -= y;
			t.y -= M;
			s = Math.max(s, t.r + Math.sqrt(t.x * t.x + t.y * t.y))
		}
		;
		n.r = s;
		i.forEach(Rl)
	};

	function Tl(n) {
		n._pack_next = n._pack_prev = n
	};

	function Rl(n) {
		delete n._pack_next;
		delete n._pack_prev
	};

	function Au(n, t, e, r) {
		var i = n.children;
		n.x = t += r * n.x;
		n.y = e += r * n.y;
		n.r *= r;
		if (i) {
			var u = -1,
				a = i.length;
			while (++u < a) Au(i[u], t, e, r)
		}
	};

	function Cu(n, t, e) {
		var r = n.r + e.r,
			u = t.x - n.x,
			a = t.y - n.y;
		if (r && (u || a)) {
			var i = t.r + e.r,
				o = u * u + a * a;
			i *= i;
			r *= r;
			var l = .5 + (r - i) / (2 * o),
				f = Math.sqrt(Math.max(0, 2 * i * (r + o) - (r -= o) * r - i * i)) / (2 * o);
			e.x = n.x + l * u + f * a;
			e.y = n.y + l * a - f * u
		} else {
			e.x = n.x + r;
			e.y = n.y
		}
	};
	n.layout.tree = function () {
		var a = n.layout.hierarchy().sort(null).value(null),
			e = zu,
			t = [1, 1],
			i = null;

		function r(n, r) {
			var d = a.call(this, n, r),
				s = d[0],
				g = o(s);
			A(g, l), g.parent.m = -g.z;
			Pn(g, f);
			if (i) Pn(s, u);
			else {
				var c = s,
					h = s,
					p = s;
				Pn(s, function (n) {
					if (n.x < c.x) c = n;
					if (n.x > h.x) h = n;
					if (n.depth > p.depth) p = n
				});
				var v = e(c, h) / 2 - c.x,
					m = t[0] / (h.x + e(h, c) / 2 + v),
					y = t[1] / (p.depth || 1);
				Pn(s, function (n) {
					n.x = (n.x + v) * m;
					n.y = n.depth * y
				})
			}
			;
			return d
		};

		function o(n) {
			var u = {
					A: null,
					children: [n]
				},
				a = [u],
				i;
			while ((i = a.pop()) != null) {
				for (var e = i.children, r, t = 0, o = e.length; t < o; ++t) {
					a.push((e[t] = r = {
						_: e[t],
						parent: i,
						children: (r = e[t].children) && r.slice() || [],
						A: null,
						a: null,
						z: 0,
						m: 0,
						c: 0,
						s: 0,
						t: null,
						i: t
					}).a = r)
				}
			}
			;
			return u.children[0]
		};

		function l(n) {
			var r = n.children,
				u = n.parent.children,
				t = n.i ? u[n.i - 1] : null;
			if (r.length) {
				Il(n);
				var i = (r[0].z + r[r.length - 1].z) / 2;
				if (t) {
					n.z = t.z + e(n._, t._);
					n.m = n.z - i
				} else {
					n.z = i
				}
			} else if (t) {
				n.z = t.z + e(n._, t._)
			}
			;
			n.parent.A = s(n, t, n.parent.A || u[0])
		};

		function f(n) {
			n._.x = n.z + n.parent.m;
			n.m += n.parent.m
		};

		function s(n, t, r) {
			if (t) {
				var i = n,
					a = n,
					u = t,
					o = i.parent.children[0],
					f = i.m,
					s = a.m,
					c = u.m,
					h = o.m,
					l;
				while (u = Je(u), i = We(i), u && i) {
					o = We(o);
					a = Je(a);
					a.a = n;
					l = u.z + c - i.z - f + e(u._, i._);
					if (l > 0) {
						Dl(Pl(u, n, r), n, l);
						f += l;
						s += l
					}
					;
					c += u.m;
					f += i.m;
					h += o.m;
					s += a.m
				}
				;
				if (u && !Je(a)) {
					a.t = u;
					a.m += c - s
				}
				;
				if (i && !We(o)) {
					o.t = i;
					o.m += f - h;
					r = n
				}
			}
			;
			return r
		};

		function u(n) {
			n.x *= t[0];
			n.y = n.depth * t[1]
		};
		r.separation = function (n) {
			if (!arguments.length) return e;
			e = n;
			return r
		};
		r.size = function (n) {
			if (!arguments.length) return i ? null : t;
			i = (t = n) == null ? u : null;
			return r
		};
		r.nodeSize = function (n) {
			if (!arguments.length) return i ? t : null;
			i = (t = n) == null ? null : u;
			return r
		};
		return In(r, a)
	};

	function zu(n, t) {
		return n.parent == t.parent ? 1 : 2
	};

	function We(n) {
		var t = n.children;
		return t.length ? t[0] : n.t
	};

	function Je(n) {
		var t = n.children,
			e;
		return (e = t.length) ? t[e - 1] : n.t
	};

	function Dl(n, t, e) {
		var r = e / (t.i - n.i);
		t.c -= r;
		t.s += e;
		n.c += r;
		t.z += e;
		t.m += e
	};

	function Il(n) {
		var e = 0,
			u = 0,
			r = n.children,
			i = r.length,
			t;
		while (--i >= 0) {
			t = r[i];
			t.z += e;
			t.m += e;
			e += t.s + (u += t.c)
		}
	};

	function Pl(n, t, e) {
		return n.a.parent === t.parent ? n.a : e
	};
	n.layout.cluster = function () {
		var u = n.layout.hierarchy().sort(null).value(null),
			r = zu,
			t = [1, 1],
			i = !1;

		function e(n, e) {
			var c = u.call(this, n, e),
				a = c[0],
				f, g = 0;
			A(a, function (n) {
				var t = n.children;
				if (t && t.length) {
					n.x = jl(t);
					n.y = Ul(t)
				} else {
					n.x = f ? g += r(n, f) : 0;
					n.y = 0;
					f = n
				}
			});
			var o = Lu(a),
				l = qu(a),
				s = o.x - r(o, l) / 2,
				h = l.x + r(l, o) / 2;
			A(a, i ? function (n) {
				n.x = (n.x - a.x) * t[0];
				n.y = (a.y - n.y) * t[1]
			} : function (n) {
				n.x = (n.x - s) / (h - s) * t[0];
				n.y = (1 - (a.y ? n.y / a.y : 1)) * t[1]
			});
			return c
		};
		e.separation = function (n) {
			if (!arguments.length) return r;
			r = n;
			return e
		};
		e.size = function (n) {
			if (!arguments.length) return i ? null : t;
			i = (t = n) == null;
			return e
		};
		e.nodeSize = function (n) {
			if (!arguments.length) return i ? t : null;
			i = (t = n) != null;
			return e
		};
		return In(e, u)
	};

	function Ul(t) {
		return 1 + n.max(t, function (n) {
				return n.y
			})
	};

	function jl(n) {
		return n.reduce(function (n, t) {
				return n + t.x
			}, 0) / n.length
	};

	function Lu(n) {
		var t = n.children;
		return t && t.length ? Lu(t[0]) : n
	};

	function qu(n) {
		var t = n.children,
			e;
		return t && (e = t.length) ? qu(t[e - 1]) : n
	};
	n.layout.treemap = function () {
		var o = n.layout.hierarchy(),
			r = Math.round,
			u = [1, 1],
			h = null,
			l = Ge,
			f = !1,
			i, e = 'squarify',
			a = .5 * (1 + Math.sqrt(5));

		function s(n, t) {
			var r = -1,
				u = n.length,
				i, e;
			while (++r < u) {
				e = (i = n[r]).value * (t < 0 ? 0 : t);
				i.area = isNaN(e) || e <= 0 ? 0 : e
			}
		};

		function g(n) {
			var a = n.children;
			if (a && a.length) {
				var r = l(n),
					t = [],
					i = a.slice(),
					f, o = Infinity,
					h, u = e === 'slice' ? r.dx : e === 'dice' ? r.dy : e === 'slice-dice' ? n.depth & 1 ? r.dy : r.dx : Math.min(r.dx, r.dy),
					p;
				s(i, r.dx * r.dy / n.value);
				t.area = 0;
				while ((p = i.length) > 0) {
					t.push(f = i[p - 1]);
					t.area += f.area;
					if (e !== 'squarify' || (h = v(t, u)) <= o) {
						i.pop();
						o = h
					} else {
						t.area -= t.pop().area;
						c(t, u, r, !1);
						u = Math.min(r.dx, r.dy);
						t.length = t.area = 0;
						o = Infinity
					}
				}
				;
				if (t.length) {
					c(t, u, r, !0);
					t.length = t.area = 0
				}
				;
				a.forEach(g)
			}
		};

		function p(n) {
			var i = n.children;
			if (i && i.length) {
				var e = l(n),
					u = i.slice(),
					r, t = [];
				s(u, e.dx * e.dy / n.value);
				t.area = 0;
				while (r = u.pop()) {
					t.push(r);
					t.area += r.area;
					if (r.z != null) {
						c(t, r.z ? e.dx : e.dy, e, !u.length);
						t.length = t.area = 0
					}
				}
				;
				i.forEach(p)
			}
		};

		function v(n, t) {
			var e = n.area,
				r, i = 0,
				u = Infinity,
				o = -1,
				l = n.length;
			while (++o < l) {
				if (!(r = n[o].area)) continue;
				if (r < u) u = r;
				if (r > i) i = r
			}
			;
			e *= e;
			t *= t;
			return e ? Math.max(t * i * a / e, e / (t * u * a)) : Infinity
		};

		function c(n, t, e, i) {
			var f = -1,
				s = n.length,
				o = e.x,
				l = e.y,
				a = t ? r(n.area / t) : 0,
				u;
			if (t == e.dx) {
				if (i || a > e.dy) a = e.dy;
				while (++f < s) {
					u = n[f];
					u.x = o;
					u.y = l;
					u.dy = a;
					o += u.dx = Math.min(e.x + e.dx - o, a ? r(u.area / a) : 0)
				}
				;
				u.z = !0;
				u.dx += e.x + e.dx - o;
				e.y += a;
				e.dy -= a
			} else {
				if (i || a > e.dx) a = e.dx;
				while (++f < s) {
					u = n[f];
					u.x = o;
					u.y = l;
					u.dx = a;
					l += u.dy = Math.min(e.y + e.dy - l, a ? r(u.area / a) : 0)
				}
				;
				u.z = !1;
				u.dy += e.y + e.dy - l;
				e.x += a;
				e.dx -= a
			}
		};

		function t(n) {
			var e = i || o(n),
				t = e[0];
			t.x = t.y = 0;
			if (t.value) t.dx = u[0], t.dy = u[1];
			else t.dx = t.dy = 0;
			if (i) o.revalue(t);
			s([t], t.dx * t.dy / t.value);
			(i ? p : g)(t);
			if (f) i = e;
			return e
		};
		t.size = function (n) {
			if (!arguments.length) return u;
			u = n;
			return t
		};
		t.padding = function (n) {
			if (!arguments.length) return h;

			function i(e) {
				var r = n.call(t, e, e.depth);
				return r == null ? Ge(e) : Tu(e, typeof r === 'number' ? [r, r, r, r] : r)
			};

			function r(t) {
				return Tu(t, n)
			};
			var e;
			l = (h = n) == null ? Ge : (e = typeof n) === 'function' ? i : e === 'number' ? (n = [n, n, n, n], r) : r;
			return t
		};
		t.round = function (n) {
			if (!arguments.length) return r != Number;
			r = n ? Math.round : Number;
			return t
		};
		t.sticky = function (n) {
			if (!arguments.length) return f;
			f = n;
			i = null;
			return t
		};
		t.ratio = function (n) {
			if (!arguments.length) return a;
			a = n;
			return t
		};
		t.mode = function (n) {
			if (!arguments.length) return e;
			e = n + '';
			return t
		};
		return In(t, o)
	};

	function Ge(n) {
		return {
			x: n.x,
			y: n.y,
			dx: n.dx,
			dy: n.dy
		}
	};

	function Tu(n, t) {
		var i = n.x + t[3],
			u = n.y + t[0],
			e = n.dx - t[1] - t[3],
			r = n.dy - t[0] - t[2];
		if (e < 0) {
			i += e / 2;
			e = 0
		}
		;
		if (r < 0) {
			u += r / 2;
			r = 0
		}
		;
		return {
			x: i,
			y: u,
			dx: e,
			dy: r
		}
	};
	n.random = {
		normal: function (µ, σ) {
			var e = arguments.length;
			if (e < 2) σ = 1;
			if (e < 1) µ = 0;
			return function () {
				var t, e, n;
				do {
					t = Math.random() * 2 - 1;
					e = Math.random() * 2 - 1;
					n = t * t + e * e
				}
				while (!n || n > 1);
				return µ + σ * t * Math.sqrt(-2 * Math.log(n) / n)
			}
		},
		logNormal: function () {
			var t = n.random.normal.apply(n, arguments);
			return function () {
				return Math.exp(t())
			}
		},
		bates: function (t) {
			var e = n.random.irwinHall(t);
			return function () {
				return e() / t
			}
		},
		irwinHall: function (n) {
			return function () {
				for (var t = 0, e = 0; e < n; e++) t += Math.random();
				return t
			}
		}
	};
	n.scale = {};

	function wn(n) {
		var t = n[0],
			e = n[n.length - 1];
		return t < e ? [t, e] : [e, t]
	};

	function Tt(n) {
		return n.rangeExtent ? n.rangeExtent() : wn(n.range())
	};

	function Fl(n, t, e, r) {
		var i = e(n[0], n[1]),
			u = r(t[0], t[1]);
		return function (n) {
			return u(i(n))
		}
	};

	function Rt(n, t) {
		var e = 0,
			r = n.length - 1,
			i = n[e],
			u = n[r],
			a;
		if (u < i) {
			a = e, e = r, r = a;
			a = i, i = u, u = a
		}
		;
		n[e] = t.floor(i);
		n[r] = t.ceil(u);
		return n
	};

	function Ru(n) {
		return n ? {
			floor: function (t) {
				return Math.floor(t / n) * n
			},
			ceil: function (t) {
				return Math.ceil(t / n) * n
			}
		} : ga
	};
	var ga = {
		floor: h,
		ceil: h
	};

	function Hl(t, e, r, i) {
		var o = [],
			l = [],
			u = 0,
			a = Math.min(t.length, e.length) - 1;
		if (t[a] < t[0]) {
			t = t.slice().reverse();
			e = e.slice().reverse()
		}
		while (++u <= a) {
			o.push(r(t[u - 1], t[u]));
			l.push(i(e[u - 1], e[u]))
		}
		;
		return function (e) {
			var r = n.bisect(t, e, 1, a) - 1;
			return l[r](o[r](e))
		}
	};
	n.scale.linear = function () {
		return Du([0, 1], [0, 1], on, !1)
	};

	function Du(n, t, e, r) {
		var a, o;

		function u() {
			var u = Math.min(n.length, t.length) > 2 ? Hl : Fl,
				l = r ? hl : cl;
			a = u(n, t, l, e);
			o = u(t, n, l, on);
			return i
		};

		function i(n) {
			return a(n)
		};
		i.invert = function (n) {
			return o(n)
		};
		i.domain = function (t) {
			if (!arguments.length) return n;
			n = t.map(Number);
			return u()
		};
		i.range = function (n) {
			if (!arguments.length) return t;
			t = n;
			return u()
		};
		i.rangeRound = function (n) {
			return i.range(n).interpolate(du)
		};
		i.clamp = function (n) {
			if (!arguments.length) return r;
			r = n;
			return u()
		};
		i.interpolate = function (n) {
			if (!arguments.length) return e;
			e = n;
			return u()
		};
		i.ticks = function (t) {
			return Qe(n, t)
		};
		i.tickFormat = function (t, e) {
			return nr(n, t, e)
		};
		i.nice = function (t) {
			Iu(n, t);
			return u()
		};
		i.copy = function () {
			return Du(n, t, e, r)
		};
		return u()
	};

	function Ke(t, e) {
		return n.rebind(t, e, 'range', 'rangeRound', 'interpolate', 'clamp')
	};

	function Iu(n, t) {
		Rt(n, Ru(bn(n, t)[2]));
		Rt(n, Ru(bn(n, t)[2]));
		return n
	};

	function bn(n, t) {
		if (t == null) t = 10;
		var r = wn(n),
			u = r[1] - r[0],
			e = Math.pow(10, Math.floor(Math.log(u / t) / Math.LN10)),
			i = t / u * e;
		if (i <= .15) e *= 10;
		else if (i <= .35) e *= 5;
		else if (i <= .75) e *= 2;
		r[0] = Math.ceil(r[0] / e) * e;
		r[1] = Math.floor(r[1] / e) * e + e * .5;
		r[2] = e;
		return r
	};

	function Qe(t, e) {
		return n.range.apply(n, bn(t, e))
	};

	function nr(t, e, i) {
		var a = bn(t, e);
		if (i) {
			var u = Ir.exec(i);
			u.shift();
			if (u[8] === 's') {
				var o = n.formatPrefix(Math.max(r(a[0]), r(a[1])));
				if (!u[7]) u[7] = '.' + Dt(o.scale(a[2]));
				u[8] = 'f';
				i = n.format(u.join(''));
				return function (n) {
					return i(o.scale(n)) + o.symbol
				}
			}
			;
			if (!u[7]) u[7] = '.' + Ol(u[8], a);
			i = u.join('')
		} else {
			i = ',.' + Dt(a[2]) + 'f'
		}
		;
		return n.format(i)
	};
	var ha = {
		s: 1,
		g: 1,
		p: 1,
		r: 1,
		e: 1
	};

	function Dt(n) {
		return -Math.floor(Math.log(n) / Math.LN10 + .01)
	};

	function Ol(n, t) {
		var e = Dt(t[2]);
		return n in ha ? Math.abs(e - Dt(Math.max(r(t[0]), r(t[1])))) + +(n !== 'e') : e - (n === '%') * 2
	};
	n.scale.log = function () {
		return Pu(n.scale.linear().domain([0, 1]), 10, !0, [1, 10])
	};

	function Pu(t, e, r, i) {
		function a(n) {
			return (r ? Math.log(n < 0 ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(e)
		};

		function o(n) {
			return r ? Math.pow(e, n) : -Math.pow(e, -n)
		};

		function u(n) {
			return t(a(n))
		};
		u.invert = function (n) {
			return o(t.invert(n))
		};
		u.domain = function (n) {
			if (!arguments.length) return i;
			r = n[0] >= 0;
			t.domain((i = n.map(Number)).map(a));
			return u
		};
		u.base = function (n) {
			if (!arguments.length) return e;
			e = +n;
			t.domain(i.map(a));
			return u
		};
		u.nice = function () {
			var n = Rt(i.map(a), r ? Math : ca);
			t.domain(n);
			i = n.map(o);
			return u
		};
		u.ticks = function () {
			var f = wn(i),
				t = [],
				s = f[0],
				c = f[1],
				n = Math.floor(a(s)),
				l = Math.ceil(a(c)),
				h = e % 1 ? 2 : e;
			if (isFinite(l - n)) {
				if (r) {
					for (; n < l; n++)
						for (var u = 1; u < h; u++) t.push(o(n) * u);
					t.push(o(n))
				} else {
					t.push(o(n));
					for (; n++ < l;)
						for (var u = h - 1; u > 0; u--) t.push(o(n) * u)
				}
				;
				for (n = 0; t[n] < s; n++) {
				}
				;
				for (l = t.length; t[l - 1] > c; l--) {
				}
				;
				t = t.slice(n, l)
			}
			;
			return t
		};
		u.tickFormat = function (t, r) {
			if (!arguments.length) return Mr;
			if (arguments.length < 2) r = Mr;
			else if (typeof r !== 'function') r = n.format(r);
			var i = Math.max(1, e * t / u.ticks().length);
			return function (n) {
				var t = n / o(Math.round(a(n)));
				if (t * e < e - .5) t *= e;
				return t <= i ? r(n) : ''
			}
		};
		u.copy = function () {
			return Pu(t.copy(), e, r, i)
		};
		return Ke(u, t)
	};
	var Mr = n.format('.0e'),
		ca = {
			floor: function (n) {
				return -Math.ceil(-n)
			},
			ceil: function (n) {
				return -Math.floor(-n)
			}
		};
	n.scale.pow = function () {
		return Uu(n.scale.linear(), 1, [0, 1])
	};

	function Uu(n, t, e) {
		var i = It(t),
			u = It(1 / t);

		function r(t) {
			return n(i(t))
		};
		r.invert = function (t) {
			return u(n.invert(t))
		};
		r.domain = function (t) {
			if (!arguments.length) return e;
			n.domain((e = t.map(Number)).map(i));
			return r
		};
		r.ticks = function (n) {
			return Qe(e, n)
		};
		r.tickFormat = function (n, t) {
			return nr(e, n, t)
		};
		r.nice = function (n) {
			return r.domain(Iu(e, n))
		};
		r.exponent = function (a) {
			if (!arguments.length) return t;
			i = It(t = a);
			u = It(1 / t);
			n.domain(e.map(i));
			return r
		};
		r.copy = function () {
			return Uu(n.copy(), t, e)
		};
		return Ke(r, n)
	};

	function It(n) {
		return function (t) {
			return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
		}
	};
	n.scale.sqrt = function () {
		return n.scale.pow().exponent(.5)
	};
	n.scale.ordinal = function () {
		return ju([], {
			t: 'range',
			a: [
				[]
			]
		})
	};

	function ju(t, e) {
		var a, i, u;

		function r(n) {
			return i[((a.get(n) || (e.t === 'range' ? a.set(n, t.push(n)) : NaN)) - 1) % i.length]
		};

		function o(e, r) {
			return n.range(t.length).map(function (n) {
				return e + r * n
			})
		};
		r.domain = function (n) {
			if (!arguments.length) return t;
			t = [];
			a = new T();
			var u = -1,
				o = n.length,
				i;
			while (++u < o)
				if (!a.has(i = n[u])) a.set(i, t.push(i));
			return r[e.t].apply(r, e.a)
		};
		r.range = function (n) {
			if (!arguments.length) return i;
			i = n;
			u = 0;
			e = {
				t: 'range',
				a: arguments
			};
			return r
		};
		r.rangePoints = function (n, a) {
			if (arguments.length < 2) a = 0;
			var l = n[0],
				f = n[1],
				s = t.length < 2 ? (l = (l + f) / 2, 0) : (f - l) / (t.length - 1 + a);
			i = o(l + s * a / 2, s);
			u = 0;
			e = {
				t: 'rangePoints',
				a: arguments
			};
			return r
		};
		r.rangeRoundPoints = function (n, a) {
			if (arguments.length < 2) a = 0;
			var l = n[0],
				f = n[1],
				s = t.length < 2 ? (l = f = Math.round((l + f) / 2), 0) : (f - l) / (t.length - 1 + a) | 0;
			i = o(l + Math.round(s * a / 2 + (f - l - (t.length - 1 + a) * s) / 2), s);
			u = 0;
			e = {
				t: 'rangeRoundPoints',
				a: arguments
			};
			return r
		};
		r.rangeBands = function (n, a, l) {
			if (arguments.length < 2) a = 0;
			if (arguments.length < 3) l = a;
			var f = n[1] < n[0],
				c = n[f - 0],
				h = n[1 - f],
				s = (h - c) / (t.length - a + 2 * l);
			i = o(c + s * l, s);
			if (f) i.reverse();
			u = s * (1 - a);
			e = {
				t: 'rangeBands',
				a: arguments
			};
			return r
		};
		r.rangeRoundBands = function (n, a, l) {
			if (arguments.length < 2) a = 0;
			if (arguments.length < 3) l = a;
			var f = n[1] < n[0],
				s = n[f - 0],
				h = n[1 - f],
				c = Math.floor((h - s) / (t.length - a + 2 * l));
			i = o(s + Math.round((h - s - (t.length - a) * c) / 2), c);
			if (f) i.reverse();
			u = Math.round(c * (1 - a));
			e = {
				t: 'rangeRoundBands',
				a: arguments
			};
			return r
		};
		r.rangeBand = function () {
			return u
		};
		r.rangeExtent = function () {
			return wn(e.a[0])
		};
		r.copy = function () {
			return ju(t, e)
		};
		return r.domain(t)
	};
	n.scale.category10 = function () {
		return n.scale.ordinal().range(oa)
	};
	n.scale.category20 = function () {
		return n.scale.ordinal().range(la)
	};
	n.scale.category20b = function () {
		return n.scale.ordinal().range(fa)
	};
	n.scale.category20c = function () {
		return n.scale.ordinal().range(sa)
	};
	var oa = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(pt),
		la = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(pt),
		fa = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(pt),
		sa = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(pt);
	n.scale.quantile = function () {
		return Fu([], [])
	};

	function Fu(t, e) {
		var r;

		function u() {
			var u = 0,
				a = e.length;
			r = [];
			while (++u < a) r[u - 1] = n.quantile(t, u / a);
			return i
		};

		function i(t) {
			if (!isNaN(t = +t)) return e[n.bisect(r, t)]
		};
		i.domain = function (n) {
			if (!arguments.length) return t;
			t = n.map(tn).filter(q).sort(pn);
			return u()
		};
		i.range = function (n) {
			if (!arguments.length) return e;
			e = n;
			return u()
		};
		i.quantiles = function () {
			return r
		};
		i.invertExtent = function (n) {
			n = e.indexOf(n);
			return n < 0 ? [NaN, NaN] : [n > 0 ? r[n - 1] : t[0], n < r.length ? r[n] : t[t.length - 1]]
		};
		i.copy = function () {
			return Fu(t, e)
		};
		return u()
	};
	n.scale.quantize = function () {
		return Hu(0, 1, [0, 1])
	};

	function Hu(n, t, e) {
		var i, a;

		function r(t) {
			return e[Math.max(0, Math.min(a, Math.floor(i * (t - n))))]
		};

		function u() {
			i = e.length / (t - n);
			a = e.length - 1;
			return r
		};
		r.domain = function (e) {
			if (!arguments.length) return [n, t];
			n = +e[0];
			t = +e[e.length - 1];
			return u()
		};
		r.range = function (n) {
			if (!arguments.length) return e;
			e = n;
			return u()
		};
		r.invertExtent = function (t) {
			t = e.indexOf(t);
			t = t < 0 ? NaN : t / i + n;
			return [t, t + 1 / i]
		};
		r.copy = function () {
			return Hu(n, t, e)
		};
		return u()
	};
	n.scale.threshold = function () {
		return Ou([.5], [0, 1])
	};

	function Ou(t, e) {
		function r(r) {
			if (r <= r) return e[n.bisect(t, r)]
		};
		r.domain = function (n) {
			if (!arguments.length) return t;
			t = n;
			return r
		};
		r.range = function (n) {
			if (!arguments.length) return e;
			e = n;
			return r
		};
		r.invertExtent = function (n) {
			n = e.indexOf(n);
			return [t[n - 1], t[n]]
		};
		r.copy = function () {
			return Ou(t, e)
		};
		return r
	};
	n.scale.identity = function () {
		return Yu([0, 1])
	};

	function Yu(n) {
		function t(n) {
			return +n
		};
		t.invert = t;
		t.domain = t.range = function (e) {
			if (!arguments.length) return n;
			n = e.map(t);
			return t
		};
		t.ticks = function (t) {
			return Qe(n, t)
		};
		t.tickFormat = function (t, e) {
			return nr(n, t, e)
		};
		t.copy = function () {
			return Yu(n)
		};
		return t
	};
	n.svg = {};

	function Yl() {
		return 0
	};
	n.svg.arc = function () {
		var t = Zl,
			e = Vl,
			o = Yl,
			r = Yn,
			i = Zu,
			u = Vu,
			l = Xl;

		function n() {
			var n = Math.max(0, +t.apply(this, arguments)),
				a = Math.max(0, +e.apply(this, arguments)),
				w = i.apply(this, arguments) - fπ,
				b = u.apply(this, arguments) - fπ,
				H = Math.abs(b - w),
				c = w > b ? 0 : 1;
			if (a < n) S = a, a = n, n = S;
			if (H >= τε) return s(a, c) + (n ? s(n, 1 - c) : '') + 'Z';
			var S, A, j, F, C = 0,
				N = 0,
				h, g, p, E, d, m, y, z, v = [];
			if (F = (+l.apply(this, arguments) || 0) / 2) {
				j = r === Yn ? Math.sqrt(n * n + a * a) : +r.apply(this, arguments);
				if (!c) N *= -1;
				if (a) N = X(j / a * Math.sin(F));
				if (n) C = X(j / n * Math.sin(F))
			}
			;
			if (a) {
				h = a * Math.cos(w + N);
				g = a * Math.sin(w + N);
				p = a * Math.cos(b - N);
				E = a * Math.sin(b - N);
				var W = Math.abs(b - w - 2 * N) <= π ? 0 : 1;
				if (N && Pt(h, g, p, E) === c ^ W) {
					var B = (w + b) / 2;
					h = a * Math.cos(B);
					g = a * Math.sin(B);
					p = E = null
				}
			} else {
				h = g = 0
			}
			;
			if (n) {
				d = n * Math.cos(b - C);
				m = n * Math.sin(b - C);
				y = n * Math.cos(w + C);
				z = n * Math.sin(w + C);
				var V = Math.abs(w - b + 2 * C) <= π ? 0 : 1;
				if (C && Pt(d, m, y, z) === 1 - c ^ V) {
					var Z = (w + b) / 2;
					d = n * Math.cos(Z);
					m = n * Math.sin(Z);
					y = z = null
				}
			} else {
				d = m = 0
			}
			;
			if (H > ε && (S = Math.min(Math.abs(a - n) / 2, +o.apply(this, arguments))) > .001) {
				A = n < a ^ c ? 0 : 1;
				var M = S,
					x = S;
				if (H < π) {
					var k = y == null ? [d, m] : p == null ? [h, g] : Fe([h, g], [y, z], [p, E], [d, m]),
						D = h - k[0],
						I = g - k[1],
						P = p - k[0],
						U = E - k[1],
						O = 1 / Math.sin(Math.acos((D * P + I * U) / (Math.sqrt(D * D + I * I) * Math.sqrt(P * P + U * U))) / 2),
						Y = Math.sqrt(k[0] * k[0] + k[1] * k[1]);
					x = Math.min(S, (n - Y) / (O - 1));
					M = Math.min(S, (a - Y) / (O + 1))
				}
				;
				if (p != null) {
					var T = Ut(y == null ? [d, m] : [y, z], [h, g], a, M, c),
						R = Ut([p, E], [d, m], a, M, c);
					if (S === M) {
						v.push('M', T[0], 'A', M, ',', M, ' 0 0,', A, ' ', T[1], 'A', a, ',', a, ' 0 ', 1 - c ^ Pt(T[1][0], T[1][1], R[1][0], R[1][1]), ',', c, ' ', R[1], 'A', M, ',', M, ' 0 0,', A, ' ', R[0])
					} else {
						v.push('M', T[0], 'A', M, ',', M, ' 0 1,', A, ' ', R[0])
					}
				} else {
					v.push('M', h, ',', g)
				}
				;
				if (y != null) {
					var L = Ut([h, g], [y, z], n, -x, c),
						q = Ut([d, m], p == null ? [h, g] : [p, E], n, -x, c);
					if (S === x) {
						v.push('L', q[0], 'A', x, ',', x, ' 0 0,', A, ' ', q[1], 'A', n, ',', n, ' 0 ', c ^ Pt(q[1][0], q[1][1], L[1][0], L[1][1]), ',', 1 - c, ' ', L[1], 'A', x, ',', x, ' 0 0,', A, ' ', L[0])
					} else {
						v.push('L', q[0], 'A', x, ',', x, ' 0 0,', A, ' ', L[0])
					}
				} else {
					v.push('L', d, ',', m)
				}
			} else {
				v.push('M', h, ',', g);
				if (p != null) v.push('A', a, ',', a, ' 0 ', W, ',', c, ' ', p, ',', E);
				v.push('L', d, ',', m);
				if (y != null) v.push('A', n, ',', n, ' 0 ', V, ',', 1 - c, ' ', y, ',', z)
			}
			;
			v.push('Z');
			return v.join('')
		};

		function s(n, t) {
			return 'M0,' + n + 'A' + n + ',' + n + ' 0 1,' + t + ' 0,' + -n + 'A' + n + ',' + n + ' 0 1,' + t + ' 0,' + n
		};
		n.innerRadius = function (e) {
			if (!arguments.length) return t;
			t = a(e);
			return n
		};
		n.outerRadius = function (t) {
			if (!arguments.length) return e;
			e = a(t);
			return n
		};
		n.cornerRadius = function (t) {
			if (!arguments.length) return o;
			o = a(t);
			return n
		};
		n.padRadius = function (t) {
			if (!arguments.length) return r;
			r = t == Yn ? Yn : a(t);
			return n
		};
		n.startAngle = function (t) {
			if (!arguments.length) return i;
			i = a(t);
			return n
		};
		n.endAngle = function (t) {
			if (!arguments.length) return u;
			u = a(t);
			return n
		};
		n.padAngle = function (t) {
			if (!arguments.length) return l;
			l = a(t);
			return n
		};
		n.centroid = function () {
			var n = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2,
				r = (+i.apply(this, arguments) + +u.apply(this, arguments)) / 2 - fπ;
			return [Math.cos(r) * n, Math.sin(r) * n]
		};
		return n
	};
	var Yn = 'auto';

	function Zl(n) {
		return n.innerRadius
	};

	function Vl(n) {
		return n.outerRadius
	};

	function Zu(n) {
		return n.startAngle
	};

	function Vu(n) {
		return n.endAngle
	};

	function Xl(n) {
		return n && n.padAngle
	};

	function Pt(n, t, e, r) {
		return (n - e) * t - (t - r) * n > 0 ? 0 : 1
	};

	function Ut(n, t, e, r, i) {
		var g = n[0] - t[0],
			p = n[1] - t[1],
			w = (i ? r : -r) / Math.sqrt(g * g + p * p),
			v = w * p,
			d = -w * g,
			m = n[0] + v,
			y = n[1] + d,
			M = t[0] + v,
			x = t[1] + d,
			b = (m + M) / 2,
			S = (y + x) / 2,
			a = M - m,
			u = x - y,
			l = a * a + u * u,
			f = e - r,
			o = m * x - M * y,
			s = (u < 0 ? -1 : 1) * Math.sqrt(Math.max(0, f * f * l - o * o)),
			c = (o * u - a * s) / l,
			h = (-o * a - u * s) / l,
			k = (o * u + a * s) / l,
			N = (-o * a + u * s) / l,
			E = c - b,
			A = h - S,
			C = k - b,
			z = N - S;
		if (E * E + A * A > C * C + z * z) c = k, h = N;
		return [
			[c - v, h - d],
			[c * e / f, h * e / f]
		]
	};

	function Xu(n) {
		var r = mn,
			i = Ln,
			u = An,
			e = S,
			o = e.key,
			l = .7;

		function t(t) {
			var s = [],
				o = [],
				f = -1,
				g = t.length,
				c, p = a(r),
				v = a(i);

			function h() {
				s.push('M', e(n(o), l))
			}

			while (++f < g) {
				if (u.call(this, c = t[f], f)) {
					o.push([+p.call(this, c, f), +v.call(this, c, f)])
				} else if (o.length) {
					h();
					o = []
				}
			}
			;
			if (o.length) h();
			return s.length ? s.join('') : null
		};
		t.x = function (n) {
			if (!arguments.length) return r;
			r = n;
			return t
		};
		t.y = function (n) {
			if (!arguments.length) return i;
			i = n;
			return t
		};
		t.defined = function (n) {
			if (!arguments.length) return u;
			u = n;
			return t
		};
		t.interpolate = function (n) {
			if (!arguments.length) return o;
			if (typeof n === 'function') o = e = n;
			else o = (e = Zt.get(n) || S).key;
			return t
		};
		t.tension = function (n) {
			if (!arguments.length) return l;
			l = n;
			return t
		};
		return t
	};
	n.svg.line = function () {
		return Xu(h)
	};
	var Zt = n.map({
		linear: S,
		'linear-closed': Bu,
		step: Bl,
		'step-before': tr,
		'step-after': er,
		basis: Wu,
		'basis-open': Kl,
		'basis-closed': Ql,
		bundle: nf,
		cardinal: Gl,
		'cardinal-open': Wl,
		'cardinal-closed': Jl,
		monotone: rf
	});
	Zt.forEach(function (n, t) {
		t.key = n;
		t.closed = /-closed$/.test(n)
	});

	function S(n) {
		return n.length > 1 ? n.join('L') : n + 'Z'
	};

	function Bu(n) {
		return n.join('L') + 'Z'
	};

	function Bl(n) {
		var r = 0,
			i = n.length,
			t = n[0],
			e = [t[0], ',', t[1]];
		while (++r < i) e.push('H', (t[0] + (t = n[r])[0]) / 2, 'V', t[1]);
		if (i > 1) e.push('H', t[0]);
		return e.join('')
	};

	function tr(n) {
		var e = 0,
			i = n.length,
			t = n[0],
			r = [t[0], ',', t[1]];
		while (++e < i) r.push('V', (t = n[e])[1], 'H', t[0]);
		return r.join('')
	};

	function er(n) {
		var e = 0,
			i = n.length,
			t = n[0],
			r = [t[0], ',', t[1]];
		while (++e < i) r.push('H', (t = n[e])[0], 'V', t[1]);
		return r.join('')
	};

	function Wl(n, t) {
		return n.length < 4 ? S(n) : n[1] + jt(n.slice(1, -1), rr(n, t))
	};

	function Jl(n, t) {
		return n.length < 3 ? Bu(n) : n[0] + jt((n.push(n[0]), n), rr([n[n.length - 2]].concat(n, [n[1]]), t))
	};

	function Gl(n, t) {
		return n.length < 3 ? S(n) : n[0] + jt(n, rr(n, t))
	};

	function jt(n, t) {
		if (t.length < 1 || n.length != t.length && n.length != t.length + 2) {
			return S(n)
		}
		;
		var s = n.length != t.length,
			u = '',
			l = n[0],
			e = n[1],
			a = t[0],
			r = a,
			i = 1;
		if (s) {
			u += 'Q' + (e[0] - a[0] * 2 / 3) + ',' + (e[1] - a[1] * 2 / 3) + ',' + e[0] + ',' + e[1];
			l = n[1];
			i = 2
		}
		;
		if (t.length > 1) {
			r = t[1];
			e = n[i];
			i++;
			u += 'C' + (l[0] + a[0]) + ',' + (l[1] + a[1]) + ',' + (e[0] - r[0]) + ',' + (e[1] - r[1]) + ',' + e[0] + ',' + e[1];
			for (var o = 2; o < t.length; o++, i++) {
				e = n[i];
				r = t[o];
				u += 'S' + (e[0] - r[0]) + ',' + (e[1] - r[1]) + ',' + e[0] + ',' + e[1]
			}
		}
		;
		if (s) {
			var f = n[i];
			u += 'Q' + (e[0] + r[0] * 2 / 3) + ',' + (e[1] + r[1] * 2 / 3) + ',' + f[0] + ',' + f[1]
		}
		;
		return u
	};

	function rr(n, t) {
		var i = [],
			u = (1 - t) / 2,
			r, a = n[0],
			e = n[1],
			o = 1,
			l = n.length;
		while (++o < l) {
			r = a;
			a = e;
			e = n[o];
			i.push([u * (e[0] - r[0]), u * (e[1] - r[1])])
		}
		;
		return i
	};

	function Wu(n) {
		if (n.length < 3) return S(n);
		var o = 1,
			l = n.length,
			t = n[0],
			e = t[0],
			r = t[1],
			i = [e, e, e, (t = n[1])[0]],
			u = [r, r, r, t[1]],
			a = [e, ',', r, 'L', y(U, i), ',', y(U, u)];
		n.push(n[l - 1]);
		while (++o <= l) {
			t = n[o];
			i.shift();
			i.push(t[0]);
			u.shift();
			u.push(t[1]);
			ir(a, i, u)
		}
		;
		n.pop();
		a.push('L', t);
		return a.join('')
	};

	function Kl(n) {
		if (n.length < 4) return S(n);
		var u = [],
			e = -1,
			a = n.length,
			t, r = [0],
			i = [0];
		while (++e < 3) {
			t = n[e];
			r.push(t[0]);
			i.push(t[1])
		}
		;
		u.push(y(U, r) + ',' + y(U, i));
		--e;
		while (++e < a) {
			t = n[e];
			r.shift();
			r.push(t[0]);
			i.shift();
			i.push(t[1]);
			ir(u, r, i)
		}
		;
		return u.join('')
	};

	function Ql(n) {
		var u, e = -1,
			a = n.length,
			o = a + 4,
			t, r = [],
			i = [];
		while (++e < 4) {
			t = n[e % a];
			r.push(t[0]);
			i.push(t[1])
		}
		;
		u = [y(U, r), ',', y(U, i)];
		--e;
		while (++e < o) {
			t = n[e % a];
			r.shift();
			r.push(t[0]);
			i.shift();
			i.push(t[1]);
			ir(u, r, i)
		}
		;
		return u.join('')
	};

	function nf(n, t) {
		var r = n.length - 1;
		if (r) {
			var a = n[0][0],
				o = n[0][1],
				l = n[r][0] - a,
				f = n[r][1] - o,
				i = -1,
				e, u;
			while (++i <= r) {
				e = n[i];
				u = i / r;
				e[0] = t * e[0] + (1 - t) * (a + u * l);
				e[1] = t * e[1] + (1 - t) * (o + u * f)
			}
		}
		;
		return Wu(n)
	};

	function y(n, t) {
		return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3]
	};
	var mr = [0, 2 / 3, 1 / 3, 0],
		yr = [0, 1 / 3, 2 / 3, 0],
		U = [0, 1 / 6, 2 / 3, 1 / 6];

	function ir(n, t, e) {
		n.push('C', y(mr, t), ',', y(mr, e), ',', y(yr, t), ',', y(yr, e), ',', y(U, t), ',', y(U, e))
	};

	function ur(n, t) {
		return (t[1] - n[1]) / (t[0] - n[0])
	};

	function tf(n) {
		var t = 0,
			a = n.length - 1,
			e = [],
			u = n[0],
			r = n[1],
			i = e[0] = ur(u, r);
		while (++t < a) {
			e[t] = (i + (i = ur(u = r, r = n[t + 1]))) / 2
		}
		;
		e[t] = i;
		return e
	};

	function ef(n) {
		var f = [],
			u, a, o, e, i = tf(n),
			t = -1,
			l = n.length - 1;
		while (++t < l) {
			u = ur(n[t], n[t + 1]);
			if (r(u) < ε) {
				i[t] = i[t + 1] = 0
			} else {
				a = i[t] / u;
				o = i[t + 1] / u;
				e = a * a + o * o;
				if (e > 9) {
					e = u * 3 / Math.sqrt(e);
					i[t] = e * a;
					i[t + 1] = e * o
				}
			}
		}
		;
		t = -1;
		while (++t <= l) {
			e = (n[Math.min(l, t + 1)][0] - n[Math.max(0, t - 1)][0]) / (6 * (1 + i[t] * i[t]));
			f.push([e || 0, i[t] * e || 0])
		}
		;
		return f
	};

	function rf(n) {
		return n.length < 3 ? S(n) : n[0] + jt(n, ef(n))
	};
	n.svg.line.radial = function () {
		var n = Xu(Ju);
		n.radius = n.x, delete n.x;
		n.angle = n.y, delete n.y;
		return n
	};

	function Ju(n) {
		var t, i = -1,
			u = n.length,
			e, r;
		while (++i < u) {
			t = n[i];
			e = t[0];
			r = t[1] - fπ;
			t[0] = e * Math.cos(r);
			t[1] = e * Math.sin(r)
		}
		;
		return n
	};

	function Gu(n) {
		var u = mn,
			r = mn,
			o = 0,
			i = Ln,
			f = An,
			e = S,
			s = e.key,
			c = e,
			h = 'L',
			l = .7;

		function t(t) {
			var v = [],
				g = [],
				d = [],
				s = -1,
				x = t.length,
				p, w = a(u),
				b = a(o),
				S = u === r ? function () {
					return m
				} : a(r),
				k = o === i ? function () {
					return y
				} : a(i),
				m, y;

			function M() {
				v.push('M', e(n(d), l), h, c(n(g.reverse()), l), 'Z')
			}

			while (++s < x) {
				if (f.call(this, p = t[s], s)) {
					g.push([m = +w.call(this, p, s), y = +b.call(this, p, s)]);
					d.push([+S.call(this, p, s), +k.call(this, p, s)])
				} else if (g.length) {
					M();
					g = [];
					d = []
				}
			}
			;
			if (g.length) M();
			return v.length ? v.join('') : null
		};
		t.x = function (n) {
			if (!arguments.length) return r;
			u = r = n;
			return t
		};
		t.x0 = function (n) {
			if (!arguments.length) return u;
			u = n;
			return t
		};
		t.x1 = function (n) {
			if (!arguments.length) return r;
			r = n;
			return t
		};
		t.y = function (n) {
			if (!arguments.length) return i;
			o = i = n;
			return t
		};
		t.y0 = function (n) {
			if (!arguments.length) return o;
			o = n;
			return t
		};
		t.y1 = function (n) {
			if (!arguments.length) return i;
			i = n;
			return t
		};
		t.defined = function (n) {
			if (!arguments.length) return f;
			f = n;
			return t
		};
		t.interpolate = function (n) {
			if (!arguments.length) return s;
			if (typeof n === 'function') s = e = n;
			else s = (e = Zt.get(n) || S).key;
			c = e.reverse || e;
			h = e.closed ? 'M' : 'L';
			return t
		};
		t.tension = function (n) {
			if (!arguments.length) return l;
			l = n;
			return t
		};
		return t
	};
	tr.reverse = er;
	er.reverse = tr;
	n.svg.area = function () {
		return Gu(h)
	};
	n.svg.area.radial = function () {
		var n = Gu(Ju);
		n.radius = n.x, delete n.x;
		n.innerRadius = n.x0, delete n.x0;
		n.outerRadius = n.x1, delete n.x1;
		n.angle = n.y, delete n.y;
		n.startAngle = n.y0, delete n.y0;
		n.endAngle = n.y1, delete n.y1;
		return n
	};
	n.svg.chord = function () {
		var t = Ie,
			e = Pe,
			r = uf,
			i = Zu,
			u = Vu;

		function n(n, r) {
			var i = l(this, t, n, r),
				u = l(this, e, n, r);
			return 'M' + i.p0 + s(i.r, i.p1, i.a1 - i.a0) + (c(i, u) ? o(i.r, i.p1, i.r, i.p0) : o(i.r, i.p1, u.r, u.p0) + s(u.r, u.p1, u.a1 - u.a0) + o(u.r, u.p1, i.r, i.p0)) + 'Z'
		};

		function l(n, t, e, a) {
			var l = t.call(n, e, a),
				o = r.call(n, l, a),
				s = i.call(n, l, a) - fπ,
				c = u.call(n, l, a) - fπ;
			return {
				r: o,
				a0: s,
				a1: c,
				p0: [o * Math.cos(s), o * Math.sin(s)],
				p1: [o * Math.cos(c), o * Math.sin(c)]
			}
		};

		function c(n, t) {
			return n.a0 == t.a0 && n.a1 == t.a1
		};

		function s(n, t, e) {
			return 'A' + n + ',' + n + ' 0 ' + +(e > π) + ',1 ' + t
		};

		function o(n, t, e, r) {
			return 'Q 0,0 ' + r
		};
		n.radius = function (t) {
			if (!arguments.length) return r;
			r = a(t);
			return n
		};
		n.source = function (e) {
			if (!arguments.length) return t;
			t = a(e);
			return n
		};
		n.target = function (t) {
			if (!arguments.length) return e;
			e = a(t);
			return n
		};
		n.startAngle = function (t) {
			if (!arguments.length) return i;
			i = a(t);
			return n
		};
		n.endAngle = function (t) {
			if (!arguments.length) return u;
			u = a(t);
			return n
		};
		return n
	};

	function uf(n) {
		return n.radius
	};
	n.svg.diagonal = function () {
		var t = Ie,
			e = Pe,
			r = Ku;

		function n(n, i) {
			var a = t.call(this, n, i),
				o = e.call(this, n, i),
				l = (a.y + o.y) / 2,
				u = [a, {
					x: a.x,
					y: l
				}, {
					x: o.x,
					y: l
				}, o];
			u = u.map(r);
			return 'M' + u[0] + 'C' + u[1] + ' ' + u[2] + ' ' + u[3]
		};
		n.source = function (e) {
			if (!arguments.length) return t;
			t = a(e);
			return n
		};
		n.target = function (t) {
			if (!arguments.length) return e;
			e = a(t);
			return n
		};
		n.projection = function (t) {
			if (!arguments.length) return r;
			r = t;
			return n
		};
		return n
	};

	function Ku(n) {
		return [n.x, n.y]
	};
	n.svg.diagonal.radial = function () {
		var t = n.svg.diagonal(),
			e = Ku,
			r = t.projection;
		t.projection = function (n) {
			return arguments.length ? r(af(e = n)) : e
		};
		return t
	};

	function af(n) {
		return function () {
			var t = n.apply(this, arguments),
				e = t[0],
				r = t[1] - fπ;
			return [e * Math.cos(r), e * Math.sin(r)]
		}
	};
	n.svg.symbol = function () {
		var t = lf,
			e = of;

		function n(n, r) {
			return (dr.get(t.call(this, n, r)) || Qu)(e.call(this, n, r))
		};
		n.type = function (e) {
			if (!arguments.length) return t;
			t = a(e);
			return n
		};
		n.size = function (t) {
			if (!arguments.length) return e;
			e = a(t);
			return n
		};
		return n
	};

	function of() {
		return 64
	};

	function lf() {
		return 'circle'
	};

	function Qu(n) {
		var t = Math.sqrt(n / π);
		return 'M0,' + t + 'A' + t + ',' + t + ' 0 1,1 0,' + -t + 'A' + t + ',' + t + ' 0 1,1 0,' + t + 'Z'
	};
	var dr = n.map({
		circle: Qu,
		cross: function (n) {
			var t = Math.sqrt(n / 5) / 2;
			return 'M' + -3 * t + ',' + -t + 'H' + -t + 'V' + -3 * t + 'H' + t + 'V' + -t + 'H' + 3 * t + 'V' + t + 'H' + t + 'V' + 3 * t + 'H' + -t + 'V' + t + 'H' + -3 * t + 'Z'
		},
		diamond: function (n) {
			var t = Math.sqrt(n / (2 * vr)),
				e = t * vr;
			return 'M0,' + -t + 'L' + e + ',0 0,' + t + ' ' + -e + ',0Z'
		},
		square: function (n) {
			var t = Math.sqrt(n) / 2;
			return 'M' + -t + ',' + -t + 'L' + t + ',' + -t + ' ' + t + ',' + t + ' ' + -t + ',' + t + 'Z'
		},
		'triangle-down': function (n) {
			var t = Math.sqrt(n / On),
				e = t * On / 2;
			return 'M0,' + e + 'L' + t + ',' + -e + ' ' + -t + ',' + -e + 'Z'
		},
		'triangle-up': function (n) {
			var t = Math.sqrt(n / On),
				e = t * On / 2;
			return 'M0,' + -e + 'L' + t + ',' + e + ' ' + -t + ',' + e + 'Z'
		}
	});
	n.svg.symbolTypes = dr.keys();
	var On = Math.sqrt(3),
		vr = Math.tan(30 * e);
	u.transition = function (n) {
		var u = W || ++pr,
			a = or(n),
			o = [],
			l, e, c = Fn || {
					time: Date.now(),
					ease: Wo,
					delay: 0,
					duration: 250
				};
		for (var i = -1, s = this.length; ++i < s;) {
			o.push(l = []);
			for (var r = this[i], t = -1, f = r.length; ++t < f;) {
				if (e = r[t]) Ft(e, t, a, u, c);
				l.push(e)
			}
		}
		;
		return Un(o, a, u)
	};
	u.interrupt = function (n) {
		return this.each(n == null ? Hn : na(or(n)))
	};
	var Hn = na(or());

	function na(n) {
		return function () {
			var t, r, e;
			if ((t = this[n]) && (e = t[r = t.active])) {
				e.timer.c = null;
				e.timer.t = NaN;
				if (--t.count) delete t[r];
				else delete this[n];
				t.active += .5;
				e.event && e.event.interrupt.call(this, this.__data__, e.index)
			}
		}
	};

	function Un(n, t, e) {
		st(n, c);
		n.namespace = t;
		n.id = e;
		return n
	};
	var c = [],
		pr = 0,
		W, Fn;
	c.call = u.call;
	c.empty = u.empty;
	c.node = u.node;
	c.size = u.size;
	n.transition = function (t, e) {
		return t && t.transition ? W ? t.transition(e) : t : n.selection().transition(t)
	};
	n.transition.prototype = c;
	c.select = function (n) {
		var u = this.id,
			a = this.namespace,
			f = [],
			o, r, t;
		n = pe(n);
		for (var i = -1, c = this.length; ++i < c;) {
			f.push(o = []);
			for (var l = this[i], e = -1, s = l.length; ++e < s;) {
				if ((t = l[e]) && (r = n.call(t, t.__data__, e, i))) {
					if ('__data__' in t) r.__data__ = t.__data__;
					Ft(r, e, a, u, t[a][u]);
					o.push(r)
				} else {
					o.push(null)
				}
			}
		}
		;
		return Un(f, a, u)
	};
	c.selectAll = function (n) {
		var u = this.id,
			a = this.namespace,
			s = [],
			c, o, t, l, h;
		n = ei(n);
		for (var i = -1, v = this.length; ++i < v;) {
			for (var f = this[i], r = -1, p = f.length; ++r < p;) {
				if (t = f[r]) {
					h = t[a][u];
					o = n.call(t, t.__data__, r, i);
					s.push(c = []);
					for (var e = -1, g = o.length; ++e < g;) {
						if (l = o[e]) Ft(l, e, a, u, h);
						c.push(l)
					}
				}
			}
		}
		;
		return Un(s, a, u)
	};
	c.filter = function (n) {
		var u = [],
			a, i, r;
		if (typeof n !== 'function') n = ci(n);
		for (var e = 0, l = this.length; e < l; e++) {
			u.push(a = []);
			for (var i = this[e], t = 0, o = i.length; t < o; t++) {
				if ((r = i[t]) && n.call(r, r.__data__, t, e)) {
					a.push(r)
				}
			}
		}
		;
		return Un(u, this.namespace, this.id)
	};
	c.tween = function (n, t) {
		var e = this.id,
			r = this.namespace;
		if (arguments.length < 2) return this.node()[r][e].tween.get(n);
		return R(this, t == null ? function (t) {
			t[r][e].tween.remove(n)
		} : function (i) {
			i[r][e].tween.set(n, t)
		})
	};

	function ar(n, t, e, r) {
		var i = n.id,
			u = n.namespace;
		return R(n, typeof e === 'function' ? function (n, a, o) {
			n[u][i].tween.set(t, r(e.call(n, n.__data__, a, o)))
		} : (e = r(e), function (n) {
			n[u][i].tween.set(t, e)
		}))
	};
	c.attr = function (t, e) {
		if (arguments.length < 2) {
			for (e in t) this.attr(e, t[e]);
			return this
		}
		;
		var i = t == 'transform' ? xu : on,
			r = n.ns.qualify(t);

		function u() {
			this.removeAttribute(r)
		};

		function a() {
			this.removeAttributeNS(r.space, r.local)
		};

		function o(n) {
			return n == null ? u : (n += '', function () {
				var t = this.getAttribute(r),
					e;
				return t !== n && (e = i(t, n), function (n) {
						this.setAttribute(r, e(n))
					})
			})
		};

		function l(n) {
			return n == null ? a : (n += '', function () {
				var t = this.getAttributeNS(r.space, r.local),
					e;
				return t !== n && (e = i(t, n), function (n) {
						this.setAttributeNS(r.space, r.local, e(n))
					})
			})
		};
		return ar(this, 'attr.' + t, e, r.local ? l : o)
	};
	c.attrTween = function (t, e) {
		var r = n.ns.qualify(t);

		function i(n, t) {
			var i = e.call(this, n, t, this.getAttribute(r));
			return i && function (n) {
					this.setAttribute(r, i(n))
				}
		};

		function u(n, t) {
			var i = e.call(this, n, t, this.getAttributeNS(r.space, r.local));
			return i && function (n) {
					this.setAttributeNS(r.space, r.local, i(n))
				}
		};
		return this.tween('attr.' + t, r.local ? u : i)
	};
	c.style = function (n, t, e) {
		var r = arguments.length;
		if (r < 3) {
			if (typeof n !== 'string') {
				if (r < 2) t = '';
				for (e in n) this.style(e, n[e], t);
				return this
			}
			;
			e = ''
		}
		;

		function i() {
			this.style.removeProperty(n)
		};

		function u(t) {
			return t == null ? i : (t += '', function () {
				var r = Y(this).getComputedStyle(this, null).getPropertyValue(n),
					i;
				return r !== t && (i = on(r, t), function (t) {
						this.style.setProperty(n, i(t), e)
					})
			})
		};
		return ar(this, 'style.' + n, t, u)
	};
	c.styleTween = function (n, t, e) {
		if (arguments.length < 3) e = '';

		function r(r, i) {
			var u = t.call(this, r, i, Y(this).getComputedStyle(this, null).getPropertyValue(n));
			return u && function (t) {
					this.style.setProperty(n, u(t), e)
				}
		};
		return this.tween('style.' + n, r)
	};
	c.text = function (n) {
		return ar(this, 'text', n, ff)
	};

	function ff(n) {
		if (n == null) n = '';
		return function () {
			this.textContent = n
		}
	};
	c.remove = function () {
		var n = this.namespace;
		return this.each('end.transition', function () {
			var t;
			if (this[n].count < 2 && (t = this.parentNode)) t.removeChild(this)
		})
	};
	c.ease = function (t) {
		var e = this.id,
			r = this.namespace;
		if (arguments.length < 1) return this.node()[r][e].ease;
		if (typeof t !== 'function') t = n.ease.apply(n, arguments);
		return R(this, function (n) {
			n[r][e].ease = t
		})
	};
	c.delay = function (n) {
		var t = this.id,
			e = this.namespace;
		if (arguments.length < 1) return this.node()[e][t].delay;
		return R(this, typeof n === 'function' ? function (r, i, u) {
			r[e][t].delay = +n.call(r, r.__data__, i, u)
		} : (n = +n, function (r) {
			r[e][t].delay = n
		}))
	};
	c.duration = function (n) {
		var t = this.id,
			e = this.namespace;
		if (arguments.length < 1) return this.node()[e][t].duration;
		return R(this, typeof n === 'function' ? function (r, i, u) {
			r[e][t].duration = Math.max(1, n.call(r, r.__data__, i, u))
		} : (n = Math.max(1, n), function (r) {
			r[e][t].duration = n
		}))
	};
	c.each = function (t, e) {
		var r = this.id,
			i = this.namespace;
		if (arguments.length < 2) {
			var u = Fn,
				a = W;
			try {
				W = r;
				R(this, function (n, e, u) {
					Fn = n[i][r];
					t.call(n, n.__data__, e, u)
				})
			} finally {
				Fn = u;
				W = a
			}
		} else {
			R(this, function (u) {
				var a = u[i][r];
				(a.event || (a.event = n.dispatch('start', 'end', 'interrupt'))).on(t, e)
			})
		}
		;
		return this
	};
	c.transition = function () {
		var c = this.id,
			a = ++pr,
			u = this.namespace,
			o = [],
			l, r, e, n;
		for (var i = 0, s = this.length; i < s; i++) {
			o.push(l = []);
			for (var r = this[i], t = 0, f = r.length; t < f; t++) {
				if (e = r[t]) {
					n = e[u][c];
					Ft(e, t, u, a, {
						time: n.time,
						ease: n.ease,
						delay: n.delay + n.duration,
						duration: n.duration
					})
				}
				;
				l.push(e)
			}
		}
		;
		return Un(o, u, a)
	};

	function or(n) {
		return n == null ? '__transition__' : '__transition_' + n + '__'
	};

	function Ft(n, t, e, r, i) {
		var u = n[e] || (n[e] = {
					active: 0,
					count: 0
				}),
			a = u[r],
			l, o, s, c, f;

		function p(n) {
			var t = a.delay;
			o.t = t + l;
			if (t <= n) return h(n - t);
			o.c = h
		};

		function h(e) {
			var v = u.active,
				i = u[v];
			if (i) {
				i.timer.c = null;
				i.timer.t = NaN;
				--u.count;
				delete u[v];
				i.event && i.event.interrupt.call(n, n.__data__, i.index)
			}
			;
			for (var h in u) {
				if (+h < r) {
					var p = u[h];
					p.timer.c = null;
					p.timer.t = NaN;
					--u.count;
					delete u[h]
				}
			}
			;
			o.c = g;
			dt(function () {
				if (o.c && g(e || 1)) {
					o.c = null;
					o.t = NaN
				}
				;
				return 1
			}, 0, l);
			u.active = r;
			a.event && a.event.start.call(n, n.__data__, t);
			f = [];
			a.tween.forEach(function (e, r) {
				if (r = r.call(n, n.__data__, t)) {
					f.push(r)
				}
			});
			c = a.ease;
			s = a.duration
		};

		function g(i) {
			var o = i / s,
				h = c(o),
				l = f.length;
			while (l > 0) {
				f[--l].call(n, h)
			}
			;
			if (o >= 1) {
				a.event && a.event.end.call(n, n.__data__, t);
				if (--u.count) delete u[r];
				else delete n[e];
				return 1
			}
		};
		if (!a) {
			l = i.time;
			o = dt(p, 0, l);
			a = u[r] = {
				tween: new T(),
				time: l,
				timer: o,
				delay: i.delay,
				duration: i.duration,
				ease: i.ease,
				index: t
			};
			i = null;
			++u.count
		}
	};
	n.svg.axis = function () {
		var u = n.scale.linear(),
			i = gr,
			e = 6,
			r = 6,
			f = 3,
			a = [10],
			o = null,
			l;

		function t(t) {
			t.each(function () {
				var k = n.select(this),
					c = this.__chart__ || u,
					t = this.__chart__ = u.copy(),
					R = o == null ? t.ticks ? t.ticks.apply(t, a) : t.domain() : o,
					D = l == null ? t.tickFormat ? t.tickFormat.apply(t, a) : h : l,
					m = k.selectAll('.tick').data(R, t),
					g = m.enter().insert('g', '.domain').attr('class', 'tick').style('opacity', ε),
					I = n.transition(m.exit()).style('opacity', ε).remove(),
					w = n.transition(m.order()).style('opacity', 1),
					N = Math.max(e, 0) + f,
					p, y = Tt(t),
					E = k.selectAll('.domain').data([0]),
					A = (E.enter().append('path').attr('class', 'domain'), n.transition(E));
				g.append('line');
				g.append('text');
				var z = g.select('line'),
					L = w.select('line'),
					S = m.select('text').text(D),
					q = g.select('text'),
					T = w.select('text'),
					s = i === 'top' || i === 'left' ? -1 : 1,
					M, x, v, d;
				if (i === 'bottom' || i === 'top') {
					p = sf, M = 'x', v = 'y', x = 'x2', d = 'y2';
					S.attr('dy', s < 0 ? '0em' : '.71em').style('text-anchor', 'middle');
					A.attr('d', 'M' + y[0] + ',' + s * r + 'V0H' + y[1] + 'V' + s * r)
				} else {
					p = cf, M = 'y', v = 'x', x = 'y2', d = 'x2';
					S.attr('dy', '.32em').style('text-anchor', s < 0 ? 'end' : 'start');
					A.attr('d', 'M' + s * r + ',' + y[0] + 'H0V' + y[1] + 'H' + s * r)
				}
				;
				z.attr(d, s * e);
				q.attr(v, s * N);
				L.attr(x, 0).attr(d, s * e);
				T.attr(M, 0).attr(v, s * N);
				if (t.rangeBand) {
					var b = t,
						C = b.rangeBand() / 2;
					c = t = function (n) {
						return b(n) + C
					}
				} else if (c.rangeBand) {
					c = t
				} else {
					I.call(p, t, c)
				}
				;
				g.call(p, c, t);
				w.call(p, t, t)
			})
		};
		t.scale = function (n) {
			if (!arguments.length) return u;
			u = n;
			return t
		};
		t.orient = function (n) {
			if (!arguments.length) return i;
			i = n in aa ? n + '' : gr;
			return t
		};
		t.ticks = function () {
			if (!arguments.length) return a;
			a = N(arguments);
			return t
		};
		t.tickValues = function (n) {
			if (!arguments.length) return o;
			o = n;
			return t
		};
		t.tickFormat = function (n) {
			if (!arguments.length) return l;
			l = n;
			return t
		};
		t.tickSize = function (n) {
			var i = arguments.length;
			if (!i) return e;
			e = +n;
			r = +arguments[i - 1];
			return t
		};
		t.innerTickSize = function (n) {
			if (!arguments.length) return e;
			e = +n;
			return t
		};
		t.outerTickSize = function (n) {
			if (!arguments.length) return r;
			r = +n;
			return t
		};
		t.tickPadding = function (n) {
			if (!arguments.length) return f;
			f = +n;
			return t
		};
		t.tickSubdivide = function () {
			return arguments.length && t
		};
		return t
	};
	var gr = 'bottom',
		aa = {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1
		};

	function sf(n, t, e) {
		n.attr('transform', function (n) {
			var r = t(n);
			return 'translate(' + (isFinite(r) ? r : e(n)) + ',0)'
		})
	};

	function cf(n, t, e) {
		n.attr('transform', function (n) {
			var r = t(n);
			return 'translate(0,' + (isFinite(r) ? r : e(n)) + ')'
		})
	};
	n.svg.brush = function () {
		var s = ge(u, 'brushstart', 'brush', 'brushend'),
			r = null,
			i = null,
			t = [0, 0],
			e = [0, 0],
			a, o, l = !0,
			f = !0,
			c = Ot[0];

		function u(t) {
			t.each(function () {
				var e = n.select(this).style('pointer-events', 'all').style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)').on('mousedown.brush', d).on('touchstart.brush', d),
					f = e.selectAll('.background').data([0]);
				f.enter().append('rect').attr('class', 'background').style('visibility', 'hidden').style('cursor', 'crosshair');
				e.selectAll('.extent').data([0]).enter().append('rect').attr('class', 'extent').style('cursor', 'move');
				var o = e.selectAll('.resize').data(c, h);
				o.exit().remove();
				o.enter().append('g').attr('class', function (n) {
					return 'resize ' + n
				}).style('cursor', function (n) {
					return ua[n]
				}).append('rect').attr('x', function (n) {
					return /[ew]$/.test(n) ? -3 : null
				}).attr('y', function (n) {
					return /^[ns]/.test(n) ? -3 : null
				}).attr('width', 6).attr('height', 6).style('visibility', 'hidden');
				o.style('display', u.empty() ? 'none' : null);
				var a = n.transition(e),
					l = n.transition(f),
					t;
				if (r) {
					t = Tt(r);
					l.attr('x', t[0]).attr('width', t[1] - t[0]);
					p(a)
				}
				;
				if (i) {
					t = Tt(i);
					l.attr('y', t[0]).attr('height', t[1] - t[0]);
					v(a)
				}
				;
				g(a)
			})
		};
		u.event = function (r) {
			r.each(function () {
				var i = s.of(this, arguments),
					r = {
						x: t,
						y: e,
						i: a,
						j: o
					},
					u = this.__chart__ || r;
				this.__chart__ = r;
				if (W) {
					n.select(this).transition().each('start.brush', function () {
						a = u.i;
						o = u.j;
						t = u.x;
						e = u.y;
						i({
							type: 'brushstart'
						})
					}).tween('brush:brush', function () {
						var n = qt(t, r.x),
							u = qt(e, r.y);
						a = o = null;
						return function (a) {
							t = r.x = n(a);
							e = r.y = u(a);
							i({
								type: 'brush',
								mode: 'resize'
							})
						}
					}).each('end.brush', function () {
						a = r.i;
						o = r.j;
						i({
							type: 'brush',
							mode: 'resize'
						});
						i({
							type: 'brushend'
						})
					})
				} else {
					i({
						type: 'brushstart'
					});
					i({
						type: 'brush',
						mode: 'resize'
					});
					i({
						type: 'brushend'
					})
				}
			})
		};

		function g(n) {
			n.selectAll('.resize').attr('transform', function (n) {
				return 'translate(' + t[+/e$/.test(n)] + ',' + e[+/^s/.test(n)] + ')'
			})
		};

		function p(n) {
			n.select('.extent').attr('x', t[0]);
			n.selectAll('.extent,.n>rect,.s>rect').attr('width', t[1] - t[0])
		};

		function v(n) {
			n.select('.extent').attr('y', e[0]);
			n.selectAll('.extent,.e>rect,.w>rect').attr('height', e[1] - e[0])
		};

		function d() {
			var m = this,
				b = n.select(n.event.target),
				S = s.of(m, arguments),
				y = n.select(m),
				M = b.datum(),
				z = !/^(n|s)$/.test(M) && r,
				L = !/^(e|w)$/.test(M) && i,
				h = b.classed('extent'),
				q = gt(m),
				d, c = n.mouse(m),
				x, k = n.select(Y(m)).on('keydown.brush', T).on('keyup.brush', R);
			if (n.event.changedTouches) {
				k.on('touchmove.brush', w).on('touchend.brush', C)
			} else {
				k.on('mousemove.brush', w).on('mouseup.brush', C)
			}
			;
			y.interrupt().selectAll('*').interrupt();
			if (h) {
				c[0] = t[0] - c[0];
				c[1] = e[0] - c[1]
			} else if (M) {
				var N = +/w$/.test(M),
					E = +/^n/.test(M);
				x = [t[1 - N] - c[0], e[1 - E] - c[1]];
				c[0] = t[N];
				c[1] = e[E]
			} else if (n.event.altKey) d = c.slice();
			y.style('pointer-events', 'none').selectAll('.resize').style('display', null);
			n.select('body').style('cursor', b.style('cursor'));
			S({
				type: 'brushstart'
			});
			w();

			function T() {
				if (n.event.keyCode == 32) {
					if (!h) {
						d = null;
						c[0] -= t[1];
						c[1] -= e[1];
						h = 2
					}
					;
					Z()
				}
			};

			function R() {
				if (n.event.keyCode == 32 && h == 2) {
					c[0] += t[1];
					c[1] += e[1];
					h = 0;
					Z()
				}
			};

			function w() {
				var u = n.mouse(m),
					a = !1;
				if (x) {
					u[0] += x[0];
					u[1] += x[1]
				}
				;
				if (!h) {
					if (n.event.altKey) {
						if (!d) d = [(t[0] + t[1]) / 2, (e[0] + e[1]) / 2];
						c[0] = t[+(u[0] < d[0])];
						c[1] = e[+(u[1] < d[1])]
					} else d = null
				}
				;
				if (z && A(u, r, 0)) {
					p(y);
					a = !0
				}
				;
				if (L && A(u, i, 1)) {
					v(y);
					a = !0
				}
				;
				if (a) {
					g(y);
					S({
						type: 'brush',
						mode: h ? 'move' : 'resize'
					})
				}
			};

			function A(n, r, i) {
				var y = Tt(r),
					v = y[0],
					m = y[1],
					s = c[i],
					g = i ? e : t,
					M = g[1] - g[0],
					u, p;
				if (h) {
					v -= s;
					m -= M + s
				}
				;
				u = (i ? f : l) ? Math.max(v, Math.min(m, n[i])) : n[i];
				if (h) {
					p = (u += s) + M
				} else {
					if (d) s = Math.max(v, Math.min(m, 2 * d[i] - u));
					if (s < u) {
						p = u;
						u = s
					} else {
						p = s
					}
				}
				;
				if (g[0] != u || g[1] != p) {
					if (i) o = null;
					else a = null;
					g[0] = u;
					g[1] = p;
					return !0
				}
			};

			function C() {
				w();
				y.style('pointer-events', 'all').selectAll('.resize').style('display', u.empty() ? 'none' : null);
				n.select('body').style('cursor', null);
				k.on('mousemove.brush', null).on('mouseup.brush', null).on('touchmove.brush', null).on('touchend.brush', null).on('keydown.brush', null).on('keyup.brush', null);
				q();
				S({
					type: 'brushend'
				})
			}
		};
		u.x = function (n) {
			if (!arguments.length) return r;
			r = n;
			c = Ot[!r << 1 | !i];
			return u
		};
		u.y = function (n) {
			if (!arguments.length) return i;
			i = n;
			c = Ot[!r << 1 | !i];
			return u
		};
		u.clamp = function (n) {
			if (!arguments.length) return r && i ? [l, f] : r ? l : i ? f : null;
			if (r && i) l = !!n[0], f = !!n[1];
			else if (r) l = !!n;
			else if (i) f = !!n;
			return u
		};
		u.extent = function (n) {
			var l, f, s, c, h;
			if (!arguments.length) {
				if (r) {
					if (a) {
						l = a[0], f = a[1]
					} else {
						l = t[0], f = t[1];
						if (r.invert) l = r.invert(l), f = r.invert(f);
						if (f < l) h = l, l = f, f = h
					}
				}
				;
				if (i) {
					if (o) {
						s = o[0], c = o[1]
					} else {
						s = e[0], c = e[1];
						if (i.invert) s = i.invert(s), c = i.invert(c);
						if (c < s) h = s, s = c, c = h
					}
				}
				;
				return r && i ? [
					[l, s],
					[f, c]
				] : r ? [l, f] : i && [s, c]
			}
			;
			if (r) {
				l = n[0], f = n[1];
				if (i) l = l[0], f = f[0];
				a = [l, f];
				if (r.invert) l = r(l), f = r(f);
				if (f < l) h = l, l = f, f = h;
				if (l != t[0] || f != t[1]) t = [l, f]
			}
			;
			if (i) {
				s = n[0], c = n[1];
				if (r) s = s[1], c = c[1];
				o = [s, c];
				if (i.invert) s = i(s), c = i(c);
				if (c < s) h = s, s = c, c = h;
				if (s != e[0] || c != e[1]) e = [s, c]
			}
			;
			return u
		};
		u.clear = function () {
			if (!u.empty()) {
				t = [0, 0], e = [0, 0];
				a = o = null
			}
			;
			return u
		};
		u.empty = function () {
			return !!r && t[0] == t[1] || !!i && e[0] == e[1]
		};
		return n.rebind(u, s, 'on')
	};
	var ua = {
		n: 'ns-resize',
		e: 'ew-resize',
		s: 'ns-resize',
		w: 'ew-resize',
		nw: 'nwse-resize',
		ne: 'nesw-resize',
		se: 'nwse-resize',
		sw: 'nesw-resize'
	};
	var Ot = [
			['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'],
			['e', 'w'],
			['n', 's'],
			[]
		],
		Yt = t.format = Tr.timeFormat,
		cr = Yt.utc,
		hr = cr('%Y-%m-%dT%H:%M:%S.%LZ');
	Yt.iso = Date.prototype.toISOString && +new Date('2000-01-01T00:00:00.000Z') ? lr : hr;

	function lr(n) {
		return n.toISOString()
	};
	lr.parse = function (n) {
		var t = new Date(n);
		return isNaN(t) ? null : t
	};
	lr.toString = hr.toString;
	t.second = rn(function (n) {
		return new g(Math.floor(n / 1e3) * 1e3)
	}, function (n, t) {
		n.setTime(n.getTime() + Math.floor(t) * 1e3)
	}, function (n) {
		return n.getSeconds()
	});
	t.seconds = t.second.range;
	t.seconds.utc = t.second.utc.range;
	t.minute = rn(function (n) {
		return new g(Math.floor(n / 6e4) * 6e4)
	}, function (n, t) {
		n.setTime(n.getTime() + Math.floor(t) * 6e4)
	}, function (n) {
		return n.getMinutes()
	});
	t.minutes = t.minute.range;
	t.minutes.utc = t.minute.utc.range;
	t.hour = rn(function (n) {
		var t = n.getTimezoneOffset() / 60;
		return new g((Math.floor(n / 36e5 - t) + t) * 36e5)
	}, function (n, t) {
		n.setTime(n.getTime() + Math.floor(t) * 36e5)
	}, function (n) {
		return n.getHours()
	});
	t.hours = t.hour.range;
	t.hours.utc = t.hour.utc.range;
	t.month = rn(function (n) {
		n = t.day(n);
		n.setDate(1);
		return n
	}, function (n, t) {
		n.setMonth(n.getMonth() + t)
	}, function (n) {
		return n.getMonth()
	});
	t.months = t.month.range;
	t.months.utc = t.month.utc.range;

	function fr(t, e, r) {
		function i(n) {
			return t(n)
		};
		i.invert = function (n) {
			return ln(t.invert(n))
		};
		i.domain = function (n) {
			if (!arguments.length) return t.domain().map(ln);
			t.domain(n);
			return i
		};

		function u(t, r) {
			var a = t[1] - t[0],
				u = a / r,
				i = n.bisect(jn, u);
			return i == jn.length ? [e.year, bn(t.map(function (n) {
				return n / 31536e6
			}), r)[2]] : !i ? [ia, bn(t, r)[2]] : e[u / jn[i - 1] < jn[i] / u ? i - 1 : i]
		};
		i.nice = function (n, t) {
			var r = i.domain(),
				a = wn(r),
				e = n == null ? u(a, 10) : typeof n === 'number' && u(a, n);
			if (e) n = e[0], t = e[1];

			function o(e) {
				return !isNaN(e) && !n.range(e, ln(+e + 1), t).length
			};
			return i.domain(Rt(r, t > 1 ? {
				floor: function (t) {
					while (o(t = n.floor(t))) t = ln(t - 1);
					return t
				},
				ceil: function (t) {
					while (o(t = n.ceil(t))) t = ln(+t + 1);
					return t
				}
			} : n))
		};
		i.ticks = function (n, t) {
			var e = wn(i.domain()),
				r = n == null ? u(e, 10) : typeof n === 'number' ? u(e, n) : !n.range && [{
					range: n
				}, t];
			if (r) n = r[0], t = r[1];
			return n.range(e[0], ln(+e[1] + 1), t < 1 ? 1 : t)
		};
		i.tickFormat = function () {
			return r
		};
		i.copy = function () {
			return fr(t.copy(), e, r)
		};
		return Ke(i, t)
	};

	function ln(n) {
		return new Date(n)
	};
	var jn = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
		Ht = [
			[t.second, 1],
			[t.second, 5],
			[t.second, 15],
			[t.second, 30],
			[t.minute, 1],
			[t.minute, 5],
			[t.minute, 15],
			[t.minute, 30],
			[t.hour, 1],
			[t.hour, 3],
			[t.hour, 6],
			[t.hour, 12],
			[t.day, 1],
			[t.day, 2],
			[t.week, 1],
			[t.month, 1],
			[t.month, 3],
			[t.year, 1]
		],
		ra = Yt.multi([
			['.%L', function (n) {
				return n.getMilliseconds()
			}],
			[':%S', function (n) {
				return n.getSeconds()
			}],
			['%I:%M', function (n) {
				return n.getMinutes()
			}],
			['%I %p', function (n) {
				return n.getHours()
			}],
			['%a %d', function (n) {
				return n.getDay() && n.getDate() != 1
			}],
			['%b %d', function (n) {
				return n.getDate() != 1
			}],
			['%B', function (n) {
				return n.getMonth()
			}],
			['%Y', An]
		]),
		ia = {
			range: function (t, e, r) {
				return n.range(Math.ceil(t / r) * r, +e, r).map(ln)
			},
			floor: h,
			ceil: h
		};
	Ht.year = t.year;
	t.scale = function () {
		return fr(n.scale.linear(), Ht, ra)
	};
	var sr = Ht.map(function (n) {
			return [n[0].utc, n[1]]
		}),
		ea = cr.multi([
			['.%L', function (n) {
				return n.getUTCMilliseconds()
			}],
			[':%S', function (n) {
				return n.getUTCSeconds()
			}],
			['%I:%M', function (n) {
				return n.getUTCMinutes()
			}],
			['%I %p', function (n) {
				return n.getUTCHours()
			}],
			['%a %d', function (n) {
				return n.getUTCDay() && n.getUTCDate() != 1
			}],
			['%b %d', function (n) {
				return n.getUTCDate() != 1
			}],
			['%B', function (n) {
				return n.getUTCMonth()
			}],
			['%Y', An]
		]);
	sr.year = t.year.utc;
	t.scale.utc = function () {
		return fr(n.scale.linear(), sr, ea)
	};
	n.text = Ne(function (n) {
		return n.responseText
	});
	n.json = function (n, t) {
		return vt(n, 'application/json', hf, t)
	};

	function hf(n) {
		return JSON.parse(n.responseText)
	};
	n.html = function (n, t) {
		return vt(n, 'text/html', gf, t)
	};

	function gf(n) {
		var t = p.createRange();
		t.selectNode(p.body);
		return t.createContextualFragment(n.responseText)
	};
	n.xml = Ne(function (n) {
		return n.responseXML
	});
	if (typeof define === 'function' && define.amd) this.d3 = n, define(n);
	else if (typeof module === 'object' && module.exports) module.exports = n;
	else this.d3 = n
}();
