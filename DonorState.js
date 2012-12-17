/*
	This is part of the game "Sword of Truth"
	created by Ricardo Nakamura for the Ludum Dare #25
	
	copyright 2012 Ricardo Nakamura
	Released under the LGPL
*/
function DonorState() {
	this.setup = function() {
		this.fnt = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.state = 0;
		this.blip = true;
		this.blipTimer = 0;
		this.dt = 0;
	}
	
	this.update = function() {
		this.dt += jaws.game_loop.tick_duration;
		this.blipTimer += jaws.game_loop.tick_duration;
		if (this.blipTimer >= 200) {
			this.blipTimer -= 200;
			this.blip = !this.blip;
		}
		switch(this.state) {
			case 0:
			case 1:
			case 2:
			case 3:
			if (jaws.pressed("space") && this.dt > 500) {
				this.dt = 0;
				this.state++;
			}
			break;
			case 4:
				jaws.switchGameState(VillainyState);
		}
	}
	
	this.draw = function() {
		switch(this.state) {
			case 0:
				jaws.context.drawImage(jaws.assets.get("mountain.png"), 0, 0);
				this.fnt.draw("SOMEWHERE IN THE CRYSTAL", 10, 20);
				this.fnt.draw("MOUNTAINS<<<", 10, 40);
				if (this.blip)
					jaws.context.drawImage(jaws.assets.get("moreblip.png"), 10, 60);
				break;
			case 1:
				jaws.context.drawImage(jaws.assets.get("templescene.png"), 0, 0);
				this.fnt.draw("OH= QUEEN OF THE", 100, 88);
				this.fnt.draw("FAIRIES> I NEED", 100, 108);
				this.fnt.draw("YOUR AID TO FIGHT", 100, 128);
				this.fnt.draw("AN EVIL WIZARD>", 100, 148);
				if (this.blip)
					jaws.context.drawImage(jaws.assets.get("moreblip.png"), 100, 168);
				break;
			case 2:
				jaws.context.drawImage(jaws.assets.get("templescene.png"), 0, 0);
				this.fnt.draw("AND WHAT HAS THIS", 220, 80);
				this.fnt.draw("WIZARD DONE?", 220, 100);
				if (this.blip)
					jaws.context.drawImage(jaws.assets.get("moreblip.png"), 220, 120);
				break;
			case 3:
				jaws.context.drawImage(jaws.assets.get("templescene.png"), 0, 0);
				this.fnt.draw("LET ME TELL YOU=", 100, 88);
				this.fnt.draw("I REMEMBER AS IF", 100, 108);
				this.fnt.draw("IT WAS YESTERDAY", 100, 128);
				this.fnt.draw("<<<", 100, 148);
				if (this.blip)
					jaws.context.drawImage(jaws.assets.get("moreblip.png"), 100, 168);
				break;
		}
	}
}
