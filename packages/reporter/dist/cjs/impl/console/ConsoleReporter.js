"use strict";

var _core = require("@dogmalang/core");
const merge = _core.dogma.use(require("lodash.merge"));
const indent = _core.dogma.use(require("indent-string"));
const durationFmt = _core.dogma.use(require("humanize-duration"));
const config = _core.dogma.use(require("./config"));
const Reporter = _core.dogma.use(require("../../Reporter"));
const fmtDuration = durationFmt.humanizer({
  ["language"]: "short",
  ["languages"]: {
    ["short"]: {
      ["m"]: () => {
        {
          return "m";
        }
      },
      ["s"]: () => {
        {
          return "s";
        }
      },
      ["ms"]: () => {
        {
          return "ms";
        }
      }
    }
  }
});
const $ConsoleReporter = class ConsoleReporter extends Reporter {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'config', {
      value: merge(config, _.config),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'logged', {
      value: (0, _core.coalesce)(_['logged'], false),
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_b236ff46e695c9c09d34fd0f8ab34171___init__ instanceof Function) this._pvt_b236ff46e695c9c09d34fd0f8ab34171___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b236ff46e695c9c09d34fd0f8ab34171___post__ instanceof Function) this._pvt_b236ff46e695c9c09d34fd0f8ab34171___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b236ff46e695c9c09d34fd0f8ab34171___validate__ instanceof Function) this._pvt_b236ff46e695c9c09d34fd0f8ab34171___validate__(); /* c8 ignore stop */
  }
};

const ConsoleReporter = new Proxy($ConsoleReporter, {
  apply(receiver, self, args) {
    return new $ConsoleReporter(...args);
  }
});
module.exports = exports = ConsoleReporter;
Object.defineProperty(ConsoleReporter.prototype, "echo", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.config.echo;
    }
  }
});
Object.defineProperty(ConsoleReporter.prototype, "print", {
  enum: true,
  get: function () {
    const self = this;
    {
      return this.config.print;
    }
  }
});
ConsoleReporter.prototype._handleOpStart = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    let {
      config,
      print,
      echo
    } = this;
    const indent = config.indent.repeat(e.level);
    let {
      title
    } = e;
    this.logged = false;
    if (e.opType == "simple") {
      echo(`${indent}${config.simple.prefix} ${title}`);
    } else {
      title = config.composite.title.color(title);
      print(`${indent}${config.composite.prefix} ${title}`);
    }
  }
};
ConsoleReporter.prototype._handleOpEnd = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    if (e.opType == "simple") {
      const {
        config,
        echo,
        print
      } = this;
      const {
        log
      } = config;
      const {
        result
      } = e;
      const level = e.level + 1;
      if (this.logged) {
        echo(indent(log.color(log.endSymbol), level, {
          'indent': config.indent
        }));
      }
      print(` ${self.getResultText(result.kind)} (${getDurationText(result.duration)})`);
    }
    this.logged = false;
  }
};
ConsoleReporter.prototype._handleEnd = function () {
  const self = this;
  {
    _core.dogma.nop();
  }
};
ConsoleReporter.prototype._handleOpLog = function (e) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("e", e);
  {
    const {
      config,
      print,
      echo
    } = this;
    const {
      log
    } = config;
    const level = e.level;
    let {
      content
    } = e;
    let show = print;
    if (!this.logged) {
      show(log.color("", log.startSymbol));
      this.logged = true;
    }
    if (_core.dogma.getItem(content, -1) == "\n") {
      show = echo;
    }
    show(log.color(indent(content, level, {
      'indent': config.indent
    })));
  }
};
ConsoleReporter.prototype.getResultText = function (result) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("result", result);
  {
    const {
      config
    } = this;
    if (result == "ok") {
      result = config.ok.color("ok");
    } else {
      result = config.failed.color("failed");
    }
  }
  return result;
};
function getDurationText(duration) {
  /* c8 ignore next */_core.dogma.expect("duration", duration);
  {
    if (duration < 1000) {
      duration = duration + " ms";
    } else {
      duration = fmtDuration(duration);
    }
  }
  return duration;
}