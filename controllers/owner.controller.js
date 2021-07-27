const owner = require("../models/owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.ownerRegister = async (req, res) => {
  console.log("1", req.body);
  const newOwner = new owner({ ...req.body });
  console.log("2", newOwner);

  const email = newOwner.email;
  console.log("3", email);
  const Owner = await owner.findOne({ email });

  console.log("4", Owner);

  if (Owner) {
    return res.status(401).json({ msg: "user already exist" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newOwner.password, salt);
    console.log("hash :", hash);

    newOwner.password = hash;

    await newOwner.save();
    res.status(202).json({ msg: "Register success" });
  } catch (err) {
    console.error("Register failed", err);
    res.status(402).json({ msg: "Register failed" });
  }
};
exports.ownerLogin = async (req, res) => {
  const { email, password } = req.body;

  const Owner = await owner.findOne({ email });

  if (!Owner) return res.status(401).json({ msg: "Bad credentiel" });

  const isMatch = await bcrypt.compare(password, Owner.password);

  if (!isMatch) return res.status(401).json({ msg: "Bad credentiel" });

  try {
    const payload = {
      id: owner._id,
      fullName: owner.fullName,
      ashop:owner.ashop,
      adress:owner.adress,
      city:owner.city,
      phone:owner.phone,
      email: owner.email
     
    };

    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.status(200).json({ token: `Bearer ${token}` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
};
