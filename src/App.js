import React, {Component} from 'react';
import './css/mobile.css';
import './css/pc.css'
import './App.css';
import PCIndex from './component/pcIndex';
import MobileIndex from './component/mobileIndex';

import {Route, BrowserRouter, Switch} from 'react-router-dom';
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
          <BrowserRouter >
            <Switch>
              <Route path="/" component={PCIndex}></Route>
              <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
              <Route path="/usercenter" component={PCUserCenter}></Route>
            </Switch>
          </BrowserRouter>
        </MediaQuery>

        <MediaQuery query='(max-device-width:1224px)'>
          <BrowserRouter >
            <Switch>
              <Route exact path="/" component={MobileIndex}></Route>
              <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>

              <Route path="/usercenter" component={MobileUserCenter}></Route>
            </Switch>
          </BrowserRouter>
        </MediaQuery>
      </div>
    );
  }
}
export default App;
