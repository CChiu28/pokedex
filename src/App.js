import './styles/App.css';
import React, {Component} from "react";
import Search from './Components/search';
import MainInfo from './Components/MainInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    pokeData: null
  };

  onSubmit(data) {
    this.setState({pokeData: data});
  }
  render() {
    return (
      <div className="container">
        <div>
          <Search onSubmitted={this.onSubmit}/>
        </div>
        <div>
          {this.state.pokeData && <MainInfo pokeData={this.state.pokeData} />}
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;