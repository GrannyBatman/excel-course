import { $ } from '@core/dom'

export function resizeHandler($root, event) {
	const $resizer = $(event.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	const type = event.target.dataset.resize
	const sideProp = type == 'col' ? 'bottom' : 'right'
	let value = 0

	$root.css({ 'user-select': 'none' })
	$resizer.css({ opacity: 1, [sideProp]: '-5000px' })

	document.onmousemove = e => {
		// column resize
		if (type == 'col') {
			const delta = e.pageX - coords.right + $resizer.$el.offsetWidth
			value = delta + coords.width

			$resizer.css({ right: -delta + 'px' })
		}

		// row resize
		if (type == 'row') {
			const delta = e.pageY - coords.bottom + $resizer.$el.offsetHeight
			value = delta + coords.height

			$resizer.css({ bottom: -delta + 'px' })
		}
	}

	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null

		$root.css({ 'user-select': null })
		$resizer.css({ bottom: null, right: null, opacity: null })

		// column resize
		if (type == 'col') {
			$root
				.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => (el.style.width = value + 'px'))
		}

		// row resize
		if (type == 'row') {
			$parent.css({ height: value + 'px' })
		}
	}
}
