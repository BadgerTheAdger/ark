const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    _supervisorId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })


const Company = new mongoose.model("company", CompanySchema);

module.exports = Company;