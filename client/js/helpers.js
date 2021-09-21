var helpers = {
  registerHelpers: function() {
    Handlebars.registerHelper("delay", function (value, options) {
      return parseInt(value) / 10;
    });

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