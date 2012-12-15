/**
	A simple bitmap font drawing helper for the JawsJS engine.
	
	by Ricardo Nakamura

	v1.0 - 14/Dec/2012
	
	Usage:
	
	Create a bitmap font file using the Manual Bitmap Font Generator at:
	http://www.evilmaskstudios.com/lab/bitmap/index.php
	
	NOTE: generate with Numbers and Uppercase Letters, with no lines. Edit the bitmap so
	that all characters are in a single line.
	
	Load the font asset, then create the BMFont object
	
	var x = new BitmapFont.BMFont("font.png", 16, 16) // in this case, 16x16 pixel cells

	Later on, draw a string like
	
	x.draw("HELLO WORLD", 50, 120);
	
	This software is provided under the LGPL license.
*/
var BitmapFont = (function() {
	var mo = {}
	
	mo.BMFont = function(fname, cellw, cellh) {
		this.fbmp = jaws.assets.get(fname);
		this.cw = cellw;
		this.ch = cellh;
		this.draw = function(tx, px, py) {
			var i;
			for (i = 0; i < tx.length; i++) {
				jaws.context.drawImage(this.fbmp, 16*(tx.charCodeAt(i)-48), 0, this.cw, this.ch, px, py, this.cw, this.ch);
				px = px + this.cw;
			}
		}
	}

	return mo;
}());
