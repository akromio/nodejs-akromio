"use strict";

var _core = require("@dogmalang/core");
const $JobDescriber = class JobDescriber {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1c460b04984b52dec9af8f017afd9a8f___init__ instanceof Function) this._pvt_1c460b04984b52dec9af8f017afd9a8f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1c460b04984b52dec9af8f017afd9a8f___post__ instanceof Function) this._pvt_1c460b04984b52dec9af8f017afd9a8f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1c460b04984b52dec9af8f017afd9a8f___validate__ instanceof Function) this._pvt_1c460b04984b52dec9af8f017afd9a8f___validate__(); /* c8 ignore stop */
  }
};

const JobDescriber = new Proxy($JobDescriber, {
  apply(receiver, self, args) {
    return new $JobDescriber(...args);
  }
});
module.exports = exports = JobDescriber;
JobDescriber.prototype.describeJob = function (job) {
  const self = this;
  let descObj = {}; /* c8 ignore next */
  _core.dogma.expect("job", job, _core.map);
  {
    const {
      name,
      desc
    } = job;
    const tags = _core.dogma.copy(job.tags);
    let opType;
    {
      const _ = job; /*c8 ignore else*/
      if (_core.dogma.is(_, "Macro")) {
        {
          opType = "macro";
        }
      } else if (_core.dogma.is(_, "Co")) {
        {
          opType = "co";
        }
      } else if (_core.dogma.is(_, "Script")) {
        {
          opType = "script";
        }
      }
    }
    descObj = {
      ["name"]: name,
      ["opType"]: opType,
      ["tags"]: tags,
      ["desc"]: desc
    };
  }
  return descObj;
};
JobDescriber.prototype.describe = function (jobs) {
  const self = this;
  let descs = {}; /* c8 ignore next */
  _core.dogma.expect("jobs", jobs, _core.list);
  {
    for (const job of jobs) {
      const desc = this.describeJob(job);
      _core.dogma.setItem("=", descs, desc.name, desc);
    }
  }
  return descs;
};