import React, { Component } from "react";
import '../css/list.css'
import { Link } from 'react-router-dom'
import Publisher from "../contracts/Publisher.json";
import VoteCoin from '../contracts/VoteCoin.json';
import getWeb3 from "../utils/getWeb3";
import TruffleContract from "truffle-contract";

import Modal from 'react-modal';
import MaticTransferComponent from "./matic.transfer";
import {getAllTransactions} from '../utils/rest.service';
import config from "../utils/config";
import abiDecoder from 'abi-decoder';

// import {BigNumber} from '../assets/bignumber.js';
 
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
        this.web3  = null
        this.state = {
            isModelOpen : false,
            papers : null,
            list : null,
            contract : null , 
            token : null
        }
    }



    getTransactions = () => {
        console.log("Fetching transaction");
        let mockdata = [{
            name : "Protocols for decentralized hosting",
            description : "This paper introduces the algorithm we have used from decentralized hosting",
            address : "0x5dDasdfu3423dDDasdt23f",
            votes : 123
        },{
            name : "Storing information in DNA",
            description : "Experiments to store the data in the DNA form",
            address : "0x5dDasdfu3423dDDasdt23f",
            votes : 43
        },{
            name : "Protocols for decentralized hosting",
            description : "This paper introduces the algorithm we have used from decentralized hosting",
            address : "0x5dDasdfu3423dDDasdt23f",
            votes : 12
        }

        ];

        this.setState({ list : [] });



        getAllTransactions().then( data => {
            data = data["result"];
            console.log(data);
            data = data.filter( (item) => item.to.toLowerCase() === config["publisher"].toLowerCase() )
            data = data.map ( (item) =>  {  return  { address : item.from , ...item  } }  );
            abiDecoder.addABI( Publisher.abi );   
            
            data = data.map( item => {
                let decoded = abiDecoder.decodeMethod(item.input);                
                let contentHash = decoded.params[0].value;
                item.hash = contentHash;
                this.GetDetails( item )
                return item;
            });

            this.setState( { list : data } );
        }).catch( (err) =>{
            console.log(err);
        })
    }

    getPaperDetails = () => {
        
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
          this.web3 = web3;
    
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
            const contractaddress= config["publisher"]
            instance.at(contractaddress).then( ( inst ) => {
                console.log( "This is deposit" , inst );
                this.setState( { web3 , accounts , contract : inst  } )
                this.getTransactions();

            });
            
            const tokenAddress = config["votecoin"]
            const votetoken = TruffleContract(VoteCoin)
            votetoken.setProvider(window.ethereum);
            votetoken.at( tokenAddress ).then( (inst) => {
                this.setState( {token : votetoken})
            });




    
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };


    vote = async ( paper ) => {

        // this.state.vote.addvote( paper.hash   )

    }

    GetDetails = async ( paper ) => {
        this.state.contract.getPaper( paper.hash ).then((result) => {
            console.log(result);
            // let x = new BigNumber(result["voteWeight"]);
            // console.log(x.toString() ) ;
        });        
    }

    //renders each card
    renderListItem = ( item ) => {
        return (
            <div className="list-item" >
            <div className="address">
                <div className="actions" > 
                    <div id="author" >Author : <Link to={'/author/' + item.address} > {item.address} </Link> 
                    </div>
                    <div>Votes : {item.votes}  </div>
                </div>
            </div>
            <div className="details"> 
                <div className="title" >
                    {item.name || "Name not available"}
                </div>
                <div className="subtitle" >
                    {item.description || "Description not available" }
                </div>
            </div>
            <div className="actions">
                
                <div className="btn" >
                    <a href={"https://ipfs.infura.io/ipfs/" + item.hash } target="_blank" > View </a>
                </div>

                <div className="btn" onClick = {this.vote}  >
                    Vote
                </div>
                
                <div className="btn" onClick={this.openModal} >
                    Tip The Author
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

            <div className="title">Liked the work? Tip the publisher</div>

            <MaticTransferComponent web3 = {this.state.web3} ></MaticTransferComponent>
            <div onClick={this.closeModal} > close </div>

        </Modal>
        </div>
        )
    }

}
export default PaperList