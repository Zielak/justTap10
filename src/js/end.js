(function(){
'use strict';

var game = new window.Game();
window.game = game;

window.game.begin();

window.log = function(){
    console.log(arguments);
};

})();