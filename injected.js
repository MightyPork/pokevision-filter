"use strict";

var PokemonFilter = new function () {
	var self = this;

	self.DEBUG = false;
	self.BUBBLES = false;

	var app = window.App;

	var home = app.home;
	var pokedex = home.pokedex;
	var invPokedex = _.invert(home.pokedex); // for lookup by name

	// Pokemon that can't be caught - don't show buttons for them
	var UNOBTAINABLES = [
		+invPokedex['Mew'],
		+invPokedex['Mewtwo']
	];

	var TOTAL_POKEMON_COUNT = 150;

	//region Config

	self.enabled = true;
	self.blacklists = [];
	self.preset_n = 0;

	// This will be a pointer to the active blacklist save slot
	self.blacklist = [];

	this.loadConfig = function () {
		var configStr = localStorage.getItem('pokemon_filter');

		// Defaults
		var config = {
			enabled: true,
			blacklists: [[], [], [], [], []],
			preset_n: 0
		};

		if (configStr) {
			try {
				config = JSON.parse(configStr);
			} catch (e) {
				console.warn("PokemonFilter config corrupted, cleaning up.");
			}
		}

		console.log(config);

		// Load the config
		self.blacklists = config.blacklists;
		if (_.isUndefined(self.blacklists) || !_.isArray(self.blacklists) || self.blacklists.length != 5) {
			self.blacklists = [[], [], [], [], []];
		}

		self.preset_n = config.preset_n || 0;
		self.enabled = !!config.enabled;

		// 'Open the slot'
		self.blacklist = self.blacklists[self.preset_n];

		console.log("Filter config loaded:\n\t" +
			"enabled = ", self.enabled,
			"\n\tblacklists = ", self.blacklists,
			"\n\tpreset_n = ", self.preset_n);
	};

	this.persistConfig = function () {
		var config = {
			enabled: self.enabled,
			blacklists: self.blacklists,
			preset_n: self.preset_n
		};

		localStorage.setItem('pokemon_filter', JSON.stringify(config));
	};

	//endregion

	/** Check if a Pokémon is blacklisted */
	this.isBlacklisted = function (id) {
		return self.enabled && (self.blacklist.indexOf(+id) != -1);
	};

	/** Start the extension */
	this.init = function () {
		if (_.isUndefined(app) || $('main').hasClass('error')) {
			console.warn('Either the site scripts changed, or it didn\'t load right.\nCannot init PokéVision Filter.');
			return;
		}

		self.loadConfig();

		self.installFilter();
		self.applyBlacklist();
		self.createFilterPane();

		console.info("Initialized PokéVision Filter!");
	};

	/**
	 * he extension is loaded after the page has already loaded some Pokemon.
	 * Let's get rid of the hidden ones
	 */
	this.applyBlacklist = function () {
		_.each(home.pokemon, function (entry) {
			if (_.isUndefined(entry)) return;

			if (self.isBlacklisted(entry.pokemonId)) {
				self.DEBUG && console.log('Removing ' + pokedex[entry.pokemonId]);
				// mark it expired - it'll get removed in updateMarkers()
				entry.expiration_time -= 10000;
			}
		});
		home.updateMarkers();
	};

	/** Select a save slot to use */
	this.selectActivePreset = function(n) {
		if (n < 0 || n >= self.blacklists.length) {
			console.error("Invalid slot number: ", n);
			return;
		}

		self.blacklist = self.blacklists[n];
		self.preset_n = n;

		$('.x-filter-pokemon').each(function(n, elem) {
			var id = $(elem).data('id');
			$(elem).toggleClass('filter-hidden', self.isBlacklisted(id));
		});

		self.persistConfig();
		self.applyBlacklist();

		self.BUBBLES && app.success('Click the map or refresh the page for it to have effect.', 'Filter preset changed')
	};

	/** Wrap the createMarker function in a filter */
	this.installFilter = function () {
		home.createMarkerOrig = home.createMarker;
		home.createMarker = function (idx, pk) {
			if (self.isBlacklisted(pk.pokemonId)) {
				self.DEBUG && console.log('Skipping ' + pokedex[pk.pokemonId]);
				// Return a harmless do-nothing stub
				return {
					updateLabel: function () {
					}
				};
			}

			return home.createMarkerOrig(idx, pk);
		};
	};

	this.togglePokemon = function (id, state) {
		id = +id; // cast

		self.DEBUG && console.log('Toggling pokemon: ', id);

		var wantShow = self.isBlacklisted(id);

		if (!_.isUndefined(state)) {
			wantShow = state;
		}

		var elem = $('#filter-pokemon-id-' + id);

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

	this.createFilterPane = function () {
		var sidebar = $('.home-sidebar');

		var filterDiv = $('<div class="PokemonFilter"></div>');

		// Top row with toggle buttons
		var toggleBox = $('<div class="pf-box">' +
			'<input type="checkbox" id="pf-enable">' +
			'<label class="pf-title" for="pf-enable">Pokémon Filter</label>' +
			'</div>');
		for (var i = 0; i < self.blacklists.length; i++) {
			toggleBox.append('<a class="pf-slot" id="pf-slot-'+i+'" data-n="'+i+'">'+(i+1)+'</a>');
		}
		filterDiv.append(toggleBox);

		// Box with save slots
		var slotBox = $('<div class="pf-box left">' +
			'<a class="pf-toggle" id="pf-hide-all">Hide all</a>' +
			'<a class="pf-toggle" id="pf-show-all">Show all</a>' +
			'</div>');
		filterDiv.append(slotBox);

		// Box with the pokémon images
		for (var id = 1; id < TOTAL_POKEMON_COUNT + 1; id++) {
			if (UNOBTAINABLES.indexOf(id) != -1) continue;

			var img = document.createElement('img');
			img.src = 'https://ugc.pokevision.com/images/pokemon/' + id + '.png';
			img.title = pokedex[id] + ' - ' + id + '';
			img.classList.add('x-filter-pokemon');
			img.id = 'filter-pokemon-id-' + id;
			img.dataset.id = id;

			if (self.isBlacklisted(id)) {
				img.classList.add('filter-hidden');
			}

			filterDiv.append(img);
		}

		sidebar.prepend(filterDiv);

		// Preset toggles
		$('#pf-slot-'+self.preset_n).addClass('active');
		$('.pf-slot').on('click', function () {
			$('.pf-slot').removeClass('active');
			$(this).addClass('active');
			var n = $(this).data('n');
			self.selectActivePreset(n);
		});

		// Enable/disable toggle
		$('#pf-enable').attr('checked', self.enabled).on('change', function() {
			self.enabled = $(this).is(':checked');
			console.log('Filter enabled = ', self.enabled);
			self.applyBlacklist();
			self.persistConfig();
		});

		// Toggle pokémon on click
		$('.x-filter-pokemon').on('click', function () {
			self.togglePokemon(this.dataset.id); // also applies and saves
		});

		// Hide & show buttons
		$('#pf-hide-all').on('click', function () {
			$('.x-filter-pokemon').addClass('filter-hidden');
			self.blacklist.length = 0;

			for (var i = 1; i < TOTAL_POKEMON_COUNT+1; i++) {
				self.blacklist.push(i);
			}

			self.applyBlacklist();
			self.persistConfig();

			self.BUBBLES && app.success('Enable the ones you want, then click the map or refresh the page.', 'All species hidden.')
		});

		$('#pf-show-all').on('click', function () {
			$('.x-filter-pokemon').removeClass('filter-hidden');
			self.blacklist.length = 0;
			self.applyBlacklist();
			self.persistConfig();

			self.BUBBLES && app.success('Refresh the page or click the map to load them.', 'All species visible.')
		});
	};
};

// Start up
PokemonFilter.init();
