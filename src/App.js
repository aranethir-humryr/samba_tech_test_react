import React, {Component} from 'react';
import './App.css';

class App extends Component {
  //Constructor function that creates the elements that are going to be used for working with the data.
  constructor(props) {
    super(props);
    this.state = {ext_data:[], //Array to get the data from the external API.
                  user_query:"", //String to save the user input.
                  isLoaded:false, //Flag to check if data is properly loaded from the API.
                  filtered_data:[]}; //Array to display the data the user queries for.
  }
//Handles anything the user inserts on the search bar and updates the results.
  handleInputChange = event => {
    let user_query = event.target.value;
    this.setState(prevState => {
      let filtered_data = prevState.ext_data.filter(element => {
        return element.name.toLowerCase().includes(user_query.toLowerCase());
      });
      return {
        user_query,
        filtered_data
      };
    });
  };

  getData = () => {
    fetch('https://www.breakingbadapi.com/api/characters') //Access the API with a data retrieval request.
      .then(response => response.json())
      .then(json => {
        this.setState({
          ext_data:json,
          filtered_data:json,
          isLoaded:true
        });
      });
  };

  //Loads the data from the external source.
  componentDidMount(){
    this.getData();
  }
  //Renders the HTML with the search bar and query results.
  render(){
    let {isLoaded}=this.state; //Declares a local reference to the out of scope data.
    if(!isLoaded)
      return (
        <div className="App">
          <h2>Data being loaded!</h2>
        </div>
      );
    else
      return (
        <div className="App">
          Hello
          <div class="search_form">
            <form>
              <input
                placeholder="Digite o nome do personagem."
                value={this.state.query}
                onChange={this.handleInputChange}
              />
            </form>
          </div>
          <div class="block">
            <div class="results"> {this.state.filtered_data.map(index => 
                                                <div class="unitary_result" key={index.name}>
                                                  <p><img class="in_row" src={index.img}></img></p>
                                                  <p>Nome: {index.name}</p>
                                                  <p>Status: {index.status}</p>
                                                  <p>{index.birthday}</p>
                                                </div>)}
                                                
            </div>
          </div>
        </div>
      );
  }
}
export default App;