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
	
	this.setupShots = function() {
		this.shotAnim = new jaws.Animation({sprite_sheet: "shot.png", frame_size: [16,16], frame_duration: 25});
		this.shots = new jaws.SpriteList();
		this.cooldown = 0;
	}
	
	this.setup = function() {
		this.fon = new BitmapFont.BMFont("font_white_16.png", 16, 16);
		
		this.setupPlayer();
		this.setupHouses();
		this.setupShots();

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
		
		if (this.player.x < 0)
			this.player.x = 0
		else if (this.player.x > jaws.width)
			this.player.x = jaws.width;
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
				var spr = new jaws.Sprite({ image: "fire.png", x: p[1].x, y: p[1].y, anchor: "bottom_center" });
				this.fires.push(spr);
			}
		}
	}
	
	this.update = function() {
	// we are defaulting to 60 fps but we only want to use 20 updates per second
		this.dt += jaws.game_loop.tick_duration;
		while (this.dt >= 50) {
			this.updatePlayer();
			
			this.shots.update();
			this.shots.removeIf(jaws.isOutsideCanvas);
			
			this.collideShotsWithHouses();

			this.dt -= 50;
		}
		if (this.player.moving)
			this.player.setImage(this.playerAnim[this.player.dir].next());
		else
			this.player.setImage(jaws.assets.get("wizard_idle.png"));
	}
	
	this.draw = function() {
		jaws.context.drawImage(jaws.assets.get("bkg00.png"), 0, 0);

		this.houses.draw();
		this.fires.draw();
		
		this.shots.draw();
		
		this.player.draw();
		
		this.fon.draw("HE EVEN KILLED OUR GOAT<<<", 10, 10);
	}
}
