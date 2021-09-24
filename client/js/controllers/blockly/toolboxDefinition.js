const types = {
  NUMBER: 'number',
  INTEGER: 'integer',
  STRING: 'string',
  BOOLEAN: 'boolean',
  ARRAY: 'array',
  ANY: null,
  OBJECT: 'object',

}

var toolboxDefinition = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Triggers",
      "toolboxitemid": "Triggers",
      "categorystyle": "triggers_category",
      "contents": []
    },
    {
      "kind": "category",
      "name": "Properties",
      "toolboxitemid": "Properties",
      "categorystyle": "properties_category",
      "contents": []
    },
    {
      "kind": "category",
      "name": "Actions",
      "toolboxitemid": "Actions",
      "categorystyle": "actions_category",
      "contents": []
    },
    {
      "kind": "category",
      "name": "Events",
      "toolboxitemid": "Events",
      "categorystyle": "events_category",
      //"hidden" : "true",
      "contents": []
    }
  ]
}

var basicBlocksDefinitions = {
  property_base_block: {
    style: "property_block_style",
    tooltip: "Ask the artifact to retrieve the updated value of the property"
  },

  invoke_action_block: {
    style: "action_block_style"
  },

  action_base_block: {
    style: "action_block_style",
    tooltip: "Invoke an action."
  },

  event_base_block: {
    style: "event_block_style"
  }
}



var toolboxUtils = {
  definePropertyBlock: function(blockName, propertyDescription, artifactId){
    Blockly.Blocks[blockName] = {
      init: function() {
        this.jsonInit(basicBlocksDefinitions.property_base_block);
        this.appendDummyInput().appendField(`ask ${artifactId} ${blockName}`)
        this.setOutput(true, propertyDescription.type)
      }
    };
  },

  defineActionBlock: function(blockName, actionDescription, artifactId){
    Blockly.Blocks[blockName] = {
      init: function() {
        this.jsonInit(basicBlocksDefinitions.action_base_block);
        this.appendDummyInput().appendField(`use ${artifactId} ${blockName}`)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        if(actionDescription.input) {
          if(actionDescription.input.type == 'object'){
            //unfold the first level of nesting
            var propList = utils.toList(actionDescription.input.properties)
            if(propList.length <= 2){
              this.setInputsInline(true);
            }
            for(const prop of propList){
              this.appendValueInput(prop.key)
              .setCheck(prop.value.type)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField(prop.key)
            }
          } else {
            this.appendValueInput('input')
              .setCheck(actionDescription.input.type)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField('input')
              this.setInputsInline(true);
          }
        }
      }
    };
  }
}