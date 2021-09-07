// Dashboard startup and control functions
// Interactions Research Group, University of St.Gallen
// Based on work by Simon Mayer / Pro2Future AG (2017)

var main = {
  init: function () {
    log.debug('init dashboard');

    Handlebars.registerHelper("half", function (value, options) {
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
    dashboard.init();
  }
}

$(document).ready(main.init);