var helpers = {
  registerHelpers: function() {
    Handlebars.registerHelper("delay", function (value, options) {
      return parseInt(value) / 10;
    });

    Handlebars.registerHelper("average", function(type, ...values){
      values = values.slice(0,-1)
      var avg = values.reduce((a,b) => a+b, 0) / values.length;
      if(type == 'integer')
        return avg.toFixed()
      else 
        return avg.toFixed(2)
    })

    Handlebars.registerHelper("currentTime", function() {
      return  new Date().toLocaleTimeString('en-US', { hour12: false});
    })
  
    Handlebars.registerHelper("isObjectType", function (value) {
      return value == 'object'
    });
    Handlebars.registerHelper("isNumericType", function (value) {
      return value == 'number' || value == 'integer'
    });
    Handlebars.registerHelper("isBooleanType", function (value) {
      return value == 'boolean'
    });
    Handlebars.registerHelper("isStringType", function (value) {
      return value == 'string'
    });

    Handlebars.registerHelper("toList", function (value) {
      return Object.keys(value).map(x => {
        return {
          key: x,
          value: value[x]
        }
      })
    });

    Handlebars.registerPartial('schemaInput', Handlebars.templates.schemaInput);
  }
}