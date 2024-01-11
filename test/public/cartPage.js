// Function to fetch and display cart contents
const userid = localStorage.getItem("userid");
let sum = 0;

function showDetails(productid) {
  localStorage.setItem("productid", productid);
  console.log(productid, localStorage.getItem("productid"));
  window.location.href = "./detailsPage.html";
}

function updateSumTotal() {
  // Calculate the total price based on the 'sum' variable

  // Find the sumTotalContainer in the DOM
  const sumTotalContainer = document.querySelector(".sum-total h2");

  // Update the content of the h2 element with the calculated total
  sumTotalContainer.textContent = `Total: ${sum}৳`;
}

// The 'sum' variable should be updated in your code when you add or remove items from the cart.

function createGridItem(
  productid,
  imageSrc,
  name,
  description,
  price,
) {
  const div = document.createElement("div");
  div.classList.add("grid-item");

  // Create the first image element
  const image1 = document.createElement("div");
  image1.classList.add("pImage");
  image1.innerHTML = `<img src='${imageSrc}' alt="product image"/>`
  div.appendChild(image1);

  // Create the h3 element for the name
  const h3 = document.createElement("h3");
  h3.classList.add("name");
  h3.textContent = name;
  div.appendChild(h3);

  // Create the p element for the description
  const descriptionP = document.createElement("p");
  descriptionP.classList.add("description");
  descriptionP.textContent = description;
  div.appendChild(descriptionP);

  // Create the p element for the price
  const priceP = document.createElement("p");
  priceP.classList.add("price");
  priceP.innerHTML = `Price: <span>${price}৳</span>`;
  div.appendChild(priceP);

  // Create the cross button
  const closeButton = document.createElement("div");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&#10006"; // Unicode for the "X" symbol
  div.appendChild(closeButton);

  closeButton.addEventListener("click", () => {
    removeItemFromCart(productid);
    window.location.reload();
    div.remove();
    updateSumTotal();
  });

  // Attach a click event listener to the details button
  h3.addEventListener("click", () => {
    showDetails(productid);
  });

  return div;
}

function removeItemFromCart(productid) {
  fetch(`/removeFromCart/${userid}/${productid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Removed item with productid: ${productid}`);
    })
    .catch((error) => {
      console.error("Error removing item from the cart:", error);
    });
}

function fetchProductsAndAppendToGrid() {
  let cartContainer = document.querySelector(".cart-container");

  fetch("/fetchCart/" + userid)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const gridItem = createGridItem(
          product.productid,
          "./images/" + product.productid,
          product.productname,
          product.description,
          product.price
        );
        cartContainer.appendChild(gridItem); // Append the grid item to the grid container

        // Add the product price to the sum
        sum += product.price;

        console.log(product.productid);
      });

      // After appending all products, display them
      updateSumTotal();
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function updateSumTotal() {
  const sumTotalContainer = document.querySelector(".sum-total h2");
  sumTotalContainer.innerHTML = `Total: <span>${sum}৳</span>`;
}

fetchProductsAndAppendToGrid();
