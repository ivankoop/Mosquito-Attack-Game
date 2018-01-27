<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GLOBAL GAME JAM 2018 ASUNCIÓN PARAGUAY</title>
    <script type="text/javascript" src="system/phaser.min.js"></script>
    <script type="text/javascript" src="states/main.js"></script>
  </head>
  <body>
    <h1>GLOBAL GAME JAM 2018 ASUNCIÓN PARAGUAY</h1>

    <script type="text/javascript">
      var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ggj-2018', { preload: preload, create: create, update: update });

      game.state.add("main",main);

      function preload() {
        game.load.image('mosquito', 'assets/mosquito.png');
        game.load.image('people', 'assets/people.png');
        game.load.image('bucket', 'assets/bucket.png');
        game.load.image('espiral', 'assets/espiral.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('lamp', 'assets/lamp.png');
        game.load.image('repelente','assets/repelente.png');
        game.load.audio('mosquito_noise', 'assets/mosquito_noise.mp3');
        game.load.audio('background_sound', 'assets/background_sound.wav');
        game.load.audio('music1','assets/music1.mp3');
        console.log("preload del game");

      }

      function create() {
        game.state.start("main");
      }

      function update() {
        console.log("update del game");
      }
    </script>

  </body>
</html>
