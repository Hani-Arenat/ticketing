import React from "react";
import {Link} from 'react-router-dom'

import './HomePage.scss'
const HomePage = () => {
  return (
    <div className='home-page'>
      <h2>Home Page</h2>
      <ul>
        <li><Link to='/advanced-phone'>advanced-phone</Link></li>
        <li><Link to='/searchable-select'>searchable-select</Link></li>
        <li><Link to='/ticket'>ticket</Link></li>
      </ul>
    </div>
  );
};

export default HomePage;
