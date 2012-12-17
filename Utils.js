/*
	This is part of the game "Sword of Truth"
	created by Ricardo Nakamura for the Ludum Dare #25
	
	copyright 2012 Ricardo Nakamura
	Released under the LGPL
*/
var Utils = (function() {
	var mo = {}
	
	mo.randBetween = function(a, b) {
		return Math.floor(a + Math.random()*(b-a));
	}
	
	return mo;
}());
