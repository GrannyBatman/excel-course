export class TableSelection {
	static className = 'selected'
	constructor() {
		this.group = []
		this.current = null
	}

	// $el isnstanceof Dom === true
	select($el) {
		this.clear()
		$el.focus().addClass(TableSelection.className)
		this.group.push($el)
		this.current = $el
	}

	selectGroup(group = []) {
		this.clear()
		this.group = group
		group.forEach(item => item.addClass(TableSelection.className))
	}

	clear() {
		this.group.forEach(item => item.removeClass(TableSelection.className))
		this.group = []
	}
}
