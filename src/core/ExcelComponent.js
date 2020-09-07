import { DomListenter } from '@core/DomListenter'

export class ExcelComponent extends DomListenter {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.emitter = options.emitter
		this.unsubscribers = []

		this.prepare()
	}

	// Настраиваем наш компонент до init
	prepare() {}

	// Возвращает шаблон компонента
	toHTML() {
		return ''
	}

	// Уведомляем слушателей про событие event
	$emitt(event, ...args) {
		this.emitter.emitt(event, ...args)
	}

	// Подписываемся на обытия event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}

	// Инициализируем компонент
	// Добавляем DOM слушателей
	init() {
		this.initDOMListenters()
	}

	// Удаляем компонент
	// Чистим слушатели
	destroy() {
		this.removeDOMListenters()
		this.unsubscribers.forEach(unsub => unsub())
	}
}
