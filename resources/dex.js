var PokeFilter_dex = {
	rarities: [
		"common",
		"uncommon",
		"rare",
		"very rare",
		"epic",
		"legendary",
		"mythic"
	],

	pokeTypes: [
		"grass",
		"fire",
		"water",
		"normal",
		"poison",
		"flying",
		"bug",
		"ghost",
		"fighting",
		"rock",
		"ground",
		"electric",
		"psychic",
		"dragon",
		"steel",
		"ice",
		"fairy"
	],

	fullDex: [
		{
			dexNo: 1,
			name: "Bulbasaur",
			rarity: "rare",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 2,
			name: "Ivysaur",
			rarity: "very rare",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 3,
			name: "Venusaur",
			rarity: "epic",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 4,
			name: "Charmander",
			rarity: "rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 5,
			name: "Charmeleon",
			rarity: "very rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 6,
			name: "Charizard",
			rarity: "epic",
			type1: "fire",
			type2: "flying"
		},
		{
			dexNo: 7,
			name: "Squirtle",
			rarity: "rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 8,
			name: "Wartortle",
			rarity: "very rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 9,
			name: "Blastoise",
			rarity: "epic",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 10,
			name: "Caterpie",
			rarity: "common",
			type1: "bug",
			type2: "NONE"
		},
		{
			dexNo: 11,
			name: "Metapod",
			rarity: "uncommon",
			type1: "bug",
			type2: "NONE"
		},
		{
			dexNo: 12,
			name: "Butterfree",
			rarity: "rare",
			type1: "bug",
			type2: "flying"
		},
		{
			dexNo: 13,
			name: "Weedle",
			rarity: "common",
			type1: "bug",
			type2: "poison"
		},
		{
			dexNo: 14,
			name: "Kakuna",
			rarity: "uncommon",
			type1: "bug",
			type2: "poison"
		},
		{
			dexNo: 15,
			name: "Beedrill",
			rarity: "very rare",
			type1: "bug",
			type2: "poison"
		},
		{
			dexNo: 16,
			name: "Pidgey",
			rarity: "common",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 17,
			name: "Pidgeotto",
			rarity: "uncommon",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 18,
			name: "Pidgeot",
			rarity: "very rare",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 19,
			name: "Rattata",
			rarity: "common",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 20,
			name: "Raticate",
			rarity: "uncommon",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 21,
			name: "Spearow",
			rarity: "uncommon",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 22,
			name: "Fearow",
			rarity: "rare",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 23,
			name: "Ekans",
			rarity: "common",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 24,
			name: "Arbok",
			rarity: "rare",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 25,
			name: "Pikachu",
			rarity: "rare",
			type1: "electric",
			type2: "NONE"
		},
		{
			dexNo: 26,
			name: "Raichu",
			rarity: "very rare",
			type1: "electric",
			type2: "NONE"
		},
		{
			dexNo: 27,
			name: "Sandshrew",
			rarity: "common",
			type1: "ground",
			type2: "NONE"
		},
		{
			dexNo: 28,
			name: "Sandslash",
			rarity: "rare",
			type1: "ground",
			type2: "NONE"
		},
		{
			dexNo: 29,
			name: "Nidoran",
			rarity: "common",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 30,
			name: "Nidorina",
			rarity: "rare",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 31,
			name: "Nidoqueen",
			rarity: "very rare",
			type1: "poison",
			type2: "ground"
		},
		{
			dexNo: 32,
			name: "Nidoran",
			rarity: "common",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 33,
			name: "Nidorino",
			rarity: "rare",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 34,
			name: "Nidoking",
			rarity: "very rare",
			type1: "poison",
			type2: "ground"
		},
		{
			dexNo: 35,
			name: "Clefairy",
			rarity: "uncommon",
			type1: "fairy",
			type2: "NONE"
		},
		{
			dexNo: 36,
			name: "Clefable",
			rarity: "epic",
			type1: "fairy",
			type2: "NONE"
		},
		{
			dexNo: 37,
			name: "Vulpix",
			rarity: "uncommon",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 38,
			name: "Ninetales",
			rarity: "very rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 39,
			name: "Jigglypuff",
			rarity: "uncommon",
			type1: "normal",
			type2: "fairy"
		},
		{
			dexNo: 40,
			name: "Wigglytuff",
			rarity: "very rare",
			type1: "normal",
			type2: "fairy"
		},
		{
			dexNo: 41,
			name: "Zubat",
			rarity: "common",
			type1: "poison",
			type2: "flying"
		},
		{
			dexNo: 42,
			name: "Golbat",
			rarity: "rare",
			type1: "poison",
			type2: "flying"
		},
		{
			dexNo: 43,
			name: "Oddish",
			rarity: "common",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 44,
			name: "Gloom",
			rarity: "rare",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 45,
			name: "Vileplume",
			rarity: "very rare",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 46,
			name: "Paras",
			rarity: "common",
			type1: "bug",
			type2: "grass"
		},
		{
			dexNo: 47,
			name: "Parasect",
			rarity: "very rare",
			type1: "bug",
			type2: "grass"
		},
		{
			dexNo: 48,
			name: "Venonat",
			rarity: "common",
			type1: "bug",
			type2: "poison"
		},
		{
			dexNo: 49,
			name: "Venomoth",
			rarity: "very rare",
			type1: "bug",
			type2: "poison"
		},
		{
			dexNo: 50,
			name: "Diglett",
			rarity: "common",
			type1: "ground",
			type2: "NONE"
		},
		{
			dexNo: 51,
			name: "Dugtrio",
			rarity: "very rare",
			type1: "ground",
			type2: "NONE"
		},
		{
			dexNo: 52,
			name: "Meowth",
			rarity: "common",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 53,
			name: "Persian",
			rarity: "very rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 54,
			name: "Psyduck",
			rarity: "uncommon",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 55,
			name: "Golduck",
			rarity: "rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 56,
			name: "Mankey",
			rarity: "common",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 57,
			name: "Primeape",
			rarity: "very rare",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 58,
			name: "Growlithe",
			rarity: "rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 59,
			name: "Arcanine",
			rarity: "very rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 60,
			name: "Poliwag",
			rarity: "common",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 61,
			name: "Poliwhirl",
			rarity: "rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 62,
			name: "Poliwrath",
			rarity: "very rare",
			type1: "water",
			type2: "fighting"
		},
		{
			dexNo: 63,
			name: "Abra",
			rarity: "uncommon",
			type1: "psychic",
			type2: "NONE"
		},
		{
			dexNo: 64,
			name: "Kadabra",
			rarity: "rare",
			type1: "psychic",
			type2: "NONE"
		},
		{
			dexNo: 65,
			name: "Alakazam",
			rarity: "very rare",
			type1: "psychic",
			type2: "NONE"
		},
		{
			dexNo: 66,
			name: "Machop",
			rarity: "common",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 67,
			name: "Machoke",
			rarity: "rare",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 68,
			name: "Machamp",
			rarity: "very rare",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 69,
			name: "Bellsprout",
			rarity: "common",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 70,
			name: "Weepinbell",
			rarity: "rare",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 71,
			name: "Victreebel",
			rarity: "very rare",
			type1: "grass",
			type2: "poison"
		},
		{
			dexNo: 72,
			name: "Tentacool",
			rarity: "uncommon",
			type1: "water",
			type2: "poison"
		},
		{
			dexNo: 73,
			name: "Tentacruel",
			rarity: "rare",
			type1: "water",
			type2: "poison"
		},
		{
			dexNo: 74,
			name: "Geodude",
			rarity: "common",
			type1: "rock",
			type2: "ground"
		},
		{
			dexNo: 75,
			name: "Graveler",
			rarity: "rare",
			type1: "rock",
			type2: "ground"
		},
		{
			dexNo: 76,
			name: "Golem",
			rarity: "very rare",
			type1: "rock",
			type2: "ground"
		},
		{
			dexNo: 77,
			name: "Ponyta",
			rarity: "uncommon",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 78,
			name: "Rapidash",
			rarity: "rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 79,
			name: "Slowpoke",
			rarity: "common",
			type1: "water",
			type2: "psychic"
		},
		{
			dexNo: 80,
			name: "Slowbro",
			rarity: "very rare",
			type1: "water",
			type2: "psychic"
		},
		{
			dexNo: 81,
			name: "Magnemite",
			rarity: "common",
			type1: "electric",
			type2: "steel"
		},
		{
			dexNo: 82,
			name: "Magneton",
			rarity: "rare",
			type1: "electric",
			type2: "steel"
		},
		{
			dexNo: 83,
			name: "Farfetch\\'d",
			rarity: "rare",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 84,
			name: "Doduo",
			rarity: "common",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 85,
			name: "Dodrio",
			rarity: "rare",
			type1: "normal",
			type2: "flying"
		},
		{
			dexNo: 86,
			name: "Seel",
			rarity: "uncommon",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 87,
			name: "Dewgong",
			rarity: "very rare",
			type1: "water",
			type2: "ice"
		},
		{
			dexNo: 88,
			name: "Grimer",
			rarity: "uncommon",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 89,
			name: "Muk",
			rarity: "very rare",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 90,
			name: "Shellder",
			rarity: "uncommon",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 91,
			name: "Cloyster",
			rarity: "rare",
			type1: "water",
			type2: "ice"
		},
		{
			dexNo: 92,
			name: "Gastly",
			rarity: "common",
			type1: "ghost",
			type2: "poison"
		},
		{
			dexNo: 93,
			name: "Haunter",
			rarity: "rare",
			type1: "ghost",
			type2: "poison"
		},
		{
			dexNo: 94,
			name: "Gengar",
			rarity: "very rare",
			type1: "ghost",
			type2: "poison"
		},
		{
			dexNo: 95,
			name: "Onix",
			rarity: "rare",
			type1: "rock",
			type2: "ground"
		},
		{
			dexNo: 96,
			name: "Drowzee",
			rarity: "common",
			type1: "psychic",
			type2: "NONE"
		},
		{
			dexNo: 97,
			name: "Hypno",
			rarity: "rare",
			type1: "psychic",
			type2: "NONE"
		},
		{
			dexNo: 98,
			name: "Krabby",
			rarity: "common",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 99,
			name: "Kingler",
			rarity: "rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 100,
			name: "Voltorb",
			rarity: "common",
			type1: "electric",
			type2: "NONE"
		},
		{
			dexNo: 101,
			name: "Electrode",
			rarity: "rare",
			type1: "electric",
			type2: "NONE"
		},
		{
			dexNo: 102,
			name: "Exeggcute",
			rarity: "uncommon",
			type1: "grass",
			type2: "psychic"
		},
		{
			dexNo: 103,
			name: "Exeggutor",
			rarity: "very rare",
			type1: "grass",
			type2: "psychic"
		},
		{
			dexNo: 104,
			name: "Cubone",
			rarity: "uncommon",
			type1: "ground",
			type2: "NONE"
		},
		{
			dexNo: 105,
			name: "Marowak",
			rarity: "very rare",
			type1: "ground",
			type2: "NONE"
		},
		{
			dexNo: 106,
			name: "Hitmonlee",
			rarity: "rare",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 107,
			name: "Hitmonchan",
			rarity: "rare",
			type1: "fighting",
			type2: "NONE"
		},
		{
			dexNo: 108,
			name: "Lickitung",
			rarity: "rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 109,
			name: "Koffing",
			rarity: "uncommon",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 110,
			name: "Weezing",
			rarity: "very rare",
			type1: "poison",
			type2: "NONE"
		},
		{
			dexNo: 111,
			name: "Rhyhorn",
			rarity: "rare",
			type1: "ground",
			type2: "rock"
		},
		{
			dexNo: 112,
			name: "Rhydon",
			rarity: "very rare",
			type1: "ground",
			type2: "rock"
		},
		{
			dexNo: 113,
			name: "Chansey",
			rarity: "rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 114,
			name: "Tangela",
			rarity: "uncommon",
			type1: "grass",
			type2: "NONE"
		},
		{
			dexNo: 115,
			name: "Kangaskhan",
			rarity: "very rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 116,
			name: "Horsea",
			rarity: "uncommon",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 117,
			name: "Seadra",
			rarity: "very rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 118,
			name: "Goldeen",
			rarity: "common",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 119,
			name: "Seaking",
			rarity: "rare",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 120,
			name: "Staryu",
			rarity: "uncommon",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 121,
			name: "Starmie",
			rarity: "rare",
			type1: "water",
			type2: "psychic"
		},
		{
			dexNo: 122,
			name: "Mr. Mime",
			rarity: "rare",
			type1: "psychic",
			type2: "fairy"
		},
		{
			dexNo: 123,
			name: "Scyther",
			rarity: "rare",
			type1: "bug",
			type2: "flying"
		},
		{
			dexNo: 124,
			name: "Jynx",
			rarity: "uncommon",
			type1: "ice",
			type2: "psychic"
		},
		{
			dexNo: 125,
			name: "Electabuzz",
			rarity: "rare",
			type1: "electric",
			type2: "NONE"
		},
		{
			dexNo: 126,
			name: "Magmar",
			rarity: "rare",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 127,
			name: "Pinsir",
			rarity: "rare",
			type1: "bug",
			type2: "NONE"
		},
		{
			dexNo: 128,
			name: "Tauros",
			rarity: "very rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 129,
			name: "Magikarp",
			rarity: "common",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 130,
			name: "Gyarados",
			rarity: "epic",
			type1: "water",
			type2: "flying"
		},
		{
			dexNo: 131,
			name: "Lapras",
			rarity: "very rare",
			type1: "water",
			type2: "ice"
		},
		{
			dexNo: 132,
			name: "Ditto",
			rarity: "epic",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 133,
			name: "Evee",
			rarity: "common",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 134,
			name: "Vaporeon",
			rarity: "epic",
			type1: "water",
			type2: "NONE"
		},
		{
			dexNo: 135,
			name: "Jolteon",
			rarity: "epic",
			type1: "electric",
			type2: "NONE"
		},
		{
			dexNo: 136,
			name: "Flareon",
			rarity: "epic",
			type1: "fire",
			type2: "NONE"
		},
		{
			dexNo: 137,
			name: "Porygon",
			rarity: "very rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 138,
			name: "Omanyte",
			rarity: "rare",
			type1: "rock",
			type2: "water"
		},
		{
			dexNo: 139,
			name: "Omastar",
			rarity: "very rare",
			type1: "rock",
			type2: "water"
		},
		{
			dexNo: 140,
			name: "Kabuto",
			rarity: "rare",
			type1: "rock",
			type2: "water"
		},
		{
			dexNo: 141,
			name: "Kabutops",
			rarity: "very rare",
			type1: "rock",
			type2: "water"
		},
		{
			dexNo: 142,
			name: "Aerodactyl",
			rarity: "rare",
			type1: "rock",
			type2: "flying"
		},
		{
			dexNo: 143,
			name: "Snorlax",
			rarity: "rare",
			type1: "normal",
			type2: "NONE"
		},
		{
			dexNo: 144,
			name: "Articuno",
			rarity: "legendary",
			type1: "ice",
			type2: "flying"
		},
		{
			dexNo: 145,
			name: "Zapdos",
			rarity: "legendary",
			type1: "electric",
			type2: "flying"
		},
		{
			dexNo: 146,
			name: "Moltres",
			rarity: "legendary",
			type1: "fire",
			type2: "flying"
		},
		{
			dexNo: 147,
			name: "Dratini",
			rarity: "rare",
			type1: "dragon",
			type2: "NONE"
		},
		{
			dexNo: 148,
			name: "Dragonair",
			rarity: "very rare",
			type1: "dragon",
			type2: "NONE"
		},
		{
			dexNo: 149,
			name: "Dragonite",
			rarity: "epic",
			type1: "dragon",
			type2: "flying"
		},
		{
			dexNo: 150,
			name: "Mewtwo",
			rarity: "legendary",
			type1: "psychic",
			type2: "NONE"
		},
		{
			dexNo: 151,
			name: "Mew",
			rarity: "mythic",
			type1: "psychic",
			type2: "NONE"
		}
	]
};
