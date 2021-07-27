// Hypermedia MAS Explorer
// Interactions Research Group, University of St.Gallen
// Based on work by Ralf Mosshammer / Siemens AG (2015) and Simon Mayer / Pro2Future AG (2017)
//
// Main UI controls and handlers, talks to Yggdrasil via yggdrasilInterface.js

var content = {

  currentEnvironment: "",
  currentArtifacts: {},
  currentAffordances: {},

  // jquery shortcuts
  $headerOptionsContainer: $('#header-options-container'),
  $artifactsScrollContainer: $('#artifacts-scroll-container'),
  $affordancesScrollContainer: $('#affordances-scroll-container'),
  $workspaceChooser: $('#workspace-chooser'),

  clickHandlerTypes: {
    'selectArtifact' : 'selectArtifact',
    'followAffordance' : 'followAffordance',
    'selectWorkspace' : 'selectWorkspace',
  },

  init: function () {
    log.fine('Initializing the dashboard and loading data from Yggdrasil...');

    // Load Environment
    content.currentEnvironment = "intelliot";
    yggdrasilInterface.fetchWorkspacesInEnvironment(content.currentEnvironment, content.fetchWorkspacesCallback);
  },

  clickHandler: function (event) {
    log.fine("User selected '" + event.data.name + " / " + event.data.type + "'");

    if (event.data.type == content.clickHandlerTypes.selectWorkspace) {
      // Re-Initialize Dashboard
      content.hideAffordancesBar();
      content.hideArtifactsBar();
      content.currentArtifacts = {};

      yggdrasilInterface.fetchArtifactsInWorkspace(event.data.name, content.fetchArtifactsCallback);
    } else if (event.data.type == content.clickHandlerTypes.selectArtifact) {
      currentArtifactUri = event.data.name;
      content.updateAffordancesBar(event.data.name);
    } else if (event.data.type == content.clickHandlerTypes.followAffordance) {
      currentAffordanceId = event.data.name;
      content.followAffordance(currentAffordanceId);
    } else {
      log.error("##### UNHANDLED EVENT: " + event.data.type);
    }
  },

  updateAssetInspector: function (doAnimate) {
    var workspacesInformation = content.workspacesInformation;

    log.fineSeparate('Updating inspector...', workspacesInformation);

    // Remove all options in workspace-chooser
    if (workspacesInformation.length > 0) {
      content.$workspaceChooser.find('option').remove();
      content.$workspaceChooser.append(new Option("Select Workspace...", "empty"));
    }

    // Add workspaces to workspace-chooser
    for (workspaceIndex in workspacesInformation) {
      workspaceInformation = workspacesInformation[workspaceIndex];
      content.$workspaceChooser.append(new Option(workspaceInformation.title, workspaceInformation.uri));
    }

    // Set change handler for workspaces chooser
    content.$workspaceChooser.change( function () {
      var mockedClickEvent = { "data": { name: this.options[this.selectedIndex].value, type: content.clickHandlerTypes.selectWorkspace } };
      content.clickHandler(mockedClickEvent);
    });
  },

  hideArtifactsBar: function () {
    content.$artifactsScrollContainer.hide();
  },

  updateArtifactsBar: function (doAnimate) {
    var currentArtifacts = content.currentArtifacts;

    log.fine('Updating inspector with information on all ' + Object.keys(currentArtifacts).length + ' artifacts.');

    // Count affordances to simplify handlebar's life
    for (const [currentArtifactUri, currentArtifactInformation] of Object.entries(currentArtifacts)) {
      currentArtifacts[currentArtifactUri]['numAffordances'] = Object.keys(currentArtifacts[currentArtifactUri].affordances).length;
    }

    // Hand over to handlebars
    log.fineSeparate('All Artifacts To Handlebars', currentArtifacts);
    var $artifactsContent = Handlebars.templates.artifactsList({ currentArtifacts: currentArtifacts, animate: true });
    content.$artifactsScrollContainer.empty().show().append($artifactsContent);

    content.addClickHandlersToCurrentArtifacts(currentArtifacts);
  },

  hideAffordancesBar: function () {
    content.$affordancesScrollContainer.hide();
  },

  updateAffordancesBar: function (currentArtifactUri) {
    artifactRdfStore = content.currentArtifacts[currentArtifactUri].rdfStore;
    artifactAffordances = content.currentArtifacts[currentArtifactUri].affordances;
    log.fine('Updating inspector with information on ' + Object.keys(artifactAffordances).length + ' affordances of ' + content.currentArtifacts[currentArtifactUri].title);

    // Extend affordances descriptor with input schema. Do the graph walking here to simplify the templates
    for (const affordanceTitle in artifactAffordances) {
      affordanceNode = artifactAffordances[affordanceTitle].affordanceNode;

      log.fine('Requesting: ' + affordanceNode)
      affordanceHasInputSchema = td.hasInputSchema(affordanceNode, artifactRdfStore);
      artifactAffordances[affordanceNode.value]['hasInputSchema'] = affordanceHasInputSchema;

      if (affordanceHasInputSchema) {
        affordanceInputSchema = td.getInputSchema(affordanceNode, artifactRdfStore);
        log.debugSeparate(affordanceTitle, affordanceHasInputSchema);
        artifactAffordances[affordanceNode.value]['inputSchema'] = affordanceInputSchema;
      }
    }

    // Update global affordances information
    content.currentAffordances = artifactAffordances;
    currentAffordanceIds = Object.keys(artifactAffordances);

    // Hand over to handlebars
    log.debugSeparate('All Affordances to Handlebars', artifactAffordances);
    var $affordancesContent = Handlebars.templates.affordancesList({ currentAffordances: artifactAffordances, animate: true });
    content.$affordancesScrollContainer.empty().show().append($affordancesContent);

    content.addClickHandlersToCurrentAffordances(currentAffordanceIds);
  },

  followAffordance: function (affordanceId) {
    log.fine('Following ' + affordanceId);
    affordanceInformation = content.currentAffordances[affordanceId]
    artifactInformation = content.currentArtifacts[affordanceInformation['affordanceArtifact']]

    log.fineSeparate('Affordance Information', affordanceInformation);
    log.fineSeparate('Artifact Information', artifactInformation);

    // Assemble input data according to request
    // This part should definitely be done using node-wot; however, this needs to be synchronized with wot-td (i.e., yggdrasil needs to provide json TDs that node-wot can parse)
    if (affordanceInformation.hasInputSchema) {
      log.error('Requests with input schemas are not fully implemented yet');

      inputData = {};

      $("div[id='" + affordanceId + "']").find("input").each(function(index) {
        log.fine( index + ": " + $(this).attr('id') + ' --- ' + $(this).val() );
        inputData[$(this).attr('id')] = $(this).val();
      })

      log.fine(inputData);

      affordanceResponse = td.followAffordance(affordanceInformation['affordanceNode'], artifactInformation.rdfStore, inputData);
      log.debugSeparate('Received Response', affordanceResponse);
    } else {
      inputData = undefined;
      affordanceResponse = td.followAffordance(affordanceInformation['affordanceNode'], artifactInformation.rdfStore, inputData);
      log.debugSeparate('Received Response', affordanceResponse);
    }
  },

  /* Yggdrasil Interface Callbacks */

  fetchWorkspacesCallback: function (workspacesInformation, animateWorkspaces) {
    log.fine(workspacesInformation);

    content.workspacesInformation = [];

    for (var i = 0; i < workspacesInformation.length;i++) {
      workspaceUri = workspacesInformation[i].uri;
      workspaceTitle = workspaceUri.split(/[\/]+/).pop();  // Find last URI path fragment

      var thisWorkspace = {
        title : workspaceTitle,
        uri : workspaceUri
      };

      content.workspacesInformation.push(thisWorkspace);
    }

    log.fine(content.workspacesInformation);

    content.updateAssetInspector(animateWorkspaces);
    content.revealDashboard();
  },

  fetchArtifactsCallback: function (artifactsInformation, animateArtifacts) {
    log.fine(artifactsInformation);

    content.artifactsInformation = [];

    // TODO: This currently just unpacks the artifact information, it's unnecessary. Clean up when functional.
    for (var i = 0; i < artifactsInformation.length;i++) {
      artifactUri = artifactsInformation[i].uri;
      artifactInformation = {
        uri: artifactUri,
        affordances: []
      };

      log.fine('Resolving artifact ' + artifactUri);
      content.artifactsInformation.push(artifactUri);
    }

    log.fine(content.artifactsInformation);

    // Fetch artifact affordances
    yggdrasilInterface.resolveArtifactsAffordances(content.artifactsInformation, content.fetchAffordancesCallback);
  },

  fetchAffordancesCallback: function (artifactsInformation, animateArtifacts) {

    if (artifactsInformation.affordances == undefined) {
      log.debug('Artifact ' + artifactsInformation.uri + ' does not provide any affordances.');
    } else {
      log.debug('Fetched ' + Object.keys(artifactsInformation.affordances).length + ' affordances for artifact.');
    }

    artifactUri = artifactsInformation.uri;

    // Update global artifacts/affordances list
    if (content.currentArtifacts.hasOwnProperty(artifactUri)) {
      log.debug('Artifact ' + artifactUri + ' already exists - updating affordances!');
    }

    content.currentArtifacts[artifactUri] = artifactsInformation;

    log.fine('Current Artifacts Map');
    log.fine(content.currentArtifacts);

    content.updateArtifactsBar(animateArtifacts);
  },

  /** Utilities **/

  revealDashboard: function () {
    window.setTimeout(function () {
      dashboard.$loading.fadeOut(300);
      dashboard.$container.fadeIn(300);
      content.$headerOptionsContainer.removeClass("hidden");
      content.$headerOptionsContainer.addClass("centered-element");
    }, 500);
  },

  addClickHandlersToCurrentArtifacts: function (currentArtifacts) {
    currentArtifactUris = Object.keys(currentArtifacts);
    numArtifacts = currentArtifactUris.length;

    // Add click handlers to module links
    for (var i = 0; i < numArtifacts; i++) {
      currentArtifact = currentArtifactUris[i];
      log.debug("Attaching click handler to " + currentArtifact);
      $("div[id='" + currentArtifact + "']").click({ name: currentArtifact, type: content.clickHandlerTypes.selectArtifact }, content.clickHandler);
    }
  },

  addClickHandlersToCurrentAffordances: function (currentAffordanceIds) {
    numAffordances = currentAffordanceIds.length;

    // Add click handlers to module links
    for (var i = 0; i < numAffordances; i++) {
      var currentAffordance = currentAffordanceIds[i]
      log.debug("Attaching click handler to " + currentAffordance)
      $("div[id='" + currentAffordance + "']").find("div[id=follow-affordance-button]").click({ name: currentAffordance, type: content.clickHandlerTypes.followAffordance }, content.clickHandler);
    }
  },

  highlightSelected: function () {
    log.debug("Trigger: " + content.currentTestModuleType)
    $("[element=testingModuleType]").each(function() {
      if ($(this).attr('id') === content.currentTestModuleType) $(this).addClass("highlightBold")
      else $(this).removeClass("highlightBold")
    })
  },

  scrollAllListsToTop: function() {
    $('body, html, #artifacts-scroll-container').scrollTop(0);
    $('body, html, #affordances-scroll-container').scrollTop(0);
  },

  getFormattedDate: function () {
    var d = new Date();
    d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + "T" + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    return d;
  },

  uuidv4: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  copy: function(that){
    var inp = document.createElement('input');
    document.body.appendChild(inp)
    inp.value = encodeURIComponent(that.textContent)
    inp.select();
    document.execCommand('copy', false);
    inp.remove();
  }
}
