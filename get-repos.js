const request = require("request");
require("dotenv").config();

const options = {
  url: "https://api.github.com/users/kimobrian254/repos",
  method: "GET",
  headers: {
    "User-Agent": "github-username",
    Authorization: "token " + process.env.GITHUB_TOKEN
  }
};

request(options, function(err, res, body) {
  let reposList = JSON.parse(body);
  // Check only forked repos
  let reposNames = reposList.filter(repo => repo.fork).map(repo => repo.name);
  console.log(reposNames);
});
