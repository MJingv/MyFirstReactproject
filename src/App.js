import React, {Component} from 'react';
import './css/mobile.css';
import './css/pc.css'
import './App.css';
import PCIndex from './component/pcIndex';
import MobileIndex from './component/mobileIndex';

import {Router, Route, Link, browserHistory, hashHistory} from 'react-router';
import MediaQuery from 'react-responsive';
import PCNewsDetails from './component/pcNewsDetails.js';
import MobileNewsDetails from './component/mobileNewsDetails.js';
import PCUserCenter from './component/pcUserCenter.js';
import MobileUserCenter from './component/mobileUserCenter';
class App extends Component {
  render() {
    return (
      <div >
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
          </Router>
        </MediaQuery>

        <MediaQuery query='(max-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
            <Route path="/usercenter" component={MobileUserCenter}></Route>
          </Router>
        </MediaQuery>
      </div>
    );
  }
}
export default App;
