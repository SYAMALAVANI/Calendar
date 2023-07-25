const prevButtonRef = document.querySelector('.controls .prev');
const nextButtonRef = document.querySelector('.controls .next');
const monthSelectRef  = document.querySelector('.controls .month');
const yearSelectRef = document.querySelector('.controls .year');
const datesRef = document.querySelector('.dates');
const todayButtonRef = document.querySelector('.today-section button');
const datesFragment = document.createDocumentFragment();

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];


const todaysDate = new Date();
const currentMonth = todaysDate.getMonth();
const currentYear = todaysDate.getFullYear();
const currentDay = todaysDate.getDate();

function generateMonthOptions() {
    const monthsFragment  = document.createDocumentFragment();
    MONTHS.forEach((month, idx) => {
        const createOption = document.createElement('option');
        createOption.value = idx;
        createOption.innerText = month;
        createOption.selected = todaysDate.getMonth() === idx;
        monthsFragment.appendChild(createOption);
    });
    monthSelectRef.appendChild(monthsFragment);
}

function generateYearOptions() {
    const currentYear = todaysDate.getFullYear();
    const yearsFragment  = document.createDocumentFragment();
    for(let i = currentYear - 10; i <= currentYear + 10; i++) {
        const createOption = document.createElement('option');
        createOption.value = i;
        createOption.innerText = i;
        createOption.selected = todaysDate.getFullYear() === i;
        yearsFragment.appendChild(createOption);
    }
    yearSelectRef.appendChild(yearsFragment);
}

function generateDays(month, year, date) {
    const startDay = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    datesRef.innerHTML = '';

    // empty spans
    for(let i = 0; i < startDay; i++) {
        const spanRef = document.createElement('span');
        datesFragment.appendChild(spanRef);
    }

    for(let j = 1; j <= totalDaysInMonth; j++) {
        const spanRef = document.createElement('span');
        spanRef.classList.add('date');
        if (j === date) {
            spanRef.classList.add('today');
        }
        spanRef.setAttribute('data-id', j);
        spanRef.innerText = j;
        datesFragment.appendChild(spanRef);
    }

    datesRef.appendChild(datesFragment);
}

generateMonthOptions();
generateYearOptions();
generateDays(currentMonth, currentYear, currentDay);

monthSelectRef.addEventListener('change', function(ev) {
    const selectedMonth = ev.target.value;
    const selectedYear = yearSelectRef.value;
    console.log(selectedMonth, currentMonth);
    if ((selectedYear === currentYear.toString()) && (selectedMonth === currentMonth.toString())) {
        generateDays(selectedMonth, selectedYear, currentDay);
    } else {
        generateDays(selectedMonth, selectedYear);
    }
    
});

yearSelectRef.addEventListener('change', function(ev) {
    const selectedYear = ev.target.value;
    const selectedMonth = monthSelectRef.value;
    if ((selectedYear === currentYear.toString()) && (selectedMonth === currentMonth.toString())) {
        generateDays(selectedMonth, selectedYear, currentDay);
    } else {
        generateDays(selectedMonth, selectedYear);
    }
});

nextButtonRef.addEventListener('click', function(ev) {
    let selectedMonth = +monthSelectRef.value;
    let selectedYear = +yearSelectRef.value;
    if (selectedMonth === 11) {
        yearSelectRef.value = selectedYear + 1;
        monthSelectRef.value = 0;
    } else {
        monthSelectRef.value = selectedMonth + 1;
    }
    if ((yearSelectRef.value === currentYear.toString()) && (monthSelectRef.value === currentMonth.toString())) {
        generateDays(monthSelectRef.value, yearSelectRef.value, currentDay);
    } else {
        generateDays(monthSelectRef.value, yearSelectRef.value);
    }
})

prevButtonRef.addEventListener('click', function(ev) {
    let selectedMonth = +monthSelectRef.value;
    let selectedYear = +yearSelectRef.value;
    if (selectedMonth === 0) {
        yearSelectRef.value = selectedYear - 1;
        monthSelectRef.value = 11;
    } else {
        monthSelectRef.value = selectedMonth - 1;
    }
    if ((yearSelectRef.value === currentYear.toString()) && (monthSelectRef.value === currentMonth.toString())) {
        generateDays(monthSelectRef.value, yearSelectRef.value, currentDay);
    } else {
        generateDays(monthSelectRef.value, yearSelectRef.value);
    }
});


todayButtonRef.addEventListener('click', function() {
    yearSelectRef.value = todaysDate.getFullYear();
    monthSelectRef.value = todaysDate.getMonth();
    const today = todaysDate.getDate();
    generateDays(monthSelectRef.value, yearSelectRef.value, today);
});










