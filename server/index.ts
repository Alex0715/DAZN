import "./common/env";
(async () => {
  await require("./api/config");
  require("./api/db/connection");
  await require("./runServer");
})();
