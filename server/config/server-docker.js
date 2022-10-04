module.exports = {
  srcDirectory: "../src/",
  mongoURL: process.env.MONGO_URL,
  port: 80,

  environmentProtocol: "http",
  environmentHostName: "host.docker.internal",
  environmentPort: 3000,
  environmentInterface: "yggdrasil-agents"
}