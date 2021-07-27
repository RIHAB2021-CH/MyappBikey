const express = require("express");

const { ownerRegister, ownerLogin } = require("../controllers/owner.controller");
const { registerRules, validator } = require("../middlewares/validator");
const isAuth = require("../middlewares/passport-setup");

const Router = express.Router();

Router.post("/register", registerRules(), validator, ownerRegister);
Router.post("/login", ownerLogin);
Router.get("/currentowner", isAuth(), (req, res) => res.send(req.user));

module.exports = Router;