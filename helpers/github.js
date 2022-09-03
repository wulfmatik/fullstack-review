const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    type: 'GET',
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options)
    .then((response) => {
      var repos = [];

      response.data.forEach((repo) => {
        var cleanedRepo = {
          repoId: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.owner.html_url,
          stargazers_count: repo.stargazers_count
        }

        repos.push(cleanedRepo);
      });
      return repos;
    })
    .catch((err) => { console.log(err) });

}

module.exports.getReposByUsername = getReposByUsername;