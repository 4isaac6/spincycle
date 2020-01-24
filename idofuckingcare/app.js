/**
 * Author: Isaac Streight
 * Start Date: January 24th, 2020
 * Project inspired by a girl, a complex relationship, and an unprecidented fallout
 *  2 months, 29 days better.
 */

const lyrics = {
    "idfc": `
cause i have hella feelings for you
i act like i dont fucking care
cause im so scared
im only a fool for you
    `
};

function render(lyric) {
    let l, line, r;
    let lyricContainer = document.getElementById('lyricContainer');
    let s = window.getComputedStyle(lyricContainer, null).getPropertyValue('font-size');

    r = lyricContainer.clientHeight / parseInt(s, 10);

    for (let c = 0, h = 1.25; c < lyric.length; c += l, h += 3) {
        line = document.createElement('div');
        l = Math.floor(Math.pow((8 * r * h) - 4 * Math.pow(h, 2), 1 / 2));

        line.innerHTML = lyric.slice(c, c + l);

        lyricContainer.appendChild(line);
    }
}

render(lyrics[Object.keys(lyrics)[0]].trim());
