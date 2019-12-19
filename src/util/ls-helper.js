export const getUserData = () => {
	return {
		username: window.localStorage.getItem('username'),
		password: window.localStorage.getItem('password'),
		desc: window.localStorage.getItem('desc')
	}
}

export const initLocalStorage = () => {
	if (!window.localStorage.getItem('city')) {
		window.localStorage.setItem('city', '浙江省杭州市')
	}
	if (!window.localStorage.getItem('username')) {
		window.localStorage.setItem('username', 'a')
	}
	if (!window.localStorage.getItem('password')) {
		window.localStorage.setItem('password', 'a')
	}
	if (!window.localStorage.getItem('desc')) {
		window.localStorage.setItem('desc', '这位高人尚未留下自我介绍')
	}
	if (!window.localStorage.getItem('rem')) {
		window.localStorage.setItem('rem', '0')
	}
	if (!window.localStorage.getItem('login')) {
		window.localStorage.setItem('login', '0')
	}
}
