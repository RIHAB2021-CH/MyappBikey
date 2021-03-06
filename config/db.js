
    const mongoose = require('mongoose')
    const config = require("config")
    
    const connectdb = async() => {
        await mongoose.connect(config.get("MONGO_URI"), { useNewUrlParser: true, useUnifiedTopology: true })
            .then(console.log("mongoose is connected"))
            .catch(err => console.log(err))
    }
    
    
    module.exports = connectdb