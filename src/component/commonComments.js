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
  notification
} from 'antd';

import {Route, BrowserRouter, Switch,Link} from 'react-router-dom';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    };
  };
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({comments: json});
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formdata = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
      this.componentDidMount();
    });

  };

  addUserCollection() {
    var myFetchOptions = {
      method: "GET"

    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
      //notify the glogal
      notification.open(
				{
				message: '收藏提醒⏰',
				description:'已经收藏成功',
				icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
			}
			);

    })
  }

  render() {
    let {getFieldProps} = this.props.form;
    const {comments} = this.state;
    const commnetList = comments.length
      ? comments.map((comment, index) => (
        <Card key={index} title={comment.UserName} extra={< a href = "#" > 发布于 {comment.datetime} < /a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      : '没有加载到任何评论';
    return (
      <div class="comment">
        <Row>
          <Col span={24}>
            {commnetList}
            <Form onSubmit ={this.handleSubmit.bind(this)}>
              <FormItem label="登陆后可评论">
                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark',{initialValue: ''})}/>
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="Button " onClick={this.addUserCollection.bind(this)}>
                收藏</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  };
}
export default CommonComments = Form.create({})(CommonComments);
