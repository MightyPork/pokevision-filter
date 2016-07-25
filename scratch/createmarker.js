home.createMarker = function (idx, poke) {
	console.log('Creating marker for a pokemon!');

	var a = $('body');
	var r = poke.expiration_time - Math.floor(+new Date() / 1000);

	var PokemonIcon = L.Icon.Label.extend({
		options: {
			iconUrl: '//ugc.pokevision.com/images/pokemon/' + poke.pokemonId + '.png',
			shadowUrl: null,
			iconSize: new L.Point(48, 48),
			iconAnchor: new L.Point(-24, -24),
			labelAnchor: new L.Point(10, 26),
			wrapperAnchor: new L.Point(0, 0),
			labelClassName: 'home-map-label'
		}
	});

	var icon = new PokemonIcon({labelText: home.secondsToString(r)});

	var marker = new L.Marker.Label({
		lat: poke.latitude,
		lng: poke.longitude
	}, {
		icon: icon
	});

	marker.on('mouseover', function (t) {
		var i = $(t.target._icon);
		var o = poke.expiration_time - Math.floor(+new Date() / 1000);
		var r = '<strong>' + (home.pokedex[poke.pokemonId] || 'Unknown') + '</strong><small>Despawns in ' + home.secondsToString(o);

		home.tooltipElem.css({
			top: (i.offset().top - (a.hasClass('embed-map') ? 0 : 96)) + 'px',
			left: i.offset().left + 'px'
		});

		home.tooltipElem.removeAttr('title');
		home.tooltipElem.attr('data-original-title', r);
		home.tooltipElem.tooltip({trigger: 'manual', html: !0}).tooltip('show')
	});

	marker.on('mouseout', function () {
		var e = $('.tooltip');
		e.remove()
	});

	home.markers['pokemon-' + idx] = marker;
	home.map.addLayer(marker);

	console.log(marker);
	return marker
};
