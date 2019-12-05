import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './style.less'

class Entry extends React.Component {

	render() {
		return (
			<div className="g-entry">
				<Link to='/exp-8-2'><Button size="large" primary>实验8-2</Button></Link>
				<Link to='/exp-8-3'><Button size="large" primary>实验8-3</Button></Link>
				<Link to='/exp-15'><Button size="large" primary>实验-15</Button></Link>
			</div>
		)
	}
}

export default Entry
