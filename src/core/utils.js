export function capitalize(string) {
	if (typeof string !== 'string') return
	return string[0].toUpperCase() + string.slice(1)
}

export function range(start, end) {
	if (start > end) {
		;[end, start] = [start, end]
	}
	return Array.from(new Array(end + 1 - start), (_, index) => start + index)
}
