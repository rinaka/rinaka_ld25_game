function TitleState() {
	this.setup = function() {
		GlobalData.initialize();
		this.fon = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.dt = 0;
	}
	
	this.update = function() {
		this.dt += jaws.game_loop.tick_duration;
		if (jaws.pressed("space") && this.dt > 1000)
			//jaws.switchGameState(TransitionState01);
			jaws.switchGameState(TransitionState02);
		else if (jaws.pressed("tab") && this.dt > 1000)
			jaws.switchGameState(CreditsState);
	}
	
	this.draw = function() {
		jaws.clear();
		jaws.context.drawImage(jaws.assets.get("title.png"), 0, 0);
		var tx = "PRESS SPACE TO START";
		var px = (jaws.width-tx.length*16)/2;
		this.fon.draw(tx, px, 280);
		tx = "PRESS TAB FOR CREDITS";
		px = (jaws.width-tx.length*16)/2;
		this.fon.draw(tx, px, 310);
	}
}
