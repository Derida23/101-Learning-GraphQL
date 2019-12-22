const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mahasiswaSchema = new Schema({
  nama: String,
  umur: Number,
  jurusanid: String
});

module.exports = mongoose.model("mahasiswa", mahasiswaSchema);
