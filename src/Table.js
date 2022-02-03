import { Block } from "./Block";
import { ChanceGenerator } from "./ChanceGenerator";
import { state } from "./state";

const waitForFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

export class Table {
  /**
   * @param {HTMLElement} element
   * @param {number} w
   * @param {number} h
   */
  constructor(element, w = 5, h = 5) {
    this._width = w;
    this._height = h;

    /**
     * @type {Block[]}
     */
    this.array = [];

    this.el = element;
    this.el.style.gridTemplateRows = `repeat(${w}, 1fr)`;
    this.el.style.gridTemplateColumns = `repeat(${h}, 1fr)`;

    this.initEvents();

    this.chance = new ChanceGenerator();
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  initEvents() {
    this.el.addEventListener(
      "click",
      (e) => {
        if (!state.gameOver) {
          this.tap(e.target.self);
        }
      },
      false
    );
  }

  highlightBlocks(target) {
    target.highlighted = true;
  }

  getAllMatchingBlocks(block) {
    var arr = [],
      _this = this;

    // prepare
    block.checked = true;
    arr.push(block);

    function check(b) {
      if (typeof b === "undefined") return;
      if (b instanceof Block) {
        if (b.checked) return;

        if (b.value == block.value) {
          b.checked = true;
          arr.push(b);
          matching(b);
        }
      }
    }

    function matching(block) {
      let x = block.x;
      let y = block.y;

      let b;

      // Check top
      b = _this.getBlock(x, y - 1);
      check(b);

      // Check bottom
      b = _this.getBlock(x, y + 1);
      check(b);

      // Check left
      b = _this.getBlock(x - 1, y);
      check(b);

      // Check right
      b = _this.getBlock(x + 1, y);
      check(b);
    }

    matching(block);

    // don't allow a move on 1-block group
    if (arr.length <= 1) return [];

    return arr;
  }

  /**
   * @param {Block} block
   */
  async tap(block) {
    let b, x;

    // reset "checked" value
    for (x of this.array) {
      for (b of x) {
        b.checked = false;
      }
    }

    var allMatches = this.getAllMatchingBlocks(block);

    // check if it's a FIRST tap
    if (!block.highlighted) {
      if (block.value === 10) {
        window.dispatchEvent(new Event("win"));
        return;
      }

      // Reset every other highlights
      for (x of this.array) {
        for (b of x) {
          b.highlighted = false;
        }
      }

      // Highlight only matching blocks
      for (b of allMatches) {
        b.highlighted = true;
      }

      // Dispatch Event
      window.dispatchEvent(new Event("tap.highlight"));
    } else {
      // SECOND TAP

      // Dispatch Event
      window.dispatchEvent(new Event("tap.match"));

      // Destroy all matching blocks
      for (b of allMatches) {
        this.array[b.x][b.y] = null;
        b.destroy();
      }
      // Add new block +1 in place
      this.addBlock(this.generateNewBlock(block.x, block.y, block.value + 1));

      // Gravity, make all other fall down
      await this.gravity();

      // Fill up empty spaces with new blocks
      this.fillEmptySpaces();
    }

    allMatches = [];
  }

  async gravity() {
    let block, fallAmount;
    /**
     * @type {Block[]}
     */
    const fallenBlocks = [];

    document.body.classList.add("noTransition");

    // await waitForFrame();

    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 2; y >= 0; y--) {
        // Check if block exists
        if (this.array[x][y] === null) continue;

        // Check if place below is empty
        if (this.array[x][y + 1] !== null) continue;

        fallAmount = y + 1;
        block = this.array[x][y];

        // Figure out the lowest empty place
        while (this.array[x][fallAmount + 1] === null) {
          fallAmount++;
        }

        fallenBlocks.push(block);
        this.moveBlockTo(block, x, fallAmount);
      }
    }

    // await waitForFrame();

    document.body.classList.remove("noTransition");

    // await waitForFrame();

    fallenBlocks.forEach((b) => b.resetOffset());
  }

  fillEmptySpaces() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.array[x][y] === null) {
          this.addBlock(this.generateNewBlock(x, y));
        }
      }
    }
  }

  generateNewBlock(x, y, v = undefined) {
    var val;
    if (v !== undefined) {
      val = v;
    } else {
      val = this.chance.coin();
    }

    return new Block(val, x, y);
  }

  moveBlockTo(block, x, y) {
    this.array[block.x][block.y] = null;
    if (this.array[x][y] !== null) {
      console.error("TABLE: Trying to move block to occupied spot in array");
      return false;
    }

    this.array[x][y] = block;
    block.moveTo(x, y);
  }

  highlightAll(yep) {
    for (var x of this.array) {
      for (var cell of x) {
      }
    }
  }

  addBlock(block) {
    this.array[block.x][block.y] = block;
    this.el.appendChild(block.el);
  }

  getBlock(x, y) {
    if (typeof this.array[x] !== "undefined") {
      if (typeof this.array[x][y] !== "undefined") {
        return this.array[x][y];
      }
    }
  }

  get highestValue() {
    let max = 0;
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (this.array[x][y].value > max) {
          max = this.array[x][y].value;
        }
      }
    }
    return max;
  }

  reset() {
    this.clear();

    var block, val;

    for (var x = 0; x < this.width; x++) {
      this.array[x] = [];
    }

    for (var y = 0; y < this.height; y++) {
      for (x = 0; x < this.width; x++) {
        block = this.generateNewBlock(x, y);

        this.addBlock(block);
      }
    }
  }

  clear() {
    this.el.innerHTML = "";
    this.array = [];
  }
}
