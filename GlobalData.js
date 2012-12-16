/**
	My Global Data repository
*/
var GlobalData = (function() {
	var mo = {}
	
	mo.burnedHouses = 0;
	mo.killedPeople = 0;
	
	mo.initialize = function() {
		this.burnedHouses = 0;
		this.killedPeople = 0;
	}
	
	return mo;
}());
