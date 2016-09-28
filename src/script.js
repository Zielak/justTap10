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

    this.width = 4;
    this.height = 6;

    this.array = [];

    this.el = element;

    this.initEvents();

  }

  initEvents(){
    
    this.el.addEventListener('click', function(e){

      this.tap(e.target.self);
      
    }.bind(this), false);

  }


  highlightBlocks(target){
    
    target.highlighted = true;

  }

  getAllMatchingBlocks(block){
    var arr = [], _this = this;

    // prepare
    block.checked = true;
    arr.push(block);

    function check(b){
      if( typeof b === 'undefined' ) return;
      if( b instanceof Block ){

        if( b.checked ) return;

        if( b.value == block.value ){
          b.checked = true;
          arr.push(b);
          matching(b);
        }
      }
    }

    function matching(block){
      
      let x = block.x;
      let y = block.y;

      let b;

      // Check top
      b = _this.getBlock(x, y-1);
      check( b );

      // Check bottom
      b = _this.getBlock(x, y+1);
      check( b );
      
      // Check left
      b = _this.getBlock(x-1, y);
      check( b );
      
      // Check right
      b = _this.getBlock(x+1, y);
      check( b );
    }

    matching( block );
    
    // don't allow a move on 1-block group
    if( arr.length <= 1 ) return [];

    return arr;
  }




  tap(block){

    let b, x;

    // reset "checked" value
    for(x of this.array){
      for(var cell of x){
        cell.block.self.checked = false;
      }
    }
    
    var allMatches = this.getAllMatchingBlocks( block );

    // check if it's a FIRST tap
    if( !block.highlighted ){
      for ( b of allMatches ){
        b.highlighted = true;
      }
    }
    else
    {
      // SECOND TAP
      for ( b of allMatches ){
        b.destroy();
      }
    }

  }


  moveBlocksDown(){

    for(var x of this.array){
      for(var cell of x){
        
      }
    }

  }


  highlightAll(yep){

    for(var x of this.array){
      for(var cell of x){
      }
    }

  }



  getBlock(x, y){
    if( typeof this.array[x] !== 'undefined') {
      if( typeof this.array[x][y] !== 'undefined'){
        return this.array[x][y].block.self;
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
    var row, cell, block, val;

    for( var x=0; x<this.width; x++ ){
      this.array[x] = [];
    }

    for( var y=0; y<this.height; y++){

      row = $('<div class="row">');

      for( x=0; x<this.width; x++){

        cell = new Cell();
        this.array[x][y] = cell;

        val = Math.ceil( (game.level+1) * (Math.random() * 3) );

        block = new Block( val, x, y );

        cell.el.appendChild( block.el );
        row.append(cell.el);

      }
      this.el.appendChild(row[0]);
    }
  }



}

class Cell{

  constructor(){

    this.el = document.createElement('div');
    this.el.classList.add('col');

    return this;

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
    this.el.self = this;
    this._highlighted = false;

    return this;

  }

  destroy(){
    this.el.remove();
    // TODO, make the table remove me plz
  }

  set highlighted(yep){
    this._highlighted = yep;
    if(yep){
      this.el.classList.add('-highlighted');
    }else{
      this.el.classList.remove('-highlighted');
    }
  }

  get highlighted(){
    return this._highlighted;
  }



}




window.game = new Game();

window.game.begin();



})();