// This file is just for reference.
// It's the de-obfuscated source code of the website we're trying to augment.

;var App = new function () {
	var self = this;
	this.adBlock = false;
	this.lightbox = null;
	this.init = function () {
		var body = $('body'), toolt = $('[data-toggle=tooltip]'), tabs = $('[data-toggle=tab]');
		this.lightbox = lity();
		toastr.options.newestOnTop = true;
		toastr.options.progressBar = true;
		toastr.options.positionClass = 'toast-bottom-left';
		toolt.tooltip({container: 'body'});
		tabs.on('click', function () {
			var t = $(this), e = t.parents('[data-toggle-container]'), n = e.find('[data-toggle=tab]'), i = t.data('target'), s = $(i), o = s.parents('.tabs'), a = o.find('.tab-pane');
			n.removeClass('is-active');
			t.addClass('is-active');
			a.removeClass('is-active');
			s.addClass('is-active');
			return false
		});
		body.on('click', '[data-href]', function () {
			var t = $(this), s = t.data('href'), e = t.attr('target');
			if (e == '_blank') {
				window.open(s, '_blank')
			}
			else {
				window.location = s
			}
			;
			return false
		});
		body.on('click', '[data-lightbox]', this.lightbox)
	};
	this.request = function (url, suc, err) {
		return $.ajax({
			url: url, type: 'get', dataType: 'json', success: function (t) {
				if (!t) {
					err('The response from the server was empty.')
				}
				else if (t.status == 'success') {
					suc(t)
				}
				else {
					err(t.message)
				}
			}, error: function (t, s) {
				err('The response from the server was invalid.')
			}
		})
	};
	this.postRequest = function (url, data, suc, err) {
		return $.ajax({
			url: url, type: 'post', data: data, dataType: 'json', success: function (t) {
				if (!t) {
					err('The response from the server was empty.')
				}
				else if (t.status == 'success') {
					suc(t)
				}
				else {
					err(t.message)
				}
			}, error: function (t, s) {
				err('The response from the server was invalid.')
			}
		})
	};
	this.info = function (text, title) {
		return toastr.info(text, title)
	};
	this.warning = function (text, title) {
		return toastr.warning(text, title)
	};
	this.success = function (text, title) {
		return toastr.success(text, title)
	};
	this.error = function (text, title) {
		return toastr.error(text, title)
	};
	this.isMobile = function () {
		return $(window).width() < 768
	};
	this.checkAdBlock = function () {
		var e = $('body'), n = $('.ad-unit-hidden'), s = function () {
			if (n.is(':hidden')) {
				e.addClass('is-adblocked');
				return self.adBlock = true
			}
			;
			return false
		};
		setTimeout(s, 100);
		return s()
	}
};
;App.header = new function () {
	var self = this;
	this.init = function () {
		var searchbox = $('.header-map-search'), locate = $('.header-map-locate');
		searchbox.each(function () {
			var theBox = $(this), field = theBox.find('[name=name]'), submit = theBox.find('[type=submit]');
			field.on('keyup', function () {
				var o = field.val().trim();
				if (o) {
					submit.removeAttr('disabled')
				}
				else {
					submit.attr('disabled', true)
				}
			});
			theBox.on('submit', function () {
				var o = encodeURIComponent(field.val().trim());
				field.attr('disabled', true);
				submit.attr('disabled', true);
				submit.html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
				App.request('/map/lookup/' + o, function (o) {
					field.removeAttr('disabled');
					submit.removeAttr('disabled');
					submit.html('<span class="glyphicon glyphicon-search"></span>');
					if (!App.home.initialised) {
						window.location = '/#/@' + o.latitude + ',' + o.longitude
					}
					else {
						App.home.latitude = o.latitude;
						App.home.longitude = o.longitude;
						App.home.map.panTo({lat: o.latitude, lng: o.longitude});
						App.home.markers.center.setLatLng({lat: o.latitude, lng: o.longitude});
						App.home.updateMarkers();
						App.home.findNearbyPokemon(o.latitude, o.longitude);
						window.location.hash = '#/@' + o.latitude + ',' + o.longitude
					}
				}, function (o) {
					field.removeAttr('disabled');
					submit.removeAttr('disabled');
					submit.html('<span class="glyphicon glyphicon-remove-sign"></span>');
					App.errorBubble(o)
				});
				return false
			})
		});
		locate.on('click', function () {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (e) {
					var t = e.coords.latitude, o = e.coords.longitude;
					App.home.latitude = t;
					App.home.longitude = o;
					App.home.map.panTo({lat: t, lng: o});
					App.home.markers.center.setLatLng({lat: t, lng: o});
					App.home.updateMarkers();
					App.home.findNearbyPokemon(t, o);
					window.location.hash = '#/@' + t + ',' + o
				}, function (e) {
					App.errorBubble(e.message)
				})
			}
			else {
				App.errorBubble('Your browser doesn\'t support location tracking, sorry!')
			}
			;
			return false
		})
	}
};
;App.home = new function () {
	var self = this;
	this.TIMER_JOB = 2500;
	this.TIMER_UPDATE = 30000;
	this.TIMER_ERROR = 30000;
	this.TIMER_SCAN_ERROR = 30000;
	this.TIMER_SCAN_DELAY = 30000;
	this.initialised = false;
	this.loading = false;
	this.scanning = false;
	this.loadingTimer = null;
	this.map = null;
	this.tooltipElem = null;
	this.latitude = 34.00872705055818;
	this.longitude = -118.49764466285706;
	this.pokedex = {};
	this.pokemon = [];
	this.markers = {};
	this.init = function (opts) {
		this.initialised = true;
		this.latitude = opts.latitude || this.latitude;
		this.longitude = opts.longitude || this.longitude;
		this.pokedex = opts.pokedex || this.pokedex;
		setInterval(this.updateMarkers, 1000)
	};
	this.initMap = function () {
		var n = $('.home-map-wrapper'), o = $('.home-map-scan');
		this.tooltipElem = $('.home-map-tooltip');
		this.map = L.map(n.get(0), {center: {lat: this.latitude, lng: this.longitude}, zoom: 17, zoomControl: false});
		this.map.attributionControl.setPrefix(false);
		var i = L.Control.extend({
			options: {position: 'bottomright', marginTop: 0, marginLeft: 0, marginBottom: 0, marginRight: 0}, onAdd: function () {
				var e = L.DomUtil.create('div', 'esri-leaflet-logo');
				e.style.marginTop = this.options.marginTop;
				e.style.marginLeft = this.options.marginLeft;
				e.style.marginBottom = this.options.marginBottom;
				e.style.marginRight = this.options.marginRight;
				e.innerHTML = '<a href="https://www.esri.com/" target="_blank" style="border: none;"><img src="//js.arcgis.com/3.13/esri/images/map/logo-sm.png" alt="Powered by Esri" style="border: none;"></a>';
				return e
			}
		});
		var t = new i({marginBottom: 10, marginRight: 10});
		t.addTo(this.map);
		L.control.zoom({position: 'bottomright'}).addTo(this.map);
		L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: '<a href="https://www.esri.com/">&copy; Esri</a>, USGS, NOAA'}).addTo(this.map);
		L.Icon.Default.imagePath = '/asset/image/leaflet/';
		this.markers.center = L.marker({lat: this.latitude, lng: this.longitude}).addTo(this.map);
		this.map.on('click', function (t) {
			self.markers.center.setLatLng(t.latlng);
			self.latitude = t.latlng.lat;
			self.longitude = t.latlng.lng;
			self.findNearbyPokemon(self.latitude, self.longitude);
			window.history.replaceState(null, null, '#/@' + self.latitude + ',' + self.longitude)
		});
		o.on('click', function () {
			self.findNearbyPokemon(self.latitude, self.longitude, true);
			return false
		}).removeAttr('disabled');
		this.updateMarkers();
		this.findNearbyPokemon(this.latitude, this.longitude);
		setInterval(function () {
			self.findNearbyPokemon(self.latitude, self.longitude)
		}, this.TIMER_UPDATE)
	};
	this.findNearbyPokemon = function (t, n, s, r) {
		var o = $('.home-map-loading'), i = o.find('.loading-message'), a = $('.home-map-scan');
		if (self.loading) {
			return
		}
		;
		if (self.scanning && !r) {
			return
		}
		;
		if (!self.scanning && self.loadingTimer) {
			clearInterval(self.loadingTimer);
			self.loadingTimer = null
		}
		;
		self.loading = true;
		if (o.is(':hidden')) {
			o.addClass('home-map-loading-mini');
			o.fadeIn(200)
		}
		;
		if (s) {
			self.scanning = true;
			a.attr('disabled', true);
			a.find('strong').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
			return App.request('/map/scan/' + t + '/' + n, function (i) {
				self.loading = false;
				self.loadingTimer = setTimeout(function () {
					self.findNearbyPokemon(t, n, false, i.jobId)
				}, self.TIMER_JOB)
			}, function (o) {
				if (o.indexOf('{disabled}') > -1) {
					i.text('Scanning is currently disabled temporarily, retrying in ' + (self.TIMER_ERROR / 1000) + ' seconds.');
					i.css('display', 'inline-block')
				}
				else if (o.indexOf('{scan-throttle}') > -1) {
					i.text('You already scanned recently, retrying in ' + (self.TIMER_ERROR / 1000) + ' seconds.');
					i.css('display', 'inline-block')
				}
				else {
					i.text('Unable to send scan request due to an internal error, retrying in ' + (self.TIMER_ERROR / 1000) + ' seconds.');
					i.css('display', 'inline-block')
				}
				;
				self.loading = false;
				self.loadingTimer = setTimeout(function () {
					self.scanning = false;
					self.findNearbyPokemon(t, n, true)
				}, self.TIMER_SCAN_ERROR)
			})
		}
		;
		return App.request('/map/data/' + t + '/' + n + (r ? '/' + r : ''), function (s) {
			if (s.jobStatus) {
				if (s.jobStatus == 'failure' || s.jobStatus == 'unknown') {
					i.text('Unable to scan for pokemon, retrying in ' + (self.TIMER_SCAN_ERROR / 1000) + ' seconds. If this continues to fail then the Pokemon servers are currently unstable or offline.');
					i.css('display', 'inline-block');
					self.loading = false;
					self.loadingTimer = setTimeout(function () {
						self.scanning = false;
						self.findNearbyPokemon(t, n, true)
					}, self.TIMER_SCAN_ERROR)
				}
				else if (s.jobStatus == 'in_progress') {
					i.text('');
					i.hide();
					self.loading = false;
					self.loadingTimer = setTimeout(function () {
						self.findNearbyPokemon(t, n, false, r)
					}, self.TIMER_JOB)
				}
				;
				return
			}
			;
			for (var d in s.pokemon) {
				var l = false;
				for (var m in self.pokemon) {
					if (self.pokemon[m].id == s.pokemon[d].id) {
						l = true
					}
				}
				;
				if (!l) {
					self.pokemon.push(s.pokemon[d])
				}
			}
			;
			self.updateMarkers();
			if (self.scanning) {
				i.text('');
				i.hide();
				App.successBubble('Scan complete! You can re-scan the area for new pokemon that spawn soon.');
				a.addClass('is-on-cooldown');
				a.find('strong').text('Click To Find Pokémon Near Marker');
				setTimeout(function () {
					a.removeClass('is-on-cooldown');
					a.removeAttr('disabled')
				}, self.TIMER_SCAN_DELAY)
			}
			;
			self.scanning = false;
			self.loading = false;
			self.loadingTimer = null;
			if (o.is(':visible')) {
				o.fadeOut(200)
			}
		}, function (o) {
			i.text('Unable to process response. We are aware of this issue and trying to fix. Please try to refresh the page to potentially solve issue!');
			i.css('display', 'inline-block');
			self.loading = false;
			self.loadingTimer = setTimeout(function () {
				self.findNearbyPokemon(t, n, false, r)
			}, self.TIMER_ERROR)
		})
	};
	this.updateMarkers = function () {
		if (!self.map) {
			return
		}
		;
		for (var i in self.pokemon) {
			var n = self.pokemon[i], o = n.expiration_time - Math.floor(+new Date() / 1000), t = self.markers['pokemon-' + i];
			if (o <= 0) {
				if (t) {
					self.map.removeLayer(t);
					delete self.markers['pokemon-' + i]
				}
				;
				delete self.pokemon[i];
				continue
			}
			;
			if (!t) {
				t = self.createMarker(i, n)
			}
			;
			t.updateLabel(self.secondsToString(o))
		}
	};
	this.createMarker = function (t, i) {
		var a = $('body'), r = i.expiration_time - Math.floor(+new Date() / 1000), s = L.Icon.Label.extend({options: {iconUrl: '//ugc.pokevision.com/images/pokemon/' + i.pokemonId + '.png', shadowUrl: null, iconSize: new L.Point(48, 48), iconAnchor: new L.Point(0, 0), labelAnchor: new L.Point(10, 26), wrapperAnchor: new L.Point(0, 0), labelClassName: 'home-map-label'}});
		var o = new s({labelText: self.secondsToString(r)});
		var n = new L.Marker.Label({lat: i.latitude, lng: i.longitude}, {icon: o});
		n.on('mouseover', function (t) {
			var n = $(t.target._icon), o = i.expiration_time - Math.floor(+new Date() / 1000), r = '<strong>' + (self.pokedex[i.pokemonId] || 'Unknown') + '</strong><small>Despawns in ' + self.secondsToString(o);
			self.tooltipElem.css({top: (n.offset().top - (a.hasClass('embed-map') ? 0 : 96)) + 'px', left: n.offset().left + 'px'});
			self.tooltipElem.removeAttr('title');
			self.tooltipElem.attr('data-original-title', r);
			self.tooltipElem.tooltip({trigger: 'manual', html: true}).tooltip('show')
		});
		n.on('mouseout', function () {
			var e = $('.tooltip');
			e.remove()
		});
		self.markers['pokemon-' + t] = n;
		self.map.addLayer(n);
		return n
	};
	this.secondsToString = function (e) {
		var o = parseInt(e, 10), t = Math.floor(o / 3600), i = Math.floor((o - (t * 3600)) / 60), n = o - (t * 3600) - (i * 60);
		if (t < 10)t = '0' + t;
		if (i < 10)i = '0' + i;
		if (n < 10)n = '0' + n;
		if (t > 0) {
			return t + ':' + i + ':' + n
		}
		;
		return i + ':' + n
	}
};


