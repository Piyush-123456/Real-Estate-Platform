var express = require('express');
var router = express.Router();
const customerCollection = require("../models/customer")
/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("Customer");
})

router.post("/register", async (req, res, next) => {
  try {
    const customer = await new customerCollection(req.body).save();
    console.log(customer)
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
});


router.post("/login", async (req, res, next) => {
  try {
    const user = await customerCollection.findOne({ email: req.body.email }).select("+password").exec();
    console.log(user);
    const isMatch = await user.comparepassword(req.body.password);
    if (!isMatch) {
      return res.send("Wrong Credentials");
    }
    res.send("Password Correct");
  }
  catch (err) {
    console.log(err.message);
  }
})



module.exports = router;
