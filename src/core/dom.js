class Dom {
	constructor(selector) {
		this.$el =
			typeof selector === 'string' ? document.querySelector(selector) : selector
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.innerHTML.trim()
	}

	text(text) {
		if (typeof text === 'string') {
			this.$el.textContent = text
			return this
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim()
		}
		return this.$el.textContent.trim()
	}

	clear() {
		this.html('')
		return this
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback)
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el
		}

		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}
		return this
	}

	get data() {
		return this.$el.dataset
	}

	getId(parse) {
		if (parse) {
			const [x, y] = this.getId().split(':').map(Number)
			return { x, y }
		}

		return this.data.id
	}

	closest(selector) {
		return $(this.$el.closest(selector))
	}

	getCoords() {
		return this.$el.getBoundingClientRect()
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => (this.$el.style[key] = styles[key]))
	}

	find(selector) {
		return $(this.$el.querySelector(selector))
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}

	focus() {
		this.$el.focus()
		return this
	}

	addClass(className) {
		this.$el.classList.add(className)
		return this
	}

	removeClass(className) {
		this.$el.classList.remove(className)
		return this
	}
}

export function $(selector) {
	return new Dom(selector)
}

$.create = (tagname, classes = '') => {
	const el = document.createElement(tagname)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}
