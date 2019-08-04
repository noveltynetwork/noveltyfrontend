import getweb3 from './utils/getWeb3'
class Web3Service{

    web3 = null;
    publisher = null
    votetoken = null
    currentAddress = null

    constructor(){
        this.Init()    
    }

    Init = () => {
        getweb3().then( (web3) => {
            this.web3 = web3;
                    // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            this.currentAddress = accounts[0];
    
            // Get the contract instance.
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = TruffleContract(Publisher);
    
            //do it properly
            instance.setProvider(window.ethereum);
    
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            const contractaddress= "0x069921277b4Ffc549f4Ecb7F5E65eF4ee4c5BfbD"
            instance.at(contractaddress).then( ( inst ) => {
                console.log( "THIS is deposit" , inst );
                this.publisher = inst

                });
            });

            //do the same for vote token
            const votecontractaddress = '';
    }

    GetPublisherContract = () => {
        return this.publisher;   
    }

    GetVoteTokenContract = () => {
        
    }

    Publish = ( hash ) => {
        return this.publisher.Publish( hash ,  { from : this.from } ) 
    }

    GetAllPapers(){

    }

    GetAuthorPapers( address ){
        // return this.publisher.
    }

    GetMyPapers(){
        // 
    }

    GetBalance = () => {
     
        
            const erc20Contract = new this.web3.eth.Contract(ChildERC20, token)
            const balance = await erc20Contract.methods.balanceOf(this.from).call()
            console.log("balance", balance)
     
    }

}

let service =  new Web3Service();
export default service;