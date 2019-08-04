import React, { Component } from "react";
import '@material/react-snackbar/dist/snackbar.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import "./App.css";
import Home from './component/home.component';
import Publish from './component/publish.component';
import PaperList from "./component/list.component";
import Author from "./component/author.component";

class App extends Component {
 /*
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = TruffleContract(SimpleStorageContract);

      //do it properly
      instance.setProvider(window.ethereum);


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });

      await this.getStorageValue()
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getStorageValue = async () => {
    console.log("read");
    let instance = await this.state.contract.deployed();
    let data = await instance.get()
    this.setState({ storageValue: data });
    console.log(this.state.storageValue);

  }

*/
  render() {

    return (
      <Router>
        <nav className="navbar" >
          <ul>
            <li>
              <Link to="/" ><h3>Novelty Network</h3></Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/publish">Publish</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/">Whitepaper</Link>
            </li>
          </ul>
          </nav>
          <div id = "App" >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/publish" component={Publish} />
              <Route path="/explore" component={PaperList} />
              <Route path="/author/:author" component = {Author} />
            </Switch>
          </div>        
         
      </Router>

    );
  }
}

export default App;
