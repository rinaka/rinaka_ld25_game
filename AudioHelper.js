/**
	A simple audio loading helper for the JawsJS engine.
	Requires you to have two versions of each sound: ogg and mp3
	
	by Ricardo Nakamura

	v1.0 - 01/Dec/2012
	
	Usage:
	
	Instead of adding sounds to the asset manager, e.g.
		jaws.assets.add("mysound.mp3")
	Add it through the helper, without file extension:
		AudioHelper.add("mysound")
		
	The same goes for retrieving sounds, e.g.
		AudioHelper.get("mysound")
		
	This software is provided under the LGPL license.
*/
var AudioHelper = (function() {
	var mo = {}
	var sound_capable = false;
	var sound_suffix = "";
	
	function initialize() {
		// media format support checks obtained from:
		// http://diveintohtml5.com/everything.html

		var a = document.createElement('audio');	
		if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))) {
			sound_capable = true;
			sound_suffix = ".mp3";
		}
		else if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
			sound_capable = true;
			sound_suffix = ".ogg";
		}
	}
	
	/* If for some reason neither format is supported, this dummy object will be
	   returned, so in your code your calls to play() etc. won't cause errors.
	*/
	var audio_dummy = {
		addTextTrack: function() {},
		canPlayType: function() {return false},
		load: function(){},
		play: function(){},
		pause: function() {}
	};
	
	mo.add = function(fname) {
		if (sound_capable) {
			jaws.assets.add(fname+sound_suffix);
		}
	}
	
	mo.get = function(fname) {
		if (sound_capable)
			return jaws.assets.get(fname+sound_suffix);
		else
			return audio_dummy;
	}

	initialize();
	return mo;
}());
