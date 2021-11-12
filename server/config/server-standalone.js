module.exports = {
  srcDirectory: "../src/",
  mongoURL: 'mongodb://localhost:27017/masDB',
  port: 8000,

  runtimeProtocol: "http",
  runtimeHostname: "localhost",
  runtimePort: 8088,
  runtimeMock: false,

  environmentProtocol: "http",
  environmentHostName: "localhost",
  environmentPort: 3000,
  environmentInterface: "spockbot"
}