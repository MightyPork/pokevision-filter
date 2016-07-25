"use strict";

var PokemonFilter = new function () {
	var self = this;

	var app = window.App;

	var home = app.home;
	var pokedex = home.pokedex;
	var invPokedex = _.invert(home.pokedex); // for lookup by name

	var pokeTypes = window.dexData.pokeTypes;
	var pokeRarities = window.dexData.rarities;
	var pokeData = window.dexData.fullDex;

	var specsEdited = false;
	var previousSpecs;

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
		var crapFilter = document.querySelector('.btn-group.bootstrap-select.show-tick.form-control');
		crapFilter.style.display = 'none';
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

		/*_.each(home.pokemon, function (entry) {
			if (_.isUndefined(entry)) return;

			if (self.isBlacklisted(entry.pokemonId)) {
				// mark it expired - it'll get removed in updateMarkers()
				entry.expiration_time -= 10000;
			}
		});*/
		home.filters = self.getWhiteList();
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

		var slotBox = $('<div class="pf-box left" id="initial-buttons">' +
			'<a class="pf-toggle" id="pf-show-all">Show all</a>' +
			'<a class="pf-toggle" id="pf-hide-all">Hide all</a>' +
			'<a class="pf-toggle" id="pf-spec-filter-menu">Specific Filters</a>' +
			'</div>');
		filterDiv.append(slotBox);


		// Box for setting specific filters
		var specFiltersBox = $('<div class="pf-specFilters" id="spec-filters-box" style="display: none"></div>');
		//adding type-checkboxes
		specFiltersBox.append('<label class="pf-title pf-box left">Types</label>');
		for(var t = 0; t < pokeTypes.length; t++){
			specFiltersBox.append('<div class="spec-check-element"><input type="checkbox" poketype="' + pokeTypes[t] + '" id="spec-toggle-' + pokeTypes[t] + '" class="spec-checkBox pokeType">' + '<label' +
				' class="pf-title"' +
				' for="spec-toggle-' + pokeTypes[t] + '">' + pokeTypes[t] + '</label></div>');
		}
		//adding rarity-checkboxes
		specFiltersBox.append('<label class="pf-title pf-box left" >Rarities</label>');
		for(var r = 0; r < pokeRarities.length; r++){
			specFiltersBox.append('<div class="spec-check-element"><input type="checkbox" pokerarity="' + pokeRarities[r] + '" id="spec-toggle-' + pokeRarities[r] + '" class="spec-checkBox pokeRarity">' + '<label' +
				' class="pf-title"' +
				' for="spec-toggle-' + pokeRarities[r] + '">' + pokeRarities[r] + '</label></div>');
		}
		var buttonsBox = $('<div class="pf-box left">' +
			'<a class="pf-toggle" id="spec-cancel-spec">CANCEL</a>' +
			'<a class="pf-toggle" id="spec-apply-spec">REPLACE LIST</a>' +
			'</div>');
		specFiltersBox.append(buttonsBox);
		filterDiv.append(specFiltersBox);


		// Box with the pokémon images
		var pokemonBox = $('<div id="pf-pokeBox"></div>');
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
			pokemonBox.append(img);
		}
		filterDiv.append(pokemonBox);

		// Bubbles & debug checkboxes
		filterDiv.append($('<div class="pf-box filter-settings left first">' +
			'<input type="checkbox" id="pf-bubbles">' +
			'<label for="pf-bubbles">Info bubbles for filter actions</label>' +
			'</div>'));

		filterDiv.append($('<div class="pf-box filter-settings left last">' +
			'<input type="checkbox" id="pf-debug">' +
			'<label for="pf-debug">Debug logging</label>' +
			'</div>'));

		// Selecting pages
		$('#pf-slot-'+self.preset_n).addClass('active');
		$('.pf-slot').on('click', function () {
			$('.pf-slot').removeClass('active');
			$(this).addClass('active');
			var n = $(this).data('n');
			self.selectBlacklistPage(n);
		});

		// Enable checkbox
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

		// Bubbles checkbox
		$('#pf-bubbles').attr('checked', self.enabled).on('change', function() {
			self.bubbles = $(this).is(':checked');
			self.persistConfig();

			toastr.remove();
			self.successBubble(null, 'Filter info bubbles enabled');
		});

		// Debug checkbox
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
			self.resetSpecCheckBoxes();
			self.togglePokemon(this.dataset.id); // also applies and saves
		});

		// Hide & show buttons
		$('#pf-hide-all').on('click', function () {
			self.replaceBlacklist(_.range(1, TOTAL_POKEMON_COUNT+1));
			self.resetSpecCheckBoxes();
			self.successBubble('Enable the ones you want, then click the map or refresh the page.', 'All species hidden.')
		});

		$('#pf-show-all').on('click', function () {
			self.replaceBlacklist([]);
			self.setSpecCheckBoxes();
			self.successBubble('Refresh the page or click the map to load them.', 'All species visible.')
		});

		$('#pf-spec-filter-menu').on('click', function () {
			self.toggleSpecView();
			previousSpecs = [];
			var checkBoxesToSave = document.querySelectorAll('.spec-checkBox');
			[].forEach.call(checkBoxesToSave, function(box){
				previousSpecs[box.id] = box.checked;
			});
		});

		$('#spec-cancel-spec').on('click', function () {
			self.toggleSpecView();
			if(specsEdited){
				self.rollBackSpecs();
				specsEdited = false;
				self.errorBubble('Nothing changed. Previous spec-settings restored.', 'CANCELED')
			}
		});

		$('#spec-apply-spec').on('click', function () {
			self.applySpecFilters();
			self.toggleSpecView();
			self.successBubble('Your chosen filters have replaced previous list. Now showing as you chose to filter.', 'Filters' +
				' applied!')
		});

		$('.spec-checkBox').on('click', function () {
			specsEdited = true;
		});
	};

	this.applySpecFilters = function(){
		var typesFilter = [];
		var rarityFilter = [];
		var idsToHide = [];

		var typeBoxes = document.querySelectorAll(".spec-checkBox.pokeType");
		[].forEach.call(typeBoxes, function(box){
			if(box.checked){
				typesFilter.push(box.getAttribute('poketype'));
			}
		});
		if(typesFilter.length == 0){
			typesFilter = pokeTypes;
		}

		var rarityBoxes = document.querySelectorAll(".spec-checkBox.pokeRarity");
		[].forEach.call(rarityBoxes, function(box){
			if(box.checked){
				rarityFilter.push(box.getAttribute('pokerarity'));
			}
		});
		if(rarityFilter.length == 0){
			rarityFilter = pokeRarities;
		}

		[].forEach.call(pokeData, function(entry){
			if(!rarityFilter.includes(entry.rarity) || !(typesFilter.includes(entry.type1) || typesFilter.includes(entry.type2))){
				idsToHide.push(entry.dexNo)
			}
		});
		if(idsToHide.isEmpty){
			self.replaceBlacklist([]);
		}else{
			self.replaceBlacklist(idsToHide);
		}
	};

	this.resetSpecCheckBoxes = function(){
		var specBoxes = document.querySelectorAll(".spec-checkBox");
		[].forEach.call(specBoxes, function(box) {
			box.checked = false;
		});
	};

	this.setSpecCheckBoxes = function(){
		var specBoxes = document.querySelectorAll(".spec-checkBox");
		[].forEach.call(specBoxes, function(box) {
			box.checked = true;
		});
	};

	this.rollBackSpecs = function(){
		var checkBoxesToRestore = document.querySelectorAll('.spec-checkBox');
		[].forEach.call(checkBoxesToRestore, function(box){
			box.checked = previousSpecs[box.id];
		});
	};

	this.toggleSpecView = function(){
		var toggleButtons = document.getElementById("initial-buttons");
		toggleButtons.style.display = toggleButtons.style.display === 'none' ? '' : 'none';

		var togglePokeBox = document.getElementById("pf-pokeBox");
		togglePokeBox.style.display = togglePokeBox.style.display === 'none' ? '' : 'none';

		var toggleMenu = document.getElementById("spec-filters-box");
		toggleMenu.style.display = toggleMenu.style.display === 'none' ? '' : 'none';
	};

	this.getWhiteList = function(){
		var whiteList = [];
		for(var i = 1; i <= TOTAL_POKEMON_COUNT; i++){
			if(!self.blacklist.includes(i)){
				whiteList.push(i);
			}
		}
		if(whiteList.length == 0){
			return [undefined];
		}else{
			return whiteList;
		}
	};
};

// Start up
PokemonFilter.init();
