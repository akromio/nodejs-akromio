"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const dgram = _core.dogma.use(require("dgram"));
const op = _core.dogma.use(require("./send"));
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handle = op.fun;
    suite("buildParams()", () => {
      {
        test("when list, {msg, addr, port} must be returned", () => {
          {
            const msg = "hello";
            const addr = "127.0.0.1";
            const port = "65";
            const args = [msg, addr, port];
            const out = buildParams(args);
            expected(out).equalTo({
              'msg': msg,
              'addr': addr,
              'port': port
            });
          }
        });
        test("when map, that map must be returned", () => {
          {
            const msg = "hello";
            const addr = "127.0.0.1";
            const port = "65";
            const args = {
              ["msg"]: msg,
              ["addr"]: addr,
              ["port"]: port
            };
            const out = buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const params = {
              ["msg"]: "hello",
              ["addr"]: "localhost",
              ["port"]: 12345
            };
            const out = buildTitle(params);
            expected(out).equalTo(`udp: send to '${params.addr}:${params.port}'`);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        let server;
        teardown(() => {
          {
            if (server) {
              server.close();
              server = null;
            }
          }
        });
        test("when called, a message must be sent", async () => {
          {
            let out;
            const msg = "hello!";
            const serverAddr = "localhost";
            const serverPort = 36987;
            server = dgram.createSocket({
              'type': "udp4"
            });
            server.bind(serverPort, serverAddr);
            server.on("message", msg => {
              /* c8 ignore next */_core.dogma.expect("msg", msg);
              {
                out = msg.toString();
              }
            });
            const params = {
              ["msg"]: msg,
              ["addr"]: serverAddr,
              ["port"]: serverPort
            };
            0, await (0, _core.sleep)("50ms");
            0, await handle({
              ["params"]: params
            });
            0, await (0, _core.sleep)("50ms");
            expected(out).equalTo(msg);
          }
        });
      }
    });
  }
});