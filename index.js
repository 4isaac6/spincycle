/**
 * Author: Isaac Streight
 * Start Date: October 27th, 2018
 * Project inspired by:
 *  an ex-girlfriend, Rise Against, and a coffee cup
 *   2 years, 7 months, 24 days later
 *  a girl, blackbear, and an unprecidented fallout
 *   2 months, 29 days better
 *  a number in the phone, Clairo, and an opportunity, missed
 *   4 months, 15 days wondering
 */


const credit = {
    "i-do-fucking-care": "http://beartrap.la",
    "the-curve-approached": "http://www.riseagainst.com",
    "would-you-ask-me": "https://www.clairo.com"
};

const gutterLines = {
    "i-do-fucking-care": "inspired by a girl, blackbear, and an unprecidented fallout",
    "the-curve-approached": "inspired by an ex-girlfriend, rise against, and a coffee cup",
    "would-you-ask-me": "inspired by a number in the phone, Clairo, and an opportunity, missed"
};

const lyrics = {
    "i-do-fucking-care": `
i have hella feelings for you
i act like i don't fucking care,
i'm so fucking scared
i'm only a fool for you
    `,
    "the-curve-approached": `
the cadence again overtook the air
up ahead there was a curve approaching
she made no indications of slowing
    `,
    "would-you-ask-me": `
ice cold, baby, i'm ice cold
you're the only one who could make me fold
i wouldn't ask you to take care of me
    `
};

const endingDates = {
    "i-do-fucking-care": {
        "date": "2019-10-27",
        "feelingSince": "better"
    },
    "the-curve-approached": {
        "date": "2016-03-04",
        "feelingSince": "later"
    },
    "would-you-ask-me": {
        "date": "2020-10-03",
        "feelingSince": "wondering"
    }
};

const cssThemes = {
    "i-do-fucking-care": "sangria",
    "the-curve-approached": "espresso",
    "would-you-ask-me": "blonde"
};

const tabsContent = [credit, gutterLines, lyrics, endingDates, cssThemes];

const tabCells = document.getElementsByTagName('td');
const counterObject = document.getElementById('counter');
const tabTable = document.getElementsByClassName('tabs')[0];
const creditObject = document.getElementsByClassName('credit')[0];
const gutterObject = document.getElementsByClassName('gutter')[0];

function loadLyrics(key) {
    let l, r, line;
    let elapsedTime = "";
    let now = luxon.DateTime.now();
    let lyric = lyrics[key].trim();
    let endDate = endingDates[key];
    let end = luxon.DateTime.fromISO(endDate.date);
    let lyricContainer = document.getElementById('lyricContainer');
    let diff = now.diff(end, ["years", "months", "days", "hours"]).toObject();
    let s = window.getComputedStyle(lyricContainer, null).getPropertyValue('font-size');

    lyricContainer.innerHTML = "";
    r = lyricContainer.clientHeight / parseInt(s, 10);

    for (let c = 0, h = 1.25; c < lyric.length; c += l, h += 3) {
        line = document.createElement('div');
        l = Math.floor(Math.pow((8 * r * h) - 4 * Math.pow(h, 2), 1 / 2));

        line.innerHTML = lyric.slice(c, c + l);

        lyricContainer.appendChild(line);
    }

    delete diff.hours;
    for (let key in diff) {
        let unitJoiner = (key === "days" ? ' ' : ',');

        elapsedTime = [elapsedTime, diff[key], key].join(' ') + unitJoiner;
    }

    gutterObject.innerHTML = gutterLines[key];
    creditObject.setAttribute('href', credit[key]);
    counterObject.innerHTML = elapsedTime + endDate.feelingSince;
}

function loadTabs() {
    let selectedCell;

    for (let i = 0; i < tabsKeys.length; i++) {
        let key = tabsKeys[i];
        let tab = document.createElement('td');

        if (i === tabsKeys.length - 1) {
            selectedCell = tab;
            classStyle = "selected";
        } else {
            classStyle = "filled";
        }

        tab.className = classStyle;
        tab.dataset.theme = cssThemes[key];
        tab.innerHTML = key.replace(/-/g, ' ');
        tab.onclick = () => { load(event.target); resetParticleColour(); };

        tabTable.rows[0].prepend(tab);
    }

    return selectedCell;
}

function loadStyleSheet(key) {
    let styleSheets = [...document.styleSheets];
    let activeSheet = cssThemes[key] + ".css";

    styleSheets.forEach((styleSheet) => {
        if (styleSheet.href.includes('index.css')) return;

        if (styleSheet.href.includes(activeSheet)) {
            styleSheet.disabled = false;
        } else {
            styleSheet.disabled = true;
        }
    });
}

function load(target) {
    let selectedTitle = target.innerHTML.trim();
    let selectedKey = selectedTitle.replace(/\s/g, '-');

    loadLyrics(selectedKey);
    loadStyleSheet(selectedKey);

    for (let tabIndex = 0; tabIndex < tabCells.length - 1; tabIndex++) {
        let tab = tabCells[tabIndex];

        if (tab.classList.contains('selected')) {
            tab.classList.add('filled');
            tab.classList.remove('selected');
        }
    }

    target.classList.add('selected');
    target.classList.remove('filled');

    gutterObject.innerHTML = gutterLines[selectedKey];
    creditObject.setAttribute('href', credit[selectedKey]);
}

// Verify each Tab object has the same keys.
const tabsKeys = Object.keys(tabsContent[0]).sort().reverse();
tabsContent.forEach((tab) => {
    let keys = Object.keys(tab).sort().reverse();
    let errorMsg = "Inconsistent keys";

    console.assert(JSON.stringify(tabsKeys) === JSON.stringify(keys), {keys, tabsKeys, errorMsg});
});

let selectedCell = loadTabs();
load(selectedCell);
//load(document.getElementsByClassName('selected')[0]);
