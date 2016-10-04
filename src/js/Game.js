(function(){
'use strict';

class Game {
  
  constructor(){
    
    this._table = new Table( document.getElementById('GameTable'), 5, 5 );
    this._score = 0;
    this._level = 0;

    this.el = document.querySelector('body');

    this._cellSize = this._table.el.scrollWidth / 5;


    window.addEventListener('resize', function(){
      this._cellSize = this._table.el.scrollWidth / 5;
    }.bind(this));

    window.addEventListener('tap.match', function(){
      if(this.table.highestValue > this.level+3){
        this._level++;
        log('GAME: changed level: ', this.level);
      }
    }.bind(this));

  }

  get table() {return this._table;}
  get score() {return this._score;}
  get level() {return this._level;}
  get cellSize() {return this._cellSize;}

  begin(){

    this._table.reset();

  }


}

window.Game = Game;

})();