// W3C WoT Thing Description Handlers
// Interactions Research Group, University of St.Gallen

const TD = $rdf.Namespace('https://www.w3.org/2019/wot/td#');
const DCT = $rdf.Namespace('http://purl.org/dc/terms/');
const HTTP = $rdf.Namespace('http://www.w3.org/2011/http#');
const HCTL = $rdf.Namespace('https://www.w3.org/2019/wot/hypermedia#');
const JS = $rdf.Namespace('https://www.w3.org/2019/wot/json-schema#');
const RDFS = $rdf.Namespace('');

// TODO: Most of this should not be done manually here but should be reused from node-wot. However, we have an incompatibility between yggdrasil's current TD representation and what node-wot can consume

var td = {

	resolveArtifactTitle: function(artifactUri, artifactRdfStore) {

		artifactTitle = artifactRdfStore.any($rdf.sym(artifactUri), DCT('title'));

		if (artifactTitle == undefined) {
			// Fall back to URI
			artifactTitle = artifactUri.split(/[\/]+/).pop();  // Find last URI path fragment
		}

		return artifactTitle;
	},

	getAffordancesFromTD: function(artifactUri, artifactRdfStore) {
		affordancesMetadata = {};

		td.getAffordances(artifactUri, TD("hasPropertyAffordance"), artifactRdfStore, affordancesMetadata);
		td.getAffordances(artifactUri, TD("hasActionAffordance"), artifactRdfStore, affordancesMetadata);
		td.getAffordances(artifactUri, TD("hasEventAffordance"), artifactRdfStore, affordancesMetadata);

		log.debugSeparate('Found these affordances', affordancesMetadata);

		return affordancesMetadata;
	},

	getAffordances: function(artifactUri, affordanceRelation, artifactRdfStore, affordancesMetadata) {
		artifactRdfStore.each($rdf.sym(artifactUri), affordanceRelation).forEach((affordanceBlankNode) => {

			titleValue = "No name given";
			title = artifactRdfStore.any((affordanceBlankNode), TD('name'));
			if (title != null) {
				titleValue = title.value;
			} else {
				title = artifactRdfStore.any((affordanceBlankNode), DCT('title'));
				if (title != null) {
					titleValue = title.value;
				}
			}

			descriptionValue = "No description given";
			description = artifactRdfStore.any((affordanceBlankNode), DCT('description'));
			if (description != null) descriptionValue = description.value;

			log.debug('Found affordance: ' + title);

			affordancesMetadata[affordanceBlankNode.value] = {
				affordanceNode: affordanceBlankNode,
				affordanceTitle: titleValue,
				affordanceDescription: descriptionValue,
				affordanceArtifact: artifactUri
			};
		});
	},

	hasInputSchema: function(affordanceId, rdfStore) {
		log.fine('Affordance ' + affordanceId);
		inputSchemaBlankId = rdfStore.any((affordanceId), TD("hasInputSchema"));
		log.fine('Input Schema: ' + inputSchemaBlankId);
		return (inputSchemaBlankId != undefined);
	},

	// TODO: Currently only works for non-nested IntegerSchemas
	getInputSchema: function(affordanceBlankNode, rdfStore) {

		log.fineSeparate('Affordance Blank Node', affordanceBlankNode);

		if (!td.hasInputSchema(affordanceBlankNode, rdfStore)) {
			log.error('Input schema requested for affordance without input schema. Returning null.');
			return null;
		}

		inputSchemaBlankId = rdfStore.any((affordanceBlankNode), TD("hasInputSchema"));
		log.fine('Affordance ' + affordanceBlankNode + ' schema: ' + inputSchemaBlankId);

		propertiesBlankIds = rdfStore.each(inputSchemaBlankId, JS("properties"));

		var inputSchema = {
			schemaType: 'ObjectSchema',	// TODO Actual schema needs to go here
			properties: []
		};

		for (var i = 0; i < propertiesBlankIds.length; i++) {
			propertiesBlankId = propertiesBlankIds[i];
			log.fineSeparate('properties', propertiesBlankId);

			propertyName = rdfStore.any(propertiesBlankId, JS('propertyName'));
			log.fineSeparate('propertyName', propertyName.value);

			thisSchema = {
				schemaType: 'IntegerSchema',			// TODO Actual schema needs to go here
				propertyName: propertyName.value
			};

			// Of no use. Should be handled through thingwot anyway
			propertyMaximum = rdfStore.any(propertiesBlankId, JS('maximum'));
			if (propertyMaximum != undefined) {
				log.fineSeparate('propertyMaximum', propertyMaximum.value);
			}

			// Of no use. Should be handled through thingwot anyway
			propertyMinimum = rdfStore.any(propertiesBlankId, JS('minimum'));
			if (propertyMinimum != undefined) {
				log.fineSeparate('propertyMinimum', propertyMinimum.value);
			}

			requiredProperties = rdfStore.any(inputSchemaBlankId, JS('required'));
			if (requiredProperties != undefined) {
				log.fineSeparate('requiredProperties', requiredProperties.value);
				inputSchema['requiredProperties'] = requiredProperties.value;
			}

			inputSchema['properties'].push(thisSchema);
		}

		return inputSchema;
	},

	followAffordance: function(affordanceBlankNode, rdfStore, inputData, callback) {

		log.fineSeparate('Affordance Blank Node', affordanceBlankNode);

		formBlankNode = rdfStore.any(affordanceBlankNode, TD("hasForm"));

		log.debugSeparate('Form Blank Node', formBlankNode);

		// TODO: Most of this is not required but kept for reference.
		methodName = "GET"
		if (rdfStore.any(formBlankNode,  HTTP("methodName")) != null) {
			methodName = rdfStore.any(formBlankNode,  HTTP("methodName")).value;
		}
		log.debug(`${HTTP("methodName")} : ${methodName}`);

		contentType = "application/json"
		if (rdfStore.any(formBlankNode,  HCTL("forContentType")) != null) {
			contentType = rdfStore.any(formBlankNode,  HCTL("forContentType")).value;
		}
		log.debug(`${HCTL("forContentType")} : ${contentType}`);

		// operationType = rdfStore.any(formBlankNode,  HCTL("hasOperationType")).value;
		// log.debug(`${HCTL("hasOperationType")} : ${operationType}`);

		target = rdfStore.any(formBlankNode,  HCTL("hasTarget")).value;
		log.debug(`${HCTL("hasTarget")} : ${target}`);

		// TODO This should obviously not be static numbers
		td.doRequest(target, methodName, contentType, inputData, callback);
	},

	doRequest: function (requestUri, requestMethod, contentType, payload, callback) {

		log.debug(payload);

		if (requestMethod == 'GET') {
			log.debug('Doing GET request...');

			ajaxObject = {
				type: requestMethod,
				url: requestUri,
				success: function (msg) {
					callback(msg);
				}
			};

			log.debug(ajaxObject);
			$.ajax(ajaxObject);
		} else if (requestMethod == 'PUT' || requestMethod == 'POST') {
			log.debug('Doing PUT/POST request...');

			if (requestUri.includes('leubot1')) {
				log.debug(requestUri)
				requestUri = requestUri.replace('https://api.interactions.ics.unisg.ch/leubot1/v1.2/', 'http://10.2.1.13:6789/leubot1/v1.2/');
				log.debug(requestUri)
			}

			ajaxObject = {
				type: requestMethod,
				url: requestUri,
				success: function (msg) {
					callback(msg);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					log.debug('Request failed');
					log.debug(textStatus);
					log.debug(errorThrown);
					log.error(jqXHR);
				}
			};

			if (payload != null) {
				ajaxObject['data'] = JSON.stringify(payload);
				ajaxObject['contentType'] = 'application/json';
				ajaxObject['dataType'] = 'json';
			}

			if (requestUri.includes('leubot1')) {
				ajaxObject['headers'] = { 'Content-Type': 'application/json', 'X-API-Key': 'opensesame' };
			} else {
				ajaxObject['headers'] = { 'Content-Type': 'application/json' };
			}

			log.debug(ajaxObject);
			$.ajax(ajaxObject);
		} else {
			log.debug(requestMethod + ' not implemented');
		}

		/*
		$.ajax({
		url: requestUri,
		type: requestMethod,
		data: JSON.stringify(payload),
		//dataType: contentType,
		success: function(data) {
		log.debug('Request was successful.');
		log.debug(data)
	},
	error: function(jqXHR, textStatus, errorThrown) {
	log.debug('Request failed');
	log.debug(textStatus);
	log.debug(errorThrown);
	log.error(jqXHR);
}
})*/
},

// Incomplete, but shows bridge to thingweb
fetchWoTThing: function (thingUri) {
	var servient = new Wot.Core.Servient();
	var helpers = new Wot.Core.Helpers(servient);

	servient.start().then((thingFactory) => {
		helpers.fetch(thingUri).then((td) => {
			thingFactory.consume(td)
			.then((thing) => {
				let td = thing.getThingDescription();

				log.debugSeparate('Thing', td);

				for ( let property in td.properties ) {
					log.debug(property)
				};
			});
		}).catch((error) => {
			log.error("Could not fetch TD.\n" + error)
		})
	})
},
}
