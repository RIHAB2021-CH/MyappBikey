const mongoose = require("mongoose");
//creation of the owner model
const OwnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    
  },
   ashop: {
       type: Boolean,
},
  adress: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {type: Number,
},
email: {
    type: String,
  },

  password: {
    type: String,
  },
});

module.exports = owner = mongoose.model("owner", OwnerSchema);
