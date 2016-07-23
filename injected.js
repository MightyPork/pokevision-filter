"use strict";

console.log("Loading PokéVision Filter!");

(function (app) {
	var self = app.home;
	var pokedex = self.pokedex;
	var invPokedex = _.invert(self.pokedex); // for lookup by name

	// Reduce cooldown time
	self.TIMER_SCAN_DELAY = 500;


	var Blacklist = [
		'Drowzee',
		'Pidgey',
		'Zubat',
		'Spearow',
		'Weedle',
		'Caterpie',
		'Rattata',
	];

	function isBlacklisted(id) {
		return Blacklist.indexOf(pokedex[id]) != -1;
	}

	// Wraping the createMarker function in a filter
	self.createMarkerOrig = self.createMarker;
	self.createMarker = function (t, i) {

		if (isBlacklisted(i.pokemonId)) {
			// Return a harmless do-nothing stub
			return {
				updateLabel: function () {
				}
			};
		}

		return self.createMarkerOrig(t, i);
	};


	// --- Init ---
	// 1. Remove annoying empty ad containers - because why not
	$('.ad-unit').remove();

	// 2. The extension is loaded after the page has already loaded some Pokemon.
	// Let's get rid of the hidden ones
	_.each(self.pokemon, function (entry) {
		if (isBlacklisted(entry.pokemonId)) {
			// mark it expired - it'll get removed in updateMarkers()
			entry.expiration_time -= 10000;
		}
	});

	self.updateMarkers();

})(window.App);
