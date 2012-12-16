function ReceiptState() {
	this.setup = function() {
		this.fnt = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.state = 0;
		this.blip = true;
		this.blipTimer = 0;
		this.dt = 0;
		this.receive = true;
		GlobalData.heroRevenge = GlobalData.burnedHouses + GlobalData.killedPeople;
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
			if (jaws.pressed("space") && this.dt > 500) {
				this.dt = 0;
				this.state++;
			}
			break;
			case 2:
				jaws.switchGameState(TransitionState02);
		}
	}
	
	this.draw = function() {
		switch(this.state) {
			case 0: 
				jaws.context.drawImage(jaws.assets.get("templescene.png"), 0, 0);
				if (GlobalData.burnedHouses > 0 && GlobalData.killedPeople > 0) {
					if (GlobalData.burnedHouses == 6 && GlobalData.killedPeople == 4) {
						this.fnt.draw("HE RAZED OUR", 100, 88);
						this.fnt.draw("VILLAGE AND", 100, 108);
						this.fnt.draw("TURNED EVERYONE", 100, 128);
						this.fnt.draw("INTO STONE>", 100, 148);
					}
					else {
						this.fnt.draw("HE BURNED OUR", 100, 88);
						this.fnt.draw("HOUSES AND TURNED", 100, 108);
						this.fnt.draw("OUR PEOPLE INTO", 100, 128);
						this.fnt.draw("STONE>", 100, 148);
					}
				}
				else if (GlobalData.burnedHouses > 0) {
					this.fnt.draw("HE BURNED OUR", 100, 128);
					this.fnt.draw("HOUSES>", 100, 148);
					if (GlobalData.burnedHouses < 3)
						this.receive = false;
				}
				else if (GlobalData.killedPeople > 0) {
					this.fnt.draw("HE TURNED", 100, 108);
					this.fnt.draw("VILLAGERS INTO", 100, 128);
					this.fnt.draw("STONE>", 100, 148);
					if (GlobalData.killedPeople < 2)
						this.receive = false;
				}
				else {
					this.fnt.draw("HE JUST PASSED", 100, 88);
					this.fnt.draw("THROUGH OUR", 100, 108);
					this.fnt.draw("VILLAGE= BUT HE", 100, 128);
					this.fnt.draw("LOOKED EVIL>", 100, 148);
					this.receive = false;
				}
				if (this.blip)
					jaws.context.drawImage(jaws.assets.get("moreblip.png"), 100, 168);
				break;
			case 1:
				jaws.context.drawImage(jaws.assets.get("templescene.png"), 0, 0);
				if (this.receive == true) {
					this.fnt.draw("VERY WELL= I SHALL", 200, 40);
					this.fnt.draw("GIVE YOU THE SWORD", 200, 60);
					this.fnt.draw("OF TRUTH= TO FIGHT", 200, 80);
					this.fnt.draw("THIS EVIL>", 200, 100);
					jaws.context.drawImage(jaws.assets.get("sword.png"), 385, 144);
					GlobalData.sword = true;
				}
				else {
					this.fnt.draw("I AM SORRY= BUT", 200, 40);
					this.fnt.draw("YOUR CLAIMS ARE NOT", 200, 60);
					this.fnt.draw("STRONG ENOUGH<<<", 200, 80);
					this.fnt.draw("FAREWELL<<<", 200, 100);
					GlobalData.sword = false;
				}
				if (this.blip)
					jaws.context.drawImage(jaws.assets.get("moreblip.png"), 200, 120);
				break;
		}
	}
}
