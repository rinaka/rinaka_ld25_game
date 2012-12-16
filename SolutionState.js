function SolutionState() {
	this.setup = function() {
		this.dt = 0;
	}
	
	this.update = function() {
	// we are defaulting to 60 fps but we only want to use 20 updates per second
		this.dt += jaws.game_loop.tick_duration;
		while (this.dt >= 50) {
			this.dt -= 50;
		}
		if (jaws.pressed("space"))
			jaws.switchGameState(TitleState);
	}
	
	this.draw = function() {
		jaws.context.fillStyle = "#ffaaff";
		jaws.context.fillRect(0, 0, jaws.width, jaws.height);
		jaws.context.font = "14px sans-serif";
		jaws.context.fillStyle = "#ff0000";
		jaws.context.textAlign = "center";
		jaws.context.fillText("SOLUTION - PRESS SPACE", jaws.width/2, jaws.height/2);
	}
}
