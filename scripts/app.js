const headingElements = [
    { name: "title", trigger: "title", scrub: 4, x: -150, y: 0, r: 0 },
    { name: "title2", trigger: "title", scrub: 1.5, x: 300, y: 0, r: 0 },
    { name: "heading", trigger: "title", scrub: 3, x: -500, y: 0, r: 0 },
    { name: "middle-line", trigger: "title", scrub: 1, x: 0, y: -2500, r: 0 },
    { name: "logo-left", trigger: "title", scrub: 2.5, x: 0, y: -1050, r: 86 },
    { name: "logo-right", trigger: "title", scrub: 3.3, x: 800, y: 0, r: 64 },
];

// register scrolltrigger gsap plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * an async sleep function
 * @param {*} ms delay in milliseconds
 * @returns
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * very basic scroll trigger handler
 * @param {*} element element DOM name
 * @param {*} trigger element trigger
 * @param {*} scrub scrub speed
 * @param {*} x change in x
 * @param {*} y change in y
 * @param {*} rotation rotation
 * @returns {*} scrollTrigger object
 */
function createScrollTrigger(element, trigger, scrub, x, y, rotation) {
	gsap.to(`.${element}`, {
		scrollTrigger: {
			trigger: `.${trigger}`,
			start: "top 150px",
			end: "top -200px",
			scrub: scrub,
			markers: true,
		},
		x: x,
		y: y,
		rotation: rotation,
		ease: "none",
	});
}

headingElements.forEach(
	(_func = (_trigger) => {
		createScrollTrigger(
			_trigger["name"],
			_trigger["trigger"],
			_trigger["scrub"],
			_trigger["x"],
			_trigger["y"],
            _trigger["r"],
		);
	})
);

// const DARK = '(prefers-color-scheme: dark)'
// const LIGHT = '(prefers-color-scheme: light)'

// function changeWebsiteTheme(scheme) {

// }

// function detectColorScheme() {
//     if(!window.matchMedia) {
//         return
//     }
//     function listener({matches, media}) {
//         if(!matches) { // Not matching anymore = not interesting
//             return
//         }
//         if(media === DARK) {
//             changeWebsiteTheme('dark')
//         } else if (media === LIGHT) {
//             changeWebsiteTheme('light')
//         }
//     }
//     const mqDark = window.matchMedia(DARK)
//     mqDark.addListener(listener)
//     const mqLight = window.matchMedia(LIGHT)
//     mqLight.addListener(listener)
// } coming soon!
