import { createStudentHandler, searchStudentHandler, getAllStudentHandler, getStudentHandler, removeStudentHandler, updateStudentHandler } from "../../../server/controller/student.controller";
import connectDB from "../db";

export default async function (req, res) {
    await connectDB()
    if (req.method == 'GET') {
        const { _id } = req.query;
        const { status, data, msg } = _id ? await getStudentHandler(req, res) : await getAllStudentHandler(req, res);
        res.status(status).send({ msg: msg, data })
    }
    if (req.method == 'POST') {
        const search = req.headers['request-type']
        const { status, msg } = search ? await searchStudentHandler(req,res) : await createStudentHandler(req, res);
        res.status(status).send({ msg: msg })
    }
    if (req.method == 'PATCH') {
        const { status, msg } = await updateStudentHandler(req, res);
        res.status(status).send({ msg: msg })
    }
    if (req.method == 'DELETE') {
        const { status, msg } = await removeStudentHandler(req, res);
        res.status(status).send({ msg: msg })

    }
}