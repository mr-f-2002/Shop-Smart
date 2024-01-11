let loc = {}
loc["Kishoreganj-Sadar Kishoreganj Dhaka"] = {0:24.43226398577787, 1:90.78712340786859};
loc["Mymensingh-Sadar Mymensingh Mymensingh"] = {0:24.783996163993073, 1:90.35443944351312}

if ("geolocation" in navigator) {
  // Get the user's current position
  navigator.geolocation.getCurrentPosition(function (position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    localStorage.setItem("liveLat", userLat);
    localStorage.setItem("liveLon", userLon);
    localStorage.setItem("userLat", userLat);
    localStorage.setItem("userLon", userLon);
    console.log(userLat, userLon);
  });
} else {
  // Geolocation is not supported by this browser
  console.log("Geolocation is not supported by this browser.");
}

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


document.getElementById("loc-text").innerText = 
`${localStorage.getItem("subdistrict")}, ${localStorage.getItem("district")}, ${localStorage.getItem("division")}`
function search() {
  var searchBox = document.querySelector(".searchBox");
  var keyword = searchBox.value.toLowerCase();
  console.log(keyword);
  localStorage.setItem("data", keyword);
  localStorage.setItem("fromlanding", "true");
  if (keyword != "") {
    window.location.href = "./productPage.html";
  }
}

document.querySelector(".chat").addEventListener("click", ()=>{
  location.href="./chat.html";
});

function Explore() {
  var searchBox = document.querySelector(".searchBox");
  var keyword = searchBox.value.toLowerCase();
  console.log(keyword);
  localStorage.setItem("data", keyword);
  localStorage.setItem("fromlanding", "true");
    window.location.href = "./productPage.html";
}

function searchCategory(keyword) {
  console.log(keyword + " for category");
  localStorage.setItem("data", keyword);
  localStorage.setItem("fromlanding", "true");
  if (keyword != "") {
    window.location.href = "./productPage.html";
  }
}

function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");

  if (dropdown.style.display === "flex") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "flex";
  }
}

function editLoc() {
  var editForm = document.getElementById("editForm");
  editForm.style.display = "flex";
}

function updateLoc() {
  var editForm = document.getElementById("editForm");
  editForm.style.display = "none";
  const subdistrict =  document.getElementById("subdistrict").value;
  const district =  document.getElementById("district").value;
  const division =  document.getElementById("division").value;
  localStorage.setItem("subdistrict", subdistrict);
  localStorage.setItem("district", district);
  localStorage.setItem("division", division);
  document.getElementById("loc-text").innerText = `${subdistrict}, ${district}, ${division}`
  localStorage.setItem("userLat", loc[`${subdistrict} ${district} ${division}`][0]);
  localStorage.setItem("userLon", loc[`${subdistrict} ${district} ${division}`][1]);
  console.log(localStorage.getItem("userLat"), localStorage.getItem("userLon")) ;
}

function resetLoc(){
  var editForm = document.getElementById("editForm");
  editForm.style.display = "none";
  localStorage.setItem("subdistrict", "Board Bazar");
  localStorage.setItem("district", "Gaziput");
  localStorage.setItem("division", "Dhaka");
  document.getElementById("loc-text").innerText = `${localStorage.getItem("subdistrict")}, ${localStorage.getItem("district")}, ${localStorage.getItem("division")}`;
  localStorage.setItem("userLat", localStorage.getItem("liveLat"));
  localStorage.setItem("userLon", localStorage.getItem("liveLon"));
  console.log(localStorage.getItem("userLat"), localStorage.getItem("userLon")) ;
}

function loadDistricts() {
  const divisionSelect = document.getElementById("division");
  const districtSelect = document.getElementById("district");
  const selectedDivision = divisionSelect.value;

  // Clear previous options
  districtSelect.innerHTML = "";

  fetch("/district?condition=" + selectedDivision)
    .then((response) => response.json())
    .then((value) => {
      value.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.district;
        option.text = product.district;
        districtSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function loadSubdistricts() {
  const districtSelect = document.getElementById("district");
  const subdistrictSelect = document.getElementById("subdistrict");
  const selectedDistrict = districtSelect.value;
  console.log(selectedDistrict);

  // Clear previous options
  subdistrictSelect.innerHTML = "";

  // Populate subdistrict options based on selected district
  fetch("/subdistrict?condition=" + selectedDistrict)
    .then((response) => response.json())
    .then((value) => {
      value.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.subdistrict;
        option.text = product.subdistrict;
        subdistrictSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

//function to update user name and email in toggle down menu
function toggleFilter() {
  //select by id
  const profilePic = document.getElementById("profilePic");
  const profilePicD = document.getElementById("profilePicD");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const login = document.getElementById("login");
  const signup = document.getElementById("signup");

  //check local data for a json containing these and checking if the user is connected

  if (localStorage.getItem("email") != null) {
    //if user is connected then get the data from local storage
    // const user = localStorage.getItem("user");
    //set the data to the html elements
    profilePic.src = "./images/" + localStorage.getItem("userid");
    profilePicD.src = "./images/" + localStorage.getItem("userid");
    email.innerHTML = localStorage.getItem("email");
    username.innerHTML = localStorage.getItem("username");
    //delete login and signup button hrefs
    login.style.display = "none";
    signup.style.display = "none";
  } else {
    //if user is not connected then set the data to default
    email.innerHTML = "";
    username.innerHTML = "Guest User";
    document.getElementById("profileman").style.display = 'none';
  }
}

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  if (slideIndex === slides.length) {
    slideIndex = 0;
  }

  const translateValue = -slideIndex * 100;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${translateValue}%)`;
  });

  slideIndex++;
}

setInterval(showSlides, 1200);

function toggleColor() {
  const whiteBgSrc = "./images/cubewh.mp4";
  const blackBgSrc = "./images/cubeb.mp4";
  const root = document.documentElement;
  root.style.setProperty('--primary-color', '#ff7300');
  root.style.setProperty('--text-color', 'black');
  // Get the video element by its ID
const videoElement = document.getElementById('bgVideo');

// Set the new video source
videoElement.src = './images/cubewh.mp4';

}

const logout = document.getElementById("logout");
const addProduct = document.getElementById("addProduct");

logout.addEventListener("click", () => {
  //clear local storage
  localStorage.clear();
  localStorage.setItem("subdistrict", "Board Bazar");
  localStorage.setItem("district", "Gazipur");
  localStorage.setItem("division", "Dhaka");
  //reload the page
  location.reload();
});
function checkLocalStorage() {
  if (localStorage.getItem("email") != null) {
    logout.style.display = "block";
    addProduct.style.display = "block";
  } else {
    logout.style.display = "none";
    addProduct.style.display = "none";
  }
}

function createGridItem(productid, imageSrc, name, description, price, condition, status) {
  const div = document.createElement("div");
  div.classList.add("topCat");

  // Create the first image element
  const image1 = document.createElement("img");
  image1.src = imageSrc;
  image1.alt = "Image 1";
  div.appendChild(image1);

  // Create the h5 element for the name
  const h5 = document.createElement("h5");
  h5.textContent = name;
  div.appendChild(h5);

  // Create the p element for the description
  const descriptionP = document.createElement("p");
  descriptionP.textContent = description;
  div.appendChild(descriptionP);

  // Create the p element for the price
  const priceP = document.createElement("p");
  priceP.innerHTML = `Price: <span>৳${price}</span>`;
  div.appendChild(priceP);

  // Create the p element for condition
  const newP = document.createElement("p");
  newP.classList.add("condition");
  newP.innerHTML = `<span>${condition}</span>`;
  div.appendChild(newP);
  console.log(condition);

  if (!status){
    div.style.opacity = 0.6;
    div.style.backgroundColor = '#6d7787';
    div.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default click behavior
      event.stopPropagation(); // Stop the event from propagating
    });
  }else{
    div.addEventListener("click", () =>showDetails(productid));
  }

  return div;
}

function showDetails(productid) {
  console.log("FUCNTION CALLED");
  localStorage.setItem("productid", productid);
  console.log(productid, localStorage.getItem("productid"));
  window.location.href = "./detailsPage.html";
}

function loadLastFourItem() {
  const catContain = document.getElementById("catContain");
  fetch("/lastFourProduct")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const gridItem = createGridItem(
          product.productid,
          "./images/" + product.productid,
          product.productname,
          product.description,
          product.price,
          (product.condition == 1)? '':'Old',
          product.status
        );
        // gridItem.addEventListener("click", () =>
        //   showDetails(product.productid)
        // );
        catContain.appendChild(gridItem); // Append the grid item to the grid container
      });

      // After appending all products, display them
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

var it = 0;
var txt = 'Find your daily needs in one place! Checkout your surrounding and find the best deal for you. We sell, we buy, we do things that no one else can!!'; /* The text */
var speed = 30; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (it < txt.length) {
    document.getElementById("demo2").innerHTML += txt.charAt(it);
    it++;
    setTimeout(typeWriter, speed);
  }
}




// Search Recommendation Feature

// This function creates a container for the items
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
  },100);
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
  console.log("callMaxSearched is being called");
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
    console.log("Item created");
    item.textContent = itemText;
    searchBox.place

    item.addEventListener("click", function () {
      console.log("search function clicked");
      searchBox.value = itemText;
      search();

      // Hide the dropdown after clicking
      dropdown.style.display = "none";
    });

    dropdown.appendChild(item);
  });

  // Show the dropdown
  dropdown.style.display = "block";
}

typeWriter();
checkLocalStorage();
toggleFilter();
loadLastFourItem();

// function kill() {
//   localStorage.removeItem("user");
//   window.location.href = "./landingPage.html";
// }
