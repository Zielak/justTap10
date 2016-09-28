(function(){
'use strict';


class Game {
  
  constructor(){
    
    this._table = new Table( document.getElementById('GameTable') );
    this._score = 0;
    this._level = 0;

    this.el = document.querySelector('body');

  }
  get table() {return this._table;}
  get score() {return this._score;}
  get level() {return this._level;}

  begin(){

    this._table.reset();

  }


}





class Table {

  constructor(element){

    this.width = 5;
    this.height = 5;

    this.array = [];

    this.el = element;

    this.initEvents();

  }

  initEvents(){
    
    this.el.addEventListener('click', function(e){

      this.highlightBlocks(e.target);
      
    }.bind(this), false);

  }


  highlightBlocks(target){
    
    target.self.highlight(true);

  }

  pickNeighborsOf(block){

    for (var row of this.array){
      for (var cell of row){
        
      }
    }

  }

  reset(){

    this.clear();
    this.render();

  }

  clear(){
    this.el.innerHTML = '';
    this.array = [];
  }

  render(){
    var row, col, block, val;

    for( var i=0; i<this.width; i++){

      row = $('<div class="row">');
      this.array[i] = [];

      for( var j=0; j<this.height; j++){

        col = new Cell();
        this.array[i][j] = col.self;

        val = Math.ceil( (game.level+1) * (Math.random() * 3) );

        block = new Block( val, i, j );

        col.appendChild( block );
        row.append(col);

      }
      this.el.appendChild(row[0]);
    }
  }



}

class Cell{

  constructor(){

    this.el = document.createElement('div');
    this.el.classList.add('col');
    this.el.self = this;

    return this.el;

  }

  get block(){
    return this.el.querySelector('.Block');
  }

}

class Block{

  constructor( value, x, y ){
    
    this.value = value;
    this.x = x;
    this.y = y;
    this.el = $('<div class="Block v'+value+'">')[0];
    this.highlighted = false;

    this.el.self = this;

    return this.el;

  }

  highlight(yep){
    if(yep){
      this.el.classList.add('-highlighted');
    }else{
      this.el.classList.remove('-highlighted');
    }
  }

}




window.game = new Game();

window.game.begin();



})();