function TransitionState01() {
	this.setup = function() {
		this.fnt = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.dt = 0;
		this.alpha = 0;
	}
	
	this.update = function() {
		this.dt += jaws.game_loop.tick_duration;
		this.alpha = this.dt/1000;
		if (this.alpha > 1) this.alpha = 1;
		if (this.dt >= 2000)
			jaws.switchGameState(ReceiptState);
	}
	
	this.draw = function() {
		jaws.context.globalAlpha = 1;
		jaws.context.fillStyle = "#000000";
		jaws.context.fillRect(0, 0, jaws.width, jaws.height);
		var tx = "CHAPTER 1:";
		var px = (jaws.width - 16*tx.length)/2;
		var py = jaws.height/2 - 32;
		jaws.context.globalAlpha = this.alpha;
		this.fnt.draw(tx, px, py);
		tx = "RECEIPT";
		px = (jaws.width - 16*tx.length)/2;
		py += 64;
		this.fnt.draw(tx, px, py);
	}
}
