const request = require('request');
require('dotenv').config();
/**
 * 
 * 
 * @param {any} method 
 * @returns 
 */
function reposRequest(method, repoName) {
	const options = {
		url: method === 'GET' ? process.env.GITHUB_GET_REPOS_URL: `${process.env.GITHUB_DELETE_REPOS_URL}${repoName}`,
		method,
		headers: {
			'User-Agent': 'github-username',
			Authorization: 'token ' + process.env.GITHUB_TOKEN
		}
	};
  let reposNames = [];
  if(method === "GET") {
    return new Promise((resolve, reject) => {
      request(options, function(err, res, body) {
        if (err) return reject(err);
        let reposList = JSON.parse(body);
        // Check only forked repos
        reposNames = reposList.filter(repo => repo.fork).map(repo => repo.name);
        return resolve(reposNames);
      });
    });
  } else if(method === "DELETE") {
    return new Promise((resolve, reject) => {
      request(options, function(err, res, body) {
        if (err) return reject(err);
        let response = body;
        return resolve(body);
      });
    });
  }
}

function deleteRepos(reposList) {
  let deletePromises = [];
  for(let index in reposList) {
    deletePromises.push(reposRequest('DELETE', reposList[index]));
  }
  return Promise.all(deletePromises);
}

reposRequest('GET').then(reposNames => {
  deleteRepos(reposNames).then(res=> console.log('>>>>>Deleted Successfully<<<<<')).catch(err=> {
    console.log('<<Errr>>', err);
  });
}).catch(err=> {
  console.log('<<<Error Occurred>>>', err);
});
