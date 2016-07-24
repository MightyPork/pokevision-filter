
(function (e, t) {
	'use strict';
	if (typeof module === 'object') {
		module.exports = t
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return t
		})
	} else {
		e.MediumEditor = t
	}
}(this, function () {
	'use strict';

	function e(e, t) {
		'use strict';
		return this.init(e, t)
	};
	e.extensions = {};
	(function (t) {
		'use strict';

		function a(e, t) {
			var i, s = Array.prototype.slice.call(arguments, 2);
			t = t || {};
			for (var o = 0; o < s.length; o++) {
				var n = s[o];
				if (n) {
					for (i in n) {
						if (n.hasOwnProperty(i) && typeof n[i] !== 'undefined' && (e || t.hasOwnProperty(i) === !1)) {
							t[i] = n[i]
						}
					}
				}
			}
			;
			return t
		};
		var r = !1;
		try {
			var o = document.createElement('div'),
				s = document.createTextNode(' ');
			o.appendChild(s);
			r = o.contains(s)
		} catch (n) {
		}
		;
		var i = {
			isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) !== null))),
			isEdge: (/Edge\/\d+/).exec(navigator.userAgent) !== null,
			isFF: (navigator.userAgent.toLowerCase().indexOf('firefox') > -1),
			isMac: (t.navigator.platform.toUpperCase().indexOf('MAC') >= 0),
			keyCode: {
				BACKSPACE: 8,
				TAB: 9,
				ENTER: 13,
				ESCAPE: 27,
				SPACE: 32,
				DELETE: 46,
				K: 75,
				M: 77
			},
			isMetaCtrlKey: function (e) {
				if ((i.isMac && e.metaKey) || (!i.isMac && e.ctrlKey)) {
					return !0
				}
				;
				return !1
			},
			isKey: function (e, t) {
				var n = i.getKeyCode(e);
				if (!1 === Array.isArray(t)) {
					return n === t
				}
				;
				if (-1 === t.indexOf(n)) {
					return !1
				}
				;
				return !0
			},
			getKeyCode: function (e) {
				var t = e.which;
				if (null === t) {
					t = e.charCode !== null ? e.charCode : e.keyCode
				}
				;
				return t
			},
			blockContainerElementNames: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'li', 'ol', 'address', 'article', 'aside', 'audio', 'canvas', 'dd', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'header', 'hgroup', 'main', 'nav', 'noscript', 'output', 'section', 'video', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
			emptyElementNames: ['br', 'col', 'colgroup', 'hr', 'img', 'input', 'source', 'wbr'],
			extend: function () {
				var e = [!0].concat(Array.prototype.slice.call(arguments));
				return a.apply(this, e)
			},
			defaults: function () {
				var e = [!1].concat(Array.prototype.slice.call(arguments));
				return a.apply(this, e)
			},
			createLink: function (e, t, n, o) {
				var s = e.createElement('a');
				i.moveTextRangeIntoElement(t[0], t[t.length - 1], s);
				s.setAttribute('href', n);
				if (o) {
					s.setAttribute('target', o)
				}
				;
				return s
			},
			findOrCreateMatchingTextNodes: function (e, t, n) {
				var c = e.createTreeWalker(t, NodeFilter.SHOW_ALL, null, !1),
					l = [],
					r = 0,
					s = !1,
					o = null,
					a = null;
				while ((o = c.nextNode()) !== null) {
					if (o.nodeType > 3) {
						continue
					} else if (o.nodeType === 3) {
						if (!s && n.start < (r + o.nodeValue.length)) {
							s = !0;
							a = i.splitStartNodeIfNeeded(o, n.start, r)
						}
						;
						if (s) {
							i.splitEndNodeIfNeeded(o, a, n.end, r)
						}
						;
						if (s && r === n.end) {
							break
						} else if (s && r > (n.end + 1)) {
							throw new Error('PerformLinking overshot the target!')
						}
						;
						if (s) {
							l.push(a || o)
						}
						;
						r += o.nodeValue.length;
						if (a !== null) {
							r += a.nodeValue.length;
							c.nextNode()
						}
						;
						a = null
					} else if (o.tagName.toLowerCase() === 'img') {
						if (!s && (n.start <= r)) {
							s = !0
						}
						;
						if (s) {
							l.push(o)
						}
					}
				}
				;
				return l
			},
			splitStartNodeIfNeeded: function (e, t, i) {
				if (t !== i) {
					return e.splitText(t - i)
				}
				;
				return null
			},
			splitEndNodeIfNeeded: function (e, t, i, n) {
				var o, s;
				o = n + (t || e).nodeValue.length + (t ? e.nodeValue.length : 0) - 1;
				s = (t || e).nodeValue.length - (o + 1 - i);
				if (o >= i && n !== o && s !== 0) {
					(t || e).splitText(s)
				}
			},
			splitByBlockElements: function (t) {
				if (t.nodeType !== 3 && t.nodeType !== 1) {
					return []
				}
				;
				var n = [],
					s = e.util.blockContainerElementNames.join(',');
				if (t.nodeType === 3 || t.querySelectorAll(s).length === 0) {
					return [t]
				}
				;
				for (var o = 0; o < t.childNodes.length; o++) {
					var i = t.childNodes[o];
					if (i.nodeType === 3) {
						n.push(i)
					} else if (i.nodeType === 1) {
						var r = i.querySelectorAll(s);
						if (r.length === 0) {
							n.push(i)
						} else {
							n = n.concat(e.util.splitByBlockElements(i))
						}
					}
				}
				;
				return n
			},
			findAdjacentTextNodeWithContent: function (e, t, i) {
				var o = !1,
					n, s = i.createNodeIterator(e, NodeFilter.SHOW_TEXT, null, !1);
				n = s.nextNode();
				while (n) {
					if (n === t) {
						o = !0
					} else if (o) {
						if (n.nodeType === 3 && n.nodeValue && n.nodeValue.trim().length > 0) {
							break
						}
					}
					;
					n = s.nextNode()
				}
				;
				return n
			},
			findPreviousSibling: function (e) {
				if (!e || i.isMediumEditorElement(e)) {
					return !1
				}
				;
				var t = e.previousSibling;
				while (!t && !i.isMediumEditorElement(e.parentNode)) {
					e = e.parentNode;
					t = e.previousSibling
				}
				;
				return t
			},
			isDescendant: function (e, t, i) {
				if (!e || !t) {
					return !1
				}
				;
				if (e === t) {
					return !!i
				}
				;
				if (e.nodeType !== 1) {
					return !1
				}
				;
				if (r || t.nodeType !== 3) {
					return e.contains(t)
				}
				;
				var n = t.parentNode;
				while (n !== null) {
					if (n === e) {
						return !0
					}
					;
					n = n.parentNode
				}
				;
				return !1
			},
			isElement: function (e) {
				return !!(e && e.nodeType === 1)
			},
			throttle: function (e, t) {
				var a = 50,
					n, o, s, i = null,
					r = 0,
					l = function () {
						r = Date.now();
						i = null;
						s = e.apply(n, o);
						if (!i) {
							n = o = null
						}
					};
				if (!t && t !== 0) {
					t = a
				}
				;
				return function () {
					var c = Date.now(),
						a = t - (c - r);
					n = this;
					o = arguments;
					if (a <= 0 || a > t) {
						if (i) {
							clearTimeout(i);
							i = null
						}
						;
						r = c;
						s = e.apply(n, o);
						if (!i) {
							n = o = null
						}
					} else if (!i) {
						i = setTimeout(l, a)
					}
					;
					return s
				}
			},
			traverseUp: function (e, t) {
				if (!e) {
					return !1
				}
				;
				do {
					if (e.nodeType === 1) {
						if (t(e)) {
							return e
						}
						;
						if (i.isMediumEditorElement(e)) {
							return !1
						}
					}
					;
					e = e.parentNode
				}
				while (e);
				return !1
			},
			htmlEntities: function (e) {
				return String(e).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
			},
			insertHTMLCommand: function (t, n) {
				var r, s, l, c, h, u, o, d = !1,
					f = ['insertHTML', !1, n];
				if (!e.util.isEdge && t.queryCommandSupported('insertHTML')) {
					try {
						return t.execCommand.apply(t, f)
					} catch (a) {
					}
				}
				;
				r = t.getSelection();
				if (r.rangeCount) {
					s = r.getRangeAt(0);
					o = s.commonAncestorContainer;
					if (i.isMediumEditorElement(o) && !o.firstChild) {
						s.selectNode(o.appendChild(t.createTextNode('')))
					} else if ((o.nodeType === 3 && s.startOffset === 0 && s.endOffset === o.nodeValue.length) || (o.nodeType !== 3 && o.innerHTML === s.toString())) {
						while (!i.isMediumEditorElement(o) && o.parentNode && o.parentNode.childNodes.length === 1 && !i.isMediumEditorElement(o.parentNode)) {
							o = o.parentNode
						}
						;
						s.selectNode(o)
					}
					;
					s.deleteContents();
					l = t.createElement('div');
					l.innerHTML = n;
					c = t.createDocumentFragment();
					while (l.firstChild) {
						h = l.firstChild;
						u = c.appendChild(h)
					}
					;
					s.insertNode(c);
					if (u) {
						s = s.cloneRange();
						s.setStartAfter(u);
						s.collapse(!0);
						r.removeAllRanges();
						r.addRange(s)
					}
					;
					d = !0
				}
				;
				if (t.execCommand.callListeners) {
					t.execCommand.callListeners(f, d)
				}
				;
				return d
			},
			execFormatBlock: function (t, n) {
				var o = i.getTopBlockContainer(e.selection.getSelectionStart(t)),
					s;
				if (n === 'blockquote') {
					if (o) {
						s = Array.prototype.slice.call(o.childNodes);
						if (s.some(function (e) {
								return i.isBlockContainer(e)
							})) {
							return t.execCommand('outdent', !1, null)
						}
					}
					;
					if (i.isIE) {
						return t.execCommand('indent', !1, n)
					}
				}
				;
				if (o && n === o.nodeName.toLowerCase()) {
					n = 'p'
				}
				;
				if (i.isIE) {
					n = '<' + n + '>'
				}
				;
				if (o && o.nodeName.toLowerCase() === 'blockquote') {
					if (i.isIE && n === '<p>') {
						return t.execCommand('outdent', !1, n)
					}
					;
					if ((i.isFF || i.isEdge) && n === 'p') {
						s = Array.prototype.slice.call(o.childNodes);
						if (s.some(function (e) {
								return !i.isBlockContainer(e)
							})) {
							t.execCommand('formatBlock', !1, n)
						}
						;
						return t.execCommand('outdent', !1, n)
					}
				}
				;
				return t.execCommand('formatBlock', !1, n)
			},
			setTargetBlank: function (e, t) {
				var i, n = t || !1;
				if (e.nodeName.toLowerCase() === 'a') {
					e.target = '_blank'
				} else {
					e = e.getElementsByTagName('a');
					for (i = 0; i < e.length; i += 1) {
						if (!1 === n || n === e[i].attributes.href.value) {
							e[i].target = '_blank'
						}
					}
				}
			},
			removeTargetBlank: function (e, t) {
				var i;
				if (e.nodeName.toLowerCase() === 'a') {
					e.removeAttribute('target')
				} else {
					e = e.getElementsByTagName('a');
					for (i = 0; i < e.length; i += 1) {
						if (t === e[i].attributes.href.value) {
							e[i].removeAttribute('target')
						}
					}
				}
			},
			addClassToAnchors: function (e, t) {
				var n = t.split(' '),
					o, i;
				if (e.nodeName.toLowerCase() === 'a') {
					for (i = 0; i < n.length; i += 1) {
						e.classList.add(n[i])
					}
				} else {
					e = e.getElementsByTagName('a');
					for (o = 0; o < e.length; o += 1) {
						for (i = 0; i < n.length; i += 1) {
							e[o].classList.add(n[i])
						}
					}
				}
			},
			isListItem: function (e) {
				if (!e) {
					return !1
				}
				;
				if (e.nodeName.toLowerCase() === 'li') {
					return !0
				}
				;
				var t = e.parentNode,
					n = t.nodeName.toLowerCase();
				while (n === 'li' || (!i.isBlockContainer(t) && n !== 'div')) {
					if (n === 'li') {
						return !0
					}
					;
					t = t.parentNode;
					if (t) {
						n = t.nodeName.toLowerCase()
					} else {
						return !1
					}
				}
				;
				return !1
			},
			cleanListDOM: function (t, n) {
				if (n.nodeName.toLowerCase() !== 'li') {
					return
				}
				;
				var o = n.parentElement;
				if (o.parentElement.nodeName.toLowerCase() === 'p') {
					i.unwrap(o.parentElement, t);
					e.selection.moveCursor(t, n.firstChild, n.firstChild.textContent.length)
				}
			},
			splitOffDOMTree: function (e, t, i) {
				var s = t,
					o = null,
					l = !i;
				while (s !== e) {
					var r = s.parentNode,
						u = r.cloneNode(!1),
						n = (l ? s : r.firstChild),
						a;
					if (o) {
						if (l) {
							u.appendChild(o)
						} else {
							a = o
						}
					}
					;
					o = u;
					while (n) {
						var c = n.nextSibling;
						if (n === s) {
							if (!n.hasChildNodes()) {
								n.parentNode.removeChild(n)
							} else {
								n = n.cloneNode(!1)
							}
							;
							if (n.textContent) {
								o.appendChild(n)
							}
							;
							n = (l ? c : null)
						} else {
							n.parentNode.removeChild(n);
							if (n.hasChildNodes() || n.textContent) {
								o.appendChild(n)
							}
							;
							n = c
						}
					}
					;
					if (a) {
						o.appendChild(a)
					}
					;
					s = r
				}
				;
				return o
			},
			moveTextRangeIntoElement: function (e, t, n) {
				if (!e || !t) {
					return !1
				}
				;
				var s = i.findCommonRoot(e, t);
				if (!s) {
					return !1
				}
				;
				if (t === e) {
					var u = e.parentNode,
						f = e.nextSibling;
					u.removeChild(e);
					n.appendChild(e);
					if (f) {
						u.insertBefore(n, f)
					} else {
						u.appendChild(n)
					}
					;
					return n.hasChildNodes()
				}
				;
				var h = [],
					r, o, l;
				for (var c = 0; c < s.childNodes.length; c++) {
					l = s.childNodes[c];
					if (!r) {
						if (i.isDescendant(l, e, !0)) {
							r = l
						}
					} else {
						if (i.isDescendant(l, t, !0)) {
							o = l;
							break
						} else {
							h.push(l)
						}
					}
				}
				;
				var d = o.nextSibling,
					a = s.ownerDocument.createDocumentFragment();
				if (r === e) {
					r.parentNode.removeChild(r);
					a.appendChild(r)
				} else {
					a.appendChild(i.splitOffDOMTree(r, e))
				}
				;
				h.forEach(function (e) {
					e.parentNode.removeChild(e);
					a.appendChild(e)
				});
				if (o === t) {
					o.parentNode.removeChild(o);
					a.appendChild(o)
				} else {
					a.appendChild(i.splitOffDOMTree(o, t, !0))
				}
				;
				n.appendChild(a);
				if (o.parentNode === s) {
					s.insertBefore(n, o)
				} else if (d) {
					s.insertBefore(n, d)
				} else {
					s.appendChild(n)
				}
				;
				return n.hasChildNodes()
			},
			depthOfNode: function (e) {
				var i = 0,
					t = e;
				while (t.parentNode !== null) {
					t = t.parentNode;
					i++
				}
				;
				return i
			},
			findCommonRoot: function (e, t) {
				var s = i.depthOfNode(e),
					r = i.depthOfNode(t),
					n = e,
					o = t;
				while (s !== r) {
					if (s > r) {
						n = n.parentNode;
						s -= 1
					} else {
						o = o.parentNode;
						r -= 1
					}
				}
				while (n !== o) {
					n = n.parentNode;
					o = o.parentNode
				}
				;
				return n
			},
			isElementAtBeginningOfBlock: function (e) {
				var n, t;
				while (!i.isBlockContainer(e) && !i.isMediumEditorElement(e)) {
					t = e;
					while (t = t.previousSibling) {
						n = t.nodeType === 3 ? t.nodeValue : t.textContent;
						if (n.length > 0) {
							return !1
						}
					}
					;
					e = e.parentNode
				}
				;
				return !0
			},
			isMediumEditorElement: function (e) {
				return e && e.getAttribute && !!e.getAttribute('data-medium-editor-element')
			},
			getContainerEditorElement: function (e) {
				return i.traverseUp(e, function (e) {
					return i.isMediumEditorElement(e)
				})
			},
			isBlockContainer: function (e) {
				return e && e.nodeType !== 3 && i.blockContainerElementNames.indexOf(e.nodeName.toLowerCase()) !== -1
			},
			getClosestBlockContainer: function (e) {
				return i.traverseUp(e, function (e) {
					return i.isBlockContainer(e) || i.isMediumEditorElement(e)
				})
			},
			getTopBlockContainer: function (e) {
				var t = i.isBlockContainer(e) ? e : !1;
				i.traverseUp(e, function (e) {
					if (i.isBlockContainer(e)) {
						t = e
					}
					;
					if (!t && i.isMediumEditorElement(e)) {
						t = e;
						return !0
					}
					;
					return !1
				});
				return t
			},
			getFirstSelectableLeafNode: function (e) {
				while (e && e.firstChild) {
					e = e.firstChild
				}
				;
				e = i.traverseUp(e, function (e) {
					return i.emptyElementNames.indexOf(e.nodeName.toLowerCase()) === -1
				});
				if (e.nodeName.toLowerCase() === 'table') {
					var t = e.querySelector('th, td');
					if (t) {
						e = t
					}
				}
				;
				return e
			},
			getFirstTextNode: function (e) {
				i.warn('getFirstTextNode is deprecated and will be removed in version 6.0.0');
				return i._getFirstTextNode(e)
			},
			_getFirstTextNode: function (e) {
				if (e.nodeType === 3) {
					return e
				}
				;
				for (var t = 0; t < e.childNodes.length; t++) {
					var n = i._getFirstTextNode(e.childNodes[t]);
					if (n !== null) {
						return n
					}
				}
				;
				return null
			},
			ensureUrlHasProtocol: function (e) {
				if (e.indexOf('://') === -1) {
					return 'http://' + e
				}
				;
				return e
			},
			warn: function () {
				if (t.console !== undefined && typeof t.console.warn === 'function') {
					t.console.warn.apply(t.console, arguments)
				}
			},
			deprecated: function (e, t, n) {
				var o = e + ' is deprecated, please use ' + t + ' instead.';
				if (n) {
					o += ' Will be removed in ' + n
				}
				;
				i.warn(o)
			},
			deprecatedMethod: function (e, t, n, o) {
				i.deprecated(e, t, o);
				if (typeof this[t] === 'function') {
					this[t].apply(this, n)
				}
			},
			cleanupAttrs: function (e, t) {
				t.forEach(function (t) {
					e.removeAttribute(t)
				})
			},
			cleanupTags: function (e, t) {
				t.forEach(function (t) {
					if (e.nodeName.toLowerCase() === t) {
						e.parentNode.removeChild(e)
					}
				})
			},
			getClosestTag: function (e, t) {
				return i.traverseUp(e, function (e) {
					return e.nodeName.toLowerCase() === t.toLowerCase()
				})
			},
			unwrap: function (e, t) {
				var n = t.createDocumentFragment(),
					o = Array.prototype.slice.call(e.childNodes);
				for (var i = 0; i < o.length; i++) {
					n.appendChild(o[i])
				}
				;
				if (n.childNodes.length) {
					e.parentNode.replaceChild(n, e)
				} else {
					e.parentNode.removeChild(e)
				}
			}
		};
		e.util = i
	}(window));
	(function () {
		'use strict';
		var t = function (t) {
			e.util.extend(this, t)
		};
		t.extend = function (t) {
			var n = this,
				i;
			if (t && t.hasOwnProperty('constructor')) {
				i = t.constructor
			} else {
				i = function () {
					return n.apply(this, arguments)
				}
			}
			;
			e.util.extend(i, n);
			var o = function () {
				this.constructor = i
			};
			o.prototype = n.prototype;
			i.prototype = new o();
			if (t) {
				e.util.extend(i.prototype, t)
			}
			;
			return i
		};
		t.prototype = {
			init: function () {
			},
			base: undefined,
			name: undefined,
			checkState: undefined,
			destroy: undefined,
			queryCommandState: undefined,
			isActive: undefined,
			isAlreadyApplied: undefined,
			setActive: undefined,
			setInactive: undefined,
			'window': undefined,
			'document': undefined,
			getEditorElements: function () {
				return this.base.elements
			},
			getEditorId: function () {
				return this.base.id
			},
			getEditorOption: function (e) {
				return this.base.options[e]
			}
		};
		['execAction', 'on', 'off', 'subscribe', 'trigger'].forEach(function (e) {
			t.prototype[e] = function () {
				return this.base[e].apply(this.base, arguments)
			}
		});
		e.Extension = t
	})();
	(function () {
		'use strict';

		function t(t) {
			if (e.util.isBlockContainer(t)) {
				return NodeFilter.FILTER_ACCEPT
			} else {
				return NodeFilter.FILTER_SKIP
			}
		};
		var i = {
			findMatchingSelectionParent: function (t, i) {
				var n = i.getSelection(),
					o, s;
				if (n.rangeCount === 0) {
					return !1
				}
				;
				o = n.getRangeAt(0);
				s = o.commonAncestorContainer;
				return e.util.traverseUp(s, t)
			},
			getSelectionElement: function (t) {
				return this.findMatchingSelectionParent(function (t) {
					return e.util.isMediumEditorElement(t)
				}, t)
			},
			exportSelection: function (e, t) {
				if (!e) {
					return null
				}
				;
				var n = null,
					l = t.getSelection();
				if (l.rangeCount > 0) {
					var i = l.getRangeAt(0),
						s = i.cloneRange(),
						o;
					s.selectNodeContents(e);
					s.setEnd(i.startContainer, i.startOffset);
					o = s.toString().length;
					n = {
						start: o,
						end: o + i.toString().length
					};
					if (this.doesRangeStartWithImages(i, t)) {
						n.startsWithImage = !0
					}
					;
					var a = this.getTrailingImageCount(e, n, i.endContainer, i.endOffset);
					if (a) {
						n.trailingImageCount = a
					}
					;
					if (o !== 0) {
						var r = this.getIndexRelativeToAdjacentEmptyBlocks(t, e, i.startContainer, i.startOffset);
						if (r !== -1) {
							n.emptyBlocksIndex = r
						}
					}
				}
				;
				return n
			},
			importSelection: function (e, t, i, o) {
				if (!e || !t) {
					return
				}
				;
				var s = i.createRange();
				s.setStart(t, 0);
				s.collapse(!0);
				var n = t,
					f = [],
					r = 0,
					u = !1,
					m = !1,
					g = 0,
					l = !1,
					c, b = !1,
					a = null;
				if (o || e.startsWithImage || typeof e.emptyBlocksIndex !== 'undefined') {
					b = !0
				}
				while (!l && n) {
					if (n.nodeType > 3) {
						n = f.pop();
						continue
					}
					;
					if (n.nodeType === 3 && !m) {
						c = r + n.length;
						if (!u && e.start >= r && e.start <= c) {
							if (b || e.start < c) {
								s.setStart(n, e.start - r);
								u = !0
							} else {
								a = n
							}
						}
						;
						if (u && e.end >= r && e.end <= c) {
							if (!e.trailingImageCount) {
								s.setEnd(n, e.end - r);
								l = !0
							} else {
								m = !0
							}
						}
						;
						r = c
					} else {
						if (e.trailingImageCount && m) {
							if (n.nodeName.toLowerCase() === 'img') {
								g++
							}
							;
							if (g === e.trailingImageCount) {
								var h = 0;
								while (n.parentNode.childNodes[h] !== n) {
									h++
								}
								;
								s.setEnd(n.parentNode, h + 1);
								l = !0
							}
						}
						;
						if (!l && n.nodeType === 1) {
							var d = n.childNodes.length - 1;
							while (d >= 0) {
								f.push(n.childNodes[d]);
								d -= 1
							}
						}
					}
					;
					if (!l) {
						n = f.pop()
					}
				}
				;
				if (!u && a) {
					s.setStart(a, a.length);
					s.setEnd(a, a.length)
				}
				;
				if (typeof e.emptyBlocksIndex !== 'undefined') {
					s = this.importSelectionMoveCursorPastBlocks(i, t, e.emptyBlocksIndex, s)
				}
				;
				if (o) {
					s = this.importSelectionMoveCursorPastAnchor(e, s)
				}
				;
				var p = i.getSelection();
				p.removeAllRanges();
				p.addRange(s)
			},
			importSelectionMoveCursorPastAnchor: function (t, i) {
				var a = function (e) {
					return e.nodeName.toLowerCase() === 'a'
				};
				if (t.start === t.end && i.startContainer.nodeType === 3 && i.startOffset === i.startContainer.nodeValue.length && e.util.traverseUp(i.startContainer, a)) {
					var r = i.startContainer,
						n = i.startContainer.parentNode;
					while (n !== null && n.nodeName.toLowerCase() !== 'a') {
						if (n.childNodes[n.childNodes.length - 1] !== r) {
							n = null
						} else {
							r = n;
							n = n.parentNode
						}
					}
					;
					if (n !== null && n.nodeName.toLowerCase() === 'a') {
						var s = null;
						for (var o = 0; s === null && o < n.parentNode.childNodes.length; o++) {
							if (n.parentNode.childNodes[o] === n) {
								s = o
							}
						}
						;
						i.setStart(n.parentNode, s + 1);
						i.collapse(!0)
					}
				}
				;
				return i
			},
			importSelectionMoveCursorPastBlocks: function (i, n, o, s) {
				var a = i.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, t, !1),
					l = s.startContainer,
					c, r, u = 0;
				o = o || 1;
				if (l.nodeType === 3 && e.util.isBlockContainer(l.previousSibling)) {
					c = l.previousSibling
				} else {
					c = e.util.getClosestBlockContainer(l)
				}
				while (a.nextNode()) {
					if (!r) {
						if (c === a.currentNode) {
							r = a.currentNode
						}
					} else {
						r = a.currentNode;
						u++;
						if (u === o) {
							break
						}
						;
						if (r.textContent.length > 0) {
							break
						}
					}
				}
				;
				if (!r) {
					r = c
				}
				;
				s.setStart(e.util.getFirstSelectableLeafNode(r), 0);
				return s
			},
			getIndexRelativeToAdjacentEmptyBlocks: function (i, n, o, s) {
				if (o.textContent.length > 0 && s > 0) {
					return -1
				}
				;
				var a = o;
				if (a.nodeType !== 3) {
					a = o.childNodes[s]
				}
				;
				if (a) {
					if (!e.util.isElementAtBeginningOfBlock(a)) {
						return -1
					}
					;
					var u = e.util.findPreviousSibling(a);
					if (!u) {
						return -1
					} else if (u.nodeValue) {
						return -1
					}
				}
				;
				var d = e.util.getClosestBlockContainer(o),
					l = i.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, t, !1),
					r = 0;
				while (l.nextNode()) {
					var c = l.currentNode.textContent === '';
					if (c || r > 0) {
						r += 1
					}
					;
					if (l.currentNode === d) {
						return r
					}
					;
					if (!c) {
						r = 0
					}
				}
				;
				return r
			},
			doesRangeStartWithImages: function (e, t) {
				if (e.startOffset !== 0 || e.startContainer.nodeType !== 1) {
					return !1
				}
				;
				if (e.startContainer.nodeName.toLowerCase() === 'img') {
					return !0
				}
				;
				var o = e.startContainer.querySelector('img');
				if (!o) {
					return !1
				}
				;
				var n = t.createTreeWalker(e.startContainer, NodeFilter.SHOW_ALL, null, !1);
				while (n.nextNode()) {
					var i = n.currentNode;
					if (i === o) {
						break
					}
					;
					if (i.nodeValue) {
						return !1
					}
				}
				;
				return !0
			},
			getTrailingImageCount: function (e, t, i, n) {
				if (n === 0 || i.nodeType !== 1) {
					return 0
				}
				;
				if (i.nodeName.toLowerCase() !== 'img' && !i.querySelector('img')) {
					return 0
				}
				;
				var a = i.childNodes[n - 1];
				while (a.hasChildNodes()) {
					a = a.lastChild
				}
				;
				var o = e,
					c = [],
					s = 0,
					u = !1,
					f = !1,
					d = !1,
					r, h = 0;
				while (!d && o) {
					if (o.nodeType > 3) {
						o = c.pop();
						continue
					}
					;
					if (o.nodeType === 3 && !f) {
						h = 0;
						r = s + o.length;
						if (!u && t.start >= s && t.start <= r) {
							u = !0
						}
						;
						if (u && t.end >= s && t.end <= r) {
							f = !0
						}
						;
						s = r
					} else {
						if (o.nodeName.toLowerCase() === 'img') {
							h++
						}
						;
						if (o === a) {
							d = !0
						} else if (o.nodeType === 1) {
							var l = o.childNodes.length - 1;
							while (l >= 0) {
								c.push(o.childNodes[l]);
								l -= 1
							}
						}
					}
					;
					if (!d) {
						o = c.pop()
					}
				}
				;
				return h
			},
			selectionContainsContent: function (e) {
				var t = e.getSelection();
				if (!t || t.isCollapsed || !t.rangeCount) {
					return !1
				}
				;
				if (t.toString().trim() !== '') {
					return !0
				}
				;
				var i = this.getSelectedParentElement(t.getRangeAt(0));
				if (i) {
					if (i.nodeName.toLowerCase() === 'img' || (i.nodeType === 1 && i.querySelector('img'))) {
						return !0
					}
				}
				;
				return !1
			},
			selectionInContentEditableFalse: function (e) {
				var t, i = this.findMatchingSelectionParent(function (e) {
					var i = e && e.getAttribute('contenteditable');
					if (i === 'true') {
						t = !0
					}
					;
					return e.nodeName !== '#text' && i === 'false'
				}, e);
				return !t && i
			},
			getSelectionHtml: function (e) {
				var t, o = '',
					i = e.getSelection(),
					s, n;
				if (i.rangeCount) {
					n = e.createElement('div');
					for (t = 0, s = i.rangeCount; t < s; t += 1) {
						n.appendChild(i.getRangeAt(t).cloneContents())
					}
					;
					o = n.innerHTML
				}
				;
				return o
			},
			getCaretOffsets: function (e, t) {
				var i, n;
				if (!t) {
					t = window.getSelection().getRangeAt(0)
				}
				;
				i = t.cloneRange();
				n = t.cloneRange();
				i.selectNodeContents(e);
				i.setEnd(t.endContainer, t.endOffset);
				n.selectNodeContents(e);
				n.setStart(t.endContainer, t.endOffset);
				return {
					left: i.toString().length,
					right: n.toString().length
				}
			},
			rangeSelectsSingleNode: function (e) {
				var t = e.startContainer;
				return t === e.endContainer && t.hasChildNodes() && e.endOffset === e.startOffset + 1
			},
			getSelectedParentElement: function (e) {
				if (!e) {
					return null
				}
				;
				if (this.rangeSelectsSingleNode(e) && e.startContainer.childNodes[e.startOffset].nodeType !== 3) {
					return e.startContainer.childNodes[e.startOffset]
				}
				;
				if (e.startContainer.nodeType === 3) {
					return e.startContainer.parentNode
				}
				;
				return e.startContainer
			},
			getSelectedElements: function (e) {
				var t = e.getSelection(),
					n, o, i;
				if (!t.rangeCount || t.isCollapsed || !t.getRangeAt(0).commonAncestorContainer) {
					return []
				}
				;
				n = t.getRangeAt(0);
				if (n.commonAncestorContainer.nodeType === 3) {
					o = [];
					i = n.commonAncestorContainer;
					while (i.parentNode && i.parentNode.childNodes.length === 1) {
						o.push(i.parentNode);
						i = i.parentNode
					}
					;
					return o
				}
				;
				return [].filter.call(n.commonAncestorContainer.getElementsByTagName('*'), function (e) {
					return (typeof t.containsNode === 'function') ? t.containsNode(e, !0) : !0
				})
			},
			selectNode: function (e, t) {
				var i = t.createRange(),
					n = t.getSelection();
				i.selectNodeContents(e);
				n.removeAllRanges();
				n.addRange(i)
			},
			select: function (e, t, i, n, s) {
				e.getSelection().removeAllRanges();
				var o = e.createRange();
				o.setStart(t, i);
				if (n) {
					o.setEnd(n, s)
				} else {
					o.collapse(!0)
				}
				;
				e.getSelection().addRange(o);
				return o
			},
			clearSelection: function (e, t) {
				if (t) {
					e.getSelection().collapseToStart()
				} else {
					e.getSelection().collapseToEnd()
				}
			},
			moveCursor: function (e, t, i) {
				this.select(e, t, i)
			},
			getSelectionRange: function (e) {
				var t = e.getSelection();
				if (t.rangeCount === 0) {
					return null
				}
				;
				return t.getRangeAt(0)
			},
			getSelectionStart: function (e) {
				var t = e.getSelection().anchorNode,
					i = (t && t.nodeType === 3 ? t.parentNode : t);
				return i
			}
		};
		e.selection = i
	}());
	(function () {
		'use strict';
		var t = function (e) {
			this.base = e;
			this.options = this.base.options;
			this.events = [];
			this.disabledEvents = {};
			this.customEvents = {};
			this.listeners = {}
		};
		t.prototype = {
			InputEventOnContenteditableSupported: !e.util.isIE && !e.util.isEdge,
			attachDOMEvent: function (t, i, n, o) {
				t = e.util.isElement(t) || [window, document].indexOf(t) > -1 ? [t] : t;
				Array.prototype.forEach.call(t, function (e) {
					e.addEventListener(i, n, o);
					this.events.push([e, i, n, o])
				}.bind(this))
			},
			detachDOMEvent: function (t, i, n, o) {
				var r, s;
				t = e.util.isElement(t) || [window, document].indexOf(t) > -1 ? [t] : t;
				Array.prototype.forEach.call(t, function (e) {
					r = this.indexOfListener(e, i, n, o);
					if (r !== -1) {
						s = this.events.splice(r, 1)[0];
						s[0].removeEventListener(s[1], s[2], s[3])
					}
				}.bind(this))
			},
			indexOfListener: function (e, t, i, n) {
				var o, r, s;
				for (o = 0, r = this.events.length; o < r; o = o + 1) {
					s = this.events[o];
					if (s[0] === e && s[1] === t && s[2] === i && s[3] === n) {
						return o
					}
				}
				;
				return -1
			},
			detachAllDOMEvents: function () {
				var e = this.events.pop();
				while (e) {
					e[0].removeEventListener(e[1], e[2], e[3]);
					e = this.events.pop()
				}
			},
			enableCustomEvent: function (e) {
				if (this.disabledEvents[e] !== undefined) {
					delete this.disabledEvents[e]
				}
			},
			disableCustomEvent: function (e) {
				this.disabledEvents[e] = !0
			},
			attachCustomEvent: function (e, t) {
				this.setupListener(e);
				if (!this.customEvents[e]) {
					this.customEvents[e] = []
				}
				;
				this.customEvents[e].push(t)
			},
			detachCustomEvent: function (e, t) {
				var i = this.indexOfCustomListener(e, t);
				if (i !== -1) {
					this.customEvents[e].splice(i, 1)
				}
			},
			indexOfCustomListener: function (e, t) {
				if (!this.customEvents[e] || !this.customEvents[e].length) {
					return -1
				}
				;
				return this.customEvents[e].indexOf(t)
			},
			detachAllCustomEvents: function () {
				this.customEvents = {}
			},
			triggerCustomEvent: function (e, t, i) {
				if (this.customEvents[e] && !this.disabledEvents[e]) {
					this.customEvents[e].forEach(function (e) {
						e(t, i)
					})
				}
			},
			destroy: function () {
				this.detachAllDOMEvents();
				this.detachAllCustomEvents();
				this.detachExecCommand();
				if (this.base.elements) {
					this.base.elements.forEach(function (e) {
						e.removeAttribute('data-medium-focused')
					})
				}
			},
			attachToExecCommand: function () {
				if (this.execCommandListener) {
					return
				}
				;
				this.execCommandListener = function (e) {
					this.handleDocumentExecCommand(e)
				}.bind(this);
				this.wrapExecCommand();
				this.options.ownerDocument.execCommand.listeners.push(this.execCommandListener)
			},
			detachExecCommand: function () {
				var e = this.options.ownerDocument;
				if (!this.execCommandListener || !e.execCommand.listeners) {
					return
				}
				;
				var t = e.execCommand.listeners.indexOf(this.execCommandListener);
				if (t !== -1) {
					e.execCommand.listeners.splice(t, 1)
				}
				;
				if (!e.execCommand.listeners.length) {
					this.unwrapExecCommand()
				}
			},
			wrapExecCommand: function () {
				var e = this.options.ownerDocument;
				if (e.execCommand.listeners) {
					return
				}
				;
				var i = function (t, i) {
						if (e.execCommand.listeners) {
							e.execCommand.listeners.forEach(function (e) {
								e({
									command: t[0],
									value: t[2],
									args: t,
									result: i
								})
							})
						}
					},
					t = function () {
						var t = e.execCommand.orig.apply(this, arguments);
						if (!e.execCommand.listeners) {
							return t
						}
						;
						var n = Array.prototype.slice.call(arguments);
						i(n, t);
						return t
					};
				t.orig = e.execCommand;
				t.listeners = [];
				t.callListeners = i;
				e.execCommand = t
			},
			unwrapExecCommand: function () {
				var e = this.options.ownerDocument;
				if (!e.execCommand.orig) {
					return
				}
				;
				e.execCommand = e.execCommand.orig
			},
			setupListener: function (e) {
				if (this.listeners[e]) {
					return
				}
				;
				switch (e) {
					case 'externalInteraction':
						this.attachDOMEvent(this.options.ownerDocument.body, 'mousedown', this.handleBodyMousedown.bind(this), !0);
						this.attachDOMEvent(this.options.ownerDocument.body, 'click', this.handleBodyClick.bind(this), !0);
						this.attachDOMEvent(this.options.ownerDocument.body, 'focus', this.handleBodyFocus.bind(this), !0);
						break;
					case 'blur':
						this.setupListener('externalInteraction');
						break;
					case 'focus':
						this.setupListener('externalInteraction');
						break;
					case 'editableInput':
						this.contentCache = [];
						this.base.elements.forEach(function (e) {
							this.contentCache[e.getAttribute('medium-editor-index')] = e.innerHTML;
							if (this.InputEventOnContenteditableSupported) {
								this.attachDOMEvent(e, 'input', this.handleInput.bind(this))
							}
						}.bind(this));
						if (!this.InputEventOnContenteditableSupported) {
							this.setupListener('editableKeypress');
							this.keypressUpdateInput = !0;
							this.attachDOMEvent(document, 'selectionchange', this.handleDocumentSelectionChange.bind(this));
							this.attachToExecCommand()
						}
						;
						break;
					case 'editableClick':
						this.attachToEachElement('click', this.handleClick);
						break;
					case 'editableBlur':
						this.attachToEachElement('blur', this.handleBlur);
						break;
					case 'editableKeypress':
						this.attachToEachElement('keypress', this.handleKeypress);
						break;
					case 'editableKeyup':
						this.attachToEachElement('keyup', this.handleKeyup);
						break;
					case 'editableKeydown':
						this.attachToEachElement('keydown', this.handleKeydown);
						break;
					case 'editableKeydownSpace':
						this.setupListener('editableKeydown');
						break;
					case 'editableKeydownEnter':
						this.setupListener('editableKeydown');
						break;
					case 'editableKeydownTab':
						this.setupListener('editableKeydown');
						break;
					case 'editableKeydownDelete':
						this.setupListener('editableKeydown');
						break;
					case 'editableMouseover':
						this.attachToEachElement('mouseover', this.handleMouseover);
						break;
					case 'editableDrag':
						this.attachToEachElement('dragover', this.handleDragging);
						this.attachToEachElement('dragleave', this.handleDragging);
						break;
					case 'editableDrop':
						this.attachToEachElement('drop', this.handleDrop);
						break;
					case 'editablePaste':
						this.attachToEachElement('paste', this.handlePaste);
						break
				}
				;
				this.listeners[e] = !0
			},
			attachToEachElement: function (e, t) {
				this.base.elements.forEach(function (i) {
					this.attachDOMEvent(i, e, t.bind(this))
				}, this)
			},
			focusElement: function (e) {
				e.focus();
				this.updateFocus(e, {
					target: e,
					type: 'focus'
				})
			},
			updateFocus: function (t, i) {
				var a = this.base.getExtensionByName('toolbar'),
					l = a ? a.getToolbarElement() : null,
					s = this.base.getExtensionByName('anchor-preview'),
					c = (s && s.getPreviewElement) ? s.getPreviewElement() : null,
					o = this.base.getFocusedElement(),
					n;
				if (o && i.type === 'click' && this.lastMousedownTarget && (e.util.isDescendant(o, this.lastMousedownTarget, !0) || e.util.isDescendant(l, this.lastMousedownTarget, !0) || e.util.isDescendant(c, this.lastMousedownTarget, !0))) {
					n = o
				}
				;
				if (!n) {
					this.base.elements.some(function (i) {
						if (!n && (e.util.isDescendant(i, t, !0))) {
							n = i
						}
						;
						return !!n
					}, this)
				}
				;
				var r = !e.util.isDescendant(o, t, !0) && !e.util.isDescendant(l, t, !0) && !e.util.isDescendant(c, t, !0);
				if (n !== o) {
					if (o && r) {
						o.removeAttribute('data-medium-focused');
						this.triggerCustomEvent('blur', i, o)
					}
					;
					if (n) {
						n.setAttribute('data-medium-focused', !0);
						this.triggerCustomEvent('focus', i, n)
					}
				}
				;
				if (r) {
					this.triggerCustomEvent('externalInteraction', i)
				}
			},
			updateInput: function (e, t) {
				if (!this.contentCache) {
					return
				}
				;
				var i = e.getAttribute('medium-editor-index'),
					n = e.innerHTML;
				if (n !== this.contentCache[i]) {
					this.triggerCustomEvent('editableInput', t, e)
				}
				;
				this.contentCache[i] = n
			},
			handleDocumentSelectionChange: function (t) {
				if (t.currentTarget && t.currentTarget.activeElement) {
					var n = t.currentTarget.activeElement,
						i;
					this.base.elements.some(function (t) {
						if (e.util.isDescendant(t, n, !0)) {
							i = t;
							return !0
						}
						;
						return !1
					}, this);
					if (i) {
						this.updateInput(i, {
							target: n,
							currentTarget: i
						})
					}
				}
			},
			handleDocumentExecCommand: function () {
				var e = this.base.getFocusedElement();
				if (e) {
					this.updateInput(e, {
						target: e,
						currentTarget: e
					})
				}
			},
			handleBodyClick: function (e) {
				this.updateFocus(e.target, e)
			},
			handleBodyFocus: function (e) {
				this.updateFocus(e.target, e)
			},
			handleBodyMousedown: function (e) {
				this.lastMousedownTarget = e.target
			},
			handleInput: function (e) {
				this.updateInput(e.currentTarget, e)
			},
			handleClick: function (e) {
				this.triggerCustomEvent('editableClick', e, e.currentTarget)
			},
			handleBlur: function (e) {
				this.triggerCustomEvent('editableBlur', e, e.currentTarget)
			},
			handleKeypress: function (e) {
				this.triggerCustomEvent('editableKeypress', e, e.currentTarget);
				if (this.keypressUpdateInput) {
					var t = {
						target: e.target,
						currentTarget: e.currentTarget
					};
					setTimeout(function () {
						this.updateInput(t.currentTarget, t)
					}.bind(this), 0)
				}
			},
			handleKeyup: function (e) {
				this.triggerCustomEvent('editableKeyup', e, e.currentTarget)
			},
			handleMouseover: function (e) {
				this.triggerCustomEvent('editableMouseover', e, e.currentTarget)
			},
			handleDragging: function (e) {
				this.triggerCustomEvent('editableDrag', e, e.currentTarget)
			},
			handleDrop: function (e) {
				this.triggerCustomEvent('editableDrop', e, e.currentTarget)
			},
			handlePaste: function (e) {
				this.triggerCustomEvent('editablePaste', e, e.currentTarget)
			},
			handleKeydown: function (t) {
				this.triggerCustomEvent('editableKeydown', t, t.currentTarget);
				if (e.util.isKey(t, e.util.keyCode.SPACE)) {
					return this.triggerCustomEvent('editableKeydownSpace', t, t.currentTarget)
				}
				;
				if (e.util.isKey(t, e.util.keyCode.ENTER) || (t.ctrlKey && e.util.isKey(t, e.util.keyCode.M))) {
					return this.triggerCustomEvent('editableKeydownEnter', t, t.currentTarget)
				}
				;
				if (e.util.isKey(t, e.util.keyCode.TAB)) {
					return this.triggerCustomEvent('editableKeydownTab', t, t.currentTarget)
				}
				;
				if (e.util.isKey(t, [e.util.keyCode.DELETE, e.util.keyCode.BACKSPACE])) {
					return this.triggerCustomEvent('editableKeydownDelete', t, t.currentTarget)
				}
			}
		};
		e.Events = t
	}());
	(function () {
		'use strict';
		var t = e.Extension.extend({
			action: undefined,
			aria: undefined,
			tagNames: undefined,
			style: undefined,
			useQueryState: undefined,
			contentDefault: undefined,
			contentFA: undefined,
			classList: undefined,
			attrs: undefined,
			constructor: function (i) {
				if (t.isBuiltInButton(i)) {
					e.Extension.call(this, this.defaults[i])
				} else {
					e.Extension.call(this, i)
				}
			},
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.button = this.createButton();
				this.on(this.button, 'click', this.handleClick.bind(this))
			},
			getButton: function () {
				return this.button
			},
			getAction: function () {
				return (typeof this.action === 'function') ? this.action(this.base.options) : this.action
			},
			getAria: function () {
				return (typeof this.aria === 'function') ? this.aria(this.base.options) : this.aria
			},
			getTagNames: function () {
				return (typeof this.tagNames === 'function') ? this.tagNames(this.base.options) : this.tagNames
			},
			createButton: function () {
				var e = this.document.createElement('button'),
					i = this.contentDefault,
					t = this.getAria(),
					n = this.getEditorOption('buttonLabels');
				e.classList.add('medium-editor-action');
				e.classList.add('medium-editor-action-' + this.name);
				if (this.classList) {
					this.classList.forEach(function (t) {
						e.classList.add(t)
					})
				}
				;
				e.setAttribute('data-action', this.getAction());
				if (t) {
					e.setAttribute('title', t);
					e.setAttribute('aria-label', t)
				}
				;
				if (this.attrs) {
					Object.keys(this.attrs).forEach(function (t) {
						e.setAttribute(t, this.attrs[t])
					}, this)
				}
				;
				if (n === 'fontawesome' && this.contentFA) {
					i = this.contentFA
				}
				;
				e.innerHTML = i;
				return e
			},
			handleClick: function (e) {
				e.preventDefault();
				e.stopPropagation();
				var t = this.getAction();
				if (t) {
					this.execAction(t)
				}
			},
			isActive: function () {
				return this.button.classList.contains(this.getEditorOption('activeButtonClass'))
			},
			setInactive: function () {
				this.button.classList.remove(this.getEditorOption('activeButtonClass'));
				delete this.knownState
			},
			setActive: function () {
				this.button.classList.add(this.getEditorOption('activeButtonClass'));
				delete this.knownState
			},
			queryCommandState: function () {
				var e = null;
				if (this.useQueryState) {
					e = this.base.queryCommandState(this.getAction())
				}
				;
				return e
			},
			isAlreadyApplied: function (e) {
				var t = !1,
					i = this.getTagNames(),
					n, o;
				if (this.knownState === !1 || this.knownState === !0) {
					return this.knownState
				}
				;
				if (i && i.length > 0) {
					t = i.indexOf(e.nodeName.toLowerCase()) !== -1
				}
				;
				if (!t && this.style) {
					n = this.style.value.split('|');
					o = this.window.getComputedStyle(e, null).getPropertyValue(this.style.prop);
					n.forEach(function (e) {
						if (!this.knownState) {
							t = (o.indexOf(e) !== -1);
							if (t || this.style.prop !== 'text-decoration') {
								this.knownState = t
							}
						}
					}, this)
				}
				;
				return t
			}
		});
		t.isBuiltInButton = function (t) {
			return (typeof t === 'string') && e.extensions.button.prototype.defaults.hasOwnProperty(t)
		};
		e.extensions.button = t
	}());
	(function () {
		'use strict';
		e.extensions.button.prototype.defaults = {
			'bold': {
				name: 'bold',
				action: 'bold',
				aria: 'bold',
				tagNames: ['b', 'strong'],
				style: {
					prop: 'font-weight',
					value: '700|bold'
				},
				useQueryState: !0,
				contentDefault: '<b>B</b>',
				contentFA: '<i class="fa fa-bold"></i>'
			},
			'italic': {
				name: 'italic',
				action: 'italic',
				aria: 'italic',
				tagNames: ['i', 'em'],
				style: {
					prop: 'font-style',
					value: 'italic'
				},
				useQueryState: !0,
				contentDefault: '<b><i>I</i></b>',
				contentFA: '<i class="fa fa-italic"></i>'
			},
			'underline': {
				name: 'underline',
				action: 'underline',
				aria: 'underline',
				tagNames: ['u'],
				style: {
					prop: 'text-decoration',
					value: 'underline'
				},
				useQueryState: !0,
				contentDefault: '<b><u>U</u></b>',
				contentFA: '<i class="fa fa-underline"></i>'
			},
			'strikethrough': {
				name: 'strikethrough',
				action: 'strikethrough',
				aria: 'strike through',
				tagNames: ['strike'],
				style: {
					prop: 'text-decoration',
					value: 'line-through'
				},
				useQueryState: !0,
				contentDefault: '<s>A</s>',
				contentFA: '<i class="fa fa-strikethrough"></i>'
			},
			'superscript': {
				name: 'superscript',
				action: 'superscript',
				aria: 'superscript',
				tagNames: ['sup'],
				contentDefault: '<b>x<sup>1</sup></b>',
				contentFA: '<i class="fa fa-superscript"></i>'
			},
			'subscript': {
				name: 'subscript',
				action: 'subscript',
				aria: 'subscript',
				tagNames: ['sub'],
				contentDefault: '<b>x<sub>1</sub></b>',
				contentFA: '<i class="fa fa-subscript"></i>'
			},
			'image': {
				name: 'image',
				action: 'image',
				aria: 'image',
				tagNames: ['img'],
				contentDefault: '<b>image</b>',
				contentFA: '<i class="fa fa-picture-o"></i>'
			},
			'orderedlist': {
				name: 'orderedlist',
				action: 'insertorderedlist',
				aria: 'ordered list',
				tagNames: ['ol'],
				useQueryState: !0,
				contentDefault: '<b>1.</b>',
				contentFA: '<i class="fa fa-list-ol"></i>'
			},
			'unorderedlist': {
				name: 'unorderedlist',
				action: 'insertunorderedlist',
				aria: 'unordered list',
				tagNames: ['ul'],
				useQueryState: !0,
				contentDefault: '<b>&bull;</b>',
				contentFA: '<i class="fa fa-list-ul"></i>'
			},
			'indent': {
				name: 'indent',
				action: 'indent',
				aria: 'indent',
				tagNames: [],
				contentDefault: '<b>&rarr;</b>',
				contentFA: '<i class="fa fa-indent"></i>'
			},
			'outdent': {
				name: 'outdent',
				action: 'outdent',
				aria: 'outdent',
				tagNames: [],
				contentDefault: '<b>&larr;</b>',
				contentFA: '<i class="fa fa-outdent"></i>'
			},
			'justifyCenter': {
				name: 'justifyCenter',
				action: 'justifyCenter',
				aria: 'center justify',
				tagNames: [],
				style: {
					prop: 'text-align',
					value: 'center'
				},
				contentDefault: '<b>C</b>',
				contentFA: '<i class="fa fa-align-center"></i>'
			},
			'justifyFull': {
				name: 'justifyFull',
				action: 'justifyFull',
				aria: 'full justify',
				tagNames: [],
				style: {
					prop: 'text-align',
					value: 'justify'
				},
				contentDefault: '<b>J</b>',
				contentFA: '<i class="fa fa-align-justify"></i>'
			},
			'justifyLeft': {
				name: 'justifyLeft',
				action: 'justifyLeft',
				aria: 'left justify',
				tagNames: [],
				style: {
					prop: 'text-align',
					value: 'left'
				},
				contentDefault: '<b>L</b>',
				contentFA: '<i class="fa fa-align-left"></i>'
			},
			'justifyRight': {
				name: 'justifyRight',
				action: 'justifyRight',
				aria: 'right justify',
				tagNames: [],
				style: {
					prop: 'text-align',
					value: 'right'
				},
				contentDefault: '<b>R</b>',
				contentFA: '<i class="fa fa-align-right"></i>'
			},
			'removeFormat': {
				name: 'removeFormat',
				aria: 'remove formatting',
				action: 'removeFormat',
				contentDefault: '<b>X</b>',
				contentFA: '<i class="fa fa-eraser"></i>'
			},
			'quote': {
				name: 'quote',
				action: 'append-blockquote',
				aria: 'blockquote',
				tagNames: ['blockquote'],
				contentDefault: '<b>&ldquo;</b>',
				contentFA: '<i class="fa fa-quote-right"></i>'
			},
			'pre': {
				name: 'pre',
				action: 'append-pre',
				aria: 'preformatted text',
				tagNames: ['pre'],
				contentDefault: '<b>0101</b>',
				contentFA: '<i class="fa fa-code fa-lg"></i>'
			},
			'h1': {
				name: 'h1',
				action: 'append-h1',
				aria: 'header type one',
				tagNames: ['h1'],
				contentDefault: '<b>H1</b>',
				contentFA: '<i class="fa fa-header"><sup>1</sup>'
			},
			'h2': {
				name: 'h2',
				action: 'append-h2',
				aria: 'header type two',
				tagNames: ['h2'],
				contentDefault: '<b>H2</b>',
				contentFA: '<i class="fa fa-header"><sup>2</sup>'
			},
			'h3': {
				name: 'h3',
				action: 'append-h3',
				aria: 'header type three',
				tagNames: ['h3'],
				contentDefault: '<b>H3</b>',
				contentFA: '<i class="fa fa-header"><sup>3</sup>'
			},
			'h4': {
				name: 'h4',
				action: 'append-h4',
				aria: 'header type four',
				tagNames: ['h4'],
				contentDefault: '<b>H4</b>',
				contentFA: '<i class="fa fa-header"><sup>4</sup>'
			},
			'h5': {
				name: 'h5',
				action: 'append-h5',
				aria: 'header type five',
				tagNames: ['h5'],
				contentDefault: '<b>H5</b>',
				contentFA: '<i class="fa fa-header"><sup>5</sup>'
			},
			'h6': {
				name: 'h6',
				action: 'append-h6',
				aria: 'header type six',
				tagNames: ['h6'],
				contentDefault: '<b>H6</b>',
				contentFA: '<i class="fa fa-header"><sup>6</sup>'
			}
		}
	})();
	(function () {
		'use strict';
		var t = e.extensions.button.extend({
			init: function () {
				e.extensions.button.prototype.init.apply(this, arguments)
			},
			formSaveLabel: '&#10003;',
			formCloseLabel: '&times;',
			activeClass: 'medium-editor-toolbar-form-active',
			hasForm: !0,
			getForm: function () {
			},
			isDisplayed: function () {
				if (this.hasForm) {
					return this.getForm().classList.contains(this.activeClass)
				}
				;
				return !1
			},
			showForm: function () {
				if (this.hasForm) {
					this.getForm().classList.add(this.activeClass)
				}
			},
			hideForm: function () {
				if (this.hasForm) {
					this.getForm().classList.remove(this.activeClass)
				}
			},
			showToolbarDefaultActions: function () {
				var e = this.base.getExtensionByName('toolbar');
				if (e) {
					e.showToolbarDefaultActions()
				}
			},
			hideToolbarDefaultActions: function () {
				var e = this.base.getExtensionByName('toolbar');
				if (e) {
					e.hideToolbarDefaultActions()
				}
			},
			setToolbarPosition: function () {
				var e = this.base.getExtensionByName('toolbar');
				if (e) {
					e.setToolbarPosition()
				}
			}
		});
		e.extensions.form = t
	})();
	(function () {
		'use strict';
		var t = e.extensions.form.extend({
			customClassOption: null,
			customClassOptionText: 'Button',
			linkValidation: !1,
			placeholderText: 'Paste or type a link',
			targetCheckbox: !1,
			targetCheckboxText: 'Open in new window',
			name: 'anchor',
			action: 'createLink',
			aria: 'link',
			tagNames: ['a'],
			contentDefault: '<b>#</b>',
			contentFA: '<i class="fa fa-link"></i>',
			init: function () {
				e.extensions.form.prototype.init.apply(this, arguments);
				this.subscribe('editableKeydown', this.handleKeydown.bind(this))
			},
			handleClick: function (t) {
				t.preventDefault();
				t.stopPropagation();
				var i = e.selection.getSelectionRange(this.document);
				if (i.startContainer.nodeName.toLowerCase() === 'a' || i.endContainer.nodeName.toLowerCase() === 'a' || e.util.getClosestTag(e.selection.getSelectedParentElement(i), 'a')) {
					return this.execAction('unlink')
				}
				;
				if (!this.isDisplayed()) {
					this.showForm()
				}
				;
				return !1
			},
			handleKeydown: function (t) {
				if (e.util.isKey(t, e.util.keyCode.K) && e.util.isMetaCtrlKey(t) && !t.shiftKey) {
					this.handleClick(t)
				}
			},
			getForm: function () {
				if (!this.form) {
					this.form = this.createForm()
				}
				;
				return this.form
			},
			getTemplate: function () {
				var e = ['<input type="text" class="medium-editor-toolbar-input" placeholder="', this.placeholderText, '">'];
				e.push('<a href="#" class="medium-editor-toolbar-save">', this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : this.formSaveLabel, '</a>');
				e.push('<a href="#" class="medium-editor-toolbar-close">', this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : this.formCloseLabel, '</a>');
				if (this.targetCheckbox) {
					e.push('<div class="medium-editor-toolbar-form-row">', '<input type="checkbox" class="medium-editor-toolbar-anchor-target">', '<label>', this.targetCheckboxText, '</label>', '</div>')
				}
				;
				if (this.customClassOption) {
					e.push('<div class="medium-editor-toolbar-form-row">', '<input type="checkbox" class="medium-editor-toolbar-anchor-button">', '<label>', this.customClassOptionText, '</label>', '</div>')
				}
				;
				return e.join('')
			},
			isDisplayed: function () {
				return e.extensions.form.prototype.isDisplayed.apply(this)
			},
			hideForm: function () {
				e.extensions.form.prototype.hideForm.apply(this);
				this.getInput().value = ''
			},
			showForm: function (t) {
				var i = this.getInput(),
					n = this.getAnchorTargetCheckbox(),
					o = this.getAnchorButtonCheckbox();
				t = t || {
						url: ''
					};
				if (typeof t === 'string') {
					t = {
						url: t
					}
				}
				;
				this.base.saveSelection();
				this.hideToolbarDefaultActions();
				e.extensions.form.prototype.showForm.apply(this);
				this.setToolbarPosition();
				i.value = t.url;
				i.focus();
				if (n) {
					n.checked = t.target === '_blank'
				}
				;
				if (o) {
					var s = t.buttonClass ? t.buttonClass.split(' ') : [];
					o.checked = (s.indexOf(this.customClassOption) !== -1)
				}
			},
			destroy: function () {
				if (!this.form) {
					return !1
				}
				;
				if (this.form.parentNode) {
					this.form.parentNode.removeChild(this.form)
				}
				;
				delete this.form
			},
			getFormOpts: function () {
				var t = this.getAnchorTargetCheckbox(),
					i = this.getAnchorButtonCheckbox(),
					e = {
						url: this.getInput().value.trim()
					};
				if (this.linkValidation) {
					e.url = this.checkLinkFormat(e.url)
				}
				;
				e.target = '_self';
				if (t && t.checked) {
					e.target = '_blank'
				}
				;
				if (i && i.checked) {
					e.buttonClass = this.customClassOption
				}
				;
				return e
			},
			doFormSave: function () {
				var e = this.getFormOpts();
				this.completeFormSave(e)
			},
			completeFormSave: function (e) {
				this.base.restoreSelection();
				this.execAction(this.action, e);
				this.base.checkSelection()
			},
			checkLinkFormat: function (e) {
				var t = /^([a-z]+:)?\/\/|^(mailto|tel|maps):/i,
					i = /^\+?\s?\(?(?:\d\s?\-?\)?){3,20}$/;
				if (i.test(e)) {
					return 'tel:' + e
				} else {
					return (t.test(e) ? '' : 'http://') + encodeURI(e)
				}
			},
			doFormCancel: function () {
				this.base.restoreSelection();
				this.base.checkSelection()
			},
			attachFormEvents: function (e) {
				var t = e.querySelector('.medium-editor-toolbar-close'),
					i = e.querySelector('.medium-editor-toolbar-save'),
					n = e.querySelector('.medium-editor-toolbar-input');
				this.on(e, 'click', this.handleFormClick.bind(this));
				this.on(n, 'keyup', this.handleTextboxKeyup.bind(this));
				this.on(t, 'click', this.handleCloseClick.bind(this));
				this.on(i, 'click', this.handleSaveClick.bind(this), !0)
			},
			createForm: function () {
				var t = this.document,
					e = t.createElement('div');
				e.className = 'medium-editor-toolbar-form';
				e.id = 'medium-editor-toolbar-form-anchor-' + this.getEditorId();
				e.innerHTML = this.getTemplate();
				this.attachFormEvents(e);
				return e
			},
			getInput: function () {
				return this.getForm().querySelector('input.medium-editor-toolbar-input')
			},
			getAnchorTargetCheckbox: function () {
				return this.getForm().querySelector('.medium-editor-toolbar-anchor-target')
			},
			getAnchorButtonCheckbox: function () {
				return this.getForm().querySelector('.medium-editor-toolbar-anchor-button')
			},
			handleTextboxKeyup: function (t) {
				if (t.keyCode === e.util.keyCode.ENTER) {
					t.preventDefault();
					this.doFormSave();
					return
				}
				;
				if (t.keyCode === e.util.keyCode.ESCAPE) {
					t.preventDefault();
					this.doFormCancel()
				}
			},
			handleFormClick: function (e) {
				e.stopPropagation()
			},
			handleSaveClick: function (e) {
				e.preventDefault();
				this.doFormSave()
			},
			handleCloseClick: function (e) {
				e.preventDefault();
				this.doFormCancel()
			}
		});
		e.extensions.anchor = t
	}());
	(function () {
		'use strict';
		var t = e.Extension.extend({
			name: 'anchor-preview',
			hideDelay: 500,
			previewValueSelector: 'a',
			showWhenToolbarIsVisible: !1,
			init: function () {
				this.anchorPreview = this.createPreview();
				this.getEditorOption('elementsContainer').appendChild(this.anchorPreview);
				this.attachToEditables()
			},
			getPreviewElement: function () {
				return this.anchorPreview
			},
			createPreview: function () {
				var e = this.document.createElement('div');
				e.id = 'medium-editor-anchor-preview-' + this.getEditorId();
				e.className = 'medium-editor-anchor-preview';
				e.innerHTML = this.getTemplate();
				this.on(e, 'click', this.handleClick.bind(this));
				return e
			},
			getTemplate: function () {
				return '<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">    <a class="medium-editor-toolbar-anchor-preview-inner"></a></div>'
			},
			destroy: function () {
				if (this.anchorPreview) {
					if (this.anchorPreview.parentNode) {
						this.anchorPreview.parentNode.removeChild(this.anchorPreview)
					}
					;
					delete this.anchorPreview
				}
			},
			hidePreview: function () {
				this.anchorPreview.classList.remove('medium-editor-anchor-preview-active');
				this.activeAnchor = null
			},
			showPreview: function (e) {
				if (this.anchorPreview.classList.contains('medium-editor-anchor-preview-active') || e.getAttribute('data-disable-preview')) {
					return !0
				}
				;
				if (this.previewValueSelector) {
					this.anchorPreview.querySelector(this.previewValueSelector).textContent = e.attributes.href.value;
					this.anchorPreview.querySelector(this.previewValueSelector).href = e.attributes.href.value
				}
				;
				this.anchorPreview.classList.add('medium-toolbar-arrow-over');
				this.anchorPreview.classList.remove('medium-toolbar-arrow-under');
				if (!this.anchorPreview.classList.contains('medium-editor-anchor-preview-active')) {
					this.anchorPreview.classList.add('medium-editor-anchor-preview-active')
				}
				;
				this.activeAnchor = e;
				this.positionPreview();
				this.attachPreviewHandlers();
				return this
			},
			positionPreview: function (e) {
				e = e || this.activeAnchor;
				var l = this.anchorPreview.offsetHeight,
					n = e.getBoundingClientRect(),
					o = (n.left + n.right) / 2,
					r = this.diffLeft,
					a = this.diffTop,
					t, s;
				t = this.anchorPreview.offsetWidth / 2;
				var i = this.base.getExtensionByName('toolbar');
				if (i) {
					r = i.diffLeft;
					a = i.diffTop
				}
				;
				s = r - t;
				this.anchorPreview.style.top = Math.round(l + n.bottom - a + this.window.pageYOffset - this.anchorPreview.offsetHeight) + 'px';
				this.anchorPreview.style.right = 'initial';
				if (o < t) {
					this.anchorPreview.style.left = s + t + 'px';
					this.anchorPreview.style.right = 'initial'
				} else if ((this.window.innerWidth - o) < t) {
					this.anchorPreview.style.left = 'auto';
					this.anchorPreview.style.right = 0
				} else {
					this.anchorPreview.style.left = s + o + 'px';
					this.anchorPreview.style.right = 'initial'
				}
			},
			attachToEditables: function () {
				this.subscribe('editableMouseover', this.handleEditableMouseover.bind(this));
				this.subscribe('positionedToolbar', this.handlePositionedToolbar.bind(this))
			},
			handlePositionedToolbar: function () {
				if (!this.showWhenToolbarIsVisible) {
					this.hidePreview()
				}
			},
			handleClick: function (e) {
				var i = this.base.getExtensionByName('anchor'),
					t = this.activeAnchor;
				if (i && t) {
					e.preventDefault();
					this.base.selectElement(this.activeAnchor);
					this.base.delay(function () {
						if (t) {
							var e = {
								url: t.attributes.href.value,
								target: t.getAttribute('target'),
								buttonClass: t.getAttribute('class')
							};
							i.showForm(e);
							t = null
						}
					}.bind(this))
				}
				;
				this.hidePreview()
			},
			handleAnchorMouseout: function () {
				this.anchorToPreview = null;
				this.off(this.activeAnchor, 'mouseout', this.instanceHandleAnchorMouseout);
				this.instanceHandleAnchorMouseout = null
			},
			handleEditableMouseover: function (t) {
				var i = e.util.getClosestTag(t.target, 'a');
				if (!1 === i) {
					return
				}
				;
				if (!/href=["']\S+["']/.test(i.outerHTML) || /href=["']#\S+["']/.test(i.outerHTML)) {
					return !0
				}
				;
				var n = this.base.getExtensionByName('toolbar');
				if (!this.showWhenToolbarIsVisible && n && n.isDisplayed && n.isDisplayed()) {
					return !0
				}
				;
				if (this.activeAnchor && this.activeAnchor !== i) {
					this.detachPreviewHandlers()
				}
				;
				this.anchorToPreview = i;
				this.instanceHandleAnchorMouseout = this.handleAnchorMouseout.bind(this);
				this.on(this.anchorToPreview, 'mouseout', this.instanceHandleAnchorMouseout);
				this.base.delay(function () {
					if (this.anchorToPreview) {
						this.showPreview(this.anchorToPreview)
					}
				}.bind(this))
			},
			handlePreviewMouseover: function () {
				this.lastOver = (new Date()).getTime();
				this.hovering = !0
			},
			handlePreviewMouseout: function (e) {
				if (!e.relatedTarget || !/anchor-preview/.test(e.relatedTarget.className)) {
					this.hovering = !1
				}
			},
			updatePreview: function () {
				if (this.hovering) {
					return !0
				}
				;
				var e = (new Date()).getTime() - this.lastOver;
				if (e > this.hideDelay) {
					this.detachPreviewHandlers()
				}
			},
			detachPreviewHandlers: function () {
				clearInterval(this.intervalTimer);
				if (this.instanceHandlePreviewMouseover) {
					this.off(this.anchorPreview, 'mouseover', this.instanceHandlePreviewMouseover);
					this.off(this.anchorPreview, 'mouseout', this.instanceHandlePreviewMouseout);
					if (this.activeAnchor) {
						this.off(this.activeAnchor, 'mouseover', this.instanceHandlePreviewMouseover);
						this.off(this.activeAnchor, 'mouseout', this.instanceHandlePreviewMouseout)
					}
				}
				;
				this.hidePreview();
				this.hovering = this.instanceHandlePreviewMouseover = this.instanceHandlePreviewMouseout = null
			},
			attachPreviewHandlers: function () {
				this.lastOver = (new Date()).getTime();
				this.hovering = !0;
				this.instanceHandlePreviewMouseover = this.handlePreviewMouseover.bind(this);
				this.instanceHandlePreviewMouseout = this.handlePreviewMouseout.bind(this);
				this.intervalTimer = setInterval(this.updatePreview.bind(this), 200);
				this.on(this.anchorPreview, 'mouseover', this.instanceHandlePreviewMouseover);
				this.on(this.anchorPreview, 'mouseout', this.instanceHandlePreviewMouseout);
				this.on(this.activeAnchor, 'mouseover', this.instanceHandlePreviewMouseover);
				this.on(this.activeAnchor, 'mouseout', this.instanceHandlePreviewMouseout)
			}
		});
		e.extensions.anchorPreview = t
	}());
	(function () {
		'use strict';
		var i, t, n, o;
		i = [' ', '\t', '\n', '\r', '\u00A0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2028', '\u2029'];
		t = 'com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw';
		n = '(((?:(https?://|ftps?://|nntp://)|www\\d{0,3}[.]|[a-z0-9.\\-]+[.](' + t + ')\\\/)\\S+(?:[^\\s`!\\[\\]{};:\'".,?\u00AB\u00BB\u201C\u201D\u2018\u2019])))|(([a-z0-9\\-]+\\.)?[a-z0-9\\-]+\\.(' + t + '))';
		o = new RegExp('^(' + t + ')$', 'i');

		function r(t) {
			return !e.util.getClosestTag(t, 'a')
		};
		var s = e.Extension.extend({
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.disableEventHandling = !1;
				this.subscribe('editableKeypress', this.onKeypress.bind(this));
				this.subscribe('editableBlur', this.onBlur.bind(this));
				this.document.execCommand('AutoUrlDetect', !1, !1)
			},
			isLastInstance: function () {
				var i = 0;
				for (var e = 0; e < this.window._mediumEditors.length; e++) {
					var t = this.window._mediumEditors[e];
					if (t !== null && t.getExtensionByName('autoLink') !== undefined) {
						i++
					}
				}
				;
				return i === 1
			},
			destroy: function () {
				if (this.document.queryCommandSupported('AutoUrlDetect') && this.isLastInstance()) {
					this.document.execCommand('AutoUrlDetect', !1, !0)
				}
			},
			onBlur: function (e, t) {
				this.performLinking(t)
			},
			onKeypress: function (t) {
				if (this.disableEventHandling) {
					return
				}
				;
				if (e.util.isKey(t, [e.util.keyCode.SPACE, e.util.keyCode.ENTER])) {
					clearTimeout(this.performLinkingTimeout);
					this.performLinkingTimeout = setTimeout(function () {
						try {
							var i = this.base.exportSelection();
							if (this.performLinking(t.target)) {
								this.base.importSelection(i, !0)
							}
						} catch (e) {
							if (window.console) {
								window.console.error('Failed to perform linking', e)
							}
							;
							this.disableEventHandling = !0
						}
					}.bind(this), 0)
				}
			},
			performLinking: function (t) {
				var i = e.util.splitByBlockElements(t),
					n = !1;
				if (i.length === 0) {
					i = [t]
				}
				;
				for (var o = 0; o < i.length; o++) {
					n = this.removeObsoleteAutoLinkSpans(i[o]) || n;
					n = this.performLinkingWithinElement(i[o]) || n
				}
				;
				this.base.events.updateInput(t, {
					target: t,
					currentTarget: t
				});
				return n
			},
			removeObsoleteAutoLinkSpans: function (t) {
				if (!t || t.nodeType === 3) {
					return !1
				}
				;
				var n = t.querySelectorAll('span[data-auto-link="true"]'),
					a = !1;
				for (var i = 0; i < n.length; i++) {
					var o = n[i].textContent;
					if (o.indexOf('://') === -1) {
						o = e.util.ensureUrlHasProtocol(o)
					}
					;
					if (n[i].getAttribute('data-href') !== o && r(n[i])) {
						a = !0;
						var s = o.replace(/\s+$/, '');
						if (n[i].getAttribute('data-href') === s) {
							var l = o.length - s.length,
								c = e.util.splitOffDOMTree(n[i], this.splitTextBeforeEnd(n[i], l));
							n[i].parentNode.insertBefore(c, n[i].nextSibling)
						} else {
							e.util.unwrap(n[i], this.document)
						}
					}
				}
				;
				return a
			},
			splitTextBeforeEnd: function (e, t) {
				var s = this.document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null, !1),
					r = !0;
				while (r) {
					r = s.lastChild() !== null
				}
				;
				var o, i, n;
				while (t > 0 && n !== null) {
					o = s.currentNode;
					i = o.nodeValue;
					if (i.length > t) {
						n = o.splitText(i.length - t);
						t = 0
					} else {
						n = s.previousNode();
						t -= i.length
					}
				}
				;
				return n
			},
			performLinkingWithinElement: function (t) {
				var n = this.findLinkableText(t),
					s = !1;
				for (var i = 0; i < n.length; i++) {
					var o = e.util.findOrCreateMatchingTextNodes(this.document, t, n[i]);
					if (this.shouldNotLink(o)) {
						continue
					}
					;
					this.createAutoLink(o, n[i].href)
				}
				;
				return s
			},
			shouldNotLink: function (t) {
				var n = !1;
				for (var i = 0; i < t.length && n === !1; i++) {
					n = !!e.util.traverseUp(t[i], function (e) {
						return e.nodeName.toLowerCase() === 'a' || (e.getAttribute && e.getAttribute('data-auto-link') === 'true')
					})
				}
				;
				return n
			},
			findLinkableText: function (e) {
				var c = new RegExp(n, 'gi'),
					r = e.textContent,
					t = null,
					l = [];
				while ((t = c.exec(r)) !== null) {
					var s = !0,
						a = t.index + t[0].length;
					s = (t.index === 0 || i.indexOf(r[t.index - 1]) !== -1) && (a === r.length || i.indexOf(r[a]) !== -1);
					s = s && (t[0].indexOf('/') !== -1 || o.test(t[0].split('.').pop().split('?').shift()));
					if (s) {
						l.push({
							href: t[0],
							start: t.index,
							end: a
						})
					}
				}
				;
				return l
			},
			createAutoLink: function (t, i) {
				i = e.util.ensureUrlHasProtocol(i);
				var n = e.util.createLink(this.document, t, i, this.getEditorOption('targetBlank') ? '_blank' : null),
					o = this.document.createElement('span');
				o.setAttribute('data-auto-link', 'true');
				o.setAttribute('data-href', i);
				n.insertBefore(o, n.firstChild);
				while (n.childNodes.length > 1) {
					o.appendChild(n.childNodes[1])
				}
			}
		});
		e.extensions.autoLink = s
	}());
	(function () {
		'use strict';
		var t = 'medium-editor-dragover';

		function i(i) {
			var n = e.util.getContainerEditorElement(i),
				o = Array.prototype.slice.call(n.parentElement.querySelectorAll('.' + t));
			o.forEach(function (e) {
				e.classList.remove(t)
			})
		};
		var n = e.Extension.extend({
			name: 'fileDragging',
			allowedTypes: ['image'],
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.subscribe('editableDrag', this.handleDrag.bind(this));
				this.subscribe('editableDrop', this.handleDrop.bind(this))
			},
			handleDrag: function (e) {
				e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
				var n = e.target.classList ? e.target : e.target.parentElement;
				i(n);
				if (e.type === 'dragover') {
					n.classList.add(t)
				}
			},
			handleDrop: function (e) {
				e.preventDefault();
				e.stopPropagation();
				this.base.selectElement(e.target);
				var t = this.base.exportSelection();
				t.start = t.end;
				this.base.importSelection(t);
				if (e.dataTransfer.files) {
					Array.prototype.slice.call(e.dataTransfer.files).forEach(function (e) {
						if (this.isAllowedFile(e)) {
							if (e.type.match('image')) {
								this.insertImageFile(e)
							}
						}
					}, this)
				}
				;
				i(e.target)
			},
			isAllowedFile: function (e) {
				return this.allowedTypes.some(function (t) {
					return !!e.type.match(t)
				})
			},
			insertImageFile: function (t) {
				if (typeof FileReader !== 'function') {
					return
				}
				;
				var i = new FileReader();
				i.readAsDataURL(t);
				i.addEventListener('load', function (t) {
					var i = this.document.createElement('img');
					i.src = t.target.result;
					e.util.insertHTMLCommand(this.document, i.outerHTML)
				}.bind(this))
			}
		});
		e.extensions.fileDragging = n
	}());
	(function () {
		'use strict';
		var t = e.Extension.extend({
			name: 'keyboard-commands',
			commands: [{
				command: 'bold',
				key: 'B',
				meta: !0,
				shift: !1,
				alt: !1
			}, {
				command: 'italic',
				key: 'I',
				meta: !0,
				shift: !1,
				alt: !1
			}, {
				command: 'underline',
				key: 'U',
				meta: !0,
				shift: !1,
				alt: !1
			}],
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.subscribe('editableKeydown', this.handleKeydown.bind(this));
				this.keys = {};
				this.commands.forEach(function (e) {
					var t = e.key.charCodeAt(0);
					if (!this.keys[t]) {
						this.keys[t] = []
					}
					;
					this.keys[t].push(e)
				}, this)
			},
			handleKeydown: function (t) {
				var i = e.util.getKeyCode(t);
				if (!this.keys[i]) {
					return
				}
				;
				var n = e.util.isMetaCtrlKey(t),
					o = !!t.shiftKey,
					s = !!t.altKey;
				this.keys[i].forEach(function (e) {
					if (e.meta === n && e.shift === o && (e.alt === s || undefined === e.alt)) {
						t.preventDefault();
						t.stopPropagation();
						if (typeof e.command === 'function') {
							e.command.apply(this)
						} else if (!1 !== e.command) {
							this.execAction(e.command)
						}
					}
				}, this)
			}
		});
		e.extensions.keyboardCommands = t
	}());
	(function () {
		'use strict';
		var t = e.extensions.form.extend({
			name: 'fontname',
			action: 'fontName',
			aria: 'change font name',
			contentDefault: '&#xB1;',
			contentFA: '<i class="fa fa-font"></i>',
			fonts: ['', 'Arial', 'Verdana', 'Times New Roman'],
			init: function () {
				e.extensions.form.prototype.init.apply(this, arguments)
			},
			handleClick: function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (!this.isDisplayed()) {
					var t = this.document.queryCommandValue('fontName') + '';
					this.showForm(t)
				}
				;
				return !1
			},
			getForm: function () {
				if (!this.form) {
					this.form = this.createForm()
				}
				;
				return this.form
			},
			isDisplayed: function () {
				return this.getForm().style.display === 'block'
			},
			hideForm: function () {
				this.getForm().style.display = 'none';
				this.getSelect().value = ''
			},
			showForm: function (e) {
				var t = this.getSelect();
				this.base.saveSelection();
				this.hideToolbarDefaultActions();
				this.getForm().style.display = 'block';
				this.setToolbarPosition();
				t.value = e || '';
				t.focus()
			},
			destroy: function () {
				if (!this.form) {
					return !1
				}
				;
				if (this.form.parentNode) {
					this.form.parentNode.removeChild(this.form)
				}
				;
				delete this.form
			},
			doFormSave: function () {
				this.base.restoreSelection();
				this.base.checkSelection()
			},
			doFormCancel: function () {
				this.base.restoreSelection();
				this.clearFontName();
				this.base.checkSelection()
			},
			createForm: function () {
				var t = this.document,
					e = t.createElement('div'),
					s = t.createElement('select'),
					i = t.createElement('a'),
					n = t.createElement('a'),
					r;
				e.className = 'medium-editor-toolbar-form';
				e.id = 'medium-editor-toolbar-form-fontname-' + this.getEditorId();
				this.on(e, 'click', this.handleFormClick.bind(this));
				for (var o = 0; o < this.fonts.length; o++) {
					r = t.createElement('option');
					r.innerHTML = this.fonts[o];
					r.value = this.fonts[o];
					s.appendChild(r)
				}
				;
				s.className = 'medium-editor-toolbar-select';
				e.appendChild(s);
				this.on(s, 'change', this.handleFontChange.bind(this));
				n.setAttribute('href', '#');
				n.className = 'medium-editor-toobar-save';
				n.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : '&#10003;';
				e.appendChild(n);
				this.on(n, 'click', this.handleSaveClick.bind(this), !0);
				i.setAttribute('href', '#');
				i.className = 'medium-editor-toobar-close';
				i.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : '&times;';
				e.appendChild(i);
				this.on(i, 'click', this.handleCloseClick.bind(this));
				return e
			},
			getSelect: function () {
				return this.getForm().querySelector('select.medium-editor-toolbar-select')
			},
			clearFontName: function () {
				e.selection.getSelectedElements(this.document).forEach(function (e) {
					if (e.nodeName.toLowerCase() === 'font' && e.hasAttribute('face')) {
						e.removeAttribute('face')
					}
				})
			},
			handleFontChange: function () {
				var e = this.getSelect().value;
				if (e === '') {
					this.clearFontName()
				} else {
					this.execAction('fontName', {
						name: e
					})
				}
			},
			handleFormClick: function (e) {
				e.stopPropagation()
			},
			handleSaveClick: function (e) {
				e.preventDefault();
				this.doFormSave()
			},
			handleCloseClick: function (e) {
				e.preventDefault();
				this.doFormCancel()
			}
		});
		e.extensions.fontName = t
	}());
	(function () {
		'use strict';
		var t = e.extensions.form.extend({
			name: 'fontsize',
			action: 'fontSize',
			aria: 'increase/decrease font size',
			contentDefault: '&#xB1;',
			contentFA: '<i class="fa fa-text-height"></i>',
			init: function () {
				e.extensions.form.prototype.init.apply(this, arguments)
			},
			handleClick: function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (!this.isDisplayed()) {
					var t = this.document.queryCommandValue('fontSize') + '';
					this.showForm(t)
				}
				;
				return !1
			},
			getForm: function () {
				if (!this.form) {
					this.form = this.createForm()
				}
				;
				return this.form
			},
			isDisplayed: function () {
				return this.getForm().style.display === 'block'
			},
			hideForm: function () {
				this.getForm().style.display = 'none';
				this.getInput().value = ''
			},
			showForm: function (e) {
				var t = this.getInput();
				this.base.saveSelection();
				this.hideToolbarDefaultActions();
				this.getForm().style.display = 'block';
				this.setToolbarPosition();
				t.value = e || '';
				t.focus()
			},
			destroy: function () {
				if (!this.form) {
					return !1
				}
				;
				if (this.form.parentNode) {
					this.form.parentNode.removeChild(this.form)
				}
				;
				delete this.form
			},
			doFormSave: function () {
				this.base.restoreSelection();
				this.base.checkSelection()
			},
			doFormCancel: function () {
				this.base.restoreSelection();
				this.clearFontSize();
				this.base.checkSelection()
			},
			createForm: function () {
				var o = this.document,
					e = o.createElement('div'),
					t = o.createElement('input'),
					i = o.createElement('a'),
					n = o.createElement('a');
				e.className = 'medium-editor-toolbar-form';
				e.id = 'medium-editor-toolbar-form-fontsize-' + this.getEditorId();
				this.on(e, 'click', this.handleFormClick.bind(this));
				t.setAttribute('type', 'range');
				t.setAttribute('min', '1');
				t.setAttribute('max', '7');
				t.className = 'medium-editor-toolbar-input';
				e.appendChild(t);
				this.on(t, 'change', this.handleSliderChange.bind(this));
				n.setAttribute('href', '#');
				n.className = 'medium-editor-toobar-save';
				n.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-check"></i>' : '&#10003;';
				e.appendChild(n);
				this.on(n, 'click', this.handleSaveClick.bind(this), !0);
				i.setAttribute('href', '#');
				i.className = 'medium-editor-toobar-close';
				i.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ? '<i class="fa fa-times"></i>' : '&times;';
				e.appendChild(i);
				this.on(i, 'click', this.handleCloseClick.bind(this));
				return e
			},
			getInput: function () {
				return this.getForm().querySelector('input.medium-editor-toolbar-input')
			},
			clearFontSize: function () {
				e.selection.getSelectedElements(this.document).forEach(function (e) {
					if (e.nodeName.toLowerCase() === 'font' && e.hasAttribute('size')) {
						e.removeAttribute('size')
					}
				})
			},
			handleSliderChange: function () {
				var e = this.getInput().value;
				if (e === '4') {
					this.clearFontSize()
				} else {
					this.execAction('fontSize', {
						size: e
					})
				}
			},
			handleFormClick: function (e) {
				e.stopPropagation()
			},
			handleSaveClick: function (e) {
				e.preventDefault();
				this.doFormSave()
			},
			handleCloseClick: function (e) {
				e.preventDefault();
				this.doFormCancel()
			}
		});
		e.extensions.fontSize = t
	}());
	(function () {
		'use strict';

		function i() {
			return [
				[new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ''],
				[new RegExp(/<\/b>(<br[^>]*>)?$/gi), ''],
				[new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), ' '],
				[new RegExp(/<br class="Apple-interchange-newline">/g), '<br>'],
				[new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],
				[new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],
				[new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi), '<span class="replace-with bold">'],
				[new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), '<$1$2>'],
				[new RegExp(/&lt;a(?:(?!href).)+href=(?:&quot;|&rdquo;|&ldquo;|"|“|”)(((?!&quot;|&rdquo;|&ldquo;|"|“|”).)*)(?:&quot;|&rdquo;|&ldquo;|"|“|”)(?:(?!&gt;).)*&gt;/gi), '<a href="$1">'],
				[new RegExp(/<\/p>\n+/gi), '</p>'],
				[new RegExp(/\n+<p/gi), '<p'],
				[new RegExp(/<\/?o:[a-z]*>/gi), ''],
				['<!--EndFragment-->', ''],
				['<!--StartFragment-->', '']
			]
		};
		var t = e.Extension.extend({
			forcePlainText: !0,
			cleanPastedHTML: !1,
			preCleanReplacements: [],
			cleanReplacements: [],
			cleanAttrs: ['class', 'style', 'dir'],
			cleanTags: ['meta'],
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				if (this.forcePlainText || this.cleanPastedHTML) {
					this.subscribe('editablePaste', this.handlePaste.bind(this))
				}
			},
			handlePaste: function (t, i) {
				var n, s = '',
					o, l = 'text/html',
					c = 'text/plain',
					r, a;
				if (this.window.clipboardData && t.clipboardData === undefined) {
					t.clipboardData = this.window.clipboardData;
					l = 'Text';
					c = 'Text'
				}
				;
				if (t.clipboardData && t.clipboardData.getData && !t.defaultPrevented) {
					t.preventDefault();
					r = t.clipboardData.getData(l);
					a = t.clipboardData.getData(c);
					if (this.cleanPastedHTML && r) {
						return this.cleanPaste(r)
					}
					;
					if (!(this.getEditorOption('disableReturn') || i.getAttribute('data-disable-return'))) {
						n = a.split(/[\r\n]+/g);
						if (n.length > 1) {
							for (o = 0; o < n.length; o += 1) {
								if (n[o] !== '') {
									s += '<p>' + e.util.htmlEntities(n[o]) + '</p>'
								}
							}
						} else {
							s = e.util.htmlEntities(n[0])
						}
					} else {
						s = e.util.htmlEntities(a)
					}
					;
					e.util.insertHTMLCommand(this.document, s)
				}
			},
			cleanPaste: function (e) {
				var t, s, o, n, a = /<p|<br|<div/.test(e),
					r = [].concat(this.preCleanReplacements || [], i(), this.cleanReplacements || []);
				for (t = 0; t < r.length; t += 1) {
					e = e.replace(r[t][0], r[t][1])
				}
				;
				if (!a) {
					return this.pasteHTML(e)
				}
				;
				o = this.document.createElement('div');
				o.innerHTML = '<p>' + e.split('<br><br>').join('</p><p>') + '</p>';
				s = o.querySelectorAll('a,p,div,br');
				for (t = 0; t < s.length; t += 1) {
					n = s[t];
					n.innerHTML = n.innerHTML.replace(/\n/gi, ' ');
					switch (n.nodeName.toLowerCase()) {
						case 'p':
						case 'div':
							this.filterCommonBlocks(n);
							break;
						case 'br':
							this.filterLineBreak(n);
							break
					}
				}
				;
				this.pasteHTML(o.innerHTML)
			},
			pasteHTML: function (t, i) {
				i = e.util.defaults({}, i, {
					cleanAttrs: this.cleanAttrs,
					cleanTags: this.cleanTags
				});
				var r, n, s, o, a = this.document.createDocumentFragment();
				a.appendChild(this.document.createElement('body'));
				o = a.querySelector('body');
				o.innerHTML = t;
				this.cleanupSpans(o);
				r = o.querySelectorAll('*');
				for (s = 0; s < r.length; s += 1) {
					n = r[s];
					if ('a' === n.nodeName.toLowerCase() && this.getEditorOption('targetBlank')) {
						e.util.setTargetBlank(n)
					}
					;
					e.util.cleanupAttrs(n, i.cleanAttrs);
					e.util.cleanupTags(n, i.cleanTags)
				}
				;
				e.util.insertHTMLCommand(this.document, o.innerHTML.replace(/&nbsp;/g, ' '))
			},
			isCommonBlock: function (e) {
				return (e && (e.nodeName.toLowerCase() === 'p' || e.nodeName.toLowerCase() === 'div'))
			},
			filterCommonBlocks: function (e) {
				if (/^\s*$/.test(e.textContent) && e.parentNode) {
					e.parentNode.removeChild(e)
				}
			},
			filterLineBreak: function (e) {
				if (this.isCommonBlock(e.previousElementSibling)) {
					this.removeWithParent(e)
				} else if (this.isCommonBlock(e.parentNode) && (e.parentNode.firstChild === e || e.parentNode.lastChild === e)) {
					this.removeWithParent(e)
				} else if (e.parentNode && e.parentNode.childElementCount === 1 && e.parentNode.textContent === '') {
					this.removeWithParent(e)
				}
			},
			removeWithParent: function (e) {
				if (e && e.parentNode) {
					if (e.parentNode.parentNode && e.parentNode.childElementCount === 1) {
						e.parentNode.parentNode.removeChild(e.parentNode)
					} else {
						e.parentNode.removeChild(e)
					}
				}
			},
			cleanupSpans: function (t) {
				var n, i, s, o = t.querySelectorAll('.replace-with'),
					r = function (e) {
						return (e && e.nodeName !== '#text' && e.getAttribute('contenteditable') === 'false')
					};
				for (n = 0; n < o.length; n += 1) {
					i = o[n];
					s = this.document.createElement(i.classList.contains('bold') ? 'b' : 'i');
					if (i.classList.contains('bold') && i.classList.contains('italic')) {
						s.innerHTML = '<i>' + i.innerHTML + '</i>'
					} else {
						s.innerHTML = i.innerHTML
					}
					;
					i.parentNode.replaceChild(s, i)
				}
				;
				o = t.querySelectorAll('span');
				for (n = 0; n < o.length; n += 1) {
					i = o[n];
					if (e.util.traverseUp(i, r)) {
						return !1
					}
					;
					e.util.unwrap(i, this.document)
				}
			}
		});
		e.extensions.paste = t
	}());
	(function () {
		'use strict';
		var t = e.Extension.extend({
			name: 'placeholder',
			text: 'Type your text',
			hideOnClick: !0,
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.initPlaceholders();
				this.attachEventHandlers()
			},
			initPlaceholders: function () {
				this.getEditorElements().forEach(function (e) {
					if (!e.getAttribute('data-placeholder')) {
						e.setAttribute('data-placeholder', this.text)
					}
					;
					this.updatePlaceholder(e)
				}, this)
			},
			destroy: function () {
				this.getEditorElements().forEach(function (e) {
					if (e.getAttribute('data-placeholder') === this.text) {
						e.removeAttribute('data-placeholder')
					}
				}, this)
			},
			showPlaceholder: function (e) {
				if (e) {
					e.classList.add('medium-editor-placeholder')
				}
			},
			hidePlaceholder: function (e) {
				if (e) {
					e.classList.remove('medium-editor-placeholder')
				}
			},
			updatePlaceholder: function (e, t) {
				if (e.querySelector('img, blockquote, ul, ol') || (e.textContent.replace(/^\s+|\s+$/g, '') !== '')) {
					return this.hidePlaceholder(e)
				}
				;
				if (!t) {
					this.showPlaceholder(e)
				}
			},
			attachEventHandlers: function () {
				if (this.hideOnClick) {
					this.subscribe('focus', this.handleFocus.bind(this))
				}
				;
				this.subscribe('editableInput', this.handleInput.bind(this));
				this.subscribe('blur', this.handleBlur.bind(this))
			},
			handleInput: function (e, t) {
				var i = this.hideOnClick && (t === this.base.getFocusedElement());
				this.updatePlaceholder(t, i)
			},
			handleFocus: function (e, t) {
				this.hidePlaceholder(t)
			},
			handleBlur: function (e, t) {
				this.updatePlaceholder(t)
			}
		});
		e.extensions.placeholder = t
	}());
	(function () {
		'use strict';
		var t = e.Extension.extend({
			name: 'toolbar',
			align: 'center',
			allowMultiParagraphSelection: !0,
			buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
			diffLeft: 0,
			diffTop: -10,
			firstButtonClass: 'medium-editor-button-first',
			lastButtonClass: 'medium-editor-button-last',
			standardizeSelectionStart: !1,
			static: !1,
			sticky: !1,
			stickyTopOffset: 0,
			updateOnEmptySelection: !1,
			relativeContainer: null,
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.initThrottledMethods();
				if (!this.relativeContainer) {
					this.getEditorOption('elementsContainer').appendChild(this.getToolbarElement())
				} else {
					this.relativeContainer.appendChild(this.getToolbarElement())
				}
			},
			forEachExtension: function (e, t) {
				return this.base.extensions.forEach(function (i) {
					if (i === this) {
						return
					}
					;
					return e.apply(t || this, arguments)
				}, this)
			},
			createToolbar: function () {
				var e = this.document.createElement('div');
				e.id = 'medium-editor-toolbar-' + this.getEditorId();
				e.className = 'medium-editor-toolbar';
				if (this.static) {
					e.className += ' static-toolbar'
				} else if (this.relativeContainer) {
					e.className += ' medium-editor-relative-toolbar'
				} else {
					e.className += ' medium-editor-stalker-toolbar'
				}
				;
				e.appendChild(this.createToolbarButtons());
				this.forEachExtension(function (t) {
					if (t.hasForm) {
						e.appendChild(t.getForm())
					}
				});
				this.attachEventHandlers();
				return e
			},
			createToolbarButtons: function () {
				var t = this.document.createElement('ul'),
					n, o, i, s, r, a;
				t.id = 'medium-editor-toolbar-actions' + this.getEditorId();
				t.className = 'medium-editor-toolbar-actions';
				t.style.display = 'block';
				this.buttons.forEach(function (i) {
					if (typeof i === 'string') {
						r = i;
						a = null
					} else {
						r = i.name;
						a = i
					}
					;
					s = this.base.addBuiltInExtension(r, a);
					if (s && typeof s.getButton === 'function') {
						o = s.getButton(this.base);
						n = this.document.createElement('li');
						if (e.util.isElement(o)) {
							n.appendChild(o)
						} else {
							n.innerHTML = o
						}
						;
						t.appendChild(n)
					}
				}, this);
				i = t.querySelectorAll('button');
				if (i.length > 0) {
					i[0].classList.add(this.firstButtonClass);
					i[i.length - 1].classList.add(this.lastButtonClass)
				}
				;
				return t
			},
			destroy: function () {
				if (this.toolbar) {
					if (this.toolbar.parentNode) {
						this.toolbar.parentNode.removeChild(this.toolbar)
					}
					;
					delete this.toolbar
				}
			},
			getToolbarElement: function () {
				if (!this.toolbar) {
					this.toolbar = this.createToolbar()
				}
				;
				return this.toolbar
			},
			getToolbarActionsElement: function () {
				return this.getToolbarElement().querySelector('.medium-editor-toolbar-actions')
			},
			initThrottledMethods: function () {
				this.throttledPositionToolbar = e.util.throttle(function () {
					if (this.base.isActive) {
						this.positionToolbarIfShown()
					}
				}.bind(this))
			},
			attachEventHandlers: function () {
				this.subscribe('blur', this.handleBlur.bind(this));
				this.subscribe('focus', this.handleFocus.bind(this));
				this.subscribe('editableClick', this.handleEditableClick.bind(this));
				this.subscribe('editableKeyup', this.handleEditableKeyup.bind(this));
				this.on(this.document.documentElement, 'mouseup', this.handleDocumentMouseup.bind(this));
				if (this.static && this.sticky) {
					this.on(this.window, 'scroll', this.handleWindowScroll.bind(this), !0)
				}
				;
				this.on(this.window, 'resize', this.handleWindowResize.bind(this))
			},
			handleWindowScroll: function () {
				this.positionToolbarIfShown()
			},
			handleWindowResize: function () {
				this.throttledPositionToolbar()
			},
			handleDocumentMouseup: function (t) {
				if (t && t.target && e.util.isDescendant(this.getToolbarElement(), t.target)) {
					return !1
				}
				;
				this.checkState()
			},
			handleEditableClick: function () {
				setTimeout(function () {
					this.checkState()
				}.bind(this), 0)
			},
			handleEditableKeyup: function () {
				this.checkState()
			},
			handleBlur: function () {
				clearTimeout(this.hideTimeout);
				clearTimeout(this.delayShowTimeout);
				this.hideTimeout = setTimeout(function () {
					this.hideToolbar()
				}.bind(this), 1)
			},
			handleFocus: function () {
				this.checkState()
			},
			isDisplayed: function () {
				return this.getToolbarElement().classList.contains('medium-editor-toolbar-active')
			},
			showToolbar: function () {
				clearTimeout(this.hideTimeout);
				if (!this.isDisplayed()) {
					this.getToolbarElement().classList.add('medium-editor-toolbar-active');
					this.trigger('showToolbar', {}, this.base.getFocusedElement())
				}
			},
			hideToolbar: function () {
				if (this.isDisplayed()) {
					this.getToolbarElement().classList.remove('medium-editor-toolbar-active');
					this.trigger('hideToolbar', {}, this.base.getFocusedElement())
				}
			},
			isToolbarDefaultActionsDisplayed: function () {
				return this.getToolbarActionsElement().style.display === 'block'
			},
			hideToolbarDefaultActions: function () {
				if (this.isToolbarDefaultActionsDisplayed()) {
					this.getToolbarActionsElement().style.display = 'none'
				}
			},
			showToolbarDefaultActions: function () {
				this.hideExtensionForms();
				if (!this.isToolbarDefaultActionsDisplayed()) {
					this.getToolbarActionsElement().style.display = 'block'
				}
				;
				this.delayShowTimeout = this.base.delay(function () {
					this.showToolbar()
				}.bind(this))
			},
			hideExtensionForms: function () {
				this.forEachExtension(function (e) {
					if (e.hasForm && e.isDisplayed()) {
						e.hideForm()
					}
				})
			},
			multipleBlockElementsSelected: function () {
				var i = /<[^\/>][^>]*><\/[^>]+>/gim,
					n = new RegExp('<(' + e.util.blockContainerElementNames.join('|') + ')[^>]*>', 'g'),
					o = e.selection.getSelectionHtml(this.document).replace(i, ''),
					t = o.match(n);
				return !!t && t.length > 1
			},
			modifySelection: function () {
				var o = this.window.getSelection(),
					t = o.getRangeAt(0);
				if (this.standardizeSelectionStart && t.startContainer.nodeValue && (t.startOffset === t.startContainer.nodeValue.length)) {
					var n = e.util.findAdjacentTextNodeWithContent(e.selection.getSelectionElement(this.window), t.startContainer, this.document);
					if (n) {
						var i = 0;
						while (n.nodeValue.substr(i, 1).trim().length === 0) {
							i = i + 1
						}
						;
						t = e.selection.select(this.document, n, i, t.endContainer, t.endOffset)
					}
				}
			},
			checkState: function () {
				if (this.base.preventSelectionUpdates) {
					return
				}
				;
				if (!this.base.getFocusedElement() || e.selection.selectionInContentEditableFalse(this.window)) {
					return this.hideToolbar()
				}
				;
				var t = e.selection.getSelectionElement(this.window);
				if (!t || this.getEditorElements().indexOf(t) === -1 || t.getAttribute('data-disable-toolbar')) {
					return this.hideToolbar()
				}
				;
				if (this.updateOnEmptySelection && this.static) {
					return this.showAndUpdateToolbar()
				}
				;
				if (!e.selection.selectionContainsContent(this.document) || (this.allowMultiParagraphSelection === !1 && this.multipleBlockElementsSelected())) {
					return this.hideToolbar()
				}
				;
				this.showAndUpdateToolbar()
			},
			showAndUpdateToolbar: function () {
				this.modifySelection();
				this.setToolbarButtonStates();
				this.trigger('positionToolbar', {}, this.base.getFocusedElement());
				this.showToolbarDefaultActions();
				this.setToolbarPosition()
			},
			setToolbarButtonStates: function () {
				this.forEachExtension(function (e) {
					if (typeof e.isActive === 'function' && typeof e.setInactive === 'function') {
						e.setInactive()
					}
				});
				this.checkActiveButtons()
			},
			checkActiveButtons: function () {
				var n = [],
					i = null,
					o = e.selection.getSelectionRange(this.document),
					t, s = function (e) {
						if (typeof e.checkState === 'function') {
							e.checkState(t)
						} else if (typeof e.isActive === 'function' && typeof e.isAlreadyApplied === 'function' && typeof e.setActive === 'function') {
							if (!e.isActive() && e.isAlreadyApplied(t)) {
								e.setActive()
							}
						}
					};
				if (!o) {
					return
				}
				;
				this.forEachExtension(function (e) {
					if (typeof e.queryCommandState === 'function') {
						i = e.queryCommandState();
						if (i !== null) {
							if (i && typeof e.setActive === 'function') {
								e.setActive()
							}
							;
							return
						}
					}
					;
					n.push(e)
				});
				t = e.selection.getSelectedParentElement(o);
				if (!this.getEditorElements().some(function (i) {
						return e.util.isDescendant(i, t, !0)
					})) {
					return
				}
				while (t) {
					n.forEach(s);
					if (e.util.isMediumEditorElement(t)) {
						break
					}
					;
					t = t.parentNode
				}
			},
			positionToolbarIfShown: function () {
				if (this.isDisplayed()) {
					this.setToolbarPosition()
				}
			},
			setToolbarPosition: function () {
				var e = this.base.getFocusedElement(),
					t = this.window.getSelection();
				if (!e) {
					return this
				}
				;
				if (this.static || !t.isCollapsed) {
					this.showToolbar();
					if (!this.relativeContainer) {
						if (this.static) {
							this.positionStaticToolbar(e)
						} else {
							this.positionToolbar(t)
						}
					}
					;
					this.trigger('positionedToolbar', {}, this.base.getFocusedElement())
				}
			},
			positionStaticToolbar: function (e) {
				this.getToolbarElement().style.left = '0';
				var a = (this.document.documentElement && this.document.documentElement.scrollTop) || this.document.body.scrollTop,
					l = this.window.innerWidth,
					t = this.getToolbarElement(),
					n = e.getBoundingClientRect(),
					o = n.top + a,
					c = (n.left + (n.width / 2)),
					s = t.offsetHeight,
					r = t.offsetWidth,
					u = r / 2,
					i;
				if (this.sticky) {
					if (a > (o + e.offsetHeight - s - this.stickyTopOffset)) {
						t.style.top = (o + e.offsetHeight - s) + 'px';
						t.classList.remove('medium-editor-sticky-toolbar')
					} else if (a > (o - s - this.stickyTopOffset)) {
						t.classList.add('medium-editor-sticky-toolbar');
						t.style.top = this.stickyTopOffset + 'px'
					} else {
						t.classList.remove('medium-editor-sticky-toolbar');
						t.style.top = o - s + 'px'
					}
				} else {
					t.style.top = o - s + 'px'
				}
				;
				switch (this.align) {
					case 'left':
						i = n.left;
						break;
					case 'right':
						i = n.right - r;
						break;
					case 'center':
						i = c - u;
						break
				}
				;
				if (i < 0) {
					i = 0
				} else if ((i + r) > l) {
					i = (l - Math.ceil(r) - 1)
				}
				;
				t.style.left = i + 'px'
			},
			positionToolbar: function (e) {
				this.getToolbarElement().style.left = '0';
				this.getToolbarElement().style.right = 'initial';
				var n = e.getRangeAt(0),
					i = n.getBoundingClientRect();
				if (!i || ((i.height === 0 && i.width === 0) && n.startContainer === n.endContainer)) {
					if (n.startContainer.nodeType === 1 && n.startContainer.querySelector('img')) {
						i = n.startContainer.querySelector('img').getBoundingClientRect()
					} else {
						i = n.startContainer.getBoundingClientRect()
					}
				}
				;
				var c = this.window.innerWidth,
					s = (i.left + i.right) / 2,
					t = this.getToolbarElement(),
					r = t.offsetHeight,
					u = t.offsetWidth,
					o = u / 2,
					a = 50,
					l = this.diffLeft - o;
				if (i.top < a) {
					t.classList.add('medium-toolbar-arrow-over');
					t.classList.remove('medium-toolbar-arrow-under');
					t.style.top = a + i.bottom - this.diffTop + this.window.pageYOffset - r + 'px'
				} else {
					t.classList.add('medium-toolbar-arrow-under');
					t.classList.remove('medium-toolbar-arrow-over');
					t.style.top = i.top + this.diffTop + this.window.pageYOffset - r + 'px'
				}
				;
				if (s < o) {
					t.style.left = l + o + 'px';
					t.style.right = 'initial'
				} else if ((c - s) < o) {
					t.style.left = 'auto';
					t.style.right = 0
				} else {
					t.style.left = l + s + 'px';
					t.style.right = 'initial'
				}
			}
		});
		e.extensions.toolbar = t
	}());
	(function () {
		'use strict';
		var t = e.Extension.extend({
			init: function () {
				e.Extension.prototype.init.apply(this, arguments);
				this.subscribe('editableDrag', this.handleDrag.bind(this));
				this.subscribe('editableDrop', this.handleDrop.bind(this))
			},
			handleDrag: function (e) {
				var t = 'medium-editor-dragover';
				e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
				if (e.type === 'dragover') {
					e.target.classList.add(t)
				} else if (e.type === 'dragleave') {
					e.target.classList.remove(t)
				}
			},
			handleDrop: function (t) {
				var n = 'medium-editor-dragover',
					i;
				t.preventDefault();
				t.stopPropagation();
				if (t.dataTransfer.files) {
					i = Array.prototype.slice.call(t.dataTransfer.files, 0);
					i.some(function (t) {
						if (t.type.match('image')) {
							var i, n;
							i = new FileReader();
							i.readAsDataURL(t);
							n = 'medium-img-' + (+new Date());
							e.util.insertHTMLCommand(this.document, '<img class="medium-editor-image-loading" id="' + n + '" />');
							i.onload = function () {
								var e = this.document.getElementById(n);
								if (e) {
									e.removeAttribute('id');
									e.removeAttribute('class');
									e.src = i.result
								}
							}.bind(this)
						}
					}.bind(this))
				}
				;
				t.target.classList.remove(n)
			}
		});
		e.extensions.imageDragging = t
	}());
	(function () {
		'use strict';

		function r(t) {
			var o = e.selection.getSelectionStart(this.options.ownerDocument),
				i = o.textContent,
				n = e.selection.getCaretOffsets(o);
			if ((i[n.left - 1] === undefined) || (i[n.left - 1].trim() === '') || (i[n.left] !== undefined && i[n.left].trim() === '')) {
				t.preventDefault()
			}
		};

		function i(t, i) {
			if (this.options.disableReturn || i.getAttribute('data-disable-return')) {
				t.preventDefault()
			} else if (this.options.disableDoubleReturn || i.getAttribute('data-disable-double-return')) {
				var n = e.selection.getSelectionStart(this.options.ownerDocument);
				if ((n && n.textContent.trim() === '' && n.nodeName.toLowerCase() !== 'li') || (n.previousElementSibling && n.previousElementSibling.nodeName.toLowerCase() !== 'br' && n.previousElementSibling.textContent.trim() === '')) {
					t.preventDefault()
				}
			}
		};

		function a(t) {
			var i = e.selection.getSelectionStart(this.options.ownerDocument),
				n = i && i.nodeName.toLowerCase();
			if (n === 'pre') {
				t.preventDefault();
				e.util.insertHTMLCommand(this.options.ownerDocument, '    ')
			}
			;
			if (e.util.isListItem(i)) {
				t.preventDefault();
				if (t.shiftKey) {
					this.options.ownerDocument.execCommand('outdent', !1, null)
				} else {
					this.options.ownerDocument.execCommand('indent', !1, null)
				}
			}
		};

		function n(t) {
			var n, i = e.selection.getSelectionStart(this.options.ownerDocument),
				o = i.nodeName.toLowerCase(),
				s = /^(\s+|<br\/?>)?$/i,
				r = /h\d/i;
			if (e.util.isKey(t, [e.util.keyCode.BACKSPACE, e.util.keyCode.ENTER]) && i.previousElementSibling && r.test(o) && e.selection.getCaretOffsets(i).left === 0) {
				if (e.util.isKey(t, e.util.keyCode.BACKSPACE) && s.test(i.previousElementSibling.innerHTML)) {
					i.previousElementSibling.parentNode.removeChild(i.previousElementSibling);
					t.preventDefault()
				} else if (!this.options.disableDoubleReturn && e.util.isKey(t, e.util.keyCode.ENTER)) {
					n = this.options.ownerDocument.createElement('p');
					n.innerHTML = '<br>';
					i.previousElementSibling.parentNode.insertBefore(n, i);
					t.preventDefault()
				}
			} else if (e.util.isKey(t, e.util.keyCode.DELETE) && i.nextElementSibling && i.previousElementSibling && !r.test(o) && s.test(i.innerHTML) && r.test(i.nextElementSibling.nodeName.toLowerCase())) {
				e.selection.moveCursor(this.options.ownerDocument, i.nextElementSibling);
				i.previousElementSibling.parentNode.removeChild(i);
				t.preventDefault()
			} else if (e.util.isKey(t, e.util.keyCode.BACKSPACE) && o === 'li' && s.test(i.innerHTML) && !i.previousElementSibling && !i.parentElement.previousElementSibling && i.nextElementSibling && i.nextElementSibling.nodeName.toLowerCase() === 'li') {
				n = this.options.ownerDocument.createElement('p');
				n.innerHTML = '<br>';
				i.parentElement.parentElement.insertBefore(n, i.parentElement);
				e.selection.moveCursor(this.options.ownerDocument, n);
				i.parentElement.removeChild(i);
				t.preventDefault()
			} else if (e.util.isKey(t, e.util.keyCode.BACKSPACE) && (e.util.getClosestTag(i, 'blockquote') !== !1) && e.selection.getCaretOffsets(i).left === 0) {
				t.preventDefault();
				e.util.execFormatBlock(this.options.ownerDocument, 'p')
			}
		};

		function l(t) {
			var i = e.selection.getSelectionStart(this.options.ownerDocument),
				n;
			if (!i) {
				return
			}
			;
			if (e.util.isMediumEditorElement(i) && i.children.length === 0 && !e.util.isBlockContainer(i)) {
				this.options.ownerDocument.execCommand('formatBlock', !1, 'p')
			}
			;
			if (e.util.isKey(t, e.util.keyCode.ENTER) && !e.util.isListItem(i) && !e.util.isBlockContainer(i)) {
				n = i.nodeName.toLowerCase();
				if (n === 'a') {
					this.options.ownerDocument.execCommand('unlink', !1, null)
				} else if (!t.shiftKey && !t.ctrlKey) {
					this.options.ownerDocument.execCommand('formatBlock', !1, 'p')
				}
			}
		};

		function c(e) {
			if (!e._mediumEditors) {
				e._mediumEditors = [null]
			}
			;
			if (!this.id) {
				this.id = e._mediumEditors.length
			}
			;
			e._mediumEditors[this.id] = this
		};

		function u(e) {
			if (!e._mediumEditors || !e._mediumEditors[this.id]) {
				return
			}
			;
			e._mediumEditors[this.id] = null
		};

		function d(t) {
			if (!t) {
				t = []
			}
			;
			if (typeof t === 'string') {
				t = this.options.ownerDocument.querySelectorAll(t)
			}
			;
			if (e.util.isElement(t)) {
				t = [t]
			}
			;
			var i = Array.prototype.slice.apply(t);
			this.elements = [];
			i.forEach(function (e, t) {
				if (e.nodeName.toLowerCase() === 'textarea') {
					this.elements.push(C.call(this, e, t))
				} else {
					this.elements.push(e)
				}
			}, this)
		};

		function h(e, t) {
			Object.keys(t).forEach(function (i) {
				if (e[i] === undefined) {
					e[i] = t[i]
				}
			});
			return e
		};

		function t(e, t, i) {
			var n = {
				'window': i.options.contentWindow,
				'document': i.options.ownerDocument,
				'base': i
			};
			e = h(e, n);
			if (typeof e.init === 'function') {
				e.init()
			}
			;
			if (!e.name) {
				e.name = t
			}
			;
			return e
		};

		function o() {
			if (this.elements.every(function (e) {
					return !!e.getAttribute('data-disable-toolbar')
				})) {
				return !1
			}
			;
			return this.options.toolbar !== !1
		};

		function f() {
			if (!o.call(this)) {
				return !1
			}
			;
			return this.options.anchorPreview !== !1
		};

		function m() {
			return this.options.placeholder !== !1
		};

		function p() {
			return this.options.autoLink !== !1
		};

		function g() {
			return this.options.imageDragging !== !1
		};

		function b() {
			return this.options.keyboardCommands !== !1
		};

		function v() {
			return !this.options.extensions['imageDragging']
		};

		function C(e, t) {
			var i = this.options.ownerDocument.createElement('div'),
				r = Date.now(),
				o = 'medium-editor-' + r + '-' + t,
				s = e.attributes;
			while (this.options.ownerDocument.getElementById(o)) {
				r++;
				o = 'medium-editor-' + r + '-' + t
			}
			;
			i.className = e.className;
			i.id = o;
			i.innerHTML = e.value;
			e.setAttribute('medium-editor-textarea-id', o);
			for (var n = 0, a = s.length; n < a; n++) {
				if (!i.hasAttribute(s[n].nodeName)) {
					i.setAttribute(s[n].nodeName, s[n].nodeValue)
				}
			}
			;
			e.classList.add('medium-editor-hidden');
			e.parentNode.insertBefore(i, e);
			return i
		};

		function y() {
			var e = !1;
			this.elements.forEach(function (t, i) {
				if (!this.options.disableEditing && !t.getAttribute('data-disable-editing')) {
					t.setAttribute('contentEditable', !0);
					t.setAttribute('spellcheck', this.options.spellcheck)
				}
				;
				t.setAttribute('data-medium-editor-element', !0);
				t.setAttribute('role', 'textbox');
				t.setAttribute('aria-multiline', !0);
				t.setAttribute('medium-editor-index', i);
				if (t.hasAttribute('medium-editor-textarea-id')) {
					e = !0
				}
			}, this);
			if (e) {
				this.subscribe('editableInput', function (e, t) {
					var i = t.parentNode.querySelector('textarea[medium-editor-textarea-id="' + t.getAttribute('medium-editor-textarea-id') + '"]');
					if (i) {
						i.value = this.serialize()[t.id].value
					}
				}.bind(this))
			}
		};

		function E() {
			var e;
			this.subscribe('editableKeydownTab', a.bind(this));
			this.subscribe('editableKeydownDelete', n.bind(this));
			this.subscribe('editableKeydownEnter', n.bind(this));
			if (this.options.disableExtraSpaces) {
				this.subscribe('editableKeydownSpace', r.bind(this))
			}
			;
			if (this.options.disableReturn || this.options.disableDoubleReturn) {
				this.subscribe('editableKeydownEnter', i.bind(this))
			} else {
				for (e = 0; e < this.elements.length; e += 1) {
					if (this.elements[e].getAttribute('data-disable-return') || this.elements[e].getAttribute('data-disable-double-return')) {
						this.subscribe('editableKeydownEnter', i.bind(this));
						break
					}
				}
			}
			;
			if (!this.options.disableReturn) {
				this.elements.forEach(function (e) {
					if (!e.getAttribute('data-disable-return')) {
						this.on(e, 'keyup', l.bind(this))
					}
				}, this)
			}
		};

		function w() {
			this.extensions = [];
			Object.keys(this.options.extensions).forEach(function (e) {
				if (e !== 'toolbar' && this.options.extensions[e]) {
					this.extensions.push(t(this.options.extensions[e], e, this))
				}
			}, this);
			if (v.call(this)) {
				var n = this.options.fileDragging;
				if (!n) {
					n = {};
					if (!g.call(this)) {
						n.allowedTypes = []
					}
				}
				;
				this.addBuiltInExtension('fileDragging', n)
			}
			;
			var s = {
				paste: !0,
				'anchor-preview': f.call(this),
				autoLink: p.call(this),
				keyboardCommands: b.call(this),
				placeholder: m.call(this)
			};
			Object.keys(s).forEach(function (e) {
				if (s[e]) {
					this.addBuiltInExtension(e)
				}
			}, this);
			var i = this.options.extensions['toolbar'];
			if (!i && o.call(this)) {
				var r = e.util.extend({}, this.options.toolbar, {
					allowMultiParagraphSelection: this.options.allowMultiParagraphSelection
				});
				i = new e.extensions.toolbar(r)
			}
			;
			if (i) {
				this.extensions.push(t(i, 'toolbar', this))
			}
		};

		function x(t, i) {
			var n = [
				['allowMultiParagraphSelection', 'toolbar.allowMultiParagraphSelection']
			];
			if (i) {
				n.forEach(function (t) {
					if (i.hasOwnProperty(t[0]) && i[t[0]] !== undefined) {
						e.util.deprecated(t[0], t[1], 'v6.0.0')
					}
				})
			}
			;
			return e.util.defaults({}, i, t)
		};

		function s(t, i) {
			var a = /^append-(.+)$/gi,
				l = /justify([A-Za-z]*)$/g,
				n;
			n = a.exec(t);
			if (n) {
				return e.util.execFormatBlock(this.options.ownerDocument, n[1])
			}
			;
			if (t === 'fontSize') {
				return this.options.ownerDocument.execCommand('fontSize', !1, i.size)
			}
			;
			if (t === 'fontName') {
				return this.options.ownerDocument.execCommand('fontName', !1, i.name)
			}
			;
			if (t === 'createLink') {
				return this.createLink(i)
			}
			;
			if (t === 'image') {
				var r = this.options.contentWindow.getSelection().toString().trim();
				return this.options.ownerDocument.execCommand('insertImage', !1, r)
			}
			;
			if (l.exec(t)) {
				var s = this.options.ownerDocument.execCommand(t, !1, null),
					o = e.selection.getSelectedParentElement(e.selection.getSelectionRange(this.options.ownerDocument));
				if (o) {
					T.call(this, e.util.getTopBlockContainer(o))
				}
				;
				return s
			}
			;
			return this.options.ownerDocument.execCommand(t, !1, null)
		};

		function T(t) {
			if (!t) {
				return
			}
			;
			var i, n = Array.prototype.slice.call(t.childNodes).filter(function (e) {
				var t = e.nodeName.toLowerCase() === 'div';
				if (t && !i) {
					i = e.style.textAlign
				}
				;
				return t
			});
			if (n.length) {
				this.saveSelection();
				n.forEach(function (t) {
					if (t.style.textAlign === i) {
						var n = t.lastChild;
						if (n) {
							e.util.unwrap(t, this.options.ownerDocument);
							var o = this.options.ownerDocument.createElement('BR');
							n.parentNode.insertBefore(o, n.nextSibling)
						}
					}
				}, this);
				t.style.textAlign = i;
				this.restoreSelection()
			}
		};
		e.prototype = {
			init: function (e, t) {
				this.options = x.call(this, this.defaults, t);
				this.origElements = e;
				if (!this.options.elementsContainer) {
					this.options.elementsContainer = this.options.ownerDocument.body
				}
				;
				return this.setup()
			},
			setup: function () {
				if (this.isActive) {
					return
				}
				;
				d.call(this, this.origElements);
				if (this.elements.length === 0) {
					return
				}
				;
				this.isActive = !0;
				c.call(this, this.options.contentWindow);
				this.events = new e.Events(this);
				y.call(this);
				w.call(this);
				E.call(this)
			},
			destroy: function () {
				if (!this.isActive) {
					return
				}
				;
				this.isActive = !1;
				this.extensions.forEach(function (e) {
					if (typeof e.destroy === 'function') {
						e.destroy()
					}
				}, this);
				this.events.destroy();
				this.elements.forEach(function (e) {
					if (this.options.spellcheck) {
						e.innerHTML = e.innerHTML
					}
					;
					e.removeAttribute('contentEditable');
					e.removeAttribute('spellcheck');
					e.removeAttribute('data-medium-editor-element');
					e.removeAttribute('role');
					e.removeAttribute('aria-multiline');
					e.removeAttribute('medium-editor-index');
					if (e.hasAttribute('medium-editor-textarea-id')) {
						var t = e.parentNode.querySelector('textarea[medium-editor-textarea-id="' + e.getAttribute('medium-editor-textarea-id') + '"]');
						if (t) {
							t.classList.remove('medium-editor-hidden')
						}
						;
						if (e.parentNode) {
							e.parentNode.removeChild(e)
						}
					}
				}, this);
				this.elements = [];
				u.call(this, this.options.contentWindow)
			},
			on: function (e, t, i, n) {
				this.events.attachDOMEvent(e, t, i, n);
				return this
			},
			off: function (e, t, i, n) {
				this.events.detachDOMEvent(e, t, i, n);
				return this
			},
			subscribe: function (e, t) {
				this.events.attachCustomEvent(e, t);
				return this
			},
			unsubscribe: function (e, t) {
				this.events.detachCustomEvent(e, t);
				return this
			},
			trigger: function (e, t, i) {
				this.events.triggerCustomEvent(e, t, i);
				return this
			},
			delay: function (e) {
				var t = this;
				return setTimeout(function () {
					if (t.isActive) {
						e()
					}
				}, this.options.delay)
			},
			serialize: function () {
				var e, t, i = {};
				for (e = 0; e < this.elements.length; e += 1) {
					t = (this.elements[e].id !== '') ? this.elements[e].id : 'element-' + e;
					i[t] = {
						value: this.elements[e].innerHTML.trim()
					}
				}
				;
				return i
			},
			getExtensionByName: function (e) {
				var t;
				if (this.extensions && this.extensions.length) {
					this.extensions.some(function (i) {
						if (i.name === e) {
							t = i;
							return !0
						}
						;
						return !1
					})
				}
				;
				return t
			},
			addBuiltInExtension: function (i, n) {
				var o = this.getExtensionByName(i),
					s;
				if (o) {
					return o
				}
				;
				switch (i) {
					case 'anchor':
						s = e.util.extend({}, this.options.anchor, n);
						o = new e.extensions.anchor(s);
						break;
					case 'anchor-preview':
						o = new e.extensions.anchorPreview(this.options.anchorPreview);
						break;
					case 'autoLink':
						o = new e.extensions.autoLink();
						break;
					case 'fileDragging':
						o = new e.extensions.fileDragging(n);
						break;
					case 'fontname':
						o = new e.extensions.fontName(this.options.fontName);
						break;
					case 'fontsize':
						o = new e.extensions.fontSize(n);
						break;
					case 'keyboardCommands':
						o = new e.extensions.keyboardCommands(this.options.keyboardCommands);
						break;
					case 'paste':
						o = new e.extensions.paste(this.options.paste);
						break;
					case 'placeholder':
						o = new e.extensions.placeholder(this.options.placeholder);
						break;
					default:
						if (e.extensions.button.isBuiltInButton(i)) {
							if (n) {
								s = e.util.defaults({}, n, e.extensions.button.prototype.defaults[i]);
								o = new e.extensions.button(s)
							} else {
								o = new e.extensions.button(i)
							}
						}
				}
				;
				if (o) {
					this.extensions.push(t(o, i, this))
				}
				;
				return o
			},
			stopSelectionUpdates: function () {
				this.preventSelectionUpdates = !0
			},
			startSelectionUpdates: function () {
				this.preventSelectionUpdates = !1
			},
			checkSelection: function () {
				var e = this.getExtensionByName('toolbar');
				if (e) {
					e.checkState()
				}
				;
				return this
			},
			queryCommandState: function (e) {
				var o = /^full-(.+)$/gi,
					i, n = null;
				i = o.exec(e);
				if (i) {
					e = i[1]
				}
				;
				try {
					n = this.options.ownerDocument.queryCommandState(e)
				} catch (t) {
					n = null
				}
				;
				return n
			},
			execAction: function (t, i) {
				var r = /^full-(.+)$/gi,
					n, o;
				n = r.exec(t);
				if (n) {
					this.saveSelection();
					this.selectAllContents();
					o = s.call(this, n[1], i);
					this.restoreSelection()
				} else {
					o = s.call(this, t, i)
				}
				;
				if (t === 'insertunorderedlist' || t === 'insertorderedlist') {
					e.util.cleanListDOM(this.options.ownerDocument, this.getSelectedParentElement())
				}
				;
				this.checkSelection();
				return o
			},
			getSelectedParentElement: function (t) {
				if (t === undefined) {
					t = this.options.contentWindow.getSelection().getRangeAt(0)
				}
				;
				return e.selection.getSelectedParentElement(t)
			},
			selectAllContents: function () {
				var t = e.selection.getSelectionElement(this.options.contentWindow);
				if (t) {
					while (t.children.length === 1) {
						t = t.children[0]
					}
					;
					this.selectElement(t)
				}
			},
			selectElement: function (t) {
				e.selection.selectNode(t, this.options.ownerDocument);
				var i = e.selection.getSelectionElement(this.options.contentWindow);
				if (i) {
					this.events.focusElement(i)
				}
			},
			getFocusedElement: function () {
				var e;
				this.elements.some(function (t) {
					if (!e && t.getAttribute('data-medium-focused')) {
						e = t
					}
					;
					return !!e
				}, this);
				return e
			},
			exportSelection: function () {
				var n = e.selection.getSelectionElement(this.options.contentWindow),
					i = this.elements.indexOf(n),
					t = null;
				if (i >= 0) {
					t = e.selection.exportSelection(n, this.options.ownerDocument)
				}
				;
				if (t !== null && i !== 0) {
					t.editableElementIndex = i
				}
				;
				return t
			},
			saveSelection: function () {
				this.selectionState = this.exportSelection()
			},
			importSelection: function (t, i) {
				if (!t) {
					return
				}
				;
				var n = this.elements[t.editableElementIndex || 0];
				e.selection.importSelection(t, n, this.options.ownerDocument, i)
			},
			restoreSelection: function () {
				this.importSelection(this.selectionState)
			},
			createLink: function (t) {
				var l = e.selection.getSelectionElement(this.options.contentWindow),
					c = {};
				if (this.elements.indexOf(l) === -1) {
					return
				}
				;
				try {
					this.events.disableCustomEvent('editableInput');
					if (t.url && t.url.trim().length > 0) {
						var p = this.options.contentWindow.getSelection();
						if (p) {
							var n = p.getRangeAt(0),
								r = n.commonAncestorContainer,
								s, d, m, a;
							if (n.endContainer.nodeType === 3 && n.startContainer.nodeType !== 3 && n.startOffset === 0 && n.startContainer.firstChild === n.endContainer) {
								r = n.endContainer
							}
							;
							d = e.util.getClosestBlockContainer(n.startContainer);
							m = e.util.getClosestBlockContainer(n.endContainer);
							if (r.nodeType !== 3 && r.textContent.length !== 0 && d === m) {
								var i = (d || l),
									o = this.options.ownerDocument.createDocumentFragment();
								this.execAction('unlink');
								s = this.exportSelection();
								o.appendChild(i.cloneNode(!0));
								if (l === i) {
									e.selection.select(this.options.ownerDocument, i.firstChild, 0, i.lastChild, i.lastChild.nodeType === 3 ? i.lastChild.nodeValue.length : i.lastChild.childNodes.length)
								} else {
									e.selection.select(this.options.ownerDocument, i, 0, i, i.childNodes.length)
								}
								;
								var f = this.exportSelection();
								a = e.util.findOrCreateMatchingTextNodes(this.options.ownerDocument, o, {
									start: s.start - f.start,
									end: s.end - f.start,
									editableElementIndex: s.editableElementIndex
								});
								if (a.length === 0) {
									o = this.options.ownerDocument.createDocumentFragment();
									o.appendChild(r.cloneNode(!0));
									a = [o.firstChild.firstChild, o.firstChild.lastChild]
								}
								;
								e.util.createLink(this.options.ownerDocument, a, t.url.trim());
								var h = (o.firstChild.innerHTML.match(/^\s+/) || [''])[0].length;
								e.util.insertHTMLCommand(this.options.ownerDocument, o.firstChild.innerHTML.replace(/^\s+/, ''));
								s.start -= h;
								s.end -= h;
								this.importSelection(s)
							} else {
								this.options.ownerDocument.execCommand('createLink', !1, t.url)
							}
							;
							if (this.options.targetBlank || t.target === '_blank') {
								e.util.setTargetBlank(e.selection.getSelectionStart(this.options.ownerDocument), t.url)
							} else {
								e.util.removeTargetBlank(e.selection.getSelectionStart(this.options.ownerDocument), t.url)
							}
							;
							if (t.buttonClass) {
								e.util.addClassToAnchors(e.selection.getSelectionStart(this.options.ownerDocument), t.buttonClass)
							}
						}
					}
					;
					if (this.options.targetBlank || t.target === '_blank' || t.buttonClass) {
						c = this.options.ownerDocument.createEvent('HTMLEvents');
						c.initEvent('input', !0, !0, this.options.contentWindow);
						for (var u = 0; u < this.elements.length; u += 1) {
							this.elements[u].dispatchEvent(c)
						}
					}
				} finally {
					this.events.enableCustomEvent('editableInput')
				}
				;
				this.events.triggerCustomEvent('editableInput', c, l)
			},
			cleanPaste: function (e) {
				this.getExtensionByName('paste').cleanPaste(e)
			},
			pasteHTML: function (e, t) {
				this.getExtensionByName('paste').pasteHTML(e, t)
			},
			setContent: function (e, t) {
				t = t || 0;
				if (this.elements[t]) {
					var i = this.elements[t];
					i.innerHTML = e;
					this.events.updateInput(i, {
						target: i,
						currentTarget: i
					})
				}
			}
		}
	}());
	(function () {
		e.prototype.defaults = {
			activeButtonClass: 'medium-editor-button-active',
			buttonLabels: !1,
			delay: 0,
			disableReturn: !1,
			disableDoubleReturn: !1,
			disableExtraSpaces: !1,
			disableEditing: !1,
			autoLink: !1,
			elementsContainer: !1,
			contentWindow: window,
			ownerDocument: document,
			targetBlank: !1,
			extensions: {},
			spellcheck: !0
		}
	})();
	e.parseVersionString = function (e) {
		var i = e.split('-'),
			t = i[0].split('.'),
			n = (i.length > 1) ? i[1] : '';
		return {
			major: parseInt(t[0], 10),
			minor: parseInt(t[1], 10),
			revision: parseInt(t[2], 10),
			preRelease: n,
			toString: function () {
				return [t[0], t[1], t[2]].join('.') + (n ? '-' + n : '')
			}
		}
	};
	e.version = e.parseVersionString.call(this, ({
		'version': '5.16.1'
	}).version);
	return e
}()));
