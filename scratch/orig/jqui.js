
/*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
 * http://jqueryui.com
 * Includes: widget.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
(function (t) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], t)
	} else if (typeof exports === "object") {
		t(require("jquery"))
	} else {
		t(jQuery)
	}
}(function (t) {
	/*!
	 * jQuery UI Widget 1.11.4
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/jQuery.widget/
	 */
	;
	var i = 0,
		e = Array.prototype.slice;
	t.cleanData = (function (e) {
		return function (i) {
			var n, s, o;
			for (o = 0;
			     (s = i[o]) != null; o++) {
				try {
					n = t._data(s, "events");
					if (n && n.remove) {
						t(s).triggerHandler("remove")
					}
				} catch (r) {
				}
			}
			;
			e(i)
		}
	})(t.cleanData);
	t.widget = function (e, i, s) {
		var u, o, n, a, d = {},
			r = e.split(".")[0];
		e = e.split(".")[1];
		u = r + "-" + e;
		if (!s) {
			s = i;
			i = t.Widget
		}
		;
		t.expr[":"][u.toLowerCase()] = function (e) {
			return !!t.data(e, u)
		};
		t[r] = t[r] || {};
		o = t[r][e];
		n = t[r][e] = function (t, e) {
			if (!this._createWidget) {
				return new n(t, e)
			}
			;
			if (arguments.length) {
				this._createWidget(t, e)
			}
		};
		t.extend(n, o, {
			version: s.version,
			_proto: t.extend({}, s),
			_childConstructors: []
		});
		a = new i();
		a.options = t.widget.extend({}, a.options);
		t.each(s, function (e, n) {
			if (!t.isFunction(n)) {
				d[e] = n;
				return
			}
			;
			d[e] = (function () {
				var t = function () {
						return i.prototype[e].apply(this, arguments)
					},
					s = function (t) {
						return i.prototype[e].apply(this, t)
					};
				return function () {
					var i = this._super,
						o = this._superApply,
						e;
					this._super = t;
					this._superApply = s;
					e = n.apply(this, arguments);
					this._super = i;
					this._superApply = o;
					return e
				}
			})()
		});
		n.prototype = t.widget.extend(a, {
			widgetEventPrefix: o ? (a.widgetEventPrefix || e) : e
		}, d, {
			constructor: n,
			namespace: r,
			widgetName: e,
			widgetFullName: u
		});
		if (o) {
			t.each(o._childConstructors, function (e, i) {
				var s = i.prototype;
				t.widget(s.namespace + "." + s.widgetName, n, i._proto)
			});
			delete o._childConstructors
		} else {
			i._childConstructors.push(n)
		}
		;
		t.widget.bridge(e, n);
		return n
	};
	t.widget.extend = function (i) {
		var r = e.call(arguments, 1),
			o = 0,
			a = r.length,
			n, s;
		for (; o < a; o++) {
			for (n in r[o]) {
				s = r[o][n];
				if (r[o].hasOwnProperty(n) && s !== undefined) {
					if (t.isPlainObject(s)) {
						i[n] = t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], s) : t.widget.extend({}, s)
					} else {
						i[n] = s
					}
				}
			}
		}
		;
		return i
	};
	t.widget.bridge = function (i, n) {
		var s = n.prototype.widgetFullName || i;
		t.fn[i] = function (o) {
			var u = typeof o === "string",
				a = e.call(arguments, 1),
				r = this;
			if (u) {
				this.each(function () {
					var e, n = t.data(this, s);
					if (o === "instance") {
						r = n;
						return !1
					}
					;
					if (!n) {
						return t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + o + "'")
					}
					;
					if (!t.isFunction(n[o]) || o.charAt(0) === "_") {
						return t.error("no such method '" + o + "' for " + i + " widget instance")
					}
					;
					e = n[o].apply(n, a);
					if (e !== n && e !== undefined) {
						r = e && e.jquery ? r.pushStack(e.get()) : e;
						return !1
					}
				})
			} else {
				if (a.length) {
					o = t.widget.extend.apply(null, [o].concat(a))
				}
				;
				this.each(function () {
					var e = t.data(this, s);
					if (e) {
						e.option(o || {});
						if (e._init) {
							e._init()
						}
					} else {
						t.data(this, s, new n(o, this))
					}
				})
			}
			;
			return r
		}
	};
	t.Widget = function () {
	};
	t.Widget._childConstructors = [];
	t.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function (e, n) {
			n = t(n || this.defaultElement || this)[0];
			this.element = t(n);
			this.uuid = i++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.bindings = t();
			this.hoverable = t();
			this.focusable = t();
			if (n !== this) {
				t.data(n, this.widgetFullName, this);
				this._on(!0, this.element, {
					remove: function (t) {
						if (t.target === n) {
							this.destroy()
						}
					}
				});
				this.document = t(n.style ? n.ownerDocument : n.document || n);
				this.window = t(this.document[0].defaultView || this.document[0].parentWindow)
			}
			;
			this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e);
			this._create();
			this._trigger("create", null, this._getCreateEventData());
			this._init()
		},
		_getCreateOptions: t.noop,
		_getCreateEventData: t.noop,
		_create: t.noop,
		_init: t.noop,
		destroy: function () {
			this._destroy();
			this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName));
			this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
			this.bindings.unbind(this.eventNamespace);
			this.hoverable.removeClass("ui-state-hover");
			this.focusable.removeClass("ui-state-focus")
		},
		_destroy: t.noop,
		widget: function () {
			return this.element
		},
		option: function (e, i) {
			var r = e,
				n, s, o;
			if (arguments.length === 0) {
				return t.widget.extend({}, this.options)
			}
			;
			if (typeof e === "string") {
				r = {};
				n = e.split(".");
				e = n.shift();
				if (n.length) {
					s = r[e] = t.widget.extend({}, this.options[e]);
					for (o = 0; o < n.length - 1; o++) {
						s[n[o]] = s[n[o]] || {};
						s = s[n[o]]
					}
					;
					e = n.pop();
					if (arguments.length === 1) {
						return s[e] === undefined ? null : s[e]
					}
					;
					s[e] = i
				} else {
					if (arguments.length === 1) {
						return this.options[e] === undefined ? null : this.options[e]
					}
					;
					r[e] = i
				}
			}
			;
			this._setOptions(r);
			return this
		},
		_setOptions: function (t) {
			var e;
			for (e in t) {
				this._setOption(e, t[e])
			}
			;
			return this
		},
		_setOption: function (t, e) {
			this.options[t] = e;
			if (t === "disabled") {
				this.widget().toggleClass(this.widgetFullName + "-disabled", !!e);
				if (e) {
					this.hoverable.removeClass("ui-state-hover");
					this.focusable.removeClass("ui-state-focus")
				}
			}
			;
			return this
		},
		enable: function () {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function () {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function (e, i, n) {
			var o, s = this;
			if (typeof e !== "boolean") {
				n = i;
				i = e;
				e = !1
			}
			;
			if (!n) {
				n = i;
				i = this.element;
				o = this.widget()
			} else {
				i = o = t(i);
				this.bindings = this.bindings.add(i)
			}
			;
			t.each(n, function (n, r) {
				function a() {
					if (!e && (s.options.disabled === !0 || t(this).hasClass("ui-state-disabled"))) {
						return
					}
					;
					return (typeof r === "string" ? s[r] : r).apply(s, arguments)
				};
				if (typeof r !== "string") {
					a.guid = r.guid = r.guid || a.guid || t.guid++
				}
				;
				var u = n.match(/^([\w:-]*)\s*(.*)$/),
					d = u[1] + s.eventNamespace,
					f = u[2];
				if (f) {
					o.delegate(f, d, a)
				} else {
					i.bind(d, a)
				}
			})
		},
		_off: function (e, i) {
			i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
			e.unbind(i).undelegate(i);
			this.bindings = t(this.bindings.not(e).get());
			this.focusable = t(this.focusable.not(e).get());
			this.hoverable = t(this.hoverable.not(e).get())
		},
		_delay: function (t, e) {
			function n() {
				return (typeof t === "string" ? i[t] : t).apply(i, arguments)
			};
			var i = this;
			return setTimeout(n, e || 0)
		},
		_hoverable: function (e) {
			this.hoverable = this.hoverable.add(e);
			this._on(e, {
				mouseenter: function (e) {
					t(e.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function (e) {
					t(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function (e) {
			this.focusable = this.focusable.add(e);
			this._on(e, {
				focusin: function (e) {
					t(e.currentTarget).addClass("ui-state-focus")
				},
				focusout: function (e) {
					t(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function (e, i, n) {
			var s, o, r = this.options[e];
			n = n || {};
			i = t.Event(i);
			i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase();
			i.target = this.element[0];
			o = i.originalEvent;
			if (o) {
				for (s in o) {
					if (!(s in i)) {
						i[s] = o[s]
					}
				}
			}
			;
			this.element.trigger(i, n);
			return !(t.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
		}
	};
	t.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function (e, i) {
		t.Widget.prototype["_" + e] = function (n, s, o) {
			if (typeof s === "string") {
				s = {
					effect: s
				}
			}
			;
			var a, r = !s ? e : s === !0 || typeof s === "number" ? i : s.effect || i;
			s = s || {};
			if (typeof s === "number") {
				s = {
					duration: s
				}
			}
			;
			a = !t.isEmptyObject(s);
			s.complete = o;
			if (s.delay) {
				n.delay(s.delay)
			}
			;
			if (a && t.effects && t.effects.effect[r]) {
				n[e](s)
			} else if (r !== e && n[r]) {
				n[r](s.duration, s.easing, o)
			} else {
				n.queue(function (i) {
					t(this)[e]();
					if (o) {
						o.call(n[0])
					}
					;
					i()
				})
			}
		}
	});
	var n = t.widget
}));
(function (e) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], e)
	} else if (typeof exports === 'object') {
		e(require('jquery'))
	} else {
		e(window.jQuery)
	}
}(function (e) {
	'use strict';
	var t = 0;
	e.ajaxTransport('iframe', function (r) {
		if (r.async) {
			var o = r.initialIframeSrc || 'javascript:false;',
				n, a, i;
			return {
				send: function (p, f) {
					n = e('<form style="display:none;"></form>');
					n.attr('accept-charset', r.formAcceptCharset);
					i = /\?/.test(r.url) ? '&' : '?';
					if (r.type === 'DELETE') {
						r.url = r.url + i + '_method=DELETE';
						r.type = 'POST'
					} else if (r.type === 'PUT') {
						r.url = r.url + i + '_method=PUT';
						r.type = 'POST'
					} else if (r.type === 'PATCH') {
						r.url = r.url + i + '_method=PATCH';
						r.type = 'POST'
					}
					;
					t += 1;
					a = e('<iframe src="' + o + '" name="iframe-transport-' + t + '"></iframe>').bind('load', function () {
						var t, i = e.isArray(r.paramName) ? r.paramName : [r.paramName];
						a.unbind('load').bind('load', function () {
							var t;
							try {
								t = a.contents();
								if (!t.length || !t[0].firstChild) {
									throw new Error()
								}
							} catch (r) {
								t = undefined
							}
							;
							f(200, 'success', {
								'iframe': t
							});
							e('<iframe src="' + o + '"></iframe>').appendTo(n);
							window.setTimeout(function () {
								n.remove()
							}, 0)
						});
						n.prop('target', a.prop('name')).prop('action', r.url).prop('method', r.type);
						if (r.formData) {
							e.each(r.formData, function (t, r) {
								e('<input type="hidden"/>').prop('name', r.name).val(r.value).appendTo(n)
							})
						}
						;
						if (r.fileInput && r.fileInput.length && r.type === 'POST') {
							t = r.fileInput.clone();
							r.fileInput.after(function (e) {
								return t[e]
							});
							if (r.paramName) {
								r.fileInput.each(function (t) {
									e(this).prop('name', i[t] || r.paramName)
								})
							}
							;
							n.append(r.fileInput).prop('enctype', 'multipart/form-data').prop('encoding', 'multipart/form-data');
							r.fileInput.removeAttr('form')
						}
						;
						n.submit();
						if (t && t.length) {
							r.fileInput.each(function (r, n) {
								var a = e(t[r]);
								e(n).prop('name', a.prop('name')).attr('form', a.attr('form'));
								a.replaceWith(n)
							})
						}
					});
					n.append(a).appendTo(document.body)
				},
				abort: function () {
					if (a) {
						a.unbind('load').prop('src', o)
					}
					;
					if (n) {
						n.remove()
					}
				}
			}
		}
	});
	e.ajaxSetup({
		converters: {
			'iframe text': function (t) {
				return t && e(t[0].body).text()
			},
			'iframe json': function (t) {
				return t && e.parseJSON(e(t[0].body).text())
			},
			'iframe html': function (t) {
				return t && e(t[0].body).html()
			},
			'iframe xml': function (t) {
				var r = t && t[0];
				return r && e.isXMLDoc(r) ? r : e.parseXML((r.XMLDocument && r.XMLDocument.xml) || e(r.body).html())
			},
			'iframe script': function (t) {
				return t && e.globalEval(e(t[0].body).text())
			}
		}
	})
}));
(function (e) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'jquery.ui.widget'], e)
	} else if (typeof exports === 'object') {
		e(require('jquery'), require('./vendor/jquery.ui.widget'))
	} else {
		e(window.jQuery)
	}
}(function (e) {
	'use strict';
	e.support.fileInput = !(new RegExp('(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))').test(window.navigator.userAgent) || e('<input type="file">').prop('disabled'));
	e.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
	e.support.xhrFormDataFileUpload = !!window.FormData;
	e.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

	function t(t) {
		var i = t === 'dragover';
		return function (n) {
			n.dataTransfer = n.originalEvent && n.originalEvent.dataTransfer;
			var r = n.dataTransfer;
			if (r && e.inArray('Files', r.types) !== -1 && this._trigger(t, e.Event(t, {
					delegatedEvent: n
				})) !== !1) {
				n.preventDefault();
				if (i) {
					r.dropEffect = 'copy'
				}
			}
		}
	};
	e.widget('blueimp.fileupload', {
		options: {
			dropZone: e(document),
			pasteZone: undefined,
			fileInput: undefined,
			replaceFileInput: !0,
			paramName: undefined,
			singleFileUploads: !0,
			limitMultiFileUploads: undefined,
			limitMultiFileUploadSize: undefined,
			limitMultiFileUploadSizeOverhead: 512,
			sequentialUploads: !1,
			limitConcurrentUploads: undefined,
			forceIframeTransport: !1,
			redirect: undefined,
			redirectParamName: undefined,
			postMessage: undefined,
			multipart: !0,
			maxChunkSize: undefined,
			uploadedBytes: undefined,
			recalculateProgress: !0,
			progressInterval: 100,
			bitrateInterval: 500,
			autoUpload: !0,
			messages: {
				uploadedBytes: 'Uploaded bytes exceed file size'
			},
			i18n: function (t, i) {
				t = this.messages[t] || t.toString();
				if (i) {
					e.each(i, function (e, i) {
						t = t.replace('{' + e + '}', i)
					})
				}
				;
				return t
			},
			formData: function (e) {
				return e.serializeArray()
			},
			add: function (t, i) {
				if (t.isDefaultPrevented()) {
					return !1
				}
				;
				if (i.autoUpload || (i.autoUpload !== !1 && e(this).fileupload('option', 'autoUpload'))) {
					i.process().done(function () {
						i.submit()
					})
				}
			},
			processData: !1,
			contentType: !1,
			cache: !1,
			timeout: 0
		},
		_specialOptions: ['fileInput', 'dropZone', 'pasteZone', 'multipart', 'forceIframeTransport'],
		_blobSlice: e.support.blobSlice && function () {
			var e = this.slice || this.webkitSlice || this.mozSlice;
			return e.apply(this, arguments)
		},
		_BitrateTimer: function () {
			this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
			this.loaded = 0;
			this.bitrate = 0;
			this.getBitrate = function (e, t, i) {
				var n = e - this.timestamp;
				if (!this.bitrate || !i || n > i) {
					this.bitrate = (t - this.loaded) * (1000 / n) * 8;
					this.loaded = t;
					this.timestamp = e
				}
				;
				return this.bitrate
			}
		},
		_isXHRUpload: function (t) {
			return !t.forceIframeTransport && ((!t.multipart && e.support.xhrFileUpload) || e.support.xhrFormDataFileUpload)
		},
		_getFormData: function (t) {
			var i;
			if (e.type(t.formData) === 'function') {
				return t.formData(t.form)
			}
			;
			if (e.isArray(t.formData)) {
				return t.formData
			}
			;
			if (e.type(t.formData) === 'object') {
				i = [];
				e.each(t.formData, function (e, t) {
					i.push({
						name: e,
						value: t
					})
				});
				return i
			}
			;
			return []
		},
		_getTotal: function (t) {
			var i = 0;
			e.each(t, function (e, t) {
				i += t.size || 1
			});
			return i
		},
		_initProgressObject: function (t) {
			var i = {
				loaded: 0,
				total: 0,
				bitrate: 0
			};
			if (t._progress) {
				e.extend(t._progress, i)
			} else {
				t._progress = i
			}
		},
		_initResponseObject: function (e) {
			var t;
			if (e._response) {
				for (t in e._response) {
					if (e._response.hasOwnProperty(t)) {
						delete e._response[t]
					}
				}
			} else {
				e._response = {}
			}
		},
		_onProgress: function (t, i) {
			if (t.lengthComputable) {
				var n = ((Date.now) ? Date.now() : (new Date()).getTime()),
					r;
				if (i._time && i.progressInterval && (n - i._time < i.progressInterval) && t.loaded !== t.total) {
					return
				}
				;
				i._time = n;
				r = Math.floor(t.loaded / t.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0);
				this._progress.loaded += (r - i._progress.loaded);
				this._progress.bitrate = this._bitrateTimer.getBitrate(n, this._progress.loaded, i.bitrateInterval);
				i._progress.loaded = i.loaded = r;
				i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(n, r, i.bitrateInterval);
				this._trigger('progress', e.Event('progress', {
					delegatedEvent: t
				}), i);
				this._trigger('progressall', e.Event('progressall', {
					delegatedEvent: t
				}), this._progress)
			}
		},
		_initProgressListener: function (t) {
			var n = this,
				i = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
			if (i.upload) {
				e(i.upload).bind('progress', function (e) {
					var i = e.originalEvent;
					e.lengthComputable = i.lengthComputable;
					e.loaded = i.loaded;
					e.total = i.total;
					n._onProgress(e, t)
				});
				t.xhr = function () {
					return i
				}
			}
		},
		_isInstanceOf: function (e, t) {
			return Object.prototype.toString.call(t) === '[object ' + e + ']'
		},
		_initXHRData: function (t) {
			var s = this,
				i, n = t.files[0],
				o = t.multipart || !e.support.xhrFileUpload,
				r = e.type(t.paramName) === 'array' ? t.paramName[0] : t.paramName;
			t.headers = e.extend({}, t.headers);
			if (t.contentRange) {
				t.headers['Content-Range'] = t.contentRange
			}
			;
			if (!o || t.blob || !this._isInstanceOf('File', n)) {
				t.headers['Content-Disposition'] = 'attachment; filename="' + encodeURI(n.name) + '"'
			}
			;
			if (!o) {
				t.contentType = n.type || 'application/octet-stream';
				t.data = t.blob || n
			} else if (e.support.xhrFormDataFileUpload) {
				if (t.postMessage) {
					i = this._getFormData(t);
					if (t.blob) {
						i.push({
							name: r,
							value: t.blob
						})
					} else {
						e.each(t.files, function (n, s) {
							i.push({
								name: (e.type(t.paramName) === 'array' && t.paramName[n]) || r,
								value: s
							})
						})
					}
				} else {
					if (s._isInstanceOf('FormData', t.formData)) {
						i = t.formData
					} else {
						i = new FormData();
						e.each(this._getFormData(t), function (e, t) {
							i.append(t.name, t.value)
						})
					}
					;
					if (t.blob) {
						i.append(r, t.blob, n.name)
					} else {
						e.each(t.files, function (n, o) {
							if (s._isInstanceOf('File', o) || s._isInstanceOf('Blob', o)) {
								i.append((e.type(t.paramName) === 'array' && t.paramName[n]) || r, o, o.uploadName || o.name)
							}
						})
					}
				}
				;
				t.data = i
			}
			;
			t.blob = null
		},
		_initIframeSettings: function (t) {
			var i = e('<a></a>').prop('href', t.url).prop('host');
			t.dataType = 'iframe ' + (t.dataType || '');
			t.formData = this._getFormData(t);
			if (t.redirect && i && i !== location.host) {
				t.formData.push({
					name: t.redirectParamName || 'redirect',
					value: t.redirect
				})
			}
		},
		_initDataSettings: function (e) {
			if (this._isXHRUpload(e)) {
				if (!this._chunkedUpload(e, !0)) {
					if (!e.data) {
						this._initXHRData(e)
					}
					;
					this._initProgressListener(e)
				}
				;
				if (e.postMessage) {
					e.dataType = 'postmessage ' + (e.dataType || '')
				}
			} else {
				this._initIframeSettings(e)
			}
		},
		_getParamName: function (t) {
			var n = e(t.fileInput),
				i = t.paramName;
			if (!i) {
				i = [];
				n.each(function () {
					var t = e(this),
						r = t.prop('name') || 'files[]',
						n = (t.prop('files') || [1]).length;
					while (n) {
						i.push(r);
						n -= 1
					}
				});
				if (!i.length) {
					i = [n.prop('name') || 'files[]']
				}
			} else if (!e.isArray(i)) {
				i = [i]
			}
			;
			return i
		},
		_initFormSettings: function (t) {
			if (!t.form || !t.form.length) {
				t.form = e(t.fileInput.prop('form'));
				if (!t.form.length) {
					t.form = e(this.options.fileInput.prop('form'))
				}
			}
			;
			t.paramName = this._getParamName(t);
			if (!t.url) {
				t.url = t.form.prop('action') || location.href
			}
			;
			t.type = (t.type || (e.type(t.form.prop('method')) === 'string' && t.form.prop('method')) || '').toUpperCase();
			if (t.type !== 'POST' && t.type !== 'PUT' && t.type !== 'PATCH') {
				t.type = 'POST'
			}
			;
			if (!t.formAcceptCharset) {
				t.formAcceptCharset = t.form.attr('accept-charset')
			}
		},
		_getAJAXSettings: function (t) {
			var i = e.extend({}, this.options, t);
			this._initFormSettings(i);
			this._initDataSettings(i);
			return i
		},
		_getDeferredState: function (e) {
			if (e.state) {
				return e.state()
			}
			;
			if (e.isResolved()) {
				return 'resolved'
			}
			;
			if (e.isRejected()) {
				return 'rejected'
			}
			;
			return 'pending'
		},
		_enhancePromise: function (e) {
			e.success = e.done;
			e.error = e.fail;
			e.complete = e.always;
			return e
		},
		_getXHRPromise: function (t, i, n) {
			var r = e.Deferred(),
				s = r.promise();
			i = i || this.options.context || s;
			if (t === !0) {
				r.resolveWith(i, n)
			} else if (t === !1) {
				r.rejectWith(i, n)
			}
			;
			s.abort = r.promise;
			return this._enhancePromise(s)
		},
		_addConvenienceMethods: function (t, i) {
			var n = this,
				r = function (t) {
					return e.Deferred().resolveWith(n, t).promise()
				};
			i.process = function (t, s) {
				if (t || s) {
					i._processQueue = this._processQueue = (this._processQueue || r([this])).then(function () {
						if (i.errorThrown) {
							return e.Deferred().rejectWith(n, [i]).promise()
						}
						;
						return r(arguments)
					}).then(t, s)
				}
				;
				return this._processQueue || r([this])
			};
			i.submit = function () {
				if (this.state() !== 'pending') {
					i.jqXHR = this.jqXHR = (n._trigger('submit', e.Event('submit', {
							delegatedEvent: t
						}), this) !== !1) && n._onSend(t, this)
				}
				;
				return this.jqXHR || n._getXHRPromise()
			};
			i.abort = function () {
				if (this.jqXHR) {
					return this.jqXHR.abort()
				}
				;
				this.errorThrown = 'abort';
				n._trigger('fail', null, this);
				return n._getXHRPromise(!1)
			};
			i.state = function () {
				if (this.jqXHR) {
					return n._getDeferredState(this.jqXHR)
				}
				;
				if (this._processQueue) {
					return n._getDeferredState(this._processQueue)
				}
			};
			i.processing = function () {
				return !this.jqXHR && this._processQueue && n._getDeferredState(this._processQueue) === 'pending'
			};
			i.progress = function () {
				return this._progress
			};
			i.response = function () {
				return this._response
			}
		},
		_getUploadedBytes: function (e) {
			var i = e.getResponseHeader('Range'),
				t = i && i.split('-'),
				n = t && t.length > 1 && parseInt(t[1], 10);
			return n && n + 1
		},
		_chunkedUpload: function (t, i) {
			t.uploadedBytes = t.uploadedBytes || 0;
			var r = this,
				s = t.files[0],
				o = s.size,
				n = t.uploadedBytes,
				u = t.maxChunkSize || o,
				f = this._blobSlice,
				a = e.Deferred(),
				l = a.promise(),
				d, p;
			if (!(this._isXHRUpload(t) && f && (n || u < o)) || t.data) {
				return !1
			}
			;
			if (i) {
				return !0
			}
			;
			if (n >= o) {
				s.error = t.i18n('uploadedBytes');
				return this._getXHRPromise(!1, t.context, [null, 'error', s.error])
			}
			;
			p = function () {
				var i = e.extend({}, t),
					l = i._progress.loaded;
				i.blob = f.call(s, n, n + u, s.type);
				i.chunkSize = i.blob.size;
				i.contentRange = 'bytes ' + n + '-' + (n + i.chunkSize - 1) + '/' + o;
				r._initXHRData(i);
				r._initProgressListener(i);
				d = ((r._trigger('chunksend', null, i) !== !1 && e.ajax(i)) || r._getXHRPromise(!1, i.context)).done(function (s, u, f) {
					n = r._getUploadedBytes(f) || (n + i.chunkSize);
					if (l + i.chunkSize - i._progress.loaded) {
						r._onProgress(e.Event('progress', {
							lengthComputable: !0,
							loaded: n - i.uploadedBytes,
							total: n - i.uploadedBytes
						}), i)
					}
					;
					t.uploadedBytes = i.uploadedBytes = n;
					i.result = s;
					i.textStatus = u;
					i.jqXHR = f;
					r._trigger('chunkdone', null, i);
					r._trigger('chunkalways', null, i);
					if (n < o) {
						p()
					} else {
						a.resolveWith(i.context, [s, u, f])
					}
				}).fail(function (e, t, n) {
					i.jqXHR = e;
					i.textStatus = t;
					i.errorThrown = n;
					r._trigger('chunkfail', null, i);
					r._trigger('chunkalways', null, i);
					a.rejectWith(i.context, [e, t, n])
				})
			};
			this._enhancePromise(l);
			l.abort = function () {
				return d.abort()
			};
			p();
			return l
		},
		_beforeSend: function (e, t) {
			if (this._active === 0) {
				this._trigger('start');
				this._bitrateTimer = new this._BitrateTimer();
				this._progress.loaded = this._progress.total = 0;
				this._progress.bitrate = 0
			}
			;
			this._initResponseObject(t);
			this._initProgressObject(t);
			t._progress.loaded = t.loaded = t.uploadedBytes || 0;
			t._progress.total = t.total = this._getTotal(t.files) || 1;
			t._progress.bitrate = t.bitrate = 0;
			this._active += 1;
			this._progress.loaded += t.loaded;
			this._progress.total += t.total
		},
		_onDone: function (t, i, n, r) {
			var s = r._progress.total,
				o = r._response;
			if (r._progress.loaded < s) {
				this._onProgress(e.Event('progress', {
					lengthComputable: !0,
					loaded: s,
					total: s
				}), r)
			}
			;
			o.result = r.result = t;
			o.textStatus = r.textStatus = i;
			o.jqXHR = r.jqXHR = n;
			this._trigger('done', null, r)
		},
		_onFail: function (e, t, i, n) {
			var r = n._response;
			if (n.recalculateProgress) {
				this._progress.loaded -= n._progress.loaded;
				this._progress.total -= n._progress.total
			}
			;
			r.jqXHR = n.jqXHR = e;
			r.textStatus = n.textStatus = t;
			r.errorThrown = n.errorThrown = i;
			this._trigger('fail', null, n)
		},
		_onAlways: function (e, t, i, n) {
			this._trigger('always', null, n)
		},
		_onSend: function (t, i) {
			if (!i.submit) {
				this._addConvenienceMethods(t, i)
			}
			;
			var n = this,
				s, l, o, p, r = n._getAJAXSettings(i),
				a = function () {
					n._sending += 1;
					r._bitrateTimer = new n._BitrateTimer();
					s = s || (((l || n._trigger('send', e.Event('send', {
							delegatedEvent: t
						}), r) === !1) && n._getXHRPromise(!1, r.context, l)) || n._chunkedUpload(r) || e.ajax(r)).done(function (e, t, i) {
							n._onDone(e, t, i, r)
						}).fail(function (e, t, i) {
							n._onFail(e, t, i, r)
						}).always(function (e, t, i) {
							n._onAlways(e, t, i, r);
							n._sending -= 1;
							n._active -= 1;
							if (r.limitConcurrentUploads && r.limitConcurrentUploads > n._sending) {
								var s = n._slots.shift();
								while (s) {
									if (n._getDeferredState(s) === 'pending') {
										s.resolve();
										break
									}
									;
									s = n._slots.shift()
								}
							}
							;
							if (n._active === 0) {
								n._trigger('stop')
							}
						});
					return s
				};
			this._beforeSend(t, r);
			if (this.options.sequentialUploads || (this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending)) {
				if (this.options.limitConcurrentUploads > 1) {
					o = e.Deferred();
					this._slots.push(o);
					p = o.then(a)
				} else {
					this._sequence = this._sequence.then(a, a);
					p = this._sequence
				}
				;
				p.abort = function () {
					l = [undefined, 'abort', 'abort'];
					if (!s) {
						if (o) {
							o.rejectWith(r.context, l)
						}
						;
						return a()
					}
					;
					return s.abort()
				};
				return this._enhancePromise(p)
			}
			;
			return a()
		},
		_onAdd: function (t, i) {
			var d = this,
				g = !0,
				s = e.extend({}, this.options, i),
				r = i.files,
				h = r.length,
				a = s.limitMultiFileUploads,
				u = s.limitMultiFileUploadSize,
				v = s.limitMultiFileUploadSizeOverhead,
				m = 0,
				f = this._getParamName(s),
				l, o, p, n, c = 0;
			if (!h) {
				return !1
			}
			;
			if (u && r[0].size === undefined) {
				u = undefined
			}
			;
			if (!(s.singleFileUploads || a || u) || !this._isXHRUpload(s)) {
				p = [r];
				l = [f]
			} else if (!(s.singleFileUploads || u) && a) {
				p = [];
				l = [];
				for (n = 0; n < h; n += a) {
					p.push(r.slice(n, n + a));
					o = f.slice(n, n + a);
					if (!o.length) {
						o = f
					}
					;
					l.push(o)
				}
			} else if (!s.singleFileUploads && u) {
				p = [];
				l = [];
				for (n = 0; n < h; n = n + 1) {
					m += r[n].size + v;
					if (n + 1 === h || ((m + r[n + 1].size + v) > u) || (a && n + 1 - c >= a)) {
						p.push(r.slice(c, n + 1));
						o = f.slice(c, n + 1);
						if (!o.length) {
							o = f
						}
						;
						l.push(o);
						c = n + 1;
						m = 0
					}
				}
			} else {
				l = f
			}
			;
			i.originalFiles = r;
			e.each(p || r, function (n, r) {
				var s = e.extend({}, i);
				s.files = p ? r : [r];
				s.paramName = l[n];
				d._initResponseObject(s);
				d._initProgressObject(s);
				d._addConvenienceMethods(t, s);
				g = d._trigger('add', e.Event('add', {
					delegatedEvent: t
				}), s);
				return g
			});
			return g
		},
		_replaceFileInput: function (t) {
			var i = t.fileInput,
				n = i.clone(!0),
				r = i.is(document.activeElement);
			t.fileInputClone = n;
			e('<form></form>').append(n)[0].reset();
			i.after(n).detach();
			if (r) {
				n.focus()
			}
			;
			e.cleanData(i.unbind('remove'));
			this.options.fileInput = this.options.fileInput.map(function (e, t) {
				if (t === i[0]) {
					return n[0]
				}
				;
				return t
			});
			if (i[0] === this.element[0]) {
				this.element = n
			}
		},
		_handleFileTreeEntry: function (t, i) {
			var l = this,
				n = e.Deferred(),
				r = function (e) {
					if (e && !e.entry) {
						e.entry = t
					}
					;
					n.resolve([e])
				},
				p = function (e) {
					l._handleFileTreeEntries(e, i + t.name + '/').done(function (e) {
						n.resolve(e)
					}).fail(r)
				},
				o = function () {
					a.readEntries(function (e) {
						if (!e.length) {
							p(s)
						} else {
							s = s.concat(e);
							o()
						}
					}, r)
				},
				a, s = [];
			i = i || '';
			if (t.isFile) {
				if (t._file) {
					t._file.relativePath = i;
					n.resolve(t._file)
				} else {
					t.file(function (e) {
						e.relativePath = i;
						n.resolve(e)
					}, r)
				}
			} else if (t.isDirectory) {
				a = t.createReader();
				o()
			} else {
				n.resolve([])
			}
			;
			return n.promise()
		},
		_handleFileTreeEntries: function (t, i) {
			var n = this;
			return e.when.apply(e, e.map(t, function (e) {
				return n._handleFileTreeEntry(e, i)
			})).then(function () {
				return Array.prototype.concat.apply([], arguments)
			})
		},
		_getDroppedFiles: function (t) {
			t = t || {};
			var i = t.items;
			if (i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry)) {
				return this._handleFileTreeEntries(e.map(i, function (e) {
					var t;
					if (e.webkitGetAsEntry) {
						t = e.webkitGetAsEntry();
						if (t) {
							t._file = e.getAsFile()
						}
						;
						return t
					}
					;
					return e.getAsEntry()
				}))
			}
			;
			return e.Deferred().resolve(e.makeArray(t.files)).promise()
		},
		_getSingleFileInputFiles: function (t) {
			t = e(t);
			var n = t.prop('webkitEntries') || t.prop('entries'),
				i, r;
			if (n && n.length) {
				return this._handleFileTreeEntries(n)
			}
			;
			i = e.makeArray(t.prop('files'));
			if (!i.length) {
				r = t.prop('value');
				if (!r) {
					return e.Deferred().resolve([]).promise()
				}
				;
				i = [{
					name: r.replace(/^.*\\/, '')
				}]
			} else if (i[0].name === undefined && i[0].fileName) {
				e.each(i, function (e, t) {
					t.name = t.fileName;
					t.size = t.fileSize
				})
			}
			;
			return e.Deferred().resolve(i).promise()
		},
		_getFileInputFiles: function (t) {
			if (!(t instanceof e) || t.length === 1) {
				return this._getSingleFileInputFiles(t)
			}
			;
			return e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).then(function () {
				return Array.prototype.concat.apply([], arguments)
			})
		},
		_onChange: function (t) {
			var n = this,
				i = {
					fileInput: e(t.target),
					form: e(t.target.form)
				};
			this._getFileInputFiles(i.fileInput).always(function (r) {
				i.files = r;
				if (n.options.replaceFileInput) {
					n._replaceFileInput(i)
				}
				;
				if (n._trigger('change', e.Event('change', {
						delegatedEvent: t
					}), i) !== !1) {
					n._onAdd(t, i)
				}
			})
		},
		_onPaste: function (t) {
			var i = t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items,
				n = {
					files: []
				};
			if (i && i.length) {
				e.each(i, function (e, t) {
					var i = t.getAsFile && t.getAsFile();
					if (i) {
						n.files.push(i)
					}
				});
				if (this._trigger('paste', e.Event('paste', {
						delegatedEvent: t
					}), n) !== !1) {
					this._onAdd(t, n)
				}
			}
		},
		_onDrop: function (t) {
			t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
			var r = this,
				i = t.dataTransfer,
				n = {};
			if (i && i.files && i.files.length) {
				t.preventDefault();
				this._getDroppedFiles(i).always(function (i) {
					n.files = i;
					if (r._trigger('drop', e.Event('drop', {
							delegatedEvent: t
						}), n) !== !1) {
						r._onAdd(t, n)
					}
				})
			}
		},
		_onDragOver: t('dragover'),
		_onDragEnter: t('dragenter'),
		_onDragLeave: t('dragleave'),
		_initEventHandlers: function () {
			if (this._isXHRUpload(this.options)) {
				this._on(this.options.dropZone, {
					dragover: this._onDragOver,
					drop: this._onDrop,
					dragenter: this._onDragEnter,
					dragleave: this._onDragLeave
				});
				this._on(this.options.pasteZone, {
					paste: this._onPaste
				})
			}
			;
			if (e.support.fileInput) {
				this._on(this.options.fileInput, {
					change: this._onChange
				})
			}
		},
		_destroyEventHandlers: function () {
			this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
			this._off(this.options.pasteZone, 'paste');
			this._off(this.options.fileInput, 'change')
		},
		_setOption: function (t, i) {
			var n = e.inArray(t, this._specialOptions) !== -1;
			if (n) {
				this._destroyEventHandlers()
			}
			;
			this._super(t, i);
			if (n) {
				this._initSpecialOptions();
				this._initEventHandlers()
			}
		},
		_initSpecialOptions: function () {
			var t = this.options;
			if (t.fileInput === undefined) {
				t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]')
			} else if (!(t.fileInput instanceof e)) {
				t.fileInput = e(t.fileInput)
			}
			;
			if (!(t.dropZone instanceof e)) {
				t.dropZone = e(t.dropZone)
			}
			;
			if (!(t.pasteZone instanceof e)) {
				t.pasteZone = e(t.pasteZone)
			}
		},
		_getRegExp: function (e) {
			var t = e.split('/'),
				i = t.pop();
			t.shift();
			return new RegExp(t.join('/'), i)
		},
		_isRegExpOption: function (t, i) {
			return t !== 'url' && e.type(i) === 'string' && /^\/.*\/[igm]{0,3}$/.test(i)
		},
		_initDataAttributes: function () {
			var t = this,
				i = this.options,
				n = this.element.data();
			e.each(this.element[0].attributes, function (e, r) {
				var s = r.name.toLowerCase(),
					o;
				if (/^data-/.test(s)) {
					s = s.slice(5).replace(/-[a-z]/g, function (e) {
						return e.charAt(1).toUpperCase()
					});
					o = n[s];
					if (t._isRegExpOption(s, o)) {
						o = t._getRegExp(o)
					}
					;
					i[s] = o
				}
			})
		},
		_create: function () {
			this._initDataAttributes();
			this._initSpecialOptions();
			this._slots = [];
			this._sequence = this._getXHRPromise(!0);
			this._sending = this._active = 0;
			this._initProgressObject(this);
			this._initEventHandlers()
		},
		active: function () {
			return this._active
		},
		progress: function () {
			return this._progress
		},
		add: function (t) {
			var i = this;
			if (!t || this.options.disabled) {
				return
			}
			;
			if (t.fileInput && !t.files) {
				this._getFileInputFiles(t.fileInput).always(function (e) {
					t.files = e;
					i._onAdd(null, t)
				})
			} else {
				t.files = e.makeArray(t.files);
				this._onAdd(null, t)
			}
		},
		send: function (t) {
			if (t && !this.options.disabled) {
				if (t.fileInput && !t.files) {
					var o = this,
						i = e.Deferred(),
						r = i.promise(),
						n, s;
					r.abort = function () {
						s = !0;
						if (n) {
							return n.abort()
						}
						;
						i.reject(null, 'abort', 'abort');
						return r
					};
					this._getFileInputFiles(t.fileInput).always(function (e) {
						if (s) {
							return
						}
						;
						if (!e.length) {
							i.reject();
							return
						}
						;
						t.files = e;
						n = o._onSend(null, t);
						n.then(function (e, t, n) {
							i.resolve(e, t, n)
						}, function (e, t, n) {
							i.reject(e, t, n)
						})
					});
					return this._enhancePromise(r)
				}
				;
				t.files = e.makeArray(t.files);
				if (t.files.length) {
					return this._onSend(null, t)
				}
			}
			;
			return this._getXHRPromise(!1, t && t.context)
		}
	})
}));
