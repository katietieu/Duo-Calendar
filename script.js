// Code created following tutorial: https://www.youtube.com/watch?v=CuXl6D4e9_k

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById("monthAndYear");
let tbl = document.getElementById("calendar-body"); // body of the calendar
let noteContents = "E.g. I pet a dog";  // default text for note prompt

showCalendar(currentMonth, currentYear);

// Cycle through colours to mark how day was
// Colours - https://getbootstrap.com/docs/4.0/utilities/colors/
tbl.addEventListener('click', e => {
    const dateSelected = e.target;

    if (dateSelected.classList.contains('bg-success')) {
        dateSelected.classList.replace('bg-success','bg-secondary');    // bg-secondary - grey for tiring day
    }
    else if (dateSelected.classList.contains('bg-secondary')) {
        dateSelected.classList.replace('bg-secondary','bg-danger');     // bg-danger - red for bad day
    }
    else if (dateSelected.classList.contains('bg-danger')) {
        dateSelected.classList.replace('bg-danger', 'bg-primary');  // bg-primary - blue for busy/productive day
    }
    else if (dateSelected.classList.contains('bg-primary')) {
        dateSelected.classList.replace('bg-primary','bg-warning');  // bg-warning - yellow for weird/interesting day
    }
    else if (dateSelected.classList.contains('bg-warning')) {
        dateSelected.classList.replace('bg-warning', 'bg-info');    // bg-info - teal for lazy day
    }
    else if (dateSelected.classList.contains('bg-info')) {
        dateSelected.classList.replace('bg-info', 'bg-light');       // bg-light - light grey for neutral/ordinary day
    }
    else if (dateSelected.classList.contains('bg-light')) {
        dateSelected.classList.remove('bg-light');        // return to unmarked colour
    }
    else {
        dateSelected.classList.add('bg-success');   // bg-success - green for good day
    }
});

// Right click to add/remove star (indicates there is a message)
tbl.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();    // Prevent default right-click menu from popping up

    const dateSelected = ev.target;
    let dateContents = dateSelected.textContent;

    let note = prompt("Leave a note about your day", noteContents);    // alert box for note

    if ((note === null || note === "") && dateContents[dateContents.length - 1] === '★') {  // if there is no note
        dateSelected.textContent = dateContents.slice(0, dateContents.length - 2);
    } else {    // if there is a note, add a star and save it
        if (!(dateContents[dateContents.length - 1] === '★')) {
            dateSelected.textContent = dateContents + ' ★';
        }
        noteContents = note;
    }

    return false;
}, false);

//
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.classList.add('day');
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                cell.classList.add('day');
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                   // cell.classList.add("text-danger");
                    cell.classList.add("font-weight-bold");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}