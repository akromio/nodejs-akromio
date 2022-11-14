"use strict";

var _core = require("@dogmalang/core");
const axios = _core.dogma.use(require("axios"));
const InternalConnector = _core.dogma.use(require("../InternalConnector"));
const $HttpConnector = class HttpConnector extends InternalConnector {
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
    (0, _core.expect)('host', _['host'], _core.text);
    Object.defineProperty(this, 'host', {
      value: (0, _core.coalesce)(_['host'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('base', _['base'], _core.text);
    Object.defineProperty(this, 'base', {
      value: (0, _core.coalesce)(_['base'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_635820cce3f9788ce14d81f6bae29ead___init__ instanceof Function) this._pvt_635820cce3f9788ce14d81f6bae29ead___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_635820cce3f9788ce14d81f6bae29ead___post__ instanceof Function) this._pvt_635820cce3f9788ce14d81f6bae29ead___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_635820cce3f9788ce14d81f6bae29ead___validate__ instanceof Function) this._pvt_635820cce3f9788ce14d81f6bae29ead___validate__(); /* c8 ignore stop */
  }
};

const HttpConnector = new Proxy($HttpConnector, {
  apply(receiver, self, args) {
    return new $HttpConnector(...args);
  }
});
module.exports = exports = HttpConnector;
HttpConnector.prototype._getItem = async function (itemPath) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    const axios = this.client;
    const url = `https://${self.host}${self.base}${itemPath}`;
    {
      const [ok, resp] = await _core.dogma.pawait(() => axios.get(url));
      if (ok && resp.status == 200) {
        let cty = _core.dogma.getItem(resp.headers, "content-type"); /*c8 ignore next*/
        if (cty == "application/x-yaml") {
          cty = "text/yaml";
        }
        item = {
          ["name"]: itemPath,
          ["value"]: resp.data,
          ["cty"]: cty
        };
      }
    }
  }
  return item;
};