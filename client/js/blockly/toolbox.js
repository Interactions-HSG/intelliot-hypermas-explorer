const toolboxDefinition = {
  "kind": "categoryToolbox",
  "contents": [{
      "kind": "category",
      "name": "Basics",
      "toolboxitemid": "Basics",
      "contents": [
        {
          "kind": "block",
          "type": "atom"
        },
        {
          "kind": "block",
          "type": "variable"
        },
        {
          "kind": "block",
          "type": "predicate"
        },
        {
          "kind": "block",
          "type": "no_predicate"
        },
        {
          "kind": "block",
          "type": "opposite_predicate"
        },
        {
          "kind": "block",
          "type": "rule"
        },
        {
          "kind": "block",
          "type": "statement"
        },
        {
          "kind": "block",
          "type": "and_or_statement"
        }
      ]
    },
    {
      "kind": "category",
      "name": "Agent Initialization",
      "toolboxitemid": "Agent_Initialization",
      "contents": [
        {
          "kind": "block",
          "type": "init_agent"
        },
        {
          "kind": "block",
          "type": "init_belief"
        },
        {
          "kind": "block",
          "blockxml": "<block type='init_rule'><value name='rule'><block type='rule'></block></value></block>"
        },
        {
          "kind": "block",
          "type": "init_goal"
        },
        {
          "kind": "block",
          "type": "belief"
        },
        {
          "kind": "block",
          "type": "no_init_belief"
        },
        {
          "kind": "block",
          "type": "opposite_init_belief"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Properties",
      "toolboxitemid": "Properties",
      "categorystyle": "properties_category",
      "contents": []
    },
    {
      "kind": "category",
      "name": "Actions",
      "toolboxitemid": "Actions",
      "categorystyle": "actions_category",
      "contents": []
    },
    {
      "kind": "category",
      "name": "Events",
      "toolboxitemid": "Events",
      "categorystyle": "events_category",
      //"hidden" : "true",
      "contents": []
    }
  ]
}