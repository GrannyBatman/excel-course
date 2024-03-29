const CODES = {
	A: 65,
	Z: 90,
}

function toCell(row) {
	// eslint-disable-next-line space-before-function-paren
	return function (_, col) {
		return `
			<div class="cell" contenteditable 
				data-type="cell"
				data-col="${col}"
				data-id="${col}:${row}">
			</div>
		`
	}
}

function createRow(index, content = '') {
	const rowInfo = index
		? `${index} <div class="row-resize" data-resize="row"></div>`
		: ''

	return `
		<div class="row" data-type="resizable">
			<div class="row-info">${rowInfo}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toColumn(col = '', index) {
	return `
		<div class="column" data-type="resizable" data-col='${index}'>
			${col}
			<div class="col-resize" data-resize="col"></div>
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
	for (let i = 0; i < rowsCount; i++) {
		const cells = Array.from(new Array(colsCount), toCell(i)).join('')
		rows.push(createRow(i + 1, cells))
	}

	return rows.join('')
}
