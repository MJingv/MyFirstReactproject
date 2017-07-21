import React from 'react';
import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal,
  Card,
  notification,
  Upload
} from 'antd';

import {Router, Route, Link, browserHistory} from 'react-router';
import MobileHeader from './mobileHeader';
import MobileFooter from './mobileFooter';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      usercollection: '',
      usercomments: '',
      previewVisible: false,
      previewImage: ''
    };

  };

  componentDidMount() {
    var myFetchOptions = {
      method: "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({usercollection: json});
    })

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({usercomments: json});
    })

  }

  handleCancel = () => this.setState({previewVisible: false});

  render() {
    const props = {
      action: 'http://newsapi.gugujiankong.com/handle.ashx',
      headers: {
        "Access-Control-Allow-Origin": "*"

      },
      listType: 'picture-card',

      defaultFileList: [
        {
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }

      ],
      onPreview: (file) => {
        this.setState({previewImage: file.url, previewVisible: true});
      }
    }

    const {usercollection, usercomments} = this.state;
    const usercollectionList = usercollection.length
      ? usercollection.map((uc, index) => (
        <Card key={index} title={uc.uniquekey} extra ={< a href = {
          `/#/details/${uc.uniquekey}`
        } > 查看 < /a>}>
          <p>{uc.Title}
          </p>

        </Card>

      ))
      : "没有任何收藏，快去收藏吧";

    const usercommentsList = usercomments.length
      ? usercomments.map((comment, index) => (
        <Card  key={index} title={`在${comment.datetime} 评论 `}
          extra ={< a href = {
          `/#/details/${comment.uniquekey}`
        } > 查看 < /a>}>
          <p><Icon type="like-o" />评论内容是：{comment.Comments}</p>
        </Card>
      ))
      : "没有任何评论，快去评论吧";

    return (
      <div>
        <MobileHeader></MobileHeader>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs type="card">
              <TabPane tab={< span > <Icon type="star-o"/>我的收藏 < /span>} key="1">
                <div >
                  <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                      {usercollectionList}
                    </Col>
                    <Col span={2}></Col>
                  </Row>

                </div>
              </TabPane>
              <TabPane tab={< span > <Icon type="message"/>我的评论 < /span>} key="2">
                <div >
                  <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                      {usercommentsList}
                    </Col>
                    <Col span={2}></Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab={< span > <Icon type="user"/>我的头像 < /span>} key="3">
                <div className="clearfix">
                  <Upload {...props}>
                    < Icon type="plus"/>
                    <div className="ant-upload-text">上传照片</div>
                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="预览" src={this.state.previewImage}></img>
                    </Modal>
                  </Upload>

                </div>

              </TabPane>
            </Tabs>

          </Col>
          <Col span={1}></Col>
        </Row>

        <MobileFooter></MobileFooter>
      </div>

    );
  };
}
