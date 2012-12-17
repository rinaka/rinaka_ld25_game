/*
	This is part of the game "Sword of Truth"
	created by Ricardo Nakamura for the Ludum Dare #25
	
	copyright 2012 Ricardo Nakamura
	Released under the LGPL
*/
function StruggleState() {
	this.setupPlayer = function() {
		this.player = new jaws.Sprite({x:416, y:240, anchor: "center_center"});
		this.player.life = 100;
		this.player.anim = new jaws.Animation({sprite_sheet: "wizard_left.png", frame_size: [32,32], frame_duration: 80, orientation: "right"});
		this.player.idle = jaws.assets.get("wizard_idle_left.png");
		this.player.vx = 4;
		this.player.vy = 4;
		this.player.moving = false;
	}

	this.setupPlayerShots = function() {
		this.shotAnim = new jaws.Animation({sprite_sheet: "shot.png", frame_size: [16,16], frame_duration: 25});
		this.shots = new jaws.SpriteList();
		this.cooldown = 25;
	}
	
	this.setupHeroShots = function() {
		if (GlobalData.sword == true) {
			this.heroShotAnim = new jaws.Animation({sprite_sheet: "shot02.png", frame_size: [16,16], frame_duration: 25});
		}
		else {
			this.heroShotAnim = new jaws.Animation({sprite_sheet: "knife.png", frame_size: [16,16], frame_duration: 25});
		}
		this.heroShots = new jaws.SpriteList();
		this.heroCooldown = 25;
	}
	
	this.updateHero = function() {
		switch(this.hero.state) {
			// target definition and planning
			case 0:
				this.hero.targetX = Utils.randBetween(16, 240);
				this.hero.targetY = Utils.randBetween(128, 368);
				var dx = this.hero.x - this.hero.targetX;
				var dy = this.hero.y - this.hero.targetY;
				var q = Math.sqrt(dx*dx + dy*dy);
				if (q > 0) {
					this.hero.vx = -4*dx/q;
					this.hero.vy = -4*dy/q;
					this.hero.moving = true;
					this.hero.state = 1;
				}
				break;
			// movement
			case 1:
				var dx = this.hero.x - this.hero.targetX;
				var dy = this.hero.y - this.hero.targetY;
				if ((dx*dx + dy*dy) < 16) {
					this.hero.x = Math.floor(this.hero.x);
					this.hero.y = Math.floor(this.hero.y);
					this.hero.moving = false;
					this.hero.state = 0;
				}
				else {
					this.hero.x += this.hero.vx;
					this.hero.y += this.hero.vy;
				}
				break;
		}
		if (this.heroCooldown > 0)
			this.heroCooldown--;		
		else if (Math.random() > 0.7) {
			this.heroCooldown = 25;
			this.createHeroShot();
		}
		if (this.hero.moving == true)
			this.hero.setImage(this.hero.anim.next());
		else
			this.hero.setImage(this.hero.idle);
	}
	
	this.setupHero = function() {
		this.hero = new jaws.Sprite({x: 112, y: 240, anchor: "center_center"});
		this.hero.moving = false;
		this.hero.life = GlobalData.heroRevenge + 2;
		if (GlobalData.sword == true) {
			this.hero.anim = new jaws.Animation({sprite_sheet: "hero02_right.png", frame_size: [32,32], frame_duration: 80});
			this.hero.idle = jaws.assets.get("hero02_idle.png");
			this.sname = "blast";
		}
		else {
			this.hero.anim = new jaws.Animation({sprite_sheet: "hero01_right.png", frame_size: [32,32], frame_duration: 80});
			this.hero.idle = jaws.assets.get("hero01_idle.png");
			this.sname = "knife";
		}
		this.hero.state = 0;
	}
	
	this.setup = function() {
		this.fnt = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		
		this.state = 0;
		this.dt = 0;
		
		this.blip = true;
		this.blipTimer = 0;
		
		this.setupPlayer();
		this.setupPlayerShots();
		
		this.setupHero();
		this.setupHeroShots();
		
		this.moveAlong = false;
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

	function updateShot() {
		this.move(this.vx, this.vy);
		this.setImage(this.anim.next());
	}
	
	this.createShot = function() {
		var spr = new jaws.Sprite({ x: this.player.x, y: this.player.y, anchor: "center_center" });
		spr.anim = this.shotAnim;
		spr.vx = -6; 
		spr.vy = 0;
		spr.update = updateShot;
		this.shots.push(spr);
		AudioHelper.get("evil_blast").play();
	}	
	
	this.createHeroShot = function() {
		var spr = new jaws.Sprite({ x: this.hero.x + 16, y: this.hero.y, anchor: "center_center" });
		spr.anim = this.heroShotAnim;
		spr.vx = 6; 
		spr.vy = 0;
		spr.update = updateShot;
		this.heroShots.push(spr);
		AudioHelper.get(this.sname).play();
	}	
	
	this.updatePlayer = function() {
		// player movement
		this.player.moving = false;
		if (jaws.pressed("up")) {
			this.player.y -= this.player.vy;
			this.player.moving = true;
		}
		else if (jaws.pressed("down")) {
			this.player.y += this.player.vy;
			this.player.moving = true;
		}
		if (jaws.pressed("left")) {
			this.player.x -= this.player.vx;
			this.player.moving = true;
		}
		else if (jaws.pressed("right")) {
			this.player.x += this.player.vx;
			this.player.moving = true;
		}
		
		if (this.player.x < 272)
			this.player.x = 272
		else if (this.player.x > jaws.width-16) {
			this.player.x = jaws.width-16;
		}
		if (this.player.y < 128)
			this.player.y = 128
		else if (this.player.y > jaws.height-16)
			this.player.y = jaws.height-16;
		
		// launching energy bolts
		if (this.cooldown > 0)
			this.cooldown--;		
		else if (jaws.pressed("space")) {
			GlobalData.aggression = true;
			this.cooldown = 15;
			this.createShot();
		}
	}
	
	this.combat = function() {
	// we are defaulting to 60 fps but we only want to use 20 updates per second
		this.dt += jaws.game_loop.tick_duration;
		while (this.dt >= 50) {
			this.updatePlayer();
			
			this.updateHero();
			
			this.shots.update();
			this.shots.removeIf(jaws.isOutsideCanvas);
				
			this.heroShots.update();
			this.heroShots.removeIf(jaws.isOutsideCanvas);
			
			// collide hero with player shots
			var c = jaws.collideOneWithMany(this.hero, this.shots);
			var i;
			for (i = 0; i < c.length; i++) {
				this.shots.remove(c[i]);
				this.hero.life -= 2;
				AudioHelper.get("ouch").play();
			}
			
			// collide player with hero shots
			var c = jaws.collideOneWithMany(this.player, this.heroShots);
			var i;
			for (i = 0; i < c.length; i++) {
				this.heroShots.remove(c[i]);
				if (GlobalData.sword == true)
					this.player.life -= 20;
				else
					this.player.life -= 5;
				AudioHelper.get("ugh").play();
			}
			
			// check for end of game
			if (this.hero.life <= 0 || this.player.life <= 0) {
				if (this.hero.life <= 0)
					GlobalData.heroDefeated = true;
				if (this.player.life <= 0) {
					GlobalData.playerDefeated = true;
					if (this.hero.life <= 2)
						GlobalData.hardWin = true;
				}
				this.moveAlong = true;
			}
			
			this.dt -= 50;
		}
		if (this.player.moving)
			this.player.setImage(this.player.anim.next());
		else {
			this.player.setImage(this.player.idle);
		}
		if (this.moveAlong == true)
			jaws.switchGameState(TransitionState03);
	}
	
	this.update = function() {
		if (this.state < 2)
			this.dialogue();
		else
			this.combat();
	}
	
	this.dialogueView = function() {
		jaws.context.drawImage(jaws.assets.get("arena.png"), 0, 0);
		if (GlobalData.sword)
			jaws.context.drawImage(jaws.assets.get("hero02_idle.png"), 96, 224);
		else
			jaws.context.drawImage(jaws.assets.get("hero01_idle.png"), 96, 224);
		jaws.context.drawImage(jaws.assets.get("wizard_idle_left.png"), 400, 224);
		if (this.state == 0) {
			if (GlobalData.heroRevenge == 0) {
				this.fnt.draw("I KNOW YOU ARE EVIL>", 20, 160);
				this.fnt.draw("AND I WILL DEFEAT YOU>", 20, 180);
			}
			else if (GlobalData.heroRevenge < 7) {
				this.fnt.draw("EVIL WIZARD>", 20, 140);
				this.fnt.draw("I HAVE COME TO", 20, 160);
				this.fnt.draw("FACE YOU>", 20, 180);
			}
			else {
				this.fnt.draw("EVIL WIZARD>", 20, 140);
				this.fnt.draw("I WILL AVENGE", 20, 160);
				this.fnt.draw("MY VILLAGE>", 20, 180);
			}
		}
		else {
			if (GlobalData.sword == true) {
				this.fnt.draw("AND I HAVE THE POWER", 20, 140);
				this.fnt.draw("OF THE SWORD OF TRUTH", 20, 160);
				this.fnt.draw("WITH ME>", 20, 180);
			}
			else {
				this.fnt.draw("I MAY NOT HAVE THE", 20, 140);
				this.fnt.draw("MAGIC SWORD BUT I HAVE", 20, 160);
				this.fnt.draw("MY TRUSTY KNIVES>", 20, 180);
			}
		}
		if (this.blip)
			jaws.context.drawImage(jaws.assets.get("moreblip.png"), 20, 200);
	}
	
	this.combatView = function() {
		jaws.context.drawImage(jaws.assets.get("arena.png"), 0, 0);

		this.heroShots.draw();
		this.shots.draw();
		
		this.hero.draw();
		this.player.draw();
		
		var i;
		for (i = 0; i < this.hero.life; i++) {
			jaws.context.drawImage(jaws.assets.get("heart.png"), 10+16*i, 10);
		}
		
		jaws.context.fillStyle = "#ffffff";
		jaws.context.fillRect(10, 370, 492, 10);
		jaws.context.fillStyle = "#000000";
		jaws.context.fillRect(12, 372, 488, 6);
		jaws.context.fillStyle = "#900000";
		jaws.context.fillRect(12, 372, 4.88*this.player.life, 6);
	}
	
	this.draw = function() {
		if (this.state < 2)
			this.dialogueView();
		else
			this.combatView();
	}
}
