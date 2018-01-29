
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

	time_spawner_repelente: 4000,

	repelente1: null,
	repelente2: null,
	repelente3: null,
	repelente4: null,

	time_spawner_espiral1: 3000,
	animate_espiral1: false,
	time_spawner_espiral2: 3500,
	animate_espiral2: true,

	espiral1: null,
	espiral2: null,
	espiral3: null,

	mosquito_noise: null,
	background_sound: null,
	music1: null,

	short_spray_sound: null,
	poof_smoke_sound: null,
	lamp: null,
	spawn_lamp: false,
	drink_sound: null,
	drop_sound: null,
	full_sound: null,
	death_sound: null,

	mosquito_live_one: null,
	mosquito_live_two: null,
	mosquito_live_three: null,
	mosquito_live_four: null,

	mosquito_lives: 4,

	nube: null,

	espiral_time_event: null,
	repelente_time_event: null,

	ciudad: null,

	espiral_bottom: null,

  preload: function() {
    console.log("preload main");

  },

  create: function() {

		game.add.sprite(0,0,'background1');

		this.nube = game.add.tileSprite(0,90,800,80,'nube');

		this.ciudad = game.add.tileSprite(0,90,800,180,'ciudad');

		game.add.sprite(0,0,'background2');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.espiral_bottom1 = game.add.sprite(340,550, 'espiral_bottom');
		this.espiral_bottom1.enableBody = true;
		this.espiral_bottom1.physicsBodyType = Phaser.Physics.ARCADE;
		this.espiral_bottom1.checkWorldBounds = true;

		this.mosquito_live_one = game.add.sprite(730,10,'mosquito_sp','mosquito/gordo/Comp 1_00000.png');
		this.mosquito_live_one.scale.setTo(0.4,0.4);

		this.mosquito_live_two = game.add.sprite(680,10,'mosquito_sp','mosquito/gordo/Comp 1_00000.png');
		this.mosquito_live_two.scale.setTo(0.4,0.4);

		this.mosquito_live_three = game.add.sprite(630,10,'mosquito_sp','mosquito/gordo/Comp 1_00000.png');
		this.mosquito_live_three.scale.setTo(0.4,0.4);

		this.mosquito_live_four = game.add.sprite(580,10,'mosquito_sp','mosquito/gordo/Comp 1_00000.png');
		this.mosquito_live_four.scale.setTo(0.4,0.4);


		this.people = game.add.sprite(650,320, 'people');
		game.physics.enable(this.people, Phaser.Physics.ARCADE);

		this.bucket = game.add.sprite(20,450, 'bucket');
		game.physics.enable(this.bucket, Phaser.Physics.ARCADE);

		this.mosquito = game.add.sprite(100,400, 'mosquito_sp', 'mosquito/gordo/Comp 1_00000.png');

		this.mosquito.animations.add('flaco_animate', Phaser.Animation.generateFrameNames('mosquito/flaco/Comp 2_0', 1, 124, '.png', 4), 45, true, false);
		//this.mosquito.animations.play('flaco_animate');
		this.mosquito.animations.add('gordo_animate', Phaser.Animation.generateFrameNames('mosquito/gordo/Comp 1_0', 1, 124, '.png', 4), 45, true, false);
		this.mosquito.animations.add('muerte_animate', Phaser.Animation.generateFrameNames('mosquito/hit/Comp 3_0', 1, 124, '.png', 4), 45, true, false);
		this.mosquito.animations.play('gordo_animate');
		this.mosquito.anchor.set(0.5);
		this.mosquito.scale.setTo(0.5,0.5);


		game.physics.enable(this.mosquito, Phaser.Physics.ARCADE);
		this.mosquito.body.collideWorldBounds = true;

		this.mosquito.body.bounce.setTo(1, 1);

		this.repelente_time_event= game.time.events.loop(this.time_spawner_repelente, this._spawnRepelentes, this);


		this.repelente1 = game.add.group();
		this.repelente1.enableBody = true;
		this.repelente1.physicsBodyType = Phaser.Physics.ARCADE;

		this.repelente2 = game.add.group();
		this.repelente2.enableBody = true;
		this.repelente2.physicsBodyType = Phaser.Physics.ARCADE;

		this.repelente3 = game.add.group();
		this.repelente3.enableBody = true;
		this.repelente3.physicsBodyType = Phaser.Physics.ARCADE;

		this.repelente4 = game.add.group();
		this.repelente4.enableBody = true;
		this.repelente4.physicsBodyType = Phaser.Physics.ARCADE;


		this.espiral1 = game.add.group();
		this.espiral1.enableBody = true;
		this.espiral1.physicsBodyType = Phaser.Physics.ARCADE;

		this.espiral_time_event = game.time.events.loop(this.time_spawner_espiral1, this._spawnEspiral1, this);


		this.mosquito_noise = game.add.audio('mosquito_noise');
		this.mosquito_noise.loopFull();

		this.music1 = game.add.audio('music1');
		this.music1.loopFull();
		this.music1.volume = 0.3;

		this.short_spray_sound = game.add.audio('short_spray');
		this.drink_sound = game.add.audio('drink_sound');
		this.drop_sound = game.add.audio('drop_sound');
		this.full_sound = game.add.audio('full_sound');
		this.death_sound = game.add.audio('death_sound');


  },

	mosquito_dead: false,

  update: function() {

		this.nube.tilePosition.x += 0.8;

		if(!this.mosquito_dead) {

			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

				this.mosquito.scale.x = -0.5;
				if(this.mosquito_x_speed > this.mosquito_x_min_speed) {
					this.mosquito_x_speed -= 0.2;
				}


			} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

				if(this.mosquito_x_speed < this.mosquito_x_max_speed) {
					this.mosquito_x_speed += 0.2;
				}

				this.mosquito.scale.x = 0.5;
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

		}

		this.mosquito.y += this.mosquito_y_speed;
		this.mosquito.x += this.mosquito_x_speed;

		game.physics.arcade.overlap(this.mosquito, this.people, this._collisionPeople, null, this);
		game.physics.arcade.overlap(this.mosquito, this.bucket, this._collisionBucket, null, this);

		game.physics.arcade.overlap(this.mosquito, this.repelente1, this._collisionRepelente, null, this);
		game.physics.arcade.overlap(this.mosquito, this.repelente2, this._collisionRepelente, null, this);
		game.physics.arcade.overlap(this.mosquito, this.repelente3, this._collisionRepelente, null, this);
		game.physics.arcade.overlap(this.mosquito, this.repelente4, this._collisionRepelente, null, this);

		game.physics.arcade.overlap(this.mosquito, this.espiral1, this._collisionRepelente, null, this);
		game.physics.arcade.overlap(this.mosquito, this.espiral_bottom1, this._collisionRepelente, null, this);

		this.espiral1.forEach(function(espiral1){
			espiral1.y -= 5;
		});


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

		this.repelente4.forEach(function(repelente3){
			repelente3.x -= 5;
			repelente3.y += 2;
		});


		if(this.mosquito_dead) {
			this.mosquito_y_speed += 0.2;
			this.mosquito.animations.play('muerte_animate');

			setTimeout(function(){
				game.sound.stopAll();
				game.state.start("finish");
			},1500);

			return;

		}

  },


	_spawnLamp: function() {
		console.log("spawn_lamp");
		this.lamp = game.add.sprite(350,-60,'lamp');
		game.physics.arcade.moveToObject(this.mosquito, this.lamp, 200);
	},

	_spawnEspiral1: function() {
		console.log("spawn espiral!!");
		var espiral1_item = this.espiral1.create(352,270, 'espiral');
		espiral1_item.checkWorldBounds = true;
		espiral1_item.events.onOutOfBounds.add(this._espiral1Out, this);

	},

	_espiral1Out: function(espiral1) {
		console.log("espiral 1 out");
		espiral1.kill();
	},

	_espiral2Out: function(espiral2) {
		console.log("espiral 2 out!");
		espiral2.kill();
	},

	_mosquitoHit: function() {

	},

	mosquito_inmune: false,

	_collisionRepelente: function(mosquito,repelente) {
		console.log("mosquito inmune " + this.mosquito_inmune);

		var me = this;

		if(!this.mosquito_inmune) {
			this.mosquito_inmune = true;
			this.death_sound.play();
			this.mosquito.animations.play('muerte_animate');

			me.mosquito_lives--;

			if(me.mosquito_lives == 3) {
				me.mosquito_live_four.kill();
			}

			if(me.mosquito_lives == 2) {
				me.mosquito_live_three.kill();
			}

			if(me.mosquito_lives == 1) {
				me.mosquito_live_two.kill();
			}

			if(me.mosquito_lives == 0) {
				me.mosquito_live_one.kill();
				console.log("PERDISTE!");
				me.mosquito_dead = true;
			}

			setTimeout(function() {

				me.mosquito_inmune = false;
				if(me.larva_collected) {
					me.mosquito.animations.play('flaco_animate');
				} else {
					me.mosquito.animations.play('gordo_animate');
				}
			},2000);

		}

	},


	picar_flag: true,
	_collisionPeople: function(mosquito, people) {

		var me = this;

		game.input.keyboard.onUpCallback = function (e) {
			if(e.keyCode == 32) {
				me.picar_flag = true;
			}
		};

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			if(this.picar_flag) {
				this.picar_flag = false;
				this._picarHumano();
			}
		}

	},

	max_picada: 10,

	picada_count: 0,
	larva_collected: false,
	_picarHumano: function() {
		console.log("picar humano!!!");

		if(!this.larva_collected) {
			this.picada_count++;
			this.drink_sound.play();
			if(this.picada_count == this.max_picada) {
				this._collectLarva();
			}

		}


	},

	_collectLarva: function() {
		this.picada_count = 0;
		this.larva_collected = true;
		this.mosquito.animations.play('flaco_animate');
		this.full_sound.play();
		console.log("ya tengo la larvita! wooohoo");
	},

	_collisionBucket: function(mosquito, bucket) {
		console.log("collision con bucket");


		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			console.log("esta dejando las larvas");
			if(this.larva_collected) {
				this._leaveLarva();
				this.score += 10;
				this.drop_sound.play();
			}
		}

	},

	last_x_position_larva: 10,
	last_y_position_larva: 10,
	_leaveLarva: function() {
		console.log("deja la larvita");
		this.mosquito.animations.play('gordo_animate');
		this.larva_collected = false;

		this.espiral_time_event.delay -= 200;
		this.repelente_time_event.delay -= 200;

		var larvita = game.add.sprite(this.last_x_position_larva,this.last_y_position_larva,'larva');

		this.last_x_position_larva += 30;

		if(this.last_x_position_larva == 310) { //super chota la logica, pero ni cagando le dejo ganar mas adelante hehe
			this.last_x_position_larva = 10;
			this.last_y_position_larva = 40;
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

	_repelente4Out: function(repelente4) {
		repelente4.kill();
	},


	_spawnRepelentes: function() {

		this.people.loadTexture('people_angry');
		this.people.x = 608;

		var me = this;

		this.short_spray_sound.play();
		var repelente1_item = this.repelente1.create(600, 360, 'repelente');
		repelente1_item.checkWorldBounds = true;
		repelente1_item.events.onOutOfBounds.add(this._repelente1Out, this);

		var repelente2_item = this.repelente2.create(600,360,'repelente');
		repelente2_item.checkWorldBounds = true;
		repelente2_item.events.onOutOfBounds.add(this._repelente2Out, this);

		var repelente3_item = this.repelente3.create(600,360,'repelente');
		repelente3_item.checkWorldBounds = true;
		repelente3_item.events.onOutOfBounds.add(this._repelente3Out, this);

		var repelente4_item = this.repelente4.create(600,360,'repelente');
		repelente4_item.checkWorldBounds = true;
		repelente4_item.events.onOutOfBounds.add(this._repelente4Out, this);

		setTimeout(function() {
			me.people.loadTexture('people');
			me.people.x = 650;
		},1000);

	}


}

var finish = function(game){
	console.log("Finish");
};

finish.prototype = {

	preload: function() {
		console.log("preload de finish");
	},

	play_again_btn: null,

	create: function() {
		console.log("update de finish");
		var background = game.add.sprite(0,0,'game_over');
		this.play_again_btn = game.add.sprite(310,520,'button');
		this.play_again_btn.inputEnabled = true;
		this.play_again_btn.input.useHandCursor = true;
		this.play_again_btn.events.onInputDown.add(this.playAgain, this);

		this.play_again_btn.alpha = 0;

	},

	update: function() {
		console.log("update de finish");
	},

	playAgain: function() {
		//game.state.start("menu");
		location.reload(); //MEGA APER, queria subir ya el juego.
	},


}

var menu = function(game){
	console.log("Menu");
};

menu.prototype = {

	preload: function() {
		console.log("preload de menu");
	},

	play_btn: null,
	credits_btn: null,

	create: function() {
		console.log("update de menu");
		var background = game.add.sprite(0,0,'menu');
		this.play_btn = game.add.sprite(310,520,'button');
		this.play_btn.inputEnabled = true;
		this.play_btn.input.useHandCursor = true;
		this.play_btn.events.onInputDown.add(this.Play, this);

		this.play_btn.alpha = 0;

		this.credits_btn = game.add.sprite(610,520,'button');
		this.credits_btn.inputEnabled = true;
		this.credits_btn.input.useHandCursor = true;
		this.credits_btn.events.onInputDown.add(this.Credits, this);

		this.credits_btn.alpha = 0;

	},

	update: function() {
		console.log("update de menu");
	},

	Play: function() {
		console.log("play");
		game.state.start("howto");
	},

	Credits: function() {
		game.state.start("credits");
	},


}

var credits = function(game){
	console.log("credits");
};

credits.prototype = {

	preload: function() {
		console.log("preload de credits");
	},

	ok_btn: null,

	create: function() {
		console.log("update de credits");
		var background = game.add.sprite(0,0,'credits');
		this.ok_btn = game.add.sprite(310,520,'button');
		this.ok_btn.inputEnabled = true;
		this.ok_btn.input.useHandCursor = true;
		this.ok_btn.events.onInputDown.add(this.Ok, this);

		this.ok_btn.alpha = 0;

	},

	update: function() {
		console.log("update de credits");
	},

	Ok: function() {
		console.log("OK");
		game.state.start("menu");
	},


}

var howto = function(game){
	console.log("howto");
};

howto.prototype = {

	preload: function() {
		console.log("preload de howto");
	},

	play_btn: null,

	create: function() {
		console.log("update de howto");
		var background = game.add.sprite(0,0,'howto');
		this.play_btn = game.add.sprite(310,520,'button');
		this.play_btn.inputEnabled = true;
		this.play_btn.input.useHandCursor = true;
		this.play_btn.events.onInputDown.add(this.Play, this);

		this.play_btn.alpha = 0;
	},

	update: function() {
		console.log("update de howto");
	},

	Play: function() {
		console.log("play!");
		game.state.start("main");
	},


}
