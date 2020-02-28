// GLOBAL
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');
// DIVS
var fruitDIV = document.getElementById("fruitDIV");
var juiceDIV = document.getElementById("juiceDIV");
var saladDIV = document.getElementById("saladDIV");
//INFORMATION
var FRUIT = [
    { name: 'Apple', price: 1 },
    { name: 'Orange', price: 1 },
    { name: 'Cherry', price: 1 },
    { name: 'Strawberry', price: 1 },
    { name: 'Kiwi', price: 1 },
    { name: 'Banana', price: 1 }
];
var JUICE = [
    { name: 'Juice #1', price: 10 },
    { name: 'Juice #2', price: 11 },
    { name: 'Juice #3', price: 12 }
];
var SALAD = [
    { name: 'Salad #1', price: 11 },
    { name: 'Salad #2', price: 12 },
    { name: 'Salad #3', price: 15 }
];
var total = 0

// HTML
function HTMLfruitProduct(con) {
    let URL = `../img/fruits/fruit${con}.jpeg`;
    let btn = `btnFruit${con}`;
    return `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
        <div class="card-body">
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <p class="card-text">${FRUIT[con-1].name}</p>
          <p class="card-text">Price: ${FRUIT[con-1].price}.00</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" onclick="cart2('${FRUIT[con-1].name}',
              '${FRUIT[con-1].price}','${URL}','${con}','${btn}')"
              class="btn btn-sm btn-outline-secondary" ><a
              style="color:inherit;" href="/cart">Buy</a></button>
              <button id="${btn}" type="button" onclick="cart('${FRUIT[con-1].name}',
              '${FRUIT[con-1].price}','${URL}','${con}','${btn}')"
              class="btn btn-sm btn-outline-secondary" >
              Add to cart</button>
            </div>
            <small class="text-muted">Free shipping </small>
          </div>
        </div>
      </div>
    </div>
  `;
}

function HTMLjuiceProduct(con) {
    let URL = `../img/juice/juice${con}.jpeg`;
    let btn = `btnJuice${con}`;
    return `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
        <div class="card-body">
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <p class="card-text">${JUICE[con-1].name}</p>
          <p class="card-text">Price: ${JUICE[con-1].price}.00</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" onclick="cart2('${JUICE[con-1].name}',
              '${JUICE[con-1].price}','${URL}','${con}','${btn}')"
              class="btn btn-sm btn-outline-secondary" ><a
              style="color:inherit;" href="/cart">Buy</a></button>
              <button id="${btn}" type="button" onclick="cart('${JUICE[con-1].name}',
              '${JUICE[con-1].price}','${URL}','${con}','${btn}')"
              class="btn btn-sm btn-outline-secondary" >
              Add to cart</button>
            </div>
            <small class="text-muted">Free shipping </small>
          </div>
        </div>
      </div>
    </div>
  `;
}

function HTMLsaladProduct(con) {
    let URL = `../img/salads/salad${con}.jpeg`;
    let btn = `btnSalad${con}`;
    return `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
        <div class="card-body">
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <i style="color:orange;" class="fa fa-star" ></i>
          <p class="card-text">${SALAD[con-1].name}</p>
          <p class="card-text">Price: ${SALAD[con-1].price}.00</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" onclick="cart2('${SALAD[con-1].name}',
              '${SALAD[con-1].price}','${URL}','${con}','${btn}')"
              class="btn btn-sm btn-outline-secondary" ><a
              style="color:inherit;" href="/cart">Buy</a></button>
              <button id="${btn}" type="button" onclick="cart('${SALAD[con-1].name}',
              '${SALAD[con-1].price}','${URL}','${con}','${btn}')"
              class="btn btn-sm btn-outline-secondary" >
              Add to cart</button>
            </div>
            <small class="text-muted">Free shipping </small>
          </div>
        </div>
      </div>
    </div>
  `;
}
//ANIMATION
function animation() {
    const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
    });
    toast({
        type: 'success',
        title: 'Added to shopping cart'
    });
}
//CART FUNCTIONS
function cart(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    animation();
}

function cart2(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
}

(() => {
    for (let index = 0; index < 6; index++) {
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
    }
    for (let index = 0; index < 3; index++) {
        juiceDIV.innerHTML += `${HTMLjuiceProduct(index)}`;
        saladDIV.innerHTML += `${HTMLsaladProduct(index)}`;
    }
    if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `[${products.length}]`;
    }
})();




function tableHTML(i) {
    return `
    <tr>
      <th scope="row">${i+1}</th>
      <th><img style="width:90px;" src="${products[i].url}"></th>
      <td>${products[i].name}</td>
      <td>1</td>
      <td>${products[i].price}</td>
    </tr>
  `;
}
//CLEAN
function clean() {
    localStorage.clear();
    for (let index = 0; index < products.length; index++) {
        table.innerHTML += tableHTML(index);
        total = total + parseInt(products[index].price);
    }
    total = 0;
    table.innerHTML = `
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  `;
    cart_n.innerHTML = '';
    document.getElementById("btnBuy").style.display = "none";
    document.getElementById("btnClean").style.display = "none";
}

(() => {
    for (let index = 0; index < products.length; index++) {
        table.innerHTML += tableHTML(index);
        total = total + parseInt(products[index].price);
    }
    table.innerHTML += `
    <tr>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">Total: $${total}.00</th>
    </tr>
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
      <button id="btnClean" onclick="clean()" class="btn text-white btn-warning">
        Clean Shopping Cart
      </button>
    </th>
    <th scope="col">
      <form id="form1" action="/cart" method="POST" autocomplete="off">
        <input type="hidden" name="total" value="${total}">
        <input type="hidden" name="_id" value="">
        <button id="submitbtn" class="btn btn-success">Buy</button>
      </form>
    </th>
    </tr>
  `;
    products = JSON.parse(localStorage.getItem('cart'));
    cart_n.innerHTML = `[${products.length}]`;
})();
var form = document.getElementById('form1');
document.getElementById('submitbtn').addEventListener('click', () => {
    localStorage.clear();
    setTimeout(() => {
        sub();
    }, 5000);
});

function sub() {
    setTimeout(() => {
        form.onsubmit();
    }, 5000);
}