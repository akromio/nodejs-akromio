"use strict";

var _core = require("@dogmalang/core");
const handlebars = _core.dogma.use(require("handlebars"));
module.exports = exports = {
  ["desc"]: "Renders a Handlebars template.",
  ["parameterizer"]: buildParams,
  ["title"]: "hbs: render template",
  ["fun"]: handler
};
const helpers = ["contains", "eq", "isDefined", "isEmpty", "isFalsey", "isTruthy", "join", "ne", "split", "trim"];
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["tmpl"]: _core.dogma.getItem(args, 0),
            ["data"]: _core.dogma.getItem(args, 1),
            ["opts"]: _core.dogma.getItem(args, 2)
          };
        }
      } else {
        {
          params = args;
        }
      }
    }
  }
  return params;
}
function handler(ctx) {
  let rendered = ""; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const hbs = handlebars.create();
    for (const helper of helpers) {
      hbs.registerHelper(helper, _core.dogma.use(require(`../helpers/${helper}`)));
    }
    const tmpl = hbs.compile((0, _core.text)(params.tmpl), params.opts);
    rendered = tmpl(params.data);
  }
  return rendered;
}