/**
 *
 * @returns
 */
export const parseRequestUrl = () => {
	const url = document.location.hash.toLowerCase()
	const request = url.split('/')

	return {
		resource: request[1],
		id: request[2],
		action: request[3],
	}
}

/**
 *
 * @param {*} screen
 */
export const rerender = async (screen) => {
	document.getElementById('main-container').innerHTML = await screen.render()
	if (screen.after_render) await screen.after_render()
}

/**
 *
 * @param {*} component
 * @param {*} tag
 */
export const updateView = (component, tag) => {
	document.querySelector(tag).innerHTML = component.render()
	if (component.after_render) component.after_render()
}

/**
 *
 * @param {*} src
 * @returns
 */
function loadStyle(src) {
	return new Promise(function (resolve, reject) {
		let link = document.createElement('link')
		link.href = src
		link.rel = 'stylesheet'

		link.onload = () => resolve(link)
		link.onerror = () => reject(new Error(`Style load error for ${src}`))

		document.head.append(link)
	})
}

/**
 *
 * @param {*} srcs
 * @returns
 */
export function loadStyles(srcs) {
	let promises = []
	srcs.forEach((src) => promises.push(loadStyle(src)))
	return Promise.all(promises)
}
