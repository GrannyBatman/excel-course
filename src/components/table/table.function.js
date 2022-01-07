/* eslint-disable no-extra-semi */
/* eslint-disable indent */
export function shouldResize(event) {
	return event.target.dataset.resize
}

export function isCell(event) {
	return event.target.dataset.type === 'cell'
}

export function matrix($start, $end) {
	const start = $start.getId(true)
	const end = $end.getId(true)
	const ids = []

	if (end.x < start.x) {
		;[end.x, start.x] = [start.x, end.x]
	}
	if (end.y < start.y) {
		;[start.y, end.y] = [end.y, start.y]
	}

	for (let i = start.x; i < end.x + 1; i++) {
		for (let j = start.y; j < end.y + 1; j++) {
			ids.push(`${i}:${j}`)
		}
	}

	return ids
}

export function nextSelector(key, { x, y }) {
	const MIN_VALUE = 0

	switch (key) {
		case 'ArrowUp':
			y = y === MIN_VALUE ? MIN_VALUE : y - 1
			break
		case 'Tab':
		case 'ArrowRight':
			x++
			break
		case 'Enter':
		case 'ArrowDown':
			y++
			break
		case 'ArrowLeft':
			x = x === MIN_VALUE ? MIN_VALUE : x - 1
			break
	}

	return `[data-id='${x}:${y}']`
}
