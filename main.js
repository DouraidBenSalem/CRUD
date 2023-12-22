let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let mode = "create"
let tmp
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerText = '';
        total.style.background = 'red';
    }
}
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}
submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(title.value != '' && title.category != '' && count.value <100){
    if (mode === "create") {
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
            }
        } else {
            datapro.push(newpro);
        }
    } else {
        datapro[tmp] = newpro;
        mode = "create";
        submit.innerHTML = "Create"
        count.style.display = "block"
        total.style.background = 'red';
    }
    localStorage.setItem('product', JSON.stringify(datapro))
    cleardata()
    showData()
    }

}
function cleardata() {
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})"id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('delete_all');
    if (datapro.length > 0) {
        btndelete.innerHTML = ` 
        <button onclick="deleteAll()">Delete All</button>
        `
    } else {
        btndelete.innerHTML = '';
    }
}
function deletedata(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    showData()
}

function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData()
}

function updateData(i) {
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    getTotal();
    count.style.display = "none"
    discount.value = datapro[i].discount
    category.value = datapro[i].category
    submit.innerHTML = "Update"
    mode = "Update"
    tmp = i;

}
let search = 'title';

function getsearchmood(id) {
    let se = document.getElementById('search')
    if (id == 'searchTitle') {
        search = 'title';
        se.placeholder = 'Search by Title'
    } else {
        search = 'category'
        se.placeholder = 'Search by Category'
    }
    se.focus()
    se.value = ''
    showData()
}
function searchData(value) {
    let table = '';
    if (search == 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value)) {
                table += `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})"id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                    </tr>`;
             }

        }
    }
    else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value)) {                
                    table += `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})"id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                    </tr>`;
            }

        }

    }
    document.getElementById('tbody').innerHTML = table;
}
showData()