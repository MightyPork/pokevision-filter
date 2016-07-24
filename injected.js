"use strict";

var PokemonFilter = new function () {
	var self = this;

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

	self.debug = false;
	self.bubbles = false;
	self.enabled = true;
	self.blacklists = [];
	self.preset_n = 0;

	// This will be a pointer to the active blacklist save slot
	self.blacklist = [];

	/** Start the extension */
	this.init = function () {
		if (_.isUndefined(app) || $('main').hasClass('error')) {
			console.warn('[filter] Either the site scripts changed, or it didn\'t load right.\nCannot init PokéVision Filter.');
			return;
		}

		self.loadConfig();

		self.installFilter();
		self.applyBlacklist();
		self.buildUserInterface();

		console.info("[filter] Filter ready, good hunting!");
	};

	/** Show a success bubble (green) */
	this.successBubble = function(text, heading) {
		self.debug && console.log('[filter] ' + heading + ' ' + text);

		if (!self.bubbles) return;
		toastr.remove();
		app.success(text, heading);
	};

	/** Show an error bubble (red) */
	this.errorBubble = function(text, heading) {
		self.debug && console.log('[filter] ' + heading, ' ' + text);

		if (!self.bubbles) return;
		toastr.remove();
		app.error(text, heading);
	};

	/**
	 * Load settings from localStorage
	 * TODO use Chrome sync instead
	 */
	this.loadConfig = function () {
		var configStr = localStorage.getItem('pokemon_filter');

		// Defaults
		var config = {
			enabled: true,
			blacklists: [[], [], [], [], []],
			preset_n: 0,
			bubbles: true,
			debug: false
		};

		if (configStr) {
			try {
				config = JSON.parse(configStr);
			} catch (e) {
				console.warn("[filter] PokemonFilter config corrupted, cleaning up.");
			}
		}

		// Load the config
		self.blacklists = config.blacklists;
		if (_.isUndefined(self.blacklists) || !_.isArray(self.blacklists) || self.blacklists.length != 5) {
			self.blacklists = [[], [], [], [], []];
		}

		self.preset_n = config.preset_n || 0;
		self.enabled = !!config.enabled;
		self.bubbles = !!config.bubbles;
		self.debug = !!config.debug;

		// 'Open the slot'
		self.blacklist = self.blacklists[self.preset_n];

		self.debug && console.log("[filter] Config loaded: ", config);
	};

	/**
	 * Store current settings to localStorage
	 * TODO use Chrome sync instead
	 */
	this.persistConfig = function () {
		// Remove nulls
		for (var i = 0; i < self.blacklists.length; i++) {
			self.blacklists[i] = _.filter(self.blacklists[i], function(x) {return !_.isUndefined(x) && !_.isNull(x)});
		}

		// Fix broken reference
		self.blacklist = self.blacklists[self.preset_n];

		var config = {
			enabled: self.enabled,
			blacklists: self.blacklists,
			preset_n: self.preset_n,
			bubbles: self.bubbles,
			debug: self.debug
		};

		localStorage.setItem('pokemon_filter', JSON.stringify(config));

		self.debug && console.log("[filter] Saved config.");
	};

	//endregion

	/** Check if a Pokémon is blacklisted */
	this.isBlacklisted = function (id) {
		return self.enabled && (self.blacklist.indexOf(+id) != -1);
	};

	/**
	 * Remove pokemon already drawn on the map that match the current blacklist.
	 */
	this.applyBlacklist = function () {
		self.debug && console.log('[filter] Removing hidden Pokémon from the map.');

		_.each(home.pokemon, function (entry) {
			if (_.isUndefined(entry)) return;

			if (self.isBlacklisted(entry.pokemonId)) {
				// mark it expired - it'll get removed in updateMarkers()
				entry.expiration_time -= 10000;
			}
		});
		home.updateMarkers();
	};

	/**
	 * Select a blacklist number (preset_n)
	 */
	this.selectBlacklistPage = function(n) {
		if (n < 0 || n >= self.blacklists.length) {
			console.errorBubble("[filter] Invalid slot number:", n);
			return;
		}

		self.blacklist = self.blacklists[n];
		self.preset_n = n;

		self.debug && console.log("[filter] Selected preset slot", n);

		self.updateFilterVisuals();

		self.persistConfig();
		self.applyBlacklist();

		self.successBubble('Click the map or refresh the page for it to have effect.', 'Filter preset changed');
	};

	/** Mark hidden / visible Pokémon in the filter panel. */
	this.updateFilterVisuals = function () {
		$('.x-filter-pokemon').each(function(n, elem) {
			var id = $(elem).data('id');
			$(elem).toggleClass('filter-hidden', self.isBlacklisted(id));
		});
	};

	/** Wrap the createMarker function in a filter */
	this.installFilter = function () {
		self.debug && console.log("[filter] Installing Pokémon filter...");

		home.createMarkerOrig = home.createMarker;
		home.createMarker = function (idx, pk) {
			if (self.isBlacklisted(pk.pokemonId)) {
				// Return a harmless do-nothing stub
				return {
					updateLabel: function () {
						// no-op
					}
				};
			}

			return home.createMarkerOrig(idx, pk);
		};
	};

	/** Replace the current blacklist page with the given IDs */
	this.replaceBlacklist = function(newIds) {
		self.blacklists[self.preset_n] = newIds;
		self.blacklist = self.blacklists[self.preset_n]; // Fix reference

		self.updateFilterVisuals();
		self.applyBlacklist();
		self.persistConfig();
	};

	/** Toggle a single Pokémon in the blacklist */
	this.togglePokemon = function (id, state) {
		id = +id; // cast

		self.debug && console.log('[filter] Toggling pokemon:', id, '(' + pokedex[id] + ')');

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

	/** Build the filter UI */
	this.buildUserInterface = function () {
		self.debug && console.log("[filter] Building user interface...");

		var sidebar = $('.home-sidebar');

		var filterDiv = $('<div class="PokemonFilter"></div>');
		sidebar.prepend(filterDiv);

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
			'<a class="pf-toggle" id="pf-show-all">Show all</a>' +
			'<a class="pf-toggle" id="pf-hide-all">Hide all</a>' +
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

		// Bubbles & debug checkboxes
		filterDiv.append($('<div class="pf-box filter-settings left first">' +
			'<input type="checkbox" id="pf-bubbles">' +
			'<label for="pf-bubbles">Info bubbles for filter actions</label>' +
			'</div>'));

		filterDiv.append($('<div class="pf-box filter-settings left last">' +
			'<input type="checkbox" id="pf-debug">' +
			'<label for="pf-debug">Debug logging</label>' +
			'</div>'));

		// Preset toggles
		$('#pf-slot-'+self.preset_n).addClass('active');
		$('.pf-slot').on('click', function () {
			$('.pf-slot').removeClass('active');
			$(this).addClass('active');
			var n = $(this).data('n');
			self.selectBlacklistPage(n);
		});

		// Enable/disable toggle
		$('#pf-enable').attr('checked', self.enabled).on('change', function() {
			self.enabled = $(this).is(':checked');
			self.applyBlacklist();
			self.persistConfig();

			if (self.enabled) {
				self.successBubble(null, 'Filter enabled');
			} else {
				self.errorBubble(null, 'Filter disabled');
			}
		});

		// Toggle bubbles
		$('#pf-bubbles').attr('checked', self.enabled).on('change', function() {
			self.bubbles = $(this).is(':checked');
			self.persistConfig();

			toastr.remove();
			self.successBubble(null, 'Filter info bubbles enabled');
		});

		// Toggle debug
		$('#pf-debug').attr('checked', self.debug).on('change', function() {
			self.debug = $(this).is(':checked');
			self.persistConfig();

			if (self.debug) {
				self.successBubble(null, 'Filter debug enabled');
			} else {
				self.errorBubble(null, 'Filter debug disabled');
			}
		});

		// Toggle pokémon on click
		$('.x-filter-pokemon').on('click', function () {
			self.togglePokemon(this.dataset.id); // also applies and saves
		});

		// Hide & show buttons
		$('#pf-hide-all').on('click', function () {
			self.replaceBlacklist(_.range(1, TOTAL_POKEMON_COUNT+1));
			self.successBubble('Enable the ones you want, then click the map or refresh the page.', 'All species hidden.')
		});

		$('#pf-show-all').on('click', function () {
			self.replaceBlacklist([]);
			self.successBubble('Refresh the page or click the map to load them.', 'All species visible.')
		});
	};
};

// Start up
PokemonFilter.init();
