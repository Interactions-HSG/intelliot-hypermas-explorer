const affordanceBlocksDefinition = {
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

const affordanceBlockUtils = {
  definePropertyBlock: function (blockName, propertyDescription, artifactId) {
    Blockly.Blocks[blockName] = {
      init: function () {
        this.jsonInit(affordanceBlocksDefinition.property_base_block);
        this.appendDummyInput().appendField(`ask ${artifactId} ${blockName}`)
        this.setOutput(true, propertyDescription.type)
      }
    };
  },

  defineActionBlock: function (blockName, actionDescription, artifactId) {
    Blockly.Blocks[blockName] = {
      init: function () {
        this.jsonInit(affordanceBlocksDefinition.action_base_block);
        this.appendDummyInput().appendField(`use ${artifactId} ${blockName}`)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        if (actionDescription.input) {
          if (actionDescription.input.type == 'object') {
            //unfold the first level of nesting
            var propList = utils.toList(actionDescription.input.properties)
            if (propList.length <= 2) {
              this.setInputsInline(true);
            }
            for (const prop of propList) {
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