/*! Lity - v1.6.6 - 2016-04-22
 * http://sorgalla.com/lity/
 * Copyright (c) 2016 Jan Sorgalla; Licensed MIT */
(function (e, t) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function (n) {
			return t(e, n)
		})
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = t(e, require('jquery'))
	} else {
		e.lity = t(e, e.jQuery || e.Zepto)
	}
}(typeof window !== 'undefined' ? window : this, function (t, e) {
	'use strict';
	var i = t.document,
		r = e(t),
		p = e('html'),
		a = 0,
		v = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
		m = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
		h = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
		g = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
		u = {
			image: x,
			inline: b,
			iframe: C
		};
	var d = {
		esc: !0,
		handler: null,
		template: '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>'
	};

	function f() {
		p[a > 0 ? 'addClass' : 'removeClass']('lity-active')
	};
	var s = (function () {
		var n = i.createElement('div'),
			t = {
				WebkitTransition: 'webkitTransitionEnd',
				MozTransition: 'transitionend',
				OTransition: 'oTransitionEnd otransitionend',
				transition: 'transitionend'
			};
		for (var e in t) {
			if (n.style[e] !== undefined) {
				return t[e]
			}
		}
		;
		return !1
	})();

	function c(t) {
		var n = e.Deferred();
		if (!s) {
			n.resolve()
		} else {
			t.one(s, n.resolve);
			setTimeout(n.resolve, 500)
		}
		;
		return n.promise()
	};

	function o(t, n, i) {
		if (arguments.length === 1) {
			return e.extend({}, t)
		}
		;
		if (typeof n === 'string') {
			if (typeof i === 'undefined') {
				return typeof t[n] === 'undefined' ? null : t[n]
			}
			;
			t[n] = i
		} else {
			e.extend(t, n)
		}
		;
		return this
	};

	function y(e) {
		var n = decodeURI(e).split('&'),
			r = {},
			i;
		for (var t = 0, o = n.length; t < o; t++) {
			if (!n[t]) {
				continue
			}
			;
			i = n[t].split('=');
			r[i[0]] = i[1]
		}
		;
		return r
	};

	function l(t, n) {
		return t + (t.indexOf('?') > -1 ? '&' : '?') + e.param(n)
	};

	function w(t) {
		return e('<span class="lity-error"/>').append(t)
	};

	function x(t) {
		if (!v.test(t)) {
			return !1
		}
		;
		var i = e('<img src="' + t + '">'),
			n = e.Deferred(),
			r = function () {
				n.reject(w('Failed loading image'))
			};
		i.on('load', function () {
			if (this.naturalWidth === 0) {
				return r()
			}
			;
			n.resolve(i)
		}).on('error', r);
		return n.promise()
	};

	function b(t) {
		var n;
		try {
			n = e(t)
		} catch (r) {
			return !1
		}
		;
		if (!n.length) {
			return !1
		}
		;
		var i = e('<span style="display:none !important" class="lity-inline-placeholder"/>');
		return n.after(i).on('lity:ready', function (e, t) {
			t.one('lity:remove', function () {
				i.before(n.addClass('lity-hide')).remove()
			})
		})
	};

	function C(t) {
		var n, i = t;
		n = m.exec(t);
		if (n) {
			i = l('https://www.youtube' + (n[2] || '') + '.com/embed/' + n[4], e.extend({
				autoplay: 1
			}, y(n[5] || '')))
		}
		;
		n = h.exec(t);
		if (n) {
			i = l('https://player.vimeo.com/video/' + n[3], e.extend({
				autoplay: 1
			}, y(n[4] || '')))
		}
		;
		n = g.exec(t);
		if (n) {
			i = l('https://www.google.' + n[3] + '/maps?' + n[6], {
				output: n[6].indexOf('layer=c') > 0 ? 'svembed' : 'embed'
			})
		}
		;
		return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + i + '"></iframe></div>'
	};

	function n(t) {
		var m = {},
			h = {},
			n, s, p = e.Deferred().resolve();

		function g(e) {
			if (e.keyCode === 27) {
				y()
			}
		};

		function v() {
			var e = i.documentElement.clientHeight ? i.documentElement.clientHeight : Math.round(r.height());
			s.css('max-height', Math.floor(e) + 'px').trigger('lity:resize', [n])
		};

		function x(t, i) {
			if (!n) {
				return
			}
			;
			s = e(i);
			r.on('resize', v);
			v();
			n.find('.lity-loader').each(function () {
				var t = e(this);
				c(t).always(function () {
					t.remove()
				})
			});
			n.removeClass('lity-loading').find('.lity-content').empty().append(s);
			s.removeClass('lity-hide').trigger('lity:ready', [n, t]);
			p.resolve()
		};

		function b(t, i, o, l) {
			p = e.Deferred();
			a++;
			f();
			n = e(o.template).addClass('lity-loading').appendTo('body');
			if (!!o.esc) {
				r.on('keyup', g)
			}
			;
			setTimeout(function () {
				n.addClass('lity-opened lity-' + t).on('click', '[data-lity-close]', function (t) {
					if (e(t.target).is('[data-lity-close]')) {
						y()
					}
				}).trigger('lity:open', [n, l]);
				e.when(i).always(e.proxy(x, null, l))
			}, 0)
		};

		function w(t, n, o) {
			var a, i, r = e.extend({}, u, h);
			n = e.extend({}, d, m, n);
			if (n.handler && r[n.handler]) {
				i = r[n.handler](t, l);
				a = n.handler
			} else {
				var f = {};
				e.each(['inline', 'iframe'], function (e, t) {
					if (r[t]) {
						f[t] = r[t]
					}
					;
					delete r[t]
				});
				var s = function (e, n) {
					if (!n) {
						return !0
					}
					;
					i = n(t, l);
					if (!!i) {
						a = e;
						return !1
					}
				};
				e.each(r, s);
				if (!a) {
					e.each(f, s)
				}
			}
			;
			if (i) {
				e.when(y()).done(e.proxy(b, null, a, i, n, o))
			}
			;
			return !!i
		};

		function y() {
			if (!n) {
				return
			}
			;
			var t = e.Deferred();
			p.done(function () {
				a--;
				f();
				r.off('resize', v).off('keyup', g);
				s.trigger('lity:close', [n]);
				n.removeClass('lity-opened').addClass('lity-closed');
				var e = n,
					i = s;
				n = null;
				s = null;
				c(i.add(e)).always(function () {
					i.trigger('lity:remove', [e]);
					e.remove();
					t.resolve()
				})
			});
			return t.promise()
		};

		function l(t) {
			if (!t.preventDefault) {
				return l.open(t)
			}
			;
			var n = e(this),
				i = n.data('lity-target') || n.attr('href') || n.attr('src');
			if (!i) {
				return
			}
			;
			var r = n.data('lity-options') || n.data('lity');
			if (w(i, r, n)) {
				n.blur();
				t.preventDefault()
			}
		};
		l.handlers = e.proxy(o, l, h);
		l.options = e.proxy(o, l, m);
		l.open = function (e, t, n) {
			w(e, t, n);
			return l
		};
		l.close = function () {
			y();
			return l
		};
		return l.options(t)
	};
	n.version = '1.6.6';
	n.handlers = e.proxy(o, n, u);
	n.options = e.proxy(o, n, d);
	e(i).on('click', '[data-lity]', n());
	return n
}));
