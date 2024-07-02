const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const customerSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    password: String,
    avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1719046341462-d65e03c776ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D'
    },
    otp: {
        type: Number,
        default: 0
    }
});

customerSchema.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

customerSchema.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
const customerCollection = mongoose.model("Customer", customerSchema);
module.exports = customerCollection;
