
(function (e) {
	e(['jquery'], function (e) {
		return (function () {
			var n, a, c = 0,
				o = {
					error: 'error',
					info: 'info',
					success: 'success',
					warning: 'warning'
				};
			var d = {
				clear: w,
				remove: C,
				error: p,
				getContainer: i,
				info: m,
				options: {},
				subscribe: g,
				success: h,
				version: '2.1.1',
				warning: v
			};
			var r;
			return d;

			function p(e, n, i) {
				return s({
					type: o.error,
					iconClass: t().iconClasses.error,
					message: e,
					optionsOverride: i,
					title: n
				})
			};

			function i(i, o) {
				if (!i) {
					i = t()
				}
				;
				n = e('#' + i.containerId);
				if (n.length) {
					return n
				}
				;
				if (o) {
					n = O(i)
				}
				;
				return n
			};

			function m(e, n, i) {
				return s({
					type: o.info,
					iconClass: t().iconClasses.info,
					message: e,
					optionsOverride: i,
					title: n
				})
			};

			function g(e) {
				a = e
			};

			function h(e, n, i) {
				return s({
					type: o.success,
					iconClass: t().iconClasses.success,
					message: e,
					optionsOverride: i,
					title: n
				})
			};

			function v(e, n, i) {
				return s({
					type: o.warning,
					iconClass: t().iconClasses.warning,
					message: e,
					optionsOverride: i,
					title: n
				})
			};

			function w(e, o) {
				var s = t();
				if (!n) {
					i(s)
				}
				;
				if (!l(e, s, o)) {
					T(s)
				}
			};

			function C(o) {
				var s = t();
				if (!n) {
					i(s)
				}
				;
				if (o && e(':focus', o).length === 0) {
					u(o);
					return
				}
				;
				if (n.children().length) {
					n.remove()
				}
			};

			function T(t) {
				var o = n.children();
				for (var i = o.length - 1; i >= 0; i--) {
					l(e(o[i]), t)
				}
			};

			function l(n, t, i) {
				var o = i && i.force ? i.force : !1;
				if (n && (o || e(':focus', n).length === 0)) {
					n[t.hideMethod]({
						duration: t.hideDuration,
						easing: t.hideEasing,
						complete: function () {
							u(n)
						}
					});
					return !0
				}
				;
				return !1
			};

			function O(t) {
				n = e('<div/>').attr('id', t.containerId).addClass(t.positionClass).attr('aria-live', 'polite').attr('role', 'alert');
				n.appendTo(e(t.target));
				return n
			};

			function b() {
				return {
					tapToDismiss: !0,
					toastClass: 'toast',
					containerId: 'toast-container',
					debug: !1,
					showMethod: 'fadeIn',
					showDuration: 300,
					showEasing: 'swing',
					onShown: undefined,
					hideMethod: 'fadeOut',
					hideDuration: 1000,
					hideEasing: 'swing',
					onHidden: undefined,
					extendedTimeOut: 1000,
					iconClasses: {
						error: 'toast-error',
						info: 'toast-info',
						success: 'toast-success',
						warning: 'toast-warning'
					},
					iconClass: 'toast-info',
					positionClass: 'toast-top-right',
					timeOut: 5000,
					titleClass: 'toast-title',
					messageClass: 'toast-message',
					target: 'body',
					closeHtml: '<button type="button">&times;</button>',
					newestOnTop: !0,
					preventDuplicates: !1,
					progressBar: !1
				}
			};

			function f(e) {
				if (!a) {
					return
				}
				;
				a(e)
			};

			function s(s) {
				var o = t(),
					v = s.iconClass || o.iconClass;
				if (typeof(s.optionsOverride) !== 'undefined') {
					o = e.extend(o, s.optionsOverride);
					v = s.optionsOverride.iconClass || v
				}
				;
				if (B(o, s)) {
					return
				}
				;
				c++;
				n = i(o, !0);
				var g = null,
					a = e('<div/>'),
					w = e('<div/>'),
					C = e('<div/>'),
					h = e('<div/>'),
					m = e(o.closeHtml),
					d = {
						intervalId: null,
						hideEta: null,
						maxHideTime: null
					};
				var l = {
					toastId: c,
					state: 'visible',
					startTime: new Date(),
					options: o,
					map: s
				};
				T();
				b();
				O();
				f(l);
				if (o.debug && console) {
					console.log(l)
				}
				;
				return a;

				function T() {
					D();
					y();
					E();
					H();
					I();
					x()
				};

				function O() {
					a.hover(k, M);
					if (!o.onclick && o.tapToDismiss) {
						a.click(p)
					}
					;
					if (o.closeButton && m) {
						m.click(function (e) {
							if (e.stopPropagation) {
								e.stopPropagation()
							} else if (e.cancelBubble !== undefined && e.cancelBubble !== !0) {
								e.cancelBubble = !0
							}
							;
							p(!0)
						})
					}
					;
					if (o.onclick) {
						a.click(function () {
							o.onclick();
							p()
						})
					}
				};

				function b() {
					a.hide();
					a[o.showMethod]({
						duration: o.showDuration,
						easing: o.showEasing,
						complete: o.onShown
					});
					if (o.timeOut > 0) {
						g = setTimeout(p, o.timeOut);
						d.maxHideTime = parseFloat(o.timeOut);
						d.hideEta = new Date().getTime() + d.maxHideTime;
						if (o.progressBar) {
							d.intervalId = setInterval(j, 10)
						}
					}
				};

				function D() {
					if (s.iconClass) {
						a.addClass(o.toastClass).addClass(v)
					}
				};

				function x() {
					if (o.newestOnTop) {
						n.prepend(a)
					} else {
						n.append(a)
					}
				};

				function y() {
					if (s.title) {
						w.append(s.title).addClass(o.titleClass);
						a.append(w)
					}
				};

				function E() {
					if (s.message) {
						C.append(s.message).addClass(o.messageClass);
						a.append(C)
					}
				};

				function H() {
					if (o.closeButton) {
						m.addClass('toast-close-button').attr('role', 'button');
						a.prepend(m)
					}
				};

				function I() {
					if (o.progressBar) {
						h.addClass('toast-progress');
						a.prepend(h)
					}
				};

				function B(e, n) {
					if (e.preventDuplicates) {
						if (n.message === r) {
							return !0
						} else {
							r = n.message
						}
					}
					;
					return !1
				};

				function p(n) {
					if (e(':focus', a).length && !n) {
						return
					}
					;
					clearTimeout(d.intervalId);
					return a[o.hideMethod]({
						duration: o.hideDuration,
						easing: o.hideEasing,
						complete: function () {
							u(a);
							if (o.onHidden && l.state !== 'hidden') {
								o.onHidden()
							}
							;
							l.state = 'hidden';
							l.endTime = new Date();
							f(l)
						}
					})
				};

				function M() {
					if (o.timeOut > 0 || o.extendedTimeOut > 0) {
						g = setTimeout(p, o.extendedTimeOut);
						d.maxHideTime = parseFloat(o.extendedTimeOut);
						d.hideEta = new Date().getTime() + d.maxHideTime
					}
				};

				function k() {
					clearTimeout(g);
					d.hideEta = 0;
					a.stop(!0, !0)[o.showMethod]({
						duration: o.showDuration,
						easing: o.showEasing
					})
				};

				function j() {
					var e = ((d.hideEta - (new Date().getTime())) / d.maxHideTime) * 100;
					h.width(e + '%')
				}
			};

			function t() {
				return e.extend({}, b(), d.options)
			};

			function u(e) {
				if (!n) {
					n = i()
				}
				;
				if (e.is(':visible')) {
					return
				}
				;
				e.remove();
				e = null;
				if (n.children().length === 0) {
					n.remove();
					r = undefined
				}
			}
		})()
	})
}(typeof define === 'function' && define.amd ? define : function (e, n) {
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = n(require('jquery'))
	} else {
		window['toastr'] = n(window['jQuery'])
	}
}));
