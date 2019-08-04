// import VoteToken from '../contracts/VoteToken';

let url = `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x1dD7C32440c9613185Fc6053D44872034aB5fe91&startblock=0&endblock=99999999&sort=asc&apikey=WWZ42T9GT8TPQ9XI76U3N5QPDF2AEHKJRZ`

export const getAllTransactions = () => {
    return fetch( url ).then( res => res.json());
}

// export const GetBalance = async (web3 , token , from  ) => {
             
//     const VoteTokenContract = new this.web3.eth.Contract(VoteToken, token)
//     const balance = await VoteTokenContract.methods.balanceOf(from).call()
//     console.log("balance", balance)
//     return balance;

// }

// export const Getdetails = ( hash , pbinstance ){
    
//     return pbinstance.getPaper( hash ).then( (result) => {
//         console.log(result).
//     }); 

// }






