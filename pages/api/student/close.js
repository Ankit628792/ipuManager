import { closeStudentHandler } from "../../../server/controller/student.controller";

export default async function handler(req, res) {
    if (req.method == 'PATCH') {
        const { status, msg } = await closeStudentHandler(req, res);
        res.status(status).send({ msg: msg })
    }
}