import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
        list: [],
        summoner: {},
        match: {}
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
      this.getList();
      this.getSummoner();
      this.getMatch();
  }

  // Retrieves the list of items from the Express app
    getMatch = () => {
        fetch('/api/lolm')
            .then(res => res.json())
            .then(match => this.setState({ match }))

    }
    getSummoner = () => {
        fetch('/api/lol')
            .then(res => res.json())
            .then(summoner => this.setState({ summoner }))

    }
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
          .then(list => this.setState({ list }))
        
    }

    


  render() {
      const { list } = this.state;
      const { summoner } = this.state;
      const { match } = this.state;

      return (
          <div className="App">
              <h1>{summoner.name}</h1>
              <h1>{summoner.accountId}</h1>
              <h1>{match.lane}

              </h1>
        



        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default List;