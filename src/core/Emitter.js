export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// dispatch, fire, trigger
	// Уведомляем слушателей, если они есть
	// table.emit('table:select', {a:1})
	emit(event, ...data) {
		if (!Array.isArray(this.listeners[event])) return
		this.listeners[event].forEach(listener => listener(...data))
	}

	// on, listen
	// Подписываемся на уведомление
	// Добавляем нового слушателя
	// formula.subscribe('table:select', () => {})
	subscribe(event, fn) {
		if (!this.listeners[event]) this.listeners[event] = []
		this.listeners[event].push(fn)

		return () => {
			this.listeners[event] = this.listeners[event].filter(
				listener => listener !== fn
			)
		}
	}
}

// Example
// const emitter = new Emitter()
// const unsubscribeBoo = emitter.subscribe('boo', function (data) {
// console.log('hello world!', data.a)
// })
// emitter.emit('boo', { a: 1 })
// unsubscribeBoo()
// emitter.emit('boo', { a: 2 })
