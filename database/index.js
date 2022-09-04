const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoId: Number,
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
    let repoList = repos.map((repoObj) => {
      var newRepo = new Repo(repoObj);
      return newRepo.save()
        .catch((err)=> {
          if (err.code !== 11000) {
            return err;
          }
        })
    });
    return Promise.all(repoList);
  }
}
module.exports.Repo = Repo;
module.exports.save = save;