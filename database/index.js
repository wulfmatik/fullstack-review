const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  repoId: { type: Number, unique: true },
  name: String,
  full_name: String,
  html_url: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach((repoObj) => {
    var newRepo = new Repo(repoObj);

    newRepo.save((err, repoObj) => {
      if (err) { return err };
      console.log(repoObj.name + 'saved to collection');
    });
  })
}

module.exports.save = save;