const utils = {
  toList: function(object) {
    var list = Object.keys(object).map(x => {
      return {
        key: x,
        value: object[x]
      }
    })
    return list
  },

  capitalize: function(string) {
    return string[0].toUpperCase() + string.slice(1)
  }
}