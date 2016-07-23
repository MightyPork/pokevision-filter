var App = new function () {
	var self = this;
	this.adBlock = false;
	this.lightbox = null;
	this.init = function () {
		var $body = $('body'), s = $('[data-toggle=tooltip]'), e = $('[data-toggle=tab]');
		this.lightbox = lity();
		toastr.options.newestOnTop = true;
		toastr.options.progressBar = true;
		toastr.options.positionClass = 'toast-bottom-left';
		s.tooltip({container: 'body'});
		e.on('click', function () {
			var t = $(this), e = t.parents('[data-toggle-container]'), n = e.find('[data-toggle=tab]'), i = t.data('target'), s = $(i), o = s.parents('.tabs'), a = o.find('.tab-pane');
			n.removeClass('is-active');
			t.addClass('is-active');
			a.removeClass('is-active');
			s.addClass('is-active');
			return false
		});
		$body.on('click', '[data-href]', function () {
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
		$body.on('click', '[data-lightbox]', this.lightbox)
	};
	this.request = function (t, s, e) {
		return $.ajax({
			url: t, type: 'get', dataType: 'json', success: function (t) {
				if (!t) {
					e('The response from the server was empty.')
				}
				else if (t.status == 'success') {
					s(t)
				}
				else {
					e(t.message)
				}
			}, error: function (t, s) {
				e('The response from the server was invalid.')
			}
		})
	};
	this.postRequest = function (t, s, n, e) {
		return $.ajax({
			url: t, type: 'post', data: s, dataType: 'json', success: function (t) {
				if (!t) {
					e('The response from the server was empty.')
				}
				else if (t.status == 'success') {
					n(t)
				}
				else {
					e(t.message)
				}
			}, error: function (t, s) {
				e('The response from the server was invalid.')
			}
		})
	};
	this.info = function (t, s) {
		return toastr.info(t, s)
	};
	this.warning = function (t, s) {
		return toastr.warning(t, s)
	};
	this.success = function (t, s) {
		return toastr.success(t, s)
	};
	this.error = function (t, s) {
		return toastr.error(t, s)
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
	var e = this;
	this.init = function () {
		var e = $('.header-map-search'), t = $('.header-map-locate');
		e.each(function () {
			var o = $(this), t = o.find('[name=name]'), e = o.find('[type=submit]');
			t.on('keyup', function () {
				var o = t.val().trim();
				if (o) {
					e.removeAttr('disabled')
				}
				else {
					e.attr('disabled', true)
				}
			});
			o.on('submit', function () {
				var o = encodeURIComponent(t.val().trim());
				t.attr('disabled', true);
				e.attr('disabled', true);
				e.html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
				App.request('/map/lookup/' + o, function (o) {
					t.removeAttr('disabled');
					e.removeAttr('disabled');
					e.html('<span class="glyphicon glyphicon-search"></span>');
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
					t.removeAttr('disabled');
					e.removeAttr('disabled');
					e.html('<span class="glyphicon glyphicon-remove-sign"></span>');
					App.error(o)
				});
				return false
			})
		});
		t.on('click', function () {
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
					App.error(e.message)
				})
			}
			else {
				App.error('Your browser doesn\'t support location tracking, sorry!')
			}
			;
			return false
		})
	}
};
;App.home = new function () {
	var e = this;
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
	this.init = function (e) {
		this.initialised = true;
		this.latitude = e.latitude || this.latitude;
		this.longitude = e.longitude || this.longitude;
		this.pokedex = e.pokedex || this.pokedex;
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
			e.markers.center.setLatLng(t.latlng);
			e.latitude = t.latlng.lat;
			e.longitude = t.latlng.lng;
			e.findNearbyPokemon(e.latitude, e.longitude);
			window.history.replaceState(null, null, '#/@' + e.latitude + ',' + e.longitude)
		});
		o.on('click', function () {
			e.findNearbyPokemon(e.latitude, e.longitude, true);
			return false
		}).removeAttr('disabled');
		this.updateMarkers();
		this.findNearbyPokemon(this.latitude, this.longitude);
		setInterval(function () {
			e.findNearbyPokemon(e.latitude, e.longitude)
		}, this.TIMER_UPDATE)
	};
	this.findNearbyPokemon = function (t, n, s, r) {
		var o = $('.home-map-loading'), i = o.find('.loading-message'), a = $('.home-map-scan');
		if (e.loading) {
			return
		}
		;
		if (e.scanning && !r) {
			return
		}
		;
		if (!e.scanning && e.loadingTimer) {
			clearInterval(e.loadingTimer);
			e.loadingTimer = null
		}
		;
		e.loading = true;
		if (o.is(':hidden')) {
			o.addClass('home-map-loading-mini');
			o.fadeIn(200)
		}
		;
		if (s) {
			e.scanning = true;
			a.attr('disabled', true);
			a.find('strong').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
			return App.request('/map/scan/' + t + '/' + n, function (i) {
				e.loading = false;
				e.loadingTimer = setTimeout(function () {
					e.findNearbyPokemon(t, n, false, i.jobId)
				}, e.TIMER_JOB)
			}, function (o) {
				if (o.indexOf('{disabled}') > -1) {
					i.text('Scanning is currently disabled temporarily, retrying in ' + (e.TIMER_ERROR / 1000) + ' seconds.');
					i.css('display', 'inline-block')
				}
				else if (o.indexOf('{scan-throttle}') > -1) {
					i.text('You already scanned recently, retrying in ' + (e.TIMER_ERROR / 1000) + ' seconds.');
					i.css('display', 'inline-block')
				}
				else {
					i.text('Unable to send scan request due to an internal error, retrying in ' + (e.TIMER_ERROR / 1000) + ' seconds.');
					i.css('display', 'inline-block')
				}
				;
				e.loading = false;
				e.loadingTimer = setTimeout(function () {
					e.scanning = false;
					e.findNearbyPokemon(t, n, true)
				}, e.TIMER_SCAN_ERROR)
			})
		}
		;
		return App.request('/map/data/' + t + '/' + n + (r ? '/' + r : ''), function (s) {
			if (s.jobStatus) {
				if (s.jobStatus == 'failure' || s.jobStatus == 'unknown') {
					i.text('Unable to scan for pokemon, retrying in ' + (e.TIMER_SCAN_ERROR / 1000) + ' seconds. If this continues to fail then the Pokemon servers are currently unstable or offline.');
					i.css('display', 'inline-block');
					e.loading = false;
					e.loadingTimer = setTimeout(function () {
						e.scanning = false;
						e.findNearbyPokemon(t, n, true)
					}, e.TIMER_SCAN_ERROR)
				}
				else if (s.jobStatus == 'in_progress') {
					i.text('');
					i.hide();
					e.loading = false;
					e.loadingTimer = setTimeout(function () {
						e.findNearbyPokemon(t, n, false, r)
					}, e.TIMER_JOB)
				}
				;
				return
			}
			;
			for (var d in s.pokemon) {
				var l = false;
				for (var m in e.pokemon) {
					if (e.pokemon[m].id == s.pokemon[d].id) {
						l = true
					}
				}
				;
				if (!l) {
					e.pokemon.push(s.pokemon[d])
				}
			}
			;
			e.updateMarkers();
			if (e.scanning) {
				i.text('');
				i.hide();
				App.success('Scan complete! You can re-scan the area for new pokemon that spawn soon.');
				a.addClass('is-on-cooldown');
				a.find('strong').text('Click To Find Pokémon Near Marker');
				setTimeout(function () {
					a.removeClass('is-on-cooldown');
					a.removeAttr('disabled')
				}, e.TIMER_SCAN_DELAY)
			}
			;
			e.scanning = false;
			e.loading = false;
			e.loadingTimer = null;
			if (o.is(':visible')) {
				o.fadeOut(200)
			}
		}, function (o) {
			i.text('Unable to process response. We are aware of this issue and trying to fix. Please try to refresh the page to potentially solve issue!');
			i.css('display', 'inline-block');
			e.loading = false;
			e.loadingTimer = setTimeout(function () {
				e.findNearbyPokemon(t, n, false, r)
			}, e.TIMER_ERROR)
		})
	};
	this.updateMarkers = function () {
		if (!e.map) {
			return
		}
		;
		for (var i in e.pokemon) {
			var n = e.pokemon[i], o = n.expiration_time - Math.floor(+new Date() / 1000), t = e.markers['pokemon-' + i];
			if (o <= 0) {
				if (t) {
					e.map.removeLayer(t);
					delete e.markers['pokemon-' + i]
				}
				;
				delete e.pokemon[i];
				continue
			}
			;
			if (!t) {
				t = e.createMarker(i, n)
			}
			;
			t.updateLabel(e.secondsToString(o))
		}
	};
	this.createMarker = function (t, i) {
		var a = $('body'), r = i.expiration_time - Math.floor(+new Date() / 1000), s = L.Icon.Label.extend({options: {iconUrl: '//ugc.pokevision.com/images/pokemon/' + i.pokemonId + '.png', shadowUrl: null, iconSize: new L.Point(48, 48), iconAnchor: new L.Point(0, 0), labelAnchor: new L.Point(10, 26), wrapperAnchor: new L.Point(0, 0), labelClassName: 'home-map-label'}});
		var o = new s({labelText: e.secondsToString(r)});
		var n = new L.Marker.Label({lat: i.latitude, lng: i.longitude}, {icon: o});
		n.on('mouseover', function (t) {
			var n = $(t.target._icon), o = i.expiration_time - Math.floor(+new Date() / 1000), r = '<strong>' + (e.pokedex[i.pokemonId] || 'Unknown') + '</strong><small>Despawns in ' + e.secondsToString(o);
			e.tooltipElem.css({top: (n.offset().top - (a.hasClass('embed-map') ? 0 : 96)) + 'px', left: n.offset().left + 'px'});
			e.tooltipElem.removeAttr('title');
			e.tooltipElem.attr('data-original-title', r);
			e.tooltipElem.tooltip({trigger: 'manual', html: true}).tooltip('show')
		});
		n.on('mouseout', function () {
			var e = $('.tooltip');
			e.remove()
		});
		e.markers['pokemon-' + t] = n;
		e.map.addLayer(n);
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
