//TODO can i move all the logic in the backend and retrieve the jsons for the toolbox?
class BlocklyController {

  _workspace = undefined
  _toolbox = undefined
  _propertyCategory = undefined
  _actionCategory = undefined
  _eventCategory = undefined
  _flyout = undefined

  _blockStorageMap = {}
  _currentStorageKey = undefined

  //jquery shortcuts
  $blocklyInjection = $('#blockly-injection')
  $blocklyRelative = $('#blockly-relative')
  $blocklyContainer = $('#blockly-container')

  $tabs = $('#tabs')
  $addTabButton = $('#add-new-tab')

  $blocklyLauncher = $('#blockly-launcher')
  $launcherForm = $('#launcher-form')
  $agentName = $('#agentName')


  initialize() {
    this.$blocklyContainer.hide()
    this.$blocklyLauncher.hide();

    var options = {
      toolbox: toolboxDefinition,
      theme: 'intelliot',
      grid: {
        spacing: 20,
        length: 1,
        colour: '#ccc',
        snap: true
      },
      zoom: {
        startScale: 0.8,
        controls: true,
        wheel: true
      },
      trashcan: true
    }
    this._workspace = Blockly.inject(this.$blocklyInjection[0], options);
    this._toolbox = this._workspace.getToolbox();
    this._propertyCategory = this._toolbox.getToolboxItemById('Properties');
    this._actionCategory = this._toolbox.getToolboxItemById('Actions');
    this._eventCategory = this._toolbox.getToolboxItemById('Events');
    this._flyout = this._toolbox.getFlyout();
    window.addEventListener('resize', this._resizeHandler(this._workspace, this.$blocklyRelative[0], this.$blocklyInjection[0]), false)


    this.$launcherForm.submit(e => {
      e.preventDefault()
      this.hideLauncher();
      this.showArea(this.$agentName.val())
    })

    this.$addTabButton.click(e => this._addTab())

    //TODO uncomment this
    //$('#export_code').click(e =>console.log(JasonGenerator.generate(this._workspace)))
    $('#export-code').click(e => console.log(JasonGenerator.workspaceToCode(this._workspace)))

    $('#debug').click(e => console.log(Blockly.Xml.workspaceToDom(this._workspace, true)))
  }

  loadArtifact(artifact) {
    var propertyBlocks = this._generatePropertyBlocks(artifact.thingDescription.properties, artifact.id)
    var actionBlocks = this._generateActionBlocks(artifact.thingDescription.actions, artifact.id)
    var eventBlocks = this._generateEventBlocks(artifact.thingDescription.events, artifact.id)

    this._propertyCategory.updateFlyoutContents(propertyBlocks)
    this._actionCategory.updateFlyoutContents(actionBlocks)
    this._eventCategory.updateFlyoutContents(eventBlocks)
  }

  isEmpty() {
    return this._workspace.getAllBlocks().length == 0;
  }

  clearIDE() {
    var button = this.$tabs.find('#tab-button').detach()
    this.$tabs.empty().append(button)
    this._propertyCategory.updateFlyoutContents([])
    this._actionCategory.updateFlyoutContents([])
    this._eventCategory.updateFlyoutContents([])
    this._clearWorkspace();
  }

  _clearWorkspace() {
    this._workspace.clear()
    this._workspace.clearUndo()
    this._workspace.trashcan.emptyContents();
  }

  showLauncher() {
    this.$blocklyLauncher.fadeIn(500);
  }

  hideLauncher() {
    this.$blocklyLauncher.hide();
  }

  showArea(agentName) {
    this._addTab(agentName);
    this.$blocklyContainer.fadeIn(500);
    this.resize();
    this._workspace.scrollbar.workspace_.scroll(10, 15)
  }

  hideMenu() {
    this._toolbox.setSelectedItem(null)
    this._flyout.hide()
  }

  hideArea() {
    this.hideMenu();
    this.$blocklyContainer.fadeOut()
  }

  resize() {
    this._resizeHandler(this._workspace, this.$blocklyRelative[0], this.$blocklyInjection[0])();
  }

  _resizeHandler(workspace, blocklyArea, blocklyDiv) {
    return function () {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var x = 0;
      var y = 0;
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px';
      blocklyDiv.style.top = y + 'px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(workspace);
    }
  }

  _generatePropertyBlocks(properties, artifactId) {
    var blocks = []
    utils.toList(properties).forEach(p => {
      var block = affordanceBlockUtils.definePropertyBlock(p.key, p.value, artifactId)
      blocks.push(block)
    });
    return blocks;
  }

  _generateActionBlocks(actions, artifactId) {
    var blocks = []
    utils.toList(actions).forEach(a => {
      var block = affordanceBlockUtils.defineActionBlock(a.key, a.value, artifactId)
      blocks.push(block)
    });
    return blocks;
  }

  _generateEventBlocks(events, artifactId) {
    //TODO implement when supporting events
    return []
  }

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
    this.$tabs.find('#tab-button').before(`<li>
                        <div class="nav-item nav-link active">
                        <button type="button" class="btn-close" aria-label="Close"></button>
                        <span>${agentName ? agentName : "new_agent"}</span>
                        </div>
                      </li>`)

    var oldName = prevTab.children('span').text()
    this._currentStorageKey = agentName
    this._saveWorkspace(oldName)
    this._clearWorkspace();
    var definition = this._workspace.newBlock("init_agent")
    definition.setFieldValue(agentName, "name")
    definition.setDeletable(false)
    definition.initSvg()
    this._saveWorkspace(agentName)

    this._addTabHandlers(definition)

    this._workspace.render();
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


}