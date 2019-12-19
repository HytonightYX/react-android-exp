import React from 'react'
import { Icon, Form, Input, Button, Divider, message } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import { getUserData } from '../../util/ls-helper'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			user: null
		}
	}

	componentDidMount() {
		if (window.localStorage.getItem('rem') === '1') {
			window.localStorage.setItem('login', '1')
			message.success('自动登录成功')
			this.props.history.push('/app')
		}
	}

	doLogin = () => {
		this.props.form.validateFields(async (err, values) => {
			if (err) {
				return
			}

			const lsuser = getUserData()

			if (values.username === lsuser.username && values.password === lsuser.password) {
				this.props.history.push('/app')
				window.localStorage.setItem('login', '1')
			} else {
				message.error('用户名或密码错误，来宾账号密码均为 a')
			}
		})
	}

	render() {
		const {getFieldDecorator} = this.props.form
		return (
				<div className='g-login'>
					{/*{this.currUser && <Redirect to='/'/>}*/}

					<div className="m-tri">
						<div className='m-title'>天气预报</div>
					</div>

					<div className='m-login'>
						<Form>
							<Form.Item>
								{getFieldDecorator('username', {
									rules: [{required: true, message: '请输入E-mail！'}],
									initialValue: ''
								})(
									<Input
										icon="search"
										size='large'
										className="input-pwd input-center"
										placeholder="用户名..."
										allowClear
										prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
									/>)}
							</Form.Item>

							<Form.Item>
								{getFieldDecorator('password', {
									rules: [{required: true, message: '请输入密码！'}],
								})(
									<Input.Password
										size='large'
										className="input-pwd input-center"
										placeholder="密码..."
										prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
									/>)}
							</Form.Item>

							<Form.Item className='no-bottom'>
								<Button
									type="primary"
									size="large"
									className="input-btn"
									onClick={this.doLogin}
									block
								>
									登录
								</Button>
							</Form.Item>

							<Divider orientation='center'>or</Divider>

							<Form.Item className='no-bottom'>
								<Link to='/register'>
									<Button
										size="large"
										className="input-btn"
										block
									>
										忘记密码？
									</Button>
								</Link>
							</Form.Item>
						</Form>
					</div>
				</div>
		)
	}
}

export default Form.create()(Login)
