import { state } from "./state";

export class ChanceGenerator {
  constructor(element, w, h) {
    // https://www.desmos.com/calculator/v9csf5bref
    this.blocks = [
      /* 1*/ (x) => Math.max(0.2, -x * 0.25 + 1),
      /* 2*/ (x) => Math.max(0.3, -x * 0.2 + 1),
      /* 3*/ (x) => Math.min(0.9, Math.max(0.3, Math.sin(x * 0.6 + 0.7))),
      /* 4*/ (x) => Math.max(Math.min(x * 0.15 - 0.05, 0.6), 0),
      /* 5*/ (x) => Math.min(0.8, Math.max(x * 0.16 + 0.33, 0.5) - 0.5),
      /* 6*/ (x) => Math.min(0.8, Math.max(x * 0.16 + 0.18, 0.5) - 0.5),
      /* 7*/ (x) => Math.min(0.8, Math.max(x * 0.16 + 0.02, 0.5) - 0.5),
      /* 8*/ (x) => Math.min(0.8, Math.max(x * 0.16 - 0.13, 0.5) - 0.5),
      /* 9*/ (x) => Math.min(0.8, Math.max(x * 0.16 - 0.29, 0.5) - 0.5),
    ];

    // TODO: Keep log of recently tossed blocks, to keep 'balance'
    this.log = [];
  }

  // Toss a coin and tell me which block should I spawn
  // Take current level in account
  coin(lvl) {
    let range = 0;
    let chances = [0]; // per block value, contains highest chance index
    let y = 0;
    let coin = 0;
    lvl = typeof lvl === "undefined" ? state.level : lvl;

    for (let i = 1; i <= this.blocks.length; i++) {
      y = this.blocks[i - 1](lvl);
      range += y;
      chances[i] = range;
    }

    coin = Math.random() * range;

    for (let i = this.blocks.length - 1; i >= 0; i--) {
      if (coin >= chances[i - 1]) return i;
    }

    return 1;
  }
}
