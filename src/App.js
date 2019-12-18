import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NavWrapper from './component/NavWrapper'

import Weather from './page/weather'
import Map from './page/map'
import History from './page/history'
import Setting from './page/setting'
import Login from './page/login'

import 'semantic-ui-css/semantic.min.css'
import './style/global.less'

class App extends React.Component {

	render() {
		return (
			<Router>
				<div className='app-root'>
					<Route exact path='/' component={Login}/>

					<Route path='/app' render={() => (
						<NavWrapper>
							<div className="g-content">
								<Switch>
									<Route exact path='/app/' component={() => <Redirect to='/app/weather'/>}/>
									<Route exact path='/app/weather' component={Weather}/>
									<Route exact path='/app/map' component={Map}/>
									<Route exact path='/app/history' component={History}/>
									<Route exact path='/app/setting' component={Setting}/>
								</Switch>
							</div>
						</NavWrapper>
					)} />
				</div>
			</Router>
		)
	}
}

export default App
