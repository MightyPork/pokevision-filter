;var App = new function () {
	var t = this;
	this.adBlock = !1;
	this.lightbox = null;
	this.init = function () {
		var t = $('body'), s = $('[data-toggle=tooltip]'), e = $('[data-toggle=tab]');
		this.lightbox = lity();
		toastr.options.newestOnTop = !0;
		toastr.options.progressBar = !0;
		toastr.options.positionClass = 'toast-bottom-left';
		s.tooltip({container: 'body'});
		e.on('click', function () {
			var t = $(this), e = t.parents('[data-toggle-container]'), n = e.find('[data-toggle=tab]'), o = t.data('target'), s = $(o), i = s.parents('.tabs'), a = i.find('.tab-pane');
			n.removeClass('is-active');
			t.addClass('is-active');
			a.removeClass('is-active');
			s.addClass('is-active');
			return !1
		});
		t.on('click', '[data-href]', function () {
			var t = $(this), s = t.data('href'), e = t.attr('target');
			if (e == '_blank') {
				window.open(s, '_blank')
			}
			else {
				window.location = s
			}
			;
			return !1
		});
		t.on('click', '[data-lightbox]', this.lightbox)
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
		var n = $('body'), o = $('.ad-unit-hidden'), e = function () {
			if (o.is(':hidden')) {
				n.addClass('is-adblocked');
				return t.adBlock = !0
			}
			;
			return !1
		};
		for (var s = 1; s < 10; s++) {
			setTimeout(e, 100 * s)
		}
		;
		return e()
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
					e.attr('disabled', !0)
				}
			});
			o.on('submit', function () {
				var o = encodeURIComponent(t.val().trim());
				t.attr('disabled', !0);
				e.attr('disabled', !0);
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
				return !1
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
			return !1
		})
	}
};
;App.home = new function () {
	var home = this;
	this.TIMER_JOB = 2500;
	this.TIMER_UPDATE = 30000;
	this.TIMER_ERROR = 30000;
	this.TIMER_SCAN_ERROR = 30000;
	this.TIMER_SCAN_DELAY = 30000;
	this.initialised = !1;
	this.loading = !1;
	this.scanning = !1;
	this.loadingTimer = null;
	this.map = null;
	this.tooltipElem = null;
	this.latitude = 34.00872705055818;
	this.longitude = -118.49764466285706;
	this.pokedex = {};
	this.pokemon = [];
	this.markers = {};
	this.filters = [];
	this.init = function (e) {
		this.initialised = !0;
		this.latitude = e.latitude || this.latitude;
		this.longitude = e.longitude || this.longitude;
		this.pokedex = e.pokedex || this.pokedex;
		setInterval(this.updateMarkers, 1000)
	};
	this.initMap = function (t) {
		var a = $('.home-map-wrapper'), r = $('.home-map-loading'), s = $('.home-map-scan'), n = $('select[name=filters]');
		if (!t) {
			r.html('<span class="loading-disabled">We\'re sorry but the Pokemon Trainer Club service is currently offline so we can\'t perform any scans. Please <a href="https://twitter.com/pokevisiongo">follow us on Twitter</a> to get real-time updates on when service is restored.</span>');
			return
		}
		;
		this.tooltipElem = $('.home-map-tooltip');
		this.map = L.map(a.get(0), {center: {lat: this.latitude, lng: this.longitude}, zoom: 17, zoomControl: !1});
		this.map.attributionControl.setPrefix(!1);
		var o = L.Control.extend({
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
		var i = new o({marginBottom: 10, marginRight: 10});
		i.addTo(this.map);
		L.control.zoom({position: 'bottomright'}).addTo(this.map);
		L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: '<a href="https://www.esri.com/">&copy; Esri</a>, USGS, NOAA'}).addTo(this.map);
		L.Icon.Default.imagePath = '/asset/image/leaflet/';
		this.markers.center = L.marker({lat: this.latitude, lng: this.longitude}).addTo(this.map);
		this.map.on('click', function (t) {
			home.markers.center.setLatLng(t.latlng);
			home.latitude = t.latlng.lat;
			home.longitude = t.latlng.lng;
			home.findNearbyPokemon(home.latitude, home.longitude);
			window.history.replaceState(null, null, '#/@' + home.latitude + ',' + home.longitude)
		});
		s.on('click', function () {
			home.findNearbyPokemon(home.latitude, home.longitude, !0);
			return !1
		}).removeAttr('disabled');
		n.on('change', function () {
			var t = n.val();
			if (t) {
				home.filters = t.map(function (e) {
					return parseInt(e)
				})
			}
			else {
				home.filters = ['none']
			}
			;
			home.updateMarkers()
		});
		n.selectpicker({
			noneSelectedText: 'Showing no pokemon', selectedTextFormat: 'count > 4', countSelectedText: function (e, t) {
				return 'Showing ' + e + ' pokemon'
			}
		});
		this.updateMarkers();
		this.findNearbyPokemon(this.latitude, this.longitude);
		setInterval(function () {
			home.findNearbyPokemon(home.latitude, home.longitude)
		}, this.TIMER_UPDATE)
	};
	this.findNearbyPokemon = function (t, i, s, r) {
		var o = $('.home-map-loading'), n = o.find('.loading-message'), a = $('.home-map-scan');
		if (home.loading) {
			return
		}
		;
		if (home.scanning && !r) {
			return
		}
		;
		if (!home.scanning && home.loadingTimer) {
			clearInterval(home.loadingTimer);
			home.loadingTimer = null
		}
		;
		home.loading = !0;
		if (o.is(':hidden')) {
			o.addClass('home-map-loading-mini');
			o.fadeIn(200)
		}
		;
		if (s) {
			home.scanning = !0;
			a.attr('disabled', !0);
			a.find('strong').html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
			return App.request('/map/scan/' + t + '/' + i, function (n) {
				home.loading = !1;
				home.loadingTimer = setTimeout(function () {
					home.findNearbyPokemon(t, i, !1, n.jobId)
				}, home.TIMER_JOB)
			}, function (o) {
				if (o.indexOf('{disabled}') > -1) {
					n.text('Scanning is currently disabled temporarily, retrying in ' + (home.TIMER_ERROR / 1000) + ' seconds.');
					n.css('display', 'inline-block')
				}
				else if (o.indexOf('{scan-throttle}') > -1) {
					n.text('You already scanned recently, retrying in ' + (home.TIMER_ERROR / 1000) + ' seconds.');
					n.css('display', 'inline-block')
				}
				else {
					n.text('Unable to send scan request due to an internal error, retrying in ' + (home.TIMER_ERROR / 1000) + ' seconds.');
					n.css('display', 'inline-block')
				}
				;
				home.loading = !1;
				home.loadingTimer = setTimeout(function () {
					home.scanning = !1;
					home.findNearbyPokemon(t, i, !0)
				}, home.TIMER_SCAN_ERROR)
			})
		}
		;
		return App.request('/map/data/' + t + '/' + i + (r ? '/' + r : ''), function (s) {
			if (s.jobStatus) {
				if (s.jobStatus == 'failure' || s.jobStatus == 'unknown') {
					n.text('Unable to scan for pokemon, retrying in ' + (home.TIMER_SCAN_ERROR / 1000) + ' seconds. If this continues to fail then the Pokemon servers are currently unstable or offline.');
					n.css('display', 'inline-block');
					home.loading = !1;
					home.loadingTimer = setTimeout(function () {
						home.scanning = !1;
						home.findNearbyPokemon(t, i, !0)
					}, home.TIMER_SCAN_ERROR)
				}
				else if (s.jobStatus == 'in_progress') {
					n.text('');
					n.hide();
					home.loading = !1;
					home.loadingTimer = setTimeout(function () {
						home.findNearbyPokemon(t, i, !1, r)
					}, home.TIMER_JOB)
				}
				;
				return
			}
			;
			for (var d in s.pokemon) {
				var l = !1;
				for (var m in home.pokemon) {
					if (home.pokemon[m].id == s.pokemon[d].id) {
						l = !0
					}
				}
				;
				if (!l) {
					home.pokemon.push(s.pokemon[d])
				}
			}
			;
			home.updateMarkers();
			if (home.scanning) {
				n.text('');
				n.hide();
				App.success('Scan complete! You can re-scan the area for new pokemon that spawn soon.');
				a.addClass('is-on-cooldown');
				a.find('strong').text('Click To Find Pokémon Near Marker');
				setTimeout(function () {
					a.removeClass('is-on-cooldown');
					a.removeAttr('disabled')
				}, home.TIMER_SCAN_DELAY)
			}
			;
			home.scanning = !1;
			home.loading = !1;
			home.loadingTimer = null;
			if (o.is(':visible')) {
				o.fadeOut(200)
			}
		}, function (o) {
			n.text('Unable to process response. We are aware of this issue and trying to fix. Please try to refresh the page to potentially solve issue!');
			n.css('display', 'inline-block');
			home.loading = !1;
			home.loadingTimer = setTimeout(function () {
				home.findNearbyPokemon(t, i, !1, r)
			}, home.TIMER_ERROR)
		})
	};
	this.updateMarkers = function () {
		if (!home.map) {
			return
		}
		;
		for (var n in home.pokemon) {
			var o = home.pokemon[n], a = o.expiration_time - Math.floor(+new Date() / 1000), t = home.markers['pokemon-' + n], i = !0;
			if (a <= 0) {
				if (t) {
					home.map.removeLayer(t);
					delete home.markers['pokemon-' + n]
				}
				;
				delete home.pokemon[n];
				continue
			}
			;
			if (!t) {
				t = home.createMarker(n, o);
				t.addedToMap = !0
			}
			;
			if (home.filters.length > 0) {
				if (home.filters.indexOf(o.pokemonId) == -1) {
					i = !1
				}
			}
			;
			if (i && !t.addedToMap) {
				home.map.addLayer(t);
				t.addedToMap = !0
			}
			else if (!i && t.addedToMap) {
				home.map.removeLayer(t);
				t.addedToMap = !1
			}
			;
			if (i) {
				t.updateLabel(home.secondsToString(a))
			}
		}
	};
	this.createMarker = function (t, n) {
		var a = $('body'), r = n.expiration_time - Math.floor(+new Date() / 1000), s = L.Icon.Label.extend({options: {iconUrl: '//ugc.pokevision.com/images/pokemon/' + n.pokemonId + '.png', shadowUrl: null, iconSize: new L.Point(48, 48), iconAnchor: new L.Point(0, 0), labelAnchor: new L.Point(10, 26), wrapperAnchor: new L.Point(0, 0), labelClassName: 'home-map-label'}});
		var o = new s({labelText: home.secondsToString(r)});
		var i = new L.Marker.Label({lat: n.latitude, lng: n.longitude}, {icon: o});
		i.on('mouseover', function (t) {
			var i = $(t.target._icon), o = n.expiration_time - Math.floor(+new Date() / 1000), r = '<strong>' + (home.pokedex[n.pokemonId] || 'Unknown') + '</strong><small>Despawns in ' + home.secondsToString(o);
			home.tooltipElem.css({top: (i.offset().top - (a.hasClass('embed-map') ? 0 : 96)) + 'px', left: i.offset().left + 'px'});
			home.tooltipElem.removeAttr('title');
			home.tooltipElem.attr('data-original-title', r);
			home.tooltipElem.tooltip({trigger: 'manual', html: !0}).tooltip('show')
		});
		i.on('mouseout', function () {
			var e = $('.tooltip');
			e.remove()
		});
		home.markers['pokemon-' + t] = i;
		home.map.addLayer(i);
		return i
	};
	this.secondsToString = function (e) {
		var o = parseInt(e, 10), t = Math.floor(o / 3600), n = Math.floor((o - (t * 3600)) / 60), i = o - (t * 3600) - (n * 60);
		if (t < 10)t = '0' + t;
		if (n < 10)n = '0' + n;
		if (i < 10)i = '0' + i;
		if (t > 0) {
			return t + ':' + n + ':' + i
		}
		;
		return n + ':' + i
	}
};
