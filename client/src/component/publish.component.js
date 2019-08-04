import React, { Component } from "react";
import Publisher from "../contracts/Publisher.json";
import getWeb3 from "../utils/getWeb3";
import TruffleContract from "truffle-contract";
import IpfsComponent from './ipfs.component'
import config from '../utils/config'


class Publish extends Component {
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
        const instance = TruffleContract(Publisher);
  
        //do it properly
        instance.setProvider(window.ethereum);
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        const contractaddress= config["publisher"];
        instance.at(contractaddress).then( ( inst ) => {
          console.log( "THIS is deposit" , inst );
          this.setState( {web3 , accounts , contract:inst } )
        });
  
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
  
    getStorageValue = async () => {

      let instance = await this.state.contract.deployed();
      let data = await instance.get()
      this.setState({ storageValue: data });

    }

    render(){
        return ( 
            <div className="App">
                <IpfsComponent contract={this.state.contract} storedValue = {this.state.storageValue}></IpfsComponent>
            </div>
        )
    }
}  

export default Publish