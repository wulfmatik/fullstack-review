import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List </h4>
    <ol>
    {props.repos.map((repo, index) => (
      <li key={index}><a href= {repo.html_url}>{repo.name}</a></li>))}
    </ol>

  </div>
)

export default RepoList;