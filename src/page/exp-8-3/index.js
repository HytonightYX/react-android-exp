import React from 'react'
import './style.less'
import { Button, Icon as SemIcon } from 'semantic-ui-react'
import { Drawer, Icon, Divider } from 'antd'

class Exp_8_3 extends React.Component {
	state = {
		visDrawer1: false,
		visDrawer2: false
	}

	showDrawer1 = () => {
		this.setState({visDrawer1: true})
	}

	showDrawer2 = () => {
		this.setState({visDrawer2: true})
	}

	onClose = () => {
		this.setState({
			visDrawer1: false,
			visDrawer2: false
		})
	}

	render() {
		return (
			<div className="g-exp-8-3">
				<Button primary className="m-button" onClick={this.showDrawer1}>抽屉样式一</Button>
				<Button primary className="m-button" onClick={this.showDrawer2}>抽屉样式二</Button>

				<Drawer
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visDrawer1}
					headerStyle={{display: 'none'}}
					bodyStyle={{height: '100%', padding: 0}}
					width={180}
				>
					<div className="m-drawer-1">
						<div className="item"><Icon type="profile" theme="twoTone" /><span>实时信息</span></div>
						<Divider style={{margin: 10}}/>
						<div className="item"><Icon type="alert" theme="twoTone" /><span>提醒通知</span></div>
						<Divider style={{margin: 10}}/>
						<div className="item"><Icon type="fire" theme="twoTone" /><span>活动路线</span></div>
						<Divider style={{margin: 10}}/>
						<div className="item"><Icon type="control" theme="twoTone" /><span>相关设置</span></div>
					</div>
				</Drawer>

				<Drawer
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visDrawer2}
					headerStyle={{display: 'none'}}
					bodyStyle={{height: '100%', padding: 0}}
					width={300}
				>
					<div className="m-drawer-2">
						<div className="nav-top">
							<div className="user">
								<img src="https://picsum.photos/100/100" alt=""/>
								<div className="username">HytonightYX</div>
							</div>
						</div>

						<div className="nav-list">

							<div><Button basic fluid className="nav-btn"><SemIcon name='home'/>主页</Button></div>
							<div><Button basic fluid className="nav-btn"><SemIcon name='inbox'/>消息</Button></div>
							<div><Button basic fluid className="nav-btn"><SemIcon name='user'/>我的</Button></div>

							<div className="sub-title">通讯</div>
							<div><Button basic fluid className="nav-btn"><SemIcon name='share'/>共享</Button></div>
							<div><Button basic fluid className="nav-btn"><SemIcon name='send'/>发送</Button></div>
						</div>
					</div>
				</Drawer>
			</div>
		)
	}

}

export default Exp_8_3
