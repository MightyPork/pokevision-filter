
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
;
if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
;+function (t) {
	'use strict';
	var e = t.fn.jquery.split(' ')[0].split('.');
	if ((e[0] < 2 && e[1] < 9) || (e[0] == 1 && e[1] == 9 && e[2] < 1)) {
		throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
	}
}(jQuery);
+function (t) {
	'use strict';

	function e() {
		var i = document.createElement('bootstrap'),
			e = {
				WebkitTransition: 'webkitTransitionEnd',
				MozTransition: 'transitionend',
				OTransition: 'oTransitionEnd otransitionend',
				transition: 'transitionend'
			};
		for (var t in e) {
			if (i.style[t] !== undefined) {
				return {
					end: e[t]
				}
			}
		}
		;
		return !1
	};
	t.fn.emulateTransitionEnd = function (e) {
		var i = !1,
			n = this;
		t(this).one('bsTransitionEnd', function () {
			i = !0
		});
		var o = function () {
			if (!i) t(n).trigger(t.support.transition.end)
		};
		setTimeout(o, e);
		return this
	};
	t(function () {
		t.support.transition = e();
		if (!t.support.transition) return;
		t.event.special.bsTransitionEnd = {
			bindType: t.support.transition.end,
			delegateType: t.support.transition.end,
			handle: function (e) {
				if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
			}
		}
	})
}(jQuery);
+function (t) {
	'use strict';
	var i = '[data-dismiss="alert"]',
		e = function (e) {
			t(e).on('click', i, this.close)
		};
	e.VERSION = '3.3.5';
	e.TRANSITION_DURATION = 150;
	e.prototype.close = function (i) {
		var s = t(this),
			n = s.attr('data-target');
		if (!n) {
			n = s.attr('href');
			n = n && n.replace(/.*(?=#[^\s]*$)/, '')
		}
		;
		var o = t(n);
		if (i) i.preventDefault();
		if (!o.length) {
			o = s.closest('.alert')
		}
		;
		o.trigger(i = t.Event('close.bs.alert'));
		if (i.isDefaultPrevented()) return;
		o.removeClass('in');

		function r() {
			o.detach().trigger('closed.bs.alert').remove()
		};
		t.support.transition && o.hasClass('fade') ? o.one('bsTransitionEnd', r).emulateTransitionEnd(e.TRANSITION_DURATION) : r()
	};

	function n(i) {
		return this.each(function () {
			var o = t(this),
				n = o.data('bs.alert');
			if (!n) o.data('bs.alert', (n = new e(this)));
			if (typeof i == 'string') n[i].call(o)
		})
	};
	var o = t.fn.alert;
	t.fn.alert = n;
	t.fn.alert.Constructor = e;
	t.fn.alert.noConflict = function () {
		t.fn.alert = o;
		return this
	};
	t(document).on('click.bs.alert.data-api', i, e.prototype.close)
}(jQuery);
+function (t) {
	'use strict';
	var e = function (i, o) {
		this.$element = t(i);
		this.options = t.extend({}, e.DEFAULTS, o);
		this.isLoading = !1
	};
	e.VERSION = '3.3.5';
	e.DEFAULTS = {
		loadingText: 'loading...'
	};
	e.prototype.setState = function (e) {
		var o = 'disabled',
			i = this.$element,
			s = i.is('input') ? 'val' : 'html',
			n = i.data();
		e += 'Text';
		if (n.resetText == null) i.data('resetText', i[s]());
		setTimeout(t.proxy(function () {
			i[s](n[e] == null ? this.options[e] : n[e]);
			if (e == 'loadingText') {
				this.isLoading = !0;
				i.addClass(o).attr(o, o)
			} else if (this.isLoading) {
				this.isLoading = !1;
				i.removeClass(o).removeAttr(o)
			}
		}, this), 0)
	};
	e.prototype.toggle = function () {
		var e = !0,
			i = this.$element.closest('[data-toggle="buttons"]');
		if (i.length) {
			var t = this.$element.find('input');
			if (t.prop('type') == 'radio') {
				if (t.prop('checked')) e = !1;
				i.find('.active').removeClass('active');
				this.$element.addClass('active')
			} else if (t.prop('type') == 'checkbox') {
				if ((t.prop('checked')) !== this.$element.hasClass('active')) e = !1;
				this.$element.toggleClass('active')
			}
			;
			t.prop('checked', this.$element.hasClass('active'));
			if (e) t.trigger('change')
		} else {
			this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
			this.$element.toggleClass('active')
		}
	};

	function i(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.button'),
				s = typeof i == 'object' && i;
			if (!o) n.data('bs.button', (o = new e(this, s)));
			if (i == 'toggle') o.toggle();
			else if (i) o.setState(i)
		})
	};
	var o = t.fn.button;
	t.fn.button = i;
	t.fn.button.Constructor = e;
	t.fn.button.noConflict = function () {
		t.fn.button = o;
		return this
	};
	t(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
		var o = t(e.target);
		if (!o.hasClass('btn')) o = o.closest('.btn');
		i.call(o, 'toggle');
		if (!(t(e.target).is('input[type="radio"]') || t(e.target).is('input[type="checkbox"]'))) e.preventDefault()
	}).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
		t(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	})
}(jQuery);
+function (t) {
	'use strict';
	var e = function (e, i) {
		this.$element = t(e);
		this.$indicators = this.$element.find('.carousel-indicators');
		this.options = i;
		this.paused = null;
		this.sliding = null;
		this.interval = null;
		this.$active = null;
		this.$items = null;
		this.options.keyboard && this.$element.on('keydown.bs.carousel', t.proxy(this.keydown, this));
		this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', t.proxy(this.pause, this)).on('mouseleave.bs.carousel', t.proxy(this.cycle, this))
	};
	e.VERSION = '3.3.5';
	e.TRANSITION_DURATION = 600;
	e.DEFAULTS = {
		interval: 5000,
		pause: 'hover',
		wrap: !0,
		keyboard: !0
	};
	e.prototype.keydown = function (t) {
		if (/input|textarea/i.test(t.target.tagName)) return;
		switch (t.which) {
			case 37:
				this.prev();
				break;
			case 39:
				this.next();
				break;
			default:
				return
		}
		;
		t.preventDefault()
	};
	e.prototype.cycle = function (e) {
		e || (this.paused = !1);
		this.interval && clearInterval(this.interval);
		this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval));
		return this
	};
	e.prototype.getItemIndex = function (t) {
		this.$items = t.parent().children('.item');
		return this.$items.index(t || this.$active)
	};
	e.prototype.getItemForDirection = function (t, e) {
		var i = this.getItemIndex(e),
			s = (t == 'prev' && i === 0) || (t == 'next' && i == (this.$items.length - 1));
		if (s && !this.options.wrap) return e;
		var o = t == 'prev' ? -1 : 1,
			n = (i + o) % this.$items.length;
		return this.$items.eq(n)
	};
	e.prototype.to = function (t) {
		var i = this,
			e = this.getItemIndex(this.$active = this.$element.find('.item.active'));
		if (t > (this.$items.length - 1) || t < 0) return;
		if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
			i.to(t)
		});
		if (e == t) return this.pause().cycle();
		return this.slide(t > e ? 'next' : 'prev', this.$items.eq(t))
	};
	e.prototype.pause = function (e) {
		e || (this.paused = !0);
		if (this.$element.find('.next, .prev').length && t.support.transition) {
			this.$element.trigger(t.support.transition.end);
			this.cycle(!0)
		}
		;
		this.interval = clearInterval(this.interval);
		return this
	};
	e.prototype.next = function () {
		if (this.sliding) return;
		return this.slide('next')
	};
	e.prototype.prev = function () {
		if (this.sliding) return;
		return this.slide('prev')
	};
	e.prototype.slide = function (i, o) {
		var r = this.$element.find('.item.active'),
			n = o || this.getItemForDirection(i, r),
			f = this.interval,
			s = i == 'next' ? 'left' : 'right',
			p = this;
		if (n.hasClass('active')) return (this.sliding = !1);
		var h = n[0],
			d = t.Event('slide.bs.carousel', {
				relatedTarget: h,
				direction: s
			});
		this.$element.trigger(d);
		if (d.isDefaultPrevented()) return;
		this.sliding = !0;
		f && this.pause();
		if (this.$indicators.length) {
			this.$indicators.find('.active').removeClass('active');
			var l = t(this.$indicators.children()[this.getItemIndex(n)]);
			l && l.addClass('active')
		}
		;
		var a = t.Event('slid.bs.carousel', {
			relatedTarget: h,
			direction: s
		});
		if (t.support.transition && this.$element.hasClass('slide')) {
			n.addClass(i);
			n[0].offsetWidth;
			r.addClass(s);
			n.addClass(s);
			r.one('bsTransitionEnd', function () {
				n.removeClass([i, s].join(' ')).addClass('active');
				r.removeClass(['active', s].join(' '));
				p.sliding = !1;
				setTimeout(function () {
					p.$element.trigger(a)
				}, 0)
			}).emulateTransitionEnd(e.TRANSITION_DURATION)
		} else {
			r.removeClass('active');
			n.addClass('active');
			this.sliding = !1;
			this.$element.trigger(a)
		}
		;
		f && this.cycle();
		return this
	};

	function i(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.carousel'),
				s = t.extend({}, e.DEFAULTS, n.data(), typeof i == 'object' && i);
			var r = typeof i == 'string' ? i : s.slide;
			if (!o) n.data('bs.carousel', (o = new e(this, s)));
			if (typeof i == 'number') o.to(i);
			else if (r) o[r]();
			else if (s.interval) o.pause().cycle()
		})
	};
	var n = t.fn.carousel;
	t.fn.carousel = i;
	t.fn.carousel.Constructor = e;
	t.fn.carousel.noConflict = function () {
		t.fn.carousel = n;
		return this
	};
	var o = function (e) {
		var a, o = t(this),
			n = t(o.attr('data-target') || (a = o.attr('href')) && a.replace(/.*(?=#[^\s]+$)/, ''));
		if (!n.hasClass('carousel')) return;
		var r = t.extend({}, n.data(), o.data());
		var s = o.attr('data-slide-to');
		if (s) r.interval = !1;
		i.call(n, r);
		if (s) {
			n.data('bs.carousel').to(s)
		}
		;
		e.preventDefault()
	};
	t(document).on('click.bs.carousel.data-api', '[data-slide]', o).on('click.bs.carousel.data-api', '[data-slide-to]', o);
	t(window).on('load', function () {
		t('[data-ride="carousel"]').each(function () {
			var e = t(this);
			i.call(e, e.data())
		})
	})
}(jQuery);
+function (t) {
	'use strict';
	var e = function (i, o) {
		this.$element = t(i);
		this.options = t.extend({}, e.DEFAULTS, o);
		this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
		this.transitioning = null;
		if (this.options.parent) {
			this.$parent = this.getParent()
		} else {
			this.addAriaAndCollapsedClass(this.$element, this.$trigger)
		}
		;
		if (this.options.toggle) this.toggle()
	};
	e.VERSION = '3.3.5';
	e.TRANSITION_DURATION = 350;
	e.DEFAULTS = {
		toggle: !0
	};
	e.prototype.dimension = function () {
		var t = this.$element.hasClass('width');
		return t ? 'width' : 'height'
	};
	e.prototype.show = function () {
		if (this.transitioning || this.$element.hasClass('in')) return;
		var s, o = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
		if (o && o.length) {
			s = o.data('bs.collapse');
			if (s && s.transitioning) return
		}
		;
		var a = t.Event('show.bs.collapse');
		this.$element.trigger(a);
		if (a.isDefaultPrevented()) return;
		if (o && o.length) {
			i.call(o, 'hide');
			s || o.data('bs.collapse', null)
		}
		;
		var n = this.dimension();
		this.$element.removeClass('collapse').addClass('collapsing')[n](0).attr('aria-expanded', !0);
		this.$trigger.removeClass('collapsed').attr('aria-expanded', !0);
		this.transitioning = 1;
		var r = function () {
			this.$element.removeClass('collapsing').addClass('collapse in')[n]('');
			this.transitioning = 0;
			this.$element.trigger('shown.bs.collapse')
		};
		if (!t.support.transition) return r.call(this);
		var l = t.camelCase(['scroll', n].join('-'));
		this.$element.one('bsTransitionEnd', t.proxy(r, this)).emulateTransitionEnd(e.TRANSITION_DURATION)[n](this.$element[0][l])
	};
	e.prototype.hide = function () {
		if (this.transitioning || !this.$element.hasClass('in')) return;
		var n = t.Event('hide.bs.collapse');
		this.$element.trigger(n);
		if (n.isDefaultPrevented()) return;
		var i = this.dimension();
		this.$element[i](this.$element[i]())[0].offsetHeight;
		this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', !1);
		this.$trigger.addClass('collapsed').attr('aria-expanded', !1);
		this.transitioning = 1;
		var o = function () {
			this.transitioning = 0;
			this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')
		};
		if (!t.support.transition) return o.call(this);
		this.$element[i](0).one('bsTransitionEnd', t.proxy(o, this)).emulateTransitionEnd(e.TRANSITION_DURATION)
	};
	e.prototype.toggle = function () {
		this[this.$element.hasClass('in') ? 'hide' : 'show']()
	};
	e.prototype.getParent = function () {
		return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (e, i) {
			var n = t(i);
			this.addAriaAndCollapsedClass(o(n), n)
		}, this)).end()
	};
	e.prototype.addAriaAndCollapsedClass = function (t, e) {
		var i = t.hasClass('in');
		t.attr('aria-expanded', i);
		e.toggleClass('collapsed', !i).attr('aria-expanded', i)
	};

	function o(e) {
		var i, o = e.attr('data-target') || (i = e.attr('href')) && i.replace(/.*(?=#[^\s]+$)/, '');
		return t(o)
	};

	function i(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.collapse'),
				s = t.extend({}, e.DEFAULTS, n.data(), typeof i == 'object' && i);
			if (!o && s.toggle && /show|hide/.test(i)) s.toggle = !1;
			if (!o) n.data('bs.collapse', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var n = t.fn.collapse;
	t.fn.collapse = i;
	t.fn.collapse.Constructor = e;
	t.fn.collapse.noConflict = function () {
		t.fn.collapse = n;
		return this
	};
	t(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
		var n = t(this);
		if (!n.attr('data-target')) e.preventDefault();
		var s = o(n),
			r = s.data('bs.collapse'),
			a = r ? 'toggle' : n.data();
		i.call(s, a)
	})
}(jQuery);
+function (t) {
	'use strict';
	var r = '.dropdown-backdrop',
		i = '[data-toggle="dropdown"]',
		e = function (e) {
			t(e).on('click.bs.dropdown', this.toggle)
		};
	e.VERSION = '3.3.5';

	function o(e) {
		var i = e.attr('data-target');
		if (!i) {
			i = e.attr('href');
			i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, '')
		}
		;
		var o = i && t(i);
		return o && o.length ? o : e.parent()
	};

	function n(e) {
		if (e && e.which === 3) return;
		t(r).remove();
		t(i).each(function () {
			var n = t(this),
				i = o(n),
				s = {
					relatedTarget: this
				};
			if (!i.hasClass('open')) return;
			if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && t.contains(i[0], e.target)) return;
			i.trigger(e = t.Event('hide.bs.dropdown', s));
			if (e.isDefaultPrevented()) return;
			n.attr('aria-expanded', 'false');
			i.removeClass('open').trigger('hidden.bs.dropdown', s)
		})
	};
	e.prototype.toggle = function (e) {
		var s = t(this);
		if (s.is('.disabled, :disabled')) return;
		var i = o(s),
			a = i.hasClass('open');
		n();
		if (!a) {
			if ('ontouchstart' in document.documentElement && !i.closest('.navbar-nav').length) {
				t(document.createElement('div')).addClass('dropdown-backdrop').insertAfter(t(this)).on('click', n)
			}
			;
			var r = {
				relatedTarget: this
			};
			i.trigger(e = t.Event('show.bs.dropdown', r));
			if (e.isDefaultPrevented()) return;
			s.trigger('focus').attr('aria-expanded', 'true');
			i.toggleClass('open').trigger('shown.bs.dropdown', r)
		}
		;
		return !1
	};
	e.prototype.keydown = function (e) {
		if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
		var a = t(this);
		e.preventDefault();
		e.stopPropagation();
		if (a.is('.disabled, :disabled')) return;
		var r = o(a),
			l = r.hasClass('open');
		if (!l && e.which != 27 || l && e.which == 27) {
			if (e.which == 27) r.find(i).trigger('focus');
			return a.trigger('click')
		}
		;
		var h = ' li:not(.disabled):visible a',
			s = r.find('.dropdown-menu' + h);
		if (!s.length) return;
		var n = s.index(e.target);
		if (e.which == 38 && n > 0) n--;
		if (e.which == 40 && n < s.length - 1) n++;
		if (!~n) n = 0;
		s.eq(n).trigger('focus')
	};

	function a(i) {
		return this.each(function () {
			var o = t(this),
				n = o.data('bs.dropdown');
			if (!n) o.data('bs.dropdown', (n = new e(this)));
			if (typeof i == 'string') n[i].call(o)
		})
	};
	var s = t.fn.dropdown;
	t.fn.dropdown = a;
	t.fn.dropdown.Constructor = e;
	t.fn.dropdown.noConflict = function () {
		t.fn.dropdown = s;
		return this
	};
	t(document).on('click.bs.dropdown.data-api', n).on('click.bs.dropdown.data-api', '.dropdown form', function (t) {
		t.stopPropagation()
	}).on('click.bs.dropdown.data-api', i, e.prototype.toggle).on('keydown.bs.dropdown.data-api', i, e.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', e.prototype.keydown)
}(jQuery);
+function (t) {
	'use strict';
	var e = function (e, i) {
		this.options = i;
		this.$body = t(document.body);
		this.$element = t(e);
		this.$dialog = this.$element.find('.modal-dialog');
		this.$backdrop = null;
		this.isShown = null;
		this.originalBodyPad = null;
		this.scrollbarWidth = 0;
		this.ignoreBackdropClick = !1;
		if (this.options.remote) {
			this.$element.find('.modal-content').load(this.options.remote, t.proxy(function () {
				this.$element.trigger('loaded.bs.modal')
			}, this))
		}
	};
	e.VERSION = '3.3.5';
	e.TRANSITION_DURATION = 300;
	e.BACKDROP_TRANSITION_DURATION = 150;
	e.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	};
	e.prototype.toggle = function (t) {
		return this.isShown ? this.hide() : this.show(t)
	};
	e.prototype.show = function (i) {
		var o = this,
			n = t.Event('show.bs.modal', {
				relatedTarget: i
			});
		this.$element.trigger(n);
		if (this.isShown || n.isDefaultPrevented()) return;
		this.isShown = !0;
		this.checkScrollbar();
		this.setScrollbar();
		this.$body.addClass('modal-open');
		this.escape();
		this.resize();
		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', t.proxy(this.hide, this));
		this.$dialog.on('mousedown.dismiss.bs.modal', function () {
			o.$element.one('mouseup.dismiss.bs.modal', function (e) {
				if (t(e.target).is(o.$element)) o.ignoreBackdropClick = !0
			})
		});
		this.backdrop(function () {
			var s = t.support.transition && o.$element.hasClass('fade');
			if (!o.$element.parent().length) {
				o.$element.appendTo(o.$body)
			}
			;
			o.$element.show().scrollTop(0);
			o.adjustDialog();
			if (s) {
				o.$element[0].offsetWidth
			}
			;
			o.$element.addClass('in');
			o.enforceFocus();
			var n = t.Event('shown.bs.modal', {
				relatedTarget: i
			});
			s ? o.$dialog.one('bsTransitionEnd', function () {
				o.$element.trigger('focus').trigger(n)
			}).emulateTransitionEnd(e.TRANSITION_DURATION) : o.$element.trigger('focus').trigger(n)
		})
	};
	e.prototype.hide = function (i) {
		if (i) i.preventDefault();
		i = t.Event('hide.bs.modal');
		this.$element.trigger(i);
		if (!this.isShown || i.isDefaultPrevented()) return;
		this.isShown = !1;
		this.escape();
		this.resize();
		t(document).off('focusin.bs.modal');
		this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
		this.$dialog.off('mousedown.dismiss.bs.modal');
		t.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal()
	};
	e.prototype.enforceFocus = function () {
		t(document).off('focusin.bs.modal').on('focusin.bs.modal', t.proxy(function (t) {
			if (this.$element[0] !== t.target && !this.$element.has(t.target).length) {
				this.$element.trigger('focus')
			}
		}, this))
	};
	e.prototype.escape = function () {
		if (this.isShown && this.options.keyboard) {
			this.$element.on('keydown.dismiss.bs.modal', t.proxy(function (t) {
				t.which == 27 && this.hide()
			}, this))
		} else if (!this.isShown) {
			this.$element.off('keydown.dismiss.bs.modal')
		}
	};
	e.prototype.resize = function () {
		if (this.isShown) {
			t(window).on('resize.bs.modal', t.proxy(this.handleUpdate, this))
		} else {
			t(window).off('resize.bs.modal')
		}
	};
	e.prototype.hideModal = function () {
		var t = this;
		this.$element.hide();
		this.backdrop(function () {
			t.$body.removeClass('modal-open');
			t.resetAdjustments();
			t.resetScrollbar();
			t.$element.trigger('hidden.bs.modal')
		})
	};
	e.prototype.removeBackdrop = function () {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null
	};
	e.prototype.backdrop = function (i) {
		var r = this,
			s = this.$element.hasClass('fade') ? 'fade' : '';
		if (this.isShown && this.options.backdrop) {
			var n = t.support.transition && s;
			this.$backdrop = t(document.createElement('div')).addClass('modal-backdrop ' + s).appendTo(this.$body);
			this.$element.on('click.dismiss.bs.modal', t.proxy(function (t) {
				if (this.ignoreBackdropClick) {
					this.ignoreBackdropClick = !1;
					return
				}
				;
				if (t.target !== t.currentTarget) return;
				this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide()
			}, this));
			if (n) this.$backdrop[0].offsetWidth;
			this.$backdrop.addClass('in');
			if (!i) return;
			n ? this.$backdrop.one('bsTransitionEnd', i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass('in');
			var o = function () {
				r.removeBackdrop();
				i && i()
			};
			t.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', o).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : o()
		} else if (i) {
			i()
		}
	};
	e.prototype.handleUpdate = function () {
		this.adjustDialog()
	};
	e.prototype.adjustDialog = function () {
		var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : '',
			paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ''
		})
	};
	e.prototype.resetAdjustments = function () {
		this.$element.css({
			paddingLeft: '',
			paddingRight: ''
		})
	};
	e.prototype.checkScrollbar = function () {
		var t = window.innerWidth;
		if (!t) {
			var e = document.documentElement.getBoundingClientRect();
			t = e.right - Math.abs(e.left)
		}
		;
		this.bodyIsOverflowing = document.body.clientWidth < t;
		this.scrollbarWidth = this.measureScrollbar()
	};
	e.prototype.setScrollbar = function () {
		var t = parseInt((this.$body.css('padding-right') || 0), 10);
		this.originalBodyPad = document.body.style.paddingRight || '';
		if (this.bodyIsOverflowing) this.$body.css('padding-right', t + this.scrollbarWidth)
	};
	e.prototype.resetScrollbar = function () {
		this.$body.css('padding-right', this.originalBodyPad)
	};
	e.prototype.measureScrollbar = function () {
		var t = document.createElement('div');
		t.className = 'modal-scrollbar-measure';
		this.$body.append(t);
		var e = t.offsetWidth - t.clientWidth;
		this.$body[0].removeChild(t);
		return e
	};

	function i(i, o) {
		return this.each(function () {
			var s = t(this),
				n = s.data('bs.modal'),
				r = t.extend({}, e.DEFAULTS, s.data(), typeof i == 'object' && i);
			if (!n) s.data('bs.modal', (n = new e(this, r)));
			if (typeof i == 'string') n[i](o);
			else if (r.show) n.show(o)
		})
	};
	var o = t.fn.modal;
	t.fn.modal = i;
	t.fn.modal.Constructor = e;
	t.fn.modal.noConflict = function () {
		t.fn.modal = o;
		return this
	};
	t(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
		var o = t(this),
			s = o.attr('href'),
			n = t(o.attr('data-target') || (s && s.replace(/.*(?=#[^\s]+$)/, ''))),
			r = n.data('bs.modal') ? 'toggle' : t.extend({
				remote: !/#/.test(s) && s
			}, n.data(), o.data());
		if (o.is('a')) e.preventDefault();
		n.one('show.bs.modal', function (t) {
			if (t.isDefaultPrevented()) return n.one('hidden.bs.modal', function () {
				o.is(':visible') && o.trigger('focus')
			})
		});
		i.call(n, r, this)
	})
}(jQuery);
+function (t) {
	'use strict';
	var e = function (t, e) {
		this.type = null;
		this.options = null;
		this.enabled = null;
		this.timeout = null;
		this.hoverState = null;
		this.$element = null;
		this.inState = null;
		this.init('tooltip', t, e)
	};
	e.VERSION = '3.3.5';
	e.TRANSITION_DURATION = 150;
	e.DEFAULTS = {
		animation: !0,
		placement: 'top',
		selector: !1,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: 'hover focus',
		title: '',
		delay: 0,
		html: !1,
		container: !1,
		viewport: {
			selector: 'body',
			padding: 0
		}
	};
	e.prototype.init = function (e, i, o) {
		this.enabled = !0;
		this.type = e;
		this.$element = t(i);
		this.options = this.getOptions(o);
		this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport));
		this.inState = {
			click: !1,
			hover: !1,
			focus: !1
		};
		if (this.$element[0] instanceof document.constructor && !this.options.selector) {
			throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
		}
		;
		var r = this.options.trigger.split(' ');
		for (var s = r.length; s--;) {
			var n = r[s];
			if (n == 'click') {
				this.$element.on('click.' + this.type, this.options.selector, t.proxy(this.toggle, this))
			} else if (n != 'manual') {
				var a = n == 'hover' ? 'mouseenter' : 'focusin',
					l = n == 'hover' ? 'mouseleave' : 'focusout';
				this.$element.on(a + '.' + this.type, this.options.selector, t.proxy(this.enter, this));
				this.$element.on(l + '.' + this.type, this.options.selector, t.proxy(this.leave, this))
			}
		}
		;
		this.options.selector ? (this._options = t.extend({}, this.options, {
			trigger: 'manual',
			selector: ''
		})) : this.fixTitle()
	};
	e.prototype.getDefaults = function () {
		return e.DEFAULTS
	};
	e.prototype.getOptions = function (e) {
		e = t.extend({}, this.getDefaults(), this.$element.data(), e);
		if (e.delay && typeof e.delay == 'number') {
			e.delay = {
				show: e.delay,
				hide: e.delay
			}
		}
		;
		return e
	};
	e.prototype.getDelegateOptions = function () {
		var e = {};
		var i = this.getDefaults();
		this._options && t.each(this._options, function (t, o) {
			if (i[t] != o) e[t] = o
		});
		return e
	};
	e.prototype.enter = function (e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data('bs.' + this.type);
		if (!i) {
			i = new this.constructor(e.currentTarget, this.getDelegateOptions());
			t(e.currentTarget).data('bs.' + this.type, i)
		}
		;
		if (e instanceof t.Event) {
			i.inState[e.type == 'focusin' ? 'focus' : 'hover'] = !0
		}
		;
		if (i.tip().hasClass('in') || i.hoverState == 'in') {
			i.hoverState = 'in';
			return
		}
		;
		clearTimeout(i.timeout);
		i.hoverState = 'in';
		if (!i.options.delay || !i.options.delay.show) return i.show();
		i.timeout = setTimeout(function () {
			if (i.hoverState == 'in') i.show()
		}, i.options.delay.show)
	};
	e.prototype.isInStateTrue = function () {
		for (var t in this.inState) {
			if (this.inState[t]) return !0
		}
		;
		return !1
	};
	e.prototype.leave = function (e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data('bs.' + this.type);
		if (!i) {
			i = new this.constructor(e.currentTarget, this.getDelegateOptions());
			t(e.currentTarget).data('bs.' + this.type, i)
		}
		;
		if (e instanceof t.Event) {
			i.inState[e.type == 'focusout' ? 'focus' : 'hover'] = !1
		}
		;
		if (i.isInStateTrue()) return;
		clearTimeout(i.timeout);
		i.hoverState = 'out';
		if (!i.options.delay || !i.options.delay.hide) return i.hide();
		i.timeout = setTimeout(function () {
			if (i.hoverState == 'out') i.hide()
		}, i.options.delay.hide)
	};
	e.prototype.show = function () {
		var c = t.Event('show.bs.' + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(c);
			var m = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
			if (c.isDefaultPrevented() || !m) return;
			var n = this,
				o = this.tip(),
				p = this.getUID(this.type);
			this.setContent();
			o.attr('id', p);
			this.$element.attr('aria-describedby', p);
			if (this.options.animation) o.addClass('fade');
			var i = typeof this.options.placement == 'function' ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
				d = /\s?auto?\s?/i,
				f = d.test(i);
			if (f) i = i.replace(d, '') || 'top';
			o.detach().css({
				top: 0,
				left: 0,
				display: 'block'
			}).addClass(i).data('bs.' + this.type, this);
			this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
			this.$element.trigger('inserted.bs.' + this.type);
			var s = this.getPosition(),
				a = o[0].offsetWidth,
				l = o[0].offsetHeight;
			if (f) {
				var g = i,
					r = this.getPosition(this.$viewport);
				i = i == 'bottom' && s.bottom + l > r.bottom ? 'top' : i == 'top' && s.top - l < r.top ? 'bottom' : i == 'right' && s.right + a > r.width ? 'left' : i == 'left' && s.left - a < r.left ? 'right' : i;
				o.removeClass(g).addClass(i)
			}
			;
			var u = this.getCalculatedOffset(i, s, a, l);
			this.applyPlacement(u, i);
			var h = function () {
				var t = n.hoverState;
				n.$element.trigger('shown.bs.' + n.type);
				n.hoverState = null;
				if (t == 'out') n.leave(n)
			};
			t.support.transition && this.$tip.hasClass('fade') ? o.one('bsTransitionEnd', h).emulateTransitionEnd(e.TRANSITION_DURATION) : h()
		}
	};
	e.prototype.applyPlacement = function (e, i) {
		var o = this.tip(),
			c = o[0].offsetWidth,
			a = o[0].offsetHeight,
			l = parseInt(o.css('margin-top'), 10),
			h = parseInt(o.css('margin-left'), 10);
		if (isNaN(l)) l = 0;
		if (isNaN(h)) h = 0;
		e.top += l;
		e.left += h;
		t.offset.setOffset(o[0], t.extend({
			using: function (t) {
				o.css({
					top: Math.round(t.top),
					left: Math.round(t.left)
				})
			}
		}, e), 0);
		o.addClass('in');
		var d = o[0].offsetWidth,
			s = o[0].offsetHeight;
		if (i == 'top' && s != a) {
			e.top = e.top + a - s
		}
		;
		var n = this.getViewportAdjustedDelta(i, e, d, s);
		if (n.left) e.left += n.left;
		else e.top += n.top;
		var r = /top|bottom/.test(i),
			f = r ? n.left * 2 - c + d : n.top * 2 - a + s,
			p = r ? 'offsetWidth' : 'offsetHeight';
		o.offset(e);
		this.replaceArrow(f, o[0][p], r)
	};
	e.prototype.replaceArrow = function (t, e, i) {
		this.arrow().css(i ? 'left' : 'top', 50 * (1 - t / e) + '%').css(i ? 'top' : 'left', '')
	};
	e.prototype.setContent = function () {
		var t = this.tip(),
			e = this.getTitle();
		t.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](e);
		t.removeClass('fade in top bottom left right')
	};
	e.prototype.hide = function (i) {
		var n = this,
			o = t(this.$tip),
			s = t.Event('hide.bs.' + this.type);

		function r() {
			if (n.hoverState != 'in') o.detach();
			n.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + n.type);
			i && i()
		};
		this.$element.trigger(s);
		if (s.isDefaultPrevented()) return;
		o.removeClass('in');
		t.support.transition && o.hasClass('fade') ? o.one('bsTransitionEnd', r).emulateTransitionEnd(e.TRANSITION_DURATION) : r();
		this.hoverState = null;
		return this
	};
	e.prototype.fixTitle = function () {
		var t = this.$element;
		if (t.attr('title') || typeof t.attr('data-original-title') != 'string') {
			t.attr('data-original-title', t.attr('title') || '').attr('title', '')
		}
	};
	e.prototype.hasContent = function () {
		return this.getTitle()
	};
	e.prototype.getPosition = function (e) {
		e = e || this.$element;
		var n = e[0],
			o = n.tagName == 'BODY',
			i = n.getBoundingClientRect();
		if (i.width == null) {
			i = t.extend({}, i, {
				width: i.right - i.left,
				height: i.bottom - i.top
			})
		}
		;
		var a = o ? {
			top: 0,
			left: 0
		} : e.offset();
		var r = {
			scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
		};
		var s = o ? {
			width: t(window).width(),
			height: t(window).height()
		} : null;
		return t.extend({}, i, r, s, a)
	};
	e.prototype.getCalculatedOffset = function (t, e, i, o) {
		return t == 'bottom' ? {
			top: e.top + e.height,
			left: e.left + e.width / 2 - i / 2
		} : t == 'top' ? {
			top: e.top - o,
			left: e.left + e.width / 2 - i / 2
		} : t == 'left' ? {
			top: e.top + e.height / 2 - o / 2,
			left: e.left - i
		} : {
			top: e.top + e.height / 2 - o / 2,
			left: e.left + e.width
		}
	};
	e.prototype.getViewportAdjustedDelta = function (t, e, o, r) {
		var n = {
			top: 0,
			left: 0
		};
		if (!this.$viewport) return n;
		var s = this.options.viewport && this.options.viewport.padding || 0,
			i = this.getPosition(this.$viewport);
		if (/right|left/.test(t)) {
			var h = e.top - s - i.scroll,
				d = e.top + s - i.scroll + r;
			if (h < i.top) {
				n.top = i.top - h
			} else if (d > i.top + i.height) {
				n.top = i.top + i.height - d
			}
		} else {
			var a = e.left - s,
				l = e.left + s + o;
			if (a < i.left) {
				n.left = i.left - a
			} else if (l > i.right) {
				n.left = i.left + i.width - l
			}
		}
		;
		return n
	};
	e.prototype.getTitle = function () {
		var e, i = this.$element,
			t = this.options;
		e = i.attr('data-original-title') || (typeof t.title == 'function' ? t.title.call(i[0]) : t.title);
		return e
	};
	e.prototype.getUID = function (t) {
		do t += ~~(Math.random() * 1000000); while (document.getElementById(t))
		return t
	};
	e.prototype.tip = function () {
		if (!this.$tip) {
			this.$tip = t(this.options.template);
			if (this.$tip.length != 1) {
				throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
			}
		}
		;
		return this.$tip
	};
	e.prototype.arrow = function () {
		return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	};
	e.prototype.enable = function () {
		this.enabled = !0
	};
	e.prototype.disable = function () {
		this.enabled = !1
	};
	e.prototype.toggleEnabled = function () {
		this.enabled = !this.enabled
	};
	e.prototype.toggle = function (e) {
		var i = this;
		if (e) {
			i = t(e.currentTarget).data('bs.' + this.type);
			if (!i) {
				i = new this.constructor(e.currentTarget, this.getDelegateOptions());
				t(e.currentTarget).data('bs.' + this.type, i)
			}
		}
		;
		if (e) {
			i.inState.click = !i.inState.click;
			if (i.isInStateTrue()) i.enter(i);
			else i.leave(i)
		} else {
			i.tip().hasClass('in') ? i.leave(i) : i.enter(i)
		}
	};
	e.prototype.destroy = function () {
		var t = this;
		clearTimeout(this.timeout);
		this.hide(function () {
			t.$element.off('.' + t.type).removeData('bs.' + t.type);
			if (t.$tip) {
				t.$tip.detach()
			}
			;
			t.$tip = null;
			t.$arrow = null;
			t.$viewport = null
		})
	};

	function o(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.tooltip'),
				s = typeof i == 'object' && i;
			if (!o && /destroy|hide/.test(i)) return;
			if (!o) n.data('bs.tooltip', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var i = t.fn.tooltip;
	t.fn.tooltip = o;
	t.fn.tooltip.Constructor = e;
	t.fn.tooltip.noConflict = function () {
		t.fn.tooltip = i;
		return this
	}
}(jQuery);
+function (t) {
	'use strict';
	var e = function (t, e) {
		this.init('popover', t, e)
	};
	if (!t.fn.tooltip) throw new Error('Popover requires tooltip.js');
	e.VERSION = '3.3.5';
	e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
		placement: 'right',
		trigger: 'click',
		content: '',
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	});
	e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype);
	e.prototype.constructor = e;
	e.prototype.getDefaults = function () {
		return e.DEFAULTS
	};
	e.prototype.setContent = function () {
		var t = this.tip(),
			i = this.getTitle(),
			e = this.getContent();
		t.find('.popover-title')[this.options.html ? 'html' : 'text'](i);
		t.find('.popover-content').children().detach().end()[this.options.html ? (typeof e == 'string' ? 'html' : 'append') : 'text'](e);
		t.removeClass('fade top bottom left right in');
		if (!t.find('.popover-title').html()) t.find('.popover-title').hide()
	};
	e.prototype.hasContent = function () {
		return this.getTitle() || this.getContent()
	};
	e.prototype.getContent = function () {
		var e = this.$element,
			t = this.options;
		return e.attr('data-content') || (typeof t.content == 'function' ? t.content.call(e[0]) : t.content)
	};
	e.prototype.arrow = function () {
		return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	};

	function o(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.popover'),
				s = typeof i == 'object' && i;
			if (!o && /destroy|hide/.test(i)) return;
			if (!o) n.data('bs.popover', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var i = t.fn.popover;
	t.fn.popover = o;
	t.fn.popover.Constructor = e;
	t.fn.popover.noConflict = function () {
		t.fn.popover = i;
		return this
	}
}(jQuery);
+function (t) {
	'use strict';

	function e(i, o) {
		this.$body = t(document.body);
		this.$scrollElement = t(i).is(document.body) ? t(window) : t(i);
		this.options = t.extend({}, e.DEFAULTS, o);
		this.selector = (this.options.target || '') + ' .nav li > a';
		this.offsets = [];
		this.targets = [];
		this.activeTarget = null;
		this.scrollHeight = 0;
		this.$scrollElement.on('scroll.bs.scrollspy', t.proxy(this.process, this));
		this.refresh();
		this.process()
	};
	e.VERSION = '3.3.5';
	e.DEFAULTS = {
		offset: 10
	};
	e.prototype.getScrollHeight = function () {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	};
	e.prototype.refresh = function () {
		var e = this,
			i = 'offset',
			o = 0;
		this.offsets = [];
		this.targets = [];
		this.scrollHeight = this.getScrollHeight();
		if (!t.isWindow(this.$scrollElement[0])) {
			i = 'position';
			o = this.$scrollElement.scrollTop()
		}
		;
		this.$body.find(this.selector).map(function () {
			var s = t(this),
				n = s.data('target') || s.attr('href'),
				e = /^#./.test(n) && t(n);
			return (e && e.length && e.is(':visible') && [
					[e[i]().top + o, n]
				]) || null
		}).sort(function (t, e) {
			return t[0] - e[0]
		}).each(function () {
			e.offsets.push(this[0]);
			e.targets.push(this[1])
		})
	};
	e.prototype.process = function () {
		var i = this.$scrollElement.scrollTop() + this.options.offset,
			s = this.getScrollHeight(),
			r = this.options.offset + s - this.$scrollElement.height(),
			e = this.offsets,
			o = this.targets,
			n = this.activeTarget,
			t;
		if (this.scrollHeight != s) {
			this.refresh()
		}
		;
		if (i >= r) {
			return n != (t = o[o.length - 1]) && this.activate(t)
		}
		;
		if (n && i < e[0]) {
			this.activeTarget = null;
			return this.clear()
		}
		;
		for (t = e.length; t--;) {
			n != o[t] && i >= e[t] && (e[t + 1] === undefined || i < e[t + 1]) && this.activate(o[t])
		}
	};
	e.prototype.activate = function (e) {
		this.activeTarget = e;
		this.clear();
		var o = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
			i = t(o).parents('li').addClass('active');
		if (i.parent('.dropdown-menu').length) {
			i = i.closest('li.dropdown').addClass('active')
		}
		;
		i.trigger('activate.bs.scrollspy')
	};
	e.prototype.clear = function () {
		t(this.selector).parentsUntil(this.options.target, '.active').removeClass('active')
	};

	function i(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.scrollspy'),
				s = typeof i == 'object' && i;
			if (!o) n.data('bs.scrollspy', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var o = t.fn.scrollspy;
	t.fn.scrollspy = i;
	t.fn.scrollspy.Constructor = e;
	t.fn.scrollspy.noConflict = function () {
		t.fn.scrollspy = o;
		return this
	};
	t(window).on('load.bs.scrollspy.data-api', function () {
		t('[data-spy="scroll"]').each(function () {
			var e = t(this);
			i.call(e, e.data())
		})
	})
}(jQuery);
+function (t) {
	'use strict';
	var e = function (e) {
		this.element = t(e)
	};
	e.VERSION = '3.3.5';
	e.TRANSITION_DURATION = 150;
	e.prototype.show = function () {
		var e = this.element,
			a = e.closest('ul:not(.dropdown-menu)'),
			i = e.data('target');
		if (!i) {
			i = e.attr('href');
			i = i && i.replace(/.*(?=#[^\s]*$)/, '')
		}
		;
		if (e.parent('li').hasClass('active')) return;
		var o = a.find('.active:last a'),
			r = t.Event('hide.bs.tab', {
				relatedTarget: e[0]
			});
		var s = t.Event('show.bs.tab', {
			relatedTarget: o[0]
		});
		o.trigger(r);
		e.trigger(s);
		if (s.isDefaultPrevented() || r.isDefaultPrevented()) return;
		var n = t(i);
		this.activate(e.closest('li'), a);
		this.activate(n, n.parent(), function () {
			o.trigger({
				type: 'hidden.bs.tab',
				relatedTarget: e[0]
			});
			e.trigger({
				type: 'shown.bs.tab',
				relatedTarget: o[0]
			})
		})
	};
	e.prototype.activate = function (i, o, n) {
		var s = o.find('> .active'),
			r = n && t.support.transition && (s.length && s.hasClass('fade') || !!o.find('> .fade').length);

		function a() {
			s.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !1);
			i.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', !0);
			if (r) {
				i[0].offsetWidth;
				i.addClass('in')
			} else {
				i.removeClass('fade')
			}
			;
			if (i.parent('.dropdown-menu').length) {
				i.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !0)
			}
			;
			n && n()
		};
		s.length && r ? s.one('bsTransitionEnd', a).emulateTransitionEnd(e.TRANSITION_DURATION) : a();
		s.removeClass('in')
	};

	function o(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.tab');
			if (!o) n.data('bs.tab', (o = new e(this)));
			if (typeof i == 'string') o[i]()
		})
	};
	var n = t.fn.tab;
	t.fn.tab = o;
	t.fn.tab.Constructor = e;
	t.fn.tab.noConflict = function () {
		t.fn.tab = n;
		return this
	};
	var i = function (e) {
		e.preventDefault();
		o.call(t(this), 'show')
	};
	t(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', i).on('click.bs.tab.data-api', '[data-toggle="pill"]', i)
}(jQuery);
+function (t) {
	'use strict';
	var e = function (i, o) {
		this.options = t.extend({}, e.DEFAULTS, o);
		this.$target = t(this.options.target).on('scroll.bs.affix.data-api', t.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', t.proxy(this.checkPositionWithEventLoop, this));
		this.$element = t(i);
		this.affixed = null;
		this.unpin = null;
		this.pinnedOffset = null;
		this.checkPosition()
	};
	e.VERSION = '3.3.5';
	e.RESET = 'affix affix-top affix-bottom';
	e.DEFAULTS = {
		offset: 0,
		target: window
	};
	e.prototype.getState = function (t, e, i, o) {
		var n = this.$target.scrollTop(),
			r = this.$element.offset(),
			a = this.$target.height();
		if (i != null && this.affixed == 'top') return n < i ? 'top' : !1;
		if (this.affixed == 'bottom') {
			if (i != null) return (n + this.unpin <= r.top) ? !1 : 'bottom';
			return (n + a <= t - o) ? !1 : 'bottom'
		}
		;
		var s = this.affixed == null,
			l = s ? n : r.top,
			h = s ? a : e;
		if (i != null && n <= i) return 'top';
		if (o != null && (l + h >= t - o)) return 'bottom';
		return !1
	};
	e.prototype.getPinnedOffset = function () {
		if (this.pinnedOffset) return this.pinnedOffset;
		this.$element.removeClass(e.RESET).addClass('affix');
		var t = this.$target.scrollTop(),
			i = this.$element.offset();
		return (this.pinnedOffset = i.top - t)
	};
	e.prototype.checkPositionWithEventLoop = function () {
		setTimeout(t.proxy(this.checkPosition, this), 1)
	};
	e.prototype.checkPosition = function () {
		if (!this.$element.is(':visible')) return;
		var l = this.$element.height(),
			o = this.options.offset,
			s = o.top,
			n = o.bottom,
			h = Math.max(t(document).height(), t(document.body).height());
		if (typeof o != 'object') n = s = o;
		if (typeof s == 'function') s = o.top(this.$element);
		if (typeof n == 'function') n = o.bottom(this.$element);
		var i = this.getState(h, l, s, n);
		if (this.affixed != i) {
			if (this.unpin != null) this.$element.css('top', '');
			var r = 'affix' + (i ? '-' + i : ''),
				a = t.Event(r + '.bs.affix');
			this.$element.trigger(a);
			if (a.isDefaultPrevented()) return;
			this.affixed = i;
			this.unpin = i == 'bottom' ? this.getPinnedOffset() : null;
			this.$element.removeClass(e.RESET).addClass(r).trigger(r.replace('affix', 'affixed') + '.bs.affix')
		}
		;
		if (i == 'bottom') {
			this.$element.offset({
				top: h - l - n
			})
		}
	};

	function i(i) {
		return this.each(function () {
			var n = t(this),
				o = n.data('bs.affix'),
				s = typeof i == 'object' && i;
			if (!o) n.data('bs.affix', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var o = t.fn.affix;
	t.fn.affix = i;
	t.fn.affix.Constructor = e;
	t.fn.affix.noConflict = function () {
		t.fn.affix = o;
		return this
	};
	t(window).on('load', function () {
		t('[data-spy="affix"]').each(function () {
			var o = t(this),
				e = o.data();
			e.offset = e.offset || {};
			if (e.offsetBottom != null) e.offset.bottom = e.offsetBottom;
			if (e.offsetTop != null) e.offset.top = e.offsetTop;
			i.call(o, e)
		})
	})
}(jQuery);
/*!
 * Bootstrap-select v1.9.4 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2016 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
(function (e, t) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function (e) {
			return (t(e))
		})
	} else if (typeof exports === 'object') {
		module.exports = t(require('jquery'))
	} else {
		t(jQuery)
	}
}(this, function (e) {
	(function (e) {
		'use strict';
		if (!String.prototype.includes) {
			(function () {
				'use strict';
				var n = {}.toString;
				var e = (function () {
						try {
							var e = {};
							var t = Object.defineProperty,
								i = t(e, e, e) && t
						} catch (n) {
						}
						;
						return i
					}()),
					i = ''.indexOf,
					t = function (e) {
						if (this == null) {
							throw new TypeError()
						}
						;
						var l = String(this);
						if (e && n.call(e) == '[object RegExp]') {
							throw new TypeError()
						}
						;
						var s = l.length,
							o = String(e),
							d = o.length,
							a = arguments.length > 1 ? arguments[1] : undefined,
							t = a ? Number(a) : 0;
						if (t != t) {
							t = 0
						}
						;
						var r = Math.min(Math.max(t, 0), s);
						if (d + r > s) {
							return !1
						}
						;
						return i.call(l, o, t) != -1
					};
				if (e) {
					e(String.prototype, 'includes', {
						'value': t,
						'configurable': !0,
						'writable': !0
					})
				} else {
					String.prototype.includes = t
				}
			}())
		}
		;
		if (!String.prototype.startsWith) {
			(function () {
				'use strict';
				var t = (function () {
						try {
							var e = {};
							var t = Object.defineProperty,
								i = t(e, e, e) && t
						} catch (n) {
						}
						;
						return i
					}()),
					i = {}.toString;
				var e = function (e) {
					if (this == null) {
						throw new TypeError()
					}
					;
					var d = String(this);
					if (e && i.call(e) == '[object RegExp]') {
						throw new TypeError()
					}
					;
					var o = d.length,
						a = String(e),
						l = a.length,
						r = arguments.length > 1 ? arguments[1] : undefined,
						t = r ? Number(r) : 0;
					if (t != t) {
						t = 0
					}
					;
					var s = Math.min(Math.max(t, 0), o);
					if (l + s > o) {
						return !1
					}
					;
					var n = -1;
					while (++n < l) {
						if (d.charCodeAt(s + n) != a.charCodeAt(n)) {
							return !1
						}
					}
					;
					return !0
				};
				if (t) {
					t(String.prototype, 'startsWith', {
						'value': e,
						'configurable': !0,
						'writable': !0
					})
				} else {
					String.prototype.startsWith = e
				}
			}())
		}
		;
		if (!Object.keys) {
			Object.keys = function (e, t, i) {
				i = [];
				for (t in e) i.hasOwnProperty.call(e, t) && i.push(t);
				return i
			}
		}
		;
		e.fn.triggerNative = function (e) {
			var i = this[0],
				t;
			if (i.dispatchEvent) {
				if (typeof Event === 'function') {
					t = new Event(e, {
						bubbles: !0
					})
				} else {
					t = document.createEvent('Event');
					t.initEvent(e, !0, !1)
				}
				;
				i.dispatchEvent(t)
			} else {
				if (i.fireEvent) {
					t = document.createEventObject();
					t.eventType = e;
					i.fireEvent('on' + e, t)
				}
				;
				this.trigger(e)
			}
		};
		e.expr[':'].icontains = function (t, i, n) {
			var s = e(t),
				o = (s.data('tokens') || s.text()).toUpperCase();
			return o.includes(n[3].toUpperCase())
		};
		e.expr[':'].ibegins = function (t, i, n) {
			var s = e(t),
				o = (s.data('tokens') || s.text()).toUpperCase();
			return o.startsWith(n[3].toUpperCase())
		};
		e.expr[':'].aicontains = function (t, i, n) {
			var s = e(t),
				o = (s.data('tokens') || s.data('normalizedText') || s.text()).toUpperCase();
			return o.includes(n[3].toUpperCase())
		};
		e.expr[':'].aibegins = function (t, i, n) {
			var s = e(t),
				o = (s.data('tokens') || s.data('normalizedText') || s.text()).toUpperCase();
			return o.startsWith(n[3].toUpperCase())
		};

		function i(t) {
			var i = [{
				re: /[\xC0-\xC6]/g,
				ch: 'A'
			}, {
				re: /[\xE0-\xE6]/g,
				ch: 'a'
			}, {
				re: /[\xC8-\xCB]/g,
				ch: 'E'
			}, {
				re: /[\xE8-\xEB]/g,
				ch: 'e'
			}, {
				re: /[\xCC-\xCF]/g,
				ch: 'I'
			}, {
				re: /[\xEC-\xEF]/g,
				ch: 'i'
			}, {
				re: /[\xD2-\xD6]/g,
				ch: 'O'
			}, {
				re: /[\xF2-\xF6]/g,
				ch: 'o'
			}, {
				re: /[\xD9-\xDC]/g,
				ch: 'U'
			}, {
				re: /[\xF9-\xFC]/g,
				ch: 'u'
			}, {
				re: /[\xC7-\xE7]/g,
				ch: 'c'
			}, {
				re: /[\xD1]/g,
				ch: 'N'
			}, {
				re: /[\xF1]/g,
				ch: 'n'
			}];
			e.each(i, function () {
				t = t.replace(this.re, this.ch)
			});
			return t
		};

		function n(e) {
			var n = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				'\'': '&#x27;',
				'`': '&#x60;'
			};
			var i = '(?:' + Object.keys(n).join('|') + ')',
				s = new RegExp(i),
				o = new RegExp(i, 'g'),
				t = e == null ? '' : '' + e;
			return s.test(t) ? t.replace(o, function (e) {
				return n[e]
			}) : t
		};
		var t = function (i, n, s) {
			if (s) {
				s.stopPropagation();
				s.preventDefault()
			}
			;
			this.$element = e(i);
			this.$newElement = null;
			this.$button = null;
			this.$menu = null;
			this.$lis = null;
			this.options = n;
			if (this.options.title === null) {
				this.options.title = this.$element.attr('title')
			}
			;
			this.val = t.prototype.val;
			this.render = t.prototype.render;
			this.refresh = t.prototype.refresh;
			this.setStyle = t.prototype.setStyle;
			this.selectAll = t.prototype.selectAll;
			this.deselectAll = t.prototype.deselectAll;
			this.destroy = t.prototype.destroy;
			this.remove = t.prototype.remove;
			this.show = t.prototype.show;
			this.hide = t.prototype.hide;
			this.init()
		};
		t.VERSION = '1.9.4';
		t.DEFAULTS = {
			noneSelectedText: 'Nothing selected',
			noneResultsText: 'No results matched {0}',
			countSelectedText: function (e, t) {
				return (e == 1) ? '{0} item selected' : '{0} items selected'
			},
			maxOptionsText: function (e, t) {
				return [(e == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)', (t == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)']
			},
			selectAllText: 'Select All',
			deselectAllText: 'Deselect All',
			doneButton: !1,
			doneButtonText: 'Close',
			multipleSeparator: ', ',
			styleBase: 'btn',
			style: 'btn-default',
			size: 'auto',
			title: null,
			selectedTextFormat: 'values',
			width: !1,
			container: !1,
			hideDisabled: !1,
			showSubtext: !1,
			showIcon: !0,
			showContent: !0,
			dropupAuto: !0,
			header: !1,
			liveSearch: !1,
			liveSearchPlaceholder: null,
			liveSearchNormalize: !1,
			liveSearchStyle: 'contains',
			actionsBox: !1,
			iconBase: 'glyphicon',
			tickIcon: 'glyphicon-ok',
			template: {
				caret: '<span class="caret"></span>'
			},
			maxOptions: !1,
			mobile: !1,
			selectOnTab: !1,
			dropdownAlignRight: !1
		};
		t.prototype = {
			constructor: t,
			init: function () {
				var t = this,
					i = this.$element.attr('id');
				this.liObj = {};
				this.multiple = this.$element.prop('multiple');
				this.autofocus = this.$element.prop('autofocus');
				this.$newElement = this.createView();
				this.$element.after(this.$newElement).appendTo(this.$newElement);
				this.$button = this.$newElement.children('button');
				this.$menu = this.$newElement.children('.dropdown-menu');
				this.$menuInner = this.$menu.children('.inner');
				this.$searchbox = this.$menu.find('input');
				if (this.options.dropdownAlignRight) this.$menu.addClass('dropdown-menu-right');
				if (typeof i !== 'undefined') {
					this.$button.attr('data-id', i);
					e('label[for="' + i + '"]').click(function (e) {
						e.preventDefault();
						t.$button.focus()
					})
				}
				;
				this.checkDisabled();
				this.clickListener();
				if (this.options.liveSearch) this.liveSearchListener();
				this.render();
				this.setStyle();
				this.setWidth();
				if (this.options.container) this.selectPosition();
				this.$menu.data('this', this);
				this.$newElement.data('this', this);
				if (this.options.mobile) this.mobile();
				this.$newElement.on({
					'hide.bs.dropdown': function (e) {
						t.$element.trigger('hide.bs.select', e)
					},
					'hidden.bs.dropdown': function (e) {
						t.$element.trigger('hidden.bs.select', e)
					},
					'show.bs.dropdown': function (e) {
						t.$element.trigger('show.bs.select', e)
					},
					'shown.bs.dropdown': function (e) {
						t.$element.trigger('shown.bs.select', e)
					}
				});
				if (t.$element[0].hasAttribute('required')) {
					this.$element.on('invalid', function () {
						t.$button.addClass('bs-invalid').focus();
						t.$element.on({
							'focus.bs.select': function () {
								t.$button.focus();
								t.$element.off('focus.bs.select')
							},
							'shown.bs.select': function () {
								t.$element.val(t.$element.val()).off('shown.bs.select')
							},
							'rendered.bs.select': function () {
								if (this.validity.valid) t.$button.removeClass('bs-invalid');
								t.$element.off('rendered.bs.select')
							}
						})
					})
				}
				;
				setTimeout(function () {
					t.$element.trigger('loaded.bs.select')
				})
			},
			createDropdown: function () {
				var t = this.multiple ? ' show-tick' : '',
					i = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
					s = this.autofocus ? ' autofocus' : '',
					o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '',
					a = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + n(this.options.liveSearchPlaceholder) + '"') + '></div>' : '',
					l = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + '</button></div></div>' : '',
					r = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + '</button></div></div>' : '',
					d = '<div class="btn-group bootstrap-select' + t + i + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + s + '><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open">' + o + a + l + '<ul class="dropdown-menu inner" role="menu"></ul>' + r + '</div></div>';
				return e(d)
			},
			createView: function () {
				var e = this.createDropdown(),
					t = this.createLi();
				e.find('ul')[0].innerHTML = t;
				return e
			},
			reloadLi: function () {
				this.destroyLi();
				var e = this.createLi();
				this.$menuInner[0].innerHTML = e
			},
			destroyLi: function () {
				this.$menu.find('li').remove()
			},
			createLi: function () {
				var s = this,
					t = [],
					l = 0,
					r = document.createElement('option'),
					o = -1,
					a = function (e, t, i, n) {
						return '<li' + ((typeof i !== 'undefined' & '' !== i) ? ' class="' + i + '"' : '') + ((typeof t !== 'undefined' & null !== t) ? ' data-original-index="' + t + '"' : '') + ((typeof n !== 'undefined' & null !== n) ? 'data-optgroup="' + n + '"' : '') + '>' + e + '</li>'
					},
					h = function (e, t, o, a) {
						return '<a tabindex="0"' + (typeof t !== 'undefined' ? ' class="' + t + '"' : '') + (typeof o !== 'undefined' ? ' style="' + o + '"' : '') + (s.options.liveSearchNormalize ? ' data-normalized-text="' + i(n(e)) + '"' : '') + (typeof a !== 'undefined' || a !== null ? ' data-tokens="' + a + '"' : '') + '>' + e + '<span class="' + s.options.iconBase + ' ' + s.options.tickIcon + ' check-mark"></span></a>'
					};
				if (this.options.title && !this.multiple) {
					o--;
					if (!this.$element.find('.bs-title-option').length) {
						var d = this.$element[0];
						r.className = 'bs-title-option';
						r.appendChild(document.createTextNode(this.options.title));
						r.value = '';
						d.insertBefore(r, d.firstChild);
						if (e(d.options[d.selectedIndex]).attr('selected') === undefined) r.selected = !0
					}
				}
				;
				this.$element.find('option').each(function (i) {
					var n = e(this);
					o++;
					if (n.hasClass('bs-title-option')) return;
					var p = this.className || '',
						u = n.attr('style') ? n.attr('style') : this.style.cssText,
						r = n.data('content') ? n.data('content') : n.html(),
						f = n.data('tokens') ? n.data('tokens') : null,
						y = typeof n.data('subtext') !== 'undefined' ? '<small class="text-muted">' + n.data('subtext') + '</small>' : '',
						d = typeof n.data('icon') !== 'undefined' ? '<span class="' + s.options.iconBase + ' ' + n.data('icon') + '"></span> ' : '',
						m = this.parentNode.tagName === 'OPTGROUP',
						v = this.disabled || (m && this.parentNode.disabled);
					if (d !== '' && v) {
						d = '<span>' + d + '</span>'
					}
					;
					if (s.options.hideDisabled && v && !m) {
						o--;
						return
					}
					;
					if (!n.data('content')) {
						r = d + '<span class="text">' + r + y + '</span>'
					}
					;
					if (m && n.data('divider') !== !0) {
						var b = ' ' + this.parentNode.className || '';
						if (n.index() === 0) {
							l += 1;
							var c = this.parentNode.label,
								g = typeof n.parent().data('subtext') !== 'undefined' ? '<small class="text-muted">' + n.parent().data('subtext') + '</small>' : '',
								x = n.parent().data('icon') ? '<span class="' + s.options.iconBase + ' ' + n.parent().data('icon') + '"></span> ' : '';
							c = x + '<span class="text">' + c + g + '</span>';
							if (i !== 0 && t.length > 0) {
								o++;
								t.push(a('', null, 'divider', l + 'div'))
							}
							;
							o++;
							t.push(a(c, null, 'dropdown-header' + b, l))
						}
						;
						if (s.options.hideDisabled && v) {
							o--;
							return
						}
						;
						t.push(a(h(r, 'opt ' + p + b, u, f), i, '', l))
					} else if (n.data('divider') === !0) {
						t.push(a('', i, 'divider'))
					} else if (n.data('hidden') === !0) {
						t.push(a(h(r, p, u, f), i, 'hidden is-hidden'))
					} else {
						if (this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP') {
							o++;
							t.push(a('', null, 'divider', l + 'div'))
						}
						;
						t.push(a(h(r, p, u, f), i))
					}
					;
					s.liObj[i] = o
				});
				if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
					this.$element.find('option').eq(0).prop('selected', !0).attr('selected', 'selected')
				}
				;
				return t.join('')
			},
			findLis: function () {
				if (this.$lis == null) this.$lis = this.$menu.find('li');
				return this.$lis
			},
			render: function (t) {
				var i = this,
					l;
				if (t !== !1) {
					this.$element.find('option').each(function (e) {
						var t = i.findLis().eq(i.liObj[e]);
						i.setDisabled(e, this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled, t);
						i.setSelected(e, this.selected, t)
					})
				}
				;
				this.tabIndex();
				var n = this.$element.find('option').map(function () {
						if (this.selected) {
							if (i.options.hideDisabled && (this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled)) return;
							var t = e(this),
								s = t.data('icon') && i.options.showIcon ? '<i class="' + i.options.iconBase + ' ' + t.data('icon') + '"></i> ' : '',
								n;
							if (i.options.showSubtext && t.data('subtext') && !i.multiple) {
								n = ' <small class="text-muted">' + t.data('subtext') + '</small>'
							} else {
								n = ''
							}
							;
							if (typeof t.attr('title') !== 'undefined') {
								return t.attr('title')
							} else if (t.data('content') && i.options.showContent) {
								return t.data('content')
							} else {
								return s + t.html() + n
							}
						}
					}).toArray(),
					s = !this.multiple ? n[0] : n.join(this.options.multipleSeparator);
				if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
					var o = this.options.selectedTextFormat.split('>');
					if ((o.length > 1 && n.length > o[1]) || (o.length == 1 && n.length >= 2)) {
						l = this.options.hideDisabled ? ', [disabled]' : '';
						var a = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + l).length,
							r = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(n.length, a) : this.options.countSelectedText;
						s = r.replace('{0}', n.length.toString()).replace('{1}', a.toString())
					}
				}
				;
				if (this.options.title == undefined) {
					this.options.title = this.$element.attr('title')
				}
				;
				if (this.options.selectedTextFormat == 'static') {
					s = this.options.title
				}
				;
				if (!s) {
					s = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText
				}
				;
				this.$button.attr('title', e.trim(s.replace(/<[^>]*>?/g, '')));
				this.$button.children('.filter-option').html(s);
				this.$element.trigger('rendered.bs.select')
			},
			setStyle: function (e, t) {
				if (this.$element.attr('class')) {
					this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''))
				}
				;
				var i = e ? e : this.options.style;
				if (t == 'add') {
					this.$button.addClass(i)
				} else if (t == 'remove') {
					this.$button.removeClass(i)
				} else {
					this.$button.removeClass(this.options.style);
					this.$button.addClass(i)
				}
			},
			liHeight: function (t) {
				if (!t && (this.options.size === !1 || this.sizeInfo)) return;
				var a = document.createElement('div'),
					n = document.createElement('div'),
					l = document.createElement('ul'),
					c = document.createElement('li'),
					v = document.createElement('li'),
					p = document.createElement('a'),
					u = document.createElement('span'),
					r = this.options.header && this.$menu.find('.popover-title').length > 0 ? this.$menu.find('.popover-title')[0].cloneNode(!0) : null,
					o = this.options.liveSearch ? document.createElement('div') : null,
					d = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(!0) : null,
					h = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(!0) : null;
				u.className = 'text';
				a.className = this.$menu[0].parentNode.className + ' open';
				n.className = 'dropdown-menu open';
				l.className = 'dropdown-menu inner';
				c.className = 'divider';
				u.appendChild(document.createTextNode('Inner text'));
				p.appendChild(u);
				v.appendChild(p);
				l.appendChild(v);
				l.appendChild(c);
				if (r) n.appendChild(r);
				if (o) {
					var m = document.createElement('span');
					o.className = 'bs-searchbox';
					m.className = 'form-control';
					o.appendChild(m);
					n.appendChild(o)
				}
				;
				if (d) n.appendChild(d);
				n.appendChild(l);
				if (h) n.appendChild(h);
				a.appendChild(n);
				document.body.appendChild(a);
				var b = p.offsetHeight,
					g = r ? r.offsetHeight : 0,
					x = o ? o.offsetHeight : 0,
					y = d ? d.offsetHeight : 0,
					w = h ? h.offsetHeight : 0,
					C = e(c).outerHeight(!0),
					i = typeof getComputedStyle === 'function' ? getComputedStyle(n) : !1,
					s = i ? null : e(n),
					f = parseInt(i ? i.paddingTop : s.css('paddingTop')) + parseInt(i ? i.paddingBottom : s.css('paddingBottom')) + parseInt(i ? i.borderTopWidth : s.css('borderTopWidth')) + parseInt(i ? i.borderBottomWidth : s.css('borderBottomWidth')),
					S = f + parseInt(i ? i.marginTop : s.css('marginTop')) + parseInt(i ? i.marginBottom : s.css('marginBottom')) + 2;
				document.body.removeChild(a);
				this.sizeInfo = {
					liHeight: b,
					headerHeight: g,
					searchHeight: x,
					actionsHeight: y,
					doneButtonHeight: w,
					dividerHeight: C,
					menuPadding: f,
					menuExtras: S
				}
			},
			setSize: function () {
				this.findLis();
				this.liHeight();
				if (this.options.header) this.$menu.css('padding-top', 0);
				if (this.options.size === !1) return;
				var i = this,
					t = this.$menu,
					m = this.$menuInner,
					h = e(window),
					w = this.$newElement[0].offsetHeight,
					v = this.sizeInfo['liHeight'],
					c = this.sizeInfo['headerHeight'],
					p = this.sizeInfo['searchHeight'],
					u = this.sizeInfo['actionsHeight'],
					f = this.sizeInfo['doneButtonHeight'],
					C = this.sizeInfo['dividerHeight'],
					l = this.sizeInfo['menuPadding'],
					o = this.sizeInfo['menuExtras'],
					b = this.options.hideDisabled ? '.disabled' : '',
					n, s, a, r, g = function () {
						a = i.$newElement.offset().top - h.scrollTop();
						r = h.height() - a - w
					};
				g();
				if (this.options.size === 'auto') {
					var d = function () {
						var d, b = function (t, i) {
								return function (n) {
									if (i) {
										return (n.classList ? n.classList.contains(t) : e(n).hasClass(t))
									} else {
										return !(n.classList ? n.classList.contains(t) : e(n).hasClass(t))
									}
								}
							},
							x = i.$menuInner[0].getElementsByTagName('li'),
							h = Array.prototype.filter ? Array.prototype.filter.call(x, b('hidden', !1)) : i.$lis.not('.hidden'),
							y = Array.prototype.filter ? Array.prototype.filter.call(h, b('dropdown-header', !0)) : h.filter('.dropdown-header');
						g();
						n = r - o;
						if (i.options.container) {
							if (!t.data('height')) t.data('height', t.height());
							s = t.data('height')
						} else {
							s = t.height()
						}
						;
						if (i.options.dropupAuto) {
							i.$newElement.toggleClass('dropup', a > r && (n - o) < s)
						}
						;
						if (i.$newElement.hasClass('dropup')) {
							n = a - o
						}
						;
						if ((h.length + y.length) > 3) {
							d = v * 3 + o - 2
						} else {
							d = 0
						}
						;
						t.css({
							'max-height': n + 'px',
							'overflow': 'hidden',
							'min-height': d + c + p + u + f + 'px'
						});
						m.css({
							'max-height': n - c - p - u - f - l + 'px',
							'overflow-y': 'auto',
							'min-height': Math.max(d - l, 0) + 'px'
						})
					};
					d();
					this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', d);
					h.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', d)
				} else if (this.options.size && this.options.size != 'auto' && this.$lis.not(b).length > this.options.size) {
					var x = this.$lis.not('.divider').not(b).children().slice(0, this.options.size).last().parent().index(),
						y = this.$lis.slice(0, x + 1).filter('.divider').length;
					n = v * this.options.size + y * C + l;
					if (i.options.container) {
						if (!t.data('height')) t.data('height', t.height());
						s = t.data('height')
					} else {
						s = t.height()
					}
					;
					if (i.options.dropupAuto) {
						this.$newElement.toggleClass('dropup', a > r && (n - o) < s)
					}
					;
					t.css({
						'max-height': n + c + p + u + f + 'px',
						'overflow': 'hidden',
						'min-height': ''
					});
					m.css({
						'max-height': n - l + 'px',
						'overflow-y': 'auto',
						'min-height': ''
					})
				}
			},
			setWidth: function () {
				if (this.options.width === 'auto') {
					this.$menu.css('min-width', '0');
					var e = this.$menu.parent().clone().appendTo('body'),
						t = this.options.container ? this.$newElement.clone().appendTo('body') : e,
						i = e.children('.dropdown-menu').outerWidth(),
						n = t.css('width', 'auto').children('button').outerWidth();
					e.remove();
					t.remove();
					this.$newElement.css('width', Math.max(i, n) + 'px')
				} else if (this.options.width === 'fit') {
					this.$menu.css('min-width', '');
					this.$newElement.css('width', '').addClass('fit-width')
				} else if (this.options.width) {
					this.$menu.css('min-width', '');
					this.$newElement.css('width', this.options.width)
				} else {
					this.$menu.css('min-width', '');
					this.$newElement.css('width', '')
				}
				;
				if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
					this.$newElement.removeClass('fit-width')
				}
			},
			selectPosition: function () {
				this.$bsContainer = e('<div class="bs-container" />');
				var t = this,
					i, n, s = function (e) {
						t.$bsContainer.addClass(e.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', e.hasClass('dropup'));
						i = e.offset();
						n = e.hasClass('dropup') ? 0 : e[0].offsetHeight;
						t.$bsContainer.css({
							'top': i.top + n,
							'left': i.left,
							'width': e[0].offsetWidth
						})
					};
				this.$button.on('click', function () {
					var i = e(this);
					if (t.isDisabled()) {
						return
					}
					;
					s(t.$newElement);
					t.$bsContainer.appendTo(t.options.container).toggleClass('open', !i.hasClass('open')).append(t.$menu)
				});
				e(window).on('resize scroll', function () {
					s(t.$newElement)
				});
				this.$element.on('hide.bs.select', function () {
					t.$menu.data('height', t.$menu.height());
					t.$bsContainer.detach()
				})
			},
			setSelected: function (e, t, i) {
				if (!i) {
					i = this.findLis().eq(this.liObj[e])
				}
				;
				i.toggleClass('selected', t)
			},
			setDisabled: function (e, t, i) {
				if (!i) {
					i = this.findLis().eq(this.liObj[e])
				}
				;
				if (t) {
					i.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1)
				} else {
					i.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0)
				}
			},
			isDisabled: function () {
				return this.$element[0].disabled
			},
			checkDisabled: function () {
				var e = this;
				if (this.isDisabled()) {
					this.$newElement.addClass('disabled');
					this.$button.addClass('disabled').attr('tabindex', -1)
				} else {
					if (this.$button.hasClass('disabled')) {
						this.$newElement.removeClass('disabled');
						this.$button.removeClass('disabled')
					}
					;
					if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
						this.$button.removeAttr('tabindex')
					}
				}
				;
				this.$button.click(function () {
					return !e.isDisabled()
				})
			},
			tabIndex: function () {
				if (this.$element.data('tabindex') !== this.$element.attr('tabindex') && (this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98')) {
					this.$element.data('tabindex', this.$element.attr('tabindex'));
					this.$button.attr('tabindex', this.$element.data('tabindex'))
				}
				;
				this.$element.attr('tabindex', -98)
			},
			clickListener: function () {
				var t = this,
					i = e(document);
				this.$newElement.on('touchstart.dropdown', '.dropdown-menu', function (e) {
					e.stopPropagation()
				});
				i.data('spaceSelect', !1);
				this.$button.on('keyup', function (e) {
					if (/(32)/.test(e.keyCode.toString(10)) && i.data('spaceSelect')) {
						e.preventDefault();
						i.data('spaceSelect', !1)
					}
				});
				this.$button.on('click', function () {
					t.setSize();
					t.$element.on('shown.bs.select', function () {
						if (!t.options.liveSearch && !t.multiple) {
							t.$menuInner.find('.selected a').focus()
						} else if (!t.multiple) {
							var i = t.liObj[t.$element[0].selectedIndex];
							if (typeof i !== 'number' || t.options.size === !1) return;
							var e = t.$lis.eq(i)[0].offsetTop - t.$menuInner[0].offsetTop;
							e = e - t.$menuInner[0].offsetHeight / 2 + t.sizeInfo.liHeight / 2;
							t.$menuInner[0].scrollTop = e
						}
					})
				});
				this.$menuInner.on('click', 'li a', function (i) {
					var h = e(this),
						a = h.parent().data('originalIndex'),
						g = t.$element.val(),
						x = t.$element.prop('selectedIndex');
					if (t.multiple) {
						i.stopPropagation()
					}
					;
					i.preventDefault();
					if (!t.isDisabled() && !h.parent().hasClass('disabled')) {
						var d = t.$element.find('option'),
							o = d.eq(a),
							u = o.prop('selected'),
							f = o.parent('optgroup'),
							n = t.options.maxOptions,
							s = f.data('maxOptions') || !1;
						if (!t.multiple) {
							d.prop('selected', !1);
							o.prop('selected', !0);
							t.$menuInner.find('.selected').removeClass('selected');
							t.setSelected(a, !0)
						} else {
							o.prop('selected', !u);
							t.setSelected(a, !u);
							h.blur();
							if (n !== !1 || s !== !1) {
								var m = n < d.filter(':selected').length,
									v = s < f.find('option:selected').length;
								if ((n && m) || (s && v)) {
									if (n && n == 1) {
										d.prop('selected', !1);
										o.prop('selected', !0);
										t.$menuInner.find('.selected').removeClass('selected');
										t.setSelected(a, !0)
									} else if (s && s == 1) {
										f.find('option:selected').prop('selected', !1);
										o.prop('selected', !0);
										var b = h.parent().data('optgroup');
										t.$menuInner.find('[data-optgroup="' + b + '"]').removeClass('selected');
										t.setSelected(a, !0)
									} else {
										var l = (typeof t.options.maxOptionsText === 'function') ? t.options.maxOptionsText(n, s) : t.options.maxOptionsText,
											c = l[0].replace('{n}', n),
											p = l[1].replace('{n}', s),
											r = e('<div class="notify"></div>');
										if (l[2]) {
											c = c.replace('{var}', l[2][n > 1 ? 0 : 1]);
											p = p.replace('{var}', l[2][s > 1 ? 0 : 1])
										}
										;
										o.prop('selected', !1);
										t.$menu.append(r);
										if (n && m) {
											r.append(e('<div>' + c + '</div>'));
											t.$element.trigger('maxReached.bs.select')
										}
										;
										if (s && v) {
											r.append(e('<div>' + p + '</div>'));
											t.$element.trigger('maxReachedGrp.bs.select')
										}
										;
										setTimeout(function () {
											t.setSelected(a, !1)
										}, 10);
										r.delay(750).fadeOut(300, function () {
											e(this).remove()
										})
									}
								}
							}
						}
						;
						if (!t.multiple) {
							t.$button.focus()
						} else if (t.options.liveSearch) {
							t.$searchbox.focus()
						}
						;
						if ((g != t.$element.val() && t.multiple) || (x != t.$element.prop('selectedIndex') && !t.multiple)) {
							t.$element.triggerNative('change');
							t.$element.trigger('changed.bs.select', [a, o.prop('selected'), u])
						}
					}
				});
				this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (i) {
					if (i.currentTarget == this) {
						i.preventDefault();
						i.stopPropagation();
						if (t.options.liveSearch && !e(i.target).hasClass('close')) {
							t.$searchbox.focus()
						} else {
							t.$button.focus()
						}
					}
				});
				this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
					e.preventDefault();
					e.stopPropagation();
					if (t.options.liveSearch) {
						t.$searchbox.focus()
					} else {
						t.$button.focus()
					}
				});
				this.$menu.on('click', '.popover-title .close', function () {
					t.$button.click()
				});
				this.$searchbox.on('click', function (e) {
					e.stopPropagation()
				});
				this.$menu.on('click', '.actions-btn', function (i) {
					if (t.options.liveSearch) {
						t.$searchbox.focus()
					} else {
						t.$button.focus()
					}
					;
					i.preventDefault();
					i.stopPropagation();
					if (e(this).hasClass('bs-select-all')) {
						t.selectAll()
					} else {
						t.deselectAll()
					}
					;
					t.$element.triggerNative('change')
				});
				this.$element.change(function () {
					t.render(!1)
				})
			},
			liveSearchListener: function () {
				var t = this,
					s = e('<li class="no-results"></li>');
				this.$button.on('click.dropdown.data-api touchstart.dropdown.data-api', function () {
					t.$menuInner.find('.active').removeClass('active');
					if (!!t.$searchbox.val()) {
						t.$searchbox.val('');
						t.$lis.not('.is-hidden').removeClass('hidden');
						if (!!s.parent().length) s.remove()
					}
					;
					if (!t.multiple) t.$menuInner.find('.selected').addClass('active');
					setTimeout(function () {
						t.$searchbox.focus()
					}, 10)
				});
				this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
					e.stopPropagation()
				});
				this.$searchbox.on('input propertychange', function () {
					if (t.$searchbox.val()) {
						var o = t.$lis.not('.is-hidden').removeClass('hidden').children('a');
						if (t.options.liveSearchNormalize) {
							o = o.not(':a' + t._searchStyle() + '("' + i(t.$searchbox.val()) + '")')
						} else {
							o = o.not(':' + t._searchStyle() + '("' + t.$searchbox.val() + '")')
						}
						;
						o.parent().addClass('hidden');
						t.$lis.filter('.dropdown-header').each(function () {
							var i = e(this),
								n = i.data('optgroup');
							if (t.$lis.filter('[data-optgroup=' + n + ']').not(i).not('.hidden').length === 0) {
								i.addClass('hidden');
								t.$lis.filter('[data-optgroup=' + n + 'div]').addClass('hidden')
							}
						});
						var a = t.$lis.not('.hidden');
						a.each(function (t) {
							var i = e(this);
							if (i.hasClass('divider') && (i.index() === a.first().index() || i.index() === a.last().index() || a.eq(t + 1).hasClass('divider'))) {
								i.addClass('hidden')
							}
						});
						if (!t.$lis.not('.hidden, .no-results').length) {
							if (!!s.parent().length) {
								s.remove()
							}
							;
							s.html(t.options.noneResultsText.replace('{0}', '"' + n(t.$searchbox.val()) + '"')).show();
							t.$menuInner.append(s)
						} else if (!!s.parent().length) {
							s.remove()
						}
					} else {
						t.$lis.not('.is-hidden').removeClass('hidden');
						if (!!s.parent().length) {
							s.remove()
						}
					}
					;
					t.$lis.filter('.active').removeClass('active');
					if (t.$searchbox.val()) t.$lis.not('.hidden, .divider, .dropdown-header').eq(0).addClass('active').children('a').focus();
					e(this).focus()
				})
			},
			_searchStyle: function () {
				var e = {
					begins: 'ibegins',
					startsWith: 'ibegins'
				};
				return e[this.options.liveSearchStyle] || 'icontains'
			},
			val: function (e) {
				if (typeof e !== 'undefined') {
					this.$element.val(e);
					this.render();
					return this.$element
				} else {
					return this.$element.val()
				}
			},
			changeAll: function (t) {
				if (typeof t === 'undefined') t = !0;
				this.findLis();
				var a = this.$element.find('option'),
					s = this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').toggleClass('selected', t),
					l = s.length,
					n = [];
				for (var i = 0; i < l; i++) {
					var o = s[i].getAttribute('data-original-index');
					n[n.length] = a.eq(o)[0]
				}
				;
				e(n).prop('selected', t);
				this.render(!1)
			},
			selectAll: function () {
				return this.changeAll(!0)
			},
			deselectAll: function () {
				return this.changeAll(!1)
			},
			keydown: function (t) {
				var a = e(this),
					c = a.is('input') ? a.parent().parent() : a.parent(),
					s, n = c.data('this'),
					o, d, p, u, m, v, g, r, h = ':not(.disabled, .hidden, .dropdown-header, .divider)',
					b = {
						32: ' ',
						48: '0',
						49: '1',
						50: '2',
						51: '3',
						52: '4',
						53: '5',
						54: '6',
						55: '7',
						56: '8',
						57: '9',
						59: ';',
						65: 'a',
						66: 'b',
						67: 'c',
						68: 'd',
						69: 'e',
						70: 'f',
						71: 'g',
						72: 'h',
						73: 'i',
						74: 'j',
						75: 'k',
						76: 'l',
						77: 'm',
						78: 'n',
						79: 'o',
						80: 'p',
						81: 'q',
						82: 'r',
						83: 's',
						84: 't',
						85: 'u',
						86: 'v',
						87: 'w',
						88: 'x',
						89: 'y',
						90: 'z',
						96: '0',
						97: '1',
						98: '2',
						99: '3',
						100: '4',
						101: '5',
						102: '6',
						103: '7',
						104: '8',
						105: '9'
					};
				if (n.options.liveSearch) c = a.parent().parent();
				if (n.options.container) c = n.$menu;
				s = e('[role=menu] li', c);
				r = n.$newElement.hasClass('open');
				if (!r && (t.keyCode >= 48 && t.keyCode <= 57 || t.keyCode >= 96 && t.keyCode <= 105 || t.keyCode >= 65 && t.keyCode <= 90)) {
					if (!n.options.container) {
						n.setSize();
						n.$menu.parent().addClass('open');
						r = !0
					} else {
						n.$button.trigger('click')
					}
					;
					n.$searchbox.focus()
				}
				;
				if (n.options.liveSearch) {
					if (/(^9$|27)/.test(t.keyCode.toString(10)) && r && n.$menu.find('.active').length === 0) {
						t.preventDefault();
						n.$menu.parent().removeClass('open');
						if (n.options.container) n.$newElement.removeClass('open');
						n.$button.focus()
					}
					;
					s = e('[role=menu] li' + h, c);
					if (!a.val() && !/(38|40)/.test(t.keyCode.toString(10))) {
						if (s.filter('.active').length === 0) {
							s = n.$menuInner.find('li');
							if (n.options.liveSearchNormalize) {
								s = s.filter(':a' + n._searchStyle() + '(' + i(b[t.keyCode]) + ')')
							} else {
								s = s.filter(':' + n._searchStyle() + '(' + b[t.keyCode] + ')')
							}
						}
					}
				}
				;
				if (!s.length) return;
				if (/(38|40)/.test(t.keyCode.toString(10))) {
					o = s.index(s.find('a').filter(':focus').parent());
					p = s.filter(h).first().index();
					u = s.filter(h).last().index();
					d = s.eq(o).nextAll(h).eq(0).index();
					m = s.eq(o).prevAll(h).eq(0).index();
					v = s.eq(d).prevAll(h).eq(0).index();
					if (n.options.liveSearch) {
						s.each(function (t) {
							if (!e(this).hasClass('disabled')) {
								e(this).data('index', t)
							}
						});
						o = s.index(s.filter('.active'));
						p = s.first().data('index');
						u = s.last().data('index');
						d = s.eq(o).nextAll().eq(0).data('index');
						m = s.eq(o).prevAll().eq(0).data('index');
						v = s.eq(d).prevAll().eq(0).data('index')
					}
					;
					g = a.data('prevIndex');
					if (t.keyCode == 38) {
						if (n.options.liveSearch) o--;
						if (o != v && o > m) o = m;
						if (o < p) o = p;
						if (o == g) o = u
					} else if (t.keyCode == 40) {
						if (n.options.liveSearch) o++;
						if (o == -1) o = 0;
						if (o != v && o < d) o = d;
						if (o > u) o = u;
						if (o == g) o = p
					}
					;
					a.data('prevIndex', o);
					if (!n.options.liveSearch) {
						s.eq(o).children('a').focus()
					} else {
						t.preventDefault();
						if (!a.hasClass('dropdown-toggle')) {
							s.removeClass('active').eq(o).addClass('active').children('a').focus();
							a.focus()
						}
					}
				} else if (!a.is('input')) {
					var f = [],
						l, y;
					s.each(function () {
						if (!e(this).hasClass('disabled')) {
							if (e.trim(e(this).children('a').text().toLowerCase()).substring(0, 1) == b[t.keyCode]) {
								f.push(e(this).index())
							}
						}
					});
					l = e(document).data('keycount');
					l++;
					e(document).data('keycount', l);
					y = e.trim(e(':focus').text().toLowerCase()).substring(0, 1);
					if (y != b[t.keyCode]) {
						l = 1;
						e(document).data('keycount', l)
					} else if (l >= f.length) {
						e(document).data('keycount', 0);
						if (l > f.length) l = 1
					}
					;
					s.eq(f[l - 1]).children('a').focus()
				}
				;
				if ((/(13|32)/.test(t.keyCode.toString(10)) || (/(^9$)/.test(t.keyCode.toString(10)) && n.options.selectOnTab)) && r) {
					if (!/(32)/.test(t.keyCode.toString(10))) t.preventDefault();
					if (!n.options.liveSearch) {
						var x = e(':focus');
						x.click();
						x.focus();
						t.preventDefault();
						e(document).data('spaceSelect', !0)
					} else if (!/(32)/.test(t.keyCode.toString(10))) {
						n.$menuInner.find('.active a').click();
						a.focus()
					}
					;
					e(document).data('keycount', 0)
				}
				;
				if ((/(^9$|27)/.test(t.keyCode.toString(10)) && r && (n.multiple || n.options.liveSearch)) || (/(27)/.test(t.keyCode.toString(10)) && !r)) {
					n.$menu.parent().removeClass('open');
					if (n.options.container) n.$newElement.removeClass('open');
					n.$button.focus()
				}
			},
			mobile: function () {
				this.$element.addClass('mobile-device')
			},
			refresh: function () {
				this.$lis = null;
				this.liObj = {};
				this.reloadLi();
				this.render();
				this.checkDisabled();
				this.liHeight(!0);
				this.setStyle();
				this.setWidth();
				if (this.$lis) this.$searchbox.trigger('propertychange');
				this.$element.trigger('refreshed.bs.select')
			},
			hide: function () {
				this.$newElement.hide()
			},
			show: function () {
				this.$newElement.show()
			},
			remove: function () {
				this.$newElement.remove();
				this.$element.remove()
			},
			destroy: function () {
				this.$newElement.before(this.$element).remove();
				if (this.$bsContainer) {
					this.$bsContainer.remove()
				} else {
					this.$menu.remove()
				}
				;
				this.$element.off('.bs.select').removeData('selectpicker').removeClass('bs-select-hidden selectpicker')
			}
		};

		function s(i, n) {
			var a = arguments,
				s = i,
				r = n;
			[].shift.apply(a);
			var o, l = this.each(function () {
				var l = e(this);
				if (l.is('select')) {
					var i = l.data('selectpicker'),
						n = typeof s == 'object' && s;
					if (!i) {
						var h = e.extend({}, t.DEFAULTS, e.fn.selectpicker.defaults || {}, l.data(), n);
						h.template = e.extend({}, t.DEFAULTS.template, (e.fn.selectpicker.defaults ? e.fn.selectpicker.defaults.template : {}), l.data().template, n.template);
						l.data('selectpicker', (i = new t(this, h, r)))
					} else if (n) {
						for (var d in n) {
							if (n.hasOwnProperty(d)) {
								i.options[d] = n[d]
							}
						}
					}
					;
					if (typeof s == 'string') {
						if (i[s] instanceof Function) {
							o = i[s].apply(i, a)
						} else {
							o = i.options[s]
						}
					}
				}
			});
			if (typeof o !== 'undefined') {
				return o
			} else {
				return l
			}
		};
		var o = e.fn.selectpicker;
		e.fn.selectpicker = s;
		e.fn.selectpicker.Constructor = t;
		e.fn.selectpicker.noConflict = function () {
			e.fn.selectpicker = o;
			return this
		};
		e(document).data('keycount', 0).on('keydown.bs.select', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', t.prototype.keydown).on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function (e) {
			e.stopPropagation()
		});
		e(window).on('load.bs.select.data-api', function () {
			e('.selectpicker').each(function () {
				var t = e(this);
				s.call(t, t.data())
			})
		})
	})(e)
}));
/*! =======================================================
 VERSION  7.0.3
 ========================================================= */
"use strict";

function _typeof(t) {
	return t && typeof Symbol !== "undefined" && t.constructor === Symbol ? "symbol" : typeof t
};
/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *      Kyle Kemp
 *          - Twitter: @seiyria
 *          - Github:  seiyria
 *      Rohit Kalkur
 *          - Twitter: @Rovolutionary
 *          - Github:  rovolution
 *
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
(function (t) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], t)
	} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
		var i;
		try {
			i = require("jquery")
		} catch (e) {
			i = null
		}
		;
		module.exports = t(i)
	} else if (window) {
		window.Slider = t(window.jQuery)
	}
})(function (t) {
	var i;
	(function (t) {
		"use strict";
		var i = Array.prototype.slice;

		function e() {
		};

		function s(t) {
			if (!t) {
				return
			}
			;

			function o(i) {
				if (i.prototype.option) {
					return
				}
				;
				i.prototype.option = function (i) {
					if (!t.isPlainObject(i)) {
						return
					}
					;
					this.options = t.extend(!0, this.options, i)
				}
			};
			var s = typeof console === "undefined" ? e : function (t) {
				console.error(t)
			};

			function n(e, o) {
				t.fn[e] = function (n) {
					if (typeof n === "string") {
						var u = i.call(arguments, 1);
						for (var r = 0, d = this.length; r < d; r++) {
							var p = this[r],
								a = t.data(p, e);
							if (!a) {
								s("cannot call methods on " + e + " prior to initialization; attempted to call '" + n + "'");
								continue
							}
							;
							if (!t.isFunction(a[n]) || n.charAt(0) === "_") {
								s("no such method '" + n + "' for " + e + " instance");
								continue
							}
							;
							var l = a[n].apply(a, u);
							if (l !== undefined && l !== a) {
								return l
							}
						}
						;
						return this
					} else {
						var h = this.map(function () {
							var i = t.data(this, e);
							if (i) {
								i.option(n);
								i._init()
							} else {
								i = new o(this, n);
								t.data(this, e, i)
							}
							;
							return t(this)
						});
						if (!h || h.length > 1) {
							return h
						} else {
							return h[0]
						}
					}
				}
			};
			t.bridget = function (t, i) {
				o(i);
				n(t, i)
			};
			return t.bridget
		};
		s(t)
	})(t);
	(function (t) {
		var o = {
			formatInvalidInputErrorMsg: function (t) {
				return "Invalid input value '" + t + "' passed in"
			},
			callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
		};
		var s = {
			linear: {
				toValue: function (t) {
					var h = t / 100 * (this.options.max - this.options.min),
						l = !0;
					if (this.options.ticks_positions.length > 0) {
						var s, n, o, a = 0;
						for (var i = 1; i < this.options.ticks_positions.length; i++) {
							if (t <= this.options.ticks_positions[i]) {
								s = this.options.ticks[i - 1];
								o = this.options.ticks_positions[i - 1];
								n = this.options.ticks[i];
								a = this.options.ticks_positions[i];
								break
							}
						}
						;
						var p = (t - o) / (a - o);
						h = s + p * (n - s);
						l = !1
					}
					;
					var r = l ? this.options.min : 0,
						e = r + Math.round(h / this.options.step) * this.options.step;
					if (e < this.options.min) {
						return this.options.min
					} else if (e > this.options.max) {
						return this.options.max
					} else {
						return e
					}
				},
				toPercentage: function (t) {
					if (this.options.max === this.options.min) {
						return 0
					}
					;
					if (this.options.ticks_positions.length > 0) {
						var e, o, s, n = 0;
						for (var i = 0; i < this.options.ticks.length; i++) {
							if (t <= this.options.ticks[i]) {
								e = i > 0 ? this.options.ticks[i - 1] : 0;
								s = i > 0 ? this.options.ticks_positions[i - 1] : 0;
								o = this.options.ticks[i];
								n = this.options.ticks_positions[i];
								break
							}
						}
						;
						if (i > 0) {
							var a = (t - e) / (o - e);
							return s + a * (n - s)
						}
					}
					;
					return 100 * (t - this.options.min) / (this.options.max - this.options.min)
				}
			},
			logarithmic: {
				toValue: function (t) {
					var e = this.options.min === 0 ? 0 : Math.log(this.options.min),
						s = Math.log(this.options.max),
						i = Math.exp(e + (s - e) * t / 100);
					i = this.options.min + Math.round((i - this.options.min) / this.options.step) * this.options.step;
					if (i < this.options.min) {
						return this.options.min
					} else if (i > this.options.max) {
						return this.options.max
					} else {
						return i
					}
				},
				toPercentage: function (t) {
					if (this.options.max === this.options.min) {
						return 0
					} else {
						var e = Math.log(this.options.max),
							i = this.options.min === 0 ? 0 : Math.log(this.options.min),
							s = t === 0 ? 0 : Math.log(t);
						return 100 * (s - i) / (e - i)
					}
				}
			}
		};
		i = function (t, i) {
			n.call(this, t, i);
			return this
		};

		function n(i, e) {
			this._state = {
				value: null,
				enabled: null,
				offset: null,
				size: null,
				percentage: null,
				inDrag: !1,
				over: !1
			};
			if (typeof i === "string") {
				this.element = document.querySelector(i)
			} else if (i instanceof HTMLElement) {
				this.element = i
			}
			;
			e = e ? e : {};
			var E = Object.keys(this.defaultOptions);
			for (var o = 0; o < E.length; o++) {
				var v = E[o],
					l = e[v];
				l = typeof l !== "undefined" ? l : A(this.element, v);
				l = l !== null ? l : this.defaultOptions[v];
				if (!this.options) {
					this.options = {}
				}
				;
				this.options[v] = l
			}
			;
			if (this.options.orientation === "vertical" && (this.options.tooltip_position === "top" || this.options.tooltip_position === "bottom")) {
				this.options.tooltip_position = "right"
			} else if (this.options.orientation === "horizontal" && (this.options.tooltip_position === "left" || this.options.tooltip_position === "right")) {
				this.options.tooltip_position = "top"
			}
			;

			function A(t, i) {
				var s = "data-slider-" + i.replace(/_/g, "-"),
					e = t.getAttribute(s);
				try {
					return JSON.parse(e)
				} catch (o) {
					return e
				}
			};
			var T = this.element.style.width,
				k = !1,
				P = this.element.parentNode,
				r, m, f, n, a;
			if (this.sliderElem) {
				k = !0
			} else {
				this.sliderElem = document.createElement("div");
				this.sliderElem.className = "slider";
				var h = document.createElement("div");
				h.className = "slider-track";
				m = document.createElement("div");
				m.className = "slider-track-low";
				r = document.createElement("div");
				r.className = "slider-selection";
				f = document.createElement("div");
				f.className = "slider-track-high";
				n = document.createElement("div");
				n.className = "slider-handle min-slider-handle";
				n.setAttribute("role", "slider");
				n.setAttribute("aria-valuemin", this.options.min);
				n.setAttribute("aria-valuemax", this.options.max);
				a = document.createElement("div");
				a.className = "slider-handle max-slider-handle";
				a.setAttribute("role", "slider");
				a.setAttribute("aria-valuemin", this.options.min);
				a.setAttribute("aria-valuemax", this.options.max);
				h.appendChild(m);
				h.appendChild(r);
				h.appendChild(f);
				var b = Array.isArray(this.options.labelledby);
				if (b && this.options.labelledby[0]) {
					n.setAttribute("aria-labelledby", this.options.labelledby[0])
				}
				;
				if (b && this.options.labelledby[1]) {
					a.setAttribute("aria-labelledby", this.options.labelledby[1])
				}
				;
				if (!b && this.options.labelledby) {
					n.setAttribute("aria-labelledby", this.options.labelledby);
					a.setAttribute("aria-labelledby", this.options.labelledby)
				}
				;
				this.ticks = [];
				if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
					for (o = 0; o < this.options.ticks.length; o++) {
						var y = document.createElement("div");
						y.className = "slider-tick";
						this.ticks.push(y);
						h.appendChild(y)
					}
					;
					r.className += " tick-slider-selection"
				}
				;
				h.appendChild(n);
				h.appendChild(a);
				this.tickLabels = [];
				if (Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) {
					this.tickLabelContainer = document.createElement("div");
					this.tickLabelContainer.className = "slider-tick-label-container";
					for (o = 0; o < this.options.ticks_labels.length; o++) {
						var c = document.createElement("div"),
							w = this.options.ticks_positions.length === 0,
							L = this.options.reversed && w ? this.options.ticks_labels.length - (o + 1) : o;
						c.className = "slider-tick-label";
						c.innerHTML = this.options.ticks_labels[L];
						this.tickLabels.push(c);
						this.tickLabelContainer.appendChild(c)
					}
				}
				;
				var g = function (t) {
						var e = document.createElement("div");
						e.className = "tooltip-arrow";
						var i = document.createElement("div");
						i.className = "tooltip-inner";
						t.appendChild(e);
						t.appendChild(i)
					},
					u = document.createElement("div");
				u.className = "tooltip tooltip-main";
				u.setAttribute("role", "presentation");
				g(u);
				var d = document.createElement("div");
				d.className = "tooltip tooltip-min";
				d.setAttribute("role", "presentation");
				g(d);
				var p = document.createElement("div");
				p.className = "tooltip tooltip-max";
				p.setAttribute("role", "presentation");
				g(p);
				this.sliderElem.appendChild(h);
				this.sliderElem.appendChild(u);
				this.sliderElem.appendChild(d);
				this.sliderElem.appendChild(p);
				if (this.tickLabelContainer) {
					this.sliderElem.appendChild(this.tickLabelContainer)
				}
				;
				P.insertBefore(this.sliderElem, this.element);
				this.element.style.display = "none"
			}
			;
			if (t) {
				this.$element = t(this.element);
				this.$sliderElem = t(this.sliderElem)
			}
			;
			this.eventToCallbackMap = {};
			this.sliderElem.id = this.options.id;
			this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch;
			this.touchX = 0;
			this.touchY = 0;
			this.tooltip = this.sliderElem.querySelector(".tooltip-main");
			this.tooltipInner = this.tooltip.querySelector(".tooltip-inner");
			this.tooltip_min = this.sliderElem.querySelector(".tooltip-min");
			this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner");
			this.tooltip_max = this.sliderElem.querySelector(".tooltip-max");
			this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner");
			if (s[this.options.scale]) {
				this.options.scale = s[this.options.scale]
			}
			;
			if (k === !0) {
				this._removeClass(this.sliderElem, "slider-horizontal");
				this._removeClass(this.sliderElem, "slider-vertical");
				this._removeClass(this.tooltip, "hide");
				this._removeClass(this.tooltip_min, "hide");
				this._removeClass(this.tooltip_max, "hide");
				["left", "top", "width", "height"].forEach(function (t) {
					this._removeProperty(this.trackLow, t);
					this._removeProperty(this.trackSelection, t);
					this._removeProperty(this.trackHigh, t)
				}, this);
				[this.handle1, this.handle2].forEach(function (t) {
					this._removeProperty(t, "left");
					this._removeProperty(t, "top")
				}, this);
				[this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (t) {
					this._removeProperty(t, "left");
					this._removeProperty(t, "top");
					this._removeProperty(t, "margin-left");
					this._removeProperty(t, "margin-top");
					this._removeClass(t, "right");
					this._removeClass(t, "top")
				}, this)
			}
			;
			if (this.options.orientation === "vertical") {
				this._addClass(this.sliderElem, "slider-vertical");
				this.stylePos = "top";
				this.mousePos = "pageY";
				this.sizePos = "offsetHeight"
			} else {
				this._addClass(this.sliderElem, "slider-horizontal");
				this.sliderElem.style.width = T;
				this.options.orientation = "horizontal";
				this.stylePos = "left";
				this.mousePos = "pageX";
				this.sizePos = "offsetWidth"
			}
			;
			this._setTooltipPosition();
			if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
				this.options.max = Math.max.apply(Math, this.options.ticks);
				this.options.min = Math.min.apply(Math, this.options.ticks)
			}
			;
			if (Array.isArray(this.options.value)) {
				this.options.range = !0;
				this._state.value = this.options.value
			} else if (this.options.range) {
				this._state.value = [this.options.value, this.options.max]
			} else {
				this._state.value = this.options.value
			}
			;
			this.trackLow = m || this.trackLow;
			this.trackSelection = r || this.trackSelection;
			this.trackHigh = f || this.trackHigh;
			if (this.options.selection === "none") {
				this._addClass(this.trackLow, "hide");
				this._addClass(this.trackSelection, "hide");
				this._addClass(this.trackHigh, "hide")
			}
			;
			this.handle1 = n || this.handle1;
			this.handle2 = a || this.handle2;
			if (k === !0) {
				this._removeClass(this.handle1, "round triangle");
				this._removeClass(this.handle2, "round triangle hide");
				for (o = 0; o < this.ticks.length; o++) {
					this._removeClass(this.ticks[o], "round triangle hide")
				}
			}
			;
			var x = ["round", "triangle", "custom"],
				C = x.indexOf(this.options.handle) !== -1;
			if (C) {
				this._addClass(this.handle1, this.options.handle);
				this._addClass(this.handle2, this.options.handle);
				for (o = 0; o < this.ticks.length; o++) {
					this._addClass(this.ticks[o], this.options.handle)
				}
			}
			;
			this._state.offset = this._offset(this.sliderElem);
			this._state.size = this.sliderElem[this.sizePos];
			this.setValue(this._state.value);
			this.handle1Keydown = this._keydown.bind(this, 0);
			this.handle1.addEventListener("keydown", this.handle1Keydown, !1);
			this.handle2Keydown = this._keydown.bind(this, 1);
			this.handle2.addEventListener("keydown", this.handle2Keydown, !1);
			this.mousedown = this._mousedown.bind(this);
			this.touchstart = this._touchstart.bind(this);
			this.touchmove = this._touchmove.bind(this);
			if (this.touchCapable) {
				this.sliderElem.addEventListener("touchstart", this.touchstart, !1);
				this.sliderElem.addEventListener("touchmove", this.touchmove, !1)
			}
			;
			this.sliderElem.addEventListener("mousedown", this.mousedown, !1);
			this.resize = this._resize.bind(this);
			window.addEventListener("resize", this.resize, !1);
			if (this.options.tooltip === "hide") {
				this._addClass(this.tooltip, "hide");
				this._addClass(this.tooltip_min, "hide");
				this._addClass(this.tooltip_max, "hide")
			} else if (this.options.tooltip === "always") {
				this._showTooltip();
				this._alwaysShowTooltip = !0
			} else {
				this.showTooltip = this._showTooltip.bind(this);
				this.hideTooltip = this._hideTooltip.bind(this);
				this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1);
				this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1);
				this.handle1.addEventListener("focus", this.showTooltip, !1);
				this.handle1.addEventListener("blur", this.hideTooltip, !1);
				this.handle2.addEventListener("focus", this.showTooltip, !1);
				this.handle2.addEventListener("blur", this.hideTooltip, !1)
			}
			;
			if (this.options.enabled) {
				this.enable()
			} else {
				this.disable()
			}
		};
		i.prototype = {
			_init: function () {
			},
			constructor: i,
			defaultOptions: {
				id: "",
				min: 0,
				max: 10,
				step: 1,
				precision: 0,
				orientation: "horizontal",
				value: 5,
				range: !1,
				selection: "before",
				tooltip: "show",
				tooltip_split: !1,
				handle: "round",
				reversed: !1,
				enabled: !0,
				formatter: function (t) {
					if (Array.isArray(t)) {
						return t[0] + " : " + t[1]
					} else {
						return t
					}
				},
				natural_arrow_keys: !1,
				ticks: [],
				ticks_positions: [],
				ticks_labels: [],
				ticks_snap_bounds: 0,
				scale: "linear",
				focus: !1,
				tooltip_position: null,
				labelledby: null
			},
			getElement: function () {
				return this.sliderElem
			},
			getValue: function () {
				if (this.options.range) {
					return this._state.value
				} else {
					return this._state.value[0]
				}
			},
			setValue: function (t, i, o) {
				if (!t) {
					t = 0
				}
				;
				var n = this.getValue();
				this._state.value = this._validateInputValue(t);
				var s = this._applyPrecision.bind(this);
				if (this.options.range) {
					this._state.value[0] = s(this._state.value[0]);
					this._state.value[1] = s(this._state.value[1]);
					this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0]));
					this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]))
				} else {
					this._state.value = s(this._state.value);
					this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))];
					this._addClass(this.handle2, "hide");
					if (this.options.selection === "after") {
						this._state.value[1] = this.options.max
					} else {
						this._state.value[1] = this.options.min
					}
				}
				;
				if (this.options.max > this.options.min) {
					this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), this.options.step * 100 / (this.options.max - this.options.min)]
				} else {
					this._state.percentage = [0, 0, 100]
				}
				;
				this._layout();
				var e = this.options.range ? this._state.value : this._state.value[0];
				this._setDataVal(e);
				if (i === !0) {
					this._trigger("slide", e)
				}
				;
				if (n !== e && o === !0) {
					this._trigger("change", {
						oldValue: n,
						newValue: e
					})
				}
				;
				return this
			},
			destroy: function () {
				this._removeSliderEventHandlers();
				this.sliderElem.parentNode.removeChild(this.sliderElem);
				this.element.style.display = "";
				this._cleanUpEventCallbacksMap();
				this.element.removeAttribute("data");
				if (t) {
					this._unbindJQueryEventHandlers();
					this.$element.removeData("slider")
				}
			},
			disable: function () {
				this._state.enabled = !1;
				this.handle1.removeAttribute("tabindex");
				this.handle2.removeAttribute("tabindex");
				this._addClass(this.sliderElem, "slider-disabled");
				this._trigger("slideDisabled");
				return this
			},
			enable: function () {
				this._state.enabled = !0;
				this.handle1.setAttribute("tabindex", 0);
				this.handle2.setAttribute("tabindex", 0);
				this._removeClass(this.sliderElem, "slider-disabled");
				this._trigger("slideEnabled");
				return this
			},
			toggle: function () {
				if (this._state.enabled) {
					this.disable()
				} else {
					this.enable()
				}
				;
				return this
			},
			isEnabled: function () {
				return this._state.enabled
			},
			on: function (t, i) {
				this._bindNonQueryEventHandler(t, i);
				return this
			},
			off: function (i, e) {
				if (t) {
					this.$element.off(i, e);
					this.$sliderElem.off(i, e)
				} else {
					this._unbindNonQueryEventHandler(i, e)
				}
			},
			getAttribute: function (t) {
				if (t) {
					return this.options[t]
				} else {
					return this.options
				}
			},
			setAttribute: function (t, i) {
				this.options[t] = i;
				return this
			},
			refresh: function () {
				this._removeSliderEventHandlers();
				n.call(this, this.element, this.options);
				if (t) {
					t.data(this.element, "slider", this)
				}
				;
				return this
			},
			relayout: function () {
				this._resize();
				this._layout();
				return this
			},
			_removeSliderEventHandlers: function () {
				this.handle1.removeEventListener("keydown", this.handle1Keydown, !1);
				this.handle2.removeEventListener("keydown", this.handle2Keydown, !1);
				if (this.showTooltip) {
					this.handle1.removeEventListener("focus", this.showTooltip, !1);
					this.handle2.removeEventListener("focus", this.showTooltip, !1)
				}
				;
				if (this.hideTooltip) {
					this.handle1.removeEventListener("blur", this.hideTooltip, !1);
					this.handle2.removeEventListener("blur", this.hideTooltip, !1)
				}
				;
				if (this.showTooltip) {
					this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1)
				}
				;
				if (this.hideTooltip) {
					this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1)
				}
				;
				this.sliderElem.removeEventListener("touchstart", this.touchstart, !1);
				this.sliderElem.removeEventListener("touchmove", this.touchmove, !1);
				this.sliderElem.removeEventListener("mousedown", this.mousedown, !1);
				window.removeEventListener("resize", this.resize, !1)
			},
			_bindNonQueryEventHandler: function (t, i) {
				if (this.eventToCallbackMap[t] === undefined) {
					this.eventToCallbackMap[t] = []
				}
				;
				this.eventToCallbackMap[t].push(i)
			},
			_unbindNonQueryEventHandler: function (t, i) {
				var s = this.eventToCallbackMap[t];
				if (s !== undefined) {
					for (var e = 0; e < s.length; e++) {
						if (s[e] === i) {
							s.splice(e, 1);
							break
						}
					}
				}
			},
			_cleanUpEventCallbacksMap: function () {
				var i = Object.keys(this.eventToCallbackMap);
				for (var t = 0; t < i.length; t++) {
					var e = i[t];
					this.eventToCallbackMap[e] = null
				}
			},
			_showTooltip: function () {
				if (this.options.tooltip_split === !1) {
					this._addClass(this.tooltip, "in");
					this.tooltip_min.style.display = "none";
					this.tooltip_max.style.display = "none"
				} else {
					this._addClass(this.tooltip_min, "in");
					this._addClass(this.tooltip_max, "in");
					this.tooltip.style.display = "none"
				}
				;
				this._state.over = !0
			},
			_hideTooltip: function () {
				if (this._state.inDrag === !1 && this.alwaysShowTooltip !== !0) {
					this._removeClass(this.tooltip, "in");
					this._removeClass(this.tooltip_min, "in");
					this._removeClass(this.tooltip_max, "in")
				}
				;
				this._state.over = !1
			},
			_layout: function () {
				var t;
				if (this.options.reversed) {
					t = [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]]
				} else {
					t = [this._state.percentage[0], this._state.percentage[1]]
				}
				;
				this.handle1.style[this.stylePos] = t[0] + "%";
				this.handle1.setAttribute("aria-valuenow", this._state.value[0]);
				this.handle2.style[this.stylePos] = t[1] + "%";
				this.handle2.setAttribute("aria-valuenow", this._state.value[1]);
				if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
					var d = this.options.orientation === "vertical" ? "height" : "width",
						l = this.options.orientation === "vertical" ? "marginTop" : "marginLeft",
						n = this._state.size / (this.options.ticks.length - 1);
					if (this.tickLabelContainer) {
						var o = 0;
						if (this.options.ticks_positions.length === 0) {
							if (this.options.orientation !== "vertical") {
								this.tickLabelContainer.style[l] = -n / 2 + "px"
							}
							;
							o = this.tickLabelContainer.offsetHeight
						} else {
							for (i = 0; i < this.tickLabelContainer.childNodes.length; i++) {
								if (this.tickLabelContainer.childNodes[i].offsetHeight > o) {
									o = this.tickLabelContainer.childNodes[i].offsetHeight
								}
							}
						}
						;
						if (this.options.orientation === "horizontal") {
							this.sliderElem.style.marginBottom = o + "px"
						}
					}
					;
					for (var i = 0; i < this.options.ticks.length; i++) {
						var e = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);
						if (this.options.reversed) {
							e = 100 - e
						}
						;
						this.ticks[i].style[this.stylePos] = e + "%";
						this._removeClass(this.ticks[i], "in-selection");
						if (!this.options.range) {
							if (this.options.selection === "after" && e >= t[0]) {
								this._addClass(this.ticks[i], "in-selection")
							} else if (this.options.selection === "before" && e <= t[0]) {
								this._addClass(this.ticks[i], "in-selection")
							}
						} else if (e >= t[0] && e <= t[1]) {
							this._addClass(this.ticks[i], "in-selection")
						}
						;
						if (this.tickLabels[i]) {
							this.tickLabels[i].style[d] = n + "px";
							if (this.options.orientation !== "vertical" && this.options.ticks_positions[i] !== undefined) {
								this.tickLabels[i].style.position = "absolute";
								this.tickLabels[i].style[this.stylePos] = e + "%";
								this.tickLabels[i].style[l] = -n / 2 + "px"
							} else if (this.options.orientation === "vertical") {
								this.tickLabels[i].style["marginLeft"] = this.sliderElem.offsetWidth + "px";
								this.tickLabelContainer.style["marginTop"] = this.sliderElem.offsetWidth / 2 * -1 + "px"
							}
						}
					}
				}
				;
				var s;
				if (this.options.range) {
					s = this.options.formatter(this._state.value);
					this._setText(this.tooltipInner, s);
					this.tooltip.style[this.stylePos] = (t[1] + t[0]) / 2 + "%";
					if (this.options.orientation === "vertical") {
						this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px")
					} else {
						this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
					}
					;
					if (this.options.orientation === "vertical") {
						this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px")
					} else {
						this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
					}
					;
					var p = this.options.formatter(this._state.value[0]);
					this._setText(this.tooltipInner_min, p);
					var r = this.options.formatter(this._state.value[1]);
					this._setText(this.tooltipInner_max, r);
					this.tooltip_min.style[this.stylePos] = t[0] + "%";
					if (this.options.orientation === "vertical") {
						this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px")
					} else {
						this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px")
					}
					;
					this.tooltip_max.style[this.stylePos] = t[1] + "%";
					if (this.options.orientation === "vertical") {
						this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px")
					} else {
						this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px")
					}
				} else {
					s = this.options.formatter(this._state.value[0]);
					this._setText(this.tooltipInner, s);
					this.tooltip.style[this.stylePos] = t[0] + "%";
					if (this.options.orientation === "vertical") {
						this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px")
					} else {
						this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
					}
				}
				;
				if (this.options.orientation === "vertical") {
					this.trackLow.style.top = "0";
					this.trackLow.style.height = Math.min(t[0], t[1]) + "%";
					this.trackSelection.style.top = Math.min(t[0], t[1]) + "%";
					this.trackSelection.style.height = Math.abs(t[0] - t[1]) + "%";
					this.trackHigh.style.bottom = "0";
					this.trackHigh.style.height = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%"
				} else {
					this.trackLow.style.left = "0";
					this.trackLow.style.width = Math.min(t[0], t[1]) + "%";
					this.trackSelection.style.left = Math.min(t[0], t[1]) + "%";
					this.trackSelection.style.width = Math.abs(t[0] - t[1]) + "%";
					this.trackHigh.style.right = "0";
					this.trackHigh.style.width = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
					var a = this.tooltip_min.getBoundingClientRect(),
						h = this.tooltip_max.getBoundingClientRect();
					if (this.options.tooltip_position === "bottom") {
						if (a.right > h.left) {
							this._removeClass(this.tooltip_max, "bottom");
							this._addClass(this.tooltip_max, "top");
							this.tooltip_max.style.top = "";
							this.tooltip_max.style.bottom = 22 + "px"
						} else {
							this._removeClass(this.tooltip_max, "top");
							this._addClass(this.tooltip_max, "bottom");
							this.tooltip_max.style.top = this.tooltip_min.style.top;
							this.tooltip_max.style.bottom = ""
						}
					} else {
						if (a.right > h.left) {
							this._removeClass(this.tooltip_max, "top");
							this._addClass(this.tooltip_max, "bottom");
							this.tooltip_max.style.top = 18 + "px"
						} else {
							this._removeClass(this.tooltip_max, "bottom");
							this._addClass(this.tooltip_max, "top");
							this.tooltip_max.style.top = this.tooltip_min.style.top
						}
					}
				}
			},
			_resize: function (t) {
				this._state.offset = this._offset(this.sliderElem);
				this._state.size = this.sliderElem[this.sizePos];
				this._layout()
			},
			_removeProperty: function (t, i) {
				if (t.style.removeProperty) {
					t.style.removeProperty(i)
				} else {
					t.style.removeAttribute(i)
				}
			},
			_mousedown: function (t) {
				if (!this._state.enabled) {
					return !1
				}
				;
				this._state.offset = this._offset(this.sliderElem);
				this._state.size = this.sliderElem[this.sizePos];
				var i = this._getPercentage(t);
				if (this.options.range) {
					var s = Math.abs(this._state.percentage[0] - i),
						o = Math.abs(this._state.percentage[1] - i);
					this._state.dragged = s < o ? 0 : 1;
					this._adjustPercentageForRangeSliders(i)
				} else {
					this._state.dragged = 0
				}
				;
				this._state.percentage[this._state.dragged] = i;
				this._layout();
				if (this.touchCapable) {
					document.removeEventListener("touchmove", this.mousemove, !1);
					document.removeEventListener("touchend", this.mouseup, !1)
				}
				;
				if (this.mousemove) {
					document.removeEventListener("mousemove", this.mousemove, !1)
				}
				;
				if (this.mouseup) {
					document.removeEventListener("mouseup", this.mouseup, !1)
				}
				;
				this.mousemove = this._mousemove.bind(this);
				this.mouseup = this._mouseup.bind(this);
				if (this.touchCapable) {
					document.addEventListener("touchmove", this.mousemove, !1);
					document.addEventListener("touchend", this.mouseup, !1)
				}
				;
				document.addEventListener("mousemove", this.mousemove, !1);
				document.addEventListener("mouseup", this.mouseup, !1);
				this._state.inDrag = !0;
				var e = this._calculateValue();
				this._trigger("slideStart", e);
				this._setDataVal(e);
				this.setValue(e, !1, !0);
				this._pauseEvent(t);
				if (this.options.focus) {
					this._triggerFocusOnHandle(this._state.dragged)
				}
				;
				return !0
			},
			_touchstart: function (t) {
				if (t.changedTouches === undefined) {
					this._mousedown(t);
					return
				}
				;
				var i = t.changedTouches[0];
				this.touchX = i.pageX;
				this.touchY = i.pageY
			},
			_triggerFocusOnHandle: function (t) {
				if (t === 0) {
					this.handle1.focus()
				}
				;
				if (t === 1) {
					this.handle2.focus()
				}
			},
			_keydown: function (t, i) {
				if (!this._state.enabled) {
					return !1
				}
				;
				var s;
				switch (i.keyCode) {
					case 37:
					case 40:
						s = -1;
						break;
					case 39:
					case 38:
						s = 1;
						break
				}
				;
				if (!s) {
					return
				}
				;
				if (this.options.natural_arrow_keys) {
					var o = this.options.orientation === "vertical" && !this.options.reversed,
						n = this.options.orientation === "horizontal" && this.options.reversed;
					if (o || n) {
						s = -s
					}
				}
				;
				var e = this._state.value[t] + s * this.options.step;
				if (this.options.range) {
					e = [!t ? e : this._state.value[0], t ? e : this._state.value[1]]
				}
				;
				this._trigger("slideStart", e);
				this._setDataVal(e);
				this.setValue(e, !0, !0);
				this._setDataVal(e);
				this._trigger("slideStop", e);
				this._layout();
				this._pauseEvent(i);
				return !1
			},
			_pauseEvent: function (t) {
				if (t.stopPropagation) {
					t.stopPropagation()
				}
				;
				if (t.preventDefault) {
					t.preventDefault()
				}
				;
				t.cancelBubble = !0;
				t.returnValue = !1
			},
			_mousemove: function (t) {
				if (!this._state.enabled) {
					return !1
				}
				;
				var i = this._getPercentage(t);
				this._adjustPercentageForRangeSliders(i);
				this._state.percentage[this._state.dragged] = i;
				this._layout();
				var e = this._calculateValue(!0);
				this.setValue(e, !0, !0);
				return !1
			},
			_touchmove: function (t) {
				if (t.changedTouches === undefined) {
					return
				}
				;
				var s = t.changedTouches[0],
					i = s.pageX - this.touchX,
					e = s.pageY - this.touchY;
				if (!this._state.inDrag) {
					if (this.options.orientation === "vertical" && i <= 5 && i >= -5 && (e >= 15 || e <= -15)) {
						this._mousedown(t)
					} else if (e <= 5 && e >= -5 && (i >= 15 || i <= -15)) {
						this._mousedown(t)
					}
				}
			},
			_adjustPercentageForRangeSliders: function (t) {
				if (this.options.range) {
					var i = this._getNumDigitsAfterDecimalPlace(t);
					i = i ? i - 1 : 0;
					var e = this._applyToFixedAndParseFloat(t, i);
					if (this._state.dragged === 0 && this._applyToFixedAndParseFloat(this._state.percentage[1], i) < e) {
						this._state.percentage[0] = this._state.percentage[1];
						this._state.dragged = 1
					} else if (this._state.dragged === 1 && this._applyToFixedAndParseFloat(this._state.percentage[0], i) > e) {
						this._state.percentage[1] = this._state.percentage[0];
						this._state.dragged = 0
					}
				}
			},
			_mouseup: function () {
				if (!this._state.enabled) {
					return !1
				}
				;
				if (this.touchCapable) {
					document.removeEventListener("touchmove", this.mousemove, !1);
					document.removeEventListener("touchend", this.mouseup, !1)
				}
				;
				document.removeEventListener("mousemove", this.mousemove, !1);
				document.removeEventListener("mouseup", this.mouseup, !1);
				this._state.inDrag = !1;
				if (this._state.over === !1) {
					this._hideTooltip()
				}
				;
				var t = this._calculateValue(!0);
				this._layout();
				this._setDataVal(t);
				this._trigger("slideStop", t);
				return !1
			},
			_calculateValue: function (t) {
				var i;
				if (this.options.range) {
					i = [this.options.min, this.options.max];
					if (this._state.percentage[0] !== 0) {
						i[0] = this._toValue(this._state.percentage[0]);
						i[0] = this._applyPrecision(i[0])
					}
					;
					if (this._state.percentage[1] !== 100) {
						i[1] = this._toValue(this._state.percentage[1]);
						i[1] = this._applyPrecision(i[1])
					}
				} else {
					i = this._toValue(this._state.percentage[0]);
					i = parseFloat(i);
					i = this._applyPrecision(i)
				}
				;
				if (t) {
					var s = [i, Infinity];
					for (var e = 0; e < this.options.ticks.length; e++) {
						var o = Math.abs(this.options.ticks[e] - i);
						if (o <= s[1]) {
							s = [this.options.ticks[e], o]
						}
					}
					;
					if (s[1] <= this.options.ticks_snap_bounds) {
						return s[0]
					}
				}
				;
				return i
			},
			_applyPrecision: function (t) {
				var i = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
				return this._applyToFixedAndParseFloat(t, i)
			},
			_getNumDigitsAfterDecimalPlace: function (t) {
				var i = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
				if (!i) {
					return 0
				}
				;
				return Math.max(0, (i[1] ? i[1].length : 0) - (i[2] ? +i[2] : 0))
			},
			_applyToFixedAndParseFloat: function (t, i) {
				var e = t.toFixed(i);
				return parseFloat(e)
			},
			_getPercentage: function (t) {
				if (this.touchCapable && (t.type === "touchstart" || t.type === "touchmove")) {
					t = t.touches[0]
				}
				;
				var e = t[this.mousePos],
					s = this._state.offset[this.stylePos],
					o = e - s,
					i = o / this._state.size * 100;
				i = Math.round(i / this._state.percentage[2]) * this._state.percentage[2];
				if (this.options.reversed) {
					i = 100 - i
				}
				;
				return Math.max(0, Math.min(100, i))
			},
			_validateInputValue: function (t) {
				if (typeof t === "number") {
					return t
				} else if (Array.isArray(t)) {
					this._validateArray(t);
					return t
				} else {
					throw new Error(o.formatInvalidInputErrorMsg(t))
				}
			},
			_validateArray: function (t) {
				for (var i = 0; i < t.length; i++) {
					var e = t[i];
					if (typeof e !== "number") {
						throw new Error(o.formatInvalidInputErrorMsg(e))
					}
				}
			},
			_setDataVal: function (t) {
				this.element.setAttribute("data-value", t);
				this.element.setAttribute("value", t);
				this.element.value = t
			},
			_trigger: function (i, e) {
				e = e || e === 0 ? e : undefined;
				var s = this.eventToCallbackMap[i];
				if (s && s.length) {
					for (var o = 0; o < s.length; o++) {
						var n = s[o];
						n(e)
					}
				}
				;
				if (t) {
					this._triggerJQueryEvent(i, e)
				}
			},
			_triggerJQueryEvent: function (t, i) {
				var e = {
					type: t,
					value: i
				};
				this.$element.trigger(e);
				this.$sliderElem.trigger(e)
			},
			_unbindJQueryEventHandlers: function () {
				this.$element.off();
				this.$sliderElem.off()
			},
			_setText: function (t, i) {
				if (typeof t.textContent !== "undefined") {
					t.textContent = i
				} else if (typeof t.innerText !== "undefined") {
					t.innerText = i
				}
			},
			_removeClass: function (t, i) {
				var o = i.split(" "),
					s = t.className;
				for (var e = 0; e < o.length; e++) {
					var n = o[e],
						a = new RegExp("(?:\\s|^)" + n + "(?:\\s|$)");
					s = s.replace(a, " ")
				}
				;
				t.className = s.trim()
			},
			_addClass: function (t, i) {
				var n = i.split(" "),
					s = t.className;
				for (var e = 0; e < n.length; e++) {
					var o = n[e],
						a = new RegExp("(?:\\s|^)" + o + "(?:\\s|$)"),
						h = a.test(s);
					if (!h) {
						s += " " + o
					}
				}
				;
				t.className = s.trim()
			},
			_offsetLeft: function (t) {
				return t.getBoundingClientRect().left
			},
			_offsetTop: function (t) {
				var i = t.offsetTop;
				while ((t = t.offsetParent) && !isNaN(t.offsetTop)) {
					i += t.offsetTop;
					if (t.tagName !== "BODY") {
						i -= t.scrollTop
					}
				}
				;
				return i
			},
			_offset: function (t) {
				return {
					left: this._offsetLeft(t),
					top: this._offsetTop(t)
				}
			},
			_css: function (i, e, s) {
				if (t) {
					t.style(i, e, s)
				} else {
					var o = e.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (t, i) {
						return i.toUpperCase()
					});
					i.style[o] = s
				}
			},
			_toValue: function (t) {
				return this.options.scale.toValue.apply(this, [t])
			},
			_toPercentage: function (t) {
				return this.options.scale.toPercentage.apply(this, [t])
			},
			_setTooltipPosition: function () {
				var t = [this.tooltip, this.tooltip_min, this.tooltip_max];
				if (this.options.orientation === "vertical") {
					var i = this.options.tooltip_position || "right",
						e = i === "left" ? "right" : "left";
					t.forEach((function (t) {
						this._addClass(t, i);
						t.style[e] = "100%"
					}).bind(this))
				} else if (this.options.tooltip_position === "bottom") {
					t.forEach((function (t) {
						this._addClass(t, "bottom");
						t.style.top = 22 + "px"
					}).bind(this))
				} else {
					t.forEach((function (t) {
						this._addClass(t, "top");
						t.style.top = -this.tooltip.outerHeight - 14 + "px"
					}).bind(this))
				}
			}
		};
		if (t) {
			var e = t.fn.slider ? "bootstrapSlider" : "slider";
			t.bridget(e, i);
			t(function () {
				t("input[data-provide=slider]")[e]()
			})
		}
	})(t);
	return i
});
(function (t) {
	'use strict';
	var n = {
		tagClass: function (t) {
			return 'label label-info'
		},
		itemValue: function (t) {
			return t ? t.toString() : t
		},
		itemText: function (t) {
			return this.itemValue(t)
		},
		itemTitle: function (t) {
			return null
		},
		freeInput: !0,
		addOnBlur: !0,
		maxTags: undefined,
		maxChars: undefined,
		confirmKeys: [13, 44],
		delimiter: ',',
		delimiterRegex: null,
		cancelConfirmKeysOnEmpty: !0,
		onTagExists: function (t, e) {
			e.hide().fadeIn()
		},
		trimValue: !1,
		allowDuplicates: !1
	};

	function i(e, i) {
		this.itemsArray = [];
		this.$element = t(e);
		this.$element.hide();
		this.isSelect = (e.tagName === 'SELECT');
		this.multiple = (this.isSelect && e.hasAttribute('multiple'));
		this.objectItems = i && i.itemValue;
		this.placeholderText = e.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
		this.inputSize = Math.max(1, this.placeholderText.length);
		this.$container = t('<div class="bootstrap-tagsinput"></div>');
		this.$input = t('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);
		this.$element.before(this.$container);
		this.build(i)
	};
	i.prototype = {
		constructor: i,
		add: function (i, a, r) {
			var n = this;
			if (n.options.maxTags && n.itemsArray.length >= n.options.maxTags) return;
			if (i !== !1 && !i) return;
			if (typeof i === 'string' && n.options.trimValue) {
				i = t.trim(i)
			}
			;
			if (typeof i === 'object' && !n.objectItems) throw ('Can\'t add objects when itemValue option is not set');
			if (i.toString().match(/^\s*$/)) return;
			if (n.isSelect && !n.multiple && n.itemsArray.length > 0) n.remove(n.itemsArray[0]);
			if (typeof i === 'string' && this.$element[0].tagName === 'INPUT') {
				var v = (n.options.delimiterRegex) ? n.options.delimiterRegex : n.options.delimiter,
					p = i.split(v);
				if (p.length > 1) {
					for (var u = 0; u < p.length; u++) {
						this.add(p[u], !0)
					}
					;
					if (!a) n.pushVal();
					return
				}
			}
			;
			var l = n.options.itemValue(i),
				c = n.options.itemText(i),
				g = n.options.tagClass(i),
				h = n.options.itemTitle(i),
				m = t.grep(n.itemsArray, function (t) {
					return n.options.itemValue(t) === l
				})[0];
			if (m && !n.options.allowDuplicates) {
				if (n.options.onTagExists) {
					var d = t('.tag', n.$container).filter(function () {
						return t(this).data('item') === m
					});
					n.options.onTagExists(i, d)
				}
				;
				return
			}
			;
			if (n.items().toString().length + i.length + 1 > n.options.maxInputLength) return;
			var f = t.Event('beforeItemAdd', {
				item: i,
				cancel: !1,
				options: r
			});
			n.$element.trigger(f);
			if (f.cancel) return;
			n.itemsArray.push(i);
			var s = t('<span class="tag ' + e(g) + (h !== null ? ('" title="' + h) : '') + '">' + e(c) + '<span data-role="remove"></span></span>');
			s.data('item', i);
			n.findInputWrapper().before(s);
			s.after(' ');
			if (n.isSelect && !t('option[value="' + encodeURIComponent(l) + '"]', n.$element)[0]) {
				var o = t('<option selected>' + e(c) + '</option>');
				o.data('item', i);
				o.attr('value', l);
				n.$element.append(o)
			}
			;
			if (!a) n.pushVal();
			if (n.options.maxTags === n.itemsArray.length || n.items().toString().length === n.options.maxInputLength) n.$container.addClass('bootstrap-tagsinput-max');
			n.$element.trigger(t.Event('itemAdded', {
				item: i,
				options: r
			}))
		},
		remove: function (e, n, a) {
			var i = this;
			if (i.objectItems) {
				if (typeof e === 'object') e = t.grep(i.itemsArray, function (t) {
					return i.options.itemValue(t) == i.options.itemValue(e)
				});
				else e = t.grep(i.itemsArray, function (t) {
					return i.options.itemValue(t) == e
				});
				e = e[e.length - 1]
			}
			;
			if (e) {
				var r = t.Event('beforeItemRemove', {
					item: e,
					cancel: !1,
					options: a
				});
				i.$element.trigger(r);
				if (r.cancel) return;
				t('.tag', i.$container).filter(function () {
					return t(this).data('item') === e
				}).remove();
				t('option', i.$element).filter(function () {
					return t(this).data('item') === e
				}).remove();
				if (t.inArray(e, i.itemsArray) !== -1) i.itemsArray.splice(t.inArray(e, i.itemsArray), 1)
			}
			;
			if (!n) i.pushVal();
			if (i.options.maxTags > i.itemsArray.length) i.$container.removeClass('bootstrap-tagsinput-max');
			i.$element.trigger(t.Event('itemRemoved', {
				item: e,
				options: a
			}))
		},
		removeAll: function () {
			var e = this;
			t('.tag', e.$container).remove();
			t('option', e.$element).remove();
			while (e.itemsArray.length > 0) e.itemsArray.pop();
			e.pushVal()
		},
		refresh: function () {
			var i = this;
			t('.tag', i.$container).each(function () {
				var n = t(this),
					a = n.data('item'),
					o = i.options.itemValue(a),
					s = i.options.itemText(a),
					l = i.options.tagClass(a);
				n.attr('class', null);
				n.addClass('tag ' + e(l));
				n.contents().filter(function () {
					return this.nodeType == 3
				})[0].nodeValue = e(s);
				if (i.isSelect) {
					var r = t('option', i.$element).filter(function () {
						return t(this).data('item') === a
					});
					r.attr('value', o)
				}
			})
		},
		items: function () {
			return this.itemsArray
		},
		pushVal: function () {
			var e = this,
				i = t.map(e.items(), function (t) {
					return e.options.itemValue(t).toString()
				});
			e.$element.val(i, !0).trigger('change')
		},
		build: function (i) {
			var e = this;
			e.options = t.extend({}, n, i);
			if (e.objectItems) e.options.freeInput = !1;
			a(e.options, 'itemValue');
			a(e.options, 'itemText');
			r(e.options, 'tagClass');
			if (e.options.typeahead) {
				var p = e.options.typeahead || {};
				r(p, 'source');
				e.$input.typeahead(t.extend({}, p, {
					source: function (i, n) {
						function r(t) {
							var r = [];
							for (var i = 0; i < t.length; i++) {
								var a = e.options.itemText(t[i]);
								o[a] = t[i];
								r.push(a)
							}
							;
							n(r)
						};
						this.map = {};
						var o = this.map,
							a = p.source(i);
						if (t.isFunction(a.success)) {
							a.success(r)
						} else if (t.isFunction(a.then)) {
							a.then(r)
						} else {
							t.when(a).then(r)
						}
					},
					updater: function (t) {
						e.add(this.map[t]);
						return this.map[t]
					},
					matcher: function (t) {
						return (t.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1)
					},
					sorter: function (t) {
						return t.sort()
					},
					highlighter: function (t) {
						var e = new RegExp('(' + this.query + ')', 'gi');
						return t.replace(e, '<strong>$1</strong>')
					}
				}))
			}
			;
			if (e.options.typeaheadjs) {
				var f = null,
					s = {};
				var u = e.options.typeaheadjs;
				if (t.isArray(u)) {
					f = u[0];
					s = u[1]
				} else {
					s = u
				}
				;
				e.$input.typeahead(f, s).on('typeahead:selected', t.proxy(function (t, i) {
					if (s.valueKey) e.add(i[s.valueKey]);
					else e.add(i);
					e.$input.typeahead('val', '')
				}, e))
			}
			;
			e.$container.on('click', t.proxy(function (t) {
				if (!e.$element.attr('disabled')) {
					e.$input.removeAttr('disabled')
				}
				;
				e.$input.focus()
			}, e));
			if (e.options.addOnBlur && e.options.freeInput) {
				e.$input.on('focusout', t.proxy(function (i) {
					if (t('.typeahead, .twitter-typeahead', e.$container).length === 0) {
						e.add(e.$input.val());
						e.$input.val('')
					}
				}, e))
			}
			;
			e.$container.on('keydown', 'input', t.proxy(function (i) {
				var n = t(i.target),
					a = e.findInputWrapper();
				if (e.$element.attr('disabled')) {
					e.$input.attr('disabled', 'disabled');
					return
				}
				;
				switch (i.which) {
					case 8:
						if (o(n[0]) === 0) {
							var p = a.prev();
							if (p.length) {
								e.remove(p.data('item'))
							}
						}
						;
						break;
					case 46:
						if (o(n[0]) === 0) {
							var u = a.next();
							if (u.length) {
								e.remove(u.data('item'))
							}
						}
						;
						break;
					case 37:
						var l = a.prev();
						if (n.val().length === 0 && l[0]) {
							l.before(a);
							n.focus()
						}
						;
						break;
					case 39:
						var s = a.next();
						if (n.val().length === 0 && s[0]) {
							s.after(a);
							n.focus()
						}
						;
						break;
					default:
				}
				;
				var r = n.val().length,
					f = Math.ceil(r / 5),
					c = r + f + 1;
				n.attr('size', Math.max(this.inputSize, n.val().length))
			}, e));
			e.$container.on('keypress', 'input', t.proxy(function (i) {
				var n = t(i.target);
				if (e.$element.attr('disabled')) {
					e.$input.attr('disabled', 'disabled');
					return
				}
				;
				var a = n.val(),
					o = e.options.maxChars && a.length >= e.options.maxChars;
				if (e.options.freeInput && (l(i, e.options.confirmKeys) || o)) {
					if (a.length !== 0) {
						e.add(o ? a.substr(0, e.options.maxChars) : a);
						n.val('')
					}
					;
					if (e.options.cancelConfirmKeysOnEmpty === !1) {
						i.preventDefault()
					}
				}
				;
				var r = n.val().length,
					s = Math.ceil(r / 5),
					u = r + s + 1;
				n.attr('size', Math.max(this.inputSize, n.val().length))
			}, e));
			e.$container.on('click', '[data-role=remove]', t.proxy(function (i) {
				if (e.$element.attr('disabled')) {
					return
				}
				;
				e.remove(t(i.target).closest('.tag').data('item'))
			}, e));
			if (e.options.itemValue === n.itemValue) {
				if (e.$element[0].tagName === 'INPUT') {
					e.add(e.$element.val())
				} else {
					t('option', e.$element).each(function () {
						e.add(t(this).attr('value'), !0)
					})
				}
			}
		},
		destroy: function () {
			var t = this;
			t.$container.off('keypress', 'input');
			t.$container.off('click', '[role=remove]');
			t.$container.remove();
			t.$element.removeData('tagsinput');
			t.$element.show()
		},
		focus: function () {
			this.$input.focus()
		},
		input: function () {
			return this.$input
		},
		findInputWrapper: function () {
			var e = this.$input[0],
				i = this.$container[0];
			while (e && e.parentNode !== i) e = e.parentNode;
			return t(e)
		}
	};
	t.fn.tagsinput = function (e, n, r) {
		var a = [];
		this.each(function () {
			var o = t(this).data('tagsinput');
			if (!o) {
				o = new i(this, e);
				t(this).data('tagsinput', o);
				a.push(o);
				if (this.tagName === 'SELECT') {
					t('option', t(this)).attr('selected', 'selected')
				}
				;
				t(this).val(t(this).val())
			} else if (!e && !n) {
				a.push(o)
			} else if (o[e] !== undefined) {
				if (o[e].length === 3 && r !== undefined) {
					var s = o[e](n, null, r)
				} else {
					var s = o[e](n)
				}
				;
				if (s !== undefined) a.push(s)
			}
		});
		if (typeof e == 'string') {
			return a.length > 1 ? a : a[0]
		} else {
			return a
		}
	};
	t.fn.tagsinput.Constructor = i;

	function a(t, e) {
		if (typeof t[e] !== 'function') {
			var i = t[e];
			t[e] = function (t) {
				return t[i]
			}
		}
	};

	function r(t, e) {
		if (typeof t[e] !== 'function') {
			var i = t[e];
			t[e] = function () {
				return i
			}
		}
	};
	var s = t('<div />');

	function e(t) {
		if (t) {
			return s.text(t).html()
		} else {
			return ''
		}
	};

	function o(t) {
		var e = 0;
		if (document.selection) {
			t.focus();
			var i = document.selection.createRange();
			i.moveStart('character', -t.value.length);
			e = i.text.length
		} else if (t.selectionStart || t.selectionStart == '0') {
			e = t.selectionStart
		}
		;
		return (e)
	};

	function l(e, i) {
		var n = !1;
		t.each(i, function (t, i) {
			if (typeof(i) === 'number' && e.which === i) {
				n = !0;
				return !1
			}
			;
			if (e.which === i.which) {
				var a = !i.hasOwnProperty('altKey') || e.altKey === i.altKey,
					r = !i.hasOwnProperty('shiftKey') || e.shiftKey === i.shiftKey,
					o = !i.hasOwnProperty('ctrlKey') || e.ctrlKey === i.ctrlKey;
				if (a && r && o) {
					n = !0;
					return !1
				}
			}
		});
		return n
	};
	t(function () {
		t('input[data-role=tagsinput], select[multiple][data-role=tagsinput]').tagsinput()
	})
})(window.jQuery);
