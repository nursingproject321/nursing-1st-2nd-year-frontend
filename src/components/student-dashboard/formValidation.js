const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/
    },
    lastName: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+$/
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\d+$/
    },
    email: {
        type: String,
        required: true,
        match: /\S+@\uwindsor\.ca$/
    },
    studentNumber: {
        type: String,
        required: true,
        match: /^\d+$/
    },
    intake: {
        type: String,
        required: true,
        enum: ["fall", "summer", "winter"] // Define the allowed options
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
