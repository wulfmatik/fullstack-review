const express = require('express');
const get = require('../helpers/github.js');
const save = require('../database/index.js');
let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  get.getReposByUsername(req.body.name)
    .then((response) => {
      console.log(save.save(response));
      res.send('POST request to repos')
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

