import { formColor, formName, formYear, formPrice, addbtn, form, thead, tbody, nameFilter, yearFilter, statusFilter } from './const.js'

function validate() {
    if (!formName.value) {

        formName.style.outlineColor = 'red';
        formName.focus();
        return false;
    }
    if (!formColor.value) {
        formColor.focus();
        formColor.style.outlineColor = 'red';
        return false;
    }
    if (!formYear.value) {
        formYear.focus();
        formYear.style.outlineColor = 'red';
        return false;
    }
    if (formYear.value > 2024 || formYear.value < 1950) {
        alert('yilni togri kiriting');
        formYear.value = '';
        formYear.focus();
        return false;
    }
    if (!formPrice.value) {
        formPrice.focus();
        formPrice.style.outlineColor = 'red';
        return false;
    }
    return true;
};

function createRow(cars, index) {
    let statusText = cars.status === 'active' ? 'sotilmagan' : 'sotilgan';
    let newRow = `
        <tr>
            <td>${data.length}</td>
            <td>${cars.name}</td>
            <td>${cars.color}</td>
            <td>${cars.year}</td>
            <td>${cars.price}</td>
            <td>${statusText}</td>
        </tr>`;
    return newRow;


};
function setlocal() {
    let data = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [];

    let cars = {
        id: Date.now(),
        name: formName.value,
        color: formColor.value,
        price: formPrice.value,
        year: formYear.value,
        status: 'active'

    };
    data.push(cars);

    form.reset();
    localStorage.setItem('cars', JSON.stringify(data));
}

addbtn && addbtn.addEventListener('click', function () {
    if (validate()) {
        setlocal();
        let data = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [];
        createRow(car, data.length);
    }
    
});

document.addEventListener('DOMContentLoaded', function () {
    const cars = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [];

    if (cars.length) {
        let fakerow = '';

        cars.forEach((car, index) => {
            let status;
            if (car.status == 'active') {
                status = 'sotilmagan';
            }
            if (car.status == 'inactive') {
                status = 'sotilgan'
            }
            let a = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${car.name}</td>
                    <td>${car.color}</td>
                    <td>${car.year}</td>
                    <td>${car.price}</td>
                    <td>${status}</td>
                </tr>`;

            fakerow += a;
        });

        tbody.innerHTML += fakerow;
    }
});

nameFilter && nameFilter.addEventListener('change', function () {
    const cars = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [];
    let filteredData = [];
    if (cars.length) {


        filteredData = cars.filter(car => {
            return car.name === this.value;
        });

        tbody.innerHTML = '';
        let fakefilterDom = '';

        filteredData.forEach((car, index) => {
            createRow(car, index);
        });

        tbody.innerHTML += fakefilterDom;
    }
});
yearFilter && yearFilter.addEventListener('change', function () {
    const cars = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [];
    let filteredData = [];
    if (cars.length) {


        filteredData = cars.filter(car => {
            return car.year === this.value;
        });

        tbody.innerHTML = '';
        let fakefilterDom = '';

        filteredData.forEach((car, index) => {
            createRow(car, index);
        });

        tbody.innerHTML += fakefilterDom;
    }
});


