const mongoose = require('mongoose');

const guitarSchema = new mongoose.Schema(
  {
  name: { type:String, required: true},
  description: {type: String, required: true},
  img: String,
  price: { type: Number, min: 0},
  qty: {type: Number, default: 1}
}
);



const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar
