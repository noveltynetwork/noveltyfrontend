import React, { Component } from "react";
import '../css/home.css';
import hero from '../assets/hero.svg'
import { Link } from 'react-router-dom'

class Home extends Component{

    render( ){
        return (
            <div className="container" >
                <section>
                    <div className="hero">
                        <div className="heading">
                            <h1> Decentralized Paper Reputation Dapp  </h1>
                            <h2> Open Access, decentralized journal with In-built reputation system.</h2>
                            <div className="btn white center mt-10" > <Link to="/publish"  ></Link>  Publish Now </div>
                        </div>
                        <div className="image">
                            <img src={hero} alt="paper"/>
                        </div>
                    </div>
                </section> 
            </div>
        )
    }
}

export default Home