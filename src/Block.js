export class Block {
  _offsetX = 0;
  _offsetY = 0;

  constructor(value, x, y) {
    const el = document.createElement("div");
    el.className = `Block v${value}`;
    el.self = this;

    this.el = el;
    this.value = value;
    this.x = x;
    this.y = y;
    this._scale = 0.2;
    this.updateLocation();
    this.updateTransform();

    requestAnimationFrame(() => {
      this._scale = 1;
      this.updateTransform();
    });

    this._highlighted = false;

    return this;
  }

  moveTo(x, y) {
    const diffX = this.x - x;
    const diffY = this.y - y;
    this.x = x;
    this.y = y;

    // New location on grid
    this.updateLocation();

    // Set offset away from this spot
    this._offsetX = this.width * diffX;
    this._offsetY = this.height * diffY;
    this.updateTransform();

    this.el.style.zIndex = 10;

    setTimeout(() => (this.el.style.zIndex = ""), 300);
  }

  resetOffset() {
    this._offsetX = 0;
    this._offsetY = 0;
    this.updateTransform();
  }

  updateTransform() {
    this.el.style.transform = `scale(${this._scale}) translate(${this._offsetX}px, ${this._offsetY}px)`;
  }

  updateLocation() {
    this.el.style.gridColumnStart = this.x + 1;
    this.el.style.gridRowStart = this.y + 1;
  }

  destroy() {
    this.el.remove();
  }

  set highlighted(yep) {
    this._highlighted = yep;
    if (yep) {
      this.el.classList.add("-highlighted");
    } else {
      this.el.classList.remove("-highlighted");
    }
  }

  get highlighted() {
    return this._highlighted;
  }

  get width() {
    return this.el.offsetWidth;
  }

  get height() {
    return this.el.offsetHeight;
  }
}
