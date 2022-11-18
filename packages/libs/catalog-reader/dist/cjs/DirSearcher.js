"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const fs = _core.dogma.use(require("fs/promises"));
const $DirSearcher = class DirSearcher {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_f83fe8a79ee05fdfb02dfd3058012f24___init__ instanceof Function) this._pvt_f83fe8a79ee05fdfb02dfd3058012f24___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f83fe8a79ee05fdfb02dfd3058012f24___post__ instanceof Function) this._pvt_f83fe8a79ee05fdfb02dfd3058012f24___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f83fe8a79ee05fdfb02dfd3058012f24___validate__ instanceof Function) this._pvt_f83fe8a79ee05fdfb02dfd3058012f24___validate__(); /* c8 ignore stop */
  }
};

const DirSearcher = new Proxy($DirSearcher, {
  apply(receiver, self, args) {
    return new $DirSearcher(...args);
  }
});
module.exports = exports = DirSearcher;
DirSearcher.prototype.searchDirWith = async function (entry, dir = "") {
  const self = this;
  let superDirPath; /* c8 ignore next */
  _core.dogma.expect("entry", entry, _core.text);
  {
    let curDir = dir;
    for (let i = 0; i < 10; i += 1) {
      const entries = (0, await fs.readdir(curDir = path.join(curDir, "..")));
      if (_core.dogma.includes(entries, entry)) {
        superDirPath = curDir;
        break;
      }
    }
  }
  return superDirPath;
};