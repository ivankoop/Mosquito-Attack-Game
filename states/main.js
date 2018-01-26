var main = function(game){
	console.log("Main");
};


main.prototype = {

  //local attrs here

  preload: function() {
    console.log("preload main");
  },

  create: function() {
    console.log("create del main");
  },

  update: function() {
    console.log("update del main");
  }
}
