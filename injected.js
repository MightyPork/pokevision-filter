"use strict";

var PokemonFilter = new function () {
	var self = this;

	self.DEBUG = false;

	var app = window.App;

	var home = app.home;
	var pokedex = home.pokedex;
	//var invPokedex = _.invert(home.pokedex); // for lookup by name

	var TOTAL_POKEMON_COUNT = 150;

	self.blacklist = [];

	/** Check if a Pokémon is blacklisted */
	this.isBlacklisted = function(id) {
		return self.blacklist.indexOf(+id) != -1;
	};

	/** Start the extension */
	this.init = function() {
		if (_.isUndefined(app) || $('main').hasClass('error')) {
			console.warn('Either the site scripts changed, or it didn\'t load right.\nCannot init PokéVision Filter.');
			return;
		}

		self.loadConfig();

		self.DEBUG && console.log('Blacklist = ',JSON.stringify(self.blacklist));

		self.installFilter();
		self.applyBlacklist();
		self.createFilterPane();

		console.info("Initialized PokéVision Filter!");
	};

	/**
	 * he extension is loaded after the page has already loaded some Pokemon.
	 * Let's get rid of the hidden ones
	 */
	this.applyBlacklist = function() {
		_.each(home.pokemon, function (entry) {
			if (_.isUndefined(entry)) return;

			if (self.isBlacklisted(entry.pokemonId)) {
				self.DEBUG && console.log('Removing '+pokedex[entry.pokemonId]);
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
				self.DEBUG && console.log('Skipping '+pokedex[pk.pokemonId]);
				// Return a harmless do-nothing stub
				return {
					updateLabel: function () {
					}
				};
			}

			return home.createMarkerOrig(idx, pk);
		};
	};

	this.loadConfig = function() {
		var str = localStorage.getItem('pokemon_blacklist') || '[]';

		try {
			self.blacklist = JSON.parse(str);
		} catch(e) {
			console.warn("Saved blacklist corrupted, cleaning up.");
			self.blacklist = [];
		}
	};

	this.persistConfig = function() {
		localStorage.setItem('pokemon_blacklist', JSON.stringify(self.blacklist));
	};

	this.togglePokemon = function(id, state) {
		id = +id; // cast

		self.DEBUG && console.log('Toggling pokemon: ', id);

		var wantShow = self.isBlacklisted(id);

		if (!_.isUndefined(state)) {
			wantShow = state;
		}

		var elem = $('#filter-pokemon-id-'+id);

		if (wantShow) {
			// un-hide
			delete self.blacklist[self.blacklist.indexOf(id)];
			elem.removeClass('filter-hidden');
		} else {
			self.blacklist.push(id);
			elem.addClass('filter-hidden');
		}

		// Hide / show
		self.applyBlacklist();
		self.persistConfig();
	};

	this.createFilterPane = function() {
		var sidebar = $('.home-sidebar');

		var filterDiv = $('<div class="PokemonFilter"></div>');

		var toggleBox = $('<div class="toggles">' +
			'<span class="label">Pokémon Filter</span>' +
			'<a id="pf-hide-all">Hide all</a>' +
			'<a id="pf-show-all">Show all</a>' +
			'</div>');

		filterDiv.append(toggleBox);

		for (var id = 1; id < TOTAL_POKEMON_COUNT; id++) {
			var img = document.createElement('img');
			img.src = 'https://ugc.pokevision.com/images/pokemon/' + id + '.png';
			img.title = pokedex[id] + ' - '+id+'';
			img.classList.add('x-filter-pokemon');
			img.id = 'filter-pokemon-id-'+id;
			img.dataset.id = id;

			if (self.isBlacklisted(id)) {
				img.classList.add('filter-hidden');
			}

			filterDiv.append(img);
		}

		sidebar.prepend(filterDiv);

		$('.x-filter-pokemon').on('click', function() {
			self.togglePokemon(this.dataset.id);
		});

		$('#pf-hide-all').on('click', function() {
			$('.x-filter-pokemon').addClass('filter-hidden');
			self.blacklist = _.range(1, TOTAL_POKEMON_COUNT+1);
			self.applyBlacklist();
			self.persistConfig();

			app.success('Enable the ones you want, then click the map or refresh the page.', 'All species hidden.')
		});

		$('#pf-show-all').on('click', function() {
			$('.x-filter-pokemon').removeClass('filter-hidden');
			self.blacklist = [];
			self.applyBlacklist();
			self.persistConfig();

			app.success('Refresh the page or click the map to load them.', 'All species visible.')
		});
	};
};

// Start up
PokemonFilter.init();
