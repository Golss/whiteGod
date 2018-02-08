export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-portal-about',
		children: 'head'
	}
}

export function getInitState() {
	return { data: {} }
}