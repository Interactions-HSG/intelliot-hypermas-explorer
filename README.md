# intelliot-hypermas-explorer
A stub for the Web-based IDE for Hypermedia MAS in the IntellIoT project. 

Allow the dynamic discovery of artifacts and produce [Jason](http://jason.sourceforge.net/wp/) code from a block language powered by [Blockly](https://github.com/google/blockly/)

# Use this repository
To use this repository you have open a shell in the root folder and execute the command
`./setup.sh`

This application depends on an experimental version of [yggdrasil](https://github.com/Interactions-HSG/yggdrasil). In order to have that properly set up you need to clone the yggdrasil repository and update the submodule of the **wot-td-library** to point to [this](https://github.com/samubura/wot-td-java) repository.

Then you need to have an instance running (on your machine or anywhere else) and setup the proper configuration in the *server/config.js* file. 

To run yggdrasil execute the command `./gradlew run`

Then to launch the backend application you need to execute the command 
`./launchFrontend.sh`
