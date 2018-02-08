import { Toast, Notification, Modal } from 'mk-component'
import { fetch } from 'mk-utils'
import './mock.js' //脱离后台测试，启用mock，否则这行注释

var _options = {}

//配置fetch
fetch.config({
	mock: true, //脱离后台测试，启用mock，否则这行注释

	//fetch支持切面扩展（before,after），对restful api统一做返回值或者异常处理
	after: (response, url) => {
		if (response.result) {
            console.log(url, response)
            /*if(response.token){ //登录后设置accessToken,根据需要调整
                fetch.config({token:response.token})
            }
            return response.value*/
		}
		else {
			Toast.error(response.error.message)
			throw { url, response }
		}
	}
})

function config(options) {
	Object.assign(_options, options)

	//对应用进行配置，key会被转换为'^<key>$'跟app名称正则匹配
    _options.apps && _options.apps.config({
        //'*': { webapi } //正式网站应该有一个完整webapi对象，提供所有web请求函数
        'mk-app-root': {
            startAppName: 'mk-app-portal'
//            startAppName: 'mk-app-login'
        },
//        'mk-app-login': {
//            goAfterLogin: {
//                appName: 'mk-app-portal'
//            }
//        },
        'mk-app-portal': {
            menu: [{
                key: '1',
                name: '脑袋',
                appName: 'mk-app-portal-about',
                isDefault: true
            }, {
                key: '2',
                name: 'apps',
                isExpand: true,
                children: [{
                    key: '201',
                    name: '人员列表',
                    appName: 'mk-app-person-list'
                }, {
                    key: '202',
                    name: '人员卡片',
                    appName: 'mk-app-person-card'
                }]
            }]
        }
    })

	_options.targetDomId = 'app' //react render到目标dom
	_options.startAppName = 'mk-app-portal' //启动app名，需要根据实际情况配置

	_options.toast = Toast //轻提示使用组件，mk-meta-engine使用
	_options.notification = Notification //通知组件
	_options.modal = Modal //模式弹窗组件
	return _options
}

config.current = _options

export default config