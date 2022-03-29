import User from "../model/user.model";

export async function findUser(query) {
    try {
        return User.findOne(query, { password: 0 }).lean();
    } catch (error) {
        throw new Error(error)
    }
}

export async function findAllUser(query) {
    try {
        return User.find(query, { _id: 1, name: 1, email: 1, type: 1, school: 1 })
    } catch (error) {
        throw new Error(error)
    }
}

export async function validatePassword(credentials) {
    try {
        const user = await User.findOne({ email: credentials.email })
        if (!user) return false
        const isValid = await user.comparePassword(credentials.password)
        if (!isValid) return false
        const { password, __v, ...other } = user._doc
        return other
    } catch (error) {
        throw new Error(error)
    }
}

export async function createUser(input) {
    const { name, email, password, owner, type, school } = input
    try {
        const user = new User({ name, email, password, owner, type, school });
        return await user.save()
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateUser(_id, input) {
    try {
        return await User.findOneAndUpdate({ _id: _id }, input, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteUser(_id) {
    try {
        const data = await User.findByIdAndDelete({ _id: _id })
        return data
    } catch (error) {
        throw new Error(error)
    }
}
