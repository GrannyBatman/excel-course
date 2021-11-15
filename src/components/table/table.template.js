const CODES = {
	A: 65,
	Z: 90,
}

function toCell() {
	return `
		<div class="cell" contenteditable></div>
	`
}

function createRow(index, content = '') {
	return `
		<div class="row">
			<div class="row-info">${index ? index : ''}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toColumn(col = '') {
	return `
		<div class="column">
			${col}
		</div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	// creating table head
	const cols = Array.from(new Array(colsCount), toChar).map(toColumn).join('')

	rows.push(createRow(null, cols))

	// creating table body
	const cells = Array.from(new Array(colsCount), toCell).join('')
	for (let i = 1; i < rowsCount + 1; i++) {
		rows.push(createRow(i, cells))
	}

	return rows.join('')
}
