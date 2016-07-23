"use strict";

(function (app) {
	if (_.isUndefined(app) || $('main').hasClass('error')) {
		console.warn('Either the site scripts changed, or it didn\'t load right.\nCannot init PokéVision Filter.');
		return;
	}

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

	/** Check if a Pokémon is blacklisted */
	function isBlacklisted(id) {
		return Blacklist.indexOf(pokedex[id]) != -1;
	}

	/** Start the extension */
	function init() {
		installFilter();
		removeBlacklistedPokemon();

		// Remove annoying empty ad containers - because why not
		$('.ad-unit').remove();
	}

	/**
	 * he extension is loaded after the page has already loaded some Pokemon.
	 * Let's get rid of the hidden ones
	 */
	function removeBlacklistedPokemon() {
		_.each(self.pokemon, function (entry) {
			if (isBlacklisted(entry.pokemonId)) {
				// mark it expired - it'll get removed in updateMarkers()
				entry.expiration_time -= 10000;
			}
		});
		self.updateMarkers();
	}

	/** Wrap the createMarker function in a filter */
	function installFilter() {
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
	}

	// Boot it up
	init();

	console.info("Initialized PokéVision Filter!");
})(window.App);
