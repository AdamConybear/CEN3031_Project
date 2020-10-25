import React from 'react';
import { Link } from 'react-router-dom';
import gator from '../../assets/lilgator.png';
import './Header.css';

const Header = () => {
    return (

        <div class="header" style = {{margin: "auto"}}>
            <img src={gator} alt = "logo"/>
            
            <a href="#Gator" class= "GatorRater"> <b>Gator Rater</b></a>
        
            <div class="header-right">
                <a href="#dashboard">Weekly Schedule</a>
            
                <a href="#whatif">What-If</a>
            
                <a href="#resource">Resources</a>
            
                <a href="#Comment">Comment Board</a>
                <a href="#signout">Sign Out</a>
            
                
            </div>
        </div>

    )
}

export default Header;
