const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
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
  // This function should save a repo or repos to
  // the MongoDB
  if (repos.length > 0) {
    repos.forEach((repoObj) => {
      var newRepo = new Repo(repoObj);
      newRepo.save((err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    })
  }
}
module.exports.Repo = Repo;
module.exports.save = save;