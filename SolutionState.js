/*
	This is part of the game "Sword of Truth"
	created by Ricardo Nakamura for the Ludum Dare #25
	
	copyright 2012 Ricardo Nakamura
	Released under the LGPL
*/
function SolutionState() {
	this.setup = function() {
		this.fnt = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		this.dt = 0;
		this.blip = true;
		this.blipTimer = 0;
	}
	
	this.update = function() {
		this.dt += jaws.game_loop.tick_duration;
		this.blipTimer += jaws.game_loop.tick_duration;
		if (this.blipTimer >= 200) {
			this.blipTimer -= 200;
			this.blip = !this.blip;
		}		
		if (jaws.pressed("space") && this.dt >= 1000)
			jaws.switchGameState(EndState);
	}
	
	this.draw = function() {
		jaws.context.drawImage(jaws.assets.get("arena.png"), 0, 0);
		// Finale branching
		// with the sword of truth
		if (GlobalData.sword == true) {
			// finale 1: evil wins and gains the sword
			if (GlobalData.heroDefeated == true) {
				jaws.context.drawImage(jaws.assets.get("wizard_idle_left.png"), 256, 224);
				this.fnt.draw("FOOL> YOU DELIVERED", 88, 100);
				this.fnt.draw("THE SWORD OF TRUTH TO", 88, 120);
				this.fnt.draw("ME>> NOW I WILL TURN", 88, 140);
				this.fnt.draw("IT INTO THE SWORD OF", 88, 160);
				this.fnt.draw("LIES>>", 88, 180);
				this.fnt.draw("1", 496, 368);
			}
			// hero wins
			else {
				jaws.context.drawImage(jaws.assets.get("hero02_idle.png"), 256, 224);
				// finale 2: difficult hero victory - best "good" finale
				if (GlobalData.hardWin == true) {
					this.fnt.draw("IT IS DONE< THIS WILL", 88, 100);
					this.fnt.draw("NOT RESTORE MY VILLAGE", 88, 120);
					this.fnt.draw("BUT AT LEAST THIS EVIL", 88, 140);
					this.fnt.draw("WIZARD SHALL NOT CAUSE", 88, 160);
					this.fnt.draw("ANY MORE SUFFERING<", 88, 180);
					this.fnt.draw("2", 496, 368);
				}
				// easy hero victories
				else {
					// finale 3: easy hero victory - hubris
					if (GlobalData.aggression == true) {
						this.fnt.draw("THIS BATTLE WAS EASY>", 88, 100);
						this.fnt.draw("WITH THIS SWORD I CAN", 88, 120);
						this.fnt.draw("RID THE WORLD OF ALL", 88, 140);
						this.fnt.draw("EVIL> AND PERHAPS", 88, 160);
						this.fnt.draw("RULE IT= TOO<<<", 88, 180);
						this.fnt.draw("3", 496, 368);
					}
					// finale 4: easy hero victory - corruption
					else {
						this.fnt.draw("HE DID NOT FIGHT BACK?", 88, 80);
						this.fnt.draw("HA= STUPID OLD FOOL>>", 88, 100);
						this.fnt.draw("THIS SWORD HAS SO", 88, 120);
						this.fnt.draw("MUCH POWER> I COULD", 88, 140);
						this.fnt.draw("CONQUER THE WORLD WITH", 88, 160);
						this.fnt.draw("IT> MAYBE I SHOULD<<<", 88, 180);
						this.fnt.draw("4", 496, 368);
					}
				}
			}
		}
		// without sword of truth
		else {
			// finale 5: evil wins with no other gain
			if (GlobalData.heroDefeated == true) {
				jaws.context.drawImage(jaws.assets.get("wizard_idle_left.png"), 256, 224);
				this.fnt.draw("FOOLISH BOY= I HAVE", 88, 100);
				this.fnt.draw("SEEN THINGS YOU WOULD", 88, 120);
				this.fnt.draw("NOT BELIEVE<<< DID YOU", 88, 140);
				this.fnt.draw("REALLY THINK THAT YOU", 88, 160);
				this.fnt.draw("COULD DEFEAT ME?", 88, 180);
				this.fnt.draw("5", 496, 368);
			}
			// hero wins
			else {
				jaws.context.drawImage(jaws.assets.get("hero01_idle.png"), 256, 224);
				// finale 6: hero victory - self-reliance
				if (GlobalData.aggression == true) {
					this.fnt.draw("THE FAERIE QUEEN DID", 88, 100);
					this.fnt.draw("NOT TRUST ME BUT I", 88, 120);
					this.fnt.draw("HAVE WON< THE WIZARD", 88, 140);
					this.fnt.draw("IS GONE= BY MY WILL=", 88, 160);
					this.fnt.draw("NOT MAGIC>", 88, 180);
					this.fnt.draw("6", 496, 368);
				}
				else {
					// finale 7: hero victory - renegade
					if (GlobalData.heroRevenge > 0) {
						this.fnt.draw("THE STUPID FAERIE", 88, 80);
						this.fnt.draw("QUEEN CAN KEEP HER", 88, 100);
						this.fnt.draw("SWORD> I DEFEATED THE", 88, 120);
						this.fnt.draw("WIZARD ON MY OWN<<<", 88, 140);
						this.fnt.draw("I SHOULD TEACH HER", 88, 160);
						this.fnt.draw("A LESSON<<<", 88, 180);
						this.fnt.draw("7", 496, 368);
					}
					// finale 8: hero victory - self-doubt
					else {
						this.fnt.draw("HE DID NOT FIGHT BACK?", 88, 80);
						this.fnt.draw("AND HE DID NOT HARM MY", 88, 100);
						this.fnt.draw("VILLAGE<<< BUT HE WAS", 88, 120);
						this.fnt.draw("EVIL> OR WAS HE?", 88, 140);
						this.fnt.draw("MAYBE THIS WAS A BIG", 88, 160);
						this.fnt.draw("MISTAKE<<<", 88, 180);
						this.fnt.draw("8", 496, 368);
					}
				}
			}
		}
		if (this.blip)
			jaws.context.drawImage(jaws.assets.get("moreblip.png"), 88, 200);
	}
}
