"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  DynamicMacro: MacroBase,
  MacroOperator
} = _core.dogma.use(require("@akromio/core"));
const {
  DynamicCo: CoBase,
  CoOperator
} = _core.dogma.use(require("@akromio/core"));
const {
  Script,
  ScriptOperator
} = _core.dogma.use(require("@akromio/core"));
const JobDescriber = _core.dogma.use(require("./JobDescriber"));
const $Macro = class Macro extends MacroBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_24c36891544c3517c92cc40802a42211___init__ instanceof Function) this._pvt_24c36891544c3517c92cc40802a42211___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_24c36891544c3517c92cc40802a42211___post__ instanceof Function) this._pvt_24c36891544c3517c92cc40802a42211___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_24c36891544c3517c92cc40802a42211___validate__ instanceof Function) this._pvt_24c36891544c3517c92cc40802a42211___validate__(); /* c8 ignore stop */
  }
};

const Macro = new Proxy($Macro, {
  apply(receiver, self, args) {
    return new $Macro(...args);
  }
});
const $Co = class Co extends CoBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_24c36891544c3517c92cc40802a42211___init__ instanceof Function) this._pvt_24c36891544c3517c92cc40802a42211___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_24c36891544c3517c92cc40802a42211___post__ instanceof Function) this._pvt_24c36891544c3517c92cc40802a42211___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_24c36891544c3517c92cc40802a42211___validate__ instanceof Function) this._pvt_24c36891544c3517c92cc40802a42211___validate__(); /* c8 ignore stop */
  }
};

const Co = new Proxy($Co, {
  apply(receiver, self, args) {
    return new $Co(...args);
  }
});
suite(__filename, () => {
  {
    const describer = JobDescriber();
    suite("describeJob()", () => {
      {
        test("when macro, a macro description object must be returned", () => {
          {
            const op = Macro({
              'name': "mymacro",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'operator': MacroOperator()
            });
            const out = describer.describeJob(op);
            expected(out).toHave({
              'name': "mymacro",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'opType': "macro"
            });
          }
        });
        test("when co, a co description object must be returned", () => {
          {
            const op = Co({
              'name': "myco",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'operator': CoOperator()
            });
            const out = describer.describeJob(op);
            expected(out).toHave({
              'name': "myco",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'opType': "co"
            });
          }
        });
        test("when script, a script description object must be returned", () => {
          {
            const op = Script({
              'name': "myscript",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'code': "",
              'operator': ScriptOperator()
            });
            const out = describer.describeJob(op);
            expected(out).toHave({
              'name': "myscript",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'opType': "script"
            });
          }
        });
      }
    });
    suite("describe()", () => {
      {
        test("when jobs passed, a list of description objects must be returned", () => {
          {
            const op = Macro({
              'name': "mymacro",
              'tags': ["tag1", "tag2"],
              'desc': "The description.",
              'operator': MacroOperator()
            });
            const out = describer.describe([op]);
            expected(out).equalTo({
              'mymacro': {
                ["name"]: "mymacro",
                ["opType"]: "macro",
                ["tags"]: ["tag1", "tag2"],
                ["desc"]: "The description."
              }
            });
          }
        });
      }
    });
  }
});