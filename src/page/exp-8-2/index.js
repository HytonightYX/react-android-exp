import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './style.less'
import { Card, Icon, Tabs } from 'antd'
import HotList from './hot-list'
import Ente from './ente'
import Sport from './sport'

const {TabPane} = Tabs

const navIconList = [
	{name: '头条', url: '/', icon: 'camera'},
	{name: '娱乐', url: '/leave', icon: 'picture'},
	{name: '体育', url: '/cal', icon: 'notification'},
	{name: '我的', url: '/user', icon: 'smile'},
]


class Entry extends React.Component {

	state = {
		load: false,
		tabs: true,
		active: '头条'
	}

	unset = () => {
		this.setState({load: !this.state.load})
	}

	render() {
		const {load, tabs, active} = this.state

		return (
			<div className="g-exp-8-2">
				{tabs && <Tabs defaultActiveKey="1" tabBarGutter={36}>
					<TabPane tab={<span><Icon type="camera"/>头条</span>} key="1">
						<HotList/>
					</TabPane>

					<TabPane tab={<span><Icon type="picture"/>娱乐</span>} key="2">
						<Ente/>
					</TabPane>

					<TabPane tab={<span><Icon type="notification"/>体育</span>} key="3">
						<Sport load={load} unset={this.unset}/>
						<div style={{textAlign: 'center', padding: '0 20px'}}>
							<Button className="change-mode" onClick={() => this.setState({tabs: false})}>切换模式</Button>
						</div>
					</TabPane>
				</Tabs>}

				{!tabs && (
					<div className="m-tab">
						{active === '头条' && <HotList/>}
						{active === '娱乐' && <Ente/>}
						{active === '体育' && <Sport load={load} unset={this.unset}/>}
						{active === '我的' && (
							<div style={{textAlign: 'center', padding: '20px'}}>
								<Button onClick={() => this.setState({tabs: true})}>
									切换 Tab 模式
								</Button>
							</div>
						)}

						<div className="m-nav">
							{navIconList.map((item, index) =>
								<div key={index}>
									<li className="m-nav-item" onClick={() => this.setState({active: item.name})}>
										{active === item.name && <Icon type={item.icon} theme="filled"/>}
										{active !== item.name && <Icon type={item.icon} theme="twoTone" twoToneColor="#3366cc"/>}
										<span>{item.name}</span>
									</li>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default Entry
