const initialization_toolbox_category =     {
  "kind": "category",
  "name": "Initialization",
  "toolboxitemid": "Agent_Initialization",
  "contents": [{
      "kind": "block",
      "blockxml": "<block type='init_belief'>" +
        "<value name='belief'>" +
        "<block type='belief'>"+
          "<field name='functor'>note_name</field>"+
          "<value name='atom0'>" +
            "<block type='atom'></block>" +
          "</value>" +
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='init_rule'>" +
        "<value name='rule'>" +
        "<block type='rule'>" +
        "<value name='variable0'>" +
        "<block type='variable'></block>" +
        "</value>" +
        "<value name='rule_body'>" +
        "<block type='rule_body'></block>" +
        "</value>" +
        "</block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='init_goal'>" +
        "<value name='goal'>" +
        "<block type='belief'>"+
          "<field name='functor'>goal_name</field>"+
          "<value name='atom0'>" +
            "<block type='atom'></block>" +
          "</value>" +
        "</block>" +
        "</value>" +
        "</block>"
    },
    /*{
      "kind": "block",
      "blockxml": "<block type='belief'>" +
        "<value name='atom0'>" +
        "<block type='atom'></block>" +
        "</value>" +
        "</block>"
    },*/
    {
      "kind": "block",
      "type": "opposite_init_belief"
    },
  ]
}