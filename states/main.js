var main = function(game){
	console.log("Main");
};


main.prototype = {


	//MOSQUITO VARIABLES HERE BEGIN
	mosquito_x_max_speed: 5,
	mosquito_x_min_speed: -5,

	mosquito_x_speed: 0,

	mosquito_y_max_speed: 5,
	mosquito_y_min_speed: -5,

	mosquito_y_speed: 0,
	mosquito: null,
	//MOSQUITO VARIABLES HERE END

	people: null,

	bucket: null,

	score_text: null,
	score: 0,

	time_spawner: 1000,

	repelentes: null,

  preload: function() {
    console.log("preload main");

  },

  create: function() {

		game.add.sprite(-150,0,'background');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.mosquito = game.add.sprite(100, 400, 'mosquito');
		this.mosquito.anchor.set(0.5);
		game.physics.enable(this.mosquito, Phaser.Physics.ARCADE);
		this.mosquito.body.collideWorldBounds = true;

		this.mosquito.body.bounce.setTo(1, 1);

		this.people = game.add.sprite(650,340, 'people');
		game.physics.enable(this.people, Phaser.Physics.ARCADE);
		this.people.body.collideWorldBounds = true;
		this.people.body.immovable = true;

		this.bucket = game.add.sprite(0,450, 'bucket');
		game.physics.enable(this.bucket, Phaser.Physics.ARCADE);

		this.score_text = game.add.text(20,20, 'Score: ' + this.score);

		game.time.events.loop(1000, this._spawnObjects, this);


		this.repelentes = game.add.group();
		this.repelentes.enableBody = true;
		this.repelentes.physicsBodyType = Phaser.Physics.ARCADE;

		//this.repelentes.events.onOutOfBounds.add(this._repelentesOut, this);
  },

  update: function() {

		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

			if(this.mosquito_x_speed > this.mosquito_x_min_speed) {
				this.mosquito_x_speed -= 0.2;
			}


		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

			if(this.mosquito_x_speed < this.mosquito_x_max_speed) {
				this.mosquito_x_speed += 0.2;
			}


		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

			if(this.mosquito_y_speed < this.mosquito_y_max_speed) {
				this.mosquito_y_speed += 0.2;
			}

		} else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

			if(this.mosquito_y_speed > this.mosquito_y_min_speed) {
				this.mosquito_y_speed -= 0.2;
			}

		}

		this.mosquito.y += this.mosquito_y_speed;
		this.mosquito.x += this.mosquito_x_speed;

		game.physics.arcade.overlap(this.mosquito, this.people, this._collisionPeople, null, this);
		game.physics.arcade.overlap(this.mosquito, this.bucket, this._collisionBucket, null, this);


		/*var i = 0;
		this.repelentes.forEach(function(repelente){

			if(i % 2 == 0) {
				repelente.x = -20;
			}
			console.log(i);
			console.log("arriba");
			console.log("abajo");
			i++;
   	});*/

		this.repelentes.forEach(function(repelente,index){
			repelente.x -= 10;

		});



  },

	_repelentesOut: function(repelente) {
		console.log("repelente out");
		repelente.kill();
	},

	_collisionPeople: function(mosquito, people) {
		console.log("collision con people");
		mosquito.x -= 10;

		this.mosquito_x_speed = 0;
		this.mosquito_y_speed = 0;
	},

	_collisionBucket: function(mosquito, bucket) {
		console.log("collision con bucket");

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			console.log("esta dejando las larvas");
			this.score += 10;
			this.score_text.setText('Score: ' + this.score);
		}

	},

	_spawnObjects: function() {
		console.log("spawn objects");

		console.log(this.repelentes.length);

		for(var i = 0; i < 3; i++) {
			var repelente = this.repelentes.create(760, 560, 'mosquito');
			repelente.checkWorldBounds = true;
			repelente.events.onOutOfBounds.add(this._repelentesOut, this);
		}

		/*var repelente1 = this.repelentes.create(760, 560, 'mosquito');
		var repelente2 = this.repelentes.create(760, 560, 'mosquito');
		var repelente3 = this.repelentes.create(760, 560, 'mosquito');*/
	}


}
