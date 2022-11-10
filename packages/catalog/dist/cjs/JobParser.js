"use strict";

var _core = require("@dogmalang/core");
const {
  Ops,
  MacroOperator,
  LoopOperator,
  CoOperator,
  Script,
  ScriptOperator
} = _core.dogma.use(require("@akromio/core"));
const CatalogMacro = _core.dogma.use(require("./ops/impl/macro/CatalogMacro"));
const CatalogLoop = _core.dogma.use(require("./ops/impl/loop/CatalogLoop"));
const CatalogCo = _core.dogma.use(require("./ops/impl/co/CatalogCo"));
const ParseOpts = _core.dogma.intf('ParseOpts', {
  ops: {
    optional: false,
    type: Ops
  }
});
const $JobParser = class JobParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___init__ instanceof Function) this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___post__ instanceof Function) this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___validate__ instanceof Function) this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___validate__(); /* c8 ignore stop */
  }
};

const JobParser = new Proxy($JobParser, {
  apply(receiver, self, args) {
    return new $JobParser(...args);
  }
});
module.exports = exports = JobParser;
JobParser.prototype.parseJobs = function (decl, opts) {
  const self = this;
  let jobs = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    for (let job of decl) {
      job = this.parseJob(job, opts);
      if (_core.dogma.is(job, _core.list)) {
        for (const aux of job) {
          _core.dogma.setItem("=", jobs, aux.name, aux);
        }
      } else {
        _core.dogma.setItem("=", jobs, job.name, job);
      }
    }
  }
  return jobs;
};
JobParser.prototype.parseJob = function (decl, opts) {
  const self = this;
  let job; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    if (_core.dogma.includes(decl, "group")) {
      job = this.parseGroup(decl, opts);
    } else if (_core.dogma.includes(decl, "macro")) {
      job = this.parseMacro(decl, opts);
    } else if (_core.dogma.includes(decl, "loop")) {
      job = this.parseLoop(decl, opts);
    } else if (_core.dogma.includes(decl, "co")) {
      job = this.parseCo(decl, opts);
    } else if (_core.dogma.includes(decl, "script")) {
      job = this.parseScript(decl, opts);
    } else {
      job = this.parseAddOnJob(decl, opts);
    }
  }
  return job;
};
JobParser.prototype.parseGroup = function (decl, opts) {
  const self = this;
  let jobs = []; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    const tag = decl.group;
    for (let job of decl.jobs) {
      job = this.parseJob(job, opts);
      job.tags.push(tag);
      jobs.push(job);
    }
  }
  return jobs;
};
JobParser.prototype.parseAddOnJob = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    _core.dogma.raise(Error(`Invalid job declaration: ${(0, _core.fmt)(decl)}.`));
  }
};
JobParser.prototype.parseMacro = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    var _decl$ini, _decl$fin;
    return CatalogMacro(_core.dogma.clone(decl, {
      "name": decl.macro,
      "operator": MacroOperator(),
      "ops": opts.ops,
      "initializers": (_decl$ini = decl.ini) !== null && _decl$ini !== void 0 ? _decl$ini : [],
      "finalizers": (_decl$fin = decl.fin) !== null && _decl$fin !== void 0 ? _decl$fin : []
    }, {}, [], []));
  }
};
JobParser.prototype.parseLoop = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    var _decl$ini2, _decl$fin2;
    return CatalogLoop(_core.dogma.clone(decl, {
      "name": decl.loop,
      "operator": LoopOperator(),
      "ops": opts.ops,
      "initializers": (_decl$ini2 = decl.ini) !== null && _decl$ini2 !== void 0 ? _decl$ini2 : [],
      "finalizers": (_decl$fin2 = decl.fin) !== null && _decl$fin2 !== void 0 ? _decl$fin2 : []
    }, {}, [], []));
  }
};
JobParser.prototype.parseCo = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return CatalogCo(_core.dogma.clone(decl, {
      "name": decl.co,
      "operator": CoOperator(),
      "ops": opts.ops
    }, {}, [], []));
  }
};
JobParser.prototype.parseScript = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return Script(_core.dogma.clone(decl, {
      "name": decl.script,
      "operator": ScriptOperator()
    }, {}, [], []));
  }
};