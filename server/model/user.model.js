import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        default: 'admin'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

userSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.password) {
        const salt = await bcrypt.genSalt(10)
        this._update.password = await bcrypt.hash(this._update.password, salt);
    }
    next();
})

userSchema.methods.comparePassword = async function (condidatePassword) {
    return bcrypt.compare(condidatePassword, this.password).catch(e => false)
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;