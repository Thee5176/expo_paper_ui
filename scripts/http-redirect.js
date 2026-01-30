const http = require("http");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8081;

http
  .createServer((req, res) => {
    const host = req.headers.host
      ? req.headers.host.split(":")[0]
      : "localhost";
    const targetUrl = `https://${host}:${HTTPS_PORT}${req.url}`;

    console.log(
      `Redirecting: http://${req.headers.host}${req.url} -> ${targetUrl}`,
    );

    res.writeHead(301, { Location: targetUrl });
    res.end();
  })
  .listen(HTTP_PORT, () => {
    console.log(
      `HTTP Redirect server running on http://localhost:${HTTP_PORT}`,
    );
    console.log(
      `Any requests to http://localhost:${HTTP_PORT} will be sent to https://localhost:${HTTPS_PORT}`,
    );
  });
