import ChildERC20 from '../contracts/ChildERC20.json';

class MaticTransfer {

    from = null;
    matic = null
    web3 = null
    constructor(from , web3){
        this.from = from ;
        this.web3 = web3;         
    }

    getBalance = async( token  ) => {
        
        const erc20Contract = new this.web3.eth.Contract(ChildERC20, token)
        const balance = await erc20Contract.methods.balanceOf(this.from).call()
        console.log("balance", balance)
    }


    TransferTo = ( to, token , amount ) => {
        
        const _tokenContract = this.getChildTokenContract(token);
        return _tokenContract.methods.transfer(to, amount).send({
            from: this.from
        });
          
    }

    getChildTokenContract = (token) => {
        const _token = token.toLowerCase()
        let _tokenContract = new this.web3.eth.Contract(ChildERC20.abi, _token)    
        return _tokenContract;
    }

}

export default MaticTransfer

