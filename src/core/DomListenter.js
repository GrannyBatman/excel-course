import { capitalize } from '@core/utils'

export class DomListenter {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided too DomListenter')
		}

		this.$root = $root
		this.listeners = listeners
	}

	initDOMListenters() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(
					`Method ${method} is not implemented in ${this.name} Component`
				)
			}
			this[method] = this[method].bind(this)
			this.$root.on(listener, this[method])
		})
	}

	removeDOMListenters() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.off(listener, this[method])
		})
	}
}

function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}
