"use strict";

var PokemonFilter = new function () {
	var self = this;

	console.log(this);

	var app = window.App;

	var home = app.home;
	var pokedex = home.pokedex;
	var invPokedex = _.invert(home.pokedex); // for lookup by name

	// Reduce cooldown time
	home.TIMER_SCAN_DELAY = 500;

	self.blacklist = [
		+invPokedex['Drowzee'],
		+invPokedex['Pidgey'],
		+invPokedex['Rattata']
	];

	/** Check if a Pokémon is blacklisted */
	this.isBlacklisted = function(id) {
		return self.blacklist.indexOf(id) != -1;
	};

	/** Start the extension */
	this.init = function() {
		if (_.isUndefined(app) || $('main').hasClass('error')) {
			console.warn('Either the site scripts changed, or it didn\'t load right.\nCannot init PokéVision Filter.');
			return;
		}

		self.installFilter();
		self.removeBlacklistedPokemon();
		self.createFilterPane();

		// Remove annoying empty ad containers - because why not
		$('.ad-unit').remove();

		console.info("Initialized PokéVision Filter!");
	};

	/**
	 * he extension is loaded after the page has already loaded some Pokemon.
	 * Let's get rid of the hidden ones
	 */
	this.removeBlacklistedPokemon = function() {
		_.each(home.pokemon, function (entry) {
			if (_.isUndefined(entry)) return;

			if (self.isBlacklisted(entry.pokemonId)) {
				// mark it expired - it'll get removed in updateMarkers()
				entry.expiration_time -= 10000;
			}
		});
		home.updateMarkers();
	};

	/** Wrap the createMarker function in a filter */
	this.installFilter = function() {
		home.createMarkerOrig = home.createMarker;
		home.createMarker = function (idx, pk) {
			if (self.isBlacklisted(pk.pokemonId)) {
				// Return a harmless do-nothing stub
				return {
					updateLabel: function () {
					}
				};
			}

			return home.createMarkerOrig(idx, pk);
		};
	};

	this.createFilterPane = function() {
		var sidebar = $('.home-sidebar');

		var filterDiv = $('<div class="PokemonFilter"></div>');

		for (var i = 1; i < 150; i++) {
			var img = document.createElement('img');
			img.src = 'https://ugc.pokevision.com/images/pokemon/' + i + '.png';
			img.title = pokedex[i];
			img.classList.add('x-filter-pokemon');

			console.log('Adding ' + i + ' : ' + img.title);
			if (self.isBlacklisted(i)) {
				img.classList.add('filter-hidden');
			}

			filterDiv.append(img);
		}

		sidebar.prepend(filterDiv);
	};
};

// Start up
PokemonFilter.init();
