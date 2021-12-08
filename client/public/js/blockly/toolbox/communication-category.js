const communication_toolbox_category = {
  "kind": "category",
  "name": "Communication",
  "toolboxitemid": "Communication",
  "contents": [{
      "kind": "block",
      "blockxml": "<block type='send_agent_message'>"+
      "<field name='illocutionary_force'>tell</field>"+
      "<value name='message'>"+
        "<block type='predicate'>"+
        "<field name='functor'>note_name</field>"+
        "</block>" +
      "</value>"+
      "</block>"
    },
    {
      "kind": "block",
      "blockxml": "<block type='send_agent_message'>"+
      "<field name='illocutionary_force'>achieve</field>"+
      "<value name='message'>"+
      "<block type='predicate'>"+
      "<field name='functor'>goal_name</field>"+
      "</block>" +
      "</value>"+
      "</block>"
    }
  ]
}