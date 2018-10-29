/**
 * Author: Isaac Streight
 * Start Date: October 27th, 2018
 * Project inspired by an ex-girlfriend, Rise Against, and a coffee cup
 *  2 years, 7 months, 24 days later.
 */

const lyrics = {
    "the approaching curve": `
the cadence again overtook the air
up ahead there was a curve approaching
she made no indications of slowing
    `
};

function render(lyric) {
    let l, line, r;
    let lyricContainer = document.getElementById('lyricContainer');
    let s = window.getComputedStyle(lyricContainer, null).getPropertyValue('font-size');

    r = lyricContainer.clientHeight / parseInt(s, 10);

    for (let c = 0, h = 1; c < lyric.length; c += l, h += 3) {
        line = document.createElement('div');
        l = Math.floor(Math.pow((8 * r * h) - 4 * Math.pow(h, 2), 1/2));

        line.innerHTML = lyric.slice(c, c + l);

        lyricContainer.appendChild(line);
    }
}

render(lyrics[Object.keys(lyrics)[0]].trim());
