
L.Icon.Label = L.Icon.extend({
	options: {
		labelClassName: ''
	},
	initialize: function (e) {
		L.Util.setOptions(this, e);
		L.Icon.prototype.initialize.call(this, this.options)
	},
	setLabelAsHidden: function () {
		this._labelHidden = !0
	},
	createIcon: function () {
		return this._createLabel(L.Icon.prototype.createIcon.call(this))
	},
	createShadow: function () {
		if (!this.options.shadowUrl) {
			return null
		}
		;
		var e = L.Icon.prototype.createShadow.call(this);
		if (e) {
			e.style.marginLeft = (-this.options.wrapperAnchor.x) + 'px';
			e.style.marginTop = (-this.options.wrapperAnchor.y) + 'px'
		}
		;
		return e
	},
	updateLabel: function (e, t) {
		if (e.nodeName.toUpperCase() === 'DIV') {
			e.childNodes[1].innerHTML = t;
			this.options.labelText = t
		}
	},
	showLabel: function (e) {
		if (!this._labelTextIsSet()) {
			return
		}
		;
		e.childNodes[1].style.display = 'block'
	},
	hideLabel: function (e) {
		if (!this._labelTextIsSet()) {
			return
		}
		;
		e.childNodes[1].style.display = 'none'
	},
	_createLabel: function (e) {
		if (!this._labelTextIsSet()) {
			return e
		}
		;
		var t = document.createElement('div'),
			n = document.createElement('span');
		t.style.marginLeft = (-this.options.wrapperAnchor.x) + 'px';
		t.style.marginTop = (-this.options.wrapperAnchor.y) + 'px';
		t.className = 'leaflet-marker-icon-wrapper leaflet-zoom-animated';
		n.className = 'leaflet-marker-iconlabel ' + this.options.labelClassName;
		n.innerHTML = this.options.labelText;
		n.style.marginLeft = this.options.labelAnchor.x + 'px';
		n.style.marginTop = this.options.labelAnchor.y + 'px';
		if (this._labelHidden) {
			n.style.display = 'none';
			e.style.cursor = 'pointer'
		}
		;
		e.style.marginLeft = this.options.iconAnchor.x + 'px';
		e.style.marginTop = this.options.iconAnchor.y + 'px';
		t.appendChild(e);
		t.appendChild(n);
		return t
	},
	_labelTextIsSet: function () {
		return typeof this.options.labelText !== 'undefined' && this.options.labelText !== null
	}
});
L.Icon.Label.Default = L.Icon.Label.extend({
	options: {
		labelAnchor: new L.Point(29, 8),
		wrapperAnchor: new L.Point(13, 41),
		iconAnchor: new L.Point(0, 0),
		labelText: null,
		iconUrl: L.Icon.Default.imagePath + '/marker-icon.png',
		iconSize: new L.Point(25, 41),
		popupAnchor: new L.Point(0, -33),
		shadowUrl: L.Icon.Default.imagePath + '/marker-shadow.png',
		shadowSize: new L.Point(41, 41)
	}
});
L.Marker.Label = L.Marker.extend({
	updateLabel: function (e) {
		this.options.icon.updateLabel(this._icon, e)
	},
	_initIcon: function () {
		if (!(this.options.icon instanceof L.Icon.Label)) {
			throw new Error('Icon must be an instance of L.Icon.Label.')
		}
		;
		if (this.options.revealing) {
			this.options.icon.setLabelAsHidden()
		}
		;
		L.Marker.prototype._initIcon.call(this)
	},
	_removeIcon: function () {
		if (this.options.revealing) {
			L.DomEvent.off(this._icon, 'mouseover', this._showLabel).off(this._icon, 'mouseout', this._hideLabel)
		}
		;
		L.Marker.prototype._removeIcon.call(this)
	},
	_initInteraction: function () {
		L.Marker.prototype._initInteraction.call(this);
		if (!this.options.revealing) {
			return
		}
		;
		L.DomEvent.on(this._icon, 'mouseover', this._showLabel, this).on(this._icon, 'mouseout', this._hideLabel, this)
	},
	_showLabel: function () {
		this.options.icon.showLabel(this._icon)
	},
	_hideLabel: function () {
		this.options.icon.hideLabel(this._icon)
	}
});
;
