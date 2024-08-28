const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

// Method: GET
// Route: /user/
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

//@access public
// Method: GET
// Route: /user/:id
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, req.body);

  if (!user) {
    res.status(404);
    throw new Error("No user data found");
  }

  res.status(200).json(user);
});

// Method: PUT
// Route: /event/:id
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("No user data found");
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body);
  res.status(200).json(updatedUser);
});

// Method: DELETE
// Route: /event/:id
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("No user data found");
  }

  await User.deleteOne(id, req.body);

  res
    .status(200)
    .json({ message: "User with ID: " + id + " deleted successfully." });
});

// Method: POST
// Route: /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, user_type } = req.body;

  if (!name || !email || !password || !user_type) {
    res.status(400);
    throw new Error("All fields are required to be registered!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    const userStatus = userExists.status;
    res.status(400);
    // Check status of the batteries
    if (userStatus === 1) {
      throw new Error("Another user has registered with this email!");
    } else if (userStatus === 2) {
      throw new Error("An account with this email has been suspended!");
    } else if (userStatus === 0) {
      throw new Error(
        "This user exists but has not been verified! Please login a verify."
      );
    }
  }

  // get hashed password from bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // create the user
  const user = await User.create({ ...req.body, password: hashedPassword });
  console.log("User created successfully: ", user.email);

  if (user) {
    res.status(200).json({ _id: user.id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("User account could not be created successfully!");
  }
});

// Method: GET & POST
// Route: /user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("This user does not exist!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("No user data found");
  }

  const userStatus = user.status;
  res.status(400);
  // Check status of the batteries
  if (userStatus === 2) {
    throw new Error("This account has been suspended!");
  } else if (userStatus === 0) {
    throw new Error(
      "This user exists but has not been verified! Please login a verify."
    );
  } else if (userStatus === 1) {
    // compare password with hashedPassword
    if (await bcrypt.compare(password, user.password)) {
      // create an access token
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            name: user.name,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Credentials are not valid!");
    }
  }
});

//@access private
// Method: GET
// Route: /user/current
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id; // from token values
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("No user data found");
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    location: user.location,
    interests: user.interests,
    user_type: user.user_type,
    status: user.status,
    createdAt: user.createdAt,
  });
});

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
};
