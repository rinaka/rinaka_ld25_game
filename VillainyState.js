function VillainyState() {

	this.setupPlayer = function() {
		this.playerAnim = [];
		var animR = new jaws.Animation({sprite_sheet: "wizard_right.png", frame_size: [32,32], frame_duration: 80, orientation: "right"});
		var animL = new jaws.Animation({sprite_sheet: "wizard_left.png", frame_size: [32,32], frame_duration: 80, orientation: "right"});
		this.playerAnim.push(animR);
		this.playerAnim.push(animR);
		this.playerAnim.push(animL);
		this.playerAnim.push(animL);
		this.player = new jaws.Sprite({x:16, y:jaws.height/2, anchor: "center_center"});
		this.player.vx = 4;
		this.player.vy = 4;
		this.player.dir = 1;
		this.player.moving = false;
	}

	this.setupHouses = function() {
		this.houses = new jaws.SpriteList();
		this.fires = new jaws.SpriteList();
		
		var spr;
		spr = new jaws.Sprite({image: "house.png", x: 112, y: 72, anchor: "center_center"});
		spr.destroyed = false;
		this.houses.push(spr);
		spr = new jaws.Sprite({image: "house.png", x: 256, y: 80, anchor: "center_center"});
		spr.destroyed = false;
		this.houses.push(spr);
		spr = new jaws.Sprite({image: "house.png", x: 392, y: 72, anchor: "center_center"});
		spr.destroyed = false;
		this.houses.push(spr);
		spr = new jaws.Sprite({image: "house.png", x: 120, y: 312, anchor: "center_center"});
		spr.destroyed = false;
		this.houses.push(spr);
		spr = new jaws.Sprite({image: "house.png", x: 256, y: 304, anchor: "center_center"});
		spr.destroyed = false;
		this.houses.push(spr);
		spr = new jaws.Sprite({image: "house.png", x: 400, y: 312, anchor: "center_center"});
		spr.destroyed = false;
		this.houses.push(spr);
	}
	
	function updateVillager() {
		if (this.dead == false) {
			if (this.scared == false) {
				switch(this.state) {
					// target definition
					case 0:
						this.targetX = Utils.randBetween(80, 430);
						this.targetY = Utils.randBetween(144, 240);
						this.state = 1;
					// motion planning
					case 1:
						var dx = Math.abs(this.x - this.targetX);
						var dy = Math.abs(this.y - this.targetY);
						if (dx > 0 && dy > 0) {
							if (Math.random() > 0.5)
								this.state = 2;
							else
								this.state = 3;
						}
						else if (dx > 0) {
							this.state = 2;
						}
						else if (dy > 0) {
							this.state = 3;
						}
						else {
							this.state = 0;
						}
						break;
					// horizontal movement
					case 2:
						if (this.x < this.targetX) {
							this.x += 2;
							if (this.x >= this.targetX) {
								this.x = this.targetX;
								this.state = 1;
							}
						}
						else {
							this.x -= 2;
							if (this.x <= this.targetX) {
								this.x = this.targetX;
								this.state = 1;
							}
						}
						break;
					// vertical movement
					case 3:
						if (this.y < this.targetY) {
							this.y += 2;
							if (this.y >= this.targetY) {
								this.y = this.targetY;
								this.state = 1;
							}
						}
						else {
							this.y -= 2;
							if (this.y <= this.targetY) {
								this.y = this.targetY;
								this.state = 1;
							}
						}
						break;
				}
			}
			else {
				switch(this.state) {
					// target definition and planning
					case 0:
						this.targetX = Utils.randBetween(80, 430);
						this.targetY = Utils.randBetween(144, 240);
						var dx = this.x - this.targetX;
						var dy = this.y - this.targetY;
						var q = Math.sqrt(dx*dx + dy*dy);
						if (q > 0) {
							this.vx = -4*dx/q;
							this.vy = -4*dy/q;
							this.state = 1;
						}
						break;
					// movement
					case 1:
						var dx = this.x - this.targetX;
						var dy = this.y - this.targetY;
						if ((dx*dx + dy*dy) < 16) {
							this.x = Math.floor(this.x);
							this.y = Math.floor(this.y);
							this.state = 0;
						}
						else {
							this.x += this.vx;
							this.y += this.vy;
						}
						break;
				}

			}
		}
		if (this.dead == false)
			this.setImage(this.anim.next());
	}
	
	this.setupVillagers = function() {
		var i;
		this.villagers = new jaws.SpriteList();
		this.stoneForm = new jaws.SpriteSheet({image: "stone.png", frame_size: [32,32], orientation: "right"});
		for (i = 1; i < 5; i++) {
			var v = new jaws.Sprite({x: Utils.randBetween(80, 430), y: Utils.randBetween(144, 240), anchor: "center_center"});
			v.walk = new jaws.Animation({sprite_sheet: "villager0" + String(i) + ".png", frame_size: [32,32], frame_duration: 80});
			v.panic = new jaws.Animation({sprite_sheet: "panic0" + String(i) + ".png", frame_size: [32,32], frame_duration: 80});
			v.stone = this.stoneForm.frames[i-1];
			v.anim = v.walk;
			v.scared = false;
			v.dead = false;
			v.state = 0;
			v.update = updateVillager;
			this.villagers.push(v);
		}
	}
	
	this.setupShots = function() {
		this.shotAnim = new jaws.Animation({sprite_sheet: "shot.png", frame_size: [16,16], frame_duration: 25});
		this.shots = new jaws.SpriteList();
		this.cooldown = 25;
	}
	
	this.setup = function() {
		this.fon = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		
		this.setupPlayer();
		this.setupHouses();
		this.setupVillagers();
		this.setupShots();

		this.panic = false;
		this.moveAlong = false;
		this.dt = 0;
	}

	function updateShot() {
		this.move(this.vx, this.vy);
		this.setImage(this.anim.next());
	}
	
	this.createShot = function() {
		var spr = new jaws.Sprite({ x: this.player.x, y: this.player.y, anchor: "center_center" });
		spr.anim = this.shotAnim;
		switch(this.player.dir) {
			case 0: spr.vx = 0; spr.vy = -6; break;
			case 1: spr.vx = 6; spr.vy = 0; break;
			case 2: spr.vx = 0; spr.vy = 6; break;
			case 3: spr.vx = -6; spr.vy = 0; break;
		}
		spr.update = updateShot;
		this.shots.push(spr);
	}

	this.updatePlayer = function() {
		// player movement
		var ox, oy;
		ox = this.player.x;
		oy = this.player.y;
		this.player.moving = false;
		if (jaws.pressed("up")) {
			this.player.y -= this.player.vy;
			this.player.dir = 0;
			this.player.moving = true;
		}
		else if (jaws.pressed("down")) {
			this.player.y += this.player.vy;
			this.player.dir = 2;
			this.player.moving = true;
		}
		if (jaws.pressed("left")) {
			this.player.x -= this.player.vx;
			this.player.dir = 3;
			this.player.moving = true;
		}
		else if (jaws.pressed("right")) {
			this.player.x += this.player.vx;
			this.player.dir = 1;
			this.player.moving = true;
		}
		
		if (this.player.x < 16)
			this.player.x = 16
		else if (this.player.x > jaws.width-24) {
			this.player.x = jaws.width-24;
			this.moveAlong = true;
		}
		if (this.player.y < 0)
			this.player.y = 0
		else if (this.player.y > jaws.height)
			this.player.y = jaws.height;

		// collision with houses
		var c = jaws.collideOneWithMany(this.player, this.houses);
		if (c.length > 0) {
			this.player.x = ox;
			this.player.y = oy;
		}
		
		// launching energy bolts
		if (this.cooldown > 0)
			this.cooldown--;		
		else if (jaws.pressed("space")) {
			this.cooldown = 15;
			this.createShot();
		}
	}

	this.collideShotsWithHouses = function() {
		var c = jaws.collideManyWithMany(this.shots, this.houses);
		var i;
		for (i = 0; i < c.length; i++) {
			var p = c[i];
			this.shots.remove(p[0]);
			if (p[1].destroyed == false) {
				p[1].destroyed = true;
				GlobalData.burnedHouses += 1;
				var spr = new jaws.Sprite({ image: "fire.png", x: p[1].x, y: p[1].y, anchor: "bottom_center" });
				this.fires.push(spr);
				if (this.panic == false) {
					this.panic = true;
					this.villagers.forEach(function(e, i, a) { e.scared = true; e.anim = e.panic; e.state = 0;});
				}
			}
		}
	}
	
	this.collideShotsWithVillagers = function() {
		var c = jaws.collideManyWithMany(this.shots, this.villagers);
		var i;
		for (i = 0; i < c.length; i++) {
			var p = c[i];
			this.shots.remove(p[0]);
			if (p[1].dead == false) {
				p[1].dead = true;
				p[1].setImage(p[1].stone);
				GlobalData.killedPeople += 1;
				if (this.panic == false) {
					this.panic = true;
					this.villagers.forEach(function(e, i, a) { e.scared = true; e.anim = e.panic; e.state = 0;});
				}
			}
		}
	}
	
	this.update = function() {
	// we are defaulting to 60 fps but we only want to use 20 updates per second
		this.dt += jaws.game_loop.tick_duration;
		while (this.dt >= 50) {
			this.updatePlayer();
			
			this.villagers.update();
			
			this.shots.update();
			this.shots.removeIf(jaws.isOutsideCanvas);
			
			this.collideShotsWithHouses();
			this.collideShotsWithVillagers();
			
			this.dt -= 50;
		}
		if (this.player.moving)
			this.player.setImage(this.playerAnim[this.player.dir].next());
		else
			this.player.setImage(jaws.assets.get("wizard_idle.png"));
			
		if (this.moveAlong == true)
			jaws.switchGameState(ReceiptState);
	}
	
	this.draw = function() {
		jaws.context.drawImage(jaws.assets.get("bkg00.png"), 0, 0);

		this.houses.draw();
		this.fires.draw();
		
		this.villagers.draw();
		
		this.shots.draw();
		
		this.player.draw();
	}
}
