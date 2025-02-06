const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
const productList = document.querySelector(".productContainer");

if (productList) {
  let fetchUrl;

  if (category === "all" || !category) {
    // Hent ALLE produkter
    fetchUrl = `https://kea-alt-del.dk/t7/api/products?limit=100`;
  } else {
    // Hent produkter fra en specifik kategori
    fetchUrl = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=200`;
  }

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => showList(data));
}

function showList(products) {
  console.log(products);
  const markup = products
    .map(
      (product) => `<div class="box ${product.discount > 0 ? "onSale" : ""} ${product.soldout ? "soldOut" : ""}">
          <div class="feature">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Produktbillede" class="productImage" />
            <p class="subtle">${product.brandname}</p>
            <h3 class="productName">${product.productdisplayname}</h3>
            <div class="productDetails">
              <p class="productPrice">${product.price} DKK</p>
            </div>
         <a href="produkt.html?id=${product.id}" class="buyButton">Se mere</a>
          </div>
        </div>`
    )
    .join("");
  console.log(markup);
  productList.innerHTML = markup;
}
