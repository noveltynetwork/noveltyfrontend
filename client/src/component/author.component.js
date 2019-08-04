
import React, { Component } from "react";
import '../css/author.css'

class Author extends Component{

    constructor(props){        
        super(props);
        this.state = { address : null  }
        
        this.state.address = this.props.match.params.author
    }

    render( ){
        if ( !this.state.address ){
            return (
                <div className="container" >
                    connecting..
                </div>
            )
        }else{
            return (
                <div className="container" >
                    <div class="author-container"> 
                        <div class="title">
                            {this.state.address}
                        </div>
                        <div class="analytics">
                            <div class="card" >
                                <div className="heading">
                                    Reputation Earned
                                </div>
                                <div className = "value">
                                    1042
                                </div>
                            </div> 

                            <div class="card" >
                                <div className="heading">
                                    Papers Published
                                </div>
                                <div className = "value">
                                    12 
                                </div>
                            </div> 
                            <div class="card" >
                                <div className="heading">
                                    Total Votes
                                </div>
                                <div className = "value">
                                    103
                                </div>
                            </div> 
                            
                        </div> 

                    </div>
                </div>
            )
        }
    }
}

export default Author;
