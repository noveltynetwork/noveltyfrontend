import React, { Component } from "react";
import MaticTransfer from "../utils/matic.store";

import {Snackbar} from '@material/react-snackbar';


class MaticTransferComponent extends Component{

    web3= null;
    constructor(props){
        super(props);
        this.web3 = this.props.web3;
        this.state = { showSnackbar : false}
    }

    startTransfer = async () => {
        // Use web3 to get the user's accounts.
        const accounts = await this.web3.eth.getAccounts();
        console.log(this.web3.eth);
        let from  = accounts[0];
        let matic = new MaticTransfer( from , this.web3 );
        
        let to  = "0xC67492666419D6237bF220C92F8D32e6819dd3aF";
        let token = "0xc82c13004c06e4c627cf2518612a55ce7a3db699";

        matic.TransferTo( to , token , 1000000000000000 ).then( (result) => {
            console.log(result);
            this.props.transactionComplete( result );
        });
    }

    render(){

        return ( 
        <div>
            <div class="btn" onClick = {this.startTransfer} >Matic Transfer</div>  
        </div>
        )
    }


}

export default MaticTransferComponent;