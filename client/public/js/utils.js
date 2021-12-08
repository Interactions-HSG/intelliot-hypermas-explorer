const utils = {
  toList: function(object) {
    if(!object){
      return []
    }
    var list = Object.keys(object).map(x => {
      return {
        key: x,
        value: object[x]
      }
    })
    return list
  },

  capitalize: function(string) {
    if(string){
      return string[0].toUpperCase() + string.slice(1)
    }
  },

  uncapitalize: function(string) {
    if(string){
      return string[0].toLowerCase() + string.slice(1)
    }
  }
}