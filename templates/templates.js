(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['affordancesList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"scroll-container-spacer\"><div class=\"dashcard-spacer\">\r\n  <div class=\"dashcard-header variable_style\">Affordances</div>\r\n</div></div>\r\n\r\n<div class=\"inside-tasks-scroller\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentAffordances") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":0},"end":{"line":36,"column":9}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":9,"column":0},"end":{"line":13,"column":7}}})) != null ? stack1 : "")
    + "\r\n  <div id=\"tasks-header\" class=\"dashcard-header variable_style\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"affordanceTitle") || (depth0 != null ? lookupProperty(depth0,"affordanceTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"affordanceTitle","hash":{},"data":data,"loc":{"start":{"line":15,"column":64},"end":{"line":15,"column":83}}}) : helper)))
    + "\r\n    <div id=\"follow-affordance-button\" class=\"inlineButton\">Go!</div>\r\n  </div>\r\n\r\n  <div class=\"tooltiptext\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"affordanceDescription") || (depth0 != null ? lookupProperty(depth0,"affordanceDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"affordanceDescription","hash":{},"data":data,"loc":{"start":{"line":19,"column":27},"end":{"line":19,"column":52}}}) : helper)))
    + "</div>\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasInputSchema") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":34,"column":11}}})) != null ? stack1 : "")
    + "  </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":10,"column":9},"end":{"line":10,"column":17}}}) : helper)))
    + "\" element=\"artifactInstance\" class=\"dashcard\" style=\"visibility: hidden; animation: slideFromTop 0.5s forwards; -webkit-animation: slideFromTop 0.5s forwards; animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":10,"column":193},"end":{"line":10,"column":208}}}))
    + "s; -webkit-animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":10,"column":236},"end":{"line":10,"column":251}}}))
    + "s;\">\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data,"loc":{"start":{"line":12,"column":9},"end":{"line":12,"column":17}}}) : helper)))
    + "\" element=\"artifactInstance\" class=\"dashcard\" style=\"left: 0px;\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id=\"tasks-content\" class=\"dashcard-scroll-container\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"inputSchema") : depth0)) != null ? lookupProperty(stack1,"properties") : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":6},"end":{"line":26,"column":15}}})) != null ? stack1 : "")
    + "\r\n      <!--\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"inputSchema") : depth0)) != null ? lookupProperty(stack1,"requiredProperties") : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":6},"end":{"line":31,"column":13}}})) != null ? stack1 : "")
    + "      -->\r\n    </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <input class=\"event-information-small\" type=\"text\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"propertyName") || (depth0 != null ? lookupProperty(depth0,"propertyName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"propertyName","hash":{},"data":data,"loc":{"start":{"line":25,"column":63},"end":{"line":25,"column":79}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"propertyName") || (depth0 != null ? lookupProperty(depth0,"propertyName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"propertyName","hash":{},"data":data,"loc":{"start":{"line":25,"column":94},"end":{"line":25,"column":110}}}) : helper)))
    + " ("
    + alias4(((helper = (helper = lookupProperty(helpers,"schemaType") || (depth0 != null ? lookupProperty(depth0,"schemaType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"schemaType","hash":{},"data":data,"loc":{"start":{"line":25,"column":112},"end":{"line":25,"column":126}}}) : helper)))
    + ")\"/>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <span class=\"event-information-small\">Required: <b>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"inputSchema") : depth0)) != null ? lookupProperty(stack1,"requiredProperties") : stack1), depth0))
    + "</b></span>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "<div class=\"scroll-container-spacer\"><div class=\"dashcard-spacer\"><div class=\"dashcard-header variable_style\">No Affordances</div></div></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentAffordances") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":41,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['artifactsList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"scroll-container-spacer\"><div class=\"dashcard-spacer\">\r\n  <div class=\"dashcard-header command_style\">Artifacts\r\n    <!-- <span id=\"createEventButton\" class=\"inlineButton yellowBackground\">Create Module [blank]!</span> -->\r\n  </div>\r\n\r\n</div></div>\r\n\r\n<div class=\"inside-tasks-scroller\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentArtifacts") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":0},"end":{"line":22,"column":9}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"animate") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":12,"column":0},"end":{"line":16,"column":7}}})) != null ? stack1 : "")
    + "  <div id=\"tasks-header\" class=\"dashcard-header command_style\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":17,"column":63},"end":{"line":17,"column":72}}}) : helper)))
    + "</div>\r\n    <div id=\"tasks-content\" class=\"dashcard-scroll-container\">\r\n      <span class=\"event-information-small\">Affordances: "
    + alias4(((helper = (helper = lookupProperty(helpers,"numAffordances") || (depth0 != null ? lookupProperty(depth0,"numAffordances") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"numAffordances","hash":{},"data":data,"loc":{"start":{"line":19,"column":57},"end":{"line":19,"column":75}}}) : helper)))
    + "</span>\r\n    </div>\r\n  </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"uri") || (depth0 != null ? lookupProperty(depth0,"uri") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uri","hash":{},"data":data,"loc":{"start":{"line":13,"column":9},"end":{"line":13,"column":16}}}) : helper)))
    + "\" element=\"artifactInstance\" class=\"dashcard\" style=\"visibility: hidden; animation: slideFromLeft 0.5s forwards; -webkit-animation: slideFromLeft 0.5s forwards; animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":13,"column":194},"end":{"line":13,"column":209}}}))
    + "s; -webkit-animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":13,"column":237},"end":{"line":13,"column":252}}}))
    + "s;\">\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"uri") || (depth0 != null ? lookupProperty(depth0,"uri") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"uri","hash":{},"data":data,"loc":{"start":{"line":15,"column":9},"end":{"line":15,"column":16}}}) : helper)))
    + "\" element=\"artifactInstance\" class=\"dashcard\" style=\"left: 0px;\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<div class=\"scroll-container-spacer\">\r\n  <div class=\"dashcard-spacer\">\r\n    <div class=\"dashcard-header command_style\">No Artifacts</div>\r\n  </div>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentArtifacts") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":31,"column":7}}})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
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

  return "\r\n<div class=\"content-container-spacer\">\r\n  <div class=\"content-spacer\">\r\n    <div class=\"dashcard-header method_style\">Content</div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"inside-tasks-scroller\">\r\n\r\n  <div id=\"Response\" element=\"contentInstance\" class=\"contentcard\" style=\"visibility: hidden; animation: slideFromLeft 0.5s forwards; -webkit-animation: slideFromLeft 0.5s forwards; animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":10,"column":199},"end":{"line":10,"column":214}}}))
    + "s; -webkit-animation-delay: "
    + alias3((lookupProperty(helpers,"half")||(depth0 && lookupProperty(depth0,"half"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"half","hash":{},"data":data,"loc":{"start":{"line":10,"column":242},"end":{"line":10,"column":257}}}))
    + "s;\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"responseString") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":12,"column":2},"end":{"line":19,"column":7}}})) != null ? stack1 : "")
    + "\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();