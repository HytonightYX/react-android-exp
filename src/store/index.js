import { observable } from 'mobx'

class MainStore {
	@observable
	currUser = null

	@observable
	city = 'hangzhou'

}

const main = new MainStore()

export default {
	main
}
