<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GLOBAL GAME JAM 2018 ASUNCIÓN PARAGUAY</title>
    <script type="text/javascript" src="system/phaser.min.js"></script>
    <script type="text/javascript" src="states/main.js"></script>
  </head>
  <style>

    .container {
      background-image: url('assets/background_web.png');
      background-size: cover;
    }

  </style>
  <body class="container">
    <script type="text/javascript">
      var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ggj-2018', { preload: preload, create: create, update: update });

      game.state.add("menu",menu);
      game.state.add("credits",credits);
      game.state.add("howto",howto);
      game.state.add("main",main);
      game.state.add("finish",finish);

      function preload() {
        game.load.atlasJSONHash('mosquito_sp', 'assets/mosquito_sp.png', 'assets/mosquito_sp.json');
        game.load.image('mosquito', 'assets/mosquito.png');
        game.load.image('people', 'assets/people.png');
        game.load.image('people_angry', 'assets/people_angry.png');
        game.load.image('ciudad', 'assets/ciudad.png');
        game.load.image('larva','assets/larva.png');
        game.load.image('bucket', 'assets/bucket.png');
        game.load.image('espiral', 'assets/espiral.png');
        game.load.image('background1', 'assets/background1.png');
        game.load.image('background2', 'assets/background2.png');
        game.load.image('lamp', 'assets/lamp.png');
        game.load.image('nube', 'assets/nube.png');
        game.load.image('repelente','assets/repelente.png');
        game.load.image('espiral_bottom','assets/espiral_bottom.png');
        game.load.audio('mosquito_noise', 'assets/mosquito_noise.mp3');
        game.load.audio('short_spray', 'assets/short_spray2.mp3');
        game.load.audio('poof_smoke', 'assets/poof_smoke.mp3');
        game.load.audio('drink_sound', 'assets/drink_sound.wav');
        game.load.audio('drop_sound', 'assets/drop_sound.wav');
        game.load.audio('full_sound', 'assets/full_sound.wav');
        game.load.audio('death_sound', 'assets/death_sound.wav');
        game.load.audio('music1','assets/music1.mp3');
        game.load.image('button','assets/button.png');
        game.load.image('game_over','assets/game_over.png');
        game.load.image('howto','assets/howto.png');
        game.load.image('menu','assets/menu.png');
        game.load.image('credits','assets/credits.jpg');
        console.log("preload del game");

      }

      function create() {
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.state.start("menu");
      }

      function update() {
        console.log("update del game");
      }
    </script>

  </body>
</html>
