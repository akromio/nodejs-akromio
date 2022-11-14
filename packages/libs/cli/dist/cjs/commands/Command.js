"use strict";

var _core = require("@dogmalang/core");
const $Command = class Command {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_62d7f392bcf797809a6b49b1173e918b___init__ instanceof Function) this._pvt_62d7f392bcf797809a6b49b1173e918b___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_62d7f392bcf797809a6b49b1173e918b___post__ instanceof Function) this._pvt_62d7f392bcf797809a6b49b1173e918b___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_62d7f392bcf797809a6b49b1173e918b___validate__ instanceof Function) this._pvt_62d7f392bcf797809a6b49b1173e918b___validate__(); /* c8 ignore stop */
  }
};

const Command = new Proxy($Command, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Command' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Command;
Object.defineProperty(Command.prototype, "handler", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.bind)(this, "handle");
    }
  }
});