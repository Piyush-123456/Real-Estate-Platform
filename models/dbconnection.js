const mongoose = require("mongoose");

exports.DBConnect = async () => {
    try {
        let conn = await mongoose.connect('mongodb://localhost:27017/RealEstate');
        console.log("DB Connected!");
    }
    catch (err) {
        console.log(err.message);
    }
}