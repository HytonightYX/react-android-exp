import React from 'react'
import { Icon } from 'antd'
import { MENU_MAIN } from '../../constant/data'
import { NavLink, withRouter } from 'react-router-dom'

import './index.less'

export default withRouter(({children, location}) => {
	return (
		<div className="g-nav">
			{children}
			<div className="m-nav">
				{MENU_MAIN.map((item, index) =>
					<NavLink to={item.url} key={index}>
						<li className="m-nav-item">
							{(location.pathname === item.url) && <Icon type={item.icon} theme="filled"/>}
							{(location.pathname !== item.url) && <Icon type={item.icon} theme="twoTone" twoToneColor="#3366cc"/>}
							<span>{item.name}</span>
						</li>
					</NavLink>
				)}
			</div>
		</div>
	)
})
