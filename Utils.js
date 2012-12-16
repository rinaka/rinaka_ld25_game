/**
	My Utility Functions
*/
var Utils = (function() {
	var mo = {}
	
	mo.randBetween = function(a, b) {
		return Math.floor(a + Math.random()*(b-a));
	}
	
	return mo;
}());
