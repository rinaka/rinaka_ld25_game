/*
	This is part of the game "Sword of Truth"
	created by Ricardo Nakamura for the Ludum Dare #25
	
	copyright 2012 Ricardo Nakamura
	Released under the LGPL
*/
function CreditsState() {
	this.setup = function() {
		this.fon = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.dt = 0;
	}
	
	this.update = function() {
		this.dt += jaws.game_loop.tick_duration;
		if (jaws.pressed("space") && this.dt > 1000)
			jaws.switchGameState(TitleState);
	}
	
	this.draw = function() {
		jaws.context.fillStyle = "#000000";
		jaws.context.fillRect(0, 0, jaws.width, jaws.height);
		this.fon.draw("CREDITS:", 20, 20);
		this.fon.draw("GAME CREATED BY RICARDO", 20, 40);
		this.fon.draw("NAKAMURA FOR THE LUDUM DARE", 20, 60);
		this.fon.draw("48H COMPETITION", 20, 80);
		
		this.fon.draw("USES THE FONTS:", 20, 120);
		this.fon.draw("WICKED QUEEN BY BLAMBOT", 20, 140);
		this.fon.draw("ARCADE CLASSIC BY PIZZADUDE", 20, 160);
		
		this.fon.draw("LICENSE:", 20, 200);
		this.fon.draw("LGPL FOR MY SOURCE CODE", 20, 220);
		this.fon.draw("CC BY SA FOR MY ASSETS", 20, 240);
		this.fon.draw("BITMAP FONTS ARE FOR USE WITH", 20, 260);
		this.fon.draw("THIS GAME ONLY> DO NOT REUSE<", 20, 280);
		
		this.fon.draw("PRESS SPACE TO RETURN TO TITLE", 20, 320);
	}
}
