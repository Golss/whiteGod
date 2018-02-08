import webapi from './webapi'
import logo from './img/logo.png'

var _options = {
	webapi,
	goAfterLogin: {
		appName: 'mk-app-portal',
		appParams: {}
	},
	goRegister:{
		appName: 'mk-app-register',
		appParams: {}
	},
	goForgot:{
		appName: 'mk-app-forgot-password',
		appParams: {}
	},
	logo: logo
}


function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config