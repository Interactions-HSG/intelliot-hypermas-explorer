const basic_toolbox_category = {
  "kind": "category",
  "name": "Basics",
  "toolboxitemid": "Basics",
  "contents": [{
      "kind": "block",
      "type": "atom"
    },
    {
      "kind": "block",
      "type": "string"
    },
    {
      "kind": "block",
      "type": "number"
    },
    {
      "kind": "block",
      "type": "variable"
    },
    {
      "kind": "block",
      "type": "any_variable"
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
      //"type": "rule",
      "blockxml": "<block type='rule'>" +
        "<value name='variable0'>" +
        "<block type='variable'></block>" +
        "</value>" +
        "<value name='rule_body'>" +
        "<block type='rule_body'></block>" +
        "</value>" +
        "</block>"
    },
    {
      "kind": "block",
      "type": "rule_body"
    },
    {
      "kind": "block",
      "type": "true"
    },
    {
      "kind": "block",
      "type": "false"
    },
    {
      "kind": "block",
      "type": "operation"
    },
    {
      "kind": "block",
      "type": "not"
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
}