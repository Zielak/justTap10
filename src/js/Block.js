(function(){
'use strict';

class Block{

  constructor( value, x, y ){
    
    this.el = $('<div class="Block v'+value+'">')[0];
    this.el.self = this;
    this.value = value;
    this.x = x;
    this.y = y;
    this.transformScale = ' scale3d(0.2, 0.2, 0.2)';
    this.updateTranslate();
    
    // Scale up the block after short while
    setTimeout(function(){
      this.updateScale();
    }.bind(this), 0);

    this._highlighted = false;

    window.addEventListener('resize', function(){
      this.updateTranslate();
    }.bind(this));

    return this;

  }

  moveTo(x, y){
    this.x = x;
    this.y = y;
    this.updateTranslate();

    this.el.style.zIndex = 1;
    setTimeout(function(){
      this.el.style.zIndex = "";
    }.bind(this), 200);
  }

  updateTranslate(){
      let x = this.x * window.game.cellSize ;
      let y = this.y * window.game.cellSize ;

      this.el.style.transform = 'translate3d('+ x +'px, '+ y +'px, 0px)' + this.transformScale;
      this.el.style.width = window.game.cellSize+'px';
      this.el.style.height = window.game.cellSize+'px';
  }

  updateScale(){
    this.transformScale = ' scale3d(1, 1, 1)';
    this.updateTranslate();
  }

  destroy(){
    this.el.remove();
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

window.Block = Block;

})();