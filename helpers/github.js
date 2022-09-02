const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios.get(options)
    .then((response) => {
      var repoArray = [];

      response.forEach((repo) => {
        var repoObject = {
          repoId: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.owner.html_url,
          stargazers_count: repo.stargazers_count
        }
        repoArray.push(repoObject);
      })

      return repoArray;
    });
}

module.exports.getReposByUsername = getReposByUsername;