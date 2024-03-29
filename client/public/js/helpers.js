const helpers = {
  registerHelpers: function() {
    Handlebars.registerHelper("delay", function (value, options) {
      return parseInt(value) / 10;
    });

    Handlebars.registerHelper("average", function(type, ...values){
      values = values.slice(0,-1).filter(x => x)
      if(values.length > 0){
        var avg = values.reduce((a,b) => a+b, 0) / values.length;
        if(type == 'integer')
          return avg.toFixed()
        else 
          return avg.toFixed(2)
      } else {
        return 0
      }
    })

    Handlebars.registerHelper("isInArray", function(item, array){
      return array? array.includes(item) : false;
    });
    Handlebars.registerHelper("currentTime", () => new Date().toLocaleTimeString('en-US', { hour12: false}));
    Handlebars.registerHelper({
      "isObjectType": (value) => value == 'object',
      "isNumberType": (value) => value == 'number',
      "isIntegerType": (value) => value == 'integer',
      "isBooleanType": (value) => value == 'boolean',
      "isStringType": (value) => value == 'string',
      "isArrayType": (value) => value == 'array',
    });

    Handlebars.registerHelper("toList", (value) => utils.toList(value));

    Handlebars.registerHelper("toString",(value) => JSON.stringify(value));

    //Partials
    Handlebars.registerPartial('schemaInput', Handlebars.templates.schemaInput);

    Handlebars.registerHelper('if_eq', function(a, b, opts) {
      if(a == b)
          return opts.fn(this);
      else
          return opts.inverse(this);
    });
  }
}