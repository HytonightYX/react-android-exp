export const getUserData = () => {
	return {
		username: window.localStorage.getItem('username'),
		password: window.localStorage.getItem('password'),
		desc: window.localStorage.getItem('desc')
	}
}
