import { Button } from 'semantic-ui-react'
import { Card } from 'antd'
import React from 'react'

export default ({unset, load}) => (
	<div className="m-sport">
		<Button onClick={unset}>
			{load ? '删除组件' : '加载组件'}
		</Button>

		{
			load ? (
				<Card
					style={{marginTop: 16}}
					type="inner"
					title="英国伦敦桥袭击案：第二位受害者身份确认"
					extra={<a href="#">详情</a>}
				>
					英国伦敦桥袭击案第二位受害者身份确认，她的名字为萨斯基亚·琼斯。
				</Card>
			) : null
		}
	</div>
)