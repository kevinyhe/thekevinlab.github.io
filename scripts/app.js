const centeredText = document.querySelector(".centered-text");
const belowCenteredText = document.querySelector(".below-centered-text");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const DARK = '(prefers-color-scheme: dark)'
const LIGHT = '(prefers-color-scheme: light)'

function changeWebsiteTheme(scheme) {
   
}

function detectColorScheme() {
    if(!window.matchMedia) {
        return
    }
    function listener({matches, media}) {
        if(!matches) { // Not matching anymore = not interesting
            return
        }
        if(media === DARK) {
            changeWebsiteTheme('dark')
        } else if (media === LIGHT) {
            changeWebsiteTheme('light')
        }
    }
    const mqDark = window.matchMedia(DARK)
    mqDark.addListener(listener)
    const mqLight = window.matchMedia(LIGHT)
    mqLight.addListener(listener)
}