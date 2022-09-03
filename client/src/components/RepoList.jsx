import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Top 25 Repo List </h4>
    <ol>
    {props.repos.map((repo, index) => (
      <li key={index}><a href= {repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></li>))}
    </ol>
  </div>
)

export default RepoList;