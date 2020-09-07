export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// Уведомляем слушателей если они есть
	// table.emmit('table:select', {a: 1})
	emitt(event, ...args) {
		if (!Array.isArray(this.listeners[event])) return false

		this.listeners[event].forEach(listener => {
			listener(...args)
		})

		return true
	}

	// Подписываемся на кведомления
	// Добавляем нового слушателя
	// formula.subscribe('table:select', () => {})
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)

		return () => {
			this.listeners[event] = this.listeners[event].filter(
				listener => listener !== fn
			)
		}
	}
}

// example
// const emmiter = new Emitter()
// const unsubBla = emmiter.subscribe('bla', data =>
// console.log('sub:bla ' + data)
// )

// setTimeout(() => {
// emmiter.emitt('bla', 42)
// }, 2000)
// setTimeout(() => {
// unsubBla()
// }, 4000)
// setTimeout(() => {
// emmiter.emitt('bla', 42)
// }, 5000)
