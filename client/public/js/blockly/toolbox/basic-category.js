const basic_toolbox_category = {
  "kind": "category",
  "name": "Valori di base",
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
      //"type": "true_false"
      "blockxml": "<block type='true_false'>"+
      "<field name='value'>true</field>"+
      "</block>"
    },
    {
      "kind": "block",
      //"type": "true_false"
      "blockxml": "<block type='true_false'>"+
      "<field name='value'>false</field>"+
      "</block>"
    },
    {
      "kind": "block",
      "type": "variable"
    },
    {
      "kind": "block",
      "type": "any_variable"
    }
  ]
}