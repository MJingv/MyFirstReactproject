import React from 'react';
import logo from '../images/logo.svg';
import {Router, Route, Link, browserHistory} from 'react-router'

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

class PCHeader extends React.Component {
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

    if (localStorage.userNickName != "undefined" && localStorage.userNickName != "") {
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
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
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

  callback(key) {
    if (1 == key) {
      this.setState({action: 'login'});

    } else if (2 == key) {
      this.setState({action: 'register'});

    }

  };

  logout() {
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLogined: false});

  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
      ? <Menu.Item key='logout' className="register">
          <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
          &nbsp;&nbsp;
          <Link target="_blank" to = {`/usercenter`}>
            <Button type="dashed" htmlType="button">个人中心</Button>
          </Link>
          &nbsp;&nbsp;
          <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item>
      : <Menu.Item key="register" className="register">
        <Icon type="appstore"/>注册/登陆
      </Menu.Item>
      ;

    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>

          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore"/>头条
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore"/>国际
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore"/>社会
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore"/>娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore"/>体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore"/>科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore"/>时尚
              </Menu.Item>
              {userShow}
            </Menu>

            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOK= {()=>this.setModalVisible(false)} okText="关闭">
              <Tabs type="card" onChange={this.callback.bind(this)}>

                <TabPane tab="登陆" key="1">
                  <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="登陆">
                      {getFieldDecorator('userName', {
                        rules: [
                          {
                            required: true,
                            whitespace: true,
                            message: '请输入你的用户名!'
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
                            required: true,
                            whitespace: true,
                            message: '请输入你的密码!'
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
                    <FormItem label="用户名">
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

                    <FormItem label="密码">
                      {getFieldDecorator('r_password', {
                        rules: [
                          {
                            required: true
                          }
                        ]
                      })(
                        <Input prefix={< Icon type = "appstore" />} type="password" placeholder="请输入你的密码"/>
                      )}
                    </FormItem>

                    <FormItem label="确认密码">
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [
                          {
                            required: true
                          }
                        ]
                      })(
                        <Input prefix={< Icon type = "appstore" />} type="password" placeholder="确认密码"/>
                      )}
                      <Button type="primary" htmlType="submit">注册</Button>
                    </FormItem>

                  </Form>
                </TabPane>
              </Tabs>
            </Modal>

          </Col>
          <Col span={2}></Col>

        </Row>

      </header>
    );
  };
}
export default PCHeader = Form.create({})(PCHeader)
