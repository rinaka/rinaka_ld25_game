function StruggleState() {
	this.setup = function() {
		this.fnt = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.state = 0;
		this.dt = 0;
		
		this.blip = true;
		this.blipTimer = 0;
	}
	
	this.dialogue = function() {
		this.dt += jaws.game_loop.tick_duration;
		this.blipTimer += jaws.game_loop.tick_duration;
		if (this.blipTimer >= 200) {
			this.blipTimer -= 200;
			this.blip = !this.blip;
		}
		if (jaws.pressed("space") && this.dt > 500) {
			this.dt = 0;
			this.state++;
		}
	}
	
	this.combat = function() {
	// we are defaulting to 60 fps but we only want to use 20 updates per second
		this.dt += jaws.game_loop.tick_duration;
		while (this.dt >= 50) {

				
			this.dt -= 50;
		}

	}
	
	this.update = function() {
		if (this.state < 2)
			this.dialogue();
		else
			this.combat();
	}
	
	this.dialogueView = function() {
		jaws.context.drawImage(jaws.assets.get("mountain.png"), 0, 0);
		if (this.state == 0) {
			this.fnt.draw("SOMEWHERE IN THE CRYSTAL", 10, 20);
			this.fnt.draw("MOUNTAINS<<<", 10, 40);
		}
		else {
			this.fnt.draw("SOMEWHERE IN THE CRYSTAL", 10, 20);
			this.fnt.draw("MOUNTAINS<<<", 10, 40);
		}
		if (this.blip)
			jaws.context.drawImage(jaws.assets.get("moreblip.png"), 10, 60);
	}
	
	this.combatView = function() {
	}
	
	this.draw = function() {
		if (this.state < 2)
			this.dialogueView();
		else
			this.combatView();
	}
}
