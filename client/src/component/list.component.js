import React, { Component } from "react";
import '../css/list.css'
import { Link } from 'react-router-dom'
import Publisher from "../contracts/Publisher.json";
import getWeb3 from "../utils/getWeb3";
import TruffleContract from "truffle-contract";

import Modal from 'react-modal';
import MaticTransferComponent from "./matic.transfer";
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class PaperList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModelOpen : false,
            papers : null
        }
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }
     
    afterOpenModal = () => {
        // references are now sync'd and can be accessed.

    }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

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
        //   const contractaddress= "0x069921277b4Ffc549f4Ecb7F5E65eF4ee4c5BfbD"
        //   instance.at(contractaddress).then( ( inst ) => {
        //     console.log( "THIS is deposit" , inst );
            this.setState( {web3 , accounts ,  } )
        //   });
    
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };

    //renders each card
    renderListItem = ( item ) => {
        return (
            <div className="list-item" >
            <div className="address">
                <div className="actions" > 
                    <div>Adress : <Link to="/author/{item.address}">{item.address}</Link> 
                    </div>
                    <div>Votes : {item.votes} PPT </div>
                </div>
            </div>
            <div className="details"> 
                <div className="title" >
                    {item.name}
                </div>
                <div className="subtitle" >
                    {item.description}
                </div>
            </div>
            <div className="actions">
                <div className="btn" >
                    Vote
                </div>
                <div className="btn" onClick={this.openModal} >
                    Tippy
                </div>
            </div>
        </div>
        )
    }


    //renders all the  cards
    renderList = () => {
        if ( this.state.list){
            let renderedList = this.state.list.map( (item) => this.renderListItem(item) )
            return renderedList;
        }
        else{
            return (
                <div className="cl-w" >No Papers yet</div>
            ); 
        }

    }


 
    render(){

        return (
            <div id="listitem" className="container">
        <div className="list-container" >
           {this.renderList()}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Tip the publisher">

            Liked the work? Tip the publisher
            <MaticTransferComponent web3 = {this.state.web3} ></MaticTransferComponent>
            <div onClick={this.closeModal} > close </div>

        </Modal>
        </div>
        )
    }

}
export default PaperList