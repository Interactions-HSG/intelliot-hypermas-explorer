# intelliot-hypermas-explorer
This Web-based IDE for Hypermedia MAS in the IntellIoT project allows the dynamic discovery of artifacts and production of [Jason](http://jason.sourceforge.net/wp/) code from a block language powered by [Blockly](https://github.com/google/blockly/). It also permits managing the definition of agent source files and the deployment of MAS configurations to a runtime environment implemented by the [MAS REST Runtime](https://github.com/samubura/mas-rest-runtime)

## Setup
1. To start using this repository you have open a shell in the root folder and execute the command
`./setup.sh`

2. Then you either need to setup docker on your machine or to setup a mongoDB instance either locally or remote if you prefer to launch the application without virtualization.
(The standalone launch script launches the mongoDB instance locally through the `mongod` command)

3. This application use an experimental version of [yggdrasil](https://github.com/samubura/yggdrasil). In order to have that properly set up you need to clone the yggdrasil repository and update the submodule of the **wot-td-library** to point to [this](https://github.com/samubura/wot-td-java) repository.
Then you need to have an instance running (on your machine or anywhere else) and setup the proper configuration in the server config file. 
To run yggdrasil execute the command `./gradlew run`. If you don't want to use yggdrasil you can modify the mock already implemented for testing purposes in the *server/src/services/yggdrasil-service* folder.

4. This application depends on the [MAS REST Runtime](https://github.com/samubura/mas-rest-runtime) to execute the agents programmed trhough the web app. Be sure to clone the repository and launch that setting up the proper configuration values in the server config file.

## Run the application
The application can be launched as a docker application by running `./launchDocker.sh` or as a standalone application by running `./launchStandalone.sh` from the root folder of the project. We suggest using the Chrome browser to navigate the frontend app.
