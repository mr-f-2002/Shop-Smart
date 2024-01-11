const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopsmart",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "INSERT INTO userinfo (userid, username, password, email, latitude, longitude) VALUES ('123','nahin','password','email@gmail.com',10.23, 12.33)";
  // db.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//########## Division District Sub-district Selection  ##########
app.get("/district", (req, res) => {
  const condition = req.query.condition; // Get query parameter "condition"

  // Use the condition in your database query
  const query = `SELECT * FROM districts WHERE division = ?`;

  db.query(query, [condition], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/subdistrict", (req, res) => {
  const condition = req.query.condition; // Get query parameter "condition"

  // Use the condition in your database query
  const query = `SELECT * FROM subdistricts WHERE district = ?`;

  db.query(query, [condition], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});
//############################ END #################################



//########################### Landing Page ##########################
// To get the user information based on the email user provided in the login page
app.get("/getusername", (req, res) => {
  //console.log("getusername endpoint accessed");
  const email = req.query.condition;
  const query =
    "SELECT userid,username, email,latitude,longitude FROM userinfo WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/lastFourProduct", (req, res)=> {
  const query = "SELECT * FROM products ORDER BY productid DESC LIMIT 4";
  db.query(query, (err, results)=>{
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  })
});

// Add a new route to retrieve the cart number
app.get("/cartNumber/:userId", (req, res) => {
  const userId = req.params.userId;
  //console.log("/cartNumber endpoint has been accessed");

  if (!userId) {
    res.status(400).json({ error: "Missing userId parameter" });
    return;
  }

  const query = "SELECT COUNT(*) AS cartNumber FROM cart WHERE userId = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      // The cart number is the result of the SQL COUNT query
      res.json({ cartNumber: results[0].cartNumber });
    }
  });
});


app.get("/fetchCart/:userid", (req, res) => {
  const userId = req.params.userid;
  const query =
    "SELECT * FROM cart, products WHERE cart.userid = ? AND cart.productid = products.productid";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/removeFromCart/:userid", (req, res) => {
  const userId = req.params.userid;
  //console.log("removeFromCart endpoint accessed");
  const query = "DELETE FROM cart WHERE userid = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});


// Search Reccomendation Feature

// 2. create api to fetch last 5 keywords searched products by the user

app.get("/lastFiveSearch/:userid", (req, res) => {
  const userid = req.params.userid;
  //console.log("lastFiveSearch endpoint accessed");
  const query =
    "SELECT keyword FROM `topsearch` WHERE userid = ? ORDER BY timerecord DESC LIMIT 5";
  db.query(query, [userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error getting last 5 search" });
    } else {
      //console.log("Last 5 search fetched successfully:", results);
      res.json(results);
    }
  });
});

// 4. create api to fetch top 5 liked product names given a keyword

app.get("/mostLikedProducts/:keyword", (req, res) => {
  const keyword = req.params.keyword.toLowerCase();

  // SQL query to retrieve most liked products based on the provided keyword (case-insensitive)
  const query = `
    SELECT p.productname, COUNT(l.productid) AS likeCount
    FROM products p
    LEFT JOIN likes l ON p.productid = l.productid
    WHERE LOWER(p.productname) LIKE ?
    GROUP BY p.productid, p.productname
    ORDER BY likeCount DESC
    LIMIT 10;`;

  // Use '%' around the keyword for a partial match
  const searchKeyword = `${keyword}%`;

  db.query(query, [searchKeyword], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error searching for products" });
    } else {
      //console.log("Products fetched successfully:", results);
      res.json(results);
    }
  });
});

// 3. create api to insert search keyword by the user

app.post("/insertKeyword/:userid", (req, res) => {
  const { userid } = req.params; // Extract userid from the URL parameters
  const { keyword } = req.body; // Extract keyword from the request body
  //console.log("insert keyword endpoint accessed");
  if (!userid || !keyword) {
    //console.log("Missing userid or keyword in the request body");
    //console.log(`userid is ${userid} and keyword is ${keyword}`);
    return res
      .status(400)
      .json({ error: "Missing userid or keyword in the request body" });
  }
  //console.log("Getting timestamp");
  const timerecord = new Date(); // Get the current timestamp

  // Insert into the topsearch table
  const query =
    "INSERT INTO topsearch (userid, keyword, timerecord) VALUES (?, ?, ?)";
  db.query(query, [userid, keyword, timerecord], (err, results) => {
    if (err) {
      //console.log("Error inserting keyword");
      console.error("Error inserting keyword:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    //console.log("Keyword inserted succesfully");
    res.status(200).json({ message: "Keyword inserted successfully" });
  });
});


//####################### END ####################################


//####################### Product Page ###########################
// fetch all products on the database in json array format with hardcoded data for now
app.get("/products", (req, res) => {
  //console.log("products endpoint accessed");
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/addtowishlist", (req, res) => {
  const { userid, keyword } = req.body;
  const query = "INSERT INTO wishlist (userid, keyword) VALUES (?, ?)";
  db.query(
    query, [userid, keyword], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

// Like feature

// Newly added tables

// 2. create api to fetch like count for a product given productid

app.get("/likecount/:productid", (req, res) => {
  const productid = req.params.productid;
  //console.log("products endpoint accessed");
  const query = "SELECT count(*) AS num FROM `likes` WHERE productid = ?";
  db.query(query, [productid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error getting like count" });
    } else {
      res.json(results);
    }
  });
});

// 3. create api to fetch like status for a product given productid and userid

app.get("/likestatus/:productid/:userid", (req, res) => {
  //console.log("likestatus endpoint accessed");
  const productid = req.params.productid;
  const userid = req.params.userid;
  //console.log("products endpoint accessed");
  const query =
    "SELECT count(*) AS num FROM `likes` WHERE productid = ? AND userid = ?";
  db.query(query, [productid, userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error getting like status" });
    } else {
      //console.log("Like status fetched successfully:", results);
      res.json(results);
    }
  });
});

// 4. create api to like a product given productid and userid

app.post("/likeproduct/:productid/:userid", (req, res) => {
  //console.log("likeproduct endpoint accessed");
  const productid = req.params.productid;
  const userid = req.params.userid;
  //console.log("products endpoint accessed");
  const query = "INSERT INTO likes (productid, userid) VALUES (?, ?)";
  db.query(query, [productid, userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error liking product" });
    } else {
      res.json(results);
    }
  });
});

// 5. create api to unlike a product given productid and userid

app.post("/unlikeproduct/:productid/:userid", (req, res) => {
  //console.log("unlikeproduct endpoint accessed");
  const productid = req.params.productid;
  const userid = req.params.userid;
  //console.log("products endpoint accessed");
  const query = "DELETE FROM likes WHERE productid = ? AND userid = ?";
  db.query(query, [productid, userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error unliking product" });
    } else {
      res.json(results);
    }
  });
});


//------------------##Working search --------------
app.get("/searchresult", (req, res) => {
  var keyword = req.query.condition; // Get query parameter "condition"
  keyword = "%" + keyword + "%";
  //console.log(keyword);
  const userLat = parseFloat(req.query.userLat); // Get user's latitude from query parameter
  const userLon = parseFloat(req.query.userLon); // Get user's longitude from query parameter

  // Use the condition in your database query
  const query = `SELECT DISTINCT products.productid, products.userid, products.productname, products.description, products.price, products.condition, products.status, products.latitude, products.longitude FROM products, tags 
    WHERE products.productid = tags.productid AND 
  (tags.tag LIKE ? OR products.description LIKE ? OR products.productname LIKE ? OR products.category LIKE ?)
  AND (6371 * acos(cos(radians(?)) * cos(radians(products.latitude)) * cos(radians(products.longitude) - radians(?)) + sin(radians(?)) * sin(radians(products.latitude)))) <= 5
  ;`;

  db.query(query, [keyword, keyword, keyword, keyword,userLat, userLon, userLat], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/searchresultwithdistance", (req, res) => {
  const userLat = parseFloat(req.query.latitude); // Get user's latitude from query parameter
  const userLon = parseFloat(req.query.longitude); // Get user's longitude from query parameter
  const radius = parseFloat(req.query.radius); // Get radius from query parameter
  const keyword = `%${req.query.condition}%`; // Get query parameter "condition"

  //console.log("User Location - Latitude:", userLat, "Longitude:", userLon);
  //console.log("Search Radius:", radius);
  //console.log("Keyword:", keyword);

  // Use the HaversineDistance function in your database query to calculate distance


  const query = `
    SELECT DISTINCT
      products.productid,
      products.userid,
      products.productname,
      products.description,
      products.price,
      products.condition,
      products.status,
      products.latitude,
      products.longitude
    FROM
      products
      INNER JOIN tags ON products.productid = tags.productid
    WHERE
      (tags.tag LIKE ? OR products.description LIKE ?)
      AND HaversineDistance(?, ?, products.latitude, products.longitude) <= ?;
  `;

  db.query(
    query,
    [keyword, keyword, userLat, userLon, radius],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Database query error" });
      } else {
        res.json(results);
      }
    }
  );
});


//------------##---------//
app.get("/filterResult", (req, res) => {
  var nkey = req.query.key; // Get query parameter "condition"
  nkey = "%" + nkey + "%";
  //console.log("see:",nkey);
  const minPrice = parseInt(req.query.minPrice);
  const maxPrice = parseInt(req.query.maxPrice);
  const userLat = parseFloat(req.query.latitude); // Get user's latitude from query parameter
  const userLon = parseFloat(req.query.longitude); // Get user's longitude from query parameter
  const radius = parseFloat(req.query.radius);
  const condition = req.query.condition;
 
  function haversineDistance(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers

    // Differences in latitude and longitude
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return parseFloat(distance);
  }
     
  const query = `
  SELECT DISTINCT
    products.productid,
    products.userid,
    products.productname,
    products.description,
    products.price,
    products.condition,
    products.status,
    products.latitude,
    products.longitude
  FROM
    products
    INNER JOIN tags ON products.productid = tags.productid
  WHERE
    (tags.tag LIKE ? OR products.description LIKE ? OR products.productname LIKE ? OR products.category LIKE ?)
    AND products.price BETWEEN ? AND ?
    AND (products.condition = ? OR ? = 'All')
    AND (6371 * acos(cos(radians(?)) * cos(radians(products.latitude)) * cos(radians(products.longitude) - radians(?)) + sin(radians(?)) * sin(radians(products.latitude)))) <= ?;
`;

db.query(query, [nkey, nkey , nkey, nkey, minPrice, maxPrice, condition, condition, userLat, userLon, userLat, radius], (err, results) => {
   

    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

//----------------------------------//Explore-------------###
app.get("/productsWithinRadius", (req, res) => {
  const userLat = parseFloat(req.query.userLat); // User's latitude
  const userLon = parseFloat(req.query.userLon); // User's longitude
  const radius = parseFloat(req.query.radius); // Search radius in kilometers

  // Query products from the database and filter based on Haversine distance
  const query = `
    SELECT *
    FROM products
    WHERE ${haversineDistance(userLat, userLon, "products.latitude", "products.longitude")} <= ${radius};
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

//################################### END ##############################

//######################## Sign Up Page ################################
// To insert user in the database
app.post("/insert", (req, res) => {
  const { userid, username, password, email, latitude, longitude } = req.body;

  const query =
    "INSERT INTO userinfo (userid, username, password, email, latitude, longitude ) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [userid, username, password, email, latitude, longitude],
    (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

// Use 'express-fileupload' middleware for file uploads
app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send("No files were uploaded.");
  }

  const image = req.files.image;
  const userid = req.body.userid.toString();

  // Define the path where the uploaded image will be saved in the "images" directory
  const imagePath = path.join(__dirname, "public", "images", userid);

  // Use the mv() method to save the image to the specified path
  image.mv(imagePath, (err) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).send("Error uploading image");
    }

    //console.log("Image uploaded successfully");
    res.redirect("/");
  });
});
//############################### END ################################


//######################## Log In Page ################################
// To check login credentials
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM userinfo WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    } else {
      if (results.length === 1) {
        res.status(200).json({ success: true, message: "Login successful" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  });
});

// to send the OTP
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Yahoo", // e.g., "Gmail" or your email service provider
  auth: {
    user: "shopnkeepdevs@yahoo.com", // Your email address
    pass: "Tropicalrazia@1", // Your email password
  },
});

// Correct order of middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/send-otp", (req, res) => {
  //console.log("send-otp endpoint accessed");
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const query = "INSERT INTO otp (email, otp) VALUES (?, ?)";

  // Send email with OTP
  const mailOptions = {
    from: "hoquelabid@gmail.com", // Your email address
    to: email, // Recipient's email address
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error sending OTP email" });
    } else {
      // Insert OTP into the database
      db.query(query, [email, otp], (dbError) => {
        if (dbError) {
          console.error("Database query error:", dbError);
          res
            .status(500)
            .json({ success: false, message: "Error inserting OTP" });
        } else {
          res
            .status(200)
            .json({ success: true, message: "OTP sent successfully" });
        }
      });
    }
  });
});

// Verify OTP

app.post("/verify-otp", (req, res) => {
  //console.log("verify-otp endpoint accessed");
  const { email, otp } = req.body;
  const query = "SELECT * FROM otp WHERE email = ? AND otp = ?";

  db.query(query, [email, otp], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      res.status(500).json({ success: false, message: "Error verifying OTP" });
    } else {
      if (results.length > 0) {
        res.status(200).json({ success: true, message: "OTP verified" });
      } else {
        res.status(200).json({ success: false, message: "OTP not verified" });
      }
    }
  });
});

// Delete OTP from database and reset password

app.post("/reset-password", (req, res) => {
  //console.log("reset-password endpoint accessed");
  const { email, password } = req.body;
  const query = "DELETE FROM otp WHERE email = ?";

  db.query(query, [email], (error) => {
    if (error) {
      console.error("Database query error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error resetting password" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    }
  });
});
//############################### END ################################



//########################## Add Product Page  ##########################
app.post("/insertproduct", (req, res) => {
  const { productid, userid, productname, description, price, condition, status, category, latitude, longitude } = req.body;

  const query =
    "INSERT INTO products (productid, userid, productname, description, price, `condition`, status, category, latitude, longitude ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query, [productid, userid, productname, description, price, condition, 1, category, latitude, longitude,], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.post("/setnotification", (req, res) =>{
  const { userid, message } = req.body;

  const query = "INSERT INTO `notification`(`userid`, `message`) VALUES (?, ?)";
  db.query(query, [userid, message], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.get("/wisheditems", (req, res) => {
  const query = "SELECT * FROM `wishlist`";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

//api end points to insert data into tags table
app.post("/inserttags", (req, res) => {
  const { productid, tag } = req.body;

  const query = "INSERT INTO tags (productid, tag) VALUES (?, ?)";
  db.query(query, [productid, tag], (err, result) => {
    if (err) {
      console.error("Database insertion error:", err);
      res.status(500).json({ message: "Error inserting data" });
    } else {
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});
//############################### END ################################

//############################# Details Page ####################
app.post("/addtocart/:userid/:productid", (req, res) => {
  const userId = req.params.userid;
  const productId = req.params.productid;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing user ID or product ID" });
  }

  // Check if the product is already in the user's cart
  const checkQuery = "SELECT * FROM cart WHERE userid = ? AND productid = ?";
  db.query(checkQuery, [userId, productId], (checkError, checkResults) => {
    if (checkError) {
      console.error("Database query error:", checkError);
      return res.status(500).json({ error: "Database query error" });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: "Product is already in the cart" });
    }

    // If the product is not in the cart, insert it
    const insertQuery = "INSERT INTO cart (userid, productid) VALUES (?, ?)";
    db.query(insertQuery, [userId, productId], (insertError) => {
      if (insertError) {
        console.error("Database query error:", insertError);
        return res
          .status(500)
          .json({ error: "Error adding product to the cart" });
      }

      res
        .status(200)
        .json({ message: "Product added to the cart successfully" });
    });
  });
});

app.get("/api/cartnum", (req, res) => {
  const productid = req.query.condition
  //console.log("products endpoint accessed");
  const query = "SELECT count(*) AS num FROM `cart` WHERE productid = ?";
  db.query(query, [productid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/details", (req, res) => {
  const productid = req.query.condition
  //console.log("products endpoint accessed");
  const query = "SELECT * FROM `products` WHERE productid = ?";
  db.query(query, [productid, productid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

//############################# END #########################

//############################# Profile page ########################
app.get("/userdetails", (req, res) => {
  const userid = req.query.condition;
  const query = "SELECT userid, username, password, email FROM `userinfo` WHERE userid = ?";
  db.query(query, [userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  })
})

app.get("/notifications", (req, res) => {
  const userid = req.query.condition;
  const query = "SELECT userid, message FROM `notification` WHERE userid = ?";
  db.query(query, [userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  })
})

app.post("/updateuser", (req, res) => {
  const { userid, username, password, email } = req.body;

  const query ="UPDATE `userinfo` SET `username`=?,`password`=?,`email`=? WHERE `userid` = ?";
  db.query(query, [username, password, email, userid], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.get("/myproducts", (req, res) => {
  const userid = req.query.condition;
  const query = "SELECT * FROM `products` WHERE userid = ?";
  db.query(query, [userid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  })
})

app.post("/updateState0", (req, res) => {
  const {pid} = req.body;
  const id = pid[0];
  //console.log(id);
  const query ="UPDATE `products` SET `status`= 0 WHERE productid = ?;";
  db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.post("/updateState1", (req, res) => {
  const {pid} = req.body;
  const id = pid[0];
  //console.log(id);
  const query ="UPDATE `products` SET `status`= 1 WHERE productid = ?;";
  db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.post("/deleteproduct", (req, res) => {
  const {pid} = req.body;
  const id = pid[0];
  //console.log(id);
  const query ="DELETE FROM `products` WHERE `productid` = ?";
  db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res.status(500).json({ message: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.post("/soldproduct", (req, res) => {
  const { pid } = req.body;
  const id = pid[0];

  // Assuming you have a `products` table with a `price` column
  const getProductPriceQuery = "SELECT userid, price FROM products WHERE productid = ?";
  
   //console.log("Is it sold?");
  db.query(getProductPriceQuery, [id], (priceError, priceResult) => {
    if (priceError) {
      console.error("Database query error:", priceError);
      res.status(500).json({ message: "Error retrieving product price" });
    } else {
      const price = priceResult[0].price;
      const userid = priceResult[0].userid;

      // Insert the purchase record into the `purchase` table
      const insertPurchaseQuery = "INSERT INTO `purchase` (userid, productid, Date, price) VALUES (?, ?, CURRENT_DATE(), ?)";
      db.query(insertPurchaseQuery, [userid, id, price], (insertError, insertResult) => {
        if (insertError) {
          console.error("Database insertion error:", insertError);
          res.status(500).json({ message: "Error inserting purchase data" });
        } else {
          res.status(200).json({ message: "Purchase data inserted successfully" });
        }
      });
    }
  });
});

app.get("/myproducts/:productId", (req, res) => {
  const productId = req.params.productId;

  const productQuery = "SELECT * FROM products WHERE productid = ?";
  const tagsQuery = "SELECT tag FROM tags WHERE productid = ?";

  // Fetch product details
  db.query(productQuery, [productId], (err, productResult) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error fetching product details" });
    } else {
      if (productResult.length === 0) {
        res.status(404).json({ message: "Product not found" });
      } else {
        const productDetails = productResult[0];

        // Fetch tags for the product
        db.query(tagsQuery, [productId], (err, tagsResult) => {
          if (err) {
            console.error("Database query error:", err);
            res.status(500).json({ message: "Error fetching tags" });
          } else {
            const tags = tagsResult.map((tagObj) => tagObj.tag);

            // Add tags to the product details
            productDetails.tags = tags;

            res.status(200).json(productDetails);
          }
        });
      }
    }
  });
});

app.put("/updateproduct/:productId", (req, res) => {
  const productId = req.params.productId;
  const { productname, description, price, category, tags } = req.body;

  // Define the fields that can be updated
  const updateFields = [];
  const updateValues = [];

  if (productname) {
    updateFields.push("productname");
    updateValues.push(productname);
  }

  if (description) {
    updateFields.push("description");
    updateValues.push(description);
  }

  if (price) {
    updateFields.push("price");
    updateValues.push(price);
  }

  if (category) {
    updateFields.push("category");
    updateValues.push(category);
  }

  // Build the dynamic part of the query
  const dynamicUpdateFields = updateFields.map(field => `${field} = ?`).join(', ');

  // Final query
  const query = `UPDATE products SET ${dynamicUpdateFields} WHERE productid = ?`;

  // Add the product ID to the values array
  updateValues.push(productId);

  db.query(query, updateValues, (err, result) => {
    if (err) {
      console.error("Database update error:", err);
      res.status(500).json({ message: "Error updating product" });
    } else {
      // Update tags for the product
      db.query("DELETE FROM tags WHERE productid = ?", [productId], (err) => {
        if (err) {
          console.error("Database deletion error:", err);
          res.status(500).json({ message: "Error updating tags" });
        } else {
          // Insert new tags
          const tagInsertQuery = "INSERT INTO tags (productid, tag) VALUES ?";
          const tagValues = tags.map((tag) => [productId, tag]);
          db.query(tagInsertQuery, [tagValues], (err) => {
            if (err) {
              console.error("Database insertion error:", err);
              res.status(500).json({ message: "Error updating tags" });
            } else {
              res.status(200).json({ message: "Product updated successfully" });
            }
          });
        }
      });
    }
  });
}); 

//graph
app.get('/purchases/stats', (req, res) => {
  // Calculate the date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const userid = req.query.condition;

  // Query to get the total price amount for each day in the last 30 days
  const query = `
  SELECT
  DATE(purchase.date) AS purchaseDate,
  COALESCE(SUM(purchase.price), 0) AS totalPrices
FROM
  purchase
 
WHERE
  purchase.date >= ? and userid = ?
GROUP BY
  purchaseDate
ORDER BY
  purchaseDate;`


  db.query(query, [thirtyDaysAgo, userid], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      ////console.log("ffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      ////console.log(result);
      const stats = result.map(row => ({
        purchaseDate: row.purchaseDate,
        totalPrices: row.totalPrices || 0,
      }));
      //console.log(stats);
      res.json(stats);
    }
  });
});

app.get('/purchases/summary', (req, res) => {
  // Calculate the date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const userid = req.query.condition;

  // Query to get the total number of purchases and sum of prices for the last 30 days
  const query = `
    SELECT
      COUNT(DISTINCT purchase.productid) AS totalPurchases,
      COALESCE(SUM(purchase.price), 0) AS totalPrices
    FROM
      purchase
    
    WHERE
      purchase.date >= ? and userid = ?;
  `;

  db.query(query, [thirtyDaysAgo, userid], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      //console.log('Total number of purchases');
      //console.log(result);
      
      const summary = {
        totalPurchases: result[0].totalPurchases || 0,
        totalPrices: result[0].totalPrices || 0,
      };
      res.json(summary);
    }
  });
});


//################### END ##########################


//##################  Chat Page  ##################
// Add this route to fetch the last 5 recently contacted users
app.get("/recentlyContactedUsers/:userId", (req, res) => {
  const userId = req.params.userId;

  // Create a query to retrieve the last 5 recently contacted users
  const query = `
    SELECT
        u.userid AS other_userid,
        u.username AS other_username,
        MAX(cm.time) AS max_time
    FROM userinfo u
    JOIN (
        SELECT
            CASE
                WHEN user_1 = ? THEN user_2
                WHEN user_2 = ? THEN user_1
            END AS other_user,
            time
        FROM chat_messages
        WHERE ? IN (user_1, user_2)
    ) AS cm ON u.userid = cm.other_user
    GROUP BY u.userid, u.username
    ORDER BY max_time DESC
    LIMIT 5;
  `;

  db.query(query, [userId, userId, userId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      //console.log(results);
      res.json({ recentlyContactedUsers: results });
    }
  });
});

app.delete("/removeFromCart/:userid/:productid", (req, res) => {
  const userId = req.params.userid;
  const productId = req.params.productid;
  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing user ID or product ID" });
  }

  // Delete the item from the user's cart based on user ID and product ID
  const query = "DELETE FROM cart WHERE userid = ? AND productid = ?";
  db.query(query, [userId, productId], (err) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "Error removing product from the cart" });
    }

    res
      .status(200)
      .json({ message: "Product removed from the cart successfully" });
  });
});

// Endpoint to fetch chat messages between two users
app.get("/chat/:userId/:otherUserId", (req, res) => {
  const userId = req.params.userId;
  const otherUserId = req.params.otherUserId;

  // Query the chat_messages table to retrieve chat messages
  const query = `
    SELECT * FROM chat_messages
    WHERE (user_1 = ? AND user_2 = ?) OR (user_1 = ? AND user_2 = ?)
    ORDER BY time;
  `;

  db.query(
    query,
    [userId, otherUserId, otherUserId, userId],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Database query error" });
      } else {
        res.json({ messages: results });
      }
    }
  );
});

// Add this route to handle sending chat messages
app.post("/sendMessage", (req, res) => {
  //console.log("/sendMessage endpoint accessed");
  const { userId, otherUserId, message } = req.body;

  // Define the 'fromUser1' flag and set the current timestamp
  const fromUser1 = true; // You can modify this based on your logic
  const time = new Date(); // Get the current timestamp

  // Insert the message into the chat_messages table
  const query =
    "INSERT INTO chat_messages (user_1, user_2, message, fromUser1, time) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [userId, otherUserId, message, fromUser1, time], (err) => {
    if (err) {
      console.error("Database insertion error:", err);
      res.status(500).json({ message: "Error sending message" });
    } else {
      res.status(200).json({ message: "Message sent successfully" });
    }
  });
});

app.get("/getOtherUserId/:productid", (req, res) => {
  //console.log("/getOtherUserId endpoint accessed");
  const productid = req.params.productid;

  // Replace 'products' with the actual name of your 'products' table
  const query = "SELECT userid FROM products WHERE productid = ?";

  db.query(query, [productid], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Error getting other user ID" });
    } else {
      if (results.length > 0) {
        const otherUserId = results[0].userid; // Assuming the column name for user ID is 'userid'
        //console.log(otherUserId);
        res.status(200).json({ otherUserId });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    }
  });
});

//################### END ##########################


app.listen(port, () => {
  //console.log(`Server is running on port ${port}`);
});

