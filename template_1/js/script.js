"use strict"

const headerHeight = 100 //px

document.addEventListener('DOMContentLoaded', () => {
	hideLoader()
	navHoverEffect()
	buttonsDesign()
	isShowSection()
	anchorSmoothScrolling()
	progressbarAnimation()
	ebooksStyling()
	pricingStyling()
	contactStyling()
	hamburgerLogic()
})

function hideLoader() {
	const loader = document.querySelector('.loader')
	if (loader) setTimeout(() => loader.classList.add('loaded'), 0)
}

function navHoverEffect() {
	const nav = document.querySelector('.navigation')
	if (nav) {
		navHoverEffectLogic(nav)
		window.addEventListener('resize', () => navHoverEffectLogic(nav))
	}
}

function navHoverEffectLogic(nav) {
	const links = nav.querySelectorAll('a')
	links.forEach(link => {
		link.addEventListener('mouseover', () => {
			if (window.outerWidth > 1199) {
				links.forEach(a => !a.parentElement.classList.contains('active') ? a = a.style.opacity = '.3' : '')
				link.style.opacity = ''
			}
		})
		link.addEventListener('mouseout', () => {
			if (window.outerWidth > 1199) links.forEach(a => a = a.style.opacity = '')
		})
	})
}

function buttonsDesign() {
	const buttons = document.querySelectorAll('.button')
	if (buttons) {
		buttons.forEach(button => {
			const buttonText = button.getAttribute('data-text')
			const createSpan = document.createElement('span')
			createSpan.textContent = buttonText
			button.prepend(createSpan)
		})
	}
}

function isShowSection() {
	const sections = document.querySelectorAll('section')
	if (sections) {
		const headerNav = document.querySelectorAll('header .navigation li')
		isShowSectionLogic(sections, headerNav)
		window.addEventListener('scroll', () => isShowSectionLogic(sections, headerNav))
	}
}

function isShowSectionLogic(sections, headerNav) {
	let current = ''
	sections.forEach(section => {
		const isBigSectionHeight = section.offsetHeight > 500 ? 500 : section.offsetHeight / 1.5
		const isBigSectionHeight2 = section.offsetHeight > 500 ? section.offsetHeight - headerHeight - 500 : section.offsetHeight / 2
		if (window.pageYOffset >= section.offsetTop - headerHeight) current = section.getAttribute('id')
		if (window.pageYOffset + window.innerHeight > section.offsetTop + isBigSectionHeight &&
			window.pageYOffset < section.offsetTop + isBigSectionHeight2) section.classList.add('show')
	})
	headerNav.forEach(li => {
		const link = li.querySelector('a')
		li.classList.remove('active')
		if (link.getAttribute('href').replace('#','') === current) li.classList.add('active')
	})
}

function anchorSmoothScrolling() {
	const anchors = document.querySelectorAll('.anchor')
	if (anchors) {
		anchors.forEach(link => {
			if (link.hasAttribute('href')) {
				const firstSymbol = link.getAttribute('href').charAt(0)
				link.addEventListener('click', e => {
					if (firstSymbol === '#') {
						e.preventDefault()
						const href = link.getAttribute('href')
						const offsetTop = document.querySelector(href).offsetTop - headerHeight
						scroll({
							top: offsetTop,
							behavior: 'smooth'
						})
					}
				})
			}
		})
	}
}

function progressbarAnimation() {
	const progressbarSection = document.querySelector('#progressbars')
	if (progressbarSection) {
		progressbarAnimationLogic(progressbarSection)
		window.addEventListener('scroll', () => progressbarAnimationLogic(progressbarSection))
	}
}

function progressbarAnimationLogic(progressbarSection) {
	if (progressbarSection.classList.contains('show')) {
		const bars = progressbarSection.querySelectorAll('.progressbar-line')
		bars.forEach(bar => {
			const animateItem = bar.querySelector('span')
			const progressPercent = animateItem.getAttribute('data-progress-percent')
			animateItem.style.width = progressPercent + '%'
			animateItem.classList.add('show-percent')
		})
	}
}

function ebooksStyling() {
	const ebooksItems = document.querySelectorAll('#ebooks .item')
	if (ebooksItems) {
		ebooksItems.forEach((item, index) => item.style.transitionDelay = 0.2 * index + 's')
	}
}

function pricingStyling() {
	const thisSection = document.querySelector('#prices')
	if (thisSection) {
		const textForDesc = thisSection.querySelectorAll('.text-wrapper.d-none span')
		const pricingItems = thisSection.querySelectorAll('.item')
		pricingItems.forEach((item, index) => {
			const pricingDesc = item.querySelector('.pricing-description p')
			item.style.transitionDelay = 0.2 * index + 's'
			textForDesc.forEach(text => index === text.getAttribute('data-text') - 1 ? pricingDesc.textContent = text.textContent : '')
		})
	}
}

function contactStyling() {
	const thisSection = document.querySelector('#contact')
	if (thisSection) {
		const buttonText = thisSection.querySelector('.text-wrapper.d-none span')
		const button = thisSection.querySelector('button')
		const inputWrappers = thisSection.querySelectorAll('.new-validate__line')
		button.textContent = buttonText.textContent
		inputWrappers.forEach(wrap => {
			if (!wrap.classList.contains('new-validate__btn')) {
				const input = wrap.querySelector('input, textarea')
				const label = wrap.querySelector('label')
				input.addEventListener('focus', () => label.style.opacity = '0')
				input.addEventListener('blur', () => input.value === '' ? label.style.opacity = '1' : '')
			}
		})
	}
}

function hamburgerLogic() {
	const header = document.querySelector('.header')
	if (header) {
		const hamburger = header.querySelector('.hamburger')
		const navBar = header.querySelector('nav')
		const links = navBar.querySelectorAll('a.anchor')
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active')
			navBar.classList.toggle('show')
		})
		links.forEach(link => {
			link.addEventListener('click', () => {
				hamburger.classList.remove('active')
				navBar.classList.remove('show')
			})
		})
		if (window.outerWidth < 1200) navBar.style.transition = 'transform var(--transition-duration) ease 0s'
		window.addEventListener('resize', () =>
			window.outerWidth < 1200 ? navBar.style.transition = 'transform var(--transition-duration) ease 0s' : navBar.style.transition = '')
	}
}
