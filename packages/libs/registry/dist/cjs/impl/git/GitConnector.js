"use strict";

var _core = require("@dogmalang/core");
const axios = _core.dogma.use(require("axios"));
const mime = _core.dogma.use(require("mime-types"));
const InternalConnector = _core.dogma.use(require("../InternalConnector"));
const $GitConnector = class GitConnector extends InternalConnector {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'client', {
      value: (0, _core.coalesce)(_['client'], axios),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['host'] != null) (0, _core.expect)('host', _['host'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'host', {
      value: (0, _core.coalesce)(_['host'], "raw.githubusercontent.com"),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('user', _['user'], _core.text);
    Object.defineProperty(this, 'user', {
      value: (0, _core.coalesce)(_['user'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('repo', _['repo'], _core.text);
    Object.defineProperty(this, 'repo', {
      value: (0, _core.coalesce)(_['repo'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('branch', _['branch'], _core.text);
    Object.defineProperty(this, 'branch', {
      value: (0, _core.coalesce)(_['branch'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('prefix', _['prefix'], _core.text);
    Object.defineProperty(this, 'prefix', {
      value: (0, _core.coalesce)(_['prefix'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_11ebb4c479acb0887839074499184ef5___init__ instanceof Function) this._pvt_11ebb4c479acb0887839074499184ef5___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_11ebb4c479acb0887839074499184ef5___post__ instanceof Function) this._pvt_11ebb4c479acb0887839074499184ef5___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_11ebb4c479acb0887839074499184ef5___validate__ instanceof Function) this._pvt_11ebb4c479acb0887839074499184ef5___validate__(); /* c8 ignore stop */
  }
};

const GitConnector = new Proxy($GitConnector, {
  apply(receiver, self, args) {
    return new $GitConnector(...args);
  }
});
module.exports = exports = GitConnector;
GitConnector.prototype._getItem = async function (itemPath) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    const axios = this.client;
    const url = `https://${self.host}/${self.user}/${self.repo}/${self.branch}/${self.prefix}${itemPath}`;
    {
      const [ok, resp] = await _core.dogma.pawait(() => axios.get(url));
      if (ok && resp.status == 200) {
        item = {
          ["name"]: itemPath,
          ["value"]: resp.data,
          ["cty"]: mime.lookup(itemPath) || _core.dogma.getItem(resp.headers, "content-type")
        };
      }
    }
  }
  return item;
};