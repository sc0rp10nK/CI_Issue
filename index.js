const fs = require('fs')
const readline = require('readline')
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => {
    var stream = fs.createReadStream('./data/38EHIME.CSV', 'utf8')
    var reader = readline.createInterface({ input: stream })
    reader.on('line', (data) => {
      const item = data.split(',').map((value) => { return value.replace(/^"+|"+$/g,'') })
      if(item[2] === req.query.code){
        res.jsonp(item[6]+item[7]+item[8])
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
