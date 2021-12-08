const baseColor = "#244482"
const baseColorLight = "#EAEEF5"
const whiteColor = "#ffffff"

const actionColor = "#efbe12"
const propertyColor = "#2e91a3"
const eventColor = "#7a2ea3"
const triggerColor = "#a45f72"
const contextColor = "#6f5fa4"
const initColor = "#94a45f"
const bodyColor = "#a46f5f"
const beliefColor = "#5fa46f"

const categoryStyles = {
  properties_category: {
    colour: propertyColor
  },
  actions_category: {
    colour: actionColor
  },
  events_category: {
    colour: eventColor,
  },
  triggers_category: {
    colour: triggerColor,
  }
}

const blockStyles = {
  belief_block_style: {
    colourPrimary: beliefColor,
  },
  trigger_block_style: {
    colourPrimary: triggerColor,
  },
  body_block_style: {
    colourPrimary: bodyColor,
  },
  context_block_style: {
    colourPrimary: contextColor,
  },
  init_block_style: {
    colourPrimary: initColor,
  },
  property_block_style: {
    colourPrimary: propertyColor,
  },
  action_block_style: {
    colourPrimary: actionColor,
  },
  event_block_style: {
    colourPrimary: eventColor,
  }
}

const componentStyle = {
  toolboxBackgroundColour: baseColor,
  toolboxForegroundColour: whiteColor,
  flyoutBackgroundColour: baseColorLight,
}

const intelliotTheme = Blockly.Theme.defineTheme('intelliot', {
  base: Blockly.Themes.Classic,
  blockStyles: blockStyles,
  categoryStyles: categoryStyles,
  componentStyles: componentStyle,
});