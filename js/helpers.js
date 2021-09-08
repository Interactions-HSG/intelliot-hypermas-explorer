var helpers = {
  registerHelpers: function() {
    Handlebars.registerHelper("delay", function (value, options) {
      return parseInt(value) / 10;
    });
  
    Handlebars.registerHelper("truncateHash", function (value, options) {
      if (value.includes("#")) return value.split("#")[1]
      else return value;
    });
  
    Handlebars.registerHelper("minWith2Decimals", function (value1, value2, options) {
      if (value1 < value2)
        return parseFloat(value1).toFixed(2);
      else
        return parseFloat(value2).toFixed(2);
    });
  
    Handlebars.registerHelper("with2Decimals", function (value, options) {
      var num = parseFloat(value);
      return num.toFixed(2);
    });
  }
}