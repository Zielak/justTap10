import { state } from "./state";
import { Table } from "./Table";

export class Game {
  constructor(rows = 5, columns = 5) {
    this._table = new Table(
      document.getElementById("GameTable"),
      rows,
      columns
    );
    this._score = 0;
    this._rows = rows;
    this._columns = columns;

    this.el = document.querySelector("body");

    this.updateCellSize();

    window.addEventListener("resize", () => this.updateCellSize());

    window.addEventListener("tap.match", () => {
      if (this.table.highestValue > state.level + 3) {
        state.level++;
        console.log("GAME: changed level: ", state.level);
      }
    });

    window.addEventListener("begin", () => this.begin());

    window.addEventListener("win", () => this.win());
  }

  updateCellSize() {
    this._cellSize = this._table.el.scrollWidth / 5;
    // root.style.setProperty("--cell-size", this._cellSize + "px");
  }

  get table() {
    return this._table;
  }
  get score() {
    return this._score;
  }
  get cellSize() {
    return this._cellSize;
  }

  begin() {
    state.level = 0;
    state.gameOver = false;
    document.getElementById("pic").style.display = "none";
    document.body.classList.remove("gameOver--win");
    this._table.reset();
  }

  win() {
    state.gameOver = true;

    document.body.classList.add("gameOver--win");
    document.getElementById("pic").style.display = "";

    this.table.array.flat().forEach((block, i) => {
      const delay = i / 30 + (i % this._rows) / 10;

      block.el.style.animationDelay = `${delay}s`;
      block.el.style.animationDuration = `${1 + Math.random() / 5}s`;
    });
  }
}
