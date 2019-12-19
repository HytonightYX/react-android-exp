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

window.localStorage.setItem('username', 'a')
window.localStorage.setItem('password', 'a')
window.localStorage.setItem('desc', '这位高人尚未留下自我介绍')
window.localStorage.setItem('city', '浙江省杭州市')

ReactDOM.render(
	<Provider {...stores}>
		<App/>
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
