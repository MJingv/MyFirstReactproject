import React from 'react';
import logo from '../images/logo.svg';
import {Route, BrowserRouter, Switch,Link} from 'react-router-dom';

import {
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal
} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  };

  componentWillMount() {
    console.log("componentWillMount");

    if (localStorage.userNickName != "undefined"  && localStorage.userNickName != "") {
      this.setState({hasLogined: true});
      this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});

    } else {
      this.setState({hasLogined: false});
      localStorage.userid = '';
      localStorage.userNickName = '';
    }
  };

  setModalVisible(value) {
    this.setState({modalVisible: value});
  };

  handleClick(e) {

    if (e.key == "register") {
      this.setState({current: 'register'});
      this.setModalVisible(true);
      console.log(e.key);
    } else {
      console.log(e.key);
      this.setState({current: e.key});
    }
  };

  handleSubmit(e) {
    //页面开始向api提交
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'

    };

    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json())
    .then(json => {
      this.setState({userNickName: json.NickUserName, userid: json.UserId});
      localStorage.userid = json.UserId;
      localStorage.userNickName = json.NickUserName;


    });

    if (this.state.action == "login") {
      this.setState({hasLogined: true});

    }

    message.success(" 请求成功 ");
    this.setModalVisible(false);
  };

  login() {
    this.setModalVisible(true);

  };
  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setModalVisible(false);

  }

  callback(key) {
    if (1 == key) {
      this.setState({action: 'login'});

    } else if (2 == key) {
      this.setState({action: 'register'});

    }

  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
      ?<Link to={`/usercenter`}>
        <Icon type="inbox"></Icon>
      </Link>
      :
      <Icon type="setting" onClick={this.login.bind(this)}/>



    return (
      <div id="mobileheader">
        <header>
          <img src={logo} alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>

        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOK= {()=>this.setModalVisible(false)} okText="关闭">
          <Tabs type="card" onChange={this.callback.bind(this)}>

            <TabPane tab="登陆" key="1">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="登陆">
                  {getFieldDecorator('userName', {
                    rules: [
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input prefix={< Icon type = "appstore" />} placeholder="请输入你的用户名"/>
                  )}
                </FormItem>

                <FormItem label="密码">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input prefix={< Icon type = "appstore" />} type="password" placeholder="请输入你的密码"/>
                  )}
                  <Button type="primary" htmlType="submit">登陆</Button>
                </FormItem>

              </Form>

            </TabPane>

            <TabPane tab="注册" key="2">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName', {
                    rules: [
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input prefix={< Icon type = "appstore" />} placeholder="请输入你的账号"/>
                  )}
                </FormItem>

                <FormItem label="账户">
                  {getFieldDecorator('r_password', {
                    rules: [
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input prefix={< Icon type = "appstore" type = "password" />} placeholder="请输入你的密码"/>
                  )}
                </FormItem>

                <FormItem label="账户">
                  {getFieldDecorator('r_confirmPassword', {
                    rules: [
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input prefix={< Icon type = "appstore" type = "password" />} placeholder="确认密码"/>
                  )}
                  <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>

              </Form>
            </TabPane>
          </Tabs>
        </Modal>

      </div>

    );
  };
}
export default MobileHeader = Form.create({})(MobileHeader)
