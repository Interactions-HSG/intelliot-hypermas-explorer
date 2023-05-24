module.exports = {
  srcDirectory: "../src/",
  mongoURL: 'mongodb://127.0.0.1:27017/masDB',
  port: 8000,

  runtimeProtocol: "http",
  runtimeHostname: "127.0.0.1",
  runtimePort: 8088,
  runtimeMock: false,

  environmentProtocol: "http",
  environmentHostName: "127.0.0.1",
  environmentPort: 3000,
  environmentInterface: "simulator"
}
