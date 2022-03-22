import { createUserHandler, getUserHandler, updateUserHandler, removeUserHandler } from "../../../server/controller/user.controller";
import connectDB from "../db";

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        const { status, data } = await getUserHandler(req, res);
        res.status(status).send(data)
    }
    if (req.method == 'POST') {
        const { status, msg } = await createUserHandler(req, res);
        res.status(status).send({ msg: msg })
    }
    if (req.method == 'PATCH') {
        const { status, msg } = await updateUserHandler(req, res);
        res.status(status).send({ msg: msg })
    }
    if (req.method == 'DELETE') {
        const { status, msg } = await removeUserHandler(req, res);
        res.status(status).send({ msg: msg })
    }
}