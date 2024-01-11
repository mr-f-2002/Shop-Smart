function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");

  if (dropdown.style.display === "flex") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "flex";
  }
}
// ###################//Full js e ei ta call e hoi nai..###################################
// document.getElementById('searchInput').addEventListener('keyup', function(event) {
//   if (event.keyCode === 13) {
//     const searchButton = document.querySelector(".searchButton");
//     searchButton.addEventListener("click", fetchProductsAndAppendOnSearch);
//   }
// });

function toggleFilter() {
  var filters = document.getElementById("filters");
  var sidePic = document.getElementById("sidePic");

  if (sidePic.src.endsWith("lArrow.png")) {
    filters.style.left = "-305px";
    sidePic.src = "./images/rArrow.png";
  } else if (sidePic.src.endsWith("rArrow.png")) {
    filters.style.left = "0";
    sidePic.src = "./images/lArrow.png";
  }
}

document.querySelector(".chat").addEventListener("click", ()=>{
  location.href="./chat.html";
});

function loadCartNumber() {
  const cartLabel = document.querySelector(".cart label");

  // Check if the user is not logged in
  if (localStorage.getItem("email") == null) {
    cartLabel.innerHTML = 0;
  } else {
    // Construct the URL with the userId as a query parameter
    const userId = localStorage.getItem("userid");
    const apiUrl = `/cartNumber/${userId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        cartLabel.innerHTML = data.cartNumber;
      })
      .catch((error) => {
        console.error("Error fetching cart number:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }
}

//route to cartPage.html

const cartButton = document.querySelector(".cart button");

cartButton.addEventListener("click", () => {
  if (localStorage.getItem("email") == null) {
    alert("Please login to view your cart");
  } else {
    window.location.href = "./cartPage.html";
  }
});

loadCartNumber();

function showDetails(productid) {
  localStorage.setItem('productid', productid);
  //console.log(productid, localStorage.getItem('productid'));
  window.location.href = './detailsPage.html';
}

function createGridItem(productid, imageSrc, cartSrc, name, description, price, condition, status) {
  const div = document.createElement("div");
  div.classList.add("grid-item");

  // Create the first image element
  const image1 = document.createElement("img");
  image1.classList.add("image");
  image1.src = imageSrc;
  image1.alt = "Image 1";
  div.appendChild(image1);

  // Create the second image element
  const cartImage = document.createElement("img");
  cartImage.src = cartSrc;
  cartImage.alt = "";
  cartImage.classList.add("cart");
  cartImage.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (localStorage.getItem("email") == null) {
      alert("Please login to add to cart");
    } else {
      const userid = localStorage.getItem("userid");
      const apiUrl = `/addtocart/${userid}/${productid}`;

      fetch(apiUrl, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert("Item added to cart");
          loadCartNumber();
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          // Handle the error, e.g., display an error message to the user
        });
    }
  });
  div.appendChild(cartImage);

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

  // Create the p element for condition
  const newP = document.createElement("p");
  newP.classList.add("condition");
  newP.innerHTML = `<span>${condition}</span>`;
  div.appendChild(newP);
  //console.log(condition);

  // Create the like button
  //console.log("Like button created");
  const likeButton = document.createElement("div");
  likeButton.classList.add("like-button");
  const likeIcon = document.createElement("i");
  likeIcon.classList.add("far", "fa-heart");
  likeButton.appendChild(likeIcon);
  const likeCounter = document.createElement("span");
  likeCounter.classList.add("like-counter");
  likeCounter.textContent = "0"; // Initialize the counter with 0 likes
  likeButton.appendChild(likeCounter);
  div.appendChild(likeButton);

  const userid = localStorage.getItem("userid");

  fetch(`/likestatus/${productid}/${userid}`).then((response) => {
    response.json().then((data) => {
      //console.log(data[0].num);
      if (data[0].num > 0) {
        likeIcon.classList.remove("far", "fa-heart");
        likeIcon.classList.add("fas", "fa-heart"); // Add the class for clicked image
      } else {
        likeIcon.classList.remove("fas", "fa-heart");
        likeIcon.classList.add("far", "fa-heart"); // Add the class for unclicked image
      }
    });
  });

  fetch(`/likecount/${productid}`).then((response) => {
    response.json().then((data) => {
      //console.log(data[0].num);
      likeCounter.textContent = data[0].num;
    });
  });

  // Toggle between clicked and unclicked images
  likeButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent div
    event.preventDefault(); // Prevent the default action (e.g., redirecting to another page)

    // set initial state of like button by fetching from api and checking if the product is liked by the user

    //liking action
    if (likeIcon.classList.contains("far")) {
      fetch(`/likeproduct/${productid}/${userid}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
          //alert("Item added to wishlist");
        });

      likeIcon.classList.remove("far", "fa-heart");
      likeIcon.classList.add("fas", "fa-heart"); // Add the class for clicked image
    }
    // unliking action
    else {
      fetch(`/unlikeproduct/${productid}/${userid}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          //console.log(data);
          likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
          //alert("Item removed from wishlist");
        });

      likeIcon.classList.remove("fas", "fa-heart");
      likeIcon.classList.add("far", "fa-heart"); // Add the class for unclicked image
    }
  });

  if (!status) {
    div.style.opacity = 0.6;
    div.style.backgroundColor = 'gray';
  } else {
    div.addEventListener("click", () => showDetails(productid));
  }

  return div;
}

function fetchProductsAndAppendToGrid() {
  let gridContainer = document.querySelector(".grid-container"); // Select the grid container

  const keyword = localStorage.getItem("data");
  //console.log(keyword);

  const userLat = localStorage.getItem("userLat");
  const userLon = localStorage.getItem("userLon");
  //console.log("User Latitude:", userLat);
  //console.log("User Longitude:", userLon);

   fetch(`/searchresult?condition=${keyword}&userLat=${userLat}&userLon=${userLon}`)
    .then((response) => response.json())
    .then((products) => {
      if(products.length == 0)
        addToWishlist(keyword);
      products.forEach((product) => {
        const gridItem = createGridItem(
          product.productid,
          "./images/" + product.productid,
          "./images/cart.png",
          product.productname,
          product.description,
          product.price,
          (product.condition == 1) ? '' : 'Old',
          product.status
        );
        gridContainer.appendChild(gridItem); // Append the grid item to the grid container
        localStorage.setItem("fromlanding", true);
      });

      // After appending all products, display them
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

//-------------------------------------###########  Filter  ########----------
document.getElementById('filterForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const key  = localStorage.getItem("data");

      const userLat = localStorage.getItem("userLat");
      const userLon = localStorage.getItem("userLon");
      //console.log("User Latitude:", userLat);
      //console.log("User Longitude:", userLon);
      const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
      const maxPrice = parseInt(document.getElementById('maxPrice').value) || 1000000;
      if (maxPrice < minPrice) {
        alert('Maximum price cannot be less than minimum price');
        // Optionally, you can reset the maxPrice input field to the minimum value
        document.getElementById('maxPrice').value = minPrice;
      }
      const condition = document.getElementById('condition').value;
      const radius = document.getElementById('radius').value;
  

      let gridContainer = document.querySelector('.grid-container'); // Select the grid container

      // Clear the existing grid items before appending new ones
      gridContainer.innerHTML = '';

      fetch(`/filterResult?minPrice=${minPrice}&maxPrice=${maxPrice}&condition=${condition}&radius=${radius}&latitude=${userLat}&longitude=${userLon}&key=${key}`)
        .then((response) => response.json())
        .then((products) => {
          products.forEach((product) => {
            const gridItem = createGridItem(
              product.productid,
              "./images/" + product.productid,
              "./images/cart.png",
              product.productname,
              product.description,
              product.price,
              (product.condition == 1) ? '' : 'Old',
              product.status
            );
            gridItem.addEventListener('click', () => showDetails(product.productid));
            gridContainer.appendChild(gridItem); // Append the grid item to the grid container
            localStorage.setItem('fromlanding', false);
          });

          // After appending all products, display them
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    });


function fetchProductsAndAppendOnSearch() {
  const searchBox = document.querySelector(".searchBox");
  const keyword = searchBox.value;
  localStorage.setItem("data", keyword);


  const userLat = localStorage.getItem("userLat");
  const userLon = localStorage.getItem("userLon");
  //console.log("User Latitude:", userLat);
  //console.log("User Longitude:", userLon);
  let gridContainer = document.querySelector(".grid-container"); // Select the grid container
  // Clear the existing grid items before appending new ones
  gridContainer.innerHTML = "";
  fetch(`/searchresult?condition=${keyword}&userLat=${userLat}&userLon=${userLon}`)
    .then((response) => response.json())
    .then((products) => {
      if(products.length == 0)
        addToWishlist(keyword);
      products.forEach((product) => {
        const gridItem = createGridItem(
          product.productid,
          "./images/" + product.productid,
          "./images/cart.png",
          product.productname,
          product.description,
          product.price,
          (product.condition == 1) ? '' : 'Old',
          product.status
        );
        gridItem.addEventListener('click', () => showDetails(product.productid));
        gridContainer.appendChild(gridItem); // Append the grid item to the grid container
        localStorage.setItem("fromlanding", false);
      });
      // After appending all products, display them
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function addToWishlist(keyword){
  var userResponse = window.confirm("No such product! Add to wish list?");
    if (userResponse) {
        // Create a data object to send to the server
        const wishitem = {
          userid: localStorage.getItem("userid"),
          keyword: keyword
        };
    
        fetch("/addtowishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wishitem),
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log("Server response:", data);
            if (data.success) {
            } else {
            }
          })
          .catch((error) => {
            console.error("Error adding product:", error);
          });
        alert("added to wishlist!!")
    } else {
        // If the user clicks 'No' or closes the prompt, do nothing or handle as needed
        }
}


 
// Add an event listener to the search button to call the new function
 const searchButton = document.querySelector(".searchButton");
 searchButton.addEventListener("click", fetchProductsAndAppendOnSearch);

 function toggleProfileData() {
  //console.log("called");
  // Select elements by id
  const profilepic = document.getElementById("profilePic");
  const profilepicD = document.getElementById("profilePicD");
  var emailElement = document.getElementById("email");
  var usernameElement = document.getElementById("username");

  // Check if user is connected
  //console.log(localStorage.getItem("username"));
  if (localStorage.getItem("username") != null) {
    // If the user is connected, retrieve data from local storage
    const userid = localStorage.getItem("userid");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    //console.log(userid+" "+" "+storedUsername+" "+storedEmail+"  test 123");

    // Set the data to the HTML elements
    profilepic.src = "./images/" + userid;
    profilepicD.src = "./images/" + userid;
    emailElement.textContent = storedEmail;
    usernameElement.textContent = storedUsername;

    // Disable login and signup buttons (if needed)
    document.getElementById("login").style.display = 'none';
    document.getElementById("signup").style.display = 'none';
  } else {
    // If the user is not connected, set the data to default
    emailElement.textContent = "";
    usernameElement.textContent = "Guest User";
    //console.log("I am a guest");
  }
}

//add event listener on clicking href of logout

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  //clear local storage
  localStorage.clear();
  //reload the page
  location.reload();
});

//check if the localstorage is empty. if not empty remove the logout div

function checkLocalStorage() {
  if (localStorage.getItem("email") != null) {
    logout.style.display = "block";
  } else {
    logout.style.display = "none";
  }
}

// Select pagination elements
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const pages = document.querySelectorAll(".page");
const gridItems = document.querySelectorAll(".grid-item"); // Update this selector to match your HTML structure

const itemsPerPage = 2; // Number of grid items per page
let currentPage = 1;

function showPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  gridItems.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function updatePagination() {
  pages.forEach((page) => page.classList.remove("active"));
  pages[currentPage - 1].classList.add("active");
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    updatePagination();
  }
});

nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(gridItems.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
    updatePagination();
  }
});

pages.forEach((page, index) => {
  page.addEventListener("click", () => {
    currentPage = index + 1;
    showPage(currentPage);
    updatePagination();
  });
});

//Search Recommendations Feature

function createSearchDropdown() {
  const dropdown = document.createElement("div");
  dropdown.className = "search-dropdown"; // Add a class for styling
  return dropdown;
}

const searchBox = document.querySelector(".searchBox");

document.addEventListener("DOMContentLoaded", function () {
  // Create a new dropdown element
  const dropdown = createSearchDropdown();

  // Insert the dropdown before the search box
  searchBox.parentNode.insertBefore(dropdown, searchBox);

  // Add event listener to show the dropdown when the search box is focused
  searchBox.addEventListener("input", function () {
    // Get the current value of the search box
    const searchValue = searchBox.value.trim(); // Trim to remove leading and trailing spaces

    // Check if the search box has some text
    if (searchValue.length > 0) {
      // Call the second API with the typed search value
      callMaxSearched(dropdown, searchValue);
    } else {
      // If the search box is empty, call the first API
      callLastSearched(dropdown);
    }
  });

  // Add event listener to hide the dropdown when the search box is blurred
  // searchBox.addEventListener("blur", function () {
  setTimeout(() => {
    dropdown.style.display = "none";
  }, 100);
  // });
});

function callLastSearched(dropdown) {
  const userId = localStorage.getItem("userid");

  // Make a fetch request to your API endpoint
  fetch(`/lastFiveSearch/${userId}`)
    .then((response) => {
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON from the response
      return response.json();
    })
    .then((data) => {
      // Extract the relevant data (assuming 'keyword' is the key in your API response)
      const items = data.map((item) => item.keyword);

      // Populate the dropdown with the fetched data
      populateDropdown(dropdown, items);
    })
    .catch((error) => {
      console.error("Error fetching last searched:", error);
      // Handle the error or display a message to the user
    });
}

function callMaxSearched(dropdown, searchKeyword) {
  // Call the second API to retrieve most liked products
  //console.log("callMaxSearched is being called");
  fetch(`/mostLikedProducts/${searchKeyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract the relevant information from the API response
      const items = data.map((product) => product.productname);
      populateDropdown(dropdown, items);
    })
    .catch((error) => {
      console.error("API call error:", error);
      // Handle errors, e.g., display an error message in the dropdown
      populateDropdown(dropdown, ["Error fetching results"]);
    });
}

function populateDropdown(dropdown, items) {
  // Clear existing dropdown content
  dropdown.innerHTML = "";

  // Add dynamically generated items to the dropdown
  items.forEach((itemText) => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    //console.log("Item created");
    item.textContent = itemText;

    // Update the event listener to trigger the search function when an item is clicked
    item.addEventListener("click", function () {
      //console.log("search function clicked");
      searchBox.value = itemText;
      fetchProductsAndAppendOnSearch();

      // Hide the dropdown after clicking
      dropdown.style.display = "none";
    });

    dropdown.appendChild(item);
  });

  // Show the dropdown
  dropdown.style.display = "block";
}

// Initial display of grid items
showPage(currentPage);

// Initially display the first page
//redirect from landing page
// console.log("Start of javascript");
checkLocalStorage();
toggleProfileData();
fetchProductsAndAppendToGrid();