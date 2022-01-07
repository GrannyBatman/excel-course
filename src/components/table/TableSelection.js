export class TableSelection {
	static cellClassName = 'selected'

	constructor() {
		this.group = []
		this.current = null
	}

	// $el instanceof DOM === true
	select($el) {
		this.clear()

		this.group.push($el)
		this.current = $el
		$el.addClass(TableSelection.cellClassName)
	}

	selectGroup($group) {
		this.clear()

		this.group = $group
		this.group.forEach($el => $el.addClass(TableSelection.cellClassName))
	}

	clear() {
		this.group.forEach($cell => $cell.removeClass(TableSelection.cellClassName))
		this.group = []
	}
}
