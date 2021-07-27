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

  fetchWorkspacesInEnvironment: function (environmentSlug, callback) {
    log.fine("Fetching Yggdrasil workspaces in environment " + environmentSlug);

    var store = $rdf.graph();
    var fetcher = new $rdf.Fetcher(store, fetcherTimeout);
    var url = yggdrasilUrl + '/environments/' + environmentSlug;

    fetcher.nowOrWhenFetched(url, function(ok, body, xhr) {
      if (!ok) {
        log.error("Unable to fetch data!");
      } else {
        log.fine("Workspaces retrieved.")

        containedWorkspaces = yggdrasilInterface.getWorkspacesFromEnvironment(url, store);

        log.fine('Environment ' + environmentSlug + ' contains ' + containedWorkspaces.length + ' workspace(s)!');
        callback(containedWorkspaces, true);
      }
    })
  },

  fetchArtifactsInWorkspace: function (workspaceUri, callback) {
    log.fineSeparate("Fetching artifacts from Yggdrasil workspace ", workspaceUri);

    var store = $rdf.graph();
    var fetcher = new $rdf.Fetcher(store, fetcherTimeout);

    fetcher.nowOrWhenFetched(workspaceUri, function(ok, body, xhr) {
      if (!ok) {
        log.error("Unable to fetch data!");
      } else {
        var containedArtifacts = yggdrasilInterface.getArtifactsFromWorkspace(workspaceUri, store)
        log.fine($rdf.sym(workspaceUri) + ' contains ' + containedArtifacts.length + ' artifacts(s)!');

        // TODO If the TD is available as JSON-LD, we can directly use nodewot
        // log.debugSeparate('Artifact Information', containedArtifacts[0])
        // td.fetchWoTThing(containedArtifacts[0].value)

        callback(containedArtifacts, true);
      }
    })
  },

  resolveArtifactsAffordances: function (artifactsInformation, callback) {
    log.fineSeparate("Fetching artifacts information from Yggdrasil", artifactsInformation);

    for (var i = 0; i < artifactsInformation.length; i++) {
      if (artifactsInformation[i].includes('-3d') || artifactsInformation[i].includes('cherrybot')) {
        log.error('Ignoring: ' + artifactsInformation[i]);
      } else {
        artifactAffordances = yggdrasilInterface.resolveArtifactAffordances(artifactsInformation[i]);

        artifactAffordances.then(
          function(artifactInformationWithAffordances) {
            log.debug(artifactInformationWithAffordances);
            callback(artifactInformationWithAffordances);
          },
          function(error) { log.error('Error resolving the promise!') }
        );
      }
    }
  },

  resolveArtifactAffordances: function (artifactUri) {
    log.fineSeparate('Fetching individual artifact information from Yggdrasil', artifactUri);

    var store = $rdf.graph();
    var fetcher = new $rdf.Fetcher(store, fetcherTimeout);

    return new Promise(function(resolve, reject) {
      fetcher.nowOrWhenFetched(artifactUri, function(ok) {
        if (!ok) {
          log.error("Unable to fetch artifact data!");
        } else {
          affordancesMetadata = td.getAffordancesFromTD(artifactUri, store);
          currentArtifactTitle = td.resolveArtifactTitle(artifactUri, store);

          artifactInformation = {
            uri: artifactUri,
            title: currentArtifactTitle,
            affordances: affordancesMetadata,
            rdfStore: store
          }

          log.fineSeparate('Artifact ' + $rdf.sym(artifactUri) + ' Information', artifactInformation);
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
