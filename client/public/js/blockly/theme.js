const baseColor = "#244482"
const baseColorLight = "#EAEEF5"
const whiteColor = "#ffffff"

const actionColor = "#f2cb42"
const propertyColor = "#2e91a3"
const eventColor = "#7a2ea3"
const triggerColor = "#ce7e00"

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
  trigger_block_style: {
    colourPrimary: triggerColor,
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