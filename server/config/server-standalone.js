module.exports = {
  srcDirectory: "../src/",
  mongoURL: 'mongodb://localhost:27017/masDB',
  port: 8000,

  runtimeProtocol: "http",
  runtimeHostname: "localhost",
  runtimePort: 8088,
  runtimeMock: false,

  environmentProtocol: "http",
  environmentHostName: "10.2.2.187",
  environmentPort: 3000,
  environmentInterface: "simulator"
}