import { Form, Input, Modal, Select, message, Icon } from 'antd'
import React from 'react'
import './style.less'
import { getUserData } from '../../util/ls-helper'
import { getAddr } from '../../util/reg-helper'

const {Option} = Select

@Form.create()
class Setting extends React.Component {

	state = {
		userVisible: false,
		cityVisible: false,
		hisVisible: false,
		rem: false,
		username: '',
		desc: '',
		user: null
	}

	componentDidMount() {
		const lsuser = getUserData()

		this.setState({
			user: lsuser,
			rem: window.localStorage.getItem('rem'),
			username: window.localStorage.getItem('username'),
			desc: window.localStorage.getItem('desc')
		})
	}

	showModal = () => {
		this.setState({
			userVisible: true,
		})
	}

	handleOk = e => {
		this.props.form.validateFields((err, values) => {
			if (err) {
				console.log(err)
				message.error(err.message)
			}

			window.localStorage.setItem('password', values.new_password)
			message.success('修改密码成功', 0.7)
		})

		this.setState({
			userVisible: false
		})
	}

	handleCancel = e => {
		this.setState({
			userVisible: false,
		})
	}

	handleRem = () => {
		const rem = window.localStorage.getItem('rem') === '1'
		window.localStorage.setItem('rem', rem ? '0': '1')
		message.success(`已${rem ? '关闭' : '开启'}自动登录`)
		this.setState({
			rem: !rem
		})
	}

	doLogOut = () => {
		message.success('已登出')
		window.localStorage.setItem('login', '0')
		window.localStorage.setItem('rem', '0')
		this.props.history.push('/')
	}

	render() {
		const {confirmLoading, rem, user} = this.state
		const {getFieldDecorator} = this.props.form

		return (
			<div className="g-setting">
				<div className="m-hd">
					<div className="m-face">
						<img src='https://semantic-ui.com/images/avatar2/large/matthew.png' alt=""/>
					</div>
					<div className="m-hd-info">
						<span className="m-name">{user && user.username}</span>
						<span className="m-desc">{user && user.desc}</span>
					</div>
				</div>

				<div className="m-group">
					<div className="m-menu" onClick={this.showModal}>个人信息设置</div>
				</div>

				<div className="m-group">
					<div className="m-menu" onClick={() => this.props.history.push('/app/map')}><span className="sn">默认城市设置</span><span className="sr">{getAddr(window.localStorage.getItem('city'))}</span></div>
					<div className="m-menu"><span className="sn">历史天气显示</span><span className="sr">7天</span></div>
				</div>

				<div className="m-group m-last">
					<div className="m-menu" onClick={this.handleRem}>
						<span className="sn">下次自动登录</span>
						<span className="sr">{rem ? '已开启' : '已关闭'}</span>
					</div>
					<div className="m-menu" onClick={this.doLogOut}>退出登录</div>
				</div>

				<Modal
					title="个人信息设置"
					visible={this.state.userVisible}
					cancelText='取消'
					okText='确定'
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					destroyOnClose={true}
				>
					<Form>
						<Form.Item label="初始密码">
							{getFieldDecorator('password', {
								rules: [
									{required: true, message: '请输入初始密码！'},
									{
										validator: (rule, val, cb) => {
											if (val === window.localStorage.password) {
												cb()
											}
											cb('初始密码错误！')
										}
									}
								],
								initialValue: ''
							})(<Input type="password" className="input-text" placeholder="请输入初始密码..."/>)}
						</Form.Item>

						<Form.Item label="新密码">
							{getFieldDecorator('new_password', {
								rules: [{required: true, message: '请输入新密码！'}],
								initialValue: ''
							})(<Input type="password" className="input-text" placeholder="请输入新密码..."/>)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

export default Setting
