// Yggdrasil Interface
// Interactions Research Group, University of St.Gallen
// This module handles all callbacks to the Hypermedia MAS Infrastructure

var yggdrasilHostname = 'yggdrasil.interactions.ics.unisg.ch'
var yggdrasilUrl = window.location.protocol + '//' + yggdrasilHostname

const EVE = $rdf.Namespace('http://w3id.org/eve#');
const fetcherTimeout = 5000 // 5000 ms timeout

var yggdrasilInterface = {

  fetchEnvironments: function (callback) {
    log.fine("Fetching Yggdrasil environments");

    $.ajax({
      type: 'GET',
      url: yggdrasilUrl + '/',
      headers: {
        'Accept-Language': currentLanguage,
      },
      dataType: 'json',
      cache: false,
      async: true,
      timeout: yggdrasilInterface.default_timeout,
    }).done(function (result) {
      log.fine("Success: fetchModules");
      callback(result);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      log.error('Failure fetching module types: ' + jqXHR.statusText);
    })
  },

  fetchWorkspacesInEnvironment: function (environmentSlug) {
    var store = $rdf.graph();
    var fetcher = new $rdf.Fetcher(store, fetcherTimeout);
    var url = yggdrasilUrl + '/environments/' + environmentSlug;

    return new Promise((resolve, reject) => {
      fetcher.nowOrWhenFetched(url, function (ok, body, xhr) {
        if (!ok) {
          reject("Unable to fetch data!")
        } else {
          var fetchedWorkspaces = yggdrasilInterface.getWorkspacesFromEnvironment(url, store);
          var workspacesInformation = [];
          for (var i = 0; i < fetchedWorkspaces.length; i++) {
            var workspaceUri = fetchedWorkspaces[i].uri;
            var workspaceTitle = workspaceUri.split(/[\/]+/).pop(); // Find last URI path fragment
            var currentWorkspace = {
              name: workspaceTitle,
              uri: workspaceUri
            };
            workspacesInformation.push(currentWorkspace);
          }
          resolve(workspacesInformation);
        }
      })
    })
  },

  fetchArtifactsInWorkspace: function (workspaceUri) {
    var store = $rdf.graph();
    var fetcher = new $rdf.Fetcher(store, fetcherTimeout);

    return new Promise((resolve, reject) => {
      fetcher.nowOrWhenFetched(workspaceUri, function (ok, body, xhr) {
        if (!ok) {
          reject("Unable to retrieve artifacts from ")
        } else {
          var fetchedArtifacts = yggdrasilInterface.getArtifactsFromWorkspace(workspaceUri, store)
          this.artifactsInformation = [];
          // TODO: This currently just unpacks the artifact information, it's unnecessary. 
          // Clean up when functional. ?????
          for (var i = 0; i < fetchedArtifacts.length;i++) {
          var artifactUri = fetchedArtifacts[i].uri;
          var artifactInformation = {
            uri: artifactUri,
            affordances: []
            };
          this.artifactsInformation.push(artifactInformation);
          }   
          // TODO If the TD is available as JSON-LD, we can directly use nodewot
          // log.debugSeparate('Artifact Information', containedArtifacts[0])
          // td.fetchWoTThing(containedArtifacts[0].value)
  
          resolve(artifactsInformation)
        }
      })
    })
  },

  resolveArtifactAffordances: function (artifactUri) {
    var store = $rdf.graph();
    var fetcher = new $rdf.Fetcher(store, fetcherTimeout);

    return new Promise((resolve, reject) => {
      console.log(artifactUri)
      fetcher.nowOrWhenFetched(artifactUri, function (ok) {
        if (!ok) {
          reject(`Unable to fetch data from artifact: ${artifactUri}`)
        } else {
          affordancesMetadata = td.getAffordancesFromTD(artifactUri, store);
          currentArtifactTitle = td.resolveArtifactTitle(artifactUri, store);

          artifactInformation = {
            uri: artifactUri,
            title: currentArtifactTitle,
            affordances: affordancesMetadata,
            rdfStore: store
          }

          log.debugSeparate('Artifact ' + $rdf.sym(artifactUri) + ' Information', artifactInformation);
          resolve(artifactInformation);
        }
      });
    });
  },

  /* Helper Functions */

  getWorkspacesFromEnvironment: function (environmentUrl, rdfStore) {
    var thisEnvironment = $rdf.sym(environmentUrl);
    // TODO: Verify that this is actually a workspace
    return rdfStore.each(thisEnvironment, EVE('contains'));
  },

  getArtifactsFromWorkspace: function (workspaceUrl, rdfStore) {
    // TODO: Verify that this is actually an artifact
    return rdfStore.each($rdf.sym(workspaceUrl), EVE('contains'));
  }
}