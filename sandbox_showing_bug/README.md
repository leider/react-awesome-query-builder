# Show a bug with nested fields

### Run locally
```sh
cd sandbox_showing_bug
npm i
npm start
```
Will open `http://localhost:3000` in a browser.  
Feel free to play with code in `src/demo` dir.  

## Steps to reproduce
1. open app
2. app will show the initally loaded tree from `src/data/tree.json` in "native format"
3. check the json-logic structure; should equal `src/data/jsonLogicGenerated.json`
4. click button "reparse"; this will import the generated json-logic structure
5. you will immediately notice that the structure of the editor changes
6. check the json-logic structure **again**; should equal `src/data/jsonLogicReimported.json`
7. diff the two files and see the difference

### Difference

**Initially (jsonLogicGenerated.json)**
```json
{
  "!": { // NOT is first element
    "some": [
      {
        "var": "crDeal"
      },
      {
        "in": [
          {
            "var": "dealClassification"
          },
          [
            "AVAL",
            "CURRENT_ACCOUNT",
            "FIXED_RATE",
            "FORWARD_RATE_AGREEMENT"
          ]
        ]
      }
    ]
  }
}
```

**After "Import" (jsonLogicReimported.json)**
```json
{
  "some": [
    {
      "var": "crDeal"
    },
    {
      "!": { // NOT is moved to subparam and is not parsed on import
        "in": [
          {
            "var": "dealClassification"
          },
          [
            "AVAL",
            "CURRENT_ACCOUNT",
            "FIXED_RATE",
            "FORWARD_RATE_AGREEMENT"
          ]
        ]
      }
    }
  ]
}

```
