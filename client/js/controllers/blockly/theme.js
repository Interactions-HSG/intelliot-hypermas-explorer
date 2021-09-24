const baseColor = "#244482"
const baseColorLight = "#EAEEF5"
const whiteColor = "#ffffff"

const actionColor = "#ead94c"
const propertyColor = "#2f898d"
const eventColor = "#643e9f"
const triggerColor = "#ce7e00"

var categoryStyles = {
  properties_category :{
    colour: propertyColor
  },
  actions_category: {
     colour : actionColor
  },
  events_category: {
     colour: eventColor,
  },
  triggers_category: {
    colour: triggerColor,
  }
}

var blockStyles = {

}

var componentStyle = {
  toolboxBackgroundColour: baseColor,
  toolboxForegroundColour: whiteColor,
  flyoutBackgroundColour: baseColorLight,
}

var intelliotTheme = Blockly.Theme.defineTheme('intelliot', {
  base: Blockly.Themes.Classic,
  blockStyles: blockStyles,
  categoryStyles: categoryStyles,
  componentStyles: componentStyle,
});
