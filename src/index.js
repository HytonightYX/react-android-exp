import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import stores from './store'
import { Provider } from 'mobx-react'

import { configure } from 'mobx'

configure({enforceActions: 'observed'})

/* polyfill: 安卓部分老版本游览器缺失 promise.prototype.finally 方法 */
require('promise.prototype.finally').shim()

ReactDOM.render(
	<Provider {...stores}>
		<App/>
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
