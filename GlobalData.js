/**
	My Global Data repository
*/
var GlobalData = (function() {
	var mo = {}
	
	mo.burnedHouses = 0;
	mo.killedPeople = 0;
	mo.heroRevenge = 0;
	mo.sword = false;
	mo.heroDefeated = false;
	mo.playerDefeated = false;
	mo.hardWin = false;
	
	mo.initialize = function() {
		this.burnedHouses = 0;
		this.killedPeople = 0;
		this.heroRevenge = 0;
		this.sword = false;
		this.heroDefeated = false;
		this.playerDefeated = false;
		this.hardWin = false;
	}
	
	return mo;
}());
