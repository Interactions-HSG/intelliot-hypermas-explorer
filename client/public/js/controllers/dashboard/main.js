// Dashboard startup and control functions
// Interactions Research Group, University of St.Gallen
// Based on work by Simon Mayer / Pro2Future AG (2017)

const dashboard = new Dashboard();

const main = {
  init: function () {
    helpers.registerHelpers();
    dashboard.init();
  }
}

$(document).ready(main.init);