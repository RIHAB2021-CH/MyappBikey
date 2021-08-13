const owner = require("../models/owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Registration Rules
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

  const OwnerSearch = await owner.findOne({ email });

  if (!OwnerSearch) return res.status(401).json({ msg: "Bad credentiel" });

  const isMatch = await bcrypt.compare(password, OwnerSearch.password);

  if (!isMatch) return res.status(401).json({ msg: "Bad credentiel" });
  else {
    
    try {
    const payload = {
      id: OwnerSearch._id,
      fullName: OwnerSearch.fullName,
      ashop:OwnerSearch.ashop,
      adress:OwnerSearch.adress,
      city:OwnerSearch.city,
      phone:OwnerSearch.phone,
      email: OwnerSearch.email,
      password:OwnerSearch.password
     
    };
    
    const token = await jwt.sign(payload,process.env.secretOrKey);

    res.status(200).json({ token: `Bearer ${token}` });
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
   
  }
}
};
