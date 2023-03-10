import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    $.ajax('http://localhost:1128/repos')
      .then((response) => {
        this.setState( {repos: response} );
      });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: JSON.stringify({name: term}),
      contentType: "application/json; charset=utf-8",
      success: ()=> {
        $.ajax('http://localhost:1128/repos')
         .then((response) => {
          console.log(response);
          this.setState( {repos: response} );
          console.log(`${term} was added`)
        })
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));