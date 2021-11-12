module.exports = {
  srcDirectory: "../src/",
  mongoURL: process.env.MONGO_URL,
  port: 80,

  runtimeProtocol: "http",
  runtimeHostname: "host.docker.internal",
  runtimePort: 8088,
  runtimeMock: false,

  environmentProtocol: "http",
  environmentHostName: "host.docker.internal",
  environmentPort: 3000,
  environmentInterface: "simulator"
}