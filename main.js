'use strict';

// Script injection (c) http://stackoverflow.com/a/30289669/2180189

/**
 * Load a script from file & wrap it in an element for injection.
 *
 * @param file - file path relative to the extension root
 * @returns {Element}
 */
function scriptFromFile(file) {
	var script = document.createElement("script");
	script.src = chrome.extension.getURL(file);
	return script;
}

function injectCss(file) {
	var style = document.createElement("link");
	style.rel = 'stylesheet';
	style.href = chrome.extension.getURL(file);
	document.head.appendChild(style);
}

/**
 * Inject script tags into the page.
 *
 * @param scripts
 */
function inject(scripts) {
	if (scripts.length === 0)
		return;
	var otherScripts = scripts.slice(1);
	var script = scripts[0];
	var onload = function () {
		script.parentNode.removeChild(script);
		inject(otherScripts);
	};
	if (script.src != "") {
		script.onload = onload;
		document.head.appendChild(script);
	} else {
		document.head.appendChild(script);
		onload();
	}
}

// Booting up!
inject([
	scriptFromFile('lib/lodash.min.js'), // jquery is already installed in the page
	scriptFromFile('resources/dex.js'),
	scriptFromFile('resources/names.js'),
	scriptFromFile('injected.js')
]);

injectCss('injected.css');
