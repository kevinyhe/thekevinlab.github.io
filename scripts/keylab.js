let totalWordCount = 50;

// define quotes to be used
let words = ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"];

// selecting required elements
let wordCount = document.querySelector(".word-count");
let accuracyText = document.querySelector(".accuracy");
let wpmText = document.querySelector(".wpm");
let textArea = document.querySelector(".text");
let inputArea = document.querySelector(".input-area");
let restartBtn = document.querySelector(".restart-button");

let wordsTyped = 0;
let errors = 0;
let accuracy = 0;
let wpm = 0;
let charactersTyped = 0;
let inputedCharacters = '';
let startTime = null;
let currentTime = null;
let wpmCountTimer = null;
let finishedState = false;

// let lastPressedKey = '';

$(document).ready(function () {
    setup();
});

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function samples(i, n) {
    // sort the list of words and pick the first n entries
    i.sort(function () { return 0.5 - Math.random() });
    let wordList = i.slice(0, n);
    return wordList.join(' ');
}

function init() {
    startTime = new Date();

    wpmCountTimer = setInterval(updateWpmCount, 1000);
}

async function reset() {
    inputArea.removeEventListener("keydown", function () { init() });

    textArea.classList.add("text-swap");
    await sleep(500);
    setup();
    textArea.classList.remove("text-swap");
}

function setup() {
    inputArea.addEventListener("keydown", function () { init() }, { once: true });

    clearInterval(wpmCountTimer)

    textArea.textContent = '';
    wordsList = samples(words, 50);
    // create a individual span for each character
    // so we can style them later
    wordsList.split('').forEach(c => {
        const charSpan = document.createElement('span');
        charSpan.innerText = c;
        if (c === ' ') { // check if the character is a space so you can detect words
            charSpan.classList.add('space-char')
        }

        textArea.appendChild(charSpan);
    });

    const lastSpace = document.createElement('span')
    lastSpace.classList.add('space-char')
    textArea.appendChild(lastSpace); // the last word

    inputArea.value = '';
    inputedCharacters = '';
    charactersTyped = 0;
    wordsTyped = 0;
    errors = 0;
    wpm = 0;
    accuracy = 0;
    inputedCharacters = '';
    finishedState = false;

    accuracyText.textContent = "0%"
    wpmText.textContent = "0"
    wordCount.textContent = `${wordsTyped}/${totalWordCount}`
}

$('.input-area').on('keydown', function (e) {
    if (!finishedState) {
        key = e.code;

        // if ((key === lastPressedKey) && !(key === 'Backspace')) {
        //     return false;
        // }
        // lastPressedKey = key;


        switch (key) {
            case 'Enter':
                return false; // don't want textareas to add extra lines so we'll just ignore

            case 'Space':
                inputArea.value = '';
                break;
        }

        if ((e.keyCode > 47 && e.keyCode < 58) || // numeric (0-9)
            (e.keyCode > 64 && e.keyCode < 91) || // upper alpha (A-Z)
            (e.keyCode > 96 && e.keyCode < 123)) { // lower alpha (a-z)
            inputedCharacters += e.key;
        } else if (key === 'Backspace') {
            if (!(inputedCharacters.slice(-1) === ' ')) {
                inputedCharacters = inputedCharacters.slice(0, -1)
                charactersTyped -= 2; // because charactersTyped++ occurs later in the script and that negates the functionality of this
            } else {
                return false;
            }
        } else if (key === 'Space') {
            inputedCharacters += e.key;
        } else {
            return false;
        }


        let inputArray = inputedCharacters.split('');

        charactersTyped++;
        errors = 0;

        textSpanArray = textArea.querySelectorAll('span');
        textSpanArray.forEach((c, i) => {
            let typedChar = inputArray[i];

            if (typedChar == null) {
                c.classList.remove('cchar');
                c.classList.remove('ichar');

            } else if (typedChar === c.innerText) {
                c.classList.add('cchar');
                c.classList.remove('ichar');

            } else {
                c.classList.add('ichar');
                c.classList.remove('cchar');

                errors++;
            }

            if (c.classList.contains('space-char') && ((i + 1) === charactersTyped)) {
                c.classList.remove('space-char')
                wordsTyped++;
                wordCount.textContent = `${wordsTyped}/${totalWordCount}`
            }
        });

        if (charactersTyped < 1) {
            charactersTyped = 0;
            _charsTyped = 1; // i don't really have a better way to do this so this works for now
        } else { _charsTyped = charactersTyped }
        let correctCharacters = (charactersTyped - errors);
        let accuracyVal = ((correctCharacters / _charsTyped) * 100); // get accuracy

        if (accuracyVal < 0) {
            accuracyVal = 0;
        }

        accuracyText.textContent = `${Math.round(accuracyVal)}%`;

        if (wordsTyped === 50) {
            clearInterval(wpmCountTimer);
            finishedState = true;
        }
    } else { return; }
});

function updateWpmCount() {
    currentTime = new Date();
    // really long operation to get wpm
    wpm = Math.round(((((charactersTyped - errors) / 5) / ((currentTime.getTime() - startTime.getTime()) / 1000)) * 60));
    if (wpm < 0) {
        wpm = 0;
    }
    wpmText.textContent = wpm;
}

// lord please forgive me for this awful code