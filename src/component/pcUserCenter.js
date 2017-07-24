import React from 'react';
import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  Form,
  Modal,
  Card,
  Upload
} from 'antd';


import PCHeader from './pcHeader';
import PCFooter from './pcFooter';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class PCUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      usercollection:'',
      usercomments:'',
      previewVisible: false,

      previewImage: '',

    };

  };

  componentDidMount(){
    var myFetchOptions = {
      method : "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,
    myFetchOptions)
    .then(response => response.json())
    .then(json =>{
      this.setState({usercollection:json});

    });

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,
    myFetchOptions)
    .then(response => response.json())
    .then(json =>{
      this.setState({usercomments:json});

    });

  }
  handleCancel = () => this.setState({previewVisible: false});

  render() {
    const props = {
      action:'http://newsapi.gugujiankong.com/handle.ashx',
      headers:{
        "Access-Control-Allow-Origin":"*"

      },
      listType:'picture-card',
      defaultFileList:[
        {
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }

      ],
      onPreview:(file)=>{
        this.setState({previewImage:file.url,previewVisible:true});
      }
    };

    const {usercollection,usercomments} = this.state;
    const usercollectionList= usercollection.length?
    usercollection.map((uc,index) =>(
    <Card key={index} title = {uc.uniquekey}  extra ={<a target="_blank" href={`/#/details/${uc.uniquekey}` }>查看</a>}>
      <p>{uc.Title}</p>
    </Card>

    ))
    :"没有任何收藏，快去收藏吧"
    ;

    const usercommentsList= usercomments.length?
    usercomments.map((comment,index) =>(
    <Card key={index} title = {  `在${comment.datetime}评论了 ${comment.uniquekey} ` }  extra ={<a target="_blank" href={`/#/details/${comment.uniquekey}` }>查看</a>}>
      <p>评论内容是：{comment.Comments} </p>
    </Card>

    ))
    :"没有任何评论，快去评论吧"
    ;

    return (
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div className = "comment">
                  <Row>
                    <Col span = {2}></Col>
                    <Col span = {20}>
                      {usercollectionList}
                    </Col>
                    <Col span = {2}></Col>
                  </Row>

                </div>

              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <div className = "comment">
                  <Row>
                    <Col span = {2}></Col>
                    <Col span = {20}>
                      {usercommentsList}
                    </Col>
                    <Col span = {2}></Col>
                  </Row>

                </div>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div className="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传照片</div>

                  </Upload>
                  <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="预览" src={this.state.previewImage}></img>
                  </Modal>

                </div>
              </TabPane>

            </Tabs>
          </Col>
          <Col span={4}></Col>
        </Row>
        <PCFooter></PCFooter>
      </div>

    );
  };
}
