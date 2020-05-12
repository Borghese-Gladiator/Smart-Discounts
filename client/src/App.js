import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import RegressionDisplay from './components/regression-display'
import AboutComp from './components/about-comp'

function App(props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const navStyle = {
    textAlign: "center"
  }
  const navItemStyle = {
    display: "inline-block",
    float:"none",
    zoom:1
  }
  const navItemLinkStyle = {
  }

  return (
    <div className="App" style={{backgroundColor: "#ebebeb"}}>
      <AboutComp />
      <br />
      <br />
      <br />
      <RegressionDisplay />
    </div>
  );
}

export default App;
