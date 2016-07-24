
/*!
 * medium-editor-insert-plugin v2.3.2 - jQuery insert plugin for MediumEditor
 *
 * http://linkesch.com/medium-editor-insert-plugin
 *
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.com)
 * Released under the MIT license
 */
(function (e) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'handlebars/runtime', 'medium-editor', 'blueimp-file-upload', 'jquery-sortable'], e)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function (t) {
			if (typeof window === 'undefined') {
				throw new Error('medium-editor-insert-plugin runs only in a browser.')
			}
			;
			if (t === undefined) {
				t = require('jquery')
			}
			;
			window.jQuery = t;
			Handlebars = require('handlebars/runtime');
			MediumEditor = require('medium-editor');
			require('jquery-sortable');
			require('blueimp-file-upload');
			e(t, Handlebars, MediumEditor);
			return t
		}
	} else {
		e(jQuery, Handlebars, MediumEditor)
	}
}(function (e, t, i) {
	this['MediumInsert'] = this['MediumInsert'] || {};
	this['MediumInsert']['Templates'] = this['MediumInsert']['Templates'] || {};
	this['MediumInsert']['Templates']['src/js/templates/core-buttons.hbs'] = t.template({
		'1': function (e, t, i, o, s) {
			var a, n, r = t != null ? t : {},
				l = i.helperMissing,
				d = 'function';
			return '            <li><a data-addon="' + e.escapeExpression(((n = (n = i.key || (s && s.key)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'key',
					'hash': {},
					'data': s
				}) : n))) + '" data-action="add" class="medium-insert-action">' + ((a = ((n = (n = i.label || (t != null ? t.label : t)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'label',
					'hash': {},
					'data': s
				}) : n))) != null ? a : '') + '</a></li>\n'
		},
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, s, o) {
			var n;
			return '<div class="medium-insert-buttons" contenteditable="false" style="display: none">\n    <a class="medium-insert-buttons-show">+</a>\n    <ul class="medium-insert-buttons-addons" style="display: none">\n' + ((n = i.each.call(t != null ? t : {}, (t != null ? t.addons : t), {
					'name': 'each',
					'hash': {},
					'fn': e.program(1, o, 0),
					'inverse': e.noop,
					'data': o
				})) != null ? n : '') + '    </ul>\n</div>\n'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/core-caption.hbs'] = t.template({
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, s, o) {
			var n;
			return '<figcaption contenteditable="true" class="medium-insert-caption-placeholder" data-placeholder="' + e.escapeExpression(((n = (n = i.placeholder || (t != null ? t.placeholder : t)) != null ? n : i.helperMissing), (typeof n === 'function' ? n.call(t != null ? t : {}, {
					'name': 'placeholder',
					'hash': {},
					'data': o
				}) : n))) + '"></figcaption>'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/core-empty-line.hbs'] = t.template({
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, s, o) {
			return '<p><br></p>\n'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/embeds-toolbar.hbs'] = t.template({
		'1': function (e, t, i, s, o) {
			var n;
			return '    <div class="medium-insert-embeds-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active">\n        <ul class="medium-editor-toolbar-actions clearfix">\n' + ((n = i.each.call(t != null ? t : {}, (t != null ? t.styles : t), {
					'name': 'each',
					'hash': {},
					'fn': e.program(2, o, 0),
					'inverse': e.noop,
					'data': o
				})) != null ? n : '') + '        </ul>\n    </div>\n'
		},
		'2': function (e, t, i, s, o) {
			var n;
			return ((n = i['if'].call(t != null ? t : {}, (t != null ? t.label : t), {
				'name': 'if',
				'hash': {},
				'fn': e.program(3, o, 0),
				'inverse': e.noop,
				'data': o
			})) != null ? n : '')
		},
		'3': function (e, t, i, o, s) {
			var a, n, r = t != null ? t : {},
				l = i.helperMissing,
				d = 'function';
			return '                    <li>\n                        <button class="medium-editor-action" data-action="' + e.escapeExpression(((n = (n = i.key || (s && s.key)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'key',
					'hash': {},
					'data': s
				}) : n))) + '">' + ((a = ((n = (n = i.label || (t != null ? t.label : t)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'label',
					'hash': {},
					'data': s
				}) : n))) != null ? a : '') + '</button>\n                    </li>\n'
		},
		'5': function (e, t, i, s, o) {
			var n;
			return '    <div class="medium-insert-embeds-toolbar2 medium-editor-toolbar medium-editor-toolbar-active">\n        <ul class="medium-editor-toolbar-actions clearfix">\n' + ((n = i.each.call(t != null ? t : {}, (t != null ? t.actions : t), {
					'name': 'each',
					'hash': {},
					'fn': e.program(2, o, 0),
					'inverse': e.noop,
					'data': o
				})) != null ? n : '') + '        </ul>\n    </div>\n'
		},
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, o, s) {
			var n, a = t != null ? t : {};
			return ((n = i['if'].call(a, (t != null ? t.styles : t), {
					'name': 'if',
					'hash': {},
					'fn': e.program(1, s, 0),
					'inverse': e.noop,
					'data': s
				})) != null ? n : '') + '\n' + ((n = i['if'].call(a, (t != null ? t.actions : t), {
					'name': 'if',
					'hash': {},
					'fn': e.program(5, s, 0),
					'inverse': e.noop,
					'data': s
				})) != null ? n : '')
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/embeds-wrapper.hbs'] = t.template({
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, s, o) {
			var a, n;
			return '<div class="medium-insert-embeds" contenteditable="false">\n  <figure>\n      <div class="medium-insert-embed">\n           ' + ((a = ((n = (n = i.html || (t != null ? t.html : t)) != null ? n : i.helperMissing), (typeof n === 'function' ? n.call(t != null ? t : {}, {
					'name': 'html',
					'hash': {},
					'data': o
				}) : n))) != null ? a : '') + '\n       </div>\n    </figure>\n <div class="medium-insert-embeds-overlay"></div>\n</div>'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/images-fileupload.hbs'] = t.template({
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, s, o) {
			return '<input type="file" multiple>'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/images-image.hbs'] = t.template({
		'1': function (e, t, i, s, o) {
			return '        <div class="medium-insert-images-progress"></div>\n'
		},
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, o, s) {
			var a, n, r = t != null ? t : {};
			return '<figure contenteditable="false">\n    <img src="' + e.escapeExpression(((n = (n = i.img || (t != null ? t.img : t)) != null ? n : i.helperMissing), (typeof n === 'function' ? n.call(r, {
					'name': 'img',
					'hash': {},
					'data': s
				}) : n))) + '" alt="" />\n' + ((a = i['if'].call(r, (t != null ? t.progress : t), {
					'name': 'if',
					'hash': {},
					'fn': e.program(1, s, 0),
					'inverse': e.noop,
					'data': s
				})) != null ? a : '') + '</figure>\n'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/images-progressbar.hbs'] = t.template({
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, s, o) {
			return '<progress min="0" max="100" value="0">0</progress>'
		},
		'useData': !0
	});
	this['MediumInsert']['Templates']['src/js/templates/images-toolbar.hbs'] = t.template({
		'1': function (e, t, i, s, o) {
			var n;
			return ((n = i['if'].call(t != null ? t : {}, (t != null ? t.label : t), {
				'name': 'if',
				'hash': {},
				'fn': e.program(2, o, 0),
				'inverse': e.noop,
				'data': o
			})) != null ? n : '')
		},
		'2': function (e, t, i, o, s) {
			var a, n, r = t != null ? t : {},
				l = i.helperMissing,
				d = 'function';
			return '                <li>\n                    <button class="medium-editor-action" data-action="' + e.escapeExpression(((n = (n = i.key || (s && s.key)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'key',
					'hash': {},
					'data': s
				}) : n))) + '">' + ((a = ((n = (n = i.label || (t != null ? t.label : t)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'label',
					'hash': {},
					'data': s
				}) : n))) != null ? a : '') + '</button>\n                </li>\n'
		},
		'4': function (e, t, i, s, o) {
			var n;
			return '  <div class="medium-insert-images-toolbar2 medium-editor-toolbar medium-editor-toolbar-active">\n      <ul class="medium-editor-toolbar-actions clearfix">\n' + ((n = i.each.call(t != null ? t : {}, (t != null ? t.actions : t), {
					'name': 'each',
					'hash': {},
					'fn': e.program(5, o, 0),
					'inverse': e.noop,
					'data': o
				})) != null ? n : '') + '     </ul>\n    </div>\n'
		},
		'5': function (e, t, i, s, o) {
			var n;
			return ((n = i['if'].call(t != null ? t : {}, (t != null ? t.label : t), {
				'name': 'if',
				'hash': {},
				'fn': e.program(6, o, 0),
				'inverse': e.noop,
				'data': o
			})) != null ? n : '')
		},
		'6': function (e, t, i, o, s) {
			var a, n, r = t != null ? t : {},
				l = i.helperMissing,
				d = 'function';
			return '                  <li>\n                      <button class="medium-editor-action" data-action="' + e.escapeExpression(((n = (n = i.key || (s && s.key)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'key',
					'hash': {},
					'data': s
				}) : n))) + '">' + ((a = ((n = (n = i.label || (t != null ? t.label : t)) != null ? n : l), (typeof n === d ? n.call(r, {
					'name': 'label',
					'hash': {},
					'data': s
				}) : n))) != null ? a : '') + '</button>\n                  </li>\n'
		},
		'compiler': [7, '>= 4.0.0'],
		'main': function (e, t, i, o, s) {
			var n, a = t != null ? t : {};
			return '<div class="medium-insert-images-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active">\n    <ul class="medium-editor-toolbar-actions clearfix">\n' + ((n = i.each.call(a, (t != null ? t.styles : t), {
					'name': 'each',
					'hash': {},
					'fn': e.program(1, s, 0),
					'inverse': e.noop,
					'data': s
				})) != null ? n : '') + '    </ul>\n</div>\n\n' + ((n = i['if'].call(a, (t != null ? t.actions : t), {
					'name': 'if',
					'hash': {},
					'fn': e.program(4, s, 0),
					'inverse': e.noop,
					'data': s
				})) != null ? n : '')
		},
		'useData': !0
	});
	(function (e, t, s, o) {
		'use strict';
		var n = 'mediumInsert',
			a = {
				editor: null,
				enabled: !0,
				addons: {
					images: !0,
					embeds: !0
				}
			};

		function r(e) {
			return e.charAt(0).toUpperCase() + e.slice(1)
		};

		function i(i, s) {
			var r;
			this.el = i;
			this.$el = e(i);
			this.templates = t.MediumInsert.Templates;
			if (s) {
				r = s.editor;
				s.editor = null
			}
			;
			this.options = e.extend(!0, {}, a, s);
			this.options.editor = r;
			this._defaults = a;
			this._name = n;
			if (this.options && this.options.editor) {
				if (this.options.editor._serialize === o) {
					this.options.editor._serialize = this.options.editor.serialize
				}
				;
				if (this.options.editor._destroy === o) {
					this.options.editor._destroy = this.options.editor.destroy
				}
				;
				if (this.options.editor._setup === o) {
					this.options.editor._setup = this.options.editor.setup
				}
				;
				this.options.editor._hideInsertButtons = this.hideButtons;
				this.options.editor.serialize = this.editorSerialize;
				this.options.editor.destroy = this.editorDestroy;
				this.options.editor.setup = this.editorSetup;
				if (this.options.editor.getExtensionByName('placeholder') !== o) {
					this.options.editor.getExtensionByName('placeholder').updatePlaceholder = this.editorUpdatePlaceholder
				}
			}
		};
		i.prototype.init = function () {
			this.$el.addClass('medium-editor-insert-plugin');
			if (typeof this.options.addons !== 'object' || Object.keys(this.options.addons).length === 0) {
				this.disable()
			}
			;
			this.initAddons();
			this.clean();
			this.events()
		};
		i.prototype.events = function () {
			var i = this;
			this.$el.on('dragover drop', function (e) {
				e.preventDefault()
			}).on('keyup click', e.proxy(this, 'toggleButtons')).on('selectstart mousedown', '.medium-insert, .medium-insert-buttons', e.proxy(this, 'disableSelection')).on('click', '.medium-insert-buttons-show', e.proxy(this, 'toggleAddons')).on('click', '.medium-insert-action', e.proxy(this, 'addonAction')).on('paste', '.medium-insert-caption-placeholder', function (t) {
				e.proxy(i, 'removeCaptionPlaceholder')(e(t.target))
			});
			e(t).on('resize', e.proxy(this, 'positionButtons', null))
		};
		i.prototype.getEditor = function () {
			return this.options.editor
		};
		i.prototype.editorSerialize = function () {
			var t = this._serialize();
			e.each(t, function (i) {
				var s = e('<div />').html(t[i].value);
				s.find('.medium-insert-buttons').remove();
				s.find('[data-embed-code]').each(function () {
					var t = e(this);
					t.html(t.attr('data-embed-code'))
				});
				t[i].value = s.html()
			});
			return t
		};
		i.prototype.editorDestroy = function () {
			e.each(this.elements, function (t, s) {
				if (e(s).data('plugin_' + n) instanceof i) {
					e(s).data('plugin_' + n).disable()
				}
			});
			this._destroy()
		};
		i.prototype.editorSetup = function () {
			this._setup();
			e.each(this.elements, function (t, s) {
				if (e(s).data('plugin_' + n) instanceof i) {
					e(s).data('plugin_' + n).enable()
				}
			})
		};
		i.prototype.editorUpdatePlaceholder = function (t, i) {
			var s = e(t).children().not('.medium-insert-buttons').contents();
			if (!i && s.length === 1 && s[0].nodeName.toLowerCase() === 'br') {
				this.showPlaceholder(t);
				this.base._hideInsertButtons(e(t))
			} else {
				this.hidePlaceholder(t)
			}
		};
		i.prototype.triggerInput = function () {
			if (this.getEditor()) {
				this.getEditor().trigger('editableInput', null, this.el)
			}
		};
		i.prototype.deselect = function () {
			s.getSelection().removeAllRanges()
		};
		i.prototype.disable = function () {
			this.options.enabled = !1;
			this.$el.find('.medium-insert-buttons').addClass('hide')
		};
		i.prototype.enable = function () {
			this.options.enabled = !0;
			this.$el.find('.medium-insert-buttons').removeClass('hide')
		};
		i.prototype.disableSelection = function (t) {
			var i = e(t.target);
			if (i.is('img') === !1 || i.hasClass('medium-insert-buttons-show')) {
				t.preventDefault()
			}
		};
		i.prototype.initAddons = function () {
			var t = this;
			if (!this.options.addons || this.options.addons.length === 0) {
				return
			}
			;
			e.each(this.options.addons, function (e, i) {
				var s = n + r(e);
				if (i === !1) {
					delete t.options.addons[e];
					return
				}
				;
				t.$el[s](i);
				t.options.addons[e] = t.$el.data('plugin_' + s).options
			})
		};
		i.prototype.clean = function () {
			var o = this,
				t, i, s;
			if (this.options.enabled === !1) {
				return
			}
			;
			if (this.$el.children().length === 0) {
				this.$el.html(this.templates['src/js/templates/core-empty-line.hbs']().trim())
			}
			;
			s = this.$el.contents().filter(function () {
				return (this.nodeName === '#text' && e.trim(e(this).text()) !== '') || this.nodeName.toLowerCase() === 'br'
			});
			s.each(function () {
				e(this).wrap('<p />');
				o.moveCaret(e(this).parent(), e(this).text().length)
			});
			this.addButtons();
			t = this.$el.find('.medium-insert-buttons');
			i = t.prev();
			if (i.attr('class') && i.attr('class').match(/medium\-insert(?!\-active)/)) {
				t.before(this.templates['src/js/templates/core-empty-line.hbs']().trim())
			}
		};
		i.prototype.getButtons = function () {
			if (this.options.enabled === !1) {
				return
			}
			;
			return this.templates['src/js/templates/core-buttons.hbs']({
				addons: this.options.addons
			}).trim()
		};
		i.prototype.addButtons = function () {
			if (this.$el.find('.medium-insert-buttons').length === 0) {
				this.$el.append(this.getButtons())
			}
		};
		i.prototype.toggleButtons = function (i) {
			var n = e(i.target),
				r = t.getSelection(),
				l = this,
				d, s, a, o;
			if (this.options.enabled === !1) {
				return
			}
			;
			if (!r || r.rangeCount === 0) {
				s = n
			} else {
				d = r.getRangeAt(0);
				s = e(d.commonAncestorContainer)
			}
			;
			if (s.hasClass('medium-editor-insert-plugin')) {
				s = s.find('p:first')
			}
			;
			a = s.is('p') ? s : s.closest('p');
			this.clean();
			if (n.hasClass('medium-editor-placeholder') === !1 && n.closest('.medium-insert-buttons').length === 0 && s.closest('.medium-insert-buttons').length === 0) {
				this.$el.find('.medium-insert-active').removeClass('medium-insert-active');
				e.each(this.options.addons, function (e) {
					if (n.closest('.medium-insert-' + e).length) {
						s = n
					}
					;
					if (s.closest('.medium-insert-' + e).length) {
						a = s.closest('.medium-insert-' + e);
						o = e;
						return
					}
				});
				if (a.length && ((a.text().trim() === '' && !o) || o === 'images')) {
					a.addClass('medium-insert-active');
					setTimeout(function () {
						l.positionButtons(o);
						l.showButtons(o)
					}, o ? 100 : 0)
				} else {
					this.hideButtons()
				}
			}
		};
		i.prototype.showButtons = function (e) {
			var t = this.$el.find('.medium-insert-buttons');
			t.show();
			t.find('li').show();
			if (e) {
				t.find('li').hide();
				t.find('a[data-addon="' + e + '"]').parent().show()
			}
		};
		i.prototype.hideButtons = function (e) {
			e = e || this.$el;
			e.find('.medium-insert-buttons').hide();
			e.find('.medium-insert-buttons-addons').hide();
			e.find('.medium-insert-buttons-show').removeClass('medium-insert-buttons-rotate')
		};
		i.prototype.positionButtons = function (e) {
			var s = this.$el.find('.medium-insert-buttons'),
				t = this.$el.find('.medium-insert-active'),
				n = t.find('figure:first').length ? t.find('figure:first') : t,
				i, o;
			if (t.length) {
				i = t.position().left - parseInt(s.find('.medium-insert-buttons-addons').css('left'), 10) - parseInt(s.find('.medium-insert-buttons-addons a:first').css('margin-left'), 10);
				i = i < 0 ? t.position().left : i;
				o = t.position().top + parseInt(t.css('margin-top'), 10);
				if (e) {
					if (t.position().left !== n.position().left) {
						i = n.position().left
					}
					;
					o += t.height() + 15
				}
				;
				s.css({
					left: i,
					top: o
				})
			}
		};
		i.prototype.toggleAddons = function () {
			this.$el.find('.medium-insert-buttons-addons').fadeToggle();
			this.$el.find('.medium-insert-buttons-show').toggleClass('medium-insert-buttons-rotate')
		};
		i.prototype.hideAddons = function () {
			this.$el.find('.medium-insert-buttons-addons').hide();
			this.$el.find('.medium-insert-buttons-show').removeClass('medium-insert-buttons-rotate')
		};
		i.prototype.addonAction = function (t) {
			var i = e(t.target).is('a') ? e(t.target) : e(t.target).closest('a'),
				s = i.data('addon'),
				o = i.data('action');
			this.$el.data('plugin_' + n + r(s))[o]()
		};
		i.prototype.moveCaret = function (e, i) {
			var o, a, n, r;
			i = i || 0;
			o = s.createRange();
			a = t.getSelection();
			n = e.get(0);
			if (!n.childNodes.length) {
				r = s.createTextNode(' ');
				n.appendChild(r)
			}
			;
			o.setStart(n.childNodes[0], i);
			o.collapse(!0);
			a.removeAllRanges();
			a.addRange(o)
		};
		i.prototype.addCaption = function (e, t) {
			var i = e.find('figcaption');
			if (i.length === 0) {
				e.append(this.templates['src/js/templates/core-caption.hbs']({
					placeholder: t
				}))
			}
		};
		i.prototype.removeCaptions = function (t) {
			var i = this.$el.find('figcaption');
			if (t) {
				i = i.not(t)
			}
			;
			i.each(function () {
				if (e(this).hasClass('medium-insert-caption-placeholder') || e(this).text().trim() === '') {
					e(this).remove()
				}
			})
		};
		i.prototype.removeCaptionPlaceholder = function (e) {
			var t = e.is('figcaption') ? e : e.find('figcaption');
			if (t.length) {
				t.removeClass('medium-insert-caption-placeholder').removeAttr('data-placeholder')
			}
		};
		e.fn[n] = function (t) {
			return this.each(function () {
				var s = this,
					o;
				if (e(s).is('textarea')) {
					o = e(s).attr('medium-editor-textarea-id');
					s = e(s).siblings('[medium-editor-textarea-id="' + o + '"]').get(0)
				}
				;
				if (!e.data(s, 'plugin_' + n)) {
					e.data(s, 'plugin_' + n, new i(s, t));
					e.data(s, 'plugin_' + n).init()
				} else if (typeof t === 'string' && e.data(s, 'plugin_' + n)[t]) {
					e.data(s, 'plugin_' + n)[t]()
				}
			})
		}
	})(jQuery, window, document);
	(function (e, t, i, s) {
		'use strict';
		var n = 'mediumInsert',
			a = 'Embeds',
			r = {
				label: '<span class="fa fa-youtube-play"></span>',
				placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
				oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1',
				captions: !0,
				captionPlaceholder: 'Type caption (optional)',
				styles: {
					wide: {
						label: '<span class="fa fa-align-justify"></span>'
					},
					left: {
						label: '<span class="fa fa-align-left"></span>'
					},
					right: {
						label: '<span class="fa fa-align-right"></span>'
					}
				},
				actions: {
					remove: {
						label: '<span class="fa fa-times"></span>',
						clicked: function () {
							var t = e.Event('keydown');
							t.which = 8;
							e(i).trigger(t)
						}
					}
				},
				parseOnPaste: !1
			};

		function o(i, s) {
			this.el = i;
			this.$el = e(i);
			this.templates = t.MediumInsert.Templates;
			this.core = this.$el.data('plugin_' + n);
			this.options = e.extend(!0, {}, r, s);
			this._defaults = r;
			this._name = n;
			if (this.core.getEditor()) {
				this.core.getEditor()._serializePreEmbeds = this.core.getEditor().serialize;
				this.core.getEditor().serialize = this.editorSerialize
			}
			;
			this.init()
		};
		o.prototype.init = function () {
			var t = this.$el.find('.medium-insert-embeds');
			t.attr('contenteditable', !1);
			t.each(function () {
				if (e(this).find('.medium-insert-embeds-overlay').length === 0) {
					e(this).append(e('<div />').addClass('medium-insert-embeds-overlay'))
				}
			});
			this.events();
			this.backwardsCompatibility()
		};
		o.prototype.events = function () {
			e(i).on('click', e.proxy(this, 'unselectEmbed')).on('keydown', e.proxy(this, 'removeEmbed')).on('click', '.medium-insert-embeds-toolbar .medium-editor-action', e.proxy(this, 'toolbarAction')).on('click', '.medium-insert-embeds-toolbar2 .medium-editor-action', e.proxy(this, 'toolbar2Action'));
			this.$el.on('keyup click paste', e.proxy(this, 'togglePlaceholder')).on('keydown', e.proxy(this, 'processLink')).on('click', '.medium-insert-embeds-overlay', e.proxy(this, 'selectEmbed')).on('contextmenu', '.medium-insert-embeds-placeholder', e.proxy(this, 'fixRightClickOnPlaceholder'));
			if (this.options.parseOnPaste) {
				this.$el.on('paste', e.proxy(this, 'processPasted'))
			}
		};
		o.prototype.backwardsCompatibility = function () {
			var t = this;
			this.$el.find('.mediumInsert-embeds').removeClass('mediumInsert-embeds').addClass('medium-insert-embeds');
			this.$el.find('.medium-insert-embeds').each(function () {
				if (e(this).find('.medium-insert-embed').length === 0) {
					e(this).after(t.templates['src/js/templates/embeds-wrapper.hbs']({
						html: e(this).html()
					}));
					e(this).remove()
				}
			})
		};
		o.prototype.editorSerialize = function () {
			var t = this._serializePreEmbeds();
			e.each(t, function (i) {
				var s = e('<div />').html(t[i].value);
				s.find('.medium-insert-embeds').removeAttr('contenteditable');
				s.find('.medium-insert-embeds-overlay').remove();
				t[i].value = s.html()
			});
			return t
		};
		o.prototype.add = function () {
			var e = this.$el.find('.medium-insert-active');
			e.html(this.templates['src/js/templates/core-empty-line.hbs']().trim());
			if (e.is('p')) {
				e.replaceWith('<div class="medium-insert-active">' + e.html() + '</div>');
				e = this.$el.find('.medium-insert-active');
				this.core.moveCaret(e)
			}
			;
			e.addClass('medium-insert-embeds medium-insert-embeds-input medium-insert-embeds-active');
			this.togglePlaceholder({
				target: e.get(0)
			});
			e.click();
			this.core.hideButtons()
		};
		o.prototype.togglePlaceholder = function (i) {
			var s = e(i.target),
				n = t.getSelection(),
				r, o, a;
			if (!n || n.rangeCount === 0) {
				return
			}
			;
			r = n.getRangeAt(0);
			o = e(r.commonAncestorContainer);
			if (o.hasClass('medium-insert-embeds-active')) {
				s = o
			} else if (o.closest('.medium-insert-embeds-active').length) {
				s = o.closest('.medium-insert-embeds-active')
			}
			;
			if (s.hasClass('medium-insert-embeds-active')) {
				a = s.text().trim();
				if (a === '' && s.hasClass('medium-insert-embeds-placeholder') === !1) {
					s.addClass('medium-insert-embeds-placeholder').attr('data-placeholder', this.options.placeholder)
				} else if (a !== '' && s.hasClass('medium-insert-embeds-placeholder')) {
					s.removeClass('medium-insert-embeds-placeholder').removeAttr('data-placeholder')
				}
			} else {
				this.$el.find('.medium-insert-embeds-active').remove()
			}
		};
		o.prototype.fixRightClickOnPlaceholder = function (t) {
			this.core.moveCaret(e(t.target))
		};
		o.prototype.processLink = function (e) {
			var i = this.$el.find('.medium-insert-embeds-active'),
				t;
			if (!i.length) {
				return
			}
			;
			t = i.text().trim();
			if (t === '' && [8, 46, 13].indexOf(e.which) !== -1) {
				i.remove();
				return
			}
			;
			if (e.which === 13) {
				e.preventDefault();
				e.stopPropagation();
				if (this.options.oembedProxy) {
					this.oembed(t)
				} else {
					this.parseUrl(t)
				}
			}
		};
		o.prototype.processPasted = function (t) {
			var i, s;
			if (e('.medium-insert-embeds-active').length) {
				return
			}
			;
			i = t.originalEvent.clipboardData.getData('text');
			s = new RegExp('^(http(s?):)?\/\/', 'i');
			if (s.test(i)) {
				if (this.options.oembedProxy) {
					this.oembed(i, !0)
				} else {
					this.parseUrl(i, !0)
				}
			}
		};
		o.prototype.oembed = function (i, s) {
			var o = this;
			e.support.cors = !0;
			e.ajax({
				crossDomain: !0,
				cache: !1,
				url: this.options.oembedProxy,
				dataType: 'json',
				data: {
					url: i
				},
				success: function (t) {
					var n = t && t.html;
					if (t && !n && t.type === 'photo' && t.url) {
						n = '<img src="' + t.url + '" alt="">'
					}
					;
					if (!n) {
						e.proxy(o, 'convertBadEmbed', i)();
						return
					}
					;
					if (s) {
						e.proxy(o, 'embed', n, i)()
					} else {
						e.proxy(o, 'embed', n)()
					}
				},
				error: function (s, n, a) {
					var r = (function () {
						try {
							return JSON.parse(s.responseText)
						} catch (e) {
						}
					})();
					if (typeof t.console !== 'undefined') {
						t.console.log((r && r.error) || s.status || a.message)
					} else {
						t.alert('Error requesting media from ' + o.options.oembedProxy + ' to insert: ' + a + ' (response status: ' + s.status + ')')
					}
					;
					e.proxy(o, 'convertBadEmbed', i)()
				}
			})
		};
		o.prototype.parseUrl = function (t, i) {
			var s;
			if (!(new RegExp(['youtube', 'youtu.be', 'vimeo', 'instagram', 'twitter', 'facebook'].join('|')).test(t))) {
				e.proxy(this, 'convertBadEmbed', t)();
				return !1
			}
			;
			s = t.replace(/\n?/g, '').replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video video-youtube"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>').replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<div class="video video-vimeo"><iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>').replace(/^https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" align="center" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>').replace(/^(https:\/\/www\.facebook\.com\/(.*))$/, '<script src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.2" async></script><div class="fb-post" data-href="$1"><div class="fb-xfbml-parse-ignore"><a href="$1">Loading Facebook post...</a></div></div>').replace(/^https?:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');
			if ((/<("[^"]*"|'[^']*'|[^'">])*>/).test(s) === !1) {
				e.proxy(this, 'convertBadEmbed', t)();
				return !1
			}
			;
			if (i) {
				this.embed(s, t)
			} else {
				this.embed(s)
			}
		};
		o.prototype.embed = function (t, i) {
			var s = this.$el.find('.medium-insert-embeds-active'),
				o;
			if (!t) {
				alert('Incorrect URL format specified');
				return !1
			} else {
				if (t.indexOf('</script>') > -1) {
					o = e('<div>').attr('data-embed-code', t).html(t);
					t = e('<div>').append(o).html()
				}
				;
				if (i) {
					s = this.$el.find(':not(iframe, script, style)').contents().filter(function () {
						return this.nodeType === 3 && this.textContent.indexOf(i) > -1
					}).parent();
					s.after(this.templates['src/js/templates/embeds-wrapper.hbs']({
						html: t
					}));
					s.text(s.text().replace(i, ''))
				} else {
					s.after(this.templates['src/js/templates/embeds-wrapper.hbs']({
						html: t
					}));
					s.remove()
				}
				;
				this.core.triggerInput();
				if (t.indexOf('facebook') !== -1) {
					if (typeof(FB) !== 'undefined') {
						setTimeout(function () {
							FB.XFBML.parse()
						}, 2000)
					}
				}
			}
		};
		o.prototype.convertBadEmbed = function (t) {
			var s, o, i, n = this.templates['src/js/templates/core-empty-line.hbs']().trim();
			s = this.$el.find('.medium-insert-embeds-active');
			i = e(n);
			s.before(i);
			s.remove();
			i.html(t);
			o = e(n);
			i.after(o);
			this.core.triggerInput();
			this.core.moveCaret(o)
		};
		o.prototype.selectEmbed = function (t) {
			var i = this,
				s;
			if (this.core.options.enabled) {
				s = e(t.target).hasClass('medium-insert-embeds') ? e(t.target) : e(t.target).closest('.medium-insert-embeds');
				s.addClass('medium-insert-embeds-selected');
				setTimeout(function () {
					i.addToolbar();
					if (i.options.captions) {
						i.core.addCaption(s.find('figure'), i.options.captionPlaceholder)
					}
				}, 50)
			}
		};
		o.prototype.unselectEmbed = function (t) {
			var i = e(t.target).hasClass('medium-insert-embeds') ? e(t.target) : e(t.target).closest('.medium-insert-embeds'),
				s = this.$el.find('.medium-insert-embeds-selected');
			if (i.hasClass('medium-insert-embeds-selected')) {
				s.not(i).removeClass('medium-insert-embeds-selected');
				e('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
				this.core.removeCaptions(i.find('figcaption'));
				if (e(t.target).is('.medium-insert-caption-placeholder') || e(t.target).is('figcaption')) {
					i.removeClass('medium-insert-embeds-selected');
					this.core.removeCaptionPlaceholder(i.find('figure'))
				}
				;
				return
			}
			;
			s.removeClass('medium-insert-embeds-selected');
			e('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
			if (e(t.target).is('.medium-insert-caption-placeholder')) {
				this.core.removeCaptionPlaceholder(i.find('figure'))
			} else if (e(t.target).is('figcaption') === !1) {
				this.core.removeCaptions()
			}
		};
		o.prototype.removeEmbed = function (t) {
			var i, s;
			if (t.which === 8 || t.which === 46) {
				i = this.$el.find('.medium-insert-embeds-selected');
				if (i.length) {
					t.preventDefault();
					e('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
					s = e(this.templates['src/js/templates/core-empty-line.hbs']().trim());
					i.before(s);
					i.remove();
					this.core.hideAddons();
					this.core.moveCaret(s);
					this.core.triggerInput()
				}
			}
		};
		o.prototype.addToolbar = function () {
			var t = this.$el.find('.medium-insert-embeds-selected'),
				n = !1,
				i, o, s, a, r;
			if (t.length === 0) {
				return
			}
			;
			a = this.core.getEditor();
			r = a.options.elementsContainer || 'body';
			e(r).append(this.templates['src/js/templates/embeds-toolbar.hbs']({
				styles: this.options.styles,
				actions: this.options.actions
			}).trim());
			i = e('.medium-insert-embeds-toolbar');
			o = e('.medium-insert-embeds-toolbar2');
			s = t.offset().top - i.height() - 8 - 2 - 5;
			if (s < 0) {
				s = 0
			}
			;
			i.css({
				top: s,
				left: t.offset().left + t.width() / 2 - i.width() / 2
			}).show();
			o.css({
				top: t.offset().top + 2,
				left: t.offset().left + t.width() - o.width() - 4
			}).show();
			i.find('button').each(function () {
				if (t.hasClass('medium-insert-embeds-' + e(this).data('action'))) {
					e(this).addClass('medium-editor-button-active');
					n = !0
				}
			});
			if (n === !1) {
				i.find('button').first().addClass('medium-editor-button-active')
			}
		};
		o.prototype.toolbarAction = function (t) {
			var o = e(t.target).is('button') ? e(t.target) : e(t.target).closest('button'),
				n = o.closest('li'),
				a = n.closest('ul'),
				r = a.find('li'),
				i = this.$el.find('.medium-insert-embeds-selected'),
				s = this;
			o.addClass('medium-editor-button-active');
			n.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');
			r.find('button').each(function () {
				var t = 'medium-insert-embeds-' + e(this).data('action');
				if (e(this).hasClass('medium-editor-button-active')) {
					i.addClass(t);
					if (s.options.styles[e(this).data('action')].added) {
						s.options.styles[e(this).data('action')].added(i)
					}
				} else {
					i.removeClass(t);
					if (s.options.styles[e(this).data('action')].removed) {
						s.options.styles[e(this).data('action')].removed(i)
					}
				}
			});
			this.core.triggerInput()
		};
		o.prototype.toolbar2Action = function (t) {
			var s = e(t.target).is('button') ? e(t.target) : e(t.target).closest('button'),
				i = this.options.actions[s.data('action')].clicked;
			if (i) {
				i(this.$el.find('.medium-insert-embeds-selected'))
			}
			;
			this.core.triggerInput()
		};
		e.fn[n + a] = function (t) {
			return this.each(function () {
				if (!e.data(this, 'plugin_' + n + a)) {
					e.data(this, 'plugin_' + n + a, new o(this, t))
				}
			})
		}
	})(jQuery, window, document);
	(function (e, t, s, o, n) {
		'use strict';
		var r = 'mediumInsert',
			l = 'Images',
			d = {
				label: '<span class="fa fa-camera"></span>',
				deleteMethod: 'POST',
				deleteScript: 'delete.php',
				preview: !0,
				captions: !0,
				captionPlaceholder: 'Type caption for image (optional)',
				autoGrid: 3,
				fileUploadOptions: {
					url: 'upload.php',
					acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
				},
				fileDeleteOptions: {},
				styles: {
					wide: {
						label: '<span class="fa fa-align-justify"></span>'
					},
					left: {
						label: '<span class="fa fa-align-left"></span>'
					},
					right: {
						label: '<span class="fa fa-align-right"></span>'
					},
					grid: {
						label: '<span class="fa fa-th"></span>'
					}
				},
				actions: {
					remove: {
						label: '<span class="fa fa-times"></span>',
						clicked: function () {
							var t = e.Event('keydown');
							t.which = 8;
							e(s).trigger(t)
						}
					}
				},
				sorting: function () {
					var t = this;
					e('.medium-insert-images').sortable({
						group: 'medium-insert-images',
						containerSelector: '.medium-insert-images',
						itemSelector: 'figure',
						placeholder: '<figure class="placeholder">',
						handle: 'img',
						nested: !1,
						vertical: !1,
						afterMove: function () {
							t.core.triggerInput()
						}
					})
				},
				messages: {
					acceptFileTypesError: 'This file is not in a supported format: ',
					maxFileSizeError: 'This file is too big: '
				}
			};

		function a(i, s) {
			this.el = i;
			this.$el = e(i);
			this.$currentImage = null;
			this.templates = t.MediumInsert.Templates;
			this.core = this.$el.data('plugin_' + r);
			this.options = e.extend(!0, {}, d, s);
			this._defaults = d;
			this._name = r;
			if (this.options.preview && !t.FileReader) {
				this.options.preview = !1
			}
			;
			if (this.core.getEditor()) {
				this.core.getEditor()._serializePreImages = this.core.getEditor().serialize;
				this.core.getEditor().serialize = this.editorSerialize
			}
			;
			this.init()
		};
		a.prototype.init = function () {
			var e = this.$el.find('.medium-insert-images');
			e.find('figcaption').attr('contenteditable', !0);
			e.find('figure').attr('contenteditable', !1);
			this.events();
			this.backwardsCompatibility();
			this.sorting()
		};
		a.prototype.events = function () {
			e(s).on('click', e.proxy(this, 'unselectImage')).on('keydown', e.proxy(this, 'removeImage')).on('click', '.medium-insert-images-toolbar .medium-editor-action', e.proxy(this, 'toolbarAction')).on('click', '.medium-insert-images-toolbar2 .medium-editor-action', e.proxy(this, 'toolbar2Action'));
			this.$el.on('click', '.medium-insert-images img', e.proxy(this, 'selectImage'))
		};
		a.prototype.backwardsCompatibility = function () {
			this.$el.find('.mediumInsert').removeClass('mediumInsert').addClass('medium-insert-images');
			this.$el.find('.medium-insert-images.small').removeClass('small').addClass('medium-insert-images-left')
		};
		a.prototype.editorSerialize = function () {
			var t = this._serializePreImages();
			e.each(t, function (i) {
				var s = e('<div />').html(t[i].value);
				s.find('.medium-insert-images').find('figcaption, figure').removeAttr('contenteditable');
				t[i].value = s.html()
			});
			return t
		};
		a.prototype.add = function () {
			var t = this,
				s = e(this.templates['src/js/templates/images-fileupload.hbs']()),
				i = {
					dataType: 'json',
					add: function (i, s) {
						e.proxy(t, 'uploadAdd', i, s)()
					},
					done: function (i, s) {
						e.proxy(t, 'uploadDone', i, s)()
					}
				};
			if (new XMLHttpRequest().upload) {
				i.progress = function (i, s) {
					e.proxy(t, 'uploadProgress', i, s)()
				};
				i.progressall = function (i, s) {
					e.proxy(t, 'uploadProgressall', i, s)()
				}
			}
			;
			s.fileupload(e.extend(!0, {}, this.options.fileUploadOptions, i));
			s.click()
		};
		a.prototype.uploadAdd = function (t, i) {
			var s = this.$el.find('.medium-insert-active'),
				r = this,
				o = [],
				n = i.files[0],
				l = this.options.fileUploadOptions.acceptFileTypes,
				d = this.options.fileUploadOptions.maxFileSize,
				a;
			if (l && !l.test(n.type)) {
				o.push(this.options.messages.acceptFileTypesError + n.name)
			} else if (d && n.size > d) {
				o.push(this.options.messages.maxFileSizeError + n.name)
			}
			;
			if (o.length > 0) {
				alert(o.join('\n'));
				return
			}
			;
			this.core.hideButtons();
			if (s.is('p')) {
				s.replaceWith('<div class="medium-insert-active">' + s.html() + '</div>');
				s = this.$el.find('.medium-insert-active');
				if (s.next().is('p')) {
					this.core.moveCaret(s.next())
				} else {
					s.after('<p><br></p>');
					this.core.moveCaret(s.next())
				}
			}
			;
			s.addClass('medium-insert-images');
			if (this.options.preview === !1 && s.find('progress').length === 0 && (new XMLHttpRequest().upload)) {
				s.append(this.templates['src/js/templates/images-progressbar.hbs']())
			}
			;
			if (i.autoUpload || (i.autoUpload !== !1 && e(t.target).fileupload('option', 'autoUpload'))) {
				i.process().done(function () {
					if (r.options.preview) {
						a = new FileReader();
						a.onload = function (t) {
							e.proxy(r, 'showImage', t.target.result, i)()
						};
						a.readAsDataURL(i.files[0])
					} else {
						i.submit()
					}
				})
			}
		};
		a.prototype.uploadProgressall = function (e, t) {
			var i, s;
			if (this.options.preview === !1) {
				i = parseInt(t.loaded / t.total * 100, 10);
				s = this.$el.find('.medium-insert-active').find('progress');
				s.attr('value', i).text(i);
				if (i === 100) {
					s.remove()
				}
			}
		};
		a.prototype.uploadProgress = function (e, t) {
			var i, s;
			if (this.options.preview) {
				i = 100 - parseInt(t.loaded / t.total * 100, 10);
				s = t.context.find('.medium-insert-images-progress');
				s.css('width', i + '%');
				if (i === 0) {
					s.remove()
				}
			}
		};
		a.prototype.uploadDone = function (t, i) {
			e.proxy(this, 'showImage', i.result.files[0].url, i)();
			this.core.clean();
			this.sorting()
		};
		a.prototype.showImage = function (t, i) {
			var s = this.$el.find('.medium-insert-active'),
				o, n;
			s.click();
			n = this;
			if (this.options.preview && i.context) {
				o = this.getDOMImage();
				o.onload = function () {
					i.context.find('img').attr('src', o.src);
					if (this.options.uploadCompleted) {
						this.options.uploadCompleted(i.context, i)
					}
					;
					n.core.triggerInput()
				}.bind(this);
				o.src = t
			} else {
				i.context = e(this.templates['src/js/templates/images-image.hbs']({
					img: t,
					progress: this.options.preview
				})).appendTo(s);
				s.find('br').remove();
				if (this.options.autoGrid && s.find('figure').length >= this.options.autoGrid) {
					e.each(this.options.styles, function (e, t) {
						var i = 'medium-insert-images-' + e;
						s.removeClass(i);
						if (t.removed) {
							t.removed(s)
						}
					});
					s.addClass('medium-insert-images-grid');
					if (this.options.styles.grid.added) {
						this.options.styles.grid.added(s)
					}
				}
				;
				if (this.options.preview) {
					i.submit()
				} else if (this.options.uploadCompleted) {
					this.options.uploadCompleted(i.context, i)
				}
			}
			;
			this.core.triggerInput();
			return i.context
		};
		a.prototype.getDOMImage = function () {
			return new t.Image()
		};
		a.prototype.selectImage = function (t) {
			var s = this,
				i;
			if (this.core.options.enabled) {
				i = e(t.target);
				this.$currentImage = i;
				this.$el.blur();
				i.addClass('medium-insert-image-active');
				i.closest('.medium-insert-images').addClass('medium-insert-active');
				setTimeout(function () {
					s.addToolbar();
					if (s.options.captions) {
						s.core.addCaption(i.closest('figure'), s.options.captionPlaceholder)
					}
				}, 50)
			}
		};
		a.prototype.unselectImage = function (t) {
			var i = e(t.target),
				s = this.$el.find('.medium-insert-image-active');
			if (i.is('img') && i.hasClass('medium-insert-image-active')) {
				s.not(i).removeClass('medium-insert-image-active');
				e('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();
				this.core.removeCaptions(i);
				return
			}
			;
			s.removeClass('medium-insert-image-active');
			e('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();
			if (i.is('.medium-insert-caption-placeholder')) {
				this.core.removeCaptionPlaceholder(s.closest('figure'))
			} else if (i.is('figcaption') === !1) {
				this.core.removeCaptions()
			}
			;
			this.$currentImage = null
		};
		a.prototype.removeImage = function (o) {
			var n = [],
				f = this.$el.find('.medium-insert-image-active'),
				l, a, u, g, d, h, c, m, p, r;
			if (o.which === 8 || o.which === 46) {
				if (f.length) {
					n.push(f)
				}
				;
				u = t.getSelection();
				if (u && u.rangeCount) {
					g = u.getRangeAt(0);
					d = g.commonAncestorContainer;
					c = d.nodeName === '#text' ? e(d).parent() : e(d);
					h = i.selection.getCaretOffsets(d).left;
					if (o.which === 8 && h === 0) {
						m = c.prev()
					} else if (o.which === 46 && h === c.text().length) {
						m = c.next()
					}
					;
					if (m && m.hasClass('medium-insert-images')) {
						n.push(m.find('img'))
					}
					;
					p = i.selection.getSelectionHtml(s);
					if (p) {
						e('<div></div>').html(p).find('.medium-insert-images img').each(function () {
							n.push(e(this))
						})
					}
				}
				;
				if (n.length) {
					for (r = 0; r < n.length; r++) {
						this.deleteFile(n[r].attr('src'));
						l = n[r].closest('.medium-insert-images');
						n[r].closest('figure').remove();
						if (l.find('figure').length === 0) {
							a = l.next();
							if (a.is('p') === !1 || a.text() !== '') {
								a = e(this.templates['src/js/templates/core-empty-line.hbs']().trim());
								l.before(a)
							}
							;
							l.remove()
						}
					}
					;
					this.core.hideAddons();
					if (!p && a) {
						o.preventDefault();
						this.core.moveCaret(a)
					}
					;
					e('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();
					this.core.triggerInput()
				}
			}
		};
		a.prototype.deleteFile = function (t) {
			if (this.options.deleteScript) {
				e.ajax(e.extend(!0, {}, {
					url: this.options.deleteScript,
					type: this.options.deleteMethod || 'POST',
					data: {
						file: t
					}
				}, this.options.fileDeleteOptions))
			}
		};
		a.prototype.addToolbar = function () {
			var t = this.$el.find('.medium-insert-image-active'),
				a = t.closest('.medium-insert-images'),
				n = !1,
				r = this.core.getEditor(),
				l = r.options.elementsContainer || 'body',
				i, o, s;
			e(l).append(this.templates['src/js/templates/images-toolbar.hbs']({
				styles: this.options.styles,
				actions: this.options.actions
			}).trim());
			i = e('.medium-insert-images-toolbar');
			o = e('.medium-insert-images-toolbar2');
			s = t.offset().top - i.height() - 8 - 2 - 5;
			if (s < 0) {
				s = 0
			}
			;
			i.css({
				top: s,
				left: t.offset().left + t.width() / 2 - i.width() / 2
			}).show();
			o.css({
				top: t.offset().top + 2,
				left: t.offset().left + t.width() - o.width() - 4
			}).show();
			i.find('button').each(function () {
				if (a.hasClass('medium-insert-images-' + e(this).data('action'))) {
					e(this).addClass('medium-editor-button-active');
					n = !0
				}
			});
			if (n === !1) {
				i.find('button').first().addClass('medium-editor-button-active')
			}
		};
		a.prototype.toolbarAction = function (t) {
			var s = this,
				o, n, a, r, i;
			if (this.$currentImage === null) {
				return
			}
			;
			o = e(t.target).is('button') ? e(t.target) : e(t.target).closest('button');
			n = o.closest('li');
			a = n.closest('ul');
			r = a.find('li');
			i = this.$el.find('.medium-insert-active');
			o.addClass('medium-editor-button-active');
			n.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');
			r.find('button').each(function () {
				var t = 'medium-insert-images-' + e(this).data('action');
				if (e(this).hasClass('medium-editor-button-active')) {
					i.addClass(t);
					if (s.options.styles[e(this).data('action')].added) {
						s.options.styles[e(this).data('action')].added(i)
					}
				} else {
					i.removeClass(t);
					if (s.options.styles[e(this).data('action')].removed) {
						s.options.styles[e(this).data('action')].removed(i)
					}
				}
			});
			this.core.hideButtons();
			this.core.triggerInput()
		};
		a.prototype.toolbar2Action = function (t) {
			var s, i;
			if (this.$currentImage === null) {
				return
			}
			;
			s = e(t.target).is('button') ? e(t.target) : e(t.target).closest('button');
			i = this.options.actions[s.data('action')].clicked;
			if (i) {
				i(this.$el.find('.medium-insert-image-active'))
			}
			;
			this.core.hideButtons();
			this.core.triggerInput()
		};
		a.prototype.sorting = function () {
			e.proxy(this.options.sorting, this)()
		};
		e.fn[r + l] = function (t) {
			return this.each(function () {
				if (!e.data(this, 'plugin_' + r + l)) {
					e.data(this, 'plugin_' + r + l, new a(this, t))
				}
			})
		}
	})(jQuery, window, document, i.util)
}));
