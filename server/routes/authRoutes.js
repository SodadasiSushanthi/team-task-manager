const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const User = require("../models/User");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;