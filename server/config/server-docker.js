module.exports = {
  srcDirectory: "../src/",
  mongoURL: process.env.MONGO_URL,
  port: 80,

  yggdrasilProtocol: "http",
  yggdrasilHostName: "host.docker.internal",
  yggdrasilPort: 3000,
  yggdrasilInterface: "yggdrasil"
}