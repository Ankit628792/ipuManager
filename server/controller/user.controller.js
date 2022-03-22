import { createUser, findUser, findAllUser, updateUser, deleteUser, validatePassword } from "../service/user.service";

export async function createSessionHandler(credentials) {
    try {
        const user = await validatePassword(credentials);
        if (!user) { return { status: 401, msg: 'Invalid Credentials' } }
        return user
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function getUserHandler(req, res) {
    const { ownerId } = req.query
    const query = { owner: ownerId }
    try {
        const user = await findAllUser(query);
        if (!user) { return { status: 401, msg: 'User Unauthorised' } }
        return { status: 200, data: user }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}


export async function createUserHandler(req, res) {
    const { name, email, password, owner } = req.body;
    if (!name || !email || !password) return { status: 406, msg: 'Fill all the details!' };
    if (!owner) return { status: 406, msg: 'Super User Unauthorised!' };
    try {
        if (!(await findUser({ email }))) {
            await createUser(req.body)
            return { status: 201, msg: 'User Registered Successfully!' };
        } else {
            return { status: 403, msg: 'User already exist with this email id' }
        }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function updateUserHandler(req, res) {
    const { _id, name, email, password } = req.body;
    if (!name || !email || !password) return { status: 406, msg: 'Fill all the details!' };
    try {
        if (await findUser({ _id: _id })) {
            await updateUser(_id, req.body)
            return { status: 200, msg: 'User Updated Successfully!' };
        } else {
            return { status: 404, msg: "Couldn't update user currently" }
        }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function removeUserHandler(req, res) {
    const { _id } = req.query;
    if (!_id) return { status: 404, msg: "Couldn't get user" }
    try {
        if (await findUser({ _id: _id })) {
            await deleteUser(_id)
            return { status: 200, msg: 'User removed Successfully!' };
        } else {
            return { status: 404, msg: "Couldn't get user" }
        }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

