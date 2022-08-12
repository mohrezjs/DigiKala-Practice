//! Variables

// access to product list
const addToCart = document.querySelector(".product-list");

// access to container of content card in modal card
const modalContent = document.querySelector(".card-item-modal");

// access to delete all button
const deleteAllProducts = document.querySelector(".delete");

//! Event listeners

eventListeners();

function eventListeners() {
    // event listener for click on buy button
    addToCart.addEventListener("click", buyProducts);

    // event listener for when dom is loading
    document.addEventListener("DOMContentLoaded", setFromLSToDOM);

    // event listener for delete all button
    deleteAllProducts.addEventListener("click", deleteAll);

    // remove product from list of buys
    modalContent.addEventListener("click", removeProduct);
}

//! Functions

// function for click on buy button
function buyProducts(e) {
    e.preventDefault();

    // check for click on button
    if (e.target.classList.contains("add-to-cart")) {
        const product = e.target.parentElement.parentElement;

        getProductInfo(product);
    }
}

// get product info
function getProductInfo(product) {
    // product info
    const info = {
        image: product.querySelector("img").src,
        title: product.querySelector(".card-title").innerText,
        price: product.querySelector(".card-price").innerText,
        id: product.querySelector("a").getAttribute("data-id"),
    };

    // send data of selected product to addToModalCart function
    addToModalCart(info);
}

// function for make template
function addToModalCart(info) {
    // make a variable for add to parent div in shop card
    const productDiv = document.createElement("div");
    productDiv.classList.add("d-flex", "justify-content-between", "border-bottom", "pb-2", "align-items-center", "mt-2");
    productDiv.innerHTML = `
    <div class="text-break" style="max-width: 150px;">
        <p>${info.title}</p>
    </div>

    <div>
        <p class="fs-5">${info.price}</p>
    </div>
        
    <div>
        <img class="img-thumbnail" src=${info.image} alt="" style="width: 100px;">
    </div>

    
    <a href="#" class="remove" data-id="${info.id}"><i class="fa-solid fa-trash text-danger"></i></a>
    
    
    `;

    // append template to div parent in DOM
    modalContent.appendChild(productDiv);

    // save data in local storage
    saveToStorage(info);
}

// save data to local storage if don't have exist from past
function saveToStorage(info) {
    // make a variable for result of data in local storage and for adding new data to it
    let dataStorage = getFromStorage();

    // push new data to dataOfLocalStorage variable
    dataStorage.push(info);

    // add new data to local storage
    localStorage.setItem("products", JSON.stringify(dataStorage));
}

// get data from local storage
function getFromStorage() {
    // make a variable for add data as a list on it
    let products;

    // check if data is in local storage
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
    } else {
        products = [];
    }

    return products;
}

// set data from local storage to dom when dom content is loading
function setFromLSToDOM() {
    // get information of data from local storage
    let information = getFromStorage();

    information.forEach((product) => {
        // make new template for add to modal when dom is loading

        const productDiv = document.createElement("div");
        productDiv.classList.add(
            "d-flex",
            "justify-content-between",
            "border-bottom",
            "pb-2",
            "align-items-center",
            "mt-2",
            "product-object"
        );
        productDiv.innerHTML = `
        <div class="text-break" style="max-width: 150px;">
            <p>${product.title}</p>
        </div>

        <div>
            <p class="fs-5">${product.price}</p>
        </div>
            
        <div>
            <img class="img-thumbnail" src=${product.image} alt="" style="width: 100px;">
        </div>

        
        <a href="#" class="remove" data-id="${product.id}"><i class="fa-solid fa-trash text-danger"></i></a>
        
    
    `;

        // append template to div parent in DOM
        modalContent.appendChild(productDiv);
    });
}

// delete all products from cart
function deleteAll() {
    // delete from modal in DOM
    while (modalContent.firstChild) {
        modalContent.firstChild.remove();
    }

    // delete all products from local storage
    localStorage.removeItem("products");
}

// remove product form dom
function removeProduct(e) {
    e.preventDefault();
    let product, productID;
    if (e.target.parentElement.classList.contains("remove")) {
        e.target.parentElement.parentElement.remove();
        product = e.target.parentElement.parentElement;
        productID = product.querySelector("a").getAttribute("data-id");

        removeProductLS(productID);
    }
}

// remove product form local storage
function removeProductLS(productID) {
    let idLS = getFromStorage();

    idLS.forEach((product, index) => {
        if (product.id === productID) {
            idLS.splice(index, 1);
        }
    });

    // add new list of products after delete one product to local storage
    localStorage.setItem("products", JSON.stringify(idLS));
}
