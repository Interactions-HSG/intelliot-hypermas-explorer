const controller = new ArtifactsController();

const main = {
  init: async function () {
    var location = window.location.href
    var workspace = location.slice(location.lastIndexOf('/')+1, location.length)
    var env = location.slice(0,location.lastIndexOf('/'))
    env = env.slice(env.lastIndexOf('/')+1, env.length)
    console.log(location)
    console.log(workspace)
    console.log(env)
    helpers.registerHelpers();
    await controller.reloadArtifactsFromWorkspace(env, workspace)
    controller.showArtifactsBar();
  }
}

$(document).ready(main.init);