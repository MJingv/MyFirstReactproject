import React from 'react';
import MobileHeader from './mobileHeader';
import MobileFooter from './mobileFooter';
import {Tabs,Carousel} from 'antd';
import MobileList from './mobileList';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
  constructor() {
    super();
  };

  render() {
    const settings = {
      dots: true,
      autoplay: true,
      effect: "fade"

    }
    return (
      <div>
        <MobileHeader></MobileHeader>
        <Tabs>
          <TabPane tab="头条" key="1">
            <div className = "carousel">
              <Carousel {...settings}>
                <div><img src = {require ("../../src/images/carousel_1.jpg")}></img></div>
                <div><img src = {require ("../../src/images/carousel_2.jpg")}></img></div>
                <div><img src = {require ("../../src/images/carousel_3.jpg")}></img></div>
                <div><img src = {require ("../../src/images/carousel_4.jpg")}></img></div>
              </Carousel>

            </div>
            <MobileList count ={10} type="top"></MobileList>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count ={10} type="shehui"></MobileList>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count ={10} type="guonei"></MobileList>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count ={10} type="guoji"></MobileList>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count ={10} type="yule"></MobileList>
          </TabPane>
        </Tabs>
        <MobileFooter></MobileFooter>
      </div>

    );
  };
}
