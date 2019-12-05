import React, { lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Entry from './page/entry'
import Exp_8_2 from './page/exp-8-2'
import Exp_8_3 from './page/exp-8-3'
import Exp_15 from './page/exp-15'

import 'semantic-ui-css/semantic.min.css'
import './style/global.less'

class App extends React.Component {

	render() {
		return (
			<Router>
				<div className='app-root'>
					<div className="g-content">
						<Switch>
							<Route exact path='/' component={Entry}/>
							<Route exact path='/exp-8-2' component={Exp_8_2}/>
							<Route exact path='/exp-8-3' component={Exp_8_3}/>
							<Route exact path='/exp-15' component={Exp_15}/>
						</Switch>
					</div>
				</div>
			</Router>
		)
	}
}

export default App
