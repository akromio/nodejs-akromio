"use strict";

var _core = require("@dogmalang/core");
const Starter = _core.dogma.use(require("../../Starter"));
const $ExitStarter = class ExitStarter extends Starter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_61f3ae8fd86e36af1ab9475a370e93d2___init__ instanceof Function) this._pvt_61f3ae8fd86e36af1ab9475a370e93d2___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_61f3ae8fd86e36af1ab9475a370e93d2___post__ instanceof Function) this._pvt_61f3ae8fd86e36af1ab9475a370e93d2___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_61f3ae8fd86e36af1ab9475a370e93d2___validate__ instanceof Function) this._pvt_61f3ae8fd86e36af1ab9475a370e93d2___validate__(); /* c8 ignore stop */
  }
};

const ExitStarter = new Proxy($ExitStarter, {
  apply(receiver, self, args) {
    return ExitStarter._pvt_61f3ae8fd86e36af1ab9475a370e93d2___factory__(...args);
  }
});
module.exports = exports = ExitStarter;
{
  const $$Class$$ = ExitStarter;
  ExitStarter._pvt_61f3ae8fd86e36af1ab9475a370e93d2___factory__ = ExitStarter._pvt_61f3ae8fd86e36af1ab9475a370e93d2_create = function (props) {
    /* c8 ignore next */_core.dogma.expect("props", props);
    {
      return new $$Class$$(_core.dogma.clone(props, {
        "times": 1
      }, {}, [], []));
    }
  };
  ExitStarter.prototype.generateBlankSheets = function () {
    const self = this;
    {
      this.output.append({
        'ts': (0, _core.timestamp)().valueOf(),
        'job': "__exit__"
      });
    }
  };
}