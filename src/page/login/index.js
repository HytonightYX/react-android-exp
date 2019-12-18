import React from 'react'
import { Icon, Form, Input, Button, Divider, message } from 'antd'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './index.less'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		}
	}

	doLogin = () => {
		this.props.form.validateFields(async (err, values) => {
			if (err) {
				return
			}

			console.log(values)

			// this.props.userStore.login(values)
			// 	.then(r => {
			// 		if (r && r.code === 200) {
			// 			message.success(r.msg)
			// 		} else if (r && r.code === 301) {
			// 			message.error(r.msg)
			// 		}
			// 	})
			if (values.username === 'a' && values.password === 'a') {
				message.success('登录成功')
				this.props.history.push('/app')
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
