const express = require("express");
const router = express.Router();
const User = require("../models/userMaster");

router.post("/signup", async (req, res) => {
  const { userName, name, email, role } = req.body;
  console.log(req.body);

  if (!userName || !name || !email || !role) {
    res
      .status(400)
      .json({ status: false, error: true, msg: "please enter all the fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  try {
    const user = await User.create({
      userName,
      name,
      email,
      password: "jghhjkg",
      role,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
