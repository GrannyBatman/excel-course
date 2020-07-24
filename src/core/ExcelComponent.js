import { DomListenter } from '@core/DomListenter'

export class ExcelComponent extends DomListenter {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
	}
	// Возвращает шаблон компонента
	toHTML() {
		return ''
	}

	init() {
		this.initDOMListenters()
	}

	destroy() {
		this.removeDOMListenters()
	}
}
