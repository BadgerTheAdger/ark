const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
    herdNumber: {
        type: String,
        required: true,
        trim: true,
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    _hostCompanyId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })


const Animal = new mongoose.model("animal", AnimalSchema);

module.exports = Animal;