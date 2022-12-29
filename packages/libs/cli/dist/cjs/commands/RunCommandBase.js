"use strict";

var _core = require("@dogmalang/core");
const CatalogCommandBase = _core.dogma.use(require("./CatalogCommandBase"));
const {
  baseOptions
} = CatalogCommandBase;
const $RunCommandBase = class RunCommandBase extends CatalogCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___init__ instanceof Function) this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___post__ instanceof Function) this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___validate__ instanceof Function) this._pvt_4b1ced6e0cc17fa5ae9edc4b0d96716a___validate__(); /* c8 ignore stop */
  }
};

const RunCommandBase = new Proxy($RunCommandBase, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'RunCommandBase' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = RunCommandBase;
Object.defineProperty(RunCommandBase, 'baseOptions', {
  value: baseOptions,
  writable: false,
  enumerable: true
});
/* c8 ignore start */
RunCommandBase.prototype.createCatalogParser = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */