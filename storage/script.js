"use strict";
const tab2 = document.getElementById('tab2');
const check = document.getElementById('check');

const field = document.querySelectorAll('.field');
const tds = document.querySelectorAll('#tab2 td');
const letters = document.querySelectorAll('.letters');

function cursor() {
    for (let item of field) {
        item.onkeydown = function (e) {
            let x = e.target.closest('tr').rowIndex;
            let y = e.target.closest('td').cellIndex;

            let keyCode = e.keyCode || e.which || e.charCode;
            switch (keyCode) {
                case 37:
                    tab2.rows[x].cells[y - 1]?.querySelector('textarea')?.focus();
                    break;
                case 38:
                    tab2.rows[x - 1]?.cells[y].querySelector('textarea')?.focus();
                    break;
                case 39:
                    tab2.rows[x].cells[y + 1]?.querySelector('textarea')?.focus();
                    break;
                case 40:
                    tab2.rows[x + 1]?.cells[y].querySelector('textarea')?.focus();
                    break;
            }
        }
    }
}

if (window.innerWidth < 991 && tab2.rows[0].cells.length < 12) {
    tds.forEach(td => {
        td.style.width = '24px';
        td.style.height = '24px';
    })      
}

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

tab2.addEventListener('change', (e) => {
    if (e.target.value) {
        control()
    } 
});

cursor();
