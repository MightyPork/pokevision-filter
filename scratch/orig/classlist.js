
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
;
if (!('classList' in document.createElement('_'))) {
	(function (e) {
		'use strict';
		if (!('Element' in e)) return;
		var a = 'classList',
			t = 'prototype',
			l = e.Element[t],
			o = Object,
			h = String[t].trim || function () {
					return this.replace(/^\s+|\s+$/g, '')
				},
			f = Array[t].indexOf || function (e) {
					var t = 0,
						i = this.length;
					for (; t < i; t++) {
						if (t in this && this[t] === e) {
							return t
						}
					}
					;
					return -1
				},
			c = function (e, t) {
				this.name = e;
				this.code = DOMException[e];
				this.message = t
			},
			s = function (e, t) {
				if (t === '') {
					throw new c('SYNTAX_ERR', 'An invalid or illegal string was specified')
				}
				;
				if (/\s/.test(t)) {
					throw new c('INVALID_CHARACTER_ERR', 'String contains an invalid character')
				}
				;
				return f.call(e, t)
			},
			u = function (e) {
				var i = h.call(e.getAttribute('class') || ''),
					n = i ? i.split(/\s+/) : [],
					t = 0,
					o = n.length;
				for (; t < o; t++) {
					this.push(n[t])
				}
				;
				this._updateClassName = function () {
					e.setAttribute('class', this.toString())
				}
			},
			i = u[t] = [],
			d = function () {
				return new u(this)
			};
		c[t] = Error[t];
		i.item = function (e) {
			return this[e] || null
		};
		i.contains = function (e) {
			e += '';
			return s(this, e) !== -1
		};
		i.add = function () {
			var t = arguments,
				i = 0,
				o = t.length,
				e, n = !1;
			do {
				e = t[i] + '';
				if (s(this, e) === -1) {
					this.push(e);
					n = !0
				}
			}
			while (++i < o);
			if (n) {
				this._updateClassName()
			}
		};
		i.remove = function () {
			var i = arguments,
				n = 0,
				r = i.length,
				t, o = !1,
				e;
			do {
				t = i[n] + '';
				e = s(this, t);
				while (e !== -1) {
					this.splice(e, 1);
					o = !0;
					e = s(this, t)
				}
			}
			while (++n < r);
			if (o) {
				this._updateClassName()
			}
		};
		i.toggle = function (e, t) {
			e += '';
			var i = this.contains(e),
				n = i ? t !== !0 && 'remove' : t !== !1 && 'add';
			if (n) {
				this[n](e)
			}
			;
			if (t === !0 || t === !1) {
				return t
			} else {
				return !i
			}
		};
		i.toString = function () {
			return this.join(' ')
		};
		if (o.defineProperty) {
			var r = {
				get: d,
				enumerable: !0,
				configurable: !0
			};
			try {
				o.defineProperty(l, a, r)
			} catch (n) {
				if (n.number === -0x7FF5EC54) {
					r.enumerable = !1;
					o.defineProperty(l, a, r)
				}
			}
		} else if (o[t].__defineGetter__) {
			l.__defineGetter__(a, d)
		}
	}(self))
}
;
