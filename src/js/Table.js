(function(){
'use strict';

class Table {

  constructor(element, w, h){

    this._width = w;
    this._height = h;

    this.array = [];

    this.el = element;

    this.initEvents();

  }

  get width(){ return this._width; }
  get height(){ return this._height; }

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
      for(b of x){
        b.checked = false;
      }
    }
    
    var allMatches = this.getAllMatchingBlocks( block );

    // check if it's a FIRST tap
    if( !block.highlighted ){

      // Reset every other highlights
      for(x of this.array){
        for(b of x){
          b.highlighted = false;
        }
      }

      // Highlight only matching blocks
      for ( b of allMatches ){
        b.highlighted = true;
      }
    }
    else
    {
      // SECOND TAP
      // Destroy all matching blocks
      for ( b of allMatches ){
        this.array[b.x][b.y] = null;
        b.destroy();
      }
      // Add new block +1 in place
      this.addBlock( this.generateNewBlock(block.x, block.y, block.value+1) );

      // Gravity, make all other fall down
      this.gravity();

      // Fill up empty spaces with new blocks
      this.fillEmptySpaces();
    }

    allMatches = [];

  }


  gravity(){
    var b, yg;

    for( var x=0; x<this.width; x++){
      for( var y=this.height-2; y>=0; y--){

        // Check if block exists
        if(this.array[x][y] === null) continue;


        // Check if place below is empty
        if(this.array[x][y+1] !== null) continue;

        yg = y+1;        
        b = this.array[x][y];
        
        // Figure out the lowest empty place
        while(this.array[x][yg+1] === null){
          yg ++;
        }

        this.moveBlockTo(b, x, yg);

      }
    }

  }


  fillEmptySpaces(){

    for( var x=0; x<this.width; x++){
      for( var y=0; y<this.width; y++){
        if(this.array[x][y] === null){
          this.addBlock(this.generateNewBlock(x, y));
        }
      }
    }

  }

  generateNewBlock(x, y, v = undefined ){
    var val;
    if(v !== undefined){
      val = v;
    }else{
      val = Math.ceil( (window.game.level+1) * (Math.random() * 3) );
    }

    return new Block( val, x, y );
  }


  moveBlockTo(block, x, y){

    this.array[block.x][block.y] = null;
    if(this.array[x][y] !== null){
      console.error('TABLE: Trying to move block to occupied spot in array');
      return false;
    }

    this.array[x][y] = block;
    block.moveTo(x,y);

  }


  highlightAll(yep){

    for(var x of this.array){
      for(var cell of x){
      }
    }

  }


  addBlock(block){
    
    this.array[block.x][block.y] = block;
    this.el.appendChild( block.el );
  }

  getBlock(x, y){
    if( typeof this.array[x] !== 'undefined') {
      if( typeof this.array[x][y] !== 'undefined'){
        return this.array[x][y];
      }
    }
  }

  reset(){

    this.clear();

    var block, val;

    for( var x=0; x<this.width; x++ ){
      this.array[x] = [];
    }

    for( var y=0; y<this.height; y++){

      for( x=0; x<this.width; x++){

        block = this.generateNewBlock(x, y);
        
        this.addBlock(block);

      }
    }

  }

  clear(){
    this.el.innerHTML = '';
    this.array = [];
  }



}

window.Table = Table;

})();