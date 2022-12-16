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
    const warning = <p className='m-auto py-1'>The backend is currently hosted on Render. It may require a small amount of time for it to spin up and retrieve data properly.</p>;
    
    return (
      <div className="container">
        <div className='d-flex flex-column'>
          {warning}
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