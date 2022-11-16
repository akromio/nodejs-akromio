"use strict";

var _core = require("@dogmalang/core");
const {
  Inquirer
} = _core.dogma.use(require("@akromio/inquirer"));
module.exports = exports = {
  ["desc"]: "Does the questions to the user.",
  ["parameterizer"]: buildParams,
  ["title"]: "inquire: do questions",
  ["fun"]: handler
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["questions"]: _core.dogma.getItem(args, 0),
            ["answers"]: _core.dogma.getItem(args, 1)
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
async function handler(ctx) {
  let answers; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    var _params$answers;
    0, await (0, _core.sleep)("50ms");
    answers = (0, await Inquirer().prompt(params.questions, (_params$answers = params.answers) !== null && _params$answers !== void 0 ? _params$answers : {}));
    let answersLog = "";
    {
      const _ = _core.ps.env.KRM_ANSWERS_LOG;
      switch (_) {
        case "options":
          {
            for (const [key, value] of Object.entries(answers)) {
              {
                answersLog += (answersLog ? " " : "") + `-A ${key}='${value}'`;
              }
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "file":
          {
            for (const [key, value] of Object.entries(answers)) {
              {
                answersLog += `${key}=${value}
`;
              }
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
      }
    }
    if (answersLog) {
      (0, _core.print)("\n=> Answers:");
      (0, _core.print)(answersLog);
      (0, _core.print)();
    }
  }
  return answers;
}