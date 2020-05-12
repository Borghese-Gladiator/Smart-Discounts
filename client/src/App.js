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
  }
  const navItemStyle = {
  }
  const navItemLinkStyle = {
  }

  return (
    <div className="App">
      <Nav tabs style={navStyle}>
        <NavItem style={navItemStyle}>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            style={navItemLinkStyle}
          >
            Smart Discounts
          </NavLink>
        </NavItem>
        <NavItem style={navItemStyle}>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            style={navItemLinkStyle}
          >
            About Project
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <RegressionDisplay />
        </TabPane>
        <TabPane tabId="2">
          <AboutComp />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default App;
