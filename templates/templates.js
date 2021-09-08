(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['affordancesList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h4 class=\"scroll-header affordance-color slide-left\">Affordances </h4>\r\n\r\n<div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentAffordances") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":29,"column":13}}})) != null ? stack1 : "")
    + "  </div>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":10,"column":9}}})) != null ? stack1 : "")
    + "      <div class=\"card-header affordance-color-reverse\">\r\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":12,"column":10},"end":{"line":12,"column":19}}}) : helper)))
    + "\r\n         <span id=\"follow-affordance\" class=\"badge rounded-pill clickable\">Test</span>\r\n      </div>\r\n      <div class=\"card-body\">\r\n          <p class=\"card-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":16,"column":31},"end":{"line":16,"column":46}}}) : helper)))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasInputSchema") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":10},"end":{"line":26,"column":17}}})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":7,"column":13},"end":{"line":7,"column":19}}}) : helper)))
    + "\" class=\"card dashcard slide-left\" style=\"animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":7,"column":77},"end":{"line":7,"column":93}}}))
    + "s -webkit-animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":7,"column":119},"end":{"line":7,"column":135}}}))
    + "\">\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":19}}}) : helper)))
    + "\" class=\"card dashcard\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"inputSchema") : depth0)) != null ? lookupProperty(stack1,"properties") : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":14},"end":{"line":24,"column":23}}})) != null ? stack1 : "")
    + "          </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"input-group input-group-sm input-schema\">\r\n                  <span class=\"input-group-text\" id=\"inputGroup-sizing-sm\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"propertyName") || (depth0 != null ? lookupProperty(depth0,"propertyName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"propertyName","hash":{},"data":data,"loc":{"start":{"line":21,"column":75},"end":{"line":21,"column":91}}}) : helper)))
    + "</span>\r\n                  <input id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"propertyName") || (depth0 != null ? lookupProperty(depth0,"propertyName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"propertyName","hash":{},"data":data,"loc":{"start":{"line":22,"column":29},"end":{"line":22,"column":45}}}) : helper)))
    + "\" type=\"text\" class=\"form-control\" placeholder=\"("
    + alias4(((helper = (helper = lookupProperty(helpers,"schemaType") || (depth0 != null ? lookupProperty(depth0,"schemaType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"schemaType","hash":{},"data":data,"loc":{"start":{"line":22,"column":94},"end":{"line":22,"column":108}}}) : helper)))
    + ")\">\r\n                </div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "  <div>\r\n    <p>No Affordances</p>\r\n  </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentAffordances") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":36,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['artifactsList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h4 class=\"scroll-header artifact-color slide-left\">Artifacts </h4>\r\n<div>\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentArtifacts") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":16,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":10,"column":13}}})) != null ? stack1 : "")
    + "      <div class=\"card-header artifact-color-reverse\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":11,"column":54},"end":{"line":11,"column":63}}}) : helper)))
    + "</div>\r\n      <div class=\"card-body\">\r\n        <p class=\"card-text\">Affordances: "
    + alias2(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"affordances") : depth0)) != null ? lookupProperty(stack1,"length") : stack1), depth0))
    + "</span>\r\n      </div>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"uri") || (depth0 != null ? lookupProperty(depth0,"uri") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uri","hash":{},"data":data,"loc":{"start":{"line":7,"column":13},"end":{"line":7,"column":20}}}) : helper)))
    + "\" class=\"card dashcard clickable slide-left\" style=\"animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":7,"column":88},"end":{"line":7,"column":104}}}))
    + "s -webkit-animation-delay:"
    + alias3((lookupProperty(helpers,"delay")||(depth0 && lookupProperty(depth0,"delay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"delay","hash":{},"data":data,"loc":{"start":{"line":7,"column":130},"end":{"line":7,"column":146}}}))
    + "\" >\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"uri") || (depth0 != null ? lookupProperty(depth0,"uri") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"uri","hash":{},"data":data,"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":20}}}) : helper)))
    + "\" class=\"card dashcard clickable\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n  <p>No Artifacts</p>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentArtifacts") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":23,"column":7}}})) != null ? stack1 : "")
    + "\r\n</div>";
},"useData":true,"useDepths":true});
templates['responseContent'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<div>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"responseString") || (depth0 != null ? lookupProperty(depth0,"responseString") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"responseString","hash":{},"data":data,"loc":{"start":{"line":14,"column":5},"end":{"line":14,"column":23}}}) : helper)))
    + "</div>\r\n\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "\r\n<div>No Content</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<div class=\"content-container-spacer\">\r\n  <div class=\"content-spacer\">\r\n    <div class=\"dashcard-header method_style\">Content</div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"inside-tasks-scroller\">\r\n\r\n  <div id=\"Response\" element=\"contentInstance\" class=\"contentcard\" style=\"visibility: hidden; animation: slideFromRight 0.5s forwards; -webkit-animation: slideFromRight 0.5s forwards; animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":10,"column":201},"end":{"line":10,"column":216}}}))
    + "s; -webkit-animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":10,"column":244},"end":{"line":10,"column":259}}}))
    + "s;\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"responseString") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":12,"column":2},"end":{"line":19,"column":7}}})) != null ? stack1 : "")
    + "\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();