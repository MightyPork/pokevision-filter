
/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */
;
window.Modernizr = (function (e, t, c) {
	var z = '2.8.3',
		r = {},
		E = !0,
		s = t.documentElement,
		i = 'modernizr',
		k = t.createElement(i),
		l = k.style,
		a = t.createElement('input'),
		w = ':)',
		T = {}.toString,
		p = ' -webkit- -moz- -o- -ms- '.split(' '),
		N = 'Webkit Moz O ms',
		M = N.split(' '),
		P = N.toLowerCase().split(' '),
		h = {
			'svg': 'http://www.w3.org/2000/svg'
		},
		n = {},
		j = {},
		g = {},
		x = [],
		S = x.slice,
		v, f = function (e, n, r, l) {
			var f, d, u, m, o = t.createElement('div'),
				c = t.body,
				a = c || t.createElement('body');
			if (parseInt(r, 10)) {
				while (r--) {
					u = t.createElement('div');
					u.id = l ? l[r] : i + (r + 1);
					o.appendChild(u)
				}
			}
			;
			f = ['&#173;', '<style id="s', i, '">', e, '</style>'].join('');
			o.id = i;
			(c ? o : a).innerHTML += f;
			a.appendChild(o);
			if (!c) {
				a.style.background = '';
				a.style.overflow = 'hidden';
				m = s.style.overflow;
				s.style.overflow = 'hidden';
				s.appendChild(a)
			}
			;
			d = n(o, e);
			if (!c) {
				a.parentNode.removeChild(a);
				s.style.overflow = m
			} else {
				o.parentNode.removeChild(o)
			}
			;
			return !!d
		},
		A = function (t) {
			var n = e.matchMedia || e.msMatchMedia;
			if (n) {
				return n(t) && n(t).matches || !1
			}
			;
			var r;
			f('@media ' + t + ' { #' + i + ' { position: absolute; } }', function (t) {
				r = (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle)['position'] == 'absolute'
			});
			return r
		},
		D = (function () {
			var e = {
				'select': 'input',
				'change': 'input',
				'submit': 'form',
				'reset': 'form',
				'error': 'img',
				'load': 'img',
				'abort': 'img'
			};

			function n(n, r) {
				r = r || t.createElement(e[n] || 'div');
				n = 'on' + n;
				var o = n in r;
				if (!o) {
					if (!r.setAttribute) {
						r = t.createElement('div')
					}
					;
					if (r.setAttribute && r.removeAttribute) {
						r.setAttribute(n, '');
						o = u(r[n], 'function');
						if (!u(r[n], 'undefined')) {
							r[n] = c
						}
						;
						r.removeAttribute(n)
					}
				}
				;
				r = null;
				return o
			};
			return n
		})(),
		C = ({}).hasOwnProperty,
		y;
	if (!u(C, 'undefined') && !u(C.call, 'undefined')) {
		y = function (e, t) {
			return C.call(e, t)
		}
	} else {
		y = function (e, t) {
			return ((t in e) && u(e.constructor.prototype[t], 'undefined'))
		}
	}
	;
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (e) {
			var t = this;
			if (typeof t != 'function') {
				throw new TypeError()
			}
			;
			var n = S.call(arguments, 1),
				r = function () {
					if (this instanceof r) {
						var a = function () {
						};
						a.prototype = t.prototype;
						var i = new a(),
							o = t.apply(i, n.concat(S.call(arguments)));
						if (Object(o) === o) {
							return o
						}
						;
						return i
					} else {
						return t.apply(e, n.concat(S.call(arguments)))
					}
				};
			return r
		}
	}
	;

	function d(e) {
		l.cssText = e
	};

	function L(e, t) {
		return d(p.join(e + ';') + (t || ''))
	};

	function u(e, t) {
		return typeof e === t
	};

	function m(e, t) {
		return !!~('' + e).indexOf(t)
	};

	function F(e, t) {
		for (var r in e) {
			var n = e[r];
			if (!m(n, '-') && l[n] !== c) {
				return t == 'pfx' ? n : !0
			}
		}
		;
		return !1
	};

	function H(e, t, n) {
		for (var o in e) {
			var r = t[e[o]];
			if (r !== c) {
				if (n === !1) return e[o];
				if (u(r, 'function')) {
					return r.bind(n || t)
				}
				;
				return r
			}
		}
		;
		return !1
	};

	function o(e, t, n) {
		var r = e.charAt(0).toUpperCase() + e.slice(1),
			o = (e + ' ' + M.join(r + ' ') + r).split(' ');
		if (u(t, 'string') || u(t, 'undefined')) {
			return F(o, t)
		} else {
			o = (e + ' ' + (P).join(r + ' ') + r).split(' ');
			return H(o, t, n)
		}
	};
	n['flexbox'] = function () {
		return o('flexWrap')
	};
	n['flexboxlegacy'] = function () {
		return o('boxDirection')
	};
	n['canvas'] = function () {
		var e = t.createElement('canvas');
		return !!(e.getContext && e.getContext('2d'))
	};
	n['canvastext'] = function () {
		return !!(r['canvas'] && u(t.createElement('canvas').getContext('2d').fillText, 'function'))
	};
	n['webgl'] = function () {
		return !!e.WebGLRenderingContext
	};
	n['touch'] = function () {
		var n;
		if (('ontouchstart' in e) || e.DocumentTouch && t instanceof DocumentTouch) {
			n = !0
		} else {
			f(['@media (', p.join('touch-enabled),('), i, ')', '{#modernizr{top:9px;position:absolute}}'].join(''), function (e) {
				n = e.offsetTop === 9
			})
		}
		;
		return n
	};
	n['geolocation'] = function () {
		return 'geolocation' in navigator
	};
	n['postmessage'] = function () {
		return !!e.postMessage
	};
	n['websqldatabase'] = function () {
		return !!e.openDatabase
	};
	n['indexedDB'] = function () {
		return !!o('indexedDB', e)
	};
	n['hashchange'] = function () {
		return D('hashchange', e) && (t.documentMode === c || t.documentMode > 7)
	};
	n['history'] = function () {
		return !!(e.history && history.pushState)
	};
	n['draganddrop'] = function () {
		var e = t.createElement('div');
		return ('draggable' in e) || ('ondragstart' in e && 'ondrop' in e)
	};
	n['websockets'] = function () {
		return 'WebSocket' in e || 'MozWebSocket' in e
	};
	n['rgba'] = function () {
		d('background-color:rgba(150,255,150,.5)');
		return m(l.backgroundColor, 'rgba')
	};
	n['hsla'] = function () {
		d('background-color:hsla(120,40%,100%,.5)');
		return m(l.backgroundColor, 'rgba') || m(l.backgroundColor, 'hsla')
	};
	n['multiplebgs'] = function () {
		d('background:url(https://),url(https://),red url(https://)');
		return (/(url\s*\(.*?){3}/).test(l.background)
	};
	n['backgroundsize'] = function () {
		return o('backgroundSize')
	};
	n['borderimage'] = function () {
		return o('borderImage')
	};
	n['borderradius'] = function () {
		return o('borderRadius')
	};
	n['boxshadow'] = function () {
		return o('boxShadow')
	};
	n['textshadow'] = function () {
		return t.createElement('div').style.textShadow === ''
	};
	n['opacity'] = function () {
		L('opacity:.55');
		return (/^0.55$/).test(l.opacity)
	};
	n['cssanimations'] = function () {
		return o('animationName')
	};
	n['csscolumns'] = function () {
		return o('columnCount')
	};
	n['cssgradients'] = function () {
		var e = 'background-image:',
			t = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
			n = 'linear-gradient(left top,#9f9, white);';
		d((e + '-webkit- '.split(' ').join(t + e) + p.join(n + e)).slice(0, -e.length));
		return m(l.backgroundImage, 'gradient')
	};
	n['cssreflections'] = function () {
		return o('boxReflect')
	};
	n['csstransforms'] = function () {
		return !!o('transform')
	};
	n['csstransforms3d'] = function () {
		var e = !!o('perspective');
		if (e && 'webkitPerspective' in s.style) {
			f('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function (t, n) {
				e = t.offsetLeft === 9 && t.offsetHeight === 3
			})
		}
		;
		return e
	};
	n['csstransitions'] = function () {
		return o('transition')
	};
	n['fontface'] = function () {
		var e;
		f('@font-face {font-family:"font";src:url("https://")}', function (n, r) {
			var i = t.getElementById('smodernizr'),
				o = i.sheet || i.styleSheet,
				a = o ? (o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || '') : '';
			e = /src/i.test(a) && a.indexOf(r.split(' ')[0]) === 0
		});
		return e
	};
	n['generatedcontent'] = function () {
		var e;
		f(['#', i, '{font:0/0 a}#', i, ':after{content:"', w, '";visibility:hidden;font:3px/1 a}'].join(''), function (t) {
			e = t.offsetHeight >= 3
		});
		return e
	};
	n['video'] = function () {
		var n = t.createElement('video'),
			e = !1;
		try {
			if (e = !!n.canPlayType) {
				e = new Boolean(e);
				e.ogg = n.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
				e.h264 = n.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
				e.webm = n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '')
			}
		} catch (r) {
		}
		;
		return e
	};
	n['audio'] = function () {
		var n = t.createElement('audio'),
			e = !1;
		try {
			if (e = !!n.canPlayType) {
				e = new Boolean(e);
				e.ogg = n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
				e.mp3 = n.canPlayType('audio/mpeg;').replace(/^no$/, '');
				e.wav = n.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
				e.m4a = (n.canPlayType('audio/x-m4a;') || n.canPlayType('audio/aac;')).replace(/^no$/, '')
			}
		} catch (r) {
		}
		;
		return e
	};
	n['localstorage'] = function () {
		try {
			localStorage.setItem(i, i);
			localStorage.removeItem(i);
			return !0
		} catch (e) {
			return !1
		}
	};
	n['sessionstorage'] = function () {
		try {
			sessionStorage.setItem(i, i);
			sessionStorage.removeItem(i);
			return !0
		} catch (e) {
			return !1
		}
	};
	n['webworkers'] = function () {
		return !!e.Worker
	};
	n['applicationcache'] = function () {
		return !!e.applicationCache
	};
	n['svg'] = function () {
		return !!t.createElementNS && !!t.createElementNS(h.svg, 'svg').createSVGRect
	};
	n['inlinesvg'] = function () {
		var e = t.createElement('div');
		e.innerHTML = '<svg/>';
		return (e.firstChild && e.firstChild.namespaceURI) == h.svg
	};
	n['smil'] = function () {
		return !!t.createElementNS && /SVGAnimate/.test(T.call(t.createElementNS(h.svg, 'animate')))
	};
	n['svgclippaths'] = function () {
		return !!t.createElementNS && /SVGClipPath/.test(T.call(t.createElementNS(h.svg, 'clipPath')))
	};

	function I() {
		r['input'] = (function (n) {
			for (var r = 0, o = n.length; r < o; r++) {
				g[n[r]] = !!(n[r] in a)
			}
			;
			if (g.list) {
				g.list = !!(t.createElement('datalist') && e.HTMLDataListElement)
			}
			;
			return g
		})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
		r['inputtypes'] = (function (e) {
			for (var r = 0, n, o, i, u = e.length; r < u; r++) {
				a.setAttribute('type', o = e[r]);
				n = a.type !== 'text';
				if (n) {
					a.value = w;
					a.style.cssText = 'position:absolute;visibility:hidden;';
					if (/^range$/.test(o) && a.style.WebkitAppearance !== c) {
						s.appendChild(a);
						i = t.defaultView;
						n = i.getComputedStyle && i.getComputedStyle(a, null).WebkitAppearance !== 'textfield' && (a.offsetHeight !== 0);
						s.removeChild(a)
					} else if (/^(search|tel)$/.test(o)) {
					} else if (/^(url|email)$/.test(o)) {
						n = a.checkValidity && a.checkValidity() === !1
					} else {
						n = a.value != w
					}
				}
				;
				j[e[r]] = !!n
			}
			;
			return j
		})('search tel url email datetime date month week time datetime-local number range color'.split(' '))
	};
	for (var b in n) {
		if (y(n, b)) {
			v = b.toLowerCase();
			r[v] = n[b]();
			x.push((r[v] ? '' : 'no-') + v)
		}
	}
	;
	r.input || I();
	r.addTest = function (e, t) {
		if (typeof e == 'object') {
			for (var n in e) {
				if (y(e, n)) {
					r.addTest(n, e[n])
				}
			}
		} else {
			e = e.toLowerCase();
			if (r[e] !== c) {
				return r
			}
			;
			t = typeof t == 'function' ? t() : t;
			if (typeof E !== 'undefined' && E) {
				s.className += ' ' + (t ? '' : 'no-') + e
			}
			;
			r[e] = t
		}
		;
		return r
	};
	d('');
	k = a = null;
	(function (e, t) {
		var h = '3.7.0',
			a = e.html5 || {};
		var m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			o, s = '_html5shiv',
			i = 0,
			u = {};
		var n;
		(function () {
			try {
				var r = t.createElement('a');
				r.innerHTML = '<xyz></xyz>';
				o = ('hidden' in r);
				n = r.childNodes.length == 1 || (function () {
						(t.createElement)('a');
						var e = t.createDocumentFragment();
						return (typeof e.cloneNode == 'undefined' || typeof e.createDocumentFragment == 'undefined' || typeof e.createElement == 'undefined')
					}())
			} catch (e) {
				o = !0;
				n = !0
			}
		}());

		function g(e, t) {
			var n = e.createElement('p'),
				r = e.getElementsByTagName('head')[0] || e.documentElement;
			n.innerHTML = 'x<style>' + t + '</style>';
			return r.insertBefore(n.lastChild, r.firstChild)
		};

		function l() {
			var e = r.elements;
			return typeof e == 'string' ? e.split(' ') : e
		};

		function c(e) {
			var t = u[e[s]];
			if (!t) {
				t = {};
				i++;
				e[s] = i;
				u[i] = t
			}
			;
			return t
		};

		function f(e, r, o) {
			if (!r) {
				r = t
			}
			;
			if (n) {
				return r.createElement(e)
			}
			;
			if (!o) {
				o = c(r)
			}
			;
			var i;
			if (o.cache[e]) {
				i = o.cache[e].cloneNode()
			} else if (p.test(e)) {
				i = (o.cache[e] = o.createElem(e)).cloneNode()
			} else {
				i = o.createElem(e)
			}
			;
			return i.canHaveChildren && !m.test(e) && !i.tagUrn ? o.frag.appendChild(i) : i
		};

		function v(e, r) {
			if (!e) {
				e = t
			}
			;
			if (n) {
				return e.createDocumentFragment()
			}
			;
			r = r || c(e);
			var i = r.frag.cloneNode(),
				o = 0,
				a = l(),
				s = a.length;
			for (; o < s; o++) {
				i.createElement(a[o])
			}
			;
			return i
		};

		function y(e, t) {
			if (!t.cache) {
				t.cache = {};
				t.createElem = e.createElement;
				t.createFrag = e.createDocumentFragment;
				t.frag = t.createFrag()
			}
			;
			e.createElement = function (n) {
				if (!r.shivMethods) {
					return t.createElem(n)
				}
				;
				return f(n, e, t)
			};
			e.createDocumentFragment = Function('h,f', 'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' + l().join().replace(/[\w\-]+/g, function (e) {
					t.createElem(e);
					t.frag.createElement(e);
					return 'c("' + e + '")'
				}) + ');return n}')(r, t.frag)
		};

		function d(e) {
			if (!e) {
				e = t
			}
			;
			var i = c(e);
			if (r.shivCSS && !o && !i.hasCSS) {
				i.hasCSS = !!g(e, 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}')
			}
			;
			if (!n) {
				y(e, i)
			}
			;
			return e
		};
		var r = {
			'elements': a.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',
			'version': h,
			'shivCSS': (a.shivCSS !== !1),
			'supportsUnknownElements': n,
			'shivMethods': (a.shivMethods !== !1),
			'type': 'default',
			'shivDocument': d,
			createElement: f,
			createDocumentFragment: v
		};
		e.html5 = r;
		d(t)
	}(this, t));
	r._version = z;
	r._prefixes = p;
	r._domPrefixes = P;
	r._cssomPrefixes = M;
	r.mq = A;
	r.hasEvent = D;
	r.testProp = function (e) {
		return F([e])
	};
	r.testAllProps = o;
	r.testStyles = f;
	r.prefixed = function (e, t, n) {
		if (!t) {
			return o(e, 'pfx')
		} else {
			return o(e, t, n)
		}
	};
	s.className = s.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + (E ? ' js ' + x.join(' ') : '');
	return r
})(this, this.document);
