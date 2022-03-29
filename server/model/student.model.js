import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    alternateEmail: {
        type: String,
    },
    mobileNo: {
        type: Number
    },
    alternateMobileNo: {
        type: Number
    },
    enrollNo: {
        type: Number,
        required: true
    },
    admissionYear: {
        type: 'String'
    },
    school: {
        type: String
    },
    programme: {
        type: String
    },
    course: {
        type: String
    },
    requestEmail: {
        type: Boolean
    },
    emailReason: {
        type: String
    },
    requestInternet: {
        type: Boolean
    },
    internetReason: {
        type: String
    },
    type: {
        type: String,
        default: 'student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    ipuEmail: {
        type: String
    },
    ipuPassword: {
        type: String
    },
    internetId: {
        type: String
    },
    internetPassword: {
        type: String
    },
    profileImage: {
        type: String
    },
    idImage: {
        type: String
    },
    addressProof: {
        type: String
    },
    closed: {
        type: Boolean
    },
    closedReason: {
        type: String
    },
}, { timestamps: true })

// studentSchema.pre('findOneAndUpdate', async function (next) {
//     if (this._update.ipuPassword) {
//         const salt = await bcrypt.genSalt(10)
//         this._update.ipuPassword = await bcrypt.hash(this._update.ipuPassword, salt);
//     }

//     next();
// })

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)

export default Student;