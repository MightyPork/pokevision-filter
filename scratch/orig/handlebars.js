
/*!

 handlebars v4.0.5

 Copyright (C) 2011-2015 by Yehuda Katz

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @license
 */
(function (e, t) {
	if (typeof exports === 'object' && typeof module === 'object') module.exports = t();
	else if (typeof define === 'function' && define.amd) define([], t);
	else if (typeof exports === 'object') exports['Handlebars'] = t();
	else e['Handlebars'] = t()
})(this, function () {
	return (function (e) {
		var r = {};

		function t(n) {
			if (r[n]) return r[n].exports;
			var a = r[n] = {
				exports: {},
				id: n,
				loaded: !1
			};
			e[n].call(a.exports, a, a.exports, t);
			a.loaded = !0;
			return a.exports
		};
		t.m = e;
		t.c = r;
		t.p = '';
		return t(0)
	})([function (e, t, r) {
		'use strict';
		var i = r(1)['default'],
			o = r(2)['default'];
		t.__esModule = !0;
		var f = r(3),
			s = i(f),
			c = r(17),
			d = o(c),
			p = r(5),
			h = o(p),
			m = r(4),
			a = i(m),
			v = r(18),
			u = i(v),
			g = r(19),
			x = o(g);

		function l() {
			var e = new s.HandlebarsEnvironment();
			a.extend(e, s);
			e.SafeString = d['default'];
			e.Exception = h['default'];
			e.Utils = a;
			e.escapeExpression = a.escapeExpression;
			e.VM = u;
			e.template = function (t) {
				return u.template(t, e)
			};
			return e
		};
		var n = l();
		n.create = l;
		x['default'](n);
		n['default'] = n;
		t['default'] = n;
		e.exports = t['default']
	}, function (e, t) {
		'use strict';
		t['default'] = function (e) {
			if (e && e.__esModule) {
				return e
			} else {
				var r = {};
				if (e != null) {
					for (var t in e) {
						if (Object.prototype.hasOwnProperty.call(e, t)) r[t] = e[t]
					}
				}
				;
				r['default'] = e;
				return r
			}
		};
		t.__esModule = !0
	}, function (e, t) {
		'use strict';
		t['default'] = function (e) {
			return e && e.__esModule ? e : {
				'default': e
			}
		};
		t.__esModule = !0
	}, function (e, t, r) {
		'use strict';
		var u = r(2)['default'];
		t.__esModule = !0;
		t.HandlebarsEnvironment = s;
		var n = r(4),
			d = r(5),
			o = u(d),
			p = r(6),
			h = r(14),
			m = r(16),
			a = u(m),
			v = '4.0.5';
		t.VERSION = v;
		var c = 7;
		t.COMPILER_REVISION = c;
		var f = {
			1: '<= 1.0.rc.2',
			2: '== 1.0.0-rc.3',
			3: '== 1.0.0-rc.4',
			4: '== 1.x.x',
			5: '== 2.0.0-alpha.x',
			6: '>= 2.0.0-beta.1',
			7: '>= 4.0.0'
		};
		t.REVISION_CHANGES = f;
		var i = '[object Object]';

		function s(e, t, r) {
			this.helpers = e || {};
			this.partials = t || {};
			this.decorators = r || {};
			p.registerDefaultHelpers(this);
			h.registerDefaultDecorators(this)
		};
		s.prototype = {
			constructor: s,
			logger: a['default'],
			log: a['default'].log,
			registerHelper: function (e, t) {
				if (n.toString.call(e) === i) {
					if (t) {
						throw new o['default']('Arg not supported with multiple helpers')
					}
					;
					n.extend(this.helpers, e)
				} else {
					this.helpers[e] = t
				}
			},
			unregisterHelper: function (e) {
				delete this.helpers[e]
			},
			registerPartial: function (e, t) {
				if (n.toString.call(e) === i) {
					n.extend(this.partials, e)
				} else {
					if (typeof t === 'undefined') {
						throw new o['default']('Attempting to register a partial called "' + e + '" as undefined')
					}
					;
					this.partials[e] = t
				}
			},
			unregisterPartial: function (e) {
				delete this.partials[e]
			},
			registerDecorator: function (e, t) {
				if (n.toString.call(e) === i) {
					if (t) {
						throw new o['default']('Arg not supported with multiple decorators')
					}
					;
					n.extend(this.decorators, e)
				} else {
					this.decorators[e] = t
				}
			},
			unregisterDecorator: function (e) {
				delete this.decorators[e]
			}
		};
		var l = a['default'].log;
		t.log = l;
		t.createFrame = n.createFrame;
		t.logger = a['default']
	}, function (e, t) {
		'use strict';
		t.__esModule = !0;
		t.extend = i;
		t.indexOf = f;
		t.escapeExpression = c;
		t.isEmpty = d;
		t.createFrame = p;
		t.blockParams = h;
		t.appendContextPath = m;
		var u = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			'\'': '&#x27;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};
		var o = /[&<>"'`=]/g,
			s = /[&<>"'`=]/;

		function l(e) {
			return u[e]
		};

		function i(e) {
			for (var t = 1; t < arguments.length; t++) {
				for (var r in arguments[t]) {
					if (Object.prototype.hasOwnProperty.call(arguments[t], r)) {
						e[r] = arguments[t][r]
					}
				}
			}
			;
			return e
		};
		var n = Object.prototype.toString;
		t.toString = n;
		var r = function (e) {
			return typeof e === 'function'
		};
		if (r(/x/)) {
			t.isFunction = r = function (e) {
				return typeof e === 'function' && n.call(e) === '[object Function]'
			}
		}
		;
		t.isFunction = r;
		var a = Array.isArray || function (e) {
				return e && typeof e === 'object' ? n.call(e) === '[object Array]' : !1
			};
		t.isArray = a;

		function f(e, t) {
			for (var r = 0, n = e.length; r < n; r++) {
				if (e[r] === t) {
					return r
				}
			}
			;
			return -1
		};

		function c(e) {
			if (typeof e !== 'string') {
				if (e && e.toHTML) {
					return e.toHTML()
				} else if (e == null) {
					return ''
				} else if (!e) {
					return e + ''
				}
				;
				e = '' + e
			}
			;
			if (!s.test(e)) {
				return e
			}
			;
			return e.replace(o, l)
		};

		function d(e) {
			if (!e && e !== 0) {
				return !0
			} else if (a(e) && e.length === 0) {
				return !0
			} else {
				return !1
			}
		};

		function p(e) {
			var t = i({}, e);
			t._parent = e;
			return t
		};

		function h(e, t) {
			e.path = t;
			return e
		};

		function m(e, t) {
			return (e ? e + '.' : '') + t
		}
	}, function (e, t) {
		'use strict';
		t.__esModule = !0;
		var r = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

		function n(e, t) {
			var i = t && t.loc,
				o = undefined,
				s = undefined;
			if (i) {
				o = i.start.line;
				s = i.start.column;
				e += ' - ' + o + ':' + s
			}
			;
			var u = Error.prototype.constructor.call(this, e);
			for (var a = 0; a < r.length; a++) {
				this[r[a]] = u[r[a]]
			}
			;
			if (Error.captureStackTrace) {
				Error.captureStackTrace(this, n)
			}
			;
			if (i) {
				this.lineNumber = o;
				this.column = s
			}
		};
		n.prototype = new Error();
		t['default'] = n;
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		var n = r(2)['default'];
		t.__esModule = !0;
		t.registerDefaultHelpers = x;
		var a = r(7),
			i = n(a),
			o = r(8),
			s = n(o),
			u = r(9),
			l = n(u),
			f = r(10),
			c = n(f),
			d = r(11),
			p = n(d),
			h = r(12),
			m = n(h),
			v = r(13),
			g = n(v);

		function x(e) {
			i['default'](e);
			s['default'](e);
			l['default'](e);
			c['default'](e);
			p['default'](e);
			m['default'](e);
			g['default'](e)
		}
	}, function (e, t, r) {
		'use strict';
		t.__esModule = !0;
		var n = r(4);
		t['default'] = function (e) {
			e.registerHelper('blockHelperMissing', function (t, r) {
				var i = r.inverse,
					o = r.fn;
				if (t === !0) {
					return o(this)
				} else if (t === !1 || t == null) {
					return i(this)
				} else if (n.isArray(t)) {
					if (t.length > 0) {
						if (r.ids) {
							r.ids = [r.name]
						}
						;
						return e.helpers.each(t, r)
					} else {
						return i(this)
					}
				} else {
					if (r.data && r.ids) {
						var a = n.createFrame(r.data);
						a.contextPath = n.appendContextPath(r.data.contextPath, r.name);
						r = {
							data: a
						}
					}
					;
					return o(t, r)
				}
			})
		};
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		var o = r(2)['default'];
		t.__esModule = !0;
		var n = r(4),
			a = r(5),
			i = o(a);
		t['default'] = function (e) {
			e.registerHelper('each', function (e, t) {
				if (!t) {
					throw new i['default']('Must pass iterator to #each')
				}
				;
				var d = t.fn,
					p = t.inverse,
					r = 0,
					s = '',
					a = undefined,
					u = undefined;
				if (t.data && t.ids) {
					u = n.appendContextPath(t.data.contextPath, t.ids[0]) + '.'
				}
				;
				if (n.isFunction(e)) {
					e = e.call(this)
				}
				;
				if (t.data) {
					a = n.createFrame(t.data)
				}
				;

				function l(t, r, i) {
					if (a) {
						a.key = t;
						a.index = r;
						a.first = r === 0;
						a.last = !!i;
						if (u) {
							a.contextPath = u + t
						}
					}
					;
					s = s + d(e[t], {
							data: a,
							blockParams: n.blockParams([e[t], t], [u + t, null])
						})
				};
				if (e && typeof e === 'object') {
					if (n.isArray(e)) {
						for (var c = e.length; r < c; r++) {
							if (r in e) {
								l(r, r, r === e.length - 1)
							}
						}
					} else {
						var o = undefined;
						for (var f in e) {
							if (e.hasOwnProperty(f)) {
								if (o !== undefined) {
									l(o, r - 1)
								}
								;
								o = f;
								r++
							}
						}
						;
						if (o !== undefined) {
							l(o, r - 1, !0)
						}
					}
				}
				;
				if (r === 0) {
					s = p(this)
				}
				;
				return s
			})
		};
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		var i = r(2)['default'];
		t.__esModule = !0;
		var n = r(5),
			a = i(n);
		t['default'] = function (e) {
			e.registerHelper('helperMissing', function () {
				if (arguments.length === 1) {
					return undefined
				} else {
					throw new a['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"')
				}
			})
		};
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		t.__esModule = !0;
		var n = r(4);
		t['default'] = function (e) {
			e.registerHelper('if', function (e, t) {
				if (n.isFunction(e)) {
					e = e.call(this)
				}
				;
				if (!t.hash.includeZero && !e || n.isEmpty(e)) {
					return t.inverse(this)
				} else {
					return t.fn(this)
				}
			});
			e.registerHelper('unless', function (t, r) {
				return e.helpers['if'].call(this, t, {
					fn: r.inverse,
					inverse: r.fn,
					hash: r.hash
				})
			})
		};
		e.exports = t['default']
	}, function (e, t) {
		'use strict';
		t.__esModule = !0;
		t['default'] = function (e) {
			e.registerHelper('log', function () {
				var a = [undefined],
					t = arguments[arguments.length - 1];
				for (var n = 0; n < arguments.length - 1; n++) {
					a.push(arguments[n])
				}
				;
				var r = 1;
				if (t.hash.level != null) {
					r = t.hash.level
				} else if (t.data && t.data.level != null) {
					r = t.data.level
				}
				;
				a[0] = r;
				e.log.apply(e, a)
			})
		};
		e.exports = t['default']
	}, function (e, t) {
		'use strict';
		t.__esModule = !0;
		t['default'] = function (e) {
			e.registerHelper('lookup', function (e, t) {
				return e && e[t]
			})
		};
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		t.__esModule = !0;
		var n = r(4);
		t['default'] = function (e) {
			e.registerHelper('with', function (e, t) {
				if (n.isFunction(e)) {
					e = e.call(this)
				}
				;
				var a = t.fn;
				if (!n.isEmpty(e)) {
					var r = t.data;
					if (t.data && t.ids) {
						r = n.createFrame(t.data);
						r.contextPath = n.appendContextPath(t.data.contextPath, t.ids[0])
					}
					;
					return a(e, {
						data: r,
						blockParams: n.blockParams([e], [r && r.contextPath])
					})
				} else {
					return t.inverse(this)
				}
			})
		};
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		var i = r(2)['default'];
		t.__esModule = !0;
		t.registerDefaultDecorators = o;
		var n = r(15),
			a = i(n);

		function o(e) {
			a['default'](e)
		}
	}, function (e, t, r) {
		'use strict';
		t.__esModule = !0;
		var n = r(4);
		t['default'] = function (e) {
			e.registerDecorator('inline', function (e, t, r, a) {
				var i = e;
				if (!t.partials) {
					t.partials = {};
					i = function (a, i) {
						var o = r.partials;
						r.partials = n.extend({}, o, t.partials);
						var s = e(a, i);
						r.partials = o;
						return s
					}
				}
				;
				t.partials[a.args[0]] = a.fn;
				return i
			})
		};
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		t.__esModule = !0;
		var a = r(4),
			n = {
				methodMap: ['debug', 'info', 'warn', 'error'],
				level: 'info',
				lookupLevel: function (e) {
					if (typeof e === 'string') {
						var t = a.indexOf(n.methodMap, e.toLowerCase());
						if (t >= 0) {
							e = t
						} else {
							e = parseInt(e, 10)
						}
					}
					;
					return e
				},
				log: function (e) {
					e = n.lookupLevel(e);
					if (typeof console !== 'undefined' && n.lookupLevel(n.level) <= e) {
						var a = n.methodMap[e];
						if (!console[a]) {
							a = 'log'
						}
						;
						for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
							i[t - 1] = arguments[t]
						}
						;
						console[a].apply(console, i)
					}
				}
			};
		t['default'] = n;
		e.exports = t['default']
	}, function (e, t) {
		'use strict';
		t.__esModule = !0;

		function r(e) {
			this.string = e
		};
		r.prototype.toString = r.prototype.toHTML = function () {
			return '' + this.string
		};
		t['default'] = r;
		e.exports = t['default']
	}, function (e, t, r) {
		'use strict';
		var c = r(1)['default'],
			d = r(2)['default'];
		t.__esModule = !0;
		t.checkRevision = p;
		t.template = h;
		t.wrapProgram = o;
		t.resolvePartial = m;
		t.invokePartial = v;
		t.noop = s;
		var l = r(4),
			a = c(l),
			f = r(5),
			n = d(f),
			i = r(3);

		function p(e) {
			var t = e && e[0] || 1,
				r = i.COMPILER_REVISION;
			if (t !== r) {
				if (t < r) {
					var a = i.REVISION_CHANGES[r],
						o = i.REVISION_CHANGES[t];
					throw new n['default']('Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (' + a + ') or downgrade your runtime to an older version (' + o + ').')
				} else {
					throw new n['default']('Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (' + e[1] + ').')
				}
			}
		};

		function h(e, t) {
			if (!t) {
				throw new n['default']('No environment passed to template')
			}
			;
			if (!e || !e.main) {
				throw new n['default']('Unknown template object: ' + typeof e)
			}
			;
			e.main.decorator = e.main_d;
			t.VM.checkRevision(e.compiler);

			function s(r, i, o) {
				if (o.hash) {
					i = a.extend({}, i, o.hash);
					if (o.ids) {
						o.ids[0] = !0
					}
				}
				;
				r = t.VM.resolvePartial.call(this, r, i, o);
				var u = t.VM.invokePartial.call(this, r, i, o);
				if (u == null && t.compile) {
					o.partials[o.name] = t.compile(r, e.compilerOptions, t);
					u = o.partials[o.name](i, o)
				}
				;
				if (u != null) {
					if (o.indent) {
						var l = u.split('\n');
						for (var s = 0, f = l.length; s < f; s++) {
							if (!l[s] && s + 1 === f) {
								break
							}
							;
							l[s] = o.indent + l[s]
						}
						;
						u = l.join('\n')
					}
					;
					return u
				} else {
					throw new n['default']('The partial ' + o.name + ' could not be compiled when running in runtime-only mode')
				}
			};
			var r = {
				strict: function (e, t) {
					if (!(t in e)) {
						throw new n['default']('"' + t + '" not defined in ' + e)
					}
					;
					return e[t]
				},
				lookup: function (e, t) {
					var n = e.length;
					for (var r = 0; r < n; r++) {
						if (e[r] && e[r][t] != null) {
							return e[r][t]
						}
					}
				},
				lambda: function (e, t) {
					return typeof e === 'function' ? e.call(t) : e
				},
				escapeExpression: a.escapeExpression,
				invokePartial: s,
				fn: function (t) {
					var r = e[t];
					r.decorator = e[t + '_d'];
					return r
				},
				programs: [],
				program: function (e, t, r, n, a) {
					var i = this.programs[e],
						s = this.fn(e);
					if (t || a || n || r) {
						i = o(this, e, s, t, r, n, a)
					} else if (!i) {
						i = this.programs[e] = o(this, e, s)
					}
					;
					return i
				},
				data: function (e, t) {
					while (e && t--) {
						e = e._parent
					}
					;
					return e
				},
				merge: function (e, t) {
					var r = e || t;
					if (e && t && e !== t) {
						r = a.extend({}, t, e)
					}
					;
					return r
				},
				noop: t.VM.noop,
				compilerInfo: e.compiler
			};

			function i(t) {
				var n = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
				var a = n.data;
				i._setup(n);
				if (!n.partial && e.useData) {
					a = g(t, a)
				}
				;
				var o = undefined,
					l = e.useBlockParams ? [] : undefined;
				if (e.useDepths) {
					if (n.depths) {
						o = t !== n.depths[0] ? [t].concat(n.depths) : n.depths
					} else {
						o = [t]
					}
				}
				;

				function s(t) {
					return '' + e.main(r, t, r.helpers, r.partials, a, l, o)
				};
				s = u(e.main, s, r, n.depths || [], a, l);
				return s(t, n)
			};
			i.isTop = !0;
			i._setup = function (n) {
				if (!n.partial) {
					r.helpers = r.merge(n.helpers, t.helpers);
					if (e.usePartial) {
						r.partials = r.merge(n.partials, t.partials)
					}
					;
					if (e.usePartial || e.useDecorators) {
						r.decorators = r.merge(n.decorators, t.decorators)
					}
				} else {
					r.helpers = n.helpers;
					r.partials = n.partials;
					r.decorators = n.decorators
				}
			};
			i._child = function (t, a, i, s) {
				if (e.useBlockParams && !i) {
					throw new n['default']('must pass block params')
				}
				;
				if (e.useDepths && !s) {
					throw new n['default']('must pass parent depths')
				}
				;
				return o(r, t, e[t], a, 0, i, s)
			};
			return i
		};

		function o(e, t, r, a, s, o, n) {
			function i(t) {
				var s = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
				var i = n;
				if (n && t !== n[0]) {
					i = [t].concat(n)
				}
				;
				return r(e, t, e.helpers, e.partials, s.data || a, o && [s.blockParams].concat(o), i)
			};
			i = u(r, i, e, n, a, o);
			i.program = t;
			i.depth = n ? n.length : 0;
			i.blockParams = s || 0;
			return i
		};

		function m(e, t, r) {
			if (!e) {
				if (r.name === '@partial-block') {
					e = r.data['partial-block']
				} else {
					e = r.partials[r.name]
				}
			} else if (!e.call && !r.name) {
				r.name = e;
				e = r.partials[e]
			}
			;
			return e
		};

		function v(e, t, r) {
			r.partial = !0;
			if (r.ids) {
				r.data.contextPath = r.ids[0] || r.data.contextPath
			}
			;
			var o = undefined;
			if (r.fn && r.fn !== s) {
				r.data = i.createFrame(r.data);
				o = r.data['partial-block'] = r.fn;
				if (o.partials) {
					r.partials = a.extend({}, r.partials, o.partials)
				}
			}
			;
			if (e === undefined && o) {
				e = o
			}
			;
			if (e === undefined) {
				throw new n['default']('The partial ' + r.name + ' could not be found')
			} else if (e instanceof Function) {
				return e(t, r)
			}
		};

		function s() {
			return ''
		};

		function g(e, t) {
			if (!t || !('root' in t)) {
				t = t ? i.createFrame(t) : {};
				t.root = e
			}
			;
			return t
		};

		function u(e, t, r, n, i, o) {
			if (e.decorator) {
				var s = {};
				t = e.decorator(t, s, r, n && n[0], i, o, n);
				a.extend(t, s)
			}
			;
			return t
		}
	}, function (e, t) {
		(function (r) {
			'use strict';
			t.__esModule = !0;
			t['default'] = function (e) {
				var t = typeof r !== 'undefined' ? r : window,
					n = t.Handlebars;
				e.noConflict = function () {
					if (t.Handlebars === e) {
						t.Handlebars = n
					}
					;
					return e
				}
			};
			e.exports = t['default']
		}.call(t, (function () {
			return this
		}())))
	}])
});
