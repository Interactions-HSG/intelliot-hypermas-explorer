class AffordancesController {

  displayedAffordances = []

  //jquery shortcuts
  $affordancesScrollContainer = $('affordances-scroll-container')
  
  clearAffordancesBar() {
    this.displayedAffordances = []
    this.$affordancesScrollContainer.hide();
  }
}