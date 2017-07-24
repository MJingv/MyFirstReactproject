import React from 'react';
import {Row, Col} from 'antd';

import {Tabs, Carousel} from 'antd';
import PCNewsBlock from './pcNewsBlock';
import PCNewsImageBlock from './pcNewsImageBlock.js';
import PCProduct from './pcProdect.js';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      effect: "fade"
    };

    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src={require("../../src/images/carousel_1.jpg")} /></div>
                  <div><img src={require("../../src/images/carousel_2.jpg")}/></div>
                  <div><img src={require("../../src/images/carousel_3.jpg")}/></div>
                  <div><img src={require("../../src/images/carousel_4.jpg")}/></div>
                </Carousel>
              </div>

              <PCNewsImageBlock count = {3} type = "top" width = "100%" cardTitle = {"头条"} imageWidth = "112px"></PCNewsImageBlock>

            </div>
            <Tabs className = "tabs_news">
              <TabPane tab="头条" key="1">
                <PCNewsBlock count ={15} type= "top" width="100%" bordered="false"/>
              </TabPane>

              <TabPane tab="国际" key="2">
                <PCNewsBlock count ={15} type= "guoji" width="100%" bordered="false"/>
              </TabPane>

              <TabPane tab="国内" key="3">
                <PCNewsBlock count ={15} type= "guonei" width="100%" bordered="false"/>
              </TabPane>

              <TabPane tab="社会" key="4">
                <PCNewsBlock count ={15} type= "shehui" width="100%" bordered="false"/>
              </TabPane>

            </Tabs>
            <Tabs className = "tabs_product">
              <TabPane tab = "ReactNews" key = "1">
                <PCProduct></PCProduct>
              </TabPane>
              <TabPane tab = "ReactNews" key = "2">
                <PCProduct></PCProduct>
              </TabPane>
              <TabPane tab = "ReactNews" key = "3">
                <PCProduct></PCProduct>
              </TabPane>
            </Tabs>


            <PCNewsImageBlock count = {9} type = "top" width = "100%" cardTitle = {"头条"} imageWidth = "112px"></PCNewsImageBlock>
            <PCNewsImageBlock count = {9} type = "yule" width = "100%" cardTitle = {"娱乐"} imageWidth = "112px"></PCNewsImageBlock>

          </Col>
          <Col span={2}></Col>
        </Row>
      </div>

    );
  };
}
