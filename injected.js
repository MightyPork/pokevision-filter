"use strict";

// Main 'class'
var PokeFilter = new function () {
	var main = this;
	var ui, conf;

	// PokéVision code
	var app = window.App;
	var home = app.home;

	this.TOTAL_POKEMON_COUNT = 150;

	/** Get pokemon name by ID */
	this.idName = function(id) {
		return PokeFilter_names[+id];
	};

	/** Start the extension */
	this.init = function () {
		// Can't do this statically - not yet loaded.
		ui = PokeFilter.ui;
		conf = PokeFilter.config;

		if (_.isUndefined(app) || $('main').hasClass('error')) {
			console.warn('[filter] Either the site scripts changed, or it didn\'t load right.\nCannot init PokéVision Filter.');
			return;
		}

		conf.load();
		main._installFilter();
		ui.init();
		main.apply();

		console.info("[filter] Filter ready, good hunting!");
	};

	/**
	 * Remove pokemon already drawn on the map that match the current blacklist.
	 */
	this._applyBlacklist = function () {
		conf.debug && console.log('[filter] Applying filter to the map.');

		var white = conf.getWhitelist();
		if (!white.length) {
			white = [undefined]; // workaround for a vanilla code peculiarity - empty is treated as Show all
		}

		home.filters = white;
		home.updateMarkers();
	};

	/** Wrap the createMarker function in a filter */
	this._installFilter = function () {
		conf.debug && console.log("[filter] Installing marker processor.");

		home.createMarkerOrig = home.createMarker;
		home.createMarker = function (idx, pk) {
			var marker = home.createMarkerOrig(idx, pk);

			// TODO we can do some neat stuff with the marker here

			return marker;
		};
	};

	/**
	 * - Visually apply changes in config.
	 * - Apply filter to the map.
	 * - Persist config
	 */
	this.apply = function () {
		ui.updateFilterVisuals();
		main._applyBlacklist();
		conf.persist();
	};
};

// Config. Changing config using the methods generally applies the change immediately.
PokeFilter.config = new function () {
	var conf = this;
	var main = PokeFilter;

	conf.debug = false;
	conf.bubbles = false;
	conf.enabled = true;
	conf.blacklists = [];
	conf.page = 0;
	conf.confirm_actions = true;

	// The currently open blacklist is 'main.blacklist'.
	// Gotta replace it in the blacklists array when saving.

	/**
	 * Load settings from localStorage
	 */
	this.load = function () {
		var configStr = localStorage.getItem('pokemon_filter');

		// Defaults
		var saved = {
			enabled: true,
			blacklists: [[], [], [], [], []],
			preset_n: 0,
			bubbles: true,
			debug: false,
			confirm_actions: true,
		};

		if (configStr) {
			try {
				saved = JSON.parse(configStr);
			} catch (e) {
				console.warn("[filter] Config corrupted, cleaning up.");
			}
		}

		if (_.isUndefined(saved.confirm_actions)) saved.confirm_actions = true;
		if (_.isUndefined(saved.bubbles)) saved.bubbles = true;
		if (_.isUndefined(saved.debug)) saved.debug = false;

		// Load the config
		conf.blacklists = saved.blacklists;
		if (_.isUndefined(conf.blacklists) || !_.isArray(conf.blacklists) || conf.blacklists.length != 5) {
			conf.blacklists = [[], [], [], [], []];
		}

		// Cast all items to numbers
		for (var i = 0; i < conf.blacklists.length; i++) {
			for (var j = 0; j < conf.blacklists[i].length; j++) {
				conf.blacklists[i][j] *= 1;
			}

			conf.blacklists[i] = _.uniq(conf.blacklists[i]);
		}

		conf.page = saved.page || 0;
		conf.enabled = !!saved.enabled;
		conf.bubbles = !!saved.bubbles;
		conf.debug = !!saved.debug;
		conf.confirm_actions = !!saved.confirm_actions;

		conf.debug && console.log("[filter] Config loaded: ", saved);
	};

	/**
	 * Store current settings to localStorage
	 */
	this.persist = function () {
		// Remove nulls
		for (var i = 0; i < conf.blacklists.length; i++) {
			conf.blacklists[i] = _.filter(conf.blacklists[i], function (x) {
				return !_.isUndefined(x) && !_.isNull(x)
			});
		}

		var toSave = {
			enabled: conf.enabled,
			blacklists: conf.blacklists,
			preset_n: conf.page,
			bubbles: conf.bubbles,
			debug: conf.debug,
			confirm_actions: conf.confirm_actions
		};

		localStorage.setItem('pokemon_filter', JSON.stringify(toSave));

		conf.debug && console.log("[filter] Saved config.");
	};

	this.selectPage = function (n) {
		if (n < 0 || n >= conf.blacklists.length) {
			console.errorBubble("[filter] Invalid slot number:", n);
			return;
		}

		conf.page = n;

		conf.debug && console.log("[filter] Switched to filter page:", n);
		main.apply();
	};

	this.hidePokemon = function (id) {
		conf.blacklists[conf.page].push(+id);
		main.apply();
	};

	this.showPokemon = function (id) {
		conf.blacklists[conf.page] = _.difference(conf.blacklists[conf.page], [+id]);
		main.apply();
	};

	/**
	 * Test pokemon visibility.
	 *
	 * @param id
	 * @param ignoreEnable - if true, disregard `conf.enabled`. Otherwise, if disabled, all are visible.
	 * @returns {boolean}
	 */
	this.isPokemonHidden = function (id, ignoreEnable) {
		id = +id;
		if (!ignoreEnable && !conf.enabled) return false; // All visible if disabled.
		return conf.blacklists[conf.page].indexOf(id) != -1;
	};

	this.togglePokemon = function (id, state) {
		id = +id;

		if (_.isUndefined(state)) {
			state = !conf.isPokemonHidden(id);
		}

		conf.debug && console.log('[filter] Toggling pokemon:', id, '(' + main.idName(id) + ') - ', (state ? 'SHOW' : 'HIDE'));

		if (state) {
			conf.hidePokemon(id);
		} else {
			conf.showPokemon(id);
		}
	};

	this.showAllPokemon = function () {
		conf.blacklists[conf.page].length = 0;
		main.apply();
	};

	this.hideAllPokemon = function () {
		conf.blacklists[conf.page] = _.range(1, main.TOTAL_POKEMON_COUNT + 1);
		main.apply();
	};

	this.replaceBlacklist = function (list) {
		conf.blacklists[conf.page] = list;
		main.apply();
	};

	this.getBlacklist = function () {
		return conf.blacklists[conf.page];
	};

	this.getWhitelist = function () {
		var all = _.range(1, main.TOTAL_POKEMON_COUNT + 1);
		if (!conf.enabled) return all;
		return _.difference(all, conf.getBlacklist());
	};
};

// User Interface
PokeFilter.ui = new function () {
	var ui = this;
	var main = PokeFilter;
	var app, conf;

	var filterDiv;

	var pokeTypes = PokeFilter_dex.pokeTypes;
	var pokeRarities = PokeFilter_dex.rarities;
	var pokeData = PokeFilter_dex.fullDex;

	var specsEdited = false;
	var previousSpecs;

	this.init = function () {
		conf = PokeFilter.config;
		app = window.App;

		this._hideVanillaFilter();
		this._buildUserInterface(); // TODO split
	};

	/** Ask for a confirmation */
	this.confirm = function(question) {
		if (!conf.confirm_actions) return true;
		return confirm(question);
	};

	/** Show a success bubble (green) */
	this.successBubble = function (text, heading) {
		if (!conf.bubbles) return;
		toastr.remove();
		app.success(text, heading);
	};

	/** Show an error bubble (red) */
	this.errorBubble = function (text, heading) {
		if (!conf.bubbles) return;
		toastr.remove();
		app.error(text, heading);
	};

	/** Mark hidden / visible Pokémon in the filter panel. */
	this.updateFilterVisuals = function () {
		// Update pokemon toggles
		$('.x-filter-pokemon').each(function (n, elem) {
			var id = $(elem).data('id');
			$(elem).toggleClass('filter-hidden', conf.isPokemonHidden(id, true));
		});

		// Mark current page as active
		$('.pf-slot').removeClass('active');
		$('#pf-slot-' + conf.page).addClass('active');

		$('#pf-toggle-label').toggleClass('disabled', !conf.enabled);
	};

	// region Build UI

	/** Build the filter UI */
	this._buildUserInterface = function () {
		conf.debug && console.log("[filter] Building user interface...");

		filterDiv = $('<div class="PokemonFilter"></div>');
		$('.home-sidebar').prepend(filterDiv);

		ui._buildTopNav();
		ui._buildSpecFilterBox();
		ui._buildPokeBox();
		ui._buildConfigBox();
	};

	this._hideVanillaFilter = function () {
		var crapFilter = document.querySelector('.btn-group.bootstrap-select.show-tick.form-control');
		crapFilter.style.display = 'none';
	};

	/** Build the two boxes on top of the filter */
	this._buildTopNav = function () {
		// Top row with toggle buttons
		var box1 = $('<div class="pf-box"></div>');
		box1.append('<input type="checkbox" id="pf-enable">');
		box1.append('<label class="pf-title" for="pf-enable" id="pf-toggle-label">Pokémon Filter</label>');
		for (var i = 0; i < conf.blacklists.length; i++) {
			box1.append('<a class="pf-slot" id="pf-slot-' + i + '" data-n="' + i + '">' + (i + 1) + '</a>');
		}
		filterDiv.append(box1);

		// Box with save slots
		var box2 = $('<div class="pf-box left" id="initial-buttons"></div>');
		box2.append('<a class="pf-toggle" id="pf-show-all">Show all</a>');
		box2.append('<a class="pf-toggle" id="pf-hide-all">Hide all</a>');
		box2.append('<a class="pf-toggle" id="pf-spec-filter-menu">By Attributes</a>');
		filterDiv.append(box2);

		// Selecting pages
		$('.pf-slot').on('click', function () {
			$('.pf-slot').removeClass('active');
			$(this).addClass('active');
			var n = $(this).data('n');

			conf.selectPage(n);
		});

		// Hide & show buttons
		$('#pf-hide-all').on('click', function () {
			if (ui.confirm("Really hide all species? This will modify the current filter page.")) {
				conf.hideAllPokemon();
				ui._specUncheckAll();
				ui.successBubble('All species hidden.');
			}
		});

		$('#pf-show-all').on('click', function () {
			if (ui.confirm("Really show all species? This will modify the current filter page.")) {
				conf.showAllPokemon();
				ui._specCheckAll();
				ui.successBubble('All species visible.');
			}
		});
	};

	this._buildPokeBox = function () {
		// Box with the pokémon images
		var pokemonBox = $('<div id="pf-pokebox"></div>');
		for (var id = 1; id < main.TOTAL_POKEMON_COUNT + 1; id++) {
			var img = document.createElement('img');
			img.src = 'https://ugc.pokevision.com/images/pokemon/' + id + '.png';
			img.title = main.idName(id) + ' - ' + id + '';
			img.classList.add('x-filter-pokemon');
			img.id = 'filter-pokemon-id-' + id;
			img.dataset.id = id;

			pokemonBox.append(img);
		}
		filterDiv.append(pokemonBox);

		// Toggle pokémon on click
		$('.x-filter-pokemon').on('click', function () {
			ui._specUncheckAll();
			conf.togglePokemon(this.dataset.id);
		});
	};

	this._buildConfigBox = function () {
		filterDiv.append($('<div class="pf-box filter-settings left first caption">' +
			'Filter settings' +
			'</div>'));

		filterDiv.append($('<div class="pf-box filter-settings left">' +
			'<input type="checkbox" id="pf-bubbles">' +
			'<label for="pf-bubbles">Info bubbles for filter actions</label>' +
			'</div>'));

		filterDiv.append($('<div class="pf-box filter-settings left">' +
			'<input type="checkbox" id="pf-debug">' +
			'<label for="pf-debug">Debug logging</label>' +
			'</div>'));

		filterDiv.append($('<div class="pf-box filter-settings left last">' +
			'<input type="checkbox" id="pf-confirm">' +
			'<label for="pf-confirm">Confirmation dialogs</label>' +
			'</div>'));

		// Enable checkbox
		$('#pf-enable').attr('checked', conf.enabled).on('change', function () {
			conf.enabled = $(this).is(':checked');
			main.apply();

			if (conf.enabled) {
				ui.successBubble(null, 'Filter enabled');
			} else {
				ui.errorBubble(null, 'Filter disabled');
			}
		});

		// Bubbles checkbox
		$('#pf-bubbles').attr('checked', conf.enabled).on('change', function () {
			conf.bubbles = $(this).is(':checked');
			conf.persist();

			toastr.remove();
			ui.successBubble(null, 'Filter info bubbles enabled');
		});

		// Debug checkbox
		$('#pf-debug').attr('checked', conf.debug).on('change', function () {
			conf.debug = $(this).is(':checked');
			conf.persist();

			if (conf.debug) {
				ui.successBubble(null, 'Filter debug enabled');
			} else {
				ui.errorBubble(null, 'Filter debug disabled');
			}
		});

		// Debug checkbox
		$('#pf-confirm').attr('checked', conf.confirm_actions).on('change', function () {
			conf.confirm_actions = $(this).is(':checked');
			conf.persist();

			if (conf.confirm_actions) {
				ui.successBubble(null, 'Confirmation prompts enabled');
			} else {
				ui.errorBubble(null, 'Confirmation prompts disabled');
			}
		});
	};

	// endregion

	// region Specific Filters

	this._buildSpecFilterBox = function () {
		// TODO clean up this mess

		// Box for setting specific filters
		var specFiltersBox = $('<div class="pf-specFilters" id="spec-filters-box" style="display: none"></div>');

		//adding type-checkboxes
		specFiltersBox.append('<span class="pf-title pf-box left">Types</span>');
		for (var t = 0; t < pokeTypes.length; t++) {
			specFiltersBox.append('<div class="spec-check-element">' +
				'<input type="checkbox" poketype="' + pokeTypes[t] + '" id="spec-toggle-' + pokeTypes[t] + '" class="spec-checkBox pokeType">' +
				'<label for="spec-toggle-' + pokeTypes[t] + '">' + pokeTypes[t] + '</label></div>');
		}

		//adding rarity-checkboxes
		specFiltersBox.append('<span class="pf-title pf-box left" >Rarities</span>');
		for (var r = 0; r < pokeRarities.length; r++) {
			specFiltersBox.append(
				'<div class="spec-check-element"><input type="checkbox" pokerarity="' + pokeRarities[r] + '" id="spec-toggle-' + pokeRarities[r] + '" class="spec-checkBox pokeRarity">' +
				'<label for="spec-toggle-' + pokeRarities[r] + '">' + pokeRarities[r] + '</label></div>');
		}
		var buttonsBox = $('<div class="pf-box left">' +
			'<a class="pf-toggle" id="spec-cancel-spec">Cancel</a>' +
			'<a class="pf-toggle" id="spec-apply-spec">Apply filter</a>' +
			'</div>');
		specFiltersBox.append(buttonsBox);
		filterDiv.append(specFiltersBox);

		// Button to show the spec box
		$('#pf-spec-filter-menu').on('click', function () {
			ui._specToggleView();
			previousSpecs = [];
			var checkBoxesToSave = document.querySelectorAll('.spec-checkBox');
			[].forEach.call(checkBoxesToSave, function (box) {
				previousSpecs[box.id] = box.checked;
			});
		});

		// Button to close the box & abort
		$('#spec-cancel-spec').on('click', function () {
			ui._specToggleView();
			if (specsEdited) {
				ui._specRollback();
				specsEdited = false;
				//ui.errorBubble('Nothing changed. Previous spec-settings restored.', 'CANCELED')
			}
		});

		// Button to close the box & apply spec filters
		$('#spec-apply-spec').on('click', function () {
			if (ui.confirm('Apply filters? This will overwrite the current filter page.')) {
				ui._specApply();
				ui._specToggleView();
				ui.successBubble('Filters applied!');
			}
		});

		// Mark change on checkbox click
		$('.spec-checkBox').on('click', function () {
			specsEdited = true;
		});
	};

	this._specApply = function () {
		var typesFilter = [];
		var rarityFilter = [];
		var idsToHide = [];

		var typeBoxes = document.querySelectorAll(".spec-checkBox.pokeType");
		[].forEach.call(typeBoxes, function (box) {
			if (box.checked) {
				typesFilter.push(box.getAttribute('poketype'));
			}
		});
		if (typesFilter.length == 0) {
			typesFilter = pokeTypes;
		}

		var rarityBoxes = document.querySelectorAll(".spec-checkBox.pokeRarity");
		[].forEach.call(rarityBoxes, function (box) {
			if (box.checked) {
				rarityFilter.push(box.getAttribute('pokerarity'));
			}
		});
		if (rarityFilter.length == 0) {
			rarityFilter = pokeRarities;
		}

		[].forEach.call(pokeData, function (entry) {
			if (!rarityFilter.includes(entry.rarity) || !(typesFilter.includes(entry.type1) || typesFilter.includes(entry.type2))) {
				idsToHide.push(+entry.dexNo)
			}
		});

		conf.replaceBlacklist(idsToHide);
	};

	this._specUncheckAll = function () {
		var specBoxes = document.querySelectorAll(".spec-checkBox");
		[].forEach.call(specBoxes, function (box) {
			box.checked = false;
		});
	};

	this._specCheckAll = function () {
		var specBoxes = document.querySelectorAll(".spec-checkBox");
		[].forEach.call(specBoxes, function (box) {
			box.checked = true;
		});
	};

	this._specRollback = function () {
		var checkBoxesToRestore = document.querySelectorAll('.spec-checkBox');
		[].forEach.call(checkBoxesToRestore, function (box) {
			box.checked = previousSpecs[box.id];
		});
	};

	this._specToggleView = function () {
		var toggleButtons = document.getElementById("initial-buttons");
		toggleButtons.style.display = toggleButtons.style.display === 'none' ? '' : 'none';

		var togglePokeBox = document.getElementById("pf-pokebox");
		togglePokeBox.style.display = togglePokeBox.style.display === 'none' ? '' : 'none';

		var toggleMenu = document.getElementById("spec-filters-box");
		toggleMenu.style.display = toggleMenu.style.display === 'none' ? '' : 'none';
	};

	// endregion
};

// Start up
PokeFilter.init();
