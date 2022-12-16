"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const MacroBase = _core.dogma.use(require("./Macro"));
const MacroOperator = _core.dogma.use(require("./MacroOperator"));
const $Macro = class Macro extends MacroBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_3763d3640a7a4e7ba721ed72db9eb643___init__ instanceof Function) this._pvt_3763d3640a7a4e7ba721ed72db9eb643___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3763d3640a7a4e7ba721ed72db9eb643___post__ instanceof Function) this._pvt_3763d3640a7a4e7ba721ed72db9eb643___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3763d3640a7a4e7ba721ed72db9eb643___validate__ instanceof Function) this._pvt_3763d3640a7a4e7ba721ed72db9eb643___validate__(); /* c8 ignore stop */
  }
};

const Macro = new Proxy($Macro, {
  apply(receiver, self, args) {
    return new $Macro(...args);
  }
});
suite(__filename, () => {
  {
    suite("getLoopCollection()", () => {
      {
        test("when non-looped macro, [] must be returned", () => {
          {
            const macro = Macro({
              'name': "macro",
              'operator': MacroOperator()
            });
            const out = macro.getLoopCollection({});
            expected(out).equalTo([]);
          }
        });
      }
    });
  }
});