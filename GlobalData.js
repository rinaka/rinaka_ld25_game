/*
	This is part of the game "Sword of Truth"
	created by Ricardo Nakamura for the Ludum Dare #25
	
	copyright 2012 Ricardo Nakamura
	Released under the LGPL
*/
var GlobalData = (function() {
	var mo = {}
	
	mo.burnedHouses = 0;
	mo.killedPeople = 0;
	mo.heroRevenge = 0;
	mo.sword = false;
	mo.heroDefeated = false;
	mo.playerDefeated = false;
	mo.aggression = false;
	mo.hardWin = false;
	
	mo.initialize = function() {
		this.burnedHouses = 0;
		this.killedPeople = 0;
		this.heroRevenge = 0;
		this.sword = false;
		this.heroDefeated = false;
		this.playerDefeated = false;
		this.aggression = false;
		this.hardWin = false;
	}
	
	return mo;
}());
