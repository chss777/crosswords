"use strict";
const tab2 = document.getElementById('tab2');
const check = document.getElementById('check');

const field = document.querySelectorAll('.field');
const tds = document.querySelectorAll('#tab2 td');
const letters = document.querySelectorAll('.letters');
const left = document.getElementById('left');
const up = document.getElementById('up');
const right = document.getElementById('right');
const down = document.getElementById('down');
const circle = document.getElementById('circle');
const joistick = document.getElementById('joistick');


var active;

tab2.addEventListener('focus', (e) => {
    active = document.activeElement;
}, true);

function toleft(x, y) {
    tab2.rows[x].cells[y - 1]?.querySelector('textarea')?.focus();
}
function toup(x, y) {
    tab2.rows[x - 1]?.cells[y].querySelector('textarea')?.focus();
}
function toright(x, y) {
    tab2.rows[x].cells[y + 1]?.querySelector('textarea')?.focus();
}
function todown(x, y) {
    tab2.rows[x + 1]?.cells[y].querySelector('textarea')?.focus();
}

left.onclick = function() {
    let x = active.closest('tr').rowIndex;
    let y = active.closest('td').cellIndex;
    toleft(x, y);
}
up.onclick = function() {
    let x = active.closest('tr').rowIndex;
    let y = active.closest('td').cellIndex;
    toup(x, y);
}
right.onclick = function() {
    let x = active.closest('tr').rowIndex;
    let y = active.closest('td').cellIndex;
    toright(x, y);
}
down.onclick = function() {
    let x = active.closest('tr').rowIndex;
    let y = active.closest('td').cellIndex;
    todown(x, y);
}

function cursor() {
    for (let item of field) {
        item.onkeydown = function (e) {
            let x = e.target.closest('tr').rowIndex;
            let y = e.target.closest('td').cellIndex;

            let keyCode = e.keyCode || e.which || e.charCode;
            switch (keyCode) {
                case 37:
                    toleft(x, y);
                    break;
                case 38:
                    toup(x, y);
                    break;
                case 39:
                    toright(x, y);
                    break;
                case 40:
                    todown(x, y);
                    break;
            }
        }
    }
}

// if (window.innerWidth < 991 && tab2.rows[0].cells.length < 12) {
//     tds.forEach(td => {
//         td.style.width = '24px';
//         td.style.height = '24px';
//     })      
// }

function control() {
    let sum = 0;
    for (let i=0; i<letters.length; i++) {
        sum += letters[i].value.length;
    }
    if (sum == letters.length) {
        check.style.display = 'block';
    }
}

function checked() {
    for (let i=0; i<letters.length; i++) {
        if (letters[i].value == letters[i].dataset.letter) {
            letters[i].style.color = 'blue';
        } else {
            letters[i].style.color = 'red';
        }
    }
}

// tab2.addEventListener('change', (e) => {
//     if (e.target.value) {
//         control()
//     } 
// });

tab2.addEventListener('click', cursor);

function dragElement(element) {
    if (circle) {
        circle.onmousedown = (ev) => {
            ev = ev || window.Event;
            ev.preventDefault();

            let x = ev.clientX;
            let y = ev.clientY;

            window.onmousemove = (ev) => {
                ev = ev || window.Event;
                ev.preventDefault();

                x = x - ev.clientX;
                y = y - ev.clientY;

                element.style.left = `${element.offsetLeft - x}px`;
                element.style.top = `${element.offsetTop - y}px`;

                x = ev.clientX;
                y = ev.clientY;

                window.onmouseup = () => {
                    window.onmousemove = null;
                    window.onmouseup = null;
                }
            };
        }
    }
}

dragElement(joistick);