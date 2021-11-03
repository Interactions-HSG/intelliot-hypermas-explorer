module.exports = {
  srcDirectory: "../src/",
  mongoURL: process.env.MONGO_URL,
  port: 80,

  runtimeProtocol: "http",
  runtimeHostname: "host.docker.internal",
  runtimePort: 8088,
  runtimeMock: false,

  yggdrasilProtocol: "http",
  yggdrasilHostName: "host.docker.internal",
  yggdrasilPort: 8087,
  yggdrasilMock: true
}