class FileTabsController {

  _blockStorage = {}
  _currentStorageKey = undefined
  _workspace = undefined

  $tabs = $('#tabs')
  $addTabButton = $('#tab-button')

  constructor(workspace){
    this._blockStorage = {}
    this._workspace = workspace;
    this.$addTabButton.find('button').click(async e => {
      var agentName = await dashboard.waitInput("Create a new agent with name:", "new_agent")
      agentName = agentName ? agentName : "new_agent"
      this.addTab(agentName)
    })
  }

  addTab(tabName){
    //generate a valid name
    var validName = this._generateValidName(tabName)

    //save and clean previous workspace
    this._saveWorkspace()
    this.clearWorkspace()

    //add the top block
    var definition = this._workspace.newBlock("init_agent")
    definition.setFieldValue(validName, "name")
    definition.setDeletable(false)
    definition.initSvg()
    this._workspace.render();

    //add key in block storage
    this._currentStorageKey = validName
    this._saveWorkspace();

    //render a new tab
    this._addTabDom(validName)  
  }

  _selectTab(newTab){
    //save current workspace and clear
    this._saveWorkspace()
    this.clearWorkspace()

    //swap key and blocks
    this._currentStorageKey = newTab
    this._loadWorkspace()
  }

  _changeTabName(oldName, newName){
    if(oldName == newName){
      return newName
    }
    //save current blocks on oldName
    var blocks = this._blockStorage[oldName]
    //remove key from blockStorage
    delete this._blockStorage[oldName]
    //generate valid name
    var validName = this._generateValidName(newName)
    //save old blocks to new name
    this._blockStorage[validName] = blocks;
    this._currentStorageKey = validName;
    //change top block name
    var definition = this._workspace.getAllBlocks().filter(x => x.type == 'init_agent')[0];
    definition.setFieldValue(validName, "name")
    definition.initSvg()
    this._workspace.render();
    return validName
  }

  _removeTab(toRemove, isSelected){
    //ask for confirm
    var res = dashboard.waitConfirm(`Are you sure to delete ${toRemove}? You will lose all your blocks.`)
    if(res){
      //reset key and empty storage
      this._currentStorageKey = undefined
      delete this._blockStorage[toRemove] 

      //manually select the first available tab
      if(isSelected){
        var firstTab = this.$tabs.find('.nav-item').first()
        var tabName = firstTab.find('span').text()
        if(tabName != toRemove){
          firstTab.addClass('active').removeClass('inactive')
          this._selectTab(tabName)
        } else {
          this.clearWorkspace()
        }
      }

      //remove DOM
      this._removeTabDom(toRemove)
    }
  }

  _generateValidName(newName){
    var nameList = Object.keys(this._blockStorage);
    if(!nameList.includes(newName)){
      return newName
    }
    //filter only names with the same root
    var regex = new RegExp(`^${newName}(_[0-9]*)?$`)
    nameList = nameList.filter(n => regex.test(n))
    //extract the numbers in use
    var numbers = nameList.map(name => {
        var number = name.replace(newName, "").replace("_", "")
        return parseInt(number) || 0
      }).sort((a,b) => a-b)
    //find the first available number and return
    var freeIndex = 0;
    for (const n of numbers) {
      if(n != freeIndex){
        break;
      }
      freeIndex++;
    }
    var validName = `${newName}_${freeIndex}`;
    return validName
  }

  _saveWorkspace(){
    if(this._currentStorageKey){
      this._blockStorage[this._currentStorageKey] = Blockly.Xml.workspaceToDom(this._workspace);
    }
  }

  _loadWorkspace(){
    if(this._currentStorageKey){
      var newBlocks = this._blockStorage[this._currentStorageKey]
      if (newBlocks) {
        //and add them if present
        Blockly.Xml.domToWorkspace(newBlocks, this._workspace)
      }
    }
  }

  clearWorkspace(){
    Blockly.Events.disable()
    this._workspace.clear()
    Blockly.Events.enable()

    this._workspace.clearUndo()
    this._workspace.trashcan.emptyContents();
  }

  _addTabDom(name){
    this._deselectAllTabs()
    var newTab = $(
      `<li>
        <div class="nav-item nav-link active">
          <button type="button" class="btn-close"></button>
          <span>${name}</span>
        </div>
      </li>`)
    this.$addTabButton.before(newTab)
    this._addCloseHandler(newTab)
    this._addSelectHandler(newTab)
    this._addEditHandler(newTab)
  }

  _removeTabDom(name){
    this.$tabs.find(`li`).filter(function(){
      return $(this).find('span').text() == name
    }).remove()
  }

  _deselectAllTabs(){
    this.$tabs.find('.nav-item').removeClass('active').addClass('inactive');
  }

  _addCloseHandler(tab){
    var tabController = this
    $(tab).find('.btn-close').click(function(){
      var tabName = $(tab).find('span').text()
      var isSelected = $(tab).find('.nav-item').hasClass('active')
      tabController._removeTab(tabName, isSelected);
    })
  }

  _addSelectHandler(tab){
    var tabController = this
    $(tab).find('.nav-item').click(function(){
      if($(this).hasClass('inactive')){
        tabController._deselectAllTabs()
        $(this).removeClass('inactive').addClass('active');
        var newTab = $(this).find('span').text()
        tabController._selectTab(newTab)
      }
    })
  }

  _addEditHandler(tab){
    var tabController = this
    $(tab).find('span').dblclick(function(){
      if($(this).parent().hasClass('inactive')){
        return false;
      }
      var oldName = $(this).text()
      var input = $(`<input size="10" type="text" value="${oldName}" class="">`)
      input.keyup(function (e) {
        if (e.key === 'Enter') $(this).blur()
      })
      input.blur(function (e) {
        var newName = $(this).val()
        newName = tabController._changeTabName(oldName, newName)
        var span = $(this).parent().children('span')
        span.text(newName).show()
        $(this).remove()
      })
      $(this).hide();
      $(this).parent().append(input);
      input.focus();
      input.select();
    })
  }
}
