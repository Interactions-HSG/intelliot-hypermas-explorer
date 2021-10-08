class FileTabsController {

  _blockStorage = {}
  _currentStorageKey = undefined
  _blocklyController = undefined

  $tabs = $('#tabs')
  $addTabButton = $('#tab-button')

  constructor(blocklyController){
    this._blocklyController = blocklyController;
    this.$addTabButton.find('button').click(async e => {
      var agentName = await dashboard.waitInput("Create a new agent with name:", "new_agent")
      agentName = agentName ? agentName : "new_agent"
      this.addTab(agentName)
    })
  }

  addTab(tabName){
    var validName = this._generateValidName(tabName)
    console.log("Add tab "+validName)
    this._currentStorageKey = validName;
    this._blockStorage[validName] = "";

    console.log(this._blockStorage)
    
  }

  changeTab(oldTab, newTab){
    console.log("Change tab from " + oldTab +" to "+newTab)
  }

  removeTab(toRemove){
    console.log("Change tab from " + oldTab +" to "+newTab)
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


}

/*

  _selectTab(oldAgent, newAgent) {
    this._currentStorageKey = newAgent
    this._swapWorkspace(oldAgent, newAgent)
    var topBlock = this._workspace.getBlocksByType('init_agent')[0]
    this._addTabHandlers(topBlock)
  }

  _swapWorkspace(oldAgent, newAgent) {
    if (oldAgent) {
      //save current blocks in the blockMap as xml
      this._saveWorkspace(oldAgent)
      //remove all the blocks
      this._clearWorkspace();
      //load new blocks from the block map
      var newBlocks = this._blockStorageMap[newAgent]
      if (newBlocks) {
        //and add them if present
        Blockly.Xml.domToWorkspace(newBlocks, this._workspace)
      }
    } else {
      //remove all blocks
      this._clearWorkspace();
    }
    console.log(this._blockStorageMap)
  }

  _saveWorkspace(name){
    if(name){
      this._blockStorageMap[name] = Blockly.Xml.workspaceToDom(this._workspace);
    }
  }

  async _addTab(agentName) {
    if (!agentName) {
      var agentName = await dashboard.waitInput("Create a new agent with name:", "new_agent")
    }
    agentName = this._manageNameChange(agentName, true)
    var prevTab = this.$tabs.find('div.active')
    prevTab.removeClass('active').addClass('inactive');
    var newTab = $(
    `<li>
      <div class="nav-item nav-link active">
        <button type="button" class="btn-close" aria-label="Close"></button>
        <span>${agentName ? agentName : "new_agent"}</span>
      </div>
    </li>`)
    this.$tabs.find('#tab-button').before(newTab)

    this._addTabHandlers(definition)
    this._addTabDeleteHandler(newTab)

    var oldName = prevTab.children('span').text()
    this._currentStorageKey = agentName
    this._saveWorkspace(oldName)
    this._clearWorkspace();
    var definition = this._workspace.newBlock("init_agent")
    definition.setFieldValue(agentName, "name")
    definition.setDeletable(false)
    definition.initSvg()
    this._saveWorkspace(agentName)

    this._workspace.render();
  }

  async _deleteTab(agentName, nextTab){
    var res = await dashboard.waitConfirm("Are you sure? You will lose the code for agent "+agentName)
    if(res){
      //delete the code from the block storage map
      delete this._blockStorageMap[agentName]
      console.log(this._blockStorageMap)
      //select a new tab if any
      if(nextTab){
        this._selectTab(null, nextTab)
      }

      console.log(this._blockStorageMap)
    }
    return res;
  }

  _addTabDeleteHandler(tab){
    //add delete handler
    var controller = this;
    tab.find('button').each(function(index){
      var agentName = $(this).siblings('span').text();
      $(this).click(async function(e){
        var newTab = controller.$tabs.children().first()
            .children('div.nav-link')
        var newAgentName = newTab.children('span').text()
        var res = await controller._deleteTab(agentName, newAgentName)
        if(res){
          $(this).parent().parent().remove()
          newTab.removeClass('inactive').addClass('active')
        }
      })
    })
  }

  _addTabHandlers(topBlock) {
    var controller = this;
    //remove handlers for unselected tabs and add click handler
    this.$tabs.find('div.nav-link').each(function (index) {
      $(this).off('dblclick click')
    })
    //add handler for selected tab
    var editNameHandler = function (element) {
      return function () {
        var val = $(element).children('span').text();
        var input = $(`<input size="10" type="text" value="${val}" class="">`)
        input.keyup(function (e) {
          if (e.key === 'Enter') $(this).blur()
        })
        input.blur(function (e) {
          var valueToSet = val
          var newVal = $(this).val()
          if (newVal) {
            var valueToSet = controller._manageNameChange(newVal)
          }
          topBlock.setFieldValue(valueToSet, "name")
          var span = $(this).parent().children('span')
          span.text(valueToSet).show()
          $(this).parent().children().remove('input')
        })
        $(element).children('span').hide();
        $(element).append(input);
        input.focus();
        input.select();
      }
    }

    this.$tabs.find('div.nav-link.active').each(function (index) {
      $(this).dblclick(editNameHandler(this))
    })

    //add handler for click unselected tabs
    this.$tabs.find('div.nav-link').each(function (index) {
      $(this).click(function (e) {
        if ($(this).hasClass('inactive')) {
          var oldAgent = controller.$tabs.find('div.active').children('span').text()
          var newAgent = $(this).children('span').text()
          controller.$tabs.find('div.active').removeClass('active').addClass('inactive');
          $(this).removeClass('inactive').addClass('active')
          controller._selectTab(oldAgent, newAgent)
        }
      })
    })
  }

  _manageNameChange(newName, isCreate=false){
    if(this._currentStorageKey){
      if(isCreate || newName != this._currentStorageKey){
        if(newName in this._blockStorageMap){
          //generate valid name name_(countofSameNames+1)
          var regex = new RegExp(`^${newName}(_[0-9]*)?$`)
          var count = Object.keys(this._blockStorageMap).filter(x => regex.test(x)).length;
          newName = newName + '_' + count
        }
        //swap memory to new name only if not create
        if(!isCreate){
          this._blockStorageMap[newName] = this._blockStorageMap[this._currentStorageKey]
          delete this._blockStorageMap[this._currentStorageKey]
        }
      }
    }
    this._currentStorageKey = newName
    return newName
  }
*/
