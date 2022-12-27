"use strict";

var _core = require("@dogmalang/core");
const $Ring = class Ring {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('points', _['points'], _core.list);
    Object.defineProperty(this, 'points', {
      value: (0, _core.coalesce)(_['points'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'position', {
      value: 0,
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_9d763b79bc60a83559759c4f01adaffd___init__ instanceof Function) this._pvt_9d763b79bc60a83559759c4f01adaffd___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9d763b79bc60a83559759c4f01adaffd___post__ instanceof Function) this._pvt_9d763b79bc60a83559759c4f01adaffd___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9d763b79bc60a83559759c4f01adaffd___validate__ instanceof Function) this._pvt_9d763b79bc60a83559759c4f01adaffd___validate__(); /* c8 ignore stop */
  }
};

const Ring = new Proxy($Ring, {
  apply(receiver, self, args) {
    return new $Ring(...args);
  }
});
module.exports = exports = Ring;
Ring.prototype.next = function () {
  const self = this;
  const {
    points
  } = self;
  let point;
  {
    if (this.position >= (0, _core.len)(points)) {
      this.position = 0;
    }
    point = _core.dogma.getItem(points, this.position);
    this.position += 1;
  }
  return point;
};