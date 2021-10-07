(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['affordancesList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":25,"column":11}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":8,"column":6},"end":{"line":12,"column":13}}})) != null ? stack1 : "")
    + "          <form id=\"form_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":13,"column":25},"end":{"line":13,"column":31}}}) : helper)))
    + "\" class=\"affordance-form\" name=\"property\">\r\n            <div class=\"card-header property-color-reverse\">\r\n              <div class=\"card-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":15,"column":38},"end":{"line":15,"column":44}}}) : helper)))
    + "</div>\r\n              <button type=\"submit\" form=\"form_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":47},"end":{"line":16,"column":53}}}) : helper)))
    + "\" class=\"clickable rounded-pill badge test-affordance\">\r\n                Test\r\n              </button>\r\n            </div>\r\n            <div class=\"card-body\">\r\n              <p class=\"card-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":21,"column":35},"end":{"line":21,"column":50}}}) : helper)))
    + "\r\n            </div>\r\n          </form>\r\n        </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div id=\"property_"
    + alias3(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":9,"column":26},"end":{"line":9,"column":32}}}) : helper)))
    + "\" class=\"card dashcard slide-in-left\" style=\"animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":9,"column":93},"end":{"line":9,"column":109}}}))
    + "s -webkit-animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":9,"column":135},"end":{"line":9,"column":151}}}))
    + "s\">\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div id=\"property_"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":11,"column":26},"end":{"line":11,"column":32}}}) : helper)))
    + "\" class=\"card dashcard\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "  <div>\r\n    <p class=\"empty-message\">This artifact has no properties</p>\r\n  </div>\r\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"actions") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":4},"end":{"line":60,"column":11}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":38,"column":6},"end":{"line":42,"column":13}}})) != null ? stack1 : "")
    + "          <form id=\"form_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":43,"column":25},"end":{"line":43,"column":31}}}) : helper)))
    + "\" name=\"action\">\r\n            <div class=\"card-header action-color-reverse\">\r\n              <div class=\"card-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":45,"column":38},"end":{"line":45,"column":44}}}) : helper)))
    + "</div>\r\n              <button type=\"submit\" form=\"form_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":46,"column":47},"end":{"line":46,"column":53}}}) : helper)))
    + "\" class=\"clickable rounded-pill badge test-affordance\">\r\n                Test\r\n              </button>\r\n            </div>\r\n            <div class=\"card-body\">\r\n              <p class=\"card-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":51,"column":35},"end":{"line":51,"column":50}}}) : helper)))
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"input") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":14},"end":{"line":56,"column":21}}})) != null ? stack1 : "")
    + "            </div>\r\n          </form>\r\n        </div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div id=\"action_"
    + alias3(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":39,"column":24},"end":{"line":39,"column":30}}}) : helper)))
    + "\" class=\"card dashcard slide-in-left\" style=\"animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":39,"column":91},"end":{"line":39,"column":107}}}))
    + "s -webkit-animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":39,"column":133},"end":{"line":39,"column":149}}}))
    + "s\">\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div id=\"action_"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":41,"column":24},"end":{"line":41,"column":30}}}) : helper)))
    + "\" class=\"card dashcard\">\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"input-schema\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"schemaInput"),depth0,{"name":"schemaInput","hash":{"required":((stack1 = (depth0 != null ? lookupProperty(depth0,"input") : depth0)) != null ? lookupProperty(stack1,"required") : stack1),"key":"Input:","value":(depth0 != null ? lookupProperty(depth0,"input") : depth0)},"data":data,"indent":"                  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "  <div>\r\n    <p class=\"empty-message\">This artifact has no actions</p>\r\n  </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- Property -->\r\n<div class=\"scroll-container\">\r\n<div class=\"scroll-header\">\r\n  <h4 class=\"property-color slide-in-left\">Properties </h4>\r\n</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":30,"column":7}}})) != null ? stack1 : "")
    + "\r\n<!-- Actions -->\r\n<div class=\"scroll-header\">\r\n  <h4 class=\"action-color slide-in-left\">Actions </h4>\r\n</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"actions") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(17, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":36,"column":0},"end":{"line":65,"column":7}}})) != null ? stack1 : "")
    + "\r\n<!-- Events -->\r\n<div class=\"scroll-header\">\r\n  <h4 class=\"event-color slide-in-left\">Events </h4>\r\n</div>\r\n  <div>\r\n    <p class=\"empty-message\">Events are not yet supported.</p>\r\n  </div>\r\n</div>";
},"usePartial":true,"useData":true,"useDepths":true});
templates['artifactsList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"artifact-header scroll-header\">\r\n  <h4 class=\"artifact-color slide-in-left\">Artifacts </h4>\r\n</div>\r\n<div class=\"scroll-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentArtifacts") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":25,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":11,"column":13}}})) != null ? stack1 : "")
    + "      <div class=\"card-header artifact-color-reverse\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":12,"column":54},"end":{"line":12,"column":60}}}) : helper)))
    + "</div>\r\n      <div class=\"card-body\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"propertiesNum") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":8},"end":{"line":16,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"actionsNum") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"eventsNum") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":8},"end":{"line":22,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":13},"end":{"line":8,"column":19}}}) : helper)))
    + "\" class=\"card dashcard clickable slide-in-left\" style=\"animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":8,"column":90},"end":{"line":8,"column":106}}}))
    + "s -webkit-animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":8,"column":132},"end":{"line":8,"column":148}}}))
    + "s\" >\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":19}}}) : helper)))
    + "\" class=\"card dashcard clickable\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <p class=\"card-text\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"propertiesNum") || (depth0 != null ? lookupProperty(depth0,"propertiesNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"propertiesNum","hash":{},"data":data,"loc":{"start":{"line":15,"column":29},"end":{"line":15,"column":46}}}) : helper)))
    + " properties</p>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <p class=\"card-text\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"actionsNum") || (depth0 != null ? lookupProperty(depth0,"actionsNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"actionsNum","hash":{},"data":data,"loc":{"start":{"line":18,"column":29},"end":{"line":18,"column":43}}}) : helper)))
    + " actions</p>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <p class=\"card-text\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"eventsNum") || (depth0 != null ? lookupProperty(depth0,"eventsNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"eventsNum","hash":{},"data":data,"loc":{"start":{"line":21,"column":29},"end":{"line":21,"column":42}}}) : helper)))
    + " events </p>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n  <p>No Artifacts</p>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentArtifacts") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":32,"column":7}}})) != null ? stack1 : "")
    + "\r\n</div>";
},"useData":true,"useDepths":true});
templates['resultContent'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"toast slide-in-top\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\r\n  <div class=\"toast-header\">\r\n    <strong class=\"me-auto\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"invoked") || (depth0 != null ? lookupProperty(depth0,"invoked") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"invoked","hash":{},"data":data,"loc":{"start":{"line":3,"column":28},"end":{"line":3,"column":39}}}) : helper)))
    + " result</strong>\r\n    <small>"
    + alias4(((helper = (helper = lookupProperty(helpers,"currentTime") || (depth0 != null ? lookupProperty(depth0,"currentTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentTime","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":26}}}) : helper)))
    + "</small>\r\n    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\r\n  </div>\r\n  <div class=\"toast-body\">\r\n    "
    + alias4((lookupProperty(helpers,"toString")||(depth0 && lookupProperty(depth0,"toString"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"result") : depth0),{"name":"toString","hash":{},"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":8,"column":23}}}))
    + "\r\n  </div>\r\n</div>\r\n";
},"useData":true});
templates['schemaInput'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"input-group input-group-sm mb-3\">\r\n    <span class=\"input-group-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":3,"column":35},"end":{"line":3,"column":42}}}) : helper)))
    + "</span>\r\n    <select name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":25}}}) : helper)))
    + "\" class=\"form-select form-select-sm\"\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isInArray")||(depth0 && lookupProperty(depth0,"isInArray"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),(depth0 != null ? lookupProperty(depth0,"required") : depth0),{"name":"isInArray","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":36}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":6},"end":{"line":7,"column":13}}})) != null ? stack1 : "")
    + ">\r\n      <option selected>----</option>\r\n      <option value=\"true\">True</option>\r\n      <option value=\"false\">False</option>\r\n    </select>\r\n  </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "      required\r\n      ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"input-group input-group-sm mb-3\">\r\n    <span class=\"input-group-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":18,"column":35},"end":{"line":18,"column":42}}}) : helper)))
    + "</span>\r\n    <input type=\"number\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":19,"column":31},"end":{"line":19,"column":38}}}) : helper)))
    + "\" class=\"form-control\" \r\n      placeholder=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"minimum") : stack1), depth0))
    + "\" \r\n      max=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"maximum") : stack1), depth0))
    + "\" \r\n      min=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"minimum") : stack1), depth0))
    + "\"\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isInArray")||(depth0 && lookupProperty(depth0,"isInArray"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),(depth0 != null ? lookupProperty(depth0,"required") : depth0),{"name":"isInArray","hash":{},"data":data,"loc":{"start":{"line":23,"column":12},"end":{"line":23,"column":36}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":6},"end":{"line":25,"column":13}}})) != null ? stack1 : "")
    + ">\r\n  </div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"input-group input-group-sm mb-3\">\r\n    <span class=\"input-group-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":32,"column":35},"end":{"line":32,"column":42}}}) : helper)))
    + "</span>\r\n    <input type=\"number\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":33,"column":31},"end":{"line":33,"column":38}}}) : helper)))
    + "\" class=\"form-control\" \r\n      placeholder=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"minimum") : stack1), depth0))
    + "\" \r\n      max=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"maximum") : stack1), depth0))
    + "\" \r\n      step=\"1\" \r\n      pattern=\"\\d*\"\r\n      min=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"minimum") : stack1), depth0))
    + "\"\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isInArray")||(depth0 && lookupProperty(depth0,"isInArray"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),(depth0 != null ? lookupProperty(depth0,"required") : depth0),{"name":"isInArray","hash":{},"data":data,"loc":{"start":{"line":39,"column":12},"end":{"line":39,"column":36}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":6},"end":{"line":41,"column":13}}})) != null ? stack1 : "")
    + ">\r\n  </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"input-group input-group-sm mb-3\">\r\n    <span class=\"input-group-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":48,"column":35},"end":{"line":48,"column":42}}}) : helper)))
    + "</span>\r\n    <input type=\"text\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":49,"column":29},"end":{"line":49,"column":36}}}) : helper)))
    + "\" class=\"form-control\"\r\n    placeholder=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1), depth0))
    + "\"\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isInArray")||(depth0 && lookupProperty(depth0,"isInArray"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),(depth0 != null ? lookupProperty(depth0,"required") : depth0),{"name":"isInArray","hash":{},"data":data,"loc":{"start":{"line":51,"column":10},"end":{"line":51,"column":34}}}),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":4},"end":{"line":53,"column":11}}})) != null ? stack1 : "")
    + ">\r\n  </div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "    required\r\n    ";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"object-schema\">\r\n    <p class=\"key\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":60,"column":19},"end":{"line":60,"column":26}}}) : helper)))
    + "</p>\r\n    <div class=\"properties\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(lookupProperty(helpers,"toList")||(depth0 && lookupProperty(depth0,"toList"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"properties") : stack1),{"name":"toList","hash":{},"data":data,"loc":{"start":{"line":62,"column":12},"end":{"line":62,"column":37}}}),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":4},"end":{"line":64,"column":13}}})) != null ? stack1 : "")
    + "    </div>\r\n  </div>\r\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"schemaInput"),depth0,{"name":"schemaInput","hash":{"required":((stack1 = (depths[1] != null ? lookupProperty(depths[1],"value") : depths[1])) != null ? lookupProperty(stack1,"required") : stack1),"key":(depth0 != null ? lookupProperty(depth0,"key") : depth0),"value":(depth0 != null ? lookupProperty(depth0,"value") : depth0)},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    return "  <p>Not supporting array input at the moment</p>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isBooleanType")||(depth0 && lookupProperty(depth0,"isBooleanType"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"isBooleanType","hash":{},"data":data,"loc":{"start":{"line":1,"column":6},"end":{"line":1,"column":32}}}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":13,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isNumberType")||(depth0 && lookupProperty(depth0,"isNumberType"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"isNumberType","hash":{},"data":data,"loc":{"start":{"line":16,"column":6},"end":{"line":16,"column":31}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":0},"end":{"line":27,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isIntegerType")||(depth0 && lookupProperty(depth0,"isIntegerType"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"isIntegerType","hash":{},"data":data,"loc":{"start":{"line":30,"column":6},"end":{"line":30,"column":32}}}),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":0},"end":{"line":43,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isStringType")||(depth0 && lookupProperty(depth0,"isStringType"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"isStringType","hash":{},"data":data,"loc":{"start":{"line":46,"column":6},"end":{"line":46,"column":31}}}),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":0},"end":{"line":55,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isObjectType")||(depth0 && lookupProperty(depth0,"isObjectType"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"isObjectType","hash":{},"data":data,"loc":{"start":{"line":58,"column":6},"end":{"line":58,"column":31}}}),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":0},"end":{"line":67,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isArrayType")||(depth0 && lookupProperty(depth0,"isArrayType"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"isArrayType","hash":{},"data":data,"loc":{"start":{"line":70,"column":6},"end":{"line":70,"column":30}}}),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":70,"column":0},"end":{"line":73,"column":7}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});
})();