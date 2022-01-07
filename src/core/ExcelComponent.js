import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
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

	// Уведомляем слушателей о событии event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args)
	}

	// Подписываемся на события event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}

	// Ининциализирует компонент
	// Добавляем DOM слушателей
	init() {
		this.initDomListeners()
	}

	// Удаляем компонент
	// Чистим слушателей
	destroy() {
		this.removeDomListeners()
		this.unsubscribers.forEach(unsub => unsub())
	}
}
