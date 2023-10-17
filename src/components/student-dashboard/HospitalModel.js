const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true }
    // location: { type: String, required: true }
    // description: { type: String, required: true },
    // website: { type: String }
    // Add more fields as needed for the hospital data
});

// Create and export the Hospital model using the schema
const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
