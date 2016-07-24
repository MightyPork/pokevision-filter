
/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
(function (e) {
	'use strict';
	e.URL = e.URL || e.webkitURL;
	if (e.Blob && e.URL) {
		try {
			new Blob;
			return
		} catch (t) {
		}
	}
	;
	var n = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || (function (e) {
			var l = function (e) {
					return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]
				},
				c = function () {
					this.data = []
				},
				t = function (e, t, i) {
					this.data = e;
					this.size = e.length;
					this.type = t;
					this.encoding = i
				},
				o = c.prototype,
				n = t.prototype,
				u = e.FileReaderSync,
				d = function (e) {
					this.code = this[this.name = e]
				},
				h = ('NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR').split(' '),
				s = h.length,
				i = e.URL || e.webkitURL || e,
				f = i.createObjectURL,
				m = i.revokeObjectURL,
				r = i,
				p = e.btoa,
				g = e.atob,
				b = e.ArrayBuffer,
				a = e.Uint8Array,
				v = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
			t.fake = n.fake = !0;
			while (s--) {
				d.prototype[h[s]] = s + 1
			}
			;
			if (!i.createObjectURL) {
				r = e.URL = function (e) {
					var t = document.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
						i;
					t.href = e;
					if (!('origin' in t)) {
						if (t.protocol.toLowerCase() === 'data:') {
							t.origin = null
						} else {
							i = e.match(v);
							t.origin = i && i[1]
						}
					}
					;
					return t
				}
			}
			;
			r.createObjectURL = function (e) {
				var o = e.type,
					n;
				if (o === null) {
					o = 'application/octet-stream'
				}
				;
				if (e instanceof t) {
					n = 'data:' + o;
					if (e.encoding === 'base64') {
						return n + ';base64,' + e.data
					} else if (e.encoding === 'URI') {
						return n + ',' + decodeURIComponent(e.data)
					}
					;
					if (p) {
						return n + ';base64,' + p(e.data)
					} else {
						return n + ',' + encodeURIComponent(e.data)
					}
				} else if (f) {
					return f.call(i, e)
				}
			};
			r.revokeObjectURL = function (e) {
				if (e.substring(0, 5) !== 'data:' && m) {
					m.call(i, e)
				}
			};
			o.append = function (e) {
				var i = this.data;
				if (a && (e instanceof b || e instanceof a)) {
					var o = '',
						s = new a(e),
						n = 0,
						c = s.length;
					for (; n < c; n++) {
						o += String.fromCharCode(s[n])
					}
					;
					i.push(o)
				} else if (l(e) === 'Blob' || l(e) === 'File') {
					if (u) {
						var r = new u;
						i.push(r.readAsBinaryString(e))
					} else {
						throw new d('NOT_READABLE_ERR')
					}
				} else if (e instanceof t) {
					if (e.encoding === 'base64' && g) {
						i.push(g(e.data))
					} else if (e.encoding === 'URI') {
						i.push(decodeURIComponent(e.data))
					} else if (e.encoding === 'raw') {
						i.push(e.data)
					}
				} else {
					if (typeof e !== 'string') {
						e += ''
					}
					;
					i.push(unescape(encodeURIComponent(e)))
				}
			};
			o.getBlob = function (e) {
				if (!arguments.length) {
					e = null
				}
				;
				return new t(this.data.join(''), e, 'raw')
			};
			o.toString = function () {
				return '[object BlobBuilder]'
			};
			n.slice = function (e, i, n) {
				var o = arguments.length;
				if (o < 3) {
					n = null
				}
				;
				return new t(this.data.slice(e, o > 1 ? i : this.data.length), n, this.encoding)
			};
			n.toString = function () {
				return '[object Blob]'
			};
			n.close = function () {
				this.size = 0;
				delete this.data
			};
			return c
		}(e));
	e.Blob = function (e, t) {
		var a = t ? (t.type || '') : '',
			s = new n();
		if (e) {
			for (var o = 0, r = e.length; o < r; o++) {
				if (Uint8Array && e[o] instanceof Uint8Array) {
					s.append(e[o].buffer)
				} else {
					s.append(e[o])
				}
			}
		}
		;
		var i = s.getBlob(a);
		if (!i.slice && i.webkitSlice) {
			i.slice = i.webkitSlice
		}
		;
		return i
	};
	var i = Object.getPrototypeOf || function (e) {
			return e.__proto__
		};
	e.Blob.prototype = i(new e.Blob())
}(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || this.content || this));
