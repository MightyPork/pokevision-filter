!function (t, e, s, i) {
	var m = {
			drag: !0,
			drop: !0,
			exclude: '',
			nested: !0,
			vertical: !0
		},
		o = {
			afterMove: function (t, e, i) {
			},
			containerPath: '',
			containerSelector: 'ol, ul',
			distance: 0,
			delay: 0,
			handle: '',
			itemPath: '',
			itemSelector: 'li',
			bodyClass: 'dragging',
			draggedClass: 'dragged',
			isValidTarget: function (t, e) {
				return !0
			},
			onCancel: function (t, e, i, s) {
			},
			onDrag: function (t, e, i, s) {
				t.css(e)
			},
			onDragStart: function (e, i, s, o) {
				e.css({
					height: e.outerHeight(),
					width: e.outerWidth()
				});
				e.addClass(i.group.options.draggedClass);
				t('body').addClass(i.group.options.bodyClass)
			},
			onDrop: function (e, i, s, o) {
				e.removeClass(i.group.options.draggedClass).removeAttr('style');
				t('body').removeClass(i.group.options.bodyClass)
			},
			onMousedown: function (t, e, i) {
				if (!i.target.nodeName.match(/^(input|select|textarea)$/i)) {
					i.preventDefault();
					return !0
				}
			},
			placeholderClass: 'placeholder',
			placeholder: '<li class="placeholder"></li>',
			pullPlaceholder: !0,
			serialize: function (e, i, s) {
				var o = t.extend({}, e.data());
				if (s) return [i];
				else if (i[0]) {
					o.children = i
				}
				;
				delete o.subContainers;
				delete o.sortable;
				return o
			},
			tolerance: 0
		},
		n = {},
		c = 0,
		v = {
			left: 0,
			top: 0,
			bottom: 0,
			right: 0
		},
		f = {
			start: 'touchstart.sortable mousedown.sortable',
			drop: 'touchend.sortable touchcancel.sortable mouseup.sortable',
			drag: 'touchmove.sortable mousemove.sortable',
			scroll: 'scroll.sortable'
		},
		r = 'subContainers';

	function p(t, e) {
		var i = Math.max(0, t[0] - e[0], e[0] - t[1]),
			s = Math.max(0, t[2] - e[1], e[1] - t[3]);
		return i + s
	};

	function d(e, i, s, o) {
		var a = e.length,
			h = o ? 'offset' : 'position';
		s = s || 0;
		while (a--) {
			var r = e[a].el ? e[a].el : t(e[a]),
				n = r[h]();
			n.left += parseInt(r.css('margin-left'), 10);
			n.top += parseInt(r.css('margin-top'), 10);
			i[a] = [n.left - s, n.left + r.outerWidth() + s, n.top - s, n.top + r.outerHeight() + s]
		}
	};

	function a(t, e) {
		var i = e.offset();
		return {
			left: t.left - i.left,
			top: t.top - i.top
		}
	};

	function g(t, e, i) {
		e = [e.left, e.top];
		i = i && [i.left, i.top];
		var n, s = t.length,
			o = [];
		while (s--) {
			n = t[s];
			o[s] = [s, p(n, e), i && p(n, i)]
		}
		;
		o = o.sort(function (t, e) {
			return e[1] - t[1] || e[2] - t[2] || e[0] - t[0]
		});
		return o
	};

	function h(e) {
		this.options = t.extend({}, o, e);
		this.containers = [];
		if (!this.options.rootGroup) {
			this.scrollProxy = t.proxy(this.scroll, this);
			this.dragProxy = t.proxy(this.drag, this);
			this.dropProxy = t.proxy(this.drop, this);
			this.placeholder = t(this.options.placeholder);
			if (!e.isValidTarget) this.options.isValidTarget = i
		}
	};
	h.get = function (t) {
		if (!n[t.group]) {
			if (t.group === i) t.group = c++;
			n[t.group] = new h(t)
		}
		;
		return n[t.group]
	};
	h.prototype = {
		dragInit: function (e, i) {
			this.$document = t(i.el[0].ownerDocument);
			var s = t(e.target).closest(this.options.itemSelector);
			if (s.length) {
				this.item = s;
				this.itemContainer = i;
				if (this.item.is(this.options.exclude) || !this.options.onMousedown(this.item, o.onMousedown, e)) {
					return
				}
				;
				this.setPointer(e);
				this.toggleListeners('on');
				this.setupDelayTimer();
				this.dragInitDone = !0
			}
		},
		drag: function (t) {
			if (!this.dragging) {
				if (!this.distanceMet(t) || !this.delayMet) return;
				this.options.onDragStart(this.item, this.itemContainer, o.onDragStart, t);
				this.item.before(this.placeholder);
				this.dragging = !0
			}
			;
			this.setPointer(t);
			this.options.onDrag(this.item, a(this.pointer, this.item.offsetParent()), o.onDrag, t);
			var s = this.getPointer(t),
				e = this.sameResultBox,
				n = this.options.tolerance;
			if (!e || e.top - n > s.top || e.bottom + n < s.top || e.left - n > s.left || e.right + n < s.left)
				if (!this.searchValidTarget()) {
					this.placeholder.detach();
					this.lastAppendedItem = i
				}
		},
		drop: function (t) {
			this.toggleListeners('off');
			this.dragInitDone = !1;
			if (this.dragging) {
				if (this.placeholder.closest('html')[0]) {
					this.placeholder.before(this.item).detach()
				} else {
					this.options.onCancel(this.item, this.itemContainer, o.onCancel, t)
				}
				;
				this.options.onDrop(this.item, this.getContainer(this.item), o.onDrop, t);
				this.clearDimensions();
				this.clearOffsetParent();
				this.lastAppendedItem = this.sameResultBox = i;
				this.dragging = !1
			}
		},
		searchValidTarget: function (t, e) {
			if (!t) {
				t = this.relativePointer || this.pointer;
				e = this.lastRelativePointer || this.lastPointer
			}
			;
			var o = g(this.getContainerDimensions(), t, e),
				n = o.length;
			while (n--) {
				var h = o[n][0],
					l = o[n][1];
				if (!l || this.options.pullPlaceholder) {
					var s = this.containers[h];
					if (!s.disabled) {
						if (!this.$getOffsetParent()) {
							var r = s.getItemOffsetParent();
							t = a(t, r);
							e = a(e, r)
						}
						;
						if (s.searchValidTarget(t, e)) return !0
					}
				}
			}
			;
			if (this.sameResultBox) this.sameResultBox = i
		},
		movePlaceholder: function (t, e, i, s) {
			var o = this.lastAppendedItem;
			if (!s && o && o[0] === e[0]) return;
			e[i](this.placeholder);
			this.lastAppendedItem = e;
			this.sameResultBox = s;
			this.options.afterMove(this.placeholder, t, e)
		},
		getContainerDimensions: function () {
			if (!this.containerDimensions) d(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent());
			return this.containerDimensions
		},
		getContainer: function (t) {
			return t.closest(this.options.containerSelector).data(s)
		},
		$getOffsetParent: function () {
			if (this.offsetParent === i) {
				var t = this.containers.length - 1,
					e = this.containers[t].getItemOffsetParent();
				if (!this.options.rootGroup) {
					while (t--) {
						if (e[0] != this.containers[t].getItemOffsetParent()[0]) {
							e = !1;
							break
						}
					}
				}
				;
				this.offsetParent = e
			}
			;
			return this.offsetParent
		},
		setPointer: function (t) {
			var e = this.getPointer(t);
			if (this.$getOffsetParent()) {
				var i = a(e, this.$getOffsetParent());
				this.lastRelativePointer = this.relativePointer;
				this.relativePointer = i
			}
			;
			this.lastPointer = this.pointer;
			this.pointer = e
		},
		distanceMet: function (t) {
			var e = this.getPointer(t);
			return (Math.max(Math.abs(this.pointer.left - e.left), Math.abs(this.pointer.top - e.top)) >= this.options.distance)
		},
		getPointer: function (t) {
			var e = t.originalEvent || t.originalEvent.touches && t.originalEvent.touches[0];
			return {
				left: t.pageX || e.pageX,
				top: t.pageY || e.pageY
			}
		},
		setupDelayTimer: function () {
			var t = this;
			this.delayMet = !this.options.delay;
			if (!this.delayMet) {
				clearTimeout(this._mouseDelayTimer);
				this._mouseDelayTimer = setTimeout(function () {
					t.delayMet = !0
				}, this.options.delay)
			}
		},
		scroll: function (t) {
			this.clearDimensions();
			this.clearOffsetParent()
		},
		toggleListeners: function (e) {
			var i = this,
				s = ['drag', 'drop', 'scroll'];
			t.each(s, function (t, s) {
				i.$document[e](f[s], i[s + 'Proxy'])
			})
		},
		clearOffsetParent: function () {
			this.offsetParent = i
		},
		clearDimensions: function () {
			this.traverse(function (t) {
				t._clearDimensions()
			})
		},
		traverse: function (t) {
			t(this);
			var e = this.containers.length;
			while (e--) {
				this.containers[e].traverse(t)
			}
		},
		_clearDimensions: function () {
			this.containerDimensions = i
		},
		_destroy: function () {
			n[this.options.group] = i
		}
	};

	function u(e, i) {
		this.el = e;
		this.options = t.extend({}, m, i);
		this.group = h.get(this.options);
		this.rootGroup = this.options.rootGroup || this.group;
		this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector;
		var s = this.rootGroup.options.itemPath;
		this.target = s ? this.el.find(s) : this.el;
		this.target.on(f.start, this.handle, t.proxy(this.dragInit, this));
		if (this.options.drop) this.group.containers.push(this)
	};
	u.prototype = {
		dragInit: function (t) {
			var e = this.rootGroup;
			if (!this.disabled && !e.dragInitDone && this.options.drag && this.isValidDrag(t)) {
				e.dragInit(t, this)
			}
		},
		isValidDrag: function (t) {
			return t.which == 1 || t.type == 'touchstart' && t.originalEvent.touches.length == 1
		},
		searchValidTarget: function (t, e) {
			var n = g(this.getItemDimensions(), t, e),
				i = n.length,
				s = this.rootGroup,
				r = !s.options.isValidTarget || s.options.isValidTarget(s.item, this);
			if (!i && r) {
				s.movePlaceholder(this, this.target, 'append');
				return !0
			} else
				while (i--) {
					var o = n[i][0],
						h = n[i][1];
					if (!h && this.hasChildGroup(o)) {
						var a = this.getContainerGroup(o).searchValidTarget(t, e);
						if (a) return !0
					} else if (r) {
						this.movePlaceholder(o, t);
						return !0
					}
				}
		},
		movePlaceholder: function (e, i) {
			var o = t(this.items[e]),
				n = this.itemDimensions[e],
				a = 'after',
				h = o.outerWidth(),
				l = o.outerHeight(),
				r = o.offset(),
				s = {
					left: r.left,
					right: r.left + h,
					top: r.top,
					bottom: r.top + l
				};
			if (this.options.vertical) {
				var c = (n[2] + n[3]) / 2,
					p = i.top <= c;
				if (p) {
					a = 'before';
					s.bottom -= l / 2
				} else s.top += l / 2
			} else {
				var f = (n[0] + n[1]) / 2,
					u = i.left <= f;
				if (u) {
					a = 'before';
					s.right -= h / 2
				} else s.left += h / 2
			}
			;
			if (this.hasChildGroup(e)) s = v;
			this.rootGroup.movePlaceholder(this, o, a, s)
		},
		getItemDimensions: function () {
			if (!this.itemDimensions) {
				this.items = this.$getChildren(this.el, 'item').filter(':not(.' + this.group.options.placeholderClass + ', .' + this.group.options.draggedClass + ')').get();
				d(this.items, this.itemDimensions = [], this.options.tolerance)
			}
			;
			return this.itemDimensions
		},
		getItemOffsetParent: function () {
			var e, t = this.el;
			if (t.css('position') === 'relative' || t.css('position') === 'absolute' || t.css('position') === 'fixed') e = t;
			else e = t.offsetParent();
			return e
		},
		hasChildGroup: function (t) {
			return this.options.nested && this.getContainerGroup(t)
		},
		getContainerGroup: function (e) {
			var o = t.data(this.items[e], r);
			if (o === i) {
				var n = this.$getChildren(this.items[e], 'container');
				o = !1;
				if (n[0]) {
					var a = t.extend({}, this.options, {
						rootGroup: this.rootGroup,
						group: c++
					});
					o = n[s](a).data(s).group
				}
				;
				t.data(this.items[e], r, o)
			}
			;
			return o
		},
		$getChildren: function (e, i) {
			var s = this.rootGroup.options,
				o = s[i + 'Path'],
				n = s[i + 'Selector'];
			e = t(e);
			if (o) e = e.find(o);
			return e.children(n)
		},
		_serialize: function (e, i) {
			var s = this,
				o = i ? 'item' : 'container',
				n = this.$getChildren(e, o).not(this.options.exclude).map(function () {
					return s._serialize(t(this), !i)
				}).get();
			return this.rootGroup.options.serialize(e, n, i)
		},
		traverse: function (e) {
			t.each(this.items || [], function (i) {
				var s = t.data(this, r);
				if (s) s.traverse(e)
			});
			e(this)
		},
		_clearDimensions: function () {
			this.itemDimensions = i
		},
		_destroy: function () {
			var e = this;
			this.target.off(f.start, this.handle);
			this.el.removeData(s);
			if (this.options.drop) this.group.containers = t.grep(this.group.containers, function (t) {
				return t != e
			});
			t.each(this.items || [], function () {
				t.removeData(this, r)
			})
		}
	};
	var l = {
		enable: function () {
			this.traverse(function (t) {
				t.disabled = !1
			})
		},
		disable: function () {
			this.traverse(function (t) {
				t.disabled = !0
			})
		},
		serialize: function () {
			return this._serialize(this.el, !0)
		},
		refresh: function () {
			this.traverse(function (t) {
				t._clearDimensions()
			})
		},
		destroy: function () {
			this.traverse(function (t) {
				t._destroy()
			})
		}
	};
	t.extend(u.prototype, l);
	t.fn[s] = function (e) {
		var o = Array.prototype.slice.call(arguments, 1);
		return this.map(function () {
			var n = t(this),
				r = n.data(s);
			if (r && l[e]) return l[e].apply(r, o) || this;
			else if (!r && (e === i || typeof e === 'object')) n.data(s, new u(n, e));
			return this
		})
	}
}(jQuery, window, 'sortable');
