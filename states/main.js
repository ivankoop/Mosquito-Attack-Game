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

	time_spawner_repelente: 2000,

	repelente1: null,
	repelente2: null,
	repelente3: null,

	time_spawner_espiral1: 2000,
	animate_espiral1: false,
	time_spawner_espiral2: 2000,
	animate_espiral2: true,

	espiral1: null,
	espiral2: null,
	espiral3: null,

	mosquito_noise: null,
	background_sound: null,
	music1: null,

	lamp: null,

	spawn_lamp: false,

  preload: function() {
    console.log("preload main");

  },

  create: function() {

		game.add.sprite(0,0,'background');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.mosquito = game.add.sprite(100, 400, 'mosquito');
		this.mosquito.anchor.set(0.5);
		this.mosquito.scale.setTo(0.8,0.8);
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

		game.time.events.loop(this.time_spawner_repelente, this._spawnRepelentes, this);

		this.repelente1 = game.add.group();
		this.repelente1.enableBody = true;
		this.repelente1.physicsBodyType = Phaser.Physics.ARCADE;

		this.repelente2 = game.add.group();
		this.repelente2.enableBody = true;
		this.repelente2.physicsBodyType = Phaser.Physics.ARCADE;

		this.repelente3 = game.add.group();
		this.repelente3.enableBody = true;
		this.repelente3.physicsBodyType = Phaser.Physics.ARCADE;

		this.espiral1 = game.add.sprite(280,680, 'espiral');
		this.espiral2 = game.add.sprite(480,280, 'espiral');

		game.time.events.loop(this.time_spawner_espiral1, this._spawnEspiral1, this);
		game.time.events.loop(this.time_spawner_espiral2, this._spawnEspiral2, this);

		this.mosquito_noise = game.add.audio('mosquito_noise');
		this.mosquito_noise.loopFull();
		//this.background_sound = game.add.audio('background_sound');
		//this.background_sound.volume = 0.2;
		//this.background_sound.loopFull();

		this.music1 = game.add.audio('music1');
		this.music1.loopFull();
		this.music1.volume = 0.3;




		//game.physics.arcade.accelerateToObject(this.mosquito, this.lamp, 50);

  },

  update: function() {

		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

			this.mosquito.scale.x = -0.8;
			if(this.mosquito_x_speed > this.mosquito_x_min_speed) {
				this.mosquito_x_speed -= 0.2;
			}


		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

			if(this.mosquito_x_speed < this.mosquito_x_max_speed) {
				this.mosquito_x_speed += 0.2;
			}

			this.mosquito.scale.x = 0.8;
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


		game.physics.arcade.overlap(this.mosquito, this.repelente1, this._collisionRepelente, null, this);
		game.physics.arcade.overlap(this.mosquito, this.repelente2, this._collisionRepelente, null, this);
		game.physics.arcade.overlap(this.mosquito, this.repelente3, this._collisionRepelente, null, this);


		this.repelente1.forEach(function(repelente1){
			repelente1.x -= 5;
			repelente1.y -= 4;
		});

		this.repelente2.forEach(function(repelente2){
			repelente2.x -= 5;
			repelente2.y -= 1;
		});

		this.repelente3.forEach(function(repelente3){
			repelente3.x -= 2;
			repelente3.y -= 5;
		});

		if(this.animate_espiral1) {
			this.espiral1.y += 4;
		} else {
			this.espiral1.y -= 4;
		}

		if(this.animate_espiral2) {
			this.espiral2.y += 4;
		} else {
			this.espiral2.y -= 4;
		}


  },


	_spawnLamp: function() {
		console.log("spawn_lamp");
		this.lamp = game.add.sprite(350,-60,'lamp');
		game.physics.arcade.moveToObject(this.mosquito, this.lamp, 200);
	},

	//test_count: 0,
	_spawnEspiral1: function() {
		console.log("spawn espiral!!");

		if(this.animate_espiral1) {
			this.animate_espiral1 = false;
		} else {
			this.animate_espiral1 = true;
		}

		/*this.test_count++;

		if(this.test_count == 3) {
			this._spawnLamp();
		}

		if(this.test_count == 6) {
			this.lamp.kill();
		}*/

	},

	first_spawn_espiral2: true,
	_spawnEspiral2: function() {
		console.log("spawn espiral22!!");

		if(this.animate_espiral2) {
			this.animate_espiral2 = false;
		} else {
			this.animate_espiral2 = true;
		}

	},

	_collisionRepelente: function(mosquito,repelente) {
		console.log("collision repelente");
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

	_repelente1Out: function(repelente1) {
		repelente1.kill();
	},

	_repelente2Out: function(repelente2) {
		repelente2.kill();
	},

	_repelente3Out: function(repelente3) {
		repelente3.kill();
	},


	_spawnRepelentes: function() {
		//console.log("spawn objects");

		var repelente1_item = this.repelente1.create(760, 560, 'repelente'); //TODO: cambiar estos sprites
		repelente1_item.scale.setTo(0.2,0.2);
		repelente1_item.checkWorldBounds = true;
		repelente1_item.events.onOutOfBounds.add(this._repelente1Out, this);

		var repelente2_item = this.repelente2.create(760,560,'repelente'); //TODO: cambiar estos sprites
		repelente2_item.scale.setTo(0.2,0.2);
		repelente2_item.checkWorldBounds = true;
		repelente2_item.events.onOutOfBounds.add(this._repelente2Out, this);

		var repelente3_item = this.repelente3.create(760,560,'repelente'); //TODO: cambiar estos sprites
		repelente3_item.scale.setTo(0.2,0.2);
		repelente3_item.checkWorldBounds = true;
		repelente3_item.events.onOutOfBounds.add(this._repelente3Out, this);
	}


}
