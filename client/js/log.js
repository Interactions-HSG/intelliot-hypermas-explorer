// Logging functions
// Interactions Research Group, University of St.Gallen
// Based on work by Ralf Mosshammer / Siemens AG (2015) and Simon Mayer / Pro2Future AG (2017)

var log = {

	fine: function(text) {
		if(typeof console !== 'undefined')  {
			//console.log(text);
		}
	},

	fineSeparate : function(label, content) {
		if(typeof console !== 'undefined')  {
			//console.log('---- ' + label + ' start ----');
			//console.log(content);
			//console.log('---- ' + label + ' end ----');
		}
	},

	debug: function(text) {
		if(typeof console !== 'undefined')  {
			//console.log(text);
		}
	},

	debugSeparate : function(label, content) {
		if(typeof console !== 'undefined')  {
			//console.log('---- ' + label + ' start ----');
			//console.log(content);
			//console.log('---- ' + label + ' end ----');
		}
	},

	error : function(text) {
		if(typeof console !== 'undefined')  {
			console.error(text);
		}
	},

	errorSeparate : function(label, content) {
		if(typeof console !== 'undefined')  {
			console.error('---- ' + label + ' start ----');
			console.error(content);
			console.error('---- ' + label + ' end ----');
		}
	},

}
