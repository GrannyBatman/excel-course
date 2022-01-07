import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import {
	isCell,
	shouldResize,
	matrix,
	nextSelector,
} from '@/components/table/table.function'
import { TableSelection } from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		})
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()

		// select and focus cell
		this.selectCell(this.$root.find('[data-id="0:0"]'))

		// subscribe for events
		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})

		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		$cell.focus()
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	toHTML() {
		return createTable(20)
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
			return
		}

		if (isCell(event)) {
			const $target = $(event.target)

			if (event.shiftKey === true) {
				const $cells = matrix(this.selection.current, $target).map(id =>
					this.$root.find(`[data-id='${id}']`)
				)

				this.selection.selectGroup($cells)
			} else {
				this.selection.select($target)
				this.selectCell($target)
			}

			return
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowUp',
			'ArrowRight',
			'ArrowDown',
			'ArrowLeft',
		]
		const { key } = event

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.getId(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}
}
