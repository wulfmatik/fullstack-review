const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.name)
    .then((response) => {
      db.save(response)
      .then(res.send('POST request to repos'));
    })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  return db.Repo.find({}).sort({ stargazers_count: -1 }).limit(25).exec((err, repos) => {
    if (err) {
      console.log(err);
    } else {
      res.send(repos);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

